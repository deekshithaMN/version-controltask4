import { teachers, dates, rooms, schedule, saveData } from './data.js';
import { initials, formatDate, COLORS } from './utils.js';
import { getTeacher } from './scheduler.js';
import { generateSchedule, availableTeachers } from './scheduler.js';

function showPage(p) {
  document.querySelectorAll('.page').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
  document.getElementById('page-' + p).classList.add('active');
  event.target.classList.add('active');
  if (p === 'stats') renderStats();
}

function addDate() {
  const d = document.getElementById('examDate').value;
  const l = document.getElementById('examLabel').value.trim() || 'Exam';
  if (!d) {
    alert('Please select a date.');
    return;
  }
  if (dates.find(x => x.date === d)) {
    alert('Date already added.');
    return;
  }
  dates.push({date: d, label: l});
  dates.sort((a, b) => a.date.localeCompare(b.date));
  saveData();
  renderDates();
}

function removeDate(i) {
  dates.splice(i, 1);
  saveData();
  renderDates();
}

function renderDates() {
  const el = document.getElementById('dateList');
  if (!dates.length) {
    el.innerHTML = '<p style="color:var(--muted);font-size:0.85rem;margin-top:8px;">No dates added.</p>';
    return;
  }
  el.innerHTML = dates.map((d, i) => `
    <div class="teacher-item" style="margin-top:8px;">
      <div class="teacher-info">
        <span class="tag tag-blue">📅 ${formatDate(d.date)}</span>
        <span style="font-size:0.88rem;">${d.label}</span>
      </div>
      <button class="btn btn-red btn-sm" onclick="removeDate(${i})">✕</button>
    </div>`).join('');
}

function addRoom() {
  const n = document.getElementById('roomNum').value.trim();
  const c = parseInt(document.getElementById('roomCap').value) || 30;
  if (!n) {
    alert('Enter room number.');
    return;
  }
  if (rooms.find(r => r.num === n)) {
    alert('Room already added.');
    return;
  }
  rooms.push({num: n, cap: c});
  saveData();
  renderRooms();
}

function removeRoom(i) {
  rooms.splice(i, 1);
  saveData();
  renderRooms();
}

function renderRooms() {
  const el = document.getElementById('roomList');
  if (!rooms.length) {
    el.innerHTML = '<p style="color:var(--muted);font-size:0.85rem;margin-top:8px;">No rooms added.</p>';
    return;
  }
  el.innerHTML = rooms.map((r, i) => `
    <div class="teacher-item" style="margin-top:8px;">
      <div class="teacher-info">
        <span class="tag tag-teal">🚪 ${r.num}</span>
        <span style="font-size:0.85rem;color:var(--muted)">Cap: ${r.cap}</span>
      </div>
      <button class="btn btn-red btn-sm" onclick="removeRoom(${i})">✕</button>
    </div>`).join('');
}

function addTeacher() {
  const name = document.getElementById('tName').value.trim();
  if (!name) {
    alert('Enter teacher name.');
    return;
  }
  const leave = document.getElementById('tLeave').value.split(',').map(s => s.trim()).filter(Boolean);
  teachers.push({
    id: Date.now(),
    name,
    dept: document.getElementById('tDept').value.trim() || 'General',
    desig: document.getElementById('tDesig').value.trim() || 'Teacher',
    email: document.getElementById('tEmail').value.trim(),
    leave,
    color: COLORS[teachers.length % COLORS.length]
  });
  document.getElementById('tName').value = '';
  document.getElementById('tEmail').value = '';
  document.getElementById('tLeave').value = '';
  saveData();
  renderTeachers();
}

function removeTeacher(id) {
  teachers = teachers.filter(t => t.id !== id);
  saveData();
  renderTeachers();
}

function renderTeachers() {
  const el = document.getElementById('teacherList');
  const statsEl = document.getElementById('totalTeachers');
  const deptsEl = document.getElementById('totalDepts');
  statsEl.textContent = teachers.length;
  deptsEl.textContent = new Set(teachers.map(t => t.dept)).size;
  if (!teachers.length) {
    el.innerHTML = '<p style="color:var(--muted);font-size:0.88rem;">No teachers added yet.</p>';
    return;
  }
  el.innerHTML = teachers.map(t => `
    <div class="teacher-item">
      <div class="teacher-info">
        <div class="avatar" style="background:${t.color}22;color:${t.color}">${initials(t.name)}</div>
        <div>
          <div style="font-weight:500;font-size:0.9rem;">${t.name}</div>
          <div style="color:var(--muted);font-size:0.78rem;">${t.desig} · ${t.dept}</div>
        </div>
      </div>
      <button class="btn btn-red btn-sm" onclick="removeTeacher(${t.id})">✕</button>
    </div>`).join('');
}

function getTeacher(id) {
  return teachers.find(t => t.id === id);
}

