// server.js
const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');

const serviceAccount = require('./hahaha.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://teste-dfb53-default-rtdb.firebaseio.com"
});

const db = admin.database();
const palavrasRef = db.ref("Cartoes");

const app = express();
app.use(bodyParser.json());

app.post('/cadUid', (req, res) => {
  const { uid } = req.body;
  if (uid) {
      // Verificar se o UID já existe
      palavrasRef.orderByChild("uid").equalTo(uid).once("value", snapshot => {
          if (snapshot.exists()) {
              // UID já existe, retornar erro
              res.status(400).send('UID já cadastrado.');
          } else {
              // UID não existe, cadastrar
              cadCartao(uid)
                  .then(() => res.status(200).send('Cartão cadastrado com sucesso!'))
                  .catch(error => res.status(500).send(`Erro ao cadastrar UID: ${error}`));
          }
      });
  } else {
      res.status(400).send('Cartão é obrigatório.');
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

function cadCartao(uid) {
  return palavrasRef.push({ uid});
}