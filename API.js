module.exports = function(models) {

//Writting a function for adding shoes
    var addShoes = function(req, res, next) {
        var moreShoes = req.body

  console.log(moreShoes);
        models.shoesAPI.create(moreShoes, function(err, mostShoes) {
            if (err) {
                return next(err)
            }
            res.json(mostShoes)
            console.log(moreShoes);
        })
    }

//Writting a function that will find all shoes from the database
    var allShoes = function(req, res, next) {
        models.shoesAPI.find({},
            function(err, ofShoe) {
                if (err) {
                    return next(err);
                }
                res.json(ofShoe)
            })
    }

//Function that will filter shoes by their brand name
    var brandFunction = function(req, res, next) {
     var brand = req.params.brandname
    models.shoesAPI.find({brand:brand}, function(err, result){

     if (err) {
        console.log(err);
      }
      res.json(result)
    })


    }

//Function that will filter shoes by their size
    var sizeFunction = function(req, res, next) {
     var size = req.params.size
    models.shoesAPI.find({size:size}, function(err, result){

     if (err) {
        console.log(err);
      }
      res.json(result)
    })


    }

//Function that will filter shoes by both size and brand
var brandAndSize = function(req, res, next){
  var brandName = req.params.brandname
  var shoeSize = req.params.size
  models.shoesAPI.find({
    brand: brandName,
    size: shoeSize
  }, function(err, results){
    if (err) {
      return next(err)
    }
    res.json(results)
  })

}
//Function that will decrement stock when a shoe is purchased
const Quantity = function(req, res, next) {
  var shoesQuantity = req.params.id

//Condition that decrement the stock when its bought to zero
  models.shoesAPI.findOne({
       _id: shoesQuantity
     }, function(err, results) {
       console.log(results);
       if (err) {
         return next()
       }else if (results.in_stock <= 1) {
         results.remove();

         res.json({
           results: 'Out of stock'
         })
       } else {

  models.shoesAPI.findOneAndUpdate({
      _id: shoesQuantity
    }, {

      $inc: {
        in_stock: -1
}
    }, {
      upSet: false
    },
    function(err, results) {
      if (err) {
        return next(err)
      }
      // console.log(results);
      res.send({
        results
      })
    })
  }
})
}


//Returning all of my Functions
    return {
        allShoes,
        addShoes,
        brandFunction,
        sizeFunction,
        brandAndSize,
        Quantity

    }

};
