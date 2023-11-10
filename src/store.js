import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      posts: [
        {
          id: 0,
          name: "강현지",
          userImage: "https://picsum.photos/100?random=3",
          postImage: "https://picsum.photos/600?random=3",
          likes: 36,
          date: "May 15",
          liked: false,
          content: "안녕하세요 반가워요!!",
          filter: "perpetua"
        },
        {
          id: 1,
          name: "홍길동",
          userImage: "https://picsum.photos/100?random=4",
          postImage: "https://picsum.photos/600?random=4",
          likes: 20,
          date: "Apr 20",
          liked: false,
          content: "홍길동입니다",
          filter: "clarendon"
        },
        {
          id: 2,
          name: "강짱아",
          userImage: "https://picsum.photos/100?random=5",
          postImage: "https://picsum.photos/600?random=5",
          likes: 49,
          date: "Apr 4",
          liked: false,
          content: "짱아는 최고야~~",
          filter: "lofi"
        }
      ],
      lastId: 2,
      more: {},
    }
  },

  mutations: {
    toggleLike(state, id) {
      const postId = state.posts.findIndex(post => post.id === id);
      if (postId !== -1) {
        const updatedPost = { ...state.posts[postId] };
        updatedPost.liked = !updatedPost.liked;
        updatedPost.likes += updatedPost.liked ? 1 : -1;
        state.posts[postId] = updatedPost;
      }
    },

    addPost(state, post) {
      state.posts.unshift(post);
    },

    updateLastId(state, lastId) {
      state.lastId = lastId;
    },
  },

  actions: {},
});

export default store;