import Link from "next/link";
import { MODULOS } from "@/lib/skills";

export default function Home() {
  return (
    <>
      <div className="topbar">
        <h1>Assistente PRF</h1>
        <div className="faixa" />
      </div>
      <div className="container">
        <p className="nota-seguranca">
          Este app não faz login nem preenche nada sozinho nos sistemas oficiais. Ele te ajuda a pensar,
          calcular e redigir — quem acessa e salva no PDI/Frequência é sempre você.
        </p>
        <div className="grid-modulos">
          {(Object.keys(MODULOS) as (keyof typeof MODULOS)[]).map((id) => {
            const m = MODULOS[id];
            return (
              <Link key={id} href={`/${id}`} className="card-modulo">
                <h2>{m.titulo}</h2>
                <p>{m.descricao}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
