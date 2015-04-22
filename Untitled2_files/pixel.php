
var pixel = {
    parse : function() {
    var baseURL = ('https:' == document.location.protocol ? 'https://serv2ssl.vizury.com' : 'http://serv2.vizury.com')
            + '/analyze/analyze.php?account_id=VIZVRM2699';
    var analyze = document.createElement('iframe');
    analyze.src = baseURL;
    analyze.scrolling = 'no';
    analyze.width = '1';
    analyze.height = '1';
    analyze.marginheight = '0';
    analyze.marginwidth = '0';
    analyze.frameborder = '0';
    analyze.style.display = 'none';
					
    var node = document.getElementsByTagName('script')[0];
    node.parentNode.insertBefore(analyze, node);
    }
};