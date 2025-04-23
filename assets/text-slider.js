(function () {
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.text-slider-section').forEach(function (section) {
      var animated = section.querySelector('.text-slider-animated');
      var items = animated.querySelectorAll('.text-slider-item');
      if (items.length < 2) return;
      var current = 0;

      function updateClasses() {
        var prev = (current - 1 + items.length) % items.length;
        var next = (current + 1) % items.length;

        items.forEach(function (item, i) {
          item.classList.remove('prev', 'active', 'next');
          if (i === current) {
            item.classList.add('active');
          } else if (i === prev) {
            item.classList.add('prev');
          } else if (i === next) {
            item.classList.add('next');
          }
        });
      }

      updateClasses();
      setInterval(function () {
        current = (current + 1) % items.length;
        updateClasses();
      }, section.dataset.interval || 3000);
    });
  });
})();
