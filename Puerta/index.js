  console.log("Iniciando");

 const SerialPort = require("serialport");
 const Readline = SerialPort.parsers.Readline;
 const admin = require("firebase-admin");
 const Gpio = require('onoff'). Gpio;
 
 var rly = new Gpio(17, 'out');
var fechaactual=new Date();
 
 
  
 const moment = require('moment');
 var serviceAcount = require("./Santateresa.json");
 
 admin.initializeApp({
     credential: admin.credential.cert(serviceAcount),
     databaseURL: "https://santa-teresa-2c134.firebaseio.com"
 });

 var profe=admin.database().ref('profesor')
var db = admin.database().ref("horarios");
var asist = admin.database().ref("Asistencia");
 const mySerial = new SerialPort("/dev/ttyACM0",{
     baudRate: 115200
 });

 mySerial.on("open", function(){
     console.log("Puerto abierto")
 });

 const parser = new Readline();

 mySerial.pipe(parser);

 function proexists(clave, exists){
    if (exists) {
        console.log(clave + ' exists!');
      } else {
        console.log(clave + ' does not exist!');
      }
 }


 parser.on("data", data =>{
    var profe=admin.database().ref('profesor')
     var clave= data.replace(/\s|\r/g,'');
     console.log(clave)
      var pera = data.toString("utf8");
     if(clave == null){
       console.log("Formato incorrecto")
     } else{
      profe.orderByChild("tag").equalTo(clave).on("child_added", function(snapshot){
        var exists = (snapshot.val()!==null); 
        
        if (exists) {
            console.log(clave + ' exists!');
            NombreProfesor = snapshot.val().nombre;
            console.log(NombreProfesor);
               
 
var ffinal;
var ccierre;
var hinicio;
var estado;
var fechainicial;
var estado;
var lunes;
var martes;
var miercoles; 
var jueves;
var viernes;
var sabado;
var domingo;
var acceso=false
var restringido=true

db.on('value',function(snapshot){
    var snap=snapshot.val()

    for(horarios in snap){
        var finicio=snap[horarios].fechainicio
        var  ffinal=snap[horarios].cierre
        var  hinicio=snap[horarios].horainicio
        var estado=snap[horarios].estado
        ccierre=snap[horarios].horacierre
        lunes=snap[horarios].lunes
        martes=snap[horarios].martes
        miercoles=snap[horarios].miercoles
        jueves=snap[horarios].jueves
        viernes=snap[horarios].viernes
        sabado=snap[horarios].sabado
        domingo=snap[horarios].domingo
        fechainicial =moment().format(finicio+" "+hinicio,'YYYY-MM-DD HH:mm');
  fechafinal=moment().format(ffinal+" "+ccierre,'YYYY-MM-DD HH:mm')
        var fecha=moment(fechainicial)
var fechab=moment(fechafinal);
var cfinicio=finicio.split('-')
var anoinicio=parseInt(cfinicio[0])
var mesinicio=parseInt(cfinicio[1])
var diainicio=parseInt(cfinicio[2])

var chinicio=hinicio.split(':')
var  horai=hinicio[0]
var minutosi=hinicio[1]
var cfcierre=ffinal.split('-')
var anocierre=parseInt(cfcierre[0])
var mescierre=parseInt(cfcierre[1])
var diacierre=parseInt(cfcierre[2])
var chcierre=ccierre.split(':')
var horac=parseInt(chcierre[0])
var  minutosc=parseInt(chcierre[1])
fechaactual.toString()


//var  year=fechaactual.getFullYear()
//var  month=fechaactual.getMonth()
//var day=fechaactual.getDay()
//var h=fechaactual.getHours()
//var mm=fechaactual.getMinutes()
console.log(snap[horarios].tipo)
 console.log(fechaactual.toString())
if(fecha.toDate().getTime()<fechaactual.getTime() && fechaactual.getTime()<fechab.toDate().getTime()){
if(snap[horarios].tipo=='Ingreso'){
    var a = new Date();
    var weekdays = new Array(7);
    weekdays[0] = "Sunday";
    weekdays[1] = "Monday";
    weekdays[2] = "Tuesday";
    weekdays[3] = "Wednesday";
    weekdays[4] = "Thursday";
    weekdays[5] = "Friday";
    weekdays[6] = "Saturday";
    var r = weekdays[a.getDay()];
        if(lunes===1 && r=='Monday'){
            console.log(' acceso lunes')
            acceso=true;
            restringido=false
        }
    
        if(martes===1 && r=='Tuesday' ){
            console.log(' acceso martes')
            acceso=true;
            restringido=false
        }
    
        if(miercoles===1 && r=='Wednesday'){
            console.log('acceso miercoles')
            acceso=true;
            restringido=false
        }
    
        if(jueves===1 && r=='Thursday' ){
            console.log('acceso jueves')
            acceso=true;
            restringido=false
        }
    
        if(viernes===1 && r=='Friday'){
            console.log('acceso viernes')
            acceso=true;
            restringido=false
        }
    
        if(sabado===1 && r=='Saturday' ){
            console.log('acceso sabado')
            acceso=true;
            restringido=false
        }
    
        if(domingo===1 && r=='Sunday' ){
            console.log('acceso domingo')
            acceso=true;
            restringido=false
        }

}
 
if(snap[horarios].tipo=='Restringir'){
    var a = new Date();
    var weekdays = new Array(7);
    weekdays[0] = "Sunday";
    weekdays[1] = "Monday";
    weekdays[2] = "Tuesday";
    weekdays[3] = "Wednesday";
    weekdays[4] = "Thursday";
    weekdays[5] = "Friday";
    weekdays[6] = "Saturday";
    var r = weekdays[a.getDay()];
        if(lunes===1 && r=='Monday'){
            console.log('Denegado lunes')
            restringido=true
        }
    
        if(martes===1 && r=='Tuesday' ){
            console.log('Denegado martes')
            restringido=true
        }
    
        if(miercoles===1 && r=='Wednesday'){
            console.log('Denegado miercoles')
            restringido=true
        }
    
        if(jueves===1 && r=='Thursday' ){
            console.log('Denegado jueves')
            restringido=true
        }
    
        if(viernes===1 && r=='Friday'){
            console.log('Denegado viernes')
            restringido=true
        }
    
        if(sabado===1 && r=='Saturday' ){
            console.log('Denegado sabado')
            restringido=true
        }
    
        if(domingo===1 && r=='Sunday' ){
            console.log('Denegado domingo')
            restringido=true
        }
}

            console.log(fechaactual);
 

    
}
    }
    
    
   if(acceso==true && restringido==false){
    console.log('abre puerta')
    
    var Asis={
		nombre:NombreProfesor,
		fechas:fechaactual.toString(),
		acceso:'concedido'
     }
     asist.push().set(Asis)
     
     
         
	//	 if (rly.readSync() === 1){
	//		 rly.write(0)
     //        console.log(rly.readSync())
	//		 }else{
	//			 rly.write(1);
     //            console.log(rly.readSync())
	//			} 
	var myVar;
rly.writeSync(1); 
myFunction();

function myFunction() {
  myVar = setTimeout(encender, 1000);
}

function encender() {
    console.log("ffa1")
  rly.writeSync(0); 
  rly.unexport();
  myVar = setTimeout(apagar, 2000);
  
}

function apagar() {
    console.log("ffa2")
    var Gpio = require('onoff').Gpio,
    rly = new Gpio(17, 'out');
  rly.writeSync(1); 
}		 

		
}else {
    console.log('no abrepuerta')
    
     var Asis={
		nombre:NombreProfesor,
		fechas:fechaactual.toString(),
		acceso:'denegado'
     }
       asist.push().set(Asis)
     
}  
})   
console.log("acceso restringido"+": "+restringido)
console.log("acceso concedido :  "+acceso)
      
          
          } else {
            console.log(clave + ' does not exist!');
         }       
    })
     }
     
    
     
    
     
 })
