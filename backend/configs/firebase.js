import admin from "firebase-admin";
import fs from "fs";

const serviceAccount = JSON.parse(
  fs.readFileSync("./serviceAccountKey.json", {
    encoding: "utf-8",
  })
);

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://academic-writes.firebasestorage.app",
});

export default firebaseApp;
