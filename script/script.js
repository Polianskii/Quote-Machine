 // get set and show date and time ===========================================
 const months = [['january', 'январь'],
                ['february', 'февраль'],
                ['march', 'март'],
                ['april', 'апрель'],
                ['may', 'май'],
                ['june', 'июнь'],
                ['july', 'июль'],
                ['august', 'август'],
                ['september', 'сентябрь'],
                ['october', 'октябрь'],
                ['november', 'ноябрь'],
                ['december', 'декабрь']];

function fistZero(num) {
  return num < 10 ? '0' + num : num;
}

function showDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = months[date.getMonth()][lang()];
  const number = fistZero(date.getDate());
  const h = fistZero(date.getHours());
  const m = fistZero(date.getMinutes());
  const s = fistZero(date.getSeconds());
  $("#clock").html(`${h}:${m}:<span class="text-warning">${s}</span>`);
  $("#day").html(`${number} ${month} ${year}`);
}

showDate();

// languges =================================================================
// 0 == english, 1 == russian
function lang() {
  return $("#language").text() === 'EN' ?  0 : 1;
}

// quote machine ============================================================
let quotesStore;
let randomQuote;

function loadQuotes() {
  return $.ajax({
    headers: {
      Accept: 'application/json'
    },
    url: 'https://gist.githubusercontent.com/Polianskii/bbe50be999a93869b4be8a29e7e89f2c/raw/e681df0016ebdc71792b3ddaa955ef6c03c47388/quotes.json',
    success: function (jsonQuotes) {
      if (typeof jsonQuotes === 'string') {
        quotesStore = JSON.parse(jsonQuotes);
      }
    },
  });
}

function getRandomQuote() {
  return quotesStore.quotes[Math.floor(Math.random() * quotesStore.quotes.length)];
}

function getQuote() {
  randomQuote = getRandomQuote();

  $("#text").html(randomQuote.quote[lang()]);
  $("#author").html(randomQuote.author[lang()]);

  $('#tweet-quote').attr(
    'href',
    'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
      encodeURIComponent(`"${randomQuote.quote[lang()]}" ${randomQuote.author[lang()]}`)
  );

}

$(document).ready(function() {  
  setInterval(showDate, 1000);
  
  loadQuotes().then(() => {
    getQuote();
  });

  $("#new-quote").on('click', getQuote);

  $("#language").on("click", () => {
    if ($("#language").text() === 'EN') {
      $("#language").text("RU");
    } else {
      $("#language").text("EN");
    }
    $("#text").html(randomQuote.quote[lang()]);
    $("#author").html(randomQuote.author[lang()]);
  });
});
