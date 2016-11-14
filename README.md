### BROWSER GIS COLLECTOR (10.11.2016)

#### Aim

Mobile-oriented browser based application that could be used for data collection

#### Code Repository

<https://github.com/adammertel/simple-browser-gis-collector>

#### Live Example

<https://coffeegnome.net/geoloc/> will be moved to Univie server

#### Conditions

-   **cross-platform** - application should be functional within all the major platforms
-   **mobile-oriented** - design and functionality is created mainly for mobile users
-   **offline functionality** - application shoud work in offline mode
-   **downloadable data** - a possibility to download collected data

#### Selected technologies

-   **[html5 navigator geolocation]** - html5 feature for locating position of user. It works with IP, Wifi but also with GPS devices
-   **[react]** - a famous frontend library from Facebook
-   **[react leaflet]** - React components for leaflet, brings the possibility to create leaflet map with react technology
-   **[html5 webstorage]** - key-value database inside every browser that is able to store data even after the page is refreshed

#### Design

The design was adapted to mobile users. Responsibility of the webpage was based on the [bootstrap library] that wraps html into adaptative div envelopes. The page was divided in two parts -

-   panel with control buttons covers the top part of the screen
-   leaflet map with displayed user location and saved geometries

#### Collected data

Two types of data is possible to collect within this application

-   Points - saved point get the exact location as the currect position of user
-   Track - track follows the motion of the user

Collected data are stored in webstorage and could be anytime downloaded or removed

#### How to deploy

Put the built files on accessible server

#### How to develop

Application is deployed minified and bundled. The development is then based on the **[webpack]** technology and npm scripts, the procedure is:

1.  install **[nodejs]** (**[npm]** is included) and **[git]**
2.  clone the github repository . From command line - *git clone <https://github.com/adammertel/simple-browser-gis-collector.git>*
3.  update/install dependencies with *npm install*
4.  run local server with *git start* - browser will be updated after every change
5.  deploy with *git run deploy-windows* - minified code will be placed in ./build directory

#### How to user

Visit the url where built bundle with html and css are placed from any device. The geolocation is automatically tracked and map is panned to this location. User is able to control

  [html5 navigator geolocation]: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation
  [react]: https://facebook.github.io/react/
  [react leaflet]: https://github.com/PaulLeCam/react-leaflet
  [html5 webstorage]: http://www.w3schools.com/html/html5_webstorage.asp
  [bootstrap library]: http://getbootstrap.com/
  [webpack]: https://webpack.github.io/
  [nodejs]: https://nodejs.org/en/
  [npm]: https://www.npmjs.com/
  [git]: https://git-scm.com/
