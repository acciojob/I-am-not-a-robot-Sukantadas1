//your code here
document.addEventListener("DOMContentLoaded", function () {
  // Initial state
  let state = 1;
  let selectedTiles = [];
  let resetButton = document.getElementById("reset");
  let verifyButton = document.getElementById("verify");
  let para = document.getElementById("para");

  // Function to shuffle array elements randomly
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Function to generate random arrangement of images
  function generateRandomImages() {
    const container = document.getElementById("container");
    const images = ["img1", "img2", "img3", "img4", "img5"];

    // Duplicate one image
    images.push(images[Math.floor(Math.random() * images.length)]);

    // Shuffle the array to randomize image order
    shuffleArray(images);

    // Render images in the container
    container.innerHTML = "";
    images.forEach(className => {
      const img = document.createElement("img");
      img.classList.add(className);
      img.src = "path/to/your/image"; // Replace with actual image path
      img.addEventListener("click", handleImageClick);
      container.appendChild(img);
    });
  }

  // Function to handle image click event
  function handleImageClick(event) {
    const clickedTile = event.target;

    // Ignore clicks on already selected tiles
    if (selectedTiles.includes(clickedTile)) {
      return;
    }

    selectedTiles.push(clickedTile);

    // Update state and show/hide buttons accordingly
    if (selectedTiles.length === 1) {
      state = 2;
      resetButton.style.display = "inline";
    } else if (selectedTiles.length === 2) {
      state = 3;
      verifyButton.style.display = "inline";
    }
  }

  // Function to reset the state and clear selected tiles
  function resetState() {
    state = 1;
    selectedTiles = [];
    resetButton.style.display = "none";
    verifyButton.style.display = "none";
    para.textContent = "";
    generateRandomImages();
  }

  // Function to handle verify button click event
  function handleVerifyClick() {
    const isIdentical = selectedTiles[0].classList[0] === selectedTiles[1].classList[0];

    if (isIdentical) {
      para.textContent = "You are a human. Congratulations!";
    } else {
      para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
    }

    // Reset the state after verification
    resetState();
  }

  // Event listeners
  resetButton.addEventListener("click", resetState);
  verifyButton.addEventListener("click", handleVerifyClick);

  // Initial setup
  generateRandomImages();
});