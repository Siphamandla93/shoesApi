module.exports = function(models) {


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


    var allShoes = function(req, res, next) {
        models.shoesAPI.find({},
            function(err, ofShoe) {
                if (err) {
                    return next(err);
                }
                res.json(ofShoe)
            })
    }

    var brandFunction = function(req, res, next) {
     var brand = req.params.brandname
    models.shoesAPI.find({brand:brand}, function(err, result){

     if (err) {
        console.log(err);
      }
      res.json(result)
    })


    }


    var sizeFunction = function(req, res, next) {
     var size = req.params.size
    models.shoesAPI.find({size:size}, function(err, result){

     if (err) {
        console.log(err);
      }
      res.json(result)
    })


    }


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

const Quantity = function(req, res, next) {
  var shoesQuantity = req.params.id
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


    return {
        allShoes,
        addShoes,
        brandFunction,
        sizeFunction,
        brandAndSize,
        Quantity

    }

};
