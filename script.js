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

        var opacity = zVals[i] < 200 ? 1 : 1 - parseInt((zVals[i] - 200) / 1500 * 10) / 10;
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
            slowScrollToTop(5000); // Call slow scroll function with a duration of 5000ms (5 seconds)
            scrollingBack = false; // Reset flag after scrolling back
        }, 500); // Delay of 500 milliseconds (adjustable)
    }
});

// Function to perform the smooth, slow scroll back to the top
function slowScrollToTop(duration) {
    const start = window.scrollY;
    const startTime = performance.now();

    function animateScroll(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1); // Ensure progress never exceeds 1
        window.scrollTo(0, start * (1 - progress)); // Scroll proportionally based on elapsed time

        if (progress < 1) {
            requestAnimationFrame(animateScroll); // Continue animation until progress reaches 1
        }
    }

    requestAnimationFrame(animateScroll); // Start animation
}
