var estMoz=false;var estSafari=false;var progIDMSXML="Msxml2.DOMDocument.6.0";var objXSL=null;var tabLex;var objHTTP=null;var cibleASP;var refXSLCharge="";function _Document_onload() { handleOnLoad(this);}function handleOnLoad(objDOMDocument) { if (!objDOMDocument.documentElement || objDOMDocument.documentElement.tagName == "parsererror"){ objDOMDocument.parseError = -9999999;} changeReadyState(objDOMDocument, 4);}function changeReadyState(objDOMDocument, iReadyState) { try{objDOMDocument.readyState = iReadyState;}catch(e){} if (objDOMDocument.onreadystatechange != null && (typeof(objDOMDocument.onreadystatechange)=="function")) objDOMDocument.onreadystatechange();}function IU_objDom(){var objX;if (estMoz){objX=document.implementation.createDocument("", "test", null);objX.addEventListener("load", _Document_onload, false);} else {try {objX=new ActiveXObject(progIDMSXML);if (progIDMSXML=="Msxml2.DOMDocument.6.0"){objX.setProperty("NewParser",true);}} catch(e){progIDMSXML="Msxml2.DOMDocument.3.0";objX=new ActiveXObject(progIDMSXML);}}objX.async=false;return objX;}if (document.implementation && document.implementation.createDocument && !window.ActiveXObject){ Document.prototype.loadXML = function(strXML) { changeReadyState(this, 1); var objDOMParser = new DOMParser(); var objDoc = objDOMParser.parseFromString(strXML, "text/xml"); while (this.hasChildNodes()){this.removeChild(this.lastChild);} for (var i=0; i < objDoc.childNodes.length; i++) { var objImportedNode = this.importNode(objDoc.childNodes[i], true); this.appendChild(objImportedNode); } handleOnLoad(this); return true; }; if (!document.implementation.load){ Document.prototype.load = function(fichUrl) { changeReadyState(this, 1); var objDOMParser = new DOMParser(); var xmlhttp = new XMLHttpRequest();xmlhttp.open("GET",fichUrl,false);xmlhttp.send(null); var objDoc = xmlhttp.responseXML; if (objDoc==null){return false;} while (this.hasChildNodes()){this.removeChild(this.lastChild);} for (var i=0; i < objDoc.childNodes.length; i++) { var objImportedNode = this.importNode(objDoc.childNodes[i], true); this.appendChild(objImportedNode); } handleOnLoad(this); return true; }; estSafari=true; } Document.prototype.readyState = "0";Document.prototype.onreadystatechange = null;Document.prototype.parseError = 0;estMoz=true;progIDMSXML="Moz";}if(document.implementation.hasFeature("XPath","3.0")){ XMLDocument.prototype.selectNodes = function(cXPathString, xNode){ if(!xNode){xNode = this;} var aResult = []; var defaultNS = this.defaultNS; if (navigator.userAgent.indexOf("Firefox")>0){ var aItems = this.evaluate(cXPathString, xNode,{ normalResolver: this.createNSResolver(this.documentElement), lookupNamespaceURI : function (prefix){ switch (prefix){ case "dflt": return defaultNS; default: return this.normalResolver.lookupNamespaceURI(prefix); } } },XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null); for(var i=0;i<aItems.snapshotLength;i++){ aResult[i]=aItems.snapshotItem(i); } } else { try { var result= this.evaluate(cXPathString, xNode,{ normalResolver: this.createNSResolver(this.documentElement), lookupNamespaceURI : function (prefix){ switch (prefix){ case "dflt": return defaultNS; default: return this.normalResolver.lookupNamespaceURI(prefix); } } },null,null); var oRes=result.iterateNext(); while (oRes!=null){ aResult.push(oRes); oRes=result.iterateNext(); } }catch(e){alert(e.message+" "+cXPathString)}} return aResult; }; Element.prototype.selectNodes = function(cXPathString){ if(this.ownerDocument.selectNodes){ return this.ownerDocument.selectNodes(cXPathString, this); }else{throw "For XML Elements Only";} }; XMLDocument.prototype.setProperty = function(p,v){ if(p=="SelectionNamespaces" && v.indexOf("xmlns:dflt")==0){ this.defaultNS = v.replace(/^.*=\'(.+)\'/,"$1"); } }; XMLDocument.prototype.defaultNS;}function espaceNomDefini(obj,ns){if (ns==""){return true;}if (obj.lookupNamespaceURI(ns)!=null){return true;}if (obj.ownerDocument.lookupNamespaceURI(ns)!=null){return true;}return false;}function XML_listeParBalise(objXML,balise){if (estMoz && !objXML.selectNodes){if (objXML.ownerDocument.selectNodes){return objXML.ownerDocument.selectNodes(".//"+espaceDeNomDefini(objXML)+balise,objXML);}return objXML.getElementsByTagName(balise);}return objXML.selectNodes(".//"+espaceDeNomDefini(objXML)+balise);}function XML_filsNS(objXML,ns,balise){var xpath=ns+":"+balise;if (ns==""){xpath="*[local-name()='"+balise+"']";if (progIDMSXML=="Msxml2.DOMDocument.3.0"){xpath=balise;}}if (estMoz){if (objXML.selectNodes){if (!espaceNomDefini(objXML,ns)){return null;}var restab = objXML.selectNodes(xpath);if (restab.length>0){return restab[0];}} else if (objXML.ownerDocument.selectNodes){if (!espaceNomDefini(objXML,ns)){return null;}var restab = objXML.ownerDocument.selectNodes(xpath,objXML);if (restab.length>0){return restab[0];}} else {var lesn=objXML.childNodes;var i=0;var cherceBal=balise;if (ns!=""){cherceBal=ns+":"+balise;}while (i<lesn.length){if (lesn.item(i).nodeName==cherceBal){return lesn.item(i);}i++;}}return null;} else {return objXML.selectSingleNode(xpath);}}function XML_fils(objXML,balise){if (objXML==null){alert("XML_fils "+balise);}var xpath=espaceDeNomDefini(objXML)+balise;if (estMoz){if (objXML.selectNodes){var restab = objXML.selectNodes(xpath);if (restab.length>0){return restab[0];}} else if (objXML.ownerDocument.selectNodes){var restab = objXML.ownerDocument.selectNodes(xpath,objXML);if (restab.length>0){return restab[0];}} else{var lesn=objXML.childNodes;if (lesn==null){alert("childNodes null for "+balise);}var i=0;while (i<lesn.length){if (lesn.item(i).nodeName==balise){return lesn.item(i);}i++;}}return null;} else {return objXML.selectSingleNode(xpath);}}function XML_modifTexteNoeud(oN,texte){if (estMoz){var nTet=oN.firstChild;if ((nTet==null)||(nTet.nodeType != 3)){var ott=oN.ownerDocument.createTextNode(texte);oN.appendChild(ott);} else {oN.firstChild.nodeValue=texte;}} else {oN.text=texte;}}function XML_texteNoeud(obj){var s = "";for(var i=0;i<obj.childNodes.length;i++){var oNode = obj.childNodes[i];if(oNode.nodeType == 3)s += oNode.nodeValue;else if(oNode.nodeType == 1)s += XML_texteNoeud(oNode);}return s;}function XML_trouveNoeud(objXML,balise,nomAttr,valAttr){if (objXML.nodeType==9){objXML=objXML.documentElement;}var xpath=".//"+espaceDeNomDefini(objXML)+balise+"[@"+nomAttr+"='"+valAttr+"']";if (estMoz){if (objXML.selectNodes){var restab = objXML.selectNodes(xpath);if (restab.length>0){return restab[0];}} else if (objXML.ownerDocument.selectNodes){var restab = objXML.ownerDocument.selectNodes(xpath,objXML);if (restab.length>0){return restab[0];}} else {var lesn=objXML.getElementsByTagName(balise);var i=0;while (i<lesn.length){var elTmp=lesn.item(i);if (elTmp.getAttribute(nomAttr)==valAttr){return elTmp;}i++;}}return null;} else {return objXML.selectSingleNode(xpath);}}function XML_trouveNoeudNS(objXML,ns,balise,nomAttr,valAttr){var xpath=".//"+ns+":"+balise+"[@"+nomAttr+"='"+valAttr+"']";if (estMoz) {if (objXML.selectNodes){if (!espaceNomDefini(objXML,ns)){return null;}var restab = objXML.selectNodes(xpath);if (restab.length>0){return restab[0];}} else if (objXML.ownerDocument.selectNodes){if (!espaceNomDefini(objXML,ns)){return null;}var restab = objXML.ownerDocument.selectNodes(xpath,objXML);if (restab.length>0){return restab[0];}} else {var lesn=objXML.getElementsByTagName(ns+":"+balise);var i=0;while (i<lesn.length){var elTmp=lesn.item(i);if (elTmp.getAttribute(nomAttr)==valAttr){return elTmp;}i++;}}return null;} else {return objXML.selectSingleNode(xpath);}}function XML_noeudEgal(objXML,balise,txtN){var res=null;var lesn=objXML.getElementsByTagName(balise);var i=0;while (i<lesn.length){var elTmp=lesn.item(i);if (XML_texteNoeud(elTmp)==txtN){res=elTmp;i=lesn.length;}i++;}return res;}function XML_premierNoeud(objXML,balise){if (objXML==null){alert("XML_premierNoeud null pour "+balise);}var xpath=".//"+espaceDeNomDefini(objXML)+balise;if (estMoz){if (objXML.selectNodes){var restab = objXML.selectNodes(xpath);if (restab.length>0){return restab[0];}} else if (objXML.ownerDocument.selectNodes){var restab = objXML.ownerDocument.selectNodes(xpath,objXML);if (restab.length>0){return restab[0];}} else {var restab=objXML.getElementsByTagName(balise);if (restab.length>0){return restab.item(0);}}return null;} else {return objXML.selectSingleNode(xpath);}return null;}function XML_premierNoeudNS(objXML,ns,balise){var xpath=".//"+ns+":"+balise;if (ns==""){ xpath=".//*[local-name()='"+balise+"']"; if (progIDMSXML=="Msxml2.DOMDocument.3.0"){ xpath=".//"+balise;}}if (estMoz){if (objXML.selectNodes){if (!espaceNomDefini(objXML,ns)){return null;}var restab = objXML.selectNodes(xpath);if (restab.length>0){return restab[0];}} else if (objXML.ownerDocument.selectNodes){if (!espaceNomDefini(objXML,ns)){return null;}var restab = objXML.ownerDocument.selectNodes(xpath,objXML);if (restab.length>0){return restab[0];}} else {var cherceBal=balise;if (ns!=""){cherceBal=ns+":"+balise;}var restab=objXML.getElementsByTagName(cherceBal);if (restab.length>0){return restab.item(0);}}return null;} else {return objXML.selectSingleNode(xpath);}}function espaceDeNomDefini(objXML){var oDoc=objXML;if (objXML.nodeType==1){oDoc=objXML.ownerDocument;}if (progIDMSXML=="Msxml2.DOMDocument.6.0" && oDoc.getProperty("SelectionNamespaces").indexOf(":dflt=")>0){return "dflt:";}if (progIDMSXML=="Moz" && oDoc.defaultNS!=null){return "dflt:";}return "";}function IU_chargerFichierCSS(nomStyle){var oCss=PF_donneObjet("feuilleStyleGeneral");oCss.href = RACINE_STYLES+nomStyle+"/css/general.css";}function renduXSLSub(objXML,nomXSL,oCible){if (objXSL==null){objXSL=IU_objDom();}var resHtml;if (oCible==null){return false;}var refTemp=RACINE_XSL+nomXSL+".xsl";var succ=true;if (refTemp!=refXSLCharge){refXSLCharge=refTemp;succ=objXSL.load(refXSLCharge);}if (!succ){alert("Error loading XSL "+RACINE_XSL+nomXSL+".xsl");}if (objXML==null){var oCorps=XML_premierNoeud(objXSL.documentElement,"body");var lesimgs=oCorps.getElementsByTagName("img");var langsb=LANGUE;if (langsb.length>2){langsb=langsb.substring(0,2);}for (var m=lesimgs.length-1;m>=0;m--){var oImg=lesimgs[m];var ltitle=PF_attr(oImg,"title");if (ltitle.indexOf("locale_")==0){if (ltitle.indexOf("locale_"+langsb)!=0){var oPere=oImg.parentNode;oPere.removeChild(oImg);if (oPere.childNodes.length==0){oPere.parentNode.removeChild(oPere);}} else {if (ltitle.length>9){oImg.setAttribute("title",ltitle.substring(9));} else {oImg.removeAttribute("title");}}}}var oScript=XML_premierNoeud(oCorps,"script");while (oScript!=null){var txtS=XML_texteNoeud(oScript).replace(/^\s+/,'');txtS=txtS.replace(/'/g,"");if (txtS.indexOf('ajDocW(PF_clipAV')==0){txtS=txtS.substring(17);var tabPrm=txtS.split(",");var resObj=PF_clipAV(tabPrm[0],tabPrm[1],tabPrm[2],tabPrm[3],tabPrm[4],tabPrm[5],tabPrm[6],tabPrm[7],tabPrm[8],tabPrm[9],'');var domscr=IU_objDom();var succcli=domscr.loadXML(resObj);if (succcli){oScript.parentNode.insertBefore(domscr.documentElement,oScript);}}oScript.parentNode.removeChild(oScript);oScript=XML_premierNoeud(oCorps,"script");}resHtml=serialiserXML(oCorps);} else {resHtml=transformeXSL(objXML,objXSL);}if (STYLE_INTERFACE!="standard"){resHtml=resHtml.replace(/\/MosData\/MosStyleMgr\/styles\/standard\/media/g,"/MosData/MosStyleMgr/styles/"+STYLE_INTERFACE+"/media");}oCible.innerHTML=resHtml;}function transformeXSL(objXML,objXSL){var resHtml;if (estMoz){var pXSLT = new XSLTProcessor();pXSLT.importStylesheet(objXSL);var nDoc = pXSLT.transformToFragment(objXML,window.document);resHtml=serialiserXML(nDoc);} else {resHtml=objXML.transformNode(objXSL);}return resHtml;}function serialiserXML(oNoeud) {var strXML="";if (estMoz){ var objXMLSerializer = new XMLSerializer(); strXML = objXMLSerializer.serializeToString(oNoeud); } else { strXML=oNoeud.xml; } return strXML;}function IU_chargerLangue(idLangue){tabLex=new Array();if (objXSL==null){objXSL=IU_objDom();}refXSLCharge="";var succ=objXSL.load(RACINE_stage+"MosMtr/ressources/langue/lexiqueSCO.xml");if (succ){var lexs = objXSL.documentElement.getElementsByTagName("lex"); for (var i=0;i<lexs.length;i++){ var lex = lexs.item(i); if (lex.firstChild!=null){ tabLex[lex.getAttribute("id")]=lex.firstChild.nodeValue; } } LANGUE=PF_attr(objXSL.documentElement,"lang"); try{leBiscuit.langue=LANGUE;}catch(e){}} else {alert("Language file not found");}}function donneLex(num){return tabLex[num];}function donneParam(nomP){ var res=''; var params=window.location.search; /*if ((params!="")&&(params.indexOf('%26')>0)){params=params.replace(/%26/,'&');}*/ var ind=params.indexOf("&"+nomP+'='); if (ind<0){ind=params.indexOf("?"+nomP+'=');} if (ind>=0){ var reste=params.substring(ind+nomP.length+2,params.length); var indexFin=reste.indexOf('&'); if (indexFin<0){indexFin=params.length;} res= reste.substring(0,indexFin); } return res;}function initObjHTTP(){if (objHTTP==null){objHTTP=creerObjHTTP();}}function creerObjHTTP(){var objHTTP0=null;if (progIDMSXML!="Moz"){var proHttp="MSXML2.XMLHTTP.3.0";if (progIDMSXML=="Msxml2.DOMDocument.6.0"){proHttp="MSXML2.XMLHTTP.6.0";}try { objHTTP0 = new ActiveXObject(proHttp);} catch(e){objHTTP0 = new ActiveXObject("MSXML2.XMLHTTP.3.0");progIDMSXML="Msxml2.DOMDocument.3.0";}}if (objHTTP0==null && window.XMLHttpRequest){objHTTP0=new XMLHttpRequest();if (progIDMSXML!="Moz"){progIDMSXML="Msxml2.DOMDocument.3.0";}} return objHTTP0;}function usrAsyncComplete() { if(objHTTP.readyState != 4) return(false); usrCheckHTTPStatus("200");}function usrCheckHTTPStatus(sExpected){ if (objHTTP.status != sExpected) { alert("Error "+objHTTP.status+": "+objHTTP.statusText); newWindow = window.open(); newWindow.document.body.innerHTML = objHTTP.responseText; return(false); } else return(true);} function SYS_service(nomService,tabParam){var txtm="<?xml version=\"1.0\" encoding=\"UTF-8\"?><SOAP-ENV:Envelope xmlns:SOAP-ENV=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:xsi=\"http://www.w3.org/1999/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/1999/XMLSchema\"><SOAP-ENV:Body>";txtm+="<ns1:"+nomService+" xmlns:ns1=\"urn:MosWS\" SOAP-ENV:encodingStyle=\"http://schemas.xmlsoap.org/soap/encoding/\">";if (tabParam!=null){for (var i=0;i<tabParam.length;i++){var ligne=tabParam[i].split("##");/*+" xsi:type=\""+ligne[1]+"\"*/txtm+="<"+ligne[0]+">"+ligne[1]+"</"+ligne[0]+">";}}txtm+="</ns1:"+nomService+"></SOAP-ENV:Body></SOAP-ENV:Envelope>";if ((nomService=="getAvailableUserLanguages")||(nomService=="authenticateUser")||(nomService=="getUsers")||(nomService=="getMembers")||(nomService=="updateUserProfile")||(nomService=="listProfileImages")||(nomService=="listProfileImages")){cibleASP=RACINE_MOS+"MosSrv/aspx/SRV_lmsProfile.aspx";} else if (nomService.indexOf("Forum")>0){cibleASP=RACINE_MOS+"MosSrv/aspx/SRV_lmsCollab.aspx";} else if (nomService.indexOf("Theme")>0){cibleASP=RACINE_MOS+"MosSrv/aspx/SRV_lmsTheme.aspx";} else if (nomService=="searchForm"){cibleASP=RACINE_MOS+"MosSrv/aspx/SRV_reglesRecherche.aspx";} else if (nomService=="redonnerParcours"){cibleASP=RACINE_MOS+"MosSrv/aspx/SRV_parcours.aspx";} else {cibleASP=RACINE_MOS+"MosSrv/aspx/SRV_lmsContent.aspx";}var retour=true;if (retour){return SYS_lancerOperationsRetour(txtm,nomService);} else {SYS_lancerOperations(txtm,nomService);}}function SYS_lancerOperationsRetour(chaineXML,type){initObjHTTP(); objHTTP.open("POST", cibleASP, false);objHTTP.setRequestHeader("Content-Type", "text/xml"); objHTTP.send(chaineXML);var DOMReponse=IU_objDom();var succ=DOMReponse.loadXML(objHTTP.responseText);var oServ=null;if (succ){oServ=XML_premierNoeud(DOMReponse.documentElement,"return");}if (oServ==null){var newWindow = window.open(); newWindow.document.body.innerHTML = objHTTP.responseText;}return oServ;}function IU_afficheDate(date0,complet){if (date0==''){return '';}var indexD=0;var annee=date0.substring(indexD,indexD+4);indexD=5;var mois=date0.substring(indexD,indexD+2);indexD=8;var jour=date0.substring(indexD,indexD+2);var dateS=new Date();dateS.setUTCFullYear(Number(annee),Number(mois)-1,Number(jour));var res;if (date0.indexOf(":")>0){indexD=11;dateS.setUTCHours(Number(date0.substring(indexD,indexD+2)),Number(date0.substring(indexD+3,indexD+5)),Number(date0.substring(indexD+6,indexD+8)));res=dateS.toLocaleString();res=res.substring(0,res.lastIndexOf(":"));} else {dateS.setHours(0,0,0);res=dateS.toLocaleString();}if (!complet){var sep="/";if (LANGUE.substring(0,2)=='de'||LANGUE.substring(3)=='CH'||donnePays(LANGUE)=="CH"){sep=".";}var an=new String(dateS.getFullYear());var mois=dateS.getMonth()+1;if (mois<10){mois='0'+mois;}var jour=dateS.getDate();if (jour<10){jour='0'+jour;}res=jour+sep+mois+sep+an.substring(2);if (donnePays(LANGUE)=="US"){res=mois+sep+jour+sep+an.substring(2);}}var indHeur=res.indexOf(" 00:00");if (indHeur>0){res=res.substring(0,indHeur);}return res;}function donnePays(langue){var lang="";if (langue.indexOf("-")>0){return langue.substring(3);}if (navigator.userLanguage){lang=navigator.userLanguage;}else {lang=navigator.language;}var indT=lang.indexOf("-");if (indT>0){return lang.substring(indT+1).toUpperCase();}return "";}function XML_tabElementFils(objXML){var tab=new Array();if (objXML==null){alert("XML_fils"+balise);}var lesn=objXML.childNodes;for (var i=0;i<lesn.length;i++){if (lesn.item(i).nodeType==1){tab.push(lesn.item(i));}}return tab;}function PF_clipAV(lid,src,largeur,hauteur,demarreAuto,lecteur,boucle,align,autresParams,lstyle,dansCmt){if ((largeur==29)&&(hauteur==29)){largeur=0;hauteur=0;}var clsid='clsid:';var classe="obj"+lecteur;if (dansCmt=='cmt'){classe+="_"+demarreAuto;demarreAuto='false';}var source=src;if (src.indexOf("../")!=0){if (lid.indexOf('clipMGR')==0||lid.indexOf('clipSTY')==0){source=RACINE_STYLE+"media/"+src;}}if (lecteur=='Flash' && (src.indexOf(".flv")>0 || src.indexOf(".mp3")>0)){source=RACINE_stage+"MosMtr/gen/mediaplayer.swf?file="+source;source+="&amp;autoStart="+demarreAuto;classe+="_flvPly";}var type="";if (boucle==''){boucle='false';}if (demarreAuto==''){demarreAuto='false';}var lesparams='';if (lecteur=='WM'){var ajBoucle="";if (boucle=="true"){ajBoucle=";playCount:999";}clsid+='6BF52A52-394A-11d3-B153-00C04F79FAA6';type="application/x-mplayer2";lesparams="URL:x;autoStart:"+demarreAuto+";Loop:"+boucle+ajBoucle;} else if (lecteur=='Flash'){ clsid+='D27CDB6E-AE6D-11cf-96B8-444553540000';type="application/x-shockwave-flash";lesparams="movie:x;play:"+demarreAuto+";loop:"+boucle+";swLiveConnect:true";} else if (lecteur=='Real'){ clsid+='CFCDAA03-8BE4-11cf-B84B-0020AFBBCCFA';type="audio/x-pn-realaudio-plugin";lesparams="SRC:x;AUTOSTART:"+demarreAuto+";LOOP:"+boucle;} else if (lecteur=='QT'){ clsid+='02BF25D5-8C17-4B23-BC80-D3488ABDDC6B';type="video/quicktime";lesparams="src:x;AutoPlay:"+demarreAuto+";Loop:"+boucle+";EnableJavaSript:true";} else {clsid+=lecteur;}lesparams+=";"+autresParams;var ajAlign="";if (align!=''){ajAlign=' align="'+align+'"';}if (lstyle!=""){ajAlign+=' style="'+lstyle+'"';}var ajTaille=' width="'+largeur+'" height="'+hauteur+'"';var res='<object classid="'+clsid+'" id="'+lid+'" class="'+classe+'"'+ajTaille+ajAlign+'>';var tabPrm=lesparams.split(';');var listeAttrEmbed=' src="'+source+'"';for (var i=0;i<tabPrm.length;i++){if (tabPrm[i].indexOf(':')>0){var paireP=tabPrm[i].split(':');if (i==0){res+='<param name="'+paireP[0]+'" value="'+source+'"/>';} else {res+='<param name="'+paireP[0]+'" value="'+paireP[1]+'"/>';listeAttrEmbed+=' '+paireP[0]+'="'+paireP[1]+'"';}}}res+='<embed name="'+lid+'" class="'+classe+'" type="'+type+'"'+ajTaille+ajAlign+listeAttrEmbed+'></embed>';res+='</object>';return res;}function stringToHex(s){ var r = ""; var hexes = new Array ("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"); for (var i=0; i<s.length; i++) {r += hexes [s.charCodeAt(i) >> 4] + hexes [s.charCodeAt(i) & 0xf];} return r;}function IU_importeNoeud(objXML,oNoeud){if (progIDMSXML!="Msxml2.DOMDocument.3.0"){var oDoc1=objXML;if (oDoc1.nodeType!=9){oDoc1=oDoc1.ownerDocument}var oDoc2=oNoeud;if (oDoc2.nodeType!=9){oDoc2=oDoc2.ownerDocument}if (oDoc1!=oDoc2){return oDoc1.importNode(oNoeud,true);}}return oNoeud; }