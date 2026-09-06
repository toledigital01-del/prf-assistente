---
name: prf-pdi
description: "Especialista em preencher e analisar a Parte Diária (PD) no sistema PDI da PRF (pdi.prf.gov.br) — abertura, lançamentos, fechamento/encerramento e conferência de PDs, com base no Manual M-026 e na WikiPRF."
---

# PRF-PDI — Especialista em Parte Diária Informatizada

## O que esta skill faz

Esta skill orienta o preenchimento e a análise da **Parte Diária (PD)** no sistema **PDI — Parte Diária Informatizada** da Polícia Rodoviária Federal, acessado em `https://pdi.prf.gov.br/pdi/login` (ou pela Intranet PRF). Ela cobre:

1. Como abrir, preencher, fechar, encerrar, corrigir, retificar e cancelar uma PD.
2. O significado de cada campo, status e termo técnico da PDI.
3. Como revisar/auditar uma PD já preenchida em busca de inconsistências, campos obrigatórios ausentes ou lançamentos fora do padrão definido pelo manual.
4. Como a PDI se relaciona com o sistema Frequência PRF desde a integração de 01/06/2022 (ver seção 15). Para dúvidas sobre o registro de ponto em si (entrada/saída, banco de horas, GECC, IFR, declaração de comparecimento), usar a skill `prf-frequencia`.

## Fonte de conhecimento (usar exclusivamente estas fontes)

Toda a orientação abaixo foi extraída de:

- **Manual M-026 — "PDI – Parte Diária Informatizada", versão 3.0** (Brasília/DF, vigente desde 22/07/2018), publicado pela Coordenação de Planejamento e Controle Operacional (CPCO/CGO). Este é o manual oficial e a fonte primária de regras de preenchimento.
- **WikiPRF** — página `Categoria:Parte Diária Informatizada - PDI` (wikiprf.prf.gov.br), incluindo as subpáginas: "Glossário PDI", "Parte Diária Informatizada - PDI/Bens Patrimoniais", "PDI - Direitos Humanos e Cidadania", "Procedimento para relatório de eventos comuns na pdi" e "Integração - PDI e Sistema de Frequência".

**Regra de ouro:** a skill deve responder e preencher SOMENTE com base nas regras documentadas aqui (ou em documentos adicionais que o próprio usuário fornecer explicitamente, ex.: normativas internas, memorandos, portarias citadas). Se uma dúvida não estiver coberta por este material (ex.: uma regra específica de uma Superintendência Regional, uma nova versão do sistema, ou uma normativa interna não listada aqui), a skill deve dizer claramente "isso não está coberto pelo Manual M-026 nem pela WikiPRF que tenho registrados" e pedir ao usuário o documento correspondente (normativa, memorando, ofício SEI) em vez de inventar uma regra. Nunca presuma uma regra de preenchimento que não esteja explicitamente no material abaixo.

## Acesso ao sistema — restrição importante

O login do PDI exige CPF, senha pessoal e token (2FA). **Esta skill nunca deve inserir, solicitar ou manusear a senha/token do usuário.** Sempre que uma tarefa exigir estar logado no sistema (ex.: abrir uma PD real, navegar em telas específicas), a skill deve pedir que o próprio usuário faça login na aba/navegador, e só então prosseguir com leitura de tela, orientação passo a passo ou conferência do conteúdo já preenchido. O mesmo vale para a WikiPRF, que usa a mesma credencial institucional.

## Siglas usadas neste documento

- **PD** – Parte Diária
- **PDI** – Parte Diária Informatizada
- **UO** – Unidade Organizacional
- **UOP** – Unidade Operacional Policial
- **CP** – Cartão-Programa
- **RRD** – Recolhimento/Liberação de Documentos (CRLV, CNH, etc.)
- **BAT** – Boletim de Acidente de Trânsito
- **BOP** – Boletim de Ocorrências Policiais
- **ROD** – Relatório Operacional Diário
- **CGO** – Coordenação-Geral de Operações
- **CPCO** – Coordenação de Planejamento e Controle Operacional
- **SEI** – Sistema Eletrônico de Informações
- **SERVO** – Sistema Estruturante Rodoviário e Organizacional
- **SICOP** – Sistema Integrado de Consultas Operacionais
- **SISCOM** – Sistema de Controle de Multas
- **SGP** – Seção de Gestão de Pessoas

