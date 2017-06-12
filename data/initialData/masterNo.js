var yesBtn = document.getElementById("yesButton");
var noBtn = document.getElementById("noButton");
yesBtn.addEventListener("click", function(){
     
     
     self.port.emit("Clicked", "yes");
	
});

noBtn.addEventListener("click", function(){
     
     
     self.port.emit("Clicked", "no");
    
});

self.port.on("show", function onShow() {
  yesButton.focus();
});