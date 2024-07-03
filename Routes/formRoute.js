import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const routers = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

routers.use(express.static('Forms'));
routers.get('/formulario', (req, res) => {
    res.sendFile(join(__dirname, '../', 'Forms', 'form.html'));
    post((req, res) => {
        let dates = {cpf}
        res.send('INSERT INTO formulario VALUES ?')
    })
});

export { routers };