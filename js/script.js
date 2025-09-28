// Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({ 
            duration: 1200, 
            once: true, 
            mirror: true, 
            easing: 'ease-in-out',
            offset: 100
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add scroll effect to navbar
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Add typing effect to the main heading
    const glowName = document.querySelector('.glow-name');
    if (glowName) {
        const originalText = glowName.textContent;
        glowName.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                glowName.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after a delay
        setTimeout(typeWriter, 1000);
    }

    // Add parallax effect to sections
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const sections = document.querySelectorAll('.section');
        
        sections.forEach((section, index) => {
            const rate = scrolled * -0.5;
            section.style.transform = `translateY(${rate * 0.1}px)`;
        });
    });

    // Add hover effect to skill boxes
    const skillBoxes = document.querySelectorAll('.skill-box');
    skillBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.05) rotateY(5deg)';
        });
        
        box.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotateY(0deg)';
        });
    });

    // Add tilt effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.03)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
        });
    });

    // Add floating animation to profile image
    const profileImg = document.querySelector('.profile-img');
    if (profileImg) {
        let floatDirection = 1;
        setInterval(() => {
            const currentTransform = profileImg.style.transform || '';
            const newY = Math.sin(Date.now() * 0.001) * 10;
            profileImg.style.transform = currentTransform.replace(/translateY\([^)]*\)/, '') + ` translateY(${newY}px)`;
        }, 50);
    }

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Animate elements in sequence
        const animateElements = document.querySelectorAll('.skill-box, .project-card');
        animateElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('animate-in');
            }, index * 100);
        });
    });

    // Add intersection observer for better performance
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimized scroll handler
const handleScroll = debounce(() => {
    const scrolled = window.pageYOffset;
    
    // Update navbar
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.backgroundColor = scrolled > 50 ? 'rgba(3, 10, 28, 0.95)' : 'rgba(3, 10, 28, 0.8)';
    }
    
    // Parallax effect for background elements
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    parallaxElements.forEach(element => {
        const speed = element.dataset.parallax || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
}, 10);

window.addEventListener('scroll', handleScroll);

// Terminal Functionality
class HackerTerminal {
    constructor() {
        this.isOpen = false;
        this.commandHistory = [];
        this.historyIndex = -1;
        this.currentLine = '';
        this.isTyping = false;
        this.activeTimeouts = [];
        this.currentTypingProcess = null;
        
        // Sound effects using Web Audio API
        this.audioContext = null;
        this.initAudio();
        
        // Terminal commands
        this.commands = {
            help: 'Available commands: about, skills, experience, projects, contact, hack, matrix, clear, cls, exit',
            about: 'Libin K K - Full Stack Laravel Developer with 2+ years experience.\nSpecializing in PHP, Laravel, Vue.js, MySQL, and modern web technologies.\nPassionate about creating scalable, secure applications.',
            skills: 'Technical Skills:\n• Frontend: HTML, CSS, JavaScript, jQuery, Bootstrap, Tailwind CSS, Vue.js\n• Backend: PHP, Laravel, MySQL\n• Tools: Git, GitHub, Figma, REST API, Web Hosting\n• Specialization: Full-stack web development',
            experience: 'Professional Experience:\n• PowerSoft Techno Solutions (July 2025 - Present) - Software Engineer\n• Lilac Infotech (Jan 2025 - July 2025) - Associate Software Engineer\n• Niveosys Technologies (Aug 2024 - Jan 2025) - PHP Laravel Developer\n• Savior Soft Solutions (Jan 2023 - May 2024) - Laravel Developer',
            projects: 'Featured Projects:\n• Food Delivery App - Subscription-based platform\n• Cab Booking App - Real-time booking system\n• Trading Platform - Financial instruments trading\n• Hospital Management System - Healthcare operations\n• Insurance Investigation System - Claims processing',
            contact: 'Contact Information:\n• Email: libinkk1999@gmail.com\n• Phone: +91 7708782197\n• Location: Kanyakumari, Tamil Nadu, India\n• Portfolio: https://libin-k-k.github.io/portfolio',
            hack: 'Initiating hack sequence...\n[████████████████████████████████] 100%\nAccess granted to portfolio database.\nWelcome to the matrix, Neo.',
            matrix: 'Wake up, Neo...\nThe Matrix has you...\nFollow the white rabbit.\n\nKnock, knock, Neo.',
            clear: 'CLEAR_TERMINAL',
            cls: 'CLEAR_TERMINAL',
            exit: 'EXIT_TERMINAL',
            whoami: 'root@libin-portfolio',
            pwd: '/home/libin/portfolio',
            ls: 'about.txt  skills.txt  experience.txt  projects.txt  contact.txt',
            date: new Date().toString(),
            uname: 'Linux libin-portfolio 5.15.0-hacker #1 SMP Ubuntu',
            ps: 'PID TTY          TIME CMD\n1337 pts/0    00:00:01 portfolio\n1338 pts/0    00:00:00 hacker_mode'
        };
        
        this.initTerminal();
    }
    
    initAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Web Audio API not supported');
        }
    }
    
    playKeySound() {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800 + Math.random() * 200, this.audioContext.currentTime);
        oscillator.type = 'square';
        
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.1);
    }
    
    playBootSound() {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(800, this.audioContext.currentTime + 0.5);
        oscillator.type = 'sawtooth';
        
        gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.5);
    }
    
    playPrintSound() {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(1200 + Math.random() * 300, this.audioContext.currentTime);
        oscillator.type = 'square';
        
        gainNode.gain.setValueAtTime(0.05, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.05);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.05);
    }
    
    playSuccessSound() {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(400, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(600, this.audioContext.currentTime + 0.2);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.2);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.2);
    }
    
    playErrorSound() {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(100, this.audioContext.currentTime + 0.3);
        oscillator.type = 'sawtooth';
        
        gainNode.gain.setValueAtTime(0.15, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.3);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.3);
    }
    
    initTerminal() {
        const fab = document.getElementById('terminalFab');
        const modal = document.getElementById('terminalModal');
        const closeBtn = document.getElementById('terminalClose');
        const input = document.getElementById('terminalInput');
        
        fab.addEventListener('click', () => this.openTerminal());
        closeBtn.addEventListener('click', () => this.closeTerminal());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.closeTerminal();
        });
        
        input.addEventListener('keydown', (e) => this.handleKeydown(e));
        input.addEventListener('input', () => this.playKeySound());
        
        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeTerminal();
            }
        });
        
        // Initialize mobile controls
        this.initMobileControls();
        
        // Initialize touch gestures
        this.initTouchGestures();
        
        // Initialize virtual keyboard support
        this.initVirtualKeyboard();
        
        // Initialize mobile properties
        this.isMobile = window.innerWidth <= 768;
        this.touchStartY = 0;
        this.touchEndY = 0;
        
        // Listen for orientation changes
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.handleOrientationChange();
            }, 100);
        });
        
        // Listen for resize events
        window.addEventListener('resize', () => {
            this.isMobile = window.innerWidth <= 768;
            this.adjustForMobile();
        });
    }
    
    openTerminal() {
        const modal = document.getElementById('terminalModal');
        const input = document.getElementById('terminalInput');
        
        this.isOpen = true;
        modal.classList.remove('hidden');
        modal.classList.add('show');
        
        this.playBootSound();
        
        setTimeout(() => {
            input.focus();
            this.showWelcomeMessage();
        }, 500);
    }
    
    closeTerminal() {
        const modal = document.getElementById('terminalModal');
        
        // Stop all active sounds and processes
        this.stopAllSounds();
        this.clearAllTimeouts();
        this.isTyping = false;
        this.currentTypingProcess = null;
        
        this.isOpen = false;
        modal.classList.remove('show');
        
        setTimeout(() => {
            modal.classList.add('hidden');
            this.clearTerminal();
        }, 500);
    }
    
    stopAllSounds() {
        if (this.audioContext && this.audioContext.state !== 'closed') {
            // Stop all oscillators by suspending the audio context briefly
            this.audioContext.suspend().then(() => {
                this.audioContext.resume();
            });
        }
    }
    
    clearAllTimeouts() {
        this.activeTimeouts.forEach(timeout => clearTimeout(timeout));
        this.activeTimeouts = [];
    }
    
    showWelcomeMessage() {
        const welcomeMessages = [
            'Initializing secure connection...',
            'Loading hacker protocols...',
            'Access granted to Libin K K Portfolio System',
            'Type "help" for available commands',
            'Welcome to the matrix, hacker!'
        ];
        
        welcomeMessages.forEach((msg, index) => {
            setTimeout(() => {
                this.addOutputWithTypewriter(msg, 'terminal-success');
            }, index * 1500);
        });
    }
    
    handleKeydown(e) {
        const input = document.getElementById('terminalInput');
        
        if (e.key === 'Enter') {
            e.preventDefault();
            const command = input.value.trim();
            if (command) {
                this.executeCommand(command);
                this.commandHistory.push(command);
                this.historyIndex = this.commandHistory.length;
            }
            input.value = '';
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (this.historyIndex > 0) {
                this.historyIndex--;
                input.value = this.commandHistory[this.historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (this.historyIndex < this.commandHistory.length - 1) {
                this.historyIndex++;
                input.value = this.commandHistory[this.historyIndex];
            } else {
                this.historyIndex = this.commandHistory.length;
                input.value = '';
            }
        }
    }
    
    executeCommand(command) {
        this.addOutput(`root@libin-portfolio:~$ ${command}`, 'terminal-prompt');
        
        const cmd = command.toLowerCase().split(' ')[0];
        
        if (this.commands[cmd]) {
            if (cmd === 'clear' || cmd === 'cls') {
                this.clearTerminal();
                return;
            } else if (cmd === 'exit') {
                this.closeTerminal();
                return;
            } else if (cmd === 'hack' || cmd === 'matrix') {
                this.playHackSequence(this.commands[cmd]);
                return;
            }
            
            // Play success sound and add response with typewriter effect
            this.playSuccessSound();
            setTimeout(() => {
                this.addOutputWithTypewriter(this.commands[cmd], 'terminal-output');
            }, 300);
        } else {
            // Play error sound for unknown commands
            this.playErrorSound();
            setTimeout(() => {
                this.addOutput(`Command not found: ${command}. Type "help" for available commands.`, 'terminal-error');
            }, 300);
        }
    }
    
    playHackSequence(message) {
        const lines = message.split('\n');
        lines.forEach((line, index) => {
            setTimeout(() => {
                this.addOutput(line, index === 0 ? 'terminal-success' : 'terminal-output');
                if (line.includes('████')) {
                    this.playBootSound();
                }
            }, index * 1000);
        });
    }
    
    addOutput(text, className = 'terminal-output') {
        const content = document.getElementById('terminalContent');
        const line = document.createElement('div');
        line.className = `terminal-line ${className}`;
        line.textContent = text;
        
        content.appendChild(line);
        this.scrollToBottom();
        
        // Add typing animation for longer texts
        if (text.length > 50) {
            line.classList.add('typing');
        }
    }
    
    addOutputWithTypewriter(text, className = 'terminal-output') {
        const content = document.getElementById('terminalContent');
        
        // Split text into lines for multi-line responses
        const lines = text.split('\n');
        let currentLineIndex = 0;
        let currentLine = null;
        
        const typeNextLine = () => {
            if (currentLineIndex >= lines.length) return;
            
            // Create a new line element for each line
            currentLine = document.createElement('div');
            currentLine.className = `terminal-line ${className}`;
            content.appendChild(currentLine);
            
            const currentText = lines[currentLineIndex];
            let charIndex = 0;
            
            const typeLine = () => {
                if (!this.isOpen) return; // Stop if terminal is closed
                
                if (charIndex < currentText.length) {
                    currentLine.textContent += currentText[charIndex];
                    this.playPrintSound();
                    charIndex++;
                    const timeout = setTimeout(typeLine, 25 + Math.random() * 15);
                    this.activeTimeouts.push(timeout);
                    this.scrollToBottom();
                } else {
                    // Move to next line
                    currentLineIndex++;
                    if (currentLineIndex < lines.length) {
                        const timeout = setTimeout(typeNextLine, 300);
                        this.activeTimeouts.push(timeout);
                    }
                }
            };
            
            // Start typing if there's text, otherwise move to next line immediately
            if (currentText.trim().length > 0) {
                typeLine();
            } else {
                currentLineIndex++;
                setTimeout(typeNextLine, 100);
            }
        };
        
        typeNextLine();
    }
    
    clearTerminal() {
        const content = document.getElementById('terminalContent');
        content.innerHTML = '';
    }
    
    // Mobile Controls
    initMobileControls() {
        const mobileButtons = document.querySelectorAll('.terminal-mobile-btn');
        
        mobileButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const command = e.target.getAttribute('data-command');
                if (command) {
                    this.executeMobileCommand(command);
                    this.addHapticFeedback(e.target);
                }
            });
            
            // Touch feedback
            button.addEventListener('touchstart', (e) => {
                e.target.classList.add('pressed');
            });
            
            button.addEventListener('touchend', (e) => {
                setTimeout(() => {
                    e.target.classList.remove('pressed');
                }, 100);
            });
        });
    }
    
    executeMobileCommand(command) {
        const input = document.getElementById('terminalInput');
        input.value = command;
        this.executeCommand(command);
        input.value = '';
        
        // Focus input after command execution on mobile
        if (this.isMobile && command !== 'exit') {
            setTimeout(() => {
                input.focus();
            }, 100);
        }
    }
    
    addHapticFeedback(element) {
        element.classList.add('pressed');
        setTimeout(() => {
            element.classList.remove('pressed');
        }, 100);
        
        // Vibrate if supported
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    }
    
    // Touch Gestures
    initTouchGestures() {
        const modal = document.getElementById('terminalModal');
        const terminalWindow = modal.querySelector('.terminal-window');
        
        let startY = 0;
        let currentY = 0;
        let isDragging = false;
        
        terminalWindow.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
            isDragging = true;
        }, { passive: true });
        
        terminalWindow.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            
            currentY = e.touches[0].clientY;
            const deltaY = currentY - startY;
            
            // Only allow downward swipe to close
            if (deltaY > 0 && deltaY < 200) {
                terminalWindow.style.transform = `translateY(${deltaY}px)`;
                terminalWindow.style.opacity = 1 - (deltaY / 200);
            }
        }, { passive: true });
        
        terminalWindow.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            
            const deltaY = currentY - startY;
            
            // Close if swiped down more than 100px
            if (deltaY > 100) {
                this.closeTerminal();
            } else {
                // Snap back to original position
                terminalWindow.style.transform = '';
                terminalWindow.style.opacity = '';
            }
            
            isDragging = false;
        }, { passive: true });
    }
    
    // Virtual Keyboard Support
    initVirtualKeyboard() {
        const input = document.getElementById('terminalInput');
        const terminalBody = document.getElementById('terminalBody');
        
        // Handle virtual keyboard appearance
        input.addEventListener('focus', () => {
            if (this.isMobile) {
                // Scroll to input when keyboard appears
                setTimeout(() => {
                    input.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
                
                // Add class for keyboard open state
                document.body.classList.add('keyboard-open');
            }
        });
        
        input.addEventListener('blur', () => {
            if (this.isMobile) {
                document.body.classList.remove('keyboard-open');
            }
        });
        
        // Prevent zoom on input focus (iOS)
        input.addEventListener('touchstart', (e) => {
            if (this.isMobile) {
                input.style.fontSize = '16px';
            }
        });
        
        // Auto-capitalize off for terminal
        input.setAttribute('autocapitalize', 'off');
        input.setAttribute('autocorrect', 'off');
    }
    
    // Orientation Change Handler
    handleOrientationChange() {
        if (this.isOpen && this.isMobile) {
            const input = document.getElementById('terminalInput');
            
            // Refocus input after orientation change
            setTimeout(() => {
                input.focus();
                this.scrollToBottom();
            }, 500);
        }
    }
    
    // Mobile Adjustments
    adjustForMobile() {
        const terminalBody = document.getElementById('terminalBody');
        const input = document.getElementById('terminalInput');
        
        if (this.isMobile) {
            // Ensure proper mobile styling
            terminalBody.style.webkitOverflowScrolling = 'touch';
            
            // Adjust input for mobile
            if (input) {
                input.style.fontSize = '16px'; // Prevent zoom on iOS
            }
        }
    }
    
    // Enhanced scroll to bottom for mobile
    scrollToBottom() {
        const content = document.getElementById('terminalContent');
        const terminalBody = document.getElementById('terminalBody');
        
        if (content && terminalBody) {
            terminalBody.scrollTop = terminalBody.scrollHeight;
            
            // Additional scroll for mobile
            if (this.isMobile) {
                setTimeout(() => {
                    terminalBody.scrollTop = terminalBody.scrollHeight;
                }, 100);
            }
        }
    }
}

// Initialize terminal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HackerTerminal();
});
