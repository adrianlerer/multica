"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Gavel,
  Brain,
  Shield,
  BookOpen,
  ChevronRight,
  ArrowLeft,
  Scale,
  Database,
} from "lucide-react";
import { cn } from "@multica/ui/lib/utils";
import { LandingHeader } from "./landing-header";
import { LandingFooter } from "./landing-footer";

/* ------------------------------------------------------------------ */
/*  Feature definitions                                                 */
/* ------------------------------------------------------------------ */

const features = [
  {
    label: "Omnibrain jurídico",
    icon: Database,
    title: "La jurisprudencia de todo el Poder Judicial en cada consulta",
    description:
      "Accedé a la jurisprudencia completa del sistema judicial uruguayo: tus propios fallos, los de tu sede o tribunal, y toda la base nacional. Cada decisión que redactás tiene el respaldo de miles de precedentes relevantes, encontrados por similitud semántica.",
    cards: [
      {
        title: "Tu historial de fallos",
        description:
          "Consultá tu propia doctrina para mantener coherencia entre resoluciones y anticipar críticas por contradicción interna.",
      },
      {
        title: "Jurisprudencia del tribunal",
        description:
          "Accedé a la línea colectiva de tu sede o cámara, para alinear o distinguir fundadamente tu decisión.",
      },
      {
        title: "Todo el Poder Judicial",
        description:
          "Búsqueda semántica en la jurisprudencia nacional completa, filtrable por materia, instancia, fecha y órgano.",
      },
    ],
  },
  {
    label: "Redacción asistida",
    icon: BookOpen,
    title: "Redactá sentencias con IA entrenada en derecho uruguayo",
    description:
      "Asistencia para la redacción de decisiones judiciales: estructurá el fallo, encontrá los fundamentos normativos pertinentes, citá precedentes relevantes automáticamente y mantené consistencia con tu propio estilo y doctrina previos.",
    cards: [
      {
        title: "Tu estilo, tu doctrina",
        description:
          "La IA aprende de tus resoluciones anteriores y mantiene consistencia terminológica y doctrinaria en cada fallo.",
      },
      {
        title: "Fundamentos sugeridos",
        description:
          "Propone fundamentos normativos y doctrinarios ordenados por relevancia al caso, con cita de fuente.",
      },
      {
        title: "Cita de precedentes",
        description:
          "Incorpora automáticamente jurisprudencia pertinente del tribunal y del sistema nacional, ya formateada.",
      },
    ],
  },
  {
    label: "Simulación de ataques",
    icon: Shield,
    title: "Anticipá cómo van a atacar tu sentencia antes de firmarla",
    description:
      "Antes de dictar el fallo, simulá los argumentos que las partes disconformes usarán en recursos de apelación, nulidad o casación. Identificá las vulnerabilidades en la motivación y reforzalas con fundamentos más sólidos.",
    cards: [
      {
        title: "Simulación de recursos",
        description:
          "Anticipá los vectores de ataque por apelación, nulidad o casación que presentará cada parte.",
      },
      {
        title: "Análisis de vulnerabilidades",
        description:
          "Detectá qué fundamentos de tu sentencia son más débiles o contradicen precedentes de alzada.",
      },
      {
        title: "Refuerzo de motivación",
        description:
          "Recibí sugerencias concretas para fortalecer los fundamentos antes de firmar, reduciendo la exposición en alzada.",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Interactive demo                                                     */
/* ------------------------------------------------------------------ */

const demoSteps = [
  {
    label: "Borrador",
    icon: BookOpen,
    tag: "Sentencia Nº 2847 · Juzgado Letrado Civil 5º",
    type: "draft" as const,
    content:
      "«...Se condena al demandado al pago de la suma de $U 450.000 en concepto de lucro cesante derivado del incumplimiento contractual acreditado en autos, más reajustes e intereses legales desde la mora...»",
  },
  {
    label: "Ataques simulados",
    icon: Shield,
    tag: "3 vectores de ataque identificados",
    type: "attacks" as const,
    points: [
      "Ausencia de fundamentación del quantum del lucro cesante — no se acredita el método de cálculo (TAC3, sent. 187/2023).",
      "Contradicción con la línea del Tribunal de Apelaciones en lo Civil 3º Turno respecto a la exigencia de prueba pericial en daños de esta naturaleza.",
      "Omisión de valorar el hecho del propio acreedor como factor concurrente en la producción del daño (art. 1321 CC).",
    ],
  },
  {
    label: "Refuerzos",
    icon: Brain,
    tag: "Motivación reforzada",
    type: "reinforcements" as const,
    points: [
      "Integrar referencia expresa al informe pericial contable (fs. 134-138) como base del cálculo, distinguiéndolo del precedente TAC3-187/2023 por diferencia fáctica.",
      "Agregar considerando que explique la no reducción por hecho del acreedor, valorando la prueba testimonial de fs. 89.",
      "Citar sentencia del TAC2, Nº 203/2024, que avala el criterio de cálculo utilizado en casos de incumplimiento comercial análogos.",
    ],
  },
];

function JudgeSimDemo() {
  const [step, setStep] = useState(0);

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0a0d12] text-white shadow-2xl">
      {/* Tab bar */}
      <div className="flex border-b border-white/8">
        {demoSteps.map((s, i) => (
          <button
            key={s.label}
            onClick={() => setStep(i)}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 border-r border-white/8 last:border-r-0 px-4 py-3 text-[12px] font-medium transition-colors",
              step === i
                ? "bg-white/6 text-white"
                : "text-white/40 hover:text-white/70",
            )}
          >
            <s.icon className="size-3.5" />
            <span className="hidden sm:inline">{s.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6 min-h-[260px]">
        {step === 0 && (
          <div className="space-y-4">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-white/36">
              {demoSteps[0]!.tag}
            </span>
            <blockquote className="rounded-lg border border-white/8 bg-white/4 px-5 py-4 text-[14px] leading-relaxed italic text-white/70">
              {demoSteps[0]!.content}
            </blockquote>
            <button
              onClick={() => setStep(1)}
              className="flex items-center gap-1.5 text-[13px] font-medium text-white/40 hover:text-white/80 transition-colors"
            >
              Simular ataques en alzada <ChevronRight className="size-3.5" />
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-red-400/80">
                {demoSteps[1]!.tag}
              </span>
              <Shield className="size-4 text-red-400/50" />
            </div>
            <div className="space-y-2.5">
              {demoSteps[1]!.points?.map((p, i) => (
                <div
                  key={i}
                  className="flex gap-3 rounded-lg border border-red-500/10 bg-red-500/5 px-4 py-3"
                >
                  <span className="mt-0.5 size-4 shrink-0 rounded-full bg-red-500/10 text-center text-[10px] font-bold text-red-400 leading-4">
                    {i + 1}
                  </span>
                  <p className="text-[13px] leading-relaxed text-white/60">{p}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => setStep(2)}
              className="flex items-center gap-1.5 text-[13px] font-medium text-white/40 hover:text-white/80 transition-colors"
            >
              Ver refuerzos sugeridos <ChevronRight className="size-3.5" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400/80">
                {demoSteps[2]!.tag}
              </span>
              <Brain className="size-4 text-emerald-400/50" />
            </div>
            <div className="space-y-2.5">
              {demoSteps[2]!.points?.map((p, i) => (
                <div
                  key={i}
                  className="flex gap-3 rounded-lg border border-emerald-500/10 bg-emerald-500/5 px-4 py-3"
                >
                  <span className="mt-0.5 size-4 shrink-0 rounded-full bg-emerald-500/10 text-center text-[10px] font-bold text-emerald-400 leading-4">
                    ✓
                  </span>
                  <p className="text-[13px] leading-relaxed text-white/60">{p}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => setStep(0)}
              className="flex items-center gap-1.5 text-[13px] font-medium text-white/40 hover:text-white/80 transition-colors"
            >
              <ArrowLeft className="size-3.5" /> Volver al borrador
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                       */
/* ------------------------------------------------------------------ */

export function JustitiaJuecesLanding() {
  return (
    <div className="min-h-screen bg-white">
      <LandingHeader variant="light" />

      {/* Hero */}
      <section className="bg-[#05070b] pt-36 pb-28 text-white">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <Link
            href="/justitia"
            className="inline-flex items-center gap-2 text-[13px] text-white/36 hover:text-white/60 mb-10 transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            Justitia
          </Link>

          <div className="max-w-[900px]">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[13px] text-white/60 mb-7">
              <Gavel className="size-3.5" />
              Para Jueces y Tribunales · Uruguay
            </div>
            <h1 className="font-[family-name:var(--font-serif)] text-[3rem] leading-[1] tracking-[-0.035em] sm:text-[4.5rem] lg:text-[5.5rem]">
              Escribí mejores sentencias.
              <br />
              Anticipá cada recurso.
            </h1>
            <p className="mt-7 max-w-[680px] text-[16px] leading-7 text-white/66 sm:text-[17px]">
              IA entrenada en la jurisprudencia del Poder Judicial uruguayo.
              Asistencia para redactar fallos con coherencia doctrinaria y
              simulación de los ataques que las partes presentarán en alzada —
              antes de que firmes.
            </p>
          </div>

          <div className="mt-16 max-w-[820px]">
            <p className="text-[12px] font-medium uppercase tracking-wider text-white/28 mb-4">
              Demo interactivo
            </p>
            <JudgeSimDemo />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white text-[#0a0d12]">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          {features.map((f, i) => (
            <div
              key={f.label}
              className={cn(
                "py-20 lg:py-28",
                i < features.length - 1 && "border-b border-[#0a0d12]/8",
              )}
            >
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0a0d12]/36 mb-6">
                <f.icon className="size-3.5" />
                {f.label}
              </div>
              <h2 className="font-[family-name:var(--font-serif)] text-[2.4rem] leading-[1.05] tracking-[-0.03em] sm:text-[3rem] lg:text-[3.8rem] max-w-[820px]">
                {f.title}
              </h2>
              <p className="mt-5 max-w-[640px] text-[15px] leading-7 text-[#0a0d12]/56 sm:text-[16px]">
                {f.description}
              </p>
              <div className="mt-14 grid gap-8 md:grid-cols-3 sm:mt-16">
                {f.cards.map((c) => (
                  <div key={c.title}>
                    <h3 className="text-[15px] font-semibold text-[#0a0d12]">
                      {c.title}
                    </h3>
                    <p className="mt-2.5 text-[14px] leading-[1.7] text-[#0a0d12]/52">
                      {c.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#05070b] py-28 text-white text-center">
        <div className="mx-auto max-w-[560px] px-4 sm:px-6 lg:px-8">
          <Scale className="size-8 text-white/24 mx-auto mb-8" />
          <h2 className="font-[family-name:var(--font-serif)] text-[2.4rem] tracking-[-0.03em] sm:text-[3rem]">
            Justitia para el Poder Judicial uruguayo
          </h2>
          <p className="mt-5 text-[15px] text-white/56 leading-7">
            Acceso institucional para juzgados y tribunales. Ningún dato de
            expedientes sale del sistema — privacidad total garantizada.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-[14px] font-semibold text-[#0a0d12] hover:bg-white/90 transition-colors"
          >
            Solicitar acceso institucional
            <ChevronRight className="size-4" />
          </Link>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
