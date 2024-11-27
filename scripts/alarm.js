let alarms = []; // Tableau pour stocker les alarmes
const alarmSound = new Audio("assets/sounds/alarm.mp3"); // Chemin du fichier MP3
alarmSound.loop = true; // Faire boucler le son jusqu'à ce qu'il soit arrêté

function addAlarm() {
  const alarmTime = document.getElementById("alarm-time").value;
  const alarmMessage = document.getElementById("alarm-message").value;

  if (!alarmTime) {
    alert("Veuillez entrer une heure valide.");
    return;
  }

  const alarm = {
    time: alarmTime,
    message: alarmMessage || "Alarme!",
    status: "active",
  };

  alarms.push(alarm);
  updateAlarmList();
}

function updateAlarmList() {
  const alarmList = document.getElementById("alarm-list");
  alarmList.innerHTML = "";

  alarms.forEach((alarm, index) => {
    const listItem = document.createElement("li");
    const now = new Date();
    const [hours, minutes] = alarm.time.split(":").map(Number);
    const alarmDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours,
      minutes
    );

    let statusText;
    if (alarmDate.getTime() < now.getTime()) {
      alarm.status = "passed";
      statusText = "Passée";
    } else {
      const timeDiff = Math.floor((alarmDate.getTime() - now.getTime()) / 1000);
      const remainingMinutes = Math.floor(timeDiff / 60);
      const remainingSeconds = timeDiff % 60;
      statusText = `Dans ${remainingMinutes}m ${remainingSeconds}s`;
    }

    listItem.textContent = `${alarm.time} - ${alarm.message} (${statusText})`;
    listItem.className = alarm.status === "passed" ? "passed" : "upcoming";

    // Ajouter un bouton pour supprimer l'alarme
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Supprimer";
    deleteButton.onclick = () => {
      alarms.splice(index, 1);
      updateAlarmList();
    };

    listItem.appendChild(deleteButton);
    alarmList.appendChild(listItem);
  });
}

function checkAlarms() {
  const now = new Date();
  const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

  alarms.forEach((alarm) => {
    if (alarm.status === "active" && alarm.time === currentTime) {
      // Jouer le son lorsque l'alarme se déclenche
      alarmSound.play();

      // Ajouter le bouton pour arrêter l'alarme
      const stopAlarmButton = document.getElementById("stop-alarm");
      stopAlarmButton.style.display = "block";

      alert(alarm.message);
      alarm.status = "passed";
    }
  });

  updateAlarmList();
}

function stopAlarm() {
  if (!alarmSound.paused) {
    // Vérifie si le son est en cours de lecture
    alarmSound.pause(); // Met le son en pause
    alarmSound.currentTime = 0; // Remet le son au début
  }
  document.getElementById("stop-alarm").style.display = "none"; // Cache le bouton
}

// Vérifier les alarmes toutes les secondes
setInterval(checkAlarms, 1000);
