// server.js
const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');

// Inicialize o app do Firebase Admin SDK
const serviceAccount = require('./hahaha.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://teste-dfb53-default-rtdb.firebaseio.com"
});

const db = admin.database();
const palavrasRef = db.ref("UIDs");

const app = express();
app.use(bodyParser.json());

// Rota para cadastrar UID
app.post('/cadUid', (req, res) => {
    const { uid,  } = req.body;
    if (uid) {
        cadastrarPalavra(uid, "pendente")
            .then(() => res.status(200).send('UID cadastrado com sucesso!'))
            .catch(error => res.status(500).send(`Erro ao cadastrar UID: ${error}`));
    } else {
        res.status(400).send('UID e status são obrigatórios.');
    }
});

function cadastrarPalavra(uid, status) {
  return palavrasRef.push({ uid, status });
}

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
