function disminuirTecla(event){
  var teclaId = event.currentTarget.id;
  document.getElementById(teclaId).style.transform = "scale(0.95)";
}

function aumentarTecla(event){
  var teclaId = event.currentTarget.id;
  document.getElementById(teclaId).style.transform = "scale(1)";
}

//asignarEventosTeclas: function(){
function asignarEventosTeclas(){
  var teclas = document.getElementsByClassName('tecla');
  for (var i = 0; i < teclas.length; i++) {
    teclas[i].onmousedown = disminuirTecla; //this.disminuirTecla
    teclas[i].onmouseup = aumentarTecla; //this.aumentarTecla
  }
}

asignarEventosTeclas()
/*
Calculadora.init()
var Calculadora = {
  init: function(){
    //aqui irian los llamados a las funciones que hacen cada cosa
    //this.nombrefuncion()
  },

}
*/
