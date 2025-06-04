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