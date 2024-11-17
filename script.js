const positiveAttributes = {
    subject: [
        "beautiful 35 years old Japanese female bodybuilder",
    ],
    bodyType: [
        "chubby muscular",
    ],
    style: [
        "in fitted white t-shirt with blue jeans",
        "in black tank top with cargo pants",
        "in cropped hoodie with high-waist jeans",
        "in graphic tee with denim shorts",
        "in polo shirt with khaki pants",
        "in striped sweater with leggings",
        "in elegant black evening gown",
        "in tailored business suit",
        "in traditional silk kimono",
        "in floral summer dress",
        "in oversized sweater and leggings",
        "in comfortable cotton pajamas",
        "in long winter coat",
        "in one-piece swimsuit",
        "in form-fitting yoga pants",
        "in professional office attire",
        "in light sundress",
        "in denim shorts with tank top",
        "in summer yukata",
        "in sleek cocktail dress",
        "in moisture-wicking running outfit",
        "in stylish beach wear",
        "in casual shopping outfit",
        "in red dinner dress",
        "in weekend leisure wear",
        "in black evening gown with side slit",
        "in red cocktail dress with sweetheart neckline",
        "in navy blue business suit with pencil skirt",
        "in white blazer with tailored pants",
        "in sequined formal dress",
        "in silk chiffon gown",
        "in floral pattern kimono with obi",
        "in summer yukata with traditional patterns",
        "in hakama with decorative haori",
        "in modern fusion kimono dress",
        "in ceremonial kimono with elaborate obi",
        "in casual modern yukata",
        "in compression top with running shorts",
        "in yoga pants with sports bra",
        "in track suit with running shoes",
        "in tennis dress with wristbands",
        "in gym shorts with tank top",
        "in cycling shorts with jersey",
        "in winter coat with scarf and gloves",
        "in summer dress with sun hat",
        "in rain jacket with boots",
        "in beach wear with cover-up",
        "in festival yukata with fan",
        "in spring jacket with umbrella"
    ],
    poses: [
        "cooking healthy meal in modern kitchen",
        "shopping at local supermarket",
        "working on laptop at coffee shop",
        "reading book in cozy corner",
        "writing in journal at desk",
        "gardening in backyard",
        "stretching on yoga mat",
        "doing morning exercises in park",
        "practicing tai chi movements",
        "performing gentle stretches",
        "doing light dumbbell exercises",
        "walking on treadmill",
        "laughing with friends at restaurant",
        "enjoying tea ceremony",
        "playing board games",
        "attending art exhibition",
        "watching movie in theater",
        "participating in cooking class",
        "teaching class confidently",
        "giving business presentation",
        "working at office desk",
        "meeting with clients",
        "organizing documents",
        "leading team meeting",
        "relaxing in onsen bath",
        "meditating in zen garden",
        "reading magazine on balcony",
        "enjoying sunset view",
        "listening to music with headphones",
        "painting at art easel"
    ],
    quality: [
        "8k ultra HD",
        "highly detailed",
        "professional photography",
        "perfect studio lighting",
        "masterpiece quality",
        "award winning photo",
        "sharp focus",
        "perfect composition",
        "professional color grading",
        "magazine quality"
    ]
};

const negativePrompts = [
    "deformed", "blurry", "bad anatomy", "disfigured", "poorly drawn face",
    "mutation", "mutated", "extra limb", "ugly", "poorly drawn hands",
    "missing limb", "floating limbs", "disconnected limbs", "malformed hands",
    "out of focus", "long neck", "long body", "distorted", "bad proportions",
    "bad shadows", "grainy", "low quality", "duplicate", "morbid",
    "extra fingers", "mutated hands", "poorly drawn", "out of frame"
];

function removeDuplicateWords(str) {
    const words = str.toLowerCase().split(' ');
    const uniqueWords = new Set();
    return str.split(' ').filter(word => {
        const lowerWord = word.toLowerCase();
        if (uniqueWords.has(lowerWord)) {
            return false;
        }
        uniqueWords.add(lowerWord);
        return true;
    }).join(' ');
}

function cleanupPrompt(prompt) {
    // Remove duplicate words
    prompt = removeDuplicateWords(prompt);
    
    // Remove duplicate commas and clean up spaces
    prompt = prompt.replace(/,\s*,/g, ',')
                  .replace(/\s+/g, ' ')
                  .replace(/\s*,\s*/g, ', ')
                  .trim();
    
    return prompt;
}

function getRandomElements(array, count = 1) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return count === 1 ? shuffled[0] : shuffled.slice(0, count);
}

function generatePrompts() {
    // Generate positive prompt
    const positive = [
        getRandomElements(positiveAttributes.subject),
        getRandomElements(positiveAttributes.bodyType),
        getRandomElements(positiveAttributes.style),
        getRandomElements(positiveAttributes.poses),
        ...getRandomElements(positiveAttributes.quality, 3)
    ].join(", ");

    // Generate negative prompt
    const negative = getRandomElements(negativePrompts, 8).join(", ");

    // Clean up prompts
    const cleanPositive = cleanupPrompt(positive);
    const cleanNegative = cleanupPrompt(negative);

    // Update textareas
    document.getElementById("positivePrompt").value = cleanPositive;
    document.getElementById("negativePrompt").value = cleanNegative;
}

function copyToClipboard(elementId) {
    const textarea = document.getElementById(elementId);
    textarea.select();
    document.execCommand("copy");
    
    // Visual feedback
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = "Copied!";
    setTimeout(() => {
        button.textContent = originalText;
    }, 1000);
}

// Generate prompts when page loads
window.onload = generatePrompts;
 