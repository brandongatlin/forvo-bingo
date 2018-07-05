
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
    url: "pics/bread.png"
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

var randomPix = [];
var randomPic = "";

function populateCard() {
  console.log("pop");
  $("#game-board").empty();

  //copy pixArr
  let newPixArr = [];
  for (var i = 0; i < pixArr.length; i++) {
    newPixArr.push(pixArr[i])
  }

//get img src attribute for each pic
  newPixArr.forEach( function ( item ) {
    let url = item.url
    urlList.push( url )
    let name = item.name
  } )
  // $( ".bingo-row" ).empty();

  let id = 1;
  randomPix = []

  for ( var i = 0; i < 25; i++ ) {

    //returns random pic
    randomPic = newPixArr[ Math.floor( Math.random() * newPixArr.length ) ];

    var idx = newPixArr.indexOf( randomPic );
    newPixArr.splice( idx, 1 );

    randomPix.push( randomPic );

    var bingoPic = $( "<img>" ).attr( "src", randomPix[ i ].url ).attr( "data-id", randomPix[ i ].name ).attr( "id", id++ );
    $( bingoPic ).addClass( "bingoPix" );

    $("#game-board").append(bingoPic);
}
  forvo()
}

let randomCall;

function forvo() {
  // console.log("forvo");

  randomCall = randomPix[ Math.floor( Math.random() * randomPix.length ) ];
  let idx = randomPix.indexOf( randomCall );
  randomPix.splice( idx, 1 );

  aJax( randomCall )

} //end forvo fx


function aJax( randomCall ) {
  let key = 'a1947295bd2a7535393c3c3df3d666b0';
  let lang = "en";
  let url = 'https://apifree.forvo.com/key/' + key + '/format/json/callback/pronounce/action/word-pronunciations/word/' + encodeURI( randomCall.name ) + '/language/' + lang + "/order/rate-desc";

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
$( "#game-board" ).on( "click", ".bingoPix", function () {
  let choice = $( this ).attr( "data-id" );

  if ( choice == randomCall.name ) {
    score++
    $( "#scoreBoard" ).html( score )
    $( this ).removeClass( "wrong" );
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

let selected = [ ];
let won = 0

populateCard()

function winner() {

  alert( "winner!" );
  won++
  $( "#winBoard" ).html( won );
  $( "#start" ).append( `<button id="reset">Reset</button>` );
  reset();
}

$( document ).on( "click", "#reset", function () {
  reset();
  $("#start").empty();
} );

function reset() {
  console.log("reset");
  selected = [];

  populateCard();

  $("#start").empty();
}
