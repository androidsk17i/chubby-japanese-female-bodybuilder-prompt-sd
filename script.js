const positiveAttributes = {
    subject: [
        "beautiful mature Japanese female bodybuilder",
    ],
    bodyType: [
        "chubby muscular",
    ],
    style: [
        "wearing casual jeans and fitted t-shirt",
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
        "in weekend leisure wear"
    ],
    poses: [
        "preparing healthy meal in modern kitchen",
        "reading book while relaxing on couch",
        "taking morning walk in peaceful park",
        "selecting fresh produce at local market",
        "working focused at office desk",
        "enjoying coffee at outdoor cafe",
        "tending to garden flowers",
        "practicing morning yoga",
        "watching movie on comfortable sofa",
        "checking messages on phone",
        "dining at upscale restaurant",
        "sitting confidently in car",
        "organizing living room",
        "writing thoughtfully in journal",
        "creating artwork at easel",
        "playing gently with cat",
        "capturing mirror selfie",
        "standing on train platform",
        "enjoying healthy breakfast",
        "soaking in luxurious bath"
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
 