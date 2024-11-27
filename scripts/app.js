function showSection(sectionId) {
  document.querySelectorAll("section").forEach((section) => {
    section.classList.add("hidden");
  });
  document.getElementById(sectionId).classList.remove("hidden");
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then(() => console.log("Service Worker enregistré avec succès."))
    .catch((error) =>
      console.error("Erreur lors de l’enregistrement du Service Worker:", error)
    );
}
