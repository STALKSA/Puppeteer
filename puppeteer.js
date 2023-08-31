const puppetter = require("puppeteer");

(async () => {
  const browser = await puppetter.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
    devtools: true,
  });
  const page = await browser.newPage();
  await page.goto("https://rbc.ru", { timeout: 200000 });

  const advSel1 = "#popmechanic-form-68242 > div > div.popmechanic-close";
  await page.waitForSelector(advSel1);
  await page.click(advSel1);

  const advSel2 =
    "body > div.live-tv-popup.js-live-tv-popup.active > div.live-tv-popup__head > div";
  await page.waitForSelector(advSel2);
  await page.click(advSel2);

  const notNowSel =
    "body > div.push-allow.js-push-allow > div.push-allow__block.js-push-allow-block.js-push-allow-block-subscribe.active > div.push-allow__controls > div:nth-child(2) > a";
  await page.waitForSelector(notNowSel);
  await page.click(notNowSel);

  // await page.waitForTimeout(5000);

  // const emailSel = 'input[type="email"]';
  // await page.type(emailSel, 'yourmail@gmail.com', { delay: 100 });

  // await page.screenshot({ path: 'example.png'});

  const news = await page.evaluate(() => {
    const newElems = document.querySelectorAll("span.main__feed__title");
    const result = [];
    for (i = 0; i < newElems.length; i++) {
      result.push(newElems[i].innerText);
    }
    return result;
  });

  console.log(news);

  await browser.close();
})();
