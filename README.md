# Go IT projekt JavaScript - Filmoteka

## Zalezności

Na komputerze musi być zainstalowana LTS-wersja [Node.js](https://nodejs.org/en/).

## Przed rozpoczęciem pracy

Jeden raz na projekt zainstalować wszystkie zalezności.

```shell
npm ci
```

### Praca

Włączyć tryb pracy.

```shell
npm run dev
```

W przeglądarce przejść na [http://localhost:1234](http://localhost:1234).

### Deploy

Kod będzie automatycznie się zbierać i robić deploy aktualnej wersji projektu na GitHub Pages, w gałąź `gh-pages`, za kazdym razem jeśli zostaną wprowadzone zmiany w `main`. Na przykład, po bezpośrenim push lub po przyjęciu pull-request. 

Po jakimś czasie stronę mozna będzie zobaczyć na żywo pod adresem:
[https://brzozanet.github.io/goit-projekt-js-9/](https://brzozanet.github.io/goit-projekt-js-9/).

## Pliki i folderzy

- Wszystkie partiale plików stylów powinny być w folderze `src/sass` i importować się w `src/sass/main.scss`

- Wszystkie partiale plików kontentu HTML powinny się znajdować w folderze `partials` i importować się w `index.html` lub `library.html`

- Pliki skryptów JS umieszczamy w folderze `js`, wskazane aby każda niezależna funkkcjonalność znalazła się w oddzielnym pliku .js i importowała się w pliku `app.js`

- Zdjęcia dodawajcie w folder `src/images`, przed tym zoptymizujcie te zdjęcia które dodajecie. Program po prostu 
  kopiuje wykorzystane zdjęcia aby system nie musiał ich optymalizować, bo na słabych komputerach 
  to moze zająć dużo czasu.

- WAŻNE: NIE uruchamiany watchera SASS (`Watch Sass`) w Visual Studio Code, ponieważ pliki css generują się z scss za pomocą Parcel JS

- Wyłączamy autozapis w VSC, ponieważ każdy błąd w pliku, powstały choćby poprzez autozapis w czasie pisania instrukcji, skutkuje błędem Parcel JS.
