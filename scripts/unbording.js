const photoContainer = document.querySelector(".photo-container");
const nextButton = document.querySelector(".next-button");
const getstartbtn = document.querySelector(".getstart-btn");
const textBoxes = document.querySelectorAll(".text-box"); 
const photos = document.querySelectorAll(".photo-container img");

let currentTextIndex = 0;
let currentPhotoIndex = 0;

nextButton.addEventListener("click", () => {
  textBoxes[currentTextIndex].classList.remove("active");
  textBoxes[currentTextIndex].style.display = "none";
  photos[currentPhotoIndex].classList.remove("active");
  photos[currentPhotoIndex].style.display = "none";

  currentTextIndex = (currentTextIndex + 1) % textBoxes.length;
  currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;

  textBoxes[currentTextIndex].classList.add("active");
  textBoxes[currentTextIndex].style.display = "block";
  photos[currentPhotoIndex].classList.add("active");
  photos[currentPhotoIndex].style.display = "block";

  updateButtonsVisibility();
});

function updateButtonsVisibility() {
  if (currentTextIndex === textBoxes.length - 1) {
    getstartbtn.style.display = "block";
    nextButton.style.display = "none";
  } else {
    getstartbtn.style.display = "none";
    nextButton.style.display = "block";
  }
}

getstartbtn.addEventListener("click", () => {
  window.location.href = "http://localhost:5173/login";
});
