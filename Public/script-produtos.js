document.addEventListener("DOMContentLoaded", () => {
  const containerCards = document.getElementById("container-cards");

  // Substitua pela URL da sua rota no Node.js (ex: http://localhost:3000/api/cardapio)
  const URL_API = "http://localhost:3000/api/produtos";

  async function carregarProdutos() {
    try {
      const resposta = await fetch(URL_API);
      const produtos = await resposta.json();

      // Limpa a mensagem "Carregando cardápio..."
      containerCards.innerHTML = "";

      // Percorre a lista recebida do backend e cria o HTML para cada produto
      produtos.forEach((produto) => {
        const card = document.createElement("article");
        card.classList.add("card");

        card.innerHTML = `
          <img src="${produto.img}" alt="${produto.nome}"/>
          <h3>${produto.nome}</h3>
          <p>${produto.descricao}</p>
          <button>Pedir Agora</button>
        `;

        containerCards.appendChild(card);
      });
    } catch (erro) {
      console.erro("Erro ao carregar os produtos:", erro);
      containerCards.innerHTML = "<p>Não foi possível carregar os produtos no momento.</p>";
    }
  }

  carregarProdutos();
});