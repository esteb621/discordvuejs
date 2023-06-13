# discordvuejs

## Initialiser le projet 

Téléchargez le zip de la branche main depuis le dépot git.

Ensuite, vous devrez avoir installé Node.js sur votre ordinateur

Pour savoir si node.js est installé sur votre ordinateur tapez la commande suivante dans un terminal : 

```
node -v
```

Pour télécharger node.js, allez sur le site suivant : https://nodejs.org/en/download


Vérifiez ensuite votre installation à l'aide de la commande

```
node -v
```

## Lancer le projet en local

### Lancer le serveur
Ouvrez le projet dans un IDE de votre choix

à la racine, lancez la commande suivante : 

```
npm install
```

Pour lancer le serveur : 

```
node server.js
```

Par défaut, le serveur se lance sur le port 8080.

### Lancer le front sans le serveur
Ouvrez un terminal et allez sur le dossier front depuis la racine : 

```
cd discordfront
npm run install
```

ensuite lancez la commande suivante pour lancer le front :

```
npm run serve
```

Le front se lance par défaut sur le port 8080 si le serveur n'est pas lancé.
Si le serveur est lancé, le front se lance sur le port 8081.

## Lancer le projet depuis cyclic

Pour lancer le projet directement depuis cyclic, il suffit d'aller sur https://wild-plum-colt-cuff.cyclic.app/
