const coursesData = {
    "web-development": {
        id: "web-development",
        title: "Web Development Fundamentals",
        lessons: ["HTML Basics", "CSS Styling", "JavaScript Essentials", "Responsive Design"],
        completed: false,
        progress: 75
    },
    "javascript": {
        id: "javascript",
        title: "Advanced JavaScript",
        lessons: ["ES6 Features", "Async Programming", "DOM Manipulation", "APIs & Fetch"],
        completed: false,
        progress: 40
    },

};
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initStorage();
    updateActiveNav();
    initBreadcrumb();
});
function initNavigation() {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function updateActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === currentPage);
    });
}
function initBreadcrumb() {
    const breadcrumb = document.querySelector('.breadcrumb');
    if (breadcrumb) {
        const path = window.location.pathname.split('/').pop().replace('.html', '');
        const pages = {
            'dashboard': ['Home', 'Dashboard'],
            'courses': ['Home', 'Courses'],
            'quiz': ['Home', 'Courses', 'Quiz'],
            'profile': ['Home', 'Profile']
        };
        breadcrumb.innerHTML = pages[path]?.map((page, i) => 
            i === pages[path].length - 1 ? 
            `<span>${page}</span>` : 
            `<a href="${i === 0 ? 'dashboard.html' : page + '.html'}">${page}</a> > `
        ).join('') || '';
    }
}
function initStorage() {
    const userData = JSON.parse(localStorage.getItem('eLearningUser')) || {
        name: 'Taissin Sulthana',
        email: 'taissin@gmail.com',
        completedCourses:['react'],
        quizScores: {}
    };
    Object.keys(coursesData).forEach(courseId => {
        coursesData[courseId].completed = userData.completedCourses.includes(courseId);
    });
    
    localStorage.setItem('eLearningUser', JSON.stringify(userData));
    return userData;
}
function saveCourseProgress(courseId, progress) {
    const userData = JSON.parse(localStorage.getItem('eLearningUser'));
    if (!userData.completedCourses.includes(courseId)) {
        coursesData[courseId].progress = progress;
    }
    localStorage.setItem('eLearningUser', JSON.stringify(userData));
}