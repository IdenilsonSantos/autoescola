module.exports = {
  testEnvironment: "jsdom", // Simula o ambiente de navegador
  transform: {
    "^.+\\.tsx?$": "ts-jest", // Para TypeScript, se necessário
    "^.+\\.jsx?$": "babel-jest", // Para JSX
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Se você estiver usando alias no Vite
  },
  setupFilesAfterEnv: [
    "@testing-library/jest-dom/extend-expect", // Para usar as expectativas adicionais como `toBeInTheDocument()`
  ],
};