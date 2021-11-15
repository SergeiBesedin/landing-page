//Menu
$(document).ready(function () {
  $('.header__menu-toggle').click(function () {
    $(this).toggleClass('active');
    $('.header__navigation').slideToggle(300, function () {
      if ($(this).css('display') === 'none') {
        $(this).removeAttr('style');
      }
    });
  });
});

//Slider gallery
$(document).ready(function () {
  let timeList = 700;
  let TimeView = 5000;
  let RadioBut = true;

  let slideNum = 1;
  let slideTime;
  slideCount = $('.slider .slide').length;

  let animSlide = function (arrow) {
    clearTimeout(slideTime);

    if (arrow == 'next') {
      if (slideNum == slideCount) {
        slideNum = 1;
      } else {
        slideNum++;
      }
      translateWidth = -$('.works__slider').width() * (slideNum - 1);
      $('.slider').css({ transform: 'translate(' + translateWidth + 'px, 0)' });
    } else if (arrow == 'prew') {
      if (slideNum == 1) {
        slideNum = slideCount;
      } else {
        slideNum -= 1;
      }
      translateWidth = -$('.works__slider').width() * (slideNum - 1);
      $('.slider').css({ transform: 'translate(' + translateWidth + 'px, 0)' });
    } else {
      slideNum = arrow;
      translateWidth = -$('.works__slider').width() * (slideNum - 1);
      $('.slider').css({ transform: 'translate(' + translateWidth + 'px, 0)' });
    }

    $('.ctrl-select.active').removeClass('active');
    $('.ctrl-select')
      .eq(slideNum - 1)
      .addClass('active');
  };

  if (RadioBut) {
    let $linkArrow = $(
      '<a id="prewbutton" href="#">&lt;</a><a id="nextbutton" href="#">&gt;</a>'
    ).prependTo('.works__slider');
    $('#nextbutton').click(function () {
      animSlide('next');
      return false;
    });
    $('#prewbutton').click(function () {
      animSlide('prew');
      return false;
    });
  }
  let adderSpan = '';
  $('.slide').each(function (index) {
    adderSpan += '<span class = "ctrl-select">' + index + '</span>';
  });
  $('<div class ="radio-button">' + adderSpan + '</div>').appendTo(
    '.works__gallery'
  );
  $('.ctrl-select:first').addClass('active');
  $('.ctrl-select').click(function () {
    let goToNum = parseFloat($(this).text());
    animSlide(goToNum + 1);
  });
  let pause = false;
  let rotator = function () {
    if (!pause) {
      slideTime = setTimeout(function () {
        animSlide('next');
      }, TimeView);
    }
  };
  $('.works__gallery').hover(
    function () {
      clearTimeout(slideTime);
      pause = true;
    },
    function () {
      pause = false;
      rotator();
    }
  );

  let clicking = false;
  let prevX;
  $('.slide').mousedown(function (e) {
    clicking = true;
    prevX = e.clientX;
  });

  $('.slide').mouseup(function () {
    clicking = false;
  });

  $(document).mouseup(function () {
    clicking = false;
  });

  $('.slide').mousemove(function (e) {
    if (clicking == true) {
      if (e.clientX < prevX) {
        animSlide('next');
        clearTimeout(slideTime);
      }
      if (e.clientX > prevX) {
        animSlide('prew');
        clearTimeout(slideTime);
      }
      clicking = false;
    }
  });
  $('.slide').hover().css('cursor', 'pointer');
  rotator();
});

//ScrollUp
$('.scroll').click(function () {
  $('html, body').animate({ scrollTop: 0 }, 1000);
});
$(window).scroll(function () {
  if ($(window).scrollTop() > 600) {
    $('.scroll').addClass('active');
  } else {
    $('.scroll').removeClass('active');
  }
});

//Smooth scrolling
$(function () {
  $('a[href^="#"]').click(function () {
    let target = $(this).attr('href');
    $('html, body').animate({ scrollTop: $(target).offset().top }, 1000);
    return false;
  });
});
