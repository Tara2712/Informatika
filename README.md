![alt text](image.png)

Sanja Muršič, Tara Sedovšek, Kaja Vidmar

## 🌟Vizija

Naša vizija je razviti inteligenten iskalnik, ki bo podjetju Informatika omogočil učinkovitejše upravljanje s storitvenimi zahtevki na podlagi preteklih izkušenj. S pomočjo metod strojnega učenja bomo iz zgodovinskih podatkov podjetja Informatika izluščile vzorce in povezave med težavami, rešitvami in konteksti, v katerih so se pojavile.

S tem bomo omogočile hitro in natančno iskanje podobnih primerov iz preteklosti, kar bo zaposlenim v podporni ekipi omogočilo, da:

- hitreje prepoznajo naravo trenutne težave,
- preverijo, kako so bile podobne težave v preteklosti rešene,
- izkoristijo že pridobljeno znanje in izkušnje podjetja,
- izboljšajo odzivne čase in kakovost storitev.

Naš cilj je podpreti organizacijsko učenje, zmanjšati podvajanje dela in povečati operativno učinkovitost, hkrati pa zgraditi sistem, ki se z uporabo samodejno izboljšuje in prilagaja specifičnim potrebam podjetja.

## ✨ Funkcionalnosti

Aplikacija omogoča pametno iskanje po storitvenih zahtevkih podjetja z uporabo metod strojnega učenja. Glavne funkcionalnosti vključujejo:

🔍 Iskanje po zgodovinskih storitvenih zahtevkih
Uporabniki lahko iščejo obstoječe zahtevke na podlagi naziva SR oziroma ID-ja.

🤖 Iskanje podobnih zahtevkov z uporabo strojnega učenja
Sistem uporablja vnaprej naučen model za pretvorbo zahtevkov v vektorske predstavitve in primerjavo semantične podobnosti. Rezultat je seznam najbolj podobnih zahtevkov glede na ujemanje.

🧩 Podpora za organizacijsko učenje
Sistem omogoča ponovno uporabo znanja, zmanjšuje podvajanje dela in prispeva k večji operativni učinkovitosti.

🔁 Samoprilagodljivost
Z nadaljnjo uporabo in morebitno razširitvijo sistema se model lahko prilagodi specifičnim potrebam organizacije in postane še bolj natančen.

## 📑 Podatki za delo

Podatki, ki jih uporabljamo za delo, zaradi kočljivih informacij ne morejo biti na javnem repozitoriju. Zaradi lažje predstave pa osnovna mapa repozitorija vsebuje vzorčni primer podatkov. Vzorčni podatki so seveda neresnični.

## ⚙️ Tehnološki nabor

- Frontend:
  - React (VITE v6.3.5)
  - Typescript
  - Css
- Backend:
  - Node.js (v20.12.2)
  - Express
- Strojno učenje:
  - Python (3.13.3)

## 👩‍💻👨‍💻 Navodila za razvijalce

