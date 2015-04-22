var SASHIKOMI_VIEW2 = SASHIKOMI_VIEW2 || function() {
	this._returnData = {
		impression: false,
		logData: {}
	};
	this._state = {
		visible: false,
		first: true
	};
	this._sashikomiOption = {
		id: 'PCBannerArea',
		method: 'append',
		target: null
	};
};

SASHIKOMI_VIEW2.prototype = {
	returnData: function() {
		return this._returnData;
	},
	state: function() {
		return this._state;
	},
	setLogData: function(logData) {
		if (logData !== null) {
			var i;
			for (i in logData) {
				if (logData.hasOwnProperty(i)) {
					this._returnData.logData[i] = logData[i];
				}
			}
		}
	},
	sashikomiOption: function() {
		return this._sashikomiOption;
	},
	init: function(option) {
		this._sashikomiOption.id = (option.sashikomi && option.sashikomi.id) ? '#' + option.sashikomi.id: this._sashikomiOption.id;
		this._sashikomiOption.method = (option.sashikomi && option.sashikomi.method) ? option.sashikomi.method: this._sashikomiOption.method;

		// addjs
		var i;
		var contents = option.contents;
		if (option.addjs && option.addjs.length > 0) {
			for (i = 0; i < option.addjs.length; i++) {
				contents = contents + '<script type="text/javascript" srd="' + PIRO2.replaceHttps(option.addjs[i]) + '"></script>';
			}
		}
		var sashikomitarget = jQuery(this._sashikomiOption.id);
		if (!sashikomitarget.length) {
			sashikomitarget = null;
			this._sashikomiOption.target = null;
		} else {
			this._sashikomiOption.target = sashikomitarget;
			var sashikomiContents = jQuery(contents);
			if (option.sashikomi && option.sashikomi.noimage) {
				sashikomiContents.find('img').error(function() {
					jQuery(this).attr({
						src: option.sashikomi.noimage
					});
				});
			}
			if (this._sashikomiOption.method.match(/^insert/) || this._sashikomiOption.method.match(/To$/)) {
				sashikomiContents[this._sashikomiOption.method](sashikomitarget[0]);
			} else {
				sashikomitarget[this._sashikomiOption.method](sashikomiContents);
			}
			if (PIRO2.isDebug()) {
				PIRO2.debugAlert('scroll debug');
				jQuery('body').append('<div id="PcBannerDebug" style="position: fixed; right: 0px; top: 0px"></div>');
				jQuery('#PcBannerDebug').append('<p id="PcBannerDebugDocumentY">document: 0</p>');
				jQuery('#PcBannerDebug').append('<p id="PcBannerDebugWindowY">window: 0</p>');
				jQuery('#PcBannerDebug').append('<p id="PcBannerDebugScrollY">scroll: 0 (0%)</p>');
				jQuery('#PcBannerDebug').append('<p id="PcBannerDebugSashikomiY">sashikomi: 0</p>');
			}
		}
	},
	startView: function(option) {
		this.init(option);
		var run_once = option.run_once;
		var a = this;
		setInterval(function() {
			a._state.visible = a.isVisible();
			if (a._state.visible && a._state.first && typeof run_once === 'function') {
				a._state.first = false;
				a._returnData.impression = true;
				run_once(null, a.returnData());
			}
		},
		300);
	},

	toggle: function() {
		if (this._sashikomiOption.target) {
			this._sashikomiOption.target.slideToggle();
		}
	},

	isVisible: function() {
		var document_y = document.documentElement.scrollHeight || document.body.scrollHeight;
		var scroll_y = document.documentElement.scrollTop || document.body.scrollTop;
		var window_y = 0;
		var isSafari = (navigator.appVersion.toLowerCase().indexOf('safari') + 1 ? 1: 0);
		var isOpera = (navigator.userAgent.toLowerCase().indexOf('opera') + 1 ? 1: 0);
		if (isOpera) {
			isIE = false;
		}
		if (!isSafari && ! isOpera) {
			window_y = document.documentElement.clientHeight || document.body.clientHeight || document.body.scrollHeight;
		} else {
			window_y = window.innerHeight;
		}

		if (this._sashikomiOption.target) {
			var sashikomi_offset = this._sashikomiOption.target.offset();
			var sashikomi_height = this._sashikomiOption.target.height();
			var sashikomi_y = sashikomi_offset.top;
			var visible = (sashikomi_y < scroll_y + window_y && sashikomi_y > scroll_y - sashikomi_height);
			if (PIRO2.isDebug()) {
				jQuery('#PcBannerDebugDocumentY').html('document: ' + document_y);
				jQuery('#PcBannerDebugWindowY').html('window: ' + window_y);
				jQuery('#PcBannerDebugScrollY').html('scroll: ' + scroll_y + ' (' + parseInt(scroll_y * 10000 / (document_y - window_y), 10) / 100 + '%)');
				jQuery('#PcBannerDebugSashikomiY').html('sashikomi: ' + sashikomi_y + '-' + (sashikomi_y + sashikomi_height) + ' ' + visible);
			}

			var ret = visible;
			return ret;
		} else {
			return false;
		}
	}
};

