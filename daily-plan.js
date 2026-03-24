document.addEventListener('DOMContentLoaded', function() {
    initHydrationTracker();
    initHealthTipFavorite();
    initMealCards();
});

function initHydrationTracker() {
    const cups = document.querySelectorAll('.cup');
    const progressFill = document.getElementById('progressFill');
    const cupsCount = document.getElementById('cupsCount');
    const progressPercent = document.getElementById('progressPercent');
    
    let filledCups = 2;
    
    updateProgress();
    
    cups.forEach((cup, index) => {
        cup.addEventListener('click', function() {
            const cupNumber = index + 1;
            
            if (cup.classList.contains('filled') && cupNumber === filledCups) {
                filledCups--;
            } else {
                filledCups = cupNumber;
            }
            
            updateCups();
            updateProgress();
        });
    });
    
    function updateCups() {
        cups.forEach((cup, index) => {
            if (index < filledCups) {
                cup.classList.add('filled');
            } else {
                cup.classList.remove('filled');
            }
        });
    }
    
    function updateProgress() {
        const percentage = (filledCups / 8) * 100;
        progressFill.style.width = percentage + '%';
        cupsCount.textContent = filledCups;
        progressPercent.textContent = Math.round(percentage) + '%';
    }
}

function initHealthTipFavorite() {
    const tipFavorite = document.getElementById('tipFavorite');
    
    if (tipFavorite) {
        tipFavorite.addEventListener('click', function() {
            tipFavorite.classList.toggle('active');
            
            if (tipFavorite.classList.contains('active')) {
                showNotification('Added to favorites!');
            } else {
                showNotification('Removed from favorites');
            }
        });
    }
}

function initMealCards() {
    const mealButtons = document.querySelectorAll('.btn-meal');
    
    mealButtons.forEach(button => {
        button.addEventListener('click', function() {
            const mealCard = button.closest('.meal-card');
            const mealTitle = mealCard.querySelector('.meal-title').textContent;
            showNotification(`Opening ${mealTitle} details...`);
        });
    });
}

function showNotification(message) {
    const existingNotification = document.querySelector('.notification-toast');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification-toast';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: var(--text);
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2500);
}