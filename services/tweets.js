import { API_URL } from '../config';

const authHeaders = (token) => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
});

export function getTweets(token) {
  return fetch(`${API_URL}/api/tweets`, {
    headers: authHeaders(token),
  }).then((response) => response.json());
}

export function createTweet(token, content) {
  return fetch(`${API_URL}/api/tweets`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({ content }),
  }).then((response) => response.json());
}

export function deleteTweet(token, id) {
  return fetch(`${API_URL}/api/tweets/${id}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  }).then((response) => response.json());
}

export function toggleLike(token, id) {
  return fetch(`${API_URL}/api/tweets/${id}/like`, {
    method: 'PUT',
    headers: authHeaders(token),
  }).then((response) => response.json());
}
