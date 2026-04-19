#!/usr/bin/env python3
"""
Process Stanford ContractNLI dataset.
https://stanfordnlp.github.io/contract-nli/

Usage:
    python process_contract_nli.py contract-nli.zip
    python process_contract_nli.py contract-nli.zip --export-hypotheses
    python process_contract_nli.py contract-nli.zip --run-stats
    python process_contract_nli.py contract-nli.zip --sample <doc_id>
"""

import sys
import json
import zipfile
import argparse
from pathlib import Path
from collections import defaultdict, Counter
from typing import Any

LABELS = ("Entailment", "Contradiction", "NotMentioned")
SPLITS = ("train", "dev", "test")


# ---------------------------------------------------------------------------
# Loading
# ---------------------------------------------------------------------------

def load_zip(zip_path: str) -> dict[str, Any]:
    """Return {split_name: split_dict} for every JSON inside the zip."""
    data: dict[str, Any] = {}
    with zipfile.ZipFile(zip_path) as zf:
        for name in zf.namelist():
            if name.endswith(".json"):
                stem = Path(name).stem  # "train" | "dev" | "test"
                with zf.open(name) as f:
                    data[stem] = json.load(f)
    return data


# ---------------------------------------------------------------------------
# Hypothesis extraction
# ---------------------------------------------------------------------------

def extract_hypotheses(data: dict[str, Any]) -> dict[str, dict]:
    """
    Pull the 17 hypothesis definitions from the dataset's `labels` field.
    Present in every split; we just grab the first one we find.
    """
    for split in data.values():
        labels = split.get("labels")
        if labels:
            return labels
    raise ValueError("No 'labels' key found in any split JSON.")


def print_hypotheses(hypotheses: dict[str, dict]) -> None:
    print("\n=== ContractNLI · 17 Hypotheses ===\n")
    for key in sorted(hypotheses):
        h = hypotheses[key]
        print(f"  {key:8s}  [{h.get('short_description', '')}]")
        print(f"            {h.get('hypothesis', '')}")
        print()


# ---------------------------------------------------------------------------
# Statistics
# ---------------------------------------------------------------------------

def compute_stats(data: dict[str, Any], hypotheses: dict[str, dict]) -> None:
    print("\n=== Dataset Statistics ===\n")

    total_docs = 0
    for split_name in SPLITS:
        split = data.get(split_name, {})
        docs = split.get("documents", [])
        print(f"  {split_name:6s}: {len(docs):4d} documents")
        total_docs += len(docs)
    print(f"  {'total':6s}: {total_docs:4d} documents\n")

    # Per-hypothesis label distribution across all splits
    counts: dict[str, Counter] = defaultdict(Counter)
    for split in data.values():
        for doc in split.get("documents", []):
            for ann_set in doc.get("annotation_sets", []):
                for hyp_key, ann in ann_set.get("annotations", {}).items():
                    counts[hyp_key][ann["choice"]] += 1

    print("  Hypothesis label distribution (Entailment / Contradiction / NotMentioned)\n")
    header = f"  {'key':8s}  {'short description':35s}  {'E':>6s}  {'C':>6s}  {'N':>6s}"
    print(header)
    print("  " + "-" * (len(header) - 2))
    for key in sorted(counts):
        c = counts[key]
        desc = hypotheses.get(key, {}).get("short_description", "")[:35]
        print(
            f"  {key:8s}  {desc:35s}  "
            f"{c['Entailment']:6d}  {c['Contradiction']:6d}  {c['NotMentioned']:6d}"
        )


# ---------------------------------------------------------------------------
# Single-document inspection
# ---------------------------------------------------------------------------

