
# L3C Accessibility Widget V4

## Intégration rapide

Ajoutez cette ligne dans le `<head>` ou juste avant `</body>` de votre page HTML :

```html
<script src="https://votre-cdn.com/widget.js" data-account="MON_ID_UNIQUE" defer></script>
```

## Attribut `data-account`

Permet de personnaliser :
- `themeColor` (couleur principale du bouton)
- `position` (`right` ou `left`)
- `language` (`fr`, `en`, ...)
- `logo` (URL du logo à afficher)

## Fonctionnalités MVP

- Taille de police (+ / -)
- Contraste élevé / inversé
- Police dyslexie-friendly
- Soulignement des liens
- Lecture du texte sélectionné
- Stopper les animations
- Sauvegarde des préférences via localStorage

## Exigences d’accessibilité

- Navigation clavier (Tab, Entrée, Échap)
- Rôles ARIA et labels
- Compatible lecteurs d’écran

## Licence

MIT License. Voir le fichier `LICENSE`.
