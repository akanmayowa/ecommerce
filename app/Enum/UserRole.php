<?php

namespace App\Enum;

/**
 * list of user roles
*/
enum UserRole: string
{
    case ADMIN = 'admin';
    case SHOPPER = 'shopper';
    case SUPPLIER = 'supplier';
}
