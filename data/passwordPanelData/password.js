var okayBtn = document.getElementById("okayButton");
var cancelBtn = document.getElementById("cancelButton");
okayBtn.addEventListener("click", function(){
	 var passwordInput = document.getElementById("password1");
    var password1 = passwordInput.value;
	var passwordInput2 = document.getElementById("password2");
    var password2 = passwordInput2.value;
	passwordInput.value = null;
    passwordInput2.value = null;
	self.port.emit("okayClicked", password1,password2);
	
});
cancelBtn.addEventListener("click", function(){
	document.getElementById("password1").value=null;
	document.getElementById("password2").value=null;
	self.port.emit("cancelClicked","cancel");
});

self.port.on("show", function onShow(notSameAnswer) {
	if(notSameAnswer)
		document.getElementById("answer").style.display="block";
	else
		document.getElementById("answer").style.display="none";
  okayBtn.focus();
});