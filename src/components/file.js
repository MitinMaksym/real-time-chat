var start = document.getElementById("start");
var stop = document.querySelector("#stop");
var audio = document.getElementById("player");
var chunks = [];

navigator.getUserMedia =
  navigator.getUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia ||
  navigator.webkitGetUserMedia;
if (navigator.getUserMedia) {
  console.log("ok");

  start.addEventListener("click", function() {
    var constraints = { audio: true };
    navigator.getUserMedia(constraints, onSuccess, onError);
  });

  var onError = function(err) {
    alert("The following error occured: " + err);
  };

  var onSuccess = function(stream) {
    var mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.start();
    console.log(mediaRecorder.state);
    console.log("recorder started");
    start.disabled = true;
    start.style.color = "red";

    stop.onclick = function() {
      mediaRecorder.stop();
      console.log(mediaRecorder.state);
      console.log("recorder stopped");
      start.disabled = false;
      start.style.color = "green";
      // mediaRecorder.requestData();
    };

    mediaRecorder.onstop = function(e) {
      console.log("stopped");
    };

    mediaRecorder.ondataavailable = function(e) {
      var audioURL = window.URL.createObjectURL(e.data);
      audio.src = audioURL;
      console.log("recorder stopped");
    };
  };
}
