console.log('May Node be with you')

const express = require('express');
const bodyParser= require('body-parser')
const app = express()
var ObjectId = require('mongodb').ObjectID;

var request = require('request');

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.json())

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

app.get('/cambiar_cliente', (req, res) => {
  db.collection('clientes').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('cambiar_cliente.ejs', {clientes: result})
  })
})

// app.get('/productos', (req, res) => {
//   db.collection('productos').find().toArray((err, result) => {
//     if (err) return console.log(err)
//     res.render('productos.ejs', {productos: result})
//   })
//   // request('/estados', function (error, response, body) {
//   // if (!error && response.statusCode == 200) {
//   //   console.log(body) // Show the HTML for the Google homepage. 
//   // }
// // })
// })
var productos = [];
var status = [];
app.get('/productos', (req, res) => {
  db.collection('productos').find().toArray((err, result) => {
    if (err){
      return console.log(err)
    }else{
      for (var i = 0 ; i < result.length; i++) {
        productos[i] = result[i];
      }
    }
  })
    db.collection('status').find().toArray((err, result) => {
    if (err){
      return console.log(err)
    }else{
      for (var i = 0 ; i < result.length; i++) {
        status[i] = result[i];
      }
    }
  })
  res.render('productos.ejs', {productos: productos,status: status})
})

app.get('/cambiar_estado', (req, res) => {
   db.collection('productos').find().toArray((err, result) => {
    if (err){
      return console.log(err)
    }else{
      for (var i = 0 ; i < result.length; i++) {
        productos[i] = result[i];
      }
    }
  })
    db.collection('status').find().toArray((err, result) => {
    if (err){
      return console.log(err)
    }else{
      for (var i = 0 ; i < result.length; i++) {
        status[i] = result[i];
      }
    }
  })
  res.render('cambiar_estado.ejs', {productos: productos,status: status})
})

app.get('/estados', (req, res) => {
  db.collection('status').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('estados.ejs', {status: result})
  })
})

app.get('/qrsht', (req, res) => {
   res.sendFile(__dirname + '/index.html')
})

var nombreactual='';
var nombrenuevo='';
var nombreactuals='';
var nombrenuevos='';

app.post('/clientes', (req, res) => {
  db.collection('clientes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
  console.log("nombre en post " + nombreactual)
})

app.post('/productos', (req, res) => {
  db.collection('productos').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/productos')
  })
  console.log("nombre en post " + nombreactual)
})

app.post('/cambiar_cliente', (req, res) => {
  nombreactual=req.body.vari
  nombrenuevo=req.body.nuevoname
  console.log(req.body)
  db.collection('clientes').findOneAndUpdate(
  	{ _id: ObjectId(nombreactual) }, {
    $set: {
      Nombre: nombrenuevo,
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.post('/cambiar_estado', (req, res) => {
  nombreactuals=req.body.varis
  nombrenuevos=req.body.nuevoestado
  console.log(req.body)
  db.collection('productos').findOneAndUpdate(
    { _id: ObjectId(nombreactuals) }, {
    $set: {
      Estado: nombrenuevos,
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})



