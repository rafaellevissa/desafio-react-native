# Aplicativo - React Native

### Tela inicial de Login

link da api: https://github.com/rafaellevissa/ruby-on-rails-desafio

Mostrar os campos e-mail e senha, e um botão ENTRAR. Ao clicar em ENTRAR, realizar a autenticação via API:

### Tela principal (Logado)

A tela principal do app, será um mapa (google maps ou mapbox), e o usuário poderá realizar 2 tipos de ações:  Adicionar Anotações de Campo, e sincronizar os dados com a API.

Crie um menu ou algum mecanismo de navegação para que o usuário possa criar suas Anotações de Campo, visualizar os pontos das anotações no mapa e, posteriormente, sincronizar todos os dados com a API.

### Criar anotações de campo

Para criar uma anotação de campo, o usuário precisa digitar um texto, com a opção de Cancelar ou Salvar.

Ao salvar o texto, pegar a localização de GPS do app e a data/hora do momento; Salvar no banco local do app e voltar para o Mapa.

Esta operação de Adicionar deve funcionar 100% offline, onde o usuário pode registrar anotações sem ter sinal de internet.

### Exibição dos dados no Mapa

Para cada anotação registrada pelo usuário, deve ser exibido um pino no mapa, no ponto exato da localização capturada no momento em que a anotação foi registrada.

Os pinos de anotações já sincronizadas (já enviadas para api com retorno de sucesso) , devem ser pintados de verde, e os pinos de anotações não sincronizadas, devem ser pintados de amarelo.

Os pinos do mapa devem ser exibidos mesmo que não tenha internet, e que o fundo do mapa não mostre a imagem de satélite do google/mapbox.

### Sincronizar

Ao tocar em sincronizar, demonstrar para o usuário que a sincronização está em andamento, e executar o seguinte procedimento:

Para cada Anotação registrada e que ainda não tenha sido sincronizada, enviar um post para a API.

Não enviar anotações já sincronizadas.

Aguardar o retorno de sucesso e sinalizar em verde o ponto da Anotação de Campo no mapa.

### Imagens

![menu](/images/menu.png)
![local-remote](/images/local-remote.png)
![notes](/images/notes.png)
![prompt](/images/prompt.png)
