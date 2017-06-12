var okayBtn = document.getElementById("okayButton");
var cancelBtn = document.getElementById("cancelButton");
okayBtn.addEventListener("click", function(){
	var answer1=document.getElementById("answer1").value;
	document.getElementById("answer1").value="";
	var answer2=document.getElementById("answer2").value; 
	document.getElementById("answer2").value="";
	self.port.emit("quesClicked", answer1,answer2);
});

cancelBtn.addEventListener("click", function(){
	self.port.emit("canClicked", "cancel");
});

self.port.on("ques1",function(text){
	
	document.getElementById("question1").value = text;
	document.getElementById("question1").readOnly = true;
});

self.port.on("ques2",function(text){
	
	document.getElementById("question2").value = text;
	document.getElementById("question2").readOnly = true;
});

self.port.on("show", function onShow(text) {
	if(text)
		document.getElementById("answer").style.display="block";
	else
		document.getElementById("answer").style.display="none";
  okayBtn.focus();
});