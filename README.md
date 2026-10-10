# osm-bzh-kartenn

Visualiseur cartographique du service de tuiles OpenStreetMap en langue bretonne
(<https://tile.openstreetmap.bzh/br/>), basé sur [mviewer](https://github.com/mviewer/mviewer) v4.1.

L'application est un site statique (HTML/JS) : aucune étape de compilation, il suffit de servir le dossier
avec un serveur web.

## Fonctionnalités

### Fonds de plan

Le bouton en bas à droite de la carte ouvre une galerie de fonds de plan :

| Fond | Source | Zoom max |
|---|---|---|
| **OpenStreetMap e brezhoneg** (par défaut) | `https://tile.openstreetmap.bzh/br/{z}/{x}/{y}.png` | 18 |
| OpenStreetMap FR | `https://{a-c}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png` | 20 |
| OpenStreetMap standard | `https://tile.openstreetmap.org/{z}/{x}/{y}.png` | 19 |
| Plan IGN | WMTS Géoplateforme, couche `GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2` | 19 |
| Photographie aérienne | WMTS Géoplateforme, couche `ORTHOIMAGERY.ORTHOPHOTOS` | 19 |

La carte est limitée au zoom 18 (limite du fond breton). Les vignettes de la galerie sont dans `img/basemap/`.

### Couche « Klokter ar gartenn »

Surcouche de contrôle OSM Breizh (`https://tile.openstreetmap.bzh/br_control/{z}/{x}/{y}.png`), disponible dans le
panneau de gauche, thématique « Kartenn ».

- elle est **désactivée au départ** : il faut la cocher ;
- elle n'est **affichée que jusqu'au zoom 12 inclus** (`maxZoom: 12`) ;
- elle est déclarée par un script `customlayer` : [apps/customlayers/osm_br_control.js](apps/customlayers/osm_br_control.js).

### Recherche de lieux

La barre de recherche interroge le service [Nominatim](https://nominatim.org/) d'OpenStreetMap
(`https://nominatim.openstreetmap.org/search`) :

- les résultats ne sont **pas limités à l'emprise de la carte** (`bbox="false"` dans `<searchparameters>`) ; avec
  `bbox="true"`, la recherche est restreinte à la vue affichée (`viewbox` et `bounded=1`) ;
- les noms sont demandés **en breton** (`accept-language=br`) ;
- un clic sur un résultat **zoome au niveau 18** (`searchmaxzoomlevel`) et place un repère ;
- la recherche se déclenche 500 ms après la dernière frappe.

> Le service public Nominatim est limité à 1 requête par seconde et déconseille la recherche au fil de la frappe.
> En cas de trafic important, passer le délai `timeoutToWait` de `js/search.js` à 1000 ms ou plus, ou utiliser
> sa propre instance.

### Outils de la carte

- zoom avant / arrière, **zoom par double-clic**, retour à l'étendue de départ, localisation de l'utilisateur ;
- **mesure** de distances et de surfaces ;
- **partage** de la carte (permalien, QR code, code d'intégration en iframe) ;
- **export de la carte en image PNG** et **impression** de la vue courante ;
- affichage des coordonnées de la souris ;
- légende et panneau des thématiques.

### Interface en breton

L'interface est en breton par défaut (`lang="br"`). La traduction est dans le bloc `br` de
[mviewer.i18n.json](mviewer.i18n.json), qui a les mêmes clés que le bloc français (`fr`).

Pour une nouvelle clé non encore traduite, la convention est de garder le texte français suivi de ` (TODO)` ;
on les retrouve avec :

```bash
grep -n "(TODO)" mviewer.i18n.json
```

Méthode utilisée : chaque texte français est décomposé en termes, cherchés dans le lexique An Drouizig
(`gerva-an-drouizig-2017.csv`) puis sur [geriafurch.bzh](https://geriafurch.bzh/fr) (Termofis en priorité, puis
Brezhoneg21 et Preder). Les phrases complètes ont ensuite été relues à la main.

### Zoom au double-clic

Un double-clic sur la carte zoome d'un niveau. mviewer le désactive en dur dans son code ; il est réactivé dans
`js/mviewer.js` (ajout d'un écouteur sur les interactions de la carte). Il est **suspendu automatiquement pendant
les outils de mesure et de dessin**, où le double-clic sert à terminer un tracé, puis rétabli à la fin du tracé.

À reporter en cas de mise à jour de mviewer.

### Fenêtre de documentation

Elle s'ouvre au chargement (`showhelp="true"`). Son contenu est dans [mviewer_help.html](mviewer_help.html)
(onglets « Raktres » et « Kredoù »). Un interrupteur permet à chaque visiteur de ne plus l'afficher au démarrage
(mémorisé dans le navigateur).


### Recherche

La recherche utilise le service Nominatim, basé sur les données OpenStreetMap.

La configuration se fait dans `js/search.js` :

- le libellé des résultats utilise `display_name` (mviewer ne lit que le format `label` du géocodeur de l'IGN) ;
- avec Nominatim, les paramètres `viewbox` et `bounded` limitent les résultats à l'emprise de la carte ;
- le zoom après un clic sur un résultat vient de `searchmaxzoomlevel`.

À reporter en cas de mise à jour de mviewer.


## Utilisation

Test en local :

```bash
python3 -m http.server 8099
```

puis ouvrir <http://localhost:8099/>. Pour la mise en ligne, servir le dossier avec n'importe quel serveur web
statique. Après une modification, vider le cache du navigateur (`Cmd+Shift+R`).

## Configuration

Toute la configuration de l'application est dans [apps/default.xml](apps/default.xml) :

| Élément | Rôle |
|---|---|
| `<application>` | titre, logo, langue, outils actifs, fenêtre d'aide |
| `<mapoptions>` | projection, centre, zoom initial, zoom maximal |
| `<baselayers>` | fonds de plan |
| `<searchparameters>` et `<olscompletion>` | recherche de lieux (Nominatim) |
| `<themes>` | couches thématiques (ici « Klokter ar gartenn ») |

Documentation de mviewer : <https://mviewerdoc.readthedocs.io/fr/stable/>.

## Organisation du dépôt

```
apps/default.xml              configuration de l'application
apps/customlayers/            couches personnalisées (script JS)
mviewer.i18n.json             traductions de l'interface (fr, en, de, sk, br)
mviewer_help.html             contenu de la fenêtre de documentation
img/basemap/                  vignettes des fonds de plan
js/, css/, lib/, pages/       code de mviewer
tools/                        outils annexes (comparaison de cartes, schéma de tuiles)
```

## Licences et crédits

- mviewer est sous licence GPL (voir `LICENSE.mviewer` et `CREDITS.mviewer`).
- Données : © les contributeurs d'[OpenStreetMap](https://www.openstreetmap.org/copyright) (ODbL).
- Fonds IGN : © IGN - Géoplateforme.
- Projet [OpenStreetMap.bzh](https://openstreetmap.bzh/), avec l'Office public de la langue bretonne.
