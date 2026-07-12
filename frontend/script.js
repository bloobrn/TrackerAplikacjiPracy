const API_URL = 'http://localhost:8080/api/applications';

// Pobierz i wyświetl wszystkie aplikacje przy starcie strony
document.addEventListener('DOMContentLoaded', loadApplications);

async function loadApplications() {
    try {
        const response = await fetch(API_URL);
        const applications = await response.json();
        renderTable(applications);
    } catch (error) {
        console.error('Błąd pobierania danych:', error);
        alert('Nie udało się połączyć z serwerem. Sprawdź, czy backend działa (mvn spring-boot:run).');
    }
}

function renderTable(applications) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    applications.forEach(app => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${app.company}</td>
            <td>${app.position || '-'}</td>
            <td>${app.applicationType === 'intern' ? 'Staż' : app.applicationType === 'job' ? 'Praca' : '-'}</td>
            <td>
   		 <select class="status-select status-${app.status}" onchange="updateStatus(${app.id}, this)">
       			 <option value="wysłano" ${app.status === 'wysłano' ? 'selected' : ''}>wysłano</option>
       			 <option value="odpowiedź" ${app.status === 'odpowiedź' ? 'selected' : ''}>odpowiedź</option>
       			 <option value="rozmowa" ${app.status === 'rozmowa' ? 'selected' : ''}>rozmowa</option>
       			 <option value="odrzucenie" ${app.status === 'odrzucenie' ? 'selected' : ''}>odrzucenie</option>
      		 	 <option value="oferta" ${app.status === 'oferta' ? 'selected' : ''}>oferta</option>
   		 </select>
</td>
            <td>${app.applicationDate || '-'}</td>
            <td><button class="delete-btn" onclick="deleteApplication(${app.id})">Usuń</button></td>
        `;
        tableBody.appendChild(row);
    });
}

// Obsługa formularza dodawania nowej aplikacji
document.getElementById('applicationForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const newApplication = {
        company: document.getElementById('company').value,
        position: document.getElementById('position').value,
        status: document.getElementById('status').value,
        applicationType: document.getElementById('applicationType').value,
        notes: document.getElementById('notes').value,
        offerLink: document.getElementById('offerLink').value
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newApplication)
        });

        if (!response.ok) throw new Error('Błąd zapisu');

        document.getElementById('applicationForm').reset();
        loadApplications(); // odśwież tabelę
    } catch (error) {
        console.error('Błąd dodawania aplikacji:', error);
        alert('Nie udało się dodać aplikacji.');
    }
});

// Usuwanie aplikacji
async function deleteApplication(id) {
    if (!confirm('Na pewno usunąć tę aplikację?')) return;

    try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        loadApplications(); // odśwież tabelę
    } catch (error) {
        console.error('Błąd usuwania:', error);
        alert('Nie udało się usunąć aplikacji.');
    }
}

// Aktualizacja statusu bezpośrednio z tabeli
async function updateStatus(id, selectElement) {
    const newStatus = selectElement.value;
    selectElement.className = `status-select status-${newStatus}`;

    try {
        const getResponse = await fetch(`${API_URL}/${id}`);
        const application = await getResponse.json();
        application.status = newStatus;

        const putResponse = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(application)
        });

        if (!putResponse.ok) throw new Error('Błąd aktualizacji');
    } catch (error) {
        console.error('Błąd aktualizacji statusu:', error);
        alert('Nie udało się zaktualizować statusu.');
        loadApplications();
    }
}
