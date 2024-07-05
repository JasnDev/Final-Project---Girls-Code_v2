import express from 'express';
import bodyParser from 'body-parser';
import ejs from 'ejs'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import { db } from './db.js';
import { router } from './Routes/formRoute.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.static('PI---Girls-Code-main'));
app.use(router);
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));


app.get("/bd", async (req, res) => {
    try {
        const connection = await db();
        const rows = await connection.query("SELECT * FROM cadastro;");
        res.json(rows);
    } catch (error) {
        console.error("Erro", error);
        res.status(500).json({ error: "Erro servidor não iniciado :(" });
    }
});
app.post('/form', async (req,res) => {
    try {
        const { cpf, name, email, password, cep } = req.body;

        const connection = await db();
        const result = await connection.query(
            'INSERT INTO cadastro (CPF, Nome, Email, Senha, CEP) VALUES (?, ?, ?, ?, ?)',
            [cpf, name, email, password, cep]
        );
        console.log(result)
        res.redirect(`/sucess/${result.insertId}`)
    } catch (error) {
        console.error('Erro no cadastro:', error);
        res.status(500).json({ error: 'cadastro não realizado.' });
    }
});
app.get(`/sucess/:id_cadastro`, async (req, res) =>{
    const id = req.params.id_cadastro;

    const connection = await db()
    const dates = await connection.query(`SELECT * FROM cadastro WHERE id_cadastro = ?`, [id]);

    res.render('sucess', {dates: dates});
});

const PORT = 3306;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
