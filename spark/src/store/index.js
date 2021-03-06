import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import {db} from '../main';

Vue.use(Vuex)

// method which sets the default values
const getDefaultState = () => {
  return {
    user: {},
    recentUsers: [],
  }
}

export default new Vuex.Store({
  state: getDefaultState(),
  mutations: {
    setUser( state, res ) {
      if(!res) {
        state.user = {};
        return;
      }
        const {username, bio, isAdmin, picture, audio} = res;
        state.user = {username, bio, isAdmin, picture, audio}
    },
    // get the getDefaultState() method to set the state to default values defined there
    resetState (state) {
      Object.assign(state, getDefaultState());
    }
  },
  actions: {
    // get the user data
    fetchUserData: ({commit}) => {
      const cUser = firebase.auth().currentUser;
      const id = cUser.uid;

      // fetch user data from firestore
      db.collection('users')
      .doc(id)
      .get()
      .then(snapshot => {
        const document = snapshot.data();
        // set the userdata object to the current firestore data
        commit('setUser', document);
      })
    },
    // reset the user data
    resetCurrentState ({ commit }) {
      commit('resetState')
    },
  },
  getters: {
    user: (state) => { return state.user },
  },
  modules: {
  }
})
