$(document).ready(function() {

  var jcrop_api,
    imageWidth,
    imageHeight;

  // Initialize Cropr
  function initialize() {
    // Set up cropping API
    jcrop_api = $.Jcrop('#cropbox');

    // Set up cropbox
    jcrop_api.setOptions({trackDocument: true, onChange: showCoords, onSelect: showCoords, bgColor: 'black', bgOpacity: .4});

    // Display the dimensions
    function showCoords(c) {
      imageWidth = Math.round(c.w);
      imageHeight = Math.round(c.h);
      $('#width').val(imageWidth);
      $('#height').val(imageHeight);
    };

    $('#freeform').prop('checked', true);
    $('#cropbox').Jcrop({boxWidth: 745});

    disableRatios();
  }

  initialize();

  // Turn on and off ratios
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

  // Turn on and off freeforming
  function freeFormOn() {
    console.log("freeform");
    disableRatios();
    document.getElementById('freeform').checked = true;
    jcrop_api.setOptions({aspectRatio: 0});
  }

  function freeFormOff() {
    document.getElementById('freeform').checked = false;
    enableRatios();
    jcrop_api.setOptions({aspectRatio: 1});
  }

  // Event handler for the freeform checkbox
  $('input[name=freeform]').change(function() {
    if ($(this).is(':checked')) {
      freeFormOn();
    } else {
      freeFormOff();
      document.getElementById('1:1').checked = true;
    }
  });

  // Event handlers for the ratio choices
  $('input').on('change', function() {
    switch (this.id) {
      case "1:1":
        freeFormOff();
        jcrop_api.setOptions({aspectRatio: 1});
        break;
      case "3:2":
        freeFormOff();
        jcrop_api.setOptions({
          aspectRatio: 3 / 2
        });
        break;
      case "4:3":
        freeFormOff();
        jcrop_api.setOptions({
          aspectRatio: 4 / 3
        });
        break;
      case "16:9":
        freeFormOff();
        jcrop_api.setOptions({
          aspectRatio: 16 / 9
        });
        break;
      default:
        break;
    }
    jcrop_api.focus();
  });

  // Event handler for the set button
  $('#setImageSize').on('click', function() {
    console.log("setImageSize");
    var width = $('#width').val();
    var height = $('#height').val();
    jcrop_api.animateTo([0, 0, width, height]);
    freeFormOn();
  });

  $('#uploadImage').on('click', function() {
    console.log("uploadImage");

    var newImage = "";

    function readURL(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
          newImage = e.target.result;
          jcrop_api.setImage(newImage);
          $('#cropbox').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
      }
    }

    $("#uploadImage").change(function() {
      readURL(this);
    });
  });
});
