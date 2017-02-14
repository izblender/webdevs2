  //shoutout to mnemonicflow on github for the OAuth handling
  //Designed by Angel, Fay, Alexis, and Isaac
  function cb(data) {
    //console.log(JSON.stringify(data));
    console.log("---CALLBACK---");
    console.log(data);
    console.log("----------");
  }

  var auth = {
    //
    // Update with your auth tokens.
    //
    consumerKey: "ihPH62cxYTgoX6ecEPb6tA",
    consumerSecret: "mv5JsuZ_E1zjYkXq5DJf-crGOSU",
    accessToken: "EunW4khgr-761e4jPyo0Kv8m9D3WWVX3",
    // This example is a proof of concept, for how to use the Yelp v2 API with javascript.
    // You wouldn't actually want to expose your access token secret like this in a real application.
    accessTokenSecret: "tGW_Tfck8D44hQ3V8WeaYyPH1j4",
    serviceProvider: {
      signatureMethod: "HMAC-SHA1"
    }
  };












  var accessor = {
    consumerSecret: auth.consumerSecret,
    tokenSecret: auth.accessTokenSecret
  };


  /// dON't tOUCH

  $(document).ready(function() {

    $('.modal').modal();
    $('.materialboxed').materialbox();
    $('.slider').slider();
    
  });

  var mainData;
  var offset = 0;
  var currentTerm;
  //


  function showNearby(loc) {


    $("#main").empty();

    var terms = $('#yelpInput').val();
    currentTerm = terms;
    

    if (terms == currentTerm) {
      offset = offset + 10;
    }
    else {
      offset = 0;
    }

    console.log("ENTERED TERM" + terms);



    var ll = loc.coords.latitude + ',' + loc.coords.longitude;
    var limit = '15';

    var parameters = [];
    parameters.push(['term', terms]);
    parameters.push(['limit', limit]);
    parameters.push(['offset', offset]);
    parameters.push(['location', ll]);
    parameters.push(['callback', 'cb']);
    parameters.push(['oauth_consumer_key', auth.consumerKey]);
    parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
    parameters.push(['oauth_token', auth.accessToken]);
    parameters.push(['oauth_signature_method', 'HMAC-SHA1']);


    var message = {
      'action': 'https://api.yelp.com/v2/search',
      'method': 'GET',
      'parameters': parameters
    };

    OAuth.setTimestampAndNonce(message);
    OAuth.SignatureMethod.sign(message, accessor);

    var parameterMap = OAuth.getParameterMap(message.parameters);



    $.ajax({
        'url': message.action,
        'data': parameterMap,
        'dataType': 'jsonp',
        'jsonpCallback': 'cb',
        'cache': true
      })
      .done(function(data, textStatus, jqXHR) {
        //
        mainData = data;

        console.log("----CODE----");
      if(data.businesses.length == 0){
            alert("Nothing was found!");
            $("#loader").hide();
            return;
          }
        console.log(data.businesses[0].rating_img_url_large)

        for (var i = 0; i < 10; i++) {
          
          if(data.businesses[i].image_url){
            var imgfullUrl = data.businesses[i].image_url;
          var imgshortUrl = imgfullUrl.substring(0, imgfullUrl.lastIndexOf("/"));
          var imgUrl = imgshortUrl + "/ls.jpg";
          } else {
            var imgUrl = "unknown.png";
          }
          
          
          

          if (data.businesses[i].location.address[0] == undefined) {
            var address = 'Address Not Found';
          }
          else {
            var address = data.businesses[i].location.address[0];
          }
          var html =
            '<div class="card horizontal">' +
            '<div class="card-image">' +
            '<img src=' + imgUrl + '>' +
            '</div>' +
            '<div class="card-stacked">' +
            '<div class="card-content">' +
            '<span class="card-title">' + data.businesses[i].name + '</span>' +
            '<p>' + address + '</p>' +
            '<a href="tel:+' + data.businesses[i].phone + '">Call Them Now!</a> <br><br>' +
            '<img src="' + data.businesses[i].rating_img_url_large + '" class="responsive-img" />' +
            '<p>There are ' + data.businesses[i].review_count + ' reviews!</p>' +
            '</div>' +
            '<div class="card-action">' +
            '<a class="waves-effect waves-light btn-flat moreInfoBtn" href="#infoModal" id="' + i + '">More Info</a>' +
            '</div>' +
            '</div>' +
            '</div>';
          $('#main').append(html);

        }

        $("#loader").hide();
        $("#moreBtn").css("display", "inline-block");


      })
      .fail(function(jqXHR, textStatus, errorThrown) {
        console.log('error[' + errorThrown + '], status[' + textStatus + '], jqXHR[' + JSON.stringify(jqXHR) + ']');
        $("#loader").hide();
        $("#moreBtn").css("display", "inline-block");
      });
    //





  }
  //

  function showNearbyMore(loc) {

    var terms = $('#yelpInput').val();
    
    

    if (terms == currentTerm) {
      offset = offset + 10;
    }
    else {
      offset = 0;
      $("#main").empty();
    }

    



    var ll = loc.coords.latitude + ',' + loc.coords.longitude;
    var limit = '15';

    var parameters = [];
    parameters.push(['term', terms]);
    parameters.push(['limit', limit]);
    parameters.push(['offset', offset]);
    parameters.push(['location', ll]);
    parameters.push(['callback', 'cb']);
    parameters.push(['oauth_consumer_key', auth.consumerKey]);
    parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
    parameters.push(['oauth_token', auth.accessToken]);
    parameters.push(['oauth_signature_method', 'HMAC-SHA1']);


    var message = {
      'action': 'https://api.yelp.com/v2/search',
      'method': 'GET',
      'parameters': parameters
    };

    OAuth.setTimestampAndNonce(message);
    OAuth.SignatureMethod.sign(message, accessor);

    var parameterMap = OAuth.getParameterMap(message.parameters);



    $.ajax({
        'url': message.action,
        'data': parameterMap,
        'dataType': 'jsonp',
        'jsonpCallback': 'cb',
        'cache': true
      })
      .done(function(data, textStatus, jqXHR) {
        //
        mainData = data;

        console.log("----CODE----");
        if(data.businesses.length == 0){
            alert("Nothing was found!");
            $("#loader").hide();
            return;
          }
        console.log(data.businesses[0].rating_img_url_large)

        for (var i = 0; i < 10; i++) {
          if(data.businesses[i].image_url){
            var imgfullUrl = data.businesses[i].image_url;
          var imgshortUrl = imgfullUrl.substring(0, imgfullUrl.lastIndexOf("/"));
          var imgUrl = imgshortUrl + "/ls.jpg";
          } else {
            var imgUrl = "unknown.png";
          }

          if (data.businesses[i].location.address[0] == undefined) {
            var address = 'Address Not Found';
          }
          else {
            var address = data.businesses[i].location.address[0];
          }
          var html =
            '<div class="card horizontal">' +
            '<div class="card-image">' +
            '<img src=' + imgUrl + '>' +
            '</div>' +
            '<div class="card-stacked">' +
            '<div class="card-content">' +
            '<span class="card-title">' + data.businesses[i].name + '</span>' +
            '<p>' + address + '</p>' +
            '<a href="tel:+' + data.businesses[i].phone + '">Call Them Now!</a> <br><br>' +
            '<img src="' + data.businesses[i].rating_img_url_large + '" class="responsive-img" />' +
            '<p>There are ' + data.businesses[i].review_count + ' reviews!</p>' +
            '</div>' +
            '<div class="card-action">' +
            '<a class="waves-effect waves-light btn-flat moreInfoBtn" href="#infoModal" id="' + i + '">More Info</a>' +
            '</div>' +
            '</div>' +
            '</div>';
          $('#main').append(html);

        }

        $("#loader").hide();
        $("#moreBtn").css("display", "inline-block");


      })
      .fail(function(jqXHR, textStatus, errorThrown) {
        console.log('error[' + errorThrown + '], status[' + textStatus + '], jqXHR[' + JSON.stringify(jqXHR) + ']');
        $("#loader").hide();
        $("#moreBtn").css("display", "inline-block");
      });
    //





  }

  //

  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("Could not show places nearby since you denied the request.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("We couldn't get your position.");
        break;
      case error.TIMEOUT:
        alert("It took too long to get your location!");
        break;
      case error.UNKNOWN_ERROR:
        alert("We couldn't get your location. (Sorry!)");
        break;
    }
  }

  //

  $('#btn2').click(function() {

    searchTerm = "nearby";
    

    $("#loader").css("display", "inline-block");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showNearby, showError);
    }
    //


  });
  //

  $('#moreBtn').click(function() {


    if (searchTerm == "nearby") {


      $("#loader").css("display", "inline-block");
      if (navigator.geolocation) {


        navigator.geolocation.getCurrentPosition(showNearbyMore, showError);


      }
      else {

        alert("Your device does not support geolocation.");

        $("#loader").hide();

      }


    } else {


      

      $("#loader").css("display", "inline-block");


      var terms = $('#yelpInput').val();
      if (terms == "") {
        alert("You didn't enter anything!");
        $("#loader").hide();

        return;
      }
      
      
      
    

    if (terms == currentTerm) {
      offset = offset + 10;
    }
    else {
      offset = 0;
      $("#main").empty();
    }
      
      
      var near = 'Chicago, IL';
      var limit = '10';

      var parameters = [];
      parameters.push(['term', terms]);
      parameters.push(['offset', offset]);
      parameters.push(['limit', limit]);
      parameters.push(['location', near]);
      parameters.push(['callback', 'cb']);
      parameters.push(['oauth_consumer_key', auth.consumerKey]);
      parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
      parameters.push(['oauth_token', auth.accessToken]);
      parameters.push(['oauth_signature_method', 'HMAC-SHA1']);


      var message = {
        'action': 'https://api.yelp.com/v2/search',
        'method': 'GET',
        'parameters': parameters
      };

      OAuth.setTimestampAndNonce(message);
      OAuth.SignatureMethod.sign(message, accessor);

      var parameterMap = OAuth.getParameterMap(message.parameters);



      $.ajax({
          'url': message.action,
          'data': parameterMap,
          'dataType': 'jsonp',
          'jsonpCallback': 'cb',
          'cache': true
        })
        .done(function(data, textStatus, jqXHR) {
          //
          mainData = data;

          console.log("----CODE----");
          if(data.businesses.length == 0){
            alert("Nothing was found!");
            $("#loader").hide();
            return;
          }
          console.log(data.businesses[0].rating_img_url_large);

          for (var i = 0; i < 10; i++) {
            
            if(data.businesses[i].image_url){
            var imgfullUrl = data.businesses[i].image_url;
          var imgshortUrl = imgfullUrl.substring(0, imgfullUrl.lastIndexOf("/"));
          var imgUrl = imgshortUrl + "/ls.jpg";
          } else {
            var imgUrl = "unknown.png";
          }

            if (data.businesses[i].location.address[0] == undefined) {
              var address = 'Address Not Found';
            }
            else {
              var address = data.businesses[i].location.address[0];
            }
            var html =
              '<div class="card horizontal">' +
              '<div class="card-image">' +
              '<img src=' + imgUrl + '>' +
              '</div>' +
              '<div class="card-stacked">' +
              '<div class="card-content">' +
              '<span class="card-title">' + data.businesses[i].name + '</span>' +
              '<p>' + address + '</p>' +
              '<a href="tel:+' + data.businesses[i].phone + '">Call Them Now!</a> <br><br>' +
              '<img src="' + data.businesses[i].rating_img_url_large + '" class="responsive-img" />' +
              '<p>There are ' + data.businesses[i].review_count + ' reviews!</p>' +
              '</div>' +
              '<div class="card-action">' +
              '<a class="waves-effect waves-light btn-flat moreInfoBtn" href="#infoModal" id="' + i + '">More Info</a>' +
              '</div>' +
              '</div>' +
              '</div>';
            $('#main').append(html);

          }

          $("#loader").hide();
          $("#moreBtn").css("display", "inline-block");


        })
        .fail(function(jqXHR, textStatus, errorThrown) {
          console.log('error[' + errorThrown + '], status[' + textStatus + '], jqXHR[' + JSON.stringify(jqXHR) + ']');
          $("#loader").hide();
          $("#moreBtn").css("display", "inline-block");
        });
      //

    }



  });

  //

  $('#btn').click(function() {

    searchTerm = "normal";

    $("#main").empty();

    $("#loader").css("display", "inline-block");


    var terms = $('#yelpInput').val();
    currentTerm = terms;
    if (terms == "") {
      alert("You didn't enter anything!");
      $("#loader").hide();

      return;
    }
    var near = 'Chicago, IL';
    var limit = '10';

    var parameters = [];
    parameters.push(['term', terms]);
    parameters.push(['limit', limit]);
    parameters.push(['location', near]);
    parameters.push(['callback', 'cb']);
    parameters.push(['oauth_consumer_key', auth.consumerKey]);
    parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
    parameters.push(['oauth_token', auth.accessToken]);
    parameters.push(['oauth_signature_method', 'HMAC-SHA1']);


    var message = {
      'action': 'https://api.yelp.com/v2/search',
      'method': 'GET',
      'parameters': parameters
    };

    OAuth.setTimestampAndNonce(message);
    OAuth.SignatureMethod.sign(message, accessor);

    var parameterMap = OAuth.getParameterMap(message.parameters);



    $.ajax({
        'url': message.action,
        'data': parameterMap,
        'dataType': 'jsonp',
        'jsonpCallback': 'cb',
        'cache': true
      })
      .done(function(data, textStatus, jqXHR) {
        //
        mainData = data;
        

        console.log("----CODE----");
        if(data.businesses.length == 0){
            alert("Nothing was found!");
            $("#loader").hide();
            return;
          }
        console.log(data.businesses[0].rating_img_url_large)

        for (var i = 0; i < 10; i++) {
          if(data.businesses[i].image_url){
            var imgfullUrl = data.businesses[i].image_url;
          var imgshortUrl = imgfullUrl.substring(0, imgfullUrl.lastIndexOf("/"));
          var imgUrl = imgshortUrl + "/ls.jpg";
          } else {
            var imgUrl = "unknown.png";
          }
          

          if (data.businesses[i].location.address[0] == undefined) {
            var address = 'Address Not Found';
          }
          else {
            var address = data.businesses[i].location.address[0];
          }
          var html =
            '<div class="card horizontal">' +
            '<div class="card-image">' +
            '<img src=' + imgUrl + '>' +
            '</div>' +
            '<div class="card-stacked">' +
            '<div class="card-content">' +
            '<span class="card-title">' + data.businesses[i].name + '</span>' +
            '<p>' + address + '</p>' +
            '<a href="tel:+' + data.businesses[i].phone + '">Call Them Now!</a> <br><br>' +
            '<img src="' + data.businesses[i].rating_img_url_large + '" class="responsive-img" />' +
            '<p>There are ' + data.businesses[i].review_count + ' reviews!</p>' +
            '</div>' +
            '<div class="card-action">' +
            '<a class="waves-effect waves-light btn-flat moreInfoBtn" href="#infoModal" id="' + i + '">More Info</a>' +
            '</div>' +
            '</div>' +
            '</div>';
          $('#main').append(html);

        }

        $("#loader").hide();
        $("#moreBtn").css("display", "inline-block");


      })
      .fail(function(jqXHR, textStatus, errorThrown) {
        console.log('error[' + errorThrown + '], status[' + textStatus + '], jqXHR[' + JSON.stringify(jqXHR) + ']');
        $("#loader").hide();
        $("#moreBtn").css("display", "inline-block");
      });
    //

  });

  $("body").on("click", ".moreInfoBtn", function() {

    $("#loadermap").css("display", "inline-block");


    var cardID = $(this).attr("id");
    $('#placetitle').html(mainData.businesses[cardID].name);
    $('#address').html(mainData.businesses[cardID].location.address[0])
    $('#web').attr('href', mainData.businesses[cardID].url)
    $('#placeinfo').html(mainData.businesses[cardID].snippet_text);
    $('#number').html('<a href="tel:+' + mainData.businesses[cardID].phone + '">' + mainData.businesses[cardID].display_phone + '</a>');
    $('#map').attr("src", 'https://www.google.com/maps/embed/v1/place?key=AIzaSyAPM4cd7No_UsWDbwCzTmBcuLPKgdl780Q&q=' + mainData.businesses[cardID].location.address[0] + '');

    $("#loadermap").hide();

  });
  