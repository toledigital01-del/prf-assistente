"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import LiveSession from "@/components/LiveSession";
import { observarPagina, executarAcao } from "@/lib/automationClient";

type Acao = { type: "clicar" | "preencher" | "navegar"; alvo: string; valor?: string };
type Mensagem = {
  role: "user" | "assistant";
  content: string;
  acao?: Acao;
  acaoStatus?: "pendente" | "executada" | "recusada" | "erro";
  acaoMensagem?: string;
};

function extrairAcao(texto: string): { textoLimpo: string; acao?: Acao } {
  const m = texto.match(/```acao\s*([\s\S]*?)```/);
  if (!m) return { textoLimpo: texto };
  try {
    const acao = JSON.parse(m[1].trim());
    const textoLimpo = texto.replace(m[0], "").trim();
    return { textoLimpo, acao };
  } catch {
    return { textoLimpo: texto };
  }
}

export default function Chat({
  modulo,
  titulo,
  sistemaOficial,
}: {
  modulo: "pdi" | "frequencia" | "acidentes";
  titulo: string;
  sistemaOficial: { nome: string; url: string } | null;
}) {
  const chaveStorage = `prf-assistente:${modulo}`;
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [texto, setTexto] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [sessaoAtiva, setSessaoAtiva] = useState(false);
  const fimRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const salvo = localStorage.getItem(chaveStorage);
      if (salvo) setMensagens(JSON.parse(salvo));
    } catch {}
  }, [chaveStorage]);

  useEffect(() => {
    try {
      localStorage.setItem(chaveStorage, JSON.stringify(mensagens));
    } catch {}
    fimRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensagens, chaveStorage]);

  async function enviar() {
    const conteudo = texto.trim();
    if (!conteudo || enviando) return;

    const novas: Mensagem[] = [...mensagens, { role: "user", content: conteudo }];
    setMensagens(novas);
    setTexto("");
    setEnviando(true);

    try {
      let pagina;
      if (sessaoAtiva) {
        const obs = await observarPagina();
        if (obs.ok) pagina = { url: obs.url, titulo: obs.titulo, elementos: obs.elementos };
      }

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          modulo,
          mensagens: novas.map((m) => ({ role: m.role, content: m.content })),
          pagina,
        }),
      });
      const dados = await res.json();
      if (dados.erro) {
        setMensagens([...novas, { role: "assistant", content: `⚠️ ${dados.erro}` }]);
      } else {
        const { textoLimpo, acao } = extrairAcao(dados.texto);
        setMensagens([
          ...novas,
          {
            role: "assistant",
            content: textoLimpo || dados.texto,
            acao,
            acaoStatus: acao ? "pendente" : undefined,
          },
        ]);
      }
    } catch (e) {
      setMensagens([...novas, { role: "assistant", content: "⚠️ Falha ao falar com o servidor. Tenta de novo." }]);
    } finally {
      setEnviando(false);
    }
  }

  async function confirmarAcao(indice: number) {
    const msg = mensagens[indice];
    if (!msg?.acao) return;

    const resultado = await executarAcao({ ...msg.acao, confirmed: true });

    setMensagens((atual) => {
      const copia = [...atual];
      if (resultado.ok) {
        copia[indice] = { ...copia[indice], acaoStatus: "executada", acaoMensagem: "Feito." };
      } else {
        copia[indice] = {
          ...copia[indice],
          acaoStatus: "erro",
          acaoMensagem: resultado.erro || "Não deu pra executar.",
        };
      }
      return copia;
    });
  }

  function recusarAcao(indice: number) {
    setMensagens((atual) => {
      const copia = [...atual];
      copia[indice] = { ...copia[indice], acaoStatus: "recusada" };
      return copia;
    });
  }

  function limpar() {
    if (confirm("Apagar o histórico desta conversa?")) {
      setMensagens([]);
      localStorage.removeItem(chaveStorage);
    }
  }

  const suportaSessaoAoVivo = Boolean(sistemaOficial);

  return (
    <>
      <div className="topbar">
        <Link href="/" className="voltar">← Módulos</Link>
        <h1>{titulo}</h1>
        <div className="faixa" />
      </div>
      <div className="container">
        <div className="acoes-topo">
          {sistemaOficial && (
            <a className="btn-link" href={sistemaOficial.url} target="_blank" rel="noopener noreferrer">
              Abrir {sistemaOficial.nome} numa aba ↗
            </a>
          )}
          <button className="btn-link perigo" onClick={limpar} type="button">
            Limpar conversa
          </button>
        </div>

        {suportaSessaoAoVivo && (
          <LiveSession url={sistemaOficial!.url} onMudarStatus={setSessaoAtiva} />
        )}

        {mensagens.length === 0 && (
          <p className="nota-seguranca">
            Pergunte o que quiser sobre {titulo.replace("PRF ", "")}. Login continua sendo feito por
            você — na aba normal, ou na janela da sessão ao vivo. Qualquer ação sensível (salvar,
            incluir, excluir…) só acontece depois que você clicar em "Confirmar" aqui.
          </p>
        )}

        <div className="chat">
          {mensagens.map((m, i) => (
            <div key={i}>
              <div className={`msg ${m.role}`}>{m.content}</div>
              {m.acao && (
                <div className="msg aviso" style={{ alignSelf: "flex-start", maxWidth: "88%" }}>
                  <div>
                    <strong>Ação proposta:</strong>{" "}
                    {m.acao.type === "clicar" && <>clicar em “{m.acao.alvo}”</>}
                    {m.acao.type === "preencher" && (
                      <>
                        preencher “{m.acao.alvo}” com “{m.acao.valor}”
                      </>
                    )}
                    {m.acao.type === "navegar" && <>abrir {m.acao.alvo}</>}
                  </div>
                  {m.acaoStatus === "pendente" && (
                    <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                      <button className="btn-link" type="button" onClick={() => confirmarAcao(i)}>
                        Confirmar
                      </button>
                      <button className="btn-link perigo" type="button" onClick={() => recusarAcao(i)}>
                        Não fazer
                      </button>
                    </div>
                  )}
                  {m.acaoStatus === "executada" && <div style={{ marginTop: 6 }}>✅ Executado.</div>}
                  {m.acaoStatus === "recusada" && <div style={{ marginTop: 6 }}>🚫 Você optou por não fazer.</div>}
                  {m.acaoStatus === "erro" && <div style={{ marginTop: 6 }}>⚠️ {m.acaoMensagem}</div>}
                </div>
              )}
            </div>
          ))}
          {enviando && <div className="msg assistant">digitando…</div>}
          <div ref={fimRef} />
        </div>
      </div>

      <div className="input-bar">
        <textarea
          rows={1}
          value={texto}
          placeholder="Escreva sua pergunta…"
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              enviar();
            }
          }}
        />
        <button onClick={enviar} disabled={enviando || !texto.trim()} type="button">
          Enviar
        </button>
      </div>
    </>
  );
}
