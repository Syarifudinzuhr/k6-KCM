import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 100 },   // Pemanasan ke 100 VUs dalam 2 menit
    { duration: '2m', target: 150 },   // Naik ke 150 VUs dalam 2 menit
    { duration: '2m', target: 300 },   // Naik ke 300 VUs dalam 2 menit
    { duration: '2m', target: 400 },   // Naik ke 400 VUs dalam 2 menit
    { duration: '2m', target: 500 },  // Naik ke 500 VUs dalam 2 menit
    { duration: '5m', target: 500 },  // Bertahan di 500 VUs selama 5 menit
    { duration: '2m', target: 0 },     // Turun ke 0 VUs
  ],

  // vus: 50, 
  // duration: '20s',
};

export default function () {
  const url = 'https://bioskopkcm.com/api/v1/homepage/movies/now-playing?cityId=w1YW0AnlqVPXkZE';

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer e45b4e0587ac5980a7e2638c571ca1df0c9bf1e15edd4064eb3468054dc5d6d98d0b54f406ffc4b6f1b16db321b25a93f3cd798d9c3bd00a892e4392a61a6c9b6d10a2bc0d69c2d07b0010703245fa2e9a3d2a72cbf485c08d67248b93d06da47641df70d9f801b39701760ec4af3b3d643bc7c6205f80aa1d88e332307d7fbabb5d22841e153d60acf5b871f910cba331fee2f09a3e4b17095ab50a5a10d852e49fecab4bec499f71b47d24f867c083d1b37fd30e5aa6d6a3538359fdd5e796bce5b42963d739f6fafbc3eec413b1b00a1b44e0b5518dfbb77b3f8f78b20c54435eb912b8e33afa9587eb59bb9bf96bb7dfd94a54d07dc29f4f26a18b65cba08e5c9d0afe29cc90b20421550c3397bbc2afe5e5aed52208281ff05e8f591b34b826bafb747e117444fe35f4e4cd2cea33fe1c2db6a1078e4fddd7229721a7dddfdcdecd8529e3c219c060aeb1c574baca228ffa73d3a9a5c9338a825300d90bf6f9bff16ef70f75aa355ceb44359e36243fb13058d6b3fe1b0b73500bd403bf7654a14470b55b2949776a8cfd1ad518ab41616207a1e27a84e4ddfa36797ae33c130d66c47ced79e43e16290d'
    },
    
  };

  const response = http.get(url, params);

  check(response, {
    'status was 200': (r) => r.status === 200,
  });
  sleep(1);
}