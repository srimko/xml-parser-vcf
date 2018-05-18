var API=null;var keyList = new Array(25);var valueList = new Array(25);function fillKeyList(){ keyList[0] = "cmi.core.student_id"; keyList[1] = "cmi.core.student_name"; keyList[2] = "cmi.core.lesson_location"; keyList[3] = "cmi.core.credit"; keyList[4] = "cmi.core.entry"; keyList[5] = "cmi.core.score.raw"; keyList[6] = "cmi.core.score.max"; keyList[7] = "cmi.core.score.min"; keyList[8] = "cmi.core.total_time"; keyList[9] = "cmi.core.lesson_mode"; keyList[10] = "cmi.core.exit"; keyList[11] = "cmi.core.session_time"; keyList[12] = "cmi.core.score._children"; keyList[13] = "cmi.student_preference._children"; keyList[14] = "cmi.student_preference.audio"; keyList[15] = "cmi.student_preference.language"; keyList[16] = "cmi.student_preference.speed"; keyList[17] = "cmi.student_preference.text"; keyList[18] = "cmi.student_data.mastery_score"; keyList[19] = "cmi.student_data.max_time_allowed"; keyList[20] = "cmi.student_data.time_limit_action"; keyList[21] = "cmi.comments_from_lms"; keyList[22] = "cmi.comments";}function fillValueList(){ valueList[0] = "cmi.learner_id"; valueList[1] = "cmi.learner_name"; valueList[2] = "cmi.location"; valueList[3] = "cmi.credit"; valueList[4] = "cmi.entry"; valueList[5] = "cmi.score.raw"; valueList[6] = "cmi.score.max"; valueList[7] = "cmi.score.min"; valueList[8] = "cmi.total_time"; valueList[9] = "cmi.mode"; valueList[10] = "cmi.exit"; valueList[11] = "cmi.session_time"; valueList[12] = "cmi.score._children"; valueList[13] = "cmi.learner_preference._children"; valueList[14] = "cmi.learner_preference.audio_level"; valueList[15] = "cmi.learner_preference.language"; valueList[16] = "cmi.learner_preference.delivery_speed"; valueList[17] = "cmi.learner_preference.audio_captioning"; valueList[18] = "cmi.scaled_passing_score"; valueList[19] = "cmi.max_time_allowed"; valueList[20] = "cmi.time_limit_action"; valueList[21] = "cmi.comments_from_lms.0.comment"; valueList[22] = "cmi.comments_from_learner.0.comment";}function getNewValue(key){ var keyResult = key; var checkValue = keyResult.substring(0,16); if ( checkValue == "cmi.interactions" ) { checkValue2 = keyResult.substring(19,23); if ( checkValue2 == "time" ) { var subString1 = keyResult.substring(0,19); keyResult = subString1 + "timestamp"; } else if ( checkValue2 == "stud" ) { var subString1 = keyResult.substring(0,19); keyResult = subString1 + "learner_response"; } } for ( i=0; i < keyList.length; i++ ) { if ( keyList[i] == key ) { keyResult = valueList[i]; break; } } return keyResult;}var errorList = new Array(25);var errorStringList = new Array(25);var newErrorList = new Array(25);var errorcodeList = new Array(25);function fillErrorList(){ errorList[0] = "0"; errorList[1] = "101"; errorList[2] = "101"; errorList[3] = "101"; errorList[4] = "101"; errorList[5] = "101"; errorList[6] = "301"; errorList[7] = "101"; errorList[8] = "122"; errorList[9] = "101"; errorList[10] = "301"; errorList[11] = "101"; errorList[12] = "301"; errorList[13] = "143"; errorList[14] = "201"; errorList[15] = "101"; errorList[16] = "101"; errorList[17] = "101"; errorList[18] = "401"; errorList[19] = "401"; errorList[20] = "301"; errorList[21] = "403"; errorList[22] = "404"; errorList[23] = "405"; errorList[24] = "405"; errorList[25] = "405";}function fillnewErrorList(){ newErrorList[0] = "0"; newErrorList[1] = "101"; newErrorList[2] = "102"; newErrorList[3] = "103"; newErrorList[4] = "104"; newErrorList[5] = "111"; newErrorList[6] = "112"; newErrorList[7] = "113"; newErrorList[8] = "122"; newErrorList[9] = "123"; newErrorList[10] = "132"; newErrorList[11] = "133"; newErrorList[12] = "142"; newErrorList[13] = "143"; newErrorList[14] = "201"; newErrorList[15] = "301"; newErrorList[16] = "351"; newErrorList[17] = "391"; newErrorList[18] = "401"; newErrorList[19] = "402"; newErrorList[20] = "403"; newErrorList[21] = "404"; newErrorList[22] = "405"; newErrorList[23] = "406"; newErrorList[24] = "407"; newErrorList[25] = "408";}function fillErrorStringList(){ errorStringList[0] = "No error"; errorStringList[1] = "General Exception"; errorStringList[2] = "Invalid Augment error"; errorStringList[3] = "Element Cannot have Children"; errorStringList[4] = "Element not an array - cannot have count"; errorStringList[5] = "Not Initialized"; errorStringList[6] = "Not implemented error"; errorStringList[7] = "Invalid set value, element is a keyword"; errorStringList[8] = "Element is read only"; errorStringList[9] = "Element is write only"; errorStringList[10] = "Incorrect Data Type";} function fillErrorCodeList(){ errorcodeList[0] = "0"; errorcodeList[1] = "101"; errorcodeList[2] = "201"; errorcodeList[3] = "202"; errorcodeList[4] = "203"; errorcodeList[5] = "301"; errorcodeList[6] = "401"; errorcodeList[7] = "402"; errorcodeList[8] = "403"; errorcodeList[9] = "404"; errorcodeList[10] = "405";} function initializeConversionTables(){ fillKeyList(); fillValueList(); fillErrorList(); fillnewErrorList(); fillErrorCodeList(); fillErrorStringList();}function getOldErrorValue(error){ var result = error; for ( i=0; i < newErrorList.length; i++ ){ if ( newErrorList[i] == error ) { result = errorList[i]; break; } } return result;}function childrenGetRequest(name, elementRequestArr){ var childrenListing = ""; if ( name == "cmi.core._children" ){ childrenListing = "student_id,student_name,lesson_location,credit," + "lesson_status,entry, score,total_time,lesson_mode," + "exit,session_time"; } else if ( name == "cmi.core.score._children" ){ childrenListing = "raw,min,max"; } else if ( name == "cmi.student_data._children" ){ childrenListing = "mastery_score,max_time_allowed,time_limit_action"; } else if ( name == "cmi.objectives._children" ){ childrenListing = "id,score,status"; } else if ( name == "cmi.student_preference._children" ){ childrenListing = "audio,language,speed,text"; } else if ( name == "cmi.interactions._children" ){ childrenListing = "id,objectives,time,type,correct_responses,weighting," + "student_response,result,latency"; } else if ( name == "cmi.objectives." +elementRequestArr[2] + ".score._children" ){ childrenListing = "raw,min,max"; } return childrenListing;}function APIAdapter12(){this.LMSInitialize=LMSInitialize;this.LMSGetValue=LMSGetValue;this.LMSSetValue=LMSSetValue;this.LMSCommit=LMSCommit;this.LMSFinish=LMSFinish;this.LMSGetLastError=LMSGetLastError;this.LMSGetErrorString=LMSGetErrorString;this.LMSGetDiagnostic=LMSGetDiagnostic;}function LMSInitialize(strParametre){initializeConversionTables();return API_1484_11.Initialize(strParametre);}function LMSCommit(strParametre){return API_1484_11.Commit(strParametre);}function LMSFinish(strParametre){/*if (PF_attr(API_1484_11.cmi,"exit")==""){API_1484_11.SetValue("adl.nav.request","continue");}*/return API_1484_11.Terminate(strParametre);}function LMSGetLastError(strParametre){return getOldErrorValue(API_1484_11.GetLastError(strParametre));}function LMSGetErrorString(strParametre){return API_1484_11.GetErrorString(strParametre);}function LMSGetDiagnostic(strParametre){return API_1484_11.GetDiagnostic(strParametre);}function LMSGetValue(name){API_1484_11.errorCode="0";var nomMaj = getNewValue(name);var elementRequestArr = name.split(".");var tempArrCount = elementRequestArr.length - 1; if (elementRequestArr[tempArrCount]=="_children" ){var resu=childrenGetRequest(name, elementRequestArr); return resu;}if (nomMaj=="cmi.core.lesson_status"){var reqsco=API_1484_11.GetValue("cmi.success_status");if (reqsco=="passed"||reqsco=="failed"){return reqsco;}reqsco=API_1484_11.GetValue("cmi.completion_status");if (reqsco=="unknown"){reqsco="not attempted";} return reqsco;}if (nomMaj=="cmi.total_time"){var valtemp=API_1484_11.GetValue(nomMaj);if (valtemp!=""){var ms0=Math.round(intervalleEnMS12(valtemp)/1000);valtemp=formaterSecondes12(ms0);}return valtemp;}if (nomMaj=="cmi.max_time_allowed"){var valtemp=API_1484_11.GetValue(nomMaj);if (valtemp!=""){var ms0=Math.round(intervalleEnMS12(valtemp)/1000);valtemp=formaterSecondes12(ms0);}return valtemp;}var resu=API_1484_11.GetValue(nomMaj);if (API_1484_11.errorCode=="403"){API_1484_11.errorCode="0";}if (nomMaj=="cmi.scaled_passing_score" && resu!="" && !isNaN(Number(resu))){resu=Number(resu)*100;}return resu;}function LMSSetValue(name,val){if (API_1484_11==null){API=null;return "false";}API_1484_11.errorCode="0";var nomMaj = getNewValue(name); if (name=="cmi.core.lesson_status"){if (EXISTE_PREREQUIS){API_1484_11.appliquerResultatDansSeq();actualiserAffichagePlan12();} if (val=="completed"||val =="incomplete"||val=="not attempted"){ nomMaj="cmi.completion_status"; if (val=="completed" && API_1484_11.GetValue("cmi.success_status")=="unknown"){ API_1484_11.SetValue("cmi.success_status","passed"); } } else if (val == "passed"||val == "failed"){ nomMaj="cmi.success_status"; API_1484_11.SetValue("cmi.completion_status","completed"); } else if (val == "browsed"){ return "true"; } var resF=API_1484_11.SetValue(nomMaj,val); if (EXISTE_PREREQUIS){API_1484_11.appliquerResultatDansSeq();actualiserAffichagePlan12();} return resF; } else if (name=="cmi.core.score.raw"){ if (!isNaN(val)){ var scoreMax=API_1484_11.GetValue("cmi.score.max"); envoiScoreScaled("cmi.score.scaled",val,scoreMax); } } else if (name=="cmi.core.score.max"){ if (!isNaN(val)){ var scoreRaw=API_1484_11.GetValue("cmi.score.raw"); if (scoreRaw!=""){ envoiScoreScaled("cmi.score.scaled",scoreRaw,val); } } }else if (name=="cmi.core.session_time"){ val = temps12En2004(val); }else if (name.indexOf("cmi.interactions")==0){ if (name.indexOf(".time")>0){ nomMaj=name.replace("time","timestamp"); var now = new Date(); var year = now.getYear(); var month = now.getMonth()+1; if ( month <= 9 ){ month = "0" + month; } var day = now.getDate(); if ( day <= 9 ){ day = "0" + day; } val = year+"-"+month+"-"+day+"T"+val; } else if (name.indexOf(".student_response")>0){ nomMaj=name.replace("student_response","learner_response"); var ltype=API_1484_11.GetValue(name.replace("student_response","type")); if (ltype=="choice"||ltype=="sequencing"){ val=val.replace(/,/g,"[,]"); } else if (ltype=="matching"){ val=val.replace(/-/g,"[.]"); val=val.replace(/,/g,"[,]"); } } else if (name.indexOf(".result")>0&&val=="wrong"){ val="incorrect"; } else if (name.indexOf(".latency")>0){ val = temps12En2004(val); } } else if (name.indexOf("cmi.objectives")==0){ if (name.indexOf(".status")>0){ if (val=="completed" || val=="incomplete" || val=="not attempted"){ nomMaj=name.replace("status","completion_status"); } else { nomMaj=name.replace("status","success_status"); } } else if (name.indexOf(".score.raw")>0){ var scoreMax=API_1484_11.GetValue(name.replace(".raw",".max")); envoiScoreScaled(name.replace(".raw",".scaled"),val,scoreMax); } else if (name.indexOf(".score.max")>0){ var scoreRaw=API_1484_11.GetValue(name.replace(".max",".raw")); if (scoreRaw!=""){ envoiScoreScaled(name.replace(".max",".scaled"),scoreRaw,val); } }} return API_1484_11.SetValue(nomMaj,val);}function envoiScoreScaled(vattr,raw,max){if (max==""){max="100";}var scoreScaled=raw/Number(max);scoreScaled=new String(scoreScaled);if (scoreScaled.length>5){scoreScaled=scoreScaled.substring(0,5);}API_1484_11.SetValue(vattr,scoreScaled);}function temps12En2004(val){var timeArray = val.split(":"); var hours = timeArray[0]; var minutes = timeArray[1]; var seconds = timeArray[2]; if (seconds.indexOf(".")>0){seconds=seconds.substring(0,seconds.indexOf("."));} return "PT" + hours + "H" + minutes + "M" + seconds + "S";}function blocagePrerequis(oItem){if (!EXISTE_PREREQUIS){return false;}var objDansitem=XML_filsNS(oItem,"adlcp","prerequisites");if (objDansitem!=null){var expression=XML_texteNoeud(objDansitem);if (expression!=""){ var regle=new RegExp('(\\w|-|\\.)+',""); var prendPas="not,attempted,incomplete,browsed,completed,passed,failed,";var debut="";var fin=expression;var n=0;var offs=expression.search(regle);while ((offs>=0)&&(n<100)){var tlemot=fin.match(regle);var lemot=tlemot[0];debut+=fin.substring(0,offs);fin=fin.substring(lemot.length+offs);if (prendPas.indexOf(lemot+',')<0){var derCar=fin.substring(0,1);if ((derCar=='=')||(derCar=='<')){lemot="statutPrerequis('"+lemot+"')";} else {lemot="testPrerequis('"+lemot+"')";}}n++;offs=fin.search(regle);debut+=lemot;}expression=debut+fin; expression=expression.replace(/&/g,'&&'); expression=expression.replace(/\|/g,'||'); expression=expression.replace(/~/g,'!'); expression=expression.replace(/=/g,'=='); expression=expression.replace(/<>/g,'!=');if (!eval(expression)){return true;}}} var oTmp=oItem.parentNode; while (oTmp!=null&&oItem.nodeType==1){ if (blocagePrerequis(oTmp)){return true;} oTmp=oTmp.parentNode; } return false;}function testPrerequis(idItem){var negatif=false;if (idItem.indexOf('!')==0){negatif=true;idItem=idItem.substring(1,idItem.length);}var oPre=XML_trouveNoeud(planLMS.itemRacine,"item","identifier",idItem);var res=true;if (oPre!=null){res=false;if (PF_attr(oPre,"attemptProgressStatus")=="true"&&PF_attr(oPre,"attemptCompletionStatus")=="true"){res=true;}var objectifCible=planLMS.donneObjectifCible(oPre,false);if (objectifCible!=null && PF_attr(objectifCible,"objectiveProgressStatus")=="true"){if (PF_attr(objectifCible,"objectiveSatisfiedStatus")=="true"){res=true;}if (PF_attr(objectifCible,"objectiveSatisfiedStatus")=="false"){res=false;}}}if (negatif){res=!res}return res;} function statutPrerequis(idItem){var res="";var oPre=XML_trouveNoeud(planLMS.itemRacine,"item","identifier",idItem);if (oPre!=null){res="not attempted";if (PF_attr(oPre,"attemptProgressStatus")=="true"){if (PF_attr(oPre,"attemptCompletionStatus")=="true"){res="completed";}if (PF_attr(oPre,"attemptCompletionStatus")=="false"){res="incomplete";}}var objectifCible=planLMS.donneObjectifCible(oPre,false);if (objectifCible!=null && PF_attr(objectifCible,"objectiveProgressStatus")=="true"){if (PF_attr(objectifCible,"objectiveSatisfiedStatus")=="true"){res="passed";}if (PF_attr(objectifCible,"objectiveSatisfiedStatus")=="false"){res="failed";}}}return res;}function afficherParcoursItem12(oItem){if (!EXISTE_PREREQUIS){return;}planLMS.desactiverItemPlan(oItem,blocagePrerequis(oItem));var tabFils=planLMS.donneLesFils(oItem,"item");var conteneur=planLMS.PF_donneObjet('divFils'+oItem.getAttribute("nom"));if (conteneur!=null && conteneur.style.display!="none" && conteneur.offsetHeight>5){for (var j=0;j<tabFils.length;j++){afficherParcoursItem12(tabFils[j]);}}}function actualiserAffichagePlan12(){for (var i=0;i<planLMS.tabItemsVerif.length;i++){var oitem=XML_trouveNoeud(planLMS.itemRacine,"item","identifier",planLMS.tabItemsVerif[i]);if (oitem){oitem.removeAttribute("planDejaFait");}}window.planLMS.PLAN_afficheParcours(false);}function LMS_synchroActive(){return false;}function formaterSecondes12(ts){ var sec = (ts % 60); ts -= sec; var tmp = (ts % 3600); ts -= tmp; sec = Math.round(sec); var hour,min; if ((ts % 3600) != 0 ) hour = 0; else hour = (ts / 3600); if ( (tmp % 60) != 0 ) min = 0; else min = (tmp / 60); if (sec<10){sec="0"+new String(sec);} if (min<10){min="0"+new String(min);} if (hour<10){hour="0"+new String(hour);} return hour+":"+min+":"+sec;}function intervalleEnMS12(t){ var strTemps=new String(t); strTemps=strTemps.substring(strTemps.indexOf('T')+1); var indY=strTemps.indexOf("H"); var heures=0; if (indY>0){ heures=parseInt(strTemps.substring(0,indY),10); strTemps=strTemps.substring(indY+1); } indY=strTemps.indexOf("M"); var min=0; if (indY>0){ min=parseInt(strTemps.substring(0,indY),10); strTemps=strTemps.substring(indY+1); } indY=strTemps.indexOf("S"); var sec=0; if (indY>0){ sec=parseInt(strTemps.substring(0,indY),10); } return ((heures*3600)+(min*60)+sec)*1000;}var EXISTE_PREREQUIS=false;var lesitems0=XML_listeParBalise(planLMS.itemRacine,"item");for (var i=0;i<lesitems0.length;i++){var itemTmp=lesitems0[i];var objDansitem=XML_filsNS(itemTmp,"adlcp","prerequisites");if (objDansitem!=null){EXISTE_PREREQUIS=true;planLMS.tabItemsVerif.push(itemTmp.getAttribute("identifier"));}}lesitems0=null;API=new APIAdapter12();if (SUR_CHORUS){window.haut.location="menu.html";}else {window.haut.location=RACINE_stage+"MosMtr/gen/menu.html";}
