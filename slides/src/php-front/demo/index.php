<?php require('layout/header.php') ?>

<form action="">
    <h1>Votre avis nous intéresse</h1>
    <fieldset>
        <label for="age">
            Votre age
            <input
                id="age"
                name="age"
                type="number"
                placeholder="Age"
                autocomplete="given-name"
            />
        </label>
        <label for="beers" hidden>
            Combien de bières avez-vous bu aujourd'hui ?
            <input
                id="beers"
                type="number"
                name="beers"
                placeholder="Nombre de bières"
            />
        </label>
        <button type="submit">Envoyer</button>
    </fieldset>
</form>

<script>
// Afficher le champs "beers" si l'utilisateur a moins de 18 ans
const age = document.querySelector('label[for="age"]');
const beers = document.querySelector('label[for="beers"]');

age.querySelector('input').addEventListener('input', (e) => {
    if (e.currentTarget.valueAsNumber && e.currentTarget.valueAsNumber >= 18) {
        beers.removeAttribute('hidden');
    } else {
        beers.setAttribute('hidden', true);
    }
});
</script>

<?php require('layout/footer.php') ?>
