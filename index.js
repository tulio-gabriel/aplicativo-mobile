fetch('js/backend.json')
.then(response => response.json())
.then(data=> {
    //salvar dados vindos do backend localmente com local storage
    localStorage.setItem('produtos',JSON.stringify(data))
    console.log('Dados dos produtos salvos no localStorage')


    setTimeout(()=>{
        //simular carregamento online
        $("#produtos").empty();

        
    data.forEach(produto =>{
        var produtoHtml=`
         <div class="item-card">
                                <a data-id=${produto.id} href="#" class="item">
                                    <div class="img-container">
                                        <img  src="${produto.imagem}" alt="">
                                    </div>
                                    <div class="nome-rating">
                                        <span class="color-gray">${produto.nome}</span>
                                        <span class="bold margin-right">
                                            <i class="mdi mdi-star"></i>
                                            ${produto.rating}
                                        </span>
                                    </div>
                                    <div class="price ">${produto.preco_promocional.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</div>
                                </a> 
                            </div>
        `;

        $('#produtos').append(produtoHtml)
    });

    $(".item").on('click', function () {
        var id=$(this).attr('data-id')
        localStorage.setItem('detalhe',id)
        app.views.main.router.navigate('/detalhes/')
    })

    }, 1000)
})
.catch(error => console.error("Erro ao fazer fetch dos dados: "+error))

//items no carrinho
setTimeout(()=>{
    var carrinho= JSON.parse(localStorage.getItem('carrinho')) || []

    //alimentar contador da sacola
    $('.btn-cart').attr('data-count', carrinho.length) 
},300)