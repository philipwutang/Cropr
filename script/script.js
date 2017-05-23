$(document).ready(function() {
  var jcrop_api;

  jcrop_api = $.Jcrop('#cropbox');

  function setImageSize() {
    console.log("setImageSize");
    jcrop_api.setOptions({
      maxSize: [width.value, height.value],
      minSize: [width.value, height.value]
    });
  }

  // fix menu when passed
  $('.masthead').visibility({
    once: false,
    onBottomPassed: function() {
      $('.fixed.menu').transition('fade in');
    },
    onBottomPassedReverse: function() {
      $('.fixed.menu').transition('fade out');
    }
  });

  // create sidebar and attach to menu open
  $('.ui.sidebar').sidebar('attach events', '.toc.item');

  $('.ui.accordion').accordion(function() {});

  jcrop_api.setOptions({
    trackDocument: true,
    onChange: showCoords,
    onSelect: showCoords,
    bgColor: 'black',
    bgOpacity: .4
  });

  function showCoords(c) {
    $('#width').val(Math.round(c.w));
    $('#height').val(Math.round(c.h));
  };

  $('input').on('change', function() {
    console.log(this.id);

    switch (this.id) {
      case "1:1":
        jcrop_api.setOptions({
          aspectRatio: 1
        });
        break;
      case "3:2":
        jcrop_api.setOptions({
          aspectRatio: 3 / 2
        });
        break;
      case "4:3":
        jcrop_api.setOptions({
          aspectRatio: 4 / 3
        });
        break;
      case "16:9":
        jcrop_api.setOptions({
          aspectRatio: 16 / 9
        });
        break;
      default:
        console.log("here");
        jcrop_api.setOptions({
          maxSize: [0, 0],
          minSize: [0, 0],
          aspectRatio: 0
        });
        break;
    }
    jcrop_api.focus();
  });
});
