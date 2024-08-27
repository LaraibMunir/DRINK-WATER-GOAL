const smallCups = document.querySelectorAll('.cup-small');
const litersElement = document.getElementById('liters');
const percentageElement = document.getElementById('percentage');
const remainedElement = document.getElementById('remained');

const totalLiters = 2; // The total goal (2 liters)

// Update the UI when the page loads
updateBigCup();

// Add event listeners to all small cups
smallCups.forEach((cup, index) => {
  cup.addEventListener('click', () => highlightCups(index));
});

function highlightCups(index) {
  // Logic to handle toggling the last full cup
  if (
    smallCups[index].classList.contains('full') &&
    !smallCups[index].nextElementSibling?.classList.contains('full')
  ) {
    index--;
  }

  // Fill the cups up to the selected index
  smallCups.forEach((cup, idx) => {
    if (idx <= index) {
      cup.classList.add('full');
    } else {
      cup.classList.remove('full');
    }
  });

  // Update the big cup with remaining liters and percentage
  updateBigCup();
}

function updateBigCup() {
  const fullCups = document.querySelectorAll('.cup-small.full').length;
  const totalCups = smallCups.length;

  // Calculate and update percentage
  if (fullCups === 0) {
    percentageElement.style.visibility = 'hidden';
    percentageElement.style.height = 0;
  } else {
    percentageElement.style.visibility = 'visible';
    percentageElement.style.height = `${(fullCups / totalCups) * 330}px`;
    percentageElement.innerText = `${(fullCups / totalCups) * 100}%`;
  }

  // Calculate and update remaining liters
  const remainingLiters = totalLiters - (fullCups * 0.25);
  litersElement.innerText = `${remainingLiters}L`;

  if (remainingLiters === 0) {
    remainedElement.style.visibility = 'hidden';
    remainedElement.style.height = 0;
  } else {
    remainedElement.style.visibility = 'visible';
  }
}
