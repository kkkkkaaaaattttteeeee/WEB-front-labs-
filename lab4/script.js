// Получаем ссылку на кнопку удерживания
const holdButton = document.getElementById('holdButton');

// Получаем ссылку на индикатор загрузки (обертка)
const loadingBar = document.getElementById('loadingBar');

// Создаем новый div-элемент, который будет использоваться для визуализации процесса загрузки
const loadingFill = document.createElement('div');

// Назначаем этому новому элементу класс 'loading-fill' для стилей (предполагается наличие соответствующего стиля в CSS)
loadingFill.className = 'loading-fill';

// Добавляем созданный элемент внутрь индикатора загрузки
loadingBar.appendChild(loadingFill);

// Обработчик события нажатия кнопки мыши (mousedown):
// Когда кнопка нажата, ширина индикатора становится равной 100%, имитируя заполнение загрузки
holdButton.addEventListener('mousedown', () => {
    loadingFill.style.width = '100%';
});

// Обработчик события отпускания кнопки мыши (mouseup):
// Когда мышь отпущена, ширина индикатора сбрасывается обратно в 0%
holdButton.addEventListener('mouseup', () => {
    loadingFill.style.width = '0%';
});

// Обработчик события ухода мыши с области кнопки (mouseleave):
// Если пользователь отведёт мышь от кнопки, индикатор также сбросится в исходное состояние (ширина 0%)
holdButton.addEventListener('mouseleave', () => {
    loadingFill.style.width = '0%';
});
