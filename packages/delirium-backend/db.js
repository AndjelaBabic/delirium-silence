import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

// ESM-compatible __dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, "data.db");

let db;

export function getDb() {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    initDb(db);
  }
  return db;
}

function initDb(database) {
  database.exec(`
    CREATE TABLE IF NOT EXISTS content (
      section TEXT PRIMARY KEY,
      data_en TEXT NOT NULL,
      data_sr TEXT NOT NULL,
      updated_at TEXT DEFAULT (datetime('now'))
    )
  `);

  database.exec(`
    CREATE TABLE IF NOT EXISTS menu_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      title_sr TEXT NOT NULL,
      courses TEXT NOT NULL,
      courses_sr TEXT NOT NULL,
      description TEXT NOT NULL,
      description_sr TEXT NOT NULL,
      price TEXT NOT NULL,
      tag TEXT,
      tag_sr TEXT,
      display_order INTEGER NOT NULL DEFAULT 0,
      is_active INTEGER NOT NULL DEFAULT 1
    )
  `);

  seedContent(database);
  seedMenu(database);
}

function seedContent(database) {
  const upsert = database.prepare(
    `INSERT OR IGNORE INTO content (section, data_en, data_sr) VALUES (?, ?, ?)`
  );

  const seed = {
    cover: {
      en: {
        location: "Belgrade · Fine Dining",
        title1: "Delirium",
        title2: "Silence",
        subtitle: "The science of taste",
        cta: "Reserve a Table",
      },
      sr: {
        location: "Beograd · Fino Ugostiteljstvo",
        title1: "Delirium",
        title2: "Silence",
        subtitle: "Nauka ukusa",
        cta: "Rezervišite Sto",
      },
    },
    nav: {
      en: {
        philosophy: "Philosophy",
        chef: "The Chef",
        story: "Our Story",
        experiences: "Experiences",
        wine: "Wine",
        cuisine: "Cuisine",
        press: "Press",
        reserve: "Reserve",
      },
      sr: {
        philosophy: "Filozofija",
        chef: "Šef Kuhinje",
        story: "Naša Priča",
        experiences: "Iskustva",
        wine: "Vino",
        cuisine: "Kuhinja",
        press: "Štampa",
        reserve: "Rezervacija",
      },
    },
    philosophy: {
      en: {
        label: "Our Philosophy",
        headline1: "Dining is not consumption.",
        headline2: "It is presence, silence,",
        headline3: "and sensation.",
        body: "At Delirium Silence, every course is composed like music — a progression of textures, temperatures, and emotion. We do not serve meals. We orchestrate experiences meant to be felt long after the final bite.",
        pillars: [
          {
            label: "Craft",
            text: "Every dish built by hand, nothing pre-made.",
          },
          { label: "Silence", text: "A space where the food speaks loudest." },
          {
            label: "Emotion",
            text: "Courses composed to move, not just satisfy.",
          },
        ],
      },
      sr: {
        label: "Naša Filozofija",
        headline1: "Obedovanje nije konzumacija.",
        headline2: "To je prisustvo, tišina",
        headline3: "i senzacija.",
        body: "U Delirium Silence, svaki kurs je komponovan poput muzike — napredovanje tekstura, temperatura i emocija. Mi ne serviramo obroke. Mi orkestriramo doživljaje koji se osećaju dugo nakon poslednjeg zalogaja.",
        pillars: [
          {
            label: "Zanat",
            text: "Svako jelo napravljeno rukom, ništa unapred pripremljeno.",
          },
          {
            label: "Tišina",
            text: "Prostor u kome hrana govori najgromoglasnije.",
          },
          {
            label: "Emocija",
            text: "Kursevi komponovani da uzburkaju, ne samo da zasitite.",
          },
        ],
      },
    },
    chef: {
      en: {
        label: "The Chef",
        headline1: "Culinary",
        headline2: "Visionary",
        nomination: "JRE Chef of the Year 2026",
        p1: "Vladimir Kučera, chef and owner of Belgrade's Delirium Silence, has been nominated for",
        p2: "Trained in France, he developed a deep command of modern gastronomy fundamentals before pursuing the boundary-pushing culinary approaches that define Delirium Silence today. He applies molecular techniques not for show, but to enhance flavors and rethink traditional forms.",
        p3: "His kitchen is a space of thoughtful experimentation, guided by a single conviction: curiosity over extravagance.",
        quote:
          "We don't aim to impress with extravagance — we want to spark curiosity, trigger thought.",
        nameTag: "Chef & Owner",
        credentials: [
          { value: "2026", label: "JRE Chef of the Year" },
          { value: "10+", label: "Years of craft" },
          { value: "1", label: "Restaurant. One vision." },
        ],
      },
      sr: {
        label: "Šef Kuhinje",
        headline1: "Kulinarni",
        headline2: "Vizionar",
        nomination: "JRE Šef Kuhinje Godine 2026",
        p1: "Vladimir Kučera, šef i vlasnik beogradskog Delirium Silence, nominovan je za",
        p2: "Školovan u Francuskoj, razvio je duboko razumevanje savremene gastronomije pre nego što je počeo da istražuje granične kulinarske pristupe koji danas definišu Delirium Silence. Molekularne tehnike primenjuje ne radi efekta, već da poboljša ukuse i redefinuje tradicionalne forme.",
        p3: "Njegova kuhinja vođena je jednim uverenjem: radoznalost iznad raskoši.",
        quote:
          "Ne težimo da impresioniramo raskoši — želimo da izazovemo radoznalost, da pokrenemo misao.",
        nameTag: "Šef i Vlasnik",
        credentials: [
          { value: "2026", label: "JRE Šef Kuhinje Godine" },
          { value: "10+", label: "Godina zanata" },
          { value: "1", label: "Restoran. Jedna vizija." },
        ],
      },
    },
    story: {
      en: {
        label: "Our Story",
        headline1: "Born in Belgrade,",
        headline2: "Already Recognised",
        p1: "Delirium Silence opened in 2024 with a single conviction — that dining can be an art form. We set out to create a place where every detail, from the first amuse-bouche to the final mignardise, is felt rather than just tasted.",
        p2: "We source only from producers who share our obsession with quality, and we evolve our menu with the seasons so that nature, not habit, guides what reaches your table. In less than two years, the industry has taken notice.",
        milestones: [
          { year: "2024", label: "Delirium Silence opens in Belgrade" },
          {
            year: "2025",
            label: "Restaurant of the Year — Vino & Fino magazine",
          },
          { year: "2026", label: "JRE Chef of the Year nomination" },
        ],
      },
      sr: {
        label: "Naša Priča",
        headline1: "Rođeni u Beogradu,",
        headline2: "Već Prepoznati",
        p1: "Delirium Silence otvorio je vrata 2024. godine s jednim uverenjem — da obedovanje može biti umetnost. Stvorili smo mesto gde se svaki detalj, od prve amuse-bouche do finalne mignardise, ne samo kuša, već i oseća.",
        p2: "Sarađujemo isključivo sa proizvođačima koji dele našu opsednutost kvalitetom, a meni evoluiramo sa sezonama kako bi priroda, a ne navika, vodila ono što dolazi na vaš sto. Za manje od dve godine, struka je to prepoznala.",
        milestones: [
          { year: "2024", label: "Delirium Silence otvara vrata u Beogradu" },
          { year: "2025", label: "Restoran Godine — magazin Vino & Fino" },
          { year: "2026", label: "Nominacija JRE Šef Kuhinje Godine" },
        ],
      },
    },
    space: {
      en: {
        label: "The Setting",
        headline: "A Room With",
        headline2: "A History",
        desc1:
          "Delirium Silence is housed in a preserved early 20th-century salon apartment — soaring ceilings, ornate mouldings, and intimate proportions that no purpose-built restaurant could replicate.",
        desc2:
          "The space was chosen deliberately. Dining here feels private, almost secret — as if you have been invited into someone's home for the most considered meal of your life.",
        details: [
          { label: "Setting", value: "Early 20th-century salon apartment" },
          { label: "Capacity", value: "Intimate — limited covers per service" },
          { label: "Address", value: "Dositejeva 10, Apt. 6, Belgrade" },
        ],
      },
      sr: {
        label: "Prostor",
        headline: "Soba Sa",
        headline2: "Istorijom",
        desc1:
          "Delirium Silence smešten je u sačuvanom salonskom stanu s početka 20. veka — visoki plafoni, bogati štukaturni ukrasi i intimne proporcije koje nijedan namenski izgrađen restoran ne može da reprodukuje.",
        desc2:
          "Prostor je odabran namerno. Večera ovde deluje privatno, gotovo tajnovito — kao da ste pozvani u nečiji dom na najsmišljeniji obrok u vašem životu.",
        details: [
          { label: "Ambijent", value: "Salonski stan s početka 20. veka" },
          {
            label: "Kapacitet",
            value: "Intimno — ograničen broj mesta po servisu",
          },
          { label: "Adresa", value: "Dositejeva 10, Stan 6, Beograd" },
        ],
      },
    },
    wine: {
      en: {
        label: "Wine & Pairings",
        headline: "Curated to",
        headline2: "Challenge and Complement",
        desc: "Our wine program is bold and intentionally challenging — selections chosen not for familiarity but for how they shift the experience of each course. Every pairing is a deliberate decision.",
        pairingNote:
          "Wine pairing is available for all tasting menus. Ask us when booking.",
        pillars: [
          {
            label: "Bold",
            text: "Selections that challenge convention and reward attention.",
          },
          {
            label: "Precise",
            text: "Each wine chosen to amplify a specific moment in the menu.",
          },
          {
            label: "Curated",
            text: "A program built around the food, not around the label.",
          },
        ],
      },
      sr: {
        label: "Vino i Parovi",
        headline: "Odabrano Da",
        headline2: "Izazove i Dopuni",
        desc: "Naš program vina je smeo i namerno izazovan — selekcije odabrane ne zbog poznatosti, već zbog toga kako menjaju doživljaj svakog kursa. Svaki par je promišljena odluka.",
        pairingNote:
          "Parovi sa vinom dostupni su uz sve degustacione menije. Pitajte nas pri rezervaciji.",
        pillars: [
          {
            label: "Smelo",
            text: "Selekcije koje izazivaju konvenciju i nagrađuju pažnju.",
          },
          {
            label: "Precizno",
            text: "Svako vino odabrano da pojača određeni trenutak menija.",
          },
          {
            label: "Kuratorisano",
            text: "Program izgrađen oko hrane, a ne oko etikete.",
          },
        ],
      },
    },
    gallery: {
      en: {
        label: "Our Cuisine",
        headline: "Every Plate, a Canvas",
        imageAlts: [
          "Delirium Silence signature tasting menu dish — Belgrade fine dining",
          "Artisan plating by Chef Vladimir Kučera, Delirium Silence",
          "Molecular gastronomy course at Delirium Silence, Belgrade",
          "Seasonal fine dining course — Delirium Experience",
          "Delirium Silence — handcrafted tasting menu plate",
          "Belgrade fine dining — Delirium Silence kitchen creation",
          "Chef Vladimir Kučera's culinary composition",
          "Delirium Silence — modern European tasting course",
          "Pescatarian fine dining course, Delirium Silence Belgrade",
          "Vegetarian tasting menu — Delirium Silence",
          "Delirium Silence — nine-course Madness Experience dish",
          "Fine dining plate — Delirium Silence, Dositejeva, Belgrade",
        ],
      },
      sr: {
        label: "Naša Kuhinja",
        headline: "Svaki Tanjir, Platno",
        imageAlts: [
          "Delirium Silence — potpisno jelo degustacionog menija, Beograd",
          "Umetničko serviranje šefa Vladimira Kučere, Delirium Silence",
          "Molekularna gastronomija — kurs u Delirium Silence, Beograd",
          "Sezonski kurs finog ugostiteljstva — Delirium Iskustvo",
          "Delirium Silence — ručno kreiran tanjir degustacionog menija",
          "Beogradsko fino ugostiteljstvo — kreacija kuhinje Delirium Silence",
          "Kulinarska kompozicija šefa Vladimira Kučere",
          "Delirium Silence — kurs modernog evropskog menija",
          "Pescatarijanski kurs finog ugostiteljstva, Delirium Silence Beograd",
          "Vegetarijanski degustacioni meni — Delirium Silence",
          "Delirium Silence — jelo iz devetokursnog Madness iskustva",
          "Fino ugostiteljstvo — Delirium Silence, Dositejeva, Beograd",
        ],
      },
    },
    press: {
      en: {
        label: "Press & Recognition",
        headline: "Acclaimed by Critics,",
        headline2: "Loved by Guests",
        vinoLabel: "Restaurant of the Year",
        vinoYear: "2025",
        vinoMagazine: "Vino & Fino",
        vinoDesc:
          "The restaurant that in just one year changed the rules of the game, pushed boundaries, and showed that courage, vision, and uncompromising precision still have the power to shake up the scene. Dinner in low light, focus on the plate, sounds of progressive and techno — a menu that evolves and an experience remembered long after the last bite.",
        vinoLink: "Read the article",
        jreLabel: "JRE Chef of the Year",
        jreYear: "2026",
        jreDesc:
          "Vladimir Kučera has been nominated for the prestigious JRE Chef of the Year award — one of the highest distinctions in European fine dining, recognising culinary excellence, creativity, and vision.",
        jreLink: "View on JRE",
        quotes: [
          {
            text: "A restaurant that dares to treat silence as an ingredient. Each course arrives like a whisper — deliberate, precise, and deeply felt.",
            source: "Gastro Magazine",
          },
          {
            text: "Kučera's kitchen is perhaps the most intellectually honest in Belgrade. Nothing is accidental, nothing is excess.",
            source: "Fine Dining Explorer",
          },
          {
            text: "The kind of meal that makes you reconsider what restaurants are for. Delirium Silence answers that question beautifully.",
            source: "Belgrade Food Review",
          },
        ],
      },
      sr: {
        label: "Štampa i Priznanja",
        headline: "Hvaljeni od Kritičara,",
        headline2: "Voljeni od Gostiju",
        vinoLabel: "Restoran Godine",
        vinoYear: "2025",
        vinoMagazine: "Vino & Fino",
        vinoDesc:
          "Restoran koji je za samo godinu dana promenio pravila igre, pomerio granice i pokazao da hrabrost, vizija i beskompromisna preciznost i dalje imaju moć da uzdrmaju scenu. Večera u polumraku, fokus na tanjir, zvukovi progresiva i tehna, jelovnik koji evoluira i iskustvo koje se pamti dugo nakon poslednjeg zalogaja.",
        vinoLink: "Pročitajte članak",
        jreLabel: "JRE Šef Kuhinje Godine",
        jreYear: "2026",
        jreDesc:
          "Vladimir Kučera nominovan je za prestižnu nagradu JRE Šef Kuhinje Godine — jedno od najviših odličja u evropskom fine dining ugostiteljstvu, koje prepoznaje kulinarsku izvrsnost, kreativnost i viziju.",
        jreLink: "Pogledajte na JRE",
        quotes: [
          {
            text: "Restoran koji sme da tretira tišinu kao sastojak. Svaki kurs stiže poput šapata — promišljeno, precizno i duboko proživljeno.",
            source: "Gastro Magazin",
          },
          {
            text: "Kučerina kuhinja je možda najintelektualno poštena u Beogradu. Ništa nije slučajno, ništa nije suvišno.",
            source: "Fine Dining Explorer",
          },
          {
            text: "Vrsta obroka koja vas navodi da preispitate čemu restorani služe. Delirium Silence odgovara na to pitanje divno.",
            source: "Beogradski Gastro Pregled",
          },
        ],
      },
    },
    footer: {
      en: {
        tagline:
          "A fine dining experience in the heart of Belgrade — where every course is a composition.",
        instagram: "@delirium.silence",
        nav: "Navigate",
        hours: "Hours",
        contact: "Contact",
        phone: "Phone",
        email: "Email",
        address: "Address",
        addressLine1: "Dositejeva 10, Apt. 6",
        addressLine2: "Belgrade, Serbia",
        rights: "All rights reserved.",
        recommended: "Reservations recommended",
        days: [
          { day: "Thursday", time: "18:00 – 23:00" },
          { day: "Friday", time: "18:00 – 23:00" },
          { day: "Saturday", time: "18:00 – 23:00" },
        ],
      },
      sr: {
        tagline:
          "Fine dining iskustvo u srcu Beograda — gde je svaki kurs kompozicija.",
        instagram: "@delirium.silence",
        nav: "Navigacija",
        hours: "Radno Vreme",
        contact: "Kontakt",
        phone: "Telefon",
        email: "Imejl",
        address: "Adresa",
        addressLine1: "Dositejeva 10, Stan 6",
        addressLine2: "Beograd, Srbija",
        rights: "Sva prava zadržana.",
        recommended: "Rezervacija se preporučuje",
        days: [
          { day: "Četvrtak", time: "18:00 – 23:00" },
          { day: "Petak", time: "18:00 – 23:00" },
          { day: "Subota", time: "18:00 – 23:00" },
        ],
      },
    },
    book: {
      en: {
        label: "Reservations",
        headline: "Reserve a Table",
        dividerLabel: "Thursday · Friday · Saturday · 18:00 – 20:00",
        infoAvailable: "Available",
        infoAvailableValue: "Thursday · Friday · Saturday",
        infoService: "Service",
        infoServiceValue: "18:00 – 20:00",
        infoContact: "Contact",
        infoDesc1: "Each evening is intimate and limited.",
        infoDesc2: "We recommend reserving well in advance.",
        step1Label: "Your Visit",
        step2Label: "Your Details",
        fieldDate: "Date",
        fieldDateHelper: "Thursday, Friday and Saturday only",
        fieldGuests: "Number of Guests",
        fieldTime: "Time",
        fieldFirstName: "First Name",
        fieldLastName: "Last Name",
        fieldPhone: "Phone Number",
        fieldPhonePlaceholder: "+381 65 000 0000",
        fieldPhoneHelper: "Include country code · SMS confirmation",
        fieldEmail: "Email",
        continue: "Continue",
        confirm: "Confirm Reservation",
        edit: "Edit",
        successLabel: "Confirmed",
        successMessage: "We look forward to welcoming you.",
        successText:
          "Your reservation is confirmed. A confirmation SMS has been sent to your phone.",
        groupNote: "For groups of 10+ please contact us directly",
      },
      sr: {
        label: "Rezervacije",
        headline: "Rezervišite Sto",
        dividerLabel: "Četvrtak · Petak · Subota · 18:00 – 20:00",
        infoAvailable: "Dostupno",
        infoAvailableValue: "Četvrtak · Petak · Subota",
        infoService: "Servis",
        infoServiceValue: "18:00 – 20:00",
        infoContact: "Kontakt",
        infoDesc1: "Svako veče je intimno i ograničeno.",
        infoDesc2: "Preporučujemo rezervaciju unapred.",
        step1Label: "Vaša Poseta",
        step2Label: "Vaši Podaci",
        fieldDate: "Datum",
        fieldDateHelper: "Četvrtak, petak i subota",
        fieldGuests: "Broj Gostiju",
        fieldTime: "Vreme",
        fieldFirstName: "Ime",
        fieldLastName: "Prezime",
        fieldPhone: "Broj Telefona",
        fieldPhonePlaceholder: "+381 65 000 0000",
        fieldPhoneHelper: "Uključite pozivni broj · SMS potvrda",
        fieldEmail: "Imejl",
        continue: "Nastavi",
        confirm: "Potvrdi Rezervaciju",
        edit: "Izmeni",
        successLabel: "Potvrđeno",
        successMessage: "Radujemo se što ćemo vas ugostiti.",
        successText:
          "Vaša rezervacija je potvrđena. SMS potvrda je poslata na vaš telefon.",
        groupNote: "Za grupe od 10+ molimo kontaktirajte nas direktno",
      },
    },
  };

  for (const [section, { en, sr }] of Object.entries(seed)) {
    upsert.run(section, JSON.stringify(en), JSON.stringify(sr));
  }
}

