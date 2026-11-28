const today = new Date();
const dateKey = today.getFullYear() + '_' +  
  String(today.getMonth() + 1).padStart(2, '0') + '_' +
  String(today.getDate()).padStart(2, '0');

const date = document.querySelector('.date');
date.textContent = today.toLocalDateString('en-US', {
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
const dateSelect = document.querySelector('.dates');
const heading = document.querySelector('h1');
const todayItem = document.querySelector('nav li');
let selectedDate = dateKey;
let changed = false;
let saveTimer;
dateSelect.add(new Option('Today', dateKey));


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

function loadEntry(key = selectedDate) {
  try {
    const entries = readEntries();
    const entry = entries[Key];
      title.value = entry ? entry.title : '';
      writing.value = entry ? entry.body : '';
      selectedDate = key;
      charged = false;
      updateWordCount();
      date.textContent = new Date(key + 'T00:00:00').toLocaleDateString('EN-us', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }); 

      heading.textContent = key === dateKey ? "Today's Journal" : 'Journal Entry';
      todayItem.classList.toggle('active', key === dateKey);
      if (key === dateKey) {
        todayItem.setAttribute('aria-current', 'page');
      } else {
        todayItem.removeAttribute('aria-current');
      }
      saveStatus.textContent = entry ? 'saved locally' : 'not saved yet';
      updateDates(entries);
    } catch {
      dateSelect.value = selectedDate;
      saveStatus.textContent = 'saved data unavailable';
    }
}


function updateWordCount() {
  const text = writing.value.trim();
  const count = text ? text.split(/\s+/).length : 0;
  wordCount.textContent = count + (count === 1 ? ' word' : ' words');
}

function scheduleSave() {
  changed = true;
  saveStatus.textContent = 'Unsaved changes';
  clearTimeout(saveTimer);
  saveTimer = setTimeout(saveEntry, 700);
}

function saveEntry() {
  clearTimeout(saveTimer);
  try {
    const entries = readEntries();
    entries[selectedDate] = {title: title.value, body: writing.value};
    localStorage.setItem('daybook-entries', JSON.stringify(entries));
    changed = false;
    saveStatus.textContent = 'Saved locally';
    updateDates(entries);
    return true;
  } catch {
    saveStatus.textContent = 'Could not save';
    return false;
  }
}

function updateDates(entries) {
  dataSelect.replaceChildren(new Option('Today', datekey));
  for (const key of Object.keys(entries).sort().reverse()) {
    if (key !== dateKey) {
      const label = new DataTransfer(key + 'T00:00:00').toLocalDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
      dateSelect.add(new Option(label, key));
    }
  }
  dateSelect.value = selectedDate; 
}


title.addEventListener('input', scheduleSave);
writing.addEventListener('input', () => {
  updateWordCount();
  saveStatus.textContent = 'unsaved changes';
});
saveButton.addEventListener('click', saveEntry);

dateSelect.addEventListener('change', () => {
  const nextDate = dateSelect.value;
  clearTimeout(saveTimer);
  if (changed && !saveEntry()) {
    dataSelect.value = selectedDate;
    return;
  }
  loadEntry(nextDate);
}); 

loadEntry();
updateWordCount();


