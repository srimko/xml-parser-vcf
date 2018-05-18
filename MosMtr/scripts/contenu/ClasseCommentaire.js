var objetFonduFixe = "STY_contenuCommentaire";
var indexZIncr = 1;

function Commentaire(id, titre, posX, posY, posL, posH, duree, delai, orign, fonduE, fonduS, initX, initY, vitesse, defil, vdefil) {
    this.id = id;
    this.titre = titre;
    this.posX = posX;
    this.posY = posY;
    this.posL = posL;
    this.posH = posH;
    this.duree = duree;
    this.delai = delai;
    this.styleBulle = "";
    this.estAffiche = false;
    this.estBulle = false;
    this.posDroite = false;
    this.posBas = false;
    this.decaleGaucheSiBesoin = false;
    this.branche = '';
    this.ref = '';
    this.orign = orign;
    this.fonduS = fonduS;
    this.fonduE = fonduE;
    this.initX = initX;
    this.initY = initY;
    this.vitesse = vitesse;
    this.defil = defil;
    this.vdefil = vdefil;
    this.posXReelle;
    this.posYReelle;
    this.pasX = 0;
    this.pasY = 0;
    this.opaciteTmp = 0;
    this.opacite = 1;
    this.pasOpacite = 1;
    this.pasOpaciteS = -1;
    this.idInterval = null;
    this.idDeplacement = null;
    this.posXVirtuelle;
    this.posYVirtuelle;
    this.idZoneLiee = null;
    this.afficher = cmt_afficher;
    this.init = cmt_init;
    this.masquerBulle = cmt_masquerBulle;
    this.fonduFin = cmt_fonduFin;
    this.genereMarquee = cmt_genereMarquee;
    //ajout FAC
    this.appliqueChgtsPosOpac = cmt_appliqueChgtsPosOpac;
}

function cmt_init(styleBulle) {
    if (this.posX != '' || this.posY != '') {
        this.estBulle = true;
        if (this.posX.indexOf(".") == 0) {
            this.posDroite = true;
            this.posX = this.posX.substring(1);
        }
        if (this.posY.indexOf(".") == 0) {
            this.posBas = true;
            this.posY = this.posY.substring(1);
        }
    }
    if (styleBulle != '') {
        this.styleBulle = styleBulle;
    }
    if (this.id.indexOf("divSugg") == 0) {
        this.ref = this.delai;
        this.delai = "";
    }
    if (this.delai != "" && this.id == "divConsigne" && etatEval && parent.oSco.evaluation.etatCorrige) {
        this.delai = "";
    }
    if (this.posH == "auto") {
        this.posH = "";
        if (!this.posDroite) {
            this.decaleGaucheSiBesoin = true;
        }
    }
    if (this.fonduE != '' && Number(this.fonduE) > 0.15) {
        this.pasOpacite = 1 / Math.round(this.fonduE / 0.06);
    }
    if (this.fonduS != '' && Number(this.fonduS) > 0.15) {
        this.pasOpaciteS = -1 / Math.round(this.fonduS / 0.06);
    }
    if (this.delai != "" && this.delai != "0" && this.delai != "-1") {
        setTimeout("SPE_delaiCmt('" + this.id + "')", this.delai * 1000);
    }
}

