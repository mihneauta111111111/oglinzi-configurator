// Legal pages (terms, privacy, cookies, returns), standard for a made-to-order
// personalized product sold online in Romania/EU. Company identity fields are
// placeholders (bracketed) until the client supplies real registration data -
// same "clearly marked TODO" convention as the Testimonials placeholder.
const COMPANY = {
  name: '[Denumire firma SRL]',
  cui: '[CUI]',
  regCom: '[Nr. Reg. Com.]',
  address: '[Adresa sediu social]',
  email: 'contact@halomirrors.ro',
  phone: '0728 085 494',
}

const LAST_UPDATED = '13 august 2026'

function Section({ heading, paragraphs, list }) {
  return (
    <section>
      <h2 className="font-display text-[16px] font-medium mb-2.5">{heading}</h2>
      {paragraphs?.map((p, i) => (
        <p key={i} className="text-[14px] text-black/65 leading-relaxed mb-2.5 last:mb-0">{p}</p>
      ))}
      {list && (
        <ul className="space-y-1.5">
          {list.map((item, i) => (
            <li key={i} className="text-[14px] text-black/65 leading-relaxed flex gap-2.5">
              <span className="text-black/30 mt-[2px]">-</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

function LegalLayout({ title, intro, sections }) {
  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-6 pt-28 pb-24">
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
        <span className="spectrum-line" style={{ width: '30px' }} />
        <span style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(23,24,26,0.5)', fontWeight: 500 }}>Legal</span>
      </div>
      <h1 className="font-display text-3xl sm:text-4xl font-medium">{title}</h1>
      <p className="text-[12px] text-black/40 mt-3">Ultima actualizare: {LAST_UPDATED}</p>
      {intro && <p className="text-[14px] text-black/60 leading-relaxed mt-6">{intro}</p>}
      <div className="space-y-7 mt-8 rounded-2xl border border-black/10 bg-white p-6 sm:p-8">
        {sections.map((s) => <Section key={s.heading} {...s} />)}
      </div>
    </div>
  )
}

export function TermsPage() {
  return (
    <LegalLayout
      title="Termeni si conditii"
      intro="Acesti termeni reglementeaza achizitionarea oglinzilor LED personalizate halo.mirrors prin intermediul acestui site."
      sections={[
        {
          heading: '1. Date de identificare',
          paragraphs: [
            `Site-ul halomirrors.ro este operat de ${COMPANY.name}, cu sediul in ${COMPANY.address}, CUI ${COMPANY.cui}, Nr. Reg. Com. ${COMPANY.regCom} ("noi", "operatorul"). Ne poti contacta la ${COMPANY.email} sau ${COMPANY.phone}.`,
          ],
        },
        {
          heading: '2. Obiectul contractului',
          paragraphs: [
            'Acesti Termeni si Conditii reglementeaza utilizarea site-ului si achizitionarea oglinzilor personalizate ("produsele") comercializate prin intermediul configuratorului online. Prin plasarea unei comenzi, confirmi ca ai citit, ai inteles si esti de acord cu acesti termeni.',
          ],
        },
        {
          heading: '3. Produsele si personalizarea',
          paragraphs: [
            'Fiecare oglinda este confectionata la comanda, conform configuratiei alese de tine: model, material, dimensiune, suport, culoare LED si elementele grafice personalizate (poza de profil, username, statistici, descriere).',
            'Esti singurul responsabil pentru continutul incarcat in configurator. Nu incarca imagini care incalca drepturi de autor sau dreptul la imagine al unei alte persoane, fara acordul acesteia.',
          ],
        },
        {
          heading: '4. Comanda si confirmarea',
          paragraphs: [
            'Comanda se plaseaza prin configuratorul de pe site si formularul de livrare din pagina Cos. Dupa trimitere, te contactam in cel mult 24h (telefon sau email) pentru confirmarea comenzii si a detaliilor de livrare.',
            'Comanda este considerata ferma dupa aceasta confirmare. Preturile afisate sunt in RON si includ TVA.',
          ],
        },
        {
          heading: '5. Plata',
          paragraphs: [
            'Modalitatea de plata (ramburs la curier, transfer bancar sau plata online cu cardul, dupa caz) se stabileste la confirmarea comenzii, in functie de optiunile disponibile la acel moment.',
          ],
        },
        {
          heading: '6. Livrare',
          paragraphs: [
            'Livram in toata Romania, in aproximativ 5-10 zile lucratoare de la confirmarea comenzii, in functie de configuratie si volumul de comenzi. Costul de livrare se comunica odata cu confirmarea.',
          ],
        },
        {
          heading: '7. Dreptul de retragere si garantia',
          paragraphs: [
            'Deoarece produsele sunt confectionate dupa specificatiile tale, dreptul de retragere din contract in 14 zile, prevazut de OUG 34/2014, nu se aplica, in conformitate cu art. 16 lit. c) din aceasta ordonanta.',
            'Beneficiezi in continuare de garantia legala de conformitate pentru produsele care prezinta defecte de fabricatie. Detalii in Politica de retur.',
          ],
        },
        {
          heading: '8. Proprietate intelectuala',
          paragraphs: [
            `Continutul site-ului (text, design, grafica, cod) apartine ${COMPANY.name} sau partenerilor sai si nu poate fi reprodus fara acord scris.`,
          ],
        },
        {
          heading: '9. Limitarea raspunderii',
          paragraphs: [
            'Depunem eforturi rezonabile pentru ca informatiile de pe site sa fie corecte si actualizate, insa nu garantam absenta oricaror erori. Configuratorul afiseaza o reprezentare aproximativa a produsului final; pot exista diferente minore de nuanta sau finisaj fata de imaginea de pe ecran.',
          ],
        },
        {
          heading: '10. Solutionarea litigiilor',
          paragraphs: [
            `Pentru orice nemultumire, ne poti contacta direct la ${COMPANY.email}. Ai de asemenea posibilitatea sa te adresezi Autoritatii Nationale pentru Protectia Consumatorilor (anpc.ro) sau platformei europene de Solutionare a Litigiilor Online (ec.europa.eu/consumers/odr).`,
          ],
        },
        {
          heading: '11. Modificarea termenilor',
          paragraphs: [
            'Putem actualiza periodic acesti termeni. Versiunea aplicabila este cea publicata pe site la data plasarii comenzii.',
          ],
        },
      ]}
    />
  )
}

export function ReturnPage() {
  return (
    <LegalLayout
      title="Politica de retur"
      sections={[
        {
          heading: '1. Produse personalizate - fara drept de retragere in 14 zile',
          paragraphs: [
            'Toate oglinzile comercializate prin acest site sunt confectionate la comanda, conform configuratiei alese de fiecare client (model, material, dimensiune, culoare LED, elemente grafice personalizate).',
            'Potrivit art. 16 lit. c) din OUG 34/2014 privind drepturile consumatorilor, produsele confectionate dupa specificatiile consumatorului sau personalizate in mod clar sunt exceptate de la dreptul de retragere din contract in 14 zile, aplicabil in general vanzarilor online.',
            'Practic, acest lucru inseamna ca oglinda nu poate fi returnata doar pentru ca te-ai razgandit dupa ce a fost confectionata conform comenzii tale.',
          ],
        },
        {
          heading: '2. Garantia legala de conformitate',
          paragraphs: [
            'Aceasta exceptie nu afecteaza garantia legala de conformitate de 2 ani, aplicabila potrivit Legii 449/2003 si OG 21/1992. Daca produsul primit prezinta un defect de fabricatie sau nu corespunde comenzii confirmate (dimensiune, culoare LED, model gresit), ne poti contacta pentru remediere.',
          ],
        },
        {
          heading: '3. Cum procedezi in caz de produs defect sau gresit',
          list: [
            `Ne scrii in maximum 48h de la livrare la ${COMPANY.email} sau ${COMPANY.phone}, cu numarul comenzii si poze/video care arata problema.`,
            'Analizam sesizarea si te contactam cu solutia: reparare, inlocuire sau, daca niciuna nu este posibila, rambursare partiala/totala.',
            'Produsul se returneaza doar dupa ce am confirmat impreuna procedura si adresa de retur; costurile de transport pentru produsele confirmate defecte sunt suportate de noi.',
          ],
        },
        {
          heading: '4. Produse deteriorate la transport',
          paragraphs: [
            'Verifica coletul la primire. Daca observi deteriorari vizibile cauzate de transport, mentioneaza acest lucru curierului si contacteaza-ne imediat, insotit de poze cu ambalajul si produsul.',
          ],
        },
        {
          heading: '5. Rambursarea',
          paragraphs: [
            'Sumele aprobate spre rambursare se returneaza in acelasi mod in care a fost efectuata plata, in maximum 14 zile de la confirmarea rambursarii.',
          ],
        },
      ]}
    />
  )
}

export function PrivacyPage() {
  return (
    <LegalLayout
      title="Politica de confidentialitate"
      sections={[
        {
          heading: '1. Operatorul de date',
          paragraphs: [
            `Operatorul datelor cu caracter personal colectate prin acest site este ${COMPANY.name}, CUI ${COMPANY.cui}, cu sediul in ${COMPANY.address}. Ne poti contacta pentru orice solicitare legata de datele tale la ${COMPANY.email}.`,
          ],
        },
        {
          heading: '2. Ce date colectam',
          list: [
            'Date de contact si livrare: nume, telefon, email, adresa, oras, cod postal - completate in formularul din pagina Cos.',
            'Elemente de personalizare incarcate voluntar in configurator: poza de profil, username, locatie, texte de descriere - folosite doar pentru a genera reprezentarea vizuala a oglinzii tale.',
            'Date tehnice minime necesare functionarii site-ului (de exemplu continutul cosului de cumparaturi, salvat local in browserul tau).',
          ],
        },
        {
          heading: '3. Scopul si temeiul prelucrarii',
          paragraphs: [
            'Prelucram datele de contact si livrare pentru a procesa si confirma comanda, a produce oglinda personalizata si a o livra - temei legal: executarea unui contract (art. 6 alin. 1 lit. b din GDPR).',
            'Poza si celelalte elemente de personalizare sunt incarcate din proprie initiativa, pentru a genera previzualizarea produsului - temei legal: consimtamantul tau (art. 6 alin. 1 lit. a din GDPR), pe care il poti retrage oricand inainte de plasarea comenzii, pur si simplu inchizand pagina.',
          ],
        },
        {
          heading: '4. Cui transmitem datele',
          paragraphs: [
            'Datele pot fi transmise catre firma de curierat (pentru livrare), catre furnizorul de gazduire si email al site-ului si, daca alegi plata online, catre procesatorul de plati. Nu vindem si nu inchiriem datele tale catre terti in scop de marketing.',
          ],
        },
        {
          heading: '5. Cat timp pastram datele',
          paragraphs: [
            'Pastram datele legate de o comanda pe durata necesara indeplinirii obligatiilor contractuale si legale (de exemplu evidenta financiar-contabila), dupa care le stergem sau anonimizam.',
          ],
        },
        {
          heading: '6. Drepturile tale',
          list: [
            'Dreptul de acces la datele tale',
            'Dreptul de rectificare a datelor inexacte',
            'Dreptul de stergere ("dreptul de a fi uitat")',
            'Dreptul de restrictionare a prelucrarii',
            'Dreptul la portabilitatea datelor',
            'Dreptul de opozitie',
            'Dreptul de a depune plangere la Autoritatea Nationala de Supraveghere a Prelucrarii Datelor cu Caracter Personal (dataprotection.ro)',
          ],
          paragraphs: [
            `Iti poti exercita oricare dintre aceste drepturi scriindu-ne la ${COMPANY.email}.`,
          ],
        },
        {
          heading: '7. Securitatea datelor',
          paragraphs: [
            'Luam masuri tehnice si organizatorice rezonabile pentru a proteja datele tale impotriva accesului neautorizat, pierderii sau divulgarii accidentale.',
          ],
        },
        {
          heading: '8. Poze incarcate de tine',
          paragraphs: [
            'Daca incarci o poza de profil pentru personalizarea oglinzii, esti responsabil ca aceasta sa iti apartina sau sa ai acordul persoanei din imagine. Poza este folosita exclusiv pentru a genera previzualizarea si a produce comanda ta.',
          ],
        },
        {
          heading: '9. Modificari ale acestei politici',
          paragraphs: [
            'Putem actualiza periodic aceasta politica. Data ultimei actualizari este afisata in partea de sus a paginii.',
          ],
        },
      ]}
    />
  )
}

export function CookiePage() {
  return (
    <LegalLayout
      title="Politica cookie"
      sections={[
        {
          heading: '1. Ce sunt cookie-urile',
          paragraphs: [
            'Cookie-urile sunt fisiere text de mici dimensiuni stocate de browserul tau atunci cand vizitezi un site. Site-ul nostru foloseste, in plus fata de cookie-uri, si stocarea locala a browserului (localStorage) pentru anumite functionalitati, descrisa mai jos.',
          ],
        },
        {
          heading: '2. Stocare esentiala - cosul de cumparaturi',
          paragraphs: [
            'Pentru ca oglinda configurata de tine sa ramana in cos chiar daca inchizi si redeschizi pagina, salvam continutul cosului local, in browserul tau (localStorage, cheia halo_cart). Aceasta stocare este necesara functionarii site-ului si nu poate fi dezactivata fara a pierde functionalitatea cosului.',
          ],
        },
        {
          heading: '3. Cookie-uri de analiza si marketing',
          paragraphs: [
            'La momentul actual, site-ul nu foloseste cookie-uri de analiza (statistici trafic) sau de marketing (retargeting).',
            'Daca in viitor vom activa astfel de cookie-uri (de exemplu pixel Meta/Facebook sau TikTok, pentru masurarea eficientei campaniilor publicitare), iti vom cere consimtamantul printr-un banner dedicat inainte de a le incarca, iar aceasta pagina va fi actualizata in consecinta.',
          ],
        },
        {
          heading: '4. Cum poti controla cookie-urile',
          paragraphs: [
            'Poti sterge sau bloca cookie-urile si datele stocate local din setarile browserului tau. Retine ca blocarea stocarii esentiale (localStorage) poate afecta functionarea cosului de cumparaturi.',
          ],
        },
        {
          heading: '5. Contact',
          paragraphs: [
            `Pentru intrebari legate de aceasta politica, ne poti scrie la ${COMPANY.email}.`,
          ],
        },
      ]}
    />
  )
}

