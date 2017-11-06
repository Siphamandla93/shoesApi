var mongoose = require('mongoose');
module.exports = function(MongoUrl){
mongoose.connect(MongoUrl);
mongoose.Promise = global.Promise

  var apiSchema = mongoose.Schema({
            color : String,
            brand : String,
            price : Number,
            size : Number,
            in_stock :Number,
            image: String
  });

// apiSchema.index({id:1}, {unique:true});
  var shoesAPI = mongoose.model('shoesAPI', apiSchema);

return {shoesAPI}
};
