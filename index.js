// server.js
const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');

// Inicialize o app do Firebase Admin SDK
const serviceAccount = require('./DaviBD3.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://projetoflask-fb-default-rtdb.firebaseio.com"
});

const db = admin.database();
const palavrasRef = db.ref("cartoes");

const app = express();
app.use(bodyParser.json());

// Rota para cadastrar UID
app.post('/cadUid', (req, res) => {
<<<<<<< HEAD
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


=======
    const { uid,  } = req.body;
    if (uid) {
        cadastrarPalavra(uid, "pendente")
            .then(() => res.status(200).send('Cartão cadastrado com sucesso!!!'))
            .catch(error => res.status(500).send(`Erro ao cadastrar Cartão: ${error}`));
    } else {
        res.status(400).send('UID é obrigatório.');
    }
});

function cadastrarPalavra(uid, status) {
  return palavrasRef.push({ uid, status });
}

// Iniciar o servidor
>>>>>>> a9c7badcb4122b253f99ee9753232d4959576655
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