function cmt_afficher() {
    var oDiv = PF_donneObjet(this.id);
    if (oDiv == null) {
        return false;
    }
    PF_masquerDiv("divCadreDetailSurPage");
    if (this.idInterval != null) {
        window.clearInterval(this.idInterval);
        this.idInterval = null;
    }
    if (this.estBulle) {
        if (this.delai != "0") {
            GEN_masqueBulle(false);
        }
        if (this.delai == "-1") {
            if (window.leCours) {
                for (var h = 0; h < leCours.commentaires.length; h++) {
                    effacerCommentaireSurvol(leCours.commentaires[h]);
                }
            }
            if (window.exo) {
                for (var h = 0; h < exo.indications.length; h++) {
                    effacerCommentaireSurvol(exo.indications[h]);
                }
            }
        }
        var vOrign = this.orign;
        if (vOrign == 'zone' && ZoneLienAppelante == null) {
            vOrign = 'clic';
        }
        if (this.posX != '') {
            var vald = valPosBulle(this.posX);
            if (vOrign == 'clic') {
                if (this.posDroite) {
                    posClicX = document.body.offsetWidth - posClicX;
                }
                vald = posClicX;
                if (this.posX.indexOf('%') < 0) {
                    vald += parseInt(this.posX);
                }
                if (vald < 0) {
                    vald = 0;
                }
                vald = vald + "px";
            }
            if (vOrign == 'zone') {
                vald = ZoneLienAppelante.offsetLeft;
                if (this.posDroite) {
                    vald = ZoneLienAppelante.parentNode.offsetWidth - vald - ZoneLienAppelante.offsetWidth;
                }
                if (this.posX.indexOf('%') < 0) {
                    vald += parseInt(this.posX);
                }
                if (vald < 0) {
                    vald = 0;
                }
                vald = vald + "px";
                this.idZoneLiee = ZoneLienAppelante.id;
            }
            this.posXReelle = vald;
            if (this.initX != "") {
                if (this.posX.indexOf("%") > 0) {
                    if (this.initX.indexOf("%") < 0) {
                        this.initX += "%";
                    }
                }
                if (this.posDroite) {
                    oDiv.style.right = valPosBulle(this.initX);
                } else {
                    oDiv.style.left = valPosBulle(this.initX);
                }
            } else {
                if (this.posDroite) {
                    oDiv.style.right = vald;
                } else {
                    oDiv.style.left = vald;
                }
            }
        }
        if (this.posY != '') {
            var vald = valPosBulle(this.posY);
            if (vOrign == 'clic') {
                if (this.posBas) {
                    posClicY = document.body.offsetHeight - posClicY;
                }
                vald = posClicY;
                if (this.posY.indexOf('%') < 0) {
                    vald += parseInt(this.posY);
                }
                if (vald < 0) {
                    vald = 0;
                }
                vald = vald + "px";
            }
            if (vOrign == 'zone') {
                vald = ZoneLienAppelante.offsetTop;
                if (this.posBas) {
                    vald = ZoneLienAppelante.parentNode.offsetHeight - vald - ZoneLienAppelante.offsetHeight;
                }
                if (this.posY.indexOf('%') < 0) {
                    vald += parseInt(this.posY);
                }
                if (vald < 0) {
                    vald = 0;
                }
                vald = vald + "px";
            }
            this.posYReelle = vald;
            if (this.initY != "") {
                if (this.posY.indexOf("%") > 0) {
                    if (this.initY.indexOf("%") < 0) {
                        this.initY += "%";
                    }
                }
                if (this.posBas) {
                    oDiv.style.bottom = valPosBulle(this.initY);
                } else {
                    oDiv.style.top = valPosBulle(this.initY);
                }
            } else {
                if (this.posBas) {
                    oDiv.style.bottom = vald;
                } else {
                    oDiv.style.top = vald;
                }
            }
        }
        if (vOrign == 'zone') {
            try {
                ZoneLienAppelante.parentNode.appendChild(oDiv);
                oDiv.style.position = "absolute";
            } catch (e) {}
        }
        if (this.styleBulle != "") {
            oDiv.className = "STY_bulleCours" + this.styleBulle;
        }
        oDiv.style.width = "";
        oDiv.style.height = "";
        oDiv.style.minHeight = "";
        var oPere = oDiv.parentNode;
        if (oPere.nodeName.toLowerCase() == 'div' && oPere.getAttribute("id") == "zoneInvisible") {
            var oBody = document.getElementsByTagName("body").item(0);
            oBody.appendChild(oDiv);
        }
        if (vOrign == "fixe" && !parent.oSco.navigIE6) {
            oDiv.style.position = "fixed";
        } else {
            oDiv.style.position = "absolute";
        }
        oDiv.style.display = "block";
        var decaleLargeur = false;
        if (vOrign == "clic" && this.decaleGaucheSiBesoin) {
            enleverArrondi(oDiv, true);
            if (oDiv.innerHTML.length > 50) {
                var largOffs = oDiv.offsetWidth;
                if (largOffs < 130) {
                    var decalg = 250 - largOffs;
                    oDiv.style.left = (parseInt(oDiv.style.left) - decalg) + "px";
                    oDiv.style.width = "auto";
                    decaleLargeur = true;
                }
            }
        }
        var nzz = 900 + indexZIncr;
        oDiv.style.zIndex = nzz;
        indexZIncr++;
        if (this.posL != '' && !decaleLargeur) {
            oDiv.style.width = valPosBulle(this.posL);
        }
        if (this.posH != '') {
            if (parent.oSco.navigIE6) {
                oDiv.style.height = valPosBulle(this.posH);
            } else {
                oDiv.style.minHeight = valPosBulle(this.posH);
            }
        }
        if (this.defil != "") {
            var exiMarq = oDiv.getElementsByTagName("marquee");
            if (exiMarq.length == 0) {
                oDiv.innerHTML = this.genereMarquee() + oDiv.innerHTML + '</marquee>';
            }
            demarreDefil(oDiv);
        }
        this.opaciteTmp = 0;
        effetArrondi(this.id, true);
        effetImageFlash(oDiv);
        if (parent.oSco.config_navigateur == "IE") {
            var objct = oDiv.getElementsByTagName("object");
            for (var m = 0; m < objct.length; m++) {
                if (objct[m].id && window["memoImSwfirHaut" + objct[m].id]) {
                    oDiv.innerHTML += "";
                }
            }
        }
        setTimeout("marqueAffichageRetard('" + this.id + "')", 200);
        GEN_lireMediaZone(this.id, false);
        if (this.fonduE != "") {
            appliqueOpacite(oDiv, 0);
        } else if (this.fonduS != "") {
            appliqueOpacite(oDiv, 1);
        }
        ZoneLienAppelante = null;
    } else {
        GEN_masqueCommentaireClassique();
        var contenuHTML = oDiv.innerHTML;
        if (contenuHTML != '') {
            if (this.defil != "") {
                contenuHTML = this.genereMarquee() + contenuHTML + '</marquee>';
            }
            oDiv.innerHTML = "";
            GEN_changerTitreDetail(this.titre);
            GEN_changerContenuDetail(contenuHTML);
        }
        effetArrondi("STY_zoneCommentaire", false);
        if (contenuHTML != '') {
            var oCmtFixe = PF_donneObjet('STY_contenuCommentaire');
            if (oCmtFixe != null) {
                effetImageFlash(oCmtFixe);
                if (this.defil != "") {
                    demarreDefil(oCmtFixe);
                }
            }
        }
        this.estAffiche = true;
        GEN_lireMediaZone("STY_contenuCommentaire", false);
        if (this.fonduE != "") {
            var obj = PF_donneObjet("STY_contenuCommentaire");
            var valbc = retrouveValCSS(obj, "top");
            if ((retrouveValCSS(obj, "top") == "") && (retrouveValCSS(obj, "height") == "") && (retrouveValCSS(obj, "width") == "") && (retrouveValCSS(obj, "left") == "")) {
                objetFonduFixe = "STY_zoneCommentaire";
                obj = PF_donneObjet(objetFonduFixe);
            }
            this.opaciteTmp = 0;
            appliqueOpacite(obj, 0);
        } else if (this.fonduS != "") {
            appliqueOpacite(PF_donneObjet(objetFonduFixe), 1);
        } else {
            supprimeOpacite(PF_donneObjet(objetFonduFixe));
        }
    }
    if (this.delai != "" && this.delai != "0" && this.duree != "" && this.duree != "999" && this.duree != "9999") {
        activerBoutonInit();
    }
    if (existeMosMap) {
        GEN_placerZonesLien();
    }
    if (this.fonduE != "") {
    		//transition dispo
        if (typeof(oDiv.style.webkitTransition) == "string" || typeof(oDiv.style.MozTransition) == "string" || typeof(oDiv.style.transition) == "string") {
        		//firefox ou cmt fixe ou pas de position initiale
        		//FAC -> pourquoi le "ou firefox"?? -> enlevé
            //if (!this.estBulle || (this.initX == "" && this.initY == "") || typeof(oDiv.style.MozTransition) == "string") {
            if (!this.estBulle || (this.initX == "" && this.initY == "")) {
            	            	
                var valTrans = "opacity " + this.fonduE + "s";
                var lid = oDiv.id;
                if (!this.estBulle) {
                    lid = objetFonduFixe;
                    PF_donneObjet(lid).style.opacity = 0;
                }
                setTimeout("enclenceAnimCSSOpacite('" + lid + "','" + valTrans + "',1)", 50);
            }
        } else {
            this.pasCourant = this.pasOpacite;
            this.idInterval = window.setInterval("effetFondu('" + this.id + "')", 50);
        }
    }
    //flottant et position initiale
    if (this.estBulle && (this.initX != "" || this.initY != "")) {
        if (this.vitesse == "") {
            this.vitesse = 1;
        } else {
            this.vitesse = Number(this.vitesse);
        }
        if (this.vitesse <= 0) {
            this.vitesse = 1;
        }
        //transition dispo
        if (typeof(oDiv.style.webkitTransition) == "string" || typeof(oDiv.style.MozTransition) == "string" || typeof(oDiv.style.transition) == "string") {
            var modifieProps = "";
            if (this.initX != "") {
                modifieProps = this.posDroite ? "right" : "left";
                //ajout FAC
                modifieProps = modifieProps + " " + this.vitesse + "s";
            }
            if (this.initY != "") {
                if (modifieProps != "") {
                    modifieProps += ",";
                }
                modifieProps += this.posBas ? "bottom" : "top";
                //ajout FAC
                modifieProps = modifieProps + " " + this.vitesse + "s";
            }
						    
            //if (this.fonduE != "" && typeof(oDiv.style.webkitTransition) == "string") {
            if (this.fonduE != "") {	
            	//modifieProps += ",opacity";
            	modifieProps = modifieProps + ",opacity " + this.fonduE + "s";
							
							//ajout FAC
							oDiv.style.opacity=0;
							//fin ajout
							
               // oDiv.style.opacity = null;
               // CMT_insererClasseCSS("#" + oDiv.id, "opacity:0");
            }
            
            //applique les transition css au div
            //setTimeout("enclenceAnimCSSOpacite('" + oDiv.id + "','" + modifieProps + "',1)", 50);
            setTimeout("enclenceAnimCSSOpacite('" + oDiv.id + "','" + modifieProps + "')", 50);

            /*
            oDiv.style.MozTransitionProperty = modifieProps;
            oDiv.style.MozTransitionDuration = this.vitesse + "s";
            oDiv.style.webkitTransitionProperty = modifieProps;
            oDiv.style.webkitTransitionDuration = this.vitesse + "s";
            oDiv.style.transitionProperty = modifieProps;
            oDiv.style.transitionDuration = this.vitesse + "s";
            */

					//on applique d'un coup le changement d'opacité (passage à 1) et le changement de position
           var _this = this;           
           setTimeout(function() {_this.appliqueChgtsPosOpac();},50);
            /*if (this.initX != "") {
                if (this.posDroite) {
                    oDiv.style.right = this.posXReelle;
                } else {
                    oDiv.style.left = this.posXReelle;
                }
            }
            if (this.initY != "") {
                if (this.posBas) {
                    oDiv.style.bottom = this.posYReelle;
                } else {
                    oDiv.style.top = this.posYReelle;
                }
            }
            */
            
           /* if (modifieProps.indexOf("opacity") > 0) {
                setTimeout("PF_donneObjet('" + oDiv.id + "').style.opacity=1", 100);
            }
            */
        } else {
            var ecart = 0;
            if (this.initX != "") {
                var p0 = valeurCalc(this.initX);
                var p1 = valeurCalc(this.posXReelle);
                this.pasX = Math.abs(p1 - p0) / this.vitesse * 0.045;
                if (p0 > p1) {
                    this.pasX = -this.pasX;
                }
                this.posXVirtuelle = p0;
            }
            if (this.initY != "") {
                var p0 = valeurCalc(this.initY);
                var p1 = valeurCalc(this.posYReelle);
                this.pasY = Math.abs(p1 - p0) / this.vitesse * 0.045;
                if (p0 > p1) {
                    this.pasY = -this.pasY;
                }
                this.posYVirtuelle = p0;
            }
            this.idDeplacement = window.setInterval("effetDeplacement('" + this.id + "')", 45);
        }
    }
    if (this.branche != '') {
        desactiverBoutonInit();
        desactiverBoutonValider();
        if (this.duree == "") {
            activerBoutonSuivant();
        } else if (this.duree != "0") {
            desactiverBoutonSuivant();
        }
    }
    if (this.duree != "" && this.duree != "999" && this.duree != "9999") {
        if (this.duree == "0") {
            SPE_dureeCmt(this.id);
        } else {
            setTimeout("SPE_dureeCmt('" + this.id + "')", this.duree * 1000);
        }
    }
}

