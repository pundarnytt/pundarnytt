# Pundarnytt

En oberoende svensk nättidning: nyheter, intervjuer, reportage, debatt och tydligt märkt satir/fiktion. Den första milstolpen är ett komplett flöde från redaktörens text i Payload till publicerad artikel på webben.

## Stack och struktur

- Next.js **16.3.8**, React **19.2.8**, TypeScript **5.9.3**, Tailwind **4.3.3**.
- Payload **3.90.2**, dess PostgreSQL-adapter och Lexical-editor i samma Next-app.
- PostgreSQL **17** via Docker Compose; pnpm **12.8.1**.
- `app/(frontend)` innehåller svenska Server Components och webbplatsens CSS.
- `app/(payload)` innehåller Payloads adminpanel, serverfunktioner och standard-REST-API.
- `collections` definierar Users, Articles, Authors, Categories, Tags och Media.
- `lib/cms.ts` använder Payload Local API server-side med `overrideAccess: false`, `draft: false` och publiceringsfilter. Ingen separat backend eller klientbaserad CMS-hämtning.
- `storage/mediaStorage.ts` väljer lokal disk eller Payloads officiella Vercel Blob-adapter.
- `payload-types.ts` och adminpanelens `importMap.js` genereras från Payload-konfigurationen.

Alla inloggade användare är betrodda redaktörer med samma rättigheter, inklusive användaradministration. Anonyma besökare kan läsa publicerade artiklar samt författare, kategorier, taggar och media, men aldrig skriva eller läsa artikelversioner. Media är offentligt: ladda inte upp konfidentiella bilder i denna milstolpe.

## Kom igång

Kräver Node.js 20.9+ (verifierat med 20.20.2), pnpm 12.8.1 och Docker med Compose.

```bash
pnpm install
cp .env.example .env
openssl rand -hex 32
```

Sätt resultatet från sista kommandot som `PAYLOAD_SECRET` i `.env`.

| Variabel | Användning |
| --- | --- |
| `DATABASE_URL` | PostgreSQL-anslutning. Exemplet använder `localhost:55432`. |
| `POSTGRES_PASSWORD` | Compose-databasens lösenord; måste stämma med anslutningssträngen. Lokal exempelstandard finns. |
| `PAYLOAD_SECRET` | Slumpmässig, hemlig sträng för Payloads autentisering. Ingen standardnyckel. |
| `NEXT_PUBLIC_SERVER_URL` | Webbplatsens absoluta adress för canonical/OpenGraph, lokalt `http://localhost:3000`. |
| `BLOB_READ_WRITE_TOKEN` | Krävs i Vercel Production och Preview. Hemlig servervariabel från en publik Blob-store. Lämnas tom lokalt. |

```bash
docker compose up -d
pnpm dev
```

