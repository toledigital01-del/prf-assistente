# Assistente PRF (PWA pessoal)

App próprio, instalável no celular/computador como um aplicativo (PWA), com três módulos:

- **PRF PDI** — dúvidas e apoio ao preenchimento da Parte Diária Informatizada
- **PRF Frequência** — banco de horas, folhas de frequência, afastamentos
- **PRF Acidentes de Trânsito** — apoio ao registro/análise de acidentes

A "inteligência" de cada módulo vem do conteúdo em `skills/*.md` (o mesmo conteúdo das suas skills do Claude),
enviado como instrução de sistema para a API da Anthropic a cada conversa.

## Modo 1: só chat (funciona sempre, inclusive no celular/Vercel)

- Dúvidas, cálculo, redação de texto para colar nos campos.
- Botão "Abrir sistema oficial" abre o site numa aba — login e salvamento manuais, como sempre.

## Modo 2: sessão ao vivo (precisa do `automation-server` rodando no seu PC)

Com o servidor local (pasta `automation-server/`) ligado, o módulo PDI/Frequência ganha um painel
"Sessão ao vivo": um botão abre um Chromium de verdade na sua tela, você loga nele normalmente, e a
partir daí pode pedir no chat pra ele agir na página ("inclui a viatura X"). O app te mostra exatamente
o que vai fazer e só executa depois que você clica em **Confirmar** — igual ao que acontece quando você
pede isso no chat do Claude.

O que NUNCA muda, em nenhum dos dois modos:

- CPF, senha e token de 2FA são digitados só por você, na janela real do navegador — nem o app nem o
  servidor local tocam nesses campos (o servidor recusa qualquer tentativa de preencher campo que pareça
  login/senha/token/código).
- Nenhuma ação sensível (salvar, incluir, excluir, confirmar, enviar, gravar, atualizar) roda sem você
  clicar em "Confirmar" na hora — mesmo que em algum momento você diga "pode fazer tudo sozinho", isso
  não é aceito como autorização permanente.
- O servidor local só escuta em `127.0.0.1` (a própria máquina) — nada disso fica exposto na internet.

Isso é proposital: automatizar login em sistema interno da PRF sem controle nenhum do usuário poderia
esbarrar em normas internas de segurança da informação. O jeito de ter "a mesma experiência do chat"
sem cruzar essa linha é exatamente este: navegador real, login seu, confirmação sua a cada ação.

## Rodando localmente

Pré-requisitos: Node.js 18+.

```bash
npm install
cp .env.example .env.local
# edite .env.local e cole sua ANTHROPIC_API_KEY (pegue em console.anthropic.com)
npm run dev
```

Abra http://localhost:3000 — no celular, na mesma rede, dá pra acessar por http://SEU_IP:3000 também.

### Ligando a sessão ao vivo (opcional, PDI/Frequência)

Em outro terminal, na pasta `automation-server`:

```bash
cd automation-server
npm install          # baixa as dependências e instala o Chromium do Playwright
npm start
```

Deixe essa janela aberta. Volte pro app (http://localhost:3000), abra o módulo PDI ou Frequência —
vai aparecer "🟢 Sessão ao vivo disponível" com um botão pra abrir o navegador de verdade.

> A sessão ao vivo só funciona quando o app está rodando em `http://localhost:3000` (não funciona na
> versão publicada na Vercel, porque o navegador do celular/outro PC não enxerga o servidor local do
> seu computador). No dia a dia: use a versão da Vercel no celular pra tirar dúvida rápida, e rode
> local (`npm run dev` + `automation-server`) no seu PC quando for de fato lançar algo no PDI/Frequência.

## Instalando como app (PWA)

- **Android (Chrome)**: abra o site publicado, toque no menu (⋮) → "Adicionar à tela inicial" / "Instalar app".
- **iPhone (Safari)**: abra o site, toque em Compartilhar → "Adicionar à Tela de Início".
- **Desktop (Chrome/Edge)**: ícone de instalação na barra de endereço, ou menu → "Instalar Assistente PRF".

Depois de instalado, ele abre em janela própria, com ícone próprio — sem barra de navegador, sem
menção a "Claude" em lugar nenhum da interface.

## Deploy (pra acessar de qualquer lugar, não só localhost)

O jeito mais simples, já que você trabalha com esse ecossistema, é o **Vercel**:

```bash
npm install -g vercel
vercel
```

No painel do projeto na Vercel, em *Settings → Environment Variables*, adicione:

- `ANTHROPIC_API_KEY` = sua chave da Anthropic
- `ANTHROPIC_MODEL` = (opcional) o modelo que quiser usar

Depois de deployado, o PWA é instalável a partir da URL da Vercel (ex.: `https://seu-app.vercel.app`),
com HTTPS automático (necessário para o service worker funcionar).

## Atualizando o conteúdo das skills

Sempre que você evoluir as skills `prf-pdi`, `prf-frequencia` ou `prf-acidentes-transito` no Claude,
copie o novo `SKILL.md` para dentro de `skills/` (mantendo os mesmos nomes de arquivo) e faça um novo
deploy. Não precisa mexer em nenhum outro código.

## Estrutura

```
app/
  page.tsx            -> tela inicial com os 3 módulos
  pdi/page.tsx         -> chat do módulo PDI
  frequencia/page.tsx  -> chat do módulo Frequência
  acidentes/page.tsx   -> chat do módulo Acidentes
  api/chat/route.ts    -> chama a API da Anthropic no servidor
components/Chat.tsx        -> UI de chat + propostas de ação com confirmação
components/LiveSession.tsx -> painel de status/abrir/fechar a sessão ao vivo
lib/skills.ts               -> monta o system prompt a partir dos .md (com/sem sessão ao vivo)
lib/automationClient.ts     -> fala com o automation-server local (http://127.0.0.1:4787)
skills/*.md                 -> conteúdo das suas skills (fonte de verdade)
public/manifest.json        -> configuração do PWA
public/sw.js                -> service worker (cache do app shell / instalação offline)
automation-server/           -> servidor local (Playwright) que abre o navegador de verdade
  server.js                  -> nunca preenche login; exige confirmação pra ação sensível
```

## Privacidade

- O histórico das conversas fica salvo só no navegador do seu aparelho (`localStorage`), não em nenhum
  servidor — se limpar os dados do site ou trocar de aparelho, o histórico não vai junto.
- A única informação que sai do seu aparelho é o texto da conversa, enviado direto para a API da Anthropic
  (para gerar a resposta) — nenhuma outra empresa ou serviço recebe isso.
