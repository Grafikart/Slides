# Démonstration des tests

## Installation de vitest

On ajoute la dépendance

```
npm install -D vitest
```

On ajoute le script

```
"script": {
    "test": "vitest"
}
```

On modifie la config

```
import react from '@vitejs/plugin-react'
import {defineConfig} from "vitest/config";

export default defineConfig({
  // ...
})
```

## Problème avec le DOM 

