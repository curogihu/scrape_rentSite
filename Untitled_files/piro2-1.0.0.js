/*
 * ###################################
 *   ぴろぴろローダー
 * ###################################
 *
 * @module piro2
 * 
*/
var PIRO2 = {};

/*
 * 現在のページのプロトコルが HTTPS だったら合せて URL のプロトコル部分を HTTPS に変更する
 *
 * @param {String} url
 * @return {String} 変更済みurl
 */
PIRO2.replaceHttps = function(url) {
	if ("https:" === document.location.protocol) {
		if (!url.match(/^https:/)) {
			return url.replace(/^[^:]+:/, "https:");
		}
	}
	return url;
};

/*
 * IE のバージョンを取得する
 *
 * @return {Number} IEのバージョン
 */
PIRO2.ieVersion = function() {
	var userAgent = window.navigator.userAgent.toLowerCase();
	var appVersion = window.navigator.appVersion.toLowerCase();
	if (userAgent.indexOf("msie") > - 1) {
		if (appVersion.indexOf("msie 6.0") > - 1) {
			return 6;
		}
		else if (appVersion.indexOf("msie 7.0") > - 1) {
			return 7;
		}
		else if (appVersion.indexOf("msie 8.0") > - 1) {
			return 8;
		}
		else if (appVersion.indexOf("msie 9.0") > - 1) {
			return 9;
		}
	}
	return - 1;
};

/*
 * Cloud Front Url
 */
PIRO2.getCloudFrontUrl = function() {
	return (location.hostname.lastIndexOf('haishin-contents-kaihatsu', 0) == - 1 && location.hostname.lastIndexOf('d1osq2v61iipdx.cloudfront.net', 0) == - 1 && location.hostname.lastIndexOf('wwwtst.', 0) == - 1 && location.hostname.lastIndexOf('localhost', 0) == - 1) ? 'http://dk71i8jd00e30.cloudfront.net': (location.hostname.lastIndexOf('localhost', 0) == - 1) ? 'http://d1osq2v61iipdx.cloudfront.net': 'http://localhost';
};

/*
 * デバッグ判定
 */
PIRO2.isDebug = function() {
	var req_params = location.search;
	if (req_params && req_params.match(/[?&]recommenddebug=true(&.*)?$/i)) {
		return true;
	} else {
		return false;
	}
};

/*
 * デバッグ用Alert関数
 * recommenddebugが有効の場合、Alertメッセージを出力する
 */
PIRO2.debugAlert = function(msg) {
	if (PIRO2.isDebug()) {
		alert(msg);
	}
};

/*
 * piro2 main ロジックJS読み込み
 *
 * ページロード完了時間への影響を最小限にするため window onload を待って非同期ロードする。
 */
(function() {
	if (PIRO2.ieVersion() === 6) {
		return;
	}
	var loadPiro2Async = function() {
		setTimeout(function(){
			var js_url = PIRO2.getCloudFrontUrl() + '/piro2/lib/common/piro2-main-1.0.0.js';
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = PIRO2.replaceHttps(js_url);
			script.charset='utf-8';
			var head = document.getElementsByTagName("head")[0] || document.documentElement;
			head.appendChild(script);
		},0);
	};
	window.onload = (function() {
		var orgOnload = window.onload;
		if( typeof orgOnload != 'function' ){
			return loadPiro2Async;
		} else {
			return function() {
				orgOnload();
				loadPiro2Async();
			};
		}
	})();
})();
