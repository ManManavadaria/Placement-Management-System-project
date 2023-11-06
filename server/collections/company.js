const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  cname: {
    type: String,
    required: true
  },
  cdescription: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: Number,
    required: true
  },
  website: {
    type: String,
    required: true
  },
  adrs: {
    type: String,
    required: true
  },
  package: {
    type: String,
    required: true
  },
  mincgpa: {
    type: Number,
    required: true
  },
  position: {
    type: String,
    required: true
  }
});

const companydetails = mongoose.model('companydetails', companySchema);

// const getData = async () => {
//     try {
//         const data = await companydetails.find();
//         console.log(data);
//     }
//     catch (err) {
//         console.log(err);
//     }
// };
// getData();

module.exports = companydetails;