function renderSchedule(dutyCount, reliefCount) {
  const el = document.getElementById('scheduleOutput');
  if (!Object.keys(schedule).length) {
    el.innerHTML = '<div class="alert alert-info">No schedule yet.</div>';
    return;
  }

  let html = `<div class="alert alert-success">✅ Schedule generated for ${dates.length} day(s), ${rooms.length} room(s), ${teachers.length} teacher(s).</div>`;

  for (const d of dates) {
    const s = schedule[d.date];
    html += `
    <div class="card" style="margin-bottom:20px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
        <div>
          <div style="font-family:'Syne',sans-serif;font-size:1.1rem;font-weight:700;">${s.label}</div>
          <div style="color:var(--muted);font-size:0.85rem;">📅 ${formatDate(d.date)}</div>
        </div>
        <span class="tag tag-teal">Day ${dates.indexOf(d) + 1}</span>
      </div>
      <div class="schedule-wrap">
        <table>
          <thead><tr><th>Room No.</th><th>Capacity</th><th>Invigilator(s)</th></tr></thead>
          <tbody>
            ${rooms.map(r => {
              const ids = s.rooms[r.num] || [];
              const tList = ids.map(id => {
                const t = getTeacher(id);
                return t ? `<span class="tag tag-blue" style="border-color:${t.color}33;color:${t.color};background:${t.color}15">${t.name}</span>` : '';
              }).join('');
              return `<tr><td><strong>${r.num}</strong></td><td>${r.cap}</td><td><div class="duty-cell">${tList || '<span style="color:var(--muted)">Unassigned</span>'}</div></td></tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
      <div style="margin-top:16px;">
        <div style="font-size:0.82rem;color:var(--muted);margin-bottom:8px;font-weight:600;">🔄 RELIEVERS FOR THE DAY</div>
        <div class="duty-cell">
          ${(s.relievers || []).map(id => {
            const t = getTeacher(id);
            return t ? `<span class="tag tag-gold">${t.name}</span>` : '';
          }).join('') || '<span style="color:var(--muted)">None assigned</span>'}
        </div>
      </div>
    </div>`;
  }
  el.innerHTML = html;
}

function renderStats() {
  const el = document.getElementById('statsOutput');
  if (!teachers.length || !Object.keys(schedule).length) {
    el.innerHTML = '<div class="alert alert-info">Generate a schedule first to see statistics.</div>';
    return;
  }

  // Count only invigilator duties (room assignments), exclude reliever days
  const counts = {};
  teachers.forEach(t => { counts[t.id] = 0; });
  for (const dKey of Object.keys(schedule)) {
    const s = schedule[dKey];
    for (const rKey of Object.keys(s.rooms || {})) {
      for (const id of s.rooms[rKey]) {
        if (counts[id] !== undefined) counts[id]++;
      }
    }
    // Relievers are NOT counted as duties
  }

  const maxCount = Math.max(...Object.values(counts), 1);
  const sortedTeachers = [...teachers].sort((a, b) => counts[b.id] - counts[a.id]);
  const totalAssigned = Object.values(counts).reduce((a, b) => a + b, 0);
  const avg = (totalAssigned / teachers.length).toFixed(1);

  let html = `
  <div class="stat-grid">
    <div class="stat-card"><div class="stat-num" style="color:var(--teal)">${dates.length}</div><div class="stat-label">Exam Days</div></div>
    <div class="stat-card"><div class="stat-num" style="color:var(--blue)">${rooms.length}</div><div class="stat-label">Rooms</div></div>
    <div class="stat-card"><div class="stat-num" style="color:var(--gold)">${teachers.length}</div><div class="stat-label">Teachers</div></div>
    <div class="stat-card"><div class="stat-num" style="color:var(--red)">${avg}</div><div class="stat-label">Avg. Invigilator Duties/Teacher</div></div>
  </div>
  <div class="card">
    <div class="card-title">📊 Invigilator Duties per Teacher</div>
    ${sortedTeachers.map(t => `
      <div style="margin-bottom:14px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <div style="display:flex;align-items:center;gap:10px;">
            <div class="avatar" style="background:${t.color}22;color:${t.color}">${initials(t.name)}</div>
            <div>
              <div style="font-size:0.88rem;font-weight:500;">${t.name}</div>
              <div style="font-size:0.75rem;color:var(--muted)">${t.dept}</div>
            </div>
          </div>
          <span class="badge" style="background:${t.color}">${counts[t.id]}</span>
        </div>
        <div class="count-bar-wrap">
          <div class="count-bar"><div class="count-bar-fill" style="width:${(counts[t.id]/maxCount)*100}%;background:${t.color}"></div></div>
          <span class="count-val">${counts[t.id]} invigilations</span>
        </div>
      </div>
    `).join('')}
  </div>`;

  el.innerHTML = html;
}

import './js/data.js'; // Ensure data is loaded

// Initialize UI after DOM loads
document.addEventListener('DOMContentLoaded', () => {
  renderTeachers();
  renderDates();
  renderRooms();
});

window.addDate = addDate;
window.removeDate = removeDate;
window.addRoom = addRoom;
window.removeRoom = removeRoom;
window.addTeacher = addTeacher;
window.removeTeacher = removeTeacher;
window.showPage = showPage;
window.renderStats = renderStats;
window.generateSchedule = generateSchedule;

