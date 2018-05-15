var preferredPort = '/dev/tty.usbmodem1421'; //preferred serial port (automatically picked)
var incoming;
var connectionId = -1; //null connection id before serial connection
var encoder = new TextEncoder()
var decoder = new TextDecoder("utf-8");

var selectedPort;

chrome.serial.getDevices(onGetDevices); //get devices

function onGetDevices(ports){
  chrome.serial.connect(preferredPort, {bitrate: 9600}, onConnect);
}
function onConnect(connectionInfo){
  try {
    connectionId = connectionInfo.connectionId;
    chrome.serial.onReceive.addListener(onReceiveCallback);
    chrome.serial.onReceiveError.addListener(onErrorCallback);
  }
  catch(e) {
    console.log(e);
  }
};

var onErrorCallback = function(info) {
  console.log(info.error);
  chrome.serial.disconnect(info.connectionId, function(){
  console.log("Serial connection closed");
  connectionId = -1;
  });
};