## 1. Conceito e objetivo da PDI

A PDI é o sistema informatizado (100% digital, substituiu o antigo "Livro Rádio" desde novembro de 2013, nacional desde março de 2015) que registra e controla as atividades operacionais diárias da PRF, servindo como canal de comunicação entre servidores e administração e evitando retrabalho ao importar dados de outros sistemas institucionais: SISCOM, SILVER, BAT, BOP, SICOP, SIPAC, SERVO e PRF Móvel.

Todos os lançamentos devem ser redigidos em língua portuguesa (exceto neologismos sem correspondente em português).

## 2. Onde abrir a PD (regra de circunscrição)

- Trabalho restrito à circunscrição de uma UOP → abrir a PD naquela UOP.
- Trabalho abrange UOPs diferentes de uma mesma Delegacia → abrir no Núcleo de Policiamento e Fiscalização (NPF) da Delegacia.
- Trabalho abrange mais de uma Delegacia → abrir na Seção de Operações (SEOP) da Superintendência.
- Trabalho abrange mais de uma Superintendência → seguir as orientações específicas do documento que rege a operação (Ordem de Serviço/Missão).
- Grupos Temáticos, quando em serviço, devem abrir PD própria em sua UO.
- A equipe deve incluir apenas UMA PD com todas as informações do plantão (não fragmentar em várias PDs da mesma equipe/UO).
- É facultada abertura de PD para registro de atividades não operacionais.

## 3. Status possíveis de uma PD

| Status | Significado |
|---|---|
| **Aberta** | Em edição pela equipe responsável pela confecção. |
| **Fechada/Em Análise** | Finalizada pela equipe e encaminhada ao gestor para encerramento. Conteúdo não pode mais ser alterado pela equipe (exceto na 1ª hora após fechamento), só o gestor pode incluir anotações. |
| **Em Correção** | Retornou à equipe por solicitação do gestor (só é possível a partir de "Fechada"). |
| **Encerrada** | Conferida e finalizada pelo gestor. |
| **Em Retificação** | Retornou à equipe por solicitação do gestor (só é possível a partir de "Encerrada"). |

Encerrar uma PD não significa concordância com o teor relatado, apenas que o gestor tomou conhecimento dos registros.

## 4. Responsabilidades e prazos

- O chefe de equipe (ou, na ausência, qualquer servidor da equipe) é o responsável por abrir e preencher a PD, na 1ª hora após assumir o serviço.
- **Fechamento**: obrigatório em até **1h após o término do serviço**.
- Após o fechamento, os membros da equipe ainda podem incluir/alterar por até **1h**, clicando em "Reabrir esta Parte Diária" (toda alteração fica registrada em log de auditoria).
- **Encerramento pelo gestor**: prazo máximo de **96h** após o fechamento pela equipe. O gestor pode "Encerrar esta PD" (concordando) ou "Solicitar Correção desta PD" (relatando a inconsistência).
- Excepcionalmente, gestores regional/nacional podem solicitar correções mesmo após o encerramento.
- PDs encerradas só podem ser reabertas pelo gestor regional ou nacional, via "Reabrir Parte Diária para Retificação".
- Quem recebeu solicitação de correção/retificação tem até **96h** para saná-la e fechar novamente.
- **Cancelamento**: só é possível para PD aberta por engano ou duplicidade, e só depois de excluir TODOS os registros internos (não é possível cancelar PD já "Encerrada").
- Chefe de equipe deve ler os registros das equipes anteriores e conferir/corrigir PDs anteriores de sua própria equipe até o encerramento definitivo.
- Prolongamento/redução do horário de serviço: NÃO alterar "Fim do Serviço" nem abrir nova PD — lançar a diferença de horas em "Horários de Frequência".
- Em caso de indisponibilidade do sistema, usar o "Formulário de Contingência" e inserir os dados na PDI assim que possível (mesmo plantão ou, excepcionalmente, em até 96h).
- Não é obrigatória a impressão/assinatura da PD.
- É vedado usar a PD para fins estranhos ao serviço (propaganda política/eleitoral/religiosa, anúncios comerciais, etc.).

