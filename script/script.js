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
function loadQuery() {
  return $.ajax({
    url: 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
    success: function (jsonQuotes) {
      if (typeof jsonQuotes === 'string') {
        quotesStore = JSON.parse(jsonQuotes);
        console.log('done')
      }
    },
  }).fail(console.log('fail'));
}

$(document).ready(function() {  
  setInterval(showDate, 1000);
  loadQuery();
});
