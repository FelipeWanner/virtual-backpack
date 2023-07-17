const form = document.querySelector("[data-novoItem]"); //captura o form
const lista = document.querySelector("[data-lista]"); //captura a 'ul' para podermos passar o novo 'li'
const itens = JSON.parse(localStorage.getItem("itens")) || []; //array com os itens que o usuario colocara na mochila
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

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual;
    } else{
        //se o item nao existir, e for o primeiro item no array, ele recebe 0
        //se ja existem itens no array, pegamos o id do ultimo item, e incremenetamos 1
        //Fazemos isso atraves do operador ternario. Lê-se: Se ultimo item igual a algo, id desse algo + 1
        //se ultimo item igual a null, id = 0

        itemAtual.id = itens[itens.length -1] ? (itens[itens.length -1]).id + 1 : 0

        criaElemento(itemAtual)

        itens.push(itemAtual)
    }

    //agora passando o itemAtual como string para o localStorage armazenar
    //IMPORTANTE: o localStorage so e capaz de ler strings, por isso ao passar algo para, deve se utilizar o stringfy
    localStorage.setItem("itens", JSON.stringify(itens))

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
    
    novoItem.appendChild(botaoDeleta(item.id)); //passando o botaoDeleta ao lado do nome de cada li
    
    lista.appendChild(novoItem); //passando a nova li para dentro da ul
}

function atualizaElemento(item){
    //a funcao busca no documento a dataAttribute "data-id" no id especifico do item, e atualiza o item
    //com a nova quantidade recebida atraves do innerHTML
    document.querySelector(`[data-id="${item.id}"]`).innerHTML = item.quantidade
}

function botaoDeleta(id){
    //criando uma tag button e passando 'X' dentro da tag
    const elementoBotao = document.createElement("button");
    elementoBotao.innerText = "X";

    //IMPORTANTE: o addEventListener so funciona com elementos ja carregados no arquivo HTML, para 
    //tags HTML criadas dinamicamente no JS. Para essas tags, devemos cria-las ja atribuindo o addEventListener 
    
    //IMPORTANTE 2: arrow function nao carrega o elemento 'this' para frente, isso significa que, nesse caso devemos
    //declarar a funcao, podendo ser inclusive a funcao anonima. Precisamos do elemento 'this', justamente pq 
    //precisamos saber qual botao foi clicado.
    elementoBotao.addEventListener("click", function(){
        deletaElemento(this.parentNode, id);
        //selecionamos o pai de this, ou pai do button neste caso, que e o li
    });

    return elementoBotao;
}

function deletaElemento(tag, id){
    //remove a tag inteira, nesse caso o pai de button, que e a li
    tag.remove()

    //aqui estamos usando o metodo splice, e no primeiro parametro encontrando o elemento que corresponde ao id
    //da tag clicada e o deleta.
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1);

    //agora que removemos o item do array itens, vamos passalo para o localStorage de forma atualizada
    localStorage.setItem("itens", JSON.stringify(itens))
}