var cameraHolder = document.getElementById("cameraHolder");
var lightInd = document.getElementById("lightInd");
var playstop = document.getElementById("stopstartBtn");
var resolutionsel = document.getElementById("resolution");
var resolutionqual = document.getElementById("resolutionQual");
var saveBtn = document.getElementById("saveBtn");
var camtimer = document.getElementById("camtimer");

var camStream;
var recordRtc;
saveBtn.style.visibility='hidden';

var select = document.getElementById("webcam");
select.options.length = 0;

// start stop onclick handler
function startstopBtn(elem) {
	
	if(playstop.innerHTML == "Start"){
		startrecording();
	}
	if(playstop.innerHTML == "Stop"){
		stoprecording();
		playstop.innerHTML = "Start";
	}
}

var indexNo = 0;
var videocam = [];

navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(errorcatch);
function gotDevices(deviceInfos) {

  for (var i = 0; i !== deviceInfos.length; ++i) {
	  
		var deviceInfo = deviceInfos[i];
		/*var option = document.createElement('option');
		option.value = deviceInfo.deviceId;*/
		
		
		if (deviceInfo.kind === 'audioinput') {
		  /*option.text = deviceInfo.label ||
			'Microphone ' + (audioInputSelect.length + 1);
		  audioInputSelect.appendChild(option);*/
		} 
		else if (deviceInfo.kind === 'audiooutput') {
		  /*option.text = deviceInfo.label || 'Speaker ' +
			(audioOutputSelect.length + 1);
		  audioOutputSelect.appendChild(option);*/
		} 
		else if (deviceInfo.kind === 'videoinput') {
		  /*option.text = deviceInfo.label || 'Camera ' +
			(videoSelect.length + 1);
		  videoSelect.appendChild(option);*/
		  //alert(deviceInfo.deviceId);
		  videocam[indexNo] = deviceInfo.deviceId;
		  indexNo++;
		  select.options[select.options.length] = new Option(indexNo, deviceInfo.deviceId);
		}
	}
	indexNo = 0;
}

function startrecording() {
	var webDevices = [];
	var adindex = 0;
	
	
	navigator.mediaDevices.getUserMedia({
		video: 
		{
			width: {exact: parseInt(options[String(resolutionsel.value)].width)}, 
			height: {exact: parseInt(options[String(resolutionsel.value)].height)},
			deviceId: { exact: String(select.value) }
		}, 
		audio:true
	}).then(cameraPlayer).catch(errorcatch);
}

function errorcatch(error) {
	
	if(String(error) == "NotAllowedError: Permission denied") {
		
	}
	if(String(error) == "[object OverconstrainedError]") {
		alert("Resolution that you are selected are not supported");
	}
}

function cameraPlayer(stream){
	saveBtn.style.visibility='hidden';
	setRecording(stream);
	camStream = stream;
	lightInd.className = "lightIndstart";
	playstop.innerHTML = "Stop";
	resolutionsel.disabled=true;
	resolutionqual.disabled=true;
	select.disabled=true;
	camTimer1();
	cameraHolder.controls = false;
}
var timer;
function camTimer1() {
	var sec = 0;
	var min = 0;
	var hrs = 0;
	var scc = "00";
	var mcn = "00";
	var hrc = "00";
	timer = setInterval(function(){
		sec++;
		if(sec < 60) {
			if(sec < 10) {
				scc = "0" + sec;
			}
			else {
				scc = sec;
			}
		}
		else {
			sec = 0;
			scc = "00";
			min++;
			if(min < 60) {
				if(min < 10) {
					mcn = "0" + min;
				}
				else {
					mcn = min;
				}
			}
			else {
				mcn = "00";
				min = 0;
				hrs++;
				if(hrs < 10) {
					hrc = "0" + hrs;
				}
				else {
					hrc = hrs;
				}
			}
		}
		
		camtimer.innerHTML = hrc + ":" + mcn + ":" + scc;
	}, 1000);
}

function setRecording(stream) {
	cameraHolder.srcObject = stream;
	
	var option = {
		mimeType: 'video/webm\;codecs=vp9',
		bitsPerSecond: parseInt(options[String(resolutionsel.value)].bps[String(resolutionqual.value)]),
		type: 'video',
		frameRate: 24,
		video: {
			mandatory: {
				minWidth: parseInt(options[String(resolutionsel.value)].width) - 10,
				minHeight: parseInt(options[String(resolutionsel.value)].height) - 10,

				minWidth: parseInt(options[String(resolutionsel.value)].width),
				minHeight: parseInt(options[String(resolutionsel.value)].height),
				minAspectRatio: 1.77
			}
		}		
	}
	
	recordRtc = RecordRTC(stream, option);
	recordRtc.startRecording();
}

function stoprecording() {
	cameraHolder.srcObject = null;
	camStream.getTracks().forEach(track => track.stop());
	
	recordRtc.stopRecording(function (audioVideoWebMURL) {
		saveBtn.style.visibility='visible';
		resolutionsel.disabled=false;
		resolutionqual.disabled=false;
		select.disabled=false;
		let blob = recordRtc.getBlob();
		cameraHolder.src = window.URL.createObjectURL(blob);
		clearInterval(timer);
		cameraHolder.controls = true;
	});
	
	lightInd.className = "lightIndstop";
}

function saveRecord(elem) {
	recordRtc.save("C:\Users\Intern\Desktop\videoabc\ddd.mp4");
}