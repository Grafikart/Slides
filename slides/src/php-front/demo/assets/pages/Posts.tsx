import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPosts } from "../api";
import { type Post, type PaginatedPostsResponse } from "../types";
import { Fragment } from "react";

export function Posts() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery<PaginatedPostsResponse, Error>({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.pagination.currentPage < lastPage.pagination.totalPages) {
        return lastPage.pagination.currentPage + 1;
      }
      return undefined;
    },
  });

  if (status === "pending") {
    return <div className="p-4 text-center">Chargement des articles...</div>;
  }

  if (status === "error") {
    return (
      <div className="p-4 text-center text-red-600">
        Erreur lors du chargement : {error?.message || "Erreur inconnue"}
      </div>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Liste des Articles</h1>

      {data.pages.map((page, i) => (
        <div key={i} className="space-y-4">
          {page.data.map((post: Post) => (
            <article
              key={post.id}
              className="card card-border border-base-300 card-sm bg-base-200"
            >
              <div className="card-body">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-base-content/50 text-sm mb-1">{post.excerpt}</p>
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-neutral w-max"
                >
                  Voir plus
                </a>
              </div>
            </article>
          ))}
        </div>
      ))}

      <div className="flex justify-center mt-6">
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          className="btn btn-primary"
        >
          {isFetchingNextPage
            ? "Chargement..."
            : hasNextPage
            ? "Charger plus"
            : "Plus rien à charger"}
        </button>
      </div>

      {isFetching && !isFetchingNextPage ? (
        <div className="text-center text-base-content/70 mt-4">
          Chargement en cours...
        </div>
      ) : null}
    </>
  );
}
