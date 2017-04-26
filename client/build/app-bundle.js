/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ function(module, exports) {

var Utils = function(){

}

Utils.prototype.formatDistance = function (distance) {
    result = Math.round(distance)
    if (result < 1000) {
        return result + "m"
    } else { 
        result /= 1000
        return result.toFixed(1) + "km"
    }
}

module.exports = Utils;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

var Business = __webpack_require__ (6)

var Businesses = function (mapWrapper) {
    this.mapWrapper = mapWrapper 
    this.businesses = []
    this.done = null
}

Businesses.prototype = {
    populate: function (latLng) {
        var request = new XMLHttpRequest()

        // new
        request.open("POST", "http://localhost:3000/api/businesses")
        request.setRequestHeader("Content-Type", "application/json")
        request.onload = function () {
            if (request.status !== 200) return
            var jsonString = request.responseText
            var yelpBusinesses = JSON.parse(jsonString).businesses
            this.businesses = yelpBusinesses.map(function(business) {
                return new Business(business, this.mapWrapper)
            }.bind(this))
            this.done(this.businesses)
        }.bind(this)
        var payload = JSON.stringify({
            term: "burrito",
            locale: "en_GB",
            latitude: latLng.lat,
            longitude: latLng.lng,
            limit: 50
        })
        request.send(payload)
    }
}

module.exports = Businesses

/***/ },
/* 3 */,
/* 4 */
/***/ function(module, exports) {

throw new Error("Module parse failed: /Users/user/OneDrive/codeclan/week12/edinburrito/client/src/views/business_list_view.js Unexpected token (108:34)\nYou may need an appropriate loader to handle this file type.\n| \n|     var priceTd = document.createElement(\"td\")\n|     priceTd.classList.add(\"price\")x\n|     if (business.details.price) {\n|         priceTd.innerHTML = '<p class=\"boxed\">' + business.details.price + '</p>'");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

var BusinessDetailView = __webpack_require__(14);

var MapWrapper = function(container, coords, zoom){
  this.currentlyOpenInfoWindow = null
  this.markers = []
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom
  });
  this.directionsDisplay = new google.maps.DirectionsRenderer;
  this.directionsService = new google.maps.DirectionsService;
  this.directionsDisplay.setMap(this.googleMap);
}

MapWrapper.prototype = {

  calculateAndDisplayRoute: function(directionsService, directionsDisplay,origin, destination, selectedMode) {
         // var selectedMode = document.getElementById('#mode').value;
         directionsService.route({
           origin: origin,  // Haight.
           destination: destination,  // Ocean Beach.
           travelMode: google.maps.TravelMode[selectedMode]
         }, function(response, status) {
           if (status == 'OK') {
             directionsDisplay.setDirections(response);
           } // no route will be shown if no available results (ZERO_RESULTS etc)
         });
       },

  addMarker: function (coords) {
    var marker = new google.maps.Marker({
      position: coords,
      map: this.googleMap,
      animation: google.maps.Animation.DROP,
      icon: '/images/burrito.png' 
    });
    this.markers.push(marker)
    return marker;
  },

  addMyLocationMarker: function (coords) {
    var marker = new google.maps.Marker({
      position: coords,
      map: this.googleMap,
      animation: google.maps.Animation.DROP,
      icon: '/images/minion.png'
    })
    this.markers.push(marker)
    return marker
  },

   removeMarkers: function(){
      for(i=0; i< this.markers.length; i++){
          this.markers[i].setMap(null);
      }
  },

  addClickEvent: function(){
    google.maps.event.addListener(this.googleMap, 'click', function(event){
      var position = { lat: event.latLng.lat(), lng: event.latLng.lng() }  
      this.addMarker(position);
    }.bind(this));
  },


  addInfoWindow: function(business, marker) {
    // var marker = this.addMarker(coords);
    detailsView = new BusinessDetailView(business);
    content = detailsView.createDetailView()

    var infoWindow = new google.maps.InfoWindow();
    infoWindow.setContent(content);
      // infoWindow.open(this.map, marker);
     return infoWindow
   },

   openInfoWindow: function (business) {
     if (this.currentlyOpenInfoWindow) this.currentlyOpenInfoWindow.close()
     business.openInfoWindow()
     this.currentlyOpenInfoWindow = business.infoWindow
    },

    reposition: function(coords) {
        this.removeMarkers()
        this.googleMap.setCenter(coords);
        this.googleMap.setZoom(16);
        this.addMyLocationMarker(coords)
       
    }

}

