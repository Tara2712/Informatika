![alt text](image.png)

Sanja Muršič, Tara Sedovšek, Kaja Vidmar

## 🌟Vizija

Naša vizija je razviti inteligenten iskalnik, ki podjetju Informatika omogoča učinkovitejše upravljanje s storitvenimi zahtevki na podlagi preteklih izkušenj. S pomočjo metod strojnega učenja smo iz zgodovinskih podatkov podjetja Informatika izluščile vzorce in povezave med težavami, rešitvami in konteksti, v katerih so se pojavile.

S tem smo omogočile hitro in natančno iskanje podobnih primerov iz preteklosti, kar bo zaposlenim v podporni ekipi omogočilo, da:

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

## 📑 Podatki za delo

Podatki, ki jih uporabljamo za delo, zaradi kočljivih informacij ne morejo biti na javnem repozitoriju. Zaradi lažje predstave pa osnovna mapa repozitorija vsebuje vzorčni primer podatkov. Vzorčni podatki so seveda neresnični.

## ⚙️ Tehnološki nabor

- Frontend:
  - React (VITE v6.3.5)
  - JavaScript
  - Css
- Backend:
  - Node.js (v20.12.2)
  - Express
- Strojno učenje:
  - Python (3.13.3)
  - FastAPI

## 📲 Namestitev in zagon projekta

1. _Predpogoji_ <br>
   Za namestitev je nujno potrebno, da je na računalniku nameščeno naslednje:
   - [Docker](https://www.docker.com/get-started/) - Preveri namestitev: `docker --version`
   - [Git](https://git-scm.com/downloads)
     - Preveri namestitev: `git --version`
   - Node.js in npm <br>
        Node.js verzija 14 ali višja, npm verzija 6 ali višja
   - namestitev: https://nodejs.org/en
   - preverjanje namestitev v terminalu: `node -v` in `npm -v`
   2. Git <br>
      Potreben je za kloniranje repozitorija
   - namestitev: https://git-scm.com/downloads
   - preverjanje namestitve z ukazom: `git --version`
   3. Python 3.8+
   4. pip
   5. Docker: https://www.docker.com/get-started/ -->
2. _Kloniranje repozitorija_ z ukazi

   - `git clone https://github.com/Tara2712/Informatika.git`
   - `cd Informatika`

3. _Zagon aplikacije z Dockerjem_
   - zagon Dockerja
   - `cd Informatika`
   - `mkdir shared_data`
   - ustvarjanje .env datoteke
     - `node -e "require('bcrypt').hash('poljubno_geslo',12).then(h=>console.log(h))"`
     - pridobljeno hash kodo shranimo za .env datoteko
     - v `cd Informatika` ustvarimo novo datoteko .env v katero vpišemo poljubni email in geslo (ta podatka se bosta uporabila za prijavo), nujno pa morajo biti zapisani v **točno takšnem formatu**:
       - `ADMIN_EMAIL=tickettray@example.com`
       - `ADMIN_PWHASH='pridobljena_hash_koda'`
       - `JWT_SECRET=change-me`
       - `PORT=5100`
   - `cd Informatika`
   - `cd Procesiranje_podatkov`
     - `mkdir data`
     - v data dodaj datoteko FRI_SR_WL.xlsx
     - `cd ..`
   - `docker compose up --build`

## 👩‍💻👨‍💻 Navodila za razvijalce

Dobrodošli! Če želiš prispevati k razvoju tega projekta ali ga zgolj bolje razumeti, so spodaj osnovna navodila in priporočila za učinkovito delo z aplikacijo. Projekt je zasnovan tako, da omogoča enostavno nadgradnjo in prilagajanje potrebam podjetja Informatika.<br>
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

