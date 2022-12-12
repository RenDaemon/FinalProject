import express from "express";
import bodyParser from "body-parser";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "./config.js"
import { getDocs, collection, query, where, addDoc, updateDoc, doc } from "firebase/firestore";

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
router.post("/api/logout", async (req, res) => {
  try {
      await signOut(auth).then(() => {
          console.log("berhasil log out")
          res.send("berhasil log out")
      })
  }
  catch (err) {
      console.log(err)
      res.send(err)
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

router.post("/api/rlinks", (req, res) => {
  let click = 0
  console.log("test")
  console.log(req.body)
  console.log(req.body.newrlinks)
  console.log(req.body.oldrlinks)
  try { 
    var oldrlinks = req.body.oldrlinks;
    var newrlinks = req.body.newrlinks;
    var uid = req.body.uid;
    // db.collection("links").add({
    //   oldrlinks: oldrlinks,
    //   newrlinks: newrlinks,
    //   uid: uid,
    // });
    const q = addDoc(collection(db,"links"), {
      oldrlinks: oldrlinks,
      newrlinks: newrlinks,
      uid: uid,
      click: 0,
      editPages: false,
    })
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
  console.log(uid)
  console.log("mau masuk fungsi")
  try {
      console.log("masuk try catch")
      const q = query(collection(db, "links"), where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((docSnap) => {
        let data = docSnap.data();
        let id = docSnap.id;
        links.push({ id, ...data });
      })
      res.send(links)
      console.log(links)
  }
  catch (error) {
    console.log("udah tapi error")
    console.log(error)
    res.send(error)
  }
});
router.get("/api/redirectLink", async (req, res) => {
  const url = req.query.url
  const surl = url.replace("http://","")
  console.log(surl)

  let id = ''
  let click = 0
  let oldrlink = ''
  try {
      const q = query(collection(db, "links"), where("newrlinks", "==", surl));
      const querySnapshot = await getDocs(q);
      console.log("masuk try") 
      // querySnapshot.forEach((docS) => {
      //   console.log(docS.data(oldrlinks))
      //   console.log("masuk snapshhot")
      // })
      querySnapshot.forEach((docSnap) => {
        console.log("masuk foreach")
          id = docSnap.id
          if (docSnap == null || docSnap === null) {
              console.log("Cannot find associated link")
              res.send("Cannot find associated link")
          }
          else {
              console.log("uda kesini")
              const docData = docSnap.data()
              click = parseInt(docData.click)
              oldrlink = docData.oldrlinks
              res.send(oldrlink)
              console.log(oldrlink)
              console.log(id)
              updateDoc(doc(db, "links", id), {
                  click: click + 1
              })
              // console.log(click)
          }
      });
      // res.send(oldrlink)
  }
  catch (err) {
      console.log(err)
      res.send(err)
  }
});
// router.patch("/api/links/:id", (req, res) => {
//   try {
//     console.log(req.params.id)
//     db.collection("links")
//       .doc(req.params.id)
//       .update({
//         newrlinks: req.body.newrlinks,
//       })
//       .then(() => {
//         res.send({
//           status: true,
//           message: "Data berhasil diubah",
//         });
//       });
//   } catch (error) {
//     res.send({
//       status: false,
//       message: "Data gagal diubah",
//     });
//   }
// });
router.post("/api/update", async (req, res) => {
  const Updatenewrlinks = req.body.newrlinks
  const id = req.body.id
  const docRef = doc(db, "links", id)
  console.log(id,Updatenewrlinks)

  try {
      await updateDoc(docRef, {
          newrlinks: "xcn.site:5173/" + Updatenewrlinks
      })
       .then(() =>res.send({ message: "Succesfully edited" }))
  }
  catch (err) {
      console.log(err)
      res.send(err)
  }
})

router.delete("/api/links/:id", (req, res) => {
  try {
    db.collection("links")
      .doc(req.params.id)
      .delete()
      .then(() => {
        res.send({
          status: true,
          message: "Data berhasil dihapus",
        });
      });
  } catch (error) {
    res.send({
      status: false,
      message: "Data gagal dihapus",
    });
  }
});