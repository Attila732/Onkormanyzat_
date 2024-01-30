##NEM fog futni az authorization-server nélkül!!! [MrBrown/groupproject](https://github.com/MrBrown16/Groupproject-backend)<br>

REQUIREMENTS (see package.json): 
- node.js
- npm
- angular
- JAVA 21!!


futtatáshoz: 
- "benti"(Onkormanyzat_/Onkormanyzat_/) Onkormanyzat_ mappában (npm i) ng build --watch<br>
- authorization-server VSCode run / terminal: ./mvnw spring-boot:run
- gateway-frontend ("külső"(Onkormanyzat_/)) VSCode run / mappában terminal: ./mvnw spring-boot:run


Csak angular futtatása lehetséges, de nem fog tudni a backenddel kommunikálni ("belső" mappában ng serve ahogy eddig is.)


első két lépés felcserélhető, a második a harmadik előtt kell legyen!!!<br>


alapértelmezetten jelenleg minden username/password védett, ezt meg lehet változtatni az AuthorizationConfig-ban a ".pathMatchers("/index.html", "/", "*.js", "*.css", "*.ico").permitAll()" kikommentelésével.


alapértelmezett és jelenleg egyetlen felhasználó:
- username: user
- password: pass


FRONTEND PORT: 8081<br>
Authorization server Port: 8083<br>


