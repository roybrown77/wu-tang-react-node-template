const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const moment = require('moment-timezone');
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

const getImage = async (term) => {
  let browser;
  let page;

  try {
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      //headless: false
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
    'wu-tang 36 chambers album',
    'method man tical album',
    'gza liquid swords album',
    'gza beneath the surface album',
    'raekwon only built 4 cuban linx album',
    'rza afro samurai album',
    'ghostface supreme clientele album',
    'wu-tang iron flag album',
    'rza bobby digital album',
    'old dirty bastard return to 36 chambers album',
    'ghostface fishscale album',
    'wu-tang forever album',
    'wu-tang the w album',
    'inspectah deck uncontrollable substance album',
  ];

  const list = getRandomList(8, 0, albums.length-1);

  const albums1 = await Promise.all([
    getImage(albums[list[0]]),
    getImage(albums[list[1]]),
    getImage(albums[list[2]]),
    getImage(albums[list[3]]),
  ]);

  const albums2 = await Promise.all([
    getImage(albums[list[4]]),
    getImage(albums[list[5]]),
    getImage(albums[list[6]]),
    getImage(albums[list[7]]),
  ]);

  const albumCovers = [
    ...albums1,
    ...albums2
  ];

  res.status(200).send(albumCovers);
});

module.exports = router;