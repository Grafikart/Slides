<?php

namespace App\DTO;

use Symfony\Component\Validator\Constraints as Assert;

class UpdatePostPayload
{
    public function __construct(
        #[Assert\NotBlank]
        #[Assert\Length(min: 5, max: 255)]
        public readonly string $title,

        #[Assert\NotBlank]
        public readonly string $excerpt,

        #[Assert\NotBlank]
        public readonly string $content,
    ) {}
}