function valPosBulle(valP) {
    if (valP.indexOf('%') < 0 && valP.indexOf('px') < 0) {
        valP += 'px';
    }
    return valP;
}

function cmt_masquerBulle() {
    if (!this.estAffiche) {
        return;
    }
    GEN_lireMediaZone(this.id, true);
    var oDiv = PF_donneObjet(this.id);
    if (this.fonduS != "") {
        this.fonduFin();
    } else {
        oDiv.style.display = "none";
    }
    this.estAffiche = false;
}

function cmt_fonduFin() {
    if (typeof(document.body.style.webkitTransition) == "string" || typeof(document.body.style.MozTransition) == "string" || typeof(document.body.style.transition) == "string") {
        var valTrans = "opacity " + this.fonduS + "s";
        var lid = this.id;
        if (!this.estBulle) {
            lid = objetFonduFixe;
        }
        setTimeout("enclenceAnimCSSOpacite('" + lid + "','" + valTrans + "',0)", 50);
        setTimeout("masqueFinFondu('" + lid + "')", Number(this.fonduS) * 1000);
    } else {
        this.opaciteTmp = 1;
        this.pasCourant = this.pasOpaciteS;
        this.idInterval = window.setInterval("effetFondu('" + this.id + "')", 50);
    }
}

function effetArrondi(lid, estBulle) {
    var oCorps = document.getElementsByTagName("body").item(0);
    if (oCorps.offsetWidth < 300) {
        return false;
    }
    var oDiv = PF_donneObjet(lid);
    if (oDiv == null) {
        return 0;
    }
    var verifArrond = "";
    var verifOmbre = "";
    if (parent.oSco.config_navigateur == "IE") {
        verifArrond = oDiv.currentStyle["backgroundPositionX"];
        verifOmbre = oDiv.currentStyle["backgroundPositionY"];
    } else {
        var lesd = oDiv.style.backgroundPosition;
        if (lesd == '') {
            var lClasse = oDiv.className;
            if (lClasse != '') {
                var reg = donneRegleCSSMoz("." + lClasse);
                if (reg != null) {
                    lesd = reg.style.backgroundPosition;
                }
            }
        }
        if (lesd != "") {
            lesd = lesd.split(' ');
            verifArrond = lesd[0];
            if (lesd.length > 1) {
                verifOmbre = lesd[1];
            }
        }
    }
    if (verifArrond != "0%") {
        enleverArrondi(oDiv, estBulle);
        PF_arrondir(oDiv, verifArrond, document.defaultView);
        var lesobj = oDiv.getElementsByTagName("object");
        for (var t = 0; t < lesobj.length; t++) {
            var ocli = lesobj[t];
            if (ocli.width == 1 && ocli.height == 1) {
                ocli.style.display = "none";
            }
        }
    }
    if (verifOmbre != "0%") {
        var oExiste = PF_donneObjet(oDiv.id + "fondOmbre");
        if (oExiste != null) {
            oDiv.removeChild(oExiste);
        }
        PF_ombre(oDiv, verifOmbre, document.defaultView);
    }
}

