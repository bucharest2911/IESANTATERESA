
const {ipcRenderer} =require('electron') 

var db = firebase.database().ref('Usuarios');
 
 


 
 
 $('#crear').click(function(){
    var usuario=$('#usuario').val();
    var contraseña=$('#contra').val();
console.log(contraseña)
     var usuarios={
         usuario:usuario,
         contraseña:contraseña
     }

     console.log(usuarios.contraseña)
   db.push().set(usuarios)

   alert('cuenta creada correctamente')
 })


 $('#iniciar').click(function(){
  var openedWindow;
  var openedWindow2;
var capturarusuario=""
var capturarcontraseña=""
  db.orderByChild("usuario").equalTo($('#user').val()).on("child_added", function(snapshot) {

    capturarusuario=snapshot.val().usuario;
    console.log(snapshot.key);

    db.orderByChild("contraseña").equalTo($('#pass').val()).on("child_added", function(snapshot) {

      capturarcontraseña=snapshot.val().contraseña;
      console.log(snapshot.key);
    });
    if(capturarusuario || capturarcontraseña){
      alert('datos ingresados correctamente')
      var mensaje="ingresados correctamente"
  
      //window.close();
      //openedWindow=window.open('Docentes.html')
     // window.open('Docentes.html');
     // window.close('iniciosesion.html'),
    
  
      ipcRenderer.send('logrado',mensaje)
    }else {
      alert('datos incorrectos')
    }
  });
  

 
 })