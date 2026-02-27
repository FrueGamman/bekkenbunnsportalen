import axios from 'axios';
import { COMMON_PROBLEMS_DATA } from '../src/conditions/pregnancy/components/common-problems-data.ts';
import * as fs from 'fs';

const DIRECTUS_URL = 'https://directus-cms.sliplane.app';
const TOKEN = 'CrroW4IZgGtsGuJWNayMuay0hnRGO6JO';
const HEADERS = {
    Authorization: `Bearer ${TOKEN}`,
    'Content-Type': 'application/json',
};

// Extracted from TextbookAccordion.tsx
const TEXTBOOK_SECTIONS = {
    no: [
        {
            id: "bekkenbunnen",
            title: "Bekkenbunnen",
            content: [
                "Bekkenbunnen er en muskelplate i bunnen av bekkenet som har mange viktige funksjoner. Den består av flere lag med muskler og bindevev som strekker seg fra skambenet foran til halebeinet bak, og mellom sitteknoklene på sidene.",
                "Musklene har både frivillig og ufrivillig kontroll. Den frivillige delen kan du styre selv, mens den ufrivillige delen arbeider automatisk.",
                "Bekkenbunnen støtter opp underlivsorganene (blære, livmor og endetarm) og bidrar til lukking av urinrør og endetarmsåpning.",
                "Under graviditet og fødsel utsettes bekkenbunnen for stor belastning på grunn av vekten fra barnet og livmoren."
            ]
        },
        {
            id: "underlivet-graviditet",
            title: "Underlivet i graviditeten",
            content: [
                "Under graviditeten skjer det mange endringer i underlivet som kan påvirke normale funksjoner.",
                "Hormonelle endringer gjør vevet mer elastisk for å forberede seg til fødsel.",
                "Vekten fra det voksende barnet og livmoren legger press på bekkenbunnen og andre strukturer.",
                "Disse endringene kan føre til ulike plager som urinlekkasje, forstoppelse og ubehag."
            ]
        },
        {
            id: "forlosningsmetode",
            title: "Forløsningsmetode",
            content: [
                "Måten barnet fødes på kan påvirke bekkenbunnen og risikoen for senere plager.",
                "Vaginal fødsel innebærer at bekkenbunnen må strekke seg betydelig.",
                "Keisersnitt unngår belastning på bekkenbunnen under fødsel, men graviditeten i seg selv påvirker musklene.",
                "Lang utdrivningstid, store barn og bruk av tang/sugekopp kan øke risikoen for skader."
            ]
        },
        {
            id: "fodselsrifter",
            title: "Fødselsrifter",
            content: [
                "Fødselsrifter er vanlige og kan påvirke bekkenbunnens funksjon.",
                "Rifter klassifiseres i ulike grader avhengig av hvor dype de er.",
                "Mindre rifter heler vanligvis godt av seg selv.",
                "Større rifter som involverer lukkemusklene krever spesiell oppfølging og behandling."
            ]
        },
        {
            id: "underlivsframfall",
            title: "Underlivsframfall / prolaps",
            content: [
                "Prolaps oppstår når bekkenbunnen ikke lenger gir tilstrekkelig støtte til underlivsorganene.",
                "Dette kan føre til at blære, livmor eller endetarm synker ned i skjeden.",
                "Symptomer kan være tyngdefølelse, problemer med å tømme blære eller tarm, og synlige utbulinger.",
                "Behandling kan være bekkenbunnstrening, pessarbruk eller kirurgi avhengig av alvorlighetsgrad."
            ]
        },
        {
            id: "blasefunksjon",
            title: "Blærefunksjon",
            content: [
                "Blæren lagrer urin og tømmes når vi bestemmer det.",
                "Under graviditet kan blærefunksjonen påvirkes av hormonelle endringer og press fra livmoren.",
                "Vanlige problemer er hyppig vannlating, urinlekkasje og følelse av ufullstendig tømming.",
                "Bekkenbunnstrening og riktige toalettvaner kan hjelpe med mange blæreproblemer."
            ]
        },
        {
            id: "tarmfunksjon",
            title: "Tarmfunksjon",
            content: [
                "Normal tarmfunksjon innebærer regelmessig og kontrollert avføring.",
                "Graviditet kan påvirke tarmfunksjonen gjennom hormonelle endringer og fysisk press.",
                "Vanlige problemer er forstoppelse, hemoroider og problemer med å kontrollere luft eller avføring.",
                "Riktig kosthold, væskeinntak og bekkenbunnstrening kan bedre tarmfunksjonen."
            ]
        },
        {
            id: "samleie",
            title: "Samleie",
            content: [
                "Endringer i underlivet kan påvirke seksualfunksjonen under graviditet og etter fødsel.",
                "Vanlige problemer er smerter ved inntrengning, tørre slimhinner og redusert følelse.",
                "Mange problemer er midlertidige og bedrer seg med tid.",
                "Det er viktig å kommunisere med partner og søke hjelp hvis problemene vedvarer."
            ]
        },
        {
            id: "kvinnelig-omskjering",
            title: "Kvinnelig omskjæring",
            content: [
                "Kvinnelig omskjæring kan påvirke graviditet, fødsel og etterfølgende plager.",
                "Det kan være nødvendig med spesiell oppfølging under graviditet og fødsel.",
                "Komplikasjoner kan inkludere problemer med vannlating, menstruasjon og samleie.",
                "Spesialisert helsehjelp er tilgjengelig for kvinner som har vært utsatt for omskjæring."
            ]
        },
        {
            id: "sok-hjelp",
            title: "Søk hjelp",
            content: [
                "Det er viktig å søke hjelp hvis plager påvirker dagliglivet eller livskvaliteten.",
                "Start med å kontakte fastlege eller jordmor for veiledning.",
                "Finn en spesialisert bekkenbunnsfysioterapeut på: https://fysio.no/kvinnehelse",
                "Mange problemer kan behandles effektivt hvis de oppdages tidlig.",
                "Ikke vær redd for å snakke om underlivsplager - det er vanlige problemer som helsepersonell er vant til å håndtere."
            ]
        }
    ],
    en: [
        {
            id: "bekkenbunnen",
            title: "Pelvic Floor",
            content: [
                "The pelvic floor is a muscle plate at the bottom of the pelvis that has many important functions. It consists of several layers of muscles and connective tissue that stretch from the pubic bone in front to the tailbone behind, and between the sitting bones on the sides.",
                "The muscles have both voluntary and involuntary control. The voluntary part you can control yourself, while the involuntary part works automatically.",
                "The pelvic floor supports the pelvic organs (bladder, uterus and rectum) and contributes to closing the urethra and anal opening.",
                "During pregnancy and childbirth, the pelvic floor is subjected to great stress due to the weight of the baby and uterus."
            ]
        },
        {
            id: "underlivet-graviditet",
            title: "Pelvic Area During Pregnancy",
            content: [
                "During pregnancy, many changes occur in the pelvic area that can affect normal functions.",
                "Hormonal changes make the tissue more elastic to prepare for childbirth.",
                "The weight from the growing baby and uterus puts pressure on the pelvic floor and other structures.",
                "These changes can lead to various problems such as urinary incontinence, constipation and discomfort."
            ]
        },
        {
            id: "forlosningsmetode",
            title: "Delivery Method",
            content: [
                "The way the baby is born can affect the pelvic floor and the risk of later problems.",
                "Vaginal delivery involves the pelvic floor having to stretch considerably.",
                "Cesarean section avoids stress on the pelvic floor during delivery, but pregnancy itself affects the muscles.",
                "Long delivery time, large babies and use of forceps/vacuum can increase the risk of injury."
            ]
        },
        {
            id: "fodselsrifter",
            title: "Perineal Tears",
            content: [
                "Perineal tears are common and can affect pelvic floor function.",
                "Tears are classified into different degrees depending on how deep they are.",
                "Minor tears usually heal well on their own.",
                "Larger tears involving the sphincter muscles require special follow-up and treatment."
            ]
        },
        {
            id: "underlivsframfall",
            title: "Pelvic Organ Prolapse",
            content: [
                "Prolapse occurs when the pelvic floor no longer provides adequate support for the pelvic organs.",
                "This can cause the bladder, uterus or rectum to descend into the vagina.",
                "Symptoms can be heaviness, problems emptying bladder or bowel, and visible bulges.",
                "Treatment can be pelvic floor training, pessary use or surgery depending on severity."
            ]
        },
        {
            id: "blasefunksjon",
            title: "Bladder Function",
            content: [
                "The bladder stores urine and is emptied when we decide.",
                "During pregnancy, bladder function can be affected by hormonal changes and pressure from the uterus.",
                "Common problems are frequent urination, urinary incontinence and feeling of incomplete emptying.",
                "Pelvic floor training and proper toilet habits can help with many bladder problems."
            ]
        },
        {
            id: "tarmfunksjon",
            title: "Bowel Function",
            content: [
                "Normal bowel function involves regular and controlled bowel movements.",
                "Pregnancy can affect bowel function through hormonal changes and physical pressure.",
                "Common problems are constipation, hemorrhoids and problems controlling gas or stool.",
                "Proper diet, fluid intake and pelvic floor training can improve bowel function."
            ]
        },
        {
            id: "samleie",
            title: "Sexual Intercourse",
            content: [
                "Changes in the pelvic area can affect sexual function during pregnancy and after childbirth.",
                "Common problems are pain during penetration, dry mucous membranes and reduced sensation.",
                "Many problems are temporary and improve with time.",
                "It is important to communicate with your partner and seek help if problems persist."
            ]
        },
        {
            id: "kvinnelig-omskjering",
            title: "Female Circumcision",
            content: [
                "Female circumcision can affect pregnancy, childbirth and subsequent problems.",
                "Special follow-up during pregnancy and childbirth may be necessary.",
                "Complications can include problems with urination, menstruation and intercourse.",
                "Specialized healthcare is available for women who have been subjected to circumcision."
            ]
        },
        {
            id: "sok-hjelp",
            title: "Seek Help",
            content: [
                "It is important to seek help if problems affect daily life or quality of life.",
                "Start by contacting your GP or midwife for guidance.",
                "Find a specialized pelvic health physiotherapist at: https://fysio.no/kvinnehelse",
                "Many problems can be treated effectively if detected early.",
                "Don't be afraid to talk about pelvic floor problems - they are common problems that healthcare professionals are used to handling."
            ]
        }
    ]
};


