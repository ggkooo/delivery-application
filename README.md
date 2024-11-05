# Aplicação Web para deliverys



Este projeto consiste no desenvolvimento de um aplicativo web, o qual serve para realizar pedidos de forma dinâmica. Abaixo irei detalhar um pouco mais como foi realizado o desenvolvimento.

HTML foi delimitado por <section>, as quais são:
- header;
- banner;
- servicos;
- cardapio;
- depoimentos;
- reservas.
<br>
Foi também utilizado a **modal** do BootStrap.
<br><br>
Todo conteúdo da página foi estilizado com **css** e utilizando as bibliotecas **Animated** e **Wow**.
<br><br>
Agora, a melhor parte, o JavaScript.
Foi utilizada a programação orientada a objetos, consistindo em criar métodos para cada função.

**As funções desenvolvidas foram:**
- obterItensCardapio();
- verMais();
- diminuirQuantidade();
- aumentarQuantidade();
- adicionarAoCarrinho();
- atualizarBadgeTotal();
- abrirCarrinho();
- carregarEtapa();
- voltarEtapa();
- carregarCarrinho();
- diminuirQuantidadeCarrinho();
- aumentarQuantidadeCarrinho();
- removerItemCarrinho();
- atualizarCarrinho();
- carregarValores();
- carregarEndereco();
- buscarCEP();
- resumoPedido();
- carregarResumo();
- finalizarPedido();
- carregarBotaoReserva();
- carregarBotaoLigar();
- abrirDepoimento();
- mensagem().

## Detalhamento sobre cada função:
**obterItensCardapio()**: consiste em carregar todos os produtos, do arquivo **dados.js**, deixando cada um com seu respectivo nome e valor em um card na landingpage;<br>
**verMais()**: função destinada a mostrar mais uma linha de produtos de determinada categoria;<br>
**diminuirQuantidade()**: botão para remover um item antes de adicionar ao carrinho;<br>
**aumentarQuantidade()**: botão para adicionar um item antes de adicionar ao carrinho;<br>
**adicionarAoCarrinho()**: botão para adicionar a quantidade selecionada ao carrinho;<br>
**atualizarBadgeTotal()**: atualiza a quantidade de itens que possui no carrinho;<br>
**abrirCarrinho()**: função para abrir a modal do carrinho;<br>
**carregarEtapa()**: função para carregar as etapas (1, 2 e 3);<br>
**voltarEtapa()**: função para voltar para a etapa anterior;<br>
**carregarCarrinho()**: consiste em carregar o carrinho na etapa 1;<br>
**diminuirQuantidadeCarrinho()**: botão para remover um item dentro do carrinho;<br>
**aumentarQuantidadeCarrinho()**: botão para adicionar um item dentro do carrinho;<br>
**removerItemCarrinho()**: botão para remover todas as quantidades de um determinado item do carrinho;<br>
**atualizarCarrinho()**: função para fazer a atualização do carrinho sempre que algo é alterado;<br>
**carregarValores()**: função para carregar os valores totais do pedido;<br>
**carregarEndereco()**: função para carregar a etapa 2 da modal;<br>
**buscarCEP()**: utilização da API ViaCEP para fazer a validação do CEP e completar automaticamente os campos de Cidade e UF;<br>
**resumoPedido()**: validação de todos os dados antes de prosseguir para a etapa 3;<br>
**carregarResumo()**: carregar a etapa 3 com o resumo total do pedido;<br>
**finalizarPedido()**: função para a atualização do botão do WhatsApp;<br>
**carregarBotaoReserva(), carregarBotaoLigar()**: funções para carregar os botões de reserva e de telefone;<br>
**abrirDepoimento()**: método para carregar dinamicamente os depoimentos dos clientes;<br>
**mensagem()**: função para enviar uma mensagem sempre que algo é feito ou tenha algum erro.<br><br>

Espero que tenham gostado do meu projeto!






