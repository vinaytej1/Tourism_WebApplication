var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
		window.addEventListener("devicemotion", function(event) {
          // Process event.acceleration, event.accelerationIncludingGravity,
          // event.rotationRate and event.interval
      }, true);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        navigator.geolocation.getCurrentPosition(this.onSuccess, this.onError);
        navigator.camera.getPicture(this.pictureSuccess, this.pictureError);
        window.addEventListener("batterystatus", onBatteryStatus, false);
        
        
    },

    pictureSuccess: function(imageData) {
        var image = document.getElementById('myImage');
        image.src = "data:image/jpeg;base64," + imageData;
    },

    pictureError: function(error) {
        console.log(error);
    },

    onSuccess: function(position) {
        var location = 'Latitude: ' + position.coords.latitude          + '\n' +
              'Longitude: '         + position.coords.longitude         + '\n' +
              'Altitude: '          + position.coords.altitude          + '\n' +
              'Accuracy: '          + position.coords.accuracy          + '\n' +
              'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
              'Heading: '           + position.coords.heading           + '\n' +
              'Speed: '             + position.coords.speed             + '\n' +
              'Timestamp: '         + position.timestamp                + '\n';
        console.log(location);
        document.getElementById("location").innerText = location;
    },

    // onError Callback receives a PositionError object
    //
    onError: function(error) {
        console.log('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    },


    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
function onBatteryStatus(info) { 
    alert("BATTERY STATUS:  Level: " + info.level + " isPlugged: " + info.isPlugged); 
 }
 app.initialize();
