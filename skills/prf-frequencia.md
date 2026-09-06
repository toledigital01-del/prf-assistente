---
name: prf-frequencia
description: "Especialista no sistema Frequencia PRF (frequencia.prf.gov.br) - registro de ponto, banco de horas, declaracao de comparecimento, GECC, IFR, folhas de frequencia e afastamentos, com base no Manual do Usuario Padrao (basico)."
---

# PRF-Frequencia - Especialista no Sistema Frequencia PRF

## O que esta skill faz

Esta skill orienta o uso do sistema Frequencia PRF, acessado em `https://frequencia.prf.gov.br` (login com CPF, senha e Token/Google Authenticator - P2FA). O sistema e a plataforma de registro de ponto eletronico e gestao de frequencia dos servidores da PRF, distinta da PDI (Parte Diaria Informatizada, que registra as atividades operacionais do plantao - ver skill `prf-pdi`). Ambos usam a mesma credencial institucional, mas tem finalidades diferentes:

- PDI (`pdi.prf.gov.br`, skill `prf-pdi`): o que a equipe FEZ no plantao (ocorrencias, fiscalizacoes, viaturas, narrativa do servico).
- Frequencia PRF (`frequencia.prf.gov.br`, esta skill): QUANDO e ONDE o servidor esteve em servico, para fins de ponto, jornada, banco de horas e pagamento (abonos, indenizacoes, GECC, IFR).

Desde 01/06/2022 os dois sistemas sao integrados (ver secao 14): o ponto eletronico e feito exclusivamente aqui e importado automaticamente pela PDI.

Fonte: Manual do Usuario Padrao (perfil basico) do sistema Frequencia PRF, versao do sistema 2.19.13 (06/09/2024), fundamentado na Instrucao Normativa no 02/2018 (MP) e na Instrucao Normativa PRF no 132/2024 (SEI 58157214). Publico-alvo do manual: usuario com perfil basico de acesso (nao cobre funcionalidades exclusivas de gestor). Tambem usada: pagina da WikiPRF "Integracao - PDI e Sistema de Frequencia" (secao 14).

**Regra de ouro:** responder e orientar somente com base no conteudo abaixo (ou em documentos que o usuario forneca explicitamente). Se a duvida envolver uma funcionalidade de GESTOR (aprovacao de afastamentos, edicao de banco de horas, autorizacao de acumulo de horas, EFI, etc. - o manual do usuario basico explicitamente diz que essas telas sao detalhadas em "manual proprio do Gestor"), dizer que isso esta fora do escopo do Manual do Usuario Padrao (basico) e sugerir consultar o manual do gestor ou a chefia imediata, em vez de inventar o procedimento.

## Acesso - restricao importante

Login exige CPF, senha e Token gerado pelo Google Authenticator (P2FA). Esta skill nunca deve inserir, solicitar ou manusear senha/token do usuario. Se o usuario nao tiver perfil no P2FA vigente, deve solicitar previamente a area de TIC responsavel pela sua unidade. Sempre pedir que o proprio usuario faca login, e apenas orientar/revisar o que ele compartilhar (texto colado ou print).

O botao "Nao estou bem, preciso conversar" na tela de login direciona a pagina PRF-Saude, com acesso a Central de Acolhimento e Acompanhamento em Saude do Servidor (CAAS).

## Glossario

- **Banco de horas**: credito das horas excedentes a jornada regular; debito das nao trabalhadas.
- **Codigo SIAPE**: identificacao dos registros de afastamentos legais ou outras ocorrencias.
- **Declaracao de comparecimento**: documento legal para justificar horas ausentes (consultas medicas, odontologicas, exames).
- **Desconto em pecunia**: horas de debito nao compensadas no prazo legal sao descontadas em pecunia (nao viram saldo negativo transportado).
- **EFI**: Educacao Fisica Institucional.
- **Folha de frequencia mensal**: relatorio com todos os registros do mes (horas trabalhadas, afastamentos/ocorrencias, banco de horas, descontos em pecunia, resumo mensal).
- **GECC**: Gratificacao por Encargo de Curso ou Concurso.
- **IFR**: Indenizacao por Flexibilizacao Voluntaria do Repouso Remunerado (Lei 13.712/2018).
- **P2FA**: perfil de autenticacao de duas etapas (Google Authenticator) exigido no login.
- **Perfil basico**: perfil de acesso de todos os servidores ativos e cedidos (o que este manual cobre).
- **PGD/PGPRF**: Programa de Gestao (trabalho remoto/por entregas), autorizado pelo MJSP.
- **Registro de frequencia**: entradas, saidas, afastamentos/ocorrencias, GECC e IFR - todos devem ser registrados no sistema.
- **Registro inicial/final**: registro de entrada / registro de saida.

