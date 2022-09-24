import firebase from "firebase/compat/app"
import "firebase/compat/auth";
import "firebase/compat/firestore"

const config = firebase.initializeApp({
	apiKey: "AIzaSyCZuv6j8DVWoZmYul59_3gR6LsMMyVrIPA",
	authDomain: "fire-chat-5c6e4.firebaseapp.com",
	projectId: "fire-chat-5c6e4",
	storageBucket: "fire-chat-5c6e4.appspot.com",
	messagingSenderId: "710931570034",
	appId: "1:710931570034:web:3f41bd73d320aae5ce11eb",
	measurementId: "G-YVVPCTEN9P",
});

const auth = config.auth();
const db = config.firestore()

export { auth, db }