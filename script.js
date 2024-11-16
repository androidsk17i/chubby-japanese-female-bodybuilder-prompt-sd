const positiveAttributes = {
    subject: [
        "beautiful mature Japanese female bodybuilder",
    ],
    bodyType: [
        "chubby muscular",
    ],
    muscles: [
        "well-defined muscles",
        "toned physique",
        "muscular build",
        "athletic body",
        "strong arms and legs",
        "defined abs",
        "broad shoulders"
    ],
    style: [
        "wearing casual jeans and t-shirt",
        "in elegant evening dress",
        "in business suit",
        "in traditional kimono",
        "in summer dress",
        "in cozy sweater and leggings",
        "in pajamas",
        "in winter coat",
        "in swimsuit",
        "in yoga pants",
        "in office attire",
        "in casual sundress",
        "in denim shorts and tank top",
        "in traditional yukata",
        "in cocktail dress",
        "in running outfit",
        "in beach wear",
        "in shopping outfit",
        "in dinner date dress",
        "in casual weekend outfit"
    ],
    poses: [
        "cooking in kitchen",
        "reading a book on couch",
        "walking in park",
        "shopping at market",
        "working at office desk",
        "drinking coffee at cafe",
        "gardening outdoors",
        "doing yoga",
        "watching TV",
        "using smartphone",
        "eating at restaurant",
        "driving car",
        "cleaning house",
        "writing in journal",
        "painting artwork",
        "playing with pet",
        "taking selfie",
        "waiting for train",
        "having breakfast",
        "relaxing in bath"
    ],
    quality: [
        "8k ultra HD",
        "highly detailed",
        "professional photography",
        "studio lighting",
        "masterpiece",
        "best quality",
        "perfect composition"
    ]
};

const negativePrompts = [
    "deformed", "blurry", "bad anatomy", "disfigured", "poorly drawn face",
    "mutation", "mutated", "extra limb", "ugly", "poorly drawn hands",
    "missing limb", "floating limbs", "disconnected limbs", "malformed hands",
    "out of focus", "long neck", "long body", "distorted", "bad proportions"
];

function getRandomElements(array, count = 1) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return count === 1 ? shuffled[0] : shuffled.slice(0, count);
}

function generatePrompts() {
    // Generate positive prompt
    const positive = [
        getRandomElements(positiveAttributes.subject),
        getRandomElements(positiveAttributes.bodyType),
        getRandomElements(positiveAttributes.muscles),
        getRandomElements(positiveAttributes.style),
        getRandomElements(positiveAttributes.poses),
        ...getRandomElements(positiveAttributes.quality, 3)
    ].join(", ");

    // Generate negative prompt
    const negative = getRandomElements(negativePrompts, 8).join(", ");

    // Update textareas
    document.getElementById("positivePrompt").value = positive;
    document.getElementById("negativePrompt").value = negative;
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
 