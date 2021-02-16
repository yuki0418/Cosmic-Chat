# Cosmic-Chat

[リンク](http://cosmic-chat.yuki-dev.com/)からサイトへ飛べます。

## 遊び方
### Login Page
1. Enter User Name
2. Choose charactor color
3. Click Join

### Game Page
[A | Left]  - Move to left
[D | Right] - Move to right
[W | Top]   - Move to top
[S | Down]  - Move to down

右下のテキストボックスにテキストを入力しSENDをクリックすると
チャットを他のpレイヤーに送ることができます。


## ローカルで動かす場合
ローカル環境で動かしたい場合は下記手順にそって行ってください。
1. 最新のNode.jsの[インストール](https://nodejs.org/en/download/)
npmを含んだLatest LTS Versionをインストールしてください。

2. Folderのトップルートに移動してターミナルを開いてください。
3. ```cd app```で/appに移動して```npm install```を実行してください。
4. ```cd ../server```で/serverフォルダに移動して```npm install```を実行してください。
5. ```npm run start-dev```を実行してバックエンドサーバーを稼働させてください。
6. もう一つターミナルを開き```cd app```でappフォルダに移動してください。
7. /app上で```npm start```を実行するとフロントエンドサーバーが稼働します。
8. ブラウザ上で　http://localhost:3000 を開いてください。
