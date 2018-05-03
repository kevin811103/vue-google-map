<template>
  <div class="hello">
   <GmapMap
  :center="{lat:   loclat, lng:  loclng}"
  :zoom="15"
  map-type-id="terrain"
  style="width: 500px; height: 300px"
>
    
  <GmapMarker
    :key="index"
    
    v-for="(m, index) in markers"
    :position="m.position"
    :clickable="true"
    :draggable="true"
    @click="center=m.position"
  />
</GmapMap>
<router-link to="/helloWorld">back</router-link>

        <div class="container-block">
            <div class="list-container">
                <div class="list-content">
                    <div v-for="post of posts"  v-on:click="addressClick(post.房屋座落)" class="item-content" >
<p>土地使用分區:{{post.土地使用分區}}</p>
<p>實際用途:{{post.實際用途}}</p>
<p>建物現況:{{post.建物現況}}</p>
<p>建物面積:{{post.建物面積}}坪</p>
<p>房屋座落:{{post.房屋座落}}</p>
<p>構造:{{post.構造}}</p>
<p>price:{{post.price}}</p>
<p>每月租金:{{post.每月租金}}</p>
<p>每坪租金:{{post.每坪租金}}</p>
<p>用途限制:{{post.用途限制}}</p>
<p>租期屆滿:{{post.租期屆滿}}</p>
<!-- <p>經管單位:{{post.經管單位}}</p>
<p>縣市:{{post.縣市}}</p>
<p>總樓層數:{{post.總樓層數}}</p> -->
                    </div>
                </div>

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
  name: "Twtraffic",

  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      posts: [],
      newPosts: [],
      errors: [],
      markers: [],
      loclat:25.049437,
      loclng:121.534849,
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
      .get(`https://www.railway.gov.tw/Upload/UserFiles/%E8%87%BA%E9%90%B5%E5%B1%80%E6%88%BF%E5%9C%B0%E7%94%A2%E5%87%BA%E7%A7%9F%E6%83%85%E5%BD%A2.json`, {
        // axios.get(`http://opendata.epa.gov.tw/ws/Data/RainTenMin/?$format=json`,{
        Accept: "application/json",
        "Content-Type": "application/json"
      })
      .then(response => {
        // JSON responses are automatically parsed.
        this.posts = response.data;
        this.posts.forEach((data)=>{
          data.price=Math.floor(data.每月租金/1000).toString()+",000"
          data.每坪租金= Math.floor(data.每月租金/parseInt(data.建物面積));
        })

        console.log("this.posts", this.posts);
      })
      .catch(e => {
        this.errors.push(e);
      });
  },
  methods: {
    onliClick: function(url) {
      window.open(url, "_blank");
    },
    addressClick: function(address){
console.log("轉換前地址",address)
    let res = encodeURI(address);
    console.log("轉換後地址", res)
 axios.get(`http://maps.googleapis.com/maps/api/geocode/json?address=` +res +`&sensor=false`, {
        // axios.get(`http://opendata.epa.gov.tw/ws/Data/RainTenMin/?$format=json`,{
        Accept: "application/json",
        "Content-Type": "application/json"
      })
      .then(response => {
        // JSON responses are automatically parsed.
        // this.posts = response.data;
        // this.posts.forEach((data)=>{
        //   data.price=Math.floor(data.每月租金/1000).toString()+",000"
        //   data.每坪租金= Math.floor(data.每月租金/parseInt(data.建物面積));
        // })
        let respAddress= response.request.responseText
  

        console.log("this.response",response );
         console.log("this.respAddress", respAddress);
               let final =JSON.parse(respAddress);
        console.log("final",final);
        console.log("lat",final.results[0].geometry.location.lat)
      
        console.log("lng",final.results[0].geometry.location.lng)
        this.loclat=final.results[0].geometry.location.lat
         this.loclng=final.results[0].geometry.location.lng
        this.markers.push({
          title:"111",
           position: new google.maps.LatLng(final.results[0].geometry.location.lat,final.results[0].geometry.location.lng)
         
        })
      })
      .catch(e => {
        this.errors.push(e);
      });


    
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
  border-style: outset;
  display: inline-block;
  width: 500px;
  height: 500px;
  max-height: 500px;
  margin-left: 15px;
  margin-top: 15px;
  background-color: white;
  list-style: none;
  /* word-wrap: break-word; */
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
  border-style: groove;
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
