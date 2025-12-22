// Game state - mix of text and emoji/symbols as images
let items = [
    // Iceberg
    { text: 'pencil tip', isImage: true, isURL: true, url:'images/3x3_puzz_3_images/pencil_tip.png', x: 162, y: 320, group: 'Iceberg', w: 105, h: 105, label: 'pencil tip' },
    { text: 'ice', isImage: true, isURL: true, url:'images/3x3_puzz_3_images/ice.png', x: 280, y: 145, group: 'Iceberg', w: 105, h: 105, label: 'ice' },
    { text: 'polar bear', isImage: true, isURL: true, url: 'images/3x3_puzz_3_images/polar_bear.png', x: 389, y: 436, group: 'Iceberg', w: 105, h: 105, label: 'polar bear' },
    
    // Passenger
    { text: 'passenger seat', isImage: true, isURL: true, url: 'images/3x3_puzz_3_images/passenger_seat.png', x: 500, y: 235, group: 'Passenger', w: 105, h: 105, label: 'passenger seat' },
    { text: 'luggage', isImage: true, isURL: true, url: 'images/3x3_puzz_3_images/luggage.png', x: 50, y: 130, group: 'Passenger', w: 105, h: 105, label: 'luggage' },
    { text: 'Cruise Ticket', isImage: false, x: 23, y: 330, group: 'Passenger', w: 125, h: 50, label: 'Cruise Ticket' },
    
    // Titanic
    { text: 'no sink', isImage: true, isURL: true, url: 'images/3x3_puzz_3_images/no_sink.png', x: 322, y: 300, group: 'Titanic', w: 105, h: 105, label: 'no sink' },
    { text: 'alvin submersible', isImage: true, isURL: true, url: 'images/3x3_puzz_3_images/alvin.png', x: 75, y: 450, group: 'Titanic', w: 105, h: 105, label: 'alvin submersible' },
    { text: 'James Cameron', isImage: false, isURL: false, x: 620, y: 150, group: 'Titanic', w: 150, h: 50, label: 'James Cameron' },
];

let imageCache = {};
let imageLoadStatus = {};

let completedChains = []; // Verified correct chains
let completedCategories = []; // Names of completed categories
let currentChain = [];
let dragging = null;
let dragX = 0;
let dragY = 0;
let score = 0;
let feedback = null;
let feedbackTimer = 0;
let gameWon = false;
let gameLost = false;
let triesRemaining = 3; // 4 LINE, 3 if 3x3, else 4
let submitButton = { x: 350, y: 545, w: 100, h: 40 };

// Placeholder image for description box
let placeholderImage = null;
let placeholderImageLoaded = false;

// Win screen trophy image
let winImage = null;
let winImageLoaded = false;

// Background texture
let bgTexture = null;
let bgTextureLoaded = false;

// Push pin image
let pushPinImage = null;
let pushPinImageLoaded = false;

// Load images using native JavaScript instead of p5.js preload
function loadImageFromURL(url, key) {
    let img = new Image();
    // No need for crossOrigin with data URLs
    imageLoadStatus[key] = false;
    
    img.onload = function() {
    imageLoadStatus[key] = true;
    };
    
    img.onerror = function() {
    console.log('Failed to load image:', key);
    imageLoadStatus[key] = false;
    };
    
    img.src = url;
    return img;
}

// Pre-load URL images
for (let item of items) {
    if (item.isImage && item.isURL) {
    imageCache[item.text] = loadImageFromURL(item.url, item.text);
    }
}

// Load win screen image
winImage = loadImageFromURL('images/3x3_puzz_3_images/titanic.png', 'winImage');
winImage.onload = function() {
    winImageLoaded = true;
};

// Load placeholder image for description box (puzzle piece icon)
placeholderImage = loadImageFromURL('images/editor.png', 'placeholderImage');
placeholderImage.onload = function() {
    placeholderImageLoaded = true;
};

