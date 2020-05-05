//Objeto con toda la funcionalidad de la calculadora
var Calculadora = {
  init: function(){
    //llamados a las funciones
    this.asignarEventosTeclas();
    this.nuevoNumero="";
    this.operacion = "";
    this.primerNumero = "";
    this.segundoNumero = "";
    this.resultado = "";
    this.existePrimerNumero = false;
    this.existeSegundoNumero = false;
    this.existeIgual = false;
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
    Calculadora.construirNumero("");
    var teclaId = event.currentTarget.id;
    var operacion = '';
    var primerNumero = '';
    if (teclaId == "0" || teclaId == "1" || teclaId == "2" || teclaId == "3" || teclaId == "4" || teclaId == "5" || teclaId == "6" || teclaId == "7" || teclaId == "8" || teclaId == "9") {
      if(Calculadora.existeIgual === true){
        //funciona solo con el igual, la idea es que se debe ejecutar esta parte solo si la tecla igual se presiono
        console.log('numero despues de un igual y tenemos un resultado');
        //Calculadora.primerNumero = "";
        Calculadora.existePrimerNumero = false;
        Calculadora.segundoNumero = "";
        Calculadora.existeSegundoNumero = false;
        Calculadora.resultado="";
        Calculadora.existeIgual = false;
      }
      //llamar a la funcion de Numero
      this.numero = teclaId;
      Calculadora.construirNumero(this.numero);
      Calculadora.existeIgual = false;
      //Calculadora.resultado = "";
      return;
    }
    if (teclaId == "on") {
      //borra el numero
      this.resultado = '0'
      Calculadora.mostrarPantalla(this.resultado)
      Calculadora.init()
      return
    }

    if (teclaId == "dividido" || teclaId == 'por' || teclaId == 'menos' || teclaId == 'mas') {
        if (Calculadora.nuevoNumero.length === 0 && Calculadora.existePrimerNumero == false){
            console.log("primer caso en el que no se ingreso un numero y no hay un resultado anterior");
            console.log("No hay numero");
            return;
        }

        var pantalla = " ";
        Calculadora.mostrarPantalla(pantalla);
        if (Calculadora.existeIgual) {
          console.log('existe igual antes de operacion');
          console.log("caso operacion despues de igual, hay un primer numero (ingresado o resultado anterior) pero no hay un segundo numero");
          Calculadora.segundoNumero = Calculadora.nuevoNumero;
          console.log('segundo numero ' + Calculadora.segundoNumero);
          Calculadora.existeSegundoNumero = true;
          Calculadora.nuevoNumero = "";
          console.log("hay los dos numeros listos para hacer la operacion")
          Calculadora.operaciones(Calculadora.operacion, Calculadora.primerNumero, Calculadora.segundoNumero)
          Calculadora.operacion = teclaId;
          Calculadora.existeIgual = false;
          return
        }
        if (Calculadora.nuevoNumero.length !== 0 && Calculadora.existePrimerNumero == false){
            console.log("segundo caso, se ingreso un numero pero no hay un resultado anterior");
            Calculadora.operacion = teclaId;
            Calculadora.primerNumero = Calculadora.nuevoNumero;
            console.log('primer numero ' + Calculadora.primerNumero);
            Calculadora.existePrimerNumero = true;
            console.log(Calculadora.existePrimerNumero);
            Calculadora.nuevoNumero = "";
            return
        }

        if (Calculadora.existePrimerNumero && Calculadora.existeSegundoNumero == false){
           console.log("tercer caso, hay un primer numero (ingresado o resultado anterior) pero no hay un segundo numero");
           Calculadora.segundoNumero = Calculadora.nuevoNumero;
           console.log('segundo numero ' + Calculadora.segundoNumero);
           Calculadora.existeSegundoNumero = true;
           Calculadora.nuevoNumero = "";
           console.log("hay los dos numeros listos para hacer la operacion")
           Calculadora.operaciones(Calculadora.operacion, Calculadora.primerNumero, Calculadora.segundoNumero)
           Calculadora.operacion = teclaId;
           console.log('voy a mostrar' + resultado);
           Calculadora.mostrarPantalla(resultado);
           return
        }

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
      //var segundoNumeroIgual = "";
      //var operacionIgual = "";
      if (Calculadora.existeIgual) {
        console.log('debo estar aqui');
        console.log(Calculadora.primerNumero);
        console.log(segundoNumeroIgual);
        console.log(operacionIgual);
        Calculadora.operaciones(operacionIgual, Calculadora.primerNumero, segundoNumeroIgual)
        Calculadora.mostrarPantalla(resultado);
        return;
      }
      if (Calculadora.resultado === ""){
          //Calculadora.segundoNumero = Calculadora.nuevoNumero;
          Calculadora.existeIgual = true;
          segundoNumeroIgual = Calculadora.nuevoNumero
          operacionIgual = Calculadora.operacion;
          console.log("tecla igual y no hay resultado anterior");
          console.log('segundo numero igual: ' + Calculadora.nuevoNumero);
          Calculadora.operaciones(Calculadora.operacion, Calculadora.primerNumero, Calculadora.nuevoNumero);
          Calculadora.mostrarPantalla(resultado);
          console.log("estado del segundo numero " + Calculadora.existeSegundoNumero);
          Calculadora.nuevoNumero = "";

          Calculadora.operacion = "";
          //this.primerNumero = "";

          Calculadora.segundoNumero = "";
          //Calculadora.existePrimerNumero = false;
          Calculadora.existeSegundoNumero = false;
          return;
      }
            Calculadora.existeIgual = true;
            operacionIgual = Calculadora.operacion;
            segundoNumeroIgual = Calculadora.nuevoNumero
            console.log('tecla igual deberia haber un resultado');
            Calculadora.segundoNumero = Calculadora.nuevoNumero;
            console.log('segundo numero ' + Calculadora.segundoNumero);
            Calculadora.existeSegundoNumero = true;
            Calculadora.nuevoNumero = "";
            console.log("hay los dos numeros listos para hacer la operacion")
            Calculadora.operaciones(Calculadora.operacion, Calculadora.primerNumero, Calculadora.segundoNumero)
            Calculadora.mostrarPantalla(resultado);


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
    resultado = 0
    primerNumero = parseFloat(primerNumero)
    segundoNumero = parseFloat(segundoNumero)
    switch (operacion) {
      case "mas":
        resultado = primerNumero + segundoNumero;
        break;
      case "menos":
        resultado = primerNumero - segundoNumero;
        break;
      case "por":
        resultado = primerNumero * segundoNumero;
        break;
      case "dividido":
        resultado = primerNumero / segundoNumero;
        break;
      default:
        return
    }
    resultado = resultado.toFixed(2)
    Calculadora.primerNumero = resultado
    Calculadora.existePrimerNumero = true
    Calculadora.resultado = resultado
    console.log('primer numero como resultado ' + Calculadora.primerNumero);
    Calculadora.existeSegundoNumero = false;



  }
}
console.log('primera funcion');
Calculadora.init()
//https://www.google.com/search?client=firefox-b-d&q=build+a+calculator+in+js#kpvalbx=_b2KLXtvsOOLisAe6rIsI31
//https://www.freecodecamp.org/news/how-to-build-an-html-calculator-app-from-scratch-using-javascript-4454b8714b98/
//https://freshman.tech/calculator/
