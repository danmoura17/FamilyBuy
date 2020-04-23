import firebase from "firebase";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAhFir9clctJKd3eVQGfUZcU5tvWcT8VsY",
    authDomain: "familybuyapp.firebaseapp.com",
    databaseURL: "https://familybuyapp.firebaseio.com",
    projectId: "familybuyapp",
    storageBucket: "familybuyapp.appspot.com",
    messagingSenderId: "1038771127268",
    appId: "1:1038771127268:web:1adc9db41bc19d12e1fdf1"
};

class Fire {
  constructor(callback) {
    this.init(callback);
  }

  init(callback) {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    firebase.auth().onAuthStateChanged(user => {
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
    let ref = this.ref.orderBy("name");

    this.unsubscribe = ref.onSnapshot((snapshot) => {
      lists = [];

      snapshot.forEach((doc) => {
        lists.push({ id: doc.id, ...doc.data() });
      });

      callback(lists);
    });
  }

  addList(list) {
    let ref = this.ref;

    ref.add(list);
  }

  updateList(list) {
    let ref = this.ref;

    ref.doc(list.id).update(list);
  }

  get userId() {
    return firebase.auth().currentUser.uid;
  }

  get ref() {
    return firebase
      .firestore()
      .collection("users")
      .doc("jIKd2A0qkccdQ26zet25yTAhGZm2")
      .collection("lists");
  }

  detach() {
    this.unsubscribe();
  }
}

export default Fire;
