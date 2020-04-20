import firebase from "firebase";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAhFir9clctJKd3eVQGfUZcU5tvWcT8VsY",
  authDomain: "familybuyapp.firebaseapp.com",
  databaseURL: "https://familybuyapp.firebaseio.com",
  projectId: "familybuyapp",
  storageBucket: "familybuyapp.appspot.com",
  messagingSenderId: "1038771127268",
  appId: "1:1038771127268:web:1adc9db41bc19d12e1fdf1",
};

class Fire {
  constructor(callback) {
    this.init(callback);
  }

  init(callback) {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        callback(null, user);
      } else {
        firebase
          .auth()
          .signInAnonymously()
          .catch((error) => {
            callback(error);
          });
      }
    });
  }

  getLists(callback) {
    let ref = firebase
      .firestore()
      .collection("users")
      .doc(this.userId)
      .collection("lists");

      this.unsubstribe = ref.onSnapshot(snapshot => {
          lists = []

          snapshot.forEach(doc => {
              lists.push({id: doc.id, ...doc.data()})
          })

          callback(lists);
      })
  }

  get userId() {
    return firebase.auth().currentUser.uid;
  }

  detach(){
      this.unsubstribe();
  }
}

export default Fire;
