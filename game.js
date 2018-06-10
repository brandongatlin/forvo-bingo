//psuedo//
//1 - user chooses category
//2 - card populates randomly with those images I have stored in an array
//3 - each pic will have a value of its name
//4 - user clicks "start", which starts a set time0ut
//5 - a word is chosen at random and plugged in to the forvo function, which calls the word out loud
//6 - after time expires I check to see if the value of clicked == the value of word called
//7 - if so, pic square turns green, if not, the square turns red momentarily, then
//8 - another word is called and set time 0ut begins again.
//9 after 10 words are called, (or user gets 5 in a row) the game ends.

//functions i'll need
//forvo - to make api calls
//check bingo - checks if there are 5 in a row
//check game end - checks if 10 have been called
//restart - begin again
let score = 0;

//card code
let pixArr = [
  {
    name: "apple juice",
    url: "pics/apple-juice.png"
  },

  {
    name: "apple",
    url: "pics/apple.png"
  },

  {
    name: "banana",
    url: "pics/banana.png"
  },

  {
    name: "bread",
    url: "pics/bread.jpg"
  },

  {
    name: "carrots",
    url: "pics/carrots.png"
  },

  {
    name: "cheese",
    url: "pics/cheese.jpg"
  },

  {
    name: "chicken",
    url: "pics/chicken.png"
  },

  {
    name: "corn",
    url: "pics/corn.png"
  },

  {
    name: "eggs",
    url: "pics/eggs.png"
  },

  {
    name: "fish",
    url: "pics/fish.png"
  },

  {
    name: "french fries",
    url: "pics/fries.gif"
  },

  {
    name: "grapes",
    url: "pics/grapes.png"
  },

  {
    name: "ice cream",
    url: "pics/icecream.png"
  },

  {
    name: "lettuce",
    url: "pics/lettuce.png"
  },

  {
    name: "lobster",
    url: "pics/lobster.png"
  },

  {
    name: "milk",
    url: "pics/milk.png"
  },

  {
    name: "orange juice",
    url: "pics/orange-juice.png"
  },

  {
    name: "orange",
    url: "pics/orange.png"
  },

  {
    name: "potato",
    url: "pics/potato.png"
  },

  {
    name: "rice",
    url: "pics/rice.png"
  },

  {
    name: "salad",
    url: "pics/salad.png"
  },

  {
    name: "soup",
    url: "pics/soup.png"
  },

  {
    name: "tomato",
    url: "pics/tomato.png"
  },

  {
    name: "turkey",
    url: "pics/turkey.png"
  },

  {
    name: "water",
    url: "pics/water.png"
  }
];
let urlList = [];
pixArr.forEach( function ( item ) {
  let url = item.url
  urlList.push( url )
  let name = item.name
} )

var randomPix = [];
var randomPic = "";

function populateCard() {
  $( "#bingo-table" ).empty();
  let id = 1;

  for ( var i = 0; i < 25; i++ ) {

    //returns random pic
    // randomPic = urlList[Math.floor(Math.random() * urlList.length)];
    randomPic = pixArr[ Math.floor( Math.random() * pixArr.length ) ];

    var idx = pixArr.indexOf( randomPic );
    pixArr.splice( idx, 1 );

    randomPix.push( randomPic );


    var bingoPic = $( "<img>" ).attr( "src", randomPix[ i ].url ).attr( "data-id", randomPix[ i ].name ).attr( "id", id++ );
    $( bingoPic ).addClass( "bingoPix" );

    //start for loop to iterate thru pix array and populate bingo card
    if ( i <= 4 ) {
      $( "#row-1" ).append( bingoPic );
    }

    if ( ( i >= 5 ) && ( i <= 9 ) ) {
      $( "#row-2" ).append( bingoPic );
    }

    if ( ( i >= 10 ) && ( i <= 14 ) ) {
      $( "#row-3" ).append( bingoPic );
    }

    if ( ( i >= 15 ) && ( i <= 19 ) ) {
      $( "#row-4" ).append( bingoPic );
    }

    if ( ( i >= 20 ) && ( i <= 24 ) ) {
      $( "#row-5" ).append( bingoPic );
    }
  } //end of for loop1
  forvo()
}

