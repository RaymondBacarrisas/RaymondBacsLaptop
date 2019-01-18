var  cameraHolder = document.getElementById("cameraHolder");
var  startStopBtn = document.getElementById("startStopBtn");
var  resolutionvalu = document.getElementById("resolutionvalu");
var  resolutionqual = document.getElementById("resolutionqual");
var  design = document.getElementById("design");

var cameraStream;
var stopstartBtnName = startStopBtn.innerHTML = "Start";
var  recordRtc;

function camHolBtnFunc(elem) {
	if(startStopBtn.innerHTML == "Start") {
		startCamera();
	}
	if(startStopBtn.innerHTML == "Stop") {
		stopstartBtnName = "Start";
		stopCamera();
	}
	startStopBtn.innerHTML = stopstartBtnName;
}

function startCamera() {
	navigator.mediaDevices.getUserMedia(setAccess).then(recordStream).catch();
}

var setAccess = { video: true, audio: true };

function recordStream(stream) {
	stopstartBtnName = "Stop";
	startStopBtn.innerHTML = stopstartBtnName;
	cameraStream = stream;
	cameraHolder.srcObject = stream;
	
	var option = {
		mimeType: 'video/webm\;codecs=vp9',
		type: 'video',
		canvas: {
			width: 1280,
			height: 720
		},
		bitsPerSecond: 128000
	}
	recordRtc = new RecordRTC(stream, option);
	recordRtc.startRecording();
}

function stopCamera() {
	recordRtc.stopRecording(function (audioVideoWebMURL) {
		cameraHolder.srcObject = recordRtc.toURL();
	});
	cameraStream.getTracks().forEach(track => track.stop())
}