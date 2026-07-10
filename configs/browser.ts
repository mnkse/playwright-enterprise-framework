export const browserConfig = {
  headless: process.env.CI === "true",
  viewport: {
    width: 1280,
    height: 720,
  },
};
