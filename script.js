// Split screen interactions
document.addEventListener('DOMContentLoaded', () => {
    const songItems = document.querySelectorAll('.song-item');
    const progressBar = document.querySelector('.progress');
    const playBtn = document.querySelector('.control-btn.play');
    const panels = document.querySelectorAll('.panel');
    let isPlaying = false;
    let progressInterval;

    // Song item interactions
    songItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all items
            songItems.forEach(song => song.classList.remove('active'));
            
            // Add active class to clicked item
            item.classList.add('active');
            
            // Add slide animation
            item.style.animation = 'none';
            item.offsetHeight; // Trigger reflow
            item.style.animation = 'slideIn 0.5s ease-out';
        });
    });

    // Progress bar animation
    function updateProgress() {
        let width = 0;
        clearInterval(progressInterval);
        progressInterval = setInterval(() => {
            width = (width + 1) % 101;
            progressBar.style.width = width + '%';
        }, 100);
    }

    // Play button interaction
    playBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        playBtn.textContent = isPlaying ? 'Pause' : 'Play';
        
        if (isPlaying) {
            updateProgress();
            playBtn.style.backgroundColor = 'var(--secondary-color)';
        } else {
            clearInterval(progressInterval);
            playBtn.style.backgroundColor = 'var(--primary-color)';
        }
    });

    // Panel hover effects
    panels.forEach(panel => {
        panel.addEventListener('mouseenter', () => {
            panel.style.flex = '1.2';
            panel.style.transition = 'flex 0.3s ease';
        });

        panel.addEventListener('mouseleave', () => {
            panel.style.flex = '1';
        });
    });

    // Control button effects
    const controlBtns = document.querySelectorAll('.control-btn');
    controlBtns.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-2px)';
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0)';
        });

        // Add ripple effect
        btn.addEventListener('click', createRipple);
    });

    // Ripple effect function
    function createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('div');
        
        ripple.className = 'ripple';
        button.appendChild(ripple);

        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = event.clientX - rect.left - size/2 + 'px';
        ripple.style.top = event.clientY - rect.top - size/2 + 'px';

        ripple.addEventListener('animationend', () => ripple.remove());
    }

    // Add ripple style
    const style = document.createElement('style');
    style.textContent = `
        .control-btn {
            position: relative;
            overflow: hidden;
        }
        .ripple {
            position: absolute;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.7);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Smooth scroll for panels
    panels.forEach(panel => {
        panel.addEventListener('scroll', () => {
            panel.style.scrollBehavior = 'smooth';
        });
    });

    // Add hover effect to song durations
    const songDurations = document.querySelectorAll('.song-duration');
    songDurations.forEach(duration => {
        duration.addEventListener('mouseenter', () => {
            duration.style.color = 'var(--primary-color)';
            duration.style.transition = 'color 0.3s ease';
        });

        duration.addEventListener('mouseleave', () => {
            duration.style.color = '';
        });
    });
}); 