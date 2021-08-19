let state = document.querySelector("#userState")
let submitButton = document.querySelector("#submitButton")


// function myMap(){
//  let location = zipcode.value;
//  let map = new google.maps.Map(document.getElementById("map"),{
//      zoom: 4,
//      center: location
//  });
// }
  function getCoordinates(location) {
    let url = "https://api.opencagedata.com/geocode/v1/json?key=822b66b4c63e4eaeb1723f6eee78f312&q=" + location;
    
    return fetch(url).then(function(response){
      return response.json();
    }).then(function(json) {
      return json.results[0].geometry;
    });
  }

  function getNearbyPlaces(coordinates) {
    let proxy = "https://mlb-cors-anywhere.herokuapp.com/"
    let url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";

    let options = new URLSearchParams({
      key: "AIzaSyDPOU2nsIn-ni4UbMKMuP8GvfhW1eqHVPU", // API KEY - DO NOT SHARE
      radius: 16094, // how far in the map to search = 10 mile radius from your location
      keyword: "rehab center", // what you're searching for
      location: coordinates.lat + "," + coordinates.lng // "40.57,-70.54" "latitude, longitude"
    });

    return fetch(proxy + url + options).then(function (response) {
      return response.json();
    }).then(function (data) {
        
        
        for (let index = 0; index < data.results.length; index++){

            let numbering = document.createElement("h1");
            let names = document.createElement("h2");            
            let location = document.createElement("p");        
            let status = document.createElement("p");          
            let bigDiv = document.createElement("div");


            names.className = "name";
            location.className = "location";
            status.setAttribute("class", "status");
            bigDiv.setAttribute("class", "bigDiv");

            let facilitiesDiv = document.querySelector("#facilities")

            numbering =  "Facility #" + (index + 1);
            names.innerHTML = data.results[index].name
            location.innerHTML = data.results[index].vicinity
            status.innerHTML = data.results[index].business_status


            

           


            bigDiv.append(numbering);
            bigDiv.append(names);
            bigDiv.append(location);
            bigDiv.append(status);

            
            facilitiesDiv.append(bigDiv);
        }
      return data.results;
    });
  }




  submitButton.onclick = function getState(event){
    let facilities = document.querySelector("#facilities")

      facilities.innerHTML = "";


     let userState = state.value
    getCoordinates (userState).then(function (coord) {
        console.log (getNearbyPlaces(coord));
        // return getNearbyPlaces(coord)
    })

    event.preventDefault();

      };
   
  




// stateData.then(function (data){
//     // console.log(data.results[0].components.state)
//     if (data.results[0].components.state == userState){
//         // console.log( "lat", data.results[0].geometry.lat, "lng", data.results[0].geometry.lng)


//         console.log(lat, lng)



    
// //     }
// // });

    
//      event.preventDefault();
//     }

//  });