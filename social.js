// social.js – genre filter + modal details for gaming section

// Game data (extend with detailed info)
const gamesData = [
    {
        id: 0,
        title: 'Grand Theft Auto IV',
        genre: 'Action',
        year: '2008',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
        experience: 'The driving physics are heavy but satisfying. The city feels alive with gritty immigrant stories.',
        review: 'A classic open-world with deep narrative and memorable characters. The physics-based driving takes time to master but rewards skill.',
        recommendation: 'Highly recommended for fans of story-driven action games. Play the expansions too!',
        achievementsUrl: 'https://steamcommunity.com/id/yourprofile/stats/12210?tab=achievements'
    },
    {
        id: 1,
        title: 'Hades',
        genre: 'RPG',
        year: '2020',
        image: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=800&q=80',
        experience: 'Roguelike done right. The story unfolds with every escape attempt, and the combat is fluid.',
        review: 'Supergiant’s masterpiece blends fast-paced combat, rich Greek mythology, and character progression that keeps you coming back.',
        recommendation: 'Essential for roguelike fans and anyone who loves great storytelling. Endless replayability.',
        achievementsUrl: 'https://steamcommunity.com/id/yourprofile/stats/1145360?tab=achievements'
    },
    {
        id: 2,
        title: 'Forza Horizon 5',
        genre: 'Racing',
        year: '2021',
        image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80',
        experience: 'The best arcade racer out there. Mexico is gorgeous, and the car list is endless.',
        review: 'Stunning visuals, diverse biomes, and a massive car collection. The festival atmosphere is infectious.',
        recommendation: 'A must-play for racing enthusiasts. Even casual players will enjoy the open-world exploration.',
        achievementsUrl: 'https://steamcommunity.com/id/yourprofile/stats/1551360?tab=achievements'
    },
    {
        id: 3,
        title: 'The Witcher 3',
        genre: 'RPG',
        year: '2015',
        image: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800&q=80',
        experience: 'A masterpiece of storytelling. Even the side quests feel meaningful.',
        review: 'Rich world, complex characters, and moral choices that matter. The expansions are equally brilliant.',
        recommendation: 'One of the greatest RPGs ever made. If you haven’t played it, you’re missing out.',
        achievementsUrl: 'https://steamcommunity.com/id/yourprofile/stats/292030?tab=achievements'
    }
];

document.addEventListener('DOMContentLoaded', function() {
    // Genre filtering
    const filterButtons = document.querySelectorAll('.genre-btn');
    const gameCards = document.querySelectorAll('.game-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const selectedGenre = button.getAttribute('data-genre');

            gameCards.forEach(card => {
                if (selectedGenre === 'all') {
                    card.style.display = 'flex';
                } else {
                    const cardGenre = card.getAttribute('data-genre');
                    if (cardGenre === selectedGenre) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });

    // ===== MODAL FUNCTIONALITY =====
    const modal = document.getElementById('gameModal');
    const modalClose = document.querySelector('.modal-close');
    const modalTitle = document.getElementById('modalTitle');
    const modalGenre = document.getElementById('modalGenre');
    const modalYear = document.getElementById('modalYear');
    const modalImage = document.getElementById('modalImage');
    const modalExperience = document.getElementById('modalExperience');
    const modalReview = document.getElementById('modalReview');
    const modalRecommendation = document.getElementById('modalRecommendation');
    const modalAchievements = document.getElementById('modalAchievements');

    // Open modal when clicking on a game card (but not on the achievements link inside)
    gameCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // If the clicked element is the achievements link or inside it, do nothing
            if (e.target.closest('.steam-link')) return;

            const id = this.getAttribute('data-id');
            if (id === null) return;

            const game = gamesData[id];
            if (!game) return;

            // Populate modal
            modalTitle.textContent = game.title;
            modalGenre.textContent = game.genre;
            modalYear.textContent = game.year;
            modalImage.src = game.image;
            modalImage.alt = game.title;
            modalExperience.textContent = game.experience;
            modalReview.textContent = game.review;
            modalRecommendation.textContent = game.recommendation;
            modalAchievements.href = game.achievementsUrl;

            // Show modal
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // prevent background scrolling
        });
    });

    // Close modal when clicking the close button
    modalClose.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // restore scrolling
    });

    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    // Prevent achievements link inside modal from closing modal (it opens in new tab)
    modalAchievements.addEventListener('click', function(e) {
        e.stopPropagation(); // optional, but good practice
    });

    // Also handle escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    // Prevent clicks on achievements links inside cards from triggering modal
    document.querySelectorAll('.steam-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.stopPropagation(); // stops the card click event
        });
    });
});