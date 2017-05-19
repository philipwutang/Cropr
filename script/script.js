$(document).ready(function() {
  var jcrop_api;

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

  $('input').on('change', function() {
    console.log(this.id);
    jcrop_api.setOptions({
      aspectRatio: this.id
    });
    jcrop_api.focus();
  });
});
