interface IQueryPayload {
  method: string
  args: []
}

export const connector = (baseURL = 'http://localhost:7020/api/v0/query') => {
  return {
    post(endpoint: string, payload: IQueryPayload) {
      return fetch(baseURL+endpoint, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload),
      }).then((res) => res.json());
    },
  };
};
