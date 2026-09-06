// Cliente do servidor local de automação (roda em http://127.0.0.1:4787 na sua máquina).
// Isso NUNCA fala com nenhum servidor da Anthropic nem com nenhum servidor remoto —
// é uma chamada local, do navegador pro seu próprio computador.

const BASE = "http://127.0.0.1:4787";

export type ElementoPagina = { tipo: string; texto: string; inputType: string | null };

export async function servidorLocalDisponivel(): Promise<boolean> {
  try {
    const r = await fetch(`${BASE}/saude`, { signal: AbortSignal.timeout(1500) });
    return r.ok;
  } catch {
    return false;
  }
}

export async function iniciarSessao(url: string) {
  const r = await fetch(`${BASE}/sessao/iniciar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });
  return r.json();
}

export async function statusSessao() {
  const r = await fetch(`${BASE}/sessao/status`);
  return r.json();
}

export async function observarPagina(): Promise<{
  ok: boolean;
  url?: string;
  titulo?: string;
  elementos?: ElementoPagina[];
  erro?: string;
}> {
  const r = await fetch(`${BASE}/sessao/observar`);
  return r.json();
}

export async function executarAcao(acao: {
  type: "clicar" | "preencher" | "navegar";
  alvo: string;
  valor?: string;
  confirmed?: boolean;
}) {
  const r = await fetch(`${BASE}/sessao/acao`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(acao),
  });
  const dados = await r.json();
  return { status: r.status, ...dados };
}

export async function fecharSessao() {
  const r = await fetch(`${BASE}/sessao/fechar`, { method: "POST" });
  return r.json();
}
