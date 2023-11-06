const mongoose = require('mongoose');

const adminLoginSchema = new mongoose.Schema({
  aname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  pass: {
    type: String,
    required: true
  }
});

const alogins = mongoose.model('alogins', adminLoginSchema);

// const getData = async () => {
//     try {
//         const data = await alogins.find();
//         console.log(data);
//     }
//     catch (err) {
//         console.log(err);
//     }
// };
// getData();

module.exports = alogins;
