BACKEND SETUP

1. install postgreSQL https://www.postgresql.org/download/
   
    1.1 regualr port nuber 5432, remeber password for superuser

    1.2 install takes like 10 minutes
   
    1.3 no stack builder stuff just close it
   
    1.4 check programs to see if you have pgadmin 4
   

3.  Open pgAdmin 4 (should just be a normal progarm, search using bottom left ssearch on windows type thing)
   
    2.05 click on drop down for servers on the left
    
    2.1 sign in using superuser password
    
    2.2 go Servers --> databases on the left
    
    2.3 right click databases and create new database, name it FlickPick
    
    2.4 should be able to see another database just like postgres

6. create .env in /FlickPick folder in this project
   
    3.1 paste this
    SECRET_KEY=django-insecure-8t#9vb5g_j3pcf4qg!=!#(rnw@=u0-$kygjm=a4l#(718$h$#a

    DB_NAME=FlickPick

    DB_USER=

    DB_PASSWORD=
    
    DB_HOST=localhost

    DB_PORT=5432
   
    3.2 add DB_USER ('postgres' by default) and DB_PASSWORD (superuser password)

    3.3 pip install django
   
    3.4 pip install django-environ
   
    3.5 pip install djangorestframework
   
    3.6 pip install psycopg2

    3.61 python -m pip install django-cors-headers

    3.62 pip install py-bcrypt
   
    3.4 in Project/FlickPick: python manage.py makemigrations (if issues make sure port on .env matches port on pgadmin right click postgres 16 -> properties)
   
    3.5 python manage.py migrate
   
    3.6 check pgadmin postgres 16 -> databases -> FlickPick -> Schemas -> Tables (should see 13 tables of api_movies etc)

8.  copy datainit.txt code

10. go to pgadmin4 click query tool button near top left
11. paste sql code
12. run query (should get INSERT 0 398)
13. in vscode terminal: python manage.py runserver
14. go to this url to see if the api is workinig http://127.0.0.1:8000/api/movies

FRONTEND SETUP
1. go to Project/FlickPick/app/frontend
3. npm install -D tailwindcss
4. npx tailwindcss init

HOW TO START APPLICATION
1. terminal in Project/FlickPick
1.1 run: python manage.py runserver

2. terminal in Project/FlickPick/app/frontend
2.1 run: npm start