Dobrodošli! Če želiš prispevati k razvoju tega projekta ali ga zgolj bolje razumeti, so spodaj osnovna navodila in priporočila za učinkovito delo z aplikacijo. Projekt je zasnovan tako, da omogoča enostavno nadgradnjo in prilagajanje potrebam podjetja Informatika. Aplikacija bo na voljo na: [http://127.0.0.1:8000](http://127.0.0.1:8000)<br>
Spodaj so smernice za nadaljnji razvoj in izboljšave sistema:

### 🧪 Zagon testov

> Testi uporabljajo `pytest` in vključujejo `conftest.py` s testnimi podatki in mock modeli.
> Po vsakem večjem posegom preveri, da testi delujejo:

- `cd Informatika`
- `cd ML_api`
- `python -m venv venv` - samo če še nisi prej
- `source venv/bin/activate` (macOS/Linux) ALI `venv\Scripts\activate` (Windows)
- `pip install -r requirements.txt`
- `python -m pytest`

### 📁 Struktura projekta

```
Frontend/
├──public/
├──src/                   #Mapa z vsemi React pages
│  └──app.jsx
│  └──main.jsx
│  └──Sistemček.jsx
│  └──...
│  └──slike/              #Mapa z slikami
ML_api/
├── __init__.py
├── main.py               # FastAPI aplikacija
├── model_loader.py       # Nalaganje modela in vektorskih predstavitev
├── search_engine.py      # Iskalna logika (podobnost med zahtevki)
├── tests/                # Testi (z uporabo pytest)
│   └── conftest.py
│   └──...
├── data/                 # csv datoteke uporabljene za model
│   └── df.csv
ml_backend/
├──server.js             # backend server
└──auth.js               # Funkcija za prijavo
```

### 🧠 Priporočila za razvoj

- Uporabljaj opisna imena spremenljivk in funkcij.
- Ohranimo skladnost z obstoječim stilom.
- Dokumentiraj večje funkcije ali module.
- Testiraj svoje spremembe z obstoječim testnim ogrodjem.
- Za večje spremembe odpri `issue` ali `pull request` z opisom, kaj želiš doseči.

### 🤝 Želiš prispevati?

Za nove funkcionalnosti, odpravljanje napak ali optimizacije predlagamo naslednji potek:

1. Kloniraj repozitorij
2. Ustvari svojo vejo (`feature/ime-funkcionalnosti`)
3. Implementiraj spremembe
4. Testiraj
5. Odpri pull request

📌 Predlagamo, da pred večjimi spremembami preveriš vpliv na obstoječo funkcionalnost, dodaš teste in dokumentacijo sprememb.

<!-- V drive-u so dodani podatki v treh mapicah:

1. originalne datoteke
2. počiščen html
3. zdruzeni podatki
   - tabele združene v en data set, odstranjen stolpec.
   - za nadaljnjo analizo se morajo uporabljati ti podatki! -->

## 📲 Namestitev in zagon projekta

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

3. _Predprocesiranje podatkov_

   - `cd Informatika`
   - `cd Procesiranje_podatkov`
   - `mkdir data`
   - v data dodaj datoteki FR_SR_WL_1.xlsx in FR_SR_WL_2.xlsx
   - `python -m venv venv`
   - `source venv/bin/activate` (macOS/Linux) ALI `venv\Scripts\activate` (Windows)
   - `pip install pandas scikit-learn openpyxl`
   - `python preprocess.py` - ustvari datoteko df_no_nan_img.csv v mapi data

4. _Zagon python api-ja_ z naslednjimi ukazi:

   - `cd Informatika`
   - `cd ML_api`
   - `mkdir data` - ustvari novo mapo za podatke (podatki ne morejo biti na gitu)
   - v data dodaj datoteko df_no_nan_img.csv
   - `python -m venv venv`
   - `source venv/bin/activate` (macOS/Linux) ALI `venv\Scripts\activate` (Windows)
   - `pip install -r requirements.txt`
   - `uvicorn main:app --reload` (zagon API-ja)
     - na tem koraku se mora počakati malenkost dlje, da se lahko model nauči na podatkih

5. \_Dodajanje .env datoteke za login uporabnika

   - `cd ml_backend`
   - `node -e "require('bcrypt').hash('poljubno_geslo',12).then(h=>console.log(h))"`
     - pridobljeno hash kodo shranimo za .env datoteko
   - v ml_backend ustvarimo novo datoteko .env v katero vpišemo:
     - ADMIN_EMAIL= poljuben e-naslov
     - ADMIN_PWHASH= vstavimo pridobljeno hash kodo
     - JWT_SECRET=change-me
     - PORT=5100

6. _Zagon zaledja (backenda)_ z naslednjimi ukazi:

   - `cd ml_backend`
   - `npm install`
   - `node server.js`

7. _Zagon pročelja (frontenda)_ z naslednjimi ukazi:

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

# Docker

<!-- - `cd Informatika`
- `mkdir shared_data` (skrita pred commitom na git) - v to mapo se bodo shranili procesirani podatki (potrebujes podatka v mapi Procesiranje_podatkov/data)
- `docker compose up --build` -->

procesiranje image:

- `cd Informatika`
- `mkdir shared_data`
- `cd Procesiranje_podatkov`
- `docker build -t procesiranje .` - zbuilda image
- `docker run --rm \ -v "$(pwd)/data:/app/data" \ -v "$(pwd)/../shared_data:/app/shared_data" \ procesiranje \ python preprocess.py \ --input data/FRI_SR_WL.xlsx \ --sheet1 SR \ --sheet2 WL \ --output shared_data/df_no_nan_img.csv` - požene image



# ML_api - testni primer runnanja (brez dockerja)
- `cd Informatika`
- `mkdir shared_data`
- `cd shared_data`
- dodaj df_no_nan_img.csv not
- `cd ..`
- `cd ML_api`
- `python -m venv venv`
- `source venv/bin/activate` (macOS/Linux) ALI `venv\Scripts\activate` (Windows)
- `pip install PyJWT`
- `pip install -r requirements.txt`
- `uvicorn main:app --reload` (zagon API-ja)


