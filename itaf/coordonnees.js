// rendezvous .html
 const months = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

let currentDate = new Date(2025, 0, 1);
let appointments = {}; // Stocke les rendez-vous par date

function renderCalendar(date) {
    const calendar = document.getElementById('calendar');
    const currentMonthYear = document.getElementById('currentMonthYear');
    calendar.innerHTML = '';

    const year = date.getFullYear();
    const month = date.getMonth();

    currentMonthYear.textContent = `${months[month]} ${year}`;

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startingDay = firstDayOfMonth.getDay();

    const daysOfWeek = ["LUN", "MAR", "MER", "JEU", "VEN", "SAM", "DIM"];
    daysOfWeek.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.textContent = day;
        dayElement.style.fontWeight = 'bold';
        calendar.appendChild(dayElement);
    });

    for (let i = 0; i < startingDay - 1; i++) {
        const emptyDay = document.createElement('div');
        calendar.appendChild(emptyDay);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.textContent = day;
        dayElement.dataset.date = `${year}-${month + 1}-${day}`;
        
        if (!appointments[dayElement.dataset.date]) {
            appointments[dayElement.dataset.date] = 0;
        }

        dayElement.addEventListener('click', () => handleAppointment(dayElement));
        calendar.appendChild(dayElement);
    }
}

function handleAppointment(dayElement) {
    const selectedDate = dayElement.dataset.date;
    if (appointments[selectedDate] >= 40) {
        window.location.href = "rendezvous.html?error=limit_exceeded";
    } else {
        appointments[selectedDate]++;
        document.querySelectorAll('.calendar div').forEach(d => d.classList.remove('selected'));
        dayElement.classList.add('selected');
        const remaining = 40 - appointments[selectedDate];
        alert(`Vous avez sélectionné le ${selectedDate}.\nNombre de rendez-vous: ${appointments[selectedDate]}/40\nPlaces restantes: ${remaining}`);
    }
}

document.getElementById('prevMonth').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
});

document.getElementById('nextMonth').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
});

renderCalendar(currentDate);

// Vérifie les erreurs sur rendezvous.html
document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("error") === "limit_exceeded") {
        alert("Le nombre maximum de rendez-vous pour cette date est atteint (40/40). Veuillez choisir une autre date.");
    }
});

