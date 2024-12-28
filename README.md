# *CropPredict* : Application de prévision des rendements agricoles


Ce projet vise à développer une application web qui utilise des modèles de machine learning pour prédire les conditions agricoles et recommander des actions optimisées, telles que le choix des cultures à planter, l'irrigation et la fertilisation. 
Les données météorologiques en temps réel, fournies par l'API OpenWeather sont intégrées dans une API centralisée pour générer des recommandations et prédiction  personnalisées. L'application est construite avec un backend Spring Boot et une interface frontend interactive en React.

![Uploading WhatsApp Image 2024-12-28 at 05.03.07.jpeg…]()



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

| *Technologie/Framework*          | *Description*                                                                                             |
|------------------------------------|-------------------------------------------------------------------------------------------------------------|
| 🐍 *Python*                      | Fournit une API backend pour connecter les fonctionnalités d'apprentissage automatique et gérer les requêtes. |
| ☕ *Java*                        | Langage principal utilisé pour le développement backend avec Spring Boot.                                   |
| 💻 *JavaScript*                 | Langage utilisé côté client pour la logique de l'application frontend.                                      |
| 🌦️ *API OpenWeather*           | Utilisée pour récupérer les données météorologiques nécessaires aux prédictions et recommandations agricoles. |
| 🤖 *ML - Prédiction*            | Implémente des modèles d'apprentissage automatique pour prévoir les rendements agricoles en fonction des données saisies. |
| 📊 *ML - Recommandation*        | Génère des recommandations personnalisées pour des cultures agricoles optimales basées sur les données du sol et du climat. |
| 🍃 *Spring Boot*                | Framework backend pour la création de services REST et la gestion des données avec la base MySQL.           |
| 🔒 *Spring Security*            | Assure la sécurité des endpoints avec l'authentification et l'autorisation des utilisateurs.               |
| 📧 *Spring Boot Starter Mail*   | Permet l'envoi de résultats de prédictions et de recommandations personnalisées par e-mail.                |
| 🔑 *JWT (JSON Web Token)*       | Utilisé pour la gestion sécurisée des sessions utilisateur et des autorisations.                           |
| 🗄️ *Base de données MySQL*     | Stocke les données des utilisateurs, prédictions, recommandations et historiques.                          |
| ⚛️ *ReactJS*                   | Framework frontend pour construire une interface utilisateur interactive et réactive.                      |
| 📈 *React-chartjs*              | Permet de visualiser les données sous forme de graphiques interactifs et dynamiques.                       |
| 🎨 *Bootstrap*                  | Utilisé pour créer une interface utilisateur responsive et esthétique grâce à ses composants CSS et JS.    |
| 🐍 *Flask*                      | Fournit une API backend pour connecter les fonctionnalités d'apprentissage automatique et gérer les requêtes. |

# Structure général du projet  : 

L'utilisateur interagit avec une interface frontend développée en React, qui envoie des requêtes au backend construit avec Spring Boot. Ce backend joue le rôle de passerelle, recevant les requêtes du frontend et les transmettant au service Flask si des traitements spécifiques, comme des prédictions ou des recommandations via des modèles de machine learning (ML), sont nécessaires.
<img src="https://github.com/user-attachments/assets/b5c0ceaa-29e6-4aa3-be9d-e1c84d8462b6" alt="structure générale" width="650"/>
### Structure de service Flask* :  
Voici la structure du service Flask.  
<img src="https://github.com/user-attachments/assets/49e05c12-9082-4d3c-8f98-a85ebe3f493d" alt="structure Flask" width="650"/>
### Structure de Backend SpringBoot* :  
Voici la structure du backend Spring Boot.  
<img src="https://github.com/user-attachments/assets/f8556871-e977-4806-8af3-29e6880409c7" alt="structure SpringBoot" width="750"/>


## Configuration Docker 

Ce fichier docker-compose.yml définit la configuration pour déployer une application complète comprenant plusieurs services interconnectés : un frontend React, un backend Spring Boot, une API Flask pour les prédictions, et une base de données MySQL.


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
  mysql-data:

# Configuration des services
### Configuration des services
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
  mysql-data:

```







# Aperçu du projet
Voici un aperçu du projet qui englobe l'ensemble des fonctionnalités que notre projet offre:



# Limitation et perspective 

L'application actuelle a été développée avec un modèle d'apprentissage automatique entraîné sur un jeu de données limité, qui ne couvre que l'Inde. Cette restriction géographique peut affecter la précision des prédictions et recommandations pour d'autres régions du monde, car le modèle manque de diversité en termes de conditions climatiques et de données sur les sols.
L'une des principales perspectives pour améliorer cette application est d'élargir le modèle en l'entraînant sur un jeu de données plus large, comprenant des informations sur plusieurs pays et régions. Cela permettra d'améliorer la précision des prédictions et des recommandations, en prenant en compte une variété de conditions climatiques et agricoles à l'échelle mondiale.

![a9c2618e5941d092042fc3134bc07f79_WhatsApp%20Image%202024-12-28%20at%2004 03 19](https://github.com/user-attachments/assets/b8e8561c-e8fd-4b9b-a838-120b2c796f3d)












# Equipe de projet
Voici Notre équipe de projet 
Errokbi oumaima:errokbi200@gmail.com
Ahrardi wiam: Ahrardiwiam14@gmail.com 

![632e6dc27177fb38a8cdc74eda8335c0_WhatsApp%20Image%202024-12-28%20at%2003 38 11](https://github.com/user-attachments/assets/fe25e961-e1c8-460c-8266-ee286f4a033f)
 
