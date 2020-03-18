import React from 'react';
import Helmet from 'react-helmet';
import L from 'leaflet';

import Layout from 'components/Layout';
import Container from 'components/Container';
import Map from 'components/Map';

import { locations } from 'data/locations';

const IndexPage = () => {
  /**
   * mapEffect
   * @description Fires a callback once the page renders
   * @example Here this is an example of creating a route for a road trip
   */

  function mapEffect({ leafletElement: map } = {}) {
    if ( !map ) return;

    map.eachLayer((layer) => map.removeLayer(layer));

    const tripPoints = createTripPointsGeoJson({ locations });
    const tripLines = createTripLinesGeoJson({ locations });

    const tripPointsGeoJsonLayers = new L.geoJson(tripPoints, {
      pointToLayer: tripStopPointToLayer
    });

    const tripLinesGeoJsonLayers = new L.geoJson(tripLines);

    const bounds = tripPointsGeoJsonLayers.getBounds();

    tripPointsGeoJsonLayers.addTo(map);
    tripLinesGeoJsonLayers.addTo(map);

    map.fitBounds(bounds);
  }

  const mapSettings = {
    defaultBaseMap: 'OpenStreetMap',
    mapEffect
  };

  return (
    <Layout pageName="home">
      <Helmet>
        <title>Home Page</title>
      </Helmet>

      <Map {...mapSettings} />

      <Container type="content" className="text-center home-start">

        <div className="container-section">
          <h2>Learn how to make your own road trip map!</h2>

          <p>
            <a className="button" href="https://www.freecodecamp.org/news/author/colbyfayock/">
              Tutorial on FreeCodeCamp.org
            </a>
          </p>
        </div>

        <div className="container-section">
          <h2>Or drive right in!</h2>

          <p>Run the following in your terminal!</p>

          <pre>
            <code>
              gatsby new [directory] https://github.com/colbyfayock/summer-road-trip
            </code>
          </pre>
        </div>

        <div className="container-section">
          <h2>Want to build your own mapping app?</h2>

          <pre>
            <code>
              gatsby new [directory] https://github.com/colbyfayock/gatsby-starter-leaflet
            </code>
          </pre>
        </div>

        <div className="container-section">
          <p className="note">
            Note: <a href="https://www.gatsbyjs.org/docs/gatsby-cli/">Gatsby CLI</a> required globally for the above commands
          </p>
        </div>

      </Container>
    </Layout>
  );
};

export default IndexPage;

/**
 * tripStopPointToLayer
 */

function createTripPointsGeoJson({ locations } = {}) {
  return {
    "type": "FeatureCollection",
    "features": locations.map(({ placename, location = {}, image, date, todo = [] } = {}) => {
      const { lat, lng } = location;
      return {
        "type": "Feature",
        "properties": {
          placename,
          todo,
          date,
          image
        },
        "geometry": {
          "type": "Point",
          "coordinates": [ lng, lat ]
        }
      }
    })
  }
}

/**
 * tripStopPointToLayer
 */

function createTripLinesGeoJson({ locations } = {}) {
  return {
    "type": "FeatureCollection",
    "features": locations.map((stop = {}, index) => {
      const prevStop = locations[index - 1];

      if ( !prevStop ) return [];

      const { placename, location = {}, date, todo = [] } = stop;
      const { lat, lng } = location;
      const properties = {
        placename,
        todo,
        date
      };

      const { location: prevLocation = {} } = prevStop;
      const { lat: prevLat, lng: prevLng } = prevLocation;

      return {
        type: 'Feature',
        properties,
        geometry: {
          type: 'LineString',
          coordinates: [
            [ prevLng, prevLat ],
            [ lng, lat ]
          ]
        }
      }
    })
  }
}

/**
 * tripStopPointToLayer
 */

function tripStopPointToLayer( feature = {}, latlng ) {
  const { properties = {} } = feature;
  const { placename, todo = [], image, date } = properties;

  const list = todo.map(what => `<li>${ what }</li>`);
  let listString = '';
  let imageString = '';

  if ( Array.isArray(list) && list.length > 0 ) {
    listString = list.join('');
    listString = `
      <p>Things we will or have done...</p>
      <ul>${listString}</ul>
    `
  }

  if ( image ) {
    imageString = `
      <span class="trip-stop-image" style="background-image: url(${image})">${placename}</span>
    `;
  }

  const text = `
    <div class="trip-stop">
      ${ imageString }
      <div class="trip-stop-content">
        <h2>${placename}</h2>
        <p class="trip-stop-date">${date}</p>
        ${ listString }
      </div>
    </div>
  `;

  const popup = L.popup({
    maxWidth: 400
  }).setContent(text);

  const layer = L.marker( latlng, {
    icon: L.divIcon({
      className: 'icon',
      html: `<span class="icon-trip-stop"></span>`,
      iconSize: 20
    }),
    riseOnHover: true
  }).bindPopup(popup);

  return layer;
}