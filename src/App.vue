<template>
  <div class="header">
    <ul class="header-button-left">
      <li v-if="tab !== 0" @click="tab = 0">취소</li>
    </ul>
    <ul class="header-button-right">
      <li v-if="tab === 1" @click="tab++">다음</li>
      <li v-if="tab === 2" @click="publish">발행</li>
    </ul>
    <img src="./assets/logo.png" class="logo" />
  </div>

  <PostContainer
    @write="content = $event"
    :tab="tab"
    :data="posts"
    :imageUrl="imageUrl"
    :selectedFilter="selectedFilter"
  />

  <button v-if="tab === 0" @click="more" class="more-button">더보기</button>

  <div class="footer" v-if="tab === 0">
    <ul class="footer-button-plus">
      <input
        @change="upload"
        accept="image/*"
        type="file"
        id="file"
        class="inputfile"
      />
      <label for="file" class="input-plus">+</label>
    </ul>
  </div>
</template>

<script>
import PostContainer from "./components/PostContainer.vue";
import axios from "axios";
import { mapMutations, mapState } from "vuex";

export default {
  name: "App",

  components: {
    PostContainer,
  },

  data() {
    return {
      count: 0,
      tab: 0,
      imageUrl: "",
      content: "",
      selectedFilter: "",
    };
  },

  mounted() {
    this.emitter.on("fire", (res) => {
      this.selectedFilter = res;
    });
  },

  computed: {
    ...mapState(["posts", "lastId"]),
  },

  methods: {
    ...mapMutations(["addPost", "updateLastId"]),

    more() {
      axios
        .get(`https://codingapple1.github.io/vue/more${this.count}.json`)
        .then((res) => {
          res.data.id = this.lastId + 1;
          this.updateLastId(res.data.id);
          this.count++;
          this.posts.push(res.data);
        });
    },

    upload(event) {
      const files = event.target.files;
      const file = files[0];
      if (!file.type.includes("image")) {
        return alert("이미지 파일을 선택해주세요.");
      }
      this.imageUrl = URL.createObjectURL(files[0]);
      this.tab++;
    },

    publish() {
      const post = {
        id: this.lastId + 1,
        name: "강현지",
        userImage: "https://picsum.photos/100?random=3",
        postImage: this.imageUrl,
        likes: 0,
        date: "May 15",
        liked: false,
        content: this.content,
        filter: this.selectedFilter,
      };
      this.addPost(post);
      this.updateLastId(post.id);
      this.tab = 0;
    },
  },
};
</script>

<style>
body {
  margin: 0;
}
ul {
  padding: 5px;
  list-style-type: none;
}
.logo {
  width: 22px;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 13px;
}
.header {
  width: 100%;
  height: 40px;
  background-color: white;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
}
.header-button-left {
  color: #75a4ff;
  float: left;
  width: 50px;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
}
.header-button-right {
  color: #75a4ff;
  float: right;
  width: 50px;
  cursor: pointer;
  margin-top: 10px;
}
.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
}
.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  padding-top: 12px;
}
.sample-box {
  width: 100%;
  height: 600px;
  background-color: bisque;
}
.inputfile {
  display: none;
}
.input-plus {
  cursor: pointer;
}
#app {
  box-sizing: border-box;
  font-family: "consolas";
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}
.more-button {
  width: 100%;
  height: 40px;
  background-color: white;
  border: 1px solid #a5a5a5;
  cursor: pointer;
  font-size: 14px;
  color: grey;
}
</style>
