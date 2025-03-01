document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Remove previous ripple effects if they exist
        const ripples = button.getElementsByClassName('ripple');
        while(ripples.length > 0) {
            ripples[0].remove();
        }
        
        // Create a new ripple element
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        // Calculate button size and determine ripple circle diameter
        const buttonRect = button.getBoundingClientRect();
        const diameter = Math.max(buttonRect.width, buttonRect.height);
        const radius = diameter / 2;
        
        // Set ripple size and position
        ripple.style.width = ripple.style.height = `${diameter}px`;
        ripple.style.left = `${e.clientX - buttonRect.left - radius}px`;
        ripple.style.top = `${e.clientY - buttonRect.top - radius}px`;
        
        // Add ripple element to the button
        button.appendChild(ripple);
        
        // Remove ripple effect after animation completes
        setTimeout(() => {
            ripple.remove();
        }, 600); // Should match animation duration
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const svg = document.querySelector('.floating-svg');
    const container = document.querySelector('.redeem');
    
    // Явно задаем размер блока независимо от размера SVG
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    container.style.width = containerWidth + 'px';
    container.style.height = containerHeight + 'px';
    
    // Убеждаемся, что SVG не пересекает границы контейнера
    const svgBounds = svg.getBoundingClientRect();
    const maxX = container.clientWidth - svgBounds.width;
    const maxY = container.clientHeight - svgBounds.height;
    
    // Если нужна более случайная анимация, можно раскомментировать этот код

    function moveRandomly() {
        const randomX = Math.min(Math.random() * maxX, maxX);
        const randomY = Math.min(Math.random() * maxY, maxY);
        const randomRotate = Math.random() * 10 - 5;
        
        svg.style.transition = 'transform 10s ease-in-out';
        svg.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;
        
        setTimeout(moveRandomly, 10000);
    }
});

// document.addEventListener('DOMContentLoaded', function() {
//     // Получаем все элементы таба и слайды контента
//     const tabItems = document.querySelectorAll('.tab-item');
//     const contentSlides = document.querySelectorAll('.tab-content-slide');
    
//     // Создаём синюю подложку, которая будет перемещаться
//     const tabBackground = document.createElement('div');
//     tabBackground.className = 'tab-background';
    
//     // Добавляем подложку в контейнер табов перед первым табом,
//     // чтобы она была под табами (z-index)
//     const tabsContainer = document.querySelector('.reedem__tabs');
//     tabsContainer.insertBefore(tabBackground, tabsContainer.firstChild);
    
//     // Позиционируем подложку на первый активный таб
//     const activeTab = document.querySelector('.tab-item.active');
//     if (activeTab) {
//         positionBackground(activeTab);
//     }
    
//     // Обработчик клика для каждого таба
//     tabItems.forEach((tab) => {
//         tab.addEventListener('click', function() {
//             // Получаем индекс таба
//             const tabIndex = this.getAttribute('data-tab');
            
//             // Если клик на уже активную вкладку - ничего не делаем
//             if (this.classList.contains('active')) {
//                 return;
//             }
            
//             // Убираем активный класс со всех табов и слайдов
//             tabItems.forEach(item => item.classList.remove('active'));
//             contentSlides.forEach(slide => {
//                 slide.classList.remove('active');
//             });
            
//             // Добавляем активный класс на текущий таб
//             this.classList.add('active');
            
//             // Анимируем перемещение синей подложки
//             positionBackground(this);
            
//             // Находим соответствующий контент и делаем его активным
//             const activeContent = document.querySelector(`.tab-content-slide[data-tab="${tabIndex}"]`);
//             if (activeContent) {
//                 activeContent.classList.add('active');
//             }
//         });
//     });
    
//     // Функция для позиционирования подложки под активный таб
//     function positionBackground(activeTab) {
//         // Получаем размеры и позицию активного таба
//         const rect = activeTab.getBoundingClientRect();
//         const containerRect = tabsContainer.getBoundingClientRect();
        
//         // Вычисляем позицию относительно контейнера табов
//         const top = rect.top - containerRect.top;
        
//         // Задаем стили для подложки с учетом паддингов
//         tabBackground.style.top = `${top}px`; // Немного выше для лучшего вида
//         tabBackground.style.height = `${rect.height}px`; // Немного выше для лучшего вида
//     }
    
