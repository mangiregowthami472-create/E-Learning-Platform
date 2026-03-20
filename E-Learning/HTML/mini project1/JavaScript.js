// Course data - hardcoded cuz no backend lol
let courses = [
    {id: 'WD101', name: 'Web Dev Basics', lessons: 12, time: '24h', done: false, prog: 45},
    {id: 'JS200', name: 'JavaScript Pro', lessons: 15, time: '30h', done: true, prog: 100},
    {id: 'CSS301', name: 'CSS Advanced', lessons: 10, time: '20h', done: false, prog: 75},
    {id: 'HTML102', name: 'HTML Mastery', lessons: 8, time: '16h', done: false, prog: 20}
];

document.addEventListener('DOMContentLoaded', initDashboard);

async function initDashboard() {
    console.log('Dashboard loading...');
    
    // Fake loading delay - looks professional
    await fakeDelay(1200);
    
    updateStats();
    makeCourseCards();
}

function fakeDelay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function updateStats() {
    let totalProg = courses.reduce((sum, c) => sum + c.prog, 0) / courses.length;
    totalProg = Math.round(totalProg);
    
    document.getElementById('courseNum').textContent = courses.length;
    document.getElementById('progBar').style.width = totalProg + '%';
    document.getElementById('progText').textContent = totalProg + '% Complete';
}

function makeCourseCards() {
    const container = document.getElementById('courseCards');
    container.innerHTML = ''; // clear it
    
    courses.forEach(course => {
        const card = document.createElement('div');
        card.className = 'card course-item shadow-sm';
        card.innerHTML = `
            <div class="card-body">
                <h6 class="card-title">${course.name}</h6>
                <p class="mb-2">${course.lessons} lessons • ${course.time}</p>
                <div class="progress mb-2" style="height: 6px;">
                    <div class="progress-bar ${course.done ? 'bg-success' : 'bg-warning'}" 
                         style="width: ${course.prog}%"></div>
                </div>
                <small class="text-muted">${course.prog}% done</small>
                <a href="courses.html" class="btn btn-primary btn-sm mt-2">Start Course</a>
            </div>
        `;
        container.appendChild(card);
    });
}
