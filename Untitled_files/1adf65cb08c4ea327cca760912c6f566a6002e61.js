function enc(str){
  if(str){
      return encodeURIComponent(str);
  }else{
      return '';
  }
}
var mmImgPath = '//img.macromill.com/rsc/230359-001?events=' + enc(s.events) + '&prop14=' + enc(s.prop14) + '&prop13=' + enc(s.prop13);
document.write('<img src="' + mmImgPath + '" width="1" heihgt="1" />');
