const {ipcRenderer} =require('electron') 
var uuid = require("uuid");
 
var ide
var tag=[]
var temporal=[]
 var limpiar=function(){
    $('#nombre').val("");
    $('#apellido').val("");
    $('#telefono').val("");
    $('#cedula').val("");
    $('#email').val("");
 }
 var db = firebase.database().ref('profesor');
 var llenar=function(){
 var ide = uuid.v4();

  console.log(ide);
var name;
var ape;
var id;
var email;
var tele;
var buscando;
//var mensaje = $(document.createElement('div')).addClass("card-panel red white-text");
  if($('#nombre').val()==""|| $('#apellido').val()=="" ||$('#telefono').val()==""||$('#cedula').val()==""||$('#email').val()==""){
alert(' hay campo vacios');
 
  }else  if(isNaN($('#cedula').val()) )    {

   alert('cedula no valida');
 

    
   // $('#formulario').modal('hide') 
   
   } else if(isNaN($('#telefono').val())){
    //$('#ModalDocente').modal('show') 
   // $('#hola').html(' no es un numero') ;
   alert('telefono no valido');
   }  else if($.isNumeric( $("#nombre" ).val())){
alert('nombre no valido');
   }  else if ($.isNumeric( $("#apellido" ).val())){
    alert('apellido no valido');
   } else{
 

    db.orderByChild("cedula").equalTo($('#cedula').val()).on("child_added", function(snapshot) {

      buscando=snapshot.val().nombre;
      console.log(snapshot.key);
    });

    console.log(buscando);
    if(buscando){
      alert('ya existe esta cedula'),
      $('#cedula').val("");

    } else{
      name=$('#nombre').val();
      ape=$('#apellido').val();
    tele=$('#telefono').val();
   id=$('#cedula').val();
      email=$('#email').val();
    }

     
  }  

      

   
  

 
   
  

    var  Docente={
        nombre:name,
        apellido:ape,
        telefono:tele,
        cedula:id,
        email:email,
        
    }
var capturar;
 
 
 
      
       
 
  

    
    db.push().set(Docente)
    console.log('guardado')
   
   
    alert('guardado con exito');
    limpiar();
     
    
   
 }

 

 function clearForm() {
  $('#formulario').trigger('reset');
}
 
  
    
 db.on('value',function(snapshot){
    var snap=snapshot.val();
   // console.log(profe);

  //  var html="";
   
   $('#tabla tbody').empty();
    var row='';
    var  valor=''
    var temporal=""
    for (profesor in snap) {
     
        valor=snap[profesor].tag
      row += `

      
      <tr data-hash='${profesor}'>
        <td class="nombre">${snap[profesor].nombre}</td>
        <td class="apellido">${snap[profesor].apellido}</td>
        <td class="identificacion">${snap[profesor].telefono}</td>
        <td class="email">${snap[profesor].cedula}</td>
        <td class="telefono">${snap[profesor].email}</td>
        <td  ><i class="zmdi zmdi-account-calendar " id='tag' title='${valor}'></i></td>
       
        <td> <button class="item" id="enviar" data-toggle="tooltip" data-placement="top"  data-original-title="Send"> <i class="zmdi zmdi-mail-send"></i></button></td>
        <td><button id="actualizar" class="item" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit" aria-describedby="tooltip804445"><i class="zmdi zmdi-edit"></i> </button></td>
  
        <td><button id="eliminar"value='hola' class="item" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete" aria-describedby="tooltip328779"> <i class="zmdi zmdi-delete"></i>  </button></td>
        </td>
      </tr>
     `;
      
      }
   // console.log($('table tbody'));
            
  $('#tabla tbody').append(row);
  row="";
  
     
      
    //  table.on('click','#enviar',obtenerid);
      //table.on('click','.zmdi zmdi-account-calendar',obtenerid);


   
     })
 
     var eliminar=function(){
       //  alert('hola');

         var profesorid=$(this).closest('tr').data('hash');
        // console.log(profesorid);
        //var elegir=confirm('seguro que desea eliminar');
       //  if(elegir===true){
           

                    // }
                    var seleccionar=$(this).closest("tr"); 
                    $('#exampleModal').modal('show') ;
                    $('#modales').html('desea eliminar al profesor: '+seleccionar.find("td:eq(0)").text()+"-" +seleccionar.find("td:eq(1)").text());
                    $('#si').click(function(){
                      db.child(profesorid).remove();
                      $('#exampleModal').modal('hide') ;
                    })
    }


    

function guardarrifd(){
  var profesorid=$(this).closest('tr').data('hash');
var Docente
 
//Docente=null


var seleccionar=$(this).closest("tr"); 
 
  var profesor={
    nombre: seleccionar.find("td:eq(0)").text(),
    cedula:  seleccionar.find("td:eq(3)").text(),
    apellido: seleccionar.find("td:eq(1)").text(),
    telefono: seleccionar.find("td:eq(2)").text(),
     email: seleccionar.find("td:eq(4)").text(),
  }
 
 
  
db.child(profesorid).remove()
db.push().set(profesor)
//Docente=null
 
var profesornuevo=$(this).closest('tr').data('hash');

db.child('profesor')
.orderByChild("cedula")
.equalTo(profesor.cedula)
.on("child_added", function(snapshot) {
   
   alert(snapshot.val());
 });
ipcRenderer.send('exito',profesorid)
}

    //ide = uuid.v4();

 

    //var profesorId = $(this).closest('tr').data('hash');
  //  var profesornuevo= $(this).closest('tr').data('hash');
   // var seleccionar=$(this).closest("tr"); 
 //console.log(seleccionar.find("td:eq(0)").text())
 //db.push().set(seleccionar.find("td:eq(0)").text())

 
    //db.child(profesorId).remove(),

   // db.child(profesorId).set('miguel')
  


