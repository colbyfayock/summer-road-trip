# 🗺️ Summer Road Trip!

This is a demo of a Gatsby app running Leaflet to 

## ⚡ Quick Start

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/colbyfayock/summer-road-trip)

Deploy your own! Once it's ready, you can change the name and content within your own repository.

## 🧰 What This Includes
* [Yarn](https://yarnpkg.com/en/)
* [Gatsby](https://www.gatsbyjs.org/)
* [Sass](https://sass-lang.com)
* [React Helmet](https://github.com/nfl/react-helmet)
* [Resolve Src](https://github.com/alampros/gatsby-plugin-resolve-src)
* [Leaflet](https://leafletjs.com/)
* [React Leaflet](https://react-leaflet.js.org)

## 🚀 Getting Started

### Requirements
* [Gatsby CLI](https://www.npmjs.com/package/gatsby-cli)
* [Yarn](https://yarnpkg.com/en/)

### Installation
* Set up Yarn: https://yarnpkg.com/lang/en/docs/install/#mac-stable)[https://yarnpkg.com/lang/en/docs/install/
* Install the Gatsby CLI globally:
```
yarn global add gatsby-cli
```
* Inside the directory of your choice, scaffold a new Gatsby site:
```
gatsby new [directory] https://github.com/colbyfayock/summer-road-trip
```
For example, if I want my installation in `~/Code/new-gatsby-site`, I would navigate to `~/Code` and run:
```
gatsby new new-gatsby-site https://github.com/colbyfayock/summer-road-trip
```
* Navigate to your new directory and run:
```
yarn develop
```
* You should now be running your summer road trip app locally! 🎉

### Configuring Your Road Trip

#### Updating the name
In `gatsby-config.js`, you can update the `title` and the `githubUrl`. Doing this will update the the header of our road trip site.

#### Updating the trip locations
In `src/data/locations.js`, you can add, remove, or update the objects inside of the `locations` object.

The `image` property isn't required, but to utilize it, you can either import a local image like in the starter or you  can use a URL to an external file.
