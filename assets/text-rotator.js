document.addEventListener('DOMContentLoaded', function () {
  var container = document.querySelector('.rotator-words');
  if (!container) return;
  var words = JSON.parse(container.getAttribute('data-words'));
  var prevEl = container.querySelector('.rotator-prev');
  var currEl = container.querySelector('.rotator-current');
  var nextEl = container.querySelector('.rotator-next');
  var index = 0;

  function update() {
    var len = words.length;
    prevEl.textContent = words[(index - 1 + len) % len];
    currEl.textContent = words[index];
    nextEl.textContent = words[(index + 1) % len];
  }

  update();
  setInterval(function () {
    index = (index + 1) % words.length;
    update();
  }, 3000);
});
