document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("connexionBtn").addEventListener("click", function (event) {
        event.preventDefault(); // Empêche la redirection immédiate

        let username = document.getElementById("username").value.trim();
        let password = document.getElementById("password").value.trim();
        let usernameError = document.getElementById("usernameError");
        let passwordError = document.getElementById("passwordError");

        // Réinitialisation des messages d'erreur
        usernameError.textContent = "";
        passwordError.textContent = "";

        let isValid = true;

        // Vérification du nom d'utilisateur : uniquement des lettres et ne doit pas être vide
        let nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
        if (username === "") {
            usernameError.textContent = "Le nom d'utilisateur est requis.";
            isValid = false;
        } else if (!nameRegex.test(username)) {
            usernameError.textContent = "Le nom d'utilisateur ne doit contenir que des lettres.";
            isValid = false;
        }

        // Vérification du CIN : exactement 8 chiffres
        let cinRegex = /^[0-9]{8}$/;
        if (password === "") {
            passwordError.textContent = "Le CIN est requis.";
            isValid = false;
        } else if (!cinRegex.test(password)) {
            passwordError.textContent = "Le CIN doit contenir exactement 8 chiffres.";
            isValid = false;
        }

        // Si tout est valide, on passe à la page suivante
        if (isValid) {
            window.location.href = "analyses.html"; // Redirection vers la page d'analyses
        }
    });
});
