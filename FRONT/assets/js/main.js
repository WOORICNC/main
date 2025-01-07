$(function() {
    // aria-hidden 속성 관리 함수
    function setAriaHidden(swiper) {
        const slides = swiper.slides; // 모든 슬라이드
    
        slides.forEach((slide) => {
            // 모든 슬라이드에 aria-hidden 추가
            slide.setAttribute('aria-hidden', 'true');
            
            // 슬라이드 내부의 포커스 가능한 요소에 tabindex="-1" 추가
            const focusableElements = slide.querySelectorAll('a, button, input:not([hidden])');
            focusableElements.forEach((el) => {
                el.setAttribute('tabindex', '-1');
            });
        });
    
        // 활성 슬라이드에 aria-hidden 제거
        const activeSlide = swiper.slides[swiper.activeIndex];
        if (activeSlide) {
            activeSlide.setAttribute('aria-hidden', 'false');
    
            // 활성 슬라이드 내부의 포커스 가능한 요소에 tabindex 제거
            const activeFocusableElements = activeSlide.querySelectorAll('a, button, input:not([hidden])');
            activeFocusableElements.forEach((el) => {
                el.removeAttribute('tabindex');
            });
        }
    }
    

	// 메인 비주얼
    var visualSwiper = new Swiper(".visualSwiper", {
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            renderBullet: function (index, className) {
                const labels = ['슬라이드 1', '슬라이드 2', '슬라이드 3'];
                return `<span class="${className}"><i class="hide">${labels[index] + '이동'}</i></span>`;
            },
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        autoplay: {
            delay: 4500,
            disableOnInteraction: false,
        },
        loop: true,
        slidesPerView: 1,
        speed:2000,
        on: {
            init: function () {
                // 초기화 시 aria-hidden 설정
                setAriaHidden(this);
            },
            slideChangeTransitionEnd: function () {
                // 슬라이드 변경 시 aria-hidden 설정
                setAriaHidden(this);
            },
        },
    });

    const _main = document.querySelector('#main');
    if(_main){
        // Navigation 버튼에 aria-label 한글로 설정
        document.querySelector(".visualSwiper .swiper-button-prev").setAttribute("aria-label", "이전 슬라이드");
        document.querySelector(".visualSwiper .swiper-button-next").setAttribute("aria-label", "다음 슬라이드");
    }

    let sw = 0;
    $('.swiper-button-stop').on('click', function(){
        if(sw == 0){
            visualSwiper.autoplay.stop();
            $(this).addClass('start').text('재생');
            sw = 1;
        }else{
            visualSwiper.autoplay.start();
            $(this).removeClass('start').text('정지');
            sw = 0;
        }
    });

    // 메인 콘텐츠 2단
    var mainCont02 = new Swiper(".mainCont02", {
        navigation: {
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
        },
        slidesPerView: "auto", // 모바일
        spaceBetween: 10,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false, // 사용자가 상호작용해도 자동 재생 유지
        },
        speed: 1500,
        loopAdditionalSlides: 2,
        breakpoints: {
            1281: { // 1281px 이상
                slidesPerView: 4,
                spaceBetween: 54,
            },
            1161: { // 1161px ~ 1280px
                slidesPerView: 4,
                spaceBetween: 50,
            },
        },
    });

    // 슬라이드 일시정지 기능 추가
    document.querySelectorAll('.mainCont02 .swiper-slide').forEach((slide) => {
        slide.addEventListener('mouseover', () => {
            mainCont02.autoplay.stop(); // 마우스 오버 시 일시정지
        });

        slide.addEventListener('mouseout', () => {
            mainCont02.autoplay.start(); // 마우스 벗어나면 재생
        });

        slide.addEventListener('focus', () => {
            mainCont02.autoplay.stop(); // 포커스 시 일시정지
        });

        slide.addEventListener('blur', () => {
            mainCont02.autoplay.start(); // 포커스 해제 시 재생
        });
    });


    // 메인 콘텐츠 3단
    var insightSwiper = new Swiper(".insightSwiper", {
        navigation: {
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
        },
        scrollbar: {
            el: ".swiper-scrollbar",
            draggable: true,
        },
        slidesPerView: "auto",
        spaceBetween: 10,
        observeParents: true,
        observer: true,
        breakpoints: {
            768: {
                spaceBetween: 30,
            },
            1160: {
                spaceBetween: 40,
            }
        }
    });
});