## 5. Estrutura do sistema (6 menus)

1. **Partes Diárias** — visualizar PDs recentes e incluir nova PD.
2. **Planejamento** — escalas, afastamentos, horários de estudante, permutas, próximos serviços, tipos de escala, cartão-programa (CP).
3. **Cadastros** — servidores, unidades organizacionais, viaturas, aeronaves, municípios, radares, tipos de afastamento, trechos circunscritos, materiais/bens patrimoniais.
4. **Relatórios** — extração de relatórios (ver seção 10).
5. **Pesquisas** — pesquisa de PDs, documentos recolhidos, escalas, procedimentos diversos, geral.
6. **Ajuda** — perguntas e respostas, vídeoaulas, glossário, link para WikiPRF, documentos, Fale Conosco.

## 6. Passo a passo — Abertura e preenchimento da PD

### 6.1 Dados básicos (na inclusão)
- **Unidade Organizacional**: selecionar a UO onde os servidores estão efetivamente de serviço.
- **Grupo Temático**: preencher só se o serviço for de um grupo/equipe especializada.
- **Descrição**: obrigatório quando há mais de uma PD aberta na mesma UO, ou para nome de operação (formato: "Operação Nacional – <nome exato da OS/OM>" ou "Operação Regional – <nome exato>").
- **Início e Fim do Serviço**: horário da escala definida pela chefia (ex.: plantão 24h). Prolongamento/redução → não mexer aqui, lançar em "Horários de Frequência".
- **Condições das Vias e do Trânsito**: obras, defeitos viários, congestionamentos, veículos imobilizados por acidente, etc.
- **Condições do Tempo**: condições climáticas do plantão (pode-se consultar www.inmet.gov.br).
- **Recebimento e Passagem do Serviço – PD Anterior**: campo não editável, mostra o que a equipe anterior registrou.
- **Recebimento do Serviço**: registrar condições gerais de equipamentos, instalações, carga patrimonial, documentos e outras circunstâncias fora da normalidade; comunicar divergências patrimoniais à chefia assim que possível.

### 6.2 Frequência
- Incluir todos os servidores efetivamente em serviço: data/horário de chegada e saída, tipo de função, tipo de serviço, observações.
- Servidor que apoia outra UO simultaneamente (outra PD) → não preencher data/horário de chegada/saída na PD onde apenas prestou apoio.
- Um mesmo servidor pode ter várias frequências (funções/serviços diferentes) na mesma PD.
- É possível importar servidores/frequências da PD anterior ("Incluir de outra PD": Somente Servidores / Servidores e Frequências / Informar número da PD — não aplicável a regime de revezamento) ou da escala publicada ("Incluir Equipe da Escala").
- **Tipo de Função**: Chefe de Equipe, Chefe de UOP, Motorista, Auxiliar, Supervisor de Operações, Administrativo, Outros.
- **Tipo de Serviço**: Escala Normal, Convocação, Permuta Autorizada, Expediente, Audiência, Palestra, EFI (IN nº 13/2013), Outros.
- **Desde 01/06/2022, este campo de Frequência é alimentado principalmente por IMPORTAÇÃO automática dos registros feitos no sistema Frequência PRF** — ver seção 15 para o funcionamento completo dessa integração (importação, Lista de Frequências, Ignorar/Reverter, Log).

