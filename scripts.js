// Quiz Time
const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        correctAnswer: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        correctAnswer: 1
    },
    {
      question: "What is the color of the sky on a clear day?",
      options: ["Green", "Blue", "Red", "Yellow"],
      correctAnswer: 1
  },
  {
      question: "How many legs does a spider have?",
      options: ["6", "8", "4", "10"],
      correctAnswer: 1
  },
  {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      correctAnswer: 1
  },
  {
      question: "Which animal is known as the king of the jungle?",
      options: ["Elephant", "Lion", "Tiger", "Bear"],
      correctAnswer: 1
  },
  {
      question: "What do cows drink?",
      options: ["Milk", "Water", "Juice", "Soda"],
      correctAnswer: 1
  },
  {
      question: "Which shape has three sides?",
      options: ["Square", "Rectangle", "Triangle", "Circle"],
      correctAnswer: 2
  },
  {
      question: "What do bees make?",
      options: ["Honey", "Butter", "Cheese", "Jam"],
      correctAnswer: 0
  },
  {
      question: "Which is the largest land animal?",
      options: ["Horse", "Giraffe", "Elephant", "Rhino"],
      correctAnswer: 2
  },
  {
      question: "How many days are there in a week?",
      options: ["5", "6", "7", "8"],
      correctAnswer: 2
  },
  {
    question: "What is the capital of India?",
    options: ["Gwalior","Mumbai", "New Delhi", "Bangalore"],
    correctAnswer: 2
  },
  {
      question: "What do plants need to grow?",
      options: ["Sunlight", "Sugar", "Milk", "Oil"],
      correctAnswer: 0
  },
  {
      question: "What is the name of a baby cat?",
      options: ["Puppy", "Kitten", "Cub", "Chick"],
      correctAnswer: 1
  },
  {
      question: "Which ocean is the largest?",
      options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
      correctAnswer: 2
  }

];

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
    const questionElement = document.getElementById("quiz-question");
    const optionsButtons = document.querySelectorAll(".quiz-option");
    const quizResult = document.getElementById("quiz-result");

    // Load question and options
    questionElement.textContent = questions[currentQuestionIndex].question;
    optionsButtons.forEach((button, index) => {
        button.textContent = questions[currentQuestionIndex].options[index];
        button.disabled = false; // Enable buttons for the new question
    });

    // Clear previous result
    quizResult.textContent = "";

    // Show options and hide submit button initially
    document.getElementById("quiz-options").style.display = "block";
    document.getElementById("submit-btn").style.display = "none";
}

function checkAnswer(selectedOption) {
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    const quizResult = document.getElementById("quiz-result");

    if (selectedOption === correctAnswer) {
        quizResult.textContent = "Correct! 🎉";
        quizResult.style.color = "green";
        score++;
    } else {
        quizResult.textContent = "Wrong answer. Try again!";
        quizResult.style.color = "red";
    }

    // Disable options after answering
    document.querySelectorAll(".quiz-option").forEach((button) => {
        button.disabled = true;
    });

    // Move to the next question after a short delay
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            // Show submit button after the last question
            document.getElementById("quiz-options").style.display = "none";
            document.getElementById("submit-btn").style.display = "block";
        }
    }, 1000);
}

function submitQuiz() {
    const quizResult = document.getElementById("quiz-result");

    // Hide the quiz question and options
    document.getElementById("quiz-question").style.display = "none";
    document.getElementById("quiz-options").style.display = "none";

    // Display the final score
    quizResult.textContent = `Quiz Completed! Your Score: ${score} / ${questions.length}`;
    quizResult.style.color = "#007bff";

    // Disable the submit button after submission
    document.getElementById("submit-btn").disabled = true;
}

// Load the first question on page load
document.addEventListener("DOMContentLoaded", loadQuestion);

  







// Puzzle Logic
let secretNumber;
let attempts = 0;
let maxAttempts;
let previousGuesses = [];
let hintGiven = false;

