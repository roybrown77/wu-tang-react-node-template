# Wu-Tang x React x Node x HI

![wu-tang](https://user-images.githubusercontent.com/1335262/44062950-81424b5e-9f2c-11e8-88a1-88341217f6a1.jpg)

Tiger style. Tiger style. Yes, like the song this will help you build a web app the world can't $%#@ wit.

This web app will retrieve album covers from Wikipedia and display them for the legendary hip hop group Wu-Tang Clan.

https://wu-tang-react-node-template.herokuapp.com

Learning how to C.O.D.E. is easier when you build something fun that you care about even if it's all so simple.

Backend:

- NodeJs - javascript runtime built on Chrome's V8 engine that allows developers to run javascript on the server side, enabling the creation of scalable and high-performance web applications
- ExpressJs - lightweight, flexible web application framework for NodeJs that simplifies building web and API servers by providing a robust set of features for routing, middleware, and HTTP handling aka serve up the site like banana pudding in the A
- Puppeteer - NodeJs library that provides a high-level API to control headless Chrome or Chromium browsers, enabling automated tasks like web scraping, testing, and interaction with web pages aka look ma no api

Frontend:

- ViteJs - fast, modern build tool and development server for web projects that offers lightning-fast hot module replacement (HMR) and optimized production builds aka run like daytona 500
- ReactJs - javascript library for building user interfaces, focusing on creating reusable UI components and efficiently updating and rendering them based on data changes aka make sites like lego blocks
- Google Material Design - design system that provides a consistent framework of visual, motion, and interaction design principles, implemented through reusable UI components to create intuitive and adaptable user experiences across devices and platforms aka make it look as good as Google stuff
- Progressive Web App (PWA) - web application that uses modern web technologies to deliver an app-like experience, including offline access, fast loading, and push notifications, while being accessible through a browser.  More info at https://developers.google.com/web/progressive-web-apps/
    - Run within the secure context of HTTPS
    - Add to Home Screen for easier revisits and prevent showing browser's URL bar

Hosting server:

- Heroku - platform-as-a-service (PaaS) that simplifies app deployment and management by abstracting infrastructure complexities, while running on top of AWS to leverage its cloud infrastructure for scalability, storage, and security

General:

- Human Intelligence (HI) - the ability of individuals, originating from Earth, to learn, reason, solve problems, and adapt to new situations. It encompasses the capacity to understand complex ideas and make decisions by integrating knowledge, experience, consciousness, emotion, creativity, subjectivity, intuition, and biological processes.

# To run app locally:

1. setup database on https://www.mongodb.com/ (if you want to skip db setup comment `const albums = getAlbumsFromDatabse();` and uncomment `const albums = getHardCodedAlbums();` then go to step 2 and skip step 3)
- create Organization, Project, Cluster and Database ie `wu-tang-react-node`
- copy connection string and add `/wu-tang-react-node` after `?` in connection string to avoid saving to test table
- set IP Whitelist in Network Access tab under Security to your current IP address or 0.0.0.0/0 (if testing globally)
2. add .env file at root of project with following:
```
NODE_ENV=development
PORT=3001
```
3. install NodeJs version indicated in .nvmrc file
4. open command line to root of this project and type:
5. npm i
6. cd src/frontend
7. npm i
8. cd ../../
9. npm start

Please listen to Wu-Tang Clan as it will enhance your coding experience. :D

![linus wu](https://user-images.githubusercontent.com/1335262/44238981-06b44580-a185-11e8-92e1-55d460c3b81e.png)

Art created by [Mark Drew](https://www.artsy.net/artwork/mark-drew-wu-tang-again-wu-tang-clan)

![lucy killer tape](https://user-images.githubusercontent.com/1335262/44238991-16cc2500-a185-11e8-9abe-145d2d9619ba.png)

Art created by [Mark Drew](https://www.artsy.net/artwork/mark-drew-wu-tang-again-wu-tang-clan)

![linus-shorty-small](https://user-images.githubusercontent.com/1335262/65600046-498e4280-df6d-11e9-9b5d-fda1ef93022b.jpg)

Art created by [Mark Drew](https://www.artsy.net/artwork/mark-drew-wu-tang-again-wu-tang-clan)

![patty wu joint](https://user-images.githubusercontent.com/1335262/44239019-34998a00-a185-11e8-8887-3e96ddbe1a10.png)

Art created by [Mark Drew](https://www.artsy.net/artwork/mark-drew-wu-tang-again-wu-tang-clan)

![charlie wu again](https://user-images.githubusercontent.com/1335262/44239031-44b16980-a185-11e8-8f2e-6df34589f1e5.png)

Art created by [Mark Drew](https://www.artsy.net/artwork/mark-drew-wu-tang-again-wu-tang-clan)

![franklin](https://user-images.githubusercontent.com/1335262/44304912-5be48880-a338-11e8-935c-d28553a8788a.png)

![franklin-benzi-small](https://user-images.githubusercontent.com/1335262/65600161-9a9e3680-df6d-11e9-9d21-cea6cf4e9d55.jpg)

Art created by [Mark Drew](https://www.artsy.net/artwork/mark-drew-wu-tang-again-wu-tang-clan)

![wu jeopardy](https://user-images.githubusercontent.com/1335262/44239056-6874af80-a185-11e8-9c5b-b85d8633925f.png)
