const express = require('express');
const router = express.Router();

const filmes = [
    {
        id: Date.now(),
        nome: "Demon Slayer: Mugen Train",
        ano: "2020",
        poster: "https://d17lbu6bbzbdc8.cloudfront.net/wp-content/uploads/2021/09/28080018/mugen-train.jpg",
        genero: "Ação/Fantasia",
        duracao: "2h"
        
    },
    {
        id: Date.now(),
        nome: "Viúva Negra",
        ano: "2021",
        poster: "https://m.media-amazon.com/images/M/MV5BNjRmNDI5MjMtMmFhZi00YzcwLWI4ZGItMGI2MjI0N2Q3YmIwXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg",
        genero: "Ação/Aventura",
        duracao: "2h 13m"
        
    },
    {
        id: Date.now(),
        nome: "Space Jam: O jogo do Século",
        ano: "1996",
        poster: "https://i.pinimg.com/736x/10/a9/f1/10a9f17ee50426cb6572097e827e217d.jpg",
        genero: "Infantil/Comédia",
        duracao: "1h 28m"
        
    },
    {
        id: Date.now(),
        nome: "Mostros S.A.",
        ano: "2001",
        poster: "https://i.pinimg.com/originals/4c/4c/91/4c4c91f15251510f75a973eea0470014.jpg",
        genero: "Comédia/Fantasia",
        duracao: "1h 36m"
        
    }
];

router.get("/", (req, res) => {
    res.send(filmes);
});

router.get('/:id', (req, res) => {
    const idParam = req.params.id;
    const filme = filmes.find(filme => filme.id == idParam);
    if(!filme){
        res.status(404).send({error: 'Filme não encontrado'});
        return
    }
    res.send(filme);
});

router.post("/cadastrar", (req, res)=>{
    const filme = req.body;

    if(!filme || !filme.titulo || !filme.ano || filme.poster || filme.poster || filme.genero || filme.duracao) {
        res.status(400).send({
            message: 'Impossível cadastrar filme, preencha os campos corretamente!'
        });
        return;
    }   

    filme.id = Date.now();
    filmes.push(filme);
    res.send({
        message: "Filme cadastrado com sucesso",
        data: filme
    });
});

router.put('/editar/:id', (req, res)=>{
    const filmeEditado = req.body;
    const id = req.params.id;
    let index = filmes.findIndex(filme => filme.id == id);

    if (index < 0) {
        res.status(404).send({
            error: 'Filme não encontrado'
        });
        return;
    }

    filmes[index] = {
        ...filmes[index],
        ...filmeEditado
    }

    res.send({
        message: `Filme editado com sucesso`,
        data: filmes[index]
    })
});

router.delete('/apagar/:id', (req, res) => {
    const id = req.params.id;
    const index = filmes.findIndex(filme => filme.id == id);
    const nome = filmes[index];
    filmes.splice(index,1);

    res.send({
        message: `Filme fou excluído com sucesso`
    })
});

module.exports = router;