## 1. Login e regras gerais

- Acesso: `frequencia.prf.gov.br`, CPF + senha + Token (P2FA).
- Registros devem ser feitos de forma automatica (no momento real de entrada/saida); registros manuais sao excepcionais e exigem justificativa.
- A partir do 3o caractere digitado em campos de busca, o sistema sugere opcoes.
- Qualquer registro so e confirmado como processado quando visto refletido na folha de frequencia do mes (e dos meses seguintes).
- Folha com status "assinada" ou "homologada" fica congelada (sem alteracoes possiveis).
- Deveres do usuario: manter sigilo da senha (pessoal e intransferivel); guardar privacidade/sigilo das informacoes; usar os dados somente nas atividades que lhe competem. Todas as inclusoes/alteracoes/exclusoes sao auditadas; uso indevido gera responsabilidade administrativa, civil e criminal.

## 2. Registro de Frequencia (menu "Inicio")

### 2.1 Local Inicial / Local Final
Vem preenchido automaticamente com a lotacao atual; e editavel se a atividade ocorrer em unidade diversa (digitar municipio ou codigo da Unidade). A normativa preve geolocalizacao autorizada pelo usuario no momento do registro.

### 2.2 Indenizacao de Fronteira
Instituida pela Lei 12.855/2013 (localidades estrategicas da Portaria no 456/2017). Vem marcada por padrao para quem e lotado em municipio estrategico; deve ser DESMARCADA se a atividade ocorrer em municipio nao coberto pela portaria. Quem nao e lotado em localidade estrategica nao tem a opcao disponivel.

### 2.3 Tipos de Registro
Para policial: Especial, Operacional, IFR, GECC, PGD. Para administrativo: Administrativo, GECC, PGD. PGD so fica habilitado a quem tem afastamento de participacao em programa de gestao devidamente cadastrado.

**Especial/Administrativo**: opcoes - servico interno/expediente, treinamento/palestra, convocacao (exige no SEI), audiencia (preferencialmente registrar via "Declaracao de Comparecimento > Audiencias", anexando a declaracao emitida pelo orgao judicial). PGD: registra dias de atividade presencial na lotacao para fins de auxilio-transporte; essas horas NAO contam como trabalhadas (ja abonadas 8h/dia util). Apos 1h de registro Especial/Administrativo habilita "Iniciar Intervalo" (e depois "Retorno de Intervalo"); intervalo de refeicao para jornada de 8h: minimo 1h, maximo 3h (Decreto 1.590/1995, IN 2/2018, IN PRF 132/2024) - sistema barra o retorno se desrespeitado. Existe "Intervalo posterior" para lancar intervalo esquecido, informando horario inicial/final manualmente.

**Operacional**: opcoes normal, convocacao, inteligencia, corregedoria, origem (convocacao/origem exigem no SEI - Origem regido pela IN PRF 135/2024). Exige tambem "Funcao na equipe" (exceto Inteligencia/Corregedoria): chefe de UOP, chefe de equipe, chefe de ronda, motorista, auxiliar, supervisor operacional, auxiliar de supervisor operacional. Pergunta se e "Atividade Extra" (padrao "Nao").

**IFR**: Lei 13.712/2018 e IN PRF 108/2021 (SEI 47642554). Atencao: ha vedacao ao acumulo indevido de IFR com diarias/outra indenizacao no mesmo periodo - o servidor deve optar pela mais adequada e pode ter que restituir valores ao erario (Art. 13, Lei 13.712/2018).

**GECC**: Decreto 11.069/2022. So e possivel registrar se o evento de GECC ja foi cadastrado pela gestao de pessoas E o usuario cadastrado como participante (senao, critica impeditiva). Campos: Local inicial (pre-cadastrado), Tipo de registro = GECC, Entrada (data/hora), Evento GECC, Atividade/Funcao, Disciplina, Turma (facultativo), No Doc. SEI Participacao (facultativo mas recomendado) -> botao "Entrada"; depois, para fechar, reabrir e preencher "Saida" -> botao "Saida". Campo "Horas em Ativ. GECC no Ano" e automatico. Compensacao das horas GECC: ate 1 ano (Art. 7, Decreto 11.069/2022), ou ate o mes subsequente (Art. 44, Lei 8.112/90), ou debito automatico do banco de horas. Se iniciado a partir de um registro Especial/Operacional ja em andamento, este e encerrado 1s antes do inicio da GECC e retomado 1s apos o fim dela. O afastamento de ausencia por GECC e automaticamente registrado ao lancar a frequencia GECC.

