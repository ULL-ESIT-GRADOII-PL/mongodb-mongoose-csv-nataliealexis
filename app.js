//"use strict";

const express = require('express');
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

app.set('port', (process.env.PORT || 5000));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(express.static(__dirname + '/public'));

const calculate = require('./models/calculate.js');

app.get('/', (request, response) => {
    response.render('index', { title: 'CSV' });
});

app.get('/csv', (request, response) => {
  response.send ({"rows": calculate(request.query.input)});
});

app.get('/test', (request, response) => {
  response.render('test', { title: 'Tests' });
});

var db = mongoose.connect('mongodb://localhost/');

var Schema = mongoose.Schema;

const ejemploSchema = Schema ({
    id: Number,
    text: String
});

const Ejemplo = mongoose.model("Ejemplo", ejemploSchema);
var idnum = 1;

app.get('/save', (request, response) => {
  console.log("EMPIEZA ITERACION");
  console.log("Toca el id " + idnum);
  var modelo = db.model('ejemplos', ejemploSchema);
  modelo.count({}, function(err, c) {
           console.log('Cantidad es ' + c);
  });
  Ejemplo.findById(idnum.toString().repeat(24), function(err,existeEjemplo) {
    if (!err) {
      if(existeEjemplo) { 
        console.log("Existe el id " + idnum.toString().repeat(24));
      } else {
        var ej = new Ejemplo ({_id: idnum.toString().repeat(24), text: request.query.input});
        var p = ej.save(function (err) {
                  if (err) { console.log(`Hubo algun error:\n${err}`); return err; }
                    console.log(`Se ha guardado: ${ej}`);
                });
        console.log("No existia");
        Promise.all([p]).then( (value) => {   
          mongoose.connection.close();
        });
      }
    }
  })
  
  idnum = (idnum + 1);
  console.log("ACABO ITERACION");
  response.render ('index', { title: 'CSV' });
  /*var ej = new Ejemplo ({text: request.query.input});
  var p = ej.save(function (err) {
      if (err) { console.log(`Hubo algun error:\n${err}`); return err; }
        console.log(`Se ha guardado: ${c1}`);
      });
  Promise.all([p]).then( (value) => {   
    mongoose.connection.close(); 
  });
  response.render ('index', { title: 'CSV' });*/
});

app.listen(app.get('port'), () => {
    console.log(`Node app is running at localhost: ${app.get('port')}` );
});
