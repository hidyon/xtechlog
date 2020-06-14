import Api from './index'

export default {
  /**
   * backend-server からidで指定する記事を取得する
   * (backend-server)/api/articles/:id GETリクエストの仕様を確認すること
   *         
   * 以下の形式のJSONが戻り値になるので、dataの値を取り出して表示などに利用することができる
   * { data: {article-data1},
   *   (other key): (value)
   * }
   */
  async getArticleById (id) {
    
    let response = await Api().get('/api/articles/' + id)
    let article = response.data
    //DEGUB console.log("article " + JSON.stringify(article))
    
    // 表示用に、タグは配列から文字列に変換しておく
    article.tags = article.tags.toString()
    // 表示用に、日時はブラウザーのロケール時間に変換しておく
    article.updateDate = new Date(article.updateDate).toLocaleString()
    if(article.comments.length >0){
      let comments = article.comments.map(x => {
        x.timestamp = new Date(x.timestamp).toLocaleString()
          return x
      })
      article.commnets = comments
    }
    return article
  },
  /**
   * backend-server へ新しい記事を投稿する
   * (backend-server)/api/articles/ POSTリクエストの仕様を確認すること
   *         
   * @article 以下の形式のJSONを設定すること        
   * { 
   *   title : String,
   *   username : String,
   *   tags : String,       # 複数タグは','で区切ること
   *   document : String    # HTML OK 
   * }
   */
  async postArticle (newArticle) {
    return await Api().post('/api/articles/', newArticle)
  },
  /**
   * backend-server へ記事の更新を投稿する
   * (backend-server)/api/articles/:id PUTリクエストの仕様を確認すること
   *         
   * @updatedArticle 以下の形式のJSONを設定すること        
   * { 
   *   title : String,
   *   username : String,
   *   tags : String,       # 複数タグは','で区切ること
   *   document : String    # HTML OK 
   * }
   */
  async putArticleById (id, updatedArticle) {
    return await Api().put('/api/articles/'+ id, updatedArticle)
  },
  /**
   * backend-server idでしてされる記事へ新しいコメントを投稿する
   * (backend-server)/api/articles/:id/comment POSTリクエストの仕様を確認すること
   *         
   * @postCommentData 以下の形式のJSONを設定すること        
   * { 
   *   username : String,
   *   document : String    # HTML OK
   * }
   */
  async postCommentById (id, postCommentData) {
    return await Api().post('/api/articles/'+ id + '/comment', postCommentData)
  },
  /**
   * backend-server idで指定される記事へいいねする
   * (backend-server)/api/:id/vote PUTリクエストの仕様を確認すること
   *         
   */
  putVoteById (id) {
    //DEBUG let voteData = { "to": id, "from": "voter", "date": new Date() }
    return Api().put('/api/articles/'+ id + '/vote')
  },
  /**
   * backend-server から最新記事の一覧を取得する
   * (backend-server)/api/articles/list GETリクエストの仕様を確認すること
   *         
   * 以下の形式のJSONが戻り値になるので、dataの値を取り出して表示などに利用することができる
   * { data: [ {article-data1}, {article-data2}, ... ],
   *   (other key): (value)
   *  }
   *
   * １つの記事のデータは、本文などを含まずに、タイトル、投稿者等の基本情報のみのデータが
   * 設定されている（通信データ量削減のため）
   *
   */
  async getArticleList () {
    let response = await Api().get('/api/articles/list')
    let articlesList = response.data
    articlesList.map( x => {
      x.updateDate = new Date(x.updateDate).toLocaleString()
    })
    return articlesList
  },
}
