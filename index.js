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
const palavrasRef = db.ref("cartoes");

const app = express();
app.use(bodyParser.json());

// Rota para cadastrar UID
app.post('/cadUid', (req, res) => {
  const { uid } = req.body;
  if (uid) {
    // Verificar se o UID já existe
    palavrasRef.orderByChild("uid").equalTo(uid).once("value", snapshot => {
      if (snapshot.exists()) {
        // UID já existe, verificar o status
        let status = '';
        snapshot.forEach(childSnapshot => {
          status = childSnapshot.val().status;
        });

        // Verificar o status e enviar a resposta adequada
        if (status === 'liberado') {
          res.status(200).json({ status: 'liberado' });
        } else {
          res.status(200).send(`UID já cadastrado. Status: ${status}`);
        }
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



// Função para cadastrar o cartão com UID e status "cadastrado"
function cadCartao(uid) {
  return new Promise((resolve, reject) => {
      // Cria um novo objeto com UID e status "cadastrado gfgfhgfhgfhgf"
      const novoCartao = {
          uid: uid,
          status: 'cadastrado'
      };

      // Insere o novo cartão no banco de dados
      palavrasRef.push(novoCartao, error => {
          if (error) {
              reject(error);
          } else {
              resolve();
          }
      });
  });
}



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
