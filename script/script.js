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
  const month = months[date.getMonth()][0];
  const number = fistZero(date.getDate());
  const h = fistZero(date.getHours());
  const m = fistZero(date.getMinutes());
  const s = fistZero(date.getSeconds());
  $("#clock").html(`${h}:${m}:<span class="text-secondary">${s}</span>`);
  $("#day").html(`${number} ${month} ${year}`);
}

showDate();

// quote machine ============================================================
let quotesStore;
let quote = '';
let author = '';

function loadQuotes() {
  return $.ajax({
    headers: {
      Accept: 'application/json'
    },
    url: 'https://gist.githubusercontent.com/Polianskii/bbe50be999a93869b4be8a29e7e89f2c/raw/e681df0016ebdc71792b3ddaa955ef6c03c47388/quotes.json',
    success: function (jsonQuotes) {
      if (typeof jsonQuotes === 'string') {
        quotesStore = JSON.parse(jsonQuotes);
        console.log(quotesStore)
      }
    },
  });
}

loadQuotes();

function getRandomQuote() {
  return quotesStore.quotes[Math.floor(Math.random() * quotesStore.quotes.length)];
}

function getQuote() {
  let randomQuote = getRandomQuote();

  quote = randomQuote.quote[0];
  author = randomQuote.author[0];

  $("#text").html(quote);
  $("#author").html(author);
}

$(document).ready(function() {  
  setInterval(showDate, 1000);
  loadQuotes().then(() => getQuote());

  $("#new-quote").on('click', getQuote);
});
