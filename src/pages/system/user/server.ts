import { request } from 'umi';

export async function fetchUserList() {
  return request('/getAllUserList', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
