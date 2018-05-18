function ExerciceQM(typeQC) { this.indications; this.commentaireSucces=null; this.consigne=null; this.tabItems; this.tabColonnes; this.scoreMaxPoids; this.scoreCourant=0; this.scoreTotal; this.scoreMin=0; this.valide=false; this.titre=''; this.racineImage; this.actif=true; this.typeQC=typeQC; this.type="QM"; this.ordreAleatoire=false;this.poidsEnPoints=false; this.obligeReponses=true;this.niveauCertitude=-1;this.existeClasseCorrection=false;this.existeClasseSuggRef=false;this.init=exo_init;this.initEchelleScore=exo_initEchelleScore;this.valider=exo_valider;this.action=exo_action;this.actionImage=exo_actionImage;this.changerBouton=exo_changerBouton; this.initialiser=exo_initialiser; this.initialiserLigne=exo_initialiserLigne;this.desactiver=exo_desactiver; this.compterMultiple=exo_compterMultiple;this.solutions=exo_solutions;this.donneSuggestion=exo_donneSuggestion;this.donneTabReponses=exo_donneTabReponses;this.afficherMesReponses=exo_afficherMesReponses;this.questionJuste=exo_questionJuste;this.donneItem=exo_donneItem;this.corrigerReponses=exo_corrigerReponses;this.enleverCorrection=exo_enleverCorrection;this.marquerSuggestionRef=exo_marquerSuggestionRef;this.effacerMarqueSuggestionRef=exo_effacerMarqueSuggestionRef;}function exo_init(){this.titre=document.title;this.tabItems=new Array();this.tabColonnes=new Array();this.indications= new Array(); this.racineImage=chemin_img+"gen/bouton"+this.typeQC;this.existeClasseCorrection=classeCSSExiste(".STY_imgBoutonQMSol");this.existeClasseSuggRef=classeCSSExiste(".STY_reponseQMSuggRef");} function exo_initEchelleScore(){ if (etatEval){ for (var i=0;i<this.tabItems.length;i++) {var idRep=this.tabItems[i].id;var lePre=this.tabItems[i].prerequis;if (lePre=="DEFAULT"){if (unEstPris){PF_masquerDiv("trRep"+idRep);}} else {if (parent.evalVerifPrerequis(lePre)){unEstPris=true;} else {PF_masquerDiv("trRep"+idRep);}}} } var nbReponses=this.tabItems.length; if (this.ordreAleatoire && nbReponses>1){melangerReponses(nbReponses);melangerReponses(nbReponses);if (nbReponses>3){melangerReponses(nbReponses);melangerReponses(nbReponses);}} if (this.poidsEnPoints){var scoreMaxPoids=0;var scoreMinPoids=0;for (var i=0;i<this.tabItems.length;i++){var poisMaxLigne=0;var poisMinLigne=0;var oItem=this.tabItems[i];var tabPl=oItem.poids.split(",");for (var j=0;j<tabPl.length;j++){if (tabPl[j].indexOf(":")>0){var scoreI=Number(tabPl[j].substring(tabPl[j].indexOf(":")+1).replace(",",""));if (this.typeQC=='QCM'){poisMaxLigne+=scoreI;if (scoreI<0){poisMinLigne+=scoreI;}} else {if (scoreI>poisMaxLigne){poisMaxLigne=scoreI;}if (scoreI<poisMinLigne){poisMinLigne=scoreI;}}}}scoreMaxPoids+=poisMaxLigne;scoreMinPoids+=poisMinLigne;}this.scoreMaxPoids=scoreMaxPoids;this.scoreMin=scoreMinPoids;} else {var scoreMaxPoids=0;for (var i=0;i<this.tabItems.length;i++){var oItem=this.tabItems[i];scoreMaxPoids+=oItem.poids;}this.scoreMaxPoids=scoreMaxPoids;if (!parent.oSco.scoreBinaire && parent.oSco.penaliserMauvaiseReponse){this.scoreMin=this.scoreTotal*-1;}}}function melangerReponses(totalR){var numN1=Math.floor(Math.random()*totalR);var numN2=Math.floor(Math.random()*totalR);if (numN1!=numN2){var oRep1=PF_donneObjet("trRep"+exo.tabItems[numN1].id);var oRep2=PF_donneObjet("trRep"+exo.tabItems[numN2].id);var lePere=oRep1.parentNode;var posInsert=oRep1.nextSibling;oRep2.parentNode.replaceChild(oRep1, oRep2);if (posInsert==oRep2){posInsert=oRep1;}lePere.insertBefore(oRep2,posInsert);}}function exo_valider(){this.scoreCourant=this.compterMultiple();if (this.scoreCourant>=this.scoreTotal){this.valide=true;}appliquerNiveauCertitude(this);}function exo_action(idRep,idCol){if (this.actif){var oItem=this.donneItem(idRep);if (this.existeClasseSuggRef){var oLien=PF_donneObjet("lien"+oItem.id);if (oLien.className.indexOf("STY_reponseQMSuggRef")>0){oLien.className=oLien.className.replace(" STY_reponseQMSuggRef","");}}var selec=oItem.selectionne;var estCoche=false;if (selec.indexOf(idCol)>=0){estCoche=true;}if (estCoche && parent.oSco.forcerReponse){if (this.typeQC=='QCU'){return false;}}if (this.typeQC=='QCU'&&!estCoche){this.initialiserLigne(oItem); selec="";} else {if (this.existeClasseCorrection){PF_donneObjet("boutonRep"+idRep+idCol).className="STY_imgBoutonQM";}}if (estCoche){var oReg=new RegExp(idCol);selec=selec.replace(oReg,'');this.actionImage(idRep,idCol,false);} else {if (selec!=''){selec=selec+',';}selec+=idCol;this.actionImage(idRep,idCol,true);}selec=selec.replace(/,,/,",");selec=selec.replace(/,$/,"");selec=selec.replace(/^,/,"");oItem.selectionne=selec;var detection=true;if (parent.oSco.forcerReponse){for (var i=0;i<this.tabItems.length;i++) {if (this.tabItems[i].selectionne==''){detection=false;}}} if (detection){actionDetecte();}else if (this.typeQC=='QCM'&&actionD){actionD=false;desactiverBoutonValider();}}}function exo_actionImage(idRep,idCol,sel){var nomImage="boutonRep"+idRep+idCol;var src = this.racineImage;if (sel) {src=src+"_sel";}if (etatEval&& (depuisPrecedent || parent.oSco.evaluation.etatCorrige)){ src=src+"."+parent.oSco.formatBouton;} else {src=src+"_hlt."+parent.oSco.formatBouton;}changeImgBtn(PF_donneObjet(nomImage),src);}function exo_changerBouton(idRep,idCol,dessus){if (this.actif){var oItem=this.donneItem(idRep);var nomImage="boutonRep"+idRep+idCol;var src = this.racineImage;var dessusStr="";if (oItem.selectionne.indexOf(idCol)>=0) {src=src+"_sel";dessusStr+="Sel";}if (dessus) {src=src+"_hlt";dessusStr+="Dessus";}src=src+"."+parent.oSco.formatBouton;changeImgBtn(PF_donneObjet(nomImage),src);}}function exo_initialiser(){for (var i=0;i<this.tabItems.length;i++) {this.initialiserLigne(this.tabItems[i]);}this.actif=true;this.scoreCourant=0;this.valide=false;this.enleverCorrection();this.effacerMarqueSuggestionRef();}function exo_initialiserLigne(oItem){var src = this.racineImage+"."+parent.oSco.formatBouton;for (var j=0;j<this.tabColonnes.length;j++){var oImg=PF_donneObjet("boutonRep"+oItem.id+this.tabColonnes[j]);oImg.className="STY_imgBoutonQM";changeImgBtn(oImg,src);}oItem.selectionne="";}function exo_desactiver(){this.actif=false;if ((!etatEval)||(parent.oSco.evaluation.evalInteraction)){for (var i=0;i<this.tabItems.length;i++) {var idRep=this.tabItems[i].id;var nomImage="boutonRep"+idRep;var seelc=this.tabItems[i].selectionne;for (var j=0;j<this.tabColonnes.length;j++) {var src = this.racineImage;var idc=this.tabColonnes[j];if (seelc.indexOf(idc)>=0){src=src+"_sel";}changeImgBtn(PF_donneObjet(nomImage+idc),src+"_dis."+parent.oSco.formatBouton);}}}}function exo_compterMultiple() {var score0=0;if (this.poidsEnPoints){for (var i=0;i<this.tabItems.length;i++){var oItem=this.tabItems[i];if (oItem.selectionne!=""){var tabSel=oItem.selectionne.split(",");for (var j=0;j<tabSel.length;j++){var idSel=tabSel[j];var ind=oItem.poids.indexOf(idSel+":");if (ind>=0){var scoreItm=oItem.poids.substring(ind+idSel.length+1);scoreItm=scoreItm.substring(0,scoreItm.indexOf(","));score0+=Number(scoreItm);}}}}if (!parent.oSco.penaliserMauvaiseReponse && score0<0 && this.typeQC=="QCM"){score0=0;}return score0;}if (parent.oSco.penaliserMauvaiseReponse){for (var i=0;i<this.tabItems.length;i++){var oItem=this.tabItems[i];if (oItem.selectionne!=""){if (this.questionJuste(oItem)){score0+=oItem.poids;} else {score0-=oItem.poids;}}}if (this.scoreMaxPoids==0){return this.scoreTotal;}score0=Math.round(score0/this.scoreMaxPoids*this.scoreTotal*10)/10;} else {var poidTotalItm=0;for (var i=0;i<this.tabItems.length;i++){var oItem=this.tabItems[i];if (this.questionJuste(oItem)){score0+=oItem.poids;}poidTotalItm+=oItem.poids;}if (poidTotalItm==0){return this.scoreTotal;}score0=Math.round(score0/poidTotalItm*this.scoreTotal*10)/10;}if (score0<0 && !parent.oSco.scoreNegatif){score0=0;}return score0;}function exo_corrigerReponses(montreFaux){if (!this.existeClasseCorrection){return;}if (montreFaux && !classeCSSExiste(".STY_imgBoutonQMFaux")){return;}var cssFaux=(montreFaux && classeCSSExiste(".STY_imgBoutonQMFaux"));for (var i=0;i<this.tabItems.length;i++){var oItem=this.tabItems[i];var lesjustes=oItem.lsJuste.split(",");var tabSel=oItem.selectionne.split(",");for (var j=0;j<lesjustes.length;j++){var idC=lesjustes[j];if (idC!=''){var oImg=PF_donneObjet("boutonRep"+oItem.id+idC);if (cssFaux){var estSelectionne=false;for (var n=0;n<tabSel.length;n++){if (idC==tabSel[n]){estSelectionne=true;}}if (estSelectionne){oImg.className="STY_imgBoutonQM STY_imgBoutonQMSol";} else {if (montrerFauxNonSelectionne){oImg.className="STY_imgBoutonQM STY_imgBoutonQMFaux";}}} else {oImg.className="STY_imgBoutonQM STY_imgBoutonQMSol";}}}for (var j=0;j<tabSel.length;j++){var idC=tabSel[j];if (idC!=""){var oImg=PF_donneObjet("boutonRep"+oItem.id+idC);if (oImg.className.indexOf("STY_imgBoutonQMFaux")>0){oImg.className="STY_imgBoutonQM";}var estJuste=false;for (var n=0;n<lesjustes.length;n++){if (idC==lesjustes[n]){estJuste=true;}}if (!estJuste && cssFaux){oImg.className="STY_imgBoutonQM STY_imgBoutonQMFaux";}}}}}function exo_enleverCorrection(){if (!this.existeClasseCorrection){return;}for (var i=0;i<this.tabItems.length;i++){var oItem=this.tabItems[i];var lesjustes=oItem.lsJuste.split(",");var tabSel=oItem.selectionne.split(",");for (var j=0;j<tabSel.length;j++){var idC=tabSel[j];if (idC!=""){var oImg=PF_donneObjet("boutonRep"+oItem.id+idC);oImg.className="STY_imgBoutonQM";}}}}function exo_marquerSuggestionRef(ref){if (!this.existeClasseSuggRef){return;}var tabParams=ref.split(':');if (tabParams.length<2){return;}var oItem=this.donneItem(tabParams[0]);var oLien=PF_donneObjet("lien"+oItem.id);if (oLien.className.indexOf("STY_reponseQMSuggRef")<0){oLien.className+=" STY_reponseQMSuggRef";}}function exo_effacerMarqueSuggestionRef(){if (!this.existeClasseSuggRef){return;}for (var i=0;i<this.tabItems.length;i++){var oItem=this.tabItems[i];var oLien=PF_donneObjet("lien"+oItem.id);if (oLien.className.indexOf("STY_reponseQMSuggRef")>0){oLien.className=oLien.className.replace(" STY_reponseQMSuggRef","");}}}function exo_solutions(){if (this.existeClasseCorrection){return this.corrigerReponses(false);}this.actif=true;for (var i=0;i<this.tabItems.length;i++){var oItem=this.tabItems[i];var lesjustes=oItem.lsJuste.split(",");this.initialiserLigne(oItem);for (var j=0;j<lesjustes.length;j++){var idC=lesjustes[j];if (idC!=''){this.action(oItem.id,idC);}}}}function EXO_peutVoirMesReponses(){return !exo.existeClasseCorrection;}function exo_donneSuggestion(){var res=null;var i=0;while (i<exo.indications.length){if (exo.indications[i].id.indexOf('divSugg')==0){var ref=exo.indications[i].ref;if (ref.indexOf(':')>0 && ref.indexOf("[solution]")<0){var tabParams=ref.split(':');var idRep=tabParams[0];var idCol=tabParams[1];var oItem=this.donneItem(idRep);if (oItem!=null && suggestionDejaAffiche.indexOf(exo.indications[i].id+',')<0){if (idCol!=""){if (idCol=="<>"){if(!this.questionJuste(oItem) && oItem.selectionne.length>1){res=exo.indications[i];break;}} else if (oItem.selectionne.indexOf(idCol)>=0){res=exo.indications[i];break;}}}}}i++;}if (res==null){i=0;while (i<exo.indications.length){if (exo.indications[i].id.indexOf('divSugg')==0 && exo.indications[i].ref=='' && suggestionDejaAffiche.indexOf(exo.indications[i].id+',')<0){res=exo.indications[i];i=exo.indications.length;}i++;}}return res;}function exo_donneTabReponses(){var tabRep=new Array();var tabInteraction=new Array();var chReps="";var txtDesc="";for (var i=0;i<this.tabItems.length;i++){var oItem=this.tabItems[i];var idRep=oItem.id;var lesrepsselect=oItem.selectionne.split(",");if (lesrepsselect!=""){for (var k=0;k<lesrepsselect.length;k++){if (chReps!=''){chReps+="[,]";}chReps+=idRep+"[.]"+lesrepsselect[k];if (txtDesc!=''){txtDesc+="\n";}txtDesc+=texteReponse("lien"+idRep);if (parent.oSco.langue=="fr"){txtDesc+=" ";}txtDesc+=": "+parent.XML_texteNoeud(PF_donneObjet(lesrepsselect[k]));}}}tabInteraction[0]=this.valide;tabInteraction[1]=chReps;tabInteraction[2]="qm";tabInteraction[3]=txtDesc;tabRep[0]=tabInteraction;return tabRep;}function exo_afficherMesReponses(tabRep){this.actif=true;if (tabRep.length!=1){return false;}var oInteraction=tabRep[0];var lesreps=oInteraction.learner_response.split("[,]");for (var j=0;j<lesreps.length;j++){var tabRep=lesreps[j].split("[.]");var oItem=this.donneItem(tabRep[0]);if (oItem!=null){this.action(tabRep[0],tabRep[1]);}}}function exo_questionJuste(oItem){var correct=oItem.lsJuste;var selectionne=oItem.selectionne;var questionJuste=true;var lesrepsjuste=correct.split(",");for (var k=0;k<lesrepsjuste.length;k++){var oR=lesrepsjuste[k];if (oR!='' && selectionne.indexOf(oR)<0){questionJuste=false;}}if (questionJuste && selectionne!=''){var lesrepsselect=selectionne.split(",");for (var k=0;k<lesrepsselect.length;k++){var oR=lesrepsselect[k];if (oR!='' && correct.indexOf(oR)<0){questionJuste=false;}}}return questionJuste;}function ItemReponse(id) { this.id=decodeX(id);this.selectionne="";this.lsJuste; this.prerequis; this.poids=1;this.init=initItemReponse;}function initItemReponse(styleR,pre,poi){this.lsJuste=decodeY(styleR);this.prerequis=pre;if (exo.poidsEnPoints){this.poids=poi;} else if (poi!=""){this.poids=Number(poi);}}function exo_donneItem(lid){var res=null; for (var i=0;i<this.tabItems.length;i++){if (this.tabItems[i].id==lid){res=this.tabItems[i];break;}}return res;}function texteReponse(idr){var obj=PF_donneObjet(idr);var vDesc=parent.XML_texteNoeud(obj);if (vDesc==""){var lesimg=obj.getElementsByTagName("img");if (lesimg.length>0){vDesc=lesimg[0].title;}}return vDesc;}function decodeX(va){var res="";for (var i=0;i<va.length;i++){var car=va.charAt(i);switch(car){case '3' : res+="0";break;case '8' : res+="1";break;case '7' : res+="2";break;case '9' : res+="3";break;case '1' : res+="7";break;case '0' : res+="8";break;case '2' : res+="9";break;default : res+=car;}}return res;}function decodeY(va){var res="";var chaine0="rep57890124";var chaine1="col01245789";for (var i=0;i<va.length;i++){var car=va.charAt(i);var indRemplace=chaine0.indexOf(car);if (indRemplace>=0){res+=chaine1.substring(indRemplace,indRemplace+1);} else {res+=car;}}return res;}
