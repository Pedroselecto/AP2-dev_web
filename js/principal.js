const container = document.getElementById("container")
let lista_atletas = []


const pega_json = async (caminho) => {
    const resposta = await fetch(caminho);
    const dados = await resposta.json();
    return dados;
}

const manipulaClick = (evento) => {
    const id = evento.currentTarget.dataset.id
    const nome = evento.currentTarget.dataset.nome
    const desc = evento.currentTarget.dataset.desc

    // Criando cookies de quem foi clicado (ficam disponíveis em todo o site)
    document.cookie = `id=${id}`
    document.cookie = `nome=${nome}`
    document.cookie = `desc=${desc}`

    // Session
    sessionStorage.setItem("id", id)
    sessionStorage.setItem("atleta", JSON.stringify(evento.currentTarget.dataset))

    // Local
    localStorage.setItem("id", id)
    localStorage.setItem("atleta", JSON.stringify(evento.currentTarget.dataset))


    window.location = `detalhes.html?id=${id}`
}

const montaCard = (atleta) => {
    const cartao = document.createElement("div");
    cartao.classList.add("cartao")
    const nome = document.createElement("h1");
    const imagem = document.createElement("img");
    const link = document.createElement("a");


    nome.innerHTML = atleta.nome;
    cartao.appendChild(nome);

    imagem.src = atleta.imagem;
    cartao.appendChild(imagem);


    // link.innerHTML = "Saiba mais..."
    // link.href = `detalhes.html?id=${atleta.id}`
    // cartao.appendChild(link)

    cartao.dataset.id = atleta.id;
    cartao.dataset.nome = atleta.nome;

    cartao.onclick = manipulaClick;

    container.appendChild(cartao)
}

const botao_all = document.getElementById("botao_all")
const botao_masculino = document.getElementById("botao_masculino")
const botao_feminino = document.getElementById("botao_feminino")

botao_all.onclick = () => {
    container.innerHTML = ""
    pega_json("https://botafogo-atletas.mange.li/2024-1/all").then(
    (retorno) => {
        lista_atletas = retorno
        retorno.forEach((atleta) => montaCard(atleta))
    }
)}

botao_masculino.onclick = () => {
    container.innerHTML = ""
    pega_json("https://botafogo-atletas.mange.li/2024-1/masculino").then(
    (retorno) => {
        lista_atletas = retorno
        retorno.forEach((atleta) => montaCard(atleta))
    }
)}

botao_feminino.onclick = () => {
    container.innerHTML = ""
    pega_json("https://botafogo-atletas.mange.li/2024-1/feminino").then(
    (retorno) => {
        lista_atletas = retorno
        retorno.forEach((atleta) => montaCard(atleta))
    }
)}

const seletor_elenco = document.getElementById("seletor_elenco")

seletor_elenco.onchange = () => {
    container.innerHTML = ""
    pega_json(`https://botafogo-atletas.mange.li/2024-1/${seletor_elenco.value}`).then(
    (retorno) => {
        lista_atletas = retorno
        retorno.forEach((atleta) => montaCard(atleta))}
    )}

const opcao_fixa = document.getElementById("fixa")
opcao_fixa.setAttribute("selected", "true")

const barra_pesquisa = document.getElementById("barra_pesquisa")
barra_pesquisa.oninput = () => {
    container.innerHTML = ""
    lista_atletas.forEach((atleta) => {
        if (atleta.nome.toLowerCase().includes(barra_pesquisa.value.toLowerCase())) {
            montaCard(atleta)
        }
    })
    }

const logout = () => {
    sessionStorage.removeItem("logado")
    alert("Logout feito com sucesso.")
    window.location = "index.html"
}

if (sessionStorage.getItem("logado")) {
} else {
    document.body.innerHTML = "<h1>Usuário não logado</h1> <a href='index.html'>voltar</a>"


}