def inspect_document(data: dict[str, Any], hypotheses: dict[str, dict], doc_id: str) -> None:
    for split_name, split in data.items():
        for doc in split.get("documents", []):
            if doc.get("id") == doc_id or doc.get("file_name", "").startswith(doc_id):
                print(f"\n=== Document: {doc.get('file_name', doc_id)} ({split_name}) ===\n")
                for ann_set in doc.get("annotation_sets", []):
                    for key in sorted(ann_set.get("annotations", {})):
                        ann = ann_set["annotations"][key]
                        choice = ann["choice"]
                        desc = hypotheses.get(key, {}).get("short_description", key)
                        spans = ann.get("spans", [])
                        text_spans = []
                        for span_idx in spans:
                            if span_idx < len(doc.get("spans", [])):
                                start, end = doc["spans"][span_idx]
                                text_spans.append(doc["text"][start:end].strip())
                        marker = {"Entailment": "✓", "Contradiction": "✗", "NotMentioned": "·"}[choice]
                        print(f"  {marker} {key:8s} [{choice:13s}]  {desc}")
                        for ts in text_spans[:2]:  # show up to 2 evidence spans
                            print(f"             Evidence: {ts[:120]}")
                        if text_spans:
                            print()
                return
    print(f"Document '{doc_id}' not found.")


# ---------------------------------------------------------------------------
# Export clean hypotheses JSON (for use in Justitia skill)
# ---------------------------------------------------------------------------

def export_hypotheses(hypotheses: dict[str, dict], out_path: str = "contract-nli-hypotheses.json") -> None:
    out = {
        key: {
            "short_description": h.get("short_description", ""),
            "hypothesis": h.get("hypothesis", ""),
        }
        for key, h in sorted(hypotheses.items())
    }
    Path(out_path).write_text(json.dumps(out, indent=2, ensure_ascii=False))
    print(f"Exported hypotheses → {out_path}")


# ---------------------------------------------------------------------------
# Benchmark: run a JSON result against ground truth
# ---------------------------------------------------------------------------

def benchmark(
    data: dict[str, Any],
    result_file: str,
    doc_id: str,
    split: str = "test",
) -> None:
    """
    Compare a skill-output JSON (same format as the ContractNLI skill output)
    against ground truth annotations for a specific document.

    result_file: JSON with {nda-1: "Entailment"|"Contradiction"|"NotMentioned", ...}
    """
    result = json.loads(Path(result_file).read_text())
    split_data = data.get(split, {})

    ground_truth: dict[str, str] = {}
    for doc in split_data.get("documents", []):
        if doc.get("id") == doc_id or doc.get("file_name", "").startswith(doc_id):
            for ann_set in doc.get("annotation_sets", []):
                for key, ann in ann_set.get("annotations", {}).items():
                    ground_truth[key] = ann["choice"]
            break

    if not ground_truth:
        print(f"Document '{doc_id}' not found in split '{split}'.")
        return

    correct = 0
    total = 0
    print(f"\n=== Benchmark: {doc_id} vs ground truth ===\n")
    for key in sorted(ground_truth):
        gt = ground_truth[key]
        pred = result.get(key, "NotMentioned")
        match = gt == pred
        correct += match
        total += 1
        marker = "✓" if match else "✗"
        print(f"  {marker} {key:8s}  GT={gt:13s}  PRED={pred}")

    print(f"\n  Accuracy: {correct}/{total} = {correct/total*100:.1f}%")


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def main() -> None:
    parser = argparse.ArgumentParser(description="ContractNLI dataset processor")
    parser.add_argument("zip", help="Path to contract-nli.zip")
    parser.add_argument("--run-stats", action="store_true", help="Print label distribution stats")
    parser.add_argument("--export-hypotheses", metavar="OUT", nargs="?", const="contract-nli-hypotheses.json",
                        help="Export 17 hypotheses to JSON (default: contract-nli-hypotheses.json)")
    parser.add_argument("--sample", metavar="DOC_ID", help="Inspect annotations for one document")
    parser.add_argument("--benchmark", nargs=3, metavar=("RESULT_JSON", "DOC_ID", "SPLIT"),
                        help="Compare skill output against ground truth")
    args = parser.parse_args()

    print(f"Loading {args.zip} …")
    data = load_zip(args.zip)
    hypotheses = extract_hypotheses(data)

    # Always print the 17 hypotheses
    print_hypotheses(hypotheses)

    if args.run_stats:
        compute_stats(data, hypotheses)

    if args.export_hypotheses:
        export_hypotheses(hypotheses, args.export_hypotheses)

    if args.sample:
        inspect_document(data, hypotheses, args.sample)

    if args.benchmark:
        result_file, doc_id, split = args.benchmark
        benchmark(data, result_file, doc_id, split)


if __name__ == "__main__":
    main()
