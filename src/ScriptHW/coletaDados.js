//node coletaDados.js to run this script

require('mraa');
var groveSensor = require('jsupm_grove');
var sensorModule = require('jsupm_ttp223');
var upmBuzzer = require("jsupm_buzzer");
var requestify = require('requestify'); 

var temp = new groveSensor.GroveTemp(0); 
var lum = new groveSensor.GroveLight(1);
var tch = new sensorModule.TTP223(2);
var btn = new groveSensor.GroveButton(3);
var bzz = new upmBuzzer.Buzzer(6);

var thing = 'DM120_FGA'
var thing_bzz = '_BZZ'

readData();

function readData()
{
  var celsius = temp.value();
  var luminosidade = lum.value();
  var button = btn.value();
  var touch = "";
  if(tch.isPressed())
    touch = "pressed";
  else
    touch = "not pressed";
  
  var url = 'https://dweet.io:443/dweet/for/'+ thing;
  var url_bzz = 'https://dweet.io:443/get/latest/dweet/for/'+ thing + thing_bzz;

  var status = status;
  if(button == 0){
    status = "Incubadora aberta"
  }
  if(button == 1){
    status = "Incubadora fechada"
  }
  if(luminosidade >= 40 && button == 0){
    status = "Luminosidade alta, feche a incubadora"
  }
  if(celsius >= 30 && button == 1){
    status = "Temperatura muito alta, abra a incubadora"
  }

  requestify.get(url_bzz)
  .then(function(response) {
    // Obtem resposta do servidor
    var a = response.getBody();        
    //Loga a resposta do servidor
    console.log("RESP_GET");
    console.log(a.with[0].content.buzzer)
    if(a.with[0].content.buzzer == '1'){
      playBuzzer();
    }
  }); 

  // Envia dados para servidor via método POST    
  requestify.post(url, {
      temp: celsius,
      lum: luminosidade,
      button: button,
      touch: touch,
      status: status
  })
  .then(function(response) {
      // Obtem resposta do servidor
      response.getBody();        
      //Loga a resposta do servidor
      console.log("RESP_POST");
      console.log(response.body)
  });
    
  //Chama a função a cada 3 segundos
  setTimeout(readData,3000); 
}

function playBuzzer()
{
  bzz.playSound(100000, 500000);
}
