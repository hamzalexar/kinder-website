# Roadmap: van website naar app

Dit document beschrijft het pad van de huidige website (getest via GitHub Pages)
naar volwaardige apps in de Apple App Store en Google Play Store.

## Beslissingen tot nu toe

- **Volgorde:** eerst de website zelf leuker en leerrijker maken. De app-stap komt
  helemaal op het einde.
- **Offline:** de app moet zonder internet werken. Dit vereist geen extra werk —
  zodra de site met Capacitor wordt ingepakt, worden alle bestanden (HTML/CSS/JS/
  afbeeldingen) in de app zelf meegeleverd. Er wordt niets van internet geladen.
- **Verdienmodel:** volledig gratis, geen advertenties, geen in-app aankopen, geen
  tracking. Dit is ook nodig om te voldoen aan Apple's regels voor de Kids Category
  (verbod op advertentienetwerken en tracking van derden bij apps voor kinderen).
- **Developer-accounts:** nog geen Apple Developer account en nog geen Google Play
  Console account. Beide moeten nog aangemaakt worden.

## Fase 1 — De website zelf (huidige fase)

Doel: een leuk én leerrijk memory-spel, klaar om getest te worden via GitHub Pages.

- Meer thema's, waaronder eventueel echte foto's naast emoji's.
- Meer leerrijke inhoud (bijv. letters, cijfers, vormen, kleuren).
- Blijven verfijnen van toegankelijkheid, geluid en mobiele bruikbaarheid.

## Fase 2 — App-identiteit voorbereiden

- App-naam kiezen.
- App-icoon laten maken (1024×1024 afbeelding).
- Splash screen (opstartscherm) ontwerpen.
- Bundle ID kiezen (bijv. `com.hamza.kindermemory`) — dit is de unieke
  technische naam van de app in beide stores.

## Fase 3 — Capacitor-project opzetten

- De bestaande website wordt 1-op-1 ingepakt in een native iOS- én
  Android-project met Capacitor (Ionic).
- Geen herschrijf van de site nodig: dezelfde code blijft dienen voor
  zowel de live GitHub Pages-website als de native apps.

## Fase 4 — Testen op echte apparaten

- Testen via Xcode's iOS Simulator en/of een echte iPhone.
- Testen via Android Studio's emulator en/of een echte Android-telefoon.

## Fase 5 — Store-vereisten regelen

- Eenvoudige privacyverklaring opstellen (ook al wordt er geen data verzameld).
- Leeftijdsclassificatie / content rating invullen.
- Screenshots maken voor de winkelpagina's.

## Fase 6 — Developer-accounts aanmaken

- **Apple Developer Program:** $99/jaar, aanvraag via een Apple ID, goedkeuring
  kan 1-2 dagen duren.
- **Google Play Console:** $25 eenmalig, meestal direct actief.

## Fase 7 — Builden & indienen

- Xcode bouwt de `.ipa` voor de App Store.
- Android Studio bouwt de `.aab` voor Google Play.
- Review duurt bij Apple meestal 1-3 dagen, bij Google enkele uren tot 1 dag.

## Vuistregel voor de volgorde

De technische inpak-stap (fase 3) is relatief snel, omdat er niets wordt
herschreven. De meeste wachttijd zit in de administratieve kant: het aanmaken
van de developer-accounts (fase 6) duurt het langst, dus dat kan het beste
alvast gestart worden zodra de site zelf klaar is — parallel aan het
technische werk van fase 2-4.
