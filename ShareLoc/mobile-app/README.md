# LP3 - ShareLoc
*KOENIG Clément et WAGNER Thomas*


## Fonctionnement de l'application

### Préambule

ShareLoc est une application mobile développée sous Android Studio et ayant
pour but de créer des colocations entre différentes personnes.

Il est possible d'ajouter des services qui ont été faits, de voter pour ou
contre leur réalisation, de consulter la liste des membres d'une colocation, de
leur envoyer des messages, ...


### Structure

L'application comporte de nombreuses activités :

- `SplashScreen` : cette activité se lance à l'ouverture de l'application et se
charge de regarder si un utilisateur est connecté ou non
- `AuthActivity` : l'activité regroupant les fragments d'inscription et de 
connexion
- `MainActivity` : c'est l'activité principale, elle affiche la barre de navigation
les fragments correspondants
- `ColocationDetails` : regroupe les détails d'une colocation (membres, services 
et messages)
- `ServicesDetails` : affiche les détails d'un service
- `AddServiceForm` : l'activité permettant d'ajouter un nouveau service au sein
d'une colocation
- `AchievedServiceDetails` : affiche les détails d'un service effectué


Et elle est découpée en 3 parties :

- La liste des invitations
- La liste des colocations dont on fait partie
- Notre profil


## Choix de développements

### Packaging 

Nous avons essayé de respecter la structure MVC (Modèle - Vue - Contrôleur) :
- `Adapter` : comme nous avons utilisé beaucoup de RecyclerView dans l'application,
nous avons décidé de regrouper leur Adpater dans un dossier à part
- `Controller` : il y a une classe par modèle, et c'est elle qui s'occupe de faire
des requêtes à l'API afin de récupérer des données
- `Model` : les modèles de données
- `Utils` : les classes dites utilitaires, qui sont utilisées à plusieurs endroits
dans l'application (**ex:** une classe pour valider des formulaires, une pour faire
des requêtes avec Volley, une autre pour utiliser les SharedPreferences, ...)
- `View` : contient les activités et les fragments

### Librairie graphique

L'application reprend des composants de la librairie [Material.io](https://material.io/develop/android/)
développée par Google.


### Gestion des utilisateurs

Afin de stocker l'utilisateur connecté, nous avons stocké son profil dans les
*SharedPreferences*, qui est une solution très facile à implémenter. De plus,
l'API a besoin d'un *token* pour authentifier la personne éxécutant une requête,
il est donc également stocké dans les SharedPreferences.


### Requêtes HTTP

Afin de communiquer facilement avec l'API, nous avons utilisé la librairie *Volley*.
Nous avons codé une classe utilitaire *VolleyRequest* qui est un singleton et qui
permet de gérer de manière asynchrone les requêtes HTTP.

Qui dit asynchrone dit callback, nous avons donc 2 interfaces que nous implémentons
lorsque nous avons besoin de faire des requêtes à l'API. Elles permettent toutes les
deux d'éxécuter du code une fois que la requête est terminée et de savoir si elle 
a réussi ou échoué. L'une d'entre elle renvoie un simple *JSONObject* tandis que
l'autre retourne un *JSONArray*.


### RecyclerView 

Comme il y a beaucoup de liste d'éléments dans l'application, nous avons dû utiliser
de nombreuses fois des *RecyclerView*. Cependant il ne permettent pas de gérer le 
click sur un item ni d'afficher une vue lorsqu'il est vide. C'est pour cela que
nous avons créé les classes utilitaires *RecyclerItemClickListener* et *EmptyRecyclerView*.



## Problèmes rencontrés

Nous n'avons pas eu de problème majeur qui nous a bloqué lors du développement
de l'application, mais nous avons eu quelques difficultés à communiquer entre
les fragments/activités. Nous avons réussi à contourner cela en créant des méthodes
`static` dans certain(e)s fragments/activités et en les appelant au besoin dans les fragments 
fils, mais cela est un peu contradictoire avec le principe des fragements puisqu'ils
sont sensés être réutilisables à des endroits différents.

De plus, nous n'avons pas eu énormement de temps pour coder cette application,
la partie sur les votes et la déclaration d'un service effectué n'est donc pas 
très propre et pourrait être largement améliorée.