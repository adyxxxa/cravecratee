import React, { useState } from 'react';
import ProductModal from './ProductModal';
import './Pastries.css';

const Pastries = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);

  const pastryCategories = [
    {
      icon: '🥐',
      name: 'Croissants',
      description: 'Buttery, flaky pastries baked fresh daily',
      varieties: '5 varieties'
    },
    {
      icon: '🎂',
      name: 'Artisan Cakes',
      description: 'Handcrafted cakes for every celebration',
      varieties: '5 varieties'
    },
    {
      icon: '🥧',
      name: 'Seasonal Pies',
      description: 'Fresh-baked pies with seasonal fruits',
      varieties: '5 varieties'
    },
    {
      icon: '🍪',
      name: 'Gourmet Cookies',
      description: 'Premium cookies with unique flavor combinations',
      varieties: '5 varieties'
    },
    {
      icon: '🧁',
      name: 'Cupcakes',
      description: 'Delicate cupcakes with artisanal frosting',
      varieties: '5 varieties'
    },
    {
      icon: '🍞',
      name: 'Artisan Breads',
      description: 'Fresh-baked breads using traditional methods',
      varieties: '5 varieties'
    }
  ];

  const productData = {
    'Croissants': [
      { 
        name: 'Classic Butter Croissant', 
        description: 'Traditional French croissant with rich butter', 
        price: 89, 
        rating: 4.8, 
        image: '/images/products/croissants/butter croissant.jpg'
      },
      { 
        name: 'Chocolate Croissant', 
        description: 'Flaky pastry filled with premium chocolate', 
        price: 99, 
        rating: 4.9, 
        image: '/images/products/croissants/chocolate croissant.jpg'
      },
      { 
        name: 'Almond Croissant', 
        description: 'Buttery croissant topped with almonds and sugar', 
        price: 109, 
        rating: 4.7, 
        image: '/images/products/croissants/almond croissant.jpg'
      },
      { 
        name: 'Ham & Cheese Croissant', 
        description: 'Savory croissant with ham and cheese', 
        price: 119, 
        rating: 4.6, 
        image: '/images/products/croissants/ham and cheese.jpg'
      },
      { 
        name: 'Cinnamon Croissant', 
        description: 'Sweet croissant with cinnamon sugar', 
        price: 99, 
        rating: 4.8, 
        image: '/images/products/croissants/cinammon croissant.jpg'
      }
    ],
    'Artisan Cakes': [
      { 
        name: 'Chocolate Fudge Cake', 
        description: 'Rich chocolate cake with fudge frosting', 
        price: 1200, 
        rating: 4.9, 
        image: '/images/products/cakes/chocolate-fudge.jpg'
      },
      { 
        name: 'Vanilla Bean Cake', 
        description: 'Classic vanilla cake with real vanilla beans', 
        price: 1100, 
        rating: 4.7, 
        image: '/images/products/cakes/vanilla-bean.jpg'
      },
      { 
        name: 'Red Velvet Cake', 
        description: 'Southern classic with cream cheese frosting', 
        price: 1300, 
        rating: 4.8, 
        image: '/images/products/cakes/red-velvet.jpg'
      },
      { 
        name: 'Lemon Blueberry Cake', 
        description: 'Zesty lemon cake with fresh blueberries', 
        price: 1150, 
        rating: 4.6, 
        image: '/images/products/cakes/lemon-blueberry.jpg'
      },
      { 
        name: 'Carrot Cake', 
        description: 'Spiced carrot cake with cream cheese frosting', 
        price: 1250, 
        rating: 4.8, 
        image: '/images/products/cakes/carrot-cake.jpg'
      }
    ],
    'Seasonal Pies': [
      { 
        name: 'Apple Pie', 
        description: 'Classic apple pie with cinnamon and nutmeg', 
        price: 750, 
        rating: 4.8, 
        image: '/images/products/pies/apple pie.png'
      },
      { 
        name: 'Cherry Pie', 
        description: 'Sweet cherry pie with lattice crust', 
        price: 800, 
        rating: 4.7, 
        image: '/images/products/pies/cherry pie.png'
      },
      { 
        name: 'Pumpkin Pie', 
        description: 'Traditional pumpkin pie with whipped cream', 
        price: 700, 
        rating: 4.9, 
        image: '/images/products/pies/pumpkin pie.png'
      },
      { 
        name: 'Blueberry Pie', 
        description: 'Fresh blueberry pie with crumb topping', 
        price: 850, 
        rating: 4.6, 
        image: '/images/products/pies/blueberry pie.jpg'
      },
      { 
        name: 'Peach Pie', 
        description: 'Summer peach pie with vanilla ice cream', 
        price: 900, 
        rating: 4.8, 
        image: '/images/products/pies/peach pie.jpg'
      }
    ],
    'Gourmet Cookies': [
      { 
        name: 'Chocolate Chip Cookie', 
        description: 'Classic cookie with premium chocolate chips', 
        price: 45, 
        rating: 4.8, 
        image: '/images/products/cookies/classic-chocolate-chip-cookies.jpg'
      },
      { 
        name: 'Double Chocolate Cookie', 
        description: 'Rich chocolate cookie with chocolate chunks', 
        price: 55, 
        rating: 4.9, 
        image: '/images/products/cookies/double chocolate cookies.png'
      },
      { 
        name: 'Oatmeal Raisin Cookie', 
        description: 'Hearty oatmeal cookie with plump raisins', 
        price: 50, 
        rating: 4.6, 
        image: '/images/products/cookies/oatmeal raisin cookie.jpg'
      },
      { 
        name: 'Snickerdoodle Cookie', 
        description: 'Cinnamon sugar cookie with soft center', 
        price: 45, 
        rating: 4.7, 
        image: '/images/products/cookies/snickerdoodle.jpg'
      },
      { 
        name: 'White Chocolate Macadamia', 
        description: 'Buttery cookie with white chocolate and nuts', 
        price: 65, 
        rating: 4.8, 
        image: '/images/products/cookies/white-chocolate-macadamia-nut-cookies-1.jpg'
      }
    ],
    'Cupcakes': [
      { 
        name: 'Vanilla Cupcake', 
        description: 'Classic vanilla cupcake with buttercream', 
        price: 75, 
        rating: 4.7, 
        image: '/images/products/cupcakes/vanilla cupcake.jpg'
      },
      { 
        name: 'Chocolate Cupcake', 
        description: 'Rich chocolate cupcake with chocolate frosting', 
        price: 85, 
        rating: 4.8, 
        image: '/images/products/cupcakes/chocolate cupcake.jpg'
      },
      { 
        name: 'Red Velvet Cupcake', 
        description: 'Southern classic with cream cheese frosting', 
        price: 95, 
        rating: 4.9, 
        image: '/images/products/cupcakes/redvleveet cupcake.jpg'
      },
      { 
        name: 'Strawberry Cupcake', 
        description: 'Fresh strawberry cupcake with pink frosting', 
        price: 85, 
        rating: 4.6, 
        image: '/images/products/cupcakes/strawberry cupcake.jpg'
      },
      { 
        name: 'Carrot Cupcake', 
        description: 'Spiced carrot cupcake with cream cheese frosting', 
        price: 95, 
        rating: 4.8, 
        image: '/images/products/cupcakes/carrot cupcake.jpg'
      }
    ],
    'Artisan Breads': [
      { 
        name: 'Sourdough Bread', 
        description: 'Traditional sourdough with tangy flavor', 
        price: 280, 
        rating: 4.8, 
        image: '/images/products/breads/sourdough.jpg'
      },
      { 
        name: 'Whole Wheat Bread', 
        description: 'Nutritious whole wheat bread', 
        price: 250, 
        rating: 4.6, 
        image: '/images/products/breads/whole wheat bread.jpg'
      },
      { 
        name: 'French Baguette', 
        description: 'Crispy French baguette with soft interior', 
        price: 180, 
        rating: 4.9, 
        image: '/images/products/breads/french baguette.jpg'
      },
      { 
        name: 'Cinnamon Raisin Bread', 
        description: 'Sweet bread with cinnamon and raisins', 
        price: 300, 
        rating: 4.7, 
        image: '/images/products/breads/cinnamon raisin bread.jpg'
      },
      { 
        name: 'Multigrain Bread', 
        description: 'Hearty multigrain bread with seeds', 
        price: 290, 
        rating: 4.8, 
        image: '/images/products/breads/multigrain bread.jpg'
      }
    ]
  };

  const handleViewProducts = (category) => {
    setSelectedCategory(category);
    setSelectedProducts(productData[category] || []);
    setIsModalOpen(true);
  };

  return (
    <section className="pastries-section">
      <div className="container">
        <h2 className="section-title">Our Artisanal Pastries</h2>
        <p className="section-subtitle">Handcrafted with love, delivered with care</p>
        
        <div className="pastries-grid">
          {pastryCategories.map((pastry, index) => (
            <div key={index} className="pastry-card">
              <div className="pastry-icon">{pastry.icon}</div>
              <h3 className="pastry-name">{pastry.name}</h3>
              <p className="pastry-description">{pastry.description}</p>
              <div className="pastry-varieties">{pastry.varieties}</div>
              <button 
                className="view-products-btn"
                onClick={() => handleViewProducts(pastry.name)}
              >
                View Products
              </button>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <ProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          category={selectedCategory}
          products={selectedProducts}
        />
      )}
    </section>
  );
};

export default Pastries;