### 2.4 Usufruto de Auxilio Transporte
Campo "Usufruira do aux. transporte?" - padrao "Nao"; marcar "Sim" toda vez que registrar frequencia correspondente a deslocamento coberto pela verba.

### 2.5 Observacoes
Campo facultativo mas importante para registrar atividade fora da jornada/escala habitual (fora da escala para operacional, ou em dia nao util para especial).

### 2.6 Como voce se sente?
Campo opcional de bem-estar: pessimo, ruim, razoavel, bem, otimo.

## 3. Avisos
Tela exibida ao logar se houver aviso para o usuario/unidade: nivel de importancia (baixo/medio/alto), assunto, unidade e servidor destinatario, datas de publicacao/expiracao, se e recursivo (tambem para unidades subordinadas). Avisos "Baixo"/"Medio" nao bloqueiam navegacao; aviso "Alto" IMPEDE o acesso aos demais modulos ate a leitura ser confirmada. "Visualizar avisos lidos" mostra data/hora de leitura.

## 4. Ajustes de Frequencia
Menu para consultar registros do mes e lancar registros manuais.

- **Consultar Registros**: mostra nome/matricula/lotacao e mes/ano atual (editavel); relatorio traz UORG, tipo de atividade, entrada/saida, intervalo, horas trabalhadas, auxilio transporte, estados na entrada/saida, status (aprovado/pendente), acoes (editar - fica "pendente" apos edicao -, excluir). Folha assinada/homologada bloqueia edicao/exclusao.
- **Lancamento manual**: excepcional - clicar "+ Adicionar", escolher o motivo do lancamento manual, escrever justificativa. Usar sempre que possivel para atividades fora da escala/jornada habitual, preenchendo "Observacoes".
- Registro manual so deve ser usado excepcionalmente e com justificativa (ajuste solicitado pela chefia, esquecimento, problema tecnico, ou atividade geradora de GECC).

## 5. Declaracao de Comparecimento
Area para: consultas/exames medicos, audiencias (do servico ordinario), doacao de sangue, terapia complementar, consulta pre-natal, deslocamento aereo (ate 31/07/2024). Tela lista status: aprovado, a retificar, cancelado, pendente, retificado. Apos "aprovado" nao e mais editavel/excluivel pelo servidor; se a chefia solicitar retificacao, volta a ficar editavel ("a retificar"). Clicar no icone de status mostra o responsavel pela operacao.

Para incluir: botao "+ Novo", anexar a declaracao (JPG ou PDF), datada e assinada pelo medico/autoridade competente, depois "Salvar" - fica pendente ate aprovacao da chefia imediata.

### 5.1 Consultas ou Exames Medicos
Limite anual para dispensa de compensacao (IN 02/2018 art.13 alterado pela IN SRT/MGI 38/2023; IN PRF 132/2024 art.16): 54h/ano (jornada 8h/dia), 43h/ano (jornada 6h/dia), 32h/ano (jornada 4h/dia). Manter cadastro de dependentes atualizado (cobre tambem consultas de dependente/familiar). Horas registradas devem estar dentro da jornada diaria.

### 5.2 Audiencias
Participacao em audiencias/sessoes judiciais/correcionais decorrentes da atividade funcional, mediante mandado de intimacao ou oficio a chefia (IN PRF 132/2024 art. 33-39). Exige a declaracao de comparecimento emitida pelo orgao judicial.

### 5.3 Doacao de Sangue
ADVS - liberacao de 1 dia (Art. 97, I, Lei 8.112/90; IN PRF 132/2024 art. 28-31). Limite: ate 4 doacoes/ano (homem) e 3/ano (mulher), intervalo minimo 2 meses (homem) e 3 meses (mulher) (Portaria MS 158/2016 art. 37). Abona a jornada do dia; horas posteriores as 23h59min59s do dia do afastamento sao compensaveis; servidor em escala fica dispensado a partir de 00h00 do dia seguinte.

