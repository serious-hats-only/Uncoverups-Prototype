// Game state - mix of text and emoji/symbols as images
let items = [
    // Seasons - 2 text, 2 images
    { text: 'Spring', isImage: false, x: 120, y: 320, group: 'seasons', w: 85, h: 50 },
    { text: 'sun', isImage: true, isURL: true, url: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSIjRkZEQzNCIiBkPSJNMjU2IDEyOGMtNzAuNyAwLTEyOCA1Ny4zLTEyOCAxMjhzNTcuMyAxMjggMTI4IDEyOCAxMjgtNTcuMyAxMjgtMTI4LTU3LjMtMTI4LTEyOC0xMjh6bTAgMjA4Yy00NC4yIDAtODAtMzUuOC04MC04MHMzNS44LTgwIDgwLTgwIDgwIDM1LjggODAgODAtMzUuOCA4MC04MCA4MHptMC0zMjBjMTMuMyAwIDI0LTEwLjcgMjQtMjRWMjRjMC0xMy4zLTEwLjctMjQtMjQtMjRzLTI0IDEwLjctMjQgMjR2NjhjMCAxMy4zIDEwLjcgMjQgMjQgMjR6bTE3MS4yIDk3LjZjOS40LTkuNCA5LjQtMjQuNiAwLTMzLjlsLTQ4LTQ4Yy05LjQtOS40LTI0LjYtOS40LTMzLjkgMHMtOS40IDI0LjYgMCAzMy45bDQ4IDQ4YzQuNyA0LjcgMTAuOCA3IDEwLjggN3M2LjItMi4zIDEwLjktN3pNNDg4IDIzMmgtNjhjLTEzLjMgMC0yNCAxMC43LTI0IDI0czEwLjcgMjQgMjQgMjRoNjhjMTMuMyAwIDI0LTEwLjcgMjQtMjRzLTEwLjctMjQtMjQtMjR6bS02MC42IDE0OC44Yy05LjQtOS40LTI0LjYtOS40LTMzLjkgMHMtOS40IDI0LjYgMCAzMy45bDQ4IDQ4YzQuNyA0LjcgMTAuOCA3IDE2Ljk2IDdzMTIuMy0yLjMgMTYuOTYtN2M5LjQtOS40IDkuNC0yNC42IDAtMzMuOWwtNDgtNDh6TTI1NiA0MTZjLTEzLjMgMC0yNCAxMC43LTI0IDI0djY4YzAgMTMuMyAxMC43IDI0IDI0IDI0czI0LTEwLjcgMjQtMjR2LTY4YzAtMTMuMy0xMC43LTI0LTI0LTI0em0tMTU1LjItMzUuMmMtOS40LTkuNC0yNC42LTkuNC0zMy45IDBsLTQ4IDQ4Yy05LjQgOS40LTkuNCAyNC42IDAgMzMuOSA0LjcgNC43IDEwLjggNyAxNi45NiA3czEyLjMtMi4zIDE2Ljk2LTdsNDgtNDhjOS40LTkuNCA5LjQtMjQuNiAwLTMzLjl6TTkyIDI1NmMwLTEzLjMtMTAuNy0yNC0yNC0yNEgyNGMtMTMuMyAwLTI0IDEwLjctMjQgMjRzMTAuNyAyNCAyNCAyNGg0NGMxMy4zIDAgMjQtMTAuNyAyNC0yNHptOC44LTE3NC4yYy05LjQtOS40LTI0LjYtOS40LTMzLjkgMGwtNDggNDhjLTkuNCA5LjQtOS40IDI0LjYgMCAzMy45IDQuNyA0LjcgMTAuOCA3IDE2Ljk2IDdzMTIuMy0yLjMgMTYuOTYtN2w0OC00OGM5LjQtOS40IDkuNC0yNC42IDAtMzMuOXoiLz48L3N2Zz4=', x: 580, y: 190, group: 'seasons', w: 85, h: 50, label: 'Summer' },
    { text: 'Autumn', isImage: false, x: 320, y: 130, group: 'seasons', w: 85, h: 50 },
    { text: '❄️', isImage: true, isURL: false, x: 450, y: 360, group: 'seasons', w: 85, h: 50, label: 'Winter' },
    
    // Planets - 2 text, 2 images
    { text: '🔴', isImage: true, isURL: false, x: 200, y: 220, group: 'planets', w: 85, h: 50, label: 'Mars' },
    { text: 'Venus', isImage: false, x: 680, y: 320, group: 'planets', w: 85, h: 50 },
    { text: 'oreo', isImage: true, isURL: true, url: 'images/oreo.png', x: 50, y: 130, group: 'planets', w: 85, h: 50, label: 'Saturn' }, // does this work?
    { text: 'Jupiter', isImage: false, x: 520, y: 260, group: 'planets', w: 85, h: 50 },
    
    // Instruments - 2 text, 2 images
    { text: 'Piano', isImage: false, x: 380, y: 220, group: 'instruments', w: 85, h: 50 },
    { text: '🎸', isImage: true, isURL: false, x: 150, y: 420, group: 'instruments', w: 85, h: 50, label: 'Guitar' },
    { text: '🎻', isImage: true, isURL: false, x: 620, y: 130, group: 'instruments', w: 85, h: 50, label: 'Violin' },
    { text: 'Drums', isImage: false, x: 290, y: 360, group: 'instruments', w: 85, h: 50 },
    
    // Fruits - 2 text, 2 images
    { text: '🍎', isImage: true, isURL: false, x: 480, y: 130, group: 'fruits', w: 85, h: 50, label: 'Apple' },
    { text: 'Banana', isImage: false, x: 50, y: 260, group: 'fruits', w: 85, h: 50 },
    { text: '🍊', isImage: true, isURL: false, x: 340, y: 420, group: 'fruits', w: 85, h: 50, label: 'Orange' },
    { text: 'Grape', isImage: false, x: 680, y: 220, group: 'fruits', w: 85, h: 50 }
];

let imageCache = {};
let imageLoadStatus = {};

let completedChains = []; // Verified correct chains
let currentChain = [];
let dragging = null;
let dragX = 0;
let dragY = 0;
let score = 0;
let feedback = null;
let feedbackTimer = 0;
let gameWon = false;
let gameLost = false;
let triesRemaining = 4;
let submitButton = { x: 350, y: 545, w: 100, h: 40 };

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
    textSize(42);
    textStyle(BOLD);
    text('UNCOVERUPS', width / 2, 15);
    textStyle(NORMAL);
    
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
    
    for (let i = 0; i < 4; i++) {
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
    text(feedback.message, width / 2, 60);
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
            drawingContext.drawImage(img, item.x + item.w / 2 - 20, item.y + item.h / 2 - 20, 40, 40);
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
    
    // Submit button AFTER items so it draws on top (only show when current chain has 4 items)
    if (currentChain.length === 4 && !gameWon && !gameLost) {
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
    
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(48);
    textStyle(BOLD);
    text('🎉 YOU WIN! 🎉', width / 2, height / 2 - 40);
    textStyle(NORMAL);
    textSize(24);
    text('All matches correct!', width / 2, height / 2 + 20);
    textSize(20);
    text('Final Score: ' + score + ' points', width / 2, height / 2 + 60);
    textSize(16);
    text('Press R to play again', width / 2, height / 2 + 100);
    }
    
    // Lose message - full screen overlay
    if (gameLost) {
    fill(239, 68, 68, 240);
    noStroke();
    rect(0, 0, width, height);
    
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(48);
    textStyle(BOLD);
    text('💔 GAME OVER 💔', width / 2, height / 2 - 40);
    textStyle(NORMAL);
    textSize(24);
    text('No tries remaining', width / 2, height / 2 + 20);
    textSize(20);
    text('Score: ' + score + ' points', width / 2, height / 2 + 60);
    textSize(16);
    text('Press R to try again', width / 2, height / 2 + 100);
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
    text('• Connect 4 related items, then click SUBMIT to check if correct', 20, 655);
    // text('• Correct chains turns green, Wrong = -20 pts, lose a try, and resets', 20, 665);
    text('• Complete 4 correct chains to win! You have 4 tries total.', 20, 675);
    text('• Press \'R\' to reset game, \'U\' to undo last connection', 20, 695);
}

function mousePressed() {
    // Check if clicking submit button
    if (currentChain.length === 4 && !gameWon && !gameLost &&
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
        if (!currentChain.includes(target) && !targetUsed && currentChain.length < 4) {
            currentChain.push(target);
        }
        }
    }
    }
    
    dragging = null;
}

function submitChain() {
    if (currentChain.length !== 4) return;
    
    // Check if all items in chain have same group
    let firstGroup = currentChain[0].group;
    let isCorrect = currentChain.every(item => item.group === firstGroup);
    
    if (isCorrect) {
    // Correct! Add to completed chains
    completedChains.push([...currentChain]);
    score += 50;
    feedback = { message: '✓ Correct! +50 points', correct: true };
    feedbackTimer = millis() + 2000;
    currentChain = [];
    
    // Check if game is won
    if (completedChains.length === 4) {
        gameWon = true;
        feedback = { message: '🎉 You won! All chains correct!', correct: true };
        feedbackTimer = millis() + 5000;
    }
    } else {
    // Incorrect! Lose a try and reset current chain
    triesRemaining--;
    score = max(0, score - 20);
    feedback = { message: '✗ Incorrect match! -20 points', correct: false };
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
    currentChain = [];
    score = 0;
    feedback = null;
    gameWon = false;
    gameLost = false;
    triesRemaining = 4;
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