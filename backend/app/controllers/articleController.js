const express = require('express')
const ArticleModel = require('../models/article.js')


module.exports =  {

  /**
   *
   * 直近に更新された記事を20件取得　
   * 記事の基本情報（タイトル、更新日等）のみを返す（サイズ軽減のため）
   *
   */
  doGetList : (req, res, next) => {

    ArticleModel.find(
      {}, 
      '_id title username updateDate tags views votes countComments',
      {sort:{updateDate:-1}, skip:0, limit:20},  
      (err, result) => {
        if(!err){
          res.send(result)
        } else {
          console.log(err)
          return res.status(500).send('get article list faild.')
        }
      }
    )
  },

  /**
   *
   * idで指定された記事を取得
   * 同時にアクセス回数を更新する
   *
   */
  doGetArticleById : (req, res, next) => {
    
    ArticleModel.findOneAndUpdate( 
      { _id : req.params.id }, 
      {$inc: {views : 1}}, 
      (err, result) =>{
        if(!err){
          res.send(result)
        } else {
          console.log(err)
          return res.status(500).send('get article by id faild.')
        }
      }
    )
  },

  /**
   *
   * 新しい記事を投稿する
   * 
   *
   */
  doPostArticle : (req, res, next) => {

    let postData = new ArticleModel(req.body)
    //DEBUG console.log("postData:" + req.body.data)
    postData.save((err, result) => {
      if(!err){
        res.send(result)
      } else {
        console.log(err)
        return res.status(500).send('post article faild.')
      }
    })
  },

  /**
   *
   * 既存記事を更新して投稿する
   * 
   *
   */
  doPutArticle : (req, res, next) => {

    let putReqData = req.body
    // 更新日時を設定
    putReqData.updateDate = Date.now()
    //DEBUG console.log(`putData : ${JSON.stringify(putReqData)}`)
    ArticleModel.findOneAndUpdate( 
      { _id : req.params.id }, 
      {$set: putReqData}, 
      (err, result) =>{
        if(!err){
          res.send(result)
        } else {
          console.log(err)
          return res.status(500).send('put article faild.')
        }
      }
    )
  },

  /**
   *
   * 新しいコメントを投稿する
   * 
   *
   */
  doPostCommentById : (req, res, next) => {

    let postCommentData = req.body
    // コメントの投稿日時を設定
    postCommentData.timestamp = Date.now()
    //DEBUG console.log(`postCommentData : ${JSON.stringify(postCommentData)}`)
    ArticleModel.findOneAndUpdate( 
      { _id : req.params.id }, 
      {$push: {comments: postCommentData}, 
      $inc: {countComments:1}}, 
      (err, result) =>{
        if(!err){
          res.send(result)
        } else {
          console.log(err)
          return res.status(500).send('post comment faild.')
        }
      }
    )
  },

  /**
   *
   * 「いいね(votes)」の回数をカウントアップする
   *
   */
  doVoteById : (req, res, next) => {

    //DEBUG console.log("vote req.body:" + JSON.stringify(req.body))
    //DEBUG console.log("vote req.rawHeaders:" + JSON.stringify(req.rawHeaders))
      
    ArticleModel.findOneAndUpdate( 
      { _id : req.params.id }, 
      {$inc: {votes : 1}}, 
      (err, result) =>{
        if(!err){
          res.send(result)
        } else {
          console.log(err)
            return res.status(500).send('vote  by id faild.')
        }
      }
    )
  },
}


