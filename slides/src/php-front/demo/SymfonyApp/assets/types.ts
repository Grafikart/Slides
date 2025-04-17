// Définition du type pour un article individuel
export interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  created_at: string; // Ou Date si vous préférez convertir
  updated_at: string; // Ou Date
  link: string;
}

// Type pour les détails de pagination retournés par l'API
export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

// Définition du type pour la réponse globale de l'API des posts
export interface PaginatedPostsResponse {
  data: Post[];             // Les articles sont dans la clé 'data'
  pagination: PaginationInfo; // Les infos de pagination sont dans la clé 'pagination'
}