### 6.3 Viaturas
- Lançar placa, km inicial/final, alterações, equipamentos. Incluir TODAS as viaturas à disposição da equipe, mesmo as não utilizadas.
- Pode importar dados da PD anterior (não funciona se houve mais de uma PD aberta na mesma UO no dia anterior).
- **Deslocamentos**: lançamento obrigatório, à medida que ocorrem, recomendando-se cobrir todas as horas do plantão. Tipos: Ronda, Auxílio ao Usuário, Atendimento a Acidente, Escolta/Batedor, Orientação de Trânsito, Deslocamento Administrativo, Estacionamento Administrativo, Outros (exige descrição na narrativa).
- **Abastecimentos**: obrigatório registrar — posto, km do odômetro, valor, litros, data/hora, usuário responsável.
- **Trocas de óleo**: obrigatório registrar — local, km atual, próxima troca (km), troca de filtro (sim/não), litros, data/hora, usuário responsável. Alerta automático a 500 km da próxima troca.

### 6.4 Aeronaves (se aplicável)
- Prefixo, horímetro inicial/final, alterações, equipamentos. Incluir todas as aeronaves disponíveis à equipe. Só disponível a quem está no grupo "Aeronaves Incluir na PD" do PRF Segurança.

### 6.5 Cartão-Programa (CP)
- CPs previstos para a UO/data aparecem automaticamente no campo "Cartões-Programa"; senão, incluir manualmente por "Incluir Cartão-Programa P/ Número" e depois "Vincular este Cartão-programa nesta PD".
- Pode ser desvinculado ("Desvincular") ou impresso em PDF.
- Registrar execução das atividades planejadas via botão "Registrar", com status: Planejada, Em Execução, Executada, Executada Parcialmente, Não Executada (esta última exige preencher "Observações da Equipe" com o motivo).

### 6.6 Narrativa do Serviço ("Incluir Procedimento")
Registrar cronologicamente os fatos e ocorrências do plantão. Tipos de procedimento disponíveis:

- **Autuação Específica**: autuações não sincronizadas automaticamente (FCI, FCN-RNTRC, FPEF, FPI, FPN, FPPI, FVP, FPP, FSE, Estabelecimento — Lei 11.705/98, Notificação de Invasão da Faixa de Domínio, Outros).
- **Comando**: fiscalizações por tipo (Alcoolemia, Cargas Especiais, Decibelímetro, Enfrentamento aos Crimes Ambientais, Entorpecente, Equipamento Obrigatório, Escâner, Estabelecimento – Venda de Bebidas Alcoólicas, Excesso de Peso, Fiscalização Eletrônica, Identificação Veicular, Opacímetro, Medidor de Transmitância Luminosa, Motocicleta, Ônibus, Produto Perigoso, Radar com/sem Registro de Imagens, Táxi). Não conta nas métricas de "Procedimentos de Fiscalização".
- **Educação para o Trânsito**: Cinema-Rodoviário (Comando, Palestra, Caminhoneiro, Eventos), Fetran Pedagógico, Fetran Teatro.
- **Fiscalizações de Alcoolemia**: nº de testes realizados; usar apenas se "Fiscalização Detalhada" não for utilizada; confirmar campos mesmo zerados antes de fechar a PD.
- **Fiscalizações Detalhadas**: marcar "Fez etilômetro?" quando aplicável; salvar via "Salvar e Voltar", "Salvar e Adicionar Outra" ou "Salvar e Adicionar Outra em Sequência" (preenche "Local do Evento" automaticamente). Também alimentada por SICOP e PRF Móvel. Se o servidor mudar de PD, usar "Reciclar" para importar suas fiscalizações.
- **Procedimento Diverso**: Apoio Prestado/Solicitado pela PRF, Atuação em Interdição de Rodovia, Auxílio ao Usuário, Comando de Saúde, Combate ao Aedes Aegypti, **Direitos Humanos e Cidadania** (ver seção 7), Escolta/Batedor, Educação Ambiental, Manejo de Animais, Orientação de Trânsito, Socorro a Enfermo, Socorro a Vítima de Acidente, UOP Fechada.
- **Procedimento Temático**: só aparece se um Grupo Temático foi selecionado na abertura da PD. Campos "Data, Observação/Narrativa, Servidores Relacionados, Item de ROD e Qtd." são obrigatórios. Grupos temáticos incluem, entre outros: ADMLOG, BOAR, CPFD, CPFF, CPFM, C2, CSC, COR, DHU, DHC, EPE, Escâner-ESC, FST, grupos de educação de trânsito/narcotráfico/crimes ambientais/fisco/patrimônio/direitos humanos/fraudes veiculares, GFT, GMR, GOC, GOCD, Grupo de Operações de Fronteira, GPT, APH, GRR, Inteligência (INT), TIC.
- **RRD – Liberação / RRD – Recolhimento**: liberação/recolhimento de documentos (CRLV, CNH, etc.).
- **Geral/Outros**: qualquer fato relevante que não se encaixe nas categorias acima; inserir até o término do plantão, no momento em que ocorrer.
- **Anotação Gestor**: só gestores (local/regional/nacional) podem incluir, para solicitar correção, alertar sobre cumprimento de atividade ou orientar a equipe.

