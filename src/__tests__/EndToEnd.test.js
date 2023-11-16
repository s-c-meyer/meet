import puppeteer from "puppeteer";

describe('Scenario 2: Show/Hide Event Details', () => {
  let browser;
  let page;
  beforeAll(async () => {
    browser = await puppeteer.launch({
      // headless: false,
      // slowMo: 250, //slow down by 250 ms
      // timeout: 0 //removes any puppeteer/browser timeout limitations 
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000');
    await page.waitForSelector('.event');
  });

  afterAll(() => {
    browser.close();
  })

  test('An element is collapsed by default', async () => {
    const eventDetails = await page.$('.event-expanded'); //the page.$() method is used to select an element on the page, here using class names. 
    expect(eventDetails).toBeNull();
  });

  test('User can expand an event to see its details', async () => {
    await page.click('.event .detail');
    const eventDetails = await page.$('.event .description');
    expect(eventDetails).toBeDefined();
  });

  test('User can collapse an event to hide details', async () => {
    await page.click('.event .detail');
    const eventDetails = await page.$('.event .description');
    expect(eventDetails).toBeNull(); //how does this work? Because the browser closes and opens every test?
  });
});

// describe('Scenario 1: Filter Events By City', () => {
//   let browser;
//   let page;
//   beforeAll(async () => {
//     browser = await puppeteer.launch({
//       // headless: false,
//       // slowMo: 250, //slow down by 250 ms
//       // timeout: 0 //removes any puppeteer/browser timeout limitations 
//     });
//     page = await browser.newPage();
//     await page.goto('http://localhost:3000');
//     await page.waitForSelector('.event');
//   });

//   afterAll(() => {
//     browser.close();
//   })

//   test('When user has\'nt searched for a city, show upcoming events from all cities', async () => {
//     const citySearchInput = await page.$('#city-search');
//     expect(await citySearchInput.$eval('.city', node => node.value)).toBe(""); // test if nothing has been searched for
//     const event = await page.$('.event');
//     expect(await event.$eval('.event-location', node=> node.innerText)).toBe("Berlin, Germany"); // returns London, UK
//   })
// });

