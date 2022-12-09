import express from "express";
import bodyParser from "body-parser";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {db, auth} from "./config.js"

const router = express.Router();
router.use(bodyParser.json());

// router.get("/", (req, res) => {
//   res.send("Hello World!");
// });

router.post("/api/login", async(req, res) => {
  let email = req.body.email
  let pass = req.body.password
  try
  {
    await signInWithEmailAndPassword(auth, email, pass)
    .then((userCredential)=>{
      console.log(userCredential.user.uid)
      res.send(userCredential.user.uid)
    })
  }
  catch(err)
  {
    console.log(err)
    req.send(err)
  }
});

router.post("/api/register", async(req, res) => {
  let email = req.body.email
  let password = req.body.password
  try
  {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
      console.log(userCredential)
      res.send(userCredential)
      console.log("berhasil")
    })
  }
  catch(err)
  {
    console.log(err)
    req.send(err)
  }
});

export default router;

router.post("/Dashboard", (req, res) => {
  try {
    var email = req.body.email;

    db.collection("Dashboard").add({
      email: email,
    });

    res.send({
      status: true,
      message: "Hello",
    }); 
  } catch (error) {
    res.send({
      status: false,
      message: "Data gagal disimpan",
    });
  }
});

router.post("/api/links", (req, res) => {
  console.log(req.body)
  try {
    var oldrlinks = req.body.oldrlinks;
    var newrlinks = req.body.newrlinks;
    var uid = req.body.uid;
    db.collection("links").add({
      oldrlinks: oldrlinks,
      newrlinks: newrlinks,
      uid: uid,
    });
    res.send({
      status: true,
      message: "Data berhasil disimpan",
    });
  } catch (error) {
    res.send({
      status: false,
      message: "Data gagal disimpan",
    });
  }
});

router.get("/api/links", async (req, res) => {
  const uid = req.query.uid
  let links = [];
  try {
      const q = query(collection(db, "links"), where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((docSnap) => {
          let data = docSnap.data();
          let id = docSnap.id;
          console.log()
          links.push({ id, ...data });
      })
      console.log(links)
      res.send(links)
  }
  catch (error) {
      console.log("udah tapi error")
      console.log(error)
      res.send(error)
  }
});