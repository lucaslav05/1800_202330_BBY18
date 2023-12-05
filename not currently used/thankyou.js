const confettiContainer = document.body;

    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.setProperty('--x', Math.random());
      confetti.style.setProperty('--y', Math.random());
      confetti.style.left = (Math.random() * 100) + 'vw';
      confetti.style.animationDuration = (Math.random() * 2 + 1) + 's';
      confettiContainer.appendChild(confetti);
    }



