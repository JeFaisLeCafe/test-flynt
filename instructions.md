Voici le test technique que nous te proposons. Nous avons réalisé le squelette d'une application de gestion de liste de courses 🛒.

Le but de l'application est, en fonction d'une liste d'ingrédients et d'une liste de recettes, de créer automatiquement la liste de course associée.

Le test est en pièce jointe dans un zip. Tout est indiqué pour lancer le projet.

Une fois lancée, l'exercice est en trois étapes.

Donner un avis critique. Pas besoin d'écrire de code pour cette partie, il te suffit de critiquer le test d'un point de vue architectural / bonnes pratiques de code ...

Résoudre le bug suivant : Lorsqu'on ajoute un ingrédient et qu'on clique sur submit, la liste ne se met pas à jour automatiquement, il faut rafraichir la page pour le voir apparaître.

Ajouter un système de tag : Chaque ingrédient doit porter un tag : “légumes”, “protéine” ou “féculent”. Ce système doit respecter ces règles de gestion:

Dans une recette, il ne peut y avoir:

une ou aucune protéine
un féculent
autant de légumes que vous voulez
Les protéines ne peuvent apparaître qu’une seule fois dans chaque recette.

Par ex: Si tu as un ingrédient : “viande rouge” et deux recettes. La première recette pourra contenir “viande rouge” mais pas la deuxième.

Il est possible de modifier le tag d’un ingrédient mais, dans ce cas, un message doit s’afficher en indiquant toutes les recettes qui ne sont plus conformes aux règles précédemment citées.

Réalise ce que tu peux faire, dans le temps que tu as, en expliquant, si tu n’as pas le temps de finir, comment tu aurais fait la suite.