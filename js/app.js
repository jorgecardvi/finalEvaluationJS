//Objeto con toda la funcionalidad de la calculadora
var Calculadora = {
  init: function(){
    //llamados a las funciones
    this.asignarEventosTeclas()
    this.nuevoNumero=""
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
    }else if (teclaId == "dividido") {
      //funcion para dividir
    }else if (teclaId == 'por') {
      //funcion para multiplicar
    }else if (teclaId == 'menos') {
      //funcion restar
    }else if (teclaId == 'mas') {
      //funcion sumar
    }else if (teclaId == 'igual') {
      //resultado
    }else if (teclaId == 'punto') {
      //numero decimal
      this.punto="."
      Calculadora.construirNumero(this.punto)
    }else if (teclaId == 'sign') {
      //numero negativo
      this.cambioSigno = "-"
      Calculadora.construirNumero(this.cambioSigno)
    }
  },
  construirNumero: function(numero){
    //condicion para chequear si hay punto
    if (numero === "." && this.nuevoNumero.includes('.')) {
      return
    }
    if (numero === "-" && this.nuevoNumero.includes('-')) {
      this.nuevoNumero = this.nuevoNumero.slice(1)
      console.log(this.nuevoNumero);
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
    if (resultado.includes('.') && resultado.length >= 9) {
      resultado = Number(resultado).toPrecision(8)
      display.innerHTML = resultado
      return
    }else
    if (resultado.includes('-') && resultado.length >= 9) {
      console.log('signo y longitud');
      resultado = Number(resultado).toPrecision(8)
      display.innerHTML = resultado
      return
    }else
    if (resultado.includes('.') && resultado.includes('-') && resultado.length >= 10) {
      resultado = Number(resultado).toPrecision(8)
      display.innerHTML = resultado
      return
    }
    //resultado = Number(resultado).toPrecision(8)
    display.innerHTML = resultado
    }



}
Calculadora.init()
//https://www.google.com/search?client=firefox-b-d&q=build+a+calculator+in+js#kpvalbx=_b2KLXtvsOOLisAe6rIsI31
//https://www.freecodecamp.org/news/how-to-build-an-html-calculator-app-from-scratch-using-javascript-4454b8714b98/
//https://freshman.tech/calculator/
