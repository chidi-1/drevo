/**
 * appName - http://chidi-frontend.esy.es/
 * @version v0.1.0
 * @author bev-olga@yandex.ru
 */
// mask

(function (e) {
    function t() {
        var e = document.createElement("input"), t = "onpaste";
        return e.setAttribute(t, ""), "function" == typeof e[t] ? "paste" : "input"
    }

    var n, a = t() + ".mask", r = navigator.userAgent, i = /iphone/i.test(r), o = /android/i.test(r);
    e.mask = {
        definitions: {9: "[0-9]", a: "[A-Za-z]", "*": "[A-Za-z0-9]"},
        dataName: "rawMaskFn",
        placeholder: "_"
    }, e.fn.extend({
        caret: function (e, t) {
            var n;
            if (0 !== this.length && !this.is(":hidden"))return "number" == typeof e ? (t = "number" == typeof t ? t : e, this.each(function () {
                this.setSelectionRange ? this.setSelectionRange(e, t) : this.createTextRange && (n = this.createTextRange(), n.collapse(!0), n.moveEnd("character", t), n.moveStart("character", e), n.select())
            })) : (this[0].setSelectionRange ? (e = this[0].selectionStart, t = this[0].selectionEnd) : document.selection && document.selection.createRange && (n = document.selection.createRange(), e = 0 - n.duplicate().moveStart("character", -1e5), t = e + n.text.length), {
                begin: e,
                end: t
            })
        }, unmask: function () {
            return this.trigger("unmask")
        }, mask: function (t, r) {
            var c, l, s, u, f, h;
            return !t && this.length > 0 ? (c = e(this[0]), c.data(e.mask.dataName)()) : (r = e.extend({
                placeholder: e.mask.placeholder,
                completed: null
            }, r), l = e.mask.definitions, s = [], u = h = t.length, f = null, e.each(t.split(""), function (e, t) {
                "?" == t ? (h--, u = e) : l[t] ? (s.push(RegExp(l[t])), null === f && (f = s.length - 1)) : s.push(null)
            }), this.trigger("unmask").each(function () {
                function c(e) {
                    for (; h > ++e && !s[e];);
                    return e
                }

                function d(e) {
                    for (; --e >= 0 && !s[e];);
                    return e
                }

                function m(e, t) {
                    var n, a;
                    if (!(0 > e)) {
                        for (n = e, a = c(t); h > n; n++)if (s[n]) {
                            if (!(h > a && s[n].test(R[a])))break;
                            R[n] = R[a], R[a] = r.placeholder, a = c(a)
                        }
                        b(), x.caret(Math.max(f, e))
                    }
                }

                function p(e) {
                    var t, n, a, i;
                    for (t = e, n = r.placeholder; h > t; t++)if (s[t]) {
                        if (a = c(t), i = R[t], R[t] = n, !(h > a && s[a].test(i)))break;
                        n = i
                    }
                }

                function g(e) {
                    var t, n, a, r = e.which;
                    8 === r || 46 === r || i && 127 === r ? (t = x.caret(), n = t.begin, a = t.end, 0 === a - n && (n = 46 !== r ? d(n) : a = c(n - 1), a = 46 === r ? c(a) : a), k(n, a), m(n, a - 1), e.preventDefault()) : 27 == r && (x.val(S), x.caret(0, y()), e.preventDefault())
                }

                function v(t) {
                    var n, a, i, l = t.which, u = x.caret();
                    t.ctrlKey || t.altKey || t.metaKey || 32 > l || l && (0 !== u.end - u.begin && (k(u.begin, u.end), m(u.begin, u.end - 1)), n = c(u.begin - 1), h > n && (a = String.fromCharCode(l), s[n].test(a) && (p(n), R[n] = a, b(), i = c(n), o ? setTimeout(e.proxy(e.fn.caret, x, i), 0) : x.caret(i), r.completed && i >= h && r.completed.call(x))), t.preventDefault())
                }

                function k(e, t) {
                    var n;
                    for (n = e; t > n && h > n; n++)s[n] && (R[n] = r.placeholder)
                }

                function b() {
                    x.val(R.join(""))
                }

                function y(e) {
                    var t, n, a = x.val(), i = -1;
                    for (t = 0, pos = 0; h > t; t++)if (s[t]) {
                        for (R[t] = r.placeholder; pos++ < a.length;)if (n = a.charAt(pos - 1), s[t].test(n)) {
                            R[t] = n, i = t;
                            break
                        }
                        if (pos > a.length)break
                    } else R[t] === a.charAt(pos) && t !== u && (pos++, i = t);
                    return e ? b() : u > i + 1 ? (x.val(""), k(0, h)) : (b(), x.val(x.val().substring(0, i + 1))), u ? t : f
                }

                var x = e(this), R = e.map(t.split(""), function (e) {
                    return "?" != e ? l[e] ? r.placeholder : e : void 0
                }), S = x.val();
                x.data(e.mask.dataName, function () {
                    return e.map(R, function (e, t) {
                        return s[t] && e != r.placeholder ? e : null
                    }).join("")
                }), x.attr("readonly") || x.one("unmask", function () {
                    x.unbind(".mask").removeData(e.mask.dataName)
                }).bind("focus.mask", function () {
                    clearTimeout(n);
                    var e;
                    S = x.val(), e = y(), n = setTimeout(function () {
                        b(), e == t.length ? x.caret(0, e) : x.caret(e)
                    }, 10)
                }).bind("blur.mask", function () {
                    y(), x.val() != S && x.change()
                }).bind("keydown.mask", g).bind("keypress.mask", v).bind(a, function () {
                    setTimeout(function () {
                        var e = y(!0);
                        x.caret(e), r.completed && e == x.val().length && r.completed.call(x)
                    }, 0)
                }), y()
            }))
        }
    })
})(jQuery);

