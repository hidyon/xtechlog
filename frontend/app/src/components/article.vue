/**
 * /articles/:id のvueコンポーネント
 *
 * idで指定された記事とその記事へのコメントを表示することができる
 * 記事の編集を開始することができる
 * 新しいコメントを投稿することができる
 *
 */

<template>
  <v-card>

  <!-- 記事部分 -------------------------------------------------------------------------->
    <v-card>
     <v-card-title> 
       <div>
         <img src="../assets/logo.png" alt="xtechlogo" style="height: 32px; width: 32px;">
       </div>
       {{ articleJson.title }} 
     </v-card-title>

     <div style="padding: 25px;" v-html="articleDocHTML">
     </div>

     <v-card-subtitle align="right"> 
       <v-icon small>mdi-account</v-icon> by {{ articleJson.username }}   
       <v-icon small>mdi-watch</v-icon> {{ articleJson.updateDate }}  
       <v-icon small>mdi-thumb-up</v-icon>  {{ articleJson.votes }} 
       <v-icon small>mdi-glasses</v-icon> {{ articleJson.views }} 
       <v-icon small>mdi-tag</v-icon> {{ articleJson.tags }} 
     </v-card-subtitle>

     <v-card-actions >
       <v-spacer></v-spacer>
       <v-btn small text @click="putVote"><v-icon>mdi-thumb-up</v-icon>いいね</v-btn>
       <v-btn small text @click="editArticle"><v-icon>mdi-pencil</v-icon>編集</v-btn>
     </v-card-actions>

   </v-card>

 <!-- コメント部分 -------------------------------------------------------------------------->
   <div v-if="commentsVisible">
     <v-card v-for="comment in articleJson.comments" :key="comment.timestamp" style="margin: 10px 0px">
       <v-card-subtitle>
         <v-icon small> mdi-account </v-icon>
           by {{ comment.username }}
         <v-icon small> mdi-watch </v-icon>
           {{ comment.timestamp }}
       </v-card-subtitle>
       <div v-html="convertToHTML(comment.document)" style="padding: 0px 20px">
       </div>
     </v-card>
   </div>
  
 <!-- コメント投稿部分 -------------------------------------------------------------------------->
   <div> 
     <v-text-field label="コメント投稿者名" v-model="newComment.username">
     </v-text-field>
     <v-tabs>
       <v-tab> edit
       </v-tab>
       <v-tab> preview
       </v-tab>
       <v-tab-item>
         <v-textarea v-model="newComment.document">
         </v-textarea>
       </v-tab-item>
       <v-tab-item>
         <v-div v-html="convertToHTML(newComment.document)">
         </v-div>
       </v-tab-item>
     </v-tabs>
     <v-card-actions >
       <v-spacer></v-spacer>
       <v-btn small text @click="postComment"><v-icon>mdi-send</v-icon>コメントを投稿</v-btn>
     </v-card-actions>
   </div>

 </v-card>
</template>

<script>
  
import Methods from '@/api/methods'
import {createMarkdown} from 'safe-marked'
import hljs from 'highlightjs'

export default {
  
  // 記事のid 
  props: ['id'],

  data: () => {
    return {
      // 記事のデータ
      articleJson : {},


      // 記事の本文HTML形式
      articleDocHTML : "",
      
      // コメントがゼロ件の時に非表示にするためのフラグ
      commentsVisible : false,
      
      // 新しいコメント投稿用のデータ
      newComment : { document: "", documentHTML: "", username: "" },
     
      // マークダウンパーサ
      markdown : createMarkdown(
        {
          marked: {
            highlight: function(code, lang){
              const validLanguage = hljs.getLanguage(lang) ? lang : 'plaintext'
              return hljs.highlight(validLanguage, code).value
            },
            gfm: true,
          }
        }
      ),
        

    }
  }, 
  
  
  created: function(){
    // ページ作成時に記事データを取得する
    this.getArticleById()

  },
  
  methods: {

    // idで指定される記事データを取得する
    async getArticleById(){

      this.articleJson  = await Methods.getArticleById(this.id)

      // コメントがある場合はコメント表示用のフラグをtrueにする
      if(this.articleJson.comments.length > 0){
        this.commentsVisible = true
      }
      this.setArticleDocHTML()

    },

    // 記事の本文をマークダウン形式からHTML形式へ変換する
    setArticleDocHTML(){
      this.articleDocHTML = this.markdown(this.articleJson.document)
    },

    // マークダウン形式からHTML形式へ変換する
    convertToHTML(text){
      return this.markdown(text)
    },

    // いいねをする
    putVote(){
      Methods.putVoteById(this.id)
    },

    // 記事の編集を開始する
    editArticle(){
      let to = '/articles/' + this.id + '/edit'
      this.$router.push({path: to})
    },

    // 新たしいコメントを投稿する
    async postComment(){
      await Methods.postCommentById(this.id, this.newComment)
      this.$router.go({path: this.$router.currentRoute.path, force: true})
    },
  },
}
</script>
