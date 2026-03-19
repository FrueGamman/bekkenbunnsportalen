"use client";

import { useLanguage } from "../../../context/LanguageContext";
import { CommonExerciseSection } from '../../../components/CommonExerciseSection';

const EXERCISES_DATA = {
  no: {
    pageTitle: "Øvelser",
    tryYourselfTitle: "Prøv selv:",
    step1Text: "Knip (lukk) igjen rundt urinrør, skjede- og endetarmsåpning.",
    genderInstructions: [
      {
        title: "Kvinner",
        text: "Kvinner: Kjenn at området mellom skjede og endetarm trekker seg litt opp og inn i kroppen. Du kan også legge et par fingre på det samme stedet (mellomkjøttet/perineum) og kjenne at det løftes litt vekk fra fingrene dine når du bruker bekkenbunnen riktig.",
        icon: "♀",
        iconColor: "#4993C1"
      },
      {
        title: "Menn",
        text: 'Menn: Kjenn at området mellom pungen og endetarmen (mellomkjøttet/perineum) trekker seg litt opp og inn i kroppen. Penis vil gjøre en "vippe-bevegelse" som følge av muskeldraget rundt urinrøret.',
        icon: "♂",
        iconColor: "#053870"
      }
    ],
    tipsTitle: "Tips:",
    tipsText: "Tips: Forestill deg at du skal holde igjen for luft eller stoppe urinstrålen. Det er disse musklene du skal trene.",
    exerciseSteps: [
      { number: 2, text: "Mage-, lår- og setemusklene skal være avslappet. Fokuser på å bruke riktig muskulatur og unngå å spenne annen muskulatur." },
      { number: 3, text: "Begynn med å holde i 2-3 sekunder, slipp like lenge. Det er like viktig å hvile helt mellom hvert knip, som det er å knipe, ellers vil man ikke få riktig tak." },
      { number: 4, text: "Gjenta 15 ganger morgen og kveld. For noen kan 15 knip være mye i starten. Det er viktigere og få til gode og korrekte knip, enn flest mulig. Antall knip kan økes etterhvert." },
      { number: 5, text: 'Øk knipetiden litt etter litt. For eksempel kan du øke med 1-2 sekunder hver uke, til du er oppe i 10-12 sekunder. Knipene skal være kontrollerte. Dersom taket "slipper" er det bedre å redusere knipetiden slik at det blir et sterkt og godt knip.' }
    ],
    videoSectionTitle: "Instruksjonsvideoer for bekkenbunnstrening for kvinner",
    videoSectionDescription: "Videoer om bekkenbunnstrening for kvinner etter svangerskap og fødsel.",
    videos: [
      { src: "https://www.youtube.com/embed/ZTMpEr6GLp8?rel=0&modestbranding=1&controls=1&showinfo=0&fs=1", title: "Bekkenbunnstrening etter fødsel" },
      { src: "https://player.vimeo.com/video/65880144", title: "Øvelser for å styrke bekkenbunnen" }
    ],
    smartphoneApps: {
      title: "Smarttelefon applikasjoner",
      description: "Det er utviklet flere applikasjoner til smarttelefoner for hjelp med bekkenbunnstrening. Et eksempel er appen Tät®. Appen er svensk og tilgjengelig på flere språk, kostnadsfritt.",
      linkText: "Les mer om disse programmene på tät.nu",
      linkUrl: "https://tät.nu"
    }
  },
  en: {
    pageTitle: "Exercises",
    tryYourselfTitle: "Try yourself:",
    step1Text: "Squeeze (close) around the urethra, vaginal and anal openings.",
    genderInstructions: [
      {
        title: "Women",
        text: "Women: Feel that the area between the vagina and rectum pulls slightly up and into the body. You can also place a couple of fingers on the same spot (perineum) and feel that it lifts slightly away from your fingers when you use the pelvic floor correctly.",
        icon: "♀",
        iconColor: "#4993C1"
      },
      {
        title: "Men",
        text: "Men: Feel that the area between the scrotum and rectum (perineum) pulls slightly up and into the body. The penis will make a 'rocking motion' as a result of the muscle pull around the urethra.",
        icon: "♂",
        iconColor: "#053870"
      }
    ],
    tipsTitle: "Tips:",
    tipsText: "Tip: Imagine that you are going to hold back gas or stop the urine stream. These are the muscles you should train.",
    exerciseSteps: [
      { number: 2, text: "Abdominal, thigh and buttock muscles should be relaxed. Focus on using the right musculature and avoid tensing other muscles." },
      { number: 3, text: "Start by holding for 2-3 seconds, release for the same duration. It is equally important to rest completely between each squeeze, as it is to squeeze, otherwise you will not get the right grip." },
      { number: 4, text: "Repeat 15 times morning and evening. For some, 15 squeezes may be a lot at the start. It is more important to achieve good and correct squeezes than as many as possible. The number of squeezes can be increased gradually." },
      { number: 5, text: "Increase the squeeze time little by little. For example, you can increase by 1-2 seconds each week, until you reach 10-12 seconds. The squeezes should be controlled. If the grip 'slips,' it is better to reduce the squeeze time so that it becomes a strong and good squeeze." }
    ],
    videoSectionTitle: "Instructional Videos for Women's Pelvic Floor Training",
    videoSectionDescription: "Videos about pelvic floor training for women after pregnancy and childbirth.",
    videos: [
      { src: "https://www.youtube.com/embed/ZTMpEr6GLp8?rel=0&modestbranding=1&controls=1&showinfo=0&fs=1", title: "Pelvic Floor Training After Birth" },
      { src: "https://player.vimeo.com/video/65880144", title: "Exercises to Strengthen the Pelvic Floor" }
    ],
    smartphoneApps: {
      title: "Smartphone Applications",
      description: "Several smartphone applications have been developed to help with pelvic floor training. An example is the Tät® app. The app is Swedish and available in several languages, free of charge.",
      linkText: "Read more about these programs at tät.nu",
      linkUrl: "https://tät.nu"
    }
  }
}

export const Exercises = () => {
  const { language } = useLanguage();
  const data = EXERCISES_DATA[language];

  return (
    <div id="exercises">
      <CommonExerciseSection {...data} />
    </div>
  );
};
