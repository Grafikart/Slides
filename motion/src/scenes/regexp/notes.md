## Token

- `a b c `
- `[abc]`
- `[a-z]`
- `.` (joker)
- `\s` (espace)
- `\d` (chiffre)   \D opposé
- `\w` (word caractère)  \W opposé
- `\b` (word boundary)   \B opposé

## Quantifier

- `{3}`
- `{3,}`
- `{3,6}`
- `*`  0+
- `+`  1+
- `?`  0 ou 1

## Matching

- `()`
- `(?:)`
- `(?<name>)`

## Look ahead / Look behind

- https://www.regular-expressions.info/lookaround.html

## Examples

- Dates (01/01/2034)
- Email (john@doe.fr)
- URL (https://grafikart.fr)  - (https?):\/\/([^\/]+)(.*)

## Utilisation

- Regexp 101
- Dans l'éditeur
- En JS (match, matchAll, exec, replace, replaceAll)
- En PHP (preg_match, preg_replace)

## Pour s'entrainer

- https://alf.nu/RegexGolf
- https://regex101.com/quiz

## Exemple

### Sommaire 

```md
Voici une liste des invités

- Madame Jane Doe née le 3 avril 2010
- Monsieur John Doe née le 4 mars 1920
- Madame Marion Dae né pendant la tempête du 19 avril 1940
```

````
^(?<protocol>https?):\/\/(?<domain>[^\/]+)(?<path>\/.*)$

https://grafikart.fr/blog/demo-aze-3
http://demo.grafikart.fr/blog/demo-aze-32
```

```md
^\d{2}:\d{2} .*$
Article ► https://grafikart.fr/tutoriels/figma-...

00:00 Introduction
00:17 L'interface
00:59 Prototype
02:00 Mode développeur
03:40 Design système & styles
07:00 Les composants
11:55 Auto Layout

Bienvenue dans cette vidéo où je vous propose de découvrir comment vous pouvez utiliser Figma en tant que développeur. L'objectif est de voir les points clés qu'il va falloir analyser lorsque l'on veut intégrer une maquette en HTML / CSS.
```

```
(2[0-3]|[10]\d):([0-5][0-9])

23:40
10:60
12:30
08:20
02:01
```

```
(2[0-3]|[01]?\d):([0-5][0-9])

23:40
10:60
12:30
08:20
02:01
2:01
```

```
"([^"]+)"

<?php 
echo "Ceci est une chaine de caractère";
```

```
(["'])(?:\\.|[^\\])*?\1

<?php 
echo "Ceci est une chaine \"" de caractère";
```
