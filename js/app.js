//Objeto con toda la funcionalidad de la calculadora
var Calculadora = {
  init: function(){
    //llamados a las funciones
    this.asignarEventosTeclas()
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
    }
  },
  construirNumero: function(numero){
    this.nuevoNumero = this.nuevoNumero + numero
    console.log("numero: " + this.nuevoNumero);
    Calculadora.mostrarPantalla(this.nuevoNumero)
  },
  mostrarPantalla: function(resultado){
    //esta funcion va a mostrar las cosas en la pantalla
    var display = document.getElementById('display')
    console.log('funcion para mostrar el primer numero');
    display.innerHTML = resultado
    }



}
Calculadora.init()
