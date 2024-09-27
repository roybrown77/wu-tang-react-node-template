const express = require('express');
const puppeteer = require('puppeteer');

let router = express.Router();

const promiseGetImage = (album) => {
  const getImage = async (resolve,reject) => {
    let browser;
    let page;

    try {
      console.log('getImage start: ' + album.searchTerm);

      browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        // timeout: 5000,
        // pipe: true,
        // ignoreHTTPSErrors: true,
        // headless: false
      });

      page = await browser.newPage();

      await page.setViewport({width: 1080, height: 1024});

      await page.setDefaultNavigationTimeout(5000);

      await page.goto('https://www.wikipedia.org/', { waitUntil: 'networkidle2' });

      await page.type("#searchInput", album.searchTerm);

      await page.click('.pure-button');

      await page.waitForNavigation();

      await page.waitForSelector('#mw-content-text > div.mw-content-ltr.mw-parser-output > table.infobox.vevent.haudio > tbody > tr:nth-child(2) > td > span > a > img');

      const image = await page.evaluate((sel) => {
        return document.querySelector(sel).getAttribute('src');
      }, '#mw-content-text > div.mw-content-ltr.mw-parser-output > table.infobox.vevent.haudio > tbody > tr:nth-child(2) > td > span > a > img');

      await browser.close();
      const coverArt = 'https:' + image.split(' ')[0];
      console.log('getImage end: ' + album.searchTerm);
      resolve({...album, coverArt});
    } catch (err) {
      if (browser) {
        await browser.close();
      }
      const error = album.searchTerm + ' error: ' + JSON.stringify(err);
      console.log(error);
      reject(error);
    }

    return;
  };

  return new Promise(getImage);
};

router.get('/albumcovers', async function (req, res) {
  let albumsFound = [];

  try {
    const albums = [
      {id: 1, searchTerm: 'Enter the Wu-Tang (36 Chambers)'},
      {id: 2, searchTerm: 'Return to the 36 Chambers: The Dirty Version'},
      {id: 3, searchTerm: 'Only Built 4 Cuban Linx'},
      {id: 4, searchTerm: 'Liquid Swords'},
      {id: 5, searchTerm: 'Ironman (Ghostface Killah album)'},
    ];

    const albumsSettled = await Promise.allSettled([
      promiseGetImage(albums[0]),
      promiseGetImage(albums[1]),
      promiseGetImage(albums[2]),
      promiseGetImage(albums[3]),
      promiseGetImage(albums[4]),
    ]);

    console.log('albumsSettled: ' + JSON.stringify(albumsSettled));
    albumsFound = albumsSettled.filter(album=>album.status === 'fulfilled').map(album=>album.value);
    console.log('albumsFound: ' + JSON.stringify(albumsFound));
  } catch (err) {
    console.log('albumcovers err', err);

    const error = 'error: ' + JSON.stringify(err);
    console.log(error);
  }

  res.status(200).send(albumsFound);
});

module.exports = router;