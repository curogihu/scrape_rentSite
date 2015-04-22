////////////////////////////////////////////////////////////////////////////////module deqwas2
//// Version 2.0.6 with sitecatalyst
function DeqwasAgent() {
    this.initialize.apply(this, arguments);
}

var deqwasCid;

DeqwasAgent.prototype = {
    codeVersion: 'xxx',
    collectionType: { normal: 'i', cart: 'c', shipping: 's' },
    collectionElementId: 'deqwas-collection',
    screenType: { normal: 'r', cart: 'k', shipping: 'h' },
    screenElementId: 'deqwas-screen',
    visibleFunctionIds: { r: true, k: true, h: true },
    urlLimitation: 2083,

    initialize: function (site, objectType, deqwasObject, scriptType) {

        this.site = site;
        this.objectType = objectType;
        this.objectId = deqwasObject.id;
        this.scriptType = scriptType;

        this.parameters = {
            l: deqwasObject.location ? deqwasObject.location : location.href,
            fc: "",
            cid: this.site,
            iid: deqwasObject.id,
            uid: deqwasObject.viewer_id,
            title: deqwasObject.name,
            img: deqwasObject.image,
            val: deqwasObject.value,
            category: deqwasObject.category,
            caption: deqwasObject.caption,
            info: deqwasObject.info,
            role: '',
            logic: '',
            place: '',
            essential: ''
        };

        this.role = '';
        this.logic = '';
        this.place = '';
        this.essential = '';
        this.exclusion = deqwasObject.option.exclusion;

        this.parameterPriority = ['cid','fc','bs','nc','s_browserHeight','s_browserWidth','s_campaign','s_channel','s_colorDepth','s_eVar13','s_eVar14','s_eVar15','s_events','s_hier1','s_javaEnabled','s_javascriptVersion','s_pageName','s_products','s_prop22','s_prop23','s_prop38','s_prop39','s_prop40','s_prop47','s_resolution','s_server','etc1','etc2','etc3'];
        if (deqwasObject.option.silence) {
            this.essential = 'confirmation';
        }
        this.noscreen = deqwasObject.option.noscreen;
        if (deqwasObject.option.noscreen || deqwasObject.option.solitude) {
            this.expression = deqwasObject.option.noscreen ? 'F' : 'X';
            this.expression += deqwasObject.option.solitude ? 'T' : 'X';
        }

        this.targetUrl = '';
        this.extension = '';
        this.baseXmlUrl = '';

        this.xslName = '';
        this.xslDirectory = '';

        this.candidates = [];

        this.iframeStyle = {
            width: '0px',
            height: '0px'
        };
        this.iframeOptions = {
            frameBorder: "0",
            scrolling: "no"
        };
    },

    getSafeProperty: function (property) {
        return Object.prototype.hasOwnProperty.call(window, property)
      ? window[property] : "";
    },

    _setCookie: function (key, val, path, expires) {
        var cookie = [key + '=' + escape(val),
                   'path' + '=' + path,
                   'expires' + '=' + expires
                 ].join(';');
        document.cookie = cookie;
    },

    _getCookie: function (key) {
        var cookieKey = key + "=";
        var val = null;
        var cookie = document.cookie + ";";
        var index = cookie.indexOf(cookieKey);
        if (index != -1) {
            var endIndex = cookie.indexOf(";", index);
            val = unescape(cookie.substring(index + cookieKey.length, endIndex));
        }
        return val;
    },

    deleteCookie: function (key, path) {
        var commingTime = new Date();
        commingTime.setFullYear(commingTime.getFullYear() - 1);
        var expires = commingTime.toGMTString() + ";";
        this._setCookie(key, '', path, expires);
    },

    _createRandomString: function () {
        var string = "";
        var charArray = ['1', '2', '3', '4', '5', '6', '7', '8'];
        for (var i = 0; i < 18; i++) {
            string += charArray[Math.floor(Math.random() * charArray.length)];
        }
        return string;
    },

    setViewerCookie: function () {
        var origin = "ra000000000000" + this.codeVersion + this.site;

        this.parameters["visit"] = (this._getCookie(origin) === null) ? '0' : '1';

        var cookieValue = this._getCookie(origin) || this._createRandomString();

        var time = new Date();
        time.setTime(time.getTime() + (1000 * 60 * 60 * 24 * 365));
        var expires = time.toGMTString();

        this._setCookie(origin, cookieValue, '/', expires);
        this.parameters[origin] = cookieValue;
    },

    _createIframeSrcWithLimit: function (parameters, targetUrl) {
        var parameterArray = [];
        var dummies = new Object(); // for filtering entries coming from Object.prototype

        var parameterKeys = this._concatKey(this.parameterPriority, parameters);

        var iframeSrc = '' + targetUrl;
        var length = iframeSrc.length;
        for (var i = 0; i < parameterKeys.length; i++) {
            var key = parameterKeys[i];
            if (parameters[key] && typeof parameters[key] != 'function' && typeof dummies[key] == 'undefined') {
                var value = (typeof parameters[key] == 'string') ? parameters[key].replace(/[\f\n\r\t\v]/g, '') : parameters[key];
                var parameter = key + "=" + encodeURIComponent(value);
                length += 1 + parameter.length;
                if (length > this.urlLimitation) {
                    break;
                }
                parameterArray.push(parameter);
            }
        }
        iframeSrc += '?' + parameterArray.join("&");
        return iframeSrc;
    },

    _arrayContains: function (array, obj) {
        for (var i = 0; i < array.length; i++) {
            if (array[i] === obj) {
                return true;
            }
        }
        return false;
    },

    _concatKey: function (keys, hash) {
        var array = [].concat(keys);
        for (var key in hash) {
            if (!this._arrayContains(array, key)) {
                array.push(key);
            }
        }
        return array;
    },

    _createIframeSrc: function (parameters, targetUrl) {
        var parameterArray = [];
        var dummies = new Object(); // for filtering entries coming from Object.prototype

        for (var key in parameters) {
            if (parameters[key] && typeof parameters[key] != 'function' && typeof dummies[key] == 'undefined') {
                var value = (typeof parameters[key] == 'string') ? parameters[key].replace(/[\f\n\r\t\v]/g, '') : parameters[key];
                parameterArray.push(key + "=" + encodeURIComponent(value));
            }
        }
        var iframeSrc = targetUrl + "?" + parameterArray.join("&");
        return iframeSrc;
    },

    _createSourceParameter: function (baseXmlUrl, site, objectType, objectId, extension) {
        return [baseXmlUrl, site, objectType, objectId + extension].join('/');
    },

    setTargetUrl: function (targetUrl) {
        this.targetUrl = targetUrl;
    },

    setExtraParameters: function (extraParameters) {
        for (var key in extraParameters) {
            this.parameters[key] = extraParameters[key];
        }
    },

    setRole: function (role) {
        this.role = role;
    },

    setLogic: function (logic) {
        this.logic = logic;
    },

    setPlace: function (place) {
        this.place = place;
    },

    setEssential: function (essential) {
        this.essential = essential;
    },

    setNextCandidateId: function (objectId) {
        this.candidates.push(this._createSourceParameter(
                      this.baseXmlUrl
                      , this.site
                      , this.objectType
                      , objectId
                      , this.extension));
    },

    setNextCandidateParameter: function (parameter) {
        this.candidates.push(parameter);
    },

    setExtension: function (extension) {
        this.extension = extension;
    },

    setBaseXmlUrl: function (baseXmlUrl) {
        this.baseXmlUrl = baseXmlUrl;
    },

    setXslName: function (xslName) {
        this.xslName = xslName;
    },

    setXslDirectory: function (xslDirectory) {
        this.xslDirectory = xslDirectory;
    },

    setScreenName: function (screenName) {
        this.screenElementId = [this.screenElementId, screenName].join('-');
    },

    setCollectionElementId: function (elementId) {
        this.collectionElementId = elementId;
    },

    setScreenElementId: function (elementId) {
        this.screenElementId = elementId;
    },

    setIframeStyle: function (width, height, styleObject) {
        if (!width || !height) return false;
        styleObject = styleObject || {};

        this.iframeStyle.width = width;
        this.iframeStyle.height = height;
        for (var key in styleObject) {
            this.iframeStyle[key] = styleObject[key];
        }
    },

    setIframeOptions: function (iframeOptions) {
        if (!iframeOptions) throw new Error("setIframeOptions: specify options");
        for (var key in iframeOptions) {
            this.iframeOptions[key] = iframeOptions[key];
        }
    },

    appendIframeToElement: function (functionId) {
        var elementId;
        if (!functionId) {
            if (document.getElementById(this.screenElementId)) {
                functionId = this.screenType[this.scriptType];
            }
            else if (document.getElementById(this.collectionElementId)) {
                functionId = this.collectionType[this.scriptType];
            }
            else {
                return false;
            }
        }

        if (this.noscreen) {
            functionId = this.collectionType[this.scriptType];
        }

        if (this.exclusion) {
            functionId = 'x';
            elementId = this.collectionElementId;
            this.iframeStyle = {
                width: '0px',
                height: '0px'
            };
        }
        else if (this.visibleFunctionIds[functionId]) {
            elementId = this.screenElementId;
            this.parameters.source = this._createSourceParameter(
                                 this.baseXmlUrl
                                 , this.site
                                 , this.objectType
                                 , this.objectId
                                 , this.extension);
            for (var i = 0; i < this.candidates.length; i++) {
                this.parameters['source' + (i + 2)] = this.candidates[i];
            }
            this.parameters.type = [this.xslDirectory
                              , this.site
                              , this.xslName].join('/');
        }
        else {
            elementId = this.collectionElementId;
            this.iframeStyle = {
                width: '0px',
                height: '0px'
            };
        }
        if (!document.getElementById(elementId)) {
            return false;
        }

        this.parameters.fc = functionId;
        if (this.essential) {
            this.parameters.essential = this.essential;
        }
        this.parameters.role = this.role;
        this.parameters.logic = this.logic;
        this.parameters.place = this.place;
        this.parameters.essential = this.essential;
        this.parameters.expression = this.expression;

        var iframeName = "deqwas_" + functionId;
        var iframe = document.createElement('iframe');

        iframe.src = this._createIframeSrcWithLimit(this.parameters, this.targetUrl);
        var iframeStyleString = "";
        for (var key in this.iframeStyle) {
            iframeStyleString += [key, ':', this.iframeStyle[key], ';'].join(' ');
        }
        iframe.style.cssText = iframeStyleString;
        for (var attr in this.iframeOptions) {
            iframe[attr] = this.iframeOptions[attr];
        }
        iframe.name = iframeName;

        document.getElementById(elementId).appendChild(iframe);
    },

    setReferrer: function () {
        this.parameters["ref"] = document.referrer;
    },

    setRandom: function (val) {
        this.parameters["ran"] = val;
    },

    clearParam: function () {
        this.parameters["l"] = null;
        this.parameters["fc"] = null;
        this.parameters["title"] = null;
        this.parameters["essential"] = null;
        this.parameters["visit"] = null;
        this.parameters["ra000000000000" + deqwasCid] = null;
    },

    _createRandomNumber: function () {
        var value = "1";
        var characters = '0123456789';
        for (var i = 0; i < 15; i++) {
            value += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return value;
    },

    _getKeywords: function () {
        var metas = document.getElementsByTagName("meta");
        for (var i = 0; i < metas.length; i++) {
            var meta = metas[i];
            var name = meta.name;

            if (name.match(/keywords/i)) {
                return meta.content;
            }
        }
        return null;
    },

    _getSiteCatalyst: function () {
        var catalysts = {};
        if (window.s && window.s.vl_g) {
            var variables = window.s.vl_g.split(',');
            for (var i in variables) {
                if (typeof variables[i] === 'string') {
                    var name = variables[i];
                    var type = window.s[name] ? typeof window.s[name] : typeof window.s[name.toLowerCase()];
                    if (type === 'string' || type === 'number' || type === 'boolean') {
                        catalysts['s_' + name.toLowerCase()] = window.s[name];
                    }
                }
            }
        }
        return catalysts;
    }
};

////////////////////////////////////////////////////////////////////////////////application x.js

(window.addEventListener ? window.addEventListener : window.attachEvent)(window.addEventListener ? 'load' : 'onload', function () {
    function createBeaconImg(url) {
        var img = document.createElement('img');
        img.src = url;
        img.border = "0";
        img.width = "1";
        img.height = "1";
        return img;
    }
    function createScript(url) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.async = true;
        return script;
    }
    function createBeaconIframe(url) {
        var iframe = document.createElement('iframe');
        iframe.src = url;
        iframe.frameBorder = "0";
        iframe.scrolling = "no";
        iframe.width = "1";
        iframe.height = "1";
        return iframe;
    }

    if (location.hostname.match(/^(.*\.)?suumo\.jp$/)) {
        if (location.protocol == 'http:') {
            document.getElementById('deqwas').appendChild(createScript('http://kcont.deqwas.net/contents/js/rtbsync.js'));
        }
    }

    (function () {
        var createDiv = function (id) {
            var div = document.createElement('div');
            div.id = id;
            div.style.cssText = 'display:none;'
            return div;
        };
        if (!window.s) {
            return;
        }
        var containerDiv = document.getElementById('deqwas');
        containerDiv.appendChild(createDiv('deqwas-collection-k'));
        containerDiv.appendChild(createDiv('deqwas-k'));
        if (!window.deqwas_k) {
            window.deqwas_k = { option: {} };
        }
        if (window.bs && (bs === '020' || bs === '030') && (s.prop15 === '030' || s.prop15 === '050' || s.prop15 === '060')) {
            deqwas_k.cid = 'suumokr';
            if (window.nc) {
                deqwas_k.item_id = window.nc;
            } else {
                deqwas_k.item_id = '';
            }
            containerDiv.appendChild(createScript((location.protocol === 'https:' ? 'https:' : 'http:') + '//kdex003.deqwas.net/suumokr/scripts/item.js?noCache=' + Math.floor((new Date()).getTime()/3600000)));
        }
        if (window.bs && (bs === '010') && (s.prop15 === '030' || s.prop15 === '060')) {
            deqwas_k.cid = 'suumoms';
            if (window.nc) {
                deqwas_k.item_id = window.nc;
            } else {
                deqwas_k.item_id = '';
            }
            containerDiv.appendChild(createScript((location.protocol === 'https:' ? 'https:' : 'http:') + '//kdex003.deqwas.net/suumoms/scripts/item.js?noCache=' + Math.floor((new Date()).getTime()/3600000)));
        }
        if ((s.prop14 === '040' || s.prop14 === '041' || s.prop14 === '301') && (s.prop15 === '030') && (s.prop13 === 'D')) {
            deqwas_k.cid = 'suumoch';
            containerDiv.appendChild(createScript((location.protocol === 'https:' ? 'https:' : 'http:') + '//kdex003.deqwas.net/suumoch/scripts/item.js?noCache=' + Math.floor((new Date()).getTime()/3600000)));
        }
        if (typeof s.events !== 'string') {
            return;
        }
        (function(events){
            if (/(^|.?,)event1[25](,.?|$)/.test(events)) {
                deqwas_k.cid = 'suumokr';
                deqwas_k.item_id = '';
                containerDiv.appendChild(createScript((location.protocol === 'https:' ? 'https:' : 'http:') + '//kdex003.deqwas.net/suumokr/scripts/cv.js?noCache=' + Math.floor((new Date()).getTime()/3600000)));
            }
            if (/(^|.?,)event2(,.?|$)/.test(events)) {
                deqwas_k.cid = 'suumoms';
                deqwas_k.item_id = '';
                containerDiv.appendChild(createScript((location.protocol === 'https:' ? 'https:' : 'http:') + '//kdex003.deqwas.net/suumoms/scripts/cv.js?noCache=' + Math.floor((new Date()).getTime()/3600000)));
            }
            if (/(^|.?,)event17(,.?|$)/.test(events)) {
                deqwas_k.cid = 'suumoch';
                deqwas_k.item_id = '';
                containerDiv.appendChild(createScript((location.protocol === 'https:' ? 'https:' : 'http:') + '//kdex003.deqwas.net/suumoch/scripts/cv.js?noCache=' + Math.floor((new Date()).getTime()/3600000)));
            }
        })(s.events);
    })();
}, false);

