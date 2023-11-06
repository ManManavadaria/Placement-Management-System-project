const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  stid: {
    type: Number,
    required: true
  },
  sname: {
    type: String,
    required: true
  },
  usn: {
    type: String,
    required: true
  },
  mobile: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  branch: {
    type: String,
    required: true
  },
  cgpa: {
    type: Number,
    required: true
  }
});

const studentdetails = mongoose.model('studentdetails', studentSchema);

// const getData = async () => {
//     try {
//         const data = await studentdetails.find();
//         console.log(data);
//     }
//     catch (err) {
//         console.log(err);
//     }
// };
// getData();

module.exports = studentdetails;
