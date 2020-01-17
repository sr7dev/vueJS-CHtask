import axios from 'axios';
import { Urls } from '../constants';

const http = axios;

export class Location {

  /**
   * Get current location from IP
   * @return {Promise} Response
   */
  static currentFromIP() {

    // use ipinfo to fetch current location info
    return http.get(Urls.IP_INFO)
      .then(
        data => {
          data = data.data;
          let parsed = {
            city: data.city,
            state: data.region,
            country: data.country,
            postal: data.postal,
            coords: {
              lat: data.loc.split(',')[0],
              lng: data.loc.split(',')[1]
            }
          }

          return Promise.resolve(parsed);

        },

        error => {

          return Promise.reject(error);

        }
      );

  }

  /** Get current location from HTML5 geolocation */
  static currentFromGeo() {

    if (navigator.geolocation) {

      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          position => {
            resolve({
              status: "success",
              message: "We fetched your location!",
              data: {
                coords: {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
                }
              }
            });
          },
          error => {
            console.log(error);
            reject({
              status: "error",
              message: "Sorry, we cannot obtain your location, please use input your address manually"
            });
          }, {
            enableHighAccuracy: true,
            timeout: 15000
          }
        );

      });

    }

    return Promise.reject({
      status: 'error',
      message: 'Your browser does not support fetching of location!'
    });

  }

}