var actionD;var etatValide;var iconeOui="STY_zoneSuccesExo";var iconeNon="STY_zoneEchecExo";var CODE_V="nw";var CODE_F="ng";var premiereFois=true;var suggestionDejaAffiche='';var indicCourant;var exerciceFlash=false;var zoneScoreAffiche="";var masqueInteractions=false;var depuisPrecedent=false;var qcResult=false;var actionValider=false;var niveauCertitudeExiste=false;var montrerFauxNonSelectionne=false;function EXO_init(type0) {type=type0;entrerDonnees();if (etatEval && !parent.oSco.evaluation.evalInteraction){masqueInteractions=true;}var themeExo=PF_donneObjet("STY_themeExo");if (themeExo){var oPage=parent.oSco.donnePage(parent.oSco.numPageCourante);themeExo.innerHTML=oPage.theme;}var oQuestion=PF_donneObjet("STY_question");if (oQuestion && oQuestion.innerHTML=="" && oQuestion.style.position!="absolute"){oQuestion.style.display="none";}var oZEex=PF_donneObjet("STY_zoneExercice");if (oZEex){if (oZEex.style.display=="none"){oZEex.style.display="block";}if (oZEex.style.visibility=="hidden" && delaiZoneCtn==""){oZEex.style.visibility="";}PF_affecterAlt();}window.focus();initialiser();var oDvNivCert=PF_donneObjet("STY_niveauCertitude");if (oDvNivCert && (etatEval || !dansZoneQueEval(oDvNivCert))){niveauCertitudeExiste=true;}if (type=='TAT'){setTimeout(focusPremierChamp,100);}GEN_validerPossible(type0);GEN_activerSuivantDemar();if (etatEval && parent.oSco.evaluation.etatCorrige){ EXO_mesReponses();} else {if (etatEval){var numQ=-1;for (var j=0;j<parent.oSco.evaluation.questions.length;j++){if (parent.oSco.evaluation.questions[j].codePage==codePage){numQ=j;}}if (numQ>=0){if (pageEstRecharge){exo.afficherMesReponses(parent.oSco.evaluation.donneReponsesQuestion(codePage));relireNiveauCertitude(codePage);desactiverBoutonValider();desactiverBoutonInit();EXO_desactiver();actionValider=true;if (GEN_suivantPossible()){activerBoutonSuivant();}} else {depuisPrecedent=true;relireNiveauCertitude(codePage);actionDetecte();exo.afficherMesReponses(parent.oSco.evaluation.donneReponsesQuestion(codePage));if (parent.oSco.autorisePrecedent=="oui"){actionValider=true;}if (GEN_suivantPossible()){activerBoutonSuivant();}if (parent.oSco.evaluation.evalInteraction && !parent.oSco.evaluation.questionnaire){if (parent.oSco.evaluation.questions[numQ].valide){afficheZoneDyn(iconeOui);} else {afficheZoneDyn(iconeNon);}}}} else {var oPg=parent.oSco.donnePage(parent.oSco.numPageCourante);if (oPg.prerequis.indexOf('RESULT')==0){qcResult=true;}if (qcResult && parent.SCO_suivantPossible() && !desactiveSuivantPg){activerBoutonSuivant();}}} else {if (parent.oSco.afficherSolutionsDirect){EXO_correctionOuSolution();}}}EXO_initExerciceSpecifique();}function EXO_initExerciceSpecifique(){}function EXO_solutionDirecte(){return !EXO_peutVoirMesReponses();}function EXO_correctionOuSolution(){if (etatEval && !parent.oSco.evaluation.parcourable){return;}if (!etatEval && !parent.oSco.exoSolutions){return;}var zoneSol=PF_donneObjet("STY_zoneVoirSolutions");var solutionDirecte=false;if (zoneSol==null && EXO_solutionDirecte()){solutionDirecte=true;}if (solutionDirecte){EXO_solutions();afficheZoneDyn(iconeNon);} else {if (zoneSol==null){GEN_masqueCommentaireClassique();genereLienSolution();} else {zoneSol.style.display="block";}exo.corrigerReponses(true);}}function EXO_compteurLimite(){if (dureePage!=''){dureePage=Number(dureePage);if ((!isNaN(dureePage))&&(dureePage>0)){oTempsLimite=PF_donneObjet('STY_tempsLimiteE');tempsLimiteCourant=dureePage;setTimeout(EXO_finTemps,dureePage*1000);if (oTempsLimite!=null){oTempsLimite.innerHTML=dureePage;setTimeout(GEN_decrementeTempsL,1000);}}}}function initialiser(){actionValider=false;if (premierInitZoneContenu=="non"){GEN_lireMediaZone("STY_zoneExercice",true,"non");}GEN_lireMediaZone("STY_zoneExercice",false,premierInitZoneContenu);premierInitZoneContenu="non";if (!premiereFois){exo.initialiser();GEN_masqueBulle(true);GEN_masqueCommentaireClassique();}etatValide=0; masquerZonesDyn();if (masqueInteractions){PF_masquerDiv("STY_zoneScoreExo");}PF_modifTexteDiv("STY_scoreAtteintExo","0");indicCourant=null;suggestionDejaAffiche='';actionD=false;if (!premiereFois){desactiverBoutonInit();}if (exo.commentaireSucces!=null && exo.commentaireSucces.estBulle && exo.commentaireSucces.estAffiche){exo.commentaireSucces.masquerBulle();}for (var i=0;i<exo.indications.length;i++){if (exo.indications[i].delai=="0"){exo.indications[i].afficher();}}if (exo.consigne!=null && (!etatEval || !parent.oSco.evaluation.etatCorrige)){if (exo.consigne.delai==""){exo.consigne.delai="0";}if (exo.consigne.delai=="0"|| !premiereFois){exo.consigne.afficher();}}EXO_compteurLimite();if (!premiereFois){attrapeEvtClic=true;}premiereFois=false;if (parent.oSco.forcerReponse){desactiverBoutonValider();}if (niveauCertitudeExiste){PF_donneObjet("nivcert1").checked=false;PF_donneObjet("nivcert2").checked=false;PF_donneObjet("nivcert3").checked=false;desactiverBoutonValider();}}function STG_initialiser(evt){if (MODE_EDIT){return ;}chopeEtStpEvt(evt);indexLienOuvert=-1;GEN_masqueCommentaireClassique();initialiser();}function GEN_clavier(){GEN_masqueBulle(false);if (exo.actif && actionD && existeBoutonValider()){if (niveauCertitudeNonRempli()){return false;}return EXO_valider();}if (etatEval && !actionD && !actionValider && parent.oSco.evaluation.forcerRepQuestion){return false;}if (etatSuivant && !desactiveSuivantPg){STG_allerSuivant();}}function actionTouchePgSuivante(glissade){if (etatSuivant && GEN_suivantPossible()){return STG_allerSuivant();}if (actionD && !exo.valide && exo.actif){EXO_valider();}}function actionTouchePgPrecedente(glissade){if (glissade){if (etatPrecedent && GEN_precedentPossible()){return STG_allerPrecedent();}return;}if (!actionD && etatPrecedent){return STG_allerPrecedent();}if (actionD && (!exo.valide || !etatEval)){STG_initialiser();}}function actionDetecte(){if (actionD==false){actionD=true;etatValide=0;activerBoutonInit();activerBoutonValider();}}function afficherIndication(){indicCourant.afficher();suggestionDejaAffiche+=indicCourant.id+',';if (indicCourant.ref!=""){exo.marquerSuggestionRef(indicCourant.ref);}if (!indicCourant.estBulle){if (exo.consigne!=null&&!exo.consigne.estBulle){exo.consigne.estAffiche=false;}}}function EXO_ajouterQuestion(){if (!parent.oSco.evaluation.etatCorrige){parent.oSco.evaluation.ajouterQuestion(exo,codePage);}}function EXO_enregistrerPage(){if (etatEval&&!parent.oSco.evaluation.etatCorrige){exo.valider();EXO_ajouterQuestion();evalObjectifsNonRepondu();creerMenuPages();parent.SCO_persiste();alert(donneLex(71));}}function EXO_valider(evt){chopeEtStpEvt(evt);if (qcResult){STG_allerSuivant(evt);return 0;}scoreAtteint=-1;exo.effacerMarqueSuggestionRef();exo.valider();actionValider=true;parent.oSco.exerciceDejaValide=codePage;if (parent.oSco.scoreBinaire && !exo.valide){exo.scoreCourant=0;}indicCourant=exo.donneSuggestion();if (etatEval && etatValide==0){EXO_ajouterQuestion();evalObjectifsNonRepondu();if (exo.valide || !parent.oSco.evaluation.evalSuggestions || indicCourant==null){etatValide=1;parent.allerEtapeSuivante=false; desactiverBoutonValider(); desactiverBoutonInit(); if (GEN_suivantPossible()){ if (!masqueInteractions){ activerBoutonSuivant(); } } window.focus();EXO_desactiver();}}if (masqueInteractions){ if (!desactiveSuivantPg){STG_allerSuivant();}} else {EXO_afficherScore();window.focus();if (exo.valide==false){ if (!etatEval){activerBoutonInit();}else{desactiverBoutonInit();}if (!etatEval || type!='TAT' || exo.scoreManuel==""){afficherCommentaireEchec();}} else { etatValide=1;if (!etatEval){desactiverBoutonValider();if (parent.SCO_suivantPossible()){if (!desactiveSuivantPg){activerBoutonSuivant();}}EXO_affecterAlt();EXO_desactiver();}afficherCommentaireSucces();exo.corrigerReponses(true);}if (etatEval||parent.SCO_exerciceBloquant()){creerMenuPages();} }depuisPrecedent=false;}function EXO_desactiver(){exo.desactiver();if (niveauCertitudeExiste){PF_donneObjet("nivcert1").disabled=true;PF_donneObjet("nivcert2").disabled=true;PF_donneObjet("nivcert3").disabled=true;}}function afficherCommentaireEchec(){var res='';if (!etatEval || !parent.oSco.evaluation.questionnaire){afficheZoneDyn(iconeNon);exo.corrigerReponses(true);}if (exo.consigne==null||!exo.consigne.estAffiche||exo.consigne.estBulle){GEN_masqueCommentaireClassique();}if (indicCourant!=null){afficherIndication();var cmtEchecEv=false;if (etatEval && !parent.oSco.evaluation.evalSuggestions){desactiverBoutonValider(); desactiverBoutonInit(); window.focus();EXO_desactiver();cmtEchecEv=true;}if ((etatEval &&parent.oSco.evaluation.etatCorrige)||cmtEchecEv){EXO_correctionOuSolution();}/*if (etatEval && parent.oSco.evaluation.evalSuggestions){activerBoutonInit();}*/} else {EXO_correctionOuSolution();if (effacerZoneCmt && PF_donneObjet("STY_zoneVoirSolutions")!=null){PF_masquerDiv("STY_zoneCommentaire");}}}function genereLienSolution(){GEN_changerContenuDetail('<a class="STY_lienDansZoneComt" href="javascript:EXO_solutions()">'+donneLex(59)+'</a>');}function afficherCommentaireSucces(){var brancheDirect=false;GEN_masqueCommentaireClassique();if (exo.commentaireSucces!=null){if (exo.commentaireSucces.branche!='' && exo.commentaireSucces.duree=='0'){brancheDirect=true;}exo.commentaireSucces.afficher();}if (!etatEval || !parent.oSco.evaluation.questionnaire){if(!brancheDirect){afficheZoneDyn(iconeOui);}}}function afficherCommentaireSolution(){var i=0;while (i<exo.indications.length){if (exo.indications[i].ref.indexOf("[solution]")==0){exo.indications[i].afficher();if (!exo.indications[i].estBulle){GEN_changerTitreDetail(exo.indications[i].titre);}break;}i++;}}function afficheZoneDyn(nomZone){if ((nomZone.indexOf("STY_")==0)&&(exo.scoreTotal>0)){masquerZonesDyn();PF_afficherDiv(nomZone);GEN_lireMediaZone(nomZone,false);}}function soumettreForm(){EXO_valider();}function existeReponseDansInteractions(){var tabInteract=exo.donneTabReponses();for (var j=0;j<tabInteract.length;j++){if (tabInteract[j][1]!=""){return true;}}return false;}function STG_allerSuivant(evt){EXO_validerSurSortiePage(true);if (etatSuivant&& !MODE_EDIT){var oCmt=donneCmtAffiche();if (!etatEval && parent.SCO_exerciceBloquant() && !GEN_pageSuivanteVue() && !exo.valide && (oCmt==null||oCmt.branche=="")){return false;}if (etatEval && parent.oSco.evaluation.etatCorrige){return parent.oSco.evaluation.allerSuivant();}etatSuivant=false;if (depuisPrecedent&&parent.pagePrecHisto!=""){var nump=parent.oSco.numeroPage(parent.pagePrecHisto);if (etatEval){nump=parent.oSco.numPageCourante+1;var trouvePoss=false;while (!trouvePoss && (nump<parent.oSco.tabPages.length)){var oPg=parent.oSco.donnePage(nump);if (oPg.validePrerequis()){trouvePoss=true;} else {parent.oSco.evaluation.effaceQuestion(oPg.codePage);nump++;}}}parent.SCO_allerPage(nump);parent.pagePrecHisto="";} else {if (oCmt==null||oCmt.branche==''){if (etatEval){parent.oSco.evaluation.allerSuivant();} else {parent.SCO_pageSuivante();}} else {EXO_brancher(oCmt.branche);}}}}function EXO_affecterAlt(){var imgbSuiv=PF_donneObjet("boutonSuivant");if (imgbSuiv!=null){if (parent.SCO_suivantPossible() && !parent.allerEtapeSuivante){imgbSuiv.title==parent.SCO_titrePageSuivante();}}}function EXO_solutions(){exo.enleverCorrection();exo.solutions();if (etatEval && parent.oSco.evaluation.etatCorrige){EXO_solutionsEval();} else {if (!etatEval){activerBoutonInit();}desactiverBoutonValider();EXO_desactiver();masquerZonesDyn();GEN_masqueCommentaireClassique();afficherCommentaireSolution();if (parent.oSco.afficherSolutionsDirect){if (!desactiveSuivantPg){activerBoutonSuivant();}exo.valide=true;}}}function EXO_peutVoirMesReponses(){return true;}function EXO_solutionsEval(){desactiverBoutonValider();desactiverBoutonInit();EXO_desactiver();masquerZonesDyn();var oExisteMesReponses=PF_donneObjet("STY_zoneVoirMesReponses");if (oExisteMesReponses!=null||EXO_peutVoirMesReponses()){afficheZoneDyn("STY_zoneVoirMesReponses");if (oExisteMesReponses==null && EXO_peutVoirMesReponses()){GEN_masqueCommentaireClassique();GEN_changerContenuDetail('<a class="STY_lienDansZoneComt" href="javascript:EXO_mesReponses()">'+donneLex(62)+'</a>');}}afficherCommentaireSolution();}function EXO_mesReponses(){exo.initialiser();exo.afficherMesReponses(parent.oSco.evaluation.donneReponsesQuestion(codePage));desactiverBoutonValider();desactiverBoutonInit();relireNiveauCertitude(codePage);exo.valider();PF_masquerDiv("STY_zoneVoirMesReponses");if (exo.valide==false){ var correctionManuelle=false;if (type=='TAT' && exo.scoreManuel!=""){correctionManuelle=true;}if (!etatEval || !parent.oSco.evaluation.questionnaire){if (!correctionManuelle){afficheZoneDyn(iconeNon);}}if (!correctionManuelle){EXO_correctionOuSolution();}} else { afficherCommentaireSucces();exo.corrigerReponses(true);}EXO_desactiver();EXO_afficherScore();}function EXO_afficherScore(){var oDiv=PF_donneObjet("STY_scoreAtteintExo");if (oDiv!=null){oDiv.innerHTML=localeNb(exo.scoreCourant);}PF_afficherDiv("STY_zoneScoreExo");}function masquerZonesDyn(score){PF_masquerDiv('STY_zoneSuccesExo');PF_masquerDiv('STY_zoneEchecExo');PF_masquerDiv('STY_zoneVoirSolutions');PF_masquerDiv('STY_zoneVoirMesReponses');}function EXO_ajouterCommentaire(idDiv,titrec,posX,posY,posL,posH,duree,delai,styBulle,branche,orign,fonduE,fonduS,initX,initY,vitesse,defil,vdefil){if (idDiv.indexOf('divSugg')==0){if (titrec==""){titrec=donneLex(10);if (delai=="[solution]"){titrec=donneLex(23);}}} else if (idDiv=='divConsigne'){if (titrec==""){titrec=donneLex(22);}if (delai==0){delai='';}} else if (idDiv=='divCmtSucces'){if (titrec==""){titrec=donneLex(58);}if (delai==0){delai='';}}var oCmt=new Commentaire(idDiv,titrec,posX,posY,posL,posH,duree,delai,orign,fonduE,fonduS,initX,initY,vitesse,defil,vdefil);oCmt.init(styBulle);oCmt.branche=branche;if (idDiv=='divCmtSucces'){exo.commentaireSucces=oCmt;} else if ((idDiv.indexOf("divSugg")==0)||(idDiv.indexOf("divCmt")==0)){exo.indications.push(oCmt);} else if (idDiv=='divConsigne'){exo.consigne=oCmt;}}function GEN_masqueBulle(force){if (laisseBulleAffiche){return ;}for (var i=0;i<exo.indications.length;i++){var oCmt=exo.indications[i];if (oCmt.estBulle && oCmt.estAffiche){if (force||oCmt.duree==''){if (oCmt.id.indexOf('divCmt')<0 || oCmt.duree==''){oCmt.masquerBulle();}}}}if (exo.consigne!=null && exo.consigne.estBulle && exo.consigne.estAffiche && exo.consigne.duree==''){exo.consigne.masquerBulle();}if (exo.commentaireSucces!=null && exo.commentaireSucces.estBulle && exo.commentaireSucces.estAffiche && exo.commentaireSucces.duree==''){exo.commentaireSucces.masquerBulle();}laisseBulleAffiche=false;}function GEN_masqueCommentaireClassique(){PF_modifTexteDiv('STY_titreCommentaire','');var oStyCmt=PF_donneObjet("STY_contenuCommentaire");for (var i=0;i<exo.indications.length;i++){var oCmt=exo.indications[i];if (!oCmt.estBulle){if (oCmt.estAffiche){var oDiv=PF_donneObjet(oCmt.id);if (oStyCmt!=null){oDiv.innerHTML=oStyCmt.innerHTML;}oCmt.estAffiche=false;}}}if (exo.consigne!=null && !exo.consigne.estBulle){if (exo.consigne.estAffiche){var oDiv=PF_donneObjet(exo.consigne.id);if (oStyCmt!=null){oDiv.innerHTML=oStyCmt.innerHTML;}exo.consigne.estAffiche=false;}}if ((exo.commentaireSucces!=null)&&(!exo.commentaireSucces.estBulle)){if (exo.commentaireSucces.estAffiche){var oDiv=PF_donneObjet(exo.commentaireSucces.id);if (oStyCmt!=null){oDiv.innerHTML=oStyCmt.innerHTML;}exo.commentaireSucces.estAffiche=false;}}GEN_changerContenuDetail("");}function donneCmtAffiche(){var oCmt=null;if ((exo.commentaireSucces!=null) && exo.commentaireSucces.estAffiche){oCmt=exo.commentaireSucces;}if (oCmt==null){for (var i=0;i<exo.indications.length;i++){if (exo.indications[i].estAffiche && exo.indications[i].id.indexOf('divSugg')==0){oCmt=exo.indications[i];}}}return oCmt;}function SPE_dureeCmt(idCmt){if (MODE_EDIT){return false;}var oCmt=donneCmtID(idCmt);if (oCmt!=null){if (oCmt.estBulle){oCmt.masquerBulle();} else {if (oCmt.estAffiche){if (oCmt.fonduS!=""){oCmt.fonduFin();} else {GEN_masqueCommentaireClassique(true);}}}if (oCmt.branche!=''){if (oCmt.fonduS!=""){setTimeout("EXO_brancher('"+oCmt.branche+"')",oCmt.fonduS*1000);} else {EXO_brancher(oCmt.branche);}}}}function EXO_finTemps(){if ((!exo.valide)&&(!MODE_EDIT)&& exo.actif){alert(donneLex(63));if (!etatEval){EXO_valider();EXO_desactiver();desactiverBoutonValider();} else {EXO_valider();}}}function SPE_clicDansBulle(evt,idCmt){var oEv;if (parent.oSco.config_navigateur=="Netscape"){oEv=evt;} else {oEv=window.event;}var oCmt=donneCmtID(idCmt);if (oCmt==null){oCmt=donneCmtID("divCmt"+idCmt);}if ((oCmt!=null)&&(oCmt.estBulle)){oEv.cancelBubble=true;if (parent.oSco.config_navigateur=="Netscape"){oEv.stopPropagation();}}}function donneCmtID(idCmt){var oCmt=null;if (idCmt=="divConsigne"){oCmt=exo.consigne;} else if (idCmt=="divCmtSucces"){oCmt=exo.commentaireSucces;} else {for (var i=0;i<exo.indications.length;i++){if (exo.indications[i].id==idCmt){oCmt=exo.indications[i];}}}return oCmt;}function EXO_brancher(val){if (val.indexOf('pg')==0){val=parent.oSco.identifiant+"/"+val;}if (val.indexOf('/')<0){val+="/";}if (etatEval && !parent.oSco.evaluation.etatCorrige){if (etatValide==0){if (!qcResult){exo.valider();parent.oSco.evaluation.ajouterQuestion(exo,codePage);}}if (val.indexOf(parent.oSco.identifiant)!=0 && !parent.oSco.evaluation.estJugee){parent.oSco.evaluation.juger();parent.oSco.evaluation.resultatsLMS();}}GLOBAL_allerPage(val);}function CRS_afficherDetail(num){window.status='';if (num!=''){CRS_afficheCommentaire(num);}}function CRS_effacerDetail(num){var oCmt=donneCmtID("divCmt"+num);if (oCmt.duree==""){if (oCmt.estBulle){GEN_masqueBulle(false);} else {GEN_masqueCommentaireClassique();}}}function CRS_afficheCommentaire(num){var oCmt=donneCmtID("divCmt"+num);if (oCmt==null){alert("Error: comment "+num+" not found.");return ;}if (!oCmt.estAffiche){oCmt.afficher();}}function SPE_delaiCmt(idCmt){var oCmt=donneCmtID(idCmt);if (!oCmt.estAffiche){oCmt.afficher();}}function EXO_validerAuto(){if (parent.oSco.exoValideChoixUnique &&(!depuisPrecedent)&&(!etatEval || !parent.oSco.evaluation.etatCorrige)){desactiverBoutonValider();EXO_valider();}}function niveauCertitudeNonRempli(){if (niveauCertitudeExiste){if (!PF_donneObjet("nivcert1").checked && !PF_donneObjet("nivcert2").checked && !PF_donneObjet("nivcert3").checked){return true;}}return false;}function activerBoutonValider(){if (niveauCertitudeNonRempli()){return ;}GEN_activeBouton("Valider",13,EXO_valider);GEN_etatChampBouton(true,"EXO_valider");if (oFlashNavBar){try{oFlashNavBar.MOS_enableBtnSubmit(true);}catch(e){}}if (etatEval && !existeBoutonValider() && !desactiveSuivantPg){activerBoutonSuivant();}}function desactiverBoutonValider(){GEN_desactiveBouton("Valider",EXO_valider);GEN_etatChampBouton(false,"EXO_valider");if (oFlashNavBar){try{oFlashNavBar.MOS_enableBtnSubmit(false);}catch(e){}}if (etatEval && !existeBoutonValider() && !parent.oSco.evaluation.etatCorrige){desactiverBoutonSuivant();}}function doubleClicPgExercice(ccar){if (etatEval){return ;}if (ccar==33){STG_allerPrecedent();}if (ccar==34){STG_allerSuivant();}}function toucheRetourBloquee(){if (etatPrecedent && !actionD && !attrapeEvtClic){STG_allerPrecedent();}}function GEN_activerSuivantDemar(){if (etatEval){evalObjectifsNonRepondu();}if ((etatEval && (parent.oSco.evaluation.etatCorrige || !parent.oSco.evaluation.forcerRepQuestion)) || (!etatEval && (!parent.SCO_exerciceBloquant()|| GEN_pageSuivanteVue()))){if (GEN_suivantPossible()){activerBoutonSuivant();}}}/*function existeBoutonSuivant(){if (PF_donneObjet("STY_boutonSuivant")!=null){return true;}var lesa=document.getElementsByTagName("button");for (var p=0;p<lesa.length;p++){var ress=new String(lesa[p].getAttribute("onclick"));if (ress.indexOf("STG_allerSuivant()")>=0){return true;}}return false;}*/function existeBoutonValider(){if (PF_donneObjet("STY_boutonValider")!=null || oFlashNavBar!=null){return true;}var lesa=document.getElementsByTagName("button");for (var p=0;p<lesa.length;p++){var ress=new String(lesa[p].getAttribute("onclick"));if (ress.indexOf("EXO_valider()")>=0){return true;}}return false;}function evalObjectifsNonRepondu(){if (parent.oSco.evaluation.forcerRepQuestion){return ;}var QUESTIONS_NOT_ANSWERED="unknown";var ALL_QUESTIONS_ANSWERED="unknown";var existeNonRepondu=false;var existeNonVisite=false;for (var i=0;i<parent.oSco.tabPages.length;i++){var oPage=parent.oSco.tabPages[i];if (oPage.estExercice() && oPage.validePrerequis()){if (oPage.etatVisite || i<parent.oSco.numPageCourante){if (parent.oSco.evaluation.donneReponsesQuestion(oPage.code)==null){existeNonRepondu=true;}} else {existeNonVisite=true;}}}if (!existeNonVisite){ if (existeNonRepondu){ QUESTIONS_NOT_ANSWERED="passed"; ALL_QUESTIONS_ANSWERED="failed"; } else { QUESTIONS_NOT_ANSWERED="failed"; ALL_QUESTIONS_ANSWERED="passed"; }}parent.changeObjectifSecondaire("QUESTIONS_NOT_ANSWERED",QUESTIONS_NOT_ANSWERED);parent.changeObjectifSecondaire("ALL_QUESTIONS_ANSWERED",ALL_QUESTIONS_ANSWERED);}function STG_allerPrecedent(){if (etatPrecedent&&(!MODE_EDIT)){attrapeEvtClic=true;EXO_validerSurSortiePage(false);parent.SCO_pagePrecedente();}}function EXO_validerSurSortiePage(prendMemeVide){if (etatEval && actionD && !actionValider && !existeBoutonValider()){exo.valider();actionValider=true;if (prendMemeVide || existeReponseDansInteractions()){EXO_ajouterQuestion();evalObjectifsNonRepondu();}}}function classeCSSExiste(nomClasse){var res=null;for (var m=0;m<document.styleSheets.length;m++){var ofCSS=document.styleSheets.item(m);var tabRule=ofCSS.rules;if (parent.oSco.config_navigateur=="Netscape"){tabRule=ofCSS.cssRules;} for (var j=0;j<tabRule.length;j++){if (tabRule.item(j).selectorText==nomClasse){res= tabRule.item(j);break;}}}return (res!=null);}function EXO_cliqueNivCert(obj){if (actionD){activerBoutonValider();}}function appliquerNiveauCertitude(oExo){if (niveauCertitudeExiste){if (PF_donneObjet("nivcert1").checked){oExo.niveauCertitude=0.33;}if (PF_donneObjet("nivcert2").checked){oExo.niveauCertitude=0.66;}if (PF_donneObjet("nivcert3").checked){oExo.niveauCertitude=1;}oExo.scoreCourant=Math.round(oExo.scoreCourant*oExo.niveauCertitude*100)/100;if (Math.abs(oExo.scoreCourant-Math.round(oExo.scoreCourant))<0.1){oExo.scoreCourant=Math.round(oExo.scoreCourant);}}}function relireNiveauCertitude(codePage0){if (niveauCertitudeExiste){var ncert=parent.oSco.evaluation.niveauCertitudeQuestion(codePage0);if (ncert!=""){ncert=Number(ncert);var nomobjc="";if (ncert<0.4){nomobjc="1";}else if (ncert>=0.4 && ncert<0.7){nomobjc="2";}else if (ncert>=0.7){nomobjc="3";}if (nomobjc!=""){PF_donneObjet("nivcert"+nomobjc).checked=true;}}}}function dansZoneQueEval(obj){if (obj==null){return false;}if (obj.id=="STY_zoneEvaluation"){return true;}return dansZoneQueEval(obj.parentNode);}
