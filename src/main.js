// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
// import App from './App'
// import router from './router'
import Vue from 'vue'
import App from './App'
import router from './router'
import { firestorePlugin } from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyAJKYH_mW6R1HSfn7t0R4K2jdRs_FmIEfs",
    libraries: "places" // necessary for places input
  }
});
Vue.use(firestorePlugin)
Vue.config.productionTip = false
var firebaseConfig = {
  apiKey: "AIzaSyAJKYH_mW6R1HSfn7t0R4K2jdRs_FmIEfs",
  authDomain: "vue-test-e18f9.firebaseapp.com",
  databaseURL: "https://vue-test-e18f9.firebaseio.com",
  projectId: "vue-test-e18f9",
  storageBucket: "vue-test-e18f9.appspot.com",
  messagingSenderId: "478453495417",
  appId: "1:478453495417:web:d32ab0d209d8a5094646a8",
  measurementId: "G-TBL89FC5JR"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
export const db = firebase.firestore()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
