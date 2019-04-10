import {
  firebaseAction,
  firebaseMutations
} from 'vuexfire'

import user from '../user'

const state = () => ({
  posts: [],
  comments: [],
  users: [],
  updatePost: {
    key: null,
    title: null,
    body: null
  },
  viewPostKey: null,
  userdata: {
    firstName: null,
    lastName: null,
    age: null,
    uid: null,
    createdDateTime: null,
    updatedDateTime: null,
    bio: null,
    emailVerified: null,
    posts: null,
    comments: null,
  }
})

const getters = {
  getPosts: state => state.posts,
  getComments: state => state.comments,
  getUpdatePost: state => state.updatePost, // get post key to update post
  getViewPostKey: state => state.viewPostKey,
  getUserData: state => state.userData
}

const mutations = {
  ...firebaseMutations,

  // pushes to the states "posts" array
  addPost: (state, posts) => state.posts.push(posts),
  addComment: (state, comments) => state.comments.push(comments),

  setUserData: function (state,payload) {
    state.userData = {
      firstName: payload.firstName,
      lastName: payload.lastName,
      age: payload.age,
      updatedDateTime: payload.updatedDateTime,
      bio: payload.bio,
    }
  },
  addUserPost: (state, postID) => state.userData.posts.push(postID),
  addUserCOmment: (state, commentID ) => state.userData.comments.push(commentID),


  // expects payload with key, title, and body attributes
  setUpdatePost: function (state, payload) {
    state.updatePost = {
      key: payload.key,
      title: payload.title,
      body: payload.body
    }
  },

  setViewPostKey: (state, key) => state.viewPostKey = key
}

const actions = {
  // set vuexfire firebase reference
  setPostsRef: firebaseAction(({ bindFirebaseRef }, ref) => {
    bindFirebaseRef('posts', ref)
  }),
  setCommentsRef: firebaseAction(({ bindFirebaseRef }, ref) => {
    bindFirebaseRef('comments', ref)
  }),
  setUsersRef: firebaseAction(({ bindFirebaseRef }, ref) => {
    bindFirebaseRef('users', ref)
  }),
};

export default {
  state,
  mutations,
  getters,
  actions
}
