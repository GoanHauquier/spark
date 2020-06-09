import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import {db} from '../main';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    recentUsers: []
  },
  mutations: {
    setUser( state, res ) {
    //   const arr = [];
    //   if(!res) {
    //     state.user = {};
    //     return;
    //   }
    //   console.log(res);
    //   Object.keys(res).forEach((users) => {
    //     arr.push({
    //       cUserame: users.username,
    //       cBio: users.bio,
    //       cIsAdmin: users.isAdmin
    //     });

    //   })
    //   state.user = arr.slice();
    //   console.log('slice', state.user);
    // }

      if(!res) {
        state.user = {};
        return;
      }
        const {username, bio, isAdmin, picture} = res;
        state.user = {username, bio, isAdmin, picture}
    }
  },
  actions: {
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
  },
  getters: {
    user: (state) => { return state.user },
  },
  modules: {
  }
})
