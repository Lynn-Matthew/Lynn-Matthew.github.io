// Project Data
const projectsData = [
    { 
        id: 1, 
        title: 'Modern E-Commerce App', 
        description: 'Complete UI/UX redesign for a fashion marketplace with focus on user experience and conversion optimization.',
        category: 'UI/UX',
        client: 'Fashion Boutique',
        year: '2026',
        tags: ['Mobile Design', 'E-Commerce', 'User Research'],
        image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80'
    },
    { 
        id: 2, 
        title: 'Artisan Coffee Branding', 
        description: 'Full brand identity including logo, color palette, typography, and packaging design for a sustainable coffee roaster.',
        category: 'Branding',
        client: 'Urban Roast Co.',
        year: '2025',
        tags: ['Logo Design', 'Packaging', 'Brand Guide'],
        image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80'
    },
    { 
        id: 3, 
        title: 'Tech Startup Website', 
        description: 'Responsive web design and development for an AI-powered productivity platform with dynamic interactions.',
        category: 'Web Design',
        client: 'FlowAI',
        year: '2026',
        tags: ['Web Development', 'Responsive', 'Animation'],
        image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80'
    },
    { 
        id: 4, 
        title: 'Social Media Campaign', 
        description: 'Instagram and TikTok content series for summer collection launch with cohesive visual storytelling.',
        category: 'Social Media',
        client: 'Coastal Apparel',
        year: '2026',
        tags: ['Instagram', 'Content Creation', 'Photography'],
        image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80'
    },
    { 
        id: 5, 
        title: 'Restaurant Menu Design', 
        description: 'Elegant print menu and signage design for a Michelin-starred restaurant featuring custom illustrations.',
        category: 'Print Design',
        client: 'La Petite Maison',
        year: '2025',
        tags: ['Print', 'Illustration', 'Typography'],
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80'
    },
    { 
        id: 6, 
        title: 'Fitness App Icons', 
        description: 'Custom icon set of 100+ workout and nutrition icons with consistent style and pixel-perfect execution.',
        category: 'Illustration',
        client: 'FitTrack Pro',
        year: '2026',
        tags: ['Icons', 'Vector Graphics', 'UI Elements'],
        image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80'
    }
];

// State
let selectedCategory = 'All';
let selectedProject = null;
let likedProjects = [];

// Initialize Lucide icons
function initIcons() {
    lucide.createIcons();
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
    const closeIcon = mobileMenuBtn.querySelector('.close-icon');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        menuIcon.classList.toggle('hidden');
        closeIcon.classList.toggle('hidden');
    });
}

// Smooth Scroll Navigation
function initNavigation() {
    const navButtons = document.querySelectorAll('[data-section]');
    const NAV_HEIGHT = 80;

    navButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const section = button.getAttribute('data-section');
            const element = document.getElementById(section);

            if (element) {
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - NAV_HEIGHT;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                const mobileMenu = document.getElementById('mobileMenu');
                const mobileMenuBtn = document.getElementById('mobileMenuBtn');

                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
                    const closeIcon = mobileMenuBtn.querySelector('.close-icon');
                    if (menuIcon) menuIcon.classList.remove('hidden');
                    if (closeIcon) closeIcon.classList.add('hidden');
                }
            }
        });
    });
}

// Category Filters
function initCategoryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            selectedCategory = button.getAttribute('data-category');
            renderProjects();
        });
    });

    const emptyBtn = document.querySelector('.empty-btn');
    if (emptyBtn) {
        emptyBtn.addEventListener('click', () => {
            selectedCategory = 'All';
            filterButtons.forEach(btn => {
                if (btn.getAttribute('data-category') === 'All') {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
            renderProjects();
        });
    }
}

// Render Projects
function renderProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    const projectsCount = document.getElementById('projectsCount');
    const ctaContainer = document.getElementById('ctaContainer');
    const emptyState = document.getElementById('emptyState');

    const filteredProjects = selectedCategory === 'All'
        ? projectsData
        : projectsData.filter(project => project.category === selectedCategory);

    const count = filteredProjects.length;
    projectsCount.textContent = `Showing ${count} ${count === 1 ? 'project' : 'projects'}`;

    if (filteredProjects.length === 0) {
        projectsGrid.classList.add('hidden');
        ctaContainer.classList.add('hidden');
        emptyState.classList.remove('hidden');
        initIcons();
        return;
    } else {
        projectsGrid.classList.remove('hidden');
        ctaContainer.classList.remove('hidden');
        emptyState.classList.add('hidden');
    }

    projectsGrid.innerHTML = '';
    filteredProjects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
    });

    initIcons();
}

