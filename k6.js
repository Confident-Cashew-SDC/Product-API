import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 1,
  duration: '30s'
};

// export default function () {
//   var randomID = Math.floor(Math.random() * (1000011));
//   var params = {
//     product_id: randomID,
//     page: 1,
//     count: 5
//   }
//   // url.searchParams.append('product_id', `${randomID}`);
//   // url.searchParams.append('page', '1');
//   // url.searchParams.append('count', '5');
//   http.get('http://localhost:3000/qa/questions', params);
//   sleep(1);
// };

export default function () {
  var randomID = Math.floor(Math.random() * (3518979));
  var params = {
    page: 1,
    count: 5
  }
  // url.searchParams.append('product_id', `${randomID}`);
  // url.searchParams.append('page', '1');
  // url.searchParams.append('count', '5');
  http.get(`http://localhost:3001/qa/questions/${randomID}/answers`, params);
  sleep(1);
};
export default function () {
  var randomID = Math.floor(Math.random() * (1000011));
  var params = {
    body: 'test',
    name: 'test',
    email: 'test@gmail.com',
    product_id: randomID
  }
  // url.searchParams.append('product_id', `${randomID}`);
  // url.searchParams.append('page', '1');
  // url.searchParams.append('count', '5');
  http.post(`http://localhost:3001/qa/questions/`, params);
  sleep(1);
};
export default function () {
  var randomID = Math.floor(Math.random() * (3518979));
  var params = {
    body: 'test',
    name: 'test',
    email: 'test@gmail.com',
    photos: ['urlplaceholder/answer_5_photo_number_1.jpg', 'urlplaceholder/answer_5_photo_number_2.jpg']
  }
  // url.searchParams.append('product_id', `${randomID}`);
  // url.searchParams.append('page', '1');
  // url.searchParams.append('count', '5');
  http.get(`http://localhost:3001/qa/questions/${randomID}/answers`, params);
  sleep(1);
};


