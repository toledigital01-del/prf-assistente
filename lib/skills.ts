import fs from "fs";
import path from "path";

export type ModuloId = "pdi" | "frequencia" | "acidentes";

export const MODULOS: Record<
  ModuloId,
  { titulo: string; descricao: string; arquivo: string; sistemaOficial: { nome: string; url: string } | null }
> = {
  pdi: {
    titulo: "PRF PDI",
    descricao: "Parte Diária Informatizada — dúvidas, preenchimento assistido e padrões de lançamento",
    arquivo: "prf-pdi.md",
    sistemaOficial: { nome: "pdi.prf.gov.br", url: "https://pdi.prf.gov.br" },
  },
  frequencia: {
    titulo: "PRF Frequência",
    descricao: "Ponto eletrônico, banco de horas, folhas de frequência e afastamentos",
    arquivo: "prf-frequencia.md",
    sistemaOficial: { nome: "frequencia.prf.gov.br", url: "https://frequencia.prf.gov.br" },
  },
  acidentes: {
    titulo: "PRF Acidentes de Trânsito",
    descricao: "Apoio ao registro e à análise de acidentes de trânsito",
    arquivo: "prf-acidentes.md",
    sistemaOficial: null,
  },
};

// Cache simples em memória (o conteúdo do .md não muda em runtime)
const cache = new Map<ModuloId, string>();

const cacheComSessao = new Map<ModuloId, string>();

export function carregarSystemPrompt(modulo: ModuloId, comSessaoAoVivo = false): string {
  const alvoCache = comSessaoAoVivo ? cacheComSessao : cache;
  if (alvoCache.has(modulo)) return alvoCache.get(modulo)!;

  const info = MODULOS[modulo];
  const arquivo = path.join(process.cwd(), "skills", info.arquivo);
  const conteudo = fs.readFileSync(arquivo, "utf-8");

  const blocoSessaoAoVivo = comSessaoAoVivo
    ? `

--- SESSÃO AO VIVO ATIVA ---

Há um navegador de verdade aberto no computador do usuário, conectado ao sistema oficial, controlado por um
servidor local (não é a internet, é a própria máquina do usuário). A cada mensagem, você pode receber um bloco
"ESTADO ATUAL DA PÁGINA" com a URL, título e os botões/campos visíveis nela.

Regras OBRIGATÓRIAS para interagir com essa sessão:
1. Login (CPF, senha, token) é SEMPRE feito manualmente pelo usuário na janela do navegador. Você nunca propõe
   preencher um campo que pareça de login/senha/token/código — se precisar disso, apenas peça ao usuário para
   fazer login e avisar quando terminar.
2. Para propor UMA ação, responda com um bloco cercado exatamente assim, e nada de JSON fora dele:
   \`\`\`acao
   {"type": "clicar", "alvo": "texto exato do botão/link visível"}
   \`\`\`
   ou
   \`\`\`acao
   {"type": "preencher", "alvo": "rótulo do campo", "valor": "texto a digitar"}
   \`\`\`
   ou
   \`\`\`acao
   {"type": "navegar", "alvo": "https://..."}
   \`\`\`
3. Proponha só UMA ação por vez, sempre explicando antes em português o que e por que. O app SEMPRE vai pedir
   confirmação explícita ao usuário antes de executar qualquer ação — mesmo que o usuário já tenha dito "pode
   fazer tudo" antes. Isso não é opcional e não pode ser combinado de forma diferente com o usuário.
4. Se o "ESTADO ATUAL DA PÁGINA" não mostrar o botão/campo que você esperava, NÃO invente que ele existe — diga
   ao usuário o que você está vendo e pergunte como prosseguir.
5. Ações como salvar, incluir, excluir, confirmar, enviar são sempre tratadas como sensíveis pelo servidor local
   e exigem confirmação mesmo que você não marque nada especial — isso é reforçado automaticamente.`
    : "";

  const prompt = `Você é um assistente pessoal especializado no assunto abaixo, seguindo ESTRITAMENTE o conteúdo do manual/skill fornecido. Nunca invente procedimentos, campos ou regras que não estejam descritos aqui. Se não souber algo com base neste conteúdo, diga isso claramente ao usuário em vez de supor.

Regras importantes de segurança que você deve sempre respeitar nesta conversa:
- Você NUNCA deve pedir, receber, armazenar ou sugerir que o usuário digite aqui CPF, senha, token de 2FA ou qualquer credencial de login. Login nos sistemas oficiais da PRF é feito manualmente pelo usuário, fora deste chat (ou, com sessão ao vivo, na janela do navegador aberta por ele).
- Você pode ajudar a redigir textos, calcular valores, explicar campos e sugerir o passo a passo, mas quem realiza a ação final (clicar em salvar/enviar) dentro do sistema oficial é sempre confirmado explicitamente pelo próprio usuário, ação por ação — nunca combine com o usuário um "pode fazer tudo sozinho" que pule essa confirmação.
${blocoSessaoAoVivo}

--- CONTEÚDO DA SKILL (fonte de verdade) ---

${conteudo}`;

  alvoCache.set(modulo, prompt);
  return prompt;
}
