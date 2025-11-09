const API_BASE = 'https://bet-analyzer-backend.onrender.com/api';

async function loadProgramme() {
  try {
    const res = await fetch(`${API_BASE}/programme`);
    const data = await res.json();
    const container = document.getElementById('programme');
    container.innerHTML = '';
    if (data.programme && Array.isArray(data.programme)) {
      data.programme.forEach(course => {
        const div = document.createElement('div');
        div.className = 'course';
        div.innerHTML = `<strong>${course.course_id}</strong> : ${course.hippodrome} (${course.discipline})<br>
          Distance : ${course.distance_m}m | Date : ${course.date}<br>`;
        container.appendChild(div);
      });
    }
  } catch (error) {
    console.error(error);
  }
}

async function loadValueBets() {
  try {
    const res = await fetch(`${API_BASE}/valuebets?top=3`);
    const data = await res.json();
    const container = document.getElementById('valuebets');
    container.innerHTML = '';
    if (data.valuebets && Array.isArray(data.valuebets)) {
      data.valuebets.forEach(vb => {
        const div = document.createElement('div');
        div.className = 'course value';
        div.innerHTML = `<strong>${vb.horse}</strong> - Course ${vb.course_id}<br>
          Note : ${vb.score.toFixed(2)} | Proba : ${(vb.probability * 100).toFixed(1)}%<br>
          Edge : ${(vb.edge * 100).toFixed(1)}%`;
        container.appendChild(div);
      });
    }
  } catch (error) {
    console.error(error);
  }
}

loadProgramme();
loadValueBets();
