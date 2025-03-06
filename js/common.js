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
    const slideHeight = isMobile ? 290 : 300;
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
        const wasIsMobile = slideHeight === 290;
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
                    slidesToShow: 5
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3
                }
            },
        ]
    });
    
    // Устанавливаем активный слайд (NetEase Games - 4-й слайд, индекс 3)
    $('.game-slider').slick('slickGoTo', 3);
    
    // Обновление активного класса при смене слайда
    $('.game-slider').on('afterChange', function(event, slick, currentSlide){
        $('.game-title').removeClass('active');
        $('.slide').eq(currentSlide).find('.game-title').addClass('active');
    });

    $('.has-submenu').on('click', function(e) {
      $(this).toggleClass('active');
    })
    $('.has-submenu a').on('click', function(e) {
      e.preventDefault();
    });

    $('.burger').on('click',function() {
      $('body').addClass('menu-open');
    })
    $('.close').on('click',function() {
      $('body').removeClass('menu-open');
    })
});

document.addEventListener('DOMContentLoaded', function() {
  // Проверяем, является ли устройство мобильным
  const isMobile = window.matchMedia('(max-width: 767px)').matches;
  
  // Выполняем код только если это не мобильное устройство
  if (!isMobile) {
    // Регистрируем плагин
    gsap.registerPlugin(ScrollTrigger);
    
    // Создаем последовательность секций
    const sections = ['.earn', '.reedem', '.last-screen'];
    
    // Функция для конвертации rem в px
    function remToPx(rem) {
      return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
    }
    
    // Функция для проверки переполнения контента в секции
    function isContentOverflow(section) {
      const element = document.querySelector(section);
      if (!element) return false;
      
      // Проверяем, превышает ли контент высоту видимой области
      const contentHeight = element.scrollHeight;
      const viewportHeight = window.innerHeight;
      
      return contentHeight > viewportHeight * 1.1; // Добавляем небольшой запас (10%)
    }
    
    // Пересоздаем триггеры при изменении размера окна
    function createTriggers() {
      // Проверяем, не стало ли устройство мобильным после ресайза
      const isMobileAfterResize = window.matchMedia('(max-width: 767px)').matches;
      
      // Если стало мобильным, удаляем все триггеры и выходим
      if (isMobileAfterResize) {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        return;
      }
      
      // Сначала убираем существующие триггеры
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      // Проверяем переполнение last-screen
      const lastScreenNeedsScroll = isContentOverflow('.last-screen');
      
      sections.forEach((section, i) => {
        const sectionEl = document.querySelector(section);
        if (!sectionEl) return;
        
        // Получаем актуальную высоту с учетом rem
        const sectionHeight = sectionEl.offsetHeight;
        
        // Пропускаем пиннинг last-screen, если контент переполнен
        if (section === '.last-screen' && lastScreenNeedsScroll) {
          // Не применяем pin для последней секции, позволяя ей скроллиться
          return;
        }
        
        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: `+=${sectionHeight}`,
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
          zIndex: 10 - i,
          // Добавляем onRefresh для учета изменений в rem
          onRefresh: self => {
            // Обновляем высоту с учетом текущего значения fontSize
            self.vars.end = `+=${document.querySelector(section).offsetHeight}`;
          }
        });
      });
      
      // Добавляем специальные стили для last-screen, если нужен скролл
      const lastScreen = document.querySelector('.last-screen');
      if (lastScreen) {
        if (lastScreenNeedsScroll) {
          // Стили для скроллируемой последней секции
          lastScreen.style.position = 'relative';
          lastScreen.style.zIndex = '1';
          lastScreen.style.overflow = 'auto';
          lastScreen.style.maxHeight = '100vh';
          
          // Добавляем отступ перед last-screen, чтобы он начинался после .reedem
          const redeemSection = document.querySelector('.reedem');
          if (redeemSection) {
            const redeemHeight = redeemSection.offsetHeight;
            lastScreen.style.marginTop = `${redeemHeight}px`;
          }
        } else {
          // Сбрасываем стили, если скролл не нужен
          lastScreen.style.position = '';
          lastScreen.style.zIndex = '';
          lastScreen.style.overflow = '';
          lastScreen.style.maxHeight = '';
          lastScreen.style.marginTop = '';
        }
      }
    }
    
    // Создаем триггеры при загрузке
    createTriggers();
    
    // И обновляем при изменении размера окна и/или изменении fontSize (rem)
    window.addEventListener('resize', gsap.debounce(() => {
      // Проверяем, изменилось ли значение fontSize
      createTriggers();
    }, 200));
    
    // Дополнительный MutationObserver для отслеживания изменений fontSize (для rem)
    const htmlElement = document.documentElement;
    const fontSizeObserver = new MutationObserver(gsap.debounce(() => {
      createTriggers();
    }, 200));
    
    // Следим за изменениями стилей HTML-элемента
    fontSizeObserver.observe(htmlElement, {
      attributes: true,
      attributeFilter: ['style']
    });
    
    // Дополнительная проверка после полной загрузки страницы
    window.addEventListener('load', createTriggers);
  }
});

