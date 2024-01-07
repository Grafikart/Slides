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
