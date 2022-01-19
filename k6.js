import http from 'k6/http';
import { sleep, check } from 'k6';

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


// export default function () {
//   var randomID = Math.floor(Math.random() * (1000011));
//   var param = {
//     product_id: randomID
//   }
//   http.get(`http://localhost:3000/products`, param);
//   sleep(1);
// };

// export default function () {
//   var randomID = Math.floor(Math.random() * (1000011));
//   http.get(`http://localhost:3000/products/styles?product_id=5`);
//   sleep(1);
// };

export default function () {
  let randomID = Math.floor(Math.random() * (1000000));
  const res = http.get(`http://localhost:3000/products?product_id=${randomID}`);
  sleep(1);
  check(res, {
    'is status 200': r => r.status === 200,
    'Return time < 75ms': r => r.timings.duration < 75,
    'Return time < 100ms': r => r.timings.duration < 100,
    'Return time < 125ms': r => r.timings.duration < 125,
    'Return time < 150ms': r => r.timings.duration < 150,
    'Return time < 175ms': r => r.timings.duration < 175,
    'Return time < 200ms': r => r.timings.duration < 200,
    'Return time < 250ms': r => r.timings.duration < 250,
    'Return time < 300ms': r => r.timings.duration < 300,
    'Return time < 350ms': r => r.timings.duration < 350,
    'Return time < 500ms': r => r.timings.duration < 500,
    'Return time < 600ms': r => r.timings.duration < 600
})
};



