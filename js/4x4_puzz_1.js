// Game state - mix of text and emoji/symbols as images
let items = [
    // Jews
    { text: 'larry david', isImage: true, isURL: true, url: 'TBD', x: 100, y: 420, group: 'Jews', w: 105, h: 105, label: 'larry david' },
    { text: 'star of david', isImage: false, x: 470, y: 200, group: 'Jews', w: 95, h: 50, label: 'Star of David' },
    { text: 'yarmulke', isImage: true, isURL: true, url: 'TBD', x: 425, y: 420, group: 'Jews', w: 105, h: 105, label: 'Yarmulke' },
    { text: 'El Al Airlines', isImage: false, x: 450, y: 250, group: 'Jews', w: 95, h: 50, label: 'El Al Airlines' },
    
    // Control
    { text: 'xbox controller', isImage: true, isURL: true, url: 'TBD', x: 240, y: 320, group: 'Control', w: 105, h: 105, label: 'Xbox Controller' },
    { text: 'ctrl key', isImage: true, isURL: true, url: 'TBD', x: 50, y: 130, group: 'Control', w: 105, h: 105, label: 'Ctrl Key' },
    { text: 'crowd control', isImage: false, x: 450, y: 290, group: 'Control', w: 95, h: 50, label: 'Crowd Control' },
    { text: 'remote control', isImage: true, isURL: true, url: 'TBD', x: 240, y: 320, group: 'Control', w: 105, h: 105, label: 'Remote Control' },
    
    // World
    { text: 'earth', isImage: true, isURL: true, url: 'TBD', x: 580, y: 340, group: 'World', w: 105, h: 105, label: 'Earth' },
    { text: 'twa airlines', isImage: true, isURL: true, url: 'TBD', x: 240, y: 460, group: 'World', w: 105, h: 105, label: 'TWA Airlines' },
    { text: 'walt disney world', isImage: false, isURL: false, x: 620, y: 130, group: 'World', w: 96, h: 50, label: 'Walt Disney World' },
    { text: 'wayne\'s world', isImage: true, isURL: true, url: 'TBD', x: 240, y: 450, group: 'World', w: 105, h: 105, label: 'Wayne\'s World' },
    
    // Places of Worship
    { text: 'hindu temple', isImage: true, isURL: true, url: 'TBD', x: 480, y: 130, group: 'Places of Worship', w: 105, h: 105, label: 'Hindu Temple' },
    { text: 'cathedral', isImage: false, x: 50, y: 260, group: 'Places of Worship', w: 165, h: 50, label: 'Cathedral' },
    { text: 'mosque', isImage: true, isURL: true, url: 'TBD', x: 640, y: 220, group: 'Places of Worship', w: 105, h: 105, label: 'Mosque' },
    { text: 'shinto shrine', isImage: true, isURL: true, url: 'TBD', x: 620, y: 210, group: 'Places of Worship', w: 105, h: 105, label: 'Shinto Shrine' }
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
let triesRemaining = 4; // 4 LINE
let submitButton = { x: 350, y: 545, w: 100, h: 40 };

// Placeholder image for description box
let placeholderImage = null;
let placeholderImageLoaded = false;

// Win screen trophy image
let winImage = null;
let winImageLoaded = false;

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
winImage = loadImageFromURL('images/4x4_puzz_1_images/synagogue.png', 'winImage');
winImage.onload = function() {
    winImageLoaded = true;
};

// Load placeholder image for description box (puzzle piece icon)
placeholderImage = loadImageFromURL('images/editor.png', 'placeholderImage');
placeholderImage.onload = function() {
    placeholderImageLoaded = true;
};

function setup() {
    let canvas = createCanvas(800, 750);
    canvas.parent('sketch-container');
    textAlign(CENTER, CENTER);
    textSize(16);
}

function draw() {
    background(250);
    
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
    
    // Draw tries remaining (hearts)
    textAlign(RIGHT, TOP);
    textSize(14);
    fill(0);
    text('Tries:', width - 120, 90);
    
    for (let i = 0; i < 4; i++) { // 4 LINE
    textSize(24);
    if (i < triesRemaining) {
        fill(239, 68, 68); // Red heart for remaining tries
        text('❤️', width - 85 + (i * 28), 84);
    } else {
        fill(200); // Gray heart for used tries
        text('🖤', width - 85 + (i * 28), 84);
    }
    }
    
    // Draw feedback
    if (feedback && millis() < feedbackTimer && !gameWon && !gameLost) {
    textAlign(CENTER, TOP);
    textSize(18);
    fill(feedback.correct ? color(34, 197, 94) : color(239, 68, 68));
    text(feedback.message, width / 2, 80);
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
        fill(102, 126, 234);
        textSize(10);
        text(pos, item.x + item.w - 12, item.y + 12);
    }
    }
    
    // Submit button AFTER items so it draws on top (only show when current chain has 3 items)
    if (currentChain.length === 3 && !gameWon && !gameLost) {
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
    text('Conspiracy: When you crush a candy in the game,', width / 2, height / 2 + 20);
    text('one also gets crushed in real life', width / 2, height / 2 + 60);
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
    text('Conspiracy: Jews control the world\'s synagogues,', width / 2, height / 2 + 20);
    textSize(16);
    text('Jews: star of david, larry david, el al airlines, yarmulke', width / 2, height / 2 + 100);
    text('Control: xbox controller, ctrl key, remote control, crowd control', width / 2, height / 2 + 120);
    text('World: earth, walt disney world, wayne\'s world, twa airlines', width / 2, height / 2 + 140);
    text('Places of Worship: hindu temple, cathedral, mosque, shinto shrine', width / 2, height / 2 + 160);
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
    text('• Click and drag to make chains of 4 related items', 20, 655);
    text('• Click SUBMIT to check if correct. You have 4 tries', 20, 675);
    text('• Find 4 correct groups to expose the conspiracy', 20, 695);
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
    text('"This one goes ALL the way to the top. Call me a', descBoxX + 70, descBoxY + descBoxHeight / 2.8);
    text('BIGOT if you must. But I STILL KNOW who runs', descBoxX + 70, descBoxY + descBoxHeight / 2);
    text('things!', descBoxX + 70, descBoxY + descBoxHeight / 1.55);
    
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
    if (currentChain.length === 4 && !gameWon && !gameLost && // 4 LINE
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
        // Block if chain already has 4 items
        if (!currentChain.includes(target) && !targetUsed && currentChain.length < 4) { // 4 LINE
            currentChain.push(target);
        }
        }
    }
    }
    
    dragging = null;
}

function submitChain() {
    if (currentChain.length !== 4) return; // 4 LINE
    
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
    if (completedChains.length === 4) {  // 4 LINE
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
    triesRemaining = 4; // 4 LINE
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