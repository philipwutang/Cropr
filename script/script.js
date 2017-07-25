var jcrop_api, imageWidth, imageHeight;
var offsetX, offsetY;
var uploadedImage = new Image();

// Initialize Cropr
function initialize() {
  // Set up cropping API
  jcrop_api = $.Jcrop('#cropbox');

  // Set up cropbox
  jcrop_api.setOptions({
    trackDocument: true,
    onChange: showCoords,
    onSelect: showCoords,
    bgColor: 'black',
    boxWidth: 811,
    bgOpacity: 0.4
  });

  // Display the dimensions
  $('#freeform').prop('checked', true);

  disableRatios();
}

function disableRatios() {
  $(':radio').each(function() {
    this.checked = false;
    $(this).parent().addClass('disabled');
  });
}

function showCrop() {
  $('#result').removeClass('disabled');
  $('#placeholder').addClass('hidden');
  $(canvas).removeClass('hidden');
}

function enableRatios() {
  $('div.ui.radio.checkbox').each(function() {
    $(this).removeClass('disabled');
  });
}

function showCoords(c) {
  imageWidth = Math.round(c.w);
  imageHeight = Math.round(c.h);
  $('#width').val(imageWidth);
  $('#height').val(imageHeight);
  offsetX = c.x;
  offsetY = c.y;
}

// Turn on and off freeforming
function freeFormOn() {
  console.log('freeform');
  disableRatios();
  document.getElementById('freeform').checked = true;
  jcrop_api.setOptions({ aspectRatio: 0 });
}

function freeFormOff() {
  document.getElementById('freeform').checked = false;
  enableRatios();
  jcrop_api.setOptions({ aspectRatio: 1 });
}

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e) {
      newImage = e.target.result;
      uploadedImage.src = e.target.result;
      jcrop_api.setImage(newImage);
      $('#cropbox').attr('src', e.target.result);
      jcrop_api.animateTo([0, 0, uploadedImage.width, uploadedImage.height]);
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function downloadCanvas(link, canvasId, filename) {
  link.href = document.getElementById(canvasId).toDataURL();
  link.download = filename;
}

function resize(croppedWidth, croppedHeight) {
  var newSize = {
    width: croppedWidth,
    height: croppedHeight
  };
  if (croppedWidth > 811) {
    newSize.width = 811;
    newSize.height = 811 * (croppedHeight / croppedWidth);
  }
  return newSize;
}

$('begin').click(function() {
  $('html,body').animate(
    {
      scrollTop: $('#cropr').offset().top
    },
    'slow'
  );
});

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
    case '1:1':
      freeFormOff();
      jcrop_api.setOptions({ aspectRatio: 1 });
      break;
    case '3:2':
      freeFormOff();
      jcrop_api.setOptions({
        aspectRatio: 3 / 2
      });
      break;
    case '4:3':
      freeFormOff();
      jcrop_api.setOptions({
        aspectRatio: 4 / 3
      });
      break;
    case '16:9':
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
  console.log('setImageSize');
  var width = $('#width').val();
  var height = $('#height').val();
  jcrop_api.animateTo([0, 0, width, height]);
  freeFormOn();
});

$('#uploadImage').on('change', function(e) {
  console.log('uploadImage');
  readURL(this);
  $('#autoCropImage').removeClass('disabled');
  $('#cropImage').removeClass('disabled');
  $('#download').parent().removeClass('disabled');
  console.log($('#uploadedImage').width());
});

// Event handler for the download button
$('#download').on('click', function() {
  console.log('Downloading');
  downloadCanvas(this, 'canvas', 'crop.png');
});

// Event handler for the crop button
$('#cropImage').on('click', function() {
  img = uploadedImage;
  console.log('Regular Crop');
  var canvas = $('#canvas')[0];
  var ctx = canvas.getContext('2d');
  var newSize = resize(imageWidth, imageHeight);
  canvas.width = newSize.width;
  canvas.height = newSize.height;

  ctx.drawImage(
    img,
    offsetX,
    offsetY,
    imageWidth,
    imageHeight,
    0,
    0,
    canvas.width,
    canvas.height
  );
  showCrop();
});

// Event handler for the auto crop button
$('#autoCropImage').on('click', function() {
  console.log('Auto Crop');
  img = uploadedImage;

  var options = { debug: false, width: imageWidth, height: imageHeight };
  smartcrop.crop(img, options, function(result) {
    var crop = result.topCrop;
    var canvas = $('#canvas')[0];
    var ctx = canvas.getContext('2d');
    var newSize = resize(options.width, options.height);
    canvas.width = newSize.width;
    canvas.height = newSize.height;
    ctx.drawImage(
      img,
      crop.x,
      crop.y,
      crop.width,
      crop.height,
      0,
      0,
      canvas.width,
      canvas.height
    );
  });
  showCrop();
});

$(document).ready(function() {
  initialize();
  jcrop_api.animateTo([0, 0, 811, 608]);
});
