(function () {
  // Initialize slider on load, and recalc dimensions after fonts ready and on resize
  function initSliders() {
    document.querySelectorAll('.text-slider__wrapper').forEach(function (section) {
      var animated = section.querySelector('.text-slider__animated');
      var items = animated.querySelectorAll('.text-slider__item');
      if (items.length < 2) return;
      var current = 0;
      // Measure and apply container dimensions after fonts load for accurate sizing
      function applyDimensions() {
        // width
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
        // height
        var maxHeight = 0;
        items.forEach(function (item) {
          var cloneH = item.cloneNode(true);
          cloneH.style.position = 'absolute';
          cloneH.style.visibility = 'hidden';
          cloneH.style.whiteSpace = 'nowrap';
          cloneH.style.width = maxWidth + 'px';
          cloneH.style.left = '-9999px';
          cloneH.style.top = '-9999px';
          document.body.appendChild(cloneH);
          var h = cloneH.getBoundingClientRect().height;
          if (h > maxHeight) maxHeight = h;
          document.body.removeChild(cloneH);
        });
        animated.style.height = maxHeight + 'px';
      }
      // Helper to run measurement twice to capture final metrics
      function measure() {
        applyDimensions();
        setTimeout(applyDimensions, 0);
      }
      // Defer measurement until fonts are loaded for correct sizing
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(measure);
      } else {
        measure();
      }
      // Recalculate on window resize
      window.addEventListener('resize', measure);

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
  }
  // Run init on window load
  if (document.readyState === 'complete') {
    initSliders();
  } else {
    window.addEventListener('load', initSliders);
  }
})();
