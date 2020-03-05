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
    start.disabled = true;
    start.style.color = "red";

    stop.onclick = function() {
      mediaRecorder.stop();
      start.disabled = false;
      start.style.color = "green";
      // mediaRecorder.requestData();
    };

    mediaRecorder.onstop = function(e) {};

    mediaRecorder.ondataavailable = function(e) {
      var audioURL = window.URL.createObjectURL(e.data);
      audio.src = audioURL;
    };
  };
}
