<?php

namespace App\EventSubscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ResponseEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Response;
use ApiPlatform\Symfony\EventListener\EventPriorities;

class MetaDataSubscriber implements EventSubscriberInterface
{
    public function __construct(private RequestStack $requestStack) {}
    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::RESPONSE => ['onKernelResponse', EventPriorities::POST_RESPOND],
        ];
    }
    public function onKernelResponse(ResponseEvent $event): void
    {
        $request = $this->requestStack->getCurrentRequest();
        $response = $event->getResponse();
        if (
            !$response instanceof Response ||
            !str_starts_with($response->headers->get('Content-Type', ''), 'application/ld+json')
        ) {
            return;
        }

        $data = json_decode($response->getContent(), true);
        $content = $response->getContent();
        $data = json_decode($content, true);
        if (!is_array($data) || !isset($data['member'])) {
            return;
        }

         // Inject meta
        $request = $this->requestStack->getCurrentRequest();
        $page = (int) $request->query->get('page', 1);
        $pageSize = (int) $request->query->get('size', default: 10);

        $data['meta'] = [
            'pageIndex' => max(0, $page - 1),
            'pageSize' => $pageSize,
        ];

        $response->setContent(json_encode($data));
    }


    
}
