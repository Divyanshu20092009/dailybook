const date = document.querySelector('.date');
date.textContent = new Date().toLocalDataString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
});