function seedMenu(database) {
  const { count } = database
    .prepare("SELECT COUNT(*) as count FROM menu_items")
    .get();

  if (count > 0) return;

  const insert = database.prepare(`
    INSERT INTO menu_items
      (title, title_sr, courses, courses_sr, description, description_sr, price, tag, tag_sr, display_order)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const rows = [
    [
      "Delirium Madness Experience",
      "Delirium Madness Iskustvo",
      "Nine courses",
      "Devet kurseva",
      "Our most immersive journey — a full exploration of the kitchen's philosophy from first bite to last.",
      "Naše najimerzivnije putovanje — potpuna eksploracija filozofije kuhinje od prvog do poslednjeg zalogaja.",
      "14,000 RSD",
      "Signature",
      "Potpis",
      0,
    ],
    [
      "Delirium Experience",
      "Delirium Iskustvo",
      "Six courses",
      "Šest kurseva",
      "The essential Delirium Silence narrative, distilled into six precise and emotive courses.",
      "Esencijalna Delirium Silence naracija, destilisana u šest preciznih i emotivnih kurseva.",
      "12,000 RSD",
      null,
      null,
      1,
    ],
    [
      "Delirium Vegetarian Experience",
      "Delirium Vegetarijansko Iskustvo",
      "Six courses",
      "Šest kurseva",
      "A plant-forward tasting menu that proves vegetables can be the most complex ingredient on the table.",
      "Degustacioni meni bogat povrćem koji dokazuje da povrće može biti najsloženiji sastojak na stolu.",
      "9,000 RSD",
      "Vegetarian",
      "Vegetarijansko",
      2,
    ],
    [
      "Delirium Pescatarian Experience",
      "Delirium Pescatarijansko Iskustvo",
      "Six courses",
      "Šest kurseva",
      "The vegetarian experience enriched with the finest seasonal fish from Adriatic waters.",
      "Vegetarijansko iskustvo obogaćeno najfinijim sezonskim ribama iz voda Jadrana.",
      "11,000 RSD",
      "Pescatarian",
      "Pescatarijansko",
      3,
    ],
    [
      "Delirium Snack",
      "Delirium Snack",
      "Three courses",
      "Tri kursa",
      "A shorter, sharper cut of the Delirium experience — ideal for those short on time, never on taste.",
      "Kraći, oštriji isečak Delirium iskustva — idealan za one kojima nedostaje vremena, ali nikad ukusa.",
      "6,000 RSD",
      null,
      null,
      4,
    ],
    [
      "Delirium Vegetarian Snack",
      "Delirium Vegetarijanski Snack",
      "Three courses",
      "Tri kursa",
      "A compact vegetarian sequence — vibrant, light, and full of intent.",
      "Kompaktna vegetarijanska sekvenca — živahna, lagana i puna namere.",
      "5,000 RSD",
      "Vegetarian",
      "Vegetarijansko",
      5,
    ],
  ];

  for (const row of rows) {
    insert.run(...row);
  }
}
