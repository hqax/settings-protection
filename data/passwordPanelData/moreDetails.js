var okayBtn = document.getElementById("okayButton");
var disBTn = document.getElementById("disableButton");
var uninBtn = document.getElementById("uninstallButton");
self.port.on("1st",function(text){
document.getElementById("myTextarea").value=text;
});

disBTn.addEventListener("click", function(){
	self.port.emit("disClick", "disable"); 
});

uninBtn.addEventListener("click", function(){
	self.port.emit("uninClick", "uninstall");
});



okayBtn.addEventListener("click", function(){
     
	 var checkedList=[];
	 
	 var lenTrav = listGlobal.length;
	 if(lenTrav===1)
		 self.port.emit("moreOkay", listGlobal);
	 else{
	 for(i=1;i<=lenTrav;i++){
		 var vari = i-1;
		if(document.getElementById(i).checked){
			checkedList.push(listGlobal[vari]);
		} 
	 }
     self.port.emit("moreOkay", checkedList);
	 }
	
});

var listGlobal=[];;


self.port.on("settingsNmes",function(list){
	var len = list.length;
	listGlobal = list.slice();
	var max = len +20;
	var ite = 21;
	while(ite <= max){
		document.getElementById(ite).firstChild.nodeValue = list[0] + " : ";
		ite = ite+1;
		list.splice(0,1);
	}
	
});

self.port.on("checkBoxes",function(num){
	if(num ===1){
		for(l=11;l<=20;l++){
			document.getElementById(l).style.display="none";
		}
		document.getElementById("31").style.display="none";
	}else{
		document.getElementById("31").style.display="block";
	var lenID=num;
	lenID = 11+num;
	while(lenID <= 20){
	
	document.getElementById(lenID).style.display="none";
	
	
	lenID=lenID+1;	
	}
	for(k=1;k<=num;k++){
		document.getElementById(k+10).style.display = "block";
		document.getElementById(k).checked = true;
	}
	}
});

self.port.on("source",function(text1,text2){
	if(text1==="none"){
		document.getElementById("source").style.display="none";
	}else{
		document.getElementById("source").style.display="block";
		document.getElementById("addonName").firstChild.nodeValue = text2;
	}
	
});


