document.addEventListener('DOMContentLoaded', () => {

    // --- Dynamic Current Year for Footer ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Glassmorphism Header on Scroll ---
    const header = document.querySelector('.main-header');
    const scrollThreshold = 50; // Pixels to scroll before effect activates

    function handleHeaderScroll() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll(); // Initial check in case page is already scrolled

    // --- Dark Mode Toggle ---
    const themeToggleButton = document.getElementById('theme-toggle');
    const themeAnnouncer = document.getElementById('theme-announcer');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    function setTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (themeAnnouncer) {
             themeAnnouncer.textContent = `Theme changed to ${theme} mode.`;
        }
        // Update icon visibility (handled by CSS but can be forced if needed)
    }

    // Load saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else if (prefersDarkScheme.matches) {
        setTheme('dark');
    } else {
        setTheme('light'); // Default
    }

    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            const currentTheme = document.body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }
    
    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', (e) => {
        // Only change if no theme is explicitly saved by user
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });


    // --- Intersection Observer for Animations ---
    const animatedElements = document.querySelectorAll('.animate-in');
    const observerOptions = {
        root: null, // relative to document viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of element is visible
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Unobserve after animation to save resources
                // obs.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // --- Newsletter Form Mockup ---
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterFeedback = document.getElementById('newsletter-feedback');

    if (newsletterForm && newsletterFeedback) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent actual form submission
            const emailInput = document.getElementById('email-input');
            
            // Basic validation
            if (emailInput && emailInput.value && emailInput.checkValidity()) {
                newsletterFeedback.textContent = `Thank you! ${emailInput.value} has been added to our list.`;
                newsletterFeedback.style.color = 'var(--secondary-color)'; // Or a success color
                emailInput.value = ''; // Clear input
            } else {
                newsletterFeedback.textContent = 'Please enter a valid email address.';
                newsletterFeedback.style.color = 'var(--accent-color)'; // Or an error color
            }

            // Clear feedback message after a few seconds
            setTimeout(() => {
                newsletterFeedback.textContent = '';
            }, 5000);
        });
    }
});
