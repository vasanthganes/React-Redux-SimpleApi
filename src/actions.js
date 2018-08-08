//Action
import axios from 'axios';
export const FETCH_USER_BEGIN   = 'FETCH_USER_BEGIN';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

export const fetchUserBegin = () => ({
  type: FETCH_USER_BEGIN
});

export const fetchUserSuccess = user => ({
  type: FETCH_USER_SUCCESS,
  payload: { user }
});

export const fetchUserError = error => ({
  type: FETCH_USER_FAILURE,
  payload: { error }
});

export function fetchUsers(id) { 
  return dispatch => {
    dispatch(fetchUserBegin());
    return fetch("https://reqres.in/api/users/"+id)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchUserSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(fetchUserError(error)));
  };
}


function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}