import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import bcrypt from 'bcryptjs'
import { db } from './db.js';
import { router } from './Routes/formRoute.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.static('ProjetoGirlsCode-FinalVersion'));
app.use(router);
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/bd', async (req, res) => {
    try {
        const connection = await db();
        const rows = await connection.query('SELECT * FROM cadastro;');
        res.json(rows);
    } catch (error) {
        console.error('Erro', error);
        res.status(500).json({ error: 'Erro no servidor: não foi possível buscar os dados.' });
    }
});

app.post('/form', async (req, res) => {
    try {
        const { cpf, name, email, cep } = req.body;
        const passwordSalt = bcrypt.genSaltSync(1);
        const passwordCrypt = bcrypt.hashSync(req.body.password, passwordSalt);
        const connection = await db();
        await connection.query(
            'INSERT INTO cadastro (CPF, Nome, Email, Senha, CEP) VALUES (?, ?, ?, ?, ?)',
            [cpf, name, email, passwordCrypt, cep]
        );
        res.redirect('/sucess');

    } catch (error) {
        console.error('Erro no cadastro:', error);
        res.status(500).json({ error: 'Cadastro não realizado.' });
    }
});

app.get('/sucess', async(req, res) => {
    const idCad = req.params.id_cadastro;

    const result = await connection.query('SELECT * FROM cadastro WHERE id_cadastro = ?', [idCad]);
    console.log(result)
    res.json(result)
});


const PORT = 3306;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});