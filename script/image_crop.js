$(function() {
  $('#cropper').Jcrop({
    trackDocument: true,
    onChange: showCoords,
    onSelect: showCoords,
    bgColor: 'black',
    bgOpacity: .4,
    aspectRatio: 0
  });
});

function showCoords(c) {
  $('#w').val(c.w);
  $('#h').val(c.h);
};
