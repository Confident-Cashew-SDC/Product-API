import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 100,
  duration: '15s'
  // stages: [
  //   { duration: '2m', target: 100 }, // below normal load
  //   { duration: '5m', target: 100 },
  //   { duration: '2m', target: 200 }, // normal load
  //   { duration: '5m', target: 200 },
  //   { duration: '2m', target: 300 }, // around the breaking point
  //   { duration: '5m', target: 300 },
  //   { duration: '2m', target: 400 }, // beyond the breaking point
  //   { duration: '5m', target: 400 },
  //   { duration: '10m', target: 0 }, // scale down. Recovery stage.
  // ],
};


export default function () {
  var randomID = Math.floor(Math.random() * (1000011));
  http.get(`http://localhost:3000/products/${randomID}`);
  sleep(1);
};



