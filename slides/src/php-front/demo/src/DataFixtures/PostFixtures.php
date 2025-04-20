<?php

namespace App\DataFixtures;

use App\Entity\Post;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class PostFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('en_US'); // Use Faker for dummy data

        for ($i = 0; $i < 50; $i++) { // Create 50 posts
            $post = new Post();
            
            // Generate a title first to ensure slug computation works
            $title = $faker->sentence(mt_rand(4, 8)); 
            $post->setTitle($title);
            
            // Generate other fields
            $post->setExcerpt($faker->paragraph(mt_rand(2, 4)));
            
            // Generate HTML content
            $content = '<p>' . implode('</p><p>', $faker->paragraphs(mt_rand(5, 15))) . '</p>';
            $post->setContent($content);

            // Set created_at and updated_at manually for more varied dates if needed,
            // otherwise lifecycle callbacks will set them to 'now' on persist.
            // Example: Set created_at to a random date in the past year
            $randomDate = $faker->dateTimeBetween('-1 year', 'now');
            $immutableDate = \DateTimeImmutable::createFromMutable($randomDate);
            // Need to use reflection or a dedicated setter if properties are private
            // and no public setter exists for created_at/updated_at. Since we 
            // have lifecycle callbacks, we can let them handle the default case,
            // or add specific setters if we need controlled fixture dates.
            // Let's assume lifecycle callbacks are sufficient for now.

            $manager->persist($post);
        }

        $manager->flush();
    }
}
