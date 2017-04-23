var BusinessDetailView = function(business){
this.business = business;
this.details = business.details;
}

BusinessDetailView.prototype.createDetailView = function(){
  
    var div = document.createElement('div')
    div.classList.add('infoWindow');

    var nameH1 = document.createElement('p');
    nameH1.classList.add('name');
    nameH1.innerText = this.details.name;

    var address = document.createElement('p');
    address.innerText = this.details.location.address1;

    var image = document.createElement('img');
    image.classList.add("businessImage")
    if (this.details.image_url){
      image.src = this.details.image_url;
    }
    else image.innerHTML = "" 
  
  var rating = document.createElement('p');
  rating.innerText = "Rating: " + this.details.rating + "★"

  var price = document.createElement('p');
  if(this.details.price){
    price.innerText = "Price: " + this.details.price
    }
  else price.innerText = "";


  var distance = document.createElement('p');
  distance.innerText = "Distance: " + Math.floor(this.details.distance) + "m"

  
  var telephone = document.createElement('p');
  if(this.details.display_phone !== "" && this.details.display_phone){
  telephone.innerText = "Telephone: " + this.details.display_phone;
  }
  else {
    telephone.innerText = "";
  }

  var open = document.createElement('p');
  if(this.details.is_closed){
    open.innerText = "Closed"
    open.classList.add("currentlyClosed")
  }
  else {open.innerText = "Open"
    open.classList.add("currentlyOpen");
}

  var moreInfo = document.createElement('p');
  moreInfo.classList.add("moreInfo")
  moreInfo.innerText = 'See opening hours...';
  moreInfo.addEventListener('click', function(){
    this.business.getMoreDetails(function(){
      // create the expanded view in here.
      div.removeChild(moreInfo);
      this.createMoreInfoView(div)
    }.bind(this));
  }.bind(this));

  div.appendChild(nameH1);
  div.appendChild(address);
  div.appendChild(image);
  div.appendChild(rating);
  div.appendChild(price);
  div.appendChild(distance);
  div.appendChild(telephone);
  div.appendChild(open);
  div.appendChild(moreInfo);

  return div;
} 

BusinessDetailView.prototype.createMoreInfoView = function(div){

  if(this.business.moreDetails.hours){
    var daysMap = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

    var openingHoursTitle = document.createElement('p');
    openingHoursTitle.classList.add('openingHoursTitle');
    openingHoursTitle.innerText = "Opening Hours:"
    div.appendChild(openingHoursTitle);

    var days = this.business.moreDetails.hours["0"].open 
      for(i = 0; i < days.length; i++){
        var openingHours = document.createElement('p');
        openingHours.innerText = daysMap[i] + ": " + days[i].start + " to " + days[i].end;
        div.appendChild(openingHours);
      }
  }
  else {
    var noHours = document.createElement('p');
    noHours.innerText = "Sorry, no opening hours information available :(";
    noHours.classList.add('openingHoursTitle')
    div.appendChild(noHours);
  }
}


module.exports = BusinessDetailView