// Start the game with selected difficulty
function startGame() {
    const difficulty = document.getElementById('difficulty').value;
    maxAttempts = Math.floor(difficulty / 10) + 5; // Adjust max attempts based on difficulty
    secretNumber = Math.floor(Math.random() * difficulty) + 1;
    attempts = 0;
    previousGuesses = [];
    hintGiven = false;

    document.getElementById('result').textContent = '';
    document.getElementById('previousGuesses').textContent = '';
    document.getElementById('hint').textContent = '';
    document.getElementById('guessInput').value = '';
    document.getElementById('hint').style.color = '#ff8c00';
}

// Check the user's guess
function checkGuess() {
    const userGuess = document.getElementById('guessInput').value.trim();
    const resultDiv = document.getElementById('result');
    const previousGuessesDiv = document.getElementById('previousGuesses');
    const hintDiv = document.getElementById('hint');

    // Check for empty input or invalid range
    if (userGuess === "" || isNaN(userGuess) || parseInt(userGuess) < 1 || parseInt(userGuess) > secretNumber * 2) {
        resultDiv.textContent = `Enter a valid number in the selected range.`;
        resultDiv.style.color = "red";
        return; // Exit early without counting an attempt, showing hints, or adding to previous guesses
    }

    const userGuessNum = parseInt(userGuess);
    attempts++;

    // Add guess to previous guesses
    previousGuesses.push(userGuessNum);
    previousGuessesDiv.textContent = `Previous guesses: ${previousGuesses.join(', ')}`;

    // Provide hints after 3 valid attempts
    if (attempts > 3 && !hintGiven) {
        hintDiv.textContent = `Hint: The number is ${secretNumber % 2 === 0 ? "even" : "odd"}.`;
        hintGiven = true;
    }

    // Check the guess
    if (userGuessNum < secretNumber) {
        resultDiv.textContent = `Too low! You have ${maxAttempts - attempts} attempts left.`;
        resultDiv.style.color = "orange";
    } else if (userGuessNum > secretNumber) {
        resultDiv.textContent = `Too high! You have ${maxAttempts - attempts} attempts left.`;
        resultDiv.style.color = "orange";
    } else {
        resultDiv.textContent = `Congratulations! You've guessed the number in ${attempts} attempts.`;
        resultDiv.style.color = "green";
        setTimeout(() => {
            alert("Great job! Let's play again.");
            startGame(); // Reset game
        }, 1500);
    }

    // If max attempts are reached
    if (attempts >= maxAttempts) {
        resultDiv.textContent = `Game Over! The number was ${secretNumber}. Try again!`;
        resultDiv.style.color = "red";
        setTimeout(() => {
            startGame(); // Reset game
        }, 1500);
    }
}

// Initialize the game when page loads
window.onload = startGame;










