var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ejemploSchema = Schema ({
    id: Number,
    text: String
});

var Ejemplo = mongoose.model("Ejemplo", ejemploSchema);

mongoose.connect('mongodb://localhost/');

console.log("Hecho solo y solo por alex");