function effetImageFlash(oDiv) {
    var lesimgs = oDiv.getElementsByTagName("img");
    for (var n = lesimgs.length - 1; n >= 0; n--) {
        var oImg = lesimgs[n];
        var effets = oImg.alt;
        if (effets.indexOf("swfir=") == 0) {
            var iEff = new swfir();
            iEff.specify('src', '../../MosMtr/gen/swfir.swf');
            effets = effets.substring(6).split(";");
            var existeEfft = false;
            for (var i = 0; i < effets.length; i++) {
                var tap = effets[i].split(":");
                if (tap.length == 2) {
                    iEff.specify(tap[0], tap[1]);
                    existeEfft = true;
                }
            }
            if (existeEfft) {
                iEff.swap('#' + oImg.id);
            }
        }
    }
}

function enleverArrondi(oDiv, estBulle) {
    var lid = oDiv.id;
    var oExiste = PF_donneObjet(lid + "fondContenu");
    if (oExiste != null) {
        var resHtml = "";
        var lesfils = oDiv.childNodes;
        oDiv.style.backgroundColor = "";
        if (!estBulle) {
            oDiv.style.height = "";
            oDiv.style.width = "";
        }
        var prendBord = true;
        for (var n = oDiv.childNodes.length - 1; n >= 0; n--) {
            var oFils = oDiv.childNodes[n];
            if (oFils.id == lid + "fondContenu") {
                resHtml = oFils.innerHTML;
                oDiv.style.paddingLeft = oFils.style.paddingLeft;
                oDiv.style.paddingRight = oFils.style.paddingRight;
                oDiv.style.paddingTop = oFils.style.paddingTop;
                oDiv.style.paddingBottom = oFils.style.paddingBottom;
            } else {
                if (prendBord && (oFils.childNodes.length == 0)) {
                    var hbord = oFils.style.borderTopWidth;
                    var cbord = oFils.style.borderTopColor;
                    var cstyle = oFils.style.borderTopStyle;
                    if (hbord == "") {
                        hbord = oFils.style.borderLeftWidth;
                        cbord = oFils.style.borderLeftColor;
                        cstyle = oFils.style.borderLeftStyle;
                    }
                    if (hbord != "") {
                        prendBord = false;
                        oDiv.style.borderWidth = hbord;
                        oDiv.style.borderColor = cbord;
                        oDiv.style.borderStyle = cstyle;
                    }
                }
                oDiv.removeChild(oFils);
            }
        }
        if (oDiv.childNodes.length == 1) {
            var oPrem = oDiv.firstChild;
            while (oPrem.firstChild) {
                oDiv.appendChild(oPrem.firstChild);
            }
            oDiv.removeChild(oPrem);
        }
    }
}

