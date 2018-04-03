<script>(function ($) {
  if (questionCount == undefined)
    var questionCount = {
    monetarysystem: [2,45,46,47,48,49,50,51,52,53,54,55,56,57,58,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116],
    humanbehavior: [31,32,33,34,35,36,37,38,39,40,41,42,43,44],
    science: [59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,117,118,119,120,121,122,123,124,125,126,127],
    tvp: [79,80,81,82,83,84,85,86,87,88,89,90],
    technology: [13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,97,98,99,100,101]
  }


  var animCorrectList = [
    //'bounce',
    //'flash',
    //'pulse',
    //'rubberBand',
    //'shake',
    //'swing',
   // 'tada',
   // 'wobble',
    //'jello',
    //'bounceIn',
    //'bounceInDown',
    //'bounceInLeft',
   // 'bounceInRight',
   // 'bounceInUp',
    //'fadeIn',
    //'fadeInDown',
    //'fadeInDownBig',
    //'fadeInLeft',
    //'fadeInLeftBig',
    //'fadeInRight',
    //'fadeInRightBig',
    //'fadeInUp',
   //'fadeInUpBig',
    //'flip',
    //'flipInX',
    //'flipInY',
    //'lightSpeedIn',
    //'rotateIn',
    //'rotateInDownLeft',
    //'rotateInDownRight',
    //'rotateInUpLeft',
    //'rotateInUpRight',
    //'slideInUp',
    //'slideInDown',
    //'slideInLeft',
    //'slideInRight',
    //'zoomIn',
    //'zoomInDown',
    //'zoomInLeft',
    //'zoomInRight',
    //'zoomInUp',
    //'hinge',
    //'rollIn'
  ];

  var debugHash = '#?'; // hash characters used to enter debug mode(must start with '#').
  var scrollBeginDelay = 400;
  var scrollTime = 700;
  var scrollAnimUpType = 'easeOutQuad'; // animation ease type(see www.easings.net for more)
  var scrollAnimDownType = 'easeOutQuad';
  var explanationAnimUpOffset = 74 - 12; // target offset when scrolling the explanation panel up
  var explanationAnimDownOffset = 74; // target offset when scrolling the explanation panel down(final)
  var fullCompletionMessage = "Awesome job!"
    + "<br/>You just completed all of the quizzes within this category. "
    + "<br/>We add new quizzes every week. In the meantime, feel free to play again by clicking the button below.";

  function createCookie(name, value, days, persist) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toGMTString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
    if (persist && localStorage)
      localStorage.setItem(name, days == -1 ? null : value);
  }
  function readCookie(name, persist) {
    if (persist && localStorage && localStorage.getItem(name) !== null)
      return localStorage.getItem(name);

    var nameEQ = name + "=";
    var ca = document.cookie.split(';');

    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }

    return null;
  }
  function eraseCookie(name, persist) {
    createCookie(name, "", -1, persist);
  }
  function unique(list) {
    var result = [];
    $.each(list, function (i, e) {
      if ($.inArray(e, result) == -1) result.push(e);
    });
    return result;
  }

  function scrollTo(targetSelector, offset, ease, scrollTime, callback) {
    $('html,body').stop().animate({ scrollTop: $(targetSelector).offset().top + offset }, scrollTime, ease, callback);
  }
  function animate(selector, animationOrAnimList) {
    var animation = animationOrAnimList;

    if (animationOrAnimList.pop) {
      var max = animationOrAnimList.length;
      var index = Math.floor(Math.random() * (max + 1));
      animation = animationOrAnimList[index];
    }

    return $(selector)
      .removeClass(animation).addClass(animation + ' animated')
      .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        $(this).removeClass(animation).removeClass('animated');
      });
  }

  var loaded = false;

  $(document).ready(function () {
    var quizId = $('#quizId').val();

    if (makeReviewMessage())
      return;

    addReportButton(quizId);

    if (quizId != null) {
      if (quizId == '-1') {
        $('#quizMessage').html(fullCompletionMessage);
        eraseCookie('answeredIds', true);
      } else {
        if (loaded)
          $('.wpvq-next-page:last, div.block > a.button.medium').off('click');
        loaded = true;

        var answeredQuizIds = (readCookie('answeredIds', true) || '').split(',');

        $('body').off('click', '.wpvq-answer').on('click', '.wpvq-answer', function () {

          // animate('.wpvq-choose.wpvq-answer-false:visible label', 'shake'); // shake option on incorrect answer

          setTimeout(function () {
            scrollTo('.wpvq-explaination:visible', -explanationAnimUpOffset, scrollAnimUpType, scrollTime, function () {
              animate('.wpvq-false:visible', 'shake'); // shake explanation title on incorrect answer

              if (animate('.wpvq-true:visible', animCorrectList).length) // shake explanation title on incorrect answer
                createCookie('correctAnswers', parseInt(readCookie('correctAnswers') || 0) + 1, 180, true);

              scrollTo('.wpvq-explaination:visible', -explanationAnimDownOffset, scrollAnimDownType, scrollTime / 2);
            });

          }, scrollBeginDelay);
        });

        $('.wpvq-next-page:last, a.button.medium').on('click', function () {
          if ($(this).hasClass('medium'))
            if (location.search.substring(0, 4) === '?id=' || location.hash.substring(0, 4) === '#id=')
              return;

          answeredQuizIds.push(quizId);
          var storedIds = unique(answeredQuizIds).join(',');
          // Store answered question ids in a cookie
          createCookie('answeredIds', storedIds, 120, true);
          // Display cookie values when hash is set to '#?'
          if (location.hash == debugHash)
            alert(storedIds);
        });

        // Display number of questions left
        var $playAnother = $('a.button.medium');
        var text = $playAnother.find('span').html();
        $playAnother.find('span').html(text + ' (' + getTotalQuizzesLeft(answeredQuizIds) + ' left)');

        $('#quizSelectorBar').remove();
        var $bar = $(generateQuizSelectorBar(answeredQuizIds, quizId));
        $bar.insertBefore($playAnother).attr('id', 'quizSelectorBar').hide();
        if (location.search.substring(0, 4) === '?id=' || location.hash.substring(0, 4) === '#id=') {
          $playAnother.on('click', function () { $bar.show(300); return false; });
        } else {
          if (history.pushState) {
            var newurl = window.location.origin + window.location.pathname + '?id=' + quizId;
            window.history.pushState({ path: newurl }, '', newurl);
          } else {
            location.hash = '#' + quizId;
          }
        }

        $('head #anim_css').remove();
        $('head').append('<link id="anim_css" href="http://cdn.jsdelivr.net/animatecss/3.5.1/animate.min.css" rel="stylesheet" type="text/css">');
      }
    }
  });

  function getIdsByCat() {
    if (typeof idsByCat !== 'undefined')
      return idsByCat;
    var paths = location.pathname.split('#')[0].split('?')[0].replace(/^\/+|\/+$/gm, '').split('/');
    var category = paths[paths.length - 1];
    return questionCount[category];
  }

  function getTotalQuizzesLeft(answeredIds) {
    var idsInCat = getIdsByCat();
    var ansCountByCat = 0;
    for (var i = 0; i < idsInCat.length; i++)
      if (answeredIds.indexOf(idsInCat[i].toString()) > -1)
        ansCountByCat++;

    //alert('Answered:' + answeredIds+ ' AllByCat: ' + catIds);

    return idsInCat.length - ansCountByCat;
  }

  function generateQuizSelectorBar(answeredIds, quizId) {
    var idsInCat = getIdsByCat();
    $('head #quizSelectorBarStyle').remove();
    $('head').append('<style id="quizSelectorBarStyle">'
      + '#quizSelectorBar {margin: 0 0 10px 0 !important;padding: 0 !important;height: 100%;}'
      + '#quizSelectorBar td{padding: 0 !important;width: 40px;transition: 200ms;}'
      + '#quizSelectorBar td.current {background: white;filter: drop-shadow(0 0 3px black);border-radius: 10px;}'
      + '#quizSelectorBar td.white {background: white;}'
      + '#quizSelectorBar td.gray {background: lightgray;}'
      + '#quizSelectorBar td:hover{background: #48a65b;width: 80px;border-radius: 1px;transition: 200ms}'
      + '#quizSelectorBar td:first-of-type {border-radius: 10px 0 0 10px;}'
      + '#quizSelectorBar td:last-of-type {border-radius: 0 10px 10px 0;}'
      //+ '#quizSelectorBar td:hover:before{content:attr(title);position:absolute;top:0;left:0;}'
      + '</style>')

    var html = '<nav role="navigation"><table style="border-collapse: collapse;height: 10px;"><tr>';
    for (var i = 0; i < idsInCat.length; i++) {
      var answered = answeredIds.indexOf(idsInCat[i].toString()) > -1;
      //if(answered) alert(1);
      var id = idsInCat[i];
      html += '<td class="' + (quizId == id ? 'current' : (answered ? 'gray' : 'white')) + '"><a id="Quiz ' + id + '" title="Quiz ' + id + '" href="?id=' + id + '"><div>.</div></a></td>';
    }
    html += '</tr></table></nav>';
    return html;
  }

  function makeReviewMessage() {
    if (location.pathname == '/quiz-feedback/' && location.search.substring(0, 8) == '?quizId=') {
      var id = location.search.substring(8);
      var urlTemplate = 'http://www.tromsite.com/wp-admin/admin.php?page=wp-viral-quiz&element=quiz&action=edit&id=' + id + '&referer=update&tab=questions';
      $('#1459036738972-preview').val(urlTemplate); //.hide(0).prev().html('<h4>Quiz no.' + id + ' report</h4><br/><br/>');
      return true;
    }
  }

  function addReportButton(quizId) {
    $('#correction').remove();
    var $button = $('<div id="correction" class="block" style="text-align: center;"><a class="button border small">Report Typo/Error</a><br/><br/></div>')
      .on('click', 'a', function () {
        window.open('http://www.tromsite.com/quiz-feedback/?quizId=' + quizId, '_blank');
      });
    $button.insertBefore('#content .content > div:last');
  }
})(jQuery);

</script>
