### Tech 
- typescript
- node + express
- mysql

### Installation
1. `git clone https://github.com/tomaszburas/zad_rek.git`
2. import `zad_rek.sql` file to your mysql client
3. install dependencies with the command `npm i`
4. configure the project in `config.ts` file
5. run the project with the command `npm start`

### Authentication
User authentication is supported by Passport-Jwt

### Endpoints
1. GET `/`
   ![/](https://i.imgur.com/3duBELc.jpg "/")


2. POST `/register`
   ![/register](https://i.imgur.com/Wp89LWE.jpg "/register")


3. POST `/login`
   ![/login](https://i.imgur.com/RGE6he3.jpg "/login")


5. GET `/starwars/getall`
   ![/starwars/getall](https://i.imgur.com/2aNjiBn.jpg "/starwars/getall")


6. GET `/starwars/getfiltered`
   ![/starwars/getfiltered](https://i.imgur.com/h8mJbyU.jpg "/starwars/getfiltered")
Use Query String to filter people.
for example: `/starwars/getfiltered?hair_color=blond&eye_color=blue`
![/starwars/getfiltered?hair_color=blond&eye_color=blue](https://i.imgur.com/Uld0MN5.jpg "/starwars/getfiltered?hair_color=blond&eye_color=blue")


7. GET `/weather/get`
   ![/weather/get](https://i.imgur.com/HRyfEdd.jpg "/weather/get")
   

