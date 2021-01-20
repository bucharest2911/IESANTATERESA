 
 
 var db = firebase.database().ref("horarios");

  
 
 //var vector=$('.form-check-label');

 //var dato=[];

 // dato.push(vector);

    //console.log(dato[1]);

  var limpiar=function(){
    $('#nombre').val("");
    $('#cierre').val("");
    $('#horacierre').val("");
    $('#horainicio').val("");
    $('#inicio').val("");
   // $('#select option:selected').text("escoga una opcion");
   // $('#checkbox1').prop("checked",false);
   // $('#checkbox2').prop("checked",false);
  //  $('#checkbox3').prop("checked",false);
  //  $('#checkbox4').prop("checked",false);
  //  $('#checkbox5').prop("checked",false);
   // $('#checkbox6').prop("checked",false);
   // $('#checkbox7').prop("checked",false);
     
}
 
    //var dia=[];
    //$('.form-check-input:checked').each(function(){
        //dia.push($(this).val());
         
   // });
  
 var llenar=function(){
    //limpiar();
    var obtener="";

    var cblunes=0;
    var cbmartes=0;
    var cbmiercoles=0;
    var cbjueves=0;
    var cbviernes=0;
    var cbsabado=0;
    var cbdomingo=0;
     
    //tipo=$('#tipo').val();

    
     
    var dato=""/""/""
    //var valor=" " ":"   "";
    var valor="   :   "
 


    if($('#checkbox1').is(':checked')){
        cblunes=1;
    }
    if($('#checkbox2').is(':checked')){
        cbmartes=1;
    }
    if($('#checkbox3').is(':checked')){
        cbmiercoles=1;
    }
    if($('#checkbox4').is(':checked')){
        cbjueves=1;
    }
    if($('#checkbox5').is(':checked')){
        cbviernes=1;
    }
    if($('#checkbox6').is(':checked')){
        cbsabado=1;
    }
    if($('#checkbox7').is(':checked')){
        cbdomingo=1;
        
    } 
    
    
         
            
            
            
             
            if($('#nombre').val()==""||$('#inicio').val()==  ""/""/"" ||$('#horainicio').val()==" : "||$('#cierre').val()==""/""/""||$('#horacierre').val()==":"){
                alert('Campos vacios por favor completar');
            } else  if($('#select option:selected').text()=='escoga una opcion'){
                alert('escoga una opcion correcta');
            }else{
                 
                seleccion=$('#select option:selected').text();
                nombre=$('#nombre').val();
                inicio=$('#inicio').val();
                horainicio=$('#horainicio').val();
                cierre=$('#cierre').val();
                horacierre=$('#horacierre').val();
               
            }  
           
   // console.log(obtener);
   
  
    
      // var capturardia=dia.join(',');
       var horario={
           
       
           nombre: nombre,
           tipo:seleccion,
           fechainicio:    parseInt(inicio),
           horainicio:   parseInt(horainicio),
           cierre: parseInt(cierre),
           horacierre: parseInt(horacierre),
           lunes:cblunes,
           martes:cbmartes,
           miercoles:cbmiercoles,
           jueves:cbjueves,
           viernes:cbviernes,
           sabado:cbsabado,
           domingo:cbdomingo,
   
          
           
           //dias: capturardia,
   
   
       }
       db.push().set(horario);
       limpiar();
       console.log('guardado')
  }
  
  $('#guardarhorario').click(llenar);
    db.on('value',function(snapshot){
        var snap=snapshot.val();
       // console.log(profe);
    
      //  var html="";
       $('#tabla tbody').empty();
        var row='';
        for (horario in snap) {
            if(snap[horario].lunes=='1'){
                var checkbutton1=  `  <input type="checkbox" checked=true disabled>`;
            }else{
                var checkbutton1=` <input type="checkbox"   disabled>`;
            }  
            
            if(snap[horario].martes=='1'){
                var checkbutton2= ` <input type="checkbox" checked=true disabled>`;
            }else{
                var checkbutton2=`<input type="checkbox"   disabled>`;
            }  
            if(snap[horario].miercoles=='1'){
                var checkbutton3= ` <input type="checkbox" checked=true disabled>`;
            }else{
                var checkbutton3=` <input type="checkbox"   disabled>`;
            }  
            
            if(snap[horario].jueves=='1'){
                var checkbutton4= `<input type="checkbox" checked=true disabled>`;
            }else{
                var checkbutton4=`<input type="checkbox"   disabled>`;
            }  
    
            if(snap[horario].viernes=='1'){
                var checkbutton5= ` <input type="checkbox" checked=true disabled>`;
            }else{
                var checkbutton5=` <input type="checkbox"   disabled>`;
            }  
    
            if(snap[horario].sabado=='1'){
                var checkbutton6= ` <input type="checkbox" checked=true disabled>`;
            }else{
                var checkbutton6=`<input type="checkbox"   disabled>`;
            }  
    
            if(snap[horario].domingo=='1'){
                var checkbutton7= ` <input type="checkbox" checked=true disabled>`;
            }else{
                var checkbutton7=` <input type="checkbox"   disabled>`;
            } 
          row += `
          <tr data-hash='${horario}'>
            <td class="nombre">${snap[horario].nombre}</td>
            <td class="apellido">${snap[horario].tipo}</td>
            <td class="identificacion">${snap[horario].fechainicio}</td>
            <td class="email">${snap[horario].horainicio}</td>
            <td class="email">${snap[horario].cierre}</td>
            <td class="email">${snap[horario].horacierre}</td>
            
           
            <td class="telefono">${checkbutton1}</td>
            <td class="telefono">${checkbutton2}</td>
            <td class="telefono">${checkbutton3}</td>
            <td class="telefono">${checkbutton4}</td>
            <td class="telefono">${checkbutton5}</td>
            <td class="telefono">${checkbutton6}</td>
            <td class="telefono">${checkbutton7}</td>
            <td>  <button type="button" id="actualizar" class="btn btn-success"><i class="fas fa-edit"></i></button></td>
            <td> <button type="button" id="eliminar" class="btn btn-danger"><i class="far fa-trash-alt"></i></button></td>
            <td> <button type="button" class="btn btn-default btn-sm">
            <span class="glyphicon glyphicon-remove"></span> 
          </button></td>
            </td>
          </tr>
         `;
          }
        console.log($('table tbody'));
         
     
    
    
     
      $('#tabla tbody').append(row);
      row="";
        
         })

  
     
         var table = $('table tbody');
         table.on('click', '#eliminar', eliminar);
         //$('#guardarhorario').click(llenar);
         table.on('click','#actualizar',editarhorario);
 
       
         
    //  table.on('click', '#editar', actualizar);
    function eliminar(){
        var horarioid=$(this).closest('tr').data('hash');
       // var col1=horarioid.find('td:eq(1)').text();
 

//var x=confirm('seguro');

//if (x==true){
 //   db.child(horarioid).remove();
//}else {
   // alert('bien');
//}
    $('#exampleModal').modal('show') ;
    
    $('#si').click(function(){
        db.child(horarioid).remove();
        $('#exampleModal').modal('hide') ;
    })
     
}
    function actualizar() {
        var horarioId = $(this).closest('tr').data('hash');
        var referencia = db.child(horarioId);
   //  alert('hola');
        referencia.once('value')
        .then(function (data) {
          var chorarios = data.val();
     console.log(data);
     $('#mediumModal').modal('show');
         
        //  $("#planSelect").hide()
          $("#guardarhorario").text('Editar').unbind('click').click(function () {
            var cblunes=0;
            var cbmartes=0;
            var cbmiercoles=0;
            var cbjueves=0;
            var cbviernes=0;
            var cbsabado=0;
            var cbdomingo=0;

        if($('#nombre').val()==""||$('#inicio').val()=="dd/mm/aaaa"||$('#horainicio').val()=="--:--"||$('cierre').val()=="dd/mm/aaaa"||$('horacierre').val()=="--:--"||$('#tipo').val()==""){
            alert('Campos vacios por favor completar');
        }else{
            nombre=$('#nombre').val();
            inicio=$('#inicio').val();
            horainicio=$('#horainicio').val();
            cierre=$('#cierre').val();
            horacierre=$('#horacierre').val();
            tipo=$('#tipo').val();
        }
           
            if($('#checkbox1').is(':checked')){
               cblunes=1;
           }
           if($('#checkbox2').is(':checked')){
               cbmartes=1;
           }
           if($('#checkbox3').is(':checked')){
               cbmiercoles=1;
           }
           if($('#checkbox4').is(':checked')){
               cbjueves=1;
           }
           if($('#checkbox5').is(':checked')){
               cbviernes=1;
           }
           if($('#checkbox6').is(':checked')){
               cbsabado=1;
           }
           if($('#checkbox7').is(':checked')){
               cbdomingo=1;
               
           }
        referencia.update({
              // plan: clienteData.plan,
            
              
              nombre: nombre , //$('#nombre').val(),
              tipo:tipo , //$('#select option:selected').text(),
              fechainicio: inicio ,//$('#inicio').val(),
              horainicio: horainicio, //$('#horainicio').val(),
              cierre:cierre, //$('#cierre').val(),
              horacierre: horacierre, //$('#horacierre').val(),
              lunes:cblunes,
              martes:cbmartes,
              miercoles:cbmiercoles,
              jueves:cbjueves,
              viernes:cbviernes,
              sabado:cbsabado,
              domingo:cbdomingo,
              //profesion: $("#profesion").val(),
           //   direccion: $("#direccion").val(),
             // birthday: $("#birthday").val()

             
            }, function () {
              $('#mediumModal').modal('hide');
            //  $(".titulo-modal").text("Agregar Cliente");
            //  $("#planSelect").show()
             
              $("#guardarhorario").text('Guardar').unbind('click').click(llenar);
              limpiar();
            //  clearForm();
            })
          });
     
          $("#cerrar").unbind('click').click(function () {
            limpiar();
            $('#mediumModal').modal('hide');
           // $(".titulo-modal").text("Agregar Cliente");
           // $("#planSelect").show()
            $("#guardarhorario").text('Guardar').unbind('click').click(llenar);
           // limpiar();
          //  clearForm();
          });
     
          // $("#planList").val(clienteData.plan);
       //   $("#nombre").val(datosprofesor.nombre);
        //  $("#apellido").val(datosprofesor.apellido);
       //   $("#telefono").val(datosprofesor.telefono);
       //   $("#cedula").val(datosprofesor.cedula);
      //    $("#email").val(datosprofesor.email);

       
        $('#nombre').val(chorarios.nombre),
        $('#select option:selected').val(chorarios.tipo);
          $('#inicio').val(chorarios.fechainicio);
          $('#horainicio').val(chorarios.horainicio);
        $('#cierre').val(chorarios.fechacierre);
    $('#horacierre').val(chorarios.horacierre);
    if(chorarios.lunes=="1"){
$('#checkbox1').prop("checked",true);
    }else{
        $('#checkbox1').prop("checked",false);
    }
    if(chorarios.martes=="1"){
        $('#checkbox2').prop("checked",true);
            }else{
                $('#checkbox2').prop("checked",false);
            }

            if(chorarios.miercoles=="1"){
                $('#checkbox3').prop("checked",true);
                    }else{
                        $('#checkbox3').prop("checked",false);
                    }
                    if(chorarios.jueves=="1"){
                        $('#checkbox4').prop("checked",true);
                            }else{
                                $('#checkbox4').prop("checked",false);
                            }
                            if(chorarios.viernes=="1"){
                                $('#checkbox5').prop("checked",true);
                                    }else{
                                        $('#checkbox5').prop("checked",false);
                                    }

                                    if(chorarios.sabado=="1"){
                                        $('#checkbox6').prop("checked",true);
                                            }else{
                                                $('#checkbox6').prop("checked",false);
                                            }
                                            if(chorarios.domingo=="1"){
                                                $('#checkbox7').prop("checked",true);
                                                    }else{
                                                        $('#checkbox7').prop("checked",false);
                                                    }
                                                
         // $("#telefono").val(clienteData.telefono);
         // $("#profesion").val(clienteData.profesion);
      //    $("#direccion").val(clienteData.direccion);
       //   $("#birthday").val(clienteData.birthday);
         $('#mediumModal').modal('show');
     
        }, function (error) {
          console.log(error);
        })
      }
      //var eliminar=function(){
        //  alert('hola');
          var horarioid=$(this).closest('tr').data('hash');
          console.log(horarioid);
        //  var elegir=confirm('seguro que desea eliminar');
        //  if(elegir===true){
           //   db.child(horarioid).remove();
 
                 //     }
     // }

     function editarhorario() {
        var Id = $(this).closest('tr').data('hash');
        var horarioRef = db.child(Id);
     
        horarioRef.once('value')
        .then(function (data) {
          var chorarios = data.val();
     
          //$(".titulo-modal").text("Editar Cliente");
        //  $("#planSelect").hide()
          $("#guardarhorario").text('Editar').unbind('click').click(function () {
            var cblunes=0;
            var cbmartes=0;
            var cbmiercoles=0;
            var cbjueves=0;
            var cbviernes=0;
            var cbsabado=0;
            var cbdomingo=0;
            if($('#checkbox1').is(':checked')){
                cblunes=1;
            }
            if($('#checkbox2').is(':checked')){
                cbmartes=1;
            }
            if($('#checkbox3').is(':checked')){
                cbmiercoles=1;
            }
            if($('#checkbox4').is(':checked')){
                cbjueves=1;
            }
            if($('#checkbox5').is(':checked')){
                cbviernes=1;
            }
            if($('#checkbox6').is(':checked')){
                cbsabado=1;
            }
            if($('#checkbox7').is(':checked')){
                cbdomingo=1;
                
            }
            horarioRef.update({
              // plan: clienteData.plan,
              nombre:$('#nombre').val(),
              fechainicio:$('#inicio').val(),
              horainicio:$('#horainicio').val(),
              cierre:$('#cierre').val(),
              horacierre:$('#horacierre').val(),
              lunes:cblunes,
              martes:cbmartes,
              miercoles:cbmiercoles,
              jueves:cbjueves,
              viernes:cbviernes,
              sabado:cbsabado,
              domingo:cbdomingo,
            //  tipo:$('#tipo').val(),
            }, function () {
              $('#mediumModal').modal('hide');
           //   $(".titulo-modal").text("Agregar Cliente");
            //  $("#planSelect").show()
              $("#guardarhorario").text('Guardar').unbind('click').click(llenar);
              clearForm();
            })
          });
     
          $("#cerrar").unbind('click').click(function () {
            limpiar();
          //  $('#modalCliente').modal('close');
           // $(".titulo-modal").text("Agregar Cliente");
          //  $("#planSelect").show()
            $("#guardarhorario").text('Guardar').unbind('click').click(llenar);
           // limpiar();
          });
     
          // $("#planList").val(clienteData.plan);
          $('#nombre').val(chorarios.nombre),
          $('#select option:selected').val(chorarios.tipo);
            $('#inicio').val(chorarios.fechainicio);
            $('#horainicio').val(chorarios.horainicio);
          $('#cierre').val(chorarios.cierre);
      $('#horacierre').val(chorarios.horacierre);
      if(chorarios.lunes=="1"){
  $('#checkbox1').prop("checked",true);
      }else{
          $('#checkbox1').prop("checked",false);
      }
      if(chorarios.martes=="1"){
          $('#checkbox2').prop("checked",true);
              }else{
                  $('#checkbox2').prop("checked",false);
              }
  
              if(chorarios.miercoles=="1"){
                  $('#checkbox3').prop("checked",true);
                      }else{
                          $('#checkbox3').prop("checked",false);
                      }
                      if(chorarios.jueves=="1"){
                          $('#checkbox4').prop("checked",true);
                              }else{
                                  $('#checkbox4').prop("checked",false);
                              }
                              if(chorarios.viernes=="1"){
                                  $('#checkbox5').prop("checked",true);
                                      }else{
                                          $('#checkbox5').prop("checked",false);
                                      }
  
                                      if(chorarios.sabado=="1"){
                                          $('#checkbox6').prop("checked",true);
                                              }else{
                                                  $('#checkbox6').prop("checked",false);
                                              }
                                              if(chorarios.domingo=="1"){
                                                  $('#checkbox7').prop("checked",true);
                                                      }else{
                                                          $('#checkbox7').prop("checked",false);
                                                      }
                                                  
                                                      $('#mediumModal').modal('show');
        }, function (error) {
          console.log(error);
        })
      }
     
