Önkormányzat
2023.11.10






Fejlesztők: Móra Barna, Szabó Szebasztián, Kovács Attila
Móra Barna: Backend
Kovács Attila: Frontend
Szabó Szebasztián: Telefonos nézet


Projekt célja
A projekt célja, hogy a kevesebb költségvetéssel dolgozó városok is kaphassanak egy alap weboldal ami átlátható és csak a legszükségesebb dolgok szerepelnek rajta. Emellett célunk, hogy a város lakói értesüljenek megfelelő időben a város által szervezett programokon és, hogy részt vehessenek ezeken. Így a város élete is fejlődik. Ezen túl van lehetőség bejelentésre is. Itt gyakorlatilag a város vezetése felé kommunikál a városlakó. Esetleg egy eltört csap ami az utcára folyik vagy egy szemétlerakó hely vagy vízkimaradás. Valamint van még egy fontos funkció ami segíti a város kommunikációját ez a meghirdetett termék és az eladni kívánt termék. A meghirdetett termékek ingyenesen elvihetők így talán a szemetelést el lehet kerülni minimálisan. Hiszen ami neked szemét másnak még lehet arany. Ezen túl természetesen pénzért is lehet hirdetni.

Licencek: Hiányzik

Felhasznált technológiák :
-Angular
-Bootstrap
-Springboot













Dokumentáció
Frontend

1)	body componens
-Ez a komponens maga a kezdőlap ahol megjelennek az információk, hírek. 
-A helyi és lokális hírek pirossal
-Az országos hírek pedig kékkel
-Zölddel jelennek meg a programok. A programoknál fontos hogy van időpont és rövid leírás is. Amit a program szervezésénél hoznak létre a vállalati regisztrált fiókok.
-ezeket a híreket az admin szerkesztheti. Törölheti és rakhat fel újakat.
2) btccomp componens
	-Ez a komponens a teszteket segíti
	-Egyes feladatokat amiket nem szeretnénk élesben tesztelni itt hozunk létre
	-Képfeltöltés bejelentkezés stb..
3) elado-termek componens
	-Elsősorban lehet hirdetni ingyenesen vagy pénzért tárgyakat
-Ha érdekel az adott tárgy az érdekel gombra kattintva lehet az elérhetőségét az eladónak elérni.



Tartalomjegyzék
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
- (ha tényleg kommunikálni akartok a backenddel(resource-serverrel) akkor azt is el kell indítani) SEE: [MrBrown/groupproject](https://github.com/MrBrown16/Groupproject-backend)

Csak angular futtatása lehetséges, de nem fog tudni a backenddel kommunikálni ("belső" mappában ng serve ahogy eddig is.)


első két lépés felcserélhető, a második a harmadik előtt kell legyen!!!<br>


alapértelmezetten jelenleg minden username/password védett, ezt meg lehet változtatni az AuthorizationConfig-ban a ".pathMatchers("/index.html", "/", "*.js", "*.css", "*.ico").permitAll()" kikommentelésével.


alapértelmezett felhasználók:
- username: user
- password: pass
- ROLES: ROLE_USER
- username: admin
- password: pass
- ROLES: ROLE_USER, ROLE_ADMIN


FRONTEND PORT: 8081<br>
Authorization server Port: 8083<br>





