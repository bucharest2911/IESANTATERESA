const electron = require('electron');
const path = require('path');
const url = require('url');
 
// SET ENV
process.env.NODE_ENV = 'development';

const {app, BrowserWindow, Menu, ipcMain} = electron;

let mainWindow;
let addWindow;
let startApp=true;

// Listen for app to be ready
app.on('ready',createPortsWindow );

function createPortsWindow() {
  // Create new window
  portsWindow = new BrowserWindow({
    // width: 350,
    // height: 340
    width: 800,
    height: 600
    // title: 'Seleccionar Dispositivo'
  });
  // Load html into window
  portsWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'dispositivo.html'),
    protocol: 'file',
    slashes: true
  }));
  // Garbage collection handle
  portsWindow.on('close', () => {
    if (startApp) {
      createMainWindow()
    } else {
      app.quit()
    }
    portsWindow = null
  })

  // Build menu from template
  const portsWindowMenu = Menu.buildFromTemplate(mainMenuTemplate)
  // Insert menu
  Menu.setApplicationMenu(portsWindowMenu)
}

// Handle add item window
function createUserWindow(){
  addWindow = new BrowserWindow({
    width: 1200,
    height:800,
    title:'Add Shopping List Item'
  });
  addWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'iniciosesion.html'),
    protocol: 'file:',
    slashes:true
  }));
  // Handle garbage collection
  addWindow.on('close', function(){
    addWindow = null;
  });

  const userWindowMenu = Menu.buildFromTemplate(mainMenuTemplate)
  Menu.setApplicationMenu( userWindowMenu)
}

// Catch item:add
ipcMain.on('item:add', function(e, item){
  mainWindow.webContents.send('item:add', item);
  addWindow.close(); 
  // Still have a reference to addWindow in memory. Need to reclaim memory (Grabage collection)
  //addWindow = null;
});

function createMainWindow() {
  // Create new window
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800
  });
  // Load html into window
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'Docentes.html'),
    protocol: 'file',
    slashes: true
  }));

  // win.maximize()
  // Quit app when closed
  mainWindow.on('closed', () => {
    app.quit()
    mainWindow = null
  });

  // Build menu from template
  const mainWindowMenu = Menu.buildFromTemplate(mainMenuTemplate)
  // Insert menu
  Menu.setApplicationMenu(mainWindowMenu)
}

// Catch item:add
ipcMain.on('item:add', function(e, item){
  mainWindow.webContents.send('item:add', item);
  addWindow.close(); 
  // Still have a reference to addWindow in memory. Need to reclaim memory (Grabage collection)
  //addWindow = null;
});
 ipcMain.on('logrado',function(e,item){
 
 if(item){
  
startApp=true;
  
 
 }
  


 })
 

// Create menu template
const mainMenuTemplate =  [
  // Each object is a dropdown
  {
    label: 'File',
    submenu:[
      {
        label:'Add Item',
        click(){
          createAddWindow();
        }
      },
      {
        label:'Clear Items',
        click(){
          mainWindow.webContents.send('item:clear');
        }
      },
      {
        label: 'Quit',
        accelerator:process.platform == 'darwin' ? 'Command+Q' : 'f5',
        click(){
          app.quit();
        }
      }
    ]
  }
];

// If OSX, add empty object to menu
if(process.platform == 'darwin'){
  mainMenuTemplate.unshift({});
}

// Add developer tools option if in dev
if(process.env.NODE_ENV !== 'production'){
  mainMenuTemplate.push({
    label: 'Developer Tools',
    submenu:[
      {
        role: 'reload'
      },
      {
        label: 'Toggle DevTools',
        accelerator:process.platform == 'darwin' ? 'Command+I' : 'f12',
        click(item, focusedWindow){
          focusedWindow.toggleDevTools();
        }
      }
    ]
  });
}
//___________________

var serialPort = require('serialport');
const spReadline = serialPort.parsers.Readline

let puertos={};
let prt = {}
let encontrado=false;
serialPort.list(function (err, ports) {
  ports.forEach(function(port) {
  //  console.log(port.comName);
  //  console.log(port.pnpId);
  //  console.log(port.manufacturer);

    puertos=ports;
    ports.forEach(port => {
      if (port.productId == '0043') {
        prt = port
        encontrado = true
      }
    })
   //console.log(puertos)
  });
});
  
var valor="mensaje"
console.log(valor)
ipcMain.on('getPorts',(e)=>{
 
  portsWindowMenu.webContents.send('portList',puertos)
  if(encontrado){
    portsWindowMenu.webContents.send('encontrar',prt)
    const port = new serialport(prt.comName, {
      baudRate: 115200
     
    })
    
    port.on('error', error => {
      console.log('ERROR', error)
      portsWindow.webContents.send('error', error)
    })
    
    port.on('open',() => {
      console.log('Serial Port Opened...')
      startApp = true
      portsWindow.close()
    })
    
    port.on('close', error => {
      console.log('Serial Port Closed:', error)
    })
    
    
    const parser = new spReadline()
    port.pipe(parser)
    
    // Recibe los datos de arduino y los imprime
    parser.on('data', data => {
      var uid = data.replace(/\s|\r/g, '')
      mainWindow.webContents.send('deviceData', uid)
      console.log('device data:', uid)
    })
    ipcMain.on('exito', (e, data) => {
      console.log('dato enviado al dispositivo:', data)
      port.write(data + "\n", err => {
        if (err) {
          return console.log('Error on write:', err.message)
        }
      })
    })
  }
 


})
 

 
 
 