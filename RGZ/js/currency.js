// Общие функции для всех страниц
document.addEventListener('DOMContentLoaded', function() {
    // Плавная прокрутка к якорям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.getAttribute('href') === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Показать/скрыть кнопку "наверх"
    window.addEventListener('scroll', function() {
        const toTop = document.querySelector('.to-top');
        if (window.pageYOffset > 300) {
            toTop.style.display = 'flex';
        } else {
            toTop.style.display = 'none';
        }
    });
});

// Функции для страницы новостей
function showFullNews(id) {
    const newsFull = document.getElementById('news-' + id);
    const btn = event.target;
    
    if (newsFull.style.display === 'block') {
        newsFull.style.display = 'none';
        btn.textContent = 'Показать полностью';
    } else {
        newsFull.style.display = 'block';
        btn.textContent = 'Скрыть';
    }
}
document.addEventListener('DOMContentLoaded', function() {
    // Установка текущей даты
    const now = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    document.getElementById('current-date').textContent = now.toLocaleDateString('ru-RU', options);
    
    // Загрузка курса валют
    fetch('https://www.cbr-xml-daily.ru/daily_json.js')
        .then(response => response.json())
        .then(data => {
            const uahRate = data.Valute.UAH.Value.toFixed(2);
            document.getElementById('uah-rate').textContent = `1 UAH = ${(1 / data.Valute.UAH.Value).toFixed(4)} RUB`;
            
            // Сохраняем курс для калькулятора
            window.uahRate = uahRate;
            
            // Загрузка данных для графика
            loadChartData();
        })
        .catch(error => {
            console.error('Ошибка загрузки курса валют:', error);
            document.getElementById('uah-rate').textContent = 'Не удалось загрузить курс';
        });
});

function convert(direction) {
    if (!window.uahRate) return;
    
    if (direction === 'rub-to-uah') {
        const rubValue = parseFloat(document.getElementById('rub-input').value);
        if (!isNaN(rubValue)) {
            document.getElementById('uah-input').value = (rubValue / window.uahRate).toFixed(2);
        }
    } else {
        const uahValue = parseFloat(document.getElementById('uah-input').value);
        if (!isNaN(uahValue)) {
            document.getElementById('rub-input').value = (uahValue * window.uahRate).toFixed(2);
        }
    }
}

function calculate() {
    if (document.getElementById('rub-input').value && !document.getElementById('uah-input').value) {
        convert('rub-to-uah');
    } else if (document.getElementById('uah-input').value && !document.getElementById('rub-input').value) {
        convert('uah-to-rub');
    }
}

function loadChartData() {
    // Здесь должна быть реализация загрузки исторических данных
    // Для примера используем фиктивные данные
    
    const dates = [];
    const rates = [];
    
    for (let i = 30; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        dates.push(date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }));
        
        // Генерация случайного курса вокруг текущего
        const baseRate = 2.5; // Примерный курс гривны
        const randomRate = baseRate + (Math.random() - 0.5) * 0.2;
        rates.push(randomRate.toFixed(4));
    }
    
    createChart(dates, rates);
}

function createChart(dates, rates) {
    const ctx = document.getElementById('currency-chart').getContext('2d');
    
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dates,
            datasets: [{
                label: 'Курс UAH к RUB',
                data: rates,
                backgroundColor: 'rgba(0, 51, 102, 0.7)',
                borderColor: 'rgba(0, 51, 102, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: false
                }
            },
            onClick: (e, elements) => {
                if (elements.length > 0) {
                    const index = elements[0].index;
                    const date = dates[index];
                    const rate = rates[index];
                    
                    document.getElementById('chart-info').innerHTML = `
                        <p>Дата: <strong>${date}</strong></p>
                        <p>Курс: <strong>1 UAH = ${(1 / rate).toFixed(4)} RUB</strong></p>
                    `;
                    
                    // Подсветка выбранного столбца
                    chart.data.datasets[0].backgroundColor = dates.map((d, i) => 
                        i === index ? 'rgba(255, 204, 0, 0.7)' : 'rgba(0, 51, 102, 0.7)'
                    );
                    chart.update();
                }
            }
        }
    });
}