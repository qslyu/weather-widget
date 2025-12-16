import Widget from "./widget";

export default function App() {
  return (
    <div className="weather-widget">
      <h1>天気予報オーバーレイ</h1>
      <p>天気予報は <code>https://weather.tsukumijima.net/</code> から取得しています。（気象庁HPと同じものが取得されます。）</p>
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
