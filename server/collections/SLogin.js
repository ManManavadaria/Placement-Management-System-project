const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const studentLoginSchema = new mongoose.Schema({
  usn: {
    type: String,
    required: true,
    unique: true
  },
  pass: {
    type: String,
    required: true
  }
});

studentLoginSchema.pre("save", async function(next){
   
    console.log(this.pass);
    this.pass = await bcrypt.hash(this.pass, 10);
    
  next();
})

const slogins = mongoose.model('slogins', studentLoginSchema);

// const getData = async () => {
//     try {
//         const data = await slogins.find();
//         console.log(data);
//     }
//     catch (err) {
//         console.log(err);
//     }
// };
// getData();

module.exports = slogins;
