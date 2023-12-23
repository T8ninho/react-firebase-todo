import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
	apiKey: "AIzaSyC6adysIZMsPKAZ5kmZd_UYa0t8xRPv3Oo",
	authDomain: "tarefas-e634f.firebaseapp.com",
	databaseURL: "https://tarefas-e634f-default-rtdb.firebaseio.com",
	projectId: "tarefas-e634f",
	storageBucket: "tarefas-e634f.appspot.com",
	messagingSenderId: "698156501881",
	appId: "1:698156501881:web:8c6ca854d079cf35dabda8"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db }
