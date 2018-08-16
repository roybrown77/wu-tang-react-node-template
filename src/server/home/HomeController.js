const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const moment = require('moment-timezone');
const puppeteer = require('puppeteer');

let router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

const homeRepository = require('./HomeRepository');

const omit = require('lodash/omit');
const get = require('lodash/get');
const uniq = require('lodash/uniq');
const transform = require('lodash/transform');
const groupBy = require('lodash/groupBy');
const some = require('lodash/some');
const sortBy = require('lodash/sortBy');

const getImage = async (term) => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: false
  });

  const page = await browser.newPage();

  try {
    await page.setViewport({width:1000,height:700});

    await page.goto('https://en.wikipedia.org/wiki/Main_Page');

    await page.type("#searchInput", term);

    await page.click('#searchButton');

    await page.waitForNavigation();

    await page.click('#mw-content-text > div > ul > li:nth-child(1) > div.mw-search-result-heading > a');

    await page.waitFor(1000);

    const image = await page.evaluate((sel) => {
      return document.querySelector(sel).getAttribute('srcset');
    }, '#mw-content-text > div > table.infobox.vevent.haudio > tbody > tr:nth-child(2) > td > a > img');

    await page.close();
    await browser.close();

    console.log('image: https:' + image.split(' ')[0]);
    
    return 'https:' + image.split(' ')[0];
  } catch (err) {
    console.log(err);
    await page.close();
    await browser.close();
    return err;
  }
};

router.get('/homes', async function (req, res) {
  const albums = await Promise.all([
    getImage('wu-tang 36 chambers album'),
    getImage('method man tical album'),
    getImage('gza liquid swords album'),
    getImage('raekwon only built for cuban links album'),  
    getImage('ghostface ironman album'), 
  ]);
  res.status(200).send(albums);
});

const getBulkImages = async (terms) => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: false
  });

  const page = await browser.newPage();

  await page.setViewport({width:1000,height:700});

  let images = [];

  asyncForEach(terms, async (term) => {
    try {
      await page.goto('https://en.wikipedia.org/wiki/Main_Page');

      await page.type("#searchInput", term);

      await page.click('#searchButton');

      await page.waitForNavigation();

      await page.click('#mw-content-text > div > ul > li:nth-child(1) > div.mw-search-result-heading > a');

      await page.waitFor(1000);

      const image = await page.evaluate((sel) => {
        return document.querySelector(sel).getAttribute('srcset');
      }, '#mw-content-text > div > table.infobox.vevent.haudio > tbody > tr:nth-child(2) > td > a > img');

      //await page.close();
      //await browser.close();

      console.log('image: https:' + image.split(' ')[0]);
      
      images.push({term, image: 'https:' + image.split(' ')[0]});
    } catch (err) {
      console.log(err);
      //await page.close();
      //await browser.close();
      images.push({term, error: err});
    }
  });

  await page.close();
  await browser.close();

  return images;
};

router.get('/bulkAlbums', async function (req, res) {
  const albums = [
    'wu-tang 36 chambers album',
    'method man tical album',
    'gza liquid swords album',
    'raekwon only built for cuban links album',  
    'ghostface ironman album'
  ];

  const response = await getBulkImages(albums);
  
  res.status(200).send(response);
});

module.exports = router;