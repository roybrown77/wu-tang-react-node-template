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

const loadHomes = async () => {
  let homes = [];

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: false
  });

  const page = await browser.newPage();

  await page.goto('https://www.zillow.com');

  //await page.waitForSelector('.search-input');

  await page.$eval('.search-input', el => el.value = '30024');

  await page.click('.zsg-search-button', {});

  await page.waitForNavigation();

  //await page.waitForSelector('#search-results');

  browser.close();
};

router.get('/homes', function (req, res) {
  loadHomes();
});

module.exports = router;