const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require('bcryptjs');

const studentdetails = require("./collections/student");
const companydetails = require("./collections/company");
const updateddrives = require("./collections/Placement");
const slogins = require("./collections/SLogin");
const alogins = require("./collections/ALogin");

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + 'index.html'));

mongoose.connect("mongodb://localhost:27017/placement",{
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).
    then(() => {
        console.log("connection created");
    }).catch((err) => {
        console.log(err)
    });

const PORT = 3001;
app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


app.get("/students", async (req, res) => {
  try {
    const students = await studentdetails.find();
    res.send(students);
    // console.log(students);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.get("/companies", async (req, res) => {
  try {
    const companies = await companydetails.find();
    res.send(companies);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.get("/placements", async (req, res) => {
  try {
    const placement = await updateddrives.find();
    res.send(placement);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.post("/register", async (req, res) => {
  const { usn, pass } = req.body;

  try {
    const stdlogin = await slogins.findOne({ usn: usn });

    if (stdlogin) {
      res.send({ message: "User already exists" });
    } else {
      const newSLogin = new slogins(req.body);
      await newSLogin.save();
      res.send(newSLogin);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.post("/login", async (req, res) => {
  const usn = req.body.usn;
  const pass = req.body.pass;

  try {

    const stdlogin = await slogins.findOne({ usn: usn });
    const isPassword =await bcrypt.compare(pass,stdlogin.pass);
    console.log(stdlogin);

    if (isPassword) {
      res.send(stdlogin);
    } else {
      res.send({ message: "Wrong username/password combination" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.post("/admin", async (req, res) => {
  const { email, pass } = req.body;

  try {
    const admlogin = await alogins.findOne({ email: email, pass: pass });

    if (admlogin) {
      res.send(admlogin);
    } else {
      res.send({ message: "Wrong username/password combination" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.post("/addcompany", async (req, res) => {
  const {
    cname,
    cdescription,
    email,
    phone,
    website,
    adrs,
    package,
    mincgpa,
    position,
  } = req.body;

  try {
    const company = await companydetails.findOne({ cname: cname });

    if (company) {
      res.send({ message: "Company already exists"});
      }
    else{
      const newCompany = new companydetails({ cname,
        cdescription,
        email,
        phone,
        website,
        adrs,
        package,
        mincgpa,
        position });
      await newCompany.save();
      console.log(newCompany);
      res.send(newCompany);
    }
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });
























// const express = require("express");
// const app = express();
// const mysql = require("mysql");
// const cors = require("cors");
// const db = require("./config/db");
// //C O R S     helps in sending crossplatform information lije from frontend to backend
// app.use(cors());
// app.use(express.json());

// /////////////////////S E R V E R   P O R T SETUP///////////////
// const PORT = 3001;
// app.listen(process.env.PORT || PORT, () => {
//   console.log(`hurrayy , server running on port ${PORT}`);
// });

// //////////////////GET REQUEST TO SHOW/READ DATA FOR STUDENTS//////////////

// app.get("/students", (req, res) => {
//   db.query("SELECT * FROM studentdetails", (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(result);
//     }
//   });
// });
// //////////////////GET REQUEST TO SHOW/READ DATA FOR COMPANIES//////////////

// app.get("/companies", (req, res) => {
//   db.query("SELECT * FROM companydetails", (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(result);
//     }
//   });
// });
// //////////////////GET REQUEST TO SHOW/READ DATA FOR PLACEMENTS//////////

// app.get("/placements", (req, res) => {
//   db.query("SELECT * FROM updateddrive", (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(result);
//     }
//   });
// });
// // ***************************************************************//////////
// //////////////////ROUTE FOR REGISTERATION /////////////
// app.post("/register", (req, res) => {
//   const usn = req.body.usn;
//   const pass = req.body.pass;

//   db.query(
//     "INSERT INTO slogin (usn,pass) VALUES (?,?)",
//     [usn, pass],

//     (err, result) => {
//       if (err) {
//         console.log(err);

//         res.send({ err: err });
//         return;
//       }
//       if (result) {
//         res.send(result);
//       } else {
//         res.send({ message: "already exists" });
//       }
//     }
//   );
// });

// /////////////////////ROUTE FOR LOGIN /////////////
// app.post("/login", (req, res) => {
//   const usn = req.body.usn;
//   const pass = req.body.pass;

//   db.query(
//     "SELECT * FROM slogin WHERE usn = ? AND pass = ?",
//     [usn, pass],
//     (err, result) => {
//       if (err) {
//         res.send({ err: err });
//       }
//       if (result.length > 0) {
//         res.send(result);
//       } else {
//         res.send({ message: "Wrong username/password combination" });
//       }
//     }
//   );
// });

// /////////////////////ROUTE FOR ADMIN LOGIN /////////////
// app.post("/admin", (req, res) => {
//   const email = req.body.email;
//   const pass = req.body.pass;

//   db.query(
//     "SELECT * FROM alogin WHERE email = ? AND pass = ?",
//     [email, pass],
//     (err, result) => {
//       if (err) {
//         res.send({ err: err });
//       }
//       if (result.length > 0) {
//         res.send(result);
//       } else {
//         res.send({ message: "Wrong username/password combination" });
//       }
//     }
//   );
// });

// /////////////////////ROUTE FOR ADD COMPANIES /////////////
// app.post("/addcompany", (req, res) => {
//   const cname = req.body.cname;
//   const cdescription = req.body.cdescription;
//   const email = req.body.email;
//   const phone = req.body.phone;
//   const website = req.body.website;
//   const adrs = req.body.adrs;
//   const package = req.body.package;
//   const mincgpa = req.body.mincgpa;
//   const position = req.body.position;

//   db.query(
//     "INSERT INTO companydetails (cname,cdescription,email,phone,website,adrs,package,mincgpa,position) VALUES (?,?,?,?,?,?,?,?,?)",
//     [
//       cname,
//       cdescription,
//       email,
//       phone,
//       website,
//       adrs,
//       package,
//       mincgpa,
//       position,
//     ],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//         res.send({ err: err });
//       }
//       if (result.length > 0) {
//         res.send(result);
//       } else {
//         res.send({ message: "already exists" });
//       }
//     }
//   );
// });

// /////////////////////ROUTE FOR ADD PLACEMENTS /////////////
// app.post("/addplacement", (req, res) => {
//   const sname = req.body.sname;
//   const usn = req.body.usn;
//   const batch = req.body.batch;
//   // const cgpa = req.body.cgpa;
//   const cname = req.body.cname;
//   const pdate = req.body.pdate;
//   const package = req.body.package;
//   const position = req.body.position;

//   db.query(
//     "INSERT INTO updateddrive (sname,usn,batch,cname,pdate,package,position) VALUES (?,?,?,?,?,?,?)",
//     [sname, usn, batch, cname, pdate, package, position],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//         res.send({ err: err });
//         // res.send({ message: "Wrong username/password combination" });
//       }
//       if (result.length > 0) {
//         res.send(result);
//       } else {
//         res.send({ message: "already exists" });
//       }
//     }
//   );
// });

// /////////////////////ROUTE FOR ADD STUDENTS /////////////
// app.post("/addstudents", (req, res) => {
//   const sname = req.body.sname;
//   const usn = req.body.usn;
//   const mobile = req.body.mobile;
//   const email = req.body.email;
//   const dob = req.body.dob;
//   const branch = req.body.branch;
//   const cgpa = req.body.cgpa;

//   db.query(
//     "INSERT INTO studentdetails (sname,usn,mobile,email,dob,branch,cgpa) VALUES (?,?,?,?,?,?,?)",
//     [sname, usn, mobile, email, dob, branch, cgpa],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//         res.send({ err: err });
//         // res.send({ message: "Wrong username/password combination" });
//       }
//       if (result.length > 0) {
//         res.send(result);
//       } else {
//         res.send({ message: "already exists" });
//       }
//     }
//   );
// });
// //////////////////GET REQUEST TO SHOW/READ DATA FOR UserProfile//////////

// app.get("/profile", (req, res) => {
//   db.query(
//     "SELECT sl.usn,sd.sname,sd.mobile,sd.email,sd.dob,sd.branch,sd.cgpa FROM slogin AS sl INNER JOIN studentdetails AS sd ON sl.usn = sd.usn;",
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send(result);
//       }
//     }
//   );
// });

// //////////////////GET REQUEST TO SHOW/READ DATA FOR AdminProfile//////////

// app.get("/adminprofile", (req, res) => {
//   db.query(
//     "SELECT al.email,ad.aname,ad.phone,ad.depname FROM alogin AS al INNER JOIN admindetails AS ad ON al.email = ad.email;",
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send(result);
//       }
//     }
//   );
// });
