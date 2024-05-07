<?php

namespace App\Enum;
enum OrderTypeEnum: string
{
    case SIMPLE = 'simple';
    case CREDIT = 'credit';
    case INSTALLMENTS = 'installments';
    case FAST_ORDER = 'fast_order';
}
