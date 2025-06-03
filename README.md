# Informatika

Sanja Muršič, Tara Sedovšek, Kaja Vidmar

## Vizija

Naša vizija je razviti inteligenten iskalnik, ki bo podjetju Informatika omogočil učinkovitejše upravljanje s storitvenimi zahtevki na podlagi preteklih izkušenj. S pomočjo metod strojnega učenja bomo iz zgodovinskih podatkov podjetja Informatika izluščile vzorce in povezave med težavami, rešitvami in konteksti, v katerih so se pojavile.

S tem bomo omogočile hitro in natančno iskanje podobnih primerov iz preteklosti, kar bo zaposlenim v podporni ekipi omogočilo, da:

- hitreje prepoznajo naravo trenutne težave,
- preverijo, kako so bile podobne težave v preteklosti rešene,
- izkoristijo že pridobljeno znanje in izkušnje podjetja,
- izboljšajo odzivne čase in kakovost storitev.

Naš cilj je podpreti organizacijsko učenje, zmanjšati podvajanje dela in povečati operativno učinkovitost, hkrati pa zgraditi sistem, ki se z uporabo samodejno izboljšuje in prilagaja specifičnim potrebam podjetja.

## Podatki za delo

Podatki, ki jih uporabljamo za delo, zaradi kočljivih informacij ne morejo biti na javnem repozitoriju. Zaradi lažje predstave pa osnovna mapa repozitorija vsebuje vzorčni primer podatkov. Vzorčni podatki so seveda neresnični.

<!-- V drive-u so dodani podatki v treh mapicah:

1. originalne datoteke
2. počiščen html
3. zdruzeni podatki
   - tabele združene v en data set, odstranjen stolpec.
   - za nadaljnjo analizo se morajo uporabljati ti podatki! -->

## Namestitev in zagon projekta

1. _Predpogoji_ <br>
   Za namestitev je nujno potrebno, da je na računalniku nameščeno naslednje:
   1. Node.js in npm <br>
      Node.js verzija 14 ali višja, npm verzija 6 ali višja
   - namestitev: https://nodejs.org/en
   - preverjanje namestitev v terminalu: `node -v` in `npm -v`
   2. Git <br>
      Potreben je za kloniranje repozitorija
   - namestitev: https://git-scm.com/downloads
   - preverjanje namestitve z ukazom: `git --version`
   3. Python 3.8+
   4. pip
2. _Kloniranje repozitorija_ z ukazi

   - `git clone https://github.com/Tara2712/Informatika.git`
   - `cd Informatika`

3. _Zagon python api-ja_ z naslednjimi ukazi:

   - `cd Informatika`
   - `cd ML_api`
   - `mkdir data` - ustvari novo mapo za podatke (podatki ne morejo biti na gitu)
   - v data dodaj datoteko df_no_nan_img.csv
   - `python -m venv venv`
   - `source venv/bin/activate` (macOS/Linux) ALI `venv\Scripts\activate` (Windows)
   - `pip install -r requirements.txt`
   - `uvicorn main:app --reload` (zagon API-ja)
     - na tem koraku se mora počakati malenkost dlje, da se lahko model nauči na podatkih

4. _Zagon zaledja (backenda)_ z naslednjimi ukazi:

   - `cd ml_backend`
   - `npm install`
   - `node server.js`

5. _Zagon pročelja (frontenda)_ z naslednjimi ukazi:

   - `cd Informatika`
   - `cd frontend`
   - `npm install` - inštalira node_modules, ki so potrebni za zagon backenda
   - `npm run dev` - zažene frontend

<!-- ## Zagon frontenda

1. cd /informatika/Frontend
2. npm i
3. npm start

## Dokaj dober primer podatka - 219 vrstica, dokument: zdruzen_brez_dolzine -->



<!-- >
Unit testi - zagon:
- `cd Informatika`
- `cd ML_api` 
- `python -m venv venv` - samo če še nisi prej
- `source venv/bin/activate` (macOS/Linux) ALI `venv\Scripts\activate` (Windows)
- `pip install -r requirements.txt`
- `python -m pytest`
-->