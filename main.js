
var { ActionButton } = require("sdk/ui/button/action");
var secirutyQuesNo = 0;
var comparingStarting=0;
var installingAddon = false;
var ss = require("sdk/simple-storage"); 
var tabs = require('sdk/tabs'); 
var {getActiveView} = require("sdk/view/core");
var { setTimeout,clearTimeout } = require("sdk/timers");
setTimeout(function(){comparingStarting=1;},3000);
var { PrefsTarget } = require("sdk/preferences/event-target");
var target = PrefsTarget();
const {Cc, Ci, Cu, Cr} = require("chrome");

var button = ActionButton({
    id: "my-button",
    label: "Settings Protection",
    icon: {
		"16": "./icon-16.png",
		"32": "./icon-32.png",
		"64": "./icon-64.png"
    },
    /*onClick: function(state){console.log("hai");
	var tabs = require('sdk/tabs');
	console.log(tabs.activeTab.url);
for (let tab of tabs)
  console.log(tab.url);

	}*/
	onClick: handleClick
  });
 var tabs = require('sdk/tabs');  
function handleClick(state) {
	const self = require('sdk/self');


tabs.open({
  url: 'about:addons',
  onReady: function(tab) {
    tab.attach({
      contentScriptWhen: 'end',
      contentScript: 'AddonManager.getAddonByID("' + self.id + '", function(aAddon) {\n' +
                       'unsafeWindow.gViewController.commands.cmd_showItemDetails.doCommand(aAddon, true);\n' +
                     '});\n'		
    });
  }
});



		}
		
		
const { AddonManager } = require("resource://gre/modules/AddonManager.jsm");

if(tabs.activeTab.url.toLowerCase().startsWith("about:preferences")){
	tabs.open("about:newtab");
}
		
		
function isSuccessCode(returnCode) {
    return (returnCode & 0x80000000) === 0;
}
if(ss.storage.installingAddonRestart){
	ss.storage.disablingSettingsOpening=true;
		setTimeout(function(){ss.storage.disablingSettingsOpening=false;},3000);
}
	
function advancedSettingTabChecking(){
	if(tabs.activeTab.url.toLowerCase().startsWith("about:preferences")){
		if(ss.storage.AdvancedMonitoring)
			return true;
		else
			return false;
	
	}
	else
		return false;
}

	
function settingTabChecking(){
if(tabs.activeTab.url.toLowerCase().startsWith("about:preferences")){
		
		
	  if( ss.storage.AdvancedMonitoring){
			
			return false;
	}else{
		
		  
			return true;
	  }
}else
		return false;
}
  
function addonUrlChecking(){
if(ss.storage.AddonsExempt){
if(tabs.activeTab.url.toLowerCase().startsWith("https://addons.mozilla.org/"))
	return true;
else if(tabs.activeTab.url.toLowerCase().startsWith("about:addons")){
	return true;
}else 
	return false;
}
else{
		return false;
}}


const sdk = {
		tabs: require("sdk/tabs"),
		
		core: {
			heritage: require("sdk/core/heritage")
		},
		event: {
			core:   require("sdk/event/core"),
			target: require("sdk/event/target")
		},
		model: {
			core: require("sdk/model/core")
		},
		system: {
			unload: require("sdk/system/unload")
		},
		ui: {
			id: require("sdk/ui/id")
		},
		view: {
			core: require("sdk/view/core")
		},
		window: {
			utils: require("sdk/window/utils")
		}
	};
const newTabUrlJsm = require('resource:///modules/NewTabURL.jsm').NewTabURL;
var tokendb = Cc["@mozilla.org/security/pk11tokendb;1"]
                .createInstance(Ci.nsIPK11TokenDB);
var token = tokendb.getInternalKeyToken();
ss.storage.passwordCheckingMethod;
var passwordPresentChecking = 0;



//var passwordFinishedChecking = false;
var passwordCheckingList = [];

var passwordCheckingTimes =3;
var passwordCheckingFailed = "";


//password managing stuff
var masterYesPanel = require("sdk/panel").Panel({
	width:420,
	height:310,
	
   contentURL: "./initialData/masterYes.html",
   contentScriptFile: "./initialData/masterYes.js"
});

var changesSavedPanel = require("sdk/panel").Panel({
	width:200,
	height:100,
	
   contentURL: "./resultData/changesSaved.html",
   contentScriptFile: "./resultData/changesSaved.js"
});

var changesDiscardPanel = require("sdk/panel").Panel({
	width:250,
	height:100,
	
   contentURL: "./resultData/changesDiscard.html",
   contentScriptFile: "./resultData/changesDiscard.js"
});

var passwordCheckingPanel = require("sdk/panel").Panel({
	width:470,
	height:400,
	
   contentURL: "./passwordPanelData/passwordChecking.html",
   contentScriptFile: "./passwordPanelData/passwordChecking.js"
});

var masterDisplayPanel = require("sdk/panel").Panel({
	width:530,
	height:280,
	
   contentURL: "./passwordCheckingData/masterDisplay.html",
   contentScriptFile: "./passwordCheckingData/masterDisplay.js"
});

var masterNoPanel = require("sdk/panel").Panel({
	width:420,
	height:300,
	 
   contentURL: "./initialData/masterNo.html",
   contentScriptFile: "./initialData/masterNo.js"
});

var panelPassword = require("sdk/panel").Panel({
	width:380,
	height:210,
	contentURL: "./passwordPanelData/password.html",
	contentScriptFile: "./passwordPanelData/password.js"
});

var securityQuesPanel = require("sdk/panel").Panel({
	width:450,
	height:380,
	contentURL: "./passwordPanelData/securityQues.html",
	contentScriptFile: "./passwordPanelData/securityQues.js"
});

var moreDetailsPanel = require("sdk/panel").Panel({
	width:530,
	height:390,
	contentURL: "./passwordPanelData/moreDetails.html",
	contentScriptFile: "./passwordPanelData/moreDetails.js"
});

var securityAnsPanel = require("sdk/panel").Panel({
	width:460,
	height:360,
	contentURL: "./passwordPanelData/securityAns.html",
	contentScriptFile: "./passwordPanelData/securityAns.js"
});

getActiveView(passwordCheckingPanel).setAttribute("noautohide", true);
getActiveView(panelPassword).setAttribute("noautohide", true);
getActiveView(masterYesPanel).setAttribute("noautohide", true);
getActiveView(masterNoPanel).setAttribute("noautohide", true);
getActiveView(securityQuesPanel).setAttribute("noautohide", true);
getActiveView(securityAnsPanel).setAttribute("noautohide", true);
getActiveView(moreDetailsPanel).setAttribute("noautohide", true);
getActiveView(masterDisplayPanel).setAttribute("noautohide", true);

if(ss.storage.passwordCheckingMethod !=="own" && ss.storage.passwordCheckingMethod !== "master" ){
	installingAddon = true;
	if(require("sdk/simple-prefs").prefs.recoverUninstall==="master"||require("sdk/simple-prefs").prefs.recoverUninstall=="own"){
		ss.storage.passwordCheckingMethod=require("sdk/simple-prefs").prefs.recoverUninstall;
		require("sdk/simple-prefs").prefs.recoverUninstall="";
	}else{
	setTimeout(function(){
	
	if(token.needsLogin())
	{
		masterYesPanel.show();
		
	}else{
	
	masterNoPanel.show();
	}},3000);}}
	
if(installingAddon)
		ss.storage.disablingSettingsOpening = false;
if(installingAddon)
	ss.storage.installingAddonRestart = false;

masterYesPanel.on("show", function() {
	masterYesPanel.port.emit("show");
});

masterYesPanel.port.on("Clicked",function(text){
	if(text==="yes"){
		ss.storage.passwordCheckingMethod = "master";
		secirutyQuesNo=0;
		masterYesPanel.hide();
	}
	else{
		
		masterYesPanel.hide();
		panelPassword.show();
	}
	
});

masterNoPanel.on("show", function() {
	masterNoPanel.port.emit("show");
});

masterNoPanel.port.on("Clicked",function(text){
	if(text==="yes"){
		secirutyQuesNo=0;
		masterNoPanel.hide();
		tabs.open("about:preferences#security");
		setTimeout(function(){if(token.needsLogin())
			{ss.storage.passwordCheckingMethod = "master";
		if(passwordCheckingList.length !== 0){
			//passwordChecking("sample");
			masterPasswordChecking();
		}
		}
		else masterNoPanel.show();},40000);
	}
	else{
			
			masterNoPanel.hide();
			panelPassword.show();
	}
	
});

panelPassword.on("show", function() {
	panelPassword.port.emit("show",notSameAnswer);
});

securityQuesPanel.on("show", function() {
	securityQuesPanel.port.emit("show",securityQuesAnswer);
});

securityAnsPanel.on("show", function() {
	securityAnsPanel.port.emit("show",securityAnsAnswer);
	securityAnsPanel.port.emit("ques1",ss.storage.question1);
	securityAnsPanel.port.emit("ques2",ss.storage.question2);
});

securityAnsPanel.port.on("canClicked", function(answer1){
	securityAnsPanel.hide();
	passwordCheckingPanelOpening();
});

var securityAnsAnswer = 0;
securityAnsPanel.port.on("quesClicked", function(answer1,answer2){
	securityAnsPanel.hide();
	if(answer1 === ss.storage.answer1 || answer2 === ss.storage.answer2){
		passwordCheckingList = [];
		secirutyQuesNo = 1;
		ss.storage.passwordCheckingMethod="";
		if(token.needsLogin())
	{
		masterYesPanel.show();
		
	}else{
	
	masterNoPanel.show();
	}
		
	}else{
		changesSavedPanel.show();
		changesSavedPanel.hide();
		securityAnsAnswer=1;
		securityAnsPanel.show();
		
	}
	
	
});

var securityQuesAnswer = 0;
securityQuesPanel.port.on("okayClicked", function(question1,question2,answer1,answer2){
	
	securityQuesPanel.hide();
	if(question1===0 || question2===0|| answer1 ==="" || answer2==="" || question1===question2||answer1===answer2){
		changesSavedPanel.show();
		changesSavedPanel.hide();
		securityQuesAnswer=1;
		securityQuesPanel.show();
	}else{
		securityQuesAnswer=0;
		ss.storage.passwordCheckingMethod = "own";
		ss.storage.question1 = question1;
		ss.storage.question2 = question2;
		ss.storage.answer1= answer1;
		ss.storage.answer2= answer2;
	}

});

var notSameAnswer = 0;

panelPassword.port.on("okayClicked", function(text1,text2){
	if(text1 === "" || text2 === "" || text1!=text2){
		
		panelPassword.hide();
		masterYesPanel.show();
		masterYesPanel.hide();
		notSameAnswer = 1;
		panelPassword.show();
	}
	else{
		notSameAnswer=0;
		panelPassword.hide();
		var alreadyPresent = false;
		require("sdk/passwords").search({
    onComplete: function onComplete(credentials) {
      credentials.forEach(function(credential) {
        if(credential.username==="settings_protection")
		{	
			alreadyPresent = true;
			
			require("sdk/passwords").remove({
				realm: "User Registration",
				username: "settings_protection",
				password: credential.password,
  
				onComplete: function onComplete() {
					require("sdk/passwords").store({
							realm: "User Registration",
							username: "settings_protection",
							password: texting(text1),
    })
  }
});
		}
		
        });
      
	  if(!alreadyPresent){
		
		require("sdk/passwords").store({
		realm: "User Registration",
		username: "settings_protection",
		password: texting(text1),
		});
		}
	  }
    });
		
		
		alreadyPresent=false;
		
		if(!secirutyQuesNo){
		securityQuesPanel.show();
		}else{
			ss.storage.passwordCheckingMethod = "own";
		}
		secirutyQuesNo=0;
	}
});
  
panelPassword.port.on("cancelClicked", function(text){
	if(token.needsLogin())
	{
		masterYesPanel.show();
		
	}else{
	
	masterNoPanel.show();
	}
});

var sourceAddonInformation = 0;

passwordCheckingPanel.on("show", function() {
	console.log("addon installing info"+addonJustInstalled);
	if(addonJustInstalled){
		if(!sourceAddonInformation)
			sourceAddonInformation=1;
		addonJustInstalled=0;
	}
	if(advanceMonitoringSource){
		sourceAddonInformation=0;
		advanceMonitoringSource=0;
	}
	var jointList = passwordCheckingList.join(", ");
	var someIncorrect = "no";
	if(passwordCheckingFailed)
		someIncorrect="yes";
	passwordCheckingPanel.port.emit("list",jointList);
	passwordCheckingPanel.port.emit("password1",null);
	passwordCheckingPanel.port.emit("incorrect1",someIncorrect);
	passwordCheckingPanel.port.emit("show");
});

passwordCheckingPanel.port.on("forgotClicked", function(text1){
	passwordCheckingPanel.hide();
	
	securityAnsPanel.show();
});	

passwordCheckingPanel.port.on("moreDetClicked",function(text2){
	passwordCheckingPanel.hide();
	moreDetailsPanel.show();
});

