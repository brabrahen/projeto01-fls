const express = require('express');
const cors = require('cors');

const filmesRouter = require('./routes/filmes.routes');
const app = express();

app.use(express.json());
app.use(cors());


app.use('/filmes', filmesRouter);

const port = 3000;
app.listen(port, () => {
    console.log(`O app está rodando em http://localhost:${port}`);
});
