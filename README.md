Async Me
======
**Async Me** est un plug-in JS permettant le lazy loading d'images et d'iframe Youtube.

```html
<img src="spinner.png" data-src="votre_image" class="async-me" />
```
## Fonctionnement
### Paramètres

| Attribut       |     Format       |   Default   | Obligatoire |  Description                                              |
| ---:           |           ---:   |      :---:  |     :---:   |                                                      ---: |
| data-src       |    *string*      |      -      |      Oui    | Chemin du média à charger                                 |
| data-time-out  |    *int*         |     null    |      Non    | Délai d'activation du chargment asynchrone                |
| data-effect    |    *string*      |    fadeIn   |      Non    | Effet d'animation (*fadeIn, fadeOut, slideDown, slideUp*) |
| data-speed     |    *int, string* |    fast     |      Non    | Vitesse d'éxécution de l'animation                        |

### Avec l'attribut data
```html
<img class="async-me" src="spinner.png" data-src="votre_image" data-time-out="800" data-effect="fadeOut" data-speed="900" />
```
### En jQuery
```javascript
$('votre_element').asyncMe({
  speed: 900
  timeOut: 800
  effect: 'fadeOut',
});
```
## Version
* Version 1.0

## Contact
#### Developpeur
* Site Web: [devtalk.fr](http://devtalk.fr)
* e-mail: contact@devtalk.fr
* Twitter: [@fj0ker](https://twitter.com/fj0ker)