// Wait for the page to load
window.addEventListener("load", () => {
    // Get the source video - we'll use only one video for all balls
    const sourceVideo = document.getElementById("sourceVideoBall");
    
    // Animation types - убрали вращение
    const ANIMATION_TYPES = {
      UP_DOWN: 'up-down',
      LEFT_RIGHT: 'left-right'
    };
    
    // Set up the balls
    function setupBalls() {
      // Find all elements with data-ball attribute
      document.querySelectorAll("[data-ball]").forEach((element, index) => {
        // Skip if element is too small
        if (element.clientWidth < 5) return;
        
        // Create a canvas element
        const canvas = document.createElement("canvas");
        const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
        
        // Skip if WebGL is not supported
        if (!gl) return;
        
        // Set up the canvas
        canvas.style.opacity = "0";
        canvas.classList.add("transition-opacity", "duration-5000");
        canvas.width = element.clientWidth;
        canvas.height = element.clientWidth; // Making it square
        
        // Create a wrapper div for the canvas to apply transforms without affecting WebGL rendering
        const wrapper = document.createElement("div");
        wrapper.style.width = "100%";
        wrapper.style.height = "100%";
        wrapper.style.position = "relative";
        wrapper.appendChild(canvas);
        
        // Replace the element's content with the wrapper
        element.replaceChildren(wrapper);
        element.style.overflow = "visible"; // Allow animation to overflow
        
        // Добавляем случайный начальный поворот для разнообразия
        const initialRotation = Math.floor(Math.random() * 360) - 180; // От -180 до +180 градусов
        gsap.set(element, {
          rotation: initialRotation,
          transformOrigin: "center center"
        });
        
        // Get start time for this ball
        const startTime = element.hasAttribute("data-start-time") 
          ? parseFloat(element.getAttribute("data-start-time"))
          : Math.random() * 10; // Random start time if not specified
          
        // Store the time offset for this ball
        canvas.timeOffset = startTime;
        
        // Set the video's current time to the offset for this ball
        // Note: This won't affect other balls since we're using textures
        if (sourceVideo.readyState >= 2) { // If video is ready
          sourceVideo.currentTime = startTime % sourceVideo.duration;
        }
        
        // Create a WebGL texture
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        
        // Create the vertex shader
        const vertexShaderSource = `
          attribute vec2 a_position;
          attribute vec2 a_texCoord;
          varying vec2 v_texCoord;
          void main() {
            gl_Position = vec4(a_position, 0.0, 1.0);
            v_texCoord = a_texCoord;
          }
        `;
        const vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader, vertexShaderSource);
        gl.compileShader(vertexShader);
        
        // Create the fragment shader (makes the circle shape)
        const fragmentShaderSource = `
          precision highp float;
          varying vec2 v_texCoord;
          uniform sampler2D u_texture;
          uniform float u_padding;
          void main() {
            vec2 centeredCoord = v_texCoord * 2.0 - 1.0; // Convert to -1..1
            float radius = 1.0 + u_padding; // Make the circle wider
            
            if (dot(centeredCoord, centeredCoord) > radius * radius) discard; // Cut out the circle
            
            gl_FragColor = texture2D(u_texture, v_texCoord);
          }
        `;
        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader, fragmentShaderSource);
        gl.compileShader(fragmentShader);
        
        // Create and link the shader program
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        gl.useProgram(program);
        
        // Create a buffer for the rectangle that will show the texture
        const positionBuffer = gl.createBuffer();
        const positions = new Float32Array([
          -1, -1,  0, 0,  // bottom left
           1, -1,  1, 0,  // bottom right
          -1,  1,  0, 1,  // top left
           1,  1,  1, 1   // top right
        ]);
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
        
        // Set up the position attribute
        const positionLocation = gl.getAttribLocation(program, "a_position");
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 16, 0);
        
        // Set up the texture coordinate attribute
        const texCoordLocation = gl.getAttribLocation(program, "a_texCoord");
        gl.enableVertexAttribArray(texCoordLocation);
        gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 16, 8);
        
        // Set the padding uniform (for the circle edge)
        const paddingLocation = gl.getUniformLocation(program, "u_padding");
        gl.uniform1f(paddingLocation, -3 / canvas.width);
        
        // Enable texture filter for better quality
        const ext = gl.getExtension("EXT_texture_filter_anisotropic");
        if (ext) {
          const max = gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
          gl.texParameterf(gl.TEXTURE_2D, ext.TEXTURE_MAX_ANISOTROPY_EXT, max);
        }
        
        // Animation function to update the canvas with video frames
        function render() {
          if (!gl) return;
          
          gl.bindTexture(gl.TEXTURE_2D, texture);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, sourceVideo);
          
          gl.clear(gl.COLOR_BUFFER_BIT);
          gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
          
          requestAnimationFrame(render);
        }
        
        // Handle resizing
        function handleResize() {
          if (!gl) return;
          
          canvas.width = element.clientWidth;
          canvas.height = element.clientWidth;
          gl.viewport(0, 0, canvas.width, canvas.height);
        }
        
        window.addEventListener("resize", handleResize);
        handleResize();
        render();
        canvas.style.opacity = "1";
        
        // Apply GSAP animations to the element
        applyAnimation(element, index);
      });
    }
    
    // Функция для применения анимации к шару
    function applyAnimation(element, index) {
      // Выбираем тип анимации
      const animationTypes = Object.values(ANIMATION_TYPES);
      const animationType = animationTypes[index % animationTypes.length]; // Распределяем анимации между шарами
      
      // Случайные параметры для анимаций
      const duration = 5 + Math.random() * 5; // 5-10 секунд для более заметного и плавного движения
      const delay = Math.random() * 3; // 0-3 секунды задержки
      const ease = "sine.inOut"; // Плавное ускорение/замедление
      
      // Применяем анимацию в зависимости от типа
      switch (animationType) {
        case ANIMATION_TYPES.UP_DOWN:
          // Более выраженное движение вверх-вниз
          gsap.to(element, {
            y: -40 - Math.random() * 20, // Увеличенное вертикальное движение (40-60px)
            duration: duration,
            ease: ease,
            repeat: -1,
            yoyo: true,
            delay: delay
          });
          break;
          
        case ANIMATION_TYPES.LEFT_RIGHT:
          // Плавное движение влево-вправо с увеличенной амплитудой
          gsap.to(element, {
            x: -25 + Math.random() * 50, // Увеличенное горизонтальное движение (-25 до +25px)
            duration: duration,
            ease: ease,
            repeat: -1,
            yoyo: true,
            delay: delay
          });
          break;
      }
      
      // Добавляем небольшую противоположную анимацию для более естественного эффекта "парения"
      if (animationType === ANIMATION_TYPES.UP_DOWN) {
        // Если основная анимация вверх-вниз, добавляем легкое движение влево-вправо
        gsap.to(element, {
          x: -10 + Math.random() * 20, // Небольшое горизонтальное движение
          duration: duration * 1.5, // Немного другой период для асинхронности
          ease: ease,
          repeat: -1,
          yoyo: true,
          delay: delay + 0.5 // Небольшая дополнительная задержка
        });
      } else {
        // Если основная анимация влево-вправо, добавляем легкое движение вверх-вниз
        gsap.to(element, {
          y: -15 - Math.random() * 10, // Небольшое вертикальное движение
          duration: duration * 1.3, // Другой период
          ease: ease,
          repeat: -1,
          yoyo: true,
          delay: delay + 0.7 // Другая задержка
        });
      }
      
      // Add a special attribute to remember which animation was applied
      element.setAttribute("data-animation-type", animationType);
    }
    
    // When the video is ready
    sourceVideo.addEventListener("loadedmetadata", () => {
      // Set up all balls
      setupBalls();
      
      // Start the video
      sourceVideo.play();
    });
    
    // Ensure video loads
    sourceVideo.load();
  });

  // Анимация контента внутри блоков при скролле
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, что GSAP и ScrollTrigger загружены
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      // Регистрируем плагин ScrollTrigger
      gsap.registerPlugin(ScrollTrigger);
      
      // Определяем значение отступа в зависимости от размера экрана
      const getOffset = () => {
        return window.innerWidth <= 1024 ? 50 : 300;
      };
      
      // Инициализация переменной отступа
      let scrollOffset = getOffset();
      
      // Обновляем значение при изменении размера окна
      window.addEventListener('resize', () => {
        scrollOffset = getOffset();
        // Обновляем все экземпляры ScrollTrigger
        ScrollTrigger.refresh();
      });
      
      // Получаем все блоки change-way__item
      const items = document.querySelectorAll('.change-way__item');
      
      // Проверяем, что элементы существуют
      if (items.length > 0) {
        // Для первого блока (снизу вверх)
        if (items[0]) {
          // Сначала скрываем внутренний контент
          const firstItemContent = items[0].querySelector('.vertical, .text-block');
          gsap.set(firstItemContent, { autoAlpha: 0, y: 50 });
          
          // Создаем анимацию для контента первого блока
          gsap.to(firstItemContent, { 
            autoAlpha: 1, 
            y: 0, 
            duration: 0.8, 
            ease: 'power2.out',
            scrollTrigger: {
              trigger: items[0],
              start: () => `top bottom-=${scrollOffset}`,
              toggleActions: 'play none none reverse'
            }
          });
        }
        
        // Для второго блока (справа налево) с задержкой 0.5 секунды
        if (items.length > 1) {
          // Сначала скрываем внутренний контент
          const secondItemContent = items[1].querySelector('.horizontal, .text-block');
          gsap.set(secondItemContent, { autoAlpha: 0, x: 50 });
          
          // Находим список игр внутри блока
          const gamesList = items[1].querySelector('.horizontal');
          
          // Создаем анимацию для контента второго блока с задержкой
          gsap.to(secondItemContent, { 
            autoAlpha: 1, 
            x: 0, 
            duration: 0.8, 
            delay: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: items[1],
              start: () => `top bottom-=${scrollOffset}`,
              toggleActions: 'play none none reverse'
            },
            onComplete: function() {
              // Код анимации скроллинга остаётся без изменений
              if (gamesList) {
                const scrollWidth = gamesList.scrollWidth - gamesList.clientWidth;
                if (scrollWidth > 0) {
                  gsap.to(gamesList, {
                    scrollLeft: scrollWidth,
                    duration: 4,
                    ease: "power1.out",
                    delay: 0.3
                  });
                }
              }
            }
          });
        }
        
        // Для третьего блока (появление)
        if (items.length > 2) {
          const thirdItemContent = items[2].querySelector('.change-way__item__row');
          gsap.set(thirdItemContent, { autoAlpha: 0 });
          
          gsap.to(thirdItemContent, { 
            autoAlpha: 1, 
            duration: 1, 
            ease: 'power2.out',
            scrollTrigger: {
              trigger: items[2],
              start: () => `top bottom-=${scrollOffset}`,
              toggleActions: 'play none none reverse'
            }
          });
        }
      }
      
      // Анимация кнопки в контейнере
      const btnContainer = document.querySelector('.change-way .btn-container');
      if (btnContainer) {
        gsap.set(btnContainer, { autoAlpha: 0, y: 30 });
        
        gsap.to(btnContainer, { 
          autoAlpha: 1, 
          y: 0, 
          duration: 0.8, 
          delay: 0.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: btnContainer,
            start: () => `top bottom-=${scrollOffset > 250 ? 250 : scrollOffset}`,
            toggleActions: 'play none none reverse'
          }
        });
      }
    } else {
      console.warn('GSAP или ScrollTrigger не найдены. Убедитесь, что библиотеки загружены.');
    }
  });