async function migrate() {
    console.log("Starting Migration...");

    // 2. Migrate Textbook Chapters
    console.log("Migrating Textbook Chapters and Sections...");
    const chaptersByLang = TEXTBOOK_SECTIONS.no.map((noChapter, idx) => ({
        no: noChapter,
        en: TEXTBOOK_SECTIONS.en[idx]
    }));

    for (let i = 0; i < chaptersByLang.length; i++) {
        const ch = chaptersByLang[i];

        // Ensure chapter exists in DB
        const chapterPayload = {
            title_no: ch.no.title,
            title_en: ch.en?.title || "",
            sort: i + 1,
            condition_id: 1, // Link to Pregnancy Condition
        };

        try {
            // Check if it already exists
            const existingRes = await axios.get(`${DIRECTUS_URL}/items/Pregnancy_Chapters?filter[title_no][_eq]=${encodeURIComponent(ch.no.title)}`, { headers: HEADERS });

            let chapterId;
            if (existingRes.data.data.length > 0) {
                chapterId = existingRes.data.data[0].id;
                console.log(`Chapter ${ch.no.title} already exists (ID: ${chapterId})`);
            } else {
                const res = await axios.post(`${DIRECTUS_URL}/items/Pregnancy_Chapters`, chapterPayload, { headers: HEADERS });
                chapterId = res.data.data.id;
                console.log(`Created Chapter ${ch.no.title} (ID: ${chapterId})`);
            }

            // Set sections recursively
            const sectionsArray = [{
                id: 1,
                title_no: ch.no.title,
                title_en: ch.en?.title || "",
                content_no: ch.no.content.map(p => `<p>${p}</p>`).join(""),
                content_en: ch.en?.content.map((p: string) => `<p>${p}</p>`).join("") || ""
            }];

            await axios.patch(`${DIRECTUS_URL}/items/Pregnancy_Chapters/${chapterId}`, { sections: sectionsArray }, { headers: HEADERS });
            console.log(`Updated sections for chapter ${ch.no.title}`);

        } catch (e: any) {
            console.error(`Failed on chapter ${ch.no.title}:`, e.response?.data || e.message);
        }
    }


    console.log("Migrating Pregnancy Problems (from old UpgradedPregnancyContent tabs)...");

    // We already have 10 problems created, but we need to update the rich text tabs.
    // COMMON_PROBLEMS_DATA

    // Helper to format problems subsets
    function formatProblemContent(section: any, tabType: 'about' | 'symptoms' | 'selfHelp' | 'seekHelp') {
        let html = "";

        if (tabType === 'about') {
            if (section.intro) html += `<p>${section.intro}</p>`;
            if (section.types) html += `<ul>${section.types.map((t: any) => `<li>${t}</li>`).join('')}</ul>`;
            if (section.keyPoints) html += `<ul>${section.keyPoints.map((t: any) => `<li>${t}</li>`).join('')}</ul>`;
            if (section.initialAdvice) html += `<ul>${section.initialAdvice.map((t: any) => `<li>${t}</li>`).join('')}</ul>`;
        }
        else if (tabType === 'symptoms') {
            const subs = section.subsections?.filter((sub: any) => sub.id.includes('symptoms') || sub.id === 'symptoms');
            if (subs) {
                subs.forEach((sub: any) => {
                    if (subs.length > 1) html += `<h4>${sub.title}</h4>`;
                    if (sub.items) html += `<ul>${sub.items.map((i: any) => `<li>${i}</li>`).join('')}</ul>`;
                });
            }
        }
        else if (tabType === 'selfHelp') {
            const subs = section.subsections?.filter((sub: any) => sub.id === 'selfhelp' || sub.id.includes('selfhelp') || (sub.id.includes('advice') && !sub.id.includes('help')));
            if (subs) {
                subs.forEach((sub: any) => {
                    if (subs.length > 1) html += `<h4>${sub.title}</h4>`;
                    if (sub.description) html += `<p>${sub.description}</p>`;
                    if (sub.items) html += `<ul>${sub.items.map((i: any) => `<li>${i}</li>`).join('')}</ul>`;
                });
            }
        }
        else if (tabType === 'seekHelp') {
            const subs = section.subsections?.filter((sub: any) => (sub.id === 'seek-help' || sub.id.includes('help')) && !sub.id.includes('selfhelp') && !sub.id.includes('advice'));
            if (subs) {
                subs.forEach((sub: any) => {
                    if (subs.length > 1) html += `<h4>${sub.title}</h4>`;
                    if (sub.description) html += `<p>${sub.description}</p>`;
                    if (sub.items) html += `<ul>${sub.items.map((i: any) => `<li>${i}</li>`).join('')}</ul>`;
                });
            }
        }

        return html;
    }

    const sectionsNo = COMMON_PROBLEMS_DATA.no.sections;
    const sectionsEn = COMMON_PROBLEMS_DATA.en.sections;

    // Fetch existing problems to update them
    const probs = await axios.get(`${DIRECTUS_URL}/items/Pregnancy_Problems`, { headers: HEADERS });
    const existingProbs = probs.data.data;

    for (let i = 0; i < sectionsNo.length; i++) {
        const secNo = sectionsNo[i] as any;
        const secEn = sectionsEn.find((s: any) => s.id === secNo.id) as any;

        // Find match in CMS by name or roughly by name
        let dbProb = existingProbs.find((p: any) => p.name_no && (
            p.name_no.toLowerCase().includes(secNo.title.toLowerCase()) ||
            secNo.title.toLowerCase().includes(p.name_no.toLowerCase())
        ));

        if (!dbProb) {
            console.log(`Could not find problem in directus for: ${secNo.title}, creating...`);
            // Create
            const res = await axios.post(`${DIRECTUS_URL}/items/Pregnancy_Problems`, {
                name_no: secNo.title,
                name_en: secEn?.title,
                sort: i + 1,
                condition_id: 1
            }, { headers: HEADERS });
            dbProb = res.data.data;
        }

        const payload = {
            about_no: formatProblemContent(secNo, 'about'),
            symptoms_no: formatProblemContent(secNo, 'symptoms'),
            self_help_no: formatProblemContent(secNo, 'selfHelp'),
            seek_help_no: formatProblemContent(secNo, 'seekHelp'),

            about_en: secEn ? formatProblemContent(secEn, 'about') : "",
            symptoms_en: secEn ? formatProblemContent(secEn, 'symptoms') : "",
            self_help_en: secEn ? formatProblemContent(secEn, 'selfHelp') : "",
            seek_help_en: secEn ? formatProblemContent(secEn, 'seekHelp') : "",
        };

        if (Object.values(payload).some(x => typeof x === 'string' && x.length > 0)) {
            try {
                await axios.patch(`${DIRECTUS_URL}/items/Pregnancy_Problems/${dbProb.id}`, payload, { headers: HEADERS });
                console.log(`Updated problem content for ${secNo.title}`);
            } catch (e: any) {
                console.error(`Failed to update problem ${secNo.title}:`, e.response?.data || e.message);
            }
        }
    }

    console.log("Migration Complete.");
}

migrate();