moreDetailsPanel.on("show", function() {
	var list = [];
	var listLength = passwordCheckingList.length;
	list = passwordCheckingList.slice();
	
	var text = "";
while(passwordCheckingList.length !== 0){
			if(passwordCheckingList[0]==="New_Tab_URL"){
				text=text+"Settings Name: New Tab URL" + "\n" + "Old value : " + ss.storage.oldNewTabUrl +"\n" + "New value : " + tempNewTabUrl + "\n" + "\n";
				
			}else if(passwordCheckingList[0]==="Search_Engine"){
				text=text+"Settings Name : Search Engine" + "\n" + "Old value : " + ss.storage.oldCurrentEngineName +"\n" + "New value : " + newCurrentEngineName + "\n" + "\n";
			}else if(passwordCheckingList[0]==="Home_Page_URL"){
				text=text+"Settings Name : Home Page URL" + "\n" + "Old value : " + ss.storage.oldHomePage +"\n" + "New value : " + newHomePage + "\n"+ "\n";
			}
			else if(passwordCheckingList[0]==="Checking_default_browser"){
				text=text+"Settings Name : Default Browser Checking" + "\n" + "Old value : " + ss.storage.oldCheckingDefaultBrowser +"\n" + "New value : " + newCheckingDefaultBrowser + "\n"+ "\n";
			}
			else if(passwordCheckingList[0] === "Start_Up_Page"){
				text=text+"Settings Name : Start up page" + "\n" + "Old value : " + ss.storage.oldStartUpPage +"\n" + "New value : " + newStartUpPage + "\n"+ "\n";
			}else if(passwordCheckingList[0] ==="Download_Dir"){
				text=text+"Settings Name : Download Directory" + "\n" + "Old value : " + ss.storage.oldDownloadDir +"\n" + "New value : " + newDownloadDir + "\n"+ "\n";
			}else if(passwordCheckingList[0] ==="Search_Suggestions_LocalBar"){
				text=text+"Settings Name : Search Suggestions Localbar" + "\n" + "Old value : " + ss.storage.oldSearchSuggestionsLocalBar +"\n" + "New value : " + newSearchSuggestionsLocalBar + "\n"+ "\n";
			}
			else if(passwordCheckingList[0] ==="Open_New_tab"){
				text=text+"Settings Name : Open New tab" + "\n" + "Old value : " + ss.storage.oldOpenNewtab +"\n" + "New value : " + newOpenNewtab + "\n"+ "\n";
			}else if(passwordCheckingList[0] ==="Search_From_Windows"){
				text=text+"Settings Name : Search from Windows" + "\n" + "Old value : " + ss.storage.oldSearchFromWindows +"\n" + "New value : " + newSearchFromWindows + "\n"+ "\n";
			}else if(passwordCheckingList[0] ==="Provide_Search_Suggestions"){
				text=text+"Settings Name : Provide Search Suggestions" + "\n" + "Old value : " + ss.storage.oldProvideSearchSuggestions +"\n" + "New value : " + newProvideSearchSuggestions + "\n"+ "\n";
			}else if(passwordCheckingList[0] ==="Pop_Up_Block"){
				text=text+"Settings Name : Pop up Block" + "\n" + "Old value : " + ss.storage.oldBlockPopUp +"\n" + "New value : " + newBlockPopUp + "\n"+ "\n";
			}else if(passwordCheckingList[0] ==="Play_DRM_Content"){
				text=text+"Settings Name : Play DRM Content" + "\n" + "Old value : " + ss.storage.oldPlayDRMContent +"\n" + "New value : " + newPlayDRMContent + "\n"+ "\n";
			}else if(passwordCheckingList[0] ==="Tracking_Protection_Private"){
				text=text+"Settings Name : Tracking Protection Private" + "\n" + "Old value : " + ss.storage.oldTrackingProtectionPrivate +"\n" + "New value : " + newTrackingProtectionPrivate + "\n"+ "\n";
			}else if(passwordCheckingList[0] ==="Suggest_History"){
				text=text+"Settings Name : Suggest History" + "\n" + "Old value : " + ss.storage.oldSuggestHistory +"\n" + "New value : " + newSuggestHistory + "\n"+ "\n";
			}else if(passwordCheckingList[0] ==="Warn_Add_OnInstall"){
				text=text+"Settings Name : Warn before addon install" + "\n" + "Old value : " + ss.storage.oldwarnAddOnInstall +"\n" + "New value : " + newwarnAddOnInstall + "\n"+ "\n";
			}else if(passwordCheckingList[0] ==="Suggest_Opentabs"){
				text=text+"Settings Name : Suggest Openatbs" + "\n" + "Old value : " + ss.storage.oldSuggestOPentabs +"\n" + "New value : " + newSuggestOPentabs + "\n"+ "\n";
			}else if(passwordCheckingList[0] ==="Suggest_Bookmark"){
				text=text+"Settings Name : Suggest Bookmarks" + "\n" + "Old value : " + ss.storage.oldSuggestBookmark +"\n" + "New value : " + newSuggestBookmark + "\n"+ "\n";
			}else if(passwordCheckingList[0] ==="Block_Reported_Sites"){
				text=text+"Settings Name : Block Reported Sites" + "\n" + "Old value : " + ss.storage.oldBlockReportedSites +"\n" + "New value : " + newBlockReportedSites + "\n"+ "\n";
			}else if(passwordCheckingList[0] ==="Remember_Logins"){
				text=text+"Settings Name : Remember Logins" + "\n" + "Old value : " + ss.storage.oldRememberLogins +"\n" + "New value : " + newRememberLogins + "\n"+ "\n";
			}else if(passwordCheckingList[0] ==="Warn_MeRe_direct_or_ReloadPages"){
				text=text+"Settings Name : Warn Me before re-direct ot re-load pages" + "\n" + "Old value : " + ss.storage.oldWarnMeRedirectorReloadPages +"\n" + "New value : " + newWarnMeRedirectorReloadPages + "\n"+ "\n";
			}else if(passwordCheckingList[0] ==="Search_Updates"){
				text=text+"Settings Name : Search Updates" + "\n" + "Old value : " + ss.storage.oldSearchUpdates +"\n" + "New value : " + newSearchUpdates + "\n"+ "\n";
			}else if(passwordCheckingList[0] ==="Asking_Updates_Install"){
				text=text+"Settings Name : Asking Updates Install" + "\n" + "Old value : " + ss.storage.oldUpdateDownloadButInstallAsk +"\n" + "New value : " + newUpdateDownloadButInstallAsk + "\n"+ "\n";
			}else if(passwordCheckingList[0] ==="Auto_Install_updates"){
				text=text+"Settings Name : Auto Install Updates" + "\n" + "Old value : " + ss.storage.oldAutoInstallUpdate +"\n" + "New value : " + newAutoInstallUpdate + "\n"+ "\n";
			}else if(passwordCheckingList[0] ==="Never_Install_updates"){
				text=text+"Settings Name : Never Install Updates" + "\n" + "Old value : " + ss.storage.oldNeverInsatllUpdates +"\n" + "New value : " + newNeverInsatllUpdates + "\n"+ "\n";
			}else if(passwordCheckingList[0] ==="Block_Settings_Opening"){
				text=text+"Settings Name : Block Settings opening" + "\n" + "Old value : " + ss.storage.blockSettingsPage +"\n" + "New value : " + !ss.storage.blockSettingsPage + "\n"+ "\n";
			}else if(passwordCheckingList[0] ==="Never_Change"){
				text=text+"Settings Name : Never change preferenc" + "\n" + "Old value : " + ss.storage.NeverChange +"\n" + "New value : " + !ss.storage.NeverChange + "\n"+ "\n";
			}else if(passwordCheckingList[0] ==="Home_Page_Exempt"){
				text=text+"Settings Name : Home page exempt" + "\n" + "Old value : " + ss.storage.HomePageExempt +"\n" + "New value : " + !ss.storage.HomePageExempt + "\n"+ "\n";
			}else if(passwordCheckingList[0] ==="New_Tab_Exempt"){
				text=text+"Settings Name : New tab exempt" + "\n" + "Old value : " + ss.storage.NewTabExempt +"\n" + "New value : " + !ss.storage.NewTabExempt + "\n"+ "\n";
			}else if(passwordCheckingList[0] ==="Search_Engine_Exempt"){
				text=text+"Settings Name : Search engine exempt" + "\n" + "Old value : " + ss.storage.SearchEngineExempt +"\n" + "New value : " + !ss.storage.SearchEngineExempt + "\n"+ "\n";
			}else if(passwordCheckingList[0] ==="GeneraL_Exempt"){
				text=text+"Settings Name : General settinsg Exempt" + "\n" + "Old value : " + ss.storage.GeneraLExempt +"\n" + "New value : " + !ss.storage.GeneraLExempt + "\n"+ "\n";
			}else if(passwordCheckingList[0] ==="Search_Exempt"){
				text=text+"Settings Name : Search settings Exempt" + "\n" + "Old value : " + ss.storage.SearchExempt +"\n" + "New value : " + !ss.storage.SearchExempt + "\n"+ "\n";
			}else if(passwordCheckingList[0] ==="Privacy_Exempt"){
				text=text+"Settings Name : Privacy Settings Exempt" + "\n" + "Old value : " + ss.storage.PrivacyExempt +"\n" + "New value : " + !ss.storage.PrivacyExempt + "\n"+ "\n";
			}else if(passwordCheckingList[0] ==="Content_Exempt"){
				text=text+"Settings Name : Content Settings Exempt" + "\n" + "Old value : " + ss.storage.ContentExempt +"\n" + "New value : " + !ss.storage.ContentExempt + "\n"+ "\n";
			}else if(passwordCheckingList[0] ==="Security_Exempt"){
				text=text+"Settings Name : Security Settinsg Exempt" + "\n" + "Old value : " + ss.storage.SecurityExempt +"\n" + "New value : " + !ss.storage.SecurityExempt + "\n"+ "\n";
			}else if(passwordCheckingList[0] ==="Advanced_Exempt"){
				text=text+"Settings Name : Advanced settings exempt" + "\n" + "Old value : " + ss.storage.AdvancedExempt +"\n" + "New value : " + !ss.storage.AdvancedExempt + "\n"+ "\n";
			}else if(passwordCheckingList[0] ==="Addons_Exempt"){
				text=text+"Settings Name : Addons exempt" + "\n" + "Old value : " + ss.storage.AddonsExempt +"\n" + "New value : " + !ss.storage.AddonsExempt + "\n"+ "\n";
			}else if(passwordCheckingList[0] ==="sample"){
				
			}else if(passwordCheckingList[0] ==="Authentication_Change"){
				text=text+"Settings Name : Authentication Change" + "\n" + "Old value : " + ss.storage.AuthenticationChange +"\n" + "New value : " + !ss.storage.AuthenticationChange + "\n"+ "\n";
			}else if(passwordCheckingList[0] ==="Settings_Page_Opening"){
				text=text+"Settings Name : Settinsg page opening" + "\n"+ "\n";
			}else if(passwordCheckingList[0] ==="Advanced_Monitoring"){
				text=text+"Settings Name : Advanced Settings Opening" + "\n" + "Old value : " + ss.storage.AdvancedMonitoring +"\n" + "New value : " + !ss.storage.AdvancedMonitoring + "\n"+ "\n";
			}
			
			passwordCheckingList.splice(0,1);
	}
	passwordCheckingList = list.slice();
	moreDetailsPanel.port.emit("1st",text);
	moreDetailsPanel.port.emit("checkBoxes",listLength);
	moreDetailsPanel.port.emit("settingsNmes",list);
	
	if(sourceAddonInformation){
		var addonInformationContaining;
		var lemth = installedAddonsList.length;
		addonInformationContaining = installedAddonsList[lemth-1].name;
		moreDetailsPanel.port.emit("source","yes",addonInformationContaining);
	}else
		moreDetailsPanel.port.emit("source","none","none");
});


moreDetailsPanel.port.on("moreOkay", function(text1){
	moreDetailsPanel.hide();
	passwordCheckingList = text1.slice();
	if(passwordCheckingList.length===0){
		passwordCheckingPanel.hide();
	passwordPresentChecking = 0;
	passwordCheckingTimes = 3;
	runSearchEngine=1;
	runHomePage = 1;
	sourceAddonInformation=0;
	newTabChecking=1;
	passwordCheckingList = [];
	ss.storage.advancedMonitoringList = [];
	passwordCheckingFailed ="";
	if(!dontObserve)
	changesDiscardPanel.show();
	dontObserve=0;
	}else{
	if(masterMorePage===1){
		masterMorePage=0;
		masterDisplayPanel.show();
		
	}
	else{
		masterMorePage=0;
	passwordCheckingPanel.show();
	}}});	

masterDisplayPanel.on("show", function() {
	var listDisplay = passwordCheckingList.join([separator = ", "])
	if(addonJustInstalled){
		if(!sourceAddonInformation)
			sourceAddonInformation=1;
		addonJustInstalled=0;
	}
	if(advanceMonitoringSource){
		sourceAddonInformation=0;
		advanceMonitoringSource=0;
	}
	masterDisplayPanel.port.emit("list",listDisplay)
});

var masterMorePage = 0;

masterDisplayPanel.port.on("masterMore",function(text){
	masterDisplayPanel.hide();
	masterMorePage = 1;
	moreDetailsPanel.show();
});

changesSavedPanel.on("show", function() {
	changesSavedPanel.port.emit("show");
});
	
changesDiscardPanel.on("show", function() {
	changesDiscardPanel.port.emit("show");
});

changesSavedPanel.port.on("okClicked", function(text){
	changesSavedPanel.hide();
});	
changesDiscardPanel.port.on("okClicked", function(text){
	changesDiscardPanel.hide();
});

function masterRemove(){
	if(ss.storage.passwordCheckingMethod==="master"){
		if(!token.needsLogin())
	{
		masterNoPanel.show();
		
	}
	}
	setTimeout(masterRemove,30000);
}
masterRemove();


//variables depending on installing add-ons
if(installingAddon)
	ss.storage.advancedMonitoringList = [];

		

//other addons managing
if(installingAddon){
	var installedAddonsList = [];
	ss.storage.installedAddonsList = [];
setTimeout(function(){AddonManager.getAllAddons(function(addon){
	//console.log("hello"+installedAddonsList);
	var  lengthAddon=addon.length;
	//console.log(addon.length);
	for(var i=0;i<lengthAddon;i++){
		//console.log(addon[i].name);
		installedAddonsList.push(addon[i]);
		ss.storage.installedAddonsList.push(addon[i].name);
		
}
//console.log(installedAddonsList);
});},3000);
	
	

}else{


	var installedAddonsList = [];
	
setTimeout(function(){AddonManager.getAllAddons(function(addon){
	//console.log("hello"+installedAddonsList);
	var  lengthAddon=addon.length;
	//console.log(addon.length);
	for(i=0;i<lengthAddon;i++){
		//console.log(addon[i].name);
		installedAddonsList.push(addon[i]);
		
}
//console.log(installedAddonsList);
});},3000);
}

/*setTimeout(function(){console.log("addon arrays");
console.log(installedAddonsList);
console.log(ss.storage.installedAddonsList);
},4000);*/

var Listener1 = {
	onInstallEnded: function(install,addon){
		console.log("helloL");
	//console.log(install.name);
	//console.log(addon.name);
	}
}
//AddonManager.addInstallListener(Listener1);

var addonJustInstalled=0;
var installingCount = 0;
var enablingCount =0;
var addonListener = {
    onInstalling: function(addon,needsRestart){
		if(needsRestart){
			ss.storage.installingAddonRestart = true;
		}
		
		installingCount = 1;
		addonJustInstalled=1;
		setTimeout(function(){addonJustInstalled=0},5000);
		
		setTimeout(function(){ss.storage.disablingSettingsOpening=false;},3000);
    },
	onInstalled: function(addon){
		if(installingCount){
		installedAddonsList.push(addon);
		ss.storage.installedAddonsList.push(addon.name);
		installingCount=0;
	}},
	
	onEnabling: function(addon,needsRestart){
		if(needsRestart){
			ss.storage.installingAddonRestart = true;
		}
		enablingCount=1;
		addonJustInstalled=1;
		setTimeout(function(){addonJustInstalled=0},5000);
		setTimeout(function(){ss.storage.disablingSettingsOpening=false;},3000);
    },
	onEnabled : function(addon){
		if(enablingCount){
			ss.storage.installedAddonsList.push(addon.name);
		installedAddonsList.push(addon);
		enablingCount=0;
	}}
}
 AddonManager.addAddonListener(addonListener);



moreDetailsPanel.port.on("disClick",function(text){
	
});

moreDetailsPanel.port.on("uninClick",function(text){
	
});

//function for advancemonitoringlist updating
function advancedMonitoringListUpdating(text){
	var lenAdv = ss.storage.advancedMonitoringList.length;
	var advancedChecking = 0;
	for(m=0; m<lenAdv; m++){
		if(ss.storage.advancedMonitoringList[m]===text){
			advancedChecking=1;
		}}
		if(advancedChecking===0)
			ss.storage.advancedMonitoringList.push(text);
		advancedChecking=0;
			
} 
 

