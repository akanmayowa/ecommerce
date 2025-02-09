## Laravel React Ecommerce Application

### Description

The idea is to create a simple e-commerce app where we have multiple suppliers which add products to a main shop

### Features

Supplier environment
• Able to register and login
• Able to CRUD products
• View which users bought your products
• Anything you deem as an appropriate addition to the app

Shopping environment
• Able to register and login
• Able to view all products created by suppliers
• Able to add to cart, checkout and purchase products
• Able to view order history
• Anything you deem as an appropriate addition to the app

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- PHP 8.2 or higher
- A web server (Apache, Nginx, or PHP's built-in server)
- Composer (for dependency management)

### Installation

Follow these steps to set up the package:

1. **Install the package using Composer on your system:**
      composer and node 

2. **Configuration::**
      Update your configuration file (e.g., .env) with your API base URL

3. **Set Up a Web Server or Use docker:**

   Using Docker
    - install docker desktop for windows or linux
    - run composer require laravel/sail --dev
    - php artisan sail:install
    - ./vendor/bin/sail up

   Using Web Server (Apache, Nginx)
    - Navigate to the `public` directory and start the PHP server:

      ```bash
      cd public
      php -S localhost:8000
      ```
   Now, open your web browser and visit `http://localhost:8000`.

4. **Usage:**

   - register and create an account as a supplier or a shopper
   - as a supplier create products and view customers who purchased your products
   - as a shopper view available products and purchase any product 
   - as a shopper view your purchase orders
