/**
 *
 * / (Home）ページを表示するveu コンポーネント
 *
 * 最新投稿記事を取得しリストで表示することができる
 * リストの記事をクリックすると該当記事を表示するページヘ移動できる（表示を切り替える） 
 *
 */

<template>
  <div class="home">

    <v-card v-for="a in articlesList" :key="a._id" outlined style="padding: 5px;" @click="clickRow(a)">
      <v-card-text>
        <div>
          <img src='../assets/logo.png' alt='xtechlogo' style="height: 24px; width: 24px">
         {{ a.title }}
        </div>

        <v-row justify="end">
          <v-icon small> mdi-tag </v-icon> {{ a.tags.toString() }} 
          <v-icon small> mdi-account </v-icon> by {{ a.username }}  
          <v-icon small> mdi-thumb-up </v-icon> {{ a.votes }} 
          <v-icon small> mdi-comment </v-icon> {{ a.countComments }} 
        </v-row>
      </v-card-text>
    </v-card>

  </div>
</template>

<script>

import Methods from '@/api/methods'

export default {

  name: 'home',

  data: () => {

    return {

      // 記事のリスト
      articlesList: [],

    }
  },

  created: function ()  {
    // 最新投稿記事のリストを取得する
    this.getArticlesList()
  },
    
  methods: {

    // 最新投稿記事のリストを取得する
    async getArticlesList() {
      
      this.articlesList  = await Methods.getArticleList()

    },

    // 最新投稿記事のリストの特定行をクリックしたら該当記事の表示ページへ移動する
    clickRow(item) {
      
      const selected_id = item._id
      this.$router.push({path: '/articles/' + selected_id})
      
    }

  }
}
</script>

<style>
</style>
