# What's xtechlog ?

 - xtechlog はブロクアプリケーションです
 - ブロクサイトの開発を学習する為に作成していてプロダクション用ではありません
 - デモ　社内用 http://xx.xx.xx.xx
 

### Features

 - 記事の投稿、表示、編集
 - コメントの投稿
 - 記事のリスト提供
 - 記事の参照回数の取得
 - 記事へのいいね

### Setup & Usage

 internetとgit,docker環境があれば以下の手順で起動できます
```
 $ git clone <this application repository>
 $ cd xtechlog
 $ docker-compose build
 $ docker-compose up -d

 起動後に http://localhost/ にアクセスしてみてください
```

 localhost以外から利用する場合は以下のファイルを修正しdockerimageをbuild
 - frontend/app/src/config.json  // backend のドメインをlocalhostから変更

 techlog-frontend コンテナの以下のファイルを修正してもOK
 - usr/share/nginx/html/js/app*.js // backend のドメインをlocalhostから変更
 

 アプリ(コンテナ）の廃棄
```
 $ docker-compose down
```
### Dev
```
 $ git clone <this application repositry>
 $ cd xtechlog
 $ docker-compose -f docker-compose.dev.yml up -d
 $ docker exec xtechlog-backend yarn install
 $ docker exec -d xtechlog-backend yarn start
 $ docker exec xtechlog-frontend yarn install
 $ docker exec -d xtechlog-frontend yarn serve

起動後に http://localhost:8080/ にアクセスしてみてください
```
 - データベースのデータを手動で操作したい場合は http://localhost:8081/ にアクセスしてください
 - データベースの中でブログの記事は db: test, collection: articles 
 - コードは写経レベルなので理解せずコーディングしている箇所が多い
 - アプリを修正したいときは以下のファイルを修正 (アプリを停止しなくても修正内容は反映され確認できます)
    - xtechlog/frontend/app/src/ 
    - xtechlog/backend/app/ 

### Files

```
.
├── Readme.md
├── backend
│   └── app                         # バックエンドサーバアプリ関連のファイル
├── docker-compose.yml
├── frontend
│   ├── app                         # フロントエンドサーバーアプリ関連のファイル
└── mongo
    ├── data                        # DBのデータ
    └── docker-entrypoint-initdb.d  # DBの初期設定スクリプトファイル
```


