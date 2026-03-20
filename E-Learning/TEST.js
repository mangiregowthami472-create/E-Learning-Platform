function calculateGrade(score, total) {
    const percentage = (score / total) * 100;
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
}

function calculateScorePercentage(score, total) {
    return (score / total) * 100;
}

function isPassed(score, total, passPercentage = 60) {
    return calculateScorePercentage(score, total) >= passPercentage;
}
describe('Quiz Grading System', () => {
    test('Grade A for 90% and above', () => {
        expect(calculateGrade(9, 10)).toBe('A');
        expect(calculateGrade(45, 50)).toBe('A');
    });

    test('Score percentage calculation', () => {
        expect(calculateScorePercentage(8, 10)).toBe(80);
        expect(calculateScorePercentage(4, 5)).toBe(80);
    });

    test('Pass/Fail determination', () => {
        expect(isPassed(6, 10)).toBe(true);
        expect(isPassed(5, 10)).toBe(false);
    });
});