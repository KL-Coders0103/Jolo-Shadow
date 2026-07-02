module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src/tests"],
  setupFilesAfterEnv: [
    "<rootDir>/src/tests/setup.ts",
  ],
  collectCoverage: true,
  coverageDirectory: "coverage",
  testTimeout: 30000,
};