# Hub de Leitura — testes de interface
+ Jenkins

## Execução local

1. Disponibilize a aplicação Hub de Leitura em http://localhost:3000/. A aplicação não faz parte deste repositório.
2. Execute `npm ci`.
3. Copie `cypress.env.example.json` para `cypress.env.json` e preencha as contas de teste comuns e de administrador existentes na aplicação. O arquivo local é ignorado pelo Git.
4. Execute `npm test` (Chrome) ou `npm run cy:open` (modo interativo).

## Relatórios locais

Após executar os testes, use npm run report:generate e npm run report:open. A geração e abertura do Allure requerem Java no PATH.


## Jenkins

Consulte [JENKINS.md](JENKINS.md) para configurar o job, as ferramentas e as credenciais.