(window.addEventListener ? window.addEventListener : window.attachEvent)(window.addEventListener ? 'load' : 'onload', function () {
    deqwas.name = document.title;

    deqwasCid = deqwas.cid;
    if (deqwasCid == null) {
        deqwasCid = "suumo";
    }

    var deqwasAgent = new DeqwasAgent(deqwasCid, "item", deqwas, "normal");
    var deqwasRandom = deqwasAgent._createRandomNumber();

    deqwasAgent.setRandom(deqwasRandom);
    deqwasAgent.setViewerCookie();

    deqwasAgent.targetUrl = location.protocol + "//dex01.deqwas.net/d/Collection.aspx";

    deqwasAgent.setViewerCookie();
    deqwasAgent.setEssential("nothing");

    (function () {
        var deqwasKeywordsLimit = 50;

        var deqwasKeywords = deqwasAgent._getKeywords();

        if (deqwasKeywords) {
            if (deqwasKeywords.length > deqwasKeywordsLimit) {
                deqwasKeywords = deqwasKeywords.substr(0, deqwasKeywords.substr(0, deqwasKeywordsLimit).lastIndexOf(","));
            }
        }

        var scParameters = deqwasAgent._getSiteCatalyst();
        var events = 's_events';
        var events_value;
        if (scParameters[events]) {
             events_value = scParameters[events];
        }

        deqwasAgent.setExtraParameters({
            sub01: deqwasKeywords,
            etc2:  document.referrer.substring(0,500),
            etc3:  events_value
        });
    })();

    deqwasAgent.appendIframeToElement();

    (function () {
        var params = {}, deqwasAgentC, commonCid = deqwasCid, scriptType = 'normal', prod, i;
        if (window.deqwas2 && (deqwas2.etc3 === 'shiryou' || deqwas2.etc3 === 'shiryo')) {
            scriptType = 'shipping';
        }
        if (document.referrer) {
            params.ref = document.referrer;
        }

        deqwasAgentC = new DeqwasAgent(commonCid, "item", window.deqwas2 || deqwas, scriptType);
        deqwasAgentC.setRandom(deqwasRandom);
        deqwasAgentC.clearParam();
        deqwasAgentC.targetUrl = location.protocol + "//dex01.deqwas.net/common/collection.aspx";
        deqwasAgentC.setExtraParameters(params);
        deqwasAgentC.appendIframeToElement();
    })();

    (function () {
        var deqwasAgentSiteCatalyst = new DeqwasAgent(deqwasCid, "item", { option: {} }, "");
        deqwasAgentSiteCatalyst.setRandom(deqwasRandom);

        deqwasAgentSiteCatalyst.clearParam();

        var scParameters = deqwasAgentSiteCatalyst._getSiteCatalyst();
        var nonused = ['linkDownloadFileTypes', 'linkInternalFilters', 'pageURL', 'plugins', 'prop1', 'prop2'];
        var i, name, j, variable;
        for (i = 0; i < nonused.length; i++) {
            name = 's_' + nonused[i];
            if (scParameters[name]) {
                scParameters[name] = undefined;
            }
            name = 's_' + nonused[i].toLowerCase();
            if (scParameters[name]) {
                scParameters[name] = undefined;
            }
        }

        var variables = ['ke', 'bs', 'ss', 'bc', 'nc', 'tjh', 'jjh', 'kc', 'seq', 'shiryoType', 'seikyuFlg'];
        for (j = 0; j < variables.length; j++) {
            variable = variables[j];
            scParameters[variable] = window[variable];
        }
        deqwasAgentSiteCatalyst.setExtraParameters(scParameters);
        if (window.SHUKYAKU_GLOBAL_VAR && SHUKYAKU_GLOBAL_VAR.deqwas && typeof SHUKYAKU_GLOBAL_VAR.deqwas.cookieSegment !== 'undefined') {
            deqwasAgentSiteCatalyst.setExtraParameters({etc1: SHUKYAKU_GLOBAL_VAR.deqwas.cookieSegment});
        }

        deqwasAgentSiteCatalyst.setExtraParameters({
            etc2: document.referrer.substring(0,500),
            etc3: document.location.href.substring(0,500)
        });

        deqwasAgentSiteCatalyst.targetUrl = location.protocol + "//dex01.deqwas.net/sitecatalyst/SiteCatalyst.aspx";

        deqwasAgentSiteCatalyst.appendIframeToElement('sc1');
    })();
}, false);
