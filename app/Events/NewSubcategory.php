<?php

namespace App\Events;

use App\Models\SubCategory;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NewSubcategory
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public SubCategory $subcategory;

    /**
     * Create a new event instance.
     */
    public function __construct($subcategory)
    {
        $this->subcategory = $subcategory;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('channel-name'),
        ];
    }
}
