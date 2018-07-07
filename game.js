let score = 0;

let pixArr;

let urlList = [];

var randomPix = [];
var randomPic = "";
let lang;

$("#submit-language").on("click", function() {
  populateCard();
})

function populateCard() {
  $("#game-board").empty();
  lang = $("#language-input").val();
  let category = $("#category-input").val();
  pixArr = eval(category);

  //copy pixArr
  let newPixArr = [];
  for (var i = 0; i < pixArr.length; i++) {
    newPixArr.push(pixArr[i])
  }

  let id = 1;
  randomPix = []

  for (var i = 0; i < 25; i++) {

    //returns random pic
    randomPic = newPixArr[Math.floor(Math.random() * newPixArr.length)];

    var idx = newPixArr.indexOf(randomPic);
    newPixArr.splice(idx, 1);

    randomPix.push(randomPic);

    // lang = $("#language-input").val().trim();

    if (lang == 'en') {
      var bingoPic = $("<img>").attr("src", randomPix[i].url).attr("data-id", randomPix[i].name).attr("id", id++);
    } else if (lang == 'es') {
      var bingoPic = $("<img>").attr("src", randomPix[i].url).attr("data-id", randomPix[i].nombre).attr("id", id++);
    } else {
      var bingoPic = $("<img>").attr("src", randomPix[i].url).attr("data-id", randomPix[i].name).attr("id", id++);
    }

    $(bingoPic).addClass("bingoPix");

    $("#game-board").append(bingoPic);
  }
  forvo()
}

let randomCall;

function forvo() {

  randomCall = randomPix[Math.floor(Math.random() * randomPix.length)];
  let idx = randomPix.indexOf(randomCall);
  randomPix.splice(idx, 1);

  aJax(randomCall);

} //end forvo fx

let called;

function aJax(randomCall) {
  let key = 'a1947295bd2a7535393c3c3df3d666b0';
  let url;

  if (lang == 'es') {
    called = randomCall.nombre;
  } else {
    called = randomCall.name;
  }

  url = 'https://apifree.forvo.com/key/' + key + '/format/json/callback/pronounce/action/word-pronunciations/word/' + encodeURI(called) + '/language/' + lang + "/order/rate-desc";

  console.log(called)
  $.ajax({
    url: url,
    jsonpCallback: "pronounce",
    dataType: "jsonp",
    type: "jsonp",
    success: function(data) {
      // console.log(data)

      let name = data.items[0].word;
      let country = data.items[0].country;
      let mp3 = data.items[0].pathmp3;
      let ogg = data.items[0].pathogg;
      let username = data.items[0].username;

      let text = `"${username} is from ${country}"`

      $("#speaker-text").html(text);

      $("#audio").html(`
      <audio autoplay>
        <source src="${ogg}" type="audio/ogg">
        <source src="${mp3}" type="audio/mpeg">
        Your browser does not support the audio element.
      </audio> `)

      // checkAnswer( randomCall )

    },
    error: function() {
      console.log("error");
    }
  }); //end ajax call
} //end aJax fx



// function checkAnswer( randomCall ) {
$("#game-board").on("click", ".bingoPix", function() {
  let choice = $(this).attr("data-id");

  if (choice == called) {
    score++
    $("#scoreBoard").html(score)
    $(this).removeClass("wrong");
    $(this).addClass("correct");

    // Push clicked object ID to 'selected' array
    selected.push($(this).attr('id'));

    // Compare winners array to selected array for matches
    for (var i = 0; i < possibleWinners; i++) {
      var cellExists = 0;

      for (var j = 0; j < 5; j++) {
        if ($.inArray(winners[i][j], selected) > -1) {
          cellExists++;
        }
      }

      // If all 5 winner cells exist in selected array alert success message
      if (cellExists == 5) {
        winner();
      }
    }
  } else {
    $(this).addClass("wrong");
  }
  forvo()
})
// }

const winners = [
  ['1', '2', '3', '4', '5'],
  ['6', '7', '8', '9', '10'],
  ['11', '12', '13', '14', '15'],
  ['16', '17', '18', '19', '20'],
  ['21', '22', '23', '24', '25'],
  ['1', '6', '11', '16', '21'],
  ['2', '7', '12', '17', '22'],
  ['3', '8', '13', '18', '23'],
  ['4', '9', '14', '19', '24'],
  ['5', '10', '15', '20', '25'],
  ['1', '7', '13', '19', '25'],
  ['5', '9', '13', '17', '21']
];

let possibleWinners = winners.length;

let selected = [];
let won = 0

function winner() {

  let modal = document.getElementById('myModal');

  // Get the <span> element that closes the modal
  let span = document.getElementsByClassName("close")[0];
  modal.style.display = "block";

  span.onclick = function() {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  won++
  $("#winBoard").html(won);
  setTimeout(function() {
    reset();
  }, 3000);
}

$(document).on("click", "#reset", function() {
  reset();
  $("#start").empty();
});

function reset() {
  selected = [];

  populateCard();

  $("#start").empty();
}








let foodsArray = [{
    name: "apple juice",
    nombre: "jugo de manzana",
    url: "pics/apple-juice.png"
  },

  {
    name: "apple",
    nombre: "manzana",
    url: "pics/apple.png"
  },

  {
    name: "banana",
    nombre: "plátano",
    url: "pics/banana.png"
  },

  {
    name: "bread",
    nombre: "pan",
    url: "pics/bread.png"
  },

  {
    name: "carrots",
    nombre: "zanahoria",
    url: "pics/carrots.png"
  },

  {
    name: "cheese",
    nombre: "queso",
    url: "pics/cheese.jpg"
  },

  {
    name: "chicken",
    nombre: "pollo",
    url: "pics/chicken.png"
  },

  {
    name: "corn",
    nombre: "maíz",
    url: "pics/corn.png"
  },

  {
    name: "eggs",
    nombre: "huevos",
    url: "pics/eggs.png"
  },

  {
    name: "fish",
    nombre: "pescado",
    url: "pics/fish.png"
  },

  {
    name: "french fries",
    nombre: "papas fritas",
    url: "pics/fries.gif"
  },

  {
    name: "grapes",
    nombre: "uva",
    url: "pics/grapes.png"
  },

  {
    name: "ice cream",
    nombre: "helado",
    url: "pics/icecream.png"
  },

  {
    name: "lettuce",
    nombre: "lechuga",
    url: "pics/lettuce.png"
  },

  {
    name: "lobster",
    nombre: "langosta",
    url: "pics/lobster.png"
  },

  {
    name: "milk",
    nombre: "leche",
    url: "pics/milk.png"
  },

  {
    name: "orange juice",
    nombre: "jugo de naranja",
    url: "pics/orange-juice.png"
  },

  {
    name: "orange",
    nombre: "naranja",
    url: "pics/orange.png"
  },

  {
    name: "potato",
    nombre: "papas",
    url: "pics/potato.png"
  },

  {
    name: "rice",
    nombre: "arroz",
    url: "pics/rice.png"
  },

  {
    name: "salad",
    nombre: "ensalada",
    url: "pics/salad.png"
  },

  {
    name: "soup",
    nombre: "sopa",
    url: "pics/soup.png"
  },

  {
    name: "tomato",
    nombre: "tomate",
    url: "pics/tomato.png"
  },

  {
    name: "turkey",
    nombre: "pavo",
    url: "pics/turkey.png"
  },

  {
    name: "water",
    nombre: "agua",
    url: "pics/water.png"
  }
];
