$(document).ready(function () {

    cardapio.eventos.init();

})

var cardapio = {};

var MEU_CARRINHO = [];

var MEU_ENDERECO = null;

var VALOR_CARRINHO = 0;
var VALOR_ENTREGA = 5;

var CELULAR_EMPRESA = '55991530488';

cardapio.eventos = {

    init: () => {

        cardapio.metodos.obterItensCardapio();
        cardapio.metodos.carregarBotaoReserva();
        cardapio.metodos.carregarBotaoLigar();

    }

}

cardapio.metodos = {

    // OBTÉM A LISTA DE ITENS DO CARDÁPIO
    obterItensCardapio: (categoria = 'burgers', verMais = false) => {

        var filtro = MENU[categoria];

        if (!verMais) {

            $("#itensCardapio").html('');
            $("#btnVerMais").removeClass('hidden');

        }

        $.each(filtro, (i, e) => {

            let temp = cardapio.templates.item
            .replace(/\${img}/g, e.img)
            .replace(/\${name}/g, e.name)
            .replace(/\${price}/g, e.price.toFixed(2).replace('.', ','))
            .replace(/\${id}/g, e.id)

            // BOTÃO VER MAIS (clicado)
            if (verMais && i >=8 && i <12) {

                $("#itensCardapio").append(temp)

            }

            // PAGINAÇÃO INICIAL (8 itens)
            if (!verMais && i < 8) {

                $("#itensCardapio").append(temp)

            }

        })
        
        // REMOVER O ACTIVE DO BOTÃO
        $('.container-menu a').removeClass('active');

        // ADICIONAR O ACTIVE PARA A CATEGORIA ATUAL
        $('#menu-' + categoria).addClass('active');

    },

    // CLICK NO BOTÃO DE VER MAIS
    verMais: () => {

        var active = $(".container-menu a.active").attr('id').split('menu-')[1];
        cardapio.metodos.obterItensCardapio(active, true);

        $("#btnVerMais").addClass('hidden');

    },

    // DIMINUIR A QUANTIDADE DO ITEM NO CARDÁPIO
    diminuirQuantidade: (id) => {

        let qntdAutal = parseInt($('#qntd-' + id).text());

        if (qntdAutal > 0) {

            $('#qntd-' + id).text(qntdAutal - 1)

        }

    },

    // AUMENTAR A QUANTIDADE DO ITEM NO CARDÁPIO
    aumentarQuantidade: (id) => {

        let qntdAutal = parseInt($('#qntd-' + id).text());

        $('#qntd-' + id).text(qntdAutal + 1)

    },

    // ADICIONAR AO CARRINHO O ITEM DO CARDÁPIO
    adicionarAoCarrinho: (id) => {

        let qntdAutal = parseInt($('#qntd-' + id).text());

        if (qntdAutal > 0) {

            // CATEGORIA ATIVA
            var categoria = $(".container-menu a.active").attr('id').split('menu-')[1];

            // OBTÉM A LISTA DE ITENS
            let filtro = MENU[categoria]

            // OBTÉM O ITEM
            let item = $.grep(filtro, (e, i) => {

                return e.id == id

            })

            if (item.length > 0) {

                // VALIDAR SE JA EXISTE O ITEM NO CARRINHO
                let existe = $.grep(MEU_CARRINHO, (elem, index) => {

                    return elem.id == id
    
                })

                // CASO JÁ EXISTA, IRÁ ALTERAR A QUANTIDADE
                if (existe.length > 0) {

                    let objIndex = MEU_CARRINHO.findIndex((obj => obj.id == id));
                    MEU_CARRINHO[objIndex].qntd += qntdAutal;

                } else {

                    item[0].qntd = qntdAutal;
                    MEU_CARRINHO.push(item[0])

                }

                cardapio.metodos.mensagem('Item adicionado ao carrinho.', 'green');

                $("#qntd-" + id).text(0)

                cardapio.metodos.atualizarBadgeTotal();

            }

        }

    },

    // ATUALIZA O BADGE DE TOTAIS DOS BOTÕES DE CARRINHO
    atualizarBadgeTotal: () => {

        var total = 0;

        $.each(MEU_CARRINHO, (i, e) => {

            total += e.qntd

        })

        if (total > 0) {

            $(".botao-carrinho").removeClass('hidden')
            $(".container-total-carrinho").removeClass('hidden')

        } else {

            $(".botao-carrinho").addClass('hidden')
            $(".container-total-carrinho").addClass('hidden')

        }

        $(".badge-total-carrinho").html(total);

    },

    // ABRIR A MODAL DO CARRINHO
    abrirCarrinho: (abrir) => {

        if (abrir) {

            $("#modalCarrinho").removeClass('hidden');
            cardapio.metodos.carregarCarrinho();

        } else {

            $("#modalCarrinho").addClass('hidden');

        }

    },

    // ALTERA OS TEXTOS E EXIBE OS BOTÕES DAS ETAPAS
    carregarEtapa: (etapa) => {

        if (etapa == 1) {

            $("#lblTituloEtapa").text('Seu carrinho:');
            $("#itensCarrinho").removeClass('hidden');
            $("#localEntrega").addClass('hidden');
            $("#resumoCarrinho").addClass('hidden');

            $(".etapa").removeClass('active');
            $(".etapa-1").addClass('active');

            $("#btnEtapaPedido").removeClass('hidden');
            $("#btnEtapaEndereco").addClass('hidden');
            $("#btnEtapaResumo").addClass('hidden');
            $("#btnVoltar").addClass('hidden');

        } else if (etapa == 2) {

            $("#lblTituloEtapa").text('Endereço de entrega:');
            $("#itensCarrinho").addClass('hidden');
            $("#localEntrega").removeClass('hidden');
            $("#resumoCarrinho").addClass('hidden');

            $(".etapa").removeClass('active');
            $(".etapa-1").addClass('active');
            $(".etapa-2").addClass('active');

            $("#btnEtapaPedido").addClass('hidden');
            $("#btnEtapaEndereco").removeClass('hidden');
            $("#btnEtapaResumo").addClass('hidden');
            $("#btnVoltar").removeClass('hidden');

        } else if (etapa == 3) {

            $("#lblTituloEtapa").text('Resumo do pedido:');
            $("#itensCarrinho").addClass('hidden');
            $("#localEntrega").addClass('hidden');
            $("#resumoCarrinho").removeClass('hidden');

            $(".etapa").removeClass('active');
            $(".etapa-1").addClass('active');
            $(".etapa-2").addClass('active');
            $(".etapa-3").addClass('active');

            $("#btnEtapaPedido").addClass('hidden');
            $("#btnEtapaEndereco").addClass('hidden');
            $("#btnEtapaResumo").removeClass('hidden');
            $("#btnVoltar").removeClass('hidden');

        }

    },

    // BOTÃO VOLTAR ETAPA
    voltarEtapa: () => {

        let etapa = $(".etapa.active").length;
        cardapio.metodos.carregarEtapa(etapa - 1);

    },

    // CARREGA A LISTA DE ITENS DO CARRINHO
    carregarCarrinho: () => {

        cardapio.metodos.carregarEtapa(1);

        if (MEU_CARRINHO.length > 0) {

            $("#itensCarrinho").html('');

            $.each(MEU_CARRINHO, (i, e) => {

                let temp = cardapio.templates.itemCarrinho.replace(/\${img}/g, e.img)
                .replace(/\${name}/g, e.name)
                .replace(/\${price}/g, e.price.toFixed(2).replace('.', ','))
                .replace(/\${id}/g, e.id)
                .replace(/\${qntd}/g, e.qntd)

                $("#itensCarrinho").append(temp);

                if ((i + 1) == MEU_CARRINHO.length) {

                    cardapio.metodos.carregarValores();

                }

            })

        } else {

            $("#itensCarrinho").html('<p class="carrinho-vazio"><i class="fa fa-shopping-bag"></i> Seu carrinho está vazio.</p>');
            cardapio.metodos.carregarValores();

        }

    },

    // DIMINUIR A QUANTIDADE DE ITENS NO CARRINHO
    diminuirQuantidadeCarrinho: (id) => {

        let qntdAutal = parseInt($('#qntd-carrinho-' + id).text());

        if (qntdAutal > 1) {

            $('#qntd-carrinho-' + id).text(qntdAutal - 1);
            cardapio.metodos.atualizarCarrinho(id, qntdAutal - 1);

        } else {

            cardapio.metodos.removerItemCarrinho(id);

        }

    },

    // AUMENTAR A QUANTIDADE DE ITENS NO CARRINHO
    aumentarQuantidadeCarrinho: (id) => {

        let qntdAutal = parseInt($('#qntd-carrinho-' + id).text());

        $('#qntd-carrinho-' + id).text(qntdAutal + 1);

        cardapio.metodos.atualizarCarrinho(id, qntdAutal + 1);

    },

    // REMOVER ITEM DO CARRINHO
    removerItemCarrinho: (id) => {

        MEU_CARRINHO = $.grep(MEU_CARRINHO, (e, i) => {

            return e.id != id

        })

        cardapio.metodos.carregarCarrinho();

        cardapio.metodos.atualizarBadgeTotal();

    },

    // ATUALIZA O CARRINHO COM A QUANTIDADE ATUAL
    atualizarCarrinho: (id, qntd) => {

        let objIndex = MEU_CARRINHO.findIndex((obj => obj.id == id));
        MEU_CARRINHO[objIndex].qntd = qntd;

        cardapio.metodos.atualizarBadgeTotal();

        cardapio.metodos.carregarValores();

    }, 

    // CARREGA OS VALORES SUBTOTAL, ENTREGA E TOTAL.
    carregarValores: () => {

        VALOR_CARRINHO = 0;

        $("#lblSubTotal").text('R$ 0,00');
        $("#lblValorEntrega").text('+ R$ 0,00');
        $("#lblValorTotal").text('R$ 0,00');

        $.each(MEU_CARRINHO, (i, e) => {

            VALOR_CARRINHO += parseFloat(e.price * e.qntd);

            if ((i + 1) == MEU_CARRINHO.length) {

                $("#lblSubTotal").text(`R$ ${VALOR_CARRINHO.toFixed(2).replace('.', ',')}`);
                $("#lblValorEntrega").text(`+ R$ ${VALOR_ENTREGA.toFixed(2).replace('.', ',')}`);
                $("#lblValorTotal").text(`R$ ${(VALOR_CARRINHO + VALOR_ENTREGA).toFixed(2).replace('.', ',')}`);

            }

        })

    },

    // API VIACEP
    carregarEndereco: () => {

        if (MEU_CARRINHO.length <= 0) {

            cardapio.metodos.mensagem('Seu carrinho está vazio.')
            return;

        }

        cardapio.metodos.carregarEtapa(2);

    },

    // BUSCAR CEP
    buscarCEP: () => {

        var cep = $("#textCEP").val().trim().replace(/\D/g, '');

        if (cep != "") {

            var validacep = /^[0-9]{8}$/;

            if (validacep.test(cep)) {

                $.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?", function (dados) {

                    if (!("erro" in dados)) {

                        $("#txtCidade").val(dados.localidade);
                        $("#ddlUf").val(dados.uf);

                        $("#txtEndereco").focus();

                    } else {

                        cardapio.metodos.mensagem('CEP não encontrado. Preencha as informações manualmente.');
                        $("#txtEndereco").focus();

                    }

                })

            } else {

                cardapio.metodos.mensagem('Formato do CEP inválido.');
                $("#txtCEP").focus();

            }

        } else {

            cardapio.metodos.mensagem('Informe um CEP válido.');
            $("#txtCEP").focus();

        }

    },

    // VALIDAÇÃO ANTES DE PROSSEGUIR PARA A ETAPA 3
    resumoPedido: () => {

        let cep =  $("#textCEP").val().trim();
        let endereco =  $("#txtEndereco").val().trim();
        let bairro =  $("#txtBairro").val().trim();
        let numero =  $("#txtNumero").val().trim();
        let cidade =  $("#txtCidade").val().trim();
        let complemento =  $("#txtComplemento").val().trim();
        let uf =  $("#ddlUf").val().trim();

        if (cep.length <= 0) {

            cardapio.metodos.mensagem('Informe o CEP.');
            $("#textCEP").focus();
            return;

        }

        if (endereco.length <= 0) {

            cardapio.metodos.mensagem('Informe o endereço.');
            $("#txtEndereco").focus();
            return;

        }

        if (bairro.length <= 0) {

            cardapio.metodos.mensagem('Informe o bairro.');
            $("#txtBairro").focus();
            return;

        }

        if (numero.length <= 0) {

            cardapio.metodos.mensagem('Informe o numero. Caso não possua, digite N.');
            $("#txtNumero").focus();
            return;

        }

        if (cidade.length <= 0) {

            cardapio.metodos.mensagem('Informe a cidade.');
            $("#txtCidade").focus();
            return;

        }

        if (uf.length == "-1") {

            cardapio.metodos.mensagem('Informe a UF.');
            return;

        }

        MEU_ENDERECO = {

            cep: cep,
            endereco: endereco,
            bairro: bairro,
            cidade: cidade,
            uf: uf,
            numero: numero,
            complemento: complemento,

        }

        cardapio.metodos.carregarEtapa(3);
        cardapio.metodos.carregarResumo();

    },

    // CARREGAR RESUMO DO PEDIDO
    carregarResumo: () => {

        $("#listaItensResumo").html('');

        $.each(MEU_CARRINHO, (i, e) => {

            let temp = cardapio.templates.itemResumo.replace(/\${img}/g, e.img)
                .replace(/\${name}/g, e.name)
                .replace(/\${price}/g, e.price.toFixed(2).replace('.', ','))
                .replace(/\${qntd}/g, e.qntd)

            $("#listaItensResumo").append(temp);

        })

        $("#resumoEndereco").html(`${MEU_ENDERECO.endereco}, ${MEU_ENDERECO.numero}, ${MEU_ENDERECO.bairro}`);
        $("#cidadeEndereco").html(`${MEU_ENDERECO.cidade}-${MEU_ENDERECO.uf} / ${MEU_ENDERECO.cep} / ${MEU_ENDERECO.complemento}`);

        cardapio.metodos.finalizarPedido();

    },

    // ATUALIZA O LINK DO BOTÃO DO ZAP
    finalizarPedido: () => {

        if (MEU_CARRINHO.length > 0 && MEU_ENDERECO != null) {

            var texto = 'Olá, gostaria de fazer um pedido:';
            texto += `\n*Itens do pedido:*\n\n\${itens}`;
            texto += '\n*Endereço de entrega:*';
            texto += `\n${MEU_ENDERECO.endereco}, ${MEU_ENDERECO.numero}, ${MEU_ENDERECO.bairro}`;
            texto += `\n${MEU_ENDERECO.cidade}-${MEU_ENDERECO.uf} / ${MEU_ENDERECO.cep} | ${MEU_ENDERECO.complemento}`;
            texto += `\n\n*Total (com entrega): R$ ${(VALOR_CARRINHO + VALOR_ENTREGA).toFixed(2).replace(',', ',')}*`;

            var itens = '';

            $.each(MEU_CARRINHO, (i, e) => {

                itens += `*${e.qntd}x* ${e.name} ...... R$ ${e.price.toFixed(2).replace('.', ',')} \n`;

                // ÚLTIMO ITEM
                if ((i + 1) == MEU_CARRINHO.length) {

                    texto = texto.replace(/\${itens}/g, itens);

                    // CONVERTER A URL
                    let encoded = encodeURI(texto);
                    let url = `https://wa.me/${CELULAR_EMPRESA}?text=${encoded}`;

                    $('#btnEtapaResumo').attr('href', url);

                }

            })

        }

    },

    // CARREGA O LINK DO BOTÃO DE RESERVAS
    carregarBotaoReserva: () => {

        var texto = 'Olá, gostaria de fazer uma *reserva*.';

        let encoded = encodeURI(texto);
        let url = `https://wa.me/${CELULAR_EMPRESA}?text=${encoded}`;

        $('#btnReserva').attr('href', url);     

    },

    // CARREGA O BOTÃO DE LIGAR
    carregarBotaoLigar: () => {

        $("#btnLigar").attr('href', `tel:${CELULAR_EMPRESA}`);

    },

    // MÉTODO PARA ABRIR O DEPOIMENTO
    abrirDepoimento: (depoimento) => {

        $("#depoimento-1").addClass('hidden');
        $("#depoimento-2").addClass('hidden');
        $("#depoimento-3").addClass('hidden');

        $("#btnDepoimento-1").removeClass('active');
        $("#btnDepoimento-2").removeClass('active');
        $("#btnDepoimento-3").removeClass('active');

        $("#depoimento-" + depoimento).removeClass('hidden');
        $("#btnDepoimento-" + depoimento).addClass('active');

    },

    // MENSAGENS
    mensagem: (texto, cor = 'red', tempo = 3500) => {

        let id = Math.floor(Date.now() * Math.random()).toString();

        let msg = `<div id="msg-${id}" class="animated fadeInDown toast ${cor}">${texto}</div>`;

        $("#container-mensagens").append(msg);

        setTimeout(() => {

            $("#msg-" + id).removeClass('fadeInDown');
            $("#msg-" + id).addClass('fadeOutUp');
            
            setTimeout(() => {

                $("#msg-" + id).remove();

            }, 800);

        }, tempo)

    },

}

