const express = require('express');
const puppeteer = require('puppeteer-core');
const chromium = require('chrome-aws-lambda');

let router = express.Router();

const getImage = async (album) => {
  let browser;
  let page;

  try {
    const browserFetcher = puppeteer.createBrowserFetcher();
    const revisionInfo = await browserFetcher.download('869685');

    browser = await chromium.puppeteer.launch({
      timeout: 15000,
      pipe: true,
      ignoreHTTPSErrors: true,
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: revisionInfo.executablePath,
      //headless: chromium.headless
    });

    page = await browser.newPage();

    await page.goto('https://en.wikipedia.org/wiki/Main_Page', { waitUntil: 'networkidle2' });

    await page.type("#searchInput", album.searchTerm);

    await page.click('#searchButton');

    await page.waitForNavigation();

    await page.waitForSelector('#mw-content-text > div > table > tbody > tr:nth-child(2) > td > a > img');

    const image = await page.evaluate((sel) => {
      return document.querySelector(sel).getAttribute('srcset');
    }, '#mw-content-text > div > table.infobox.vevent.haudio > tbody > tr:nth-child(2) > td > a > img');

    await browser.close();
    const coverArt = 'https:' + image.split(' ')[0];
    console.log(coverArt);
    //if (album.id === 1) throw 'test';
    return Promise.resolve({...album, coverArt});
  } catch (err) {
    if (browser) {
      await browser.close();
    }
    const error = album.searchTerm + ' error: ' + JSON.stringify(err);
    console.log(error);
    return Promise.reject(error);
  }
};

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

router.get('/albumcovers', async function (req, res) {
  let albumsFound = [];

  const binaryDiceRoll = getRandomIntInclusive(0,1);

  if (binaryDiceRoll === 1) {
    try {
      const albums = [
        {id: 1, searchTerm: 'Enter the Wu-Tang (36 Chambers)'},
        {id: 2, searchTerm: 'Ironman (Ghostface Killah album)'},
        {id: 3, searchTerm: 'Liquid Swords'},
        {id: 4, searchTerm: 'Only Built 4 Cuban Linx'}
      ];

      const promises = albums.map((album,index)=>{
        return getImage(albums[index]);
      });

      const albumsSettled = await Promise.allSettled(promises);
      console.log('albumsSettled: ' + JSON.stringify(albumsSettled));
      albumsFound = albumsSettled.filter(album=>album.status === 'fulfilled').map(album=>album.value);
      console.log('albumsFound: ' + JSON.stringify(albumsFound));
    } catch (err) {
      const error = 'error: ' + JSON.stringify(err);
      console.log(error);
    }
  }

  res.status(200).send(albumsFound);
});

module.exports = router;