//old varibales
//newtab url
if(installingAddon)
ss.storage.oldNewTabUrl = newTabUrlJsm.get();
var tempNewTabUrl="";
if(installingAddon)
ss.storage.defaultNewTabUrl	= "about:newtab";
var newTabChecking = 1;

function passwordCheckingNewtab(){
	if(comparingStarting===1)
		passwordChecking("New_Tab_URL");
	else{
		newTabChecking = 1;
		tempNewTabUrl = "";
}}
var stoppingSignal = 0;
var newNewTabUrl;
function foo() {
	
	newNewTabUrl = newTabUrlJsm.get();
	
	if(newNewTabUrl!==ss.storage.oldNewTabUrl){
		
		if(newNewTabUrl===ss.storage.defaultNewTabUrl  || addonUrlChecking() || ss.storage.NewTabExempt){
			ss.storage.oldNewTabUrl = newNewTabUrl;
		}else if(newTabChecking){
			
		tempNewTabUrl = newNewTabUrl;
		newNewTabUrl=ss.storage.oldNewTabUrl;
	    newTabUrlJsm.override(ss.storage.oldNewTabUrl);
		if(!ss.storage.NeverChange){
		passwordCheckingNewtab();
		newTabChecking = 0;}
		}
}
	if(!stoppingSignal)
    setTimeout(foo, 100);
}
foo();



function New_Tab_URL(){
	
	ss.storage.oldNewTabUrl = tempNewTabUrl;
	newTabUrlJsm.override(ss.storage.oldNewTabUrl);
	newTabChecking =1;
	tempNewTabUrl = "";
}

//searche engine
var searchEngine = sdk.core.heritage.Class({
		extends: sdk.event.target.EventTarget,
		initialize: function() {
			
			this.service = Cc["@mozilla.org/browser/search-service;1"].getService(Ci.nsIBrowserSearchService);
			this.service.init();
			
		},
		setcurrentengine: function(engine){
			engines= this.service.getVisibleEngines();
			for(var i of engines){
				if(i.name===engine)
					this.service.currentEngine=i;
			}
		},
		
		checkingEngine: function(engine){
			engines= this.service.getVisibleEngines();
			var enginePresent = 0;
			for(var i of engines){
				if(i.name===engine)
					enginePresent = 1;
				
			}
			if(enginePresent)
				return true;
			else
				return false;
		},
		
		getcurrentEngine: function() {
			
			return this.service.currentEngine;
			
		}
		
	
});

var testing = searchEngine();
if(installingAddon)
	ss.storage.oldCurrentEngineName=testing.getcurrentEngine().name;
if(installingAddon)
	ss.storage.defaultCurrentEngineName=ss.storage.oldCurrentEngineName;
var newCurrentEngineName="";
var runSearchEngine=1;
var ownSearchEngineChange = 0;
//var advancedSearchEngineChange = 0;
function passwordCheckingSearchEngine(){
	if(comparingStarting === 1)
		passwordChecking("Search_Engine");
	else{
		runSearchEngine=1;
		
	}
}

Cu.import('resource://gre/modules/Services.jsm'); 

var observers = {
    'browser-search-engine-modified': {
        aTopic: 'browser-search-engine-modified',
        observe: function (aSubject, aTopic, aData) {
            if (aData == 'engine-current') {
				
				var advancedChecking = advancedSettingTabChecking();
				var checking = settingTabChecking();
				if(ss.storage.disablingSettingsOpening)
					checking = false;
				if(checking || addonUrlChecking()||ss.storage.SearchEngineExempt){
					newCurrentEngineName=testing.getcurrentEngine().name;
					ss.storage.oldCurrentEngineName=newCurrentEngineName;
					if(newCurrentEngineName==="Google"||newCurrentEngineName==="Yahoo"||newCurrentEngineName==="Bing"||newCurrentEngineName==="Twitter"||newCurrentEngineName==="DuckDuckGo"||newCurrentEngineName==="Amazon.com"||newCurrentEngineName==="Wikipedia (en)")
						ss.storage.defaultCurrentEngineName=newCurrentEngineName;
					newCurrentEngineName="";
				}
				else if(ownSearchEngineChange===1){
					ownSearchEngineChange=0;
					
				}
				else if(ss.storage.defaultCurrentEngineName===testing.getcurrentEngine().name){
					newCurrentEngineName=testing.getcurrentEngine().name;
					ss.storage.oldCurrentEngineName=newCurrentEngineName;
					newCurrentEngineName="";
				}
					
				else{
					if(advancedChecking){
						newCurrentEngineName=testing.getcurrentEngine().name;
						advancedMonitoringListUpdating("Search_Engine");
				}else{									
					if(runSearchEngine===1){
						
						newCurrentEngineName=testing.getcurrentEngine().name;
					
					ownSearchEngineChange=1;
					testing.setcurrentengine(ss.storage.oldCurrentEngineName);
					if(!ss.storage.NeverChange){
					passwordCheckingSearchEngine();runSearchEngine=0;
					}
					else{
						runSearchEngine=1;
					}
				}
				
            }}}
        },
        reg: function () {
            Services.obs.addObserver(observers[this.aTopic], this.aTopic, false);
        },
		unreg: function () {
            Services.obs.removeObserver(observers[this.aTopic], this.aTopic);
        }
    }
};
for (var o in observers) {
    observers[o].reg();
}

function Search_Engine(){
		ownSearchEngineChange=1;
		testing.setcurrentengine(newCurrentEngineName);
		ss.storage.oldCurrentEngineName = newCurrentEngineName;
		
		newCurrentEngineName = "";
	
	runSearchEngine = 1;

}

//home page
if(installingAddon)
	ss.storage.oldHomePage= require("sdk/preferences/service").get("browser.startup.homepage");
if(installingAddon)
	ss.storage.defaultHomePage= ss.storage.oldHomePage;

var runHomePage= 1;
var ownHomePageChange = 0;
var newHomePage = "";

function passwordCheckingHomePageUrl(){
	if(comparingStarting === 1)
		passwordChecking("Home_Page_URL");
	else{
		runHomePage = 1;
	}
}

target.on("browser.startup.homepage", function(prefName) {
	var checking = settingTabChecking();
	if(ss.storage.disablingSettingsOpening)
					checking = false;
	if(checking ||addonUrlChecking()||ss.storage.HomePageExempt){
		newHomePage= require("sdk/preferences/service").get("browser.startup.homepage");
		ss.storage.oldHomePage=newHomePage;
		//ss.storage.defaultHomePage= ss.storage.oldHomePage;
		newHomePage = "";
	}
	else if(ownHomePageChange===1){
		ownHomePageChange = 0;
	}
	else if(ss.storage.defaultHomePage===require("sdk/preferences/service").get("browser.startup.homepage") || require("sdk/preferences/service").get("browser.startup.homepage")==="about:home" || require("sdk/preferences/service").get("browser.startup.homepage")==="about:blank"){
		newHomePage= require("sdk/preferences/service").get("browser.startup.homepage");
		ss.storage.oldHomePage=newHomePage;
		newHomePage = "";
	}
	else{
		if(advancedSettingTabChecking()){
						newHomePage= require("sdk/preferences/service").get("browser.startup.homepage");
						advancedMonitoringListUpdating("Home_Page_URL");
						
				}else{		
		newHomePage= require("sdk/preferences/service").get("browser.startup.homepage");
		if(runHomePage){
		
		ownHomePageChange=1;
		require("sdk/preferences/service").set("browser.startup.homepage",ss.storage.oldHomePage);
		if(!ss.storage.NeverChange){
		passwordCheckingHomePageUrl();runHomePage=0;}
		}
	}}
});

function Home_Page_URL(){
	runHomePage = 1;
	ownHomePageChange=1;
	require("sdk/preferences/service").set("browser.startup.homepage",newHomePage);
	ss.storage.oldHomePage = newHomePage;
	newHomePage = "";
	
}


//checking default browser

if(installingAddon)
	ss.storage.oldCheckingDefaultBrowser  = require("sdk/preferences/service").get("browser.shell.checkDefaultBrowser");
var oldCheckingDefaultBrowser = 0;
var newCheckingDefaultBrowser;
var ownChangeDefaultChecking=0;
function passwordCheckingDefaultBrowser(){
	if(comparingStarting ===1)
		passwordChecking("Checking_default_browser");

}

target.on("browser.shell.checkDefaultBrowser", function(prefName) {    
	if(settingTabChecking()||ss.storage.GeneraLExempt  ||addonUrlChecking()){
		newCheckingDefaultBrowser = require("sdk/preferences/service").get(prefName);
		ss.storage.oldCheckingDefaultBrowser=newCheckingDefaultBrowser;
	}else if(ownChangeDefaultChecking){
		ownChangeDefaultChecking=0;
	}
	else{
		if(advancedSettingTabChecking()){
						newCheckingDefaultBrowser = require("sdk/preferences/service").get(prefName);
						advancedMonitoringListUpdating("Checking_default_browser");
						
				}else{	
		newCheckingDefaultBrowser = require("sdk/preferences/service").get(prefName);
		ownChangeDefaultChecking=1;
		require("sdk/preferences/service").set("browser.shell.checkDefaultBrowser",ss.storage.oldCheckingDefaultBrowser);	
		if(!ss.storage.NeverChange)
		passwordCheckingDefaultBrowser();
	}}
	
});

function Checking_default_browser(){
	ownChangeDefaultChecking=1;
	require("sdk/preferences/service").set("browser.shell.checkDefaultBrowser",newCheckingDefaultBrowser);	
	ss.storage.oldCheckingDefaultBrowser=newCheckingDefaultBrowser;
	
}

//start up page
if(installingAddon)
	ss.storage.oldStartUpPage  = require("sdk/preferences/service").get("browser.startup.page");
var ownStartUpPage = 0;
var newStartUpPage;
function passwordCheckingStartUpPage(){
	if(comparingStarting ===1)
		passwordChecking("Start_Up_Page");

}

target.on("browser.startup.page", function(prefName) {    
	if(settingTabChecking() ||ss.storage.GeneraLExempt ||addonUrlChecking()){
		newStartUpPage = require("sdk/preferences/service").get(prefName);
		ss.storage.oldStartUpPage=newStartUpPage;
	}else if(ownStartUpPage){
		ownStartUpPage=0;
	}
	else{
		if(advancedSettingTabChecking()){
						newStartUpPage = require("sdk/preferences/service").get(prefName);
						advancedMonitoringListUpdating("Start_Up_Page");
						
				}else{	
		newStartUpPage = require("sdk/preferences/service").get(prefName);
		ownStartUpPage=1;
		require("sdk/preferences/service").set("browser.startup.page",ss.storage.oldStartUpPage);	
		if(!ss.storage.NeverChange)
		passwordCheckingStartUpPage();
	}}
	
});

function Start_Up_Page(){
	ownStartUpPage=1;
	require("sdk/preferences/service").set("browser.startup.page",newStartUpPage);	
	ss.storage.oldStartUpPage=newStartUpPage;
	
}

//download directory
if(installingAddon)
	ss.storage.oldDownloadDir  = require("sdk/preferences/service").get("browser.download.useDownloadDir");
var ownDownloadDir = 0;
var newDownloadDir;
function passwordCheckingDownloadDir(){
	if(comparingStarting ===1)
		passwordChecking("Download_Dir");

}

target.on("browser.download.useDownloadDir", function(prefName) {    
	if(settingTabChecking() ||ss.storage.GeneraLExempt||addonUrlChecking()){
		newDownloadDir = require("sdk/preferences/service").get(prefName);
		ss.storage.oldDownloadDir=newDownloadDir;
		
	}else if(ownDownloadDir){
		ownDownloadDir=0;
	}
	else if(require("sdk/preferences/service").get(prefName)==="true"){
		newDownloadDir = require("sdk/preferences/service").get(prefName);
		ss.storage.oldDownloadDir=newDownloadDir;
	}
	
	else{if(advancedSettingTabChecking()){
						newDownloadDir = require("sdk/preferences/service").get(prefName);
						advancedMonitoringListUpdating("Download_Dir");
						
				}else{
		
		newDownloadDir = require("sdk/preferences/service").get(prefName);
		ownDownloadDir=1;
		require("sdk/preferences/service").set("browser.download.useDownloadDir",ss.storage.oldDownloadDir);	
		if(!ss.storage.NeverChange)
		passwordCheckingDownloadDir();
	}
	
}});

function Download_Dir(){
	ownDownloadDir=1;
	require("sdk/preferences/service").set("browser.download.useDownloadDir",newDownloadDir);	
	ss.storage.oldDownloadDir=newDownloadDir;
	
}


//old new tab

if(installingAddon)
	ss.storage.oldOpenNewtab  = require("sdk/preferences/service").get("browser.link.open_newwindow");
var ownOpenNewtab = 0;
var newOpenNewtab;
function passwordCheckingOpenNewtab(){
	if(comparingStarting ===1)
		passwordChecking("Open_New_tab");

}

target.on("browser.link.open_newwindow", function(prefName) {    
	if(settingTabChecking()||ss.storage.GeneraLExempt ||addonUrlChecking()){
		newOpenNewtab = require("sdk/preferences/service").get(prefName);
		ss.storage.oldOpenNewtab=newOpenNewtab;
	}else if(ownOpenNewtab){
		ownOpenNewtab=0;
	}
	else{if(advancedSettingTabChecking()){
						newOpenNewtab = require("sdk/preferences/service").get(prefName);
						advancedMonitoringListUpdating("Open_New_tab");
						
				}else{
		newOpenNewtab = require("sdk/preferences/service").get(prefName);
		ownOpenNewtab=1;
		require("sdk/preferences/service").set("browser.link.open_newwindow",ss.storage.oldOpenNewtab);	
		if(!ss.storage.NeverChange)
		passwordCheckingOpenNewtab();
	}
	
}});

function Open_New_tab(){
	ownOpenNewtab=1;
	require("sdk/preferences/service").set("browser.link.open_newwindow",newOpenNewtab);	
	ss.storage.oldOpenNewtab=newOpenNewtab;
	
}

//redirect windows search

if(installingAddon)
	ss.storage.oldSearchFromWindows  = require("sdk/preferences/service").get("browser.search.redirectWindowsSearch");
var ownSearchFromWindows = 0;
var newSearchFromWindows;
function passwordCheckingSearchFromWindows(){
	if(comparingStarting ===1)
		passwordChecking("Search_From_Windows");

}

target.on("browser.search.redirectWindowsSearch", function(prefName) {    
	if(settingTabChecking() ||ss.storage.SearchExempt||addonUrlChecking()){
		newSearchFromWindows = require("sdk/preferences/service").get(prefName);
		ss.storage.oldSearchFromWindows=newSearchFromWindows;
	}else if(ownSearchFromWindows){
		ownSearchFromWindows=0;
	}
	else{if(advancedSettingTabChecking()){
						newSearchFromWindows = require("sdk/preferences/service").get(prefName);
						advancedMonitoringListUpdating("Search_From_Windows");
						
				}else{
		newSearchFromWindows = require("sdk/preferences/service").get(prefName);
		ownSearchFromWindows=1;
		require("sdk/preferences/service").set("browser.search.redirectWindowsSearch",ss.storage.oldSearchFromWindows);	
		if(!ss.storage.NeverChange)
		passwordCheckingSearchFromWindows();
	}
	
}});

