"use client";

import { useEffect, useState } from "react";
import {
  servidorLocalDisponivel,
  iniciarSessao,
  statusSessao,
  fecharSessao,
} from "@/lib/automationClient";

export default function LiveSession({
  url,
  onMudarStatus,
}: {
  url: string;
  onMudarStatus?: (ativa: boolean) => void;
}) {
  const [servidorOk, setServidorOk] = useState<boolean | null>(null);
  const [sessao, setSessao] = useState<{ aberta: boolean; url?: string; titulo?: string }>({
    aberta: false,
  });
  const [carregando, setCarregando] = useState(false);

  async function checar() {
    const ok = await servidorLocalDisponivel();
    setServidorOk(ok);
    if (ok) {
      const s = await statusSessao();
      setSessao(s);
      onMudarStatus?.(Boolean(s.aberta));
    } else {
      onMudarStatus?.(false);
    }
  }

  useEffect(() => {
    checar();
    const t = setInterval(checar, 5000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function abrir() {
    setCarregando(true);
    try {
      await iniciarSessao(url);
      await checar();
    } finally {
      setCarregando(false);
    }
  }

  async function fechar() {
    setCarregando(true);
    try {
      await fecharSessao();
      await checar();
    } finally {
      setCarregando(false);
    }
  }

  if (servidorOk === false) {
    return (
      <div className="nota-seguranca">
        Sessão ao vivo indisponível: o servidor local de automação não está rodando neste
        computador. Abra um terminal na pasta <code>automation-server</code> e rode{" "}
        <code>npm start</code>. Sem ele, o app funciona só no modo chat/consulta.
      </div>
    );
  }

  if (servidorOk === null) return null;

  return (
    <div className="nota-seguranca" style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
      {sessao.aberta ? (
        <>
          <span>🟢 Sessão ao vivo aberta — {sessao.titulo || sessao.url}</span>
          <button className="btn-link perigo" onClick={fechar} disabled={carregando} type="button">
            Fechar sessão
          </button>
        </>
      ) : (
        <>
          <span>⚪ Nenhuma sessão ao vivo aberta.</span>
          <button className="btn-link" onClick={abrir} disabled={carregando} type="button">
            {carregando ? "Abrindo…" : "Abrir sessão ao vivo"}
          </button>
        </>
      )}
    </div>
  );
}
