document.addEventListener('DOMContentLoaded', () => {
    const fetchButton = document.getElementById('fetchButton');
    const userData = document.getElementById('userData');
  
    fetchButton.addEventListener('click', async () => {
      try {
        const response = await fetch('https://randomuser.me/api/?results=100');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        displayUsers(data.results);
      } catch (error) {
        console.error('Failed to fetch users:', error.message);
        userData.textContent = 'Failed to fetch user data. Please try again later.';
      }
    });
  
    function displayUsers(users) {
      const table = document.createElement('table');
      table.innerHTML = `
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Email</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          ${users.map(user => `
            <tr>
              <td><img src="${user.picture.thumbnail}" alt="User Picture"></td>
              <td>${user.name.first} ${user.name.last}</td>
              <td>${user.email}</td>
              <td>${user.location.city}, ${user.location.country}</td>
            </tr>
          `).join('')}
        </tbody>
      `;
      userData.innerHTML = '';
      userData.appendChild(table);
    }
  });
  
