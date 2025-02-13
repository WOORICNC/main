$(function () {
    // base
    fn_common()
    // gnb
    // fn_layout()
    // contents
    fn_contents()
    // heaer, footer import
    // 퍼블리싱을 위한 작업이며 개발 시 하기 스크립트 주석처리 또는 제거 후 상단 fn_layout()만 실행
    fn_layoutImport();
    fn_gnbAnimation();
    fn_updateZoomClass();
    fn_skipNavMain();
    // fn_homeClick();
})

// 브라우저 줌 상태 확인
const fn_updateZoomClass = () => {
    const zoomLevel = window.devicePixelRatio;

    if (zoomLevel > 1) {
        $('.depth01 .gnbOpen').addClass('zoomIn')
    } else {
        return false;
    }
}

// gnb 애니메이션
const fn_gnbAnimation = () => {
    const frames = $('.imgWrap .layer');

    frames.each(function () {
        const frame = $(this); // 현재 img 요소
        const animation = frame.attr('data-animation');
        const timing = frame.attr('data-time');
        const delay = frame.attr('data-animation-delay');

        if (animation === 'up') {
            frame.addClass('up');
        } else if (animation === 'down') {
            frame.addClass('down');
        }else if (animation === 'left') {
            frame.addClass('left');
        }else if (animation === 'right') {
            frame.addClass('right');
        } else {
            console.warn('Unknown animation type:', animation);
        }

        if(timing === '500'){
            frame.addClass('time05s');
        }else if(timing === '1000'){
            frame.addClass('time1s');
        }else if(timing === '1500'){
            frame.addClass('time15s');
        }

        if(delay === '200'){
            frame.addClass('delay200');
        }else if(delay === '500'){
            frame.addClass('delay500');
        }else if(delay === '1000'){
            frame.addClass('delay1000');
        }
    });
};

const fn_gnb = () => {
    // 0105 gnb event
    const gnb = $("#header .gnb");
    // $(gnb).find('li:nth-child(4').addClass("on");
    // $(gnb).find('li:nth-child(4').children("div").stop().slideDown(200);
    // gnb.children("li:not('.sitemapBtn')").on('mouseenter focusin',function(){
    //     console.log('test');
    // 	$(this).addClass("on");
    // 	$(this).children("div").stop().slideDown(200);
    // });
    // gnb.children("li:not('.sitemapBtn')").on('mouseleave focusout',function(){
    // 	$(this).removeClass("on");
    // 	$(this).children("div").stop().slideUp(200);
    // });
    if (1160 >= $(window).width()) {
        $('nav').hide();
        $('#header .util').hide();
        $('nav .gnbOpen').hide();
        $('.mMenuBtn').on('click', (() => {

            if(!$('#header').hasClass('active')){
                $('nav').show();
                $('#header .util').show();
                setTimeout(()=>{
                    $('html').addClass('unscroll');
                    $('#header').addClass('active');
                    $('nav').addClass('active');
                    $('nav .depth01 > li:first-child > a').focus();
                }, 10)
            }else{
                $('nav').hide();
                $('#header .util').hide();
                setTimeout(()=>{
                    $('html').removeClass('unscroll');
                    $('#header').removeClass('active');
                }, 10)
                setTimeout(()=>{
                    $('nav').removeClass('active');
                }, 15)
            }
        }))
        $('.depth01 > li > a').on('click', ((e) => {
            e.preventDefault();
            const target = $(e.currentTarget).parent('li');
            const depth = $(target).find('ul[class*="depth"]').length;
            const showState = $(target).hasClass('active');

            if (depth > 0 && !showState) {
                $(target).siblings('li').removeClass('active').find('.gnbOpen').slideUp(200);;
                $(target).addClass('active').find('.gnbOpen').slideDown(200);
            } else if (depth > 0 && showState) {
                $(target).removeClass('active').find('.gnbOpen').slideUp(200);
            }
        }));
        $('#header .util a:last-child').on('keydown', ((e)=>{
            if(e.key === 'Tab'){    
                $('nav .depth01 > li:nth-child(1) > a:first-child').focus();
                $('nav').scrollTop(0)
            }
        }))
    } else if ($(window).width() > 1160) {
        gnb.find(' > li > a').on('mouseenter hover focus', ((e) => {
            // const depth = $(e.currentTarget).parent('li').find('.gnbOpen');
            $('#header').addClass('scroll');
            // depth.addClass('active')
            gnb.addClass('open').find('.layer').addClass('layerShow');
            // $(e.currentTarget).parent('li').siblings().find('.gnbOpen').removeClass('active').find('a').attr('tabindex', '-1');
            // $(e.currentTarget).parent('li').siblings().find('.gnbOpen').find('.layer').removeClass('layerShow');
            // depth.addClass('active').find('a').removeAttr('tabindex');
            // depth.find('.layer').addClass('layerShow')
        }))
        gnb.on('mouseleave focusout', ((e) => {
            if(!$('#container').length > 0){
                $('#header').removeClass('scroll');
            }
            setTimeout(() => {
                if (!gnb.find(':focus').length) {
                    gnb.removeClass('open');
                    gnb.removeClass('open').find('.gnbOpen .layer').removeClass('layerShow');
                }
            }, 50); // 지연 시간 추가
        }))
    }
}

