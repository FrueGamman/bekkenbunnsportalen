"use client";

import { useLanguage } from "../../../context/LanguageContext";
import { CommonExerciseSection } from '../../../components/CommonExerciseSection';

/*
const EXERCISES_DATA = {
  ...
}
*/
const EXERCISES_DATA = {
  no: {
    pageTitle: "Øvelser",
    tryYourselfTitle: "",
    step1Text: "",
    genderInstructions: [] as unknown[],
    tipsTitle: "",
    tipsText: "",
    exerciseSteps: [] as unknown[],
    videoSectionTitle: "",
    videoSectionDescription: "",
    videos: [] as unknown[],
    smartphoneApps: { title: "", description: "", linkText: "", linkUrl: "" }
  },
  en: {
    pageTitle: "Exercises",
    tryYourselfTitle: "",
    step1Text: "",
    genderInstructions: [] as unknown[],
    tipsTitle: "",
    tipsText: "",
    exerciseSteps: [] as unknown[],
    videoSectionTitle: "",
    videoSectionDescription: "",
    videos: [] as unknown[],
    smartphoneApps: { title: "", description: "", linkText: "", linkUrl: "" }
  }
}

export const Exercises = () => {
  const { language } = useLanguage();
  const data = EXERCISES_DATA[language];

  return <CommonExerciseSection {...data} />;
};
