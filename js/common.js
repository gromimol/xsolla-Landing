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
    
    // Проверяем, что оба элемента существуют, прежде чем работать с ними
    if (svg && container) {
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
            const newSlideHeight = newIsMobile ? 290 : 300;
            
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
  const isMobile = window.matchMedia('(max-width: 1200px)').matches;
  
  // Выполняем код только если это не мобильное устройство
  if (!isMobile) {
    // Регистрируем плагин
    gsap.registerPlugin(ScrollTrigger);
    
    // Создаем последовательность секций
    const sections = ['.earn', '.reedem', '.last-screen'];
    
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
      const isMobileAfterResize = window.matchMedia('(max-width: 1200px)').matches;
      
      // Если стало мобильным, удаляем все триггеры и выходим
      if (isMobileAfterResize) {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        return;
      }
      
      // Сначала убираем существующие триггеры
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      // ВАЖНО: Убираем margin-top у last-screen
      const lastScreen = document.querySelector('.last-screen');
      if (lastScreen) {
        lastScreen.style.marginTop = '0';
      }
      
      // Проверяем переполнение last-screen
      const lastScreenNeedsScroll = isContentOverflow('.last-screen');
      
      // Для redeem секции особый подход - не используем pin
      const redeemSection = document.querySelector('.reedem');
      if (redeemSection) {
        // Убираем стили пина, если они были
        redeemSection.style.position = '';
        redeemSection.style.zIndex = '';
        redeemSection.style.top = '';
        
        // Устанавливаем auto высоту для секции redeem
        redeemSection.style.height = 'auto';
        redeemSection.style.minHeight = 'auto';
      }
      
      sections.forEach((section, i) => {
        const sectionEl = document.querySelector(section);
        if (!sectionEl) return;
          
        // Получаем актуальную высоту секции
        const sectionHeight = sectionEl.offsetHeight;
        
        // Пропускаем пиннинг last-screen, если контент переполнен
        if (section === '.last-screen' && lastScreenNeedsScroll) {
          // Не применяем pin для последней секции, позволяя ей скроллиться
          sectionEl.style.position = 'relative';
          sectionEl.style.zIndex = '1';
          sectionEl.style.overflow = 'auto';
          sectionEl.style.maxHeight = '100vh';
          sectionEl.style.marginTop = '0'; // ВАЖНО: Гарантируем отсутствие отступа
          return;
        }
        
        // Стандартный подход для других секций
        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: `+=${sectionHeight}`,
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
          zIndex: 10 - i
        });
      });
      
      // Обеспечиваем плавное соединение между секциями
      const style = document.createElement('style');
      style.id = 'scroll-fix-style';
      style.textContent = `
        .reedem {
          padding-bottom: 30px;
        }
        .last-screen {
          margin-top: 0 !important;
        }
      `;
      
      // Убираем старый стиль, если он существует
      const oldStyle = document.getElementById('scroll-fix-style');
      if (oldStyle) {
        oldStyle.remove();
      }
      
      // Добавляем новый стиль
      document.head.appendChild(style);
    }
    
    // Создаем триггеры при загрузке
    createTriggers();
    
    // И обновляем при изменении размера окна
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        createTriggers();
      }, 200);
    });
    
    // Дополнительный MutationObserver для отслеживания изменений
    const observer = new MutationObserver(gsap.debounce(() => {
      // Проверяем, не появился ли снова отступ у last-screen
      const lastScreen = document.querySelector('.last-screen');
      if (lastScreen && lastScreen.style.marginTop !== '0px') {
        lastScreen.style.marginTop = '0';
      }
    }, 200));
    
    // Следим за изменениями у last-screen
    const lastScreen = document.querySelector('.last-screen');
    if (lastScreen) {
      observer.observe(lastScreen, {
        attributes: true,
        attributeFilter: ['style']
      });
    }
    
    // Дополнительная проверка после полной загрузки страницы
    window.addEventListener('load', function() {
      createTriggers();
      
      // Дополнительная защита - сбросим margin через 1 секунду после загрузки
      setTimeout(() => {
        const lastScreen = document.querySelector('.last-screen');
        if (lastScreen) {
          lastScreen.style.marginTop = '0';
        }
      }, 1000);
    });
  }
});