const fn_layout = () => {
    let header = $('#header'),
        familySite = $('.familySite');

    // 헤더 스크롤
    $(window).scroll(function () {
        if ($(window).scrollTop() > 0) header.addClass('scroll');
        else header.removeClass('scroll');
        // main 아닐 시 header에 scroll 클래스 추가하여 ui상태 변경하는 스크립트
        // 개발 시 확인 후 삭제 또는 활용 필요 
        if($('#container').length > 0){
            $('#header').addClass('scroll');
        }
    });

    // 관련사이트
    familySite.on('click', '.site', function (e) {
        e.preventDefault();
        if ($(this).hasClass('open')) {
            $(this).removeClass('open').attr('aria-expanded', 'false') // 2025-01-07 aria 속성 추가
            $(this).siblings('ul').slideUp(200);
        } else {
            $(this).addClass('open').attr('aria-expanded', 'true'); // 2025-01-07 aria 속성 추가
            $(this).siblings('ul').slideDown(200);
        }
    });

    familySite.on("click", "ul li a", function (e) {
        e.preventDefault();
        $(".site").removeClass("on");
        $(this).closest("ul").slideUp(200);
        let $txt = $(this).text(),
            $src = $(this).attr("data-src"),
            btnMove = $(".btnMove");
        familySite.find(".site").text($txt);
        btnMove.attr("href", $src);
    });
    fn_gnb();
}

const fn_common = () => {
    // skip nav
    $("a[href^='#']").click(function (e) {
        const anchortarget = $(this).attr('href');
        $(anchortarget).attr('tabindex', -1).focus()
        $(anchortarget).removeAttr('tabindex')
    })
    if (window.location.hash) $(window.location.hash).attr('tabindex', -1).focus()

    var skipNav = $('#skipNav a')
    skipNav.focus(function () {
        skipNav.removeClass('on')
        $(this).addClass('on')
    })
    skipNav.blur(function () {
        skipNav.removeClass('on')
    })

    // file add
    $('[type="file"]').on('change', ((e)=>{
        const fakeInput = $(e.currentTarget).next('input[type="text"]');
        const fileNm = $(e.currentTarget).val().split('\\');

        fakeInput.val(fileNm[fileNm.length - 1]);
    }))

}

const fn_contents = () => {
    // tab
    $('.tabFunc').each(function () {
        let currIndex = 0
        const tab = $(this),
            tabTit = tab.find('> .tabTit ul li'),
            tabCont = tab.find('> .tabCont > div');

        const currEvent = (currIndex) => {
            tabTit.removeClass('curr').find('> a').removeAttr('title');
            tabTit.eq(currIndex).addClass('curr').find('> a').attr('title', '선택됨');
            tabCont.hide().eq(currIndex).show();
        }

        tabTit.each(function (idx) {
            const tabTitle = $(this).text();
            tabCont.eq(idx).prepend(`<h3 class="hide">${tabTitle}</h3>`);
            $(this).hasClass('curr') && (currIndex = idx);
            $(this).find('> a').click(function (e) {
                e.preventDefault();
                currEvent(idx);
            })
        })
        currEvent(currIndex);
    })

    // 데이트피커
	// if($(".date").length){
    //     if(!$('.date input').length) return;
	// 	$(".date input").datepicker({
	// 		dateFormat: 'yy-mm-dd',
	// 		showOtherMonths: true,
	// 		showMonthAfterYear:true,
	// 		changeYear: true,
	// 		changeMonth: true,          
	// 		showOn: "both",
	// 		buttonImage: "../assets/images/icon/ico-date.svg",
	// 		buttonImageOnly: true,
	// 		buttonText: "선택",
	// 		monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'],
	// 		monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
	// 		dayNamesMin: ['일','월','화','수','목','금','토'],
	// 		dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일']
	// 	});
	// }
    
    // 아코디언
    if($(".accordion").length){
        $(".accordion button").click(function() {
            var $button = $(this);
            var $content = $(this).parent("h4").next(".accoCon"); 

            $(".accoCon").not($content).slideUp();
            $(".accordion button").not($button).removeClass("on"); 

            $content.stop(true, true).slideToggle();
            $button.toggleClass("on");
        });
    }

    // 정보 및 검색영역 펼치기 / 닫기
    if ($(window).width() < 1161) {
        $('.btnDropdown').on('click', ((e) => {
            if($(e.currentTarget).hasClass('info')){
                $(e.currentTarget).toggleClass('on');
                $('.compLoca').slideToggle(200);
                $(e.currentTarget).text($(e.currentTarget).text() == '정보 숨기기' ? '정보 보기' : '정보 숨기기');
            }else{
                $(e.currentTarget).toggleClass('on');
                $(e.currentTarget).parent().siblings().slideToggle(200);
                $(e.currentTarget).text($(e.currentTarget).text() == '닫기' ? '펼치기' : '닫기');
            }
        }))
    }

    $('.btnHidden').on('click', ((e) => {
        $(e.currentTarget).toggleClass('on');
        $(e.currentTarget).text($(e.currentTarget).text() == '비밀번호 보기' ? '비밀번호 숨기기' : '비밀번호 보기');
    }))
}

