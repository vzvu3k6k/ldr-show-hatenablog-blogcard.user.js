// ==UserScript==
// @name           LDR: はてなブログのブログカードをLDRで表示する
// @description    ブログカードらしきものをiframeに置換する
// @version        1.0
// @author         vzvu3k6k
// @match          http://reader.livedoor.com/reader/
// @namespace      http://vzvu3k6k.tk/
// @license        CC0
// ==/UserScript==

location.href = 'javascript: void (' + function(){
  /* ブログカードの代わりにリンクを表示したい人向け */
  function link(_, url, label){
    var a = document.createElement('a');
    a.setAttribute('href', url);
    a.textContent = label;
    return a.outerHTML;
  }

  function iframe(_, url, label){
    var iframe = document.createElement('iframe');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('style', 'width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;');
    iframe.setAttribute('scrolling', 'no');
    iframe.setAttribute('title', label);
    iframe.setAttribute('src', 'http://hatenablog.com/embed?url=' + encodeURIComponent(url));
    return iframe.outerHTML;
  }

  register_hook('BEFORE_PRINTFEED', function(feed){
    feed.items.forEach(function(item){
      /* item.__before_hbcard_body = item.body; */
      item.body = item.body.replace(
          /(?:&(?:amp;)+)lt;a href="(https?:\/\/[^"]+)"(?: data-mce-href="\1")?(?:&(?:amp;)+)gt;(.+?)(?:&(?:amp;)+)lt;\/a(?:&(?:amp;)+)gt;/g,
        iframe
      );
    });
  });
} + ')()';
