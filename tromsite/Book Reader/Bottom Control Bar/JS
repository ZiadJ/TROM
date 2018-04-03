<script>
if((typeof window.orientation == 'undefined') 
   && (navigator.userAgent.indexOf('IEMobile') == -1)
   && !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  jQuery(window).on('resize', function() { // .df-ui-page 
    var x = jQuery(window).width();
    var y = jQuery(window).height();

    if(y < 900) {
      jQuery('.df-ui-wrapper').css({
        position: 'fixed',
        zIndex: 10000,
        top: '60px',
        left: 0,
        width: '90px',
        // height: (y - 60) + 'px'
      }).removeClass('df-ui-controls');

      if(jQuery('.df-ui-fullscreen').length < 1)
        jQuery('.df-3dcanvas').css({
          top: '28px',
          // height: (y - 0) + 'px',
          // width: (y - 0) * (x / y) + 'px'
        });
    }
  }).trigger('resize');
}

</script>
