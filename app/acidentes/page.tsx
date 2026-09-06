import Chat from "@/components/Chat";
import { MODULOS } from "@/lib/skills";

export default function PaginaAcidentes() {
  const m = MODULOS.acidentes;
  return <Chat modulo="acidentes" titulo={m.titulo} sistemaOficial={m.sistemaOficial} />;
}
