このレベルでは、ゲームをプレイするための基本的な方法を説明します。

&nbsp;

#### 1. MetaMask の設定

まだお持ちでない方は、[MetaMask ブラウザ拡張機能](https://metamask.io/)をインストールしてください（デスクトップマシンの Chrome、Firefox、Brave、Opera にインストール）。
拡張機能のウォレットを設定し、ネットワークセレクターを使って、拡張機能のインターフェースの上にある「Fuji test network」を指定します。

&nbsp;

#### 2. ブラウザのコンソールを開く

ブラウザのコンソールを開きます。`tools > Developer tool`を選択します。

ゲームからのメッセージがいくつか表示されるはずです。そのうちのひとつに、プレイヤーのアドレスが書かれています。これはゲーム中に重要な意味を持ちます。自分のプレイヤーのアドレスは、次のコマンドを入力することでいつでも見ることができます。

```
player
```

ゲーム中に重要な情報が得られる可能性があるので、警告やエラーに注意してください。

&nbsp;

#### 3. コンソールヘルパーを使う

また、以下のように入力すると、現在の ether の所有量を確認することができます。

```
getBalance(player)
```

###### 注意: 「pending」と表示されていて、実際の値を確認したい場合は promise を展開してください。Chrome v62 を使用している場合は、`await getBalance(player)` を使用すると、コンソールがすっきりします。

素晴らしいですね。コンソールにある他のユーティリティー関数を見るには、次のように入力します。

```
help()
```

これらは、ゲームプレイ中に超便利です。

&nbsp;

#### 4. liftTicket のコントラクト

コンソールで以下のコマンドを入力します。

```
liftTicket
```

これはこのゲームのメインのスマートコントラクトです。コンソールから直接操作する必要はありませんが（このアプリがやってくれるので）、やりたければできます。今、このオブジェクトを使って遊ぶことは、ゲームの他のスマートコントラクトとのやりとりを学ぶのに最適な方法です。

ethernaut オブジェクトを展開して、中身を見てみましょう。

&nbsp;

#### 5. ABI とのインタラクト

`liftTicket` は、ブロックチェーンにデプロイされたコントラクト `LiftTicket.sol` をラップした `TruffleContract` オブジェクトです。

とりわけ、コントラクトの ABI は、`LiftTicket.sol`のすべてのパブリックメソッド（`owner`など）を公開しています。例えば以下のようなコマンドを入力します。

```
liftTicket.owner()
```

###### Chrome v62 を使用している場合は、`await liftTicket.owner()`と入力してください。

ethernaut コントラクトの owner が誰であるかを見ることができます。

&nbsp;

#### 6. テスト用 ether の入手

ゲームをプレイするには、テスト用の ether が必要です。テストネットの ether を入手する最も簡単な方法は、[fauset](https://faucet.rinkeby.io/)から受け取る方法です。

残高に ether が表示されたら、次のステップに進んでください。

&nbsp;

#### 7. レベルインスタンスの取得

レベルをプレイする際には、ethernaut コントラクトと直接対話することはありません。代わりに、**レベルインスタンス**の生成をします。そのためには、ページの下にある青いボタンをクリックします。今すぐ実行して、戻ってきてください。

MetaMask からトランザクションを承認するよう促されるはずです。そうすると、コンソールにいくつかのメッセージが表示されるはずです。これはブロックチェーンに新しいコントラクトをデプロイするもので、数秒かかることがありますので、新しいレベルのインスタンスをリクエストする際には気長にお待ちください

&nbsp;

#### 8. コントラクトの検査

ethernaut コントラクトで行ったように、`contract`変数を使ってコンソールからこのコントラクトの ABI を調べることができます。

&nbsp;

#### 9. コントラクトとインタラクトしてレベルをクリアする

レベルの情報を見てみましょう。

```
contract.info()
```

###### Chrome v62 を使用している場合は、`await contract.info()` を実行してください。

レベルをクリアするのに必要なものはすべてコントラクトの中にあります。
レベルが完了したら、ページの下にあるオレンジ色のボタンを使ってコントラクトを送信します。
これにより、インスタンスが ethernaut に戻され、完了したかどうかが判断されます。

##### ヒント: コントラクトの ABI はいつでも見ることができます!
