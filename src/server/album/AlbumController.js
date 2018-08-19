const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const moment = require('moment-timezone');
const puppeteer = require('puppeteer');

let router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

const albumRepository = require('./AlbumRepository');

const omit = require('lodash/omit');
const get = require('lodash/get');
const uniq = require('lodash/uniq');
const transform = require('lodash/transform');
const groupBy = require('lodash/groupBy');
const some = require('lodash/some');
const sortBy = require('lodash/sortBy');

const getImage = async (term) => {
  let browser;
  let page;

  try {
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: false
    });

    page = await browser.newPage();

    await page.setViewport({width:1000,height:700});

    await page.goto('https://en.wikipedia.org/wiki/Main_Page',{
      waitUntil: 'networkidle2',
      timeout: 0
    });

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
    return {term, image: 'https:' + image.split(' ')[0]};
  } catch (err) {
    await page.close();
    await browser.close();
    console.log(term + ' error: ' + JSON.stringify(err));
    return {term, image: ''};
  }
};

router.get('/albums', async function (req, res) {
  const albums1 = await Promise.all([
    getImage('wu-tang 36 chambers album'),
    getImage('method man tical album'),
    getImage('gza liquid swords album'),
  ]);

  const albums2 = await Promise.all([
    getImage('raekwon only built 4 cuban linx album'),  
    getImage('ghostface ironman album'), 
    getImage('ghostface supreme clientele album'), 
  ]);

  const albums3 = await Promise.all([
    getImage('rza bobby digital album'), 
    getImage('old dirty bastard return to 36 chambers album'),
    getImage('wu-tang iron flag album'),
  ]);

  const albums4 = await Promise.all([
    getImage('rza afro samurai album'),
    getImage('rza digi snacks album'),
    getImage('gza beneath the surface album')
  ]);

  const albums = [
    ...albums1,
    ...albums2,
    ...albums3,
    ...albums4
  ];

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