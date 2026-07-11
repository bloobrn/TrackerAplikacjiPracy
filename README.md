# Tracker Aplikacji o Pracę

Aplikacja full-stack do śledzenia własnych zgłoszeń rekrutacyjnych (staże, praca) — firma, stanowisko, status, notatki i statystyki.

## Opis projektu

Projekt powstał jako narzędzie do organizacji poszukiwania praktyk/pracy w IT, a jednocześnie jako projekt portfolio łączący backend, frontend, bazę danych w chmurze i analizę danych.

## Stack technologiczny

| Warstwa | Technologia |
|---|---|
| Baza danych | Oracle Autonomous Database (chmura, Always Free) |
| Backend | Java, Spring Boot, Spring Data JPA (REST API) |
| Frontend | HTML, CSS, JavaScript |
| Analiza danych | Python (oracledb, matplotlib) |
| Kontrola wersji | Git / GitHub |

## Struktura repozytorium
## Funkcjonalność

- Dodawanie, przeglądanie, edycja i usuwanie aplikacji o pracę (CRUD) przez REST API
- Śledzenie statusu każdej aplikacji: `wysłano`, `odpowiedź`, `rozmowa`, `odrzucenie`, `oferta`
- Rozróżnienie typu aplikacji: staż (`intern`) lub praca (`job`)
- Automatyczne statystyki: łączna liczba aplikacji, rozkład statusów, wskaźnik odpowiedzi
- Wizualizacja danych na wykresie słupkowym (Python/matplotlib)

## Uruchomienie projektu

### 1. Baza danych
Utwórz Oracle Autonomous Database (Always Free) i wykonaj skrypt z folderu `DataBase/` w SQL Developer.

### 2. Backend
```bash
cd backend/tracker-backend
# skonfiguruj src/main/resources/application.properties (patrz plik .example)
mvn clean install
mvn spring-boot:run
```
API dostępne pod `http://localhost:8080/api/applications`

### 3. Frontend
```bash
cd frontend
open index.html
```

### 4. Analiza danych (Python)
```bash
cd python-analytics
python3 -m venv venv
source venv/bin/activate
pip3 install -r requirements.txt
# skonfiguruj analytics.py (patrz plik .example)
python3 analytics.py
```

## Autor

Snezhana Zorina - studenta informatyki Katolicki Uniwersytet Lubelski Jana Pawła II

##P.S.

*pozniej dodam Dockerfile - ktokolwiek sklonuje repo, odpali caly projekt kilkoma komendami, bez recznej instalacji Javy, Mavena, Pythona itd.
