//Objeto con toda la funcionalidad de la calculadora
var Calculadora = {
  init: function(){
    //llamados a las funciones
    this.asignarEventosTeclas()
    var numeroString = ""
  },
  //funciones para el cambio de tamano en las teclas cuando se las pulsa y se las suelta
  asignarEventosTeclas: function(){
    var teclas = document.getElementsByClassName('tecla');
    for (var i = 0; i < teclas.length; i++) {
      teclas[i].onmousedown = this.disminuirTecla;
      teclas[i].onclick = this.mostrarNumero;
      teclas[i].onmouseup = this.aumentarTecla;
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
  //funciones para que aperezcan los numeros en la pantalla
  mostrarNumero: function(event){
    console.log('funcion mostrar');
    var teclaId = event.currentTarget.id;
    var display = document.getElementById('display')
    if (teclaId == "0" || teclaId == "1" || teclaId == "2" || teclaId == "3" || teclaId == "4" || teclaId == "5" || teclaId == "6" || teclaId == "7" || teclaId == "8" || teclaId == "9") {
      this.numeroString = this.numeroString + teclaId
      display.innerHTML = teclaId
      console.log(typeof(teclaId))
      console.log(this.numeroString);
    }
  }
}
Calculadora.init()
