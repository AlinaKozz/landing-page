(function ($) {
    $(document).ready(function () {

        /*Navigation panel*/

        function lpHeader() {

            if ($(window).scrollTop() == 0) {
                $('header').addClass('top');
            } else {
                $('header.top').removeClass('top');
            }
        }

        lpHeader();

        $(window).on('scroll', lpHeader);

        /*Smooth scroll*/

        var lpNav = $('header ul');

        lpNav.find('li a').on('click', function (e) {
            var linkTrgt = $($(this).attr('href'));
            if (linkTrgt.length > 0) {
                e.preventDefault();
                var dataOffset = linkTrgt.data('offset');
                $('html, body').animate({
                    scrollTop: linkTrgt.offset().top - dataOffset
                }, 750);
            }
        });

        /*Active menu item*/

        function lpSetNavActive() {

            var curItem = '';
            $('section').each(function () {
                if ($(window).scrollTop() > $(this).offset().top - 200) {
                    curItem = $(this).attr('id');
                }
            });

            if (lpNav.find('li.active a').attr('href') != '#' + curItem ||
                lpNav.find('li.active').length == 0) {

                lpNav.find('li.active').removeClass('active');

                lpNav.find('li a[href="#' + curItem + '"]').parent().addClass('active');
            }
        }

        lpSetNavActive();
        $(window).on('scroll load', lpSetNavActive);

        /*Слайдер*/

        $(".lp-slider1").owlCarousel({
            items: 1,
            nav: true,
            navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>']

            /*
            responsive: {
                0: {
                    items: 1,
                    nav: false
                },
                000: {
                    items: 2,
                    nav: false
                },
                1200: {
                    items: 3,
                    nav: true
                }
            }
            */
        });
        /*
        $('.lp-slider2').owlCarousel({
            items: 1,
            nav: true,
            navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
            responsive: {
                0: {
                    items: 1,
                    nav: false
                },
                600: {
                    items: 3,
                    nav: false
                },
                1200: {
                    items: 5,
                    nav: true
                }
            }
        });
        */


        /*Табулятор*/

        $('.lp-tabs').each(function () {


            var tabs = $(this),
                tabsTitlesNames = [];

            tabs.find('div[data-tab-title]').each(function () {
                tabsTitlesNames.push($(this).attr('data-tab-title'));
            }).addClass('lp-tab');

            tabs.wrapInner('<div class="lp-tabs-content"></div>');
            tabs.prepend('<div class="lp-tabs-titles"><ul></ul></div>');

            var tabsTitles = tabs.find('.lp-tabs-titles'),
                tabsContent = tabs.find('.lp-tabs-content'),
                tabsContentTabs = tabsContent.find('.lp-tab');

            tabsTitlesNames.forEach(function (value) {
                tabsTitles.find('ul').append('<li>' + value + '</li>')
            });

            var tabsTitlesItems = tabsTitles.find('li');

            tabsTitlesItems.eq(0).addClass('active');
            tabsContentTabs.eq(0).addClass('active').show();

            tabsContent.height(tabsContent.find('.active').outerHeight());


            tabsTitlesItems.on('mouseover', function () {

                if (!tabs.hasClass('changing')) {

                    tabs.addClass('changing');

                    tabsTitlesItems.removeClass('active');
                    $(this).addClass('active');

                    var curTab = tabsContent.find('.active'),
                        nextTab = tabsContentTabs.eq($(this).index());

                    var curHeight = curTab.outerHeight();

                    nextTab.fadeIn(500);

                    var nextHeight = nextTab.outerHeight();

                    nextTab.hide();

                    if (curHeight < nextHeight) {

                        tabsContent.animate({
                            height: nextHeight
                        }, 500);

                    }

                    curTab.fadeOut(500, function () {

                        if (curHeight > nextHeight) {

                            tabsContent.animate({
                                height: nextHeight
                            }, 500);

                        }

                        nextTab.fadeIn(500, function () {

                            curTab.removeClass('active');
                            nextTab.addClass('active');
                            tabs.removeClass('changing');

                        });

                    });

                }

            });

            $(window).on('resize', function () {

                tabsContent.height(tabsContent.find('.active').outerHeight());

            });

            // console.log(tabsTitlesNames)
        });

        /*
        $('#services button').on('click', function () {
            $(".lp-slider1").trigger('to.owl.carousel', $(this).index());
        });

        $(".lp-slider1").on('changed.owl.carousel', function (e) {
            console.log(e.item.index);
        });
        */

    });
})(jQuery);