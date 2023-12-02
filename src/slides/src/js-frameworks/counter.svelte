<script>
    let count = 0

    const increment = () => {
        count++
    }

    const decrement = () => {
        count--
    }
</script>

<p>
    <span>Compteur avec librairie : <strong>{ count }</strong></span>
</p>
<p>
    <button class="btn btn-secondary" on:click={increment}>Incrémenter</button>
    <button class="btn btn-secondary" on:click={decrement}>Décrémenter</button>
</p>
{#if count >= 10}
    <div class="alert alert-info">
        Ce chiffre est plus grand que 10
    </div>
{/if}