// Wait for the page to load
window.addEventListener("load", () => {
  // Получаем видео-элемент для всех шаров
  const sourceVideo = document.getElementById("sourceVideoBall");
  
  // Сначала скрываем все шары, чтобы не было видно черных пятен
  document.querySelectorAll("[data-ball]").forEach(element => {
    element.style.opacity = "0";
    element.style.transition = "opacity 1s ease";
    element.style.visibility = "hidden";
  });
  
  // Типы анимации
  const ANIMATION_TYPES = {
    UP_DOWN: 'up-down',
    LEFT_RIGHT: 'left-right'
  };
  
  // Настраиваем шары
  function setupBalls() {
    // Найти все элементы с атрибутом data-ball
    document.querySelectorAll("[data-ball]").forEach((element, index) => {
      // Пропускаем слишком маленькие элементы
      if (element.clientWidth < 5) return;
      
      // Создаем canvas элемент с высоким DPI для лучшего качества
      const canvas = document.createElement("canvas");
      const pixelRatio = window.devicePixelRatio || 1;
      
      const gl = canvas.getContext("webgl2", {
        antialias: true,
        alpha: true
      }) || canvas.getContext("webgl", {
        antialias: true,
        alpha: true
      });
      
      // Если WebGL не поддерживается, пропускаем
      if (!gl) return;
      
      // Настраиваем canvas с учетом pixelRatio для лучшего качества
      canvas.style.opacity = "0";
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.classList.add("transition-opacity", "duration-5000");
      
      // Устанавливаем размер canvas с учетом pixel ratio для четкости
      const size = element.clientWidth;
      canvas.width = size * pixelRatio;
      canvas.height = size * pixelRatio;
      
      // Создаем обертку для canvas
      const wrapper = document.createElement("div");
      wrapper.style.width = "100%";
      wrapper.style.height = "100%";
      wrapper.style.position = "relative";
      wrapper.appendChild(canvas);
      
      // Заменяем содержимое элемента оберткой
      element.replaceChildren(wrapper);
      element.style.overflow = "visible"; // Чтобы анимация могла выходить за границы
      
      // Добавляем случайный начальный поворот
      const initialRotation = Math.floor(Math.random() * 360) - 180; // От -180 до +180 градусов
      gsap.set(element, {
        rotation: initialRotation,
        transformOrigin: "center center"
      });
      
      // Получаем время начала для этого шара
      const startTime = element.hasAttribute("data-start-time") 
        ? parseFloat(element.getAttribute("data-start-time"))
        : Math.random() * 10; // Случайное время, если не указано
          
      // Сохраняем смещение времени
      canvas.timeOffset = startTime;
      
      // Устанавливаем текущее время видео для этого шара
      if (sourceVideo && sourceVideo.readyState >= 2) {
        sourceVideo.currentTime = startTime % sourceVideo.duration;
      }
      
      // Создаем WebGL текстуру с улучшенными параметрами
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      
      // Создаем вершинный шейдер
      const vertexShaderSource = `
        precision highp float;
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
      
      // Создаем улучшенный фрагментный шейдер для более гладкого круга
      const fragmentShaderSource = `
        precision highp float;
        varying vec2 v_texCoord;
        uniform sampler2D u_texture;
        uniform float u_padding;
        
        void main() {
          vec2 centeredCoord = v_texCoord * 2.0 - 1.0; // Convert to -1..1
          float radius = 1.0 + u_padding; // Make the circle wider
          
          // Улучшенная гладкость краев с антиалиасингом
          float distFromCenter = length(centeredCoord);
          float smoothEdge = 0.01;
          float alpha = 1.0 - smoothstep(radius - smoothEdge, radius, distFromCenter);
          
          if (alpha <= 0.0) discard; // Cut out the circle
          
          vec4 color = texture2D(u_texture, v_texCoord);
          gl_FragColor = vec4(color.rgb, color.a * alpha);
        }
      `;
      const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
      gl.shaderSource(fragmentShader, fragmentShaderSource);
      gl.compileShader(fragmentShader);
      
      // Проверка на ошибки компиляции шейдеров
      if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        console.error('Ошибка вершинного шейдера:', gl.getShaderInfoLog(vertexShader));
        return;
      }
      
      if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        console.error('Ошибка фрагментного шейдера:', gl.getShaderInfoLog(fragmentShader));
        return;
      }
      
      // Создаем и связываем шейдерную программу
      const program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Ошибка линковки программы:', gl.getProgramInfoLog(program));
        return;
      }
      
      gl.useProgram(program);
      
      // Масштабируем viewport с учетом pixel ratio
      gl.viewport(0, 0, canvas.width, canvas.height);
      
      // Создаем буфер для прямоугольника, который покажет текстуру
      const positionBuffer = gl.createBuffer();
      const positions = new Float32Array([
        -1, -1,  0, 0,  // bottom left
        1, -1,  1, 0,  // bottom right
        -1,  1,  0, 1,  // top left
        1,  1,  1, 1   // top right
      ]);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
      
      // Настраиваем атрибут положения
      const positionLocation = gl.getAttribLocation(program, "a_position");
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 16, 0);
      
      // Настраиваем атрибут текстурных координат
      const texCoordLocation = gl.getAttribLocation(program, "a_texCoord");
      gl.enableVertexAttribArray(texCoordLocation);
      gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 16, 8);
      
      // Устанавливаем uniform для отступа (для края круга)
      const paddingLocation = gl.getUniformLocation(program, "u_padding");
      gl.uniform1f(paddingLocation, -0.02); // Улучшенный параметр для более гладких краев
      
      // Включаем расширенную фильтрацию текстур для лучшего качества
      const ext = gl.getExtension("EXT_texture_filter_anisotropic");
      if (ext) {
        const max = gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
        gl.texParameterf(gl.TEXTURE_2D, ext.TEXTURE_MAX_ANISOTROPY_EXT, max);
      }
      
      // Включаем смешивание для создания прозрачных краев
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      
      // Функция анимации для обновления canvas с кадрами видео
      function render() {
        if (!gl) return;
        
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, sourceVideo);
        
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        
        requestAnimationFrame(render);
      }
      
      // Обработка изменения размера
      function handleResize() {
        if (!gl) return;
        
        const newSize = element.clientWidth;
        canvas.width = newSize * pixelRatio;
        canvas.height = newSize * pixelRatio;
        
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
      
      window.addEventListener("resize", handleResize);
      handleResize();
      render();
      canvas.style.opacity = "1";
      
      // Применяем GSAP анимации
      applyAnimation(element, index);
    });
  }
  
  // Функция для применения анимации к шару
  function applyAnimation(element, index) {
    // Определяем параметры анимации в зависимости от размера экрана
    const isMobile = window.innerWidth < 1200;
    
    // Случайные параметры анимации
    let duration, amplitudeX, amplitudeY;
    
    if (isMobile) {
      // Более короткие и мелкие движения для мобильных
      duration = 3 + Math.random() * 2; // 3-5 секунд
      amplitudeX = 15; // Меньшая амплитуда для мобильных
      amplitudeY = 20;
    } else {
      // Более длинные и заметные движения для десктопа
      duration = 5 + Math.random() * 5; // 5-10 секунд
      amplitudeX = 25; // Большая амплитуда для десктопа
      amplitudeY = 40;
    }
    
    const delay = Math.random() * 3; // 0-3 секунды задержки
    const ease = "sine.inOut"; // Плавное ускорение/замедление
    
    // Выбираем тип анимации
    const animationTypes = Object.values(ANIMATION_TYPES);
    const animationType = animationTypes[index % animationTypes.length];
    
    if (animationType === ANIMATION_TYPES.UP_DOWN) {
      gsap.to(element, {
        y: -amplitudeY - Math.random() * 10,
        duration: duration,
        ease: ease,
        repeat: -1,
        yoyo: true,
        delay: delay
      });
      
      gsap.to(element, {
        x: -amplitudeX/2 + Math.random() * amplitudeX,
        duration: duration * 1.5,
        ease: ease,
        repeat: -1,
        yoyo: true,
        delay: delay + 0.5
      });
    } else {
      // Движение влево-вправо
      gsap.to(element, {
        x: -amplitudeX + Math.random() * (amplitudeX * 2),
        duration: duration,
        ease: ease,
        repeat: -1,
        yoyo: true,
        delay: delay
      });
      
      // Дополнительное небольшое движение по Y для естественности
      gsap.to(element, {
        y: -amplitudeY/2 - Math.random() * 10,
        duration: duration * 1.3, 
        ease: ease,
        repeat: -1,
        yoyo: true,
        delay: delay + 0.7
      });
    }
    
    element.setAttribute("data-animation-type", animationType);
  }
  
  // Функция для плавного отображения шаров
  function showBalls() {
    setTimeout(() => {
      document.querySelectorAll("[data-ball]").forEach((element, index) => {
        setTimeout(() => {
          element.style.visibility = "visible";
          element.style.opacity = "1";
          
          const canvas = element.querySelector("canvas");
          if (canvas) {
            canvas.style.opacity = "1";
          }
        }, index * 100);
      });
    }, 1000);
  }
  
  // Запускаем видео и настраиваем шары
  if (sourceVideo) {
    sourceVideo.addEventListener("loadedmetadata", () => {
      sourceVideo.play().catch(error => {
        console.log("Автовоспроизведение невозможно:", error);
        
        setupBalls();
        showBalls();
      });
      
      setupBalls();
      
      // Показываем шары когда видео готово
      showBalls();
    });
    
    if (sourceVideo.readyState >= 3) { // HAVE_FUTURE_DATA или HAVE_ENOUGH_DATA
      setupBalls();
      sourceVideo.play().catch(error => {
        console.log("Автовоспроизведение невозможно:", error);
      });
      showBalls();
    }

    sourceVideo.load();
  }
});

  // Анимация контента внутри блоков при скролле
document.addEventListener('DOMContentLoaded', function() {
  const isMobile = window.matchMedia('(max-width: 1200px)').matches;
  
  if (!isMobile && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    
    const getOffset = () => {
      return window.innerWidth <= 1024 ? 50 : 300;
    };
    
    let scrollOffset = getOffset();
    
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const isMobileAfterResize = window.matchMedia('(max-width: 1200px)').matches;
        
        if (isMobileAfterResize) {
          ScrollTrigger.getAll().forEach(trigger => trigger.kill());
          
          showAllElementsOnMobile();
          return;
        }
        
        // Если не мобильн, обновляем отступ и обновляем триггеры
        scrollOffset = getOffset();
        ScrollTrigger.refresh();
      }, 200);
    });
    
    //  для показа на мобильных
    function showAllElementsOnMobile() {
      const items = document.querySelectorAll('.change-way__item');
      
      items.forEach(item => {
        const content = item.querySelector('.vertical, .text-block, .horizontal, .change-way__item__row');
        if (content) {
          gsap.set(content, { autoAlpha: 1, y: 0, x: 0 });
        }
      });
      
      const btnContainer = document.querySelector('.change-way .btn-container');
      if (btnContainer) {
        gsap.set(btnContainer, { autoAlpha: 1, y: 0 });
      }
    }
    
    const items = document.querySelectorAll('.change-way__item');
    
    if (items.length > 0) {
      if (items[0]) {
        const firstItemContent = items[0].querySelector('.vertical, .text-block');
        gsap.set(firstItemContent, { autoAlpha: 0, y: 50 });
        
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
      
      if (items.length > 1) {
        const secondItemContent = items[1].querySelector('.horizontal, .text-block');
        gsap.set(secondItemContent, { autoAlpha: 0, x: 50 });
        
        const gamesList = items[1].querySelector('.horizontal');
      
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
  } else if (isMobile) {
    if (typeof gsap !== 'undefined') {
      // для показа на мобильных
      function showAllElementsOnMobile() {
        const items = document.querySelectorAll('.change-way__item');
        
        items.forEach(item => {
          const content = item.querySelector('.vertical, .text-block, .horizontal, .change-way__item__row');
          if (content) {
            gsap.set(content, { autoAlpha: 1, y: 0, x: 0 });
          }
        });
        
        // Show the button in the container
        const btnContainer = document.querySelector('.change-way .btn-container');
        if (btnContainer) {
          gsap.set(btnContainer, { autoAlpha: 1, y: 0 });
        }
      }
      
      showAllElementsOnMobile();
      
      // If ScrollTrigger is loaded, kill all triggers
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
    } else {
      // If gsap is not loaded, just show the elements via CSS
      const style = document.createElement('style');
      style.textContent = `
        .change-way__item .vertical, 
        .change-way__item .text-block, 
        .change-way__item .horizontal, 
        .change-way__item .change-way__item__row,
        .change-way .btn-container {
          opacity: 1 !important;
          visibility: visible !important;
          transform: none !important;
        }
      `;
      document.head.appendChild(style);
    }
  } else {
    console.warn('GSAP or ScrollTrigger are not found. Make sure the libraries are loaded.');
  }
});

