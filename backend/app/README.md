This is the API backend server.

### APIs

- POST /api/articles/              記事の投稿
- GET  /api/articles/:id           記事の取得
- PUT  /api/articles/:id           記事の更新
- GET  /api/articles/list          最新記事のリスト取得
- POST /api/articles/:id/comment   コメントの投稿
- PUT  /api/articles/:id/vote      記事へのいいね 

### files 

```

.
├── Dockerfile
├── README.md
├── access.log
├── config
│   └── config.json
├── controllers
│   └── articleController.js   # 主にリクエストに応じてDBにアクセスする
├── index.js
├── models
│   └── article.js             # 記事のモデル定義
├── package.json
├── routes
│   └── api
└── yarn.lock

```
