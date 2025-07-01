// src/utils/constants.js

// Determine base URL based on mode
const BASE_API_URL =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:8000/api/v1'
    : '/api/v1';

export const USER_API_END_POINT        = `${BASE_API_URL}/user`;
export const JOB_API_END_POINT         = `${BASE_API_URL}/job`;
export const APPLICATION_API_END_POINT = `${BASE_API_URL}/application`;
export const COMPANY_API_END_POINT     = `${BASE_API_URL}/company`;