function masqueFinFondu(lid) {
    var oCmt = donneCmtID(lid);
    var objH;
    if (oCmt.estBulle) {
        objH = PF_donneObjet(oCmt.id);
        objH.style.display = "none";
    } else {
        objH = PF_donneObjet(objetFonduFixe);
        GEN_masqueCommentaireClassique(true);
    }
    objH.style.opacite = null;
    try {
        objH.style.removeProperty("opacity");
    } catch (e) {}
}

function effetFondu(lid) {
    if (MODE_EDIT) {
        return;
    }
    var oCmt = donneCmtID(lid);
    if ((oCmt.opaciteTmp >= oCmt.opacite) && (oCmt.pasCourant > 0)) {
        window.clearInterval(oCmt.idInterval);
        oCmt.idInterval = null;
    } else {
        oCmt.opaciteTmp = oCmt.opaciteTmp + oCmt.pasCourant;
        if (oCmt.opaciteTmp > 1) {
            oCmt.opaciteTmp = 1;
        }
        if (oCmt.opaciteTmp < 0) {
            oCmt.opaciteTmp = 0;
        }
        var objH;
        if (oCmt.estBulle) {
            objH = PF_donneObjet(oCmt.id);
            if ((oCmt.opaciteTmp == 0) && (oCmt.pasCourant < 0)) {
                window.clearInterval(oCmt.idInterval);
                oCmt.idInterval = null;
                objH.style.display = "none";
            }
        } else {
            objH = PF_donneObjet(objetFonduFixe);
            if ((oCmt.opaciteTmp == 0) && (oCmt.pasCourant < 0)) {
                window.clearInterval(oCmt.idInterval);
                oCmt.idInterval = null;
                GEN_masqueCommentaireClassique(true);
            }
        }
        appliqueOpacite(objH, oCmt.opaciteTmp);
        if (parent.oSco.config_navigateur == "IE") {
            if (PF_donneObjet(oCmt.id + "fondContenu") != null) {
                var lesdivsfils = objH.childNodes;
                for (var i = 0; i < lesdivsfils.length; i++) {
                    if (lesdivsfils.item(i).nodeName == "DIV") {
                        appliqueOpacite(lesdivsfils.item(i), 1);
                    }
                }
            }
        }
    }
}

