const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const puppeteer = require('puppeteer');

let router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const albumRepository = require('./AlbumRepository');

const omit = require('lodash/omit');
const get = require('lodash/get');
const uniq = require('lodash/uniq');
const transform = require('lodash/transform');
const groupBy = require('lodash/groupBy');
const some = require('lodash/some');
const sortBy = require('lodash/sortBy');
const sample = require('lodash/sample');

const getImage = async (term) => {
  let browser;
  let page;

  try {
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      //headless: false
    });

    page = await browser.newPage();

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
    return {term, image: 'https:' + image.split(' ')[0]};
  } catch (err) {
    if (page) {
      await page.close();
    }

    if (browser) {
      await browser.close();
    }
    
    console.log(term + ' error: ' + JSON.stringify(err));
    return {term};
  }
};

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function getRandomList(size, min, max) {
  let list = [];
  while(list.length < size) {
    list.push(getRndInteger(min,max))
    list = uniq(list);
  }
  return list;
};

router.get('/albumcovers', async function (req, res) {
  const albums = [
    'inspectah deck uncontrollable substance album',
    'wu-tang 36 chambers album',
    'rza afro samurai album',
    'ghostface supreme clientele album',
    'wu-tang iron flag album',
    'rza bobby digital album',
    'gza liquid swords album',
    'ghostface fishscale album',
    'raekwon only built 4 cuban linx album',
    'wu-tang forever album',
    'gza beneath the surface album',
    'method man tical album',
    'old dirty bastard return to 36 chambers album',
    'wu-tang the w album',
  ];

  const index = sample([true, false]) ? 0 : 6;

  const albums1 = await Promise.all([
    getImage(albums.slice(index)[0]),
    getImage(albums.slice(index)[1]),
    getImage(albums.slice(index)[2]),
    getImage(albums.slice(index)[3]),
  ]);

  const albums2 = await Promise.all([
    getImage(albums.slice(index)[4]),
    getImage(albums.slice(index)[5]),
    getImage(albums.slice(index)[6]),
    getImage(albums.slice(index)[7]),
  ]);

  const albumCovers = [
    ...albums1,
    ...albums2
  ];

  res.status(200).send(albumCovers);
});

module.exports = router;