module.exports = MapWrapper 

/***/ },
/* 6 */
/***/ function(module, exports) {

var Business = function(details, mapWrapper){
  this.mapWrapper = mapWrapper
  this.coords = { lat: details.coordinates.latitude, lng: details.coordinates.longitude }
  this.details = details
  this.moreDetails = null;
  this.marker = mapWrapper.addMarker(this.coords)
  this.infoWindow = mapWrapper.addInfoWindow(this, this.marker)
  this.marker.addListener("click", function() {
  this.mapWrapper.openInfoWindow(this)
  }.bind(this))

}

Business.prototype.openInfoWindow = function () {
  this.infoWindow.open(this.mapWrapper, this.marker)
},


Business.prototype.getMoreDetails = function (callback) {
    if (!this.moreDetails){
    var request = new XMLHttpRequest();
    request.open("GET", "http://localhost:3000/api/businesses/"+ this.details.id);
    request.onload = function(){
        if ( request.status !== 200 ) return 
            var jsonString = request.responseText
            var businessDetails = JSON.parse(jsonString)
            this.moreDetails = businessDetails;
            callback()
    }.bind(this)
    request.send()
  }
}

module.exports = Business

/***/ },
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/***/ function(module, exports, __webpack_require__) {

var MapWrapper = __webpack_require__(5)
var BusinessListView = __webpack_require__(4)
var Businesses = __webpack_require__(2)
var map
var marker

var initialize = function () {
    var mapDiv = document.querySelector("#map")
    var defaultLocation = { lat: 55.953291, lng: -3.200000 } // Edinburgh (George St)
    var mainMap = new MapWrapper(mapDiv, defaultLocation, 15)
    var body = document.querySelector("body")
    var calculateAndDisplayRoute = document.querySelector('#floating-panel')
    
    var showCredits = function () {
        flexContainer.style.opacity = 0.3
        creditsPopup.style.display = "block"
        credits.onclick = hideCredits
        body.onmouseup = hideCredits // a click anywhere will hide the popup
    }

    var hideCredits = function () {
        flexContainer.style.opacity = 1
        creditsPopup.style.display = "none"
        credits.onclick = showCredits
        body.onmouseup = null
    }

    var flexContainer = document.querySelector("#flex-container")
    var creditsPopup = document.querySelector("#credits-popup")
    creditsPopup.onclick = hideCredits
    var credits = document.querySelector("#credits-text")
    credits.onclick = showCredits

    var search = document.querySelector('#location')
    search.onkeydown = function (e) {
        if (e.keyCode === 13) {        // 13 = Enter
            searchAddress(this.value)
        }
    }

    function redraw(coords) {
        businessListView.currentLocation = coords
        mainMap.reposition(coords)
        businesses.populate(coords)
    }

    function searchAddress(searchString) {
        var geocoder = new google.maps.Geocoder()
        geocoder.geocode({ address: searchString }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var coords = {
                    lat: results[0].geometry.location.lat(),
                    lng: results[0].geometry.location.lng()
                }
                redraw(coords)
            }
        })
    }

    var whereAmI = document.querySelector('#my-location')
    var van = document.querySelector("#van")
    // must reset the animation once it's completed, otherwise cannot be retriggered
    van.addEventListener("animationend", function () { van.style.animation = "" })
    whereAmI.onclick = function () {
        van.style.animation = "van-progress 5s ease-in 0s 1"
        navigator.geolocation.getCurrentPosition(function (position) {
            var coords = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
            redraw(coords)
        })
    }



    var businesses = new Businesses(mainMap)    // getting the burrito data
    var list = document.querySelector("#business-list")  // setup views
    var businessListView = new BusinessListView(list, mainMap)
    businesses.done = businessListView.render.bind(businessListView)  //set callback for request
    businesses.populate(defaultLocation)        // get data from server
}

