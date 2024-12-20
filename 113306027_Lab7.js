// Select DOM elements
const mathGradeInput = document.getElementById("math-grade");
const englishGradeInput = document.getElementById("english-grade");
const submitButton = document.getElementById("submit-button");
const gradesTableBody = document.querySelector("#grades-table tbody");
const mathAverageCell = document.getElementById("math-average");
const englishAverageCell = document.getElementById("english-average");
const overallAverageCell = document.getElementById("overall-average");

// Initialize arrays to store grades
let mathGrades = [];
let englishGrades = [];

// Function to calculate average
function calculateAverage(grades) {
    if (grades.length === 0) return 0;
    const total = grades.reduce((sum, grade) => sum + grade, 0);
    return (total / grades.length).toFixed(2);
}

// Function to update averages in the table footer
function updateAverages() {
    const mathAverage = calculateAverage(mathGrades);
    const englishAverage = calculateAverage(englishGrades);
    const overallAverage = calculateAverage([...mathGrades, ...englishGrades]);

    mathAverageCell.textContent = mathAverage;
    englishAverageCell.textContent = englishAverage;
    overallAverageCell.textContent = overallAverage;
}

// Event listener for the submit button
submitButton.addEventListener("click", () => {
    const mathGrade = parseFloat(mathGradeInput.value);
    const englishGrade = parseFloat(englishGradeInput.value);

    // Validate input
    if (isNaN(mathGrade) || isNaN(englishGrade) || mathGrade < 0 || mathGrade > 100 || englishGrade < 0 || englishGrade > 100) {
        alert("Please enter valid grades between 0 and 100.");
        return;
    }

    // Add grades to arrays
    mathGrades.push(mathGrade);
    englishGrades.push(englishGrade);

    // Add a new row to the table
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td>${mathGrade}</td>
        <td>${englishGrade}</td>
        <td>${((mathGrade + englishGrade) / 2).toFixed(2)}</td>
    `;
    gradesTableBody.appendChild(newRow);

    // Update averages
    updateAverages();

    // Clear input fields
    mathGradeInput.value = "";
    englishGradeInput.value = "";
});
