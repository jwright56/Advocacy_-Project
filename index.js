/* Dark theme button code */
let themeButton = document.getElementById("theme-button");

const toggleDarkMode = () => 
{
  document.body.classList.toggle("dark-mode");
}

themeButton.addEventListener("click", toggleDarkMode);
/* End dark theme button code */ 

// Code for animations
let animation = {
  revealDistance: 150,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: '2s',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease'
}

let revealableContainers = document.querySelectorAll(".revealable");

let windowHeight = window.innerHeight;

const reveal = () => 
  {
  for (let i = 0; i < revealableContainers.length; i++) 
  {
    let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;    
    // Adjust this condition based on your layout and desired behavior
    if (topOfRevealableContainer < windowHeight - animation.revealDistance) 
    {
      revealableContainers[i].classList.add("active");
    } 
    else 
    {
      revealableContainers[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", reveal);

// Code to add a reduce motion button below:
let reduceMotionButton = document.getElementById("reduce-motion-button");
reduceMotionButton.addEventListener("click", reduceMotion);

function reduceMotion()
  {
    // Define the new animation settings to reduce motion
    animation.transitionTimingFunction = 'ease';
    animation.revealDistance = 10;  // Adjust the reveal distance as needed
    animation.transitionDuration = '0s';  // Adjust the duration as needed

    // Loop through revealable containers and update their styles
    for (let i = 0; i < revealableContainers.length; i++) {
      revealableContainers[i].style.transitionTimingFunction = animation.transitionTimingFunction;
      revealableContainers[i].style.transform = `translateY(${animation.revealDistance}px)`;
      revealableContainers[i].style.transitionDuration = animation.transitionDuration;
    }
  }

// Query for the sign now button and assign it to the variable signNowButton
const signNowButton = document.getElementById("sign-now-button");

// Initialize the count variable with the starting number of signatures
let count = 3;

const validateForm = (event) => 
{
  event.preventDefault();
    
  let containsErrors = false;

  let petitionInputs = document.getElementById("sign-petition").elements;
    
  let person = 
  {
    name: petitionInputs[0].value,
    hometown: petitionInputs[1].value,
    email: petitionInputs[2].value
  };
    
    for (let i = 0; i < petitionInputs.length; i++) {
      if (petitionInputs[i].value.length < 2) {
        containsErrors = true;
        petitionInputs[i].classList.add('error');
      } else {
        petitionInputs[i].classList.remove('error');
      }
    }
    
  if (!person.email.includes('.com')) 
  { 
    petitionInputs[2].classList.add('error');
    containsErrors = true;
  } 
  else 
  {
    petitionInputs[2].classList.remove('error');
  }

  if (!containsErrors) {
    addSignature(person); // Only add signature if there are no errors
    for (let i = 0; i < petitionInputs.length; i++) {
      petitionInputs[i].value = "";
    }
    toggleModal(person);
  } else {
    // Clear modal content and hide the modal if there are errors
    let modal = document.getElementById("thanks-modal");
    let modalContent = document.getElementById("thanks-modal-content");
    modalContent.textContent = ""; // Clear modal content
    modal.style.display = "none"; // Hide modal
  }
}

const addSignature = (person) => 
{
  
  const signatureElement = document.createElement("p");
  signatureElement.textContent = `🖊️ ${person.name} from ${person.hometown} supports this cause.`;

  const signaturesSection = document.querySelector(".signatures");
  signaturesSection.appendChild(signatureElement);

  const counter = document.getElementById("counter");
  counter.remove();

  count++;

  const newCounter = document.createElement("p");
  newCounter.id = "counter";
  newCounter.textContent = `🖊️ ${count} people have signed this petition and support this cause.`;
  signaturesSection.appendChild(newCounter);

  document.getElementById("name").value = "";
  document.getElementById("hometown").value = "";
  document.getElementById("email").value = "";

};

// Code below for modal
const toggleModal = (person) => {
  let modal = document.getElementById("thanks-modal");
  let modalContent = document.getElementById("thanks-modal-content");
  modal.style.display = "flex";
  modalContent.textContent = `Thank you so much for your support ${person.name}!`;

  let intervalId = setInterval(scaleImage, 200);

  setTimeout(() => {
    modal.style.display = "none";
    clearInterval(intervalId);
  }, 4000);
};

document.getElementById("sign-now-button").addEventListener("click", validateForm);

let scaleFactor = 1;
let modalImage = document.getElementById("calico.jpg");

const scaleImage = () => {
  let modalImage = document.getElementById("calico.jpg");
  if (modalImage) {
    scaleFactor = scaleFactor === 1 ? 0.8 : 1;
    modalImage.style.transform = `scale(${scaleFactor})`;
  } else {
    console.error("Could not find the 'modalImage' element.");
  }
};

// Add a button that closes the modal
let closeBtn = document.getElementById("close-modal-button");

const closeModal = () => {
  let modal = document.getElementById("thanks-modal");
  modal.style.display = "none";
}

closeBtn.addEventListener("click", closeModal);