// begin forvo code

let randomCall;

function forvo() {

  randomCall = randomPix[ Math.floor( Math.random() * randomPix.length ) ];
  let idx = randomPix.indexOf( randomCall );
  randomPix.splice( idx, 1 );

  // console.log( randomCall.name );

  // checkAnswer(randomCall)
  // setTimeout(function () {
  //   checkAnswer(randomCall)
  //   forvo()
  // }, 3000);

  // checkAnswer( randomCall )

  aJax( randomCall )

} //end forvo fx


function aJax( randomCall ) {
  let key = config.MY_KEY;
  let lang = "en";
  let url = 'http://apifree.forvo.com/key/' + key + '/format/json/callback/pronounce/action/word-pronunciations/word/' + encodeURI( randomCall.name ) + '/language/' + lang + "/order/rate-desc";

  console.log( randomCall.name );

  $.ajax( {
    url: url,
    jsonpCallback: "pronounce",
    dataType: "jsonp",
    type: "jsonp",
    success: function ( data ) {
      // console.log("forvo data is:", data);

      let name = data.items[ 0 ].word;
      let country = data.items[ 0 ].country;
      let mp3 = data.items[ 0 ].pathmp3;
      let ogg = data.items[ 0 ].pathogg;

      $( "#audio" ).html( `
      <audio autoplay>
        <source src="${ogg}" type="audio/ogg">
        <source src="${mp3}" type="audio/mpeg">
        Your browser does not support the audio element.
      </audio> ` )

      // checkAnswer( randomCall )

    },
    error: function () {
      console.log( "error" );
    }
  } ); //end ajax call
} //end aJax fx



// function checkAnswer( randomCall ) {
$( "#bingo-table" ).on( "click", ".bingoPix", function () {
  let choice = $( this ).attr( "data-id" );

  if ( choice == randomCall.name ) {
    score++
    $( "#scoreBoard" ).html( score )
    $( this ).addClass( "correct" );

    // Push clicked object ID to 'selected' array
    selected.push( $( this ).attr( 'id' ) );

    // Compare winners array to selected array for matches
    for ( var i = 0; i < possibleWinners; i++ ) {
      var cellExists = 0;

      for ( var j = 0; j < 5; j++ ) {
        if ( $.inArray( winners[ i ][ j ], selected ) > -1 ) {
          cellExists++;
        }
      }

      // If all 5 winner cells exist in selected array alert success message
      if ( cellExists == 5 ) {
        winner();
      }
    }
  } else {
    $( this ).addClass( "wrong" );
  }
  forvo()
} )
// }

const winners = [
        [ '1', '2', '3', '4', '5' ],
        [ '6', '7', '8', '9', '10' ],
        [ '11', '12', '13', '14', '15' ],
        [ '16', '17', '18', '19', '20' ],
        [ '21', '22', '23', '24', '25' ],
        [ '1', '6', '11', '16', '21' ],
        [ '2', '7', '12', '17', '22' ],
        [ '3', '8', '13', '18', '23' ],
        [ '4', '9', '14', '19', '24' ],
        [ '5', '10', '15', '20', '25' ],
        [ '1', '7', '13', '19', '25' ],
        [ '5', '9', '13', '17', '21' ]
    ];

let possibleWinners = winners.length;

let selected = [ '13' ];

populateCard()

function winner() {
  alert( "winner!" );
  let won = 0
  won++
  $( "#winBoard" ).html( won );
  populateCard();
}

// function reset() {
//   selected = [];
//   score = 0;
//   console.log( "score:", score );
//   console.log( "selected:", selected );
// }


// setTimeout(function () {
//   console.log('settime out');
//   checkAnswer(randomCall)
//   forvo()
// }, 3000);