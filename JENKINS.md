# Execução no Jenkins

## Job local

- Jenkins: http://localhost:8081/ (acesso apenas no próprio computador).
- Job: hub-de-leitura-teste-ui2.
- Tipo: Pipeline script from SCM, Git.
- Repositório: https://github.com/allesoares/hub-de-leitura-teste-ui2.git.
- Branch: */main.
- Script Path: jenkinsfile.

Use Construir agora para executar. O pipeline clona a aplicação em hub-de-leitura-integrado2 e os testes em hub-de-leitura-teste-ui2 dentro do workspace, instala as dependências e executa a suíte no Chrome. A aplicação usa a porta 3000, que deve estar livre antes do build. A inicialização usa start /B, com uma espera fixa de 10 segundos antes das próximas etapas.

## Ferramentas

Os dois pipelines usam comandos Windows (bat). O agente precisa ter Git, Chrome e Java no PATH. Em Gerenciar Jenkins → Ferramentas, configure NodeJS com nome nodejs e Allure com nome allure. A instalação local usa as ferramentas já disponíveis na máquina.

## Credenciais da aplicação

Em Gerenciar Jenkins → Credenciais → Sistema → Credenciais globais, cadastre duas credenciais do tipo Usuário e senha:

| ID | Conta |
|---|---|
| hub-leitura-usuario | Usuário comum de teste da aplicação |
| hub-leitura-admin | Administrador de teste da aplicação |

O pipeline injeta as contas nas variáveis CYPRESS_TEST_USER_EMAIL, CYPRESS_TEST_USER_PASSWORD, CYPRESS_TEST_ADMIN_EMAIL e CYPRESS_TEST_ADMIN_PASSWORD apenas durante os testes. Os valores não ficam no Git. No ambiente local, foram usadas as contas sintéticas de demonstração da aplicação.

O repositório é público; não é necessário cadastrar credencial do GitHub para o checkout. O envio de commits pelo desenvolvedor continua exigindo autenticação.

## Resultado e evidências

Abra a execução para consultar Console Output, os artefatos de screenshots e vídeos e o relatório Allure. Os resultados são coletados na pasta hub-de-leitura-teste-ui2 do workspace. O pipeline mantém os últimos 10 builds, tem limite de 15 minutos e impede execuções simultâneas do mesmo job. Em post cleanup, taskkill /F /IM node.exe /T encerra todos os processos Node acessíveis ao usuário do Jenkins e seus processos filhos, incluindo outros projetos que estejam em execução.

## Acesso à instalação local

Os arquivos da instalação, credenciais administrativas e logs ficam em .jenkins-local/, ignorados pelo Git. Consulte .jenkins-local/ACESSO.md neste computador para entrar e iniciar novamente o Jenkins. Eles não são distribuídos no repositório.
