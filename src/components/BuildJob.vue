<template>
  <div class="hello">
   
<router-link to="/HelloWorld">back</router-link>

        <div class="container-block">
            <div class="list-container">
                <div class="list-content">
                    <div v-for="(post,index) of posts"  v-on:click="onliClick(post.url)" class="item-content" >
{{index}}
         <p>{{post.Kind}}</p>
<p>{{post.Title}}</p>
<p>{{post.Area}}</p>
<p>{{post.Bidbond}}</p>
<p>{{post.Bidbase_Pcent}}</p>
                    </div>
                </div>
                <div class="container-loading" v-if="show_loading">
                </div>
            </div>
        </div>



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
      newPosts: [],
      errors: []
    };
  },
  computed: mapGetters({
    count: "getCount"
  }),
  created() {
    // jsonp(
    //   "http://www.taisugar.com.tw/chinese/PropertyOpenData.ashx?pid=4",
    //   {
    //     /* DATA HERE */
    //   },
    //   (err, data) => {
    //     if (err) {
    //       console.error(err.message);
    //     } else {
    //       if (data) {
    //         this.posts = data;
    //         console.log("this.posts",this.posts)
    //       }
    //     }
    //   }
    // );

    axios
      .get(`http://www.taisugar.com.tw/chinese/PropertyOpenData.ashx?pid=4`, {
        // axios.get(`http://opendata.epa.gov.tw/ws/Data/RainTenMin/?$format=json`,{
        Accept: "application/json",
        "Content-Type": "application/json"
      })
      .then(response => {
        // JSON responses are automatically parsed.
        this.posts = response.data;
        // for(let i =0;this.posts.length;i++){
        //           for(let j =;this.posts.length;i++){
          
        // }
        // }

        console.log("this.posts", this.posts);
      })
      .catch(e => {
        this.errors.push(e);
      });
  },
  methods: {
    onliClick: function(url) {
      window.open(url, "_blank");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-container {
}
.li-banner {
  position: fixed;
  top: 0px;
}
.item-content {
  display: inline-block;
  width: 250px;
  height: 280px;
  max-height: 280px;
  margin-left: 15px;
  margin-top: 15px;
  background-color: white;
  list-style: none;
  word-wrap: break-word;
  cursor: pointer;
}

.con-abs {
  position: absolute;
  width: 35px;
  height: 35px;
  left: 0px;
  top: 0px;
}
.descrip-content {
  margin-left: 17px;
  margin-right: 17px;
  padding-top: 17px;
  height: 90px;
  background-color: white;
  overflow: hidden;
  text-align: left;
}

.container-loading {
  margin: auto;
  border: 6px solid #fefefe;
  border-top: 6px solid;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;
}

.container-block {
  display: flex;
  flex: 1;
  -webkit-flex: 1;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 55px;
  text-align: left;
}

.list-container {
  display: block;
  height: 100%;
  width: 1075px;
  margin-left: auto;
  margin-right: auto;
  text-align: left;
}

.list-content {
  display: block;
  min-height: 100vh;
  width: 100%;
  margin-bottom: 10px;
  text-align: left;
}
.dlg-comfirm {
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  top: 50%;
  left: 50%;
  min-width: 340px;
  min-height: 100px;
  max-width: 600px;
  max-height: 550px;
  text-align: center;
  vertical-align: middle;
  border-radius: 5px;
  transform: translate(-50%, -50%);
}
.sta-comfirm {
  margin-top: 25px;
  margin-bottom: 20px;
  width: 150px;
  height: 35px;
}
.comfirm-msg {
  margin-top: 35px;
  flex: 1;
}

.demo-image {
  width: 100%;
  height: 100px;
  cursor: pointer;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: white;
}

.mu-icon {
  position: absolute;
  right: 0px;
  top: 0px;
  display: flex;
  width: 50px;
  align-items: center;
  justify-content: center;
}

.con-abs {
  position: absolute;
  right: 15px;
  top: 15px;
  height: 30px;
  width: 30px;
}
</style>