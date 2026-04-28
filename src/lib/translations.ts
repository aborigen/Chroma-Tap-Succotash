export const translations = {
  en: {
    title: "CHROMA",
    subtitle: "TAP",
    description: "Match the dot with the background color.",
    playNow: "PLAY NOW",
    tryAgain: "TRY AGAIN",
    gameOver: "GAME OVER",
    score: "Score",
    best: "Best",
    targetColor: "Target Color",
    time: "Time",
    tapHint: "Tap when colors match",
    switchLanguage: "RU"
  },
  ru: {
    title: "CHROMA",
    subtitle: "TAP",
    description: "Сопоставьте точку с цветом фона.",
    playNow: "ИГРАТЬ",
    tryAgain: "ЕЩЕ РАЗ",
    gameOver: "ИГРА ОКОНЧЕНА",
    score: "Счёт",
    best: "Рекорд",
    targetColor: "Цвет цели",
    time: "Время",
    tapHint: "Нажми, когда цвета совпадут",
    switchLanguage: "EN"
  }
};

export type Language = 'en' | 'ru';
export type TranslationStrings = typeof translations.en;
