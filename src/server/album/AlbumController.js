const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const puppeteer = require('puppeteer-core');
const chromium = require('chrome-aws-lambda');

let router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const albumRepository = require('./AlbumRepository');

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
    console.log('image: https:' + image.split(' ')[0]);
    return {...album, coverArt: 'https:' + image.split(' ')[0]};
  } catch (err) {
    if (browser) {
      await browser.close();
    }
    
    console.log(album.searchTerm + ' error: ' + JSON.stringify(err));
    return album;
  }
};

router.get('/albumcovers', async function (req, res) {
  const albums = [
    {id: 1, searchTerm: 'Enter the Wu-Tang (36 Chambers)'},
    //{id: 2, searchTerm: 'Ironman (Ghostface Killah album)'},
    //{id: 3, searchTerm: 'Liquid Swords'},
    {id: 4, searchTerm: 'Only Built 4 Cuban Linx'}
  ];

  const promises = albums.map((album,index)=>{
    return getImage(albums[index]);
  });

  const albumsFound = await Promise.all(promises);

  res.status(200).send(albumsFound);
});

module.exports = router;