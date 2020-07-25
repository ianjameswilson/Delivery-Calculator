var orderAmount;

const getOrderAmount = (strInput) => {
  if (strInput[0] === "$") {
    strInput = strInput.slice(1);
  };
  return parseFloat(strInput);
};

$("#calculate").on({
  click: function(){
    orderAmount = getOrderAmount($("#order-amount").val().trim());
    console.log($("#flat-fee"));

  }
});

// mapbox geocoder to calculate distance

    // Keys and vars declaration
    mapboxgl.accessToken = 'pk.eyJ1IjoiZXJpa21hcjMiLCJhIjoiY2tjemo5bXF0MDQ5dDJ4bXRzNGI1dXNpZSJ9.ViWQU5_qEYs8pXNG5fQZKg';
    var start 
    var end 


    // Start input / geo coder
var geocoderStart = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    placeholder: "Store Address",

    types: 'place,postcode,locality,neighborhood,address,poi'
    });
 
//  Add to divs
geocoderStart.addTo('#origin-address');

// End input
var geocoderEnd = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    placeholder: "Delivery Address",
    types: 'place,postcode,locality,neighborhood,address,poi'
    });
 //  Add to divs

geocoderEnd.addTo('#customer-address');


// Event listener for start address
geocoderStart.on('result', function(e) {
    // map.getSource('single-point').setData(e.result.geometry);
    console.log(e.result.geometry.coordinates)

    var lon = e.result.geometry.coordinates[0]
    var lat = e.result.geometry.coordinates[1]

    start = lon +"," +  lat

    console.log(start)

  });

//// Event listener for end address


  geocoderEnd.on('result', function(e) {
    // map.getSource('single-point').setData(e.result.geometry);
    var lon = e.result.geometry.coordinates[0]
    var lat = e.result.geometry.coordinates[1]

    end =  lon +"," +  lat

    console.log( end)

    // Console logs the results
    calculateDistance()

    return end

  });

//   calculateDistance()

// Api call that gets the distances
function calculateDistance(){

    console.log()
    var queryURL = "https://api.mapbox.com/directions/v5/mapbox/driving/" + start + ";" + end +  "?geometries=geojson&access_token=pk.eyJ1IjoiZXJpa21hcjMiLCJhIjoiY2tjczBkdGwwMWsyczJ5bW9sOGM5ODhyNyJ9.pD90miDj9O02qnmcyUzO5Q"
    // var queryURL = "https://api.mapbox.com/directions/v5/mapbox/driving/-94.440454%2C39.226288%3B-94.267962%2C39.030479?alternatives=true&geometries=geojson&steps=true&access_token=pk.eyJ1IjoiZXJpa21hcjMiLCJhIjoiY2tjczBkdGwwMWsyczJ5bW9sOGM5ODhyNyJ9.pD90miDj9O02qnmcyUzO5Q"

    $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {

            var miles = parseFloat((response.routes[0].distance * 0.000621371).toFixed(1));

            // var minutes =Math.floor( (response.routes[0].duration/60))

            console.log(response)
            console.log(miles)

        })

};
