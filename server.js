const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser')
const app     = express();
const port    = process.env.PORT || 3000;
const url = 'mongodb://localhost:27017';

app.use(bodyParser.json())

const taquerias = [
  {name: 'La Taqueria'},
  {name: 'El Farolito'},
  {name: 'Taqueria Cancun'}
]

app.use((req, res, next) => {
  console.log('middleware time')
  console.log("%s request to %s", req.method, req.path)
  next()
})

function homeController(req, res) {
  console.log('in the controller')
  res.send("You're Home!");
}

app.get('/', homeController);

app.get('/api/taquerias', (req, res) => {
  MongoClient.connect(url, (err, client) => {
    // make sure we connected
    if (!err) {
      console.log("Connected successfully to server");
    }
    //connect to the taqueria collection in the myproject db
    const db = client.db('myproject');
    const taquerias = db.collection('taquerias');

    //add the taqueria
    taquerias.find({}).toArray((err, docs) => {
      console.log(docs);
      client.close();
      // Send all taquerias back to the front end
      res.json(docs);
    })
  });
});

app.post('/api/taquerias', (req, res) => {
  console.log(req.body)
  MongoClient.connect(url, (err, client) => {
    if (!err) {
      console.log("Connected successfully to server");
    }
    const db = client.db('myproject')
    const taquerias = db.collection('taquerias')

    taquerias.insertOne(req.body, (err, result) => {
      console.log(result)
      client.close()
      res.send('ok')
    })
  })
})

// start server
app.listen(port, () => {
  console.log('Server started on', port);
});
