/**
 * @property {HTMLElement} root
 * @property {Text} countText
 * @property {HTMLElement | null} alertElement
 */
class Counter {

    count = 0
    alertElement = null

    constructor(root) {
        this.root = root
        this.root.innerHTML = `
            <p>
                <span>Compteur : <strong></strong></span>
            </p>
            <p>
                <button class="btn btn-secondary">Incrémenter</button>
                <button class="btn btn-secondary">Décrémenter</button>
            </p>`

        const buttons = this.root.querySelectorAll('button')
        buttons[0].addEventListener('click', this.increment.bind(this))
        buttons[1].addEventListener('click', this.decrement.bind(this))
        this.countText = document.createTextNode(this.count.toString())
        this.root.querySelector('strong').append(this.countText)
    }

    increment () {
        this.count++
        this.updateCounterUI()
    }

    decrement () {
        this.count--
        this.updateCounterUI()
    }

    updateCounterUI() {
        if (this.count >= 10 && !this.alertElement) {
            this.alertElement = document.createElement('div')
            this.alertElement.classList.add('alert', 'alert-info')
            this.alertElement.innerText = 'Ce chiffre est plus grand que 10'
            this.root.append(this.alertElement)
        }
        if (this.count < 10 && this.alertElement) {
            this.alertElement.remove()
            this.alertElement = null;
        }

        this.countText.nodeValue = this.count.toString()
    }

}

new Counter(document.querySelector('#counter'))