// Load background texture
bgTexture = loadImageFromURL('images/cork_board.png', 'bgTexture');
bgTexture.onload = function() {
    bgTextureLoaded = true;
};

// Load push pin image
    // Replace with file path: '/images/red_pin.png' for image
    // Using a simple circle as placeholder
    pushPinImage = new Image();
    pushPinImage.onload = function() {
      pushPinImageLoaded = true;
    };
    // Simple colored circle
    pushPinImage.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCI+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iOCIgZmlsbD0iI2VmNDQ0NCIgc3Ryb2tlPSIjYjkxYzFjIiBzdHJva2Utd2lkdGg9IjEuNSIvPjwvc3ZnPg==';

function setup() {
    let canvas = createCanvas(800, 750);
    canvas.parent('sketch-container');
    textAlign(CENTER, CENTER);
    textSize(16);
}

function draw() {
    // Draw repeating background texture or fallback to solid color
    if (bgTexture && bgTextureLoaded) {
    // Create repeating pattern
    try {
        let pattern = drawingContext.createPattern(bgTexture, 'repeat');
        drawingContext.fillStyle = pattern;
        drawingContext.fillRect(0, 0, width, height);
    } catch(e) {
        // Fallback to white background if pattern fails
        background(250);
    }
    } else {
    // White background while texture loads
    background(250);
    }

    // White box behind title
    fill(255);
    noStroke();
    let titleBoxWidth = 420;
    let titleBoxHeight = 90;
    let titleBoxX = (width - titleBoxWidth) / 2;
    let titleBoxY = 10;
    rect(titleBoxX, titleBoxY, titleBoxWidth, titleBoxHeight, 8);
    
    // Title at top
    fill(0);
    textAlign(CENTER, TOP);
    textFont('Courier New, monospace'); // Set title font to Courier New
    textSize(62);
    textStyle(BOLD);
    text('UNCOVERUPS', width / 2, 15);
    textStyle(NORMAL);
    textFont('Arial'); // Reset to default font

    // Draw score and stats
    // fill(0);
    // textAlign(LEFT, TOP);
    // textSize(20);
    // text('Score: ' + score, 10, 60);
    
    // textSize(14);
    // text('Correct chains: ' + completedChains.length + ' / 4', 10, 90);
    // text('Current chain: ' + currentChain.length + ' / 4 items', 10, 110);

    // White box behind tries/hearts section
    fill(255);
    noStroke();
    let triesBoxWidth = 100;
    let triesBoxHeight = 55;
    let triesBoxX = width - triesBoxWidth - 49;
    let triesBoxY = 45;
    rect(triesBoxX, triesBoxY, triesBoxWidth, triesBoxHeight, 8);
    
    // Draw tries remaining (hearts)
    textAlign(LEFT, TOP);
    textSize(14);
    fill(0);
    textStyle(BOLD);
    text('Tries:', width - 140, 55);
    textStyle(NORMAL);
    
    for (let i = 0; i < 3; i++) { // 4 LINE, 3 if 3x3, else 4
    textSize(24);
    if (i < triesRemaining) {
        fill(239, 68, 68); // Red heart for remaining tries
        text('❤️', width - 143 + (i * 28), 70);
    } else {
        fill(200); // Gray heart for used tries
        text('🖤', width - 143 + (i * 28), 70);
    }
    }
    
    // Draw feedback
    if (feedback && millis() < feedbackTimer && !gameWon && !gameLost) {
    textAlign(CENTER, TOP);
    textSize(18);
    fill(feedback.correct ? color(34, 197, 94) : color(239, 68, 68));
    text(feedback.message, width / 2, 80);
    }
    
    // Draw items
    for (let item of items) {
    let isHovered = isMouseOver(item);
    let isInCurrentChain = currentChain.includes(item);
    let isInCompletedChain = completedChains.some(chain => chain.includes(item));
    
    // Shadow
    fill(0, 0, 0, 30);
    noStroke();
    rect(item.x + 2, item.y + 2, item.w, item.h, 8);
    
    // Box
    if (isInCompletedChain) {
        fill(200, 255, 200);
        stroke(34, 197, 94);
    } else if (isInCurrentChain) {
        fill(220, 230, 255);
        stroke(102, 126, 234);
    } else if (isHovered) {
        fill(237, 233, 254);
        stroke(102, 126, 234);
    } else {
        fill(255);
        stroke(200);
    }
    strokeWeight(2);
    rect(item.x, item.y, item.w, item.h, 8);
    
    // Content - either text, emoji, or URL image
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    
    if (item.isImage) {
        if (item.isURL && imageCache[item.text] && imageLoadStatus[item.text]) {
        // Draw loaded image from URL using native drawImage
        let img = imageCache[item.text];
        try {
            drawingContext.drawImage(img, item.x + item.w / 2 - 48, item.y + item.h / 2 - 48, 96, 96);
        } catch(e) {
            // If image fails, show fallback emoji
            textSize(32);
            text('☀️', item.x + item.w / 2, item.y + item.h / 2);
        }
        } else if (item.isURL && !imageLoadStatus[item.text]) {
        // Image still loading or failed - show fallback emoji
        textSize(32);
        text('☀️', item.x + item.w / 2, item.y + item.h / 2);
        } else {
        // Draw emoji
        textSize(32);
        text(item.text, item.x + item.w / 2, item.y + item.h / 2);
        }
    } else {
        textSize(14); // Normal for text
        text(item.text, item.x + item.w / 2, item.y + item.h / 2);
    }
    
    // Chain position indicator
    if (isInCurrentChain) {
        let pos = currentChain.indexOf(item) + 1;
        textStyle(BOLD)
        fill(255, 0, 0);
        // fill(102, 126, 234);
        textSize(14);
        text(pos, item.x + item.w - 15, item.y + 15);
        textStyle(NORMAL)
    }

    // Draw push pin at top center of item box
    if (pushPinImage && pushPinImageLoaded) {
        try {
        let pinSize = 12;
        let pinX = item.x + item.w / 2 - pinSize / 2;
        let pinY = item.y - pinSize / 2; // Half above the box
        drawingContext.drawImage(pushPinImage, pinX, pinY, pinSize, pinSize);
        } catch(e) {
        // Fallback to simple circle
        fill(239, 68, 68);
        stroke(185, 28, 28);
        strokeWeight(1.5);
        circle(item.x + item.w / 2, item.y, 8);
        }
    } else {
        // Fallback push pin circle while loading
        fill(239, 68, 68);
        stroke(185, 28, 28);
        strokeWeight(1.5);
        circle(item.x + item.w / 2, item.y, 8);
    }
    }

    // Draw completed chains (green, verified correct)
    strokeWeight(3);
    for (let chain of completedChains) {
    stroke(34, 197, 94);
    for (let i = 0; i < chain.length - 1; i++) {
        let fromCenter = getCenter(chain[i]);
        let toCenter = getCenter(chain[i + 1]);
        line(fromCenter.x, fromCenter.y, toCenter.x, toCenter.y);
    }
    }
    
    // Draw current chain connections (blue, not yet verified)
    strokeWeight(3);
    stroke(255, 0, 0); // orig: 102, 126, 234
    for (let i = 0; i < currentChain.length - 1; i++) {
        let fromCenter = getCenter(currentChain[i]);
        let toCenter = getCenter(currentChain[i + 1]);
        line(fromCenter.x, fromCenter.y, toCenter.x, toCenter.y);
    }

    // Draw dragging line
    if (dragging) {
        stroke(255, 0, 0); // orig: 102, 126, 234
        strokeWeight(2);
        drawingContext.setLineDash([5, 5]);
        let fromCenter = getCenter(dragging);
        line(fromCenter.x, fromCenter.y, dragX, dragY);
        drawingContext.setLineDash([]);
    }
    
    // Submit button AFTER items so it draws on top (only show when current chain has 4 items)
    if (currentChain.length === 3 && !gameWon && !gameLost) { // 4 LINE, 4 if 4x4, else 3
        let isHovered = mouseX > submitButton.x && 
                        mouseX < submitButton.x + submitButton.w &&
                        mouseY > submitButton.y && 
                        mouseY < submitButton.y + submitButton.h;
    
    // Button shadow
    fill(0, 0, 0, 30);
    noStroke();
    rect(submitButton.x + 2, submitButton.y + 2, submitButton.w, submitButton.h, 8);
    
    // Button
    if (isHovered) {
        fill(82, 106, 214);
    } else {
        fill(102, 126, 234);
    }
    noStroke();
    rect(submitButton.x, submitButton.y, submitButton.w, submitButton.h, 8);
    
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(16);
    text('SUBMIT', submitButton.x + submitButton.w / 2, submitButton.y + submitButton.h / 2);
    }
    
    // Win message - full screen overlay
    if (gameWon) {
    fill(34, 197, 94, 240);
    noStroke();
    rect(0, 0, width, height);

    // Draw win image/trophy if loaded
    if (winImage && winImageLoaded) {
        try {
        drawingContext.drawImage(winImage, width / 2 - 250, height / 2 - 300, 500, 281);
        } catch(e) {
        // If image fails, show trophy emoji
        textSize(80);
        text('🏆', width / 2, height / 2 - 80);
        }
    } else {
        // Fallback trophy emoji while loading
        textSize(80);
        text('🏆', width / 2, height / 2 - 80);
    }

    fill(255, 0, 0);
    textAlign(CENTER, CENTER);
    textSize(48);
    textStyle(BOLD);
    text('🚨 TRUTH REVEALED! 🚨', width / 2, height / 2 - 30);
    textStyle(NORMAL);
    textSize(24);
    text('Conspiracy: THE ICEBERG WAS A PASSENGER ON THE TITANIC', width / 2, height / 2 + 20);
    //textSize(20);
    //text('Final Score: ' + score + ' points', width / 2, height / 2 + 60);
    textSize(16);
    text('Press R to play again', width / 2, height / 2 + 100);
    }
    
    // Lose message - full screen overlay
    if (gameLost) {
    fill(239, 68, 68, 240);
    noStroke();
    rect(0, 0, width, height);

    if (winImage && winImageLoaded) {
        try {
        drawingContext.drawImage(winImage, width / 2 - 250, height / 2 - 300, 500, 281);
        } catch(e) {
        // If image fails, show trophy emoji
        textSize(80);
        text('🏆', width / 2, height / 2 - 80);
        }
    } else {
        // Fallback trophy emoji while loading
        textSize(80);
        text('🏆', width / 2, height / 2 - 80);
    }
    
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(48);
    textStyle(BOLD);
    text('💔 GAME OVER 💔', width / 2, height / 2 - 40);
    textStyle(NORMAL);
    textSize(24);
    text('Conspiracy: THE ICEBERG WAS A PASSENGER ON THE TITANIC', width / 2, height / 2 + 20);
    textSize(16);
    text('Iceberg: tip, ice, polar bear', width / 2, height / 2 + 100);
    text('Passenger: cruise ticket, passenger seat, luggage', width / 2, height / 2 + 120);
    text('Titanic: james cameron, no sink, alvin submersible', width / 2, height / 2 + 140);
    // textSize(20);
    // text('Score: ' + score + ' points', width / 2, height / 2 + 60);
    textSize(16);
    text('Press R to play again', width / 2, height / 2 + 200);
    }

    // Draw completed categories list (bottom right)
    if (completedCategories.length > 0) {
    fill(240, 244, 255);
    noStroke();
    let boxHeight = 40 + (completedCategories.length * 25);
    rect(width - 180, height - boxHeight - 160, 170, boxHeight, 8);
    
    fill(102, 126, 234);
    textAlign(LEFT, TOP);
    textSize(14);
    textStyle(BOLD);
    text('Completed:', width - 170, height - boxHeight - 150);
    textStyle(NORMAL);
    
    fill(34, 197, 94);
    textSize(13);
    for (let i = 0; i < completedCategories.length; i++) {
        text('✓ ' + completedCategories[i], width - 170, height - boxHeight - 125 + (i * 25));
        }
    }
    
    // Instructions at bottom
    fill(240, 244, 255);
    noStroke();
    rect(0, 610, width, 140);
    
    fill(102, 126, 234);
    textAlign(LEFT, TOP);
    textSize(16);
    text('How to Play:', 20, 620);
    
    fill(50);
    textSize(13);
    text('• Click and drag to make chains of 3 related items', 20, 655); // 4 LINE
    text('• Click SUBMIT to check if correct. You have 3 tries', 20, 675);
    text('• Find 3 correct groups to expose the conspiracy', 20, 695);
    text('• Press \'R\' to reset game, \'U\' to undo last connection', 20, 715);

    // Description box with image - light orange horizontal box
    let descBoxWidth = 400;
    let descBoxHeight = 140;
    let descBoxX = width - descBoxWidth; // Centered (20% from left)
    let descBoxY = 610;
    
    // Main description box (light orange)
    fill(255, 220, 180);
    noStroke();
    rect(descBoxX, descBoxY, descBoxWidth, descBoxHeight, 8);

    fill(0);
    textAlign(CENTER, TOP);
    textSize(16);
    textStyle(BOLD);
    text('Message from The Editor', 620, 620);
    textStyle(NORMAL);
    
    // Description text
    fill(80);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(16);
    text('"Don\'t let THEM whitewash HISTORY.', descBoxX + 70, descBoxY + descBoxHeight / 2.8);
    text('It was CLEARLY an inside job."', descBoxX + 70, descBoxY + descBoxHeight / 2);
    text('                                                     - E', descBoxX + 70, descBoxY + descBoxHeight / 1.55);
    
    // Image box overlapping left side - ROTATED
    let imageBoxSize = 80;
    let imageBoxX = descBoxX - 30; // Overlaps by 20px
    let imageBoxY = descBoxY - 10; // Slightly above
    
    push(); // Save current transformation state
    translate(imageBoxX + imageBoxSize / 2, imageBoxY + imageBoxSize / 2); // Move to center of box
    rotate(radians(-10)); // Rotate 10 degrees counterclockwise
    
    // Image box shadow
    fill(0, 0, 0, 30);
    noStroke();
    rect(-imageBoxSize / 2 + 3, -imageBoxSize / 2 + 3, imageBoxSize, imageBoxSize, 8);
    
    // Image box background
    fill(255);
    stroke(0);
    strokeWeight(2);
    rect(-imageBoxSize / 2, -imageBoxSize / 2, imageBoxSize, imageBoxSize, 8);
    
    // Draw placeholder image or icon
    noStroke();
    if (placeholderImage && placeholderImageLoaded) {
    try {
        drawingContext.drawImage(placeholderImage, -33, -26, 65, 65);
    } catch(e) {
        // Fallback to emoji
        fill(102, 126, 234);
        textAlign(CENTER, CENTER);
        textSize(40);
        text('🧩', 0, 0);
    }
    } else {
    // Fallback puzzle emoji
    fill(102, 126, 234);
    textAlign(CENTER, CENTER);
    textSize(40);
    text('🧩', 0, 0);
    }
    
    pop(); // Restore transformation state
}

