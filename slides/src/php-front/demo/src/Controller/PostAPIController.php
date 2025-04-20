<?php

namespace App\Controller;

use App\DTO\UpdatePostPayload;
use App\Entity\Post;
use App\Repository\PostRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Doctrine\Attribute\MapEntity;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/api/posts')]
class PostAPIController extends AbstractController
{
    public function __construct(private readonly SerializerInterface $serializer)
    {
    }

    /**
     * List paginated posts (API endpoint).
     */
    #[Route('', name: 'api_post_index', methods: ['GET'])]
    public function index(PostRepository $postRepository, Request $request): JsonResponse
    {
        // Basic pagination example - get page from query param
        $page = $request->query->getInt('page', 1); // Default to page 1
        $limit = $request->query->getInt('limit', 10); // Default to 10 items per page

        $paginator = $postRepository->findPaginated($page, $limit);
        $totalItems = count($paginator);
        $pagesCount = ceil($totalItems / $limit);

        $responseData = [
            'data' => $paginator,
            'pagination' => [
                'currentPage' => $page,
                'totalPages' => $pagesCount,
                'totalItems' => $totalItems,
                'itemsPerPage' => $limit,
            ]
        ];

        // Return the structured data as JSON
        return $this->json($responseData, Response::HTTP_OK, [], ['groups' => 'post:list']);
    }

    /**
     * Get a single post by slug (API endpoint).
     */
    #[Route('/{slug}', name: 'api_post_show', methods: ['GET'])]
    public function show(#[MapEntity(mapping: ['slug' => 'slug'])] Post $post): JsonResponse
    {
        $jsonContent = $this->serializer->serialize($post, 'json', ['groups' => 'post:read']);

        return new JsonResponse($jsonContent, Response::HTTP_OK, [], true);
    }

    /**
     * Update an existing post using JSON payload (API endpoint).
     * Uses MapRequestPayload to deserialize and validate the request body.
     */
    #[Route('/{slug}', name: 'api_post_update', methods: ['PUT', 'PATCH'])] // Allow PUT or PATCH
    public function update(
        #[MapEntity(mapping: ['slug' => 'slug'])] Post $post,
        #[MapRequestPayload] UpdatePostPayload $payload, // Automatically maps JSON body to DTO and validates
        EntityManagerInterface $entityManager
    ): JsonResponse
    {
        // Update the Post entity with data from the validated payload
        $post->setTitle($payload->title);
        $post->setExcerpt($payload->excerpt);
        $post->setContent($payload->content);

        // Slug is now always computed based on title via setTitle and PreUpdate listener.
        // No need for manual slug handling here.

        $entityManager->flush();

        $jsonContent = $this->serializer->serialize($post, 'json', ['groups' => 'post:read']);

        return new JsonResponse($jsonContent, Response::HTTP_OK, [], true);
    }
}
