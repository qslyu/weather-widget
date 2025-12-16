import Widget from "./widget";

export default function App() {
  return (
    <div className="weather-widget">
      <h1>obs向け天気予報ウィジェット</h1>
      <p>本ツールは気象庁のデータを加工したものを<code>https://weather.tsukumijima.net/</code>から取得して表示しています。</p>
      <p>気象庁ウェブサイトの利用規約に基づき、配信の概要欄等に出典が気象庁である旨を必ず記載してください。表示された情報を元に、ご自身で独自の予報を行うことは、気象業務法で禁じられていますのでご注意ください。</p>
      <h2>利用方法</h2>
      <p>obsのブラウザソースで以下のURLを指定してください</p>
      <code>{window.location.href.replace(/\/$/,'') + '/widget.html'}</code>
      <br />
      <h2>プレビュー</h2>
      <div style={{containerType: 'inline-size', width:'300px'}}><Widget /></div>
      <br />
      <p>x: @_qslyu</p>
    </div>
  );
}
