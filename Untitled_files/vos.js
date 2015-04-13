<!--
var vosJsDenyDomainList___ = [];
//set deny domain list here.
vosJsDenyDomainList___.push("jj.jp.msn.com");
vosJsDenyDomainList___.push("wwwtst.msn.suumo.com.suu.raftel");
vosJsDenyDomainList___.push("suumo.the-earth.tv");
vosJsDenyDomainList___.push("www.the-earth.tv");

var isDenyDomain___ = false;
for (var i = 0; i < vosJsDenyDomainList___.length; i++) {
	if(vosJsDenyDomainList___[i] === location.hostname){
		isDenyDomain___ = true;
		break;
	}
}

var SHUKYAKU_GLOBAL_VAR = {};
SHUKYAKU_GLOBAL_VAR.advertisingCom = {
	'cookieSegment':''
};
SHUKYAKU_GLOBAL_VAR.deqwas = {
	'cookieSegment':''
};
var tcdacmd="dt"; // advertising.com

//============ GTM start ==================================
var gtmAllowDomainList___ = [];
//GTM allow domain list here.
gtmAllowDomainList___.push(".*\.?suumo\.jp");
gtmAllowDomainList___.push("goodreform\.jp");
gtmAllowDomainList___.push("www\.suumocounter\.jp");

var isGtmAllowDomain___ = false;
for (var i = 0; i < gtmAllowDomainList___.length; i++) {
	if(new RegExp(gtmAllowDomainList___[i]).test(location.hostname)){
		isGtmAllowDomain___ = true;
		break;
	}
}

//GTM Code
if(isGtmAllowDomain___){
	<!-- Google Tag Manager -->
	(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
	new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
	j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
	'//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
	})(window,document,'script','dataLayer','GTM-KKXMWL');
	<!-- End Google Tag Manager -->
}
//============ GTM end ==================================



