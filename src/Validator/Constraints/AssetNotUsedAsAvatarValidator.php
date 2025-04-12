<?php

namespace App\Validator\Constraints;

use Symfony\Component\Validator\Exception\UnexpectedTypeException;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Validator\Constraint;
use App\Entity\Storage\Asset;
use App\Entity\Catalog\Product;

final class AssetNotUsedAsAvatarValidator extends ConstraintValidator
{
    public function validate(mixed $value, Constraint $constraint): void
    {
        if (!$constraint instanceof AssetNotUsedAsAvatar) {
            throw new UnexpectedTypeException($constraint, AssetNotUsedAsAvatar::class);
        }

        if (!$value instanceof Product && $value !== null) {
            return; // Only apply to Product relation (can be null)
        }

        // We need access to the root Asset entity to check if it has a user
        $asset = $this->context->getObject();

        if ($asset instanceof Asset && $asset->getUser() !== null) {
            $this->context->buildViolation($constraint->message)
                ->addViolation();
        }
    }
}