// 레이어 팝업
function fn_layer(e,t,s) {
    var pdt = $('#'+e).find('> .inner').css('padding-top').replace(/[^-\d\.]/g, ''),
        pdb = $('#'+e).find('> .inner').css('padding-bottom').replace(/[^-\d\.]/g, '');
    $('#'+e).fadeIn(200).addClass('on');
    $('body, html').css({'overflow':'hidden'});
    $('#'+e).find('> .inner .layerCont').attr("tabindex",0).focus();

    const $popup = $('#' + e);
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const $focusableContent = $popup.find(focusableElements);
    const $firstFocusableElement = $focusableContent.first();
    const $lastFocusableElement = $focusableContent.last();

    $popup.on('keydown', function (e) {
        const isTabPressed = e.key === 'Tab' || e.keyCode === 9;

        if (!isTabPressed) return;

        if (e.shiftKey) {
            // Shift + Tab
            if ($(document.activeElement).is($firstFocusableElement)) {
                e.preventDefault();
                $lastFocusableElement.focus();
            }
        } else {
            // Tab
            if ($(document.activeElement).is($lastFocusableElement)) {
                e.preventDefault();
                $firstFocusableElement.focus();
            }
        }
    });

    // 팝업 활성화 시 첫 번째 포커스
    $firstFocusableElement.focus();

    $(window).resize(function(){
        $('#'+e).find('> .inner').css({'width':s+'px'});
        if($(window).width() > 767){
            $('#'+e).find('.layerCont').css({'max-height':$('#'+e).height()*0.9 - (Number(pdt) + Number(pdb))});
        }else{
            $('#'+e).find('.layerCont').css({'max-height':$('#'+e).height() - (Number(pdt) + Number(pdb))});
        }
    }).resize();
    $(t).addClass(e);
}

// 레이어 팝업 닫기
function fn_layer_close(t){
    var backFocus = $(t).closest(".layerPop").attr("id");
    $(t).closest(".inner").parent().fadeOut(200).removeClass("on");
    $("body, html").css({"overflow":"auto"});
    $("." + backFocus).focus();
    if($("#"+backFocus).hasClass("alertPop")){
        setTimeout(function(){
            $(".alertPop").remove();
        },200);
    }
}

const fn_layoutImport = () => {
    const _importHeader = $('#headerImport');
    const _importFooter = $('#footerImport');
    const _mypage = $('.sitemap').find('li:nth-child(2) a').text();

    if(_importHeader.length > 0 && _importFooter.length > 0 && _mypage === '마이페이지'){
        _importFooter.load('UI-F-0101.html #footer');
        _importHeader.load('UI-F-0101.html #header', (() => {
            fn_layout()
            if($('#container').length > 0) $('#header').addClass('scroll');
            return false;
        }));
    }
    else if (_importHeader.length > 0 && _importFooter.length > 0) {
        _importFooter.load('UI-F-0100.html #footer');
        _importHeader.load('UI-F-0100.html #header', (() => {
            fn_layout()
            if($('#container').length > 0) $('#header').addClass('scroll');
            return false;
        }));
    } else {
        // import 된 div 없어도 gnb 스크립트 실행
        fn_layout()
    }
}

const fn_homeClick = () =>{
    $('.sitemap .home').on('focus', function () {
        const currentScrollTop = $(window).scrollTop();
    
        if (currentScrollTop >= 110) {
          $('html, body').animate({ scrollTop: 50 }, 300, function () {
            $('.sitemap .home').focus();
          });
        }
      });
}

// 메인 / 서브 스킵 내비게이터 href값 변경 스크립트
const fn_skipNavMain = () => {
    // #main과 #container 요소를 순서대로 확인
    const _skip = document.querySelector('#skipNav')
    const _goToMain = _skip.querySelector('dd a');
    const mainElement = document.querySelector("#main");
    const containerElement = document.querySelector("#container");    
    
    if (mainElement) {
        // #main 요소로 포커스
        _goToMain.setAttribute('href', '#main');
    } else if (containerElement) {
        // #container 요소로 포커스
        _goToMain.setAttribute('href', '#container');
    }
}
