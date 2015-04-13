/*
 * 賃貸レコメンド用ロジックJS
 */
PIRO2.chintaiRecommend = function(view, sashikomi_view, callback) {
	/* オブジェクトから指定した名前階層の値を取得する */
	function getReplace(key, result) {
		var ret = result;

		var klist = key.split('.');
		var i;
		for (i = 1; i < klist.length; i++) {
			ret = ret[klist[i]];
			if (!ret) {
				break;
			}
		}
		return ret;
	}
	/* 差込コンテンツを適宜置換して差込 */
	function setContents(data, option, result, beacon) {
		var contentsdata = data;
		var replacetargets = data.match(/@@@result\.[^@]*@@@/g);
		replacetargets.sort();
		var i=0;
		for (i; i < replacetargets.length; i++) {
			var tgt = replacetargets[i].match(/@@@(.+)@@@/);
			if (tgt.length < 2) {
				continue;
			}
			var val = getReplace(tgt[1], result);
			contentsdata = contentsdata.replace(replacetargets[i], val);
		}
		// pageId
		contentsdata = contentsdata.replace(/@@@view\.pageId@@@/g, view.pageId);
		//CDN_DOMAIN
		contentsdata = contentsdata.replace(/@@@CDN_DOMAIN@@@/g, view.contents.cdn_domain);
		option.contents = contentsdata;
		/* ビーコンに相関コードを追加する */
		var pre_bkn_cd = result.pre_bkn[0].bukken_cd;
		var rec_bkn_cd = "";
		var rec_pict_id = "";
		for (i = 0; i < result.rec_bkn_cnt; i++){
			if (i === 0){
				rec_bkn_cd = result.rec_bkn[i].bukken_cd;
				rec_pict_id = result.rec_bkn[i].pict_id;
			}else{
				rec_bkn_cd += "," + result.rec_bkn[i].bukken_cd;
				rec_pict_id += "," + result.rec_bkn[i].pict_id;
			}
		}
		var beacon = {
			 pageId: view.pageId
			,pre_bkn_cd: pre_bkn_cd
			,rec_bkn_cd: rec_bkn_cd
			,rec_pict_id: rec_pict_id
		};
		/* 差込 */
		sashikomi_view.startView(option);
		/* ログデータ */
		sashikomi_view.setLogData(beacon);
		/* 差込位置に固定で表出する場合はimpression: false, 即時表出させる場合はimpression: trueを返す */
		callback(null, {
			impression: false
		});
	}
	/*
	 * メイン処理
	 */
	if (! (view && view.contents && view.contents.selector)) {
		callback(null, {
			impression: false
		});
	} else {
		/* ステージング判定 */
		var staging = PIRO2.isStaging();
		/* 表示コンテンツ取得 */
		PIRO2.callServerFilter(view.contents.selector, function(err, result, filter_args) {
			if (err) {
				callback(err, {
					impression: false
				});
			} else {
				// ルール永続化
				if (view.abtest && view.abtest.scope && view.abtest.cookiename) {
						var expiredate = null;
						if (view.abtest.scope.match(/^forever$/i)) {
							expiredate = new Date();
							expiredate.setFullYear(expiredate.getFullYear() + 10);
						}
						PIRO2.setCookieValue(view.abtest.cookiename, result.abtest_ptn, null, '/', expiredate, null);
				}
				/* ↓↓↓表出判定ログ送信↓↓↓ */
				if (result !== undefined) {
					/* ログデータ設定 (共通) */
					var logData = {};
					logData.templateId = 'PC_BANNER';
					logData.pageId = view.pageId
					logData.URL = PIRO2.getFilterArgs('location.href');
					logData.referrer = PIRO2.getFilterArgs('document.referrer');
					logData.__wk_a = '';
					logData.__wk_b = '';
					logData.vc = 1;
					logData.wkat = 'TPV';
					/* ログパラメーター設定(共通) */
					var logParams = {};
					logParams.id = "chintairecommend-rule-0001";
					logParams.uu_id = PIRO2.getGalileoCookie();
					logParams.piro_type = "chintai_ichiran";
					logParams.staging = PIRO2.isStaging();
					/* ログパラメーター設定(個別) */
					logParams.abtest_ptn = result.abtest_ptn;
					logParams.pre_bkn_flg = "0";
					logParams.rec_bkn_flg = "0";
					if (result.pre_bkn_cnt > 0) {
						logParams.pre_bkn_flg = "1";
					}
					if (result.rec_bkn_cnt > 0) {
						logParams.rec_bkn_flg = "1";
					}
					/* ビーコン送信 */
					var log_api_url = PIRO2.getFilterUrl();
					log_api_url = PIRO2.replaceHttps(log_api_url);
					log_api_url = log_api_url + '/log/impression';
					PIRO2.impressionLog(log_api_url, logData, logParams, function(imperr, impres) {});
					PIRO2.impressionBeacon(logData, logParams, function(imperr, impres) {});
				}
				/* ↑↑↑表出判定ログ送信↑↑↑ */
				if (result !== undefined && result.abtest_ptn === "b" && result.pre_bkn_cnt > 0 && result.rec_bkn_cnt > 0) {
					var viewoption = {
						run_once: callback
					};
					viewoption.sashikomi = view.contents.sashikomi;
					/* テンプレート取得 */
					var path = view.contents.path + '.' + result.rec_bkn_cnt;
					var contents_url = PIRO2.replaceHttps(PIRO2.getFilterUrl()) + '/api/contents/' + view.contents.bucket + (PIRO2.isStaging() ? '/stage': '') + path + '/object';
					jQuery.ajax({
						url: contents_url,
						dataType: 'jsonp',
						async: true,
						cache: false,
						timeout: 120000,
						error: function() {
							callback(null, {
								impression: false
							});
						},
						success: function(data) {
							setContents(data.content, viewoption, result);
						}
					});
				} else {
					/* 表示しない */
					callback(null, {
						impression: false
					});
				}
			}
		});
	}
};