//     // Обработчик изменения размера окна для пересчета позиции
//     window.addEventListener('resize', function() {
//         const currentActive = document.querySelector('.tab-item.active');
//         if (currentActive) {
//             positionBackground(currentActive);
//         }
//     });
// });

document.addEventListener('DOMContentLoaded', function() {
    // Получаем все элементы таба и слайды контента
    const tabItems = document.querySelectorAll('.tab-item');
    const contentSlides = document.querySelectorAll('.tab-content-slide');
    
    // Создаём синюю подложку, которая будет перемещаться
    const tabBackground = document.createElement('div');
    tabBackground.className = 'tab-background';
    
    // Добавляем подложку в контейнер табов перед первым табом
    const tabsContainer = document.querySelector('.reedem__tabs');
    tabsContainer.insertBefore(tabBackground, tabsContainer.firstChild);
    
    // Получаем контейнер для контента
    const tabContent = document.querySelector('.reedem-tab-content');
    
    // Создаем контейнер для слайдов
    const slidesContainer = document.createElement('div');
    slidesContainer.className = 'slides-container';
    
    // Устанавливаем фиксированную высоту контента
    const isMobile = window.innerWidth < 768;
    const slideHeight = isMobile ? 240 : 300;
    tabContent.style.height = `${slideHeight}px`;
    
    // Перемещаем все слайды в контейнер
    contentSlides.forEach(slide => {
        // Сначала удаляем из DOM
        if (slide.parentNode) {
            slide.parentNode.removeChild(slide);
        }
        
        // Устанавливаем фиксированную высоту
        slide.style.height = `${slideHeight}px`;
        
        // Добавляем в новый контейнер
        slidesContainer.appendChild(slide);
    });
    
    // Добавляем контейнер слайдов в основной контейнер
    tabContent.appendChild(slidesContainer);
    
    // Определяем начальный активный таб
    const activeTab = document.querySelector('.tab-item.active');
    if (activeTab) {
        // Получаем индекс активного таба
        const activeIndex = parseInt(activeTab.getAttribute('data-tab'));
        
        // Позиционируем слайдер сразу на нужную позицию (без анимации)
        slidesContainer.style.transition = 'none';
        slidesContainer.style.transform = `translateY(-${activeIndex * slideHeight}px)`;
        
        // Позиционируем подсветку таба
        positionBackground(activeTab);
        
        // Возвращаем анимацию после начального позиционирования
        setTimeout(() => {
            slidesContainer.style.transition = 'transform 0.5s ease';
        }, 50);
    }
    
    // Обработчик клика для каждого таба
    tabItems.forEach((tab) => {
        tab.addEventListener('click', function() {
            // Получаем индекс таба
            const tabIndex = parseInt(this.getAttribute('data-tab'));
            
            // Если клик на уже активную вкладку - ничего не делаем
            if (this.classList.contains('active')) {
                return;
            }
            
            // Убираем активный класс со всех табов
            tabItems.forEach(item => item.classList.remove('active'));
            
            // Добавляем активный класс на текущий таб
            this.classList.add('active');
            
            // Анимируем перемещение синей подложки
            positionBackground(this);
            
            // Анимируем перемещение слайдера к нужному слайду
            slidesContainer.style.transform = `translateY(-${tabIndex * slideHeight}px)`;
        });
    });
    
    // Функция для позиционирования подложки под активный таб
    function positionBackground(activeTab) {
        // Получаем размеры и позицию активного таба
        const rect = activeTab.getBoundingClientRect();
        const containerRect = tabsContainer.getBoundingClientRect();
        
        // Вычисляем позицию относительно контейнера табов
        const top = rect.top - containerRect.top;
        
        // Задаем стили для подложки
        tabBackground.style.top = `${top}px`;
        tabBackground.style.height = `${rect.height}px`;
    }
    
    // Обработчик изменения размера окна
    window.addEventListener('resize', function() {
        // Проверяем, изменился ли тип устройства
        const wasIsMobile = slideHeight === 240;
        const newIsMobile = window.innerWidth < 768;
        
        // Если тип устройства изменился, обновляем высоту
        if (wasIsMobile !== newIsMobile) {
            const newSlideHeight = newIsMobile ? 240 : 300;
            
            // Обновляем высоту контейнера
            tabContent.style.height = `${newSlideHeight}px`;
            
            // Обновляем высоту всех слайдов
            contentSlides.forEach(slide => {
                slide.style.height = `${newSlideHeight}px`;
            });
            
            // Обновляем позицию слайдера
            const activeIndex = parseInt(document.querySelector('.tab-item.active').getAttribute('data-tab'));
            slidesContainer.style.transform = `translateY(-${activeIndex * newSlideHeight}px)`;
        }
        
        // Обновляем позицию подложки
        const currentActive = document.querySelector('.tab-item.active');
        if (currentActive) {
            positionBackground(currentActive);
        }
    });
});

