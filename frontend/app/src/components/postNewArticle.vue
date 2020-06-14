/**
 *
 * 新しい記事を投稿するページvueコンポーネント
 *
 * 記事のタイトル、投稿者、タグ、本文を編集できる
 * 結果を投稿できる 
 * 
 */

<template>
  <v-form>
    <v-card>
      <v-text-field label="（タイトルを入力）" v-model="articleJson.title"></v-text-field>
      <v-text-field label="（投稿者名を入力）" v-model="articleJson.username"></v-text-field>
      <v-text-field label="（タグを入力 複数のタグは ',' で区切って入力）" v-model="tagsString"></v-text-field>
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
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn small text @click="postNewArticle" ><v-icon>mdi-send</v-icon> 投稿 </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
  
import Methods from '@/api/methods'
import {createMarkdown} from 'safe-marked'
import hljs from 'highlightjs'


export default {

  data: () => {
    return {

      // 記事データ
      articleJson : {
        document : ""
        },

      // タグデータ
      tagsString : "",

      // マークダウンパーサ
      markdown : createMarkdown(
        {
          marked: {
            highlight: function(code, lang){
              const validLanguage = hljs.getLanguage(lang) ? lang : 'plaintext'
              return hljs.highlight(validLanguage, code).value
            }
          }
        }
      ),

    }
  }, 


  
  methods: {

    // マークダウン形式からHTML形式へ変換する
    convertToHTML(text){
      return this.markdown(text)
    },

    // 記事を投稿する
    async postNewArticle(){
      
      // タグは１つ文字列から、タグ文字列のの配列へ変換する
      // ex. console.log(tagsString)  // "tag1, tag2"
      //     console.log(tagString.split(",") // ["tag1", "tag2"]  
      this.articleJson.tags = this.tagsString.split(",")

      await Methods.postArticle(this.articleJson)
      this.$router.push({path: '/'})

    }
  },
}
</script>

