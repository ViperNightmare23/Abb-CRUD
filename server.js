console.log('May Node be with you')

const express = require('express');
const bodyParser= require('body-parser')
const app = express()
const ObjectId = require('mongodb').ObjectId; 

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.json())
// app.use(express.bodyParser())

const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://abb:ABB123@ds151927.mlab.com:51927/abb', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })

})

app.get('/', (req, res) => {
  db.collection('clientes').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {clientes: result})
  })
})

app.get('/cambiar_cliente/:_id', (req, res) => {
  db.collection('clientes').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('cambiar_cliente.ejs', {clientes: result})
  })
})

app.post('/clientes', (req, res) => {
  console.log(req.body)
  db.collection('clientes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})

// app.put('/clientes', (req, res) => {

//   db.collection('clientes').findOneAndUpdate(
//   	{ Nombre: req.body.vari }, {
//     $set: {
//       Nombre: req.body.Nombre,
//     }
//   }, {
//     sort: {_id: -1},
//     upsert: true
//   }, (err, result) => {
//     if (err) return res.send(err)
//     res.send(result)
//   })
// })

app.put('/cambiar_cliente/:_id', (req, res) => {

  db.collection('clientes').findOneAndUpdate(
  	{ _id: ObjectId('5828e03b92b76d79088808f2') }, {
    $set: {
      Nombre: req.body.Nombre,
    }
  },(err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
  res.redirect('/cambiar_cliente/')
})

// app.delete('/clientes', (req, res) => {
//   db.collection('clientes').findOneAndDelete({Nombre: req.body.Nombre},
//   (err, result) => {
//     if (err) return res.send(500, err)
//     res.send('Cliente eliminado')
//   })
// })



