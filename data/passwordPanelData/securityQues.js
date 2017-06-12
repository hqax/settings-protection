var okayBtn = document.getElementById("okayButton");
okayBtn.addEventListener("click", function(){
	
	var q1 =document.getElementById("question1");
	
	var q2=document.getElementById("question2");
		
	var answer1=document.getElementById("answer1").value;
	document.getElementById("answer1").value="";	
	var answer2=document.getElementById("answer2").value;
	document.getElementById("answer2").value="";	
	var question1 = q1.options[q1.selectedIndex].value;
		q1.selectedIndex=0;
	var question2 = q2.options[q2.selectedIndex].value;
	q2.selectedIndex=0;
	self.port.emit("okayClicked", question1,question2,answer1,answer2);
});

self.port.on("show", function onShow(text) {
	if(text)
		document.getElementById("answer").style.display="block";
	else
		document.getElementById("answer").style.display="none";
  okayBtn.focus();
});

question2