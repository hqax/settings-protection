var okayBtn = document.getElementById("okayButton");
var cancelBtn = document.getElementById("cancelButton");
var forgotBtn = document.getElementById("forgotButton");
var moreDetBtn = document.getElementById("moreDetailsButton");
okayBtn.addEventListener("click", function(){
     var password = document.getElementById("password1").value;
	 document.getElementById("password1").value = null;
     self.port.emit("okyClicked", password);
	 password = "";
	
});
moreDetBtn.addEventListener("click", function(){
	self.port.emit("moreDetClicked","more");
});

cancelBtn.addEventListener("click", function(){
	document.getElementById("password1").value = null;
     self.port.emit("canclClicked", "cancel");
});

forgotBtn.addEventListener("click", function(){
	self.port.emit("forgotClicked","forgot");
});

self.port.on("list",function(text){
	
	document.getElementById("list").firstChild.nodeValue = text;
});



self.port.on("incorrect1",function(text){
	if(text==="yes")
	document.getElementById("incorrect").style.display="block";
	else
		document.getElementById("incorrect").style.display="none";
});

self.port.on("show", function onShow() {
  okayBtn.focus();
});