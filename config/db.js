const mongoose = require('mongoose');
const colors = require('colors')

const mongoDb = () => { 
   mongoose.connect(process.env.MONGO_URI , {
   useNewUrlParser: true,
   useCreateIndex:true,
   useFindAndModify:true,
   useUnifiedTopology: true
}).then(() => {
   console.log('connected to database'.cyan.bold.underline)
})
.catch((err) => {
    console.log(err);
  })
}

module.exports = mongoDb;

