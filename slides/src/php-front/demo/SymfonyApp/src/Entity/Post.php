<?php

namespace App\Entity;

use App\Repository\PostRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\String\Slugger\AsciiSlugger;
use Symfony\Component\Validator\Constraints\Length;

#[ORM\Entity(repositoryClass: PostRepository::class)]
#[ORM\Table(name: 'post')]
#[ORM\HasLifecycleCallbacks]
class Post
{
    #[Groups(['post:list', 'post:read'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['post:list', 'post:read'])]
    #[ORM\Column(length: 255)]
    #[Length(min: 5)]
    private ?string $title = null;

    #[Groups(['post:list', 'post:read'])]
    #[ORM\Column(length: 255, unique: true)]
    private ?string $slug = null;

    #[Groups(['post:list', 'post:read'])]
    #[ORM\Column(type: Types::TEXT)]
    private ?string $excerpt = null;

    #[Groups(['post:read'])]
    #[ORM\Column(type: Types::TEXT)]
    private ?string $content = null;

    #[Groups(['post:list', 'post:read'])]
    #[ORM\Column(type: Types::DATETIME_IMMUTABLE)]
    private ?\DateTimeImmutable $created_at = null;

    #[Groups(['post:list', 'post:read'])]
    #[ORM\Column(type: Types::DATETIME_IMMUTABLE)]
    private ?\DateTimeImmutable $updated_at = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;
        $this->computeSlug();
        return $this;
    }

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function getExcerpt(): ?string
    {
        return $this->excerpt;
    }

    public function setExcerpt(string $excerpt): static
    {
        $this->excerpt = $excerpt;
        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): static
    {
        $this->content = $content;
        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->created_at;
    }

    // We don't provide setCreatedAt directly, it's set via lifecycle callback

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updated_at;
    }

    // We don't provide setUpdatedAt directly, it's set via lifecycle callback

    #[ORM\PrePersist]
    public function setCreatedAtValue(): void
    {
        $this->created_at = new \DateTimeImmutable();
        $this->updated_at = new \DateTimeImmutable(); // Also set on creation
        $this->computeSlug(); // Ensure slug is set before first persist
    }

    #[ORM\PreUpdate]
    public function setUpdatedAtValue(): void
    {
        $this->updated_at = new \DateTimeImmutable();
        $this->computeSlug(); // Ensure slug is recomputed if title changed
    }

    /**
     * Computes the slug based on the title.
     * Ensures the slug is lowercased.
     */
    private function computeSlug(): void
    {
        // Always compute if title exists. Ensures it updates if title changes.
        // Add uniqueness logic here if needed (e.g., check repository and append suffix)
        if ($this->title) {
            $slugger = new AsciiSlugger();
            $this->slug = $slugger->slug($this->title)->lower()->toString();
        }
    }
}
