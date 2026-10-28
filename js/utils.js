const COLORS = ['#1e6fff','#00c9b1','#f5b942','#ff4f5e','#a78bfa','#fb923c','#34d399','#f472b6','#60a5fa','#facc15'];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function initials(name) {
  return name.split(' ').map(w => w[0] || '').join('').substring(0, 2).toUpperCase();
}

function formatDate(d) {
  const dt = new Date(d + 'T00:00:00');
  return dt.toLocaleDateString('en-IN', {day: '2-digit', month: 'short', year: 'numeric'});
}

export { COLORS, shuffleArray, initials, formatDate };

function getTeacher(id) {
  return teachers.find(t => t.id === id);
}

export { getTeacher };

