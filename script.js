// Initialize EmailJS with your public key
// emailjs.init("w5boYqdC71W0U2nt3");

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

// Move to a specific step when clicking on a step circle
steps.forEach((step, index) => {
  step.addEventListener("click", () => {
    currentStep = index;
    updatePagination();
  });
});

// function sendEmail() {
//   const serviceID = "service_ud1v1oc"; // Replace with your EmailJS service ID
//   const templateID = "__ejs-test-mail-service__"; // Replace with your EmailJS template ID

//   const templateParams = {
//       to_name: document.getElementById("to_name").value,
//       to_email: document.getElementById("to_email").value,
//       message: document.getElementById("message").value
//   };

//   emailjs.send(serviceID, templateID, templateParams)
//       .then(response => {
//           alert("Email sent successfully!");
//           console.log("SUCCESS!", response);
//       })
//       .catch(error => {
//           alert("Failed to send email.");
//           console.error("ERROR:", error);
//       });
// }