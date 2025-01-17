import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 250 },  // naikkan hingga 250 VUs dalam 2 menit
    { duration: '5m30s', target: 450 },   // tetap di 450 VUs selama 5 menit 30 detik
    { duration: '1m', target: 100 },   // turun kembali ke 100 VUs dalam 1 menit
  ],
};

export default function () {
  const url = 'https://staging-kcm-api.candi-corp.com/v1/homepage/banners?cityId=';

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMjAyNDM3MTgiLCJqdGkiOiI0Y2RhZGE2Zi02ODZmLTQyOWMtYjAyYS0yZTI0N2M1YmI2YTIiLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MTU0LyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjcxNTQvIn0.VED4tk-Dv4JIqCJdqiK7_vFfEw-t8zlstEqYAm00wYw'
    },
    
  };

  const response = http.get(url, params);

  check(response, {
    'status was 200': (r) => r.status === 200,
  });
  sleep(1);
}