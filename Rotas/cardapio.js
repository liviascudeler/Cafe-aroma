import express from "express";
import dados from "../Data/cardapio.js";

const router = express.Router();

function verificarItemExtiste(req, res, next) {
    const { id } = req.params;
    const index = dados.findIndex((item) => item.id == id);

    if (index<0) {
        return res.status(404).json({ error: "Item do cardápionão encontrado!" });
    }
    req.id = id;
    req.index = index;

    return next();
}

router.get("/", (req, res) => {
  res.json(dados);
});

router.post("/", (req, res) => {
  const { nome, descricao, img } = req.body;

  if (!id || !nome || !descricao || !img) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
  }
  //Criar o novo produto
  const novoItem ={
    id: Number(id),
    nome,
    descricao,
    img
  };

  dados.push(novoItem);

  res.status(201).json(dados);
});

router.put("/:_id", verificarItemExtiste, (req, res) => {
  const { nome, descricao, img } = req.body;
  const index = req.index;

  dados[index] = {
    ...dados[index],
    nome: nome !== undefined ? nome: dados[index].nome,
    descricao: descricao !== undefined ? descricao: dados[index].descricao,
    img: img !== undefined ? img: dados[index].img
  };

  res.status(200).json(dados[index]);
});

router.delete("/:_id", verificarItemExtiste, (req, res) => {
    const index = req.index;
    const id = req.id;

    dados.splice(index, 1);

    res.status(204).json({ message: `Item com id ${id} removido com sucesso!` });
});

export default router;