import {
  firebaseAction
} from 'vuexfire'

import user from '../user'

const state = {
  posts: [],
  updatePostKey: null,
  updatePostTitle: null,
  updatePostBody: null
}

const getters = {
  getPosts: state => state.posts,
  getUpdatePostKey: state => state.updatePostKey, // get post key to update post
  getUpdatePostTitle: state => state.updatePostTitle,
  getUpdatePostBody: state => state.updatePostBody
}

const mutations = {
  addPost: (state, posts) => state.posts.push(posts), // pushes to the states "posts" array
  /*setUpdatePost (state, key, title, body) {
    state.updatePost.key = key;
    state.updatePost.title = title;
    state.updatePost.body = body;
  }*/

  setUpdatePostKey: (state, key) => state.updatePostKey = key,
  setUpdatePostTitle: (state, title) => state.updatePostTitle = title,
  setUpdatePostBody: (state, body) => state.updatePostBody = body

}

const actions = {
  // set vuexfire firebase reference
  setPostsRef: firebaseAction(({bindFirebaseRef }, { ref }) => {
    bindFirebaseRef('posts', ref)
  }),

};

export default {
  state,
  mutations,
  getters,
  actions
}
