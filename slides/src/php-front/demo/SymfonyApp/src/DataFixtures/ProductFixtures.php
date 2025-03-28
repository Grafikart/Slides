<?php

namespace App\DataFixtures;

use App\Entity\Post;
use App\Entity\Product;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class ProductFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR'); // Use Faker for dummy data

        for ($i = 0; $i < 20; $i++) { // Create 50 posts
            $product = new Product();
            $title = $faker->sentence(mt_rand(4, 8));
            $product->setTitle($title);
            $product->setDescription($faker->paragraph(mt_rand(2, 4)));
            $product->setPrice($faker->numberBetween(500, 30000));
            $manager->persist($product);
        }

        $manager->flush();
    }
}
