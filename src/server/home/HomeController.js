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

const loadAlbums = async () => {
  let albums = [];

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: false
  });

  const page = await browser.newPage();

  try {
    await page.setViewport({width:1000,height:700});

    await page.goto('https://en.wikipedia.org/wiki/Main_Page');

    await page.waitForSelector('#searchInput');

    await page.waitFor(1000);

    await page.type("#searchInput", "ghostface ironman album");

    await page.waitFor(1000);

    await page.click('#searchButton');

    await page.waitForNavigation();

    await page.waitForSelector('#mw-content-text > div > ul > li:nth-child(1) > div.mw-search-result-heading > a');

    await page.click('#mw-content-text > div > ul > li:nth-child(1) > div.mw-search-result-heading > a');

    await page.waitForNavigation();

    await page.waitForSelector('#mw-content-text > div > table.infobox.vevent.haudio > tbody > tr:nth-child(2) > td > a');

    await page.click('#mw-content-text > div > table.infobox.vevent.haudio > tbody > tr:nth-child(2) > td > a');

    await page.waitForSelector('body > div.mw-mmv-wrapper > div > div.mw-mmv-image-wrapper > div > div.mw-mmv-image > img');

    const album = await page.evaluate((sel) => {
      return document.querySelector(sel).getAttribute('src');
    }, 'body > div.mw-mmv-wrapper > div > div.mw-mmv-image-wrapper > div > div.mw-mmv-image > img');

    //await page.close();
    await browser.close();
    console.log('album: ' + album);
    return album;
  } catch (err) {
    console.log(err);
    //await page.close();
    await browser.close();
    return err;
  }
};

router.get('/homes', async function (req, res) {
  const album = await loadAlbums();
  res.status(200).send(album);
});

module.exports = router;