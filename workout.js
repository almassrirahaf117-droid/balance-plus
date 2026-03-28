document.addEventListener('DOMContentLoaded', function() {

    let liked = new Set();
    let activePill = 'all';

    function toggleHeart(btn, name) {
        btn.classList.toggle('liked');
        if (btn.classList.contains('liked')) {
            liked.add(name);
            showToast('❤️ "' + name + '" added to favorites!');
        } else {
            liked.delete(name);
            showToast('💔 "' + name + '" removed from favorites');
        }
        document.getElementById('favBadge').textContent = liked.size;
    }

    function viewWorkout(name, videoId) {
        const overlay = document.getElementById('modalOverlay');
        const iframe  = document.getElementById('modalIframe');
        const title   = document.getElementById('modalTitle');

        title.textContent = name;
        iframe.src = 'https://www.youtube.com/embed/' + videoId + '?rel=0';

        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        const overlay = document.getElementById('modalOverlay');
        const iframe  = document.getElementById('modalIframe');

        overlay.classList.remove('active');
        iframe.src = '';
        document.body.style.overflow = '';
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    function setPill(btn, level) {
        document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        activePill = level;
        filterCards();
    }

    function filterCards() {
        const query = document.getElementById('searchInput').value.toLowerCase();
        document.querySelectorAll('.workout-card').forEach(card => {
            const lvl  = card.dataset.level;
            const name = card.dataset.name;
            const matchLevel  = activePill === 'all' || lvl === activePill;
            const matchSearch = name.includes(query);
            card.style.display = (matchLevel && matchSearch) ? '' : 'none';
        });
    }

    function showToast(msg) {
        const t = document.getElementById('toast');
        t.textContent = msg;
        t.classList.add('show');
        clearTimeout(window._toastTimer);
        window._toastTimer = setTimeout(() => t.classList.remove('show'), 3000);
    }

    window.toggleHeart  = toggleHeart;
    window.viewWorkout  = viewWorkout;
    window.closeModal   = closeModal;
    window.setPill      = setPill;
    window.filterCards  = filterCards;
    window.showToast    = showToast;

});