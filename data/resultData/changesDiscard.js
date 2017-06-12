var okBtn = document.getElementById("okButton");
okBtn.addEventListener("click", function(){
     
     
     self.port.emit("okClicked");
	
});

self.port.on("show", function onShow() {
  okBtn.focus();
});