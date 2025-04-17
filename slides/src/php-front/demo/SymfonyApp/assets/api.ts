import { type PaginatedPostsResponse } from './types';

const API_URL = 'http://localhost:8000/api';

// Fonction pour récupérer les articles paginés
export const fetchPosts = async (page: number = 1): Promise<PaginatedPostsResponse> => {
  const response = await fetch(`${API_URL}/posts?page=${page}`);

  if (!response.ok) {
    // Gérer les erreurs de manière plus robuste en production
    throw new Error('Network response was not ok');
  }

  const data: PaginatedPostsResponse = await response.json();
  return data;
};
