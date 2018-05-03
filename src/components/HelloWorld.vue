<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
        <h2 style="color: red;">count: {{ count }}</h2>
<router-link to="/count">Go to count</router-link>
<router-link to="/buildJob">buildJob</router-link>

<ul v-if="posts && posts.length" class="border">
  <div v-for="post of posts">

  
    <li v-if="!(post.Rainfall10min||
post.Rainfall1hr||
post.Rainfall3hr||
post.Rainfall6hr||
post.Rainfall12hr||
post.Rainfall24hpost.Now)">
      
      <p><strong>{{post.County}}{{post.Township}}</strong></p>
      <p>10分鐘累積雨量{{post.Rainfall10min}}</p>
<p>1小時累積雨量{{post.Rainfall1hr}}</p>
<p>3小時累積雨量{{post.Rainfall3hr}}</p>
<p>6小時累積雨量{{post.Rainfall6hr}}</p>
<p>12小時累積雨量{{post.Rainfall12hr}}</p>
<p>24小時累積雨量{{post.Rainfall24hr}}</p>
<p>日累積雨量{{post.Now}}</p>
    </li>
    </div>
  </ul>

  <ul v-if="errors && errors.length">
    <li v-for="error of errors">
      {{error.message}}
    </li>
  </ul>

  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import jsonp from "jsonp";

export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      posts: [],
      errors: []
    };
  },
  computed: mapGetters({
    count: "getCount"
  }),
  created() {
    jsonp(
      "http://opendata.epa.gov.tw/ws/Data/RainTenMin/?$format=json",
      {
        /* DATA HERE */
      },
      (err, data) => {
        if (err) {
          console.error(err.message);
        } else {
          if (data) {
            this.posts = data;
          }
        }
      }
    );

    //  jsonp(config.ajaxUrl + '路径', null, (err, data) => {
    //    if (err) {
    //      console.error(err.message);
    //    } else {
    //      if (data.list.length > 0) {
    //        data.list.map((item) => this.list.push(item))
    //        console.log(data);
    //      }
    //    }
    //  })

    // axios.get(`http://jsonplaceholder.typicode.com/posts`,{
    //       axios.get(`http://opendata.epa.gov.tw/ws/Data/RainTenMin/?$format=json`,{
    //         'Accept': 'application/json',
    // 'Content-Type': 'application/json'
    //       })
    //     .then(response => {
    //       // JSON responses are automatically parsed.
    //       this.posts = response.data
    //     })
    //     .catch(e => {
    //       this.errors.push(e)
    //     })

    // async / await version (created() becomes async created())
    //
    // try {
    //   const response = await axios.get(`http://jsonplaceholder.typicode.com/posts`)
    //   this.posts = response.data
    // } catch (e) {
    //   this.errors.push(e)
    // }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.border{
  border-width: 5px;
}

</style>