window.onload = initialize

/***/ },
/* 13 */,
/* 14 */
/***/ function(module, exports, __webpack_require__) {

var Utils = __webpack_require__(1)
var utils = new Utils()

var BusinessDetailView = function (business) {
    this.business = business
    this.details = business.details
}

BusinessDetailView.prototype.createDetailView = function () {
    var div = document.createElement('div')
    div.classList.add('info-window')

    var name = document.createElement('p')
    name.classList.add('name') 
    name.classList.add('underline')
    name.innerText = this.details.name
    div.appendChild(name)

    var address = document.createElement('p')
    address.innerText = this.details.location.address1
    div.appendChild(address)

    if (this.details.image_url) {
        var imageDiv = document.createElement('div')
        imageDiv.id = "image-div"
    
        var image = document.createElement('img')
        image.id = "business-image"
        imageDiv.appendChild(image)
        image.src = this.details.image_url
        div.appendChild(imageDiv)
    }

    var detailsDiv = document.createElement('div')
    detailsDiv.style.display = "flex"
    detailsDiv.style.flexDirection = "row"
    detailsDiv.style.verticalAlign = "middle"

    if (this.details.price) {
        var price = document.createElement('p')
        price.innerText = this.details.price
        price.classList.add("boxed")
        detailsDiv.appendChild(price)
    }
  
    var rating = document.createElement('p')
    rating.innerHTML = this.details.rating + "&#8201;&#9733;"
    rating.classList.add("boxed")
    detailsDiv.appendChild(rating)

    var distance = document.createElement('p')
    distance.innerText = utils.formatDistance(this.details.distance)
    detailsDiv.appendChild(distance)

    div.appendChild(detailsDiv)

  
    var telephone = document.createElement('p')
    if (this.details.display_phone !== "" && this.details.display_phone) {
        telephone.innerText = "Phone: " + this.details.display_phone
        div.appendChild(telephone)
    }

    var moreInfo = document.createElement('p')
    moreInfo.id = "more-info"
    moreInfo.innerText = 'See opening hours...'
    div.appendChild(moreInfo)

    moreInfo.addEventListener('click', function () {
        this.business.getMoreDetails(function () {
            // create the expanded view in here
            this.createMoreInfoView(div)
        }.bind(this))
    }.bind(this))

    return div
} 

BusinessDetailView.prototype.createMoreInfoView = function (div) {
    div = document.querySelector(".info-window")
    moreInfo = document.querySelector("#more-info")
    if (this.business.moreDetails.hours) {
        div.removeChild(moreInfo)
        var open = document.createElement('p')
        if (this.business.moreDetails.hours["0"].is_open_now) {
            open.innerText = "currently open"
            open.classList.add("currently-open")
        } else {
            open.innerText = "currently closed"
            open.classList.add("currently-closed")
        }
        div.appendChild(open)

        var daysMap = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

        var table = document.createElement('table')
        table.id = "opening-hours-table"

        var days = this.business.moreDetails.hours["0"].open 
            for (i = 0; i < days.length; i++) {
                var tr = document.createElement('tr')
                tr.classList.add('openingHoursTableRows')

                var dayTd = document.createElement('td')
                dayTd.innerText = daysMap[days[i].day]
                dayTd.classList.add("day-column")
                tr.appendChild(dayTd)

                var startTd = document.createElement('td')
                startTd.innerText = days[i].start
                tr.appendChild(startTd)

                var toTd = document.createElement('td')
                toTd.innerHTML = "&ndash;"
                tr.appendChild(toTd)

                var endTd = document.createElement('td')
                endTd.innerText = days[i].end
                tr.appendChild(endTd)
            
                table.appendChild(tr)
            }
            div.appendChild(table)
        } else {
            // var noHours = document.createElement('p')
            // div.appendChild(noHours)
            moreInfo.innerText = "Sorry, no information available :("
        }
}

module.exports = BusinessDetailView

/***/ }
/******/ ]);
//# sourceMappingURL=app-bundle.js.map