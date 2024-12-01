var localCarrinho=localStorage.getItem('carrinho')

if(localCarrinho)
{
    var carrinho= JSON.parse(localCarrinho)
    if(carrinho.length > 0)
    {
        //renderizar carrinho e somar produtos
        renderizarCarrinho()
      
    }else
    {
        //mostrar carrinho vazio
        carrinhoVazio()
    }
}else
{
    carrinhoVazio()
}

function renderizarCarrinho(){
    //esvaziar area dos items
    $('#listaCarrinho').empty()

    //percorrer o carrinho e alimentar a area
    $.each(carrinho, function(index, itemCarrinho){
        var itemDiv=`   <div class="item-carrinho" data-index="${index}">
                            <div class="area-img">
                                <img src="${itemCarrinho.item.imagem}">
                            </div>
                            <div class="area-details">
                                <div class="sup">
                                    <span class="name-prod">
                                       "${itemCarrinho.item.nome}
                                    </span>
                                    <a class="delete-item" href="#">
                                        <i class="mdi mdi-close"></i>
                                    </a>
                                </div>
                                <div class="middle">
                                    <span>1 Terabyte</span>
                                </div>
                                <div class="preco-quantidade">
                                    <span>R$ 99,500</span>
                                    <div class="count">
                                        <a class="minus" href="#">-</a>
                                        <input readonly class="qtd-item" type="text" value="1">
                                        <a class="plus" href="#">+</a>
                                    </div>
                                </div>
                            </div>
                        </div>`

                        $('#listaCarrinho'.append(itemDiv))
    })
}

function carrinhoVazio(){
    console.log('Carrinho está vazio')
    $('#listaCarrinho').empty()

    //sumir os items de baixo
    $('#toolbarTotais').addClass('display-none')
    $('#toolbarCheckout').addClass('display-none')

    //mostrar sacola vazia
    $('#listaCarrinho').html(`
        <div class="text-align-center">
        <img width="300" src="../imagens/empty.gif">
        <br>
        <span class="color-gray">Nada Por Enquanto... </span>
        </div>`)
}

$('#esvaziar').on('click',function(){
    app.dialog.confirm('Tem certeza que quer esvaziar o carrinho ?','ESVAZIAR CARRINHO',function(){
        //apagar local storage carrinho
        localStorage.removeItem('carrinho')
        app.views.main.router.refreshPage()
    } )
})