const adviceText = document.querySelector('.advice-text');
const adviceNumber = document.querySelector('#advice-number');
const diceButton = document.querySelector('#dice');
const loadingIndicator = document.createElement('div');


loadingIndicator.classList.add('loading');
loadingIndicator.textContent = 'Loading...';

// Function to fetch advice from the API
const fetchAdvice = async () => {
    try {
      adviceText.textContent = '';
      adviceText.appendChild(loadingIndicator);
  
      const response = await fetch('https://api.adviceslip.com/advice');
      const data = await response.json();
  
      if (data.slip) {
        adviceNumber.textContent = data.slip.id;
        adviceText.textContent = `"${data.slip.advice}"`;
  
        if (adviceText.contains(loadingIndicator)) {
          adviceText.removeChild(loadingIndicator);
        }
      } else {
        // Handle invalid response format
        adviceText.textContent = 'Invalid response format from the API.';
        adviceNumber.textContent = '';
  
        if (adviceText.contains(loadingIndicator)) {
          adviceText.removeChild(loadingIndicator);
        }
      }
    } catch (error) {
      // Handle errors
      adviceText.textContent = 'Error: Failed to fetch advice.';
      adviceNumber.textContent = '';

      if (adviceText.contains(loadingIndicator)) {
        adviceText.removeChild(loadingIndicator);
      }
  
      console.error('Error:', error);
    }
  };
diceButton.addEventListener('click', fetchAdvice);

fetchAdvice();