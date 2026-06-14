const mathTopics = [
    // { grade: "Класс", topic: "Тема", link: "Ссылка" },
];

const topicsContainer = document.getElementById('topicsContainer');
const searchInput = document.getElementById('searchInput');
const noResults = document.getElementById('noResults');

function renderTopics(filterText = '') {
    topicsContainer.innerHTML = '';

    const filteredTopics = mathTopics.filter(item =>
        item.topic.toLowerCase().includes(filterText.toLowerCase()) ||
        item.grade.toLowerCase().includes(filterText.toLowerCase())
    );

    if (filteredTopics.length === 0) {
        noResults.classList.add('visible');
        return;
    } else {
        noResults.classList.remove('visible');
    }

    // Группируем темы по классам
    const grouped = {};
    filteredTopics.forEach(item => {
        if (!grouped[item.grade]) {
            grouped[item.grade] = [];
        }
        grouped[item.grade].push(item);
    });

    const sortedGrades = Object.keys(grouped).sort();

    sortedGrades.forEach(grade => {
        grouped[grade].sort((a, b) => a.topic.localeCompare(b.topic, 'he'));

        const section = document.createElement('div');
        section.className = 'grade-section';

        const title = document.createElement('h2');
        title.className = 'grade-title';
        title.textContent = grade;
        section.appendChild(title);

        const list = document.createElement('div');
        list.className = 'topics-list';

        grouped[grade].forEach(topic => {
            const link = document.createElement('a');
            link.href = topic.link;
            link.className = 'topic-item';
            link.innerHTML = `
                        <span class="topic-icon">📐</span>
                        <span class="topic-name">${topic.topic}</span>
                    `;
            list.appendChild(link);
        });

        section.appendChild(list);
        topicsContainer.appendChild(section);
    });
}

searchInput.addEventListener('input', (e) => {
    renderTopics(e.target.value.trim());
});

renderTopics();

const langBtn = document.getElementById('langBtn');
const langDropdown = document.getElementById('langDropdown');
const langLinks = langDropdown.querySelectorAll('a');

langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    langBtn.closest('.lang-selector').classList.toggle('active');
});

document.addEventListener('click', () => {
    langBtn.closest('.lang-selector').classList.remove('active');
});

langLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.setItem('mewschool_lang', link.dataset.lang);
        window.location.href = link.dataset.page;
    });
});

(function checkLanguage() {
    const savedLang = localStorage.getItem('mewschool_lang');
    if (savedLang) {
        const currentPage = window.location.pathname.split('/').pop();
        if (currentPage === 'math.html' || currentPage === '') {
            if (savedLang !== 'he') {
                const langMap = { 'ru': 'index_ru.html', 'en': 'index_en.html' };
                if (langMap[savedLang]) window.location.href = langMap[savedLang];
            }
        }
    }
})();

(function highlightCurrentLang() {
    const savedLang = localStorage.getItem('mewschool_lang') || 'he';
    langLinks.forEach(link => {
        if (link.dataset.lang === savedLang) link.classList.add('active-lang');
    });
})();