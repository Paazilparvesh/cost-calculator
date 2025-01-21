// script.js
const steps = document.querySelectorAll(".step");
const lines = document.querySelectorAll(".line");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const stepContents = document.querySelectorAll(".step-content");
const resultDisplay = document.getElementById("result");

let currentStep = 0;

function updatePagination() {
  // Update step classes
  steps.forEach((step, index) => {
    step.classList.remove("active", "completed");
    if (index < currentStep) step.classList.add("completed");
    if (index === currentStep) step.classList.add("active");
  });

  // Update line classes
  lines.forEach((line, index) => {
    line.classList.remove("completed");
    if (index < currentStep) line.classList.add("completed");
  });

  // Toggle step content visibility
  stepContents.forEach((content, index) => {
    content.classList.toggle("hidden", index !== currentStep);
  });

  // Enable/Disable buttons
  prevBtn.classList.toggle("disabled", currentStep === 0);
  nextBtn.textContent = currentStep === steps.length - 1 ? "Calculate" : "Next";
}

nextBtn.addEventListener("click", () => {
  if (currentStep < steps.length - 1) {
    currentStep++;
    updatePagination();
  } else {
    // Perform calculation
    const value1 = parseFloat(document.getElementById("value1").value) || 0;
    const value2 = parseFloat(document.getElementById("value2").value) || 0;
    const operation = document.getElementById("operation").value;
    let result;

    switch (operation) {
      case "add":
        result = value1 + value2;
        break;
      case "subtract":
        result = value1 - value2;
        break;
      case "multiply":
        result = value1 * value2;
        break;
      case "divide":
        result = value2 !== 0 ? value1 / value2 : "Error: Division by zero";
        break;
      default:
        result = "Invalid operation";
    }

    resultDisplay.textContent = `Result: ${result}`;
  }
});

prevBtn.addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep--;
    updatePagination();
  }
});

// Initialize
updatePagination();