### 5.4 Terapia Complementar
Psicologo, psiquiatra, fisioterapia, RPG etc. (servidor ou dependente direto), mediante prescricao medica. Fora do limite das horas anuais de consultas medicas; horas abonadas e nao compensaveis, sem limite de quantidade.

### 5.5 Consulta Pre-Natal
Acompanhamento de esposa/companheira em ate 6 consultas/exames durante a gravidez: dispensado de compensacao, nao entra no limite anual de consultas medicas. Horas abonadas e nao compensaveis.

### 5.6 Deslocamento Aereo
Somente para voos ate 31/07/2024 (nos fins de semana/feriados). Regra da epoca: horario inicial = 2h antes da partida; horario final = 1h apos a chegada. Exige anexar o bilhete aereo. Se o deslocamento cruzar a virada do dia, lancar DOIS registros (um terminando 23h59min59s, outro comecando 00h00min00s). A partir de 01/08/2024 (IN PRF 132/2024), usar em vez disso o afastamento "0042 - Afas. Viagem a Servico no Pais Com Onus" (abono automatico), via modulo de Afastamentos.

## 6. Banco de Horas
Acompanhamento de saldo mensal/anual desde junho/2022. Saldo pode ser usufruido em ate 12 meses apos a insercao das horas; acumulo exige autorizacao PREVIA da chefia imediata (IN 02/2018). Sem autorizacao previa, horas excedentes devem ser compensadas ate o mes subsequente (Art. 44, Lei 8.112/90). Limites de armazenamento (Art. 24, IN 02/2018): ate 2h/dia, 40h/mes, 100h/ano civil.

- **Consultas de Banco de Horas**: por ano ou mes/ano; opcao "Horas formatadas" (hh:mm:ss) ou decimal; filtros "Saldo minimo/maximo"; coluna "Tipo" (Banco de horas padrao, Ausencia para usufruto de recesso, etc.); coluna "Ajuste Manual" mostra lancamentos feitos pelo gestor; acao permite resetar compensacoes de recesso.
- **Gerenciar Saldos**: no perfil basico e so consulta (edicao e exclusiva de gestor regional/nacional).

## 7. Folhas de Frequencia
Submenus: Ordinarias, GECC, Historico Mensal.

### 7.1 Ordinarias
Consulta por mes/ano, limitada ao intervalo de 01/06/2022 (implantacao do sistema, Portaria 91/DG/PRF 09/04/2022, SEI 40934423) ate o mes atual. Cabecalho: referencia, status (aberta, assinada, homologada, a retificar), servidor, matricula, cargo, jornada, regional, lotacao. Pendencia de aprovacao de afastamento/declaracao de comparecimento BLOQUEIA assinatura/homologacao ate ser resolvida junto a chefia. Corpo: dia, registros, horas trabalhadas, EFI, total de horas, saldo (+/-), observacoes. EFI e computado automaticamente (processo autorizado pela gestao de pessoas), limitado a 5h/semana (IN 13/2013/DG/PRF). Rodape: quadros de Banco de Horas, Desconto em Pecunia (nao vira saldo negativo do mes seguinte) e Resumo Mensal (com "Saldo Parcial" no mes corrente).

Botoes finais: "Assinar" (se nao houver impedimento - submete a folha a homologacao da chefia; ao assinar com saldo negativo, o servidor declara ciencia do debito a compensar/debitar do banco) e "Imprimir" (abre nova aba com o documento para download/impressao). Homologacao deve ocorrer ate o 5o dia util do mes subsequente (Art. 8, Decreto 1.590/1995).

### 7.1.1 Direcionamento de Horas
Permite direcionar horas excedentes para compensar debitos anteriores. Cinco tipos de direcionamento, cada um com prazo proprio:
1. Banco mes anterior - ate o ultimo dia do mes subsequente ao saldo negativo (Art. 44, Lei 8.112/90).
2. Atividades GECC - ate 1 ano da execucao (Art. 34, IN 02/2018; Art. 4, Decreto 11.069/2022).
3. Atividades sindicais (IN SRT/MGI 38/2023, altera Art. 36 da IN 02/2018).
4. Usufruto de recesso - prazo definido anualmente por portaria ministerial.
5. Consulta medica - excedente ao limite abonado, ate 1 mes apos a data do atestado (Art. 13, paragrafo 4, IN 02/2018, alterado pela IN SGP/SEDGG/ME 125/2020).

