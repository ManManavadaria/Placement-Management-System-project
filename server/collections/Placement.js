const mongoose = require('mongoose');

const updatedDriveSchema = new mongoose.Schema({
  usn: {
    type: String,
    required: true
  },
  sname: {
    type: String,
    required: true,
    unique: true
  },
  batch: {
    type: String,
    required: true
  },
  cname: {
    type: String,
    required: true
  },
  pdate: {
    type: Date,
    required: true
  },
  package: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  }
});

const updateddrives = mongoose.model('updateddrives', updatedDriveSchema);

// const getData = async () => {
//     try {
//         const data = await updateddrives.find();
//         console.log(data);
//     }
//     catch (err) {
//         console.log(err);
//     }
// };
// getData();

module.exports = updateddrives;
