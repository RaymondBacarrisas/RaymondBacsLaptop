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