document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Удаляем предыдущие эффекты ряби, если они есть
        const ripples = button.getElementsByClassName('ripple');
        while(ripples.length > 0) {
            ripples[0].remove();
        }
        
        // Создаем новый элемент ряби
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        // Вычисляем размер кнопки и определяем диаметр круга ряби
        const buttonRect = button.getBoundingClientRect();
        const diameter = Math.max(buttonRect.width, buttonRect.height);
        const radius = diameter / 2;
        
        // Устанавливаем размеры и позицию ряби
        ripple.style.width = ripple.style.height = `${diameter}px`;
        ripple.style.left = `${e.clientX - buttonRect.left - radius}px`;
        ripple.style.top = `${e.clientY - buttonRect.top - radius}px`;
        
        // Добавляем элемент ряби в кнопку
        button.appendChild(ripple);
        
        // Удаляем эффект ряби после завершения анимации
        setTimeout(() => {
            ripple.remove();
        }, 600); // Должно совпадать с временем анимации
    });
});