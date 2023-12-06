document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('newsletterForm');
  const header = document.querySelector('header');
  const selectedAreasContainer = document.getElementById('selectedAreas');
  const areasSelectField = document.getElementById('area');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const successMessage = document.getElementById('successMessage');

  const setCustomValidationMessages = () => {
    const requiredInputs = document.querySelectorAll('input[required]');

    requiredInputs.forEach((input) => {
      input.oninvalid = (event) =>
        event.target.setCustomValidity('Vänligen fyll i detta fält');

      input.oninput = (event) => event.target.setCustomValidity('');
    });
  };

  const createAreaItem = (option) => {
    const areaDiv = document.createElement('div');

    areaDiv.textContent = option.textContent;
    return areaDiv;
  };

  const createRemoveAreaButton = (option) => {
    const removeButton = document.createElement('button');

    removeButton.textContent = 'Ta bort';
    removeButton.addEventListener('click', () => {
      option.selected = false;
      updateSelectedAreas();
    });

    return removeButton;
  };

  const updateSelectedAreas = () => {
    const selectedAreas = Array.from(areasSelectField.selectedOptions);

    selectedAreasContainer.innerHTML = '';

    selectedAreas.forEach((option) => {
      const areaDiv = createAreaItem(option);
      const removeButton = createRemoveAreaButton(option);

      areaDiv.appendChild(removeButton);
      selectedAreasContainer.appendChild(areaDiv);
    });
  };

  const resetForm = () => {
    form.style.display = 'block';
    header.style.display = 'block';
    successMessage.innerHTML = '';
    selectedAreasContainer.innerHTML = '';
    nameInput.value = '';
    emailInput.value = '';
  };

  const createSuccessMessage = () => {
    const userName = nameInput.value.trim();
    const userEmail = emailInput.value.trim();
    const goBackButton = document.createElement('button');

    goBackButton.addEventListener('click', () => resetForm());
    goBackButton.textContent = 'Tillbaka';

    // Hide form and header
    form.style.display = 'none';
    header.style.display = 'none';

    successMessage.innerHTML = `
        <h2>Tack ${userName} för din anmälan</h2>
        Du kommer att få vårt nyhetsbrev till <strong>${userEmail}</strong> inom kort.
    `;

    successMessage.appendChild(goBackButton);
  };

  setCustomValidationMessages();

  areasSelectField.addEventListener('change', updateSelectedAreas);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    createSuccessMessage();
  });
});
