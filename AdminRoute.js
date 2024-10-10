import express from "express"
import con from "../utils/db.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import multer from "multer"
import path from "path"
import { resourceLimits } from "worker_threads";
const router = express.Router();
router.post("/adminlogin", (req, res) => {
  const sql = "SELECT * from admin Where email = ? and password = ?";
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query Error" });
    if (result.length > 0) {
const email = result[0].email;
      const token = jwt.sign(
        { role: "admin", email: email, id: result[0].id },
        "jwt_secret_key",
        { expiresIn: "1d" }
  );
      res.cookie('token', token)
      return res.json({ loginStatus: true });
    } else {
        return res.json({ loginStatus: false, Error: "Invalid Email or Password" });
    }
  });

                                                                                                     
            });
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Public/Images')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({
    storage: storage 
})
//end image eupload
router.post('/add_employee',upload.single('image'), (req, res) => {
  const sql = `INSERT INTO employee 
  (name, email, password, address, salary, image, category_id) 
  VALUES (?)`;
  bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
      if (err) return res.json({ Status: false, Error: "Query Error" })
      const values = [
          req.body.name,
          req.body.email,
          hash,
          req.body.address,
          req.body.salary,
          req.file.filename,
          req.body.category_id
   
                                                                                                            
   ]
      con.query(sql, [values], (err, result) => {
          if (err) return res.json({ Status: false, Error: "Query Error" })
          return res.json({ Status: true })
      })
  })     })