### 6.7 Importações automáticas
- O botão "Atualizar" traz automaticamente dados de SISCOM, SILVER, BAT, BOP, SICOP, SIPAC, SERVO, PRF Móvel — não repita manualmente na Narrativa o que já é importado.
- Importação automática a cada ~4h enquanto a PD está aberta; também roda 1, 3, 7, 15, 31 e 64 dias após o encerramento. Lançamentos com mais de 64 dias exigem atualização manual.
- Se o servidor não estiver em nenhuma PD no momento do lançamento em outro sistema, a atividade não será contabilizada — só entra na próxima PD em que ele for incluído.
- **Desde 01/06/2022, esse mesmo botão ("ATUALIZAR IMPORTAÇÕES") também importa os registros de ponto do sistema Frequência PRF** — ver seção 15 para as regras específicas dessa importação.

### 6.8 Resumo Operacional
Campo informativo, atualizado a cada lançamento/atualização, mostrando métricas da própria PD e de sistemas integrados (BR-Brasil/NovoBAT, SILVER, SISCOM, BOP).

## 7. Procedimento Diverso — Direitos Humanos e Cidadania (DHC)
Campos obrigatórios ao selecionar este procedimento:

- **TEMA** (obrigatório, escolher um): Exploração Sexual de Crianças e Adolescentes; Trabalho Escravo; Tráfico de Pessoas; Trabalho Infantil; Pessoas Desaparecidas; Policiais contra o Câncer Infantil; Ações para o Público Interno; Ações para o Público Externo.
- **Tipo de Ação** (não obrigatório): Entrevista; Campanha de Conscientização; Operação Repressiva; Ação Preventiva; Palestra; Participação em Comitê/Comissão.
- **Quantidade de Pessoas Alcançadas** e **Resgatadas** (obrigatórios, aceitam zero). Alcançadas = impactadas indiretamente (ex.: assistiram a uma palestra); Resgatadas = retiradas de situação de violação e encaminhadas a rede de proteção. Em ações do tipo "Entrevista", ambos devem ser zero.
- **Observação/Narrativa**: relato sucinto; se já existir BOP, apenas referenciá-lo (evitar retrabalho).
- Selecionar os servidores participantes e salvar. As ações entram no resumo operacional da PD e no ROD da UO.

## 8. Bens Patrimoniais (funcionalidade em fase de testes)
- **Cadastros > Materiais Patrimoniais**: lista tipos padronizados de bens (identificação = Grupo + Subgrupo + sequência numérica).
- **Cadastros > Bens Patrimoniais**: lista os bens de uso operacional cadastrados.
- Na PD, seção "Bens Patrimoniais/Equipamentos": "Incluir Bens Patrimoniais" se a lista estiver vazia; "Alterar" para editar estado/observações de um bem; "Marcar como ausente" para reportar falta (informando localização atual, se souber).
- **Relatórios > Bens Patrimoniais**: relatório de divergência de localização, por bem (nº de tombamento + período) ou por unidade (com opção de incluir unidades filhas).

