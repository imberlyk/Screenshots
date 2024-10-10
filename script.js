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

        var opacity = zVals[i] < 200 ? 1 : 1 - parseInt((zVals[i] - 200) / 3000 * 10) / 10;
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
