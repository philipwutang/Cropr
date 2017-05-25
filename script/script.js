$(document).ready(function() {
  var jcrop_api, imageWidth, imageHeight;

  jcrop_api = $.Jcrop('#cropbox');

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
    imageWidth = Math.round(c.w);
    imageHeight = Math.round(c.h);
    $('#width').val(imageWidth);
    $('#height').val(imageHeight);
  };

  function disableRatios() {
    document.getElementById('1:1').checked = false;
    document.getElementById('3:2').checked = false;
    document.getElementById('4:3').checked = false;
    document.getElementById('16:9').checked = false;
    document.getElementById('square').classList.add("disabled");
    document.getElementById('3by2').classList.add("disabled");
    document.getElementById('4by3').classList.add("disabled");
    document.getElementById('hd').classList.add("disabled");
  }

  function enableRatios() {
    document.getElementById('square').classList.remove("disabled");
    document.getElementById('3by2').classList.remove("disabled");
    document.getElementById('4by3').classList.remove("disabled");
    document.getElementById('hd').classList.remove("disabled");
  }

  function freeFormOn() {
    console.log("freeform");
    disableRatios();
    jcrop_api.setOptions({
      aspectRatio: 0
    });
  }

  function freeFormOff() {
    document.getElementById('freeform').checked = false;
  }

  $('input[name=freeform]').change(function() {
    if ($(this).is(':checked')) {
      freeFormOn();
    } else {
      enableRatios();
      jcrop_api.setOptions({
        aspectRatio: 1
      });
    }
  });

  $('input').on('change', function() {
    switch (this.id) {
      case "1:1":
        enableRatios();
        jcrop_api.setOptions({
          aspectRatio: 1
        });
        break;
      case "3:2":
        enableRatios();
        jcrop_api.setOptions({
          aspectRatio: 3 / 2
        });
        break;
      case "4:3":
        enableRatios();
        jcrop_api.setOptions({
          aspectRatio: 4 / 3
        });
        break;
      case "16:9":
        enableRatios();
        jcrop_api.setOptions({
          aspectRatio: 16 / 9
        });
        break;
      default:
        break;
    }
    jcrop_api.focus();
  });

  $('#setImageSize').on('click', function() {
    console.log("setImageSize");
    var width = $('#width').val();
    var height = $('#height').val();
    jcrop_api.animateTo([0, 0, width, height]);
    freeFormOn();
  });

  function init() {
    $('#freeform').prop('checked', true);
    disableRatios();
  }

  init();
});
