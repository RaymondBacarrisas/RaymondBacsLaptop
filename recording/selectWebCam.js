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