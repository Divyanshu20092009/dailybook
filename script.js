const today = new Date();
const dateKey = today.getFullYear() + '_' +  
  String(today.getMonth() + 1).padStart(2, '0') + '_' +
  String(today.getDate()).padStart(2, '0');

const date = document.querySelector('.date');
date.textContent = new Date().toLocalDataString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
});

const writing = document.querySelector('.writing');
const wordCount = document.querySelector('.word-count');

const title = document.querySelector('.title');
const saveStatus = document.querySelector('.save-status')
const saveButton = document.querySelector('.save');

function readEntries() {
  const data = localStorage.getItem('daybook-entries');
  const entries = data === null ? {} : JSON.parse(data);
  if (!entries || typeof entries !== 'object' || Array.isArray(entries)) {
    throw new Error('Invalid saved data');
  }
  for (const entry of Object.values(entries)) {
    if (!entry || typeof entry.title !== 'string' || typeof entry.body !== 'string') {
      throw new Error('Invalid saved entry');
    }
  }
  return entries;
}

function loadEntry() {
  try {
    const entries = readEntries();
    const entry = entries[dateKey];
    if (entry) {
      title.value = entry.title;
      writing.value = entry.body;
      saveStatus.textContent = 'saved locally';
    }
  } catch {
    saveStatus.textContent = 'saved data not available'
  }
}



function updateWordCount() {
  const text = writing.value.trim();
  const count = text ? text.split(/\s+/).length : 0;
  wordCount.textContent = count + (count === 1 ? ' word' : ' words');
}

function saveEntry() {
  try {
    const entries = readEntries();
    entries[dateKey] = { title: title, body: writing.value};
    localStorage.setItem('daybook-entries', JSON.stringify(entries));
    saveStatus.textContent = 'saved locally';
  } catch {
    saveStatus.textContent = 'could not save';
  }
}


title.addEventListener('input', () => {
  saveStatus.textContent = 'Unsaved changes';
});
writing.addEventListener('input', () => {
  updateWordCount();
  saveStatus.textContent = 'unsaved changes';
});
saveButton.addEventListener('click', saveEntry);
loadEntry();
updateWordCount();


