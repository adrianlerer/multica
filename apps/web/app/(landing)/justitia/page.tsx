import type { Metadata } from "next";
import { JustitiaLanding } from "@/features/landing/components/justitia-landing";

export const metadata: Metadata = {
  title: {
    absolute: "Justitia — IA Jurídica para Uruguay",
  },
  description:
    "Inteligencia artificial entrenada en el derecho uruguayo. Para abogados, jueces y organizaciones que necesitan pensar más rápido que el adversario.",
  openGraph: {
    title: "Justitia — IA Jurídica para Uruguay",
    description:
      "IA entrenada en la jurisprudencia uruguaya. Para litigar, resolver y anticipar con más información.",
    url: "/justitia",
  },
  alternates: {
    canonical: "/justitia",
  },
};

export default function JustitiaPage() {
  return <JustitiaLanding />;
}
