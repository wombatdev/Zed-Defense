var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var UserSchema = mongoose.Schema(
    {
    uid: String
    }
);

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

UserSchema.methods.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

mongoose.model('User', UserSchema);

var db = mongoose.connection;

db.on('error', function(err){
  console.log(err);
});
db.once('open', function() {
  console.log("Connected to MongoDB!");
});

// if(process.env.NODE_ENV == "production"){
//   mongoose.connect(process.env.MONGODB_URI);
// }else{
//   mongoose.connect("mongodb://localhost/worldofzed");
// }
mongoose.connect("mongodb://localhost/worldofzed");

module.exports = mongoose;
