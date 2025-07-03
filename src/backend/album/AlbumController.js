const express = require('express');
const puppeteer = require('puppeteer');

let router = express.Router();

const promiseGetAlbumCoverArt = (album) => {
  const getCoverArt = async (resolve,reject) => {
    let browser;
    let page;

    try {
      // console.log('getImage start: ', album.searchTerm);

      browser = await puppeteer.launch({
        pipe: true,
        ignoreHTTPSErrors: true,
        // headless: false
      });

      page = await browser.newPage();
      await page.setViewport({ width: 2000, height: 500 });
      await page.goto('https://www.wikipedia.org/', { waitUntil: 'networkidle2' });

      await page.type("#searchInput", album.searchTerm);

      const suggestionLink = '.suggestion-link';
      const elementExists = await page.$(suggestionLink);
      if (elementExists) {
        await page.click(suggestionLink);
      } else {
        await page.click('.pure-button');
      }

      await page.waitForNavigation();

      await page.waitForSelector('#mw-content-text > div.mw-content-ltr.mw-parser-output > table.infobox.vevent.haudio > tbody > tr:nth-child(2) > td > span > a > img');

      const image = await page.evaluate((sel) => {
        return document.querySelector(sel).getAttribute('src');
      }, '#mw-content-text > div.mw-content-ltr.mw-parser-output > table.infobox.vevent.haudio > tbody > tr:nth-child(2) > td > span > a > img');

      const coverArt = 'https:' + image.split(' ')[0];
      // console.log('getImage end: ', album.searchTerm);
      resolve({...album, coverArt});
    } catch (err) {
      const error = album.searchTerm + ' error: ' + JSON.stringify(err);
      // console.log(error);
      reject(error);
    } finally {
      if (!!page) {
        await page.close();
        page = null;
      }
      if (!!browser) {
        await browser.close();
        browser = null;
      }
    }

    return;
  };

  return new Promise(getCoverArt);
};

const getHardCodedAlbumData = () => {
  return [
    {
      id: 1,
      searchTerm: 'Enter the Wu-Tang (36 Chambers)',
      name: "Enter the Wu-Tang (36 Chambers)",
      released: "November 9, 1993",
      length: "61:31",
      label: "Loud",
      producer: "RZA (also exec.), Ol Dirty Bastard, Method Man",
      description: "Epic first group album",
      coverArt: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Wu-TangClanEntertheWu-Tangalbumcover.jpg/220px-Wu-TangClanEntertheWu-Tangalbumcover.jpg',
      sampleTrack: {
        title: "Protect Ya Neck",
        src: "https://upload.wikimedia.org/wikipedia/en/a/ae/Protectyaneck.ogg",
      },
    },
    {
      id: 2,
      searchTerm: 'Tical (album)',
      name: "Tical (album)",
      released: "November 15, 1994",
      length: "43:49",
      label: "Def Jam",
      producer: "RZA",
      description: "aka M.E.T.H.O.D Man",
      coverArt: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e6/Tical.jpg/220px-Tical.jpg',
    },
    {
      id: 3,
      searchTerm: 'Return to the 36 Chambers: The Dirty Version',
      name: "Return to the 36 Chambers: The Dirty Version",
      released: "March 28, 1995",
      length: "59:04",
      label: "Elektra WMG",
      producer:
        "RZA (also exec.), True Master, 4th Disciple, Ol' Dirty Bastard, Ethan Ryman, Big Dore",
      description: "Unexpected Gem",
      coverArt: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/Odb_welfare.jpg/220px-Odb_welfare.jpg',
    },
    {
      id: 4,
      searchTerm: 'Only Built 4 Cuban Linx',
      name: "Only Built 4 Cuban Linx",
      released: "August 1, 1995",
      length: "69:30",
      label: "Loud RCA",
      producer: "RZA (also exec.), Mitchell Diggs (exec.), Oli Grant (exec.)",
      description: "The Purple Tape",
      coverArt: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/17/Raekwon_only.jpg/220px-Raekwon_only.jpg',
      sampleTrack: {
        title: "Criminology",
        src: "https://upload.wikimedia.org/wikipedia/en/d/d6/Criminology.ogg",
      },
    },
    {
      id: 5,
      searchTerm: 'Liquid Swords',
      name: "Liquid Swords",
      released: "November 7, 1995",
      length: "50:49",
      label: "Geffen, MCA",
      producer: "RZA",
      description: "aka GZA Genius",
      coverArt: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/90/Liquidswords1995.png/220px-Liquidswords1995.png',
      sampleTrack: {
        title: "I Gotcha Back",
        src: "https://upload.wikimedia.org/wikipedia/en/f/f7/I_Gotcha_Back.ogg",
      },
    },
    {
      id: 6,
      searchTerm: 'Ironman (Ghostface Killah album)',
      name: "Ironman (Ghostface Killah album)",
      released: "October 29, 1996",
      length: "64:48",
      label: "Epic, Razor Sharp",
      producer:
        "RZA (also exec.), Mitchell Diggs (exec.), Oli Grant (exec.), D.Coles (exec.), True Master",
      description: "aka Tony Starks",
      coverArt: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/45/Ironman1996.png/220px-Ironman1996.png',
      sampleTrack: {
        title: "After the Smoke is Clear",
        src: "https://upload.wikimedia.org/wikipedia/en/4/46/After_the_Smoke_Is_Clear_%28Ghostface_Killah_song_-_sample%29.ogg",
      },
    },
    {
      id: 7,
      searchTerm: 'Wu-Tang Forever',
      name: "Wu-Tang Forever",
      released: "June 3, 1997",
      length: "44:58 (disc 1), 67:09 (disc 2\-US), 77:14 (disc 2\–international)",
      label: "Loud, RCA",
      producer:
        "RZA, 4th Disciple, True Master, Inspectah Deck",
      description: "1997 Wu Double Album",
      coverArt: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Wu-Tang_Forever.png/220px-Wu-Tang_Forever.png',
    },
  ];
};

router.get('/albumcovers', async function (req, res) {
  let albumDataWithCoverArtFromWebScrape = [];

  const albumData = getHardCodedAlbumData();
  // const albumData = getAlbumDataFromDatabase();

  try {
    const albumDataWithCoverArtFromWebScrapeUnfulfilled = await Promise.allSettled([
      promiseGetAlbumCoverArt(albumData[0]),
      promiseGetAlbumCoverArt(albumData[1]),
      promiseGetAlbumCoverArt(albumData[2]),
      promiseGetAlbumCoverArt(albumData[3]),
      promiseGetAlbumCoverArt(albumData[4]),
      promiseGetAlbumCoverArt(albumData[5]),
      promiseGetAlbumCoverArt(albumData[6]),
    ]);

    // log('albumDataWithCoverArtFromWebScrapeUnfulfilled: ', JSON.stringify(albumDataWithCoverArtFromWebScrapeUnfulfilled));
    albumDataWithCoverArtFromWebScrape = albumDataWithCoverArtFromWebScrapeUnfulfilled.filter(album=>album.status === 'fulfilled').map(album=>album.value);
    // console.log('albumDataWithCoverArtFromWebScrape: ', JSON.stringify(albumDataWithCoverArtFromWebScrape));
  } catch (err) {
    // console.log('albumcovers err: ', err);

    const error = 'error: ' + JSON.stringify(err);
    // console.log('error: ', JSON.stringify(err));
  }

  res.status(200).send(albumDataWithCoverArtFromWebScrape.length > 0 ? albumDataWithCoverArtFromWebScrape : albumData);
});

module.exports = router;