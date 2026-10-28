let teachers = [];
let dates = [];
let rooms = [];
let schedule = {};

function saveData() {
  localStorage.setItem('examDuty', JSON.stringify({teachers, dates, rooms, schedule}));
}

function loadData() {
  const data = localStorage.getItem('examDuty');
  if (data) {
    const parsed = JSON.parse(data);
    teachers = parsed.teachers || [];
    dates = parsed.dates || [];
    rooms = parsed.rooms || [];
    schedule = parsed.schedule || {};
  }
}

// Auto-load data on import
loadData();

export { teachers, dates, rooms, schedule, saveData, loadData };