// Create Project Card (single heart – the like button)
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-project-id', project.id);

    const isLiked = likedProjects.includes(project.id);
    const isExpanded = selectedProject === project.id;

    card.innerHTML = `
        <div class="project-image-container">
            <img alt="${project.title}" class="project-image" src="${project.image}" />
            
            <div class="project-overlay">
                <div class="project-overlay-content">
                    <span class="project-category">${project.category}</span>
                </div>
            </div>

            <button class="like-btn ${isLiked ? 'liked' : ''}" data-project-id="${project.id}">
                <i data-lucide="heart" ${isLiked ? 'fill="currentColor"' : ''}></i>
            </button>
        </div>

        <div class="project-info">
            <h3 class="project-title">${project.title}</h3>
            
            <p class="project-client">${project.client} • ${project.year}</p>

            <div class="project-description ${isExpanded ? 'expanded' : ''}">
                <p>${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
            </div>

            <button class="project-details-btn" data-project-id="${project.id}">
                ${isExpanded ? 'Hide Details' : 'View Details'}
            </button>
        </div>
    `;

    const likeBtn = card.querySelector('.like-btn');
    likeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleLike(project.id);
    });

    const detailsBtn = card.querySelector('.project-details-btn');
    detailsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleProjectDetails(project.id);
    });

    card.addEventListener('click', () => {
        toggleProjectDetails(project.id);
    });

    return card;
}

// Toggle Like (affects the single heart)
function toggleLike(projectId) {
    if (likedProjects.includes(projectId)) {
        likedProjects = likedProjects.filter(id => id !== projectId);
    } else {
        likedProjects.push(projectId);
    }
    renderProjects();
}

// Toggle Project Details
function toggleProjectDetails(projectId) {
    if (selectedProject === projectId) {
        selectedProject = null;
    } else {
        selectedProject = projectId;
    }
    renderProjects();
}

// ===== THEME MANAGEMENT =====

function setThemeByTime() {
    const hour = new Date().getHours();
    const isNight = hour >= 19 || hour < 7;
    if (isNight) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
    updateThemeIcons();
}

function updateThemeIcons() {
    const toggleBtn = document.getElementById('themeToggle');
    if (!toggleBtn) return;
    const sunIcon = toggleBtn.querySelector('.sun-icon');
    const moonIcon = toggleBtn.querySelector('.moon-icon');
    const isDark = document.body.classList.contains('dark-mode');
    if (isDark) {
        sunIcon?.classList.add('hidden');
        moonIcon?.classList.remove('hidden');
    } else {
        sunIcon?.classList.remove('hidden');
        moonIcon?.classList.add('hidden');
    }
}

function initThemeToggle() {
    const toggleBtn = document.getElementById('themeToggle');
    if (!toggleBtn) {
        console.warn('Theme toggle button not found');
        return;
    }
    const sunIcon = toggleBtn.querySelector('.sun-icon');
    const moonIcon = toggleBtn.querySelector('.moon-icon');
    if (!sunIcon || !moonIcon) {
        console.warn('Sun or moon icon missing');
        return;
    }

    const savedTheme = localStorage.getItem('theme');
    const lastSet = localStorage.getItem('themeLastSet');
    const today = new Date().toDateString();

    if (savedTheme && lastSet === today) {
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    } else {
        setThemeByTime();
        localStorage.removeItem('theme');
        localStorage.removeItem('themeLastSet');
    }
    updateThemeIcons();

    function createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple-animation 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        button.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    }

    toggleBtn.addEventListener('click', (e) => {
        document.body.classList.toggle('dark-mode');
        const isDarkNow = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDarkNow ? 'dark' : 'light');
        localStorage.setItem('themeLastSet', new Date().toDateString());
        updateThemeIcons();
        createRipple(e);
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initIcons();
    initMobileMenu();
    initNavigation();
    initCategoryFilters();
    renderProjects();
    initThemeToggle();
});