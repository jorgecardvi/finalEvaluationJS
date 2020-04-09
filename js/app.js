//Objeto con toda la funcionalidad de la calculadora
var Calculadora = {
  init: function(){
    //llamados a las funciones
    this.asignarEventosTeclas()
    this.nuevoNumero=""
    this.operacion = ""
    this.primerNumero = ""
    this.existePrimerNumero = false
  },
  //funciones para el cambio de tamano en las teclas cuando se las pulsa y se las suelta
  asignarEventosTeclas: function(){
    var teclas = document.getElementsByClassName('tecla');
    for (var i = 0; i < teclas.length; i++) {
      teclas[i].onmousedown = this.disminuirTecla;
      teclas[i].onmouseup = this.aumentarTecla;
      teclas[i].onclick = this.leerTecla;
    }
  },
  disminuirTecla: function(event){
    var teclaId = event.currentTarget.id;
    document.getElementById(teclaId).style.transform = "scale(0.95)";
  },
  aumentarTecla: function(event){
    var teclaId = event.currentTarget.id;
    document.getElementById(teclaId).style.transform = "scale(1)";
  },
  leerTecla: function(event){
    Calculadora.construirNumero("")
    var teclaId = event.currentTarget.id;
    var operacion = ''
    var primerNumero = ''
    if (teclaId == "0" || teclaId == "1" || teclaId == "2" || teclaId == "3" || teclaId == "4" || teclaId == "5" || teclaId == "6" || teclaId == "7" || teclaId == "8" || teclaId == "9") {
    //llamar a la funcion de Numero
    this.numero = teclaId
    Calculadora.construirNumero(this.numero)
    }
    if (teclaId == "on") {
      //borra el numero
      this.resultado = '0'
      Calculadora.mostrarPantalla(this.resultado)
      Calculadora.init()
    }

    if (teclaId == "dividido" || teclaId == 'por' || teclaId == 'menos' || teclaId == 'mas') {
      //llamar a la funcion de operaciones
      var pantalla = " "
      Calculadora.operacion = teclaId
      Calculadora.primerNumero = Calculadora.nuevoNumero
      Calculadora.existePrimerNumero = false

      if (Calculadora.nuevoNumero.length !== 0) {
        Calculadora.existePrimerNumero = true
        //operacion = teclaId
        //primerNumero = Calculadora.nuevoNumero

        Calculadora.mostrarPantalla(pantalla)
        Calculadora.nuevoNumero = ""
        return
      }else {
        console.log('no hay primer numero');
        return
      }
      return
    }
    if (teclaId == 'punto') {
      //numero decimal
      this.punto="."
      Calculadora.construirNumero(this.punto)
    }
    if (teclaId == 'sign') {
      //numero negativo
      this.cambioSigno = "-"
      Calculadora.construirNumero(this.cambioSigno)
    }

    if (teclaId == 'igual') {
      if (Calculadora.existePrimerNumero) {
        this.segundoNumero = Calculadora.nuevoNumero
        Calculadora.operaciones(Calculadora.operacion, Calculadora.primerNumero, this.segundoNumero)
      }

    }
  },
  construirNumero: function(numero){
    //condicion para chequear si hay punto
    if (numero === "." && this.nuevoNumero.includes('.')) {
      return
    }
    if (numero === "-" && this.nuevoNumero.includes('-')) {
      this.nuevoNumero = this.nuevoNumero.slice(1)
      Calculadora.mostrarPantalla(this.nuevoNumero)
      return
    }
    if (numero === "-") {
      this.nuevoNumero = numero + this.nuevoNumero
      Calculadora.mostrarPantalla(this.nuevoNumero)
      return
    }
    if (this.nuevoNumero === "" && numero === "0") {
      this.resultado = "0"
      Calculadora.mostrarPantalla(this.resultado)
      return
    }
    if (this.nuevoNumero.includes('.') == false && this.nuevoNumero.includes('-') == false && this.nuevoNumero.length >= 8) {
      console.log('mas de 8 numeros');
      this.nuevoNumero = this.nuevoNumero
      Calculadora.mostrarPantalla(this.nuevoNumero)
      return
    }
    if ((this.nuevoNumero.includes('.') || this.nuevoNumero.includes('-')) && this.nuevoNumero.length >= 9) {
      console.log('mas de 8 numeros y un punto o un menos');
      this.nuevoNumero = this.nuevoNumero
      Calculadora.mostrarPantalla(this.nuevoNumero)
      return
    }
    this.nuevoNumero = this.nuevoNumero + numero
    Calculadora.mostrarPantalla(this.nuevoNumero)
  },
  mostrarPantalla: function(resultado){
    //esta funcion va a mostrar las cosas en la pantalla
    var display = document.getElementById('display')
    //puede ser que tenga que quitar esta parte por que cuando presione la operacion, la pantalla tiene que quedar sin nada
    if(resultado.length === 0){
      display.innerHTML = '0'
      return
    }
    //resultado = Number(resultado).toPrecision(8)
    display.innerHTML = resultado
  },
  operaciones: function(operacion, primerNumero, segundoNumero){
    console.log('tecla presionada: ' + operacion);
    console.log('primer Numero: ' + primerNumero);
    console.log('segundo Numero: ' + segundoNumero);
    primerNumero = parseFloat(primerNumero)
    segundoNumero = parseFloat(segundoNumero)
    switch (operacion) {
      case "mas":
        resultado = primerNumero + segundoNumero
        console.log('operacion de suma:' + resultado);
        break;
      case "menos":
        resultado = primerNumero - segundoNumero
        console.log('operacion de resta:' + resultado);
        break;
      case "por":
        resultado = primerNumero * segundoNumero
        console.log('operacion de multiplicacion:' + resultado);
        break;
      case "dividido":
        resultado = primerNumero / segundoNumero
        console.log('operacion de division:' + resultado);
        break;
      default:
        return
    }
    resultado = resultado.toFixed(2)
    if (resultado.length >= 8) {
      resultado = parseFloat(resultado)
      resultado = resultado.toPrecision(6)
      Calculadora.mostrarPantalla(resultado)
      return
    }
    Calculadora.mostrarPantalla(resultado)

  }



}
Calculadora.init()
//https://www.google.com/search?client=firefox-b-d&q=build+a+calculator+in+js#kpvalbx=_b2KLXtvsOOLisAe6rIsI31
//https://www.freecodecamp.org/news/how-to-build-an-html-calculator-app-from-scratch-using-javascript-4454b8714b98/
//https://freshman.tech/calculator/
