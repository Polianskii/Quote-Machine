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

const date = new Date();

function fistZero(num) {
  return num < 10 ? '0' + num : num;
}

function showDate() {
  $("#clock").text(`${fistZero(date.getHours())}:${fistZero(date.getMinutes())}`);
  $("#seconds").text(`:${fistZero(date.getSeconds())}`);
  $("#day").text(`${fistZero(date.getDate())}`);
  $("#month").text(`${months[date.getMonth()][lang()]}`);
  $("#year").text(`${date.getFullYear()}`);
}

showDate();

// languges =================================================================
// 0 == english, 1 == russian
const content = {
  today: ["Today", "Сегодня"],
  local_time: ["Local time", "Местное время"],
  heading: ["Random Quote Machine", "Генератор случайных цитат"],
  quote: ["Quote", "Цитата"],
  new_quote: ["New quote", "Новая цитата"],
  developer: ["by Pavel Polyansky", "сделал Павел Полянский"]
}

function lang() {
  return $("#language").text() === 'EN' ?  0 : 1;
}

function changeLang() {
  if ($("#language").text() === 'EN') {
    $("#language").text("RU");
  } else {
    $("#language").text("EN");
  }
  $("#text").html(randomQuote.quote[lang()]);
  $("#author").html(randomQuote.author[lang()]);
  $("#month").text(`${months[date.getMonth()][lang()]}`);
  $("#today").text(`${content.today[lang()]}`);
  $("#local_time").text(`${content.local_time[lang()]}`);
  $("#heading").text(`${content.heading[lang()]}`);
  $("#quote").text(`${content.quote[lang()]}`);
  $("#new-quote").text(`${content.new_quote[lang()]}`);
  $("#developer").text(`${content.developer[lang()]}`);
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
  let index = quotesStore.quotes[Math.floor(Math.random() * quotesStore.quotes.length)];
  if (randomQuote === index) return getRandomQuote();
  return index;
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

  $("#quote-left").removeAttr("hidden").addClass("animate__animated animate__fadeInLeft");
  $("#quote-right").removeAttr("hidden").addClass("animate__animated animate__fadeInRight");
  $("#text").addClass("animate__animated animate__fadeInDown");
  $("#author").addClass("animate__animated animate__fadeInUp");

  setTimeout(() => {
    $("#quote-left").removeClass("animate__animated animate__fadeInLeft");
    $("#quote-right").removeClass("animate__animated animate__fadeInRight");
    $("#text").removeClass("animate__animated animate__fadeInDown");
    $("#author").removeClass("animate__animated animate__fadeInUp");
  }, 1000)
}

// ============================================================================

$(document).ready(function() {  
  setInterval(showDate, 1000);
  
  loadQuotes().then(() => {
    getQuote();
  });

  $("#new-quote").on('click', getQuote);
  
  $("#language").on("click", changeLang);
});
