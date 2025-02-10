// Array global para armazenar os objetos que, por sua vez, terão os dados do formulario
let list = [];

// Recuperar dados do Local Storage ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    const dadosSalvos = localStorage.getItem("list");
    if (dadosSalvos) {
        list = JSON.parse(dadosSalvos);
        exibirLista();
    }
});

function store(){

    var dataAtual = new Date();
    // Formatando a data para o formato brasileiro (dd/mm/aaaa hh:mm:ss)
    var dataFormatada = dataAtual.toLocaleDateString("pt-BR");

    // Captura os valores do formulário
    const nome = document.getElementById("nome").value;
    const area = document.getElementById("area").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;
    const uso = document.getElementById("uso").value;

    // Verifica se os campos foram preenchidos
    if (!nome || !area || !email || !telefone) {
        alert("Preencha todos os campos antes de cadastrar!");
        return;
    }
    
    // Criando um objeto
    const cadastro = {nome, area, email, telefone, uso, dataFormatada};

    //Adicionando o objeto cadastro no array
    list.push(cadastro); 

    // Salva no Local Storage
    localStorage.setItem("cadastro", JSON.stringify(list));

    // Atualiza a exibição
    exibirLista();

    // Limpa os campos do formulário
    document.querySelector(".form-cadastro").reset();
}

// Função para exibir os itens na tela
function exibirLista() {
    const listaElement = document.getElementById("lista-cadastros");
    listaElement.innerHTML = ""; // Limpa a lista antes de atualizar

    list.forEach((cadastro, index) => {
        const item = document.createElement("li");
        item.innerHTML = `Nome: ${cadastro.nome} <br>Email: ${cadastro.email} <br>Telefone: ${cadastro.telefone} <br>Uso do serviço: ${cadastro.uso} 
        <br><small>(Data do cadastro: ${cadastro.dataFormatada})</small>
        <button onclick="removerCadastro(${index})">Excluir</button><br><br>`;
        listaElement.appendChild(item);
    });
}

// Função para remover um item pelo índice
function removerCadastro(index) {
    list.splice(index, 1); // Remove do array
    localStorage.setItem("cadastro", JSON.stringify(list)); // Atualiza o Local Storage
    exibirLista(); // Atualiza a exibição
}

// Função para limpar todos os cadastros
function limparCadastros() {
    list = []; // Esvazia o array
    localStorage.clear();
    //localStorage.removeItem("list"); // Remove do Local Storage

    exibirLista(); // Atualiza a exibição
}


// Função para pesquisar um cadastro pelo nome
function pesquisarCadastro() {
    const termoPesquisa = document.getElementById("pesquisa").value.toLowerCase();
    const listaElement = document.getElementById("lista-cadastros");
    const botaoMostrarTodos = document.getElementById("btn-mostrar-todos");

    // Limpa a exibição antes de mostrar os resultados da pesquisa
    listaElement.innerHTML = "";

    // Filtra os cadastros que correspondem ao nome digitado
    const resultados = list.filter(cadastro => cadastro.nome.toLowerCase().includes(termoPesquisa));

    if (resultados.length === 0) {
        listaElement.innerHTML = `<li>Nenhum resultado encontrado</li><br>`;
        return;
    }else{
        // Exibir os resultados encontrados
        resultados.forEach((cadastro, index) => {
        const item = document.createElement("li");
        item.innerHTML = `Nome: ${cadastro.nome} <br>Email: ${cadastro.email} <br>Telefone: ${cadastro.telefone} <br>Uso do serviço: ${cadastro.uso} 
        <br><small>(Data do cadastro: ${cadastro.dataFormatada})</small>`;
        listaElement.appendChild(item);
        });
    }

    // Exibir o botão "Mostrar Todos" sempre que houver uma pesquisa
    botaoMostrarTodos.style.display = "block"; 
}

// Função para voltar a exibir todos os cadastros
function exibirTodosCadastros() {
    document.getElementById("pesquisa").value = ""; // Limpa o campo de pesquisa
    exibirLista(); // Chama a função que exibe todos os cadastros
    document.getElementById("btn-mostrar-todos").style.display = "none"; // Esconde o botão
}