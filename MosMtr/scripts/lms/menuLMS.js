var planEnLigne=false;var existeBoutonPrecedent;var existeBoutonSuivant;var oResultatsRecherche=null;var tempsFinEnMilli;var oBarreProgress;function initMenuLMS(){if (parent.SYNC_CORRIGE_ITEM!=""){parent.LMS_persisteParcours(false);parent.API_1484_11=null;parent.opener.retourCorrectionTentative();return parent.close();}if (parent.donneParam("txrtl")=="1" || (parent.TXT_DIR_RTL && parent.TXT_DIR_RTL=="oui")){document.body.dir="rtl";}var oCss=PF_donneObjet("feuilleStyleMenu");oCss.href = parent.RACINE_STYLE+"css/menuLMS.css";if (parent.RACINE_STYLE==null || parent.RACINE_STYLE=="undefined"){return false;}var oCorpsMenu=PF_donneObjet("corpsMenuLMS");if (parent.depuisFenGNR && top.opener.top.menu.cacheMTRMenuLMS && top.opener.top.menu.cacheMTRMenuLMS!=""){oCorpsMenu.innerHTML=top.opener.top.menu.cacheMTRMenuLMS;} else {parent.renduXSLSub(null,"menuLMS",oCorpsMenu);if (parent.depuisFenGNR){top.opener.top.menu.cacheMTRMenuLMS=oCorpsMenu.innerHTML;}}if (parent.SUR_CHORUS && parent.donneParam("fcjs")=="1"){var e0 = document.createElement("script"); e0.src = parent.RACINE_STYLE+"scripts/fonctions.js"; e0.type="text/javascript"; document.getElementsByTagName("head")[0].appendChild(e0);}if (parent.planLMS.oFlashIntBarPlan!=null){oFlashIntBar=parent.planLMS.oFlashIntBarPlan;try{oFlashIntBar.MOS_setTitleCourse(parent.serveur.titreStage);}catch(e){}}PF_modifTexteDiv("STY_titreFormJS",parent.serveur.titreStage);/*if (parent.planLMS.PLAN_DESACTIVE){PF_masquerDiv("STY_zoneBoutonBascPlan");}*/if (parent.planLMS.RECHERCHE_POSSIBLE){var champRechercheInterne=PF_donneObjet("STY_champRechercheInterne");if (champRechercheInterne!=null){try {champRechercheInterne.addEventListener("keypress",tapeRechercheInterne,false);champRechercheInterne.addEventListener("focus",focusRechercheInterne,false);} catch(e){champRechercheInterne.attachEvent("onkeypress", tapeRechercheInterne);champRechercheInterne.attachEvent("onfocus", focusRechercheInterne);}if (champRechercheInterne.title=="textinfo"){champRechercheInterne.title="";champRechercheInterne.value=donneLex(503);parent.planLMS.gardeCouleurChamp=valCSS(champRechercheInterne,"color","color",parent.estMoz);champRechercheInterne.style.color="#999999";}}}else {PF_masquerDiv("STY_zoneRechercheInterne");}if (parent.donneParam("vgp")=="0"){PF_masquerDiv("STY_zoneBoutonCollab");}var oZnContrib=PF_donneObjet("STY_zoneContributeur");if (oZnContrib){var visibCt="none";if (testEstContributeur()){visibCt="block";}oZnContrib.style.display=visibCt;}if (PF_attr(parent.planLMS.DOMManifest.documentElement,"etatParcours")=="completed"){PF_masquerDiv("STY_zoneParcoursNonAcheve");PF_afficherDiv("STY_zoneParcoursAcheve");} else {PF_masquerDiv("STY_zoneParcoursAcheve");PF_afficherDiv("STY_zoneParcoursNonAcheve");} oFlecheSuivant=PF_donneObjet("STY_ligneNiveau1");var obj=PF_donneObjet("STY_ligneNiveau1"); if (obj!=null){ NAVIG_remplirNiveau1(obj); planEnLigne=true; } initCadreContenuInterne(window); initCadreContenuInterne(parent.planLMS); oBarreProgress=PF_donneObjet("STY_barreProgresLMS"); if (PF_donneObjet("STY_zoneBlog") || PF_donneObjet("STY_zoneForum")){ var existeForum=false; var existeBlog=false; if (parent.SUR_CHORUS){var oRetour=parent.retourneServiceParcours(parent.serveur.codeStage);if (oRetour!=null){if (oRetour.getElementsByTagName("hasForum").length>0){existeForum=true;}if (oRetour.getElementsByTagName("hasBlog").length>0){existeBlog=true;}}}if (!existeForum && PF_donneObjet("STY_zoneForum")){PF_masquerDiv("STY_zoneForum");}if (!existeBlog && PF_donneObjet("STY_zoneBlog")){PF_masquerDiv("STY_zoneBlog");}}PF_affecterAlt(); var nLex=100; if (!parent.SUR_CHORUS){nLex=67;} existeBoutonSuivant=creerBoutonEtape("Suiv",nLex);nLex++; existeBoutonPrecedent=creerBoutonEtape("Prec",nLex);var afficheTempsRestant=false;var tempsMax=parent.planLMS.limitConditions(parent.planLMS.itemRacine,"attemptAbsoluteDurationLimit");var tempsRestantMS=-1;if (parent.planLMS.limiteHeures!=""){tempsRestantMS=Number(parent.planLMS.limiteHeures)*3600*1000;}if (tempsMax!=""&&tempsMax!="0.0"){var tempsRestantMS2=parent.intervalleEnMS(tempsMax);if (tempsRestantMS<0 || tempsRestantMS2<tempsRestantMS){tempsRestantMS=tempsRestantMS2;}}if (tempsRestantMS>0){var tempsTotal=PF_attr(parent.planLMS.DOMManifest.documentElement,"tempsTotal");if (tempsTotal!=""){tempsRestantMS-=tempsTotal*1000;}if (tempsRestantMS>1000){tempsFinEnMilli=(new Date()).getTime()+tempsRestantMS;setTimeout(NAVIG_finTempsParc,tempsRestantMS);majCompteurTempsParc();setTimeout(majCompteurTempsParc,60000);afficheTempsRestant=true;} else {NAVIG_finTempsParc();}}if (afficheTempsRestant){PF_afficherDiv("STY_zoneTempsRestant");} else {PF_masquerDiv("STY_zoneTempsRestant");}if (parent.planLMS.oFenetre!=null && parent.planLMS.oFenetre.nodeType){document.onclick=MENU_effacePlanFenetre;try {var leslienspages=document.getElementsByTagName("a");for (var i=0;i<leslienspages.length;i++){if (leslienspages[i].href && leslienspages[i].href.indexOf(".planLMS.PLAN_basculePlan()")>=0){leslienspages[i].onclick=chopeEtStpEvt;break;}}} catch(e){}}if (parent.serveur.numAcces!=""){window.setInterval(NAVIG_lmsActif,30*1000);} var idSCO=parent.donneParam('sco');var tabFils=parent.planLMS.donneLesFils(parent.planLMS.itemRacine,"item");if (tabFils.length==1 && parent.planLMS.estFeuille(tabFils[0])){if (idSCO==''){idSCO=tabFils[0].getAttribute("identifier");}if (parent.LISTE_L=="0"){parent.planLMS.PLAN_affichagePlan("non");}if (parent.STYLE_INTERFACE=="scorm_4th_test_suite"){parent.planLMS.PLAN_DESACTIVE=true;PF_masquerDiv("STY_zoneBoutonBascPlan");}}if (idSCO==''){var req="start";if (parent.planLMS.itemSuspendu!=null && parent.planLMS.estSuspendue(parent.planLMS.itemSuspendu)){req=NAVIG_reprendreParcours();}if (NAVIG_requete(req,true)=="true"){/*if (parent.STYLE_INTERFACE=="scorm_4th_test_suite" && req=="start"){if (parent.planLMS.controlMode(parent.planLMS.itemRacine,"choice")=="true"){peutLancerAuto=false;}}*/return NAVIG_requete(req,false);}} else {idSCO=decodeURIComponent(idSCO);if (!parent.depuisFenGNR && idSCO.indexOf("reltpg")==0){var oRessource=parent.XML_trouveNoeud(parent.planLMS.DOMManifest.documentElement,"resource","identifier",idSCO);if (oRessource!=null){var lrf0=PF_attr(oRessource,"href");if (lrf0.indexOf("sco/")==0){parent.planLMS.pageSpecifieeParLienPage=idSCO.substring(4);lrf0=lrf0.substring(4);lrf0=lrf0.substring(0,lrf0.indexOf("."));idSCO=lrf0;}}}parent.planLMS.activiteSpecifieParChoixPreemptif=idSCO;if (parent.depuisFenGNR || NAVIG_requete("choice",true)=="true"){var idPg=parent.donneParam('idPg');if (idPg!=''){parent.planLMS.pageSpecifieeParLienPage=idPg;}parent.planLMS.activiteSpecifieParChoix=idSCO;var scoDeSuite=null;if (parent.depuisFenGNR){scoDeSuite=parent.XML_trouveNoeud(parent.planLMS.DOMManifest.documentElement,"item","identifier",idSCO);if (scoDeSuite!=null && PF_attr(scoDeSuite,"identifierref")==""){scoDeSuite=null;}}if (scoDeSuite!=null){parent.planLMS.activiteRacine=parent.planLMS.itemRacine;scoDeSuite.setAttribute("activityIsActive","false");parent.planLMS.activiteCourante=null;return parent.planLMS.contentDeliveryEnvironment(scoDeSuite);}return NAVIG_requete("choice",false);}}NAVIG_majFleches(false,true);parent.planLMS.auraitDuMettreAJourPlan=true;if (parent.LISTE_L=="0" && parent.LISTE_BL!="" && parent.LISTE_BL!="0"){parent.planLMS.PLAN_affichagePlan("oui");}if (parent.SUR_CHORUS){var msgD="deb";if (parent.planLMS.itemRacine && parent.planLMS.limitConditionsCheck(parent.planLMS.itemRacine)){msgD="lim";}parent.contenuLMS.location=parent.planLMS.adrPageDefaut(msgD);}}function NAVIG_requete(requete,preemptif){parent.planLMS.MODE_PREEMPTIF=preemptif;return parent.planLMS.overallSequencing(requete);}function donneLex(num){return parent.donneLex(num);}function NAVIG_allerPrecedent(){requeteSuivPrecTempo("previous");}function NAVIG_allerSuivant(){if (parent.planLMS.itemCourant==null){NAVIG_requete("start",false);} else {requeteSuivPrecTempo("continue");}}function requeteSuivPrecTempo(nomReq){var temporise=false;if (parent.API_1484_11.etatCommunication=="enCours"){parent.API_1484_11.scoEnAttente=true;temporise=true;}if (temporise){parent.contenuLMS.location=parent.planLMS.adrPageBlanche();setTimeout("NAVIG_requete('"+nomReq+"',false)",900);} else {NAVIG_requete(nomReq,false);}}function NAVIG_retour(param0){if (parent.planLMS.itemCourant!=null){var temporise=false;var alerteSuspendre=true;var req="exitAll";if (parent.API_1484_11.cmi!=null && parent.API_1484_11.cmi.getAttribute("exit")=="suspend"){req="suspendAll";alerteSuspendre=false;}if (parent.API_1484_11.cmi!=null && parent.API_1484_11.cmi.getAttribute("exit")=="normal"){req="exitAll";alerteSuspendre=false;}if (parent.planLMS.masqueSuspendre){req="exitAll";alerteSuspendre=false;}if (parent.planLMS.masqueSortie){req="suspendAll";alerteSuspendre=false;}if (parent.lesson_mode!="normal"){alerteSuspendre=false;}if (param0!=null && param0=="suspendAll"){req="suspendAll";alerteSuspendre=false;}if (param0!=null && param0=="exitAll"){req="exitAll";alerteSuspendre=false;}if (!parent.SUR_CHORUS && parent.FICH_PARCOURS==""){req="exitAll";alerteSuspendre=false;}if (alerteSuspendre){var txta="";if (parent.SUR_CHORUS){txta=donneLex(515)+"\n\n"+donneLex(516)+"\n"+donneLex(517);} else {txta=donneLex(1)+"\n\n"+donneLex(2)+"\n"+donneLex(16);}if (confirm(txta)){req="suspendAll";} else {req="exitAll";}}if (parent.API_1484_11.etatCommunication=="enCours"){parent.API_1484_11.scoEnAttente=true;temporise=true;}if (temporise){if (req=="suspendAll" && parent.API_1484_11.cmi!=null && parent.API_1484_11.etatCommunication=="enCours" && parent.API_1484_11.cmi.getAttribute("exit")==null){parent.API_1484_11.SetValue("cmi.exit","suspend");}parent.contenuLMS.location=parent.planLMS.adrPageBlanche();setTimeout("NAVIG_requete('"+req+"',false);",1000);} else {NAVIG_requete(req,false);}} else {parent.LMS_persisteParcours(false);parent.LMS_fermer();}}function titrePlanNiveau(val,num){val=val.replace(/ /g,'&nbsp;');return val;}function infoBullePlanNiveau(titre){return "";}function NAVIG_remplirNiveau1(oDiv){var res="";var itemTmp=parent.planLMS.itemRacine;var numPos=0;for (var i=0;i<parent.planLMS.itemRacine.childNodes.length;i++){var itemTmp=parent.planLMS.itemRacine.childNodes.item(i);if (itemTmp.nodeName=="item"){var cacherItem=false;if (PF_attr(itemTmp,"isvisible")=="false"){if (parent.planLMS.estFeuille(itemTmp)){cacherItem=true;}}if (!cacherItem){var codeItm=itemTmp.getAttribute("nom");var oHtml=parent.planLMS.PF_donneObjet("lienP"+codeItm);if (oHtml!=null){numPos++;var titreItm=oHtml.firstChild.nodeValue;var ajAcheve="";if (PF_attr(itemTmp,"attemptProgressStatus")=="true"){ajAcheve=" STY_lienNiveau1Acheve";}res+='<a class="STY_lienNiveau1'+ajAcheve+'" onmouseover="window.status=\'\';return true" id="lienNiv'+codeItm+'" href="javascript:NAVIG_remplirNiveau2(\''+codeItm+'\')"'+infoBullePlanNiveau(titreItm)+'>'+titrePlanNiveau(titreItm,numPos)+'</a>';}}}}oDiv.innerHTML=res;for (var i=0;i<parent.planLMS.itemRacine.childNodes.length;i++){var itemTmp=parent.planLMS.itemRacine.childNodes.item(i);if (itemTmp.nodeName=="item"){changerClasseEtatPlanNiveau(itemTmp,"1");}}}function changerClasseEtatPlanNiveau(oItem,numNiv){var idItmtmp=oItem.getAttribute("identifier");var desactive=false;if (!parent.planLMS.choixItemLineairePossible(oItem)){desactive=true;}else if (parent.planLMS.tabContient(parent.planLMS.tabItemsVerif,idItmtmp)){parent.planLMS.TEST_AFF_PARC=true;parent.planLMS.activiteSpecifieParChoixPreemptif=idItmtmp;if (NAVIG_requete("choice",true)!="true"){desactive=true;}}if (parent.planLMS.controlMode(oItem.parentNode,"choice")=="false"){desactive=true;}if (desactive){var ajAcheve="";if (PF_attr(oItem,"attemptProgressStatus")=="true"){ajAcheve=" STY_lienNiveau"+numNiv+"Acheve";}var oHtml=PF_donneObjet("lienNiv"+oItem.getAttribute("nom"));if (oHtml){oHtml.href="javascript:;";oHtml.className="STY_lienNiveau"+numNiv+"Desactive"+ajAcheve;}}}function NAVIG_remplirNiveau2(codeItem){var oItem=parent.XML_trouveNoeud(parent.planLMS.itemRacine,"item","nom",codeItem);var titrePere=parent.planLMS.PF_donneObjet("lienP"+codeItem).firstChild.nodeValue;var lanceFils="";if (parent.planLMS.estFeuille(oItem)){viderNiveau2();if (PF_attr(oItem,"identifierref")!=""){return parent.planLMS.clicItem(codeItem);}}var res="";var numPos=0;for (var i=0;i<oItem.childNodes.length;i++){var leFils=oItem.childNodes.item(i);if (leFils.nodeName=="item"){var cacherItem=false;if (PF_attr(leFils,"isvisible")=="false"){if (parent.planLMS.estFeuille(leFils)){cacherItem=true;}}if (!cacherItem){var codeItmFils=leFils.getAttribute("nom");var titreFils="";var lienFils=parent.planLMS.PF_donneObjet("lienP"+codeItmFils);titreFils=lienFils.firstChild.nodeValue;if (i==0 && titreFils==titrePere){lanceFils=codeItmFils;} var selCour="";if ((parent.planLMS.oItemCourant!=null)&&(parent.planLMS.oItemCourant.getAttribute("nom")==codeItmFils)){selCour="Sel";}numPos++;var ajAcheve="";if (PF_attr(leFils,"attemptProgressStatus")=="true"){ajAcheve=" STY_lienNiveau2Acheve";}res+='<a class="STY_lienNiveau2'+selCour+ajAcheve+'" style="-moz-outline-width:0px" hidefocus="true" onmouseover="window.status=\'\';return true" id="lienNiv'+codeItmFils+'" href="javascript:NAVIG_remplirNiveau2(\''+codeItmFils+'\')"'+infoBullePlanNiveau(titreFils)+'>'+titrePlanNiveau(titreFils,numPos)+'</a>';}}}var oDiv=PF_donneObjet("STY_ligneNiveau2");if (oDiv!=null){oDiv.innerHTML=res;verifierEtatNiveau2(oItem);}selectionneItmNiveau(codeItem,"1");if (lanceFils!=""){selectionneItmNiveau(lanceFils,"2");parent.planLMS.clicItem(lanceFils);}}function NAVIG_remplirNiveau2Passif(codeItem){var oItem=parent.XML_trouveNoeud(parent.planLMS.itemRacine,"item","nom",codeItem);var oDiv=PF_donneObjet("STY_ligneNiveau2");if (oDiv==null){return ;}if (!parent.planLMS.estFeuille(oItem)){var res="";var numPos=0;for (var i=0;i<oItem.childNodes.length;i++){var leFils=oItem.childNodes.item(i);if (leFils.nodeName=="item"){var cacherItem=false;if (PF_attr(leFils,"isvisible")=="false"){if (parent.planLMS.estFeuille(leFils)){cacherItem=true;}}if (!cacherItem){var codeItmFils=leFils.getAttribute("nom");var titreFils="";var lienFils=parent.planLMS.PF_donneObjet("lienP"+codeItmFils);titreFils=lienFils.firstChild.nodeValue;var selCour="";if ((parent.planLMS.oItemCourant!=null)&&(parent.planLMS.oItemCourant.getAttribute("nom")==codeItmFils)){selCour="Sel";}numPos++;var ajAcheve="";if (PF_attr(leFils,"attemptProgressStatus")=="true"){ajAcheve=" STY_lienNiveau2Acheve";}res+='<a class="STY_lienNiveau2'+selCour+ajAcheve+'" style="-moz-outline-width:0px" hidefocus="true" onmouseover="window.status=\'\';return true" id="lienNiv'+codeItmFils+'" href="javascript:NAVIG_remplirNiveau2(\''+codeItmFils+'\')"'+infoBullePlanNiveau(titreFils)+'>'+titrePlanNiveau(titreFils,numPos)+'</a>';}}}if (oDiv!=null){oDiv.innerHTML=res;verifierEtatNiveau2(oItem);}}selectionneItmNiveau(codeItem,"1");}function verifierEtatNiveau2(oItem){for (var i=0;i<oItem.childNodes.length;i++){var itemTmp=oItem.childNodes.item(i);if (itemTmp.nodeName=="item"){changerClasseEtatPlanNiveau(itemTmp,"2");}}}function viderNiveau2(){var oDiv=PF_donneObjet("STY_ligneNiveau2");if (oDiv!=null){oDiv.innerHTML="";}}function NAVIG_afficheLien(codeItem){var oItem=parent.XML_trouveNoeud(parent.planLMS.itemRacine,"item","identifier",codeItem);if (oItem==null && codeItem.indexOf("item")==0){codeItem=codeItem.substring(4);oItem=parent.XML_trouveNoeud(parent.planLMS.itemRacine,"item","identifier",codeItem);}if (oItem!=null){parent.planLMS.clicItem(oItem.getAttribute("nom"));}}function selectionneItmNiveau(codeItem,niv){var oDivNiv1=PF_donneObjet("STY_ligneNiveau"+niv);if (oDivNiv1!=null){var lesliens=oDivNiv1.getElementsByTagName("a");for (var i=0;i<lesliens.length;i++){if (lesliens[i].id!="lienNiv"+codeItem){var nclasse=lesliens[i].className;var rech="STY_lienNiveau"+niv+"Sel";if (nclasse.indexOf(rech)==0){lesliens[i].className=nclasse.replace(rech,"STY_lienNiveau"+niv);}}}var lienHtml=PF_donneObjet("lienNiv"+codeItem);if (lienHtml!=null){var ajAcheve="";if (lienHtml.className.indexOf("Acheve")>0){ajAcheve=" STY_lienNiveau"+niv+"Acheve";}lienHtml.className="STY_lienNiveau"+niv+"Sel"+ajAcheve;}}}function creerBoutonEtape(sens,numLex){var obj=PF_donneObjet("STY_boutonEtp"+sens);var ajPere="";if (obj==null){obj=parent.planLMS.PF_donneObjet("STY_boutonEtp"+sens);ajPere="parent.haut.";}if (obj!=null){obj.innerHTML="<a id=\"lienbtnEtp"+sens+"\" onmouseover=\""+ajPere+"changeFleche('btnEtp"+sens+"','dessus')\" onmouseout=\""+ajPere+"changeFleche('btnEtp"+sens+"','')\" href=\"#\"><img title=\""+donneLex(numLex)+"\" hspace=\"1\" border=\"0\" align=\"absmiddle\" src=\""+parent.RACINE_STYLE+"media/gen/btnEtp"+sens+".png\" id=\"btnEtp"+sens+"\"/></a>";}return (obj!=null);}function changeFleche(typeFleche,opt){ var ofleche=PF_donneObjet(typeFleche); if (ofleche==null){ofleche=parent.planLMS.PF_donneObjet(typeFleche);} var sourceAct=ofleche.src; if (sourceAct.indexOf("blanc.gif")>0){ sourceAct=ofleche.style.filter; } if ((sourceAct.indexOf('_of.')>0)||(sourceAct.indexOf('_on.')>0)){ var aje='of.'; if (opt=='dessus'){ aje='on.'; } changeImgBtn(ofleche,parent.RACINE_STYLE+"media/gen/"+typeFleche+"_"+aje+"png"); }}function NAVIG_majFleches(testPrec,testSuiv){if ((existeBoutonSuivant||oFlashIntBar) && testSuiv){if ((parent.planLMS.itemCourant==null && NAVIG_requete("start",true)=="true")|| NAVIG_requete("continue",true)=="true"){majFleche('EtpSuiv','_of','javascript:NAVIG_allerSuivant()');} else {majFleche('EtpSuiv','','#');}}if ((existeBoutonPrecedent||oFlashIntBar) && testPrec){if (NAVIG_requete("previous",true)=="true"){majFleche('EtpPrec','_of','javascript:NAVIG_allerPrecedent()');} else {majFleche('EtpPrec','','#');}}}function majFleche(cote,activaction,lhref){var nomFleche='btn'+cote;var ofleche=PF_donneObjet(nomFleche);var fpere=window;if (oFlashIntBar!=null){var actv=false;if (activaction=="_of"){actv=true;}var nomB="previous";if (cote=="EtpSuiv"){nomB="next";}try{oFlashIntBar.MOS_enableLMSButton(nomB,actv);}catch(e){}}if (ofleche==null){ofleche=parent.planLMS.PF_donneObjet(nomFleche);fpere=parent.planLMS;}if (ofleche!=null){changeImgBtn(ofleche,parent.RACINE_STYLE+"media/gen/"+nomFleche+activaction+".png");var oLien=fpere.PF_donneObjet('lien'+nomFleche);oLien.href=lhref;var tCurs="pointer";if (activaction==""){tCurs="default";}else if (cote=="EtpSuiv"){if (parent.planLMS.itemCourant==null){nlex=531;if (!parent.SUR_CHORUS){nlex=39;}} else {nlex=100;if (!parent.SUR_CHORUS){nlex=67;}}ofleche.title=donneLex(nlex);}try {oLien.style.cursor=tCurs;}catch(e){}}}function changeImgBtn(oImg,source){if (oImg!=null){var estIE7=false;if (navigator.appName.indexOf('Microsoft')>=0){try {if (window.XMLHttpRequest){estIE7=true;}}catch(e){}}if (navigator.appName.indexOf('Microsoft')>=0 && !estIE7){oImg.width=oImg.offsetWidth;oImg.height=oImg.offsetHeight;if (parent.SUR_CHORUS){oImg.src="ressources/images/gen/blanc.gif";} else {oImg.src="blanc.gif";}oImg.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+source+"',sizingMethod='image')";} else {oImg.src=source;}}}function surMenuCtxt(event){return true;}function tapeRechercheInterne(event){var oEvt=event;var oCible;if (!event){oEvt=window.event;oCible=window.event.srcElement;}else {oCible=oEvt.target;if (!oCible){oCible=oEvt.srcElement;}}if (oEvt.keyCode==13){rechercheItrn(oCible.value);}}function rechercheItrn(txtR){if (txtR=="*" || txtR.length>1){var tabParam=new Array();tabParam.push("connectionID##"+parent.serveur.numCnx);tabParam.push("itemCount##20");txtR=txtR.replace(/&/g,"&amp;");tabParam.push("searchedText##"+txtR);tabParam.push("courseID##"+parent.serveur.codeStage);tabParam.push("userID##"+parent.serveur.vMos_id);var nserv="courseSearch";if (txtR=="*"){nserv="getCourseResources";}var oRetour=parent.SYS_service(nserv,tabParam);var lesres=oRetour.getElementsByTagName("resource");if (lesres.length==0){alert(donneLex(264));} else {oResultatsRecherche=oRetour;parent.API_1484_11.scoEnAttente=true;parent.contenuLMS.location="rechParc.html";}}}function lanceRechItrn(){var champ=PF_donneObjet("STY_champRechercheInterne");if (champ){rechercheItrn(champ.value);}}function focusRechercheInterne(event){var oEvt=event;var oCible;if (!event){oEvt=window.event;oCible=window.event.srcElement;}else {oCible=oEvt.target;if (!oCible){oCible=oEvt.srcElement;}}if (oCible.value==donneLex(503)){oCible.value="";oCible.style.color=parent.planLMS.gardeCouleurChamp;}}function groupeParcours(){if (parent.serveur.codeStage.indexOf("[_MOSLCMS]")!=0){window.open(parent.RACINE_MOS+"MosSrv/aspx/ADM_groupesStage.aspx?action=vueGrpParc&codeStage="+parent.serveur.codeStage+"&codeGroupe="+parent.planLMS.codeGroupeParc+parent.serveur.nCnx()+"&styleST="+parent.STYLE_INTERFACE,"vuegrpstg"+parent.serveur.codeStage,"toolbars=no,resizable=yes,location=no,menubar=no,status=no,scrollbars=yes");}}function NAVIG_bloqueRetour(evt){if (evt==null){evt=window.event;}if (evt.keyCode==8){var cible=evt.target; if (!parent.estMoz){cible=evt.srcElement;} if (cible!=null && cible.id=="STY_champRechercheInterne"){return true;}evt.returnValue=false;evt.cancelBubble=true;try {evt.stopPropagation();evt.preventDefault();}catch(e){}return false;}return true;}function NAVIG_finTempsParc(){var tempsMax=parent.planLMS.limitConditions(parent.planLMS.itemRacine,"attemptAbsoluteDurationLimit");if (parent.planLMS.limiteHeures!="" && (tempsMax==""||tempsMax=="0.0")){var tempsTotal=PF_attr(parent.planLMS.DOMManifest.documentElement,"tempsTotal");if (tempsTotal==""){tempsTotal=0;}else{tempsTotal=Number(tempsTotal);}if (Number(tempsTotal)<Number(parent.planLMS.limiteHeures)*3600){return setTimeout(NAVIG_finTempsParc,60000);}}try {parent.contenuLMS.terminerSCODepuisTempParc();}catch(e){}var nlex=63;var nlex2=89;if (parent.SUR_CHORUS){nlex=532;nlex2=250;}alert(donneLex(nlex)+"\n"+donneLex(nlex2));parent.planLMS.DOMManifest.documentElement.setAttribute("sortieSurFinTempsParc","1");if (parent.planLMS.limiteHeures!=""){parent.planLMS.DOMManifest.documentElement.setAttribute("verifLimiteHeures",parent.planLMS.limiteHeures);}NAVIG_retour("suspendAll");}function majCompteurTempsParc(){var restant=tempsFinEnMilli-(new Date()).getTime();if (restant>1000){setTimeout(majCompteurTempsParc,60000);restant=Math.floor(restant/60000);} else {restant=0;}PF_modifTexteDiv("STY_nbMinutesRestantes",restant);}function IC_openDoc(nomFich,optionsFen){window.open(parent.RACINE_stage+"contenu/pages/"+nomFich,nomFich.replace(/\W/g),"menubar=no,toolbar=no,location=no,status=no,"+optionsFen);}function IC_openSco(codeSco,optionsFen){window.open(parent.RACINE_stage+"sco/"+codeSco+".html","fensco"+codeSco,"menubar=no,toolbar=no,location=no,status=no,"+optionsFen);}function voirMesNotes(){var oFen=window.open(parent.RACINE_MOS+"MosSrv/aspx/diplm.aspx?type=notes&ref="+parent.PF_crypte(parent.serveur.vMos_id+"##"+parent.serveur.codeStage)+parent.serveur.nCnx(),'expnotes'+parent.serveur.codeStage,"scrollbars=yes,toolbar=no,resizable=yes,status=yes,menubar=yes,width=670,height=660,top="+Math.round(screen.height/14)+",left="+Math.round(screen.width/8));oFen.focus();}function NAVIG_barreProgress(oItem,pcPage){if (oBarreProgress==null){return ;}var nbFeuilles=0;var posFeuilleCourante=0;if (oItem!=null){var codeItm=oItem.getAttribute("identifier");var lesitems=parent.XML_listeParBalise(parent.planLMS.itemRacine,"item");for (var i=0;i<lesitems.length;i++){var itemTmp=lesitems[i];if (parent.planLMS.estFeuille(itemTmp)){nbFeuilles++;if (itemTmp.getAttribute("identifier")==codeItm){posFeuilleCourante=nbFeuilles;}}}posFeuilleCourante--;} else {posFeuilleCourante=1;nbFeuilles=1;}if (posFeuilleCourante>=0 && nbFeuilles>0){var intervalSco=0;if (pcPage>0){intervalSco=Math.floor((pcPage-0.1)/nbFeuilles*100);}var largJauge=Math.round(posFeuilleCourante/nbFeuilles*100)+intervalSco;var lesdv=oBarreProgress.getElementsByTagName("div");if (lesdv.length==0){oBarreProgress.innerHTML='<div class="STY_barreProgresJaugeLMS" style="width:0%;overflow:hidden">&nbsp;</div>';lesdv=oBarreProgress.getElementsByTagName("div");}if (largJauge<0){largJauge=0;}lesdv[0].style.width=largJauge+"%";}}function desactCDroit(event){if (event){event.stopPropagation();event.returnValue=false;} else {window.event.returnValue=false;}return false;}function desactiverClicDroit(){document.getElementsByTagName("html")[0].oncontextmenu=desactCDroit;}var oFlashIntBar;function NAVIG_initFlashNavBar(){var oDiv=PF_donneObjet("FlashNavBar");if (oDiv==null){oDiv=window.document;}var tabWM=oDiv.getElementsByTagName('object');if (tabWM.length>0){oFlashIntBar=tabWM[0];if (parent.estMoz){oFlashIntBar=document.embeds[oFlashIntBar.id];}}if (oFlashIntBar!=null){if (parent.planLMS.dernierItemLance!=null){var oNavInter=parent.XML_filsNS(parent.planLMS.dernierItemLance,"adlnav","presentation");if (oNavInter!=null){oNavInter=parent.XML_filsNS(oNavInter,"adlnav","navigationInterface");}parent.planLMS.masqueBoutonLMS(oNavInter,"previous","ActivitePrecedente");parent.planLMS.masqueBoutonLMS(oNavInter,"continue","ActiviteSuivante");parent.planLMS.masqueBoutonLMS(oNavInter,"exitAll","QuitterTout");parent.planLMS.masqueBoutonLMS(oNavInter,"suspendAll","SuspendreTout");}setTimeout(finirInitFlashNavBar,800);}}function finirInitFlashNavBar(){NAVIG_majFleches(true,true);try{oFlashIntBar.MOS_setTitleCourse(parent.serveur.titreStage);}catch(e){}var oAct=parent.planLMS.dernierItemLance;if (oAct!=null){var nomActivite="";var oDshtml=parent.planLMS.PF_donneObjet('lienP'+oAct.getAttribute("nom"));if (oDshtml!=null){nomActivite=oDshtml.innerHTML;}try {oFlashIntBar.MOS_setCurrentItem(PF_attr(oAct,"identifier"),nomActivite,"");}catch(e){}}}function NAVIG_reprendreParcours(){return "resumeAll";}function initCadreContenuInterne(oFen){var obj=oFen.PF_donneObjet("STY_cadreInterneDyn");if (obj){if (obj.getElementsByTagName("iframe").length==0){obj.style.visibility="visible";var srcIfrm=parent.XML_texteNoeud(obj).replace(/\s+/g,"");srcIfrm=srcIfrm.replace(/\xA0/g,"");var lid=parent.serveur.vMos_id;if (parent.oUtilCnx){lid=parent.oUtilCnx.id();}srcIfrm=srcIfrm.replace("USER_ID",lid);srcIfrm=srcIfrm.replace(/COURSE_ID/g,parent.serveur.codeStage);srcIfrm=srcIfrm.replace("USER_TIME_OFFSET",(new Date()).getTimezoneOffset());var langU=parent.serveur.vMos_lang;if (parent.SUR_CHORUS){srcIfrm=srcIfrm.replace("INTERFACE_NAME",parent.STYLE_INTERFACE);} else {langU=navigator.language;if (navigator.userLanguage){langU=navigator.userLanguage;}}srcIfrm=srcIfrm.replace("USER_LANGUAGE",langU);var largw=obj.style.width;if (largw=="" && obj.offsetWidth>1){largw=obj.offsetWidth+"px";}if (largw==""){largw="100%";}var hautr=obj.style.height;if (hautr=="" && obj.offsetHeight>1){hautr=obj.offsetHeight+"px";}if (hautr==""){hautr="100%";}obj.innerHTML='<iframe frameborder="0" style="width:'+largw+';height:'+hautr+'" src="'+srcIfrm+'"></iframe>';}}}function IC_certifTent(){if (!parent.SUR_CHORUS){return alert("You must be logged to MOS Chorus");}setTimeout(ouvFenCertTent0,500);}function ouvFenCertTent0(tent){var fenb=window.open(parent.RACINE_MOS+"MosSrv/aspx/diplm.aspx?ref="+parent.PF_crypte(parent.oUtilCnx.id()+"##"+parent.serveur.codeStage)+"&type=certTent&idItem="+parent.planLMS.activiteCourante.getAttribute("identifier")+"&ncnx="+parent.serveur.numCnx+"&styleST="+parent.STYLE_INTERFACE,"certiftent","toolbar=yes,resizable=yes,menubar=yes,status=no,location=no,width=700,top=30,left=120,heigth=550");fenb.focus();}function MENU_effacePlanFenetre(){if (!parent.planLMS.affichagePlanEnCours){parent.planLMS.PLAN_effacePop();}}function NAVIG_notesContributeur(){if (testEstContributeur()){var stg=parent.serveur.codeStage;titreItemBlocNotes=parent.serveur.titreStage;var codeItem="";var codePage="";var oScoMos=parent.contenuLMS.oSco;if (oScoMos!=null && stg==oScoMos.codeStage){titreItemBlocNotes+=" / "+oScoMos.titre;var oPage=oScoMos.donnePage(oScoMos.numPageCourante);if (oPage){codePage=oPage.code;titreItemBlocNotes=parent.serveur.titreStage+" / "+oPage.titre;}codeItem=oScoMos.identifiant;} else {if (parent.planLMS.itemCourant){codeItem=parent.planLMS.itemCourant.getAttribute("identifier");}}if (parent.depuisFenGNR){if (codePage!=""){codeItem=codePage;}return top.opener.top.menu.GTR_ouvrirNoteMenu(codeItem);}var ncnx=parent.serveur.numCnx;if (parent.SUR_CHORUS_ADM){ncnx=top.opener.top.serveur.numCnx;}var oFen=window.open(parent.RACINE_MOS+"MosSrv/aspx/fentr.aspx?ref=noteContrib&stg="+stg+"&item="+codeItem+"&idPg="+codePage+"&ncnx="+ncnx,"notesContrib"+stg,"top=100,left=90,width=420,height=390,menubar=no,location=no,toolbar=no,resizable=yes,status=no");oFen.focus();}}function testEstContributeur(){if (parent.depuisFenGNR){return true;}else if (parent.SUR_CHORUS){var tabParam=new Array();var ncnx=parent.serveur.numCnx;var idU=parent.serveur.vMos_id;if (parent.SUR_CHORUS_ADM && top.opener && top.opener.top.serveur){ncnx=top.opener.top.serveur.numCnx;idU=top.opener.top.usrCnx.id();}tabParam.push("connectionID##"+ncnx);tabParam.push("courseID##"+parent.serveur.codeStage);tabParam.push("userID##"+idU);var oRetour=parent.SYS_service("isContributor",tabParam);var roleRes=parent.XML_texteNoeud(oRetour);if (roleRes=="0200"||roleRes=="4000"){return true;}}return false;}function chopeEtStpEvt(evt){try {if (window.event){evt=window.event;evt.cancelBubble=true;}else {evt.stopPropagation();}}catch(e){}}function NAVIG_objetsLiesStg(nobj){if (!parent.SUR_CHORUS){return alert("You must be logged to MOS Chorus");}var prmobj="";if (nobj=="forum"){prmobj="forumstg";}if (nobj=="blog"){prmobj="blogstg";}var ref=parent.RACINE_MOS+"MosSrv/index.htm?ncnx="+parent.serveur.numCnx+"&"+prmobj+"="+parent.serveur.codeStage;window.open(ref);}function NAVIG_lmsActif(){if (parent.planLMS.dateDerniereActionLMS==null){return;}var tempsDepuisAction=(new Date()).getTime() - parent.planLMS.dateDerniereActionLMS;tempsDepuisAction=tempsDepuisAction/1000;if (tempsDepuisAction<60){var tabParam=new Array();tabParam.push("accessID##"+parent.serveur.numAcces);tabParam.push("userID##"+parent.serveur.vMos_id);parent.SYS_service("activeAccessToCourse",tabParam);} else if (tempsDepuisAction>((parent.planLMS.TEMPS_INACTIF_AUTORISE*60)+91000)){parent.planLMS.dateDerniereActionLMS=null;NAVIG_retour("suspendAll");} else if (tempsDepuisAction>(parent.planLMS.TEMPS_INACTIF_AUTORISE*60) && parent.planLMS.fenActifOvrt==null){if (parent.planLMS.oFenetre!=null && parent.planLMS.oFenetre.hide){parent.planLMS.fenActifOvrt=window.open(parent.RACINE_MOS+"MosSrv/ressources/html/continue.htm","continueLmsActif","location=no,menubar=no,top=50,left=100,width=310,height=180");} else {parent.planLMS.PLAN_afficheMessageActivitePlan();}}}
