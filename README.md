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

1. **Install the package using Composer:**

   ```bash
   composer install
   ```

2. **Configuration::**

   Update your configuration file (e.g., .env) with your API base URL

3. **Set Up a Web Server Using PHP’s Built-In Server or use docker composer:**

   You can use Apache, Nginx, or PHP’s built-in server to run the project

   Navigate to the `public` directory and start the PHP server:

      ```bash
      cd public
      php -S localhost:8000
      ```
   Now, open your web browser and visit `http://localhost:8000`.
