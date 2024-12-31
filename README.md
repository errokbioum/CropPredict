# *CropPredict* : Application de prévision des rendements agricoles


Ce projet vise à développer une application web qui utilise des modèles de machine learning pour prédire les conditions agricoles et recommander des actions optimisées, telles que le choix des cultures à planter, l'irrigation. 
Les données météorologiques en temps réel, fournies par l'API OpenWeather sont intégrées dans une API centralisée pour générer des recommandations et prédiction  personnalisées. L'application est construite avec un backend Spring Boot et une interface frontend interactive en React et un service Flask basé sur ML.

![WhatsApp Image 2024-12-28 at 05 03 07](https://github.com/user-attachments/assets/7b56f643-575b-45f0-a975-51b45ddd67ce)

# Table des Matières

- [Fonctionnalités principales](#fonctionnalités-principales)  
- [Technologies et Outils Utilisés](#technologies-et-outils-utilisés)  
- [Structure général du projet](#structure-général-du-projet) 
- [Configuration Docker](#configuration-docker) 
- [Aperçu du projet](#aperçu-du-projet)  
- [Limitation et perspective ](#limitation-et-perspective)  
- [Équipe de Projet](#equipe-de-projet)  
 
---



# Fonctionnalités principales

-S'authentifier : 
   Les utilisateurs peuvent se connecter à leur compte via une page dédiée. Une fois authentifiés, ils accèdent à des fonctionnalités protégées, telles que les pages de prédictions et de recommandations.

-Creé un compte : Les nouveaux utilisateurs peuvent s'inscrire en fournissant leurs informations personnelles pour accéder à l'application.

 -Prédire un rendement: L'application permet de prédire le rendement agricole en fonction des données saisies.

-Recevoir des recommandations agricoles: Génération de recommandations pour choisir une culture optimale, basée sur les données spécifiques au sol et au climat de l'utilisateur.

-Consulter une liste de recommandations triée: Les utilisateurs peuvent accéder à une liste organisée de recommandations, avec les dates associées à chaque suggestion.

-Consulter une liste de prédictions triée: Une liste des prédictions est disponible, triée par date, permettant de suivre l'historique des analyses.

-Envoyer une prédiction personnalisée par mail: Les utilisateurs peuvent envoyer les résultats de leurs prédictions directement à leur adresse e-mail.

-Envoyer une recommandation personnalisée par mail: Les utilisateurs ont la possibilité d'envoyer les résultats de leurs recommandations à leur adresse e-mail.


## Technologies et Outils Utilisés

### *Langage utlisée* : 
| **Section**      | **Technologie/Framework**       | **Description**                                                                                             |
|-------------------|---------------------------------|-------------------------------------------------------------------------------------------------------------|
| **Backend**       | ☕ *Java*                      | Langage principal utilisé pour le développement backend avec Spring Boot.                                   |
|                   | 🍃 *Spring Boot*              | Framework backend pour la création de services REST et la gestion des données avec la base MySQL.           |
|                   | 🔒 *Spring Security*          | Assure la sécurité des endpoints avec l'authentification et l'autorisation des utilisateurs.               |
|                   | 🔑 *JWT (JSON Web Token)*     | Utilisé pour la gestion sécurisée des sessions utilisateur et des autorisations.                           |
|                   | 🗄️ *Base de données MySQL*   | Stocke les données des utilisateurs, prédictions, recommandations et historiques.                          |
|                   | 📧 *Spring Boot Starter Mail* | Permet l'envoi de résultats de prédictions et de recommandations personnalisées par e-mail.                |
| **Service**       | 🐍 *Python*                   | Fournit des fonctionnalités d'apprentissage automatique et gère les requêtes nécessaires.                  |
|                   | 🐍 *Flask*                    | Framework léger pour connecter les fonctionnalités d'apprentissage automatique et gérer les requêtes.      |
|                   | 🤖 *ML - Prédiction*          | Implémente des modèles d'apprentissage automatique pour prévoir les rendements agricoles en fonction des données saisies. |
|                   | 📊 *ML - Recommandation*      | Génère des recommandations personnalisées pour des cultures agricoles optimales basées sur les données du sol et du climat. |
|                   | 🌦️ *API OpenWeather*         | Utilisée pour récupérer les données météorologiques nécessaires aux prédictions et recommandations agricoles. |
| **Frontend**      | ⚛️ *ReactJS*                 | Framework frontend pour construire une interface utilisateur interactive et réactive.                      |
|                   | 🎨 *Bootstrap*                | Utilisé pour créer une interface utilisateur responsive et esthétique grâce à ses composants CSS et JS.    |
|                   | 📈 *React-chartjs*            | Permet de visualiser les données sous forme de graphiques interactifs et dynamiques.                       |

# Structure général du projet 

L'utilisateur interagit avec une interface frontend développée en React, qui envoie des requêtes au backend construit avec Spring Boot. Ce backend joue le rôle de passerelle, recevant les requêtes du frontend et les transmettant au service Flask si des traitements spécifiques, comme des prédictions ou des recommandations via des modèles de machine learning (ML), sont nécessaires.


![chggr](https://github.com/user-attachments/assets/25625c28-d9f8-4d6c-b9b9-42ff33bb2b54)



### Structure de service Flask :


Voici la structure du service Flask.  

<img src="https://github.com/user-attachments/assets/02d73209-a32f-4c37-b871-3d032d56e572" alt="chgr2" width="600" />


### Structure de Backend SpringBoot :  
Voici la structure du backend Spring Boot. 
<img src="https://github.com/user-attachments/assets/df00d94d-e3f6-4d27-b28b-1e98eb7bc6b0" alt="chgr2" width="850" />




## Configuration Docker 

Ce fichier docker-compose.yml définit la configuration pour déployer une application complète comprenant plusieurs services interconnectés : un frontend React, un backend Spring Boot, une API Flask pour les prédictions, et une base de données MySQL.


```
yaml
services:
  front:
    build:
      context: ./front
    ports:
      - "3000:3000"
    networks:
      - app-network
    depends_on:
      - cropapp2
    environment:
      - REACT_APP_API_URL=http://localhost:9192

  cropapp2:
    build:
      context: ./Cropapp2
    ports:
      - "9192:9192"
    networks:
      - app-network
    depends_on:
      - mysql
      - apiprediction1
    environment:
      - SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/cropyield?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
      - SPRING_DATASOURCE_USERNAME=root
      - SPRING_DATASOURCE_PASSWORD=root
      - FLASK_API_URL=http://apiprediction1:5000
      - SPRING_MAIL_USERNAME=errokbi200@gmail.com
      - SPRING_MAIL_PASSWORD=ckhw pjho cvwo mami
      - SPRING_SECURITY_USER_NAME=testuser
      - SPRING_SECURITY_USER_PASSWORD=testpassword

  apiprediction1:
    build:
      context: ./apiprediction1
    ports:
      - "5000:5000"
    networks:
      - app-network

  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: cropyield
    ports:
      - "3307:3306"
    networks:
      - app-network
    volumes:
      - mysql-data:/var/lib/mysql
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 10s
      retries: 5

networks:
  app-network:
    driver: bridge

volumes:
  mysql-data
```

## Démarrage



- Prérequis :
*Git* :
Assurez-vous d’avoir Git installé. Si ce n’est pas le cas, téléchargez et installez-le depuis git-scm.com.
*XAMPP* :

Installez XAMPP depuis apachefriends.org.
Lancez les serveurs Apache et MySQL dans XAMPP.
Assurez-vous que MySQL utilise le port 3306.
Node Version Manager (NVM) :
Installez NVM depuis *github.com/nvm-sh/nvm.*
Utilisez NVM pour installer la version 14.11.0 de Node.js :
```
bash nvm install 14.11.0
Python 3.9.10 :
```
Installez Python 3.9.10 depuis python.org.
Configuration du Backend (Spring Boot) :
Cloner le projet :
Exécutez la commande suivante pour cloner le dépôt :
```
bash git clone <repository_url> && cd <project_folder>
```
Installer les dépendances du Backend :
Allez dans le dossier du backend et exécutez la commande suivante pour installer les dépendances :
```
bash mvn clean install
```
- Exécuter le Backend Spring Boot :
Lancez les serveurs Apache et *MySQL* dans *XAMPP.*
Exécutez l'application Spring Boot avec :
```
bash mvn spring-boot:run
```
Vérifiez que le backend fonctionne en visitant *http://localhost:9192* dans votre navigateur.
Configuration de l'API Flask (en écoute sur le port 5000) :
Installer les dépendances Python :

Créez un environnement virtuel Python et installez Flask ainsi que toutes les autres dépendances nécessaires :
```
bash python3 -m venv venv
```
Activez l’environnement virtuel :
```
Sur macOS/Linux : bash source venv/bin/activate
Sur Windows : bash venv\Scripts\activate
```
Installer les dépendances Python depuis requirements.txt 


Exécutez la commande suivante pour installer les dépendances à partir du fichier requirements.txt :
```
bash pip install -r requirements.txt
```
Exécuter l'API Flask :

Après avoir configuré Flask, exécutez l'API Flask avec :
```
bash python app.py
```
L'API Flask sera accessible sur http://localhost:5000.
Configuration du Frontend (React) :
Installer React :
Ouvrez un terminal pour le projet frontend et assurez-vous que NVM utilise la version 14.11.0 de Node.js :
```
bash nvm use 14.11.0
```
Installez React globalement avec la commande suivante :
```
bash npm install -g create-react-app
```
Créer une application React :

Exécutez la commande suivante pour créer une nouvelle application React :
```
bash npx create-react-app .
```
Installer les dépendances du Frontend :
Allez dans le dossier du projet frontend et installez les dépendances nécessaires avec :
```
bash npm install
```
Si vous rencontrez des erreurs pendant l'installation, utilisez :
```
bash npm install --save --legacy-peer-deps
```
Exécuter le Frontend :

Après avoir installé les dépendances, lancez le serveur de développement React avec :
bash npm start
Votre application React sera désormais disponible sur *http://localhost:3000.*

Configuration Full-Stack :
| **Composant**          | **Technologie**    | **URL**                 |
|------------------------|--------------------|-------------------------|
| Frontend               | React              | http://localhost:3000   |
| Backend Spring Boot    | Spring Boot        | http://localhost:9192   |
| API Flask              | Flask              | http://localhost:5000   |


Maintenant, votre projet full-stack devrait être en cours d'exécution localement. Si vous rencontrez des problèmes, vérifiez les journaux de la console pour des messages d'erreur et assurez-vous que toutes les dépendances et prérequis sont correctement installés.




---
# Aperçu du projet
Voici un aperçu du projet qui englobe l'ensemble des fonctionnalités que notre projet offre:


https://github.com/user-attachments/assets/95e6f84b-c914-41e5-a1ba-ca446e3ff708



# Limitation et perspective 

L'application actuelle a été développée avec un modèle d'apprentissage automatique entraîné sur un jeu de données limité, qui ne couvre que l'Inde. Cette restriction géographique peut affecter la précision des prédictions et recommandations pour d'autres régions du monde, car le modèle manque de diversité en termes de conditions climatiques et de données sur les sols.
L'une des principales perspectives pour améliorer cette application est d'élargir le modèle en l'entraînant sur un jeu de données plus large, comprenant des informations sur plusieurs pays et régions. Cela permettra d'améliorer la précision des prédictions et des recommandations, en prenant en compte une variété de conditions climatiques et agricoles à l'échelle mondiale.

![WhatsApp Image 2024-12-28 at 04 03 19](https://github.com/user-attachments/assets/1592d73b-1884-4164-be7b-d42a69d2bf08)















---
# Equipe de projet
Voici Notre équipe de projet 
Errokbi oumaima:errokbi200@gmail.com
Ahrardi wiam: Ahrardiwiam14@gmail.com 

![image](https://github.com/user-attachments/assets/a6bfbead-db1d-4b5f-9978-cc5342da466d)

 
