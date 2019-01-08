var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);
function addItem() {
	var li = document.createElement("li");
	var inputValue = document.getElementById("theInput").value;
	var t = document.createTextNode(inputValue);
	li.appendChild(t);
	if(inputValue === '') {
		alert("You must write Something!");
	}
	else {  
		document.getElementById("myUl").appendChild(li);
	}
	document.getElementById("theInput").value = "";
}