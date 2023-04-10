
/* const http = require('http'); // or 'https' for https:// URLs
const fs = require('fs'); */
var video = document.querySelector("#videoElement");
var stopVideo = document.querySelector("#stop");
var startVideo = document.querySelector("#start");
let download_link = document.querySelector("#download-video");


var media_recorder = null;
let videoStream = null;
var blobs_recorded = [];

function start() {
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({video: true})
                .then(function (stream) {
                    video.srcObject = stream;
                    videoStream = stream;
                    /* recording(stream) */
                })
                .catch(function (err0r) {
                    console.log("Something went wrong!");
                });
    }
}

function stop(e) {
     stream = video.srcObject;
    var tracks = stream.getTracks();

    for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];
        track.stop();
    }

    video.srcObject = null;
}

var isBroadcasting = false,
	broadcastingTimer;
function sendSnapshot(){
	if(localMediaStream && !isBroadcasting){
		isBroadcasting = true;
                $.post("/",
			{
				p: "new",
				text: ctx.canvas.toDataURL("image/webp", quality) // quality - качество изображения(float)
			},
			function(result){
				console.log(result); // На случай, если что-то пойдёт не так
				isBroadcasting = false;
			}
		);
	}
}
// И добавим обработчики кнопок начала и завершения вещания
function startBroadcasting(){
	broadcastingTimer = setInterval(sendSnapshot, 1);
}
function stopBroadcasting(){
	clearInterval(broadcastingTimer);
}

function startRecord(){
    media_recorder = new MediaRecorder(videoStream, { mimeType: 'video/webm' });
    media_recorder.addEventListener('dataavailable', function(e) {
		blobs_recorded.push(e.data);
    });

    // event : recording stopped & all blobs sent
    media_recorder.addEventListener('stop', function() {
    	// create local object URL from the recorded video blobs
    	let video_local = URL.createObjectURL(new Blob(blobs_recorded, { type: 'video/webm' }));
    	download_link.href = video_local;
        download(download_link.href, 'vid.webm');
    });

    // start recording with each recorded blob having 1 second video
    media_recorder.start(1000);
}

function stopRecord(){
    media_recorder.stop()
}
function download(dataurl, filename) {
    var a = document.createElement("a");
    a.href = dataurl;
    a.setAttribute("download", filename);
    a.click();



     media_recorder = null;

 blobs_recorded = [];
    return false;
  }