const form = document.querySelector("[data-novoItem]"); //captura o form
const lista = document.querySelector("[data-lista]"); //captura a 'ul' para podermos passar o novo 'li'
const itens = JSON.parse(localStorage.getItem("item")) || []; //array com os itens que o usuario colocara na mochila
//se o localStorage estiver vazio, a funcao getItem retorn false e entao atribuimos um array vazio para a const
//IMPORTANTE: antes de buscarmos algum elemento no localStorage, devemos usar o metodo parse, uma vez que todo item
//passado para o localStorage e uma string. E como se o parse fosso o contrario de stringfy 

console.log(itens)
itens.forEach((elemento) =>{
    criaElemento(elemento)
});

form.addEventListener("submit", (event)=>{
    event.preventDefault()

    const nome = event.target.elements["nome"] //captura o nome do objeto a ser posto na mochila
    const quantidade = event.target.elements["quantidade"] //captura a quantidade de objetos a serem postos na mochila

    //const existe verifica se o elemento (item colocado na mochila) ja existe no array itens. se existir ele retorna o
    //nome do elemento, se nao existir, retorn undefined
    const existe = itens.find(elemento => elemento.nome === nome.value); 

    // criando objeto para passar para o localStorage
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value,
    }

    if (existe) {
        //se o item existe, passamos o id para ele de novo e chamamos a funcao atualizaElemento
        itemAtual.id = existe.id

        atualizaElemento(itemAtual);

        itens[existe.id] = itemAtual;
    } else{
        //se o item nao existir, criamos o item e passamos o id igual ao tamanho do array itens.
        itemAtual.id = itens.length

        criaElemento(itemAtual)

        itens.push(itemAtual)
    }

    //agora passando o itemAtual como string para o localStorage armazenar
    //IMPORTANTE: o localStorage so e capaz de ler strings, por isso ao passar algo para, deve se utilizar o stringfy
    localStorage.setItem("item", JSON.stringify(itens))

    //limpando o campo nome e quantidade apos chamada de funcao criaElemento
    nome.value = ""; 
    quantidade.value = "";
})

function criaElemento(item) {

    //<li class="item"><strong>7</strong>Camisas</li>
    const novoItem = document.createElement('li'); //criando mais uma linha na lista de objetos
    novoItem.classList.add("item"); //adicionando a classe css nessa nova linha

    const numeroItem = document.createElement("strong"); //criando a tag strong com o numero de objetos a serem colocados na mochila
    numeroItem.innerHTML = item.quantidade; //passando a quantidade recebida na funcao para dentro do HTML dentro da recem criada tag strong
    numeroItem.dataset.id = item.id; //criando dataAttribute "id" passando o id do item
    novoItem.appendChild(numeroItem); //a tag li recebendo a tag strong ja com a sua quantidade adicionada
    novoItem.innerHTML += item.nome; //passando o nome recebido na funcao para dentro do HTML dentro da recem criada tag li

    lista.appendChild(novoItem);
}

function atualizaElemento(item){
    //a funcao busca no documento a dataAttribute "data-id" no id especifico do item, e atualiza o item
    //com a nova quantidade recebida atraves do innerHTML
    document.querySelector(`[data-id="${item.id}"]`).innerHTML = item.quantidade
}