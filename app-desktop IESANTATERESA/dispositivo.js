const electron = require('electron')
const {ipcRenderer} = electron

setTimeout(function () { console.log('getPorts'); ipcRenderer.send('getPorts');}, 5000)
// ipcRenderer.send('getPorts')

ipcRenderer.on('portList', (e, data) => {
  console.log('ports', data)
})

 

ipcRenderer.on('encontrar', (e, data) => {
  console.log('encon:', data)
})

//$('#btnError').click(() => {
  //console.log('iniciar')
  //ipcRenderer.send('start')
//})
