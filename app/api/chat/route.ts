import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import { carregarSystemPrompt, ModuloId, MODULOS } from "@/lib/skills";

export const runtime = "nodejs";

type Mensagem = { role: "user" | "assistant"; content: string };

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const modulo = body.modulo as ModuloId;
    const mensagens = body.mensagens as Mensagem[];
    const pagina = body.pagina as
      | { url?: string; titulo?: string; elementos?: { tipo: string; texto: string }[] }
      | undefined;

    if (!modulo || !(modulo in MODULOS)) {
      return new Response(JSON.stringify({ erro: "Módulo inválido" }), { status: 400 });
    }
    if (!process.env.ANTHROPIC_API_KEY) {
      return new Response(
        JSON.stringify({ erro: "ANTHROPIC_API_KEY não configurada no servidor (.env.local)" }),
        { status: 500 }
      );
    }

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const system = carregarSystemPrompt(modulo, Boolean(pagina));

    const mensagensParaEnviar = mensagens.map((m) => ({ role: m.role, content: m.content }));

    if (pagina && mensagensParaEnviar.length > 0) {
      const ultima = mensagensParaEnviar[mensagensParaEnviar.length - 1];
      const listaElementos = (pagina.elementos || [])
        .slice(0, 80)
        .map((e) => `- [${e.tipo}] ${e.texto}`)
        .join("\n");
      const estado = `ESTADO ATUAL DA PÁGINA\nURL: ${pagina.url}\nTítulo: ${pagina.titulo}\nElementos visíveis:\n${listaElementos}\n\n---\n\n${ultima.content}`;
      mensagensParaEnviar[mensagensParaEnviar.length - 1] = { ...ultima, content: estado };
    }

    const resposta = await client.messages.create({
      model: process.env.ANTHROPIC_MODEL || "claude-sonnet-4-5-20250929",
      max_tokens: 2048,
      system,
      messages: mensagensParaEnviar,
    });

    const texto = resposta.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("\n");

    return Response.json({ texto });
  } catch (e: any) {
    console.error(e);
    return new Response(JSON.stringify({ erro: e?.message || "Erro inesperado" }), { status: 500 });
  }
}
