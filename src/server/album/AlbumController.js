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

    await page.waitForSelector('#mw-content-text > div > table.infobox.vevent.haudio > tbody > tr:nth-child(2) > td > a > img');

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
    '36 chambers',
    'Ironman (Ghostface Killah album)',
    'Liquid Swords',
    'Only Built 4 Cuban Linx'
  ];

  const index = sample([true, false]) ? 0 : 2;

  const albums1 = await Promise.all([
    getImage(albums.slice(index)[0]),
    getImage(albums.slice(index)[1]),
  ]);

  const albums2 = await Promise.all([
    getImage(albums.slice(index)[2]),
    getImage(albums.slice(index)[3])
  ]);

  const albumCovers = [
    ...albums1,
    ...albums2
  ];

  res.status(200).send(albumCovers);
});

module.exports = router;