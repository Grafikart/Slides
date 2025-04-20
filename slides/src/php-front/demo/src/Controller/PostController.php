<?php

namespace App\Controller;

use App\Entity\Post;
use App\Repository\PostRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use App\Form\PostType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Doctrine\Attribute\MapEntity;

#[Route('/posts')]
class PostController extends AbstractController
{
    /**
     * Display a paginated list of posts.
     */
    #[Route('', name: 'post_index', methods: ['GET'])]
    public function index(Request $request, PostRepository $postRepository): Response
    {
        $page = $request->query->getInt('page', 1);
        $paginator = $postRepository->findPaginated($page);
        $totalPosts = count($paginator);
        $pagesCount = ceil($totalPosts / PostRepository::POSTS_PER_PAGE);

        return $this->render('post/index.html.twig', [
            'posts' => $paginator,
            'currentPage' => $page,
            'pagesCount' => $pagesCount,
            'totalPosts' => $totalPosts, // Pass total count if needed in template
            'limit' => PostRepository::POSTS_PER_PAGE // Pass limit if needed
        ]);
    }

    /**
     * Display a single post by its slug.
     */
    #[Route('/{slug}', name: 'post_show', methods: ['GET'])]
    public function show(string $slug, PostRepository $postRepository): Response
    {
        $post = $postRepository->findOneBy(['slug' => $slug]);

        if (!$post) {
            // You could also throw $this->createNotFoundException('The post does not exist');
            throw new NotFoundHttpException('The post with slug "'. $slug .'" was not found.');
        }

        return $this->render('post/show.html.twig', [
            'post' => $post,
        ]);
    }

    /**
     * Display and process the form to edit an existing Post entity.
     */
    #[Route('/{slug}/edit', name: 'post_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, #[MapEntity(mapping: ['slug' => 'slug'])] Post $post, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(PostType::class, $post);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            $this->addFlash('success', 'Post updated successfully!');

            return $this->redirectToRoute('post_show', ['slug' => $post->getSlug()], Response::HTTP_SEE_OTHER);
        }

        return $this->render('post/edit.html.twig', [
            'post' => $post,
            'form' => $form->createView(),
        ]);
    }
}
