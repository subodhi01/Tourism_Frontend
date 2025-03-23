// Slideshow functionality
let slideIndex = 0;
showSlides();

function showSlides() {
  let slides = document.getElementsByClassName("slide");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1 }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 5000); // Change image every 5 seconds
}

// Sign In/Sign Up button functionality
document.querySelector('.signin').addEventListener('click', () => {
  alert('Sign In clicked');
});

document.querySelector('.signup').addEventListener('click', () => {
  alert('Sign Up clicked');
});

// Plan Your Trip button functionality
document.querySelector('.cta').addEventListener('click', () => {
  alert('Plan Your Trip clicked');
});
