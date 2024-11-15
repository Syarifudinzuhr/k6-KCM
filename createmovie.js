import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
//   stages: [
//     { duration: '30s', target: 50 },  
//     { duration: '1m', target: 90 },  
//     { duration: '15s', target: 30 },   
//   ],
vus: 30, 
  duration: '30s',

  thresholds: {
    http_req_duration: ['p(80)<1000'], // 80% dari request harus di bawah 10 detik
  },
};

export default function () {
  const url = 'https://staging-kcm-api.weesdepe.com/graphql';
    const payload = JSON.stringify({
      query: `mutation CreateMovie {
        movie {
          createMovie(
            data: {
              title: "DESPICABLE ME 5"
              duration: "90 Min"
              imageURL: "https://storage.googleapis.com/kcm-public-images/poster/dm4-poster.jpeg"
              actors: [
                "Steve Carell", "Kristen Wiig", "Joey King", "Will Ferrell", 
                "Sofia Vergara", "Miranda Cosgrove", "Dana Gaier", 
                "Madison Skyy Polan", "Pierre Coffin", "Steve Coogan", 
                "Stephen Colbert", "Chloe Fineman"
              ]
              language: "EN"
              director: "Chris Renaud"
              subtitle: "Indonesia"
              sinopsis: "Gru, Lucy, Margo, Edith, dan Agnes siap menyambut anggota baru di keluarga. Di tengah kebahagiaan, Gru harus menghadapi penjahat bernama Maxime Le Mal yang berniat membalas dendam kepada Gru. Apakah Gru bisa menyelamatkan keluarga kecilnya?"
              share: 50
              productionHouse: "UNIVERSAL PICTURES 2"
              trailerLink: "https://www.youtube.com/watch?v=qQlr9-rF32A"
              ratingId: "Evm9X8K7OKM2Rl5"
              distributorId: "ejORKXwNd4pQxYM"
              genres: ["Comedy", "Animation"]
              status: PUBLISHED
            }
          ) {
            id
            title
          }
        }
      }`,
    });
      

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer b4f3c74c1a3424479f83a0e2b53c5774822831207fec950fcf9c7a70ae09edfd2c31c8785dae48f26860b66359ea410f0d3de2ca18505fc5bf5f299b4940cb8658edf59a714b498fbf360f76b86d3c57e7a54ee84bdfb3a045e99f46a80649132332fa6e1034691db551eb85be470fb334a14ce686b6783ee0d4edaf64c5ff4f7624bf2620a16b58733461bd2ef847651c952eb49431a18055ec8bdf52dd67347e911b21277c7efca2bf5a5692cfaacadd34ac0a26126e952668321fcf01391a103599f84f87b900aaa79d26895837948b729aaeb3fe44f51290da7c7bc95596f1e732ffbd47f9c2788ca4b808494874362d98a923c796d69a33362cce1844364017aa526b033dcf0704d7a958ff121927d761514b583802c33ff37924a7f7878611394b504560c67a8a4185438855ec6461ca5cd801e92d6d642576c87fbf9dcdc9d89e2bab7dc9868039242ec0a87f6c831ce7cd853fbec1e004d22c0970bbd7e6c8e4900c963943f3dbb4c1991b5d22b51843c9266216492f26eecb103cf5ef77c8c91e1e1d7c1026b811e9a9d25810eb4d6f1ca7abd0b409aa11e8f009'
    },
  };

  const response = http.post(url, payload, params);

  check(response, {
    'status was 200': (r) => r.status === 200,
  });
  sleep(1);
}
