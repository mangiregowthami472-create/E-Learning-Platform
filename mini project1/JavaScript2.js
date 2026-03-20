// Quiz data - 8 questions cuz 5 was too easy
const questions = [
    {q: "What does HTML really mean?", opts: ["HyperText Markup Language", "HotMail Language", "HyperText Mail Language"], ans: 0},
    {q: "CSS stands for?", opts: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets"], ans: 1},
    {q: "JavaScript file extension?", opts: [".html", ".css", ".js", ".php"], ans: 2},
    {q: "localStorage saves data:", opts: ["On server", "In browser", "In RAM only"], ans: 1},
    {q: "Promise is for:", opts: ["Sync code", "Async code", "CSS animations"], ans: 1},
    {q: "async/await replaces:", opts: [".then()", "for loops", "if statements"], ans: 0},
    {q: "DOM means:", opts: ["Data Object Model", "Document Object Model", "Dynamic Object Method"], ans: 1},
    {q: "setTimeout() does what?", opts: ["Speeds up code", "Delays code", "Stops code"], ans: 1}
];

let qIndex = 0;
let score = 0;
let answers = [];

document.addEventListener('DOMContentLoaded', loadQuiz);

async function loadQuiz() {
    try {
        console.log('Loading quiz...');
        document.querySelector('#quiz-container .loading').style.display = 'block';
        
        // Simulate API call
        await new Promise(r => setTimeout(r, 2000));
        
        document.querySelector('#quiz-container .loading').remove();
        showQuestion();
        document.getElementById('nextBtn').style.display = 'block';
        
    } catch(e) {
        console.error('Quiz load failed:', e);
        alert('Something went wrong!');
    }
}

function showQuestion() {
    if (qIndex >= questions.length) {
        finishQuiz();
        return;
    }
    
    const q = questions[qIndex];
    const container = document.getElementById('quiz-container');
    
    container.innerHTML = `
        <div class="loading">Loading question ${qIndex + 1}...</div>
        <h4>Q${qIndex + 1}: ${q.q}</h4>
        ${q.opts.map((opt, i) => `
            <div class="form-check mb-3">
                <input type="radio" class="form-check-input" id="opt${i}" name="q${qIndex}" value="${i}">
                <label class="form-check-label" for="opt${i}">${opt}</label>
            </div>
        `).join('')}
        <div class="progress mb-3">
            <div class="progress-bar" style="width: ${((qIndex)/questions.length)*100}%"></div>
        </div>
    `;
    
    // Event listeners for answers
    document.querySelectorAll(`input[name="q${qIndex}"]`).forEach(radio => {
        radio.addEventListener('change', (e) => {
            answers[qIndex] = parseInt(e.target.value);
        });
    });
}

document.getElementById('nextBtn').addEventListener('click', () => {
    if (!answers[qIndex]) {
        alert('Pick an answer first!');
        return;
    }
    qIndex++;
    showQuestion();
});

// Calculate score with switch statement
function finishQuiz() {
    score = answers.reduce((total, ans, i) => total + (ans === questions[i].ans ? 1 : 0), 0);
    const percent = Math.round((score / questions.length) * 100);
    
    // Save to localStorage
    localStorage.setItem('quizResult', JSON.stringify({
        score, percent, date: new Date().toLocaleString()
    }));
    
    let message;
    switch(true) {
        case percent >= 90: message = "You're a genius! 🎉"; break;
        case percent >= 75: message = "Great job! 👏"; break;
        case percent >= 60: message = "Not bad! Keep going 📖"; break;
        default: message = "Try again! 💪";
    }
    
    document.getElementById('quiz-container').innerHTML = `
        <div class="text-center p-5">
            <h2>${score}/${questions.length} (${percent}%)</h2>
            <div class="progress mb-4" style="height:30px;">
                <div class="progress-bar ${percent >= 60 ? 'bg-success' : 'bg-danger'}" style="width:${percent}%"></div>
            </div>
            <h4>${message}</h4>
            <button class="btn btn-primary" onclick="location.reload()">Retake</button>
        </div>
    `;
}
