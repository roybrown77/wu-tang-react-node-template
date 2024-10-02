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
        timeout: 5000,
        pipe: true,
        ignoreHTTPSErrors: true,
        // headless: false
      });

      page = await browser.newPage();

      await page.setViewport({width: 1080, height: 1024});

      await page.setDefaultNavigationTimeout(5000);

      await page.goto('https://www.wikipedia1.org/', { waitUntil: 'networkidle2' });

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
  const cachedAlbums = [
    {id: 1, searchTerm: 'Enter the Wu-Tang (36 Chambers)', coverArt: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Wu-TangClanEntertheWu-Tangalbumcover.jpg/220px-Wu-TangClanEntertheWu-Tangalbumcover.jpg'},
    {id: 2, searchTerm: 'Return to the 36 Chambers: The Dirty Version', coverArt: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/Odb_welfare.jpg/220px-Odb_welfare.jpg'},
    {id: 3, searchTerm: 'Only Built 4 Cuban Linx', coverArt: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/17/Raekwon_only.jpg/220px-Raekwon_only.jpg'},
    {id: 4, searchTerm: 'Liquid Swords', coverArt: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/90/Liquidswords1995.png/220px-Liquidswords1995.png'},
    {id: 5, searchTerm: 'Ironman (Ghostface Killah album)', coverArt: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/45/Ironman1996.png/220px-Ironman1996.png'},
  ];

  try {
    const albumsSettled = await Promise.allSettled([
      promiseGetImage(cachedAlbums[0]),
      promiseGetImage(cachedAlbums[1]),
      promiseGetImage(cachedAlbums[2]),
      promiseGetImage(cachedAlbums[3]),
      promiseGetImage(cachedAlbums[4]),
    ]);

    console.log('albumsSettled: ' + JSON.stringify(albumsSettled));
    albumsFound = albumsSettled.filter(album=>album.status === 'fulfilled').map(album=>album.value);
    console.log('albumsFound: ' + JSON.stringify(albumsFound));
  } catch (err) {
    console.log('albumcovers err', err);

    const error = 'error: ' + JSON.stringify(err);
    console.log(error);
  }

  res.status(200).send(albumsFound.length > 0 ? albumsFound : cachedAlbums);
});

module.exports = router;