Öppna [webbplatsen](http://localhost:3000) och [Payload Admin](http://localhost:3000/admin). PostgreSQL exponeras endast på loopback, port **55432**, för att undvika vanliga lokala portkonflikter. Om porten ändras i `compose.yaml`, uppdatera också `DATABASE_URL`.

Payload skapar/uppdaterar schemat automatiskt i utvecklingsläge. Databasen ligger kvar i Docker-volymen efter `docker compose down`. Uppladdade bilder ligger i `media/` (ignorerad av Git).

## Första administratören

På en tom databas visar `/admin` formuläret **Create first user**. Ange din egen e-postadress och ett starkt lösenord. Du loggas därefter in. Om en användare redan finns visas inloggningen i stället. Det finns inget förvalt administratörslösenord.

Skapa första användaren innan en installation görs offentligt tillgänglig. Ytterligare redaktörer skapas under **Users** av en inloggad redaktör. Ingen e-postleverantör ingår: återställningsmeddelanden skrivs till serverloggen i lokal utveckling och skickas inte till en inkorg.

## Publicera första artikeln

1. Skapa en **Author** med namn och en **Category** med namn. Slug skapas när du sparar om fältet lämnas tomt.
2. Välj **Articles → Create New**. Fyll i rubrik, ingress och artikeltext i Lexical-editorn.
3. Välj författare, kategori och artikeltyp. Taggar och huvudbild är valfria.
4. För huvudbild: ladda upp via **Hero Image → Create New** och skriv meningsfull bildbeskrivning. JPEG, PNG, WebP och AVIF stöds. Bilder lagras via Media, inte fria URL-fält.
5. Lämna slug tom för automatisk generering, till exempel `En kväll i Göteborg` → `en-kvall-i-goteborg`. Du kan ange en egen slug. Dubbletter behöver en annan slug.
6. **Save Draft** sparar ett icke-offentligt utkast. **Publish changes** publicerar. Publiceringsdatum sätts automatiskt första gången; datumfältet schemalägger inte publicering.
7. Öppna startsidan och klicka på artikelrubriken. Publiceringen syns vid nästa sidladdning, utan ombyggnad.

SATIR och FIKTION visas på artikelkort och med förklarande text på artikelsidan. Välj rätt artikeltyp även för journalistiskt formgiven fiktion. Redigera en publicerad artikel med **Save Draft** för att behålla den tidigare publicerade versionen tills du väljer att publicera ändringarna.

## Rutter

- `/` – senaste publicerade artiklar, med sidindelning vid behov.
- `/artikel/[slug]` – fullständig artikel; opublicerade eller saknade artiklar ger 404.
- `/kategori/[slug]` – kategori och dess publicerade artiklar.
- `/admin` – Payloads redaktionella gränssnitt.
- `/api/[...slug]` – Payloads standard-REST-API med samlingarnas åtkomstregler.

Sajten är svensk, utan språkprefix eller översättningsramverk. Datum formateras med `sv-SE` och tidszonen `Europe/Stockholm`. Tom startsida och artiklar utan bild fungerar utan exempeldata.

## Utveckling och kontroller

```bash
pnpm generate:types
pnpm generate:importmap
pnpm typecheck
pnpm lint
pnpm build
pnpm start
```

Kör om typ-/importgenerering när CMS-konfigurationen ändras. `pnpm test:smoke` kör ett integrationstest mot en **körande lokal server och lokal/testdatabas**. Det skapar temporära poster och tar bort dem i `finally`. Kör aldrig testet mot en riktig redaktionsdatabas. Testet verifierar autentisering, bilduppladdning, svensk slug, publicering, publika rutter, 404, anonymt skrivskydd och skydd för utkast och opublicerade revisioner. Standardadress är `http://localhost:3000`; ändra med `SMOKE_BASE_URL`.

## Produktionsstart

På en separat, tom produktionsdatabas:

```bash
pnpm db:migrate
pnpm build
pnpm start
```

En initial migrering finns i `migrations/`. Utvecklingens automatiska schema-push och produktionens migreringar är olika flöden: kör inte initialmigreringen ovanpå en redan pushad utvecklingsdatabas. För framtida schemaändringar, generera och granska en ny migrering med `pnpm payload migrate:create`.

Ange riktiga databasuppgifter, en egen `PAYLOAD_SECRET` och den publika HTTPS-adressen. På Vercel lagras bilder i Vercel Blob enligt anvisningarna nedan; deploymentens filsystem används inte för beständiga uppladdningar. Databasbackup och e-postadapter för lösenordsåterställning behövs fortfarande. Lokal Compose är utvecklingsmiljö, inte en färdig produktionsdrift. Ingen driftsättning ingår i denna milstolpe.


## Medialagring: lokal utveckling och Vercel

**Lokalt:** lämna `VERCEL` unset. `pnpm dev` och lokala `pnpm build`/`pnpm start` använder fortfarande `media/`, även om en Blob-token råkar finnas i miljön. Inget Blob-konto behövs. Säkerhetskopiera katalogen tillsammans med din lokala databas om du vill behålla innehållet.

**Vercel Production och Preview:** plattformens automatiska `VERCEL=1` aktiverar `@payloadcms/storage-vercel-blob` (samma version som Payload). Saknad token stoppar konfigurationen i stället för att falla tillbaka till lokal disk. Adaptern stänger av lokal filskrivning och lagrar original och genererade bildstorlekar i Blob. Adminpanelen använder direkta klientuppladdningar för att kringgå Vercels gräns för serverförfrågningar; uppladdningar kräver fortfarande inloggning. Token förblir på servern. Egna REST-uppladdningar som skickar hela filen genom servern omfattas fortfarande av Vercels storleksgräns.

### Vercel-dashboard

1. Öppna projektets **Storage**, välj **Create Storage → Blob** och skapa/anslut en **Public** Blob-store. Den installerade Payload-adaptern använder publika objekt; privata Blob-stores stöds inte av denna konfiguration.
2. Säkerställ att `BLOB_READ_WRITE_TOKEN` finns i projektets **Settings → Environment Variables** för **Production** och för varje **Preview**-miljö som ska köras. Behåll variabelnamnet exakt, utan `NEXT_PUBLIC_` eller eget prefix. Säkerställ att Vercels systemvariabler exponeras så `VERCEL=1` finns vid både build och runtime.
3. Använd separata Blob-stores och databaser för Production och Preview, så testuppladdningar inte delar produktionsinnehåll. Koppla respektive token till rätt miljö.
4. Kör `pnpm db:migrate` mot respektive databas före den nya deploymenten. Storage-adaptern behöver två interna Media-fält (`prefix` och `_objectKey`); den nya migreringen lägger till dessa utan att ändra Article eller befintliga relationer. Lokal utveckling får samma fält via Payloads schema-push.
5. Deploya om efter att miljövariablerna lagts till. Verifiera i `/admin` att en bild kan laddas upp, visas på en artikel och finns kvar efter en ny deployment. Testa även en bild större än 4,5 MB genom adminpanelen för att verifiera den direkta uppladdningsvägen.

`Article.heroImage` refererar fortfarande till samma Media-dokument. Bildkomponenterna använder Payloads URL-fält och känner inte till Blob. Ett framtida byte till exempelvis R2 görs i `storage/mediaStorage.ts` med Payloads S3-adapter samt en separat flytt av lagrade objekt/metadata, utan att bygga om artikelschemat eller läsarsidorna.

Befintliga lokala bildfiler flyttas **inte** automatiskt till Blob. Innan en lokal databas återanvänds i produktion måste dess original och bildvarianter migreras, eller bilder laddas upp på nytt i motsvarande Media-dokument. Använd inte samma databas med både lokal disk och Blob.

Källor: [Payloads storage-adaptrar](https://payloadcms.com/docs/upload/storage-adapters), [Vercels Blob-konfiguration](https://vercel.com/docs/vercel-blob/using-blob-sdk).
