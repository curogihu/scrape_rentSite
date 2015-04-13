(function () {
	function track_host() {
		var track_host="http://d-track.send.microad.jp";
		if(document.location.protocol=="https:"){
			track_host="https://d-track.send.microad.jp";
		}
		return track_host;
	}

	function pc_track(co_account_id, group_id, country_id, version, custom) {
		var encode_url=escape(document.referrer);
		var blade_query="co_account_id="+co_account_id+"&group="+group_id+"&country_id="+country_id+"&ver="+version+"&referrer="+encode_url;
		if (custom) {
			blade_query = blade_query + "&custom=" + custom;
		}
		
		var blade_url=track_host()+"/bl_track.cgi?"+blade_query;
		var blade_target=new Image();
		blade_target.src=blade_url;
	}

	function sp_track(co_account_id, group_id, country_id, version, custom) {

		var init = function () {
			var microadDevice = new MicroadBladeDevice(navigator.userAgent);
			if (microadDevice) {
				new BladeSponsorAccess(co_account_id, group_id, microadDevice, track_host(), country_id, version, custom);
			}
		};

		var jsList=[];
		var loader = function () {
			var o = jsList.length;
			for (var i = 0; i < jsList.length; i++) {
				var s = document.createElement('script');
				s.type = 'text/javascript';
				s.charset = 'utf-8';
				s.src = jsList[i];
				s.onload = function () {
					o--;
					if(o == 0) init();
				};
				document.body.appendChild(s);
			}
		};
		var jsURI="http://d-cache.microad.jp";
		if(document.location.protocol=="https:"){
			jsURI="https://d-track.send.microad.jp";
		}
		jsList.push(jsURI+"/js/device.js");
		jsList.push(jsURI+"/js/sponsor.js");
		jsList.push(jsURI+"/js/prefs.js");
		if (document.readyState === 'loading') {
			document.addEventListener('DOMContentLoaded', loader, true);
		} else {
			loader();
		}
	}
	
	function bl_track(co_account_id, group_id, country_id, version, custom) {
		if(/(iPhone|iPod|iPad|Android)/.test(navigator.userAgent)){
			sp_track(co_account_id, group_id, country_id, version, custom);
		} else {
			pc_track(co_account_id, group_id, country_id, version, custom);
		}
	}	

	function get_target_param() {
		var target_params = microad_blade_jp.params;
		
		for (var i = 0; i < target_params.length; i++) {
			var co_account_id = target_params[i].co_account_id;
			var group_id = target_params[i].group_id;
			var country_id = target_params[i].country_id;
			var version = target_params[i].ver;
			var custom = "";
			if (target_params[i].custom) {
				custom = escape(microad_blade_jp.JSON.stringify(target_params[i].custom));
			}
			
			var key = co_account_id + '_' + group_id;
			if(key in microad_blade_jp.complete_map) {
				continue;
			}
			
			bl_track(co_account_id, group_id, country_id, version, custom);
			
			microad_blade_jp.complete_map[key] = target_params[i];
			break;
		}
	}

	function init_json() {
		function f(n) {
			return n < 10 ? '0' + n : n;
		}

		var escapable,
			gap,
			indent,
			meta,
			rep;

		function quote(string) {
			escapable.lastIndex = 0;
			return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
				var c = meta[a];
				return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
			}) + '"' : '"' + string + '"';
		}

		function str(key, holder) {
			var i,          // The loop counter.
				k,          // The member key.
				v,          // The member value.
				length,
				mind = gap,
				partial,
				value = holder[key];

			if (value && typeof value === 'object') {
				if (typeof value.toJSON === 'function') {
					value = value.toJSON(key);
				} else if (Object.prototype.toString.apply(value) === "[object Date]") {
					value = isFinite(value.valueOf()) ? value.getUTCFullYear() + '-' +
					f(value.getUTCMonth() + 1) + '-' +
					f(value.getUTCDate())      + 'T' +
					f(value.getUTCHours())     + ':' +
					f(value.getUTCMinutes())   + ':' +
					f(value.getUTCSeconds())   + 'Z'
					: null;
				}
			}

			if (typeof rep === 'function') {
				value = rep.call(holder, key, value);
			}

			switch (typeof value) {
				case 'string':
					return quote(value);
				case 'number':
					return isFinite(value) ? String(value) : 'null';
				case 'boolean':
				case 'null':
					return String(value);
				case 'object':
					if (!value) {
						return 'null';
					}
					gap += indent;
					partial = [];
					if (Object.prototype.toString.apply(value) === '[object Array]') {
						length = value.length;
						for (i = 0; i < length; i += 1) {
							partial[i] = str(i, value) || 'null';
						}
						v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']';
						gap = mind;
						return v;
					}

					if (rep && typeof rep === 'object') {
						length = rep.length;
						for (i = 0; i < length; i += 1) {
							if (typeof rep[i] === 'string') {
								k = rep[i];
								v = str(k, value);
								if (v) {
									partial.push(quote(k) + (gap ? ': ' : ':') + v);
								}
							}
						}
					} else {
						for (k in value) {
							if (Object.prototype.hasOwnProperty.call(value, k)) {
								v = str(k, value);
								if (v) {
									partial.push(quote(k) + (gap ? ': ' : ':') + v);
								}
							}
						}
					}

					v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}';
					gap = mind;
					return v;
			}
		}

		if (typeof microad_blade_jp.JSON.stringify !== 'function') {
			escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
			meta = {    // table of character substitutions
				'\b': '\\b',
				'\t': '\\t',
				'\n': '\\n',
				'\f': '\\f',
				'\r': '\\r',
				'"' : '\\"',
				'\\': '\\\\'
			};

			microad_blade_jp.JSON.stringify = function (value, replacer, space) {
				var i;
				gap = '';
				indent = '';

				if (typeof space === 'number') {
					for (i = 0; i < space; i += 1) {
						indent += ' ';
					}
				} else if (typeof space === 'string') {
					indent = space;
				}

				rep = replacer;
				if (replacer && typeof replacer !== 'function' &&
					(typeof replacer !== 'object' ||
					 typeof replacer.length !== 'number')) {
					throw new Error('JSON.stringify');
				}

				return str('', {'': value});
			};
		}
	}
    
	function track_init() {
		if (!microad_blade_jp.JSON) {
			if (!this.JSON || typeof this.JSON !== 'object') {
				microad_blade_jp.JSON = {};
				init_json();
			} else {
				microad_blade_jp.JSON = this.JSON;
			}
		}
		get_target_param();
	}

	track_init();
})();
