
var okayBtn = document.getElementById("okayButton");
var cancelBtn = document.getElementById("cancelButton");

var moreDetBtn = document.getElementById("moreDetailsButton");

okayBtn.addEventListener("click", function(){
	self.port.emit("masterSave","save");
});

moreDetBtn.addEventListener("click", function(){
	self.port.emit("masterMore","more");
});

cancelBtn.addEventListener("click", function(){
	
     self.port.emit("masterCancel", "cancel");
});




self.port.on("list",function(text){
	
	document.getElementById("list").firstChild.nodeValue = text;
});