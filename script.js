const paragraphs = [
    "The early morning sunlight spread across the horizon, bathing the quiet countryside in a soft golden glow. Birds chirped from treetops as farmers prepared their tools for a long day's work. In the distance, smoke curled lazily from chimneys, promising warm breakfasts. Nature stretched slowly, welcoming another peaceful day as the sleepy village awakened gently to life. Deep within the enchanted forest, towering trees stood like ancient guardians, their thick canopies filtering sunlight into dappled patterns on the mossy ground. Quiet streams trickled past smooth stones as deer moved gracefully among ferns.",
    "In the bustling marketplace, colorful stalls brimmed with fresh fruits, handcrafted jewelry, and fragrant spices. Merchants shouted cheerful greetings while customers examined wares with curious eyes. Children darted between shoppers, chasing after stray dogs and stolen pastries. The air smelled richly of cinnamon and roasted nuts, while laughter and bargaining wove together into the morning's lively symphony of trade. Along the endless coastline, waves crashed steadily against jagged cliffs, their white foam contrasting beautifully with deep blue waters. Seagulls circled overhead, their cries echoing against weathered rocks.",
    "Beneath the endless desert sky, caravans journeyed slowly across golden dunes, their camels moving in rhythmic silence. Tents were pitched at twilight, fires flickering as traders shared stories of distant cities and mysterious lands. The air smelled of spices and dry sand, while constellations slowly appeared overhead, guiding travelers through the vast, unforgiving landscape that stretched infinitely beyond sight. Under the vast night sky, travelers camped beside their glowing fire, telling stories of distant lands and adventures yet to come. Sparks rose toward constellations scattered like diamonds, while the wind whispered softly through surrounding trees."
];
const startButton = document.querySelector(".start-button");
const textContainer = document.querySelector(".text-container");
const textInput = document.querySelector(".text-input");
const selectTime = document.getElementById("select-time");
const wordPerMinute = document.querySelector(".wpm");
const typingAccuracy = document.querySelector(".accuracy");
const resetButton = document.querySelector(".reset-button");
textInput.addEventListener("contextmenu", (event) => {
    event.preventDefault();
});
const stopBackspace = () => {
    textInput.addEventListener("keydown", (event) => {
        if(event.key === "Backspace"){
            event.preventDefault();
        }
    });
}
startButton.addEventListener("click", () => {
    textInput.focus();
    startButton.disabled = true;
    const randomParagraph = paragraphs[Math.floor(Math.random() * paragraphs.length)];
    textContainer.textContent = randomParagraph;
    let userInputValue;
    let originalText;
    let words;
    let correct;
    textInput.addEventListener("input", () => {
        userInputValue = textInput.value;
        originalText = randomParagraph;
        words = userInputValue.split(" ");
        correct = 0;
        let resultHTML = "";
        for (let index = 0; index < originalText.length; index++) {
            if (index < userInputValue.length) {
                if (userInputValue[index] === originalText[index]) {
                    resultHTML = resultHTML + `<span class="correct">${originalText[index]}</span>`;
                    correct++;
                } else {
                    resultHTML = resultHTML + `<span class="incorrect">${originalText[index]}</span>`;
                    stopBackspace();
                }
            } else {
                resultHTML = resultHTML + originalText[index];
            }
        }
        textContainer.innerHTML = resultHTML;
    });
    const alertUserAndShowAccuracyWithWPM = () => {
        alert("Time up !");
        textInput.disabled = true;
        typingAccuracy.textContent = Math.round(`${(correct / userInputValue.length) * 100}`) + "%";
        wordPerMinute.textContent = Math.round(`${words.length / 1}`);
        startButton.disabled = false;
    }
    if (selectTime.value === "1") {
        setTimeout(() => {
            alertUserAndShowAccuracyWithWPM();
        }, 60000);
    } else if (selectTime.value === "3") {
        setTimeout(() => {
            alertUserAndShowAccuracyWithWPM();
        }, 180000);
    }
});
resetButton.addEventListener("click", () => {
    location.reload();
});