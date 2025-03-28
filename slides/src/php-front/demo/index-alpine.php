<?php require('layout/header.php') ?>

<form action="">
    <h1>Votre avis nous intéresse</h1>
    <fieldset x-data="{age: ''}">
        <label for="age">
            Votre age
            <input
                    x-model="age"
                id="age"
                name="age"
                type="number"
                placeholder="Age"
                autocomplete="given-name"
            />
        </label>
        <label for="beers" x-show="age && age >= 18">
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

<script src='//unpkg.com/alpinejs' defer></script>


<?php require('layout/footer.php') ?>
