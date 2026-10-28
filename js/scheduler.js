// Fair available teachers helper: sort by specified count type (dutyCount or reliefCount)
function availableTeachers(date, exclude=[], sortType = 'duty', dutyCount, reliefCount, maxD) {
  const countMap = sortType === 'duty' ? dutyCount : reliefCount;
  const maxLimit = sortType === 'duty' ? maxD : maxD;
  return teachers
    .filter(t => !t.leave.includes(date) && !exclude.includes(t.id) && countMap[t.id] < maxLimit)
    .map(t => ({...t}))
    .sort((a, b) => countMap[a.id] - countMap[b.id])
    .sort((a, b) => a.id - b.id);
}

function generateSchedule(invPerRoom, relieversPerDay, maxDuties) {
  if (!teachers.length) {
    alert('Add teachers first!');
    return;
  }
  if (!dates.length) {
    alert('Add exam dates first!');
    return;
  }
  if (!rooms.length) {
    alert('Add rooms first!');
    return;
  }

  // duty and relief trackers for fairness
  const dutyCount = {};
  const reliefCount = {};
  teachers.forEach(t => {
    dutyCount[t.id] = 0;
    reliefCount[t.id] = 0;
  });

  schedule = {};

  for (const d of dates) {
    schedule[d.date] = {rooms: {}, relievers: [], date: d.date, label: d.label};
    let usedToday = [];

    // assign invigilators first (fair by dutyCount)
    for (const room of rooms) {
      const candidates = availableTeachers(d.date, usedToday, 'duty', dutyCount, reliefCount, maxDuties);
      if (candidates.length < invPerRoom) {
        console.warn(`Insufficient teachers for invigilators on ${d.date}`);
      }
      const assigned = candidates.slice(0, invPerRoom);
      assigned.forEach(id => {
        dutyCount[id]++;
        usedToday.push(id);
      });
      schedule[d.date].rooms[room.num] = assigned;
    }

    // assign relievers second (fair by reliefCount)
    const relCandidates = availableTeachers(d.date, usedToday, 'relief', dutyCount, reliefCount, maxDuties);
    if (relCandidates.length < relieversPerDay) {
      console.warn(`Insufficient teachers for relievers on ${d.date}`);
    }
    const assignedRelievers = relCandidates.slice(0, relieversPerDay);
    assignedRelievers.forEach(id => {
      reliefCount[id]++;
      usedToday.push(id);
    });
    schedule[d.date].relievers = assignedRelievers;
  }

  saveData();
  renderSchedule(dutyCount, reliefCount);
}

export { generateSchedule, availableTeachers };

function getTeacher(id) {
  return teachers.find(t => t.id === id);
}

export { getTeacher };