$(document).ready(function () {

    // полноэкранный слайдер
    if ($('.fullpage').length) {
        var slider = $('.fullpage');
        var anchors_content = [];

        if (slider.hasClass('anchors')) {
            slider.find('.section').each(function () {
                anchors_content.push($(this).data('anchor'))
            });

            slider.fullpage({
                css3: true,
                scrollingSpeed: 1000,
                menu: '#menu',
                lockAnchors: true,
                anchors: anchors_content,
                navigation: true,
                navigationPosition: 'right',
                navigationTooltips: anchors_content,
                showActiveTooltip: true,
                slidesNavigation: true,
                slidesNavPosition: 'bottom',
                onLeave: function (index, nextIndex, direction) {
                    if (index == 1 && direction == 'down') {
                        $('#fp-nav').addClass('top')
                    }
                    if (index == 2 && direction == 'up') {
                        $('#fp-nav').removeClass('top')
                    }
                }
            });
        }
        else {
            slider.fullpage({
                css3: true,
                scrollingSpeed: 1000,
                navigation: false
            });
        }
    }

    // смена фонов на заголовке в слайдере
    if ($('.section-title').length) {
        var section = $('.section-title');

        if (device.mobile() == true) {
            console.log('11')
            section.css('background', 'url("' + section.data('mobile') + '") no-repeat 50% 50%')
        }
        else {
            if (device.tablet() == true) {
                section.css('background', 'url("' + section.data('tablet') + '") no-repeat 50% 50%')
            }
            else{
                section.css('background', 'url("' + section.data('desktop') + '") no-repeat 50% 50%')
            }
        }
    }

    // внутренний слайдер
    if ($('.fullpage--inner-slider').length) {
        $('.fullpage--inner-slider').owlCarousel({
            margin: 0,
            loop: true,
            nav: true,
            dots: true,
            navText: [,],
            autoplay: true,
            items: 1
        });
    }


    // загрузить еще
    $('.js--load-more').on('click', function () {
        var btn = $(this);
        var action = btn.data('action');
        var method = btn.data('method');
        var container = $('.load-container');
        var data = container.find('li').length;

        $.ajax({
            url: action,
            method: method,
            data: {'data': data},
            success: function (data) {
                var data = $.parseJSON(data);
                container.append(data.content);
                if (data.has_content == 'false') {
                    btn.addClass('hidden-block');
                }
            }
        });

        return false;
    });

    // Показать торговые площади
    $('.js--show-squares').on('click', function () {
        var form = $(this).closest('form');
        var action = form.prop('action');
        var method = form.prop('method');
        var container = $('.load-container');
        var data = form.serialize();

        $.ajax({
            url: action,
            method: method,
            data: {'data': data},
            success: function (data) {
                var data = $.parseJSON(data);
                container.empty().append(data.content);
            }
        });

        return false;
    });

    // Показать обекты
    $('.js--show-object').on('change', function () {
        var form = $(this).closest('form');
        var action = form.prop('action');
        var method = form.prop('method');
        var container = $('.load-container');
        var data = form.serialize();

        $.ajax({
            url: action,
            method: method,
            data: {'data': data},
            success: function (data) {
                container.empty().append(data);
            }
        });

        return false;
    });

    // fancy
    if ($('.fancy').length) {
        $('.fancy').fancybox();
    }

    ymaps.ready(function () {

        var myMap;

        $('.fancybox-map').fancybox({
            height: 600, afterShow: function () {

                var coords = $('#map').data('coords');

                myMap = new ymaps.Map('map', {
                    center: coords,
                    zoom: 15,
                    behaviors: ["scrollZoom", "drag"]
                });

                var myPlacemark = new ymaps.Placemark(coords, {}, {
                    // Опции
                    preset: 'twirl#redStretchyIcon',
                    balloonMaxWidth: 250
                });

                myMap.geoObjects.add(myPlacemark);

            }, afterClose: function () {
                myMap.destroy();
                myMap = null;
            }
        });
    });

    // аккордеон
    $('.acc_container').hide();
    $('.acc_trigger:first').addClass('active').next().show();

    $('.acc_trigger').click(function () {
        $(this).toggleClass('active').next().slideToggle();
        return false;
    });

    // стилизация селекта
    if ($('.js--select-styled').length) {
        $('.js--select-styled').styler({
            onSelectClosed: function () {
                if ($('.js--select-styled').hasClass('js--tab-object')) {
                    var index = $(this).find('option:selected').index();
                    $(this).closest('.tabs').find('.tabs--content').removeClass('active').eq(index).addClass('active');
                }
            }
        });
    }
    if ($('.js--select-file').length) {
        $('.js--select-file').styler({
            onFormStyled: function () {
                $('.jq-file__name').text('ПРИКРЕПИТЬ ФАЙЛ С РЕЗЮМЕ')
            }
        });
    }

    // стилизация календаря
    if ($('.js--inp-calendar').length) {
        pickmeup('.js--inp-calendar', {
            position: 'right',
            hide_on_select: true,
            locale: 'ru',
            locales: {
                ru: {
                    days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
                    daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
                    daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
                    months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
                    monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
                }
            }
        });

        pickmeup('.js--inp-calendar1', {
            position: 'left',
            hide_on_select: true,
            locale: 'ru',
            locales: {
                ru: {
                    days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
                    daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
                    daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
                    months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
                    monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
                }
            }
        });
    }

    // валидация формы
    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    // маска телефона
    if ($('.inp-phone').length) {
        $('.inp-phone').mask('+7(999)999-99-99');
    }

    // прокрутка страницы
    $('.js--page-scroll').click(function () {
        $("html, body").animate({
            scrollTop: $($(this).attr("href")).offset().top - 70 + "px"
        }, {
            duration: 500
        });
        return false;
    });

    // изменение селекта
    $('.js--change-select').on('click', function () {
        var data = $(this).data('select');
        var index;

        $('.js--changed-select option').removeAttr('selected');
        $('.js--changed-select option').each(function () {
            var option = $(this);

            if (option.val() == data) {
                index = option.index();
                option.attr('selected', 'selected')
            }
        });

        $('.js--changed-select').closest('.jq-selectbox').find('.jq-selectbox__dropdown ul li').eq(index).addClass('selected sel').siblings().removeClass('selected sel');

        $('.js--changed-select').closest('.jq-selectbox').find('.jq-selectbox__select-text').text($('.js--changed-select').closest('.jq-selectbox').find('.jq-selectbox__dropdown ul li').eq(index).text());
    });

    // Подгрузка отчеты
    $('.js--set-filter').on('click', function () {
        var form = $(this).closest('form');
        var action = form.prop('action');
        var method = form.prop('method');
        var container = $('.load-container');
        var data = form.serialize();

        $.ajax({
            url: action,
            method: method,
            data: {'data': data},
            success: function (data) {
                var data = $.parseJSON(data);
                container.empty().append(data.content);
            }
        });

        return false;
    });

    // открыть меню
    $('.js--open-menu').on('click', function () {
        $(this).toggleClass('open');
        $('.header--nav').toggleClass('open');
        return false;
    });

    // открыть внутреннее меню
    $('.js--open-dropdown').on('click', function () {
        var block = $(this);
        if (device.mobile() == true || device.tablet() == true || $(window).width() < 1070) {
            block.find('.dropdown').slideToggle(0);
        }
        return false;
    });

});
