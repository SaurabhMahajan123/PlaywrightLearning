// @ts-check
import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  testDir: './tests',
  timeout : 10 * 3000,
  expect:{
    timeout : 50 * 1000
  },
  reporter: [
    ['html'],
    ['list']
  ],

  use :{
    browserName : 'chromium',
    headless : false,
    screenshot : 'on',
    trace : 'retain-on-failure'
  }

});

