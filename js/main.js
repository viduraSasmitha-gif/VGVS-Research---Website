// Main JavaScript Logic

// --- Constants & Config ---
const APP_NAME = "VGVS Research";
const DEFAULT_LANG = "en";

// --- State Management (Simple) ---
let currentLang = localStorage.getItem('app_lang') || DEFAULT_LANG;

// --- Translations ---
const translations = {
    en: {
        home: "Home",
        research: "Research Papers",
        research_title: "Research Library",
        research_subtitle: "Explore the latest findings and publications.",
        login: "Login",
        register: "Register",
        welcome_badge: "Advanced Research Platform",
        hero_title_1: "Discover & Share",
        hero_title_2: "World Class Research",
        hero_desc: "Access a curated collection of groundbreaking research papers. Join our exclusive community of researchers and innovators today.",
        explore_btn: "Explore Papers",
        join_btn: "Join Community",
        stat_papers: "Research Papers",
        stat_views: "Total Views",
        dashboard: "Dashboard",
        logout: "Logout",
        search_placeholder: "Search for topics...",
        upload_btn: "Upload Research",
        footer_copy: "© 2026 VGVS Research. All rights reserved."
    },
    si: {
        home: "මුල් පිටුව",
        research: "පර්යේෂණ පත්‍රිකා",
        research_title: "පර්යේෂණ පුස්තකාලය",
        research_subtitle: "නවතම සොයාගැනීම් සහ ප්‍රකාශනයන් ගවේෂණය කරන්න.",
        login: "ඇතුල් වන්න",
        register: "ලියාපදිංචි වන්න",
        welcome_badge: "උසස් පර්යේෂණ වේදිකාව",
        hero_title_1: "සොයාගන්න & බෙදාගන්න",
        hero_title_2: "ලෝක මට්ටමේ පර්යේෂණ",
        hero_desc: "සුවිශේෂී පර්යේෂණ පත්‍රිකා එකතුවකට පිවිසෙන්න. අපගේ පර්යේෂකයන්ගේ ප්‍රජාවට අදම එක්වන්න.",
        explore_btn: "පර්යේෂණ බලන්න",
        join_btn: "එක්වන්න",
        stat_papers: "පර්යේෂණ පත්‍රිකා",
        stat_views: "මුළු නැරඹුම්",
        dashboard: "පාලක පුවරුව",
        logout: "ඉවත් වන්න",
        search_placeholder: "මාතෘකා සොයන්න...",
        upload_btn: "පර්යේෂණ උඩුගත කරන්න",
        footer_copy: "© 2026 VGVS Research. සියලුම හිමිකම් ඇවිරිණි."
    },
    ta: {
        home: "முகப்பு",
        research: "ஆராய்ச்சி கட்டுரைகள்",
        research_title: "ஆராய்ச்சி நூலகம்",
        research_subtitle: "புதிய கண்டுபிடிப்புகள் மற்றும் வெளியீடுகளை ஆராயவும்.",
        login: "உள்நுழைய",
        register: "பதிவு",
        welcome_badge: "மேம்பட்ட ஆராய்ச்சி தளம்",
        hero_title_1: "கண்டுபிடி & பகிர்",
        hero_title_2: "உலகத் தரம் வாய்ந்த ஆராய்ச்சி",
        hero_desc: "முக்கியமான ஆராய்ச்சி கட்டுரைகளின் தொகுப்பை அணுகவும். ஆராய்ச்சியாளர்கள் மற்றும் புதிய கண்டுபிடிப்பாளர்களின் சமூகத்தில் இன்றே இணையுங்கள்.",
        explore_btn: "ஆய்வுகளை பார்",
        join_btn: "இணையுங்கள்",
        stat_papers: "ஆராய்ச்சி கட்டுரைகள்",
        stat_views: "மொத்த பார்வைகள்",
        dashboard: "முகப்பு",
        logout: "வெளியேறு",
        search_placeholder: "தலைப்புகளைத் தேடுங்கள்...",
        upload_btn: "ஆராய்ச்சி பதிவேற்று",
        footer_copy: "© 2026 VGVS Research. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை."
    }
};

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    initClock();
    initLanguage();
    initStats();
    checkAuth();

    // Smooth fade-in
    document.body.classList.add('opacity-0', 'transition-opacity', 'duration-1000');
    setTimeout(() => {
        document.body.classList.remove('opacity-0');
        document.body.classList.add('opacity-100');
    }, 100);
});

// --- Clock Functionality ---
function initClock() {
    const updateTime = () => {
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour12: false });
        const dateString = now.toLocaleDateString(currentLang === 'si' ? 'si-LK' : (currentLang === 'ta' ? 'ta-LK' : 'en-US'), {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const clockInfo = document.getElementById('clock');
        const dateInfo = document.getElementById('date-display');

        if (clockInfo) clockInfo.textContent = timeString;
        if (dateInfo) dateInfo.textContent = dateString;
    };

    updateTime(); // initial call
    setInterval(updateTime, 1000);
}

// --- Language Functionality ---
function initLanguage() {
    changeLanguage(currentLang);
}

function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('app_lang', lang);

    // Update text content
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Update current language display in navbar
    const langDisplay = document.getElementById('current-lang');
    if (langDisplay) {
        langDisplay.textContent = lang.toUpperCase();
    }
}

// exoprt global
window.changeLanguage = changeLanguage;


// --- Stats Functionality (Mock Persistence) ---
function initStats() {
    // Increment total views on load
    let views = parseInt(localStorage.getItem('total_views') || '1240');

    // Only increment view if it's a new session visit (optional logic, kept simple here to always increment for demo effect)
    if (!sessionStorage.getItem('viewed')) {
        views += Math.floor(Math.random() * 5) + 1; // Random increment
        localStorage.setItem('total_views', views);
        sessionStorage.setItem('viewed', 'true');
    }

    // Get papers count
    const papers = JSON.parse(localStorage.getItem('research_papers') || '[]');
    const paperCount = papers.length > 0 ? papers.length : 42; // Fallback to a nice number if empty for demo

    const viewEl = document.getElementById('stats-views');
    const paperEl = document.getElementById('stats-papers');

    if (viewEl) viewEl.textContent = views.toLocaleString();
    if (paperEl) paperEl.textContent = paperCount.toLocaleString();
}

// --- Auth Functionality ---
function checkAuth() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const authContainer = document.getElementById('auth-buttons');

    if (authContainer && currentUser) {
        // User is logged in
        authContainer.innerHTML = `
            <span class="text-gray-300 mr-2">Hi, ${currentUser.username}</span>
            <a href="dashboard.html" class="text-white hover:text-blue-400 font-medium mr-4 transition-colors" data-i18n="dashboard">Dashboard</a>
            <button onclick="logout()" class="px-4 py-2 border border-white/20 rounded-full text-sm hover:bg-white/10 transition-colors" data-i18n="logout">Logout</button>
        `;
        // Re-apply translation to new elements
        changeLanguage(currentLang);
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.reload();
}
window.logout = logout;
