var tht_loadAt;   // time of onload
var tht_unLoadAt; // time of unonload

// define the function that adds an event listener
function tht_addEvent(elm, listener, fn){
  try{
    elm.addEventListener(listener, fn, false);
  }
  catch(e){
    // for IE
    elm.attachEvent("on" + listener, fn);
  }
}

function tht_isGoogle(url) {
    var splitedUrl = url.split('/');
    if (splitedUrl.length > 2 && splitedUrl[2].indexOf('google') >= 0) {
        return true;
    } else {
        return false;
    }
}

function tht_hasSearchword(url) {
    var splitedUrl = url.split('?');
    if (splitedUrl.length < 2) {
        return false;
    }
    var params = splitedUrl[1].split('&');
    for (var i = 0; i < params.length; i++) {
        var pair = params[i].split('=');
        if (pair.length === 2 && (pair[0] === 'q' || pair[0] === 'as_q') && pair[1] != '') {
            return true;
        }
    }
    return false;
}

// generate a JSON string
function toJSON(hash){
  var data = [];
  for(var i in hash){
    switch(typeof hash[i]){
      case 'string':
        data[data.length] = '"' + i.replace(/"/g, '\\"') + '"' + ':"' + hash[i].replace(/"/g, '\\"') + '"';
        break;
      case 'number':
        data[data.length] = '"' + i.replace(/"/g, '\\"') + '"' + ":" + hash[i];
        break;
    }
  }
  return '{' + data.join(',') + '}';
}

// define the onLoad event
function tht_load(){
  tht_loadAt = new Date();
}

// define the onUnLoad event
function tht_unload(){
  tht_unLoadAt = new Date();
  var stayTime = Math.round(Math.min((tht_unLoadAt - tht_loadAt) / 1000, 60));
  var d = document;
  var opt = {
    img_id: '__thatping_tracking',
    uid_prefix: 'suc_',
    uid_randbase: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
    uid_randlen: 12,
    ping_before:  'http://suumo-chintai.thatsping.com/ping/?',
    ping_after: ''
  };
  if(d.getElementById(opt.img_id)) return;
  var links = d.getElementsByTagName('link'), type_re = new RegExp('xml', 'i'), feed = 'http://suumo.jp/chintai/', uid = opt.uid_prefix;
  for(var i = 0, len = links.length; i < len; i ++){
    var rel = links[i].getAttribute("rel"), type = links[i].getAttribute('type');
    if(typeof rel == 'string' && rel.toLowerCase() == 'alternate' && typeof type == 'string' && type.match(type_re)){
      feed = links[i].getAttribute('href');
      break;
    }
  }
  for(var i = 0; i < opt.uid_randlen; i ++){
    uid += opt.uid_randbase[~~(Math.random() * opt.uid_randbase.length)];
  }
  var titles = d.getElementsByTagName('title');
  var send_data = {
    i: uid,
    n: titles.length ? titles[0].innerHTML : d.title,
    u: location.href,
    r: document.referrer,
    f: feed,
    t: 0
  };
  if(stayTime > 30){
    stayTime = 30;
  }
  send_data.t = stayTime;
  // send ping
  re = new RegExp("^https?://" + document.domain + "/");
  if (document.referrer && document.referrer.match(re) == null) {
    if (!tht_isGoogle(document.referrer) || tht_hasSearchword(document.referrer)) {
      new Image().src = opt.ping_before + encodeURIComponent(toJSON(send_data)) + opt.ping_after;
    }
  }
}

// add event listener to privent the default event handler from overwriting
tht_addEvent(window, "load", tht_load);
tht_addEvent(window, "unload", tht_unload);