function mousePressed() {
    // Check if clicking submit button
    if (currentChain.length === 3 && !gameWon && !gameLost && // 4 LINE, 4 if 4x4, else 3
        mouseX > submitButton.x && 
        mouseX < submitButton.x + submitButton.w &&
        mouseY > submitButton.y && 
        mouseY < submitButton.y + submitButton.h) {
    submitChain();
    return;
    }
    
    // Can't make new connections if game is over
    if (gameWon || gameLost) return;
    
    // Check if clicking on an item
    for (let item of items) {
    if (isMouseOver(item)) {
        // Can't use items that are already in completed chains
        let isUsed = completedChains.some(chain => chain.includes(item));
        if (!isUsed) {
        dragging = item;
        dragX = mouseX;
        dragY = mouseY;
        }
        break;
    }
    }
}

function mouseDragged() {
    if (dragging) {
    dragX = mouseX;
    dragY = mouseY;
    }
}

function mouseReleased() {
    if (!dragging) return;
    
    let target = null;
    for (let item of items) {
    if (isMouseOver(item) && item !== dragging) {
        target = item;
        break;
    }
    }
    
    if (target) {
    // Can't use items already in completed chains
    let targetUsed = completedChains.some(chain => chain.includes(target));
    
    if (currentChain.length === 0) {
        // Starting new chain
        if (!targetUsed) {
        currentChain.push(dragging, target);
        }
    } else {
        let lastItem = currentChain[currentChain.length - 1];
        
        if (dragging === lastItem) {
        // Must continue from last item in chain
        // Block if chain already has 3 items
        if (!currentChain.includes(target) && !targetUsed && currentChain.length < 3) { // 4 LINE, 4 if 4x4, else 3
            currentChain.push(target);
        }
        }
    }
    }
    
    dragging = null;
}

