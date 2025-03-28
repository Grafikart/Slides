<?php

namespace App\Controller;

use App\Entity\Post;
use App\Form\PostType;
use App\Repository\PostRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Attribute\Route;

class HtmxController extends AbstractController
{

    #[Route('/htmx', methods: ['GET'], name: 'posts.index')]
    public function index(Request $request, PostRepository $postRepository)
    {
        $page = $request->query->getInt('page', 1); // Default to page 1
        $limit = $request->query->getInt('limit', PostRepository::POSTS_PER_PAGE); // Default to 10 items per page

        $paginator = $postRepository->findPaginated($page, $limit);
        $totalItems = count($paginator);
        $pagesCount = ceil($totalItems / $limit);

        $response = $this->render('htmx/posts.html.twig', [
            'posts' => $paginator,
            'currentPage' => $page,
            'pagesCount' => $pagesCount,
            'totalPosts' => $totalItems,
            'limit' => PostRepository::POSTS_PER_PAGE
        ]);
        $response->headers->set('HX-Reswap', 'outerHTML');
        $response->headers->set('HX-Retarget', '#main');
        $response->headers->set('HX-Reselect', '#main');
        return $response;
    }

    #[Route('/htmx/post/{id}', methods: ['GET', 'POST'], name: 'posts.edit')]
    public function edit(Post $post, Request $request, EntityManagerInterface $em)
    {
        $form = $this->createForm(PostType::class, $post);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em->persist($post);
            $em->flush();
            $response = $this->redirectToRoute('posts.index');
            return $response;
        }

        $response = $this->render('htmx/post.html.twig', [
            'post' => $post,
            'form' => $form
        ]);

        if ($form->isSubmitted()) {
            $response->headers->set('HX-Reswap', 'outerHTML');
            $response->headers->set('HX-Retarget', 'dialog');
            $response->headers->set('HX-Reselect', 'dialog');
        } else {
            $response->headers->set('HX-Reswap', 'beforeend');
            $response->headers->set('HX-Retarget', '#main');
            $response->headers->set('HX-Reselect', 'dialog');
        }

        return $response;
    }

    #[Route('/htmx/post/{id}', methods: ['DELETE'], name: 'posts.delete')]
    public function delete(Post $post, EntityManagerInterface $em, Request $request, PostRepository $postRepository)
    {
        $em->remove($post);
        $em->flush();
        return $this->index($request, $postRepository);
    }

}
