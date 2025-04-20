<?php

namespace App\Controller;

use App\Entity\Post;
use App\Form\PostType;
use App\Repository\PostRepository;
use Doctrine\ORM\EntityManagerInterface;
use starfederation\datastar\ServerSentEventGenerator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class DatastarController extends AbstractController
{

    #[Route('/datastar', methods: ['GET'], name: 'datastar')]
    public function index(Request $request, PostRepository $postRepository)
    {
        $page = $request->query->getInt('page', 1); // Default to page 1
        $limit = $request->query->getInt('limit', PostRepository::POSTS_PER_PAGE); // Default to 10 items per page

        $paginator = $postRepository->findPaginated($page, $limit);
        $totalItems = count($paginator);
        $pagesCount = ceil($totalItems / $limit);

        $response = $this->render('datastar/index.html.twig', [
            'posts' => $paginator,
            'currentPage' => $page,
            'pagesCount' => $pagesCount,
            'totalPosts' => $totalItems,
            'limit' => PostRepository::POSTS_PER_PAGE
        ]);
        return $response;
    }

    #[Route('/datastar/post/{id}/edit', methods: ['GET', 'POST'], name: 'datastar.posts.edit')]
    public function edit(Post $post, Request $request, EntityManagerInterface $em, ServerSentEventGenerator $sse)
    {
        $form = $this->createForm(PostType::class, $post);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em->persist($post);
            $em->flush();
            $sse->mergeFragments(
                $this->renderView('datastar/row.html.twig', [
                    'post' => $post
                ])
            );
            $sse->mergeSignals(
                ['flash' => [
                    'type' => 'success',
                    'message' => "L'article a bien été modifié"
                ]]
            );
            return new Response('', Response::HTTP_NO_CONTENT);
        } else if ($form->isSubmitted()) {
            $sse->mergeSignals(
                ['flash' => [
                    'type' => 'danger',
                    'message' => "Merci de corriger vos erreur"
                ]]
            );
        }

        $sse->mergeSignals(
            ['title' => 'Editer : ' . $post->getTitle()]
        );

        $sse->mergeFragments(
            $this->renderView('datastar/form.html.twig', [
                'form' => $form,
                'post' => $post
            ])
        );

        return new Response('', Response::HTTP_NO_CONTENT);
    }

    #[Route('/datastar/post/{id}', methods: ['GET', 'POST'], name: 'datastar.posts.show')]
    public function show(Post $post, ServerSentEventGenerator $sse)
    {
        $sse->mergeFragments(
            $this->renderView('datastar/row.html.twig', [
                'post' => $post
            ])
        );

        return new Response('', Response::HTTP_NO_CONTENT);
    }


}