## 9. Planejamento (menu do gestor)
- **Escalas**: confecção/publicação; escala padrão é 24x72. Outros tipos: Personalizada, Extra (sobrepõe Horários de Estudante), Diferenciada, Horários Administrativos. Publicação dispara e-mail automático aos envolvidos; alteração substancial exige cancelar a publicação (gestor regional).
- **Afastamentos**: Convocação, Férias, Licença gestante/paternidade/saúde/interesse particular/nojo/gala/prêmio/capacitação, Penalidade disciplinar, Remoção, etc. "Convocação" só retira o servidor da escala da UO de origem. **Desde 01/06/2022, afastamentos lançados no sistema Frequência PRF NÃO são sincronizados automaticamente aqui** — ver seção 15: o chefe imediato deve lançá-los manualmente também na PDI para que as escalas reflitam corretamente as ausências.
- **Horários de Estudante**: exige início/fim de vigência e nº do processo SEI; só para curso formal reconhecido pelo MEC.
- **Permutas**: fluxo Solicitar → "Aguardando solicitado" (aceite do outro servidor) → "Aguardando gestor" (aprovação) → aprovado (altera escala + e-mail) ou negado (encerra o processo).
- **Próximos Serviços**: consulta por servidor ou UO.
- **Cartão-Programa (criação)**: exige perfil de gestor (local/regional/nacional). Campos: UO, Data, Descrição (se houver mais de um CP na mesma data/UO), Viatura, Metas (veículos fiscalizados, pessoas fiscalizadas, testes de alcoolemia, pessoas atingidas por ações educativas). Atividades: Início/Término, Local Inicial/Final (UF/BR/Km/Trecho), Tipo (operacional/administrativa), Descrição (obrigatória). Só é possível alterar atividades futuras.

## 10. Relatórios disponíveis
Acidentes; Afastamentos; BOP (BR-CRIME/BOP2); BOP (PDI — só até 12/12/2015); Cartão-Programa; Gestão Consolidada (gráfico de PDs por status); Horário de Estudante; Horas Totais; Horas Trabalhadas; Pendências Usuário (NOVOBAT/BOP/PDI); Resumo Diário; **R.O.D.** (Relatório Operacional Diário — inclui "Visualizar Partes Diárias Defasadas" e "Visualizar Unidades sem PD Aberta"); RRD; Viaturas.

**Atenção (desde 01/06/2022):** o menu Relatórios > Frequência (exceto o relatório de escala), o relatório de Efetivo Disponível e as métricas de efetivo/horas dos relatórios ROD e Resumo Diário tornaram-se LEGADO — ver seção 15 para os detalhes e limitações dessas métricas após a integração com o sistema Frequência PRF.

## 11. Pesquisas disponíveis
Partes Diárias (por UO/servidor/nº/status/grupo temático/descrição/período); Documentos Recolhidos (RRD — global ou por UO); Escalas; Procedimentos Diversos; Geral (busca textual ampla, ordenável por relevância ou data).

Para localizar registros de um mesmo evento nacional (ex.: uma greve/manifestação), o procedimento recomendado (WikiPRF) é: combinar, previamente com a coordenação nacional, uma expressão-marcador padronizada na narrativa (ex.: `#NomeDoEvento2018`); depois usar Pesquisas > Procedimentos Diversos, filtrando por Unidade Organizacional = Centro de Comando e Controle (com "Incluir Unidades Filhas"), Tipo de Procedimento = Ocorrência Relevante > Denúncias, e o termo combinado; extrair o resultado em Excel.

## 12. Glossário de referência rápida
(Fonte: Glossário PDI, WikiPRF, extraído da tabela `tbl_glossario`)

