const divisions = document.querySelectorAll('.division');
const nextBtn = document.getElementById('next');
const cakeContainer = document.getElementById('cake-container');
const cardStack = document.querySelector('.card-stack');
const cutCakeBtn = document.getElementById('cut-cake');
const envelopeContainer = document.getElementById('envelope-container');
const envelopeLetter = document.querySelector('.envelope-letter');
const loveLetter = document.getElementById('love-letter');
const heart = envelopeLetter.querySelector('.heart');
let current = 0;

function showDivision(index) {
    divisions.forEach((div, i) => {
        div.classList.toggle('active', i === index);
    });
}

showDivision(current);

nextBtn.addEventListener('click', () => {
    if (current < divisions.length - 1) {
        current++;
        showDivision(current);
        if (current === divisions.length - 1) {
            nextBtn.style.display = 'none';
            setTimeout(() => {
                cakeContainer.style.display = 'flex';
            }, 700); // Wait for card animation
        }
    }
});

// Animate cake cutting and center cake
cutCakeBtn.addEventListener('click', () => {
    // Hide card stack
    if (cardStack) cardStack.style.display = 'none';
    // Center cake container
    cakeContainer.style.position = 'absolute';
    cakeContainer.style.top = '50%';
    cakeContainer.style.left = '50%';
    cakeContainer.style.transform = 'translate(-50%, -50%)';
    cakeContainer.style.marginTop = '0';

    // Animate cake cut
    const cakeBody = cakeContainer.querySelector('.cake-body');
    const icing = cakeContainer.querySelector('.icing');
    const cakeSlices = cakeContainer.querySelector('.cake-slices');
    const cake = cakeContainer.querySelector('.cake');

    if (cakeBody) {
        cakeBody.style.transition = 'clip-path 1s cubic-bezier(.68,-0.55,.27,1.55)';
        cakeBody.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 60% 100%, 50% 80%, 40% 100%, 0 100%)';
    }
    if (icing) {
        icing.style.transition = 'clip-path 1s cubic-bezier(.68,-0.55,.27,1.55)';
        icing.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 60% 100%, 50% 80%, 40% 100%, 0 100%)';
    }

    // After cut animation, hide cake and show slices
    setTimeout(() => {
        if (cake) cake.style.display = 'none';
        if (cakeSlices) {
            cakeSlices.style.display = 'flex';
            // Animate slices in
            setTimeout(() => {
                cakeSlices.querySelectorAll('.slice').forEach(slice => {
                    slice.style.opacity = '1';
                    slice.style.transform = 'translateY(0) scale(1)';
                });
            }, 100);
        }
    }, 1100);

    // Change button to "Yay! Cake is cut 🎉"
    cutCakeBtn.disabled = false;
    cutCakeBtn.textContent = "Yay! Cake is cut 🎉";

    // Next step: on click, show gift
    cutCakeBtn.onclick = () => {
        // Hide everything
        cakeContainer.style.display = 'none';
        if (cardStack) cardStack.style.display = 'none';
        nextBtn.style.display = 'none';
        // Show gift
        document.getElementById('gift-container').style.display = 'flex';
    };
});

// Gift box click: show envelope
document.getElementById('gift-box').onclick = function() {
    document.getElementById('gift-container').style.display = 'none';
    document.getElementById('envelope-container').style.display = 'flex';
};
// Also allow clicking the pill to open the gift
document.getElementById('gift-pill').onclick = function() {
    document.getElementById('gift-container').style.display = 'none';
    document.getElementById('envelope-container').style.display = 'flex';
};

envelopeContainer.addEventListener('click', () => {
    // Animate the letter unfolding and coming forward
    loveLetter.classList.add('open');
    // Fade out the heart
    if (heart) heart.style.opacity = '0';
    // Hide the envelope background and flap after animation starts
    setTimeout(() => {
        envelopeLetter.style.background = 'none';
        const flap = envelopeLetter.parentElement.querySelector('.envelope-flap');
        if (flap) flap.style.display = 'none';
        // Center the letter absolutely in the viewport
        loveLetter.style.position = 'fixed';
        loveLetter.style.top = '50%';
        loveLetter.style.left = '50%';
        loveLetter.style.transform = 'translate(-50%, -50%)';
        loveLetter.style.margin = '4vh auto';
        loveLetter.style.zIndex = '999';
    }, 400); // Wait for the letter to start opening
});