import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const router = express.Router();


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.use(bodyParser.urlencoded({ extended: false }));

router.get('/form', (req, res) => {
    res.sendFile(join(__dirname, '../', 'PI---Girls-Code-main', 'form.html'));
});

router.get(`/sucess/`, (req, res) => {
    res.sendFile(join(__dirname, '../', 'PI---Girls-Code-main', 'sucess.html'));
});


export { router };


