$(function() {
    var allShoesTamplate = document.getElementById('shoeTamplate').innerHTML;
    var compilingTamplate = Handlebars.compile(allShoesTamplate);
    var View = document.querySelector('#displayArea');
    //referencing add button
    var submitButton = document.getElementById('submitBtn');
    var refresh = document.getElementById('refresh');
    //referencing my textfields from html
    var priceField = document.querySelector('.priceInput');
    var brandField = document.querySelector('.brandInput');
    var colorField = document.querySelector('.colorInput');
    var sizeField = document.querySelector('.sizeInput');
    var imageField = document.querySelector('.imageInput');
    var addstockField = document.querySelector('.addStockInput');
    //filtering by size and brand
    var getingShoesBySize = document.querySelector('.filterSize');
    var getingShoesByBrand = document.querySelector('.filterBrand');
    //filter button
    var showOnlyBrand = document.querySelector('.showFilteredBrand');




    //calling get shoes function using Ajax
    function showStock() {
        $.ajax({
            type: 'GET',
            url: '/api/shoes',
            dataType: 'json',
            success: function(showShoes) {
                console.log(showShoes);
                View.innerHTML = compilingTamplate({
                    shoes: showShoes
                })

            },
            error: function(jqXHR) {
                alert(jqXHR.status)
            }
        })
    };
    //show all the stock
    showStock();

     submitButton.addEventListener("click", function() {
      //Avoiding to add empty object when the Fields are empty
        if (colorField.value !== "" || brandField.value !== "" || priceField.value !== "" || sizeField.value !== "" || addstockField.value !== "" || imageField.value !== "") {

            var addShoes = {
                color: colorField.value,
                brand: brandField.value,
                price: Number(priceField.value),
                size: Number(sizeField.value),
                in_stock: Number(addstockField.value),
                image: imageField.value
            }
            $.ajax({
              type: 'POST',
              url: '/api/shoes',
              data: addShoes,
              success: function(shoeData) {
                showStock();
              }

            })
        }

        window.location.reload();
    })



    refresh.addEventListener("click", function() {

        $.ajax({
            type: 'GET',
            url: '/api/shoes',
            dataType: 'json',
            success: function(showShoes) {
                console.log(showShoes);
                View.innerHTML = compilingTamplate({
                    shoes: showShoes
                })

            },
            error: function(jqXHR) {
                alert(jqXHR.status)
            }
        })
    })

//filtering ajax call
    var fil = document.querySelector("#filter");

    fil.addEventListener("click", function() {
        // console.log('click');
        var brandName = getingShoesByBrand.value
        $.ajax({
            type: 'GET',
            url: '/api/shoes/brand/' + brandName,
            dataType: 'json',
            success: function(showBrand) {
                //  console.log(showShoes);
                View.innerHTML = compilingTamplate({
                    shoes: showBrand
                })

            },
            error: function(jqXHR) {
                alert(jqXHR.status)
            }
        })

    })


//Filter using only Brand Ajax call
    var showOnlyBrand = document.querySelector('#filtered');
    showOnlyBrand.addEventListener("click", function() {
        console.log('click');
        var sizeFilter = getingShoesBySize.value
        $.ajax({
            type: 'GET',
            url: '/api/shoes/size/' + sizeFilter,
            dataType: 'json',
            success: function(showSize) {
                //  console.log(showShoes);
                View.innerHTML = compilingTamplate({
                    shoes: showSize
                })

            },
            error: function(jqXHR) {

            }
        })

    })

    var Bought = document.querySelector("#buyBtn");



})

//Calling the decrementing of stock function when a shoe is bought
var allShoesTamplate = document.getElementById('shoeTamplate').innerHTML;
var compilingTamplate = Handlebars.compile(allShoesTamplate);
var View = document.querySelector('#displayArea');

function sold(id) {
    // alert("Its working"+id)
    console.log(id);
    $.ajax({
        type: 'POST',
        url: '/api/shoes/sold/' + id,
        dataType: 'json',
        success: function(decreaseStock) {
            //  console.log(showShoes);
            View.innerHTML = compilingTamplate({
                shoes: decreaseStock
            })

        },
        error: function(jqXHR) {
            // alert(jqXHR.status)
        }
    })
}
