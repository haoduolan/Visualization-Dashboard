
// Create a client instance
var client = new Paho.MQTT.Client("test.mosquitto.org", Number(8080), "clientId");

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({onSuccess:onConnect});


// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  client.subscribe("LanTopic");
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

// called when a message arrives
function onMessageArrived(message) {
  console.log("onMessageArrived:"+message.payloadString);
  var d = message.payloadString;
  var scope = angular.element(document.getElementById("controllerId")).scope();
  scope.$apply(function() {
  	scope.addData(Number(d));
  });
}