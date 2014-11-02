[はてなブログの「ブログカード」](http://staff.hatenablog.com/entry/2014/09/05/143600)がLivedoor Reader（LDR）できれいに表示されない問題（[例](https://twitter.com/azu_re/status/522987874090627072)）を適当に解決するユーザースクリプト。

## 原因

ブログカードはiframeで実装されているが、LDRはフィード内のiframeを除去して、その中身をテキストとして表示するため、ブログカードが`<a href="...">...</a>`のように表示される。

## 対策

ブログカードの中身らしきものを正規表現でマッチしてiframeに置き換える。はてなブログのフィードだけに適用されるようにしたかったが、はてなブログかどうかの判定に使えそうな要素がドメイン名ぐらいしかなく、独自ドメインを使っているはてなブログを判定する方法が思いつかなかったのですべてのフィードに適用するようにしている。

## 既知の問題

### ときどきiframeの中身が空になっている

理由は分からないが、ブログカードのiframeの中身が空になっていることがある。この場合、LDRから渡されたデータからブログカードを復元することはできない。

- 例: http://akiueo.hatenablog.com/entry/back-ache-dendendaiko-suwaishou-201410 の http://news.mynavi.jp/news/2014/10/01/664/ のブログカード。
  - 編集モードをこのブログと同じ「Markdownモード」に設定して（http://akiueo.hatenablog.com/about で確認できる）、`[http://news.mynavi.jp/news/2014/10/01/664/:embed]`と入力して投稿してみたが再現しなかった。出力されたHTMLは`<p><iframe src="http://hatenablog.com/embed?url=http%3A%2F%2Fnews.mynavi.jp%2Fnews%2F2014%2F10%2F01%2F664%2F" title="ブルンブルンをたった3分！「肩こり腰痛を一気に撃退する方法」" scrolling="no" frameborder="0" style="width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"><a href="http://news.mynavi.jp/news/2014/10/01/664/">ブルンブルンをたった3分！「肩こり腰痛を一気に撃退する方法」</a></iframe></p>`。

## メモ

- 「見たまま編集モード」のブログではdata-mce-href属性が付くらしい。
- はてなブログ側のAtomとHTMLで、iframeタグで括られた部分の`<`, `>`が`&lt;`, `&gt;`、`&amp;lt;`, `&amp;gt;`、`&amp;amp;lt;`, `&amp;amp;gt;`のようになることがある。HTMLのサニタイズが何度も適用されているようだが、発生条件は不明。
  - 例: http://anemoneko.hatenablog.com/entry/2014/10/22/132859
    - `<p><iframe style="width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;" title="金曜ドラマ『Nのために』" src="http://hatenablog.com/embed?url=http%3A%2F%2Fwww.tbs.co.jp%2FNnotameni%2F" frameborder="0" scrolling="no">&amp;amp;amp;amp;amp;lt;a href="http://www.tbs.co.jp/Nnotameni/" data-mce-href="http://www.tbs.co.jp/Nnotameni/"&amp;amp;amp;amp;amp;gt;金曜ドラマ『Nのために』&amp;amp;amp;amp;amp;lt;/a&amp;amp;amp;amp;amp;gt;</iframe><br /> <a href="http://www.tbs.co.jp/Nnotameni/">金曜ドラマ「Nのために」｜TBSテレビ</a></p>`
  - iframeの中身がエスケープされていない例: http://zuisho.hatenadiary.jp/entry/2014/10/28/004924
    - `<iframe style="width: 100%; height: 190px; max-width: 500px; margin: 10px 0px;" title="iPhoneとiPadとpomeraで書けるようになる算段（感化されて目標立てちゃう感じ） - 世界は称賛に値する" src="http://meltylove.hatenadiary.com/embed/iPhoneiPadpomeradekaku" frameborder="0" scrolling="no"><a href="http://meltylove.hatenadiary.com/entry/iPhoneiPadpomeradekaku" data-mce-href="http://meltylove.hatenadiary.com/entry/iPhoneiPadpomeradekaku">iPhoneとiPadとpomeraで書けるようになる算段（感化されて目標立てちゃう感じ） - 世界は称賛に値する</a></iframe>`
