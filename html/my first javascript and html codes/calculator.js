function inputNo1(elem) {
	document.getElementById("lbl1").innerText = "0" + document.getElementById(elem.id).innerText;
	result();
}
function inputNo2(elem) {
	document.getElementById("lbl2").innerText = "0" + document.getElementById(elem.id).innerText;
	result();
}
function inputNo3(elem) {
	document.getElementById("lbl3").innerText = document.getElementById(elem.id).innerText;
	result();
}
function result(){
	let num1 = parseInt(document.getElementById("lbl1").innerText);
	let num2 = parseInt(document.getElementById("lbl2").innerText);
	let result1 = eval(num1 + document.getElementById("lbl3").innerText + num2);

	if(document.getElementById("lbl3").innerText != "--"){
		if(document.getElementById("lbl3").innerText == "/"){
			document.getElementById("lbl4").innerText = result1.toFixed(2);
		}
		else{
			document.getElementById("lbl4").innerText = result1;
		}
	}
}