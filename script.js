const scriptUrl = 'https://script.google.com/macros/s/AKfycbzwvs2m7GW8wlAnpEXgZ2qyMBNi9tbqOkdR1URaJFRlLkOnIzWsy8CiDpzQMbfG5XryLg/exec';

function showTab(tabId) {
  document.querySelectorAll('.tab').forEach(div => div.style.display = 'none');
  document.getElementById(tabId).style.display = 'block';
}

function createTable(tableId, data) {
  const table = document.getElementById(tableId);
  const thead = table.querySelector('thead');
  const tbody = table.querySelector('tbody');

  // Clear table
  thead.innerHTML = '';
  tbody.innerHTML = '';

  if (data.length === 0) return;

  // Headers
  const headers = Object.keys(data[0]);
  thead.innerHTML = '<tr>' + headers.map(h => `<th>${h}</th>`).join('') + '</tr>';

  // Rows
  data.forEach(row => {
    const tr = document.createElement('tr');
    headers.forEach(h => {
      const td = document.createElement('td');
      const val = row[h];
      if (typeof val === 'string' && val.startsWith('http')) {
        td.innerHTML = `<a href="${val}" target="_blank">前往</a>`;
      } else {
        td.textContent = val;
      }
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
}

function loadData(type, tableId) {
  fetch(`${scriptUrl}?type=${type}`)
    .then(res => res.json())
    .then(data => createTable(tableId, data))
    .catch(err => console.error(err));
}

// Load both on page load
loadData('hospital', 'hospital-table');
loadData('learning', 'resource-table');
