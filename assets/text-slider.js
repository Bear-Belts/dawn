(function () {
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.text-slider-section').forEach(function (section) {
      var animated = section.querySelector('.text-slider-animated');
      var items = animated.querySelectorAll('.text-slider-item');
      if (items.length < 2) return;
      var current = 0;
      // Set container width to width of the widest item
      var maxWidth = 0;
      items.forEach(function (item) {
        var clone = item.cloneNode(true);
        clone.style.position = 'absolute';
        clone.style.visibility = 'hidden';
        clone.style.whiteSpace = 'nowrap';
        clone.style.width = 'auto';
        clone.style.left = '-9999px';
        clone.style.top = '-9999px';
        document.body.appendChild(clone);
        var w = clone.getBoundingClientRect().width;
        if (w > maxWidth) maxWidth = w;
        document.body.removeChild(clone);
      });
      animated.style.width = maxWidth + 'px';
      function updateClasses() {
        var prev2 = (current - 2 + items.length) % items.length;
        var prev = (current - 1 + items.length) % items.length;
        var next = (current + 1) % items.length;
        var next2 = (current + 2) % items.length;

        items.forEach(function (item, i) {
          item.classList.remove('prev2', 'prev', 'active', 'next', 'next2');
          if (i === current) {
            item.classList.add('active');
          } else if (i === prev) {
            item.classList.add('prev');
          } else if (i === next) {
            item.classList.add('next');
          } else if (i === prev2) {
            item.classList.add('prev2');
          } else if (i === next2) {
            item.classList.add('next2');
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
