function objectResult1(elem) {
     let user = {
          name: "Raymond",
          sizes: {
               height: 182,
               width: 90
          },
          "age": 20
     }
     document.getElementById("output1").innerText = "Name: " + user.name + "\nheight: " + user.sizes.height + "\nwidth: " + user.sizes.width + "\nAge: " + user["age"];
     delete user.sizes.width;
     delete user["age"];
     document.getElementById("output2").innerText = "Name: " + user.name + "\nheight: " + user.sizes.height + "\nwidth: " + user.sizes.width + "\nAge: " + user["age"];
     for(let key in user){
          document.getElementById("output2").innerText += "\n" + key;          
     }
     for(let key in user.sizes){
          document.getElementById("output2").innerText += "\n" + key;
     }
}