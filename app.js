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
    name: String,
    text: String
});

const Ejemplo = mongoose.model("Ejemplo", ejemploSchema);
var idnum;
var model = db.model('ejemplos', ejemploSchema);
  model.count({}, function(err, c) {
        if(c != 4)
           idnum = c + 1;
        else
           idnum = 1;
});

var cantidad;

app.get('/save', (request, response) => {
  response.render ('index', { title: 'CSV' });
  console.log("EMPIEZA ITERACION");
  console.log("Toca el id " + idnum);
  
  var modelo = db.model('ejemplos', ejemploSchema);
  modelo.count({}, function(err, c) {
           console.log('Cantidad es ' + c);
           cantidad = c;
  });
      if(cantidad >= 3) { 
        console.log("Existe el id " + idnum.toString().repeat(24));
        modelo.remove({_id: idnum.toString().repeat(24)}, function (err) {
          if(!err) {
            idnum--;
            if(idnum == 0)
              idnum = 4;
             var ej = new Ejemplo ({_id: idnum.toString().repeat(24), name: request.query.name, text: request.query.input});
             var p = ej.save(function (err) {
                  if (err) { console.log(`Hubo algun error:\n${err}`); return err; }
                    console.log(`Se ha guardado: ${ej}`);
              });
            if(idnum == 4)
              idnum = 0;
            idnum++;
          }
          else {
            console.log("Error eliminando el valor mas antiguo");
          }
        });
        
      } else {
        var ej = new Ejemplo ({_id: idnum.toString().repeat(24), name: request.query.name, text: request.query.input});
        var p = ej.save(function (err) {
                  if (err) { console.log(`Hubo algun error:\n${err}`); return err; }
                    console.log(`Se ha guardado: ${ej}`);
                });
        console.log("No existia");
      }
      
      Promise.all([p]).then( (value) => {   
          idnum = idnum + 1;
          if(idnum != 4)
            idnum = idnum % 4;
          console.log("ACABO ITERACION");
      });
});

app.get('/descargar', (request, response) => {
  var modelo = db.model('ejemplos', ejemploSchema);
  modelo.findById(request.query.input.toString().repeat(24), function (err, datos) {
    if(!err) {
      console.log(datos);
      response.send (datos);
    }
    else {
      console.log("Error");
      response.send ("No hay datos");
    }
  });
});

app.listen(app.get('port'), () => {
    console.log(`Node app is running at localhost: ${app.get('port')}` );
});