function supprimeOpacite(oDiv) {
    if (oDiv == null) {
        return;
    }
    if (parent.oSco.config_navigateur == "IE" && typeof(oDiv.style.opacity) != "string") {
        oDiv.style.removeAttribute('filter');
    } else {
        oDiv.style.opacity = null;
        try {
            oDiv.style.removeProperty("opacity");
        } catch (e) {}
    }
}

function appliqueOpacite(oDiv, val) {
    if (MODE_EDIT) {
        return;
    }
    if (parent.oSco.config_navigateur == "IE" && typeof(oDiv.style.opacity) != "string") {
        if (val == 1) {
            oDiv.style.removeAttribute('filter');
        } else {
            oDiv.style.filter = "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + val * 100 + ")";
        }
    } else {
        if (val == 1) {
            val = 0.99;
        }
        oDiv.style.opacity = val;
    }
}

function effetDeplacement(lid) {
    var oCmt = donneCmtID(lid);
    var encoreDeplace = false;
    var objH = PF_donneObjet(oCmt.id);
    if (oCmt.initX != "") {
        var unite = "px";
        if (objH.style.left.indexOf("%") > 0) {
            unite = "%";
        }
        var positionCourante = oCmt.posXVirtuelle + oCmt.pasX;
        oCmt.posXVirtuelle = positionCourante;
        if (oCmt.pasX != 0) {
            if ((oCmt.pasX > 0 && positionCourante > valeurCalc(oCmt.posXReelle)) || (oCmt.pasX < 0 && positionCourante < valeurCalc(oCmt.posXReelle))) {
                if (oCmt.posDroite) {
                    objH.style.right = oCmt.posXReelle;
                } else {
                    objH.style.left = oCmt.posXReelle;
                }
            } else {
                if (unite == "px") {
                    positionCourante = Math.round(positionCourante);
                }
                if (oCmt.posDroite) {
                    objH.style.right = positionCourante + unite;
                } else {
                    objH.style.left = positionCourante + unite;
                }
                encoreDeplace = true;
            }
        }
    }
    if (oCmt.initY != "") {
        var unite = "px";
        if (objH.style.top.indexOf("%") > 0) {
            unite = "%";
        }
        var positionCourante = oCmt.posYVirtuelle + oCmt.pasY;
        oCmt.posYVirtuelle = positionCourante;
        if (oCmt.pasY != 0) {
            if ((oCmt.pasY > 0 && positionCourante > valeurCalc(oCmt.posYReelle)) || (oCmt.pasY < 0 && positionCourante < valeurCalc(oCmt.posYReelle))) {
                if (oCmt.posBas) {
                    objH.style.bottom = oCmt.posYReelle;
                } else {
                    objH.style.top = oCmt.posYReelle;
                }
            } else {
                if (unite == "px") {
                    positionCourante = Math.round(positionCourante);
                }
                if (oCmt.posBas) {
                    objH.style.bottom = positionCourante + unite;
                } else {
                    objH.style.top = positionCourante + unite;
                }
                encoreDeplace = true;
            }
        }
    }
    if (!encoreDeplace) {
        window.clearInterval(oCmt.idDeplacement);
        oCmt.idDeplacement = null;
    }
}

