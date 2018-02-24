import {
  firebaseAction
} from 'vuexfire'

const state = {
  posts: []
}

const getters = {
  getPosts: state => state.posts,
}

const mutations = {
  addPost: (state, posts) => state.posts.push(posts) // pushes to the states "posts" array
}

const actions = {
  setPostsRef: firebaseAction(({
    bindFirebaseRef
  }, {
    ref
  }) => {
    bindFirebaseRef('posts', ref)
  })
}

export default {
  state,
  mutations,
  getters,
  actions
}
