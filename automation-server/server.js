/**
 * Servidor local de automação (roda SÓ no seu computador, nunca na nuvem).
 *
 * O que ele faz:
 *  - Abre um Chromium DE VERDADE, visível, na sua tela.
 *  - Você mesmo loga (CPF, senha, token) nessa janela — o servidor nunca toca
 *    em campos de login/senha/token.
 *  - Depois de logado, o app (PWA) pode pedir pra "olhar" a página (snapshot de
 *    texto/botões) e propor uma ação (clicar em algo, preencher um campo).
 *  - Toda ação em botão "sensível" (Salvar, Incluir, Excluir, Confirmar, Enviar,
 *    Gravar, Atualizar) só é executada se vier com confirmed:true — e o app só
 *    manda confirmed:true depois que VOCÊ clica em "Confirmar" na conversa.
 *
 * Escuta só em 127.0.0.1 (nunca na rede) — ninguém de fora acessa isso.
 */

const express = require("express");
const cors = require("cors");
const { chromium } = require("playwright");

const PORTA = process.env.PORT || 4787;

const PALAVRAS_SENSIVEIS = [
  "salvar", "incluir", "excluir", "remover", "apagar", "confirmar",
  "enviar", "gravar", "atualizar", "finalizar", "concluir", "assinar",
  "publicar", "aprovar", "submeter",
];

const PADROES_CREDENCIAL = [
  "senha", "password", "cpf", "token", "otp", "2fa", "codigo", "código",
  "usuario", "usuário", "login", "user",
];

let browser = null;
let context = null;
let page = null;

const app = express();
app.use(cors());
app.use(express.json());

function ehAcaoSensivel(textoAlvo) {
  const t = (textoAlvo || "").toLowerCase();
  return PALAVRAS_SENSIVEIS.some((p) => t.includes(p));
}

function pareceCampoDeCredencial(descricao) {
  const t = (descricao || "").toLowerCase();
  return PADROES_CREDENCIAL.some((p) => t.includes(p));
}

app.get("/saude", (_req, res) => res.json({ ok: true }));

app.post("/sessao/iniciar", async (req, res) => {
  try {
    const { url } = req.body || {};
    if (!browser) {
      browser = await chromium.launch({ headless: false });
      context = await browser.newContext();
      page = await context.newPage();
    }
    if (url) {
      await page.goto(url, { waitUntil: "domcontentloaded" });
    }
    res.json({ ok: true, url: page.url(), titulo: await page.title() });
  } catch (e) {
    res.status(500).json({ ok: false, erro: String(e.message || e) });
  }
});

app.get("/sessao/status", async (_req, res) => {
  if (!page) return res.json({ aberta: false });
  try {
    res.json({ aberta: true, url: page.url(), titulo: await page.title() });
  } catch {
    res.json({ aberta: false });
  }
});

// "Olhar" a página: lista textos de botões/links/campos visíveis, pra IA decidir o que fazer.
// Não inclui valores de campos de senha/token (nem que existissem, o Playwright não expõe isso).
app.get("/sessao/observar", async (_req, res) => {
  if (!page) return res.status(400).json({ ok: false, erro: "Nenhuma sessão aberta." });
  try {
    const elementos = await page.evaluate(() => {
      function visivel(el) {
        const r = el.getBoundingClientRect();
        const style = window.getComputedStyle(el);
        return r.width > 0 && r.height > 0 && style.visibility !== "hidden" && style.display !== "none";
      }
      const resultado = [];
      const seletor = "button, a, input, textarea, select, [role=button]";
      document.querySelectorAll(seletor).forEach((el) => {
        if (!visivel(el)) return;
        const tipo = el.tagName.toLowerCase();
        const texto =
          el.innerText?.trim() ||
          el.getAttribute("aria-label") ||
          el.getAttribute("placeholder") ||
          el.getAttribute("name") ||
          el.value ||
          "";
        if (!texto) return;
        resultado.push({
          tipo,
          texto: texto.slice(0, 80),
          inputType: el.getAttribute("type") || null,
        });
      });
      return resultado.slice(0, 150);
    });
    res.json({ ok: true, url: page.url(), titulo: await page.title(), elementos });
  } catch (e) {
    res.status(500).json({ ok: false, erro: String(e.message || e) });
  }
});

// Executa UMA ação. type: "clicar" | "preencher" | "navegar"
app.post("/sessao/acao", async (req, res) => {
  if (!page) return res.status(400).json({ ok: false, erro: "Nenhuma sessão aberta." });
  const { type, alvo, valor, confirmed } = req.body || {};

  try {
    if (type === "navegar") {
      await page.goto(alvo, { waitUntil: "domcontentloaded" });
      return res.json({ ok: true });
    }

    if (type === "clicar") {
      if (ehAcaoSensivel(alvo) && !confirmed) {
        return res.status(412).json({
          ok: false,
          precisaConfirmacao: true,
          erro: `Ação em "${alvo}" parece sensível (salvar/incluir/excluir/etc). Peça confirmação ao usuário antes.`,
        });
      }
      const el = page.getByText(alvo, { exact: false }).first();
      await el.click({ timeout: 5000 });
      return res.json({ ok: true });
    }

    if (type === "preencher") {
      if (pareceCampoDeCredencial(alvo)) {
        return res.status(403).json({
          ok: false,
          erro: "Recusado: este servidor nunca preenche campos de login/senha/token. Faça login manualmente na janela do navegador.",
        });
      }
      const campo = page.getByLabel(alvo, { exact: false }).first();
      await campo.fill(String(valor ?? ""), { timeout: 5000 });
      return res.json({ ok: true });
    }

    return res.status(400).json({ ok: false, erro: "type inválido (use clicar, preencher ou navegar)" });
  } catch (e) {
    res.status(500).json({ ok: false, erro: String(e.message || e) });
  }
});

app.post("/sessao/fechar", async (_req, res) => {
  try {
    if (browser) await browser.close();
  } finally {
    browser = context = page = null;
  }
  res.json({ ok: true });
});

app.listen(PORTA, "127.0.0.1", () => {
  console.log(`Servidor de automação local rodando em http://127.0.0.1:${PORTA}`);
  console.log("Só aceita conexões da própria máquina. Ctrl+C para encerrar.");
});
