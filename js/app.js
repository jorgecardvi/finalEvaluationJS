//Objeto con toda la funcionalidad de la calculadora
var Calculadora = {
  init: function(){
    //llamados a las funciones e inicializacion de variables
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
  //funciones para el cambio de tamaño en las teclas cuando se las pulsa y se las suelta
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

  //funcion que lee la tecla presionada y ejecuta acciones dependiendo de la tecla
  leerTecla: function(event){
    Calculadora.construirNumero("");
    //para determinar que tecla se pulsa, se lee el id
    var teclaId = event.currentTarget.id;
    var operacion = '';
    var primerNumero = '';
    //condicion que se ejecuta si la tecla pulsada en un numero
    if (teclaId == "0" || teclaId == "1" || teclaId == "2" || teclaId == "3" || teclaId == "4" || teclaId == "5" || teclaId == "6" || teclaId == "7" || teclaId == "8" || teclaId == "9") {
      //condicion que revisa si se ha presionado la tecla igual. Si dicha tecla fue presionada significa que al menos una operacion fue realizada y reinicializan variables para que se pueda seguir con las operaciones
      if(Calculadora.existeIgual === true){
        console.log('numero despues de un igual y tenemos un resultado');
        Calculadora.existePrimerNumero = false;
        Calculadora.segundoNumero = "";
        Calculadora.existeSegundoNumero = false;
        Calculadora.resultado="";
        Calculadora.existeIgual = false;
      }
      //llamar a la funcion de Numero, el numero presionado es enviado a la funcion que construye el numero
      this.numero = teclaId;
      Calculadora.construirNumero(this.numero);
      Calculadora.existeIgual = false;
      return;
    }
    //condicion que inicializa la calculadora si la tecla on es presionada
    if (teclaId == "on") {
      //borra el numero
      this.resultado = '0'
      //muestra en la pantalla el numero cero
      Calculadora.mostrarPantalla(this.resultado)
      Calculadora.init()
      return
    }
    //condicion que ejecuta las acciones pertinentes si una tecla de operacion es presionada
    if (teclaId == "dividido" || teclaId == 'por' || teclaId == 'menos' || teclaId == 'mas') {
      //condicion que chequea si hay un numero o si se tiene un primer numero proveniente de una operacion anterior
        if (Calculadora.nuevoNumero.length === 0 && Calculadora.existePrimerNumero == false){
            console.log("No hay numero");
            return;
        }
        //cada vez que se presiona una operacion la pantalla queda en blanco
        var pantalla = " ";
        Calculadora.mostrarPantalla(pantalla);
        //condicion para tomar el primer numero
        if (Calculadora.nuevoNumero.length !== 0 && Calculadora.existePrimerNumero == false){
            //console.log("primer numero");
            Calculadora.operacion = teclaId;
            Calculadora.primerNumero = Calculadora.nuevoNumero;
            Calculadora.existePrimerNumero = true;
            Calculadora.nuevoNumero = "";
            return
        }
        //condicion que toma el segundo numero si esque hay un primer numero y ejecuta la operacion en cadena
        if (Calculadora.existePrimerNumero && Calculadora.existeSegundoNumero == false){
           //console.log("segundo numero y operacion");
           Calculadora.segundoNumero = Calculadora.nuevoNumero;
           Calculadora.existeSegundoNumero = true;
           Calculadora.nuevoNumero = "";
           Calculadora.operaciones(Calculadora.operacion, Calculadora.primerNumero, Calculadora.segundoNumero)
           Calculadora.operacion = teclaId;
           //si se necesita mostrar un resultado parcial si presionar el igual se puede quitar el comentario de la linea siguiente
           //Calculadora.mostrarPantalla(resultado);
           return
        }

    }
    //condicion que se ejecuta si la tecla presionada es el numero, el punto es enviado a la funcion que construye el numero
    if (teclaId == 'punto') {
      //numero decimal
      this.punto="."
      Calculadora.construirNumero(this.punto)
    }
    //condicion que se ejecuta si se presiona la tecla signo, el signo es enviado a la funcion de construir el numero
    if (teclaId == 'sign') {
      //numero negativo
      this.cambioSigno = "-"
      Calculadora.construirNumero(this.cambioSigno)
    }
    //condicion que se ejecuta si la tecla presionada es el igual
    if (teclaId == 'igual') {
      //condicion para ejecutar operaciones en secuencia con el igual
      if (Calculadora.existeIgual) {
        //console.log('tecla igual, operaciones con el igual');
        Calculadora.operaciones(operacionIgual, Calculadora.primerNumero, segundoNumeroIgual)
        Calculadora.mostrarPantalla(resultado);
        return;
      }
      //condicion para ejecutar y mostral la operacion despues del igual
      if (Calculadora.resultado === ""){
          //Calculadora.segundoNumero = Calculadora.nuevoNumero;
          Calculadora.existeIgual = true;
          segundoNumeroIgual = Calculadora.nuevoNumero
          operacionIgual = Calculadora.operacion;
          //console.log("tecla igual y no hay resultado anterior");
          Calculadora.operaciones(Calculadora.operacion, Calculadora.primerNumero, Calculadora.nuevoNumero);
          Calculadora.mostrarPantalla(resultado);
          Calculadora.nuevoNumero = "";
          Calculadora.operacion = "";
          Calculadora.segundoNumero = "";
          Calculadora.existeSegundoNumero = false;
          return;
      }

    }
  },

  //funcion que construye el numero
  construirNumero: function(numero){
    //condicion para chequear si hay punto
    if (numero === "." && this.nuevoNumero.includes('.')) {
      return
    }
    //condicion para retirar el signo negativo si la tecla de signo es presionada en un numero negativo
    if (numero === "-" && this.nuevoNumero.includes('-')) {
      this.nuevoNumero = this.nuevoNumero.slice(1)
      Calculadora.mostrarPantalla(this.nuevoNumero)
      return
    }
    //condicion para poner el signo negativo delante del numero si la tecla signo es presionada
    if (numero === "-") {
      this.nuevoNumero = numero + this.nuevoNumero
      Calculadora.mostrarPantalla(this.nuevoNumero)
      return
    }
    //Condicion para que no se acumulen los ceros cuando el cero es el primer numero
    if ((this.nuevoNumero === "" && numero === "0") || (this.nuevoNumero === "-0" && numero === "0")) {
      this.nuevoNumero = ""
      this.resultado = "0"
      Calculadora.mostrarPantalla(this.resultado)
      return
    }
    //condicion para no tener mas de 8 digitos en pantalla
    if (this.nuevoNumero.includes('.') == false && this.nuevoNumero.includes('-') == false && this.nuevoNumero.length >= 8) {
      console.log('mas de 8 numeros');
      this.nuevoNumero = this.nuevoNumero
      Calculadora.mostrarPantalla(this.nuevoNumero)
      return
    }
    //condicion para no tener mas de 8 digitos en pantalla, considerando el signo y el punto
    if ((this.nuevoNumero.includes('.') || this.nuevoNumero.includes('-')) && this.nuevoNumero.length >= 9) {
      console.log('mas de 8 numeros y un punto o un menos');
      this.nuevoNumero = this.nuevoNumero
      Calculadora.mostrarPantalla(this.nuevoNumero)
      return
    }
    //concatenacion de los numero para mostrarlos en la pantalla
    this.nuevoNumero = this.nuevoNumero + numero
    Calculadora.mostrarPantalla(this.nuevoNumero)
  },

  //Funcion para mostrar en la pantalla
  mostrarPantalla: function(resultado){
    var display = document.getElementById('display')
    if(resultado.length === 0){
      display.innerHTML = '0'
      return
    }
    //condicion si el resultado tiene mas de 8 digitos
    if (resultado.length >= 8) {
      resultado = parseFloat(resultado)
      resultado = resultado.toPrecision(6)
      display.innerHTML = resultado
      return
    }
    //se muestra el resultado en la pantalla
    display.innerHTML = resultado
  },

  //funcion que se encarga de ejecutar las operaciones
  //necesita como argunmentos el tipo de operacion, el primer y segundo numeros. Los parametros se envian desde la funcion leer tecla en cuando se presiona la tecla igual o la de operacion.
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
    Calculadora.existeSegundoNumero = false;
    //console.log('operacion realizada');
    Calculadora.resultado = "";
  }
}
//inicializa la calculadora
Calculadora.init()