O icone de direcionamento so aparece quando ha horas excedentes disponiveis; sem debito a compensar, o sistema avisa "Nao existem horas a compensar".

### 7.2 Folha GECC
Mesma logica de selecao de mes; corpo traz dia, registros, observacoes, total de horas. Rodape traz "Declaracao de Execucao de Atividades" (assinada pelo servidor e pela coordenacao do evento). Pode-se "Revogar assinatura" antes da homologacao da coordenacao, retornando a folha ao status "aberta". Para fins de pagamento de GECC, a folha precisa estar "homologada" (a homologacao pela coordenacao nao depende da virada do mes, pode ocorrer apos o termino do evento).

### 7.3 Historico Mensal
So consulta: Mes/Ano, dias trabalhados, dias ativ. remotas, horas afastamento, horas EFI, horas efetivas, horas totais, saldo mensal, desconto pecunia, assinada/homologada (sim/nao). Icone "visualizar" gera documento em nova aba.

## 8. Ferramentas de Gestao (nivel usuario basico)

### 8.1 Afastamentos
Consultar (filtros: descricao, sigla, codigo SIAPE, status, data inicial/final) ou incluir ("+ Novo") afastamentos/ocorrencias. Pode haver critica impeditiva se o novo registro for incompativel com outro ja existente no periodo. Apos salvar, fica "pendente" ate aprovacao da chefia imediata - so aparece na folha de frequencia depois de aprovado. **Desde 01/06/2022, este lancamento NAO e replicado automaticamente na PDI** - ver secao 14.

### 8.2 Autoriz. de Acumulo de Horas
Consulta (nao edicao) se ha autorizacao para acumular saldo em banco de horas. Sem autorizacao, as horas devem ser compensadas ate o mes subsequente (Art. 44, Lei 8.112/90).

### 8.3 Capacitacao
Consulta participacao no TAF e CAP dos servidores da unidade (botao "Listar servidores"): participacao/data do ultimo CAP, aprovacao/data do ultimo TAF.

### 8.4 Eventos
Consulta lancamentos de EFI, Variacao de Jornada e/ou Funcao Assessoria da matricula (lancados pela gestao de pessoas apos instrucao processual via SEI). Relatorio: tipo de evento, servidor, lotacao, processo SEI, ingresso/desligamento do evento, data/hora do registro, operador responsavel. Exportavel em XLS ou PDF.

### 8.5 Tipos de Ocorrencias/Afastamentos
Consulta informativa sobre os tipos de afastamento cadastrados. Filtros: Codigo SIAPE, Sigla, Descricao, Tipo/Finalidade, Comportamento.
- Tipo/Finalidade: Integral, Integral/Parcial, Inaplicavel a PRF, Parcial.
- Comportamento: Abono, Debito de horas, Debito em pecunia (nao desconta saldo de horas), Horas trabalhadas, Nao se aplica (so consta na folha, sem efeito em calculo).
Licencas e afastamentos do servidor publico federal: capitulos IV e V da Lei 8.112/1990.

## 9. Relatorios (nivel usuario basico - apenas consulta)
- **Eventos dos Servidores**: EFI, variacao de jornada, funcao assessoria.
- **IFR**: filtros servidor, unidade de lotacao/atividade (com unidades subordinadas), UF, periodo, status, finalidade; formato detalhado com colunas configuraveis; exporta XLS/PDF. So valido apos aprovacao da chefia.
- **Horas Trabalhadas**: filtros unidade de lotacao/atividade, periodo, tipos de registro, subtipos operacionais/especiais; exporta XLS/PDF.
- **Indenizacao Fronteira/Areas de Dificil Fixacao**: filtros servidor, unidade, periodo; considera so registros regulares/aprovados; modo detalhado mostra data/hora/valor por dia.
- **Registros Gerais de Frequencia**: operacional, administrativo, IFR, GECC, PGD, por periodo.
- **Saldo de horas GECC**: horas a compensar e prazos, cobranca em pecunia se nao compensado a tempo; icone de detalhe mostra tipo de compensacao, dia de origem/destino e saldo direcionado.

## 10. Repositorio (Docs/Links) e Fale Conosco
"Repositorio (Docs/Links)" reune documentos e links auxiliares (inclui este Manual do Usuario Padrao, Repositorio de Legislacao de Pessoal, tutoriais em video de Avisos e de RESET de Frequencia/Reabertura, e um atalho para o Google Drive Nacional). "Fale Conosco" direciona a Central Nacional de Servicos de TIC (suporte.prf.gov.br/portal/login).

