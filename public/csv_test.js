var original = "";

chai.should();

describe("CSV", function () {
  var sandbox;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();
    sandbox.stub(window.console, "log");
    sandbox.stub(window.console, "error");
  });

  afterEach(function() {
    sandbox.restore();
  });

  describe("funcion calculate", function() {
    //$(document).ready(() => {

    it('Should accept a simple input', function () {
          original = "1,4,7,a";
          var aux = calculate(original)[0].value;
          aux.should.have.length(4);
          aux[0].should.equal('1');
          aux[1].should.equal('4');
          aux[2].should.equal('7');
          aux[3].should.equal('a');
        });

      /*it("deberia aceptar una cadena", function() {
        var cadena = '"hola"';
        var r = prueba.csv();
        //console.log (prueba.csv());
        /*$.get('/csv', (request, response) => {
          //XXXXXXXXXXXXXXX XXXXXXX XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX XXX
          response.send ({"rows": calculate(request.query.input)});
        });*/
      /*  expect(r[0].value[0]).to.equal('hola');
      });
    //})();
    /*it("prueba con una coma a la derecha", function() {
      var cadena = '"hola,"';
      var r = calculate(cadena);
      expect(r[0].value[0]).to.equal('hola,');
    });
    it("prueba con una coma a la izquierda", function() {
      var cadena = '",hola"';
      var r = calculate(cadena);
      expect(r[0].value[0]).to.equal(',hola');
    });
    it("prueba con espacios", function() {
      var cadena = '" hola"';
      var r = calculate(cadena);
      expect(r[0].value[0]).to.equal(' hola');
    });
    it("prueba separando con comas", function() {
      var cadena = '"hola","adios"';
      var r = calculate(cadena);
      expect(r[0].value[0]).to.equal('hola');
      expect(r[0].value[1]).to.equal('adios');
    });
    it("prueba separando con comas y habiendo espacios", function() {
      var cadena = ' ,"adios"';
      var r = calculate(cadena);
      expect(r[0].value[0]).to.equal(' ');
      expect(r[0].value[1]).to.equal('adios');
    });
    it("prueba separando con dos comas seguidas", function() {
      var cadena = '"hola",,"adios"';
      var r = calculate(cadena);
      expect(r[0].value[0]).to.equal('hola');
      expect(r[0].value[1]).to.equal('');
      expect(r[0].value[2]).to.equal('adios');
    });*/
  });
});
