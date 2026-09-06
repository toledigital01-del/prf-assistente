import Chat from "@/components/Chat";
import { MODULOS } from "@/lib/skills";

export default function PaginaPdi() {
  const m = MODULOS.pdi;
  return <Chat modulo="pdi" titulo={m.titulo} sistemaOficial={m.sistemaOficial} />;
}
