const express = require('express');
const app     = express();
const port    = process.env.PORT || 3000;

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
  res.json(taquerias)
})

// start server
app.listen(port, () => {
  console.log('Server started on', port);
});
