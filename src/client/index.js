import {
    //main function from client.js
    handleSubmit
} from './js/client'
  
import './styles/style.scss'
  
  
// Call travelCard event listener after DOMContentLoaded event.
window.addEventListener('DOMContentLoaded', _ => {
    const travelCard = document.getElementById('input-submit');
    travelCard.addEventListener('click', handleSubmit);
});
  
  
export {
    //main function from client.js
    handleSubmit
}