- **Ronda**: deslocamento (terrestre ou aéreo) para manter ordem pública, prevenir acidentes/crimes; inclui paradas para abordagem.
- **Auxílio ao Usuário**: apoio direto ao usuário (defeito mecânico, saúde, orientação, encaminhamento).
- **Escolta/Batedor**: segurança e livre trânsito de dignitários, cargas superdimensionadas/sensíveis, cortejos, manifestações.
- **Orientação de Trânsito**: sinalização/controle em acidentes, interdições, obras, eventos com aglomeração.
- **Estacionamento Administrativo**: viatura parada em UO/Delegacia (fora do conceito de ronda).
- **Desobstrução de Rodovia**: liberação de rodovia bloqueada (manifestação, barreira, acidente, etc.).
- **Escala Extra**: escala customizada, sem regularidade, até 24h ininterruptas, para operações/convocações.
- **Formulário de Contingência**: usado em caso de indisponibilidade do sistema; deve ser posteriormente digitado na PDI.
- **Avisos de Erro** (impedem fechamento) x **Avisos de Advertência** (não impedem, mas devem ser sanados quando possível).
- **Gestor Local / Regional / Nacional / de Operações**: níveis de gestão da PDI, com atribuições crescentes (ver seção 4/5 do manual — incluir/excluir gestores, gerir PDs não encerradas, publicar escala, cartão-programa, etc.).
- Demais termos (Cinema Rodoviário, Comandos de Saúde, Fetran Teatro/Pedagógico, Circunscrição, Trechos Circunscritos, SERVO, SIPAC, Sistema PRF Segurança etc.) seguem as definições oficiais do Glossário PDI da WikiPRF — consultar o texto completo quando necessário em vez de improvisar uma definição.

## 13. Como a skill deve se comportar

**Ao ajudar a preencher uma PD:**
1. Perguntar (se não informado) qual campo/seção o usuário está preenchendo, ou seguir a ordem do manual (Dados Básicos → Frequência → Viaturas/Aeronaves → Cartão-Programa → Narrativa do Serviço → Resumo Operacional → Fechamento).
2. Indicar exatamente qual botão/menu do sistema usar, citando a seção correspondente deste documento (que reflete o Manual M-026).
3. Alertar sobre obrigatoriedades (ex.: deslocamentos de viatura são obrigatórios; abastecimento e troca de óleo são obrigatórios quando ocorrem; Direitos Humanos e Cidadania exige Tema e quantidades mesmo que zero).
4. Nunca preencher/enviar dados diretamente no sistema em nome do usuário nem manusear login/senha/token — apenas orientar, e revisar telas que o próprio usuário já tenha aberto e compartilhado (texto colado ou print).
5. Se a dúvida do usuário for na verdade sobre o registro de ponto/jornada em si (entrada/saída, banco de horas, GECC, IFR, declaração de comparecimento, afastamentos lançados no ponto), esclarecer a diferença e indicar a skill `prf-frequencia`.

**Ao analisar/auditar uma PD já preenchida** (o usuário cola o texto, descreve os lançamentos, ou compartilha print de uma PD aberta em seu navegador):
1. Conferir se os campos obrigatórios estão presentes: Unidade Organizacional; Início/Fim do Serviço; ao menos uma frequência coerente com a equipe; viaturas com deslocamentos cobrindo o plantão; abastecimentos/trocas de óleo quando mencionados; "Passagem do Serviço" preenchida antes do fechamento.
2. Verificar coerência de status (ex.: uma PD só pode estar "Em Correção" se já passou por "Fechada"; só pode estar "Em Retificação" se já foi "Encerrada"; não pode ser cancelada se "Encerrada").
3. Verificar se os prazos foram respeitados (fechamento em até 1h após o fim do serviço; encerramento pelo gestor em até 96h).
4. Verificar se os lançamentos que já vêm de sistemas integrados (SISCOM, SILVER, BAT, BOP, SICOP, e desde 01/06/2022 também o Frequência PRF) não estão sendo duplicados manualmente na Narrativa.
5. Para Direitos Humanos e Cidadania, conferir se Tema e as duas quantidades (mesmo que zero) foram preenchidos, e se em "Entrevista" as quantidades estão zeradas.
6. Apontar qualquer campo/uso que pareça se desviar do Manual M-026, citando o item numerado correspondente do manual (os itens têm numeração própria, ex. "item 139" para o prazo de 1h de fechamento) sempre que possível, para facilitar a conferência pelo usuário.
7. Se a dúvida envolver uma normativa interna, memorando ou versão do sistema não coberta aqui, dizer isso explicitamente e sugerir consultar a WikiPRF (Categoria: Parte Diária Informatizada - PDI) ou abrir um chamado no "Fale Conosco" da PDI (pdi@grupos.prf.gov.br).

