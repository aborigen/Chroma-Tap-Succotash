export const translations = {
  en: {
    title: "CHROMA",
    subtitle: "TAP",
    description: "Match the dot with the background color.",
    playNow: "PLAY NOW",
    generateIcon: "Generate Icon Idea",
    tryAgain: "TRY AGAIN",
    gameOver: "GAME OVER",
    score: "Score",
    best: "Best",
    targetColor: "Target Color",
    time: "Time",
    tapHint: "Tap when colors match",
    aiTitle: "AI Icon Generator",
    generating: "Generating...",
    generateAnother: "Generate Another",
    generateBtn: "Generate Icon",
    aiHint: "This uses Genkit + Imagen 4 to create a square icon concept based on Chroma Tap's visual identity."
  },
  ru: {
    title: "CHROMA",
    subtitle: "TAP",
    description: "Сопоставьте точку с цветом фона.",
    playNow: "ИГРАТЬ",
    generateIcon: "Идея иконки",
    tryAgain: "ЕЩЕ РАЗ",
    gameOver: "ИГРА ОКОНЧЕНА",
    score: "Счёт",
    best: "Рекорд",
    targetColor: "Цвет цели",
    time: "Время",
    tapHint: "Нажми, когда цвета совпадут",
    aiTitle: "AI Генератор иконок",
    generating: "Генерация...",
    generateAnother: "Создать другую",
    generateBtn: "Создать иконку",
    aiHint: "Использует Genkit + Imagen 4 для создания концепции квадратной иконки на основе визуального стиля Chroma Tap."
  }
};

export type Language = 'en' | 'ru';
export type TranslationStrings = typeof translations.en;