function Search_From_Windows(){
	ownSearchFromWindows=1;
	require("sdk/preferences/service").set("browser.search.redirectWindowsSearch",newSearchFromWindows);	
	ss.storage.oldSearchFromWindows=newSearchFromWindows;
	
}

//search suggestions local bar


if(installingAddon)
	ss.storage.oldSearchSuggestionsLocalBar  = require("sdk/preferences/service").get("browser.urlbar.suggest.searches");
var ownSearchSuggestionsLocalBar = 0;
var newSearchSuggestionsLocalBar;
function passwordCheckingSearchSuggestionsLocalBar(){
	if(comparingStarting ===1)
		passwordChecking("Search_Suggestions_LocalBar");

}

target.on("browser.urlbar.suggest.searches", function(prefName) {    
	if(settingTabChecking() ||ss.storage.SearchExempt ||addonUrlChecking()){
		newSearchSuggestionsLocalBar = require("sdk/preferences/service").get(prefName);
		ss.storage.oldSearchSuggestionsLocalBar=newSearchSuggestionsLocalBar;
	}else if(ownSearchSuggestionsLocalBar){
		ownSearchSuggestionsLocalBar=0;
	}
	else{if(advancedSettingTabChecking()){
						newSearchSuggestionsLocalBar = require("sdk/preferences/service").get(prefName);
						advancedMonitoringListUpdating("Search_Suggestions_LocalBar");
						
				}else{
		newSearchSuggestionsLocalBar = require("sdk/preferences/service").get(prefName);
		ownSearchSuggestionsLocalBar=1;
		require("sdk/preferences/service").set("browser.urlbar.suggest.searches",ss.storage.oldSearchSuggestionsLocalBar);	
		if(!ss.storage.NeverChange)
		passwordCheckingSearchSuggestionsLocalBar();
	}
	
}});

function Search_Suggestions_LocalBar(){
	ownSearchSuggestionsLocalBar=1;
	require("sdk/preferences/service").set("browser.urlbar.suggest.searches",newSearchSuggestionsLocalBar);	
	ss.storage.oldSearchSuggestionsLocalBar=newSearchSuggestionsLocalBar;
	
}

//provide search suggestions

if(installingAddon)
	ss.storage.oldProvideSearchSuggestions  = require("sdk/preferences/service").get("browser.search.suggest.enabled");
var ownProvideSearchSuggestions = 0;
var newProvideSearchSuggestions;
function passwordCheckingProvideSearchSuggestions(){
	if(comparingStarting ===1)
		passwordChecking("Provide_Search_Suggestions");

}

target.on("browser.search.suggest.enabled", function(prefName) {    
	if(settingTabChecking() ||ss.storage.SearchExempt||addonUrlChecking()){
		newProvideSearchSuggestions = require("sdk/preferences/service").get(prefName);
		ss.storage.oldProvideSearchSuggestions=newProvideSearchSuggestions;
	}else if(ownProvideSearchSuggestions){
		ownProvideSearchSuggestions=0;
	}
	else{if(advancedSettingTabChecking()){
						newProvideSearchSuggestions = require("sdk/preferences/service").get(prefName);
						advancedMonitoringListUpdating("Provide_Search_Suggestions");
						
				}else{
		newProvideSearchSuggestions = require("sdk/preferences/service").get(prefName);
		ownProvideSearchSuggestions=1;
		require("sdk/preferences/service").set("browser.search.suggest.enabled",ss.storage.oldProvideSearchSuggestions);	
		if(!ss.storage.NeverChange)
		passwordCheckingProvideSearchSuggestions();
	}
	
}});

function Provide_Search_Suggestions(){
	ownProvideSearchSuggestions=1;
	require("sdk/preferences/service").set("browser.search.suggest.enabled",newProvideSearchSuggestions);	
	ss.storage.oldProvideSearchSuggestions=newProvideSearchSuggestions;
	
}

//pop up blocking

if(installingAddon)
	ss.storage.oldBlockPopUp  = require("sdk/preferences/service").get("dom.disable_open_during_load");
var ownBlockPopUp = 0;
var newBlockPopUp;
function passwordCheckingBlockPopUp(){
	if(comparingStarting ===1)
		passwordChecking("Pop_Up_Block");

}

target.on("dom.disable_open_during_load", function(prefName) {    
	if(settingTabChecking() ||ss.storage.ContentExempt||addonUrlChecking()){
		newBlockPopUp = require("sdk/preferences/service").get(prefName);
		ss.storage.oldBlockPopUp=newBlockPopUp;
	}else if(ownBlockPopUp){
		ownBlockPopUp=0;
	}
	else if(require("sdk/preferences/service").get(prefName)==="true"){
		newBlockPopUp = require("sdk/preferences/service").get(prefName);
		ss.storage.oldBlockPopUp=newBlockPopUp;
	}
	else if(ownBlockPopUp){
		ownBlockPopUp=0;
	}
	else{if(advancedSettingTabChecking()){
						newBlockPopUp = require("sdk/preferences/service").get(prefName);
						advancedMonitoringListUpdating("Pop_Up_Block");
						
				}else{
		newBlockPopUp = require("sdk/preferences/service").get(prefName);
		ownBlockPopUp=1;
		require("sdk/preferences/service").set("dom.disable_open_during_load",ss.storage.oldBlockPopUp);	
		if(!ss.storage.NeverChange)
		passwordCheckingBlockPopUp();
	}
	
}});

function Pop_Up_Block(){
	ownBlockPopUp=1;
	require("sdk/preferences/service").set("dom.disable_open_during_load",newBlockPopUp);	
	ss.storage.oldBlockPopUp=newBlockPopUp;
	
}

//play DOR content
if(installingAddon)
	ss.storage.oldPlayDRMContent  = require("sdk/preferences/service").get("media.eme.enabled");
var ownPlayDRMContent = 0;
var newPlayDRMContent;
function passwordCheckingPlayDRMContent(){
	if(comparingStarting ===1)
		passwordChecking("Play_DRM_Content");

}

target.on("media.eme.enabled", function(prefName) {    
	
	if(settingTabChecking() || ss.storage.ContentExempt || addonUrlChecking()){
		
		newPlayDRMContent = require("sdk/preferences/service").get(prefName);
		ss.storage.oldPlayDRMContent=newPlayDRMContent;
	}else if(ownPlayDRMContent){
		ownPlayDRMContent=0;
	}else if(require("sdk/preferences/service").get(prefName)==="true"){
		newPlayDRMContent = require("sdk/preferences/service").get(prefName);
		ss.storage.oldPlayDRMContent=newPlayDRMContent;
	}
	
	else{if(advancedSettingTabChecking()){
						newPlayDRMContent = require("sdk/preferences/service").get(prefName);
						advancedMonitoringListUpdating("Play_DRM_Content");
						
				}else{
		newPlayDRMContent = require("sdk/preferences/service").get(prefName);
		ownPlayDRMContent=1;
		require("sdk/preferences/service").set("media.eme.enabled",ss.storage.oldPlayDRMContent);	
		if(!ss.storage.NeverChange)
		passwordCheckingPlayDRMContent();
	}
	
}});

function Play_DRM_Content(){
	ownPlayDRMContent=1;
	require("sdk/preferences/service").set("media.eme.enabled",newPlayDRMContent);	
	ss.storage.oldPlayDRMContent=newPlayDRMContent;
	
}

//tracking protection private

if(installingAddon)
	ss.storage.oldTrackingProtectionPrivate  = require("sdk/preferences/service").get("privacy.trackingprotection.pbmode.enabled");
var ownTrackingProtectionPrivate = 0;
var newTrackingProtectionPrivate;
function passwordCheckingTrackingProtectionPrivate(){
	if(comparingStarting ===1)
		passwordChecking("Tracking_Protection_Private");

}

target.on("privacy.trackingprotection.pbmode.enabled", function(prefName) {    
	if(settingTabChecking()||ss.storage.PrivacyExempt ||addonUrlChecking()){
		newTrackingProtectionPrivate = require("sdk/preferences/service").get(prefName);
		ss.storage.oldTrackingProtectionPrivate=newTrackingProtectionPrivate;
	}else if(ownTrackingProtectionPrivate){
		ownTrackingProtectionPrivate=0;
	}
	else if(require("sdk/preferences/service").get(prefName)==="true"){
		newTrackingProtectionPrivate = require("sdk/preferences/service").get(prefName);
		ss.storage.oldTrackingProtectionPrivate=newTrackingProtectionPrivate;
	}
	
	else{if(advancedSettingTabChecking()){
						newTrackingProtectionPrivate = require("sdk/preferences/service").get(prefName);
						advancedMonitoringListUpdating("Tracking_Protection_Private");
						
				}else{
		newTrackingProtectionPrivate = require("sdk/preferences/service").get(prefName);
		ownTrackingProtectionPrivate=1;
		require("sdk/preferences/service").set("privacy.trackingprotection.pbmode.enabled",ss.storage.oldTrackingProtectionPrivate);	
		if(!ss.storage.NeverChange)
		passwordCheckingTrackingProtectionPrivate();
	}
	
}});

function Tracking_Protection_Private(){
	ownTrackingProtectionPrivate=1;
	require("sdk/preferences/service").set("privacy.trackingprotection.pbmode.enabled",newTrackingProtectionPrivate);	
	ss.storage.oldTrackingProtectionPrivate=newTrackingProtectionPrivate;
	
}

//old suggestion history

if(installingAddon)
	ss.storage.oldSuggestHistory  = require("sdk/preferences/service").get("browser.urlbar.suggest.history");
var ownSuggestHistory = 0;
var newSuggestHistory;
function passwordCheckingSuggestHistory(){
	if(comparingStarting ===1)
		passwordChecking("Suggest_History");

}

target.on("browser.urlbar.suggest.history", function(prefName) {    
	if(settingTabChecking() ||ss.storage.PrivacyExempt||addonUrlChecking()){
		newSuggestHistory = require("sdk/preferences/service").get(prefName);
		ss.storage.oldSuggestHistory=newSuggestHistory;
	}else if(ownSuggestHistory){
		ownSuggestHistory=0;
	}
	else{if(advancedSettingTabChecking()){
						newSuggestHistory = require("sdk/preferences/service").get(prefName);
						advancedMonitoringListUpdating("Suggest_History");
						
				}else{
		newSuggestHistory = require("sdk/preferences/service").get(prefName);
		ownSuggestHistory=1;
		require("sdk/preferences/service").set("browser.urlbar.suggest.history",ss.storage.oldSuggestHistory);	
		if(!ss.storage.NeverChange)
		passwordCheckingSuggestHistory();
	}
	
}});

function Suggest_History(){
	ownSuggestHistory=1;
	require("sdk/preferences/service").set("browser.urlbar.suggest.history",newSuggestHistory);	
	ss.storage.oldSuggestHistory=newSuggestHistory;
	
}

//bookmark suggest
if(installingAddon)
	ss.storage.oldSuggestBookmark  = require("sdk/preferences/service").get("browser.urlbar.suggest.bookmark");
var ownSuggestBookmark = 0;
var newSuggestBookmark;
function passwordCheckingSuggestBookmark(){
	if(comparingStarting ===1)
		passwordChecking("Suggest_Bookmark");

}

target.on("browser.urlbar.suggest.bookmark", function(prefName) {    
	if(settingTabChecking()||ss.storage.PrivacyExempt ||addonUrlChecking()){
		newSuggestBookmark = require("sdk/preferences/service").get(prefName);
		ss.storage.oldSuggestBookmark=newSuggestBookmark;
	}else if(ownSuggestBookmark){
		ownSuggestBookmark=0;
	}
	else{if(advancedSettingTabChecking()){
						newSuggestBookmark = require("sdk/preferences/service").get(prefName);
						advancedMonitoringListUpdating("Suggest_Bookmark");
						
				}else{
		newSuggestBookmark = require("sdk/preferences/service").get(prefName);
		ownSuggestBookmark=1;
		require("sdk/preferences/service").set("browser.urlbar.suggest.bookmark",ss.storage.oldSuggestBookmark);	
		if(!ss.storage.NeverChange)
		passwordCheckingSuggestBookmark();
	}
	
}});

function Suggest_Bookmark(){
	ownSuggestBookmark=1;
	require("sdk/preferences/service").set("browser.urlbar.suggest.bookmark",newSuggestBookmark);	
	ss.storage.oldSuggestBookmark=newSuggestBookmark;
	
}

//suggest open tabs
if(installingAddon)
	ss.storage.oldSuggestOPentabs  = require("sdk/preferences/service").get("browser.urlbar.suggest.openpage");
var ownSuggestOPentabs = 0;
var newSuggestOPentabs;
function passwordCheckingSuggestOPentabs(){
	if(comparingStarting ===1)
		passwordChecking("Suggest_Opentabs");

}

target.on("browser.urlbar.suggest.openpage", function(prefName) {    
	if(settingTabChecking() ||ss.storage.PrivacyExempt||addonUrlChecking()){
		newSuggestOPentabs = require("sdk/preferences/service").get(prefName);
		ss.storage.oldSuggestOPentabs=newSuggestOPentabs;
	}else if(ownSuggestOPentabs){
		ownSuggestOPentabs=0;
	}
	else{if(advancedSettingTabChecking()){
						newSuggestOPentabs = require("sdk/preferences/service").get(prefName);
						advancedMonitoringListUpdating("Suggest_Opentabs");
						
				}else{
		newSuggestOPentabs = require("sdk/preferences/service").get(prefName);
		ownSuggestOPentabs=1;
		require("sdk/preferences/service").set("browser.urlbar.suggest.openpage",ss.storage.oldSuggestOPentabs);	
		if(!ss.storage.NeverChange)
		passwordCheckingSuggestOPentabs();
	}
	
}});

function Suggest_Opentabs(){
	ownSuggestOPentabs=1;
	require("sdk/preferences/service").set("browser.urlbar.suggest.openpage",newSuggestOPentabs);	
	ss.storage.oldSuggestOPentabs=newSuggestOPentabs;
	
}

//warn before addon install
if(installingAddon)
	ss.storage.oldwarnAddOnInstall  = require("sdk/preferences/service").get("xpinstall.whitelist.required");
var ownwarnAddOnInstall = 0;
var newwarnAddOnInstall;
function passwordCheckingwarnAddOnInstall(){
	if(comparingStarting ===1)
		passwordChecking("Warn_Add_OnInstall");

}

target.on("xpinstall.whitelist.required", function(prefName) {    
	if(settingTabChecking()||ss.storage.SecurityExempt ||addonUrlChecking()){
		newwarnAddOnInstall = require("sdk/preferences/service").get(prefName);
		ss.storage.oldwarnAddOnInstall=newwarnAddOnInstall;
	}else if(ownwarnAddOnInstall){
		ownwarnAddOnInstall=0;
	}
	else if(require("sdk/preferences/service").get(prefName)==="true"){
		newwarnAddOnInstall = require("sdk/preferences/service").get(prefName);
		ss.storage.oldwarnAddOnInstall=newwarnAddOnInstall;
	}
	
	else{if(advancedSettingTabChecking()){
						newwarnAddOnInstall = require("sdk/preferences/service").get(prefName);
						advancedMonitoringListUpdating("Warn_Add_OnInstall");
						
				}else{
		newwarnAddOnInstall = require("sdk/preferences/service").get(prefName);
		ownwarnAddOnInstall=1;
		require("sdk/preferences/service").set("xpinstall.whitelist.required",ss.storage.oldwarnAddOnInstall);	
		if(!ss.storage.NeverChange)
		passwordCheckingwarnAddOnInstall();
	}
	
}});

