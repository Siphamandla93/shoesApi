$(function() {

            var tamplate = document.getElementById('myTamplate').innerHTML;
            var tamplate2 = Handlebars.compile(tamplate);
            var sizeFilter = Handlebars.compile(Selectsize);
            var shoeTamplate = document.querySelector('.shoeDisplay');
            //Calling my text field for adding stock
            var colorOfShoe = document.getElementById('shoeColor');
            var shoeSize = document.getElementById('Size');
            var newStock = document.getElementById('Stock');
            var shoePrice = document.getElementById('Price');
            var shoeBrand = document.getElementById('Brand');
            var submitButton = document.getElementById('submitBtn');
            var addingImage = document.getElementById('Image');
            var dropdown = document.getElementById('SelectShoes');
            var Sizedropdown = document.getElementById('Sizedropdown');
            var addingStock = document.getElementById('addstock');
            var


            $.ajax({
                type: 'GET',
                url: '/api/shoes',
                dataType: 'json',
                success: function(showShoes) {
                    shoeTamplate.innerHTML = tamplate2({
                        shoes: showShoes
                    })
                    console.log(showShoes);
                },
                error: function(jqXHR) {
                    alert(jqXHR.status)
                }
            })


            var addindNewStock = function(footWear) {
                $.ajax({
                    type: 'POST',
                    url: '/api/shoes',
                    data: footWear,
                    success: function(shoeData) {
                        shoeTamplate.innerHTML = tamplate2({
                            shoes: shoeData
                        })
                        console.log(shoeData);
                    },

                })
            }

            submitButton.addEventListener("click", function(){
              var addShoes = {
                color: colorOfShoe.value,
                brand: shoeBrand.value,
                price: shoePrice.value,
                size: shoeSize.value,
                in_stock: newStock.value,
                // image: addingImage.value
              }

              addindNewStock(addShoes);

              var buyByBrandName = function(brands){
                $.ajax({
                  type: 'GET'
                  url:  '/api/shoes/size/:size',
                  dataType: 'json',
                  success: function(allBrands){
                    shoeTamplate.innerHTML = tamplate2({
                      shoes: allBrands
                    })
                  }
                  error: function(jqXHR) {
                      alert(jqXHR.status)
                  }
                })
              }


            });
});
