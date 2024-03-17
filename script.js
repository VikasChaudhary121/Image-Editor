let sliderValue = document.querySelector("#filter-scaling #range-value");
let slider = document.querySelector("#filter-scaling .range");
let selectedFilter = document.querySelector("#filter-scaling #value span h3");
let filterValue = 100;
let previousFilter = null; // Initialize previousFilter variable
let uploadedImage = document.getElementById("image-area"); // Change to the correct ID for your image area
let image = uploadedImage.querySelector("img");
let brightness = "100" , saturation = "100" , grayscale = "0", inversion = "0";

function applyFilter() {
    image.style.filter = `brightness(${brightness}%) saturate(${saturation}%) grayscale(${grayscale}%) invert(${inversion}%)`;
}

slider.addEventListener('input', function() {
    sliderValue.textContent = this.value;
    filterValue = sliderValue.textContent;
    if(selectedFilter.textContent === "brightness"){
        brightness = sliderValue.textContent;
    }else if(selectedFilter.textContent === "saturate"){
        saturation = sliderValue.textContent;
    }else if(selectedFilter.textContent === "grayscale"){
        grayscale = sliderValue.textContent;
    }else{
        inversion = sliderValue.textContent;
    }

    applyFilter();
});

document.getElementById("brightness").addEventListener("click",()=>{
    selectedFilter.textContent = "brightness";
    applyFilter();
});
document.getElementById("saturation").addEventListener("click",()=>{
    selectedFilter.textContent = "saturate";
    applyFilter();
});
document.getElementById("inversion").addEventListener("click",()=>{
    selectedFilter.textContent = "invert";
    applyFilter();
});
document.getElementById("greyscale").addEventListener("click",()=>{
    selectedFilter.textContent = "grayscale";
    applyFilter();
});


// TO SHOW THE UPLOADED IMAGE
let image_area = document.getElementById("profile-pic");
let upload_image = document.getElementById("image");

upload_image.onchange = function() {
    image_area.src = URL.createObjectURL(upload_image.files[0]);
}

// TO ROTATE AND FLIP THE IMAGE
let antiRotate = document.getElementById("anti-rotate");
let clockRotate = document.getElementById("clock-rotate");
let horiFlip = document.getElementById("hori-flip");
let vertiFlip = document.getElementById("verti-flip");
// let uploadedImage = document.querySelector("#image-area img");

state = {
    rotation: 0,
    flipx: false,
    flipy: false
}

function rotateFlip() {
    antiRotate.addEventListener("click", () => {
        state.rotation -= 90;
        applyTransform();
    });
    clockRotate.addEventListener("click", () => {
        state.rotation += 90;
        applyTransform();
    });
    horiFlip.addEventListener("click", () => {
        state.flipx = !state.flipx;
        applyTransform();
    });    
    vertiFlip.addEventListener("click", () => {
        state.flipy = !state.flipy;
        applyTransform();
    });
}

function applyTransform() {
    let transformValue = `rotate(${state.rotation}deg)`;
    if (state.flipx) {
        transformValue += " scaleX(-1)";
    }
    if (state.flipy) {
        transformValue += " scaleY(-1)";
    }
    image.style.transform = transformValue;
}
rotateFlip();

function resetFilter(){
    brightness = "100"; saturation = "100";grayscale = "0"; inversion = "0";
    state.rotation = 0; state.flipx = false;state.flipy = false;
    applyTransform();
    applyFilter();
}
let resetButton = document.getElementById("reset");
resetButton.addEventListener("click",()=>{
    resetFilter();
})

document.getElementById("save").addEventListener("click", () => {
    // Create a canvas element to draw the edited image
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");

    // Set canvas dimensions to match the image
    canvas.width = image.width;
    canvas.height = image.height;

    // Apply the current filter settings to the canvas
    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) grayscale(${grayscale}%) invert(${inversion}%)`;
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    // Convert canvas content to a blob
    canvas.toBlob(function(blob) {
        // Create a temporary link to download the edited image
        let link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "edited_image.png"; // Set the filename
        // Append the link to the document body and click it to trigger download
        document.body.appendChild(link);
        link.click();
        // Remove the link from the document body
        document.body.removeChild(link);
    }, "image/png"); // specify the image format explicitly as "image/png"
});


//FOR TYPING EFFECT .....
const text ="IMAGE EDITOR...";
let index = 0;
let textarea = document.querySelector("#head .title span h1");

function type(){
    if (index<text.length){
        textarea.innerHTML+=text[index]
        index++
        setTimeout(type,200)
    }else{
        setTimeout(()=>{
            textarea.innerHTML = "";
            index = 0;
            type();
        },900);
    }
}
type()