// Main Code
document.addEventListener('DOMContentLoaded', () => {


// Memory Game
const memoryGame = document.getElementById("memory-game");
const emojis = ["🐶", "🐱", "🦊", "🐵", "🐼", "🦁", "🐶", "🐱", "🦊", "🐵", "🐼", "🦁","❤️","😎","❤️","😎","🤡","🤡"];
let selectedCards = [];
let matchedPairs = 0;

function createMemoryCards() {
    memoryGame.innerHTML = "";
    const shuffledEmojis = emojis.sort(() => Math.random() - 0.5);
    shuffledEmojis.forEach((emoji) => {
        const card = document.createElement("div");
        card.className = "card";
        card.textContent = "?";
        card.dataset.emoji = emoji;
        card.addEventListener("click", handleCardClick);
        memoryGame.appendChild(card);
    });
}

function handleCardClick() {
    if (selectedCards.length < 2 && !this.classList.contains("flipped")) {
        this.classList.add("flipped");
        this.textContent = this.dataset.emoji;
        selectedCards.push(this);
        if (selectedCards.length === 2) checkMatch();
    }
}

function checkMatch() {
    const [first, second] = selectedCards;
    if (first.dataset.emoji === second.dataset.emoji) {
        matchedPairs++;
        selectedCards = [];
        if (matchedPairs === emojis.length / 2) showModal("You matched all pairs! 🎉");
    } else {
        setTimeout(() => {
            first.textContent = "?";
            second.textContent = "?";
            first.classList.remove("flipped");
            second.classList.remove("flipped");
            selectedCards = [];
        }, 1000);
    }
}

createMemoryCards();







// Drawing Logic
const canvas = document.getElementById('art-canvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('color-picker');
const penThickness = document.getElementById('pen-thickness');
const eraserTool = document.getElementById('eraser-tool');
const clearScreen = document.getElementById('clear-screen'); // Clear screen button
let drawing = false;
let isEraser = false;

const startDrawing = (e) => {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
};

const draw = (e) => {
    if (!drawing) return;
    ctx.strokeStyle = isEraser ? '#fff' : colorPicker.value;
    ctx.lineWidth = penThickness.value;
    ctx.lineCap = 'round';
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
};

const stopDrawing = () => {
    drawing = false;
    ctx.closePath();
};

// Clear the canvas
const clearCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

eraserTool.addEventListener('click', () => {
    isEraser = !isEraser;
    eraserTool.textContent = isEraser ? 'Pen' : 'Eraser';
});

clearScreen.addEventListener('click', clearCanvas);







  // Fun Facts
const funFactButton = document.getElementById('reveal-fact');
const funFactDisplay = document.getElementById('fun-fact');
const facts = [
  "Did you know? Honey never spoils! Even ancient honey is still edible!",
  "A giraffe's neck is too short to reach the ground to drink water.",
  "Octopuses have three hearts!",
  "Flamingos can sleep on one leg!",
  "Bananas are berries, but strawberries are not!",
  "Butterflies taste with their feet!",
  "The Earth is about 93 million miles away from the Sun.",
  "A kangaroo can't walk backward.",
  "A jellyfish is 95% water!",
  "Giraffes have blue tongues to protect them from the sun.",
  "A cloud can weigh more than a million pounds.",
  "Elephants are the only animals that can't jump.",
  "A panda's diet is 99% bamboo, but they belong to the order Carnivora (meat-eating animals).",
  "Sharks have been around longer than trees – they’ve existed for over 400 million years!",
  "A hummingbird's heart beats up to 1,200 times per minute.",
  "The Eiffel Tower can grow by about 6 inches in the summer due to the heat expanding the metal.",
  "Cows have best friends and can become stressed when they’re separated.",
  "Sloths can hold their breath for up to 40 minutes underwater.",
  "Koalas sleep up to 22 hours a day!",
  "A crocodile can't stick its tongue out."
];

// Add event listener for button click
funFactButton.addEventListener('click', () => {
  // Generate a random index
  const randomIndex = Math.floor(Math.random() * facts.length);
  // Display the random fact
  funFactDisplay.textContent = facts[randomIndex];
});








  // Music Maker(Guitar & Piano ) Logic
  const notes = {
    //Guitar sounds
    A: 'sounds of guitar/1 A1 1.wav',
    Asharp: 'sounds of guitar/1 A sharp1 1.wav',
    B: 'sounds of guitar/1 B1 1.wav',
    C: 'sounds of guitar/1 C2 1.wav',
    Csharp: 'sounds of guitar/1 C sharp 2 1.wav',
    D: 'sounds of guitar/1 D2 1.wav',
    Dsharp: 'sounds of guitar/1 D sharp 2 1.wav',
    E: 'sounds of guitar/1 E1 1.wav',
    F: 'sounds of guitar/1 F1 1.wav',
    Fsharp: 'sounds of guitar/1 F sharp 1 1.wav',
    G: 'sounds of guitar/1 G1 1.wav',
    Gsharp: 'sounds of guitar/1 G sharp 1 1.wav',

    //Piano sounds
    c:'sounds of piano/Steinway_P_44.mp3',
    csharp:'sounds of piano/Steinway_P_49.mp3',
    d:'sounds of piano/Steinway_P_54.mp3',
    dsharp:'sounds of piano/Steinway_P_59.mp3',
    e:'sounds of piano/Steinway_P_64.mp3',
    f:'sounds of piano/Steinway_P_69.mp3',
    fsharp:'sounds of piano/Steinway_P_74.mp3',
    g:'sounds of piano/Steinway_P_79.mp3',
    gsharp:'sounds of piano/Steinway_P_84.mp3',
    a:'sounds of piano/Steinway_P_89.mp3',
    asharp:'sounds of piano/Steinway_P_94.mp3',
    b:'sounds of piano/Steinway_P_99.mp3',

  };
  
  const musicKeys = document.querySelectorAll('.music-key');
  
  musicKeys.forEach((key) => {
    key.addEventListener('click', () => {
        const note = key.dataset.note;
        if (notes[note]) {
            const audio = new Audio(notes[note]);
            audio.play();
        }
    });
  });
  








    // **Typing Section**
    const paragraphs = [
        `"Once upon a time, there was a little fox named Max. Max loved to run and jump in the green forest. Every day, he would play with his friends, the birds and squirrels. They would race around the big trees, and Max would always win. He was very fast! At the end of the day, Max would rest under a tall tree, feeling happy and tired."`,
        `"The sun was setting behind the hills, casting a golden glow over the village. Children played in the fields, laughing and chasing each other. An old farmer watched them with a smile, remembering his own carefree days as a boy. The calm breeze carried the scent of flowers, and everything felt peaceful."`,
        `"In a small town by the sea, there was a lighthouse that stood tall and proud. It guided sailors safely through the rough waters at night. The lighthouse keeper, Mr. Henry, loved his job. He would polish the glass and light the lamp every evening. The townsfolk admired him for his dedication."`,
        `"The little village nestled in the valley was surrounded by towering mountains. In the early mornings, a thick mist would blanket the rooftops, and the sound of a nearby stream filled the air. Farmers worked tirelessly in the terraced fields, their tools echoing as they tilled the soil. Children with flushed cheeks chased each other on narrow paths, their laughter mingling with the chirping of sparrows. As the sun rose higher, the mist lifted, revealing a sky so blue it seemed endless."`,
        `"Under the vast, star-studded sky, the world seemed to hold its breath. The meadow was quiet except for the occasional rustle of grass in the breeze. A small campfire crackled, its warmth chasing away the chill of the night. A group of friends sat around it, their faces illuminated by the soft orange glow. They whispered stories, their voices blending with the distant call of an owl. Above them, constellations stretched endlessly, a reminder of the universe's boundless wonder."`,
        `"The garden was a riot of colors, bursting with the life of spring. Tulips, daisies, and daffodils swayed gently in the breeze, their petals vibrant against the fresh green grass. Bees buzzed lazily from flower to flower, and butterflies danced in the sunlight. A small fountain gurgled cheerfully in the center, its cool water sparkling like diamonds. The scent of blooming jasmine filled the air, mingling with the soft hum of nature's melody."`
      ];
      
      let currentParagraphIndex = 0;
      
      // Helper function to calculate LCS alignment
      function getLCSAlignment(originalWords, userWords) {
        const m = originalWords.length;
        const n = userWords.length;
        const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
      
        // Fill the LCS matrix
        for (let i = 1; i <= m; i++) {
          for (let j = 1; j <= n; j++) {
            if (originalWords[i - 1] === userWords[j - 1]) {
              dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
              dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
          }
        }
      
        // Backtrack to find the alignment
        const alignment = [];
        let i = m, j = n;
        while (i > 0 && j > 0) {
          if (originalWords[i - 1] === userWords[j - 1]) {
            alignment.push({ word: originalWords[i - 1], status: 'exact' });
            i--; j--;
          } else if (dp[i - 1][j] > dp[i][j - 1]) {
            alignment.push({ word: originalWords[i - 1], status: 'missing' });
            i--;
          } else {
            alignment.push({ word: userWords[j - 1], status: 'extra' });
            j--;
          }
        }
      
        // Handle remaining words
        while (i > 0) {
          alignment.push({ word: originalWords[i - 1], status: 'missing' });
          i--;
        }
        while (j > 0) {
          alignment.push({ word: userWords[j - 1], status: 'extra' });
          j--;
        }
      
        return alignment.reverse(); // Return in correct order
      }
      
      // Helper function to calculate similarity
      function calculateSimilarity(word1, word2) {
        const len1 = word1.length;
        const len2 = word2.length;
        const dp = Array.from({ length: len1 + 1 }, () => Array(len2 + 1).fill(0));
      
        for (let i = 0; i <= len1; i++) dp[i][0] = i;
        for (let j = 0; j <= len2; j++) dp[0][j] = j;
      
        for (let i = 1; i <= len1; i++) {
          for (let j = 1; j <= len2; j++) {
            if (word1[i - 1] === word2[j - 1]) {
              dp[i][j] = dp[i - 1][j - 1];
            } else {
              dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i][j - 1], dp[i - 1][j]) + 1;
            }
          }
        }
      
        const editDistance = dp[len1][len2];
        const maxLen = Math.max(len1, len2);
        return ((maxLen - editDistance) / maxLen) * 100; // Similarity percentage
      }
      
      // Event listener for the submit button
      document.getElementById('submit-text').addEventListener('click', () => {
        const typingArea = document.getElementById('typing-area');
        const resultSection = document.getElementById('result-section');
        const feedback = document.getElementById('feedback');
        const scoreElement = document.getElementById('score');
        const originalParagraph = paragraphs[currentParagraphIndex].trim();
        const userInput = typingArea.value.trim();
      
        resultSection.classList.remove('hidden');
        feedback.innerHTML = '';
        scoreElement.innerHTML = '';
      
        const originalWords = originalParagraph.split(/\s+/);
        const userWords = userInput.split(/\s+/);
      
        const alignment = getLCSAlignment(originalWords, userWords);
      
        let exactMatches = 0;
        let partialMatches = 0;
        let totalMistakes = 0;
      
        const highlightedText = alignment
          .map(({ word, status }, index) => {
            if (status === 'exact') {
              exactMatches++;
              return `<span style="color: green;">${word}</span>`;
            } else if (status === 'extra' || status === 'missing') {
              totalMistakes++;
              return `<span style="color: red;">${word}</span>`;
            } else {
              const similarity = calculateSimilarity(word, originalWords[index]);
              if (similarity >= 70) {
                partialMatches++;
                return `<span style="color: orange;" title="Partial Match">${word}</span>`;
              } else {
                totalMistakes++;
                return `<span style="color: red;">${word}</span>`;
              }
            }
          })
          .join(' ');
      
        // Update Feedback Section
        feedback.innerHTML = `<p>${highlightedText}</p>`;
      
        // Calculate Score
        const totalWords = originalWords.length;
        const exactScore = (exactMatches / totalWords) * 100;
        const partialScore = (partialMatches / totalWords) * 50;
        const totalScore = Math.round(exactScore + partialScore);
      
        // Display Score and Detailed Summary
        scoreElement.innerHTML = `
          <strong>Score:</strong> ${totalScore} / 100<br>
          <strong>Exact Matches:</strong> ${exactMatches}<br>
          <strong>Partial Matches:</strong> ${partialMatches}<br>
          <strong>Total Mistakes:</strong> ${totalMistakes}
        `;
      
        typingArea.value = ''; // Clear typing area for retry
      });
      
      // Event listener to change the paragraph
      document.getElementById('clear-screen-Typing').addEventListener('click', () => {
        currentParagraphIndex = (currentParagraphIndex + 1) % paragraphs.length;
        document.getElementById('display-paragraph').innerText =
          paragraphs[currentParagraphIndex];
        document.getElementById('typing-area').value = '';
        document.getElementById('result-section').classList.add('hidden');
      });
      
      

            
});