if(!isDenyDomain___){


	/*
	==========================================
	AdvertisingCom
	==========================================
	*/
	new function(){
	var TagString = '';
	function IMO_PrefixSearch(ps, s){ if (ps.substr(0, s.length) == s) return true ; else return false;}
	var IMO_PATHSEARCH = location.pathname+location.search;
	function AppendString(a,b) {if (typeof(a) == 'undefined') {return b ;}else{return a+b;}}
	if (IMO_PrefixSearch(IMO_PATHSEARCH,"/chintai")) {
	 var AdvertisingCom_tag ;
	 if (location.protocol == "https:") {
		AdvertisingCom_tag = '<img src="https://secure.leadback.advertising.com/adcedge/lb?site=733844&srvc=311&betr=lb_suumochintai=1&betq=9452=408030" width = "1" height = "1" border = "0" style="display:none;">';
	 } else
	 if (location.protocol == "http:") {
		AdvertisingCom_tag = '<img src="http://leadback.advertising.com/adcedge/lb?site=733844&srvc=311&betr=lb_suumochintai=1&betq=9452=408030" width = "1" height = "1" border = "0" style="display:none;">';
	 } else
	 {}
	}
	else
	if (IMO_PrefixSearch(IMO_PATHSEARCH,"/jj/chintai")) {
	 var AdvertisingCom_tag ;
	 if (location.protocol == "https:") {
		AdvertisingCom_tag = '<img src="https://secure.leadback.advertising.com/adcedge/lb?site=733844&srvc=311&betr=lb_suumochintai=1&betq=9452=408030" width = "1" height = "1" border = "0" style="display:none;">';
	 } else
	 if (location.protocol == "http:") {
		AdvertisingCom_tag = '<img src="http://leadback.advertising.com/adcedge/lb?site=733844&srvc=311&betr=lb_suumochintai=1&betq=9452=408030" width = "1" height = "1" border = "0" style="display:none;">';
	 } else
	 {}
	}
	else
	if (IMO_PrefixSearch(IMO_PATHSEARCH,"/")) {
	 var AdvertisingCom_tag ;
	 if (location.protocol == "https:") {
		AdvertisingCom_tag = '<img src="https://secure.leadback.advertising.com/adcedge/lb?site=733844&srvc=311&betr=lb_suumo=1&betq=9269=407104" width = "1" height = "1" border = "0" style="display:none;">';
	 } else
	 if (location.protocol == "http:") {
		AdvertisingCom_tag = '<img src="http://leadback.advertising.com/adcedge/lb?site=733844&srvc=311&betr=lb_suumo=1&betq=9269=407104" width = "1" height = "1" border = "0" style="display:none;">';
	 } else
	 {}
	}
	else
	{}
	if ((typeof(AdvertisingCom_tag) != 'undefined') && (AdvertisingCom_tag != "")){
	 TagString += AdvertisingCom_tag;
	}
	if ((typeof(TagString) != 'undefined') && (TagString != "")){
		//TagString = TagString.replace(/\</g,"&lt;").replace(/\>/g,"&gt;");
		document.write(TagString);
	}
	};

	/*
	==========================================
	20120106 DFA
	==========================================
	*/
	/* 既存分 */
	new function(){
		var targetRyoiki = {
			"010" : "ms",
			"011" : "kr",
			"020" : "kr",
			"021" : "kr",
			"030" : "kr",
			"401" : "cr",
			"402" : "cr",
			"403" : "cr",
			"404" : "cr",
			"405" : "cr",
			"406" : "cr",
			"600" : "cr",
			"601" : "cr",
			"040" : "ch",
			"041" : "ch",
			"301" : "ch"
		};

		var getIdentifier = function(ryoiki, pageType, areaCd){
			var str = "";
			if(ryoiki && pageType){
				str = ryoiki + pageType;
			}
			if(areaCd != "000" && pageType == "tp") {
				str = "";
			}
			return str;
		};

		var getPageType = function(areaCd, ryoiki, events){
			if(document.URL == "http://suumo.jp/" && areaCd == "000"){
				return "";
			}
			if(events && events.match(/event2($|,)/)
					|| events.indexOf("event14") !== -1
					|| events.indexOf("event12") !== -1
					|| events.indexOf("event13") !== -1
					|| events.indexOf("event15") !== -1
					|| events.indexOf("event22") !== -1
					|| events.indexOf("event17") !== -1
					|| events.indexOf("event25") !== -1
					|| events.indexOf("event23") !== -1){
						return "";
			}else if(events && events.indexOf("prodView") !== -1){
				return "de";
			}
			if(ryoiki && document.location.protocol == "http:"){
				return "pv";
			}else if(document.location.protocol == "http:"){
				return "";
			}
			return "";
		};

		var getSegmentAreaCd = function(ryoiki, pageType, areaCd, todofukenCd){
			var ret = "";
			if(ryoiki == "kr" || areaCd == "030" || areaCd == "060"){
				if(!(pageType == "de" && areaCd == "000")){
					ret = areaCd;
				}
			}
			return ret;
		};

		var getSegment = function(identifier, segmentAreaCd){
			var str = null;
			if(identifier && segmentAreaCd){
				if(identifier.length > 4 && segmentAreaCd.length > 2){
					str = identifier + segmentAreaCd;
				}else{
					str = identifier + "_" + segmentAreaCd;
				}
			}
			return str;
		};

		var category = "000", areaCd = "000", todofukenCd = "", events = "";

		if(s.prop14 && !(s.prop14 instanceof Array)){category=s.prop14;}
		if(s.prop15 && !(s.prop15 instanceof Array) && s.prop15.match(/^0[0-9]0$/)){areaCd=s.prop15;}
		if(s.prop16 && !(s.prop16 instanceof Array)){todofukenCd=s.prop16;}
		if(s.events && !(s.events instanceof Array)){events=s.events;}

		var ryoiki = targetRyoiki[category] ? targetRyoiki[category] : "";
		var pageType = getPageType(areaCd, ryoiki, events);
		var identifier = getIdentifier(ryoiki, pageType, areaCd);
		var segmentAreaCd = getSegmentAreaCd(ryoiki, pageType, areaCd, todofukenCd);
		var segment = getSegment(identifier, segmentAreaCd);
		if(segment){
			var axel = Math.random() + "";
			var a = axel * 10000000000000;
			document.write('<iframe src="' + document.location.protocol + '//3294027.fls.doubleclick.net/activityi;src=3294027;type=' + identifier + ';cat=' + segment + ';ord=' + a + '?" width="1" height="1" frameborder="0" style="display:none"></iframe>');
		}
	}

	/* 新規分 */
	new function(){
		var targetRyoiki = {
			"001" : "ams",
			"010" : "nms",
			"011" : "oms",
			"020" : "nkd",
			"021" : "okd",
			"030" : "tch",
			"401" : "cr",
			"402" : "cr",
			"403" : "cr",
			"404" : "cr",
			"405" : "cr",
			"406" : "cr",
			"600" : "cr",
			"601" : "cr",
			"040" : "ch",
			"041" : "ch",
			"301" : "ch",
			"100" : "kb",
			"051" : "rf",
			"052" : "rf",
			"053" : "rf",
			"054" : "rf",
			"055" : "rf"
		};

		var getIdentifier = function(ryoiki, pageType, areaCd){
			var str = "";
			if(ryoiki && pageType){
				str = ryoiki + pageType;
				if(ryoiki == "nms" && pageType == "cv"){
					str = "mscv";
				}else if(ryoiki == "nms" && pageType == "de" && areaCd.match(/0[01245789]0/)){
					str = "msde";
				}else if(ryoiki == "nms" && pageType == "pv" && areaCd.match(/0[01245789]0/)){
					str = "mspv";
				}else if((ryoiki == "oms" || ryoiki == "nkd" || ryoiki == "okd" || ryoiki == "tch") && pageType == "cv"){
					str = "krcv";
				}
			}else if(pageType == "ot" && areaCd){
				str = "otpv";
			}else if(pageType == "tp" && areaCd == "000"){
				str = "tppv";
			}
			if(areaCd != "000" && pageType == "tp") {
				str = "";
			}
			return str;
		};

		var getPageType = function(areaCd, ryoiki, events){
			if(document.URL == "http://suumo.jp/" && areaCd == "000"){
				return "tp";
			}
			if(events && (events.match(/event2($|,)/)
					|| events.indexOf("event14") !== -1
					|| events.indexOf("event12") !== -1
					|| events.indexOf("event13") !== -1
					|| events.indexOf("event15") !== -1
					|| events.indexOf("event22") !== -1
					|| events.indexOf("event17") !== -1
					|| events.indexOf("event25") !== -1
					|| events.indexOf("event23") !== -1)){
						return "cv";
			}else if(events && events.indexOf("prodView") !== -1){
				return "de";
			}
			if(ryoiki && document.location.protocol == "http:"){
				return "pv";
			}else if(document.location.protocol == "http:"){
				return "ot";
			}
			return "";
		};

		var getSegmentAreaCd = function(ryoiki, pageType, areaCd, todofukenCd){
			var ret = "";
			if((pageType == "de" || pageType == "pv")
					&& (ryoiki != "kb" && ryoiki != "rf")){
				if(todofukenCd == "08" || todofukenCd == "09" || todofukenCd == "10"){
					ret = "e3";
				}else if(todofukenCd == "25" || todofukenCd == "30"){
					ret = "e6";
				} else if(todofukenCd == "11" || todofukenCd == "12" || todofukenCd == "13" || todofukenCd == "14" || todofukenCd == "26" || todofukenCd == "27" || todofukenCd == "28" || todofukenCd == "29") {
					ret = todofukenCd;
				} else {
					if(areaCd != "030" && areaCd != "060"){
						ret = areaCd;
					}
				}
			}else{
				ret = areaCd;
			}
			if(areaCd == "000" && (pageType == "cv")){
				ret = "";
			}
			return ret;
		};

		var getSegment = function(identifier, segmentAreaCd){
			var str = null;
			if(identifier && segmentAreaCd){
				if(identifier.length > 4 && segmentAreaCd.length > 2){
					str = identifier + segmentAreaCd;
				}else{
					str = identifier + "_" + segmentAreaCd;
				}
			}
			return str;
		};

		var category = "000", areaCd = "000", todofukenCd = "", events = "";

		if(s.prop14 && !(s.prop14 instanceof Array)){category=s.prop14;}
		if(s.prop15 && !(s.prop15 instanceof Array) && s.prop15.match(/^0[0-9]0$/)){areaCd=s.prop15;}
		if(s.prop16 && !(s.prop16 instanceof Array)){todofukenCd=s.prop16;}
		if(s.events && !(s.events instanceof Array)){events=s.events;}

		var ryoiki = targetRyoiki[category] ? targetRyoiki[category] : "";
		var pageType = getPageType(areaCd, ryoiki, events);
		var identifier = getIdentifier(ryoiki, pageType, areaCd);
		var segmentAreaCd = getSegmentAreaCd(ryoiki, pageType, areaCd, todofukenCd);
		var segment = getSegment(identifier, segmentAreaCd);
		if(segment){
			var axel = Math.random() + "";
			var a = axel * 10000000000000;
			document.write('<iframe src="' + document.location.protocol + '//3294027.fls.doubleclick.net/activityi;src=3294027;type=' + identifier + ';cat=' + segment + ';ord=' + a + '?" width="1" height="1" frameborder="0" style="display:none"></iframe>');
			// for advertising.com
			SHUKYAKU_GLOBAL_VAR.advertisingCom.cookieSegment = 'type=' + identifier + ';cat=' + segment;
			if(document.location.href.indexOf("https") == 0) {
				document.write("<SCR"+"IPT SRC='https://an.secure.tacoda.net/an/18398/slf_ssl.js' LANGUAGE='JavaScript'><\/SCR"+"IPT>");
			} else {
				document.write("<SCR"+"IPT SRC='http://an.tacoda.net/an/18398/slf.js' LANGUAGE='JavaScript'><\/SCR"+"IPT>");
			}
			//for deqwas
			SHUKYAKU_GLOBAL_VAR.deqwas.cookieSegment = 'type=' + identifier + ';cat=' + segment
		}
	}
	/*
	==========================================
	20121108 deqwas
	==========================================
	*/
	document.write('<div id="deqwas-collection" style="display:none;"></div>');
	document.write('<div id="deqwas" style="display:none;"></div>');
	//deqwas
	var deqwas = { option: {} };
	deqwas.cid = "suumo";
	deqwas.id = "";
	deqwas.viewer_id = "";
	deqwas.info = "";
	var deqwas_script = document.createElement('script');
	deqwas_script.src = location.protocol + '//dex01.deqwas.net/suumo/scripts/x.js?noCache=' + Math.floor((new Date()).getTime()/3600000);
	deqwas_script.type = 'text/javascript';
	deqwas_script.charset = 'UTF-8';

	function _deqwas() {
		try {
			document.getElementById('deqwas').appendChild(deqwas_script);
		} catch(e) {
			setTimeout('_deqwas()', 100);
		}
	}
	(function () {
		setTimeout('_deqwas()', 100);
	})();

	/*
	==========================================
	20120104 Beacon Start
	==========================================
	*/
	;
	var _WkWkParams = _WkWkParams || [];
	_WkWkParams.push(["DEVELOPER_DOMAIN", "test_chintai.suumo.jp"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "test_fudosan.suumo.jp"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "suumo.jp.suu.raftel"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.k5.suumo.jp"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.suumo.jp"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.suumo.jp.suu.raftel"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "mb.k2.tst.land.suumo.jp"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.k5.suumo.jp.suu.raftel"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "bessou.suumo.jp.suu.raftel"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "eco.sms.rlt.raftel"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "web08suu.b.suu.raftel"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "k2.tst.land.suumo.jp"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "forrentstyle.suumo.jp.suu.raftel"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "gakunavi.suumo.jp.suu.raftel"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "test-iesagashi.scope-navi.jp"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.suumo.jp"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.suumo.jp.suu.raftel"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.k3.suumo.jp"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.k5.suumo.jp"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.k3.suumo.jp.suu.raftel"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "www.forrent.jp"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.k5.suumo.jp.suu.raftel"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.k10.suumo.jp.suu.raftel"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwadm.suumo.jp.suu.raftel"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.gakusei.suumo.jp"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.k12.suumo.jp.suu.raftel"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.msn.suumo.com.suu.raftel"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.k12.suumo.jp"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.msn.suumo.com"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.k2.suumo.jp"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.k2.suumo.jp.suu.raftel"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.k10.suumo.jp"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.gakusei.suumo.jp.suu.raftel"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.k4.suumo.jp"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.bessou.suumo.jp"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.nikkei-suumo.jp"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.k3.msn.suumo.com"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.k10.bessou.suumo.jp.suu.raftel"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.k3.gakusei.suumo.jp"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.inaka.suumo.jp"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.bridal.suumo.jp"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwkr.suumo.jp.suu.raftel"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.k11.suumo.jp"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.k4.suumo.jp.suu.raftel"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.k3.bridal.suumo.jp"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.k12.bessou.suumo.jp.suu.raftel"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.k9.suumo.jp"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.k9.suumo.jp.suu.raftel"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.k3.msn.suumo.com.suu.raftel"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.nikkei-suumo.jp.suu.raftel"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.officemovement.com.suu.raftel"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.bessou.suumo.jp.suu.raftel"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.bridal.suumo.jp.suu.raftel"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwadm.bessou.suumo.jp.suu.raftel"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwpt.suumo.jp.suu.raftel"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.gakunavi.suumo.jp"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.inaka.suumo.jp.suu.raftel"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.k3.forrentstyle.suumo.jp.suu.raftel"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.officemovement.com"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.k10.msn.suumo.com.suu.raftel"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.k11.suumo.jp.suu.raftel"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.k3.gakusei.suumo.jp.suu.raftel"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "www.officemovement.com.suu.raftel"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwadm.inaka.suumo.jp.suu.raftel"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.k2.bessou.suumo.jp"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.k12.msn.suumo.com.suu.raftel"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.k12.nikkei-suumo.jp"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.k10.inaka.suumo.jp.suu.raftel"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.k8.suumo.jp"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.ch-kskensaku.suumo.jp"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.k4.msn.suumo.com"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.k10.nikkei-suumo.jp.suu.raftel"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.campus.suumo.jp"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.k2.msn.suumo.com"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.k10.img10.suumo.jp"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.img10.suumo.jp"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwadm.img10.suumo.jp"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.k11.msn.suumo.com"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.k12.inaka.suumo.jp.suu.raftel"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.k5.suumo.jp."]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.k11.bessou.suumo.jp.suu.raftel"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.k4.ch-kskensaku.suumo.jp"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.k8.ch-hrkensaku.suumo.jp"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.k8.ch-kskensaku.suumo.jp"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.k3.nikkei-suumo.jp"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.k2.gakusei.suumo.jp"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.forrentstyle.suumo.jp.suu.raftel"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.k0.suumo.jp"]);
	_WkWkParams.push(["DEVELOPER_DOMAIN", "wwwtst.k0.suumo.jp.suu.raftel"]);

	var tempDevDomain = location.hostname;
	if(tempDevDomain.substring(0,6) == "wwwtst" 
		|| tempDevDomain.match(/\.r\./) 
		|| tempDevDomain.substring(0,2) == "r." 
		|| tempDevDomain.substring(0,6) == "wwwkc."
		){
		_WkWkParams.push(["DEVELOPER_DOMAIN", tempDevDomain]);
	}

	(function() {
		var _WkWkAllDenyPathList = [];
		_WkWkAllDenyPathList.push("/*");

		var _WkWkSuumoJpDenyPathList = [];
		_WkWkSuumoJpDenyPathList.push("/");
		_WkWkSuumoJpDenyPathList.push("/jj/*");
		_WkWkSuumoJpDenyPathList.push("/chintai/*");
		_WkWkSuumoJpDenyPathList.push("/mansion/*");
		_WkWkSuumoJpDenyPathList.push("/ms/*");
		_WkWkSuumoJpDenyPathList.push("/ikkodate/*");
		_WkWkSuumoJpDenyPathList.push("/chukoikkodate/*");
		_WkWkSuumoJpDenyPathList.push("/chukomansion/*");
		_WkWkSuumoJpDenyPathList.push("/tochi/*");
		_WkWkSuumoJpDenyPathList.push("/free/*");
		_WkWkSuumoJpDenyPathList.push("/kanto/*");
		_WkWkSuumoJpDenyPathList.push("/kansai/*");
		_WkWkSuumoJpDenyPathList.push("/reform/*");
		_WkWkSuumoJpDenyPathList.push("/remodel/*");
		_WkWkSuumoJpDenyPathList.push("/tokai/*");
		_WkWkSuumoJpDenyPathList.push("/fudosan/*");
		_WkWkSuumoJpDenyPathList.push("/kyushu/*");
		_WkWkSuumoJpDenyPathList.push("/baikyaku/*");
		_WkWkSuumoJpDenyPathList.push("/tohoku/*");
		_WkWkSuumoJpDenyPathList.push("/chugoku/*");
		_WkWkSuumoJpDenyPathList.push("/hokkaido/*");
		_WkWkSuumoJpDenyPathList.push("/koshinetsu/*");
		_WkWkSuumoJpDenyPathList.push("/sitemap/*");
		_WkWkSuumoJpDenyPathList.push("/fudousankaisha/*");
		_WkWkSuumoJpDenyPathList.push("/shikoku/*");
		_WkWkSuumoJpDenyPathList.push("/kasu/*");
		_WkWkSuumoJpDenyPathList.push("/mb/*");
		_WkWkSuumoJpDenyPathList.push("/kaisha/*");
		_WkWkSuumoJpDenyPathList.push("/baibai/*");

		var _WkWkDenyList = [];
		_WkWkDenyList["suumo.jp"] = _WkWkSuumoJpDenyPathList;
		_WkWkDenyList["smp.suumo.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["jj.jp.msn.com"] = _WkWkAllDenyPathList;
		_WkWkDenyList["bessou.suumo.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["bridal.suumo.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["gakusei.suumo.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["chintai.suumo.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["inaka.suumo.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["nikkei-suumo.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["iesagashi.suumo.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["fudosan.suumo.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["ikkodate.suumo.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["mansion.suumo.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["pet.suumo.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["don.suumo.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["search-times.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["land.suumo.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["ch-kskensaku.suumo.jp"] = _WkWkSuumoJpDenyPathList;
		_WkWkDenyList["www.tokyo.forrent.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["www.d-planx.com"] = _WkWkAllDenyPathList;
		_WkWkDenyList["www.ninki-mansion.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["ekipita.suumo.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["tochi.suumo.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["chukomansion.suumo.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["www.itoko-dori.com"] = _WkWkAllDenyPathList;
		_WkWkDenyList["jutaku.suumo.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["www.homepro.co.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["gakunavi.suumo.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["itoko-dori.com"] = _WkWkAllDenyPathList;
		_WkWkDenyList["chumon.suumo.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["forrentstyle.suumo.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["www.pet.forrent.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["suumo.the-earth.tv"] = _WkWkAllDenyPathList;
		_WkWkDenyList["mansion-master.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["shinchikuikkodate.suumo.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["bunjomansion.suumo.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["chukoikkodate.suumo.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["www.kanagawa.forrent.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["komuten.suumo.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["webcache.googleusercontent.com"] = _WkWkAllDenyPathList;
		_WkWkDenyList["ch-hrkensaku.suumo.jp"] = _WkWkSuumoJpDenyPathList;
		_WkWkDenyList["www.osaka.forrent.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["chumonjyutaku.suumo.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["shinchikumansion.suumo.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["www.chiba.forrent.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["library.suumo.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["www.saitama.forrent.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["housemaker.suumo.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["test_chintai.suumo.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["eco.suumo.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["www.gesyukusagashi.com"] = _WkWkAllDenyPathList;
		_WkWkDenyList["img01.suumo.com"] = _WkWkAllDenyPathList;
		_WkWkDenyList["translate.googleusercontent.com"] = _WkWkAllDenyPathList;
		_WkWkDenyList["www.aichi.forrent.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["www.oneroomnavi.com"] = _WkWkAllDenyPathList;
		_WkWkDenyList["www.heyasagashi.forrent.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["www.gakuseimansionnavi.com"] = _WkWkAllDenyPathList;
		_WkWkDenyList["reform.suumo.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["www.daigakuchintai.com"] = _WkWkAllDenyPathList;
		_WkWkDenyList["test_fudosan.suumo.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["www.shizuoka.forrent.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["img.suumo.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["www.hyogo.forrent.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["www.heyasagashiweb.com"] = _WkWkAllDenyPathList;
		_WkWkDenyList["www.yamanashi.forrent.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["www.wakayama.forrent.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["www.shikikin0.com"] = _WkWkAllDenyPathList;
		_WkWkDenyList["www.shiga.forrent.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["www.mie.forrent.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["www.nara.forrent.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["baikyaku.suumo.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["kyoto.jj-navi.com"] = _WkWkAllDenyPathList;
		_WkWkDenyList["suumo.jp.suu.raftel"] = _WkWkSuumoJpDenyPathList;
		_WkWkDenyList["osaka.jj-navi.com"] = _WkWkAllDenyPathList;
		_WkWkDenyList["www.gakuseikaikannavi.com"] = _WkWkAllDenyPathList;
		_WkWkDenyList["www.gifu.forrent.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["wwwtst.k5.suumo.jp"] = _WkWkSuumoJpDenyPathList;
		_WkWkDenyList["www.kyoto.forrent.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["wwwtst.suumo.jp"] = _WkWkSuumoJpDenyPathList;
		_WkWkDenyList["wwwtst.suumo.jp.suu.raftel"] = _WkWkSuumoJpDenyPathList;
		_WkWkDenyList["campus.suumo.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["shiga.jj-navi.com"] = _WkWkAllDenyPathList;
		_WkWkDenyList["index.suumo.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["chiba.jj-navi.com"] = _WkWkAllDenyPathList;
		_WkWkDenyList["nara.jj-navi.com"] = _WkWkAllDenyPathList;
		_WkWkDenyList["mansion-search.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["tokyo.jj-navi.com"] = _WkWkAllDenyPathList;
		_WkWkDenyList["www.shinseikatsu.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["hyogo.jj-navi.com"] = _WkWkAllDenyPathList;
		_WkWkDenyList["saitama.jj-navi.com"] = _WkWkAllDenyPathList;
		_WkWkDenyList["mb.k2.tst.land.suumo.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["spms.suumo.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["wwwtst.k5.suumo.jp.suu.raftel"] = _WkWkSuumoJpDenyPathList;
		_WkWkDenyList["www.mansion-master.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["kanagawa.jj-navi.com"] = _WkWkAllDenyPathList;
		_WkWkDenyList["bessou.suumo.jp.suu.raftel"] = _WkWkAllDenyPathList;
		_WkWkDenyList["eco.sms.rlt.raftel"] = _WkWkAllDenyPathList;
		_WkWkDenyList["web08suu.b.suu.raftel"] = _WkWkAllDenyPathList;
		_WkWkDenyList["mie.jj-navi.com"] = _WkWkAllDenyPathList;
		_WkWkDenyList["k2.tst.land.suumo.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["forrentstyle.suumo.jp.suu.raftel"] = _WkWkAllDenyPathList;
		_WkWkDenyList["gakunavi.suumo.jp.suu.raftel"] = _WkWkAllDenyPathList;
		_WkWkDenyList["aichi.jj-navi.com"] = _WkWkAllDenyPathList;
		_WkWkDenyList["suumo.jp."] = _WkWkAllDenyPathList;
		_WkWkDenyList["test-iesagashi.scope-navi.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["wwwtst.suumo.jp"] = _WkWkSuumoJpDenyPathList;
		_WkWkDenyList["wwwtst.suumo.jp.suu.raftel"] = _WkWkSuumoJpDenyPathList;
		_WkWkDenyList["www.officemovement.com"] = _WkWkAllDenyPathList;
		_WkWkDenyList["wwwtst.k3.suumo.jp"] = _WkWkSuumoJpDenyPathList;
		_WkWkDenyList["wwwtst.k5.suumo.jp"] = _WkWkSuumoJpDenyPathList;
		_WkWkDenyList["wwwtst.k3.suumo.jp.suu.raftel"] = _WkWkSuumoJpDenyPathList;
		_WkWkDenyList["www.forrent.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["wwwtst.k5.suumo.jp.suu.raftel"] = _WkWkSuumoJpDenyPathList;
		_WkWkDenyList["wwwtst.k10.suumo.jp.suu.raftel"] = _WkWkSuumoJpDenyPathList;
		_WkWkDenyList["wwwadm.suumo.jp.suu.raftel"] = _WkWkSuumoJpDenyPathList;
		_WkWkDenyList["wwwtst.gakusei.suumo.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["wwwtst.k12.suumo.jp.suu.raftel"] = _WkWkSuumoJpDenyPathList;
		_WkWkDenyList["wwwtst.msn.suumo.com.suu.raftel"] = _WkWkAllDenyPathList;
		_WkWkDenyList["wwwtst.k12.suumo.jp"] = _WkWkSuumoJpDenyPathList;
		_WkWkDenyList["wwwtst.msn.suumo.com"] = _WkWkAllDenyPathList;
		_WkWkDenyList["wwwtst.k2.suumo.jp"] = _WkWkSuumoJpDenyPathList;
		_WkWkDenyList["wwwtst.k2.suumo.jp.suu.raftel"] = _WkWkSuumoJpDenyPathList;
		_WkWkDenyList["wwwtst.k10.suumo.jp"] = _WkWkSuumoJpDenyPathList;
		_WkWkDenyList["wwwtst.gakusei.suumo.jp.suu.raftel"] = _WkWkAllDenyPathList;
		_WkWkDenyList["wwwtst.k4.suumo.jp"] = _WkWkSuumoJpDenyPathList;
		_WkWkDenyList["wwwtst.bessou.suumo.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["wwwtst.nikkei-suumo.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["wwwtst.k3.msn.suumo.com"] = _WkWkAllDenyPathList;
		_WkWkDenyList["wwwtst.k10.bessou.suumo.jp.suu.raftel"] = _WkWkAllDenyPathList;
		_WkWkDenyList["wwwtst.k3.gakusei.suumo.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["wwwtst.inaka.suumo.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["wwwtst.bridal.suumo.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["wwwkr.suumo.jp.suu.raftel"] = _WkWkSuumoJpDenyPathList;
		_WkWkDenyList["wwwtst.k11.suumo.jp"] = _WkWkSuumoJpDenyPathList;
		_WkWkDenyList["wwwtst.k4.suumo.jp.suu.raftel"] = _WkWkSuumoJpDenyPathList;
		_WkWkDenyList["wwwtst.k3.bridal.suumo.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["wwwtst.k12.bessou.suumo.jp.suu.raftel"] = _WkWkAllDenyPathList;
		_WkWkDenyList["wwwtst.k9.suumo.jp"] = _WkWkSuumoJpDenyPathList;
		_WkWkDenyList["wwwtst.k9.suumo.jp.suu.raftel"] = _WkWkSuumoJpDenyPathList;
		_WkWkDenyList["wwwtst.k3.msn.suumo.com.suu.raftel"] = _WkWkAllDenyPathList;
		_WkWkDenyList["sakura.suumo.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["wwwtst.nikkei-suumo.jp.suu.raftel"] = _WkWkAllDenyPathList;
		_WkWkDenyList["wwwtst.officemovement.com.suu.raftel"] = _WkWkAllDenyPathList;
		_WkWkDenyList["wwwtst.bessou.suumo.jp.suu.raftel"] = _WkWkAllDenyPathList;
		_WkWkDenyList["wwwtst.bridal.suumo.jp.suu.raftel"] = _WkWkAllDenyPathList;
		_WkWkDenyList["wwwadm.bessou.suumo.jp.suu.raftel"] = _WkWkAllDenyPathList;
		_WkWkDenyList["wwwpt.suumo.jp.suu.raftel"] = _WkWkSuumoJpDenyPathList;
		_WkWkDenyList["wwwtst.gakunavi.suumo.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["wwwtst.inaka.suumo.jp.suu.raftel"] = _WkWkAllDenyPathList;
		_WkWkDenyList["wwwtst.k3.forrentstyle.suumo.jp.suu.raftel"] = _WkWkAllDenyPathList;
		_WkWkDenyList["wwwtst.officemovement.com"] = _WkWkAllDenyPathList;
		_WkWkDenyList["wwwtst.k10.msn.suumo.com.suu.raftel"] = _WkWkAllDenyPathList;
		_WkWkDenyList["suumo-web.stream.ne.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["wwwtst.k11.suumo.jp.suu.raftel"] = _WkWkSuumoJpDenyPathList;
		_WkWkDenyList["wwwtst.k3.gakusei.suumo.jp.suu.raftel"] = _WkWkAllDenyPathList;
		_WkWkDenyList["www.officemovement.com.suu.raftel"] = _WkWkAllDenyPathList;
		_WkWkDenyList["wwwadm.inaka.suumo.jp.suu.raftel"] = _WkWkAllDenyPathList;
		_WkWkDenyList["wwwtst.k2.bessou.suumo.jp"] = _WkWkSuumoJpDenyPathList;
		_WkWkDenyList["wwwtst.k12.msn.suumo.com.suu.raftel"] = _WkWkAllDenyPathList;
		_WkWkDenyList["wwwtst.k12.nikkei-suumo.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["wwwtst.k10.inaka.suumo.jp.suu.raftel"] = _WkWkAllDenyPathList;
		_WkWkDenyList["wwwtst.k8.suumo.jp"] = _WkWkSuumoJpDenyPathList;
		_WkWkDenyList["wwwtst.ch-kskensaku.suumo.jp"] = _WkWkSuumoJpDenyPathList;
		_WkWkDenyList["wwwtst.k4.msn.suumo.com"] = _WkWkAllDenyPathList;
		_WkWkDenyList["wwwtst.k10.nikkei-suumo.jp.suu.raftel"] = _WkWkAllDenyPathList;
		_WkWkDenyList["wwwtst.campus.suumo.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["wwwtst.k2.msn.suumo.com"] = _WkWkAllDenyPathList;
		_WkWkDenyList["manager.suumo.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["wwwtst.k10.img10.suumo.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["wwwtst.img10.suumo.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["wwwadm.img10.suumo.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["wwwtst.k11.msn.suumo.com"] = _WkWkAllDenyPathList;
		_WkWkDenyList["wwwtst.k12.inaka.suumo.jp.suu.raftel"] = _WkWkAllDenyPathList;
		_WkWkDenyList["wwwtst.k5.suumo.jp."] = _WkWkSuumoJpDenyPathList;
		_WkWkDenyList["wwwtst.k11.bessou.suumo.jp.suu.raftel"] = _WkWkAllDenyPathList;
		_WkWkDenyList["wwwtst.k4.ch-kskensaku.suumo.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["wwwtst.k8.ch-hrkensaku.suumo.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["wwwtst.k8.ch-kskensaku.suumo.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["wwwtst.k3.nikkei-suumo.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["wwwtst.k2.gakusei.suumo.jp"] = _WkWkAllDenyPathList;
		_WkWkDenyList["wwwtst.forrentstyle.suumo.jp.suu.raftel"] = _WkWkAllDenyPathList;
    
		var tempDevDomainPath = tempDevDomain.substring(0,20);
		if(tempDevDomainPath.indexOf("wwwtst.r.suumo.jp") !== -1
		 || tempDevDomainPath.indexOf("wwwtst.r.k3.suumo.jp") !== -1
		 || tempDevDomainPath.indexOf("wwwtst.r.k9.suumo.jp") !== -1
		 ){
		  _WkWkDenyList[tempDevDomain] = _WkWkSuumoJpDenyPathList;
		}
    
		var checkWkWkDenyList = function() {
			var currentDomain = window.document.domain;
			var currentPath = window.location.pathname;
			var domainAndUrlInParams = getDomainAndUrlInParams();
			if (domainAndUrlInParams != null) {
				currentDomain = domainAndUrlInParams["domain"];
				currentPath = domainAndUrlInParams["path"];
			}
			var targetPathList = _WkWkDenyList[currentDomain];
			if (targetPathList != null && cheackDenyPath(currentPath, targetPathList)) {
				return true;
			}
			targetPathList = _WkWkDenyList["*"];
			if (targetPathList != null && cheackDenyPath(currentPath, targetPathList)) {
				return true;
			}
			return false;
		},
		getDomainAndUrlInParams = function() {
			var url = null;
			for (i = 0; i< _WkWkParams.length; i++) {
				var name = _WkWkParams[i][0];
				if (name == "URL") {
					url = _WkWkParams[i][1];
				}
			}
			if (url == null) {
				return null;
			}
			var idx1 = url.indexOf("//");
			var ret = [];
			if (idx1 < 0) {
				ret = null;
			} else {
				idx1 += 2;
				var idx2 = url.indexOf("/", idx1);
				if (idx2 < 0) {
					ret["domain"] = url.substring(idx1);
					ret["path"] = "/";
				} else {
					ret["domain"] = url.substring(idx1, idx2);
					ret["path"] = url.substring(idx2);
				}
			}
			return ret;
		},
		cheackDenyPath = function(currentPath, denyPathList) {
			for (var i = 0; i < denyPathList.length; i++) {
				var denyPath = denyPathList[i];
				if (denyPath.indexOf("/") != 0) {
					denyPath = "/" + denyPath;
				}
				var lIdx = denyPath.lastIndexOf("/*");
				var tIdx = denyPath.length - 2;
				if (lIdx >= 0 && lIdx == tIdx) {
					denyPath = denyPath.substring(0, lIdx + 1);
					if (currentPath.indexOf(denyPath) == 0) {
						return true;
					}
				} else {
					if (currentPath === denyPath) {
						return true;
					}
				}
			}
			return false;
		},
		defineOutputBeaconScript = function() {
			if (document.addEventListener) {
				document.addEventListener('DOMContentLoaded', outputBeaconScript, false);
			} else if (window.ActiveXObject && (document.readyState === 'complete' || document.readyState === 'loaded')) {
				document.attachEvent('onreadystatechange', outputBeaconScript);
			} else {
				document.onload = outputBeaconScript();
			}
		},
		outputBeaconScript = function() {
			var scriptTag = document.createElement('script');
			scriptTag.type = 'text/javascript';
			scriptTag.src = ('https:' == document.location.protocol ? "https://" : "http://") + "log.suumo.jp/js/logsuumo-10.js";
			if (document.addEventListener) {
				scriptTag.setAttribute('defer', 'defer');
			} else if (window.ActiveXObject) {
				scriptTag.setAttribute('defer', true);
			} else {
				scriptTag.setAttribute('defer', 'defer');
			}
			var beaconDiv = document.getElementById('WkWkBeaconDiv');
			if (beaconDiv == null) {
				var beaconDiv = document.createElement('div');
				beaconDiv.id = 'WkWkBeaconDiv';
				var firstScript = document.getElementsByTagName('script')[0];
				firstScript.parentNode.insertBefore(beaconDiv, firstScript);
			}
			if (beaconDiv.childNodes.length == 0) {
				beaconDiv.appendChild(scriptTag);
			} else {
				var first = beaconDiv.childNodes[0];
				beaconDiv.insertBefore(scriptTag, first);
			}
		};
		if (!checkWkWkDenyList()) {
			defineOutputBeaconScript();
		}
	}());
	/*
	==========================================
	20120104 Beacon End
	==========================================
	*/

	/*
	==========================================
	20131127 YTM(onload後)
	==========================================
	*/
	(window.addEventListener ? window.addEventListener : window.attachEvent)(window.addEventListener ? 'load' : 'onload', function () {
		(function () {
			var tagjs = document.createElement('script');
			var s = document.getElementsByTagName('script')[0];
			tagjs.async = true;
			tagjs.src = '//s.yjtag.jp/tag.js#site=BqPURG6';
			s.parentNode.insertBefore(tagjs, s);
		}());
	}, false);
}

//============ Reseach Tag start ==================================
var rshAllowDomainList___ = [];

rshAllowDomainList___.push(".*\.?suumo\.jp");

var isRshAllowDomain___ = false;
for (var i = 0; i < rshAllowDomainList___.length; i++) {
	if(new RegExp(rshAllowDomainList___[i]).test(location.hostname)){
		isRshAllowDomain___ = true;
		break;
	}
}
if(isRshAllowDomain___){
	if(typeof(s) != 'undefined' && typeof(s.prop14) != 'undefined' && (s.prop14=="040"||s.prop14=="041"||s.prop14=="301"))
	{
		if(typeof(s.prop13) != 'undefined' && s.prop13=="D")
		{
			google_conversion_id = 968045125;
			google_conversion_label = "vRVxCOW_zFcQxeTMzQM";
			google_custom_params = window.google_tag_params;
			google_remarketing_only = true;
			document.write("<SCR"+"IPT SRC='//www.googleadservices.com/pagead/conversion.js' type='text/javascript'><\/SCR"+"IPT>");
		}
		if(typeof(s.pageName) != 'undefined' && s.pageName.lastIndexOf('f301G03', 0) === 0)
		{
			google_conversion_id = 968045125;
			google_conversion_label = "94kICMrJy1cQxeTMzQM";
			google_custom_params = window.google_tag_params;
			google_remarketing_only = true;
			document.write("<SCR"+"IPT SRC='//www.googleadservices.com/pagead/conversion.js' type='text/javascript'><\/SCR"+"IPT>");
		}
	}
}
//============  Reseach Tag  end ==================================

//-->
