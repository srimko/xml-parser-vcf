var SousTitreFlash = "clipSTY330";

function donneNbTotalPages() {
  return parent.oSco.nbTotalPages;
}

function playMascotte(theFile){
  Mascotte = donneClipAV('mascotte');
  var oMascotte = document.getElementById(Mascotte);

  if (parent.oSco.config_navigateur=="Netscape"){
    oMascotte = document.embeds[oMascotte.id];
  }
  oMascotte.playSon(theFile);
}

function sousTitrePlay() {
  var args=sousTitrePlay.arguments;
  var oSousTitreFlash=document.getElementById(SousTitreFlash);

  if (parent.oSco.config_navigateur=="Netscape"){
    oSousTitreFlash=document.embeds[oSousTitreFlash.id];
  }

  if(args.length==1){
    var oCmt = document.getElementById(donneCommentaire('soustitre#'+args[0]));
  }
  else{
    var oCmt = document.getElementById(donneCommentaire('soustitreExpert_'+args[1]+'#'+args[0]));
  }

  var inner = oCmt.innerHTML;  
  oSousTitreFlash.affiche(inner);
}

function sousTitreStop() {
  var oSousTitreFlash=document.getElementById(SousTitreFlash);
  if (parent.oSco.config_navigateur=="Netscape"){
    oSousTitreFlash=document.embeds[oSousTitreFlash.id];
  }
  oSousTitreFlash.efface();
}

function changeSon(theIndex) {
  var oContenu = top.contenuLMS.contenu;

  Mascotte = donneClipAV('mascotte');
  var oMascotte = oContenu.document.getElementById(Mascotte);

  var oSousTitreFlash=oContenu.document.getElementById(SousTitreFlash);

  if (oContenu.parent.oSco.config_navigateur=="Netscape"){
    oMascotte=oContenu.document.embeds[oMascotte.id];
    oSousTitreFlash=oContenu.document.embeds[oSousTitreFlash.id];
  }

  switch(theIndex){
    case "0":
      oSousTitreFlash.afficheTexte(true);
      break;
    case "1":
      oSousTitreFlash.afficheTexte(true);
      break;
    case "2":
      oSousTitreFlash.afficheTexte(false);
      break;
  }
  oMascotte.changeVolume(theIndex);
}

function donneClipAV(theName){
  var oContenu = top.contenuLMS.contenu;
  var oCmt = oContenu.document.getElementById(donneCommentaire(theName));
  var inner = oCmt.innerHTML;
  var start = "PF_clipAV('";
  var end = "','";
  //IE
  index=inner.indexOf("<SCRIPT");
  //Firefox
  if(index==-1) index=inner.indexOf("<script");
  subInner = inner.slice(index);
  indexStart=subInner.indexOf(start);
  indexEnd=subInner.indexOf(end);
  return subInner.slice(indexStart+start.length, indexEnd);
}

function donneCommentaire(theName){
  var oContenu = top.contenuLMS.contenu;
  var idCmt= '';

  try {var oArrayCmt=oContenu.leCours.commentaires;}catch(e){}
  try {var oArrayCmt=oContenu.exo.indications;}catch(e){}
  for (var i=0;i<oArrayCmt.length;i++){
    if (oArrayCmt[i].titre==theName){
      idCmt= oArrayCmt[i].id;
      break;
    }
  }
  return idCmt;
}

function donneNoteExiste() {
  var oPage=parent.oSco.donnePage(parent.oSco.numPageCourante);
  if (oPage.notes=="") {
    return false;
  } else {
    return true;
  }
}

function chargeNote() {
  parent.SCO_chargerNotesSSP();
  var oPage=parent.oSco.donnePage(parent.oSco.numPageCourante);
  return oPage.notes;
}

function sauveNote(theNote) {
  masqueNotes();

  var oPage=parent.oSco.donnePage(parent.oSco.numPageCourante);
  oPage.notes=theNote;

  try {
    var oZoneNE=parent.contenu.PF_donneObjet("STY_zoneNoteExiste");
    if (oZoneNE!=null){
    if (oPage.notes==""){
      oZoneNE.style.display="none";
    } else {
    oZoneNE.style.display="";
    }
  }
  }catch(e){}

    var oDate = new Date();
    var mois=oDate.getMonth()+1;
    if (mois<10){
      mois='0'+mois;
    }
    var jour=oDate.getUTCDate();
    if (jour<10){
      jour='0'+jour;
    }
    var heure=oDate.getUTCHours();
    if (heure<10){
      heure='0'+heure;
    }
    var minute=oDate.getUTCMinutes();
    if (minute<10){
      minute='0'+minute;
    }
    oPage.dateNotes=oDate.getFullYear()+"-"+mois+"-"+jour+"T"+heure+":"+minute;

     // sauve ssp
     var val=parent.conserveAutresNotes;
     for (var j=0;j<parent.oSco.tabPages.length;j++){
          var oPg=parent.oSco.tabPages[j];
          if (oPg.notes!=""){
               if (val!=""){val+="[,]";}
                    val+=parent.oSco.identifiant+"[.]"+oPg.code+"[.]"+parent.oSco.titre+"[.]"+oPg.titre+"[.]"+oPg.dateNotes+"[.]"+oPg.notes;	
               }
          }
     parent.SCO_modifAllocation("stg_notesU",val,"course");
}

function bloqueEvt(evt){
  if (evt==null){evt=window.event;}
  evt.cancelBubble=true;
  try {evt.stopPropagation();}catch(e){}
}

function afficheNotes() {
  var oNotes=document.getElementById("Notes");
  oNotes.onkeypress=bloqueEvt;
  oNotes.style.display="";
}

function afficheToutesNotes() {
  parent.SCO_listeNotesU();
}

function masqueNotes() {
  oNotes=document.getElementById("Notes");
  oNotes.style.display="none";
}