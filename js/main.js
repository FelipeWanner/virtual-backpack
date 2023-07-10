const form = document.querySelector("[data-novoItem]"); //captura o form
const lista = document.querySelector("[data-lista]"); //captura a 'ul' para podermos passar o novo 'li'
const items = [];

form.addEventListener("submit", (event)=>{
    event.preventDefault()

    const nome = event.target.elements["nome"] //captura o nome do objeto a ser posto na mochila
    const quantidade = event.target.elements["quantidade"] //captura a quantidade de objetos a serem postos na mochila

    criaElemento(nome.value, quantidade.value)

    //limpando o campo nome e quantidade apos chamada de funcao criaElemento
    nome.value = ""; 
    quantidade.value = "";
})

function criaElemento(nome, quantidade) {

    //<li class="item"><strong>7</strong>Camisas</li>
    const novoItem = document.createElement('li'); //criando mais uma linha na lista de objetos
    novoItem.classList.add("item"); //adicionando a classe css nessa nova linha

    const numeroItem = document.createElement("strong"); //criando a tag strong com o numero de objetos a serem colocados na mochila
    numeroItem.innerHTML = quantidade; //passando a quantidade recebida na funcao para dentro do HTML dentro da recem criada tag strong

    novoItem.appendChild(numeroItem); //a tag li recebendo a tag strong ja com a sua quantidade adicionada
    novoItem.innerHTML += nome; //passando o nome recebido na funcao para dentro do HTML dentro da recem criada tag li

    lista.appendChild(novoItem);

    // criando objeto para passar para o localStorage
    const itemAtual = {
        "nome": nome,
        "quantidade": quantidade,
    }

    items.push(itemAtual)

    //agora passando o itemAtual como string para o localStorage armazenar
    //IMPORTANTE: o localStorage so e capaz de ler strings, por isso ao passar algo para, deve se utilizar o stringfy
    localStorage.setItem("item", JSON.stringify(items))
}