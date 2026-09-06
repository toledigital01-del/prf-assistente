import Chat from "@/components/Chat";
import { MODULOS } from "@/lib/skills";

export default function PaginaFrequencia() {
  const m = MODULOS.frequencia;
  return <Chat modulo="frequencia" titulo={m.titulo} sistemaOficial={m.sistemaOficial} />;
}
