import express from 'express';
import { db } from './db.js';
import { routers } from './Routes/formRoute.js';

const app = express();

app.get("/", async (req, res) => {
    try {
        const connection = await db();
        const rows = await connection.query("SELECT * FROM cadastro;");
        res.json(rows);
    } catch (error) {
        console.error("Erro", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});

app.use(express.static('Forms'));
app.use(routers);




const PORT = 3306;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});