import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    // agrega otros alias si los usas
  },
  // Puedes agregar otras opciones según tu necesidad
};

export default config;