cardapio.templates = {

    item: `
    
    <div class="col-12 col-lg-3 col-md-3 col-sm-6 mt-5 animated fadeIn delay-03s">

        <div class="card card-item" id="\${id}">

            <div class="img-produto">

                <img src="\${img}" alt="Imagem do produto">

            </div>

            <p class="title-produto text-center mt-4">

                <b>\${name}</b>

            </p>

            <p class="price-produto text-center">

                <b>R$ \${price}</b>

            </p>

            <div class="add-carrinho">

                <span class="btn-menos" onclick="cardapio.metodos.diminuirQuantidade('\${id}')"><i class="fas fa-minus"></i></span>
                <span class="add-numero-itens" id="qntd-\${id}">0</span>
                <span class="btn-mais" onclick="cardapio.metodos.aumentarQuantidade('\${id}')"><i class="fas fa-plus"></i></span>
                <span class="btn btn-add" onclick="cardapio.metodos.adicionarAoCarrinho('\${id}')"><i class="fa fa-shopping-bag"></i></span>

            </div>

        </div>

    </div>

    `,

    itemCarrinho: `
    <div class="col-12 item-carrinho">

        <div class="img-produto">

            <img src="\${img}" alt="Imagem produto">

        </div>

        <div class="dados-produto">

            <p class="title-produto"><b>\${name}</b></p>
            <p class="price-produto"><b>R$ \${price}</b></p>

        </div>

        <div class="add-carrinho">

            <span class="btn-menos" onclick="cardapio.metodos.diminuirQuantidadeCarrinho('\${id}')"><i class="fas fa-minus"></i></span>
            <span class="add-numero-itens" id="qntd-carrinho-\${id}">\${qntd}</span>
            <span class="btn-mais" onclick="cardapio.metodos.aumentarQuantidadeCarrinho('\${id}')"><i class="fas fa-plus"></i></span>
            <span class="btn btn-remove no-mobile" onclick="cardapio.metodos.removerItemCarrinho('\${id}')"><i class="fa fa-times"></i></span>

        </div>

    </div>
    `,

    itemResumo: `
    
    <div class="col-12 item-carrinho resumo">

        <div class="img-produto-resumo">

            <img src="\${img}" alt="Imagem produto">

        </div>

        <div class="dados-produto">

            <p class="title-produto-resumo">

                <b>\${name}</b>

            </p>

            <p class="price-produto-resumo">

                <b>R$ \${price}</b>

            </p>

        </div>

        <p class="quantidade-produto-resumo">

            x <b> \${qntd}</b>

        </p>

    </div>

    `

}