// Маски ввода для платежной формы
document.addEventListener('DOMContentLoaded', function() {
    // Маска для номера карты (формат: xxxx xxxx xxxx xxxx)
    const cardNumberInput = document.querySelector('.card-number');
    cardNumberInput.addEventListener('input', function(e) {
      let value = e.target.value;
      
      // Удаляем все нецифровые символы
      value = value.replace(/\D/g, '');
      
      // Добавляем пробел после каждых 4 цифр
      value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
      
      // Ограничиваем до 16 цифр (19 символов с пробелами)
      if (value.length > 19) {
        value = value.substring(0, 19);
      }
      
      e.target.value = value;
    });
    
    // Маска для даты истечения срока (формат: MM/YY)
    const expiryInput = document.querySelector('.card-date');
    expiryInput.addEventListener('input', function(e) {
      let value = e.target.value;
      
      // Удаляем все нецифровые символы
      value = value.replace(/\D/g, '');
      
      // Добавляем слеш после 2 цифр
      if (value.length > 2) {
        value = value.substring(0, 2) + '/' + value.substring(2);
      }
      
      // Ограничиваем до 4 цифр (5 символов со слешем)
      if (value.length > 5) {
        value = value.substring(0, 5);
      }
      
      // Проверяем месяц
      if (value.length >= 2) {
        const month = parseInt(value.substring(0, 2));
        if (month > 12) {
          value = '12' + value.substring(2);
        }
        if (month === 0) {
          value = '01' + value.substring(2);
        }
      }
      
      e.target.value = value;
    });
    
    // Маска для CVC/CVV (только 3 или 4 цифры)
    const cvcInput = document.querySelector('.card-cvc');
    cvcInput.addEventListener('input', function(e) {
      let value = e.target.value;
      
      // Удаляем все нецифровые символы
      value = value.replace(/\D/g, '');
      
      // Ограничиваем до 4 цифр (большинство карт используют 3, но Amex - 4)
      if (value.length > 4) {
        value = value.substring(0, 4);
      }
      
      e.target.value = value;
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    // Находим все заголовки аккордеона
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    // Открываем первый элемент аккордеона по умолчанию
    const firstItem = document.querySelector('.accordion-item');
    if (firstItem) {
      firstItem.classList.add('active');
    }
    
    // Добавляем обработчик клика для каждого заголовка
    accordionHeaders.forEach(header => {
      header.addEventListener('click', function() {
        // Находим родительский элемент (accordion-item)
        const parentItem = this.parentElement;
        
        // Проверяем, активен ли данный элемент
        const isActive = parentItem.classList.contains('active');
        
        // Сначала закрываем все активные элементы
        const allItems = document.querySelectorAll('.accordion-item');
        allItems.forEach(item => {
          item.classList.remove('active');
        });
        
        // Если элемент не был активен, делаем его активным
        if (!isActive) {
          parentItem.classList.add('active');
        }
      });
    });
  });

  $(document).ready(function(){
    $('.game-slider').slick({
        slidesToShow: 7,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '0px',
        focusOnSelect: true,
        prevArrow: $('.prev-arrow'),
        nextArrow: $('.next-arrow'),
        dots: true,
        appendDots: $('.slider-dots'),
        customPaging: function(slider, i) {
            return '<button type="button"></button>';
        },
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
    
    // Устанавливаем активный слайд (NetEase Games - 4-й слайд, индекс 3)
    $('.game-slider').slick('slickGoTo', 3);
    
    // Обновление активного класса при смене слайда
    $('.game-slider').on('afterChange', function(event, slick, currentSlide){
        $('.game-title').removeClass('active');
        $('.slide').eq(currentSlide).find('.game-title').addClass('active');
    });
});