function Warn_Add_OnInstall(){
	ownwarnAddOnInstall=1;
	require("sdk/preferences/service").set("xpinstall.whitelist.required",newwarnAddOnInstall);	
	ss.storage.oldwarnAddOnInstall=newwarnAddOnInstall;
	
}

//block reported sites
if(installingAddon)
	ss.storage.oldBlockReportedSites  = require("sdk/preferences/service").get("browser.safebrowsing.malware.enabled");
var ownBlockReportedSites = 0;
var newBlockReportedSites;
function passwordCheckingBlockReportedSites(){
	if(comparingStarting ===1)
		passwordChecking("Block_Reported_Sites");

}

target.on("browser.safebrowsing.malware.enabled", function(prefName) {    
	if(settingTabChecking() ||ss.storage.SecurityExempt||addonUrlChecking()){
		newBlockReportedSites = require("sdk/preferences/service").get(prefName);
		ss.storage.oldBlockReportedSites=newBlockReportedSites;
	}else if(ownBlockReportedSites){
		ownBlockReportedSites=0;
	}
	else if(require("sdk/preferences/service").get(prefName)==="true"){
		newBlockReportedSites = require("sdk/preferences/service").get(prefName);
		ss.storage.oldBlockReportedSites=newBlockReportedSites;
	}
	
	else{if(advancedSettingTabChecking()){
						newBlockReportedSites = require("sdk/preferences/service").get(prefName);
						advancedMonitoringListUpdating("Block_Reported_Sites");
						
				}else{
		newBlockReportedSites = require("sdk/preferences/service").get(prefName);
		ownBlockReportedSites=1;
		require("sdk/preferences/service").set("browser.safebrowsing.malware.enabled",ss.storage.oldBlockReportedSites);	
		if(!ss.storage.NeverChange)
		passwordCheckingBlockReportedSites();
	}
	
}});

function Block_Reported_Sites(){
	ownBlockReportedSites=1;
	require("sdk/preferences/service").set("browser.safebrowsing.malware.enabled",newBlockReportedSites);	
	ss.storage.oldBlockReportedSites=newBlockReportedSites;
	
}

//block reported forgies
if(installingAddon)
	ss.storage.oldBlockReportedForgies  = require("sdk/preferences/service").get("browser.safebrowsing.enabled");
var ownBlockReportedForgies= 0;
var newBlockReportedForgies;
function passwordCheckingBlockReportedForgies(){
	if(comparingStarting ===1)
		passwordChecking("Block_Reported_Forgies");

}

target.on("browser.safebrowsing.enabled", function(prefName) {    
	if(settingTabChecking()||ss.storage.SecurityExempt ||addonUrlChecking()){
		newBlockReportedForgies = require("sdk/preferences/service").get(prefName);
		ss.storage.oldBlockReportedForgies=newBlockReportedForgies;
	}else if(ownBlockReportedForgies){
		ownBlockReportedForgies=0;
	}
	else{if(advancedSettingTabChecking()){
						newBlockReportedForgies = require("sdk/preferences/service").get(prefName);
						advancedMonitoringListUpdating("Block_Reported_Forgies");
						
				}else{
		newBlockReportedForgies = require("sdk/preferences/service").get(prefName);
		ownBlockReportedForgies=1;
		require("sdk/preferences/service").set("browser.safebrowsing.enabled",ss.storage.oldBlockReportedForgies);	
		if(!ss.storage.NeverChange)
		passwordCheckingBlockReportedForgies();
	}
	
}});

function Block_Reported_Forgies(){
	ownBlockReportedForgies=1;
	require("sdk/preferences/service").set("browser.safebrowsing.enabled",newBlockReportedForgies);	
	ss.storage.oldBlockReportedForgies=newBlockReportedForgies;
	
}


//remember login
if(installingAddon)
	ss.storage.oldRememberLogins  = require("sdk/preferences/service").get("signon.rememberSignons");
var ownRememberLogins= 0;
var newRememberLogins;
function passwordCheckingRememberLogins(){
	if(comparingStarting ===1)
		passwordChecking("Remember_Logins");

}

target.on("signon.rememberSignons", function(prefName) {    
	if(settingTabChecking()||ss.storage.SecurityExempt ||addonUrlChecking()){
		newRememberLogins = require("sdk/preferences/service").get(prefName);
		ss.storage.oldRememberLogins=newRememberLogins;
	}else if(ownRememberLogins){
		ownRememberLogins=0;
	}
	else{if(advancedSettingTabChecking()){
						newRememberLogins = require("sdk/preferences/service").get(prefName);
						advancedMonitoringListUpdating("Remember_Logins");
						
				}else{
		newRememberLogins = require("sdk/preferences/service").get(prefName);
		ownRememberLogins=1;
		require("sdk/preferences/service").set("signon.rememberSignons",ss.storage.oldRememberLogins);	
		if(!ss.storage.NeverChange)
		passwordCheckingRememberLogins();
	}
	
}});

function Remember_Logins(){
	ownRememberLogins=1;
	require("sdk/preferences/service").set("signon.rememberSignons",newRememberLogins);	
	ss.storage.oldRememberLogins=newRememberLogins;
	
}

//warn bfore reloading
if(installingAddon)
	ss.storage.oldWarnMeRedirectorReloadPages  = require("sdk/preferences/service").get("accessibility.blockautorefresh");
var ownWarnMeRedirectorReloadPages= 0;
var newWarnMeRedirectorReloadPages;
function passwordCheckingWarnMeRedirectorReloadPages(){
	if(comparingStarting ===1)
		passwordChecking("Warn_MeRe_direct_or_ReloadPages");

}

target.on("accessibility.blockautorefresh", function(prefName) {    
	if(settingTabChecking()||ss.storage.AdvancedExempt ||addonUrlChecking()){
		newWarnMeRedirectorReloadPages = require("sdk/preferences/service").get(prefName);
		ss.storage.oldWarnMeRedirectorReloadPages=newWarnMeRedirectorReloadPages;
	}else if(ownWarnMeRedirectorReloadPages){
		ownWarnMeRedirectorReloadPages=0;
	}
	else{if(advancedSettingTabChecking()){
						newWarnMeRedirectorReloadPages = require("sdk/preferences/service").get(prefName);
						advancedMonitoringListUpdating("Warn_MeRe_direct_or_ReloadPages");
						
				}else{
		newWarnMeRedirectorReloadPages = require("sdk/preferences/service").get(prefName);
		ownWarnMeRedirectorReloadPages=1;
		require("sdk/preferences/service").set("accessibility.blockautorefresh",ss.storage.oldWarnMeRedirectorReloadPages);	
		if(!ss.storage.NeverChange)
		passwordCheckingWarnMeRedirectorReloadPages();
	}
	
}});

function Warn_MeRe_direct_or_ReloadPages(){
	ownWarnMeRedirectorReloadPages=1;
	require("sdk/preferences/service").set("accessibility.blockautorefresh",newWarnMeRedirectorReloadPages);	
	ss.storage.oldWarnMeRedirectorReloadPages=newWarnMeRedirectorReloadPages;
	
}

//search engine updates
if(installingAddon)
	ss.storage.oldSearchUpdates  = require("sdk/preferences/service").get("browser.search.update");
var ownSearchUpdates= 0;
var newSearchUpdates;
function passwordCheckingSearchUpdates(){
	if(comparingStarting ===1)
		passwordChecking("Search_Updates");

}

target.on("browser.search.update", function(prefName) {    
	if(settingTabChecking()||ss.storage.AdvancedExempt ||addonUrlChecking()){
		newSearchUpdates = require("sdk/preferences/service").get(prefName);
		ss.storage.oldSearchUpdates=newSearchUpdates;
	}else if(ownSearchUpdates){
		ownSearchUpdates=0;
	}
	else{if(advancedSettingTabChecking()){
						newSearchUpdates = require("sdk/preferences/service").get(prefName);
						advancedMonitoringListUpdating("Search_Updates");
						
				}else{
		newSearchUpdates = require("sdk/preferences/service").get(prefName);
		ownSearchUpdates=1;
		require("sdk/preferences/service").set("browser.search.update",ss.storage.oldSearchUpdates);	
		if(!ss.storage.NeverChange)
		passwordCheckingSearchUpdates();
	}
	
}});

function Search_Updates(){
	ownSearchUpdates=1;
	require("sdk/preferences/service").set("browser.search.update",newSearchUpdates);	
	ss.storage.oldSearchUpdates=newSearchUpdates;
	
}

//asking update installing
if(installingAddon)
	ss.storage.oldUpdateDownloadButInstallAsk  = require("sdk/preferences/service").get("media.gmp-eme-adobe.lastUpdate");
var ownUpdateDownloadButInstallAsk= 0;
var newUpdateDownloadButInstallAsk;
function passwordCheckingUpdateDownloadButInstallAsk(){
	if(comparingStarting ===1)
		passwordChecking("Asking_Updates_Install");

}

target.on("media.gmp-eme-adobe.lastUpdate", function(prefName) {    
	if(settingTabChecking()||ss.storage.AdvancedExempt ||addonUrlChecking()){
		newUpdateDownloadButInstallAsk = require("sdk/preferences/service").get(prefName);
		ss.storage.oldUpdateDownloadButInstallAsk=newUpdateDownloadButInstallAsk;
	}else if(ownUpdateDownloadButInstallAsk){
		ownUpdateDownloadButInstallAsk=0;
	}
	else{if(advancedSettingTabChecking()){
						newUpdateDownloadButInstallAsk = require("sdk/preferences/service").get(prefName);
						advancedMonitoringListUpdating("Asking_Updates_Install");
						
				}else{
		newUpdateDownloadButInstallAsk = require("sdk/preferences/service").get(prefName);
		ownUpdateDownloadButInstallAsk=1;
		require("sdk/preferences/service").set("media.gmp-eme-adobe.lastUpdate",ss.storage.oldUpdateDownloadButInstallAsk);	
		if(!ss.storage.NeverChange)
		passwordCheckingUpdateDownloadButInstallAsk();
	}
	
}});

function Asking_Updates_Install(){
	ownUpdateDownloadButInstallAsk=1;
	require("sdk/preferences/service").set("media.gmp-eme-adobe.lastUpdate",newUpdateDownloadButInstallAsk);	
	ss.storage.oldUpdateDownloadButInstallAsk=newUpdateDownloadButInstallAsk;
	
}

//auto update install
if(installingAddon)
	ss.storage.oldAutoInstallUpdate  = require("sdk/preferences/service").get("app.update.auto");
var ownAutoInstallUpdate= 0;
var newAutoInstallUpdate;
function passwordCheckingAutoInstallUpdate(){
	if(comparingStarting ===1)
		passwordChecking("Auto_Install_updates");

}

target.on("app.update.auto", function(prefName) {    
	if(settingTabChecking()||ss.storage.AdvancedExempt ||addonUrlChecking()){
		newAutoInstallUpdate = require("sdk/preferences/service").get(prefName);
		ss.storage.oldAutoInstallUpdate=newAutoInstallUpdate;
	}else if(ownAutoInstallUpdate){
		ownAutoInstallUpdate=0;
	}
	else{if(advancedSettingTabChecking()){
						newAutoInstallUpdate = require("sdk/preferences/service").get(prefName);
						advancedMonitoringListUpdating("Auto_Install_updates");
						
				}else{
		newAutoInstallUpdate = require("sdk/preferences/service").get(prefName);
		ownAutoInstallUpdate=1;
		require("sdk/preferences/service").set("app.update.auto",ss.storage.oldAutoInstallUpdate);	
		if(!ss.storage.NeverChange)
		passwordCheckingAutoInstallUpdate();
	}
	
}});

function Auto_Install_updates(){
	ownAutoInstallUpdate=1;
	require("sdk/preferences/service").set("app.update.auto",newAutoInstallUpdate);	
	ss.storage.oldAutoInstallUpdate=newAutoInstallUpdate;
	
}

//never install updates
if(installingAddon)
	ss.storage.oldNeverInsatllUpdates  = require("sdk/preferences/service").get("app.update.enabled");
var ownNeverInsatllUpdates= 0;
var newNeverInsatllUpdates;
function passwordCheckingNeverInsatllUpdates(){
	if(comparingStarting ===1)
		passwordChecking("Never_Install_updates");

}

target.on("app.update.enabled", function(prefName) {    
	if(settingTabChecking()||ss.storage.AdvancedExempt ||addonUrlChecking()){
		newNeverInsatllUpdates = require("sdk/preferences/service").get(prefName);
		ss.storage.oldNeverInsatllUpdates=newNeverInsatllUpdates;
	}else if(ownNeverInsatllUpdates){
		ownNeverInsatllUpdates=0;
	}
	else{if(advancedSettingTabChecking()){
						newNeverInsatllUpdates = require("sdk/preferences/service").get(prefName);
						advancedMonitoringListUpdating("Never_Install_updates");
						
				}else{
		newNeverInsatllUpdates = require("sdk/preferences/service").get(prefName);
		ownNeverInsatllUpdates=1;
		require("sdk/preferences/service").set("app.update.enabled",ss.storage.oldNeverInsatllUpdates);	
		if(!ss.storage.NeverChange)
		passwordCheckingNeverInsatllUpdates();
	}
	
}});

function Never_Install_updates(){
	ownNeverInsatllUpdates=1;
	require("sdk/preferences/service").set("app.update.enabled",newNeverInsatllUpdates);	
	ss.storage.oldNeverInsatllUpdates=newNeverInsatllUpdates;
	
}

//own prefernces

//advanced monitoring

if(installingAddon){
	ownAdvancedMonitoring=1;
		 require("sdk/simple-prefs").prefs.AdvancedMonitoring=false;
	ss.storage.AdvancedMonitoring = require("sdk/simple-prefs").prefs.AdvancedMonitoring;
}
require("sdk/simple-prefs").on("AdvancedMonitoring", onPrefChangeAdvancedMonitoring);
var ownAdvancedMonitoring=0;
function onPrefChangeAdvancedMonitoring(prefName){
	if(ownAdvancedMonitoring)
		ownAdvancedMonitoring=0;
	else{
		ownAdvancedMonitoring=1;
		require("sdk/simple-prefs").prefs.AdvancedMonitoring=ss.storage.AdvancedMonitoring;
		dontObserve=1;
		passwordChecking("Advanced_Monitoring");
}}
function Advanced_Monitoring(){
		if(ss.storage.AdvancedMonitoring){
			ss.storage.AdvancedMonitoring=false;
		 ownAdvancedMonitoring=1;
		 require("sdk/simple-prefs").prefs.AdvancedMonitoring=false;
		} 
		else{
				ss.storage.AdvancedMonitoring=true;
		 ownAdvancedMonitoring=1;
		 require("sdk/simple-prefs").prefs.AdvancedMonitoring=true;
		}
	}




