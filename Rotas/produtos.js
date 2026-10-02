import express from "express";
import produtos from "../Data/produtos.js";

const router = express.Router();

function verificarProdutoExiste(req, res, next) {
    const { id } = req.params;
    const index = produtos.findIndex((produto) => produto.id == id);

    if (index < 0) {
        return res.status(404).json({ error: "Produto não encontrado!" });
    }

    req.id = id;
    req.index = index;

    return next();
}

router.get("/", (req, res) => {
    res.json(produtos);
});

router.post("/", (req, res) => {
    const { id, nome, descricao, img } = req.body;

    if (!id || !nome || !descricao || !img) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
    }

    const novoProduto = {
        id: Number(id),
        nome,
        descricao,
        img
    };

    produtos.push(novoProduto);

    res.status(201).json(novoProduto);
});

router.put("/:id", verificarProdutoExiste, (req, res) => {
    const { nome, descricao, img } = req.body;
    const index = req.index;

    produtos[index] = {
        ...produtos[index],
        nome: nome !== undefined ? nome : produtos[index].nome,
        descricao: descricao !== undefined ? descricao : produtos[index].descricao,
        img: img !== undefined ? img : produtos[index].img
    };

    res.status(200).json(produtos[index]);
});

router.delete("/:id", verificarProdutoExiste, (req, res) => {
    const index = req.index;
    const id = req.id;

    produtos.splice(index, 1);

    res.status(204).send();
});

export default router;