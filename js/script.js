document.addEventListener('DOMContentLoaded', () => {
    // Set random background
    const backgrounds = ['./img/bg1.png', './img/bg2.png', './img/bg3.png'];
    const randomBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    document.body.style.backgroundImage = `url(${randomBg})`;

    // Track sequence of clicks
    const correctSequence = ['P', 'R', 'T', 'S'];
    let currentSequence = [];
    const letters = document.querySelectorAll('.letter');
    const centerImage = document.querySelector('.center-image');
    
    // 预加载背景图片
    const bgPRTS = new Image();
    bgPRTS.src = './img/bgPRTS.png';
    
    // 文字信息数组
    const messages = [
        "YOU FOUND ME.",
        "You should have a lot of questions.\nI will wait for you.",
        "By the way, don't worry about PRTS,\nit is just fulfilling the duties we gave it.\nI didn't allow it to hurt you.",
        "/STANDBYHERSIDE"
    ];

    // 显示消息的函数
    function showMessage(message, className = 'hidden-message') {
        const textContainer = document.querySelector('.text-container');
        const newMessage = document.createElement('div');
        newMessage.className = className;
        newMessage.textContent = message;
        
        // 先淡出当前消息
        const currentMessage = textContainer.querySelector('.hidden-message, .final-message');
        if (currentMessage) {
            currentMessage.style.opacity = '0';
            setTimeout(() => {
                textContainer.innerHTML = '';
                textContainer.appendChild(newMessage);
                // 延迟一小段时间后淡入新消息
                setTimeout(() => {
                    newMessage.style.opacity = '1';
                }, 50);
            }, 1000);
        } else {
            textContainer.appendChild(newMessage);
            setTimeout(() => {
                newMessage.style.opacity = '1';
            }, 50);
        }
    }

    letters.forEach(letter => {
        letter.addEventListener('click', () => {
            const letterId = letter.id;
            currentSequence.push(letterId);
            
            // Check if sequence is correct
            if (currentSequence.join('') === correctSequence.join('')) {
                // Fade to black
                document.body.style.backgroundColor = 'black';
                document.body.style.backgroundImage = 'none';
                
                // Hide letters
                letters.forEach(l => {
                    l.style.opacity = '0';
                });
                
                // Hide center image
                centerImage.style.opacity = '0';
                
                // 第一条消息: YOU FOUND ME
                setTimeout(() => {
                    showMessage(messages[0]);
                    
                    // 3秒后更换背景和第二条消息
                    setTimeout(() => {
                        document.body.style.backgroundImage = `url(./img/bgPRTS.png)`;
                        showMessage(messages[1]);
                        
                        // 3秒后显示第三条消息
                        setTimeout(() => {
                            showMessage(messages[2]);
                            
                            // 7秒后显示最后一条消息
                            setTimeout(() => {
                                showMessage(messages[3], 'final-message');
                            }, 7000);
                        }, 5000);
                    }, 5000);
                }, 1000);
            }
            // If wrong sequence, reset
            else if (currentSequence.length === correctSequence.length) {
                currentSequence = [];
            }
        });
    });
});