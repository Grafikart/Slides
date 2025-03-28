<?php

namespace App\Serializer\Normalizer;

use App\Entity\Post;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class PostNormalizer implements NormalizerInterface
{
    public function __construct(
        #[Autowire(service: 'serializer.normalizer.object')]
        private readonly NormalizerInterface $normalizer,
        private readonly UrlGeneratorInterface $urlGenerator
    ) {
    }

    /**
     * @param Post $object
     */
    public function normalize(mixed $object, ?string $format = null, array $context = []): array|string|int|float|bool|\ArrayObject|null
    {
        // Get the base normalization data from the default object normalizer
        $data = $this->normalizer->normalize($object, $format, $context);

        $data['link'] = $this->urlGenerator->generate(
            'api_post_show',
            ['slug' => $object->getSlug()],
            UrlGeneratorInterface::ABSOLUTE_URL
        );

        return $data;
    }

    public function supportsNormalization(mixed $data, ?string $format = null, array $context = []): bool
    {
        $groups = is_array($context['groups']) ? $context['groups'] : [$context['groups']];
        return $data instanceof Post && in_array('post:list', $groups);
    }

    public function hasCacheableSupportsMethod(): bool
    {
        // Indicate that supportsNormalization can be cached for performance
        return true; 
    }

    public function getSupportedTypes(?string $format): array
    {
        return [
            Post::class => true, // Cacheable
        ];
    }
}
