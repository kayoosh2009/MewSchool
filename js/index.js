// ===== LANGUAGE SELECTOR =====
const langBtn = document.getElementById('langBtn');
const langDropdown = document.getElementById('langDropdown');
const langLinks = langDropdown.querySelectorAll('a');

// Открытие/закрытие выпадающего списка
if (langBtn) {
    langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const selector = langBtn.closest('.lang-selector');
        selector.classList.toggle('active');
    });
}

// Закрытие списка при клике вне его области
document.addEventListener('click', () => {
    if (langBtn) {
        const selector = langBtn.closest('.lang-selector');
        if (selector) {
            selector.classList.remove('active');
        }
    }
});

// Обработка выбора языка (только переход на страницу, без сохранения в localStorage)
langLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = link.dataset.page;
        if (page) {
            window.location.href = page;
        }
    });
});