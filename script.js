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
        views: 1243,
        likes: 89,
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
        views: 2156,
        likes: 142,
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
        views: 1892,
        likes: 126,
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
        views: 3421,
        likes: 278,
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
        views: 987,
        likes: 64,
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
        views: 2643,
        likes: 198,
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
    // Select all elements with data-section attribute
    const navButtons = document.querySelectorAll('[data-section]');
    
    // Height of your fixed navigation bar (in pixels)
    const NAV_HEIGHT = 80; // Adjust this if needed
    
    navButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const section = button.getAttribute('data-section');
            const element = document.getElementById(section);
            
            if (element) {
                // Get the element's position relative to the viewport
                const elementPosition = element.getBoundingClientRect().top;
                // Get the current scroll position
                const offsetPosition = elementPosition + window.pageYOffset - NAV_HEIGHT;
                
                // Scroll to the adjusted position
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
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
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update selected category
            selectedCategory = button.getAttribute('data-category');
            
            // Render projects
            renderProjects();
        });
    });

    // Empty state button
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
    
    // Filter projects
    const filteredProjects = selectedCategory === 'All' 
        ? projectsData 
        : projectsData.filter(project => project.category === selectedCategory);
    
    // Update counter
    const count = filteredProjects.length;
    projectsCount.textContent = `Showing ${count} ${count === 1 ? 'project' : 'projects'}`;
    
    // Show/hide empty state
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
    
    // Clear grid
    projectsGrid.innerHTML = '';
    
    // Render each project
    filteredProjects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
    });
    
    // Reinitialize icons
    initIcons();
}

// Create Project Card
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-project-id', project.id);
    
    const isLiked = likedProjects.includes(project.id);
    const isExpanded = selectedProject === project.id;
    const currentLikes = project.likes + (isLiked ? 1 : 0);
    
    card.innerHTML = `
        <div class="project-image-container">
            <img alt="${project.title}" class="project-image" src="${project.image}" />
            
            <div class="project-overlay">
                <div class="project-overlay-content">
                    <div class="project-meta">
                        <span class="project-category">${project.category}</span>
                        <div class="project-stats">
                            <div class="project-stat">
                                <i data-lucide="eye"></i>
                                <span>${project.views}</span>
                            </div>
                            <div class="project-stat">
                                <i data-lucide="heart" ${isLiked ? 'fill="currentColor"' : ''}></i>
                                <span>${currentLikes}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <button class="like-btn ${isLiked ? 'liked' : ''}" data-project-id="${project.id}">
                <i data-lucide="heart" ${isLiked ? 'fill="currentColor"' : ''}></i>
            </button>
        </div>

        <div class="project-info">
            <div class="project-header">
                <h3 class="project-title">${project.title}</h3>
                <i data-lucide="external-link" class="project-link-icon"></i>
            </div>
            
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

        <div class="project-corner-decoration"></div>
    `;
    
    // Add event listeners
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

// Toggle Like
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

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initIcons();
    initMobileMenu();
    initNavigation();
    initCategoryFilters();
    renderProjects();
});