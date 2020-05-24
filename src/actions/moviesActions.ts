import axios from 'axios';
import { Dispatch } from 'redux';
import { Action } from 'src/store';
import { MoviesAction, MoviesActionTypes } from './types';
import { API_URL } from 'src/contstants';

export const isLoading = (loading: boolean): MoviesAction => {
  return { type: MoviesActionTypes.LOADING, payload: loading };
};

export const setErrorMessage = (message: string): MoviesAction => {
  return { type: MoviesActionTypes.ERROR, payload: message };
};

export const clearMovies = (): MoviesAction => {
  return { type: MoviesActionTypes.CLEAR_MOVIES };
};

export const getMovies = (query: string, page: number): Action => async (
  dispatch: Dispatch<MoviesAction>
) => {
  try {
    dispatch(isLoading(true));

    let response = await axios.get(`${API_URL}/movie/${query}`, {
      params: {
        api_key: process.env.API_KEY,
        page,
      },
    });

    dispatch({
      type: MoviesActionTypes.GET_MOVIES,
      payload: response.data.results,
    });
  } catch (error) {
    dispatch(setErrorMessage(error.message));
  } finally {
    dispatch(isLoading(false));
  }
};

export const getMovieDetails = (id: number): Action => async (
  dispatch: Dispatch<MoviesAction>
) => {
  try {
    dispatch(isLoading(true));

    let response = await axios.get(`${API_URL}/movie/${id}`, {
      params: {
        api_key: process.env.API_KEY,
      },
    });

    dispatch({
      type: MoviesActionTypes.GET_MOVIE_DETAILS,
      payload: response.data,
    });
  } catch (error) {
    dispatch(setErrorMessage(error.message));
  } finally {
    dispatch(isLoading(false));
  }
};

export const clearMovieDetails = (): MoviesAction => {
  return { type: MoviesActionTypes.CLEAR_MOVIE_DETAILS };
};

export const rateMovie = (
  movieId: number,
  value: number,
  sessionId: string
): Action => async (dispatch: Dispatch<MoviesAction>) => {
  try {
    let data = {
      value,
    };
    let response = await axios.post(
      `${API_URL}/movie/${movieId}/rating`,
      data,
      {
        params: {
          api_key: process.env.API_KEY,
          guest_session_id: sessionId,
        },
      }
    );
    if (response.data.status_code === 1) {
      dispatch(getRatedMovies(sessionId));
    }
  } catch (error) {
    dispatch(setErrorMessage(error.message));
  } finally {
  }
};

export const getRatedMovies = (sessionId: string): any => async (
  dispatch: Dispatch<MoviesAction>
) => {
  try {
    let response = await axios.get(
      `${API_URL}/guest_session/${sessionId}/rated/movies`,
      {
        params: {
          api_key: process.env.API_KEY,
        },
      }
    );

    dispatch({
      type: MoviesActionTypes.GET_RATED_MOVIES,
      payload: response.data.results,
    });
  } catch (error) {
    console.log(error.message);
  }
};
