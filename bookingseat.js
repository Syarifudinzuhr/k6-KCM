import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
//   stages: [
//     { duration: '30s', target: 50 },  
//     { duration: '1m', target: 90 },  
//     { duration: '15s', target: 30 },   
//   ],
vus: 50, 
  duration: '5s',

  thresholds: {
    http_req_duration: ['p(80)<1000'], // 80% dari request harus di bawah 10 detik
  },
};

export default function () {
  const url = 'https://staging-kcm-api.weesdepe.com/v1/order/booking-seat';
  const payload = JSON.stringify({
    "showTimeDetailId": "gnK12WMErJd5BQv",
    "seats": [
        "D10",
        "D9",
        "D8"    
    ]
  });
  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 5473476bebfceef3107d5b537d6a4422d96ea4e96eba46855e2889a9d0206b16d47c1503f29d5cfa80d66892204fba78770e9dafc5de2b565350c05df3c3dd32a9d06ab0c54f010211c212f7eae667d0a72a7e81147f2bbc14306f917fb8d0a93eaa6d1431167909d577cf766ed40f60f3355b3de21d9bc90e6b1a3f45fe4d3751d2effa32355d554f1edd9b1c0daf4071faea26206e46d37c64de6f9161606a3b95f7f1f9e4832d4560f87e3deb2b5cebebd0639e1deda4f81e18f777d06026ba6967d69c7c93d93a2b528b588e599fd02b53e8f909fadd809f6aff9db7712d2a5e1141a4777dd59e42ba3215468707ad06263edb31cfcc18b4d18165b6bf2e5957c4218605b9d3422b578f9753ce51db954fbadf26ccd4afe70849800f425b3d99bfafac5520abb50ef4f3f7aa675397dbbddef968151665362cd385c6a3446ce1cb8ed9812a62a92acc5eb025702117be3fbf24e556529b49694136081b7086f1bc2d2cea09c88051cd95a58770ef9b972ae01d3dad7bb9fdf57089d56bc073c25a8c62dc29cc'
    },
  };

  const response = http.post(url, payload, params);

  check(response, {
    'status was 200': (r) => r.status === 200,
  });
  sleep(1);
}
