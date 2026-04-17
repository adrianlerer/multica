import type { Metadata } from "next";
import { JustitiaJuecesLanding } from "@/features/landing/components/justitia-jueces-landing";

export const metadata: Metadata = {
  title: {
    absolute: "Justitia para Jueces — Sentencias y Simulación de Recursos",
  },
  description:
    "Redactá sentencias con el respaldo de toda la jurisprudencia uruguaya. Anticipá recursos antes de firmar y mantené coherencia con tu propia doctrina.",
  openGraph: {
    title: "Justitia para Jueces — Sentencias y Simulación de Recursos",
    description:
      "IA entrenada en el Poder Judicial uruguayo. Omnibrain jurídico, redacción asistida y simulación de ataques en alzada.",
    url: "/justitia/jueces",
  },
  alternates: {
    canonical: "/justitia/jueces",
  },
};

export default function JustitiaJuecesPage() {
  return <JustitiaJuecesLanding />;
}
