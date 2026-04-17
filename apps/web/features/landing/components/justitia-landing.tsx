"use client";

import Link from "next/link";
import { Scale, Gavel, Building2, ArrowRight } from "lucide-react";
import { LandingHeader } from "./landing-header";
import { LandingFooter } from "./landing-footer";

const verticals = [
  {
    icon: Scale,
    label: "Para Abogados",
    href: "/justitia/abogados",
    description:
      "Simulá cómo razona el juez antes de presentar tu caso. Anticipá objeciones y construí argumentos más sólidos para recursos y audiencias.",
    tag: "Litigación",
    available: false,
  },
  {
    icon: Gavel,
    label: "Para Jueces",
    href: "/justitia/jueces",
    description:
      "Redactá sentencias con el respaldo de toda la jurisprudencia uruguaya. Anticipá recursos antes de firmar y mantené coherencia con tu propia doctrina.",
    tag: "Poder Judicial",
    available: true,
  },
  {
    icon: Building2,
    label: "Para Empresas",
    href: "/justitia/empresas",
    description:
      "Anticipá el impacto jurídico, mediático y político de tus decisiones. Simulá qué dirán los stakeholders involucrados.",
    tag: "Compliance & Estrategia",
    available: false,
  },
];

export function JustitiaLanding() {
  return (
    <div className="min-h-screen bg-white">
      <LandingHeader variant="light" />

      <section className="bg-[#05070b] pt-36 pb-28 text-white text-center">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[13px] text-white/60 mb-8">
            <Scale className="size-3.5" />
            IA Jurídica · Uruguay
          </div>
          <h1 className="font-[family-name:var(--font-serif)] text-[4rem] leading-[0.95] tracking-[-0.038em] sm:text-[6rem] lg:text-[8rem]">
            Justitia
          </h1>
          <p className="mx-auto mt-7 max-w-[620px] text-[16px] leading-7 text-white/70 sm:text-[18px]">
            Inteligencia artificial entrenada en el derecho uruguayo. Para
            quienes necesitan pensar más rápido que el adversario — o anticipar
            quién lo es.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#0a0d12]/36 mb-12">
            Verticales
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {verticals.map((v) => (
              <div key={v.href} className="relative">
                {v.available ? (
                  <Link
                    href={v.href}
                    className="group flex h-full flex-col rounded-xl border border-[#0a0d12]/10 p-8 hover:border-[#0a0d12]/24 hover:shadow-sm transition-all"
                  >
                    <VerticalContent v={v} />
                  </Link>
                ) : (
                  <div className="flex h-full flex-col rounded-xl border border-[#0a0d12]/6 p-8 opacity-50">
                    <VerticalContent v={v} comingSoon />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}

function VerticalContent({
  v,
  comingSoon,
}: {
  v: (typeof verticals)[number];
  comingSoon?: boolean;
}) {
  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div className="flex size-10 items-center justify-center rounded-lg bg-[#05070b]">
          <v.icon className="size-5 text-white" />
        </div>
        {comingSoon ? (
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#0a0d12]/30 border border-[#0a0d12]/10 rounded-full px-2.5 py-0.5">
            Próximamente
          </span>
        ) : (
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#0a0d12]/40">
            {v.tag}
          </span>
        )}
      </div>
      <h3 className="text-[20px] font-semibold text-[#0a0d12]">{v.label}</h3>
      <p className="mt-3 flex-1 text-[14px] leading-[1.7] text-[#0a0d12]/56">
        {v.description}
      </p>
      {!comingSoon && (
        <div className="mt-6 flex items-center gap-1.5 text-[13px] font-medium text-[#0a0d12]/40 group-hover:text-[#0a0d12] transition-colors">
          Explorar <ArrowRight className="size-3.5" />
        </div>
      )}
    </>
  );
}
