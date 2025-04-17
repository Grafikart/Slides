<?php

namespace App\Form;

use App\Entity\Post;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class PostType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('title', TextType::class, [
                'label' => 'Title',
                'attr' => ['placeholder' => 'Enter the post title']
            ])
            ->add('excerpt', TextareaType::class, [
                'label' => 'Excerpt',
                'attr' => ['rows' => 3, 'placeholder' => 'Short summary of the post']
            ])
            ->add('content', TextareaType::class, [
                'label' => 'Content (HTML allowed)',
                'attr' => ['rows' => 10, 'placeholder' => 'Write the post content here...'],
                // Consider adding a WYSIWYG editor here for better UX
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Post::class,
        ]);
    }
}
