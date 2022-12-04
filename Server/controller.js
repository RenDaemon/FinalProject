import express from "express";
import bodyParser from "body-parser";

const router = express.Router();
router.use(bodyParser.json());

router.get("/", (req, res) => {
  res.send("Hello World!");
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