function valeurCalc(str) {
    var mult = 1;
    if (str.indexOf("-") == 0) {
        str = str.substring(1);
        mult = -1;
    }
    if (str.indexOf("-") == 0) {
        str = str.substring(1);
        mult = -1;
    }
    str = str.replace("%", "");
    str = str.replace("px", "");
    return Number(str) * mult;
}

function cmt_genereMarquee() {
    if (this.vdefil == "") {
        this.vdefil = "50";
    }
    var vdir = "up";
    var mmont = "1";
    var ndefil = parseInt(this.vdefil);
    if (ndefil < 30) {
        mmont = "2";
    }
    if (ndefil < 20) {
        mmont = "3";
    }
    if (ndefil < 10) {
        mmont = "4";
    }
    if (ndefil < 2) {
        mmont = "5";
    }
    if (ndefil < 1) {
        mmont = "9";
        ndefil = 1;
    }
    if (this.defil == "B") {
        vdir = "down";
    }
    if (this.defil == "G") {
        vdir = "left";
    }
    if (this.defil == "D") {
        vdir = "right";
    }
    return '<marquee behavior="scroll" direction="' + vdir + '" scrollamount="' + mmont + '" scrolldelay="' + ndefil + '">';
}

function demarreDefil(oDiv) {
    try {
        oDiv.firstChild.start();
    } catch (e) {}
}

