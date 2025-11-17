const changeTheme = document.getElementById('changeTheme');
changeTheme.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

const noteForm = document.getElementById('noteForm');
const noteInput = document.getElementById('noteInput');
const notesList = document.getElementById('notesList');

async function loadNotes() {
  const res = await fetch('/api/notes');
  const notes = await res.json();
  notesList.innerHTML = '';
  notes.forEach((note) => {
    const li = document.createElement('li');
    li.textContent = note.content;
    notesList.appendChild(li);
  });
}

noteForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const content = noteInput.value.trim();
  if (!content) return;
  await fetch('/api/notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content })
  });
  noteInput.value = '';
  loadNotes();
});

loadNotes();
