/*Integral Coaching Tous droits reserves*/var posX,posY,nPosX,nPosY;var diffX,diffY;var mobileCourant;var deplacement;var idDeplaceC;var originPosX;var originPosY;var zIndexMaxMobile=0;function GD_debutDep(evt,id) {if (exo.actif){GEN_masqueBulle(false);deplacement=true;window.desactiveBalayagePg=true;idDeplaceC=id;var oEv=evt;if (window.event){oEv=window.event;}posX=oEv.clientX;posY=oEv.clientY;if (exo.modeClicClic){posX=evt.touches[0].pageX;posY=evt.touches[0].pageY;}mobileCourant=PF_donneObjet('exoGD'+id);var indX=mobileCourant.style.zIndex;if (indX>zIndexMaxMobile){zIndexMaxMobile=indX;}zIndexMaxMobile++;try {mobileCourant.style.MozTransition="none";mobileCourant.style.webkitTransition="none";} catch(e){}mobileCourant.style.zIndex=zIndexMaxMobile;originPosX=mobileCourant.style.left;originPosY=mobileCourant.style.top;}}function GD_deplaceDiv(evt) {if (deplacement&&(!MODE_EDIT)){var oEv=evt;if (window.event){oEv=window.event;}nPosX=oEv.clientX;nPosY=oEv.clientY;if (exo.modeClicClic){nPosX=evt.touches[0].pageX;nPosY=evt.touches[0].pageY;}diffX=nPosX-posX;diffY=nPosY-posY;posX=nPosX;posY=nPosY;var numT=parseInt(mobileCourant.style.left)+diffX;mobileCourant.style.left=numT+"px";numT=parseInt(mobileCourant.style.top)+diffY;mobileCourant.style.top=numT+"px";}}function GD_finDep() {var surCible=false;var surPaireJuste=false;if (deplacement && !MODE_EDIT){try {mobileCourant.style.MozTransition=null;mobileCourant.style.webkitTransition=null;} catch(e){}deplacement=false;setTimeout("window.desactiveBalayagePg=false",300);if (exo.actif && exo.existeClasseCorrection){var classe=mobileCourant.className; if (classe.indexOf("Juste")>0||classe.indexOf("Faux")>0){classe=classe.replace(/ STY_mobile\dJuste/,"");classe=classe.replace(" STY_mobileJuste","");classe=classe.replace(/ STY_mobile\dFaux/,"");classe=classe.replace(" STY_mobileFaux","");mobileCourant.className=classe;var oCnt=PF_donneObjet(mobileCourant.id+"fondContenu");if (oCnt!=null){enleveEffetMobile(mobileCourant,oCnt);PF_affecterAlt();}}}var i,j,k;var centreCibleX=mobileCourant.offsetLeft+Math.round(mobileCourant.offsetWidth/2);var centreCibleY=mobileCourant.offsetTop+Math.round(mobileCourant.offsetHeight/2);for (i=0;i<exo.tabPaires.length;i++){if (exo.tabPaires[i].idDeplace==idDeplaceC){var cibleC=exo.tabPaires[i].idCible;var attractionC=exo.tabPaires[i].attraction;exo.tabPaires[i].paireForme=false;var oCible=PF_donneObjet('exoGD'+cibleC);if (oCible==null){alert("Cible null "+cibleC);}if (GD_mobileEstDans(oCible,attractionC,centreCibleX,centreCibleY)){var decalX=exo.tabPaires[i].decalageX;var decalY=exo.tabPaires[i].decalageY;if (decalX==""){decalX=exo.decalageX;}if (decalY==""){decalY=exo.decalageY;}if (parent.oSco.config_navigateur=="Netscape"){if (decalX!=""){var numT=parseInt(oCible.style.left)+Number(decalX);mobileCourant.style.left=numT+"px";}if (decalY!=""){var numT=parseInt(oCible.style.top)+Number(decalY);mobileCourant.style.top=numT+"px";}} else {if (decalX!=""){var numT=oCible.style.pixelLeft+Number(decalX);mobileCourant.style.left=numT+"px";}if (decalY!=""){var numT=oCible.style.pixelTop+Number(decalY);mobileCourant.style.top=numT+"px";}}surCible=true;if (exo.tabPaires[i].correction==CODE_V){surPaireJuste=true;}if (exo.retourIncorrect&& !surPaireJuste){exo.tabPaires[i].paireForme=false;mobileCourant.style.left=originPosX;mobileCourant.style.top=originPosY;} else {exo.tabPaires[i].paireForme=true;}}}}if (exo.retourManque&&!surCible){mobileCourant.style.left=originPosX;mobileCourant.style.top=originPosY;centreCibleX=mobileCourant.offsetLeft+Math.round(mobileCourant.offsetWidth/2);centreCibleY=mobileCourant.offsetTop+Math.round(mobileCourant.offsetHeight/2);for (i=0;i<exo.tabPaires.length;i++){if (exo.tabPaires[i].idDeplace==idDeplaceC){var oCible=PF_donneObjet('exoGD'+exo.tabPaires[i].idCible);var attractionC=exo.tabPaires[i].attraction;if (GD_mobileEstDans(oCible,attractionC,centreCibleX,centreCibleY)){exo.tabPaires[i].paireForme=true;}}}} else if (parent.oSco.exoValideChoixUnique&&(!exo.retourIncorrect)&&(exo.tabDeplaces.length==1)){if (!depuisPrecedent){EXO_valider();laisseBulleAffiche=true;}}if (parent.oSco.forcerReponse){var existePaire=false;for (i=0;i<exo.tabPaires.length;i++){if (exo.tabPaires[i].paireForme){existePaire=true;break;}}if (existePaire){actionDetecte();}else if (actionD){actionD=false;desactiverBoutonValider();desactiverBoutonInit();}} else {actionDetecte();}window.focus();}}function GD_mobileEstDans(oCible,attraction,centreCibleX,centreCibleY){var hautD=oCible.offsetTop;var hautF=hautD+oCible.offsetHeight;var gaucheD=oCible.offsetLeft;var gaucheF=gaucheD+oCible.offsetWidth;return ((gaucheD<=centreCibleX)&&(centreCibleX<=gaucheF)&&(hautD<=centreCibleY)&&(centreCibleY<=hautF));}function GD_enrDecalage(idDeplaceC){var oDeplace=PF_donneObjet(idDeplaceC);idDeplaceC=idDeplaceC.substring(5); for (var i=0;i<exo.tabPaires.length;i++){if ((exo.tabPaires[i].idDeplace==idDeplaceC)&&(exo.tabPaires[i].paireForme)){var oCible=PF_donneObjet('exoGD'+exo.tabPaires[i].idCible);var decalX=oDeplace.offsetLeft-oCible.offsetLeft;var decalY=oDeplace.offsetTop-oCible.offsetTop;fenPere.parent.contenu.SPE_decalageMtr(idDeplaceC,exo.tabPaires[i].idCible,decalX,decalY);}}}function PaireGD(idDeplace,idCible,correction,decalageX,decalageY,poids) { if (idDeplace.indexOf("_#")==0){ this.idDeplace=idDeplace.substring(2); } else { this.idDeplace=GD_decode(idDeplace); } if (idCible.indexOf("_#")==0){ this.idCible=idCible.substring(2); } else { this.idCible=GD_decode(idCible); } this.decalageX=decalageX; this.decalageY=decalageY; this.poids=1; if (poids!=""){this.poids=Number(poids);} this.correction=correction; this.paireForme=false; }function GD_decode(va){var res="";var chaine0="3791528";var chaine1="5123789";for (var i=0;i<va.length;i++){var car=va.charAt(i);var indRemplace=chaine0.indexOf(car);if (indRemplace>=0){res+=chaine1.substring(indRemplace,indRemplace+1);} else {res+=car;}}return res;}function libereMoz(evt){if (parent.oSco.config_navigateur=="Netscape"){evt.preventDefault();}}
