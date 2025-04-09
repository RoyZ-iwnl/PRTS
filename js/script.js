document.addEventListener('DOMContentLoaded', () => {
    // Set random background
    const backgrounds = ['./img/bg1.png', './img/bg2.png', './img/bg3.png'];
    const randomBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    document.body.style.backgroundImage = `url(${randomBg})`;

    // Track clicks for each letter
    const letters = document.querySelectorAll('.letter');
    let totalClicks = 0;

    letters.forEach(letter => {
        letter.addEventListener('click', () => {
            totalClicks++;
            
            if (totalClicks === 10) {
                letters.forEach(l => {
                    l.style.transition = 'opacity 0.5s';
                    l.style.opacity = '0';
                });
                
                setTimeout(() => {
                    document.querySelector('.text-container').innerHTML = 
                        '<div class="text-row"><span class="letter">YOU FOUND ME.</span></div>';
                }, 500);
            }
        });
    });
});