const date = document.querySelector('.date');
date.textContent = new Date().toLocalDataString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
});

const writing = document.querySelector('.writing');
const wordCount = document.querySelector('.word-count');

function updateWordCount() {
  const text = writing.value.trim();
  const count = text ? text.split(/\s+/).length : 0;
  wordCount.textContent = count + (count === 1 ? ' word' : ' words');
}

writing.addEventListener('input', updateWordCount);
updateWordCount();