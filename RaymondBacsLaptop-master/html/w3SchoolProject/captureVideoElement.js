function captureScreen(cb) {
    getScreenId(function (error, sourceId, screen_constraints) {
        navigator.mediaDevices.getUserMedia(screen_constraints).then(cb).catch(function(error) {
          console.error('getScreenId error', error);
          alert('Failed to capture your screen. Please check Chrome console logs for further information.');
        });
    });
}
function captureCamera(cb) {
    navigator.mediaDevices.getUserMedia({audio: true, video: true}).then(cb);
}
function keepStreamActive(stream) {
    var video = document.createElement('video');
    video.muted = true;
    video.srcObject = stream;
    video.style.display = 'none';
    (document.body || document.documentElement).appendChild(video);
}
captureScreen(function(screen) {
    keepStreamActive(screen);
    captureCamera(function(camera) {
        keepStreamActive(camera);
        screen.width = window.screen.width;
        screen.height = window.screen.height;
        screen.fullcanvas = true;
        
        camera.width = 320;
        camera.height = 240;
        camera.top = screen.height - camera.height;
        camera.left = screen.width - camera.width;
        
        var recorder = RecordRTC([screen, camera], {
            type: 'video',
            mimeType: 'video/webm',
            previewStream: function(s) {
                document.querySelector('video').muted = true;
                document.querySelector('video').srcObject = s;
            }
        });
        recorder.startRecording();
        setTimeout(function() {
            recorder.stopRecording(function() {
                var blob = recorder.getBlob();
                document.querySelector('video').srcObject = null;
                document.querySelector('video').src = URL.createObjectURL(blob);
                document.querySelector('video').muted = false;
                [screen, camera].forEach(function(stream) {
                    stream.getTracks().forEach(function(track) {
                        track.stop();
                    });
                })
            });
        }, 5 * 1000);
    });