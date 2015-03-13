[はてなブログの「ブログカード」](http://staff.hatenablog.com/entry/2014/09/05/143600)がLive Dwango Reader（LDR）で`<a href="...">...</a>`のように表示される問題を適当に解決するユーザースクリプト。

## 原因

通常、ブログカードは以下のようにiframeタグの中にaタグが含まれている。

```html
<iframe class="embed-card embed-blogcard" style="width: 100%; height: 190px; max-width: 500px; margin: 10px 0px;" title="ブログを作るにあたって考えたこと - 人生を豊かにする読書ブログ" src="http://book-life.hatenablog.com/embed/2015/02/19/204509" frameborder="0" scrolling="no"><a href="http://book-life.hatenablog.com/entry/2015/02/19/204509" data-mce-href="http://book-life.hatenablog.com/entry/2015/02/19/204509">ブログを作るにあたって考えたこと - 人生を豊かにする読書ブログ</a></iframe>
```

引用元: <http://book-life.hatenablog.com/entry/2015/03/14/004711>

はてなブログのフィードではiframeタグの中身だけが出力されるので、上記のブログカードは

```html
<a href="http://book-life.hatenablog.com/entry/2015/02/19/204509" data-mce-href="http://book-life.hatenablog.com/entry/2015/02/19/204509">ブログを作るにあたって考えたこと - 人生を豊かにする読書ブログ</a>
```

というリンクになる。

しかし、まれにiframeタグの中のaタグがHTMLエスケープされていることがある。

```html
<iframe class="embed-card embed-blogcard" style="width: 100%; height: 190px; max-width: 500px; margin: 10px 0px;" title="ミニマリズムとは、やせ我慢である - 計画的無計画" src="http://noplan.hatenablog.jp/embed/2015/02/11/225505" frameborder="0" scrolling="no">&lt;a href="http://noplan.hatenablog.jp/entry/2015/02/11/225505" data-mce-href="http://noplan.hatenablog.jp/entry/2015/02/11/225505"&gt;ミニマリズムとは、やせ我慢である - 計画的無計画&lt;/a&gt;</iframe></p>
```

引用元: <http://noplan.hatenablog.jp/entry/2015/03/10/201224>

この場合、LDRではブログカードが`<a href="...">...</a>`のように表示される。

## 対策

ブログカードの中身らしきものを正規表現でマッチしてiframeに置き換える。はてなブログのフィードだけに適用されるようにしたかったが、はてなブログかどうかの判定に使えそうな要素がドメイン名ぐらいしかなく、独自ドメインを使っているはてなブログを判定する方法が思いつかなかったのですべてのフィードに適用するようにしている。

## 既知の問題

### ときどきiframeの中身が空になっている

理由は分からないが、ブログカードのiframeの中身が空になっていることがある。この場合、LDRから渡されたデータからブログカードを復元することはできない。

- 例: http://akiueo.hatenablog.com/entry/back-ache-dendendaiko-suwaishou-201410 の http://news.mynavi.jp/news/2014/10/01/664/ のブログカード。
  - 編集モードをこのブログと同じ「Markdownモード」に設定して（http://akiueo.hatenablog.com/about で確認できる）、`[http://news.mynavi.jp/news/2014/10/01/664/:embed]`と入力して投稿してみたが再現しなかった。出力されたHTMLは`<p><iframe src="http://hatenablog.com/embed?url=http%3A%2F%2Fnews.mynavi.jp%2Fnews%2F2014%2F10%2F01%2F664%2F" title="ブルンブルンをたった3分！「肩こり腰痛を一気に撃退する方法」" scrolling="no" frameborder="0" style="width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"><a href="http://news.mynavi.jp/news/2014/10/01/664/">ブルンブルンをたった3分！「肩こり腰痛を一気に撃退する方法」</a></iframe></p>`。

## メモ

- ブログカードのiframe内のエスケープは複数回適用されることもあるらしく、`<`, `>`が`&lt;`, `&gt;`、`&amp;lt;`, `&amp;gt;`、`&amp;amp;lt;`, `&amp;amp;gt;`のようになる場合もある。
  - 例: http://anemoneko.hatenablog.com/entry/2014/10/22/132859
    - `<p><iframe style="width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;" title="金曜ドラマ『Nのために』" src="http://hatenablog.com/embed?url=http%3A%2F%2Fwww.tbs.co.jp%2FNnotameni%2F" frameborder="0" scrolling="no">&amp;amp;amp;amp;amp;lt;a href="http://www.tbs.co.jp/Nnotameni/" data-mce-href="http://www.tbs.co.jp/Nnotameni/"&amp;amp;amp;amp;amp;gt;金曜ドラマ『Nのために』&amp;amp;amp;amp;amp;lt;/a&amp;amp;amp;amp;amp;gt;</iframe><br /> <a href="http://www.tbs.co.jp/Nnotameni/">金曜ドラマ「Nのために」｜TBSテレビ</a></p>`
