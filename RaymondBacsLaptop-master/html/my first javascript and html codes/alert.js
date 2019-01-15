"use strict"
alert('Hello, world!');
let confirmResult = confirm("Are you the boss?");
alert(confirmResult);
let promptResult = prompt("Raymond");
if(promptResult == "Raymond"){alert(promptResult);}
else{alert("you are not the boss");}
let ternaryResult = (prompt("Put your age:") > 18) ? true : false;
alert(ternaryResult);

