const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const moment = require('moment-timezone');
const puppeteer = require('puppeteer');

let router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

const gameRepository = require('./GameRepository');

const omit = require('lodash/omit');
const get = require('lodash/get');
const uniq = require('lodash/uniq');
const transform = require('lodash/transform');
const groupBy = require('lodash/groupBy');
const some = require('lodash/some');
const sortBy = require('lodash/sortBy');

const loadHomes = async () => {
  // const leagueId = '59723313734d1d6202a85f13';
  // const currentMonth = moment().month()+1;
  // console.log('mlb currentMonth: ' + currentMonth);

  // const currentDay = moment().date();
  // console.log('mlb currentDay: ' + currentDay);

  // if (![8].includes(currentMonth)) {
  //   console.log('new mlb games will be loaded during season.');
  //   return;
  // }

  // const gameSearch = {
  //   leagueId: mongoose.Types.ObjectId(leagueId),
  //   isGameOver: {
  //     $ne: true
  //   }
  // };

  // const gamesStillInProgress = await gameRepository.find(gameSearch);

  // if (!!gamesStillInProgress && gamesStillInProgress.length > 0) {
  //   console.log('unable to load new mlb games until all games have ended.');
  //   return;
  // }

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

  await page.waitForSelector('#search-results');

  // let listLength = await page.evaluate((sel) => {
  //   return document.getElementsByClassName(sel).length;
  // }, 'scoreboard baseball');

  // let LIST_NAME_ID_SELECTOR = 'div#events > article:nth-of-type(INDEX)';
  // let STARTDATETIME_SELECTOR = '#scoreboard-page > div.carousel-wrap > div.date-picker-carousel.slick-initialized.slick-slider > div > div > div.day.slick-slide.slick-current.slick-center';
  // let SPREAD_SELECTOR = 'div#events > article:nth-of-type(INDEX) > div > div > div > section.sb-detail > div.stat > div';
  
  // const startDateTime = await page.evaluate((sel) => {
  //   return document.querySelector(sel).getAttribute('data-id');
  // }, STARTDATETIME_SELECTOR);

  // console.log('mlb startDateTime: ' + startDateTime);

  // console.log('# of mlb games to load: ' + listLength);

  // for (let i = 1; i <= 1; i++) {
  //   const awayTeam = await page.evaluate((sel) => {
  //     return document.querySelector(sel).getAttribute('data-awayid');
  //   }, LIST_NAME_ID_SELECTOR.replace("INDEX", i));

  //   const homeTeam = await page.evaluate((sel) => {
  //     return document.querySelector(sel).getAttribute('data-homeid');
  //   }, LIST_NAME_ID_SELECTOR.replace("INDEX", i));

  //   // const spread = currentWeek.toLowerCase().includes('hall of fame') || currentWeek.toLowerCase().includes('preseason') ? 'Line: 0' : 
  //   // await page.evaluate((sel) => {
  //   //   return document.querySelector(sel).innerText;
  //   // }, SPREAD_SELECTOR.replace("INDEX", i));

  //   games.push({
  //     startDateTime: moment(startDateTime),
  //     // spread: {
  //     //  team: spread.replace('Line: ','').split(' ')[0],
  //     //  amount: parseInt(spread.replace('Line: ','').split(' ')[1]),
  //     //  spreadDateTime: new Date(new Date().toUTCString()).toISOString()
  //     // },
  //     awayTeam: awayTeam,
  //     homeTeam: homeTeam
  //   });
  // }

  browser.close();

  // console.log('mlb games: ' + JSON.stringify(games));
  
  // // const seasonType = currentWeek.toLowerCase().includes('hall of fame') || currentWeek.toLowerCase().includes('preseason') ? 1 : currentWeek.split(' ')[0].toLowerCase() === 'week' ? 2 : 3;
  // // const weekNo = currentWeek.toLowerCase().includes('hall of fame') ? 1 : 
  // // currentWeek.toLowerCase().includes('preseason') ? parseInt(currentWeek.toLowerCase().split('preseason week ')[1]) : 
  // // currentWeek.split(' ')[0].toLowerCase() === 'week' ? parseInt(currentWeek.toLowerCase().split('week ')[1]) : 
  // // currentWeek.toLowerCase().includes('wild') ? 1 : 
  // // currentWeek.toLowerCase().includes('divisional') ? 2 : 
  // // currentWeek.toLowerCase().includes('conference') ? 3 : 5;

  // const mvyGames = games.map(game=>{
  //   const espnAwayTeam = espnMlbTeams.find(x=>x.id.toString() === game.awayTeam.toString());
  //   const espnHomeTeam = espnMlbTeams.find(x=>x.id.toString() === game.homeTeam.toString());
  //   const awayTeam = mvyMlbTeams.find(x=>x._id === espnAwayTeam.mvyId);
  //   const homeTeam = mvyMlbTeams.find(x=>x._id === espnHomeTeam.mvyId);
  //   //const spreadTeam = mvyMlbTeams.find(x=>x.shortLocation.toString().toLowerCase() === game.spread.team.toString().toLowerCase());

  //   return {
  //     leagueId: mongoose.Types.ObjectId(leagueId),
  //     //seasonType: seasonType,
  //     //weekNo: weekNo,
  //     startDateTime: game.startDateTime,
  //     // spread: {
  //     //  teamId: get(spreadTeam,'_id'),
  //     //  amount: get(game,'spread.amount', 0)
  //     // },
  //     competitors: [
  //       {_id: mongoose.Types.ObjectId(awayTeam._id), name: awayTeam.location + ' ' + awayTeam.name},
  //       {_id: mongoose.Types.ObjectId(homeTeam._id), name: homeTeam.location + ' ' + homeTeam.name}
  //     ]
  //   };
  // });

  // console.log('mlb mvyGames: ' + JSON.stringify(mvyGames));

  // mvyGames.forEach(game=>{
  //   const gameSearch = {
  //     leagueId: leagueId,
  //     year: game.year,
  //     seasonType: game.seasonType,
  //     weekNo: game.weekNo
  //   };

  //   gameRepository.find(gameSearch, function (err, games) {
  //     if (!!games && games.length > 0) {
  //       console.log("Nfl game already exists: " + JSON.stringify(gameSearch));
  //     } else {
  //       gameRepository.create(game, function (err, gameCreated) {
  //         if (err) {
  //           console.log("there was a problem adding nfl game to the database: " + err.message);
  //         } else {
  //           console.log("success creating nfl game: " + gameCreated._id);
  //         }
  //       });
  //     }
  //   });
  // });
};

router.get('/games', function (req, res) {
  loadHomes();

  console.log('username: ' + process.env.db_username);

  const search = {
    leagueId: mongoose.Types.ObjectId(get(req, 'query.leagueId')),
    year: get(req, 'query.year'),
    seasonType: get(req, 'query.seasonType'),
    weekNo: get(req, 'query.weekNo'),
    startDateTime: get(req, 'query.date') ? {
      $gte: new Date(moment(get(req, 'query.date')).startOf('day')),
      $lte: new Date(moment(get(req, 'query.date')).endOf('day'))
    } : undefined
  };

  const finalSearch = omit(search, 
    [
      get(req,'query.year','year'),
      get(req,'query.seasonType','seasonType'), 
      get(req,'query.weekNo','weekNo'),
      get(req,'query.date','startDateTime')
    ]
  );

  console.log('game search criteria: ' + JSON.stringify(finalSearch));
  
  gameRepository.find(finalSearch, function (err, games) {
      //console.log('games found: ' + JSON.stringify(games));
      if (err) return res.status(500).send("There was a problem finding the games: " + err.message);
      res.status(200).send(games);
  });
});

module.exports = router;