//block settings page
if(installingAddon){
	ownBlockSettingsOpenings=1;
	require("sdk/simple-prefs").prefs.blockSettingsPage=false;
	ss.storage.blockSettingsPage = require("sdk/simple-prefs").prefs.blockSettingsPage;
	
}	
require("sdk/simple-prefs").on("blockSettingsPage", onPrefChange);
var ownBlockSettingsOpenings=0;
function onPrefChange(prefName){
	if(ownBlockSettingsOpenings)
		ownBlockSettingsOpenings=0;
	else{
		ownBlockSettingsOpenings=1;
		require("sdk/simple-prefs").prefs.blockSettingsPage=ss.storage.blockSettingsPage;
		dontObserve=1;
		passwordChecking("Block_Settings_Opening");
}}
function Block_Settings_Opening(){
		if(ss.storage.blockSettingsPage){
			ss.storage.blockSettingsPage=false;
		 ownBlockSettingsOpenings=1;
		 require("sdk/simple-prefs").prefs.blockSettingsPage=false;
		} 
		else{
				ss.storage.blockSettingsPage=true;
		 ownBlockSettingsOpenings=1;
		 require("sdk/simple-prefs").prefs.blockSettingsPage=true;
		}
	}

//never change settings
if(installingAddon){
	ownNeverChange=1;
		 require("sdk/simple-prefs").prefs.NeverChange=false;
	ss.storage.NeverChange = require("sdk/simple-prefs").prefs.NeverChange;
}
	require("sdk/simple-prefs").on("NeverChange", onPrefChangeNever);
var ownNeverChange=0;
function onPrefChangeNever(prefName){
	if(ownNeverChange)
		ownNeverChange=0;
	else{
		ownNeverChange=1;
		require("sdk/simple-prefs").prefs.NeverChange=ss.storage.NeverChange;
		dontObserve=1;
		passwordChecking("Never_Change");
}}
function Never_Change(){
		if(ss.storage.NeverChange){
			ss.storage.NeverChange=false;
		 ownNeverChange=1;
		 require("sdk/simple-prefs").prefs.NeverChange=false;
		} 
		else{
				ss.storage.NeverChange=true;
		 ownNeverChange=1;
		 require("sdk/simple-prefs").prefs.NeverChange=true;
		}
	}

//new tab change exempt
if(installingAddon){
	ownNewTabExempt=1;
		 require("sdk/simple-prefs").prefs.NewTabExempt=false;
	ss.storage.NewTabExempt = require("sdk/simple-prefs").prefs.NewTabExempt;

}require("sdk/simple-prefs").on("NewTabExempt", onPrefChangeNewTab);
var ownNewTabExempt=0;
function onPrefChangeNewTab(prefName){
	if(ownNewTabExempt)
		ownNewTabExempt=0;
	else{
		ownNewTabExempt=1;
		require("sdk/simple-prefs").prefs.NewTabExempt=ss.storage.NewTabExempt;
		dontObserve=1;
		passwordChecking("New_Tab_Exempt");
}}
function New_Tab_Exempt(){
		if(ss.storage.NewTabExempt){
			ss.storage.NewTabExempt=false;
		 ownNewTabExempt=1;
		 require("sdk/simple-prefs").prefs.NewTabExempt=false;
		} 
		else{
				ss.storage.NewTabExempt=true;
		 ownNewTabExempt=1;
		 require("sdk/simple-prefs").prefs.NewTabExempt=true;
		}
	}

//home page exempt
if(installingAddon){
	ownHomePageExempt=1;
		 require("sdk/simple-prefs").prefs.HomePageExempt=false;
	ss.storage.HomePageExempt = require("sdk/simple-prefs").prefs.HomePageExempt;
}require("sdk/simple-prefs").on("HomePageExempt", onPrefChangeHomePage);
var ownHomePageExempt=0;
function onPrefChangeHomePage(prefName){
	if(ownHomePageExempt)
		ownHomePageExempt=0;
	else{
		ownHomePageExempt=1;
		require("sdk/simple-prefs").prefs.HomePageExempt=ss.storage.HomePageExempt;
		dontObserve=1;
		passwordChecking("Home_Page_Exempt");
}}
function Home_Page_Exempt(){
		if(ss.storage.HomePageExempt){
			ss.storage.HomePageExempt=false;
		 ownHomePageExempt=1;
		 require("sdk/simple-prefs").prefs.HomePageExempt=false;
		} 
		else{
				ss.storage.HomePageExempt=true;
		 ownHomePageExempt=1;
		 require("sdk/simple-prefs").prefs.HomePageExempt=true;
		}
	}
//search engine exempt
if(installingAddon){
	ownSearchEngineExempt=1;
		 require("sdk/simple-prefs").prefs.SearchEngineExempt=false;
	ss.storage.SearchEngineExempt = require("sdk/simple-prefs").prefs.SearchEngineExempt;
}
require("sdk/simple-prefs").on("SearchEngineExempt", onPrefChangeSearchEngine);
var ownSearchEngineExempt=0;
function onPrefChangeSearchEngine(prefName){
	if(ownSearchEngineExempt)
		ownSearchEngineExempt=0;
	else{
		ownSearchEngineExempt=1;
		require("sdk/simple-prefs").prefs.SearchEngineExempt=ss.storage.SearchEngineExempt;
		dontObserve=1;
		passwordChecking("Search_Engine_Exempt");
}}
function Search_Engine_Exempt(){
		if(ss.storage.SearchEngineExempt){
			ss.storage.SearchEngineExempt=false;
		 ownSearchEngineExempt=1;
		 require("sdk/simple-prefs").prefs.SearchEngineExempt=false;
		} 
		else{
				ss.storage.SearchEngineExempt=true;
		 ownSearchEngineExempt=1;
		 require("sdk/simple-prefs").prefs.SearchEngineExempt=true;
		}
	}
//general exempt
if(installingAddon){
	ownGeneraLExempt=1;
		 require("sdk/simple-prefs").prefs.GeneraLExempt=false;
	ss.storage.GeneraLExempt = require("sdk/simple-prefs").prefs.GeneraLExempt;
}
require("sdk/simple-prefs").on("GeneraLExempt", onPrefChangeGeneralExempt);
var ownGeneraLExempt=0;
function onPrefChangeGeneralExempt(prefName){
	if(ownGeneraLExempt)
		ownGeneraLExempt=0;
	else{
		ownGeneraLExempt=1;
		require("sdk/simple-prefs").prefs.GeneraLExempt=ss.storage.GeneraLExempt;
		dontObserve=1;
		passwordChecking("GeneraL_Exempt");
}}
function GeneraL_Exempt(){
		if(ss.storage.GeneraLExempt){
			ss.storage.GeneraLExempt=false;
		 ownGeneraLExempt=1;
		 require("sdk/simple-prefs").prefs.GeneraLExempt=false;
		} 
		else{
				ss.storage.GeneraLExempt=true;
		 ownGeneraLExempt=1;
		 require("sdk/simple-prefs").prefs.GeneraLExempt=true;
		}
	}

	
//search exempt
if(installingAddon){
	ownSearchExempt=1;
		 require("sdk/simple-prefs").prefs.SearchExempt=false;
	ss.storage.SearchExempt = require("sdk/simple-prefs").prefs.SearchExempt;
}
require("sdk/simple-prefs").on("SearchExempt", onPrefChangeSearchExempt);
var ownSearchExempt=0;
function onPrefChangeSearchExempt(prefName){
	if(ownSearchExempt)
		ownSearchExempt=0;
	else{
		ownSearchExempt=1;
		require("sdk/simple-prefs").prefs.SearchExempt=ss.storage.SearchExempt;
		dontObserve=1;
		passwordChecking("Search_Exempt");
}}
function Search_Exempt(){
		if(ss.storage.SearchExempt){
			ss.storage.SearchExempt=false;
		 ownSearchExempt=1;
		 require("sdk/simple-prefs").prefs.SearchExempt=false;
		} 
		else{
				ss.storage.SearchExempt=true;
		 ownSearchExempt=1;
		 require("sdk/simple-prefs").prefs.SearchExempt=true;
		}
	}
//Content Exempt
if(installingAddon){
	ownContentExempt=1;
		 require("sdk/simple-prefs").prefs.ContentExempt=false;
	ss.storage.ContentExempt = require("sdk/simple-prefs").prefs.ContentExempt;
}
require("sdk/simple-prefs").on("ContentExempt", onPrefChangeContentExempt);
var ownContentExempt=0;
function onPrefChangeContentExempt(prefName){
	if(ownContentExempt)
		ownContentExempt=0;
	else{
		ownContentExempt=1;
		require("sdk/simple-prefs").prefs.ContentExempt=ss.storage.ContentExempt;
		dontObserve=1;
		passwordChecking("Content_Exempt");
}}
function Content_Exempt(){
		if(ss.storage.ContentExempt){
			ss.storage.ContentExempt=false;
		 ownContentExempt=1;
		 require("sdk/simple-prefs").prefs.ContentExempt=false;
		} 
		else{
				ss.storage.ContentExempt=true;
		 ownContentExempt=1;
		 require("sdk/simple-prefs").prefs.ContentExempt=true;
		}
	}
//privacy exempt
if(installingAddon){
	ownPrivacyExempt=1;
		 require("sdk/simple-prefs").prefs.PrivacyExempt=false;
	ss.storage.PrivacyExempt = require("sdk/simple-prefs").prefs.PrivacyExempt;
}
require("sdk/simple-prefs").on("PrivacyExempt", onPrefChangePrivacyExempt);
var ownPrivacyExempt=0;
function onPrefChangePrivacyExempt(prefName){
	if(ownPrivacyExempt)
		ownPrivacyExempt=0;
	else{
		ownPrivacyExempt=1;
		require("sdk/simple-prefs").prefs.PrivacyExempt=ss.storage.PrivacyExempt;
		dontObserve=1;
		passwordChecking("Privacy_Exempt");
}}
function Privacy_Exempt(){
		if(ss.storage.PrivacyExempt){
			ss.storage.PrivacyExempt=false;
		 ownPrivacyExempt=1;
		 require("sdk/simple-prefs").prefs.PrivacyExempt=false;
		} 
		else{
				ss.storage.PrivacyExempt=true;
		 ownPrivacyExempt=1;
		 require("sdk/simple-prefs").prefs.PrivacyExempt=true;
		}
	}
//security exempt
if(installingAddon){
	ownSecurityExempt=1;
		 require("sdk/simple-prefs").prefs.SecurityExempt=false;
	ss.storage.SecurityExempt = require("sdk/simple-prefs").prefs.SecurityExempt;
}
	require("sdk/simple-prefs").on("SecurityExempt", onPrefChangeSecurityExempt);

var ownSecurityExempt=0;
function onPrefChangeSecurityExempt(prefName){
	if(ownSecurityExempt)
		ownSecurityExempt=0;
	else{
		ownSecurityExempt=1;
		require("sdk/simple-prefs").prefs.SecurityExempt=ss.storage.SecurityExempt;
		dontObserve=1;
		passwordChecking("Security_Exempt");
}}
function Security_Exempt(){
		if(ss.storage.SecurityExempt){
			ss.storage.SecurityExempt=false;
		 ownSecurityExempt=1;
		 require("sdk/simple-prefs").prefs.SecurityExempt=false;
		} 
		else{
				ss.storage.SecurityExempt=true;
		 ownSecurityExempt=1;
		 require("sdk/simple-prefs").prefs.SecurityExempt=true;
		}
	}
//advanced exempt
if(installingAddon){
	ownAdvancedExempt=1;
		 require("sdk/simple-prefs").prefs.AdvancedExempt=false;
	ss.storage.AdvancedExempt = require("sdk/simple-prefs").prefs.AdvancedExempt;
}
	require("sdk/simple-prefs").on("AdvancedExempt", onPrefChangeAdvancedExempt);

var ownAdvancedExempt=0;
function onPrefChangeAdvancedExempt(prefName){
	if(ownAdvancedExempt)
		ownAdvancedExempt=0;
	else{
		ownAdvancedExempt=1;
		require("sdk/simple-prefs").prefs.AdvancedExempt=ss.storage.AdvancedExempt;
		dontObserve=1;
		passwordChecking("Advanced_Exempt");
}}
function Advanced_Exempt(){
		if(ss.storage.AdvancedExempt){
			ss.storage.AdvancedExempt=false;
		 ownAdvancedExempt=1;
		 require("sdk/simple-prefs").prefs.AdvancedExempt=false;
		} 
		else{
				ss.storage.AdvancedExempt=true;
		 ownAdvancedExempt=1;
		 require("sdk/simple-prefs").prefs.AdvancedExempt=true;
		}
	}
//addons exempt
if(installingAddon){
ownAddonsExempt=1;
		 require("sdk/simple-prefs").prefs.AddonsExempt=false;
ss.storage.AddonsExempt = require("sdk/simple-prefs").prefs.AddonsExempt;
}
require("sdk/simple-prefs").on("AddonsExempt", onPrefChangeAddonsExempt);
var ownAddonsExempt=0;
function onPrefChangeAddonsExempt(prefName){
	if(ownAddonsExempt)
		ownAddonsExempt=0;
	else{
		ownAddonsExempt=1;
		require("sdk/simple-prefs").prefs.AddonsExempt=ss.storage.AddonsExempt;
		dontObserve=1;
		passwordChecking("Addons_Exempt");
}}
function Addons_Exempt(){
		if(ss.storage.AddonsExempt){
			ss.storage.AddonsExempt=false;
		 ownAddonsExempt=1;
		 require("sdk/simple-prefs").prefs.AddonsExempt=false;
		} 
		else{
				ss.storage.AddonsExempt=true;
		 ownAddonsExempt=1;
		 require("sdk/simple-prefs").prefs.AddonsExempt=true;
		}
	}

//authentication change

var dontObserve = 0;
if(installingAddon)
	ss.storage.AuthenticationChange = require("sdk/simple-prefs").prefs.AuthenticationChange;
require("sdk/simple-prefs").on("AuthenticationChange", onPrefChangeAuthenticationChange);
var ownAuthenticationChange=0;
function onPrefChangeAuthenticationChange(prefName){
	
	if(ownAuthenticationChange)
		ownAuthenticationChange=0;
	else{
		ownAuthenticationChange=1;
		require("sdk/simple-prefs").prefs.AuthenticationChange=ss.storage.AuthenticationChange;
		dontObserve=1;
		passwordChecking("Authentication_Change");
}}
function Authentication_Change(){
		if(token.needsLogin())
	{
		masterYesPanel.show();
		
	}else{
	
	masterNoPanel.show();
	}
	}
	
	
	

//detecting opening of settings tab page
var ownSettingsOpening = 0;


function onOpen(tab) {
  tab.on("pageshow", logShow);
  tab.on("deactivate", logDeactivate);
  tab.on("close", logClose);
}

var advanceMonitoringSource =0;

function logDeactivate(tab){
	 if(ss.storage.AdvancedMonitoring){
		if(tab.url.toLowerCase().startsWith("about:preferences")){
			advancedMonitoringPasswordCalling();
			advanceMonitoringSource=1;
		} 
	 }
	 
}

