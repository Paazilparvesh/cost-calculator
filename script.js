const steps = document.querySelectorAll(".step");
const lines = document.querySelectorAll(".line");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const estimateBtn = document.getElementById("estimate-btn");
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
    // content.classList.toggle("hidden", index !== currentStep === steps.length - 1);
  });

  // Enable/Disable buttons
  prevBtn.classList.toggle("disabled", currentStep === 0);
  nextBtn.classList.toggle("hidden", currentStep === steps.length - 1);
  prevBtn.classList.toggle("hidden", currentStep === steps.length - 1);
  nextBtn.textContent = currentStep === steps.length - 1 ? "Estimate" : "Next";
}

// Estimate selected elements
estimateBtn.addEventListener("click", () => {
  const selectedElements = document.querySelectorAll(".selectable:checked");
  const total = Array.from(selectedElements).reduce((sum, el) => {
    return sum + (parseFloat(el.value) || 0);
  }, 0);
  resultDisplay.textContent = `Total Estimate: ${total.toFixed(2)}`;
});

nextBtn.addEventListener("click", () => {
  if (currentStep < steps.length - 1) {
    currentStep++;
    updatePagination();
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
