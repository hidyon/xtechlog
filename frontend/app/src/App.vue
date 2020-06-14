<template>
  <div id="app">
   <v-app>

    <v-main>
      <v-container fluid >
      
      <!------------- header -------------------------->
        <v-toolbar color='indigo' dark>

          <v-toolbar-items>
            <v-btn text @click="toHome">
              <v-icon small>mdi-home</v-icon>
              xtechlog
            </v-btn>
          </v-toolbar-items>

          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-divider vertical></v-divider>
            <v-btn text @click="toPostArticle"><v-icon small>mdi-pencil</v-icon> 新規 </v-btn>
          </v-toolbar-items>

        </v-toolbar >

        <div>
          <img alt="page image" src="./assets/snowcup.jpg" style="height: 150px; width: 100%; object-fit: cover;">
        </div>

      <!------------- main  -------------------------->
        <router-view></router-view>


      <!------------- footer -------------------------->
        <v-footer color='indigo' dark>
          <v-card-text class="py-2 white--text text-center">
            2020- xtech
          </v-card-text>
        </v-footer>
    
      </v-container >
    </v-main>
   </v-app>
  </div>
</template>

<script>

export default {

  name: 'App',

  data: () => ({
  }),

  methods: {

    // /へ移動
    toHome(){
      if(this.$route.path !== '/'){
        this.$router.push({name: 'home'})
      }
    },

    // /articles (新規投稿記事の作成ページ）へ移動
    toPostArticle(){
      if(this.$route.path !== '/articles/'){
        this.$router.push({path: '/articles/'})
      }
    },

    // /aboutへ移動
    toAbout(){
      if(this.$route.path !== '/about'){
        this.$router.push({name: 'about'})
      }
    },
  }

}
</script>

<style>
</style>
