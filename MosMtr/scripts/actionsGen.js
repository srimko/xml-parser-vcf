var lsDivPNG='';function PF_modifTexteDiv(idObj,txt){var obj=document.getElementById(idObj);if (obj!=null){obj.innerHTML=txt;}}function PF_donneTexteCouche(objName,x) { var res='';var idObj = PF_donneObjet(nomObj); if (idObj!= null){ res=idObj.innerHTML; }return res;}function PF_attr(obj,nomAttr){if (obj==null){alert("Null Element for "+nomAttr);}try {val=obj.getAttribute(nomAttr);} catch(e){alert(nomAttr);alert(obj.nodeName);}if (val==null){val="";}return val;}function PF_donneObjet(idObj){return document.getElementById(idObj);}function PF_changeClasse(nomLien,nomClasse){var lien = PF_donneObjet(nomLien);if (lien!=null){lien.className=nomClasse;}}function PF_afficherDiv(nomDiv){var objDiv=PF_donneObjet(nomDiv);if (objDiv!=null){objDiv.style.display="block";}}function PF_masquerDiv(nomDiv){var objDiv=PF_donneObjet(nomDiv);if (objDiv!=null){objDiv.style.display="none";}}function PF_basculerDiv(nomDiv){var objDiv=PF_donneObjet(nomDiv);if (objDiv!=null){if (objDiv.style.display=="none"){objDiv.style.display="block";} else {objDiv.style.display="none";}}}function PF_basculeImage(img,src) {var oImg=PF_donneObjet(img); if (oImg!=null){oImg.src=src;}}function PF_survol(img,num){var oImg=PF_donneObjet(img);if (oImg!=null){var nSrc=oImg.src;var estPngIE=false;if ((nSrc.indexOf('blanc.gif')>0)&&(oImg.style.filter)&&(oImg.style.filter!='')){estPngIE=true;}if (num==0){nSrc=nSrc.replace("_survl0","_survl1");if (estPngIE){oImg.style.filter=oImg.style.filter.replace("_survl0","_survl1");}} else {nSrc=nSrc.replace("_survl1","_survl0");if (estPngIE){oImg.style.filter=oImg.style.filter.replace("_survl1","_survl0");}}oImg.src=nSrc;}}function PF_affecterAlt(){var estIE=(navigator.appName.indexOf('Microsoft')>=0);var estIE7=false;if (estIE){try {if (window.XMLHttpRequest){estIE7=true;}}catch(e){}}var lesdivs=document.getElementsByTagName("div");var maxdiv=350;for (var i=0;i<lesdivs.length && i<maxdiv;i++){var oDiv=lesdivs.item(i);if (estIE && !estIE7){var lmin=oDiv.currentStyle["minHeight"];if (lmin!="auto" && oDiv.currentStyle["height"]!=lmin){var hautact=oDiv.currentStyle["height"];if (lmin!=hautact && (hautact=="auto" || parseInt(lmin)>parseInt(hautact))){oDiv.style.height=lmin;}}}if (oDiv.id.indexOf("LEX_")==0){oDiv.innerHTML=donneLex(Number(oDiv.id.substring(4)));oDiv.id="";}maxdiv++;if (oDiv.id.indexOf('div_effet_')!=0){var verifArrond="0%";var verifOmbre="0%";if (!estIE &&document.defaultView){if (valCSS(oDiv,"","backgroundColor",true)!='transparent'){var lesd=oDiv.style.backgroundPosition;if (lesd==''){var lClasse=oDiv.className;if (lClasse!=''){var reg=donneRegleCSSMoz("."+lClasse);if (reg!=null){lesd=reg.style.backgroundPosition;}}}if (lesd!=""){lesd=lesd.split(' ');verifArrond=lesd[0];if (lesd.length>1){verifOmbre=lesd[1];}}}} else if (estIE){verifArrond=oDiv.currentStyle["backgroundPositionX"];verifOmbre=oDiv.currentStyle["backgroundPositionY"];}if (oDiv.style.display!="none" && oDiv.style.backgroundColor!='transparent'){if (verifArrond!="0%" && verifArrond.indexOf(".")>0){PF_arrondir(oDiv,verifArrond,!estIE);}if (verifOmbre!="0%" && verifOmbre.indexOf(".")>0){PF_ombre(oDiv,verifOmbre,!estIE);}}}}var lesimgs=document.getElementsByTagName("img");for (var n=0;n<lesimgs.length;n++){var oImg=lesimgs.item(n);if (oImg.title.indexOf("LEX_")==0){oImg.title=donneLex(Number(oImg.title.substring(4)));} else if (oImg.alt.indexOf("LEX_")==0){oImg.title=donneLex(Number(oImg.alt.substring(4)));}if (estIE && !estIE7){var source=oImg.src;if (source.indexOf(".png")>0 && oImg.border==0 && oImg.style.borderWidth=="" && oImg.alt.indexOf("swfir=")!=0){var methode="image";var larg0=oImg.width;var haut0=oImg.height;if (larg0==0){var attrf=oImg.outerHTML;var tabRes=attrf.match(/WIDTH=(\w+)/i);if (tabRes){larg0=tabRes[1];}tabRes=attrf.match(/HEIGHT=(\w+)/i);if (tabRes){haut0=tabRes[1];}}if (larg0>100 || haut0>100 ||(larg0>40&&haut0>40)){if (larg0>0 && haut0>0){methode="scale";oImg.style.width=larg0+"px";oImg.style.height=haut0+"px";}}if (methode=="image"){if (larg0>0){oImg.style.width=larg0+"px";}if (haut0>0){oImg.style.height=haut0+"px";}} var rac="../../";oImg.src=rac+"MosMtr/gen/blanc.gif";oImg.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+source+"',sizingMethod='"+methode+"')";}}}}function PF_transparencePNG(oDiv){return ;}var tabDocW=new Array();function ajDocW(val){if (navigator.appName.indexOf('Microsoft')!=-1){document.write(val);} else {if (window.location.href.indexOf('.xml')>0){tabDocW.push(val);} else {document.write(val);}}}function PF_ecritDocW(){if (tabDocW.length>0){var lesscripts=document.getElementsByTagName("script");var numT=0;for (var n=0;n<lesscripts.length;n++){var oScr=lesscripts.item(n);if (oScr.innerHTML.indexOf("ajDocW(")>=0){var txx=new String(tabDocW[numT]);if (txx.indexOf('&#160;')==0){txx=txx.replace(/&#160;/g,' ');}var nTxt;if (txx.indexOf('<object ')>=0||txx.indexOf('<audio ')>=0||txx.indexOf('<video ')>=0||txx.indexOf('<iframe ')>=0){nTxt=document.createElement('span');nTxt.innerHTML=txx;nTxt=nTxt.firstChild;} else {nTxt=document.createTextNode(txx);}numT++;oScr.parentNode.insertBefore(nTxt,oScr);oScr.nodeValue='';}}}}function srcYouTube(src){return src.indexOf("://www.youtube.com/")>0||src.indexOf("://youtube.com/")>0;}function PF_clipAVHtml5(lid,src,largeur,hauteur,demarreAuto,lecteur,boucle,align,autresParams,lstyle,dansCmt){var ajAlign="";if (align!=''){ajAlign=' align="'+align+'"';}if (lstyle!=""){ajAlign+=' style="'+lstyle+'"';}var iframeSrc="";if (lecteur=='Iframe'){if (src.indexOf("://vimeo.com/")>0){var regRes=src.match(/(\w+)$/);iframeSrc="http://player.vimeo.com/video/"+regRes[1]+"?title=0&byline=0";if (demarreAuto=="true"){iframeSrc+="&autoplay=1";}} else if (srcYouTube(src)){var regRes=src.match(/(\w+)$/);iframeSrc="http://player.vimeo.com/video/"+regRes[1]+"?title=0&byline=0";if (demarreAuto=="true"){iframeSrc+="&autoplay=1";}var regRes=src.match(/v=(\w+)/);iframeSrc="http://www.youtube.com/embed/"+regRes[1]+"?modestbranding=1&rel=0&showinfo=0&controls=1&showsearch=0&fs=0&wmode=transparent&theme=light&color=white";if (demarreAuto=="true"){iframeSrc+="&autoplay=1";}} else {iframeSrc=src;}}if (iframeSrc){return '<iframe id="'+lid+'" src="'+iframeSrc+'" width="'+largeur+'" height="'+hauteur+'" frameborder="0"'+ajAlign+' allowfullscreen="true"></iframe>';}if (hauteur==0||largeur==""){var is_safari_or_uiwebview = /(iPhone|iPod|iPad).*AppleWebKit/i.test(navigator.userAgent);var is_uiwebview = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent);if (demarreAuto!="true" || (!is_safari_or_uiwebview ||is_uiwebview)){ajAlign+=' style="display:none"';}}var classe="html5media";if (dansCmt=='cmt' || (demarreAuto=="true" && (window.location.href.indexOf("style/glossaire.htm")>0 || window.location.href.indexOf("/glossaire/glossaire.")>0))){classe+="_"+demarreAuto;demarreAuto='false';}var autoplay="";if (demarreAuto=="true"){autoplay=" autoplay";}var extFich="";if (src.indexOf(".")>0){extFich=src.substring(src.lastIndexOf(".")).toLowerCase();}var balise="video";if (extFich==".mp3"){balise="audio";} if (largeur<120){largeur=120;}if (hauteur<45){hauteur=45;}var res='<'+balise+' id="'+lid+'" class="'+classe+'" src="'+src+'" controls width="'+largeur+'" height="'+hauteur+'"'+ajAlign+autoplay+'>';return res+"</"+balise+">"; }function supports_videoh5() { return !!document.createElement('video').canPlayType;}function supports_mp4_video(){ if (!supports_videoh5()) { return false; } var v = document.createElement("video"); return v.canPlayType('video/mp4')!="";}function PF_clipAV(lid,src,largeur,hauteur,demarreAuto,lecteur,boucle,align,autresParams,lstyle,dansCmt){if (largeur==29 && hauteur==29){largeur=0;hauteur=0;}var clsid='clsid:';var source='../media/'+src;var rcnstg=parent.RACINE_stage;if (rcnstg==null){rcnstg=top.opener.parent.RACINE_stage;}if (lecteur=="QT" && (navigator.userAgent.indexOf("iPhone")>0||navigator.userAgent.indexOf("iPad")>0)&&navigator.userAgent.indexOf("AppleWebKit")>0){source=rcnstg+'contenu/media/'+src;}var classe="obj"+lecteur;var memeoDemAuto=demarreAuto;

//modif FAC
//if (dansCmt=='cmt' || (demarreAuto=="true" && (window.location.href.indexOf("style/glossaire.htm")>0 || window.location.href.indexOf("/glossaire/glossaire.")>0))){
if ((demarreAuto=="true" && (window.location.href.indexOf("style/glossaire.htm")>0 || window.location.href.indexOf("/glossaire/glossaire.")>0))){

classe+="_"+demarreAuto;demarreAuto='false';}if (lid.indexOf('clipSTY')==0){source='../../MosMtr/ressources/style/media/'+src;}if (src.indexOf("ref/")==0){source=src.substring(4);}var type="";if (boucle==''){boucle='false';}if (demarreAuto==''){demarreAuto='false';}var lesparams='';var ajouteDimFVar=false;var extFich="";var skin="";var streamer="";if (src.indexOf(".")>0){extFich=src.substring(src.lastIndexOf(".")).toLowerCase();}var surAppleiOS=(navigator.userAgent.indexOf("iPhone")>0||navigator.userAgent.indexOf("iPad")>0||navigator.userAgent.indexOf("iPod")>0);var androidHtml5=navigator.userAgent.indexOf("Android")>0 && supports_mp4_video();if (surAppleiOS||androidHtml5||lecteur=='Iframe'){return PF_clipAVHtml5(lid,source,largeur,hauteur,memeoDemAuto,lecteur,boucle,align,autresParams,lstyle,dansCmt);}if (lecteur=='Flash' && (extFich==".flv" || extFich==".mp3" || extFich==".mp4" || extFich==".m4v" || srcYouTube(source))){var nomImage=src.replace(extFich,".jpg");var nlecteur="mediaplayer";if (autresParams.indexOf("allowfullscreen:true")>=0){nlecteur="player4";}if (src.indexOf("youtube.com/watch")>0 || src.indexOf("ref/rtmp://")==0){nlecteur="player4";skin="../../MosMtr/gen/player4skin.swf";if (src.indexOf("ref/rtmp://")==0){var indF=src.lastIndexOf("//");if (indF>15){var fichr=src.substring(indF+2);streamer=src.substring(0,indF);streamer="&provider=rtmp&streamer="+streamer.substring(4);src="ref/"+fichr;}}}source="../../MosMtr/gen/"+nlecteur+".swf?file=";if (src.indexOf("ref/")==0){nomImage=lid.toLowerCase()+".jpg";source+=escape(src.substring(4));} else {if (lid.indexOf('clipSTY')==0){source+='../../MosMtr/ressources/style/media/'+src;} else {source+="../../contenu/media/"+src;}}if (hauteur>20){if (lid.indexOf('clipSTY')==0){source+="&image=../../MosMtr/ressources/style/media/"+nomImage;} else {source+="&image=../../contenu/media/"+nomImage;}}source+=streamer;if (autresParams.toLowerCase().indexOf("flashvars:")<0){autresParams+=";flashvars:";}ajouteDimFVar=true;if (rcnstg.indexOf("file:///")==0){var estIE=(navigator.appName.indexOf('Microsoft')>=0);if (estIE){if (window.XMLHttpRequest==null){rcnstg=rcnstg.replace("file:///","");}source=rcnstg+"MosMtr/gen/mediaplayer.swf?file="+rcnstg+"contenu/media/"+src+"&image="+rcnstg+"contenu/media/"+nomImage;source=unescape(source);if (src.indexOf("ref/")==0){source=rcnstg+"MosMtr/gen/mediaplayer.swf?file="+src.substring(4)+"&image="+rcnstg+"contenu/media/"+nomImage;}if (lid.indexOf('clipSTY')==0){source=rcnstg+"MosMtr\\gen\\mediaplayer.swf?file="+rcnstg+'MosMtr\\ressources\\style\\media\\'+src+"&image="+rcnstg+'MosMtr\\ressources\\style\\media\\'+nomImage;}}}if (boucle=="true"){source+="&repeat=true";}if (demarreAuto=="true"){source+="&autostart=true";}demarreAuto="true";classe+="_flvPly";}if (lid=="diaporama"&&lecteur=='Flash'){source='../../MosMtr/gen/dewslider.swf?xml=../../contenu/media/'+src+".xml";if (rcnstg.indexOf("file:///")==0){var estIE=(navigator.appName.indexOf('Microsoft')>=0);if (estIE){if (window.XMLHttpRequest==null){rcnstg=rcnstg.replace("file:///","");rcnstg=unescape(rcnstg.replace(/\//g,"\\"));}source=rcnstg+'MosMtr/gen/dewslider.swf?xml=../../contenu/media/'+src+".xml";}}}if (lecteur=='WM'){ source=rcnstg+'contenu/media/'+src;if (lid.indexOf('clipSTY')==0){source=rcnstg+'MosMtr/ressources/style/media/'+src;}source=unescape(source);if (src.indexOf("ref/")==0){source=src.substring(4);}var ajBoucle="";if (boucle=="true"){ajBoucle=";playCount:999";}clsid+='6BF52A52-394A-11d3-B153-00C04F79FAA6';type="application/x-mplayer2";lesparams="URL:x;autoStart:"+demarreAuto+";Loop:"+boucle+ajBoucle;} else if (lecteur=='Flash'){ clsid+='D27CDB6E-AE6D-11cf-96B8-444553540000';type="application/x-shockwave-flash";lesparams="movie:x;play:"+demarreAuto+";loop:"+boucle+";swLiveConnect:true";} else if (lecteur=='Real'){ clsid+='CFCDAA03-8BE4-11cf-B84B-0020AFBBCCFA';type="audio/x-pn-realaudio-plugin";lesparams="SRC:x;AUTOSTART:"+demarreAuto+";LOOP:"+boucle;} else if (lecteur=='QT'){ clsid+='02BF25D5-8C17-4B23-BC80-D3488ABDDC6B';type="video/quicktime";lesparams="src:x;AutoPlay:"+demarreAuto+";Loop:"+boucle+";EnableJavaSript:true";} else {clsid+=lecteur;}lesparams+=";"+autresParams;var ajAlign="";if (align!=''){ajAlign=' align="'+align+'"';}var bordureFirefox="";var estMoz=false;if (navigator.appName.indexOf('Netscape')>=0){estMoz=true;}if (lstyle.indexOf("border")>=0 && estMoz){bordureFirefox=lstyle;lstyle="";}var ajTaille=' width="'+largeur+'" height="'+hauteur+'"';if (largeur==0 && hauteur==0 && lstyle.indexOf("position:")<0){if (lstyle!=""){lstyle+=";";}lstyle+="position:absolute;left:-2000px;top:-2000px";}if (lstyle!=""){ajAlign+=' style="'+lstyle+'"';}var res='<object classid="'+clsid+'" id="'+lid+'" class="'+classe+'"'+ajTaille+ajAlign+'>';var tabPrm=lesparams.split(';');var listeAttrEmbed=' src="'+source+'"';for (var i=0;i<tabPrm.length;i++){if (tabPrm[i].indexOf(':')>0){var paireP=tabPrm[i].split(':');if (i==0){res+='<param name="'+paireP[0]+'" value="'+source+'"/>';} else {if (ajouteDimFVar && paireP[0].toLowerCase()=="flashvars"){var valP1=paireP[1];if (valP1.indexOf("width=")<0){if (valP1!=""){valP1+="&";}valP1+="width="+largeur+"&height="+hauteur;}if (valP1.indexOf("usefullscreen=")<0){if (valP1!=""){valP1+="&";}valP1+="usefullscreen=false";}if (valP1.indexOf("showdigits=")<0){if (valP1!=""){valP1+="&";}valP1+="showdigits=false";}if (valP1.indexOf("enablejs=")<0){if (valP1!=""){valP1+="&";}valP1+="enablejs=true";}if (skin!=""){valP1+="&skin="+skin;}paireP[1]=valP1;}res+='<param name="'+paireP[0]+'" value="'+paireP[1]+'"/>';listeAttrEmbed+=' '+paireP[0]+'="'+paireP[1]+'"';}}}if (estMoz){res+='<embed name="'+lid+'" class="'+classe+'" type="'+type+'"'+ajTaille+lstyle+listeAttrEmbed+'></embed>';}res+='</object>';if (bordureFirefox!=""){res='<div style="display:inline-block;max-height:'+hauteur+'px;'+bordureFirefox+'">'+res+'</div>';}return res;}function PF_arrondir(oDiv,params,estMoz){if (params.length<5){params="";}if (params.indexOf(".")<0){params="";}if (params!=''){var tabP=params.split(".");if (tabP[0].length<3){tabP[0]="0"+tabP[0];}if (tabP[0].length<3){tabP[0]="0"+tabP[0];}params=tabP[0]+tabP[1];var optCoins=params.substring(0,4);var ardHG=true;var ardHD=true;var ardBG=true;var ardBD=true;if (optCoins.substring(0,1)=="0"){ardHG=false;}if (optCoins.substring(1,2)=="0"){ardHD=false;}if (optCoins.substring(2,3)=="0"){ardBG=false;}if (optCoins.substring(3)=="0"){ardBD=false;}var ajusteL=0;var ajusteH=0;var ajusteX=0;var ajusteY=0;var diamPuce=20;var numTaille=params.substring(4,5);if (numTaille==6){diamPuce=100;ajusteX=1;ajusteL=-3;ajusteY=1;ajusteH=-1;}else if (numTaille==5){diamPuce=80;ajusteX=2;ajusteL=-2;ajusteY=2;ajusteH=-2;if (estMoz){ajusteY=1;ajusteX=0;ajusteH=-1;ajusteL=-1;}}else if (numTaille==4){diamPuce=60;ajusteX=0;ajusteL=-1;ajusteY=-1;ajusteH=-1;if (estMoz){ajusteY=0;}}else if (numTaille==3){diamPuce=40;ajusteL=-1;if (estMoz){ajusteL=-1;}}else if (numTaille==2){ajusteY=-1;if (estMoz){ajusteY=0;}}else if (numTaille==1){diamPuce=14;ajusteY=-1;if (estMoz){ajusteY=0;}}if ((typeof(oDiv.style.borderTopLeftRadius)=="string" && typeof(oDiv.style.boxShadow)=="string")||(typeof(oDiv.style.MozBorderRadiusTopleft)=="string" && typeof(oDiv.style.MozBoxShadow)=="string")||(typeof(oDiv.style.WebkitBorderTopLeftRadius)=="string" && typeof(oDiv.style.webkitBoxShadow)=="string")){diamPuce=Math.round(diamPuce*0.6);if (ardHG){oDiv.style.MozBorderRadiusTopleft=diamPuce+"px";oDiv.style.WebkitBorderTopLeftRadius=diamPuce+"px";oDiv.style.borderTopLeftRadius=diamPuce+"px";}if (ardHD){oDiv.style.MozBorderRadiusTopright=diamPuce+"px";oDiv.style.WebkitBorderTopRightRadius=diamPuce+"px";oDiv.style.borderTopRightRadius=diamPuce+"px";}if (ardBG){oDiv.style.MozBorderRadiusBottomleft=diamPuce+"px";oDiv.style.WebkitBorderBottomLeftRadius=diamPuce+"px";oDiv.style.borderBottomLeftRadius=diamPuce+"px";}if (ardBD){oDiv.style.MozBorderRadiusBottomright=diamPuce+"px";oDiv.style.WebkitBorderBottomRightRadius=diamPuce+"px";oDiv.style.borderBottomRightRadius=diamPuce+"px";}return;}var vItalique=valCSS(oDiv,"fontStyle","font-style",estMoz);if (vItalique=="italic"){oDiv.style.fontStyle="normal";}var nonStrict=false;if(!estMoz && (document.compatMode!='CSS1Compat')){nonStrict=true;}if (oDiv.id==""){oDiv.id="div_effet_"+Math.round(Math.random()*1000);}var coulF=valCSS(oDiv,"backgroundColor","background-color",estMoz);if (coulF=="transparent"){return 0;}var largeur=oDiv.offsetWidth+1;if (estMoz){largeur+=2;}var hauteur=oDiv.offsetHeight;var rempliGauche=valCSS(oDiv,"paddingLeft","padding-left",estMoz);var rempliDroit=valCSS(oDiv,"paddingRight","padding-right",estMoz);var rempliHaut=valCSS(oDiv,"paddingTop","padding-top",estMoz);var rempliBas=valCSS(oDiv,"paddingBottom","padding-bottom",estMoz);if (!nonStrict){}if ((largeur<diamPuce)||(hauteur<diamPuce)){oDiv.style.visibility="visible";return 0;}var posCss=valCSS(oDiv,"position","position",estMoz);if (posCss!="relative" && posCss!="absolute" && posCss!="fixed"){oDiv.style.position="relative";oDiv.style.left=valCSS(oDiv,"marginLeft","margin-left",estMoz);oDiv.style.marginLeft="0px";oDiv.style.top=valCSS(oDiv,"marginTop","margin-top",estMoz);oDiv.style.marginTop="0px";oDiv.style.marginRight="0px";}var contenuHTML=oDiv.innerHTML;var oFondContenu=document.createElement("div");while (oDiv.childNodes.length>0){oFondContenu.appendChild(oDiv.firstChild);}var bordureHaut=valCSS(oDiv,"borderTopWidth","border-top-width",estMoz);var coulBordureHaut=valCSS(oDiv,"borderTopColor","border-top-color",estMoz);var styleBordure=valCSS(oDiv,"borderTopStyle","border-top-style",estMoz);if ((styleBordure!='none')&&(bordureHaut.indexOf('px')>0)){bordureHaut=parseInt(bordureHaut.substring(0,bordureHaut.length-2));oDiv.style.borderWidth="0px";} else {bordureHaut=0;}largeur=largeur-bordureHaut;hauteur=hauteur-bordureHaut;var rayon=Math.round(diamPuce/2);var pos;var hauteurRempli=hauteur+ajusteH;if (nonStrict){hauteurRempli+= bordureHaut*2;}var largeurRempli=largeur+ajusteL;if (nonStrict){largeurRempli+= bordureHaut*2;}var coinHG;if (ardHG){coinHG=creeCoin(coulF,diamPuce);if (bordureHaut>0){var bcoin=creeCoin(coulBordureHaut,diamPuce);bcoin.style.left=coinHG.style.left;bcoin.style.top=coinHG.style.top;positionBCoin(coinHG,bordureHaut);oDiv.appendChild(bcoin);}} else {coinHG=boucheCoin(coulF,rayon);coinHG.style.top=ajusteY+"px";coinHG.style.left=ajusteX+"px";if (bordureHaut>0){coinHG.style.borderTopColor=coulBordureHaut;coinHG.style.borderTopStyle=styleBordure;coinHG.style.borderTopWidth=bordureHaut+"px";coinHG.style.borderLeftColor=coulBordureHaut;coinHG.style.borderLeftStyle=styleBordure;coinHG.style.borderLeftWidth=bordureHaut+"px";}}oDiv.appendChild(coinHG);var coinHD;if (ardHD){coinHD=creeCoin(coulF,diamPuce);pos=largeur-diamPuce;coinHD.style.left=pos+"px";if (bordureHaut>0){var bcoin=creeCoin(coulBordureHaut,diamPuce);bcoin.style.top=coinHD.style.top;positionBCoin(coinHD,bordureHaut);pos=largeur-diamPuce+bordureHaut*2;bcoin.style.left=pos+"px";oDiv.appendChild(bcoin);}} else {coinHD=boucheCoin(coulF,rayon);coinHD.style.top=ajusteY+"px";pos=largeurRempli-rayon+ajusteX-4;coinHD.style.left=pos+"px";if (bordureHaut>0){pos=largeur-rayon+ajusteX+ajusteL+bordureHaut-4;coinHD.style.left=pos+"px";coinHD.style.borderTopColor=coulBordureHaut;coinHD.style.borderTopStyle=styleBordure;coinHD.style.borderTopWidth=bordureHaut+"px";coinHD.style.borderRightColor=coulBordureHaut;coinHD.style.borderRightStyle=styleBordure;coinHD.style.borderRightWidth=bordureHaut+"px";}}oDiv.appendChild(coinHD);var coinBG;if (ardBG){coinBG=creeCoin(coulF,diamPuce);pos=hauteur-diamPuce;coinBG.style.top=pos+"px";if (bordureHaut>0){var bcoin=creeCoin(coulBordureHaut,diamPuce);bcoin.style.left=coinBG.style.left;positionBCoin(coinBG,bordureHaut);pos=hauteur-diamPuce+bordureHaut*2;bcoin.style.top=pos+"px";oDiv.appendChild(bcoin);}} else {coinBG=boucheCoin(coulF,rayon);pos=hauteurRempli-rayon+ajusteY-4;coinBG.style.top=pos+"px";coinBG.style.left=ajusteX+"px";if (bordureHaut>0){pos=pos+bordureHaut;coinBG.style.top=pos+"px";coinBG.style.borderBottomColor=coulBordureHaut;coinBG.style.borderBottomStyle=styleBordure;coinBG.style.borderBottomWidth=bordureHaut+"px";coinBG.style.borderLeftColor=coulBordureHaut;coinBG.style.borderLeftStyle=styleBordure;coinBG.style.borderLeftWidth=bordureHaut+"px";}}oDiv.appendChild(coinBG);var coinBD;if (ardBD){coinBD=creeCoin(coulF,diamPuce);pos=largeur-diamPuce;coinBD.style.left=pos+"px";pos=hauteur-diamPuce;coinBD.style.top=pos+"px";if (bordureHaut>0){positionBCoin(coinBD,bordureHaut);var bcoin=creeCoin(coulBordureHaut,diamPuce);pos=pos+bordureHaut*2;bcoin.style.top=pos+"px";pos=largeur-diamPuce+bordureHaut*2;bcoin.style.left=pos+"px";oDiv.appendChild(bcoin);}} else {coinBD=boucheCoin(coulF,rayon);pos=largeurRempli-rayon+ajusteX-4;coinBD.style.left=pos+"px";pos=hauteurRempli-rayon+ajusteY-4;coinBD.style.top=pos+"px";if (bordureHaut>0){pos=pos+bordureHaut;coinBD.style.top=pos+"px";pos=largeur-rayon+ajusteX+ajusteL+bordureHaut-4;coinBD.style.left=pos+"px";coinBD.style.borderBottomColor=coulBordureHaut;coinBD.style.borderBottomStyle=styleBordure;coinBD.style.borderBottomWidth=bordureHaut+"px";coinBD.style.borderRightColor=coulBordureHaut;coinBD.style.borderRightStyle=styleBordure;coinBD.style.borderRightWidth=bordureHaut+"px";}}oDiv.appendChild(coinBD);var rempli1=document.createElement("div");rempli1.style.backgroundColor=coulF;rempli1.style.position="absolute";rempli1.style.overflow="hidden";rempli1.style.top=ajusteY+"px";rempli1.style.left=rayon+"px";pos=largeur-diamPuce;rempli1.style.width=pos+"px";rempli1.style.height=hauteurRempli+"px";if (bordureHaut>0){rempli1.style.borderTopColor=coulBordureHaut;rempli1.style.borderTopStyle=styleBordure;rempli1.style.borderTopWidth=bordureHaut+"px";rempli1.style.borderBottomColor=coulBordureHaut;rempli1.style.borderBottomStyle=styleBordure;rempli1.style.borderBottomWidth=bordureHaut+"px";}oDiv.appendChild(rempli1);var rempli2=document.createElement("div");rempli2.style.backgroundColor=coulF;rempli2.style.position="absolute";rempli2.style.overflow="hidden";rempli2.style.left=ajusteX+"px";rempli2.style.top=rayon+"px";rempli2.style.width=largeurRempli+"px";pos=hauteur-diamPuce;if (pos>0){rempli2.style.height=pos+"px";}if (bordureHaut>0){rempli2.style.borderLeftStyle=styleBordure;rempli2.style.borderLeftWidth=bordureHaut+"px";rempli2.style.borderRightStyle=styleBordure;rempli2.style.borderRightWidth=bordureHaut+"px";rempli2.style.borderLeftColor=coulBordureHaut;rempli2.style.borderRightColor=coulBordureHaut;}oDiv.appendChild(rempli2);oDiv.style.borderStyle="none";oDiv.style.borderWidth="0px";oFondContenu.style.position="absolute";if (vItalique=="italic"){oFondContenu.style.fontStyle="italic";}oFondContenu.style.backgroundColor="transparent";oFondContenu.style.top=bordureHaut+"px";oFondContenu.style.left=bordureHaut+"px";oDiv.style.backgroundColor="transparent";oFondContenu.style.paddingLeft=rempliGauche;if (!nonStrict){largeur=largeur-parseInt(rempliGauche)-parseInt(rempliDroit);hauteur=hauteur-parseInt(rempliHaut)-parseInt(rempliBas);}oFondContenu.style.width=largeur;var lpad=rempliDroit;if (estMoz){lpad=parseInt(lpad)+3;lpad=lpad+"px";}oFondContenu.style.paddingRight=lpad;oFondContenu.style.paddingTop=rempliHaut;oFondContenu.style.paddingBottom=rempliBas;oFondContenu.id=oDiv.id+"fondContenu";oDiv.appendChild(oFondContenu);pos=largeur+bordureHaut;oDiv.style.width=pos+"px";pos=hauteur+bordureHaut;oDiv.style.height=pos+"px";}oDiv.style.visibility="visible";}function valCSS(oDiv,nomIE,nomMoz,estMoz){if (estMoz){var comp=document.defaultView.getComputedStyle(oDiv,"");if (comp==null){return "";}return comp.getPropertyValue(nomMoz);} else {return oDiv.currentStyle[nomIE];}}function PF_ombre(oDiv,paramOmbre,estMoz){if (paramOmbre.indexOf(".")<0){paramOmbre="";}if (paramOmbre.indexOf("%")<0){paramOmbre="";}if (paramOmbre!=''){var tabParam=paramOmbre.split(".");var decalOmbreX=0;var decalOmbreY=0;var multiY=1;var tOpac=tabParam[1];if (tOpac.indexOf('0')==0){multiY=-1;tOpac=tOpac.substring(1);}var opaciteO=tOpac.substring(0,tOpac.length-1);if (opaciteO.length==1){opaciteO=opaciteO+"0";}opaciteO=parseInt(opaciteO);if (opaciteO==99){opaciteO=100;}opaciteO=opaciteO/100;var lesdecals=tabParam[0];var multiX=1;if (lesdecals.indexOf("-")==0){lesdecals=lesdecals.substring(1);multiX=-1;}if (lesdecals.length==1){lesdecals="000"+lesdecals;}if (lesdecals.length==2){lesdecals="00"+lesdecals;}if (lesdecals.length==3){lesdecals="0"+lesdecals;}var decalx=parseInt(lesdecals.substring(0,2));var elargieDeuxCotesX=0;var elargieDeuxCotesY=0;var decaly=parseInt(lesdecals.substring(2));if (typeof(oDiv.style.MozBoxShadow)=="string"||typeof(oDiv.style.webkitBoxShadow)=="string"||typeof(oDiv.style.boxShadow)=="string"){oDiv.style.backgroundPosition="";var leRadu="7";var decalpl=2;if (Math.abs(decalx)<4){leRadu="6";}if (Math.abs(decalx)<2){leRadu="5";decalpl=1;}decalx+=decalpl;decaly+=decalpl;decalx=decalx*multiX;decaly=decaly*multiY;var lcc=Math.round(255*(1-opaciteO))-20;if (lcc<0){lcc=0;}if (decalx==decaly && (decalx==35)){decalx=6;decaly=6;}var chaineOmbr=decalx+"px "+decaly+"px "+leRadu+"px rgb("+lcc+","+lcc+","+lcc+")";oDiv.style.MozBoxShadow=chaineOmbr;oDiv.style.webkitBoxShadow=chaineOmbr;oDiv.style.boxShadow=chaineOmbr;return;}if (!estMoz && window.XMLHttpRequest==null){oDiv.style.filter=null;}var oExiste=PF_donneObjet(oDiv.id+"fondContenu");if (oExiste==null){return 0;}var ombre=document.createElement("div");ombre.id=oDiv.id+"fondOmbre";for (var i=0;i<oDiv.childNodes.length;i++){if (oDiv.childNodes.item(i).id!=oDiv.id+'fondContenu'){ombre.appendChild(oDiv.childNodes.item(i).cloneNode(true));}}if (decalx=="33"){elargieDeuxCotesX=3;decalx=6;multiX=-1;multiY=-1;}if (decaly=="33"){elargieDeuxCotesY=3;decaly=6;multiX=-1;multiY=-1;}if (decalx=="44"){elargieDeuxCotesX=4;decalx=7;multiX=-1;multiY=-1;}if (decaly=="44"){elargieDeuxCotesY=4;decaly=7;multiX=-1;multiY=-1;}if (decalx=="55"){elargieDeuxCotesX=5;decalx=8;multiX=-1;multiY=-1;}if (decaly=="55"){elargieDeuxCotesY=5;decaly=8;multiX=-1;multiY=-1;}if (estMoz){if (elargieDeuxCotesY==0){decalOmbreX+=multiX;decalOmbreY+=multiY;}opaciteO-=0.25;if (opaciteO<0.1){opaciteO=0.1;}}var leRadu="4";if (Math.abs(decalx)<4){leRadu="3";}if (Math.abs(decalx)<2){leRadu="2";}pos=decalOmbreX+multiX*decalx;ombre.style.left=pos+"px";pos=decalOmbreY+multiY*decaly;ombre.style.top=pos+"px";var lesdivsombre=ombre.getElementsByTagName("div");for (var i=0;i<lesdivsombre.length;i++){var odvom=lesdivsombre.item(i);if (odvom.style.backgroundColor!=''){odvom.style.backgroundColor="#000000";odvom.style.borderColor="#000000";} else {odvom.style.color="#000000";}}ombre.style.position="absolute";var lar=oDiv.offsetWidth+elargieDeuxCotesX*2;var hau=oDiv.offsetHeight+elargieDeuxCotesY*2;if (oExiste!=null){if (oExiste.offsetWidth>lar){lar=oExiste.offsetWidth+elargieDeuxCotesX*2;}if (oExiste.offsetHeight>hau){hau=oExiste.offsetHeight+elargieDeuxCotesY*2;}}ombre.style.width=lar+"px";ombre.style.height=hau+"px";if (estMoz){ombre.style.opacity=opaciteO;}oDiv.insertBefore(ombre,oDiv.firstChild);if (elargieDeuxCotesY>0){if (estMoz){decaly-=2;decalx-=1;}var lesdivo=ombre.getElementsByTagName("div");for (var k=0;k<lesdivo.length;k++){var oznr=lesdivo.item(k);if (oznr.innerHTML.length!=1){var larg=oznr.offsetWidth+(elargieDeuxCotesX*3);oznr.style.width=larg+"px";larg=oznr.offsetHeight+(elargieDeuxCotesY*3);oznr.style.height=larg+"px";} else {var haut=parseInt(oznr.style.top);if (haut>10){haut=haut+elargieDeuxCotesY*3;oznr.style.top=haut+"px";}haut=parseInt(oznr.style.left);if (haut>10){haut=haut+elargieDeuxCotesX*3;oznr.style.left=haut+"px";}}}}ombre.style.filter="progid:DXImageTransform.Microsoft.blur(pixelradius="+leRadu+".0, makeshadow='true', ShadowOpacity="+opaciteO+")";}}function creeCoin(coulF,diametre){var coin=document.createElement("div");coin.style.position="absolute";coin.style.fontFamily="Arial";coin.style.fontWeight="Normal";coin.style.top="0px";coin.style.left="0px";var marge=Math.round(diametre/2.1);coin.style.marginTop="-"+marge+"px";marge=Math.round(diametre/4.6);coin.style.marginLeft="-"+marge+"px";diametre=diametre*2;coin.style.lineHeight=diametre+"px";diametre=diametre*2;coin.style.fontSize=diametre+"px";coin.style.color=coulF;coin.innerHTML="&#8226;";return coin;}function boucheCoin(coulF,rayon){var coin=document.createElement("div");coin.style.position="absolute";var tray=rayon+4;coin.style.width=tray+"px";coin.style.height=tray+"px";coin.style.borderWidth="0px";coin.style.overflow="hidden";coin.style.backgroundColor=coulF;return coin;}function positionBCoin(oBord,largb){var pos=parseInt(oBord.style.left.substring(0,oBord.style.left.length-2));pos=pos+largb;oBord.style.left=pos+"px";pos=parseInt(oBord.style.top.substring(0,oBord.style.top.length-2));pos=pos+largb;oBord.style.top=pos+"px";}function donneRegleCSSMoz(nomClasse){try {for (var m=0;m<document.styleSheets.length;m++){var ofCSS=document.styleSheets.item(m);var tabRule=ofCSS.cssRules;for (var j=0;j<tabRule.length;j++){if (tabRule.item(j).selectorText==nomClasse){return tabRule.item(j);}}}}catch(e){}return null;}