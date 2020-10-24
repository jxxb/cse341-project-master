const mongodb = require('mongodb');
const MongoCli = mongodb.MongoCli;

const mongoConnect = callback => {

   MongoCli.connect(
      'mongodb+srv://jxxb:C5i2ekhQPdXOWIbA@cluster0.jhggg.mongodb.net/test?retryWrites=true&w=majority'
   )
   .then(client => {
      console.log('Connected!');
      callback(client);
   })
   .catch(err => {
      console.log(err);
   });
};

module.exports = mongoConnect;