function ExerciceEXP(multi,voirZones) { this.indications; this.commentaireSucces=null; this.consigne=null; this.tabItems; this.tabStylesR; this.tabSelections; this.tabIdZones; this.scoreCourant=0; this.scoreTotal; this.scoreMin=0;this.scoreMaxPoids;this.scoreV; this.scoreF; this.valide=false; this.titre=''; this.actif=true; this.multi=multi; this.voirZones=voirZones; this.type="EXP"; this.reponsesFlash=""; this.poidsEnPoints=false;this.niveauCertitude=-1;this.existeClasseCorrection=false;this.existeClasseSuggRef=false;this.init=exo_init;this.initEchelleScore=exo_initEchelleScore;this.valider=exo_valider;this.action=exo_action;this.entreeSouris=exo_entreeSouris; this.sortieSouris=exo_sortieSouris; this.initialiser=exo_initialiser; this.desactiver=exo_desactiver; this.compterMultiple=exo_compterMultiple;this.solutions=exo_solutions;this.donneSuggestion=exo_donneSuggestion;this.donneTabReponses=exo_donneTabReponses;this.donneItem=exo_donneItem;this.afficherMesReponses=exo_afficherMesReponses;this.corrigerReponses=exo_corrigerReponses;this.enleverCorrection=exo_enleverCorrection;this.marquerSuggestionRef=exo_marquerSuggestionRef;this.effacerMarqueSuggestionRef=exo_effacerMarqueSuggestionRef;}function exo_init(){ this.titre=document.title;this.tabItems=new Array();this.indications= new Array(); if (!this.voirZones){var oCtn=PF_donneObjet("STY_texteEXP");if (oCtn!=null){oCtn.onclick=detecteExp;}}this.existeClasseCorrection=classeCSSExiste(".STY_zoneExploreSol");this.existeClasseSuggRef=classeCSSExiste(".STY_zoneExploreSuggRef");} function exo_initEchelleScore(){var scoreMaxPoids=0;if (this.poidsEnPoints){var poidsMax=-9999;var poidsMin=9999;for (var i=0;i<this.tabItems.length;i++){var oItem=this.tabItems[i];if (oItem.poids>poidsMax){poidsMax=oItem.poids;}if (oItem.poids<poidsMin){poidsMin=oItem.poids;}}this.scoreMaxPoids=poidsMax;this.scoreTotal=poidsMax;this.scoreMin=poidsMin;} else {for (var i=0;i<this.tabItems.length;i++){var oItem=this.tabItems[i];if (oItem.estJuste){scoreMaxPoids+=oItem.poids;}}this.scoreMaxPoids=scoreMaxPoids;if (!parent.oSco.scoreBinaire && scoreMaxPoids!=0 && parent.oSco.penaliserMauvaiseReponse){this.scoreMin=this.scoreTotal*-1;}}if (parent.oSco.config_navigateur=="IE"){for (var i=0;i<this.tabItems.length;i++){var oItem=this.tabItems[i];var ozz=PF_donneObjet(oItem.idZone);var txtF=imageFondCSS("."+ozz.className);if (txtF.indexOf("url(")==0){ozz.style.backgroundImage=txtF.replace("url(../","url(../../MosMtr/ressources/style/");}}}}function exo_valider(){if (exerciceFlash){var obj=donneObjetFlash();if (obj!=null){try {obj.MOS_submitExercise();} catch(ex){}}} else {this.scoreCourant=this.compterMultiple();}if (this.scoreCourant>=this.scoreTotal){this.valide=true;}appliquerNiveauCertitude(this);for (var i=0;i<this.tabItems.length;i++){var oItem=this.tabItems[i];if (oItem.objectif!=""){var compteObj=parent.SCO_compteCMI("cmi.objectives");var indexAjoute=compteObj;for (var t=0;t<compteObj;t++){if (parent.APIgetValue("cmi.objectives."+t+".id")==oItem.objectif){indexAjoute=t;t=999;}}var statut="failed";if (oItem.selectionne){statut="passed";}if (indexAjoute==compteObj){parent.APIsetValue("cmi.objectives."+indexAjoute+".id",oItem.objectif);}parent.APIsetValue("cmi.objectives."+indexAjoute+".success_status",statut);}}}function exo_action(idRep){if (this.actif && !exerciceFlash){var oItem=this.donneItem(idRep);if (!this.multi && oItem.selectionne && parent.oSco.forcerReponse){return false;}if (!this.multi && !oItem.selectionne){this.initialiser(); }if (!oItem.selectionne){oItem.selectionne=true;if (this.voirZones){ PF_changeClasse(oItem.idZone,"STY_zoneExploreDessus"); }} else {oItem.selectionne=false;if (this.voirZones){ PF_changeClasse(oItem.idZone,"STY_zoneExplore");}}appliquerRafaleClassesImgFond(oItem.idZone);if (!this.multi){EXO_validerAuto();}if (this.multi && parent.oSco.forcerReponse){var existeReponse=false;for (var i=0;i<this.tabItems.length;i++){if (this.tabItems[i].selectionne){existeReponse=true;}}if (existeReponse){actionDetecte();}else if (actionD){actionD=false;desactiverBoutonValider();desactiverBoutonInit();}} else {actionDetecte();}}}function exo_sortieSouris(idRep){var oItem=this.donneItem(idRep);if (!oItem.selectionne && this.actif){var ajoutSugg="";if (this.existeClasseSuggRef && PF_donneObjet(oItem.idZone).className.indexOf("STY_zoneExploreSuggRef")>0){ajoutSugg=" STY_zoneExploreSuggRef";}if (this.existeClasseCorrection){var testc=PF_donneObjet(oItem.idZone).className;if (testc.indexOf("STY_zoneExploreFaux")>0){ajoutSugg+=" STY_zoneExploreFaux";}else if (testc.indexOf("STY_zoneExploreSol")>0){ajoutSugg+=" STY_zoneExploreSol";}}PF_changeClasse(oItem.idZone,"STY_zoneExplore"+ajoutSugg);appliquerRafaleClassesImgFond(oItem.idZone);}}function exo_entreeSouris(idRep){if (this.actif){var oItem=this.donneItem(idRep);var ajoutSugg="";if (this.existeClasseSuggRef && PF_donneObjet(oItem.idZone).className.indexOf("STY_zoneExploreSuggRef")>0){ajoutSugg=" STY_zoneExploreSuggRef";}if (this.existeClasseCorrection){var testc=PF_donneObjet(oItem.idZone).className;if (testc.indexOf("STY_zoneExploreFaux")>0){ajoutSugg+=" STY_zoneExploreFaux";}else if (testc.indexOf("STY_zoneExploreSol")>0){ajoutSugg+=" STY_zoneExploreSol";}}PF_changeClasse(oItem.idZone,"STY_zoneExploreDessus"+ajoutSugg);appliquerRafaleClassesImgFond(oItem.idZone);}}function exo_initialiser(){this.actif=true;for (var i=0;i<this.tabItems.length;i++) {var oItem=this.tabItems[i];oItem.selectionne=false;this.sortieSouris(oItem.idZone);}this.scoreCourant=0;this.valide=false;this.enleverCorrection();this.effacerMarqueSuggestionRef();if (exerciceFlash){var obj=donneObjetFlash();if (obj!=null){try {obj.MOS_resetExercise();} catch(ex){}}}}function exo_desactiver(){this.actif=false;if (exerciceFlash){var obj=donneObjetFlash();if (obj!=null){try {obj.MOS_disableExercise();} catch(ex){}}}}function exo_compterMultiple(){var score0=0;if (this.poidsEnPoints){for (var i=0;i<this.tabItems.length;i++){var oItem=this.tabItems[i];if (oItem.selectionne){return oItem.poids;}}}if (parent.oSco.penaliserMauvaiseReponse){for (var i=0;i<this.tabItems.length;i++){var oItem=this.tabItems[i];if (oItem.selectionne){if (oItem.estJuste){score0+=oItem.poids;} else {score0-=oItem.poids;}}}if (this.scoreMaxPoids==0){if (score0==0){score0=this.scoreTotal;}else {score0=0;}} else {score0=Math.round(score0/this.scoreMaxPoids*this.scoreTotal*10)/10;}} else {var poidTotalItm=0;for (var i=0;i<this.tabItems.length;i++){var oItem=this.tabItems[i];var oItem=this.tabItems[i];if (oItem.selectionne){if (oItem.estJuste){score0+=oItem.poids;}}if (oItem.estJuste||oItem.selectionne){poidTotalItm+=oItem.poids;}}if (poidTotalItm==0){score0=this.scoreTotal;}else {score0=Math.round(score0/poidTotalItm*this.scoreTotal*10)/10;}}if (score0<0 && !parent.oSco.scoreNegatif && !this.poidsEnPoints){score0=0;}if (score0<this.scoreMin){score0=this.scoreMin;}return score0;}function exo_corrigerReponses(montreFaux){if (exerciceFlash || !this.existeClasseCorrection){return;}if (montreFaux && !classeCSSExiste(".STY_zoneExploreFaux")){return;}var existeCssFaux=(montreFaux && classeCSSExiste(".STY_zoneExploreFaux"));for (var i=0;i<this.tabItems.length;i++){var lid=this.tabItems[i].idZone;var nclasse="STY_zoneExplore";if (this.tabItems[i].selectionne){nclasse="STY_zoneExploreDessus";}if (this.tabItems[i].estJuste){if (existeCssFaux){if (this.tabItems[i].selectionne){nclasse+=" STY_zoneExploreSol";} else {if (montrerFauxNonSelectionne){nclasse+=" STY_zoneExploreFaux";}}} else {nclasse+=" STY_zoneExploreSol";}} else if (existeCssFaux && this.tabItems[i].selectionne){nclasse+=" STY_zoneExploreFaux";}PF_changeClasse(lid,nclasse);appliquerRafaleClassesImgFond(lid);}}function appliquerRafaleClassesImgFond(lid){if (parent.oSco.config_navigateur!="IE"){return;}var obj=PF_donneObjet(lid);var tabClasses=obj.className.split(" ");for (var i=0;i<tabClasses.length;i++){appliqueImgFondIE(obj,tabClasses[i],(i>0));}}function exo_marquerSuggestionRef(ref){if (exerciceFlash || !this.existeClasseSuggRef){return;}if (!this.existeClasseSuggRef){return;}var oItem=this.donneItem("MosMap_ng"+ref);if (oItem==null){oItem=this.donneItem("MosMap_nw"+ref);}var oLien=PF_donneObjet(oItem.idZone);if (oLien.className.indexOf("STY_zoneExploreSuggRef")<0){oLien.className+=" STY_zoneExploreSuggRef";appliquerRafaleClassesImgFond(oItem.idZone);}}function exo_effacerMarqueSuggestionRef(){if (exerciceFlash || !this.existeClasseSuggRef){return;}for (var i=0;i<this.tabItems.length;i++){var nclasse="STY_zoneExplore";if (this.tabItems[i].selectionne){nclasse="STY_zoneExploreDessus";}PF_changeClasse(this.tabItems[i].idZone,nclasse);appliquerRafaleClassesImgFond(this.tabItems[i].idZone);}}function exo_enleverCorrection(){if (exerciceFlash || !this.existeClasseCorrection){return;}for (var i=0;i<this.tabItems.length;i++){var nclasse="STY_zoneExplore";if (this.tabItems[i].selectionne){nclasse="STY_zoneExploreDessus";}PF_changeClasse(this.tabItems[i].idZone,nclasse);appliquerRafaleClassesImgFond(this.tabItems[i].idZone);}}function exo_solutions(){if (!exerciceFlash && this.existeClasseCorrection){return this.corrigerReponses(false);}this.initialiser();this.actif=true;this.voirZones=true;for (var i=0;i<this.tabItems.length;i++){var oItem=this.tabItems[i];if (oItem.estJuste){this.action(oItem.idZone);}}if (exerciceFlash){var obj=donneObjetFlash();if (obj!=null){try {obj.MOS_displayCorrectAnswers();} catch(ex){}}}}function exo_donneSuggestion(){var res=null;var i=0;while (i<exo.indications.length){if (exo.indications[i].id.indexOf('divSugg')==0){var ref=exo.indications[i].ref;if (ref!=""){var oItem=this.donneItem("MosMap_ng"+ref);if (oItem==null){oItem=this.donneItem("MosMap_nw"+ref);}if (oItem!=null){if (oItem.selectionne &&(suggestionDejaAffiche.indexOf(exo.indications[i].id+',')<0)){res=exo.indications[i];break;}}}}i++;}if (res==null){i=0;while (i<exo.indications.length){if ((exo.indications[i].id.indexOf('divSugg')==0)&&(exo.indications[i].ref=='')&&(suggestionDejaAffiche.indexOf(exo.indications[i].id+',')<0)){res=exo.indications[i];break;}i++;}}return res;}function exo_donneTabReponses(){var tabRep=new Array();if (exerciceFlash && this.reponsesFlash!=""){var tabIntr=this.reponsesFlash.split("[/]");for (var i=0;i<tabIntr.length;i++){var tabParam=tabIntr[i].split("[;]");var tabInteraction=new Array();tabInteraction[0]=false;tabInteraction[1]=tabParam[3];tabInteraction[2]=tabParam[0];tabInteraction[3]="";tabInteraction[4]=tabParam[1];if (tabParam[2]=="correct"){tabInteraction[0]=true;}tabRep.push(tabInteraction);}} else {var tabInteraction=new Array();tabInteraction[0]=this.valide;var chReps="";var txtDesc="";for (var i=0;i<this.tabItems.length;i++){var oItem=this.tabItems[i];if (oItem.selectionne){if (chReps!=''){chReps+="[,]";}chReps+="ch"+oItem.idZone.substring(9);if (txtDesc!=''){txtDesc+=", ";}txtDesc+=oItem.label;if (oItem.label==""){txtDesc+=oItem.idZone.substring(9);}}}var typeSc="choice";if (exerciceFlash){chReps="Flash"+":"+this.scoreCourant;typeSc="performance";}tabInteraction[1]=chReps;tabInteraction[2]="exp";tabInteraction[3]=txtDesc;tabInteraction[4]=typeSc;tabRep[0]=tabInteraction;}return tabRep;}function exo_afficherMesReponses(tabRep){this.actif=true;if (tabRep.length==0){return false;}if (exerciceFlash){for (var i=0;i<parent.oSco.evaluation.questions.length;i++){if (parent.oSco.evaluation.questions[i].codePage==codePage){this.scoreCourant=parent.oSco.evaluation.questions[i].scoreAtteint;break;}}var obj=donneObjetFlash();if (obj!=null){try {obj.MOS_displayMyAnswers();} catch(ex){}}} else {var oInteraction=tabRep[0];var laRep=oInteraction.learner_response;var lesreps=laRep.split("[,]");for (var j=0;j<lesreps.length;j++){if (lesreps[j].length>1){var num=Number(lesreps[j].substring(2));var lidRec="MosMap_nw"+num;var oItemRecup=this.donneItem(lidRec);if (oItemRecup==null){lidRec="MosMap_ng"+num;}this.action(lidRec);}}}}function detecteExp(){if (exo.actif){actionDetecte();}}/* FLASH CALLS */function setScore(num){exo.scoreCourant=Number(num);}function getScoreMax(){return exo.scoreTotal;}function isInAssessment(){return etatEval;}function isInAssessmentReview(){return etatEval&&parent.oSco.evaluation.etatCorrige;}function isExerciseActive(){return exo.actif;}function exerciseActionDetected(){actionDetecte();}function enableSubmitButton(val){if (val){activerBoutonValider();} else {desactiverBoutonValider();}}function enableInitButton(val){if (val){activerBoutonInit();} else {desactiverBoutonInit();}}function submitExercise(){EXO_valider();}function resetExercise(){initialiser();}function ItemReponse() { this.selectionne=false;this.estJuste=false; this.idZone; this.poids=1;this.objectif;this.label;this.init=initItemReponse;}function initItemReponse(idZone,poi,objectif,label){this.idZone="MosMap_n"+decodeX(idZone);this.objectif=objectif;this.label=decodeX(label);if (this.idZone.indexOf("nw")>0){this.estJuste=true;}if (poi!=""){this.poids=Number(poi);}}function exo_donneItem(lid){var oRes=null;for (var i=0;i<this.tabItems.length;i++){if (this.tabItems[i].idZone==lid){oRes=this.tabItems[i];break;}}return oRes;}function doubleClicPgExercice(ccar){if (etatEval){return ;}if (ccar==33){STG_allerPrecedent();}if (ccar==34){if (actionD && !actionValider){EXO_valider();} else {STG_allerSuivant();}}}function actionTouchePgSuivante(glissade){if (glissade){if (etatSuivant && GEN_suivantPossible()){return STG_allerSuivant();}if (actionD && !exo.valide && exo.actif){return EXO_valider();}return;}if (actionValider){if (etatSuivant){ STG_allerSuivant();}} else {indexLienOuvert++;if (indexLienOuvert>=exo.tabItems.length){indexLienOuvert=0;}exo.action(exo.tabItems[indexLienOuvert].idZone);}}function actionTouchePgPrecedente(glissade){if (glissade){if (GEN_precedentPossible()){return STG_allerPrecedent();}return;}if (actionValider){STG_initialiser();} else {if (!actionD && !actionValider && etatPrecedent){return STG_allerPrecedent();}if (indexLienOuvert<0){indexLienOuvert=exo.tabItems.length-1;}exo.action(exo.tabItems[indexLienOuvert].idZone);}}function setFlashInteraction(val){exo.reponsesFlash=val;if (!parent.oSco.evaluation.etatCorrige){for (var i=0;i<parent.oSco.evaluation.questions.length;i++){if (parent.oSco.evaluation.questions[i].codePage==codePage){parent.oSco.evaluation.questions[i].interactions=new Array();break;}}}}function getFlashInteraction(){if (exo.reponsesFlash==""){var tabInter=parent.oSco.evaluation.donneReponsesQuestion(codePage);if (tabInter!=null){var res="";for (var i=0;i<tabInter.length;i++){if (res!=""){res+="[/]";}var oInter=tabInter[i];var lid=oInter.id;res+=lid+"[;]"+oInter.typeSCORM+"[;]"+oInter.result+"[;]"+oInter.learner_response;}exo.reponsesFlash=res;}}return exo.reponsesFlash;}function decodeX(va){var res="";var chaine0="bHOi4ph5sWlr1c2nI7LBuzgaUNv0FDXtm8SodePVqRfwGKkJMxAQjTC";var chaine1="ABCDFGHJKLNOPQTUVWXabcdfghjklnopqtuvwx0124578ierRImMsSz";for (var i=0;i<va.length;i++){var car=va.charAt(i);var indRemplace=chaine0.indexOf(car);if (indRemplace>=0){res+=chaine1.substring(indRemplace,indRemplace+1);} else {res+=car;}}return res;}function donneObjetFlash(){var objetPlug=null;var oDiv=PF_donneObjet("STY_texteEXP");var tabWM=oDiv.getElementsByTagName('object');if (tabWM.length>0){var objet=tabWM[0];objetPlug=objet;if (parent.oSco.config_navigateur=="Netscape"){objetPlug=objetPlugMozz(objet);}}if (objetPlug==null && oDiv.getElementsByTagName('iframe').length>0){objetPlug=oDiv.getElementsByTagName('iframe')[0].contentWindow;}return objetPlug;}function EXO_peutVoirMesReponses(){return !exo.existeClasseCorrection;}function appliqueImgFondIE(ozz,nClasse,classeSecondaire){var txtF=imageFondCSS("."+nClasse);if (txtF.indexOf("url(")==0){ozz.style.backgroundImage=txtF.replace("url(../","url(../../MosMtr/ressources/style/");} else if (!classeSecondaire){ozz.style.backgroundImage="url(none)";}}