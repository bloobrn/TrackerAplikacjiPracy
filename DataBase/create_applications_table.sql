-- =====================================================
-- Tabela: APPLICATIONS
-- Opis: Przechowuje dane o złożonych aplikacjach o pracę
-- Autor: [Twój autor]
-- Data utworzenia: 2026-07-09
-- =====================================================

-- Usuń tabelę jeśli istnieje (opcjonalnie - ostrożnie!)
-- DROP TABLE applications CASCADE CONSTRAINTS;

-- Utwórz tabelę applications zgodnie z aktualną strukturą
CREATE TABLE applications (
    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company VARCHAR2(150) NOT NULL,
    position VARCHAR2(150),
    application_date DATE DEFAULT SYSDATE,
    status VARCHAR2(30) DEFAULT 'wysłano' 
        CHECK (status IN ('wysłano', 'odpowiedź', 'rozmowa', 'odrzucenie', 'oferta')),
    notes VARCHAR2(1000),
    offer_link VARCHAR2(300)
    application_type VARCHAR2(30) DEFAULT NULL CHECK(application_type IN('intern', 'job'))

);

-- Komentarze do tabeli i kolumn
COMMENT ON TABLE applications IS 'Tabela przechowująca aplikacje o pracę';
COMMENT ON COLUMN applications.id IS 'Unikalny identyfikator aplikacji (auto-generowany)';
COMMENT ON COLUMN applications.company IS 'Nazwa firmy';
COMMENT ON COLUMN applications.position IS 'Stanowisko, na które aplikowano';
COMMENT ON COLUMN applications.application_date IS 'Data złożenia aplikacji (domyślnie dzisiejsza)';
COMMENT ON COLUMN applications.status IS 'Status aplikacji: wysłano, odpowiedź, rozmowa, odrzucenie, oferta';
COMMENT ON COLUMN applications.notes IS 'Dodatkowe notatki o aplikacji';
COMMENT ON COLUMN applications.offer_link IS 'Link do oferty pracy';

-- Indeks dla szybszego wyszukiwania
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_date ON applications(application_date);

-- Przykładowe dane testowe (takie jak w bazie)
INSERT INTO applications (company, position, status, application_date, notes, offer_link) 
VALUES ('OPmobility', 'Staż w dziale IT', 'wysłano', SYSDATE, 'Bardzo ciekawa oferta dla studentów', NULL);

INSERT INTO applications (company, position, status, application_date, notes, offer_link) 
VALUES ('Woobox', 'Front-end/Web Developer', 'wysłano', SYSDATE, 'Startup z fajnym podejściem do pracy', 'https://woobox.com/careers');

COMMIT;

-- Sprawdź dane
SELECT * FROM applications;

