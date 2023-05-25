// Get all the select elements
const selects = Array.from(document.querySelectorAll('select'));

// Add an event listener to each select element
selects.forEach(select => {
  select.addEventListener('change', (event) => {
    const selectedValue = event.target.value;

    // Iterate over all select elements
    selects.forEach(otherSelect => {
      // Skip the current select element
      if (otherSelect !== select) {
        // Enable all options in other select elements
        Array.from(otherSelect.options).forEach(option => {
          option.disabled = false;
        });

        // Disable the selected option in other select elements
        Array.from(otherSelect.options).forEach(option => {
          if (option.value === selectedValue) {
            option.disabled = true;
          }
        });
      }
    });
  });
});