//identi=""
  
 //var seleccionar=$('.zmdi zmdi-account-calendar:selected ').text();

 
seleccionar=$('#tag').attr('title');


  console.log(seleccionar);
  //identi="";
    
     

 
     
    //function guardarnfc(){
    //  obtenerid();
//var tag=$(this).closest("tr"); 
//console.log(tag.find("td:id"));

   // }
  
     function actualizar() {
        var profesorId = $(this).closest('tr').data('hash');
        var referencia = db.child(profesorId);
   //  alert('hola');
        referencia.once('value')
        .then(function (data) {
          var datosprofesor = data.val();
     console.log(data);
    // $('#mediumModal').modal('show');
         
        //  $("#planSelect").hide()
          $("#guardardocente").text('Editar').unbind('click').click(function () {
        referencia.update({
              // plan: clienteData.plan,
              nombre: $("#nombre").val(),
              apellido: $("#apellido").val(),
              cedula: $("#cedula").val(),
              email: $("#email").val(),
              telefono: $("#telefono").val(),
              //profesion: $("#profesion").val(),
           //   direccion: $("#direccion").val(),
             // birthday: $("#birthday").val()
             // limpiar();
            }, function () {
              limpiar();
              $('#mediumModal').modal('hide');
            //  $(".titulo-modal").text("Agregar Cliente");
            //  $("#planSelect").show()
              $("#guardardocente").text('Guardar').unbind('click').click(llenar);
              
            //  clearForm();
            })
          });
     
          $("#cerrar").unbind('click').click(function () {
            $('#mediumModal').modal('hide');
           // $(".titulo-modal").text("Agregar Cliente");
           // $("#planSelect").show()
            $("#guardardocente").text('Guardar').unbind('click').click(llenar);
          //  clearForm();
          });
     
          // $("#planList").val(clienteData.plan);
          $("#nombre").val(datosprofesor.nombre);
          $("#apellido").val(datosprofesor.apellido);
          $("#telefono").val(datosprofesor.telefono);
          $("#cedula").val(datosprofesor.cedula);
          $("#email").val(datosprofesor.email);
         // $("#telefono").val(clienteData.telefono);
         // $("#profesion").val(clienteData.profesion);
      //    $("#direccion").val(clienteData.direccion);
       //   $("#birthday").val(clienteData.birthday);
         $('#mediumModal').modal('show');
     
        }, function (error) {
          console.log(error);
        })
      }
      function editardocente() {
        var docenteId = $(this).closest('tr').data('hash');
        var docenteRef = db.child(docenteId);
     
        docenteRef.once('value')
        .then(function (data) {
          var docenteData = data.val();
     
         // $(".titulo-modal").text("Editar Cliente");
        //  $("#planSelect").hide()
  
          $("#guardardocente").text('Editar').unbind('click').click(function () {

            var name;
            var ape;
            var id;
            var email;
            var tele;
            if($('#nombre').val()==""|| $('#apellido').val()=="" ||$('#telefono').val()==""||$('#cedula').val()==""||$('#email').val()==""){
              alert(' hay campo vacios');
               
                }else  if(isNaN($('#cedula').val()) )    {
              
                 alert('cedula no valida');
               
              
                  
                 // $('#formulario').modal('hide') 
                 
                 } else if(isNaN($('#telefono').val())){
                  //$('#ModalDocente').modal('show') 
                 // $('#hola').html(' no es un numero') ;
                 alert('telefono no valido');
                 }  else if($.isNumeric( $("#nombre" ).val())){
              alert('nombre no valido');
                 }  else if ($.isNumeric( $("#apellido" ).val())){
                  alert('apellido no valido');
                 }else {
                  name=$('#nombre').val();
                  ape=$('#apellido').val();
                  id=$('#cedula').val();
                  email=$('#email').val();
                  tele=$('#telefono').val();
                 }
              
            docenteRef.update({
              
              // plan: clienteData.plan,
              nombre: name,
              apellido: ape,
              cedula:id,
              email: email,
              telefono:tele,
             // profesion: $("#profesion").val(),
            //  direccion: $("#direccion").val(),
             // birthday: $("#birthday").val()
            }, function () {
            //  limpiar();
              $('#mediumModal').modal('hide');
            //  $(".titulo-modal").text("Agregar Cliente");
             /// $("#planSelect").show()
              
              $("#guardardocente").text('Guardar').unbind('click').click(llenar);
              limpiar();
          //   clearForm()
            })
          });
     
          $("#cerrar").click(function () {
            limpiar();
            $('#mediumModal').modal('hide');
           // $(".titulo-modal").text("Agregar Cliente");
           // $("#planSelect").show()
           $("#guardardocente").text('Guardar').unbind('click').click(llenar);
         //  clearForm()
          });
     
          // $("#planList").val(clienteData.plan);
          $("#nombre").val(docenteData.nombre);
          $("#apellido").val(docenteData.apellido);
          $("#cedula").val(docenteData.cedula);
          $("#email").val(docenteData.email);
          $("#telefono").val(docenteData.telefono);
         // $("#profesion").val(clienteData.profesion);
         // $("#direccion").val(clienteData.direccion);
         // $("#birthday").val(clienteData.birthday);
          $('#mediumModal').modal('show');
     
        }, function (error) {
          console.log(error);
        })
      }
      var table = $('table tbody');
      table.on('click', '#eliminar', eliminar);
      $('#guardardocente').click(llenar);
      table.on('click','#actualizar',editardocente);
      table.on('click','#enviar',guardarrifd);
