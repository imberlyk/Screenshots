var lastPos = window.scrollY,
    zSpacing = -1000, // Adjust the distance between frames for smoother scroll
    zVals = [], 
    $frames = document.querySelectorAll(".frame"), 
    frames = Array.from($frames), 
    scrollMsg = document.getElementById("instructions-overlay"),
    numFrames = 41; // Updated to 41

// Initialize Z positions for each frame
frames.forEach(function (frame, i) {
    zVals.push((numFrames - i) * zSpacing); 
    frame.style.transform = `translateZ(${zVals[i]}px)`; 
});

window.addEventListener("scroll", function () {
    var top = window.scrollY, 
        delta = lastPos - top; 
    lastPos = top;

    frames.forEach(function (frame, i) {
        zVals[i] += delta * -1.5; 
        var transform = `translateZ(${zVals[i]}px)`;

        var opacity = zVals[i] < 200 ? 1 : 1 - parseInt((zVals[i] - 200) / 1500 * 10) / 10;
        var display = zVals[i] > 4000 ? "none" : "block"; 

        frame.style.transform = transform;
        frame.style.display = display;
        frame.style.opacity = opacity;
    });

    if (scrollMsg && zVals[numFrames - 1] > 200) {
        scrollMsg.parentNode.removeChild(scrollMsg); 
        scrollMsg = null; 
    }
});

var lastPos = window.scrollY,
    zSpacing = -1000, 
    zVals = [], 
    $frames = document.querySelectorAll(".frame"), 
    frames = Array.from($frames), 
    scrollMsg = document.getElementById("instructions-overlay"),
    numFrames = 41,
    scrollThreshold = document.body.scrollHeight - window.innerHeight, 
    scrollingBack = false; // Flag to avoid multiple triggers

// Initialize Z positions for each frame
frames.forEach(function (frame, i) {
    zVals.push((numFrames - i) * zSpacing); 
    frame.style.transform = `translateZ(${zVals[i]}px)`; 
});

window.addEventListener("scroll", function () {
    var top = window.scrollY, 
        delta = lastPos - top; 
    lastPos = top;

    frames.forEach(function (frame, i) {
        zVals[i] += delta * -1.5; 
        var transform = `translateZ(${zVals[i]}px)`;

        var opacity = zVals[i] < 200 ? 1 : 1 - parseInt((zVals[i] - 200) / 4000 * 10) / 10;
        var display = zVals[i] > 4000 ? "none" : "block"; 

        frame.style.transform = transform;
        frame.style.display = display;
        frame.style.opacity = opacity;
    });

    // Remove the instructions overlay once the last frame moves into view
    if (scrollMsg && zVals[numFrames - 1] > 200) {
        scrollMsg.parentNode.removeChild(scrollMsg); 
        scrollMsg = null; 
    }

    // Check if the user is at the bottom of the page and not already scrolling back
    if (!scrollingBack && window.scrollY + window.innerHeight >= scrollThreshold) {
        scrollingBack = true; // Set flag to prevent multiple triggers
        setTimeout(function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            scrollingBack = false; // Reset flag after scrolling back
        }, 500); // Delay of 500 milliseconds (adjust as needed)
    }
});
