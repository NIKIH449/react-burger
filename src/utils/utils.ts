export const checkResponse = (res: {
  ok: boolean;
  json(): Promise<object>;
  status: number;
}) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};