// WordPress API configuration
const WORDPRESS_API_URL = 'https://4.213.183.90/wp-json/wp/v2';
const WORDPRESS_ADMIN_URL = 'https://4.213.183.90/wp-admin';

// Load products from WordPress
async function loadProducts() {
    try {
        const response = await fetch(`${WORDPRESS_API_URL}/posts?per_page=6`);
        const posts = await response.json();
        
        const productsContainer = document.getElementById('products-container');
        productsContainer.innerHTML = '';
        
        posts.forEach(post => {
            const productCard = createProductCard(post);
            productsContainer.appendChild(productCard);
        });
    } catch (error) {
        console.error('Error loading products:', error);
        document.getElementById('products-container').innerHTML = 
            '<p>Products will be loaded from WordPress backend.</p>';
    }
}

// Create product card element
function createProductCard(post) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const image = post.featured_media ? 
        `<img src="${post.featured_media}" alt="${post.title.rendered}" class="product-image">` :
        `<div class="product-image" style="background: #f0f0f0; display: flex; align-items: center; justify-content: center;">
            <span>No Image</span>
        </div>`;
    
    card.innerHTML = `
        ${image}
        <div class="product-info">
            <h3 class="product-title">${post.title.rendered}</h3>
            <p>${post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 100)}...</p>
            <p class="product-price">View Details</p>
        </div>
    `;
    
    return card;
}

// Handle admin link click
function handleAdminClick() {
    window.open(WORDPRESS_ADMIN_URL, '_blank');
}

// Add event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Load products on page load
    loadProducts();
    
    // Handle admin link clicks
    const adminLink = document.querySelector('.admin-link');
    if (adminLink) {
        adminLink.addEventListener('click', function(e) {
            e.preventDefault();
            handleAdminClick();
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// API utility functions
async function fetchFromWordPress(endpoint) {
    try {
        const response = await fetch(`${WORDPRESS_API_URL}/${endpoint}`);
        return await response.json();
    } catch (error) {
        console.error(`Error fetching from WordPress: ${error}`);
        return null;
    }
}

// Test WordPress connection
async function testWordPressConnection() {
    try {
        const response = await fetch(`${WORDPRESS_API_URL}/posts?per_page=1`);
        if (response.ok) {
            console.log('WordPress API connection successful');
            return true;
        } else {
            console.log('WordPress API connection failed');
            return false;
        }
    } catch (error) {
        console.error('WordPress API connection error:', error);
        return false;
    }
}

// Initialize connection test
testWordPressConnection(); 