function marqueAffichageRetard(idcmt) {
    var oCmt = donneCmtID(idcmt);
    oCmt.estAffiche = true;
}

function effacerCommentaireSurvol(oCmt) {
    if (oCmt.estBulle && oCmt.delai == "-1" && oCmt.duree == "") {
        oCmt.masquerBulle();
    }
}

function enclenceAnimCSSOpacite(lid, valTrans, valOpa) {
    var oDiv = PF_donneObjet(lid);
    oDiv.style.MozTransition = valTrans;
    oDiv.style.webkitTransition = valTrans;
    oDiv.style.transition = valTrans;
    //FAC
    //oDiv.style.opacity = valOpa;
		if (valOpa != null)
		{
			oDiv.style.opacity = valOpa;
		}      
}

function CMT_insererClasseCSS(nclass, vcss) {
    var oFeuille = document.styleSheets[document.styleSheets.length - 1];
    var ninser = oFeuille.cssRules.length;
    if (ninser > 0) {
        ninser--;
    }
    oFeuille.insertRule(nclass + "{" + vcss + "}", ninser);
}

//ajout FAC
function cmt_appliqueChgtsPosOpac() {
	
	var oDiv = PF_donneObjet(this.id);
	
	oDiv.style.opacity=1;
	
	if (this.initX != "") {
    if (this.posDroite) {
        oDiv.style.right = this.posXReelle;
    } else {
        oDiv.style.left = this.posXReelle;
    }
	}
	if (this.initY != "") {
    if (this.posBas) {
        oDiv.style.bottom = this.posYReelle;
    } else {
        oDiv.style.top = this.posYReelle;
    }
	}	
}
            