function logClose(tab){
	if(ss.storage.AdvancedMonitoring){
		if(tab.url.toLowerCase().startsWith("about:preferences")){
			advancedMonitoringPasswordCalling();
			advanceMonitoringSource=1;
		} 
	 }
}


if(ss.storage.advancedMonitoringList.length!==0){
	setTimeout(function(){
		advancedMonitoringPasswordCalling();
	},3000);
}



//*********************************************************************

function advancedMonitoringPasswordCalling(){
	
	while(ss.storage.advancedMonitoringList.length !== 0){
		if(ss.storage.advancedMonitoringList[0] === "Search_Engine"){
			if(testing.getcurrentEngine().name===ss.storage.oldCurrentEngineName){
				newCurrentEngineName="";
			}else{
					newCurrentEngineName=testing.getcurrentEngine().name;
					ownSearchEngineChange=1;
					testing.setcurrentengine(ss.storage.oldCurrentEngineName);
					passwordCheckingSearchEngine();
			}}else if(ss.storage.advancedMonitoringList[0]==="Home_Page_URL"){
				if(newHomePage===ss.storage.oldHomePage){newHomePage="";}
				else{
	newHomePage= require("sdk/preferences/service").get("browser.startup.homepage");
	ownHomePageChange=1;
		require("sdk/preferences/service").set("browser.startup.homepage",ss.storage.oldHomePage);
		passwordCheckingHomePageUrl();
			}}else if(ss.storage.advancedMonitoringList[0]==="Checking_default_browser"){
				if(ss.storage.oldCheckingDefaultBrowser===newCheckingDefaultBrowser){newCheckingDefaultBrowser=""}
				else{
	newCheckingDefaultBrowser = require("sdk/preferences/service").get("browser.shell.checkDefaultBrowser");
		ownChangeDefaultChecking=1;
		require("sdk/preferences/service").set("browser.shell.checkDefaultBrowser",ss.storage.oldCheckingDefaultBrowser);
		passwordCheckingDefaultBrowser();
			}}else if(ss.storage.advancedMonitoringList[0]==="Start_Up_Page"){
				if(ss.storage.oldStartUpPage===newStartUpPage){newStartUpPage="";}
				else{
	newStartUpPage = require("sdk/preferences/service").get("browser.startup.page");
		ownStartUpPage=1;
		require("sdk/preferences/service").set("browser.startup.page",ss.storage.oldStartUpPage);	
		passwordCheckingStartUpPage();
				}}else if(ss.storage.advancedMonitoringList[0]==="Download_Dir"){
					if(ss.storage.oldDownloadDir===newDownloadDir){newDownloadDir="";}
else{	newDownloadDir = require("sdk/preferences/service").get("browser.download.useDownloadDir");
		ownDownloadDir=1;
		require("sdk/preferences/service").set("browser.download.useDownloadDir",ss.storage.oldDownloadDir);	
		passwordCheckingDownloadDir();
				}}else if(ss.storage.advancedMonitoringList[0]==="Open_New_tab"){
	if(ss.storage.oldOpenNewtab===newOpenNewtab){newOpenNewtab="";}
	else{
	newOpenNewtab = require("sdk/preferences/service").get("browser.link.open_newwindow");
		ownOpenNewtab=1;
		require("sdk/preferences/service").set("browser.link.open_newwindow",ss.storage.oldOpenNewtab);	
		passwordCheckingOpenNewtab();
	}}else if(ss.storage.advancedMonitoringList[0]==="Search_From_Windows"){
		if(ss.storage.oldSearchFromWindows===newSearchFromWindows){newSearchFromWindows="";}
else{	newSearchFromWindows = require("sdk/preferences/service").get("browser.search.redirectWindowsSearch");
		ownSearchFromWindows=1;
		require("sdk/preferences/service").set("browser.search.redirectWindowsSearch",ss.storage.oldSearchFromWindows);	
		passwordCheckingSearchFromWindows();
	}}else if(ss.storage.advancedMonitoringList[0]==="Search_Suggestions_LocalBar"){
		if(ss.storage.oldSearchSuggestionsLocalBar===newSearchSuggestionsLocalBar){newSearchSuggestionsLocalBar="";}
else{	newSearchSuggestionsLocalBar = require("sdk/preferences/service").get("browser.urlbar.suggest.searches");
		ownSearchSuggestionsLocalBar=1;
		require("sdk/preferences/service").set("browser.urlbar.suggest.searches",ss.storage.oldSearchSuggestionsLocalBar);	
		
		passwordCheckingSearchSuggestionsLocalBar();
	}}else if(ss.storage.advancedMonitoringList[0]==="Provide_Search_Suggestions"){
	if(ss.storage.oldProvideSearchSuggestions===newProvideSearchSuggestions){newProvideSearchSuggestions=""}
	else{
	newProvideSearchSuggestions = require("sdk/preferences/service").get("browser.search.suggest.enabled");
		ownProvideSearchSuggestions=1;
		require("sdk/preferences/service").set("browser.search.suggest.enabled",ss.storage.oldProvideSearchSuggestions);	
		
		passwordCheckingProvideSearchSuggestions();
	}}else if(ss.storage.advancedMonitoringList[0]==="Pop_Up_Block"){
	if(ss.storage.oldBlockPopUp===newBlockPopUp){newBlockPopUp="";}
else{	newBlockPopUp = require("sdk/preferences/service").get("dom.disable_open_during_load");
		ownBlockPopUp=1;
		require("sdk/preferences/service").set("dom.disable_open_during_load",ss.storage.oldBlockPopUp);	
		passwordCheckingBlockPopUp();
	}}else if(ss.storage.advancedMonitoringList[0]==="Play_DRM_Content"){
	if(ss.storage.oldPlayDRMContent===newPlayDRMContent){newPlayDRMContent="";}
else{	newPlayDRMContent = require("sdk/preferences/service").get("media.eme.enabled");
		ownPlayDRMContent=1;
		require("sdk/preferences/service").set("media.eme.enabled",ss.storage.oldPlayDRMContent);	
		
		passwordCheckingPlayDRMContent();
	}}else if(ss.storage.advancedMonitoringList[0]==="Tracking_Protection_Private"){
	if(ss.storage.oldTrackingProtectionPrivate===newTrackingProtectionPrivate){newTrackingProtectionPrivate="";}
else{	newTrackingProtectionPrivate = require("sdk/preferences/service").get("privacy.trackingprotection.pbmode.enabled");
		ownTrackingProtectionPrivate=1;
		require("sdk/preferences/service").set("privacy.trackingprotection.pbmode.enabled",ss.storage.oldTrackingProtectionPrivate);	
		
		passwordCheckingTrackingProtectionPrivate();
	}}else if(ss.storage.advancedMonitoringList[0]==="Suggest_History"){
		if(ss.storage.oldSuggestHistory===newSuggestHistory){newSuggestHistory="";}
		else{
	newSuggestHistory = require("sdk/preferences/service").get("browser.urlbar.suggest.history");
		ownSuggestHistory=1;
		require("sdk/preferences/service").set("browser.urlbar.suggest.history",ss.storage.oldSuggestHistory);	
		
		passwordCheckingSuggestHistory();
	}}else if(ss.storage.advancedMonitoringList[0]==="Suggest_Bookmark"){
		if(ss.storage.oldSuggestBookmark===newSuggestBookmark){newSuggestBookmark="";}
		else{
	newSuggestBookmark = require("sdk/preferences/service").get("browser.urlbar.suggest.bookmark");
		ownSuggestBookmark=1;
		require("sdk/preferences/service").set("browser.urlbar.suggest.bookmark",ss.storage.oldSuggestBookmark);	
		
		passwordCheckingSuggestBookmark();
	}}else if(ss.storage.advancedMonitoringList[0]==="Suggest_Opentabs"){
		if(ss.storage.oldSuggestOPentabs===newSuggestOPentabs){newSuggestOPentabs="";}
		else{
	newSuggestOPentabs = require("sdk/preferences/service").get("browser.urlbar.suggest.openpage");
		ownSuggestOPentabs=1;
		require("sdk/preferences/service").set("browser.urlbar.suggest.openpage",ss.storage.oldSuggestOPentabs);	
		
		passwordCheckingSuggestOPentabs();
	}}else if(ss.storage.advancedMonitoringList[0]==="Warn_Add_OnInstall"){
	if(ss.storage.oldwarnAddOnInstall===newwarnAddOnInstall){newwarnAddOnInstall="";}
	else{
	newwarnAddOnInstall = require("sdk/preferences/service").get("xpinstall.whitelist.required");
		ownwarnAddOnInstall=1;
		require("sdk/preferences/service").set("xpinstall.whitelist.required",ss.storage.oldwarnAddOnInstall);	
		passwordCheckingwarnAddOnInstall();
	}}else if(ss.storage.advancedMonitoringList[0]==="Block_Reported_Sites"){
		if(ss.storage.oldBlockReportedSites===newBlockReportedSites){newBlockReportedSites="";}
		else{
	newBlockReportedSites = require("sdk/preferences/service").get("browser.safebrowsing.malware.enabled");
		ownBlockReportedSites=1;
		require("sdk/preferences/service").set("browser.safebrowsing.malware.enabled",ss.storage.oldBlockReportedSites);	
		
		passwordCheckingBlockReportedSites();
	}}else if(ss.storage.advancedMonitoringList[0]==="Block_Reported_Forgies"){
		if(ss.storage.oldBlockReportedForgies===newBlockReportedForgies){newBlockReportedForgies="";}
		else{
	newBlockReportedForgies = require("sdk/preferences/service").get("browser.safebrowsing.enabled");
		ownBlockReportedForgies=1;
		require("sdk/preferences/service").set("browser.safebrowsing.enabled",ss.storage.oldBlockReportedForgies);	
		
		passwordCheckingBlockReportedForgies();
	}}else if(ss.storage.advancedMonitoringList[0]==="Remember_Logins"){
		if(ss.storage.oldRememberLogins===newRememberLogins){newRememberLogins="";}
		else{
	newRememberLogins = require("sdk/preferences/service").get("signon.rememberSignons");
		ownRememberLogins=1;
		require("sdk/preferences/service").set("signon.rememberSignons",ss.storage.oldRememberLogins);	
		
		passwordCheckingRememberLogins();
	}}else if(ss.storage.advancedMonitoringList[0]==="Warn_MeRe_direct_or_ReloadPages"){
		if(ss.storage.oldWarnMeRedirectorReloadPages===newWarnMeRedirectorReloadPages){newWarnMeRedirectorReloadPages="";}
		else{
	newWarnMeRedirectorReloadPages = require("sdk/preferences/service").get("accessibility.blockautorefresh");
		ownWarnMeRedirectorReloadPages=1;
		require("sdk/preferences/service").set("accessibility.blockautorefresh",ss.storage.oldWarnMeRedirectorReloadPages);	
		
		passwordCheckingWarnMeRedirectorReloadPages();
	}}else if(ss.storage.advancedMonitoringList[0]==="Search_Updates"){
	if(ss.storage.oldSearchUpdates===newSearchUpdates){newSearchUpdates="";}
	else{
	newSearchUpdates = require("sdk/preferences/service").get("browser.search.update");
		ownSearchUpdates=1;
		require("sdk/preferences/service").set("browser.search.update",ss.storage.oldSearchUpdates);	
		
		passwordCheckingSearchUpdates();
	}}else if(ss.storage.advancedMonitoringList[0]==="Asking_Updates_Install"){
		if(ss.storage.oldUpdateDownloadButInstallAsk===newUpdateDownloadButInstallAsk){newUpdateDownloadButInstallAsk="";}
		else{
	newUpdateDownloadButInstallAsk = require("sdk/preferences/service").get("media.gmp-eme-adobe.lastUpdate");
		ownUpdateDownloadButInstallAsk=1;
		require("sdk/preferences/service").set("media.gmp-eme-adobe.lastUpdate",ss.storage.oldUpdateDownloadButInstallAsk);	
		
		passwordCheckingUpdateDownloadButInstallAsk();
	}}else if(ss.storage.advancedMonitoringList[0]==="Auto_Install_updates"){
		if(ss.storage.oldAutoInstallUpdate===newAutoInstallUpdate){newAutoInstallUpdate="";}
		else{
	newAutoInstallUpdate = require("sdk/preferences/service").get("app.update.auto");
		ownAutoInstallUpdate=1;
		require("sdk/preferences/service").set("app.update.auto",ss.storage.oldAutoInstallUpdate);	
		
		passwordCheckingAutoInstallUpdate();
	}}else if(ss.storage.advancedMonitoringList[0]==="Never_Install_updates"){
	if(ss.storage.oldNeverInsatllUpdates===newNeverInsatllUpdates){newNeverInsatllUpdates="";}
	else{
	newNeverInsatllUpdates = require("sdk/preferences/service").get("app.update.enabled");
		ownNeverInsatllUpdates=1;
		require("sdk/preferences/service").set("app.update.enabled",ss.storage.oldNeverInsatllUpdates);	
		
		passwordCheckingNeverInsatllUpdates();
	}}
		ss.storage.advancedMonitoringList.splice(0,1);
	}
	
}
//***********************************************************

function logShow(tab) {
	if(ss.storage.blockSettingsPage){
		if(tabs.activeTab.url.toLowerCase().startsWith("about:preferences")){
			if(ownSettingsOpening){
				ownSettingsOpening=0;
			}else{
			tabs.activeTab.close(function(){});
			dontObserve=1;
			passwordChecking("Settings_Page_Opening");
		}}}
}
tabs.on('open', onOpen);

function Settings_Page_Opening(){
	ownSettingsOpening=1;
	tabs.open("about:preferences");
}


//main settings authentication mechanism
function passwordCheckingPanelOpening(){
	masterNoPanel.show();
	masterNoPanel.hide();
	setTimeout(function(){passwordCheckingPanel.show();},1000);
}

function passwordChecking(text){
	
	passwordCheckingList.push(text);
	if(!passwordPresentChecking){
		if(ss.storage.passwordCheckingMethod==="master"){
			passwordPresentChecking =1;
			
			masterPasswordChecking();
	}
	else if(ss.storage.passwordCheckingMethod==="own"){
		passwordPresentChecking =1;
		passwordCheckingPanelOpening();
		
	}else if(token.needsLogin()){
		ss.storage.passwordCheckingMethod="master";
		masterPasswordChecking();
	}
	else{
		masterNoPanel.show();
	}
	}
	
}

function masterPasswordChecking(){
	if(dontObserve){
				try{
				if (isSuccessCode(token.login(true))) {
						
						dontObserve=0;
						passwordCheckingFinished();
						
					}
	
			} catch (e) {
					dontObserve=0;
					passwordCheckingList = [];
					ss.storage.advancedMonitoringList = [];
					runSearchEngine=1;
					runHomePage = 1;
					newTabChecking=1;
					sourceAddonInformation=0;
					passwordPresentChecking = 0;
			}
			}else{
			masterDisplayPanel.show();
			}
}


