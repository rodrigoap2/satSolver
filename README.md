# satSolver

Para testar o sat solver,é necessário que se coloque os arquivos satSolver.js,teste.js e simple1.cnf na pasta do seu usuário(dentro da pasta users).Após isso,para cada caso de teste é necessário que se edite o arquivo simple1.cnf e insira o caso de teste nele.Caso o usuário não tenha casos de teste,um caso padrão está alocado no arquivo.Após esses passos,abra o prompt de comando/terminal,a depender do sistema operacional,e escreva node teste.js.Após apertar enter,o programa será executado e exibirá um resultado como mostrado abaixo:

{ isSat: true,
  satisfyingAssignment: [ false, false, false, false, true ] }
  
  isSat - Se true,mostra que o problema pode ser resolvido,já se false,mostra que o problema não pode ser resolvido.
  
  satisfyingAssignment - Se null,é porque não existe uma solução para este problema,se isto não aparecer,o texto entre colchetes é uma das soluções para o problema.
