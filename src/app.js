import express from "express";

const app = express();
app.use(express.json());

app.use((erro, req, res, next) => {
    res.status(500).send({ message: "Erro interno do servidor" });
    next(erro);
});

const livros = [
    {
        id: 1,
        titulo: "O Senhor dos Anéis"
    },
    {
        id: 2,
        titulo: "O Hobbit"
    },
];

const autores = [
    {
        id: 1,
        nome: "Julio",
    },
    {
        id: 2,
        nome: "Marcelo",
    },
]

function buscaLivros(id) {
    return livros.findIndex(livro => livro.id === Number(id));
}

app.get("/", (req, res) => {
    res.status(200).send("Estudando Node.js");
});

app.get("/livros", (req, res) => {
    res.status(200).json(livros);
});

app.get("/autores", (req, res) => {
    res.status(200).json(autores);
});

app.get("/livros/:id", (req, res) => {
    const index = buscaLivros(req.params.id);
    if (index !== -1) {
        res.status(200).json(livros[index]);
    } else {
        res.status(404).send("Livro não encontrado.");
    }
});

app.post("/livros", (req, res) => {
    livros.push(req.body);
    res.status(201).send("Livro cadastrado!");
});

app.put("/livros/:id", (req, res) => {
    const index = buscaLivros(req.params.id);
    if (index !== -1) {
        if (req.body.titulo) {
            livros[index].titulo = req.body.titulo;
            res.status(200).json(livros[index]);
        } else {
            res.status(400).send("O campo 'titulo' é obrigatório.");
        }
    } else {
        res.status(404).send("Livro não encontrado.");
    }
});

app.delete("/livros/:id", (req, res) => {
    const index = buscaLivros(req.params.id);
    if (index !== -1) {
        livros.splice(index, 1);
        res.status(200).send('Deletado!')
    } else {
        res.status(404).send("Livro não encontrado.");
    }
})

export default app;