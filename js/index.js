// ===== LANGUAGE SELECTOR =====
const langBtn = document.getElementById('langBtn');
const langDropdown = document.getElementById('langDropdown');
const langLinks = langDropdown.querySelectorAll('a');

// Toggle dropdown
langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const selector = langBtn.closest('.lang-selector');
    selector.classList.toggle('active');
});

// Close dropdown on outside click
document.addEventListener('click', () => {
    langBtn.closest('.lang-selector').classList.remove('active');
});

// Handle language selection
langLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = link.dataset.lang;
        const page = link.dataset.page;

        // Save to localStorage
        localStorage.setItem('mewschool_lang', lang);

        // Redirect to the language-specific page
        window.location.href = page;
    });
});

// Auto-redirect based on saved language (if on default page)
(function checkLanguage() {
    const savedLang = localStorage.getItem('mewschool_lang');
    if (savedLang) {
        const currentPage = window.location.pathname.split('/').pop();
        // If user is on default Hebrew page but has another language saved
        if (currentPage === 'index.html' || currentPage === 'index_he.html') {
            if (savedLang !== 'he') {
                const langMap = {
                    'ru': 'index_ru.html',
                    'en': 'index_en.html'
                };
                if (langMap[savedLang]) {
                    window.location.href = langMap[savedLang];
                }
            }
        }
    }
})();

// Highlight current language in dropdown
(function highlightCurrentLang() {
    const savedLang = localStorage.getItem('mewschool_lang') || 'he';
    langLinks.forEach(link => {
        if (link.dataset.lang === savedLang) {
            link.classList.add('active-lang');
        }
    });
})();