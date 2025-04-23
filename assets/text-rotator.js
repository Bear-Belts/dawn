document.addEventListener('DOMContentLoaded', function () {
  var container = document.querySelector('.rotator-words');
  if (!container) return;
  console.log('text-rotator: container element:', container);
  var dataWords = container.getAttribute('data-words');
  console.log('text-rotator: data-words attribute:', dataWords);
  var words = JSON.parse(dataWords);
  console.log('text-rotator: parsed words array:', words);
  var prevEl = container.querySelector('.rotator-prev');
  var currEl = container.querySelector('.rotator-current');
  var nextEl = container.querySelector('.rotator-next');
  var index = 0;

  function update() {
    var len = words.length;
    console.log('text-rotator update: index', index, 'len', len);
    var prevWord = words[(index - 1 + len) % len];
    var currWord = words[index];
    var nextWord = words[(index + 1) % len];
    console.log('text-rotator update values: prev', prevWord, 'curr', currWord, 'next', nextWord);
    prevEl.textContent = prevWord;
    currEl.textContent = currWord;
    nextEl.textContent = nextWord;
  }

  update();
  setInterval(function () {
    index = (index + 1) % words.length;
    console.log('text-rotator interval: new index', index);
    update();
  }, 3000);
});
