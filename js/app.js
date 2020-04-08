//Objeto con toda la funcionalidad de la calculadora
var Calculadora = {
  init: function(){
    //llamados a las funciones
    this.asignarEventosTeclas()
    this.nuevoNumero=""
    this.operacion = ""
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
    var teclaId = event.currentTarget.id;
    if (teclaId == "0" || teclaId == "1" || teclaId == "2" || teclaId == "3" || teclaId == "4" || teclaId == "5" || teclaId == "6" || teclaId == "7" || teclaId == "8" || teclaId == "9") {
    //llamar a la funcion de Numero
    this.numero = teclaId
    Calculadora.construirNumero(this.numero)
    }else if (teclaId == "on") {
      //borra el numero
      this.resultado = '0'
      Calculadora.mostrarPantalla(this.resultado)
      Calculadora.init()
    }else if (teclaId == "dividido" || teclaId == 'por' || teclaId == 'menos' || teclaId == 'mas') {
      //llamar a la funcion de operaciones
      var pantalla = " "
      this.operacion = teclaId
      Calculadora.operaciones(teclaId)
      Calculadora.mostrarPantalla(pantalla)
      console.log('numero 1 ' + this.nuevoNumero);
      this.nuevoNumero=""
      console.log("numero 2 " + this.nuevoNumero);
    }else if (teclaId == 'punto') {
      //numero decimal
      this.punto="."
      Calculadora.construirNumero(this.punto)
    }else if (teclaId == 'sign') {
      //numero negativo
      this.cambioSigno = "-"
      Calculadora.construirNumero(this.cambioSigno)
    }else if (teclaId == 'igual') {
      console.log(this.operacion);
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
    if(resultado.length === 0){
      display.innerHTML = '0'
      return
    }
    //resultado = Number(resultado).toPrecision(8)
    display.innerHTML = resultado
  },
  operaciones: function(operacion){
    console.log('tecla presionada:' + operacion);
    var existePrimerNumero = false
    var primerNumero = 0

    switch (operacion) {
      case "mas":
        //primero transformar a numero porque los numeros llegan como cadena de caracteres
        //resultado = primerNumero + segundoNumero
        console.log('operacion de suma');
        break;
      case "menos":
        //primero transformar a numero porque los numeros llegan como cadena de caracteres
        //resultado = primerNumero + segundoNumero
        console.log('operacion de resta');
        break;
      case "por":
        //primero transformar a numero porque los numeros llegan como cadena de caracteres
        //resultado = primerNumero + segundoNumero
        console.log('operacion de multiplicacion');
        break;
      case "dividido":
        //primero transformar a numero porque los numeros llegan como cadena de caracteres
        //resultado = primerNumero + segundoNumero
        console.log('operacion de division');
        break;
      default:

    }
  }



}
Calculadora.init()
//https://www.google.com/search?client=firefox-b-d&q=build+a+calculator+in+js#kpvalbx=_b2KLXtvsOOLisAe6rIsI31
//https://www.freecodecamp.org/news/how-to-build-an-html-calculator-app-from-scratch-using-javascript-4454b8714b98/
//https://freshman.tech/calculator/
