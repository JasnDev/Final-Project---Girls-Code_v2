import express from 'express';
import bodyParser from 'body-parser';
import { db } from './db.js';
import { router } from './Routes/formRoute.js';


const app = express();
app.use(express.static('PI---Girls-Code-main'));
app.use(router);
app.use(bodyParser.urlencoded({ extended: false }));


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
        await connection.query(
            'INSERT INTO cadastro (CPF, Nome, Email, Senha, CEP) VALUES (?, ?, ?, ?, ?)',
            [cpf, name, email, password, cep]
        );

        res.json({ message: 'Sucesso' });
    } catch (error) {
        console.error('Erro na consulta:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});


const PORT = 3306;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
