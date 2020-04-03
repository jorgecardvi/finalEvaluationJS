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
      teclas[i].onmousedown = this.mostrarNumero;
      //teclas[i].onmousedown = this.mouseDown;
      teclas[i].onmouseup = this.aumentarTecla;
    }
  },
  /*
  mouseDown: function(){
    this.disminuirTecla(event);
    this.mostrarNumero(event);
  },
  */
  disminuirTecla: function(event){
    console.log('funcion disminuir');
    var teclaId = event.currentTarget.id;
    document.getElementById(teclaId).style.transform = "scale(0.95)";
  },
  aumentarTecla: function(event){
    var teclaId = event.currentTarget.id;
    document.getElementById(teclaId).style.transform = "scale(1)";
  },
  //funciones para que aperezcan los numeros en la pantalla
  mostrarNumero: function(event){
    console.log('funcion mostrar');
    var teclaId = event.currentTarget.id;
    var display = document.getElementById('display')
    display.innerHTML = teclaId
    console.log(typeof(teclaId));

  }
}
Calculadora.init()