## 11. Legislacao de referencia citada no manual
Decreto no 1.590/1995; Lei no 8.112/1990 (arts. 44 e 97-I; capitulos IV e V); IN no 2/2018 (MP), alterada pela IN SRT/MGI no 38/2023; IN PRF no 132/2024 (SEI 58157214); IN PRF no 13/2013 (EFI); Lei no 12.855/2013 e Portaria no 456/2017 (Indenizacao de Fronteira); Lei no 13.712/2018 e IN PRF no 108/2021 (IFR); Decreto no 11.069/2022 (GECC); IN PRF no 135/2024 (Programa Origem); Portaria no 91/DG/PRF de 2022 (SEI 40934423) - institui o sistema; Portaria do Ministerio da Saude no 158/2016 art. 37 (doacao de sangue).

## 12. Como a skill deve se comportar

1. Ao orientar um registro de frequencia, identificar primeiro o TIPO de registro (Especial/Administrativo, Operacional, IFR, GECC, PGD) e seguir os campos obrigatorios da secao correspondente acima.
2. Alertar sobre prazos e limites legais sempre que relevantes (intervalo de refeicao 1-3h, limite anual de consultas medicas, limites do banco de horas, prazo de homologacao ate o 5o dia util, prazos de direcionamento de horas).
3. Nunca inserir login/senha/token pelo usuario; apenas orientar o que ele deve clicar/preencher, ou revisar o que ele compartilhar (print ou texto colado).
4. Se a duvida for sobre uma funcionalidade de GESTOR (aprovar afastamento, editar banco de horas, autorizar acumulo, lancar EFI/variacao de jornada), dizer que esse fluxo pertence ao manual do Gestor (fora do escopo desta skill) e sugerir buscar a chefia imediata ou o manual proprio.
5. Para duvidas nao cobertas aqui (normativa nova, caso omisso), sugerir o "Fale Conosco" (suporte.prf.gov.br/portal/login) em vez de inventar uma regra.
6. Quando a duvida do usuario for na verdade sobre o preenchimento da Parte Diaria (ocorrencias, viaturas, narrativa do plantao) ou sobre a importacao/ignorar/reverter frequencias na PDI, redirecionar para a skill `prf-pdi` (ver tambem secao 14 abaixo) - sao sistemas e assuntos diferentes, ainda que integrados desde 01/06/2022.

## 13. Atualizacoes
O usuario pode fornecer documentos adicionais (ex.: manual do Gestor, normativas novas). Quando isso ocorrer, propor uma atualizacao desta skill incorporando o novo conteudo as secoes relevantes, citando a fonte (nome do documento/oficio SEI) ao lado da regra adicionada.

## 14. Integracao com a PDI (desde 01/06/2022)
(Fonte: WikiPRF, pagina "Integracao - PDI e Sistema de Frequencia")

- Desde 1o de junho de 2022, todo o ponto eletronico da PRF passou a ser registrado EXCLUSIVAMENTE aqui na Frequencia PRF; deixou de ser necessario abrir Parte Diaria (PDI) so para fins de ponto em servico do tipo Especial.
- Os registros feitos aqui sao IMPORTADOS automaticamente para a PD correspondente na PDI (via botao ATUALIZAR IMPORTACOES de la), desde que o horario de inicio/fim da frequencia esteja dentro do periodo de servico da PD e na mesma Unidade Organizacional. Na PDI, um gestor ou o proprio usuario pode "Ignorar" uma frequencia importada indevidamente, ou "Reverter" esse ignorar - ver skill `prf-pdi`, secao 15, para os detalhes desse fluxo do lado da PDI.
- Afastamentos (ferias, licencas etc.) lancados aqui NAO sao automaticamente replicados na PDI. Se o usuario e chefe de equipe/gestor, deve lembrar de lancar o mesmo afastamento tambem na PDI (Planejamento > Afastamentos) para que as escalas la reflitam corretamente as ausencias - o lancamento AQUI na Frequencia deve ser feito primeiro, pois e o que e comunicado ao Governo Federal.
- Se a pergunta do usuario for sobre o conteudo operacional do plantao (viaturas, ocorrencias, narrativa, cartao-programa), isso pertence a skill `prf-pdi`, nao a esta.