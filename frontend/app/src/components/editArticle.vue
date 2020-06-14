/**
 *
 * 記事を編集するためのページvueコンポーネント
 * 
 *
 */

<template>
  <v-form>
    <v-text-field label="title" v-model="articleJson.title"></v-text-field>
    <v-text-field label="tags" v-model="articleJson.tags"></v-text-field>
    <v-tabs>
      <v-tab> edit
      </v-tab>
      <v-tab> preview
      </v-tab>
      <v-tab-item>
        <v-textarea v-model="articleJson.document">
        </v-textarea>
      </v-tab-item>
      <v-tab-item>
        <v-div v-html="convertToHTML(articleJson.document)">
        </v-div>
      </v-tab-item>
    </v-tabs>
    <v-card>
      <v-card-subtitle> 
        author: {{ articleJson.username }} | 
      </v-card-subtitle>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn small text @click="putArticle"> <v-icon>mdi-send</v-icon>編集結果を投稿 </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
  
import Methods from '@/api/methods'
import {createMarkdown} from 'safe-marked'
import hljs from 'highlightjs'


export default {
  
  // 編集する記事のid 
  props: ['id'],

  data: () => {
    return {

      // 編集する記事のデータ
      articleJson : {},

      //
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
    // 編集する記事を取得
    this.getArticleById()
  },
  
  methods: {

    // 記事データを取得する
    async getArticleById(){
      this.articleJson = await Methods.getArticleById(this.id)
    },
    
    // マークダウン形式からHTML形式へ変換する
    convertToHTML(text){
      return this.markdown(text)
    },

    // 編集した記事を投稿する
    async putArticle(){

      let putData = { document : this.articleJson.document , title: this.articleJson.title, tags: this.articleJson.tags}
      await Methods.putArticleById(this.id, putData)
      this.$router.push({path : '/'})

    },
  },
}
</script>