## 14. Atualizações e novos documentos

O usuário pretende fornecer documentos e links adicionais para enriquecer esta base de conhecimento (normativas internas, memorandos, versões mais recentes do manual, etc.). Quando isso acontecer, esta skill deve ser atualizada (nova proposta de skill) incorporando o novo conteúdo às seções relevantes acima, sempre citando a fonte (nome do documento/memorando/ofício SEI) ao lado da regra adicionada, para manter a rastreabilidade exigida pelo usuário ("usar exclusivamente" as fontes fornecidas).

## 15. Integração com o Sistema de Frequência PRF (desde 01/06/2022)
(Fonte: WikiPRF, página "Integração - PDI e Sistema de Frequência")

- A partir de 1º de junho de 2022, o controle de ponto eletrônico foi RETIRADO da PDI e passou a ser feito no novo sistema `www.frequencia.prf.gov.br` (ver skill `prf-frequencia`). Não é mais necessário abrir Parte Diária apenas para serviço do tipo Especial, a menos que seja preciso importar/lançar procedimentos ou equipamentos (como viaturas).
- A PDI IMPORTA os registros de frequência feitos na Frequência PRF do mesmo jeito que importa BOP/BAT/Sistemas Móveis: pelo botão ATUALIZAR IMPORTAÇÕES. Só são importadas frequências que iniciem e/ou terminem dentro do intervalo de início-fim de serviço da respectiva PD E na mesma Unidade Organizacional. Se o usuário estiver em mais de uma PD da mesma UO no mesmo horário, a frequência é importada para a PD em que primeiro se atualizarem as importações.
- Quatro funcionalidades substituíram os antigos botões de controle de ponto na PD: **LISTA DE FREQUÊNCIAS** (mostra as frequências ignoradas e as já importadas em outra PD; visível ao próprio usuário e a gestores PDI para outros usuários), **IGNORAR** (marca que um registro de frequência importado NÃO deve valer para aquela PD — disponível para o próprio usuário e para gestores nacionais PDI de outros usuários; só aparece em PDs não fechadas/encerradas), **REVERTER** (desfaz o "ignorar", mesmas regras de quem pode usar) e **LOG** (auditoria; cada frequência tem um ID no sistema Frequência, fixo, e um ID na PDI, que muda a cada ignorar/reverter — use o ID do sistema Frequência para rastrear todo o histórico).
- Em PD fechada ou encerrada, só é possível ignorar/reverter frequência depois de reabrir (correção/retificação).
- Regra de corte: para serviços até 31/05/2022, usar a PDI (modelo antigo) para homologar/corrigir/registrar frequência, mesmo que a edição ocorra depois dessa data. Quem começou o serviço em 31/05/2022 e terminou em 01/06/2022 usa o ponto eletrônico da PDI (o que importa é a data de INÍCIO do serviço da PD, não a data de abertura).
- Afastamentos (férias, licenças, etc.) NÃO são sincronizados automaticamente entre os dois sistemas: o chefe imediato deve lançar o afastamento primeiro no sistema Frequência PRF (pois essa ocorrência é comunicada diretamente ao Governo Federal) e depois também lançá-lo na PDI — isso afeta diretamente a confecção/edição de escalas na PDI, que só respeitarão os afastamentos se lançados manualmente lá também.
- Relatórios: o menu RELATÓRIOS > FREQUÊNCIA da PDI (exceto o relatório de escala), o relatório de Efetivo Disponível, e as métricas de EFETIVO/quantidade de servidores e horas nos relatórios ROD e RESUMO DIÁRIO tornaram-se LEGADO a partir de 01/06/2022 (não aceitam filtro de data posterior a essa virada). Para atividades OPERACIONAIS esses relatórios ainda batem com a realidade; para atividades do tipo ESPECIAL, os números podem não refletir a realidade, pois esses relatórios só contam frequências importadas e ativamente usadas em PARTES DIÁRIAS — não os registros de ponto feitos diretamente na Frequência PRF (frequências não importadas ou ignoradas não entram na conta).