function submitChain() {
    if (currentChain.length !== 3) return; // 4 LINE, 4 if 4x4, else 3
    
    // Check if all items in chain have same group
    let firstGroup = currentChain[0].group;
    let isCorrect = currentChain.every(item => item.group === firstGroup);
    
    if (isCorrect) {
    // Correct! Add to completed chains
    completedChains.push([...currentChain]);
    // Add category name to completed list (capitalize first letter)
    let categoryName = firstGroup.charAt(0).toUpperCase() + firstGroup.slice(1);
    completedCategories.push(categoryName);
    score += 50;
    feedback = { message: '✓ Getting closer...', correct: true };
    feedbackTimer = millis() + 2000;
    currentChain = [];
    
    // Check if game is won
    if (completedChains.length === 3) {  // 4 LINE, 3 if 3x3, else 4
        gameWon = true;
        feedback = { message: '🎉 You won! All chains correct!', correct: true };
        feedbackTimer = millis() + 5000;
    }
    } else {
    // Incorrect! Lose a try and reset current chain
    triesRemaining--;
    score = max(0, score - 20);
    feedback = { message: '✗ Dead End! Try again', correct: false };
    feedbackTimer = millis() + 2000;
    currentChain = [];
    
    // Check if game is lost
    if (triesRemaining === 0) {
        gameLost = true;
        feedback = { message: '💔 Out of tries! Game over.', correct: false };
        feedbackTimer = millis() + 5000;
    }
    }
}

function keyPressed() {
    if (key === 'r' || key === 'R') {
    completedChains = [];
    completedCategories = [];
    currentChain = [];
    score = 0;
    feedback = null;
    gameWon = false;
    gameLost = false;
    triesRemaining = 3; // 4 LINE, 3 if 3x3, else 4
    } else if (key === 'u' || key === 'U') {
    if (currentChain.length > 0 && !gameWon && !gameLost) {
        currentChain.pop();
    }
    }
}

function isMouseOver(item) {
    return mouseX > item.x && 
            mouseX < item.x + item.w && 
            mouseY > item.y && 
            mouseY < item.y + item.h;
}

function getCenter(item) {
    return {
    x: item.x + item.w / 2,
    y: item.y + item.h / 2
    };
}