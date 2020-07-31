var orderAmount = 0;
var flatFee = 0;
var mileageFee = 0;
var commissionFee = 0;
var miles = 0;
var grandTotal = 0;
document.getElementById("calculate").disabled = true;

const getAmount = (strInput) => {
  if (strInput[0] === "$") {
    strInput = strInput.slice(1);
  };
  return parseFloat(strInput);
};

$("#calculate").on({
  click: function(){
    document.getElementById("order-amount").style.backgroundColor = "rgb(255, 255, 255)";
    document.getElementById("flat-fee").style.backgroundColor = "rgb(255, 255, 255)";
    document.getElementById("rate-per-mile").style.backgroundColor = "rgb(255, 255, 255";
    orderAmount = getAmount($("#order-amount").val().trim());
    if (orderAmount > 0) {
      if (document.getElementById("flat-fee-on").checked) {
        flatFee = getAmount($("#flat-fee").val().trim());
        if (flatFee > 0) {
          document.getElementById("delivery-fee").textContent = "$" + flatFee.toFixed(2);
        } else {
          document.getElementById("flat-fee").style.backgroundColor = "rgb(255, 143, 159)";
          flatFee = 0;
        };
      };
      if (document.getElementById("per-mile-on").checked) {
        mileageFee = getAmount($("#rate-per-mile").val().trim()) * miles;
        if (mileageFee > 0) {
          document.getElementById("mileage-fee").textContent = "$" + mileageFee.toFixed(2);
        } else {
          document.getElementById("rate-per-mile").style.backgroundColor = "rgb(255, 143, 159";
          mileageFee = 0;
        };
      };
      if (document.getElementById("commission-on").checked) {
        commissionFee = ($("#commission-rate").val() / 100) * orderAmount;
        document.getElementById("commission-fee").textContent = "$" + commissionFee.toFixed(2);
      };
      grandTotal = orderAmount + flatFee + mileageFee + commissionFee;
      document.getElementById("grand-total").textContent = "$" + grandTotal.toFixed(2);
    } else {
      document.getElementById("order-amount").style.backgroundColor = "rgb(255, 143, 159)";
    };
  }
});

$("#reset").on({
  click: function(){
    // document.getElementById("customer-name").value = "";
    $("#customer-name").val("");
    document.getElementById("order-amount").value = "";
    document.getElementById("flat-fee-on").checked = false;
    document.getElementById("flat-fee").value = "";
    document.getElementById("per-mile-on").checked = false;
    document.getElementById("rate-per-mile").value = "";
    document.getElementById("commission-on").checked = false;
    document.getElementById("commission-rate").value = "";
    geocoderStart.clear();
    geocoderEnd.clear();
    document.getElementById("distance-calculated").textContent = "";
    document.getElementById("delivery-fee").textContent = "";
    document.getElementById("mileage-fee").textContent = "";
    document.getElementById("commission-fee").textContent = "";
    document.getElementById("grand-total").textContent = "";
    orderAmount = 0;
    flatFee = 0;
    mileageFee = 0;
    commissionFee = 0;
    miles = 0;
    grandTotal = 0;
    start = "";
    end = "";
    document.getElementById("calculate").disabled = true;
  }
})

// mapbox geocoder to calculate distance

// Keys and vars declaration
mapboxgl.accessToken = 'pk.eyJ1IjoiZXJpa21hcjMiLCJhIjoiY2tjemo5bXF0MDQ5dDJ4bXRzNGI1dXNpZSJ9.ViWQU5_qEYs8pXNG5fQZKg';
var start = "";
var end = "";


// Start input / geo coder
var geocoderStart = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  placeholder: "search for pickup address",
  types: 'place,postcode,locality,neighborhood,address,poi'
});
 
// Add to divs
geocoderStart.addTo('#origin-address');

// End input
var geocoderEnd = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  placeholder: "search for delivery address",
  types: 'place,postcode,locality,neighborhood,address,poi'
  });
// Add to divs
geocoderEnd.addTo('#customer-address');


// Event listener for start address
geocoderStart.on('result', function(e) {
  var lon = e.result.geometry.coordinates[0];
  var lat = e.result.geometry.coordinates[1];
  start = lon + "," + lat;
  if (start != "" && end != "") {
    calculateDistance();
  };
});

// Event listener for end address
geocoderEnd.on('result', function(e) {
  var lon = e.result.geometry.coordinates[0];
  var lat = e.result.geometry.coordinates[1];
  end =  lon + "," + lat;
  if (start != "" && end != "") {
    calculateDistance();
  };
});

// Api call that gets the distances
function calculateDistance() {
  var queryURL = "https://api.mapbox.com/directions/v5/mapbox/driving/" + start + ";" + end + "?geometries=geojson&access_token=pk.eyJ1IjoiZXJpa21hcjMiLCJhIjoiY2tjczBkdGwwMWsyczJ5bW9sOGM5ODhyNyJ9.pD90miDj9O02qnmcyUzO5Q"
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    miles = parseFloat((response.routes[0].distance * 0.000621371).toFixed(1));
    document.getElementById("distance-calculated").textContent = miles + " miles";
  });
  document.getElementById("calculate").disabled = false;
};
