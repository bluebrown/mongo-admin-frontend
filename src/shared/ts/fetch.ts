export function fetchLoad(query: string) {
  return fetch('http://localhost:7020/api/v0/load', {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: Buffer.from(query),
  }).then((res) => res.json());
}