masterDisplayPanel.port.on("masterSave",function(text){
	try {	
			
    				if (isSuccessCode(token.login(true))) {
						if(!dontObserve)
						changesSavedPanel.show();
						dontObserve=0;
						masterDisplayPanel.hide();
						passwordCheckingFinished();
						
					}
	
			} catch (e) {
					masterDisplayPanel.hide();
					if(!dontObserve)
					changesDiscardPanel.show();
					dontObserve=0;
					sourceAddonInformation=0;
					passwordCheckingList = [];
					ss.storage.advancedMonitoringList = [];
					runSearchEngine=1;
					runHomePage = 1;
					newTabChecking=1;
					passwordPresentChecking = 0;
			}
});
 

passwordCheckingPanel.port.on("okyClicked", function(text1){
	passwordCheckingPanel.hide();
	require("sdk/passwords").search({
    url: require("sdk/self").uri,
    onComplete: function onComplete(credentials) {
      credentials.forEach(function(credential) {
        
        if(texting(text1)===credential.password){
				if(!dontObserve)
				changesSavedPanel.show();
				dontObserve=0;
				passwordCheckingTimes = 3;
				passwordCheckingFailed="";
			passwordCheckingFinished();
				
		}
		else{
			if(passwordCheckingTimes === 1){
				
					passwordCheckingTimes = 3;
				passwordPresentChecking = 0;
				passwordCheckingList = [];
				ss.storage.advancedMonitoringList = [];
				passwordCheckingFailed = "";
				runSearchEngine=1;
				newTabChecking=1;
				sourceAddonInformation=0;
				runHomePage = 1;
				if(!dontObserve)
				changesDiscardPanel.show();
				dontObserve=0;
				
			}else{
				passwordCheckingFailed = "You have entered incorrect password";
				passwordCheckingTimes--;
				passwordCheckingPanelOpening();
			
			}
		}
        });
      }
    });
});

passwordCheckingPanel.port.on("canclClicked", function(text1){
	passwordCheckingPanel.hide();
	passwordPresentChecking = 0;
	passwordCheckingTimes = 3;
	runSearchEngine=1;
	runHomePage = 1;
	sourceAddonInformation=0;
	newTabChecking=1;
	passwordCheckingList = [];
	ss.storage.advancedMonitoringList = [];
	passwordCheckingFailed ="";
	if(!dontObserve)
	changesDiscardPanel.show();
	dontObserve=0;
});

masterDisplayPanel.port.on("masterCancel",function(text){
	masterDisplayPanel.hide();
	passwordCheckingPanel.hide();
	passwordPresentChecking = 0;
	passwordCheckingTimes = 3;
	runSearchEngine=1;
	runHomePage = 1;
	newTabChecking=1;
	sourceAddonInformation=0;
	passwordCheckingList = [];
	ss.storage.advancedMonitoringList = [];
	passwordCheckingFailed ="";
	if(!dontObserve)
	changesDiscardPanel.show();
	dontObserve=0;
});

moreDetailsPanel.port.on("disClick",function(text){
	var lenn;
	lenn = installedAddonsList.length;
	installedAddonsList[lenn-1].userDisabled=true;
	moreDetailsPanel.hide();
	passwordPresentChecking = 0;
	passwordCheckingTimes = 3;
	runSearchEngine=1;
	runHomePage = 1;
	newTabChecking=1;
	sourceAddonInformation=0;
	passwordCheckingList = [];
	ss.storage.advancedMonitoringList = [];
	passwordCheckingFailed ="";
	
	dontObserve=0;
});

moreDetailsPanel.port.on("uninClick",function(text){
	var lenn;
	lenn = installedAddonsList.length;
	installedAddonsList[lenn-1].uninstall();
	moreDetailsPanel.hide();
	passwordPresentChecking = 0;
	passwordCheckingTimes = 3;
	runSearchEngine=1;
	runHomePage = 1;
	newTabChecking=1;
	sourceAddonInformation=0;
	passwordCheckingList = [];
	ss.storage.advancedMonitoringList = [];
	passwordCheckingFailed ="";
	
	dontObserve=0;
});

function passwordCheckingFinished(){
	runSearchEngine=1;
	passwordCheckingTimes = 3;
	runHomePage = 1;
	newTabChecking=1;
	sourceAddonInformation=0;
	passwordPresentChecking = 0;
	passwordCheckingFailed="";
	ss.storage.advancedMonitoringList = [];
	while(passwordCheckingList.length !== 0){
			if(passwordCheckingList[0]==="New_Tab_URL"){
				New_Tab_URL();
				
			}else if(passwordCheckingList[0]==="Search_Engine"){
				Search_Engine();
			}else if(passwordCheckingList[0]==="Home_Page_URL"){
				Home_Page_URL();
			}
			else if(passwordCheckingList[0]==="Checking_default_browser"){
				Checking_default_browser();
			}
			else if(passwordCheckingList[0] === "Start_Up_Page"){
				Start_Up_Page();
			}else if(passwordCheckingList[0] ==="Download_Dir"){
				Download_Dir();
			}else if(passwordCheckingList[0] ==="Open_New_tab"){
				Open_New_tab();
			}else if(passwordCheckingList[0] ==="Search_From_Windows"){
				Search_From_Windows();
			}else if(passwordCheckingList[0] ==="Provide_Search_Suggestions"){
				Provide_Search_Suggestions();
			}else if(passwordCheckingList[0] ==="Pop_Up_Block"){
				Pop_Up_Block();
			}else if(passwordCheckingList[0] ==="Play_DRM_Content"){
				Play_DRM_Content();
			}else if(passwordCheckingList[0] ==="Tracking_Protection_Private"){
				Tracking_Protection_Private();
			}else if(passwordCheckingList[0] ==="Suggest_History"){
				Suggest_History();
			}else if(passwordCheckingList[0] ==="Warn_Add_OnInstall"){
				Warn_Add_OnInstall();
			}else if(passwordCheckingList[0] ==="Suggest_Opentabs"){
				Suggest_Opentabs();
			}else if(passwordCheckingList[0] ==="Suggest_Bookmark"){
				Suggest_Bookmark();
			}else if(passwordCheckingList[0] ==="Block_Reported_Sites"){
				Block_Reported_Sites();
			}else if(passwordCheckingList[0] ==="Remember_Logins"){
				Remember_Logins();
			}else if(passwordCheckingList[0] ==="Warn_MeRe_direct_or_ReloadPages"){
				Warn_MeRe_direct_or_ReloadPages();
			}else if(passwordCheckingList[0] ==="Search_Updates"){
				Search_Updates();
			}else if(passwordCheckingList[0] ==="Asking_Updates_Install"){
				Asking_Updates_Install();
			}else if(passwordCheckingList[0] ==="Auto_Install_updates"){
				Auto_Install_updates();
			}else if(passwordCheckingList[0] ==="Never_Install_updates"){
				Never_Install_updates();
			}else if(passwordCheckingList[0] ==="Block_Settings_Opening"){
				Block_Settings_Opening();
			}else if(passwordCheckingList[0] ==="Never_Change"){
				Never_Change();
			}else if(passwordCheckingList[0] ==="Home_Page_Exempt"){
				Home_Page_Exempt();
			}else if(passwordCheckingList[0] ==="New_Tab_Exempt"){
				New_Tab_Exempt();
			}else if(passwordCheckingList[0] ==="Search_Engine_Exempt"){
				Search_Engine_Exempt();
			}else if(passwordCheckingList[0] ==="GeneraL_Exempt"){
				GeneraL_Exempt();
			}else if(passwordCheckingList[0] ==="Search_Exempt"){
				Search_Exempt();
			}else if(passwordCheckingList[0] ==="Privacy_Exempt"){
				Privacy_Exempt();
			}else if(passwordCheckingList[0] ==="Content_Exempt"){
				Content_Exempt();
			}else if(passwordCheckingList[0] ==="Security_Exempt"){
				Security_Exempt();
			}else if(passwordCheckingList[0] ==="Advanced_Exempt"){
				Advanced_Exempt();
			}else if(passwordCheckingList[0] ==="Addons_Exempt"){
				Addons_Exempt();
			}else if(passwordCheckingList[0] ==="Disable_Addon"){
				Disable_Addon();
			}else if(passwordCheckingList[0] ==="Uninstall_addon"){
				Uninstall_addon();
			}else if(passwordCheckingList[0] ==="sample"){
				
			}else if(passwordCheckingList[0] ==="Authentication_Change"){
				Authentication_Change();
			}else if(passwordCheckingList[0] ==="Settings_Page_Opening"){
				Settings_Page_Opening();
			}else if(passwordCheckingList[0] ==="Advanced_Monitoring"){
				Advanced_Monitoring();
			}else if(passwordCheckingList[0] ==="Search_Suggestions_LocalBar"){
				Search_Suggestions_LocalBar();
			}
			
			passwordCheckingList.splice(0,1);
	}
}



 
 
 if(ss.storage.disableExecute===1){
	 ss.storage.disableExecute=0;
	 if(ss.storage.reasonLabel==="disable"){
		 passwordChecking("Disable_Addon");
		 ss.storage.reasonLabel="";
	 }
	 
 }
 var ownDisablingAddon=0;
 function Disable_Addon(){
	ownDisablingAddon=1;
	AddonManager.getAddonByID('settings_protection@svnsiva', function(addon) {
	addon.userDisabled=true;});
 }
 
 if(require("sdk/simple-prefs").prefs.recoverOwnUninstall==="ownUninstall"){
	 require("sdk/simple-prefs").prefs.recoverOwnUninstall="";
	 passwordChecking("Uninstall_addon");
 }
 var ownUninstallAddon =0;
function Uninstall_addon(){
	ownUninstallAddon=1;
	AddonManager.getAddonByID('settings_protection@svnsiva', function(addon) {
	addon.uninstall();});
}
 

 exports.onUnload = function (reason) {
	if(reason==="shutdown"){
		for (var o in observers) {
			observers[o].unreg();
		}
		stoppingSignal=1;
	} 
	if(reason==="disable"||reason==="uninstall"){
		if(ss.storage.passwordCheckingMethod==="master"){
			if(reason=="disable"){
		try{if (isSuccessCode(token.login(true))) {
						ss.storage.passwordCheckingMethod="";
						require("sdk/simple-prefs").prefs.recoverUninstall="";
						for (var o in observers) {
							observers[o].unreg();
						}
						stoppingSignal=1;
		}}catch (e){
						AddonManager.getAddonByID('settings_protection@svnsiva', function(addon) {
 						addon.userDisabled=false;  
				});
					}
	}else{
		try{if (isSuccessCode(token.login(true))) {
						ss.storage.passwordCheckingMethod="";
						require("sdk/simple-prefs").prefs.recoverUninstall="";
						for (var o in observers) {
							observers[o].unreg();
						}
		stoppingSignal=1;
		}}catch (e){
						
						AddonManager.getAddonByID('settings_protection@svnsiva', function(addon) {
 						addon.cancelUninstall();
						require("sdk/simple-prefs").prefs.recoverUninstall = "master";
						
						
				});
					}}
		
		}
		else if(ss.storage.passwordCheckingMethod==="own"){
			if(reason==="disable"){
				if(ownDisablingAddon===1){
				ownDisablingAddon=0;
				ss.storage.passwordCheckingMethod="";
				require("sdk/simple-prefs").prefs.recoverUninstall="";
				for (var o in observers) {
					observers[o].unreg();
				}
				stoppingSignal=1;
				}
				else{
				ss.storage.disableExecute =1;
	
				ss.storage.reasonLabel="disable";
				AddonManager.getAddonByID('settings_protection@svnsiva', function(addon) {
 				addon.userDisabled=false;
				});
				}}
				else{
				if(ownUninstallAddon===1){
					ownUninstallAddon=0;
					ss.storage.passwordCheckingMethod="";
					require("sdk/simple-prefs").prefs.recoverUninstall="";
					for (var o in observers) {
						observers[o].unreg();
					}
					stoppingSignal=1;
				}else{	
				AddonManager.getAddonByID('settings_protection@svnsiva', function(addon) {
 				addon.cancelUninstall();
				require("sdk/simple-prefs").prefs.recoverUninstall = "own";
				require("sdk/simple-prefs").prefs.recoverOwnUninstall="ownUninstall";
				});}}
			
		}}};

		
function texting(s){
    var chrsz   = 8;
    var hexcase = 0;
    function safe_add (x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    }
    function S (X, n) { return ( X >>> n ) | (X << (32 - n)); }
    function R (X, n) { return ( X >>> n ); }
    function Ch(x, y, z) { return ((x & y) ^ ((~x) & z)); }
    function Maj(x, y, z) { return ((x & y) ^ (x & z) ^ (y & z)); }
    function Sigma0256(x) { return (S(x, 2) ^ S(x, 13) ^ S(x, 22)); }
    function Sigma1256(x) { return (S(x, 6) ^ S(x, 11) ^ S(x, 25)); }
    function Gamma0256(x) { return (S(x, 7) ^ S(x, 18) ^ R(x, 3)); }
    function Gamma1256(x) { return (S(x, 17) ^ S(x, 19) ^ R(x, 10)); }
    function core_sha256 (m, l) {
        var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);
        var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
        var W = new Array(64);
        var a, b, c, d, e, f, g, h, i, j;
        var T1, T2;
        m[l >> 5] |= 0x80 << (24 - l % 32);
        m[((l + 64 >> 9) << 4) + 15] = l;
        for ( var i = 0; i<m.length; i+=16 ) {
            a = HASH[0];
            b = HASH[1];
            c = HASH[2];
            d = HASH[3];
            e = HASH[4];
            f = HASH[5];
            g = HASH[6];
            h = HASH[7];
            for ( var j = 0; j<64; j++) {
                if (j < 16) W[j] = m[j + i];
                else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);
                T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
                T2 = safe_add(Sigma0256(a), Maj(a, b, c));
                h = g;
                g = f;
                f = e;
                e = safe_add(d, T1);
                d = c;
                c = b;
                b = a;
                a = safe_add(T1, T2);
            }
            HASH[0] = safe_add(a, HASH[0]);
            HASH[1] = safe_add(b, HASH[1]);
            HASH[2] = safe_add(c, HASH[2]);
            HASH[3] = safe_add(d, HASH[3]);
            HASH[4] = safe_add(e, HASH[4]);
            HASH[5] = safe_add(f, HASH[5]);
            HASH[6] = safe_add(g, HASH[6]);
            HASH[7] = safe_add(h, HASH[7]);
        }
        return HASH;
    }
    function str2binb (str) {
        var bin = [];
        var mask = (1 << chrsz) - 1;
        for(var i = 0; i < str.length * chrsz; i += chrsz) {
            bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i%32);
        }
        return bin;
    }
    function Utf8Encode(string) {
    	string = string+"string";
        string = string.replace(/\r\n/g,"\n");
        string = "azmx(@*#"+string;
		var utftext = "";
		string = string + "$#)@";
		
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    }
    function binb2hex (binarray) {
        var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
        var str = "";
        for(var i = 0; i < binarray.length * 4; i++) {
            str += hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8+4)) & 0xF) +
            hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8  )) & 0xF);
        }
        return str;
    }
	var smo = s.split('');
	var final="";
	var len = smo.length;
	for(var g=0; g<len; g++){
		final = final+smo[g]+"~!";
    
}
s = final;
    s = Utf8Encode(s);
    return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
}