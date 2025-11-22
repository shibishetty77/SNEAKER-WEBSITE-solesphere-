// Generate 250 diverse sneaker products
const brands = ['Nike', 'Adidas', 'Puma', 'New Balance', 'Converse', 'Reebok', 'Vans', 'Asics', 'Under Armour', 'Saucony'];
const categories = ['running', 'casual', 'lifestyle', 'basketball', 'training', 'walking'];
const genders = ['men', 'women', 'unisex', 'kids'];
const models = [
  'Air', 'Max', 'Force', 'Ultra', 'Boost', 'Zoom', 'Flex', 'React', 'Vapor', 'Swift',
  'Runner', 'Trainer', 'Court', 'Street', 'Classic', 'Retro', 'Modern', 'Sport', 'Pro', 'Elite',
  'Velocity', 'Shadow', 'Thunder', 'Storm', 'Flash', 'Blaze', 'Phantom', 'Ghost', 'Rebel', 'Legend',
  'Victory', 'Champion', 'Heritage', 'Fusion', 'Energy', 'Dynamic', 'Alpha', 'Omega', 'Quantum', 'Pulse'
];

// Brand-specific sneaker images from Unsplash
const brandImages = {
  'Nike': [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&fit=crop', // Nike Air Force 1
    'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&fit=crop', // Nike Air Max
    'https://images.unsplash.com/photo-1595950653106-6c9c43c4e2c8?w=500&fit=crop', // Nike React
    'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500&fit=crop', // Nike Zoom
    'https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=500&fit=crop', // Nike Dunk
    'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&fit=crop', // Nike Blazer
    'https://images.unsplash.com/photo-1580906853149-f82f7601d205?w=500&fit=crop', // Nike Court
    'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=500&fit=crop', // Nike SB
    'https://images.unsplash.com/photo-1600269452121-11c610cc2915?w=500&fit=crop', // Nike Vapor
    'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500&fit=crop'  // Nike Free
  ],
  'Adidas': [
    'https://images.unsplash.com/photo-1608667508764-2b2c7c2e8b8c?w=500&fit=crop', // Adidas Ultraboost
    'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=500&fit=crop', // Adidas Stan Smith
    'https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&fit=crop', // Adidas Superstar
    'https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=500&fit=crop', // Adidas NMD
    'https://images.unsplash.com/photo-1542219550-e1d0d6d79db3?w=500&fit=crop', // Adidas Gazelle
    'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?w=500&fit=crop', // Adidas Continental
    'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=500&fit=crop', // Adidas Yeezy
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&fit=crop', // Adidas Forum
    'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=500&fit=crop', // Adidas Campus
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&fit=crop'  // Adidas Samba
  ],
  'Puma': [
    'https://images.unsplash.com/photo-1588099768505-725d9da58295?w=500&fit=crop', // Puma Suede
    'https://images.unsplash.com/photo-1594206976-b7b8b8b8b8b8?w=500&fit=crop', // Puma RS-X
    'https://images.unsplash.com/photo-1511556532299-d6a0e7b6b8b8?w=500&fit=crop', // Puma Clyde
    'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&fit=crop', // Puma Thunder
    'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?w=500&fit=crop', // Puma Future Rider
    'https://images.unsplash.com/photo-1605408499595-8959a02c77b5?w=500&fit=crop', // Puma Cali
    'https://images.unsplash.com/photo-1611312449408-fcfb9c8b9b8b?w=500&fit=crop', // Puma Mayze
    'https://images.unsplash.com/photo-1626947770145-9f9b8b8b8b8b?w=500&fit=crop', // Puma Palermo
    'https://images.unsplash.com/photo-1584735175315-9d5df23860d5?w=500&fit=crop', // Puma Speedcat
    'https://images.unsplash.com/photo-1556906781-9a4a4a4a4a4a?w=500&fit=crop'  // Puma Basket
  ],
  'New Balance': [
    'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&fit=crop', // New Balance 990
    'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=500&fit=crop', // New Balance 574
    'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500&fit=crop', // New Balance 327
    'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=500&fit=crop', // New Balance 2002R
    'https://images.unsplash.com/photo-1543508282-7de2dfaee5b6?w=500&fit=crop', // New Balance 1906R
    'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&fit=crop', // New Balance 9060
    'https://images.unsplash.com/photo-1580906853149-f82f7601d205?w=500&fit=crop', // New Balance Fresh Foam
    'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=500&fit=crop', // New Balance FuelCell
    'https://images.unsplash.com/photo-1600269452121-11c610cc2915?w=500&fit=crop', // New Balance Minimus
    'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500&fit=crop'  // New Balance More
  ],
  'Converse': [
    'https://images.unsplash.com/photo-1608667508764-2b2c7c2e8b8c?w=500&fit=crop', // Converse Chuck Taylor
    'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=500&fit=crop', // Converse All Star
    'https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&fit=crop', // Converse 70s
    'https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=500&fit=crop', // Converse One Star
    'https://images.unsplash.com/photo-1542219550-e1d0d6d79db3?w=500&fit=crop', // Converse Run Star
    'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?w=500&fit=crop', // Converse Pro Leather
    'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=500&fit=crop', // Converse Jack Purcell
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&fit=crop', // Converse CONS
    'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=500&fit=crop', // Converse Platform
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&fit=crop'  // Converse High Top
  ],
  'Reebok': [
    'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=500&fit=crop', // Reebok Classic
    'https://images.unsplash.com/photo-1520256862855-398228c41684?w=500&fit=crop', // Reebok Pump
    'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&fit=crop', // Reebok Club C
    'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?w=500&fit=crop', // Reebok Nano
    'https://images.unsplash.com/photo-1605408499595-8959a02c77b5?w=500&fit=crop', // Reebok Floatride
    'https://images.unsplash.com/photo-1611312449408-fcfb9c8b9b8b?w=500&fit=crop', // Reebok Zig
    'https://images.unsplash.com/photo-1626947770145-9f9b8b8b8b8b?w=500&fit=crop', // Reebok Question
    'https://images.unsplash.com/photo-1584735175315-9d5df23860d5?w=500&fit=crop', // Reebok InstaPump
    'https://images.unsplash.com/photo-1556906781-9a4a4a4a4a4a?w=500&fit=crop', // Reebok Legacy
    'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&fit=crop'  // Reebok Royal
  ],
  'Vans': [
    'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&fit=crop', // Vans Old Skool
    'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?w=500&fit=crop', // Vans Authentic
    'https://images.unsplash.com/photo-1605408499595-8959a02c77b5?w=500&fit=crop', // Vans Era
    'https://images.unsplash.com/photo-1611312449408-fcfb9c8b9b8b?w=500&fit=crop', // Vans Slip-On
    'https://images.unsplash.com/photo-1626947770145-9f9b8b8b8b8b?w=500&fit=crop', // Vans Sk8-Hi
    'https://images.unsplash.com/photo-1584735175315-9d5df23860d5?w=500&fit=crop', // Vans ComfyCush
    'https://images.unsplash.com/photo-1556906781-9a4a4a4a4a4a?w=500&fit=crop', // Vans UltraRange
    'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&fit=crop', // Vans Classic
    'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=500&fit=crop', // Vans Pro
    'https://images.unsplash.com/photo-1520256862855-398228c41684?w=500&fit=crop'  // Vans BMX
  ],
  'Asics': [
    'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&fit=crop', // Asics Gel-Kayano
    'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=500&fit=crop', // Asics Gel-Nimbus
    'https://images.unsplash.com/photo-1520256862855-398228c41684?w=500&fit=crop', // Asics Gel-Lyte
    'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&fit=crop', // Asics GT-2000
    'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?w=500&fit=crop', // Asics Gel-Quantum
    'https://images.unsplash.com/photo-1605408499595-8959a02c77b5?w=500&fit=crop', // Asics MetaRun
    'https://images.unsplash.com/photo-1611312449408-fcfb9c8b9b8b?w=500&fit=crop', // Asics Gel-Cumulus
    'https://images.unsplash.com/photo-1626947770145-9f9b8b8b8b8b?w=500&fit=crop', // Asics Gel-Venture
    'https://images.unsplash.com/photo-1584735175315-9d5df23860d5?w=500&fit=crop', // Asics Gel-Excite
    'https://images.unsplash.com/photo-1556906781-9a4a4a4a4a4a?w=500&fit=crop'  // Asics Gel-Contend
  ],
  'Under Armour': [
    'https://images.unsplash.com/photo-1520256862855-398228c41684?w=500&fit=crop', // UA HOVR
    'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&fit=crop', // UA Charged
    'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?w=500&fit=crop', // UA Curry
    'https://images.unsplash.com/photo-1605408499595-8959a02c77b5?w=500&fit=crop', // UA SpeedForm
    'https://images.unsplash.com/photo-1611312449408-fcfb9c8b9b8b?w=500&fit=crop', // UA Micro G
    'https://images.unsplash.com/photo-1626947770145-9f9b8b8b8b8b?w=500&fit=crop', // UA Flow
    'https://images.unsplash.com/photo-1584735175315-9d5df23860d5?w=500&fit=crop', // UA TriBase
    'https://images.unsplash.com/photo-1556906781-9a4a4a4a4a4a?w=500&fit=crop', // UA Anatomix
    'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&fit=crop', // UA ClutchFit
    'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=500&fit=crop'  // UA Threadborne
  ],
  'Saucony': [
    'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=500&fit=crop', // Saucony Jazz
    'https://images.unsplash.com/photo-1520256862855-398228c41684?w=500&fit=crop', // Saucony Shadow
    'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&fit=crop', // Saucony Kinvara
    'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?w=500&fit=crop', // Saucony Triumph
    'https://images.unsplash.com/photo-1605408499595-8959a02c77b5?w=500&fit=crop', // Saucony Ride
    'https://images.unsplash.com/photo-1611312449408-fcfb9c8b9b8b?w=500&fit=crop', // Saucony Guide
    'https://images.unsplash.com/photo-1626947770145-9f9b8b8b8b8b?w=500&fit=crop', // Saucony Peregrine
    'https://images.unsplash.com/photo-1584735175315-9d5df23860d5?w=500&fit=crop', // Saucony Endorphin
    'https://images.unsplash.com/photo-1556906781-9a4a4a4a4a4a?w=500&fit=crop', // Saucony Freedom
    'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&fit=crop'  // Saucony Cohesion
  ]
};

// Category-specific image collections
const categoryImages = {
  'running': [
    'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&fit=crop',
    'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&fit=crop',
    'https://images.unsplash.com/photo-1595950653106-6c9c43c4e2c8?w=500&fit=crop',
    'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500&fit=crop'
  ],
  'basketball': [
    'https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=500&fit=crop',
    'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&fit=crop',
    'https://images.unsplash.com/photo-1580906853149-f82f7601d205?w=500&fit=crop',
    'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=500&fit=crop'
  ],
  'lifestyle': [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&fit=crop',
    'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&fit=crop',
    'https://images.unsplash.com/photo-1608667508764-2b2c7c2e8b8c?w=500&fit=crop',
    'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=500&fit=crop'
  ],
  'casual': [
    'https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&fit=crop',
    'https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=500&fit=crop',
    'https://images.unsplash.com/photo-1542219550-e1d0d6d79db3?w=500&fit=crop',
    'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?w=500&fit=crop'
  ],
  'training': [
    'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=500&fit=crop',
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&fit=crop',
    'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=500&fit=crop',
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&fit=crop'
  ],
  'walking': [
    'https://images.unsplash.com/photo-1588099768505-725d9da58295?w=500&fit=crop',
    'https://images.unsplash.com/photo-1594206976-b7b8b8b8b8b8?w=500&fit=crop',
    'https://images.unsplash.com/photo-1511556532299-d6a0e7b6b8b8?w=500&fit=crop',
    'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&fit=crop'
  ]
};

// Fallback sneaker images for other brands
const fallbackImages = [
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&fit=crop',
  'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&fit=crop',
  'https://images.unsplash.com/photo-1556906781-9a4a4a4a4a4a?w=500&fit=crop',
  'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&fit=crop',
  'https://images.unsplash.com/photo-1595950653106-6c9c43c4e2c8?w=500&fit=crop',
  'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=500&fit=crop',
  'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500&fit=crop',
  'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500&fit=crop',
  'https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=500&fit=crop',
  'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&fit=crop'
];

export const generateAllProducts = () => {
  const products = [];
  
  for (let i = 0; i < 250; i++) {
    const brand = brands[i % brands.length];
    const model1 = models[Math.floor(Math.random() * models.length)];
    const model2 = models[Math.floor(Math.random() * models.length)];
    
    // Price range: ₹5,000 to ₹25,000
    const basePrice = 5000 + (i * 80);
    const price = Math.min(25000, basePrice);
    const originalPrice = price + 1000 + Math.floor(Math.random() * 4000);
    
    // Stock varies
    const stock = 10 + Math.floor(Math.random() * 90);
    
    // Rating 3.5 to 5.0
    const rating = (3.5 + Math.random() * 1.5).toFixed(1);
    
    const category = categories[Math.floor((i / 50)) % categories.length];
    const gender = genders[i % genders.length];
    const isNew = i < 20; // First 20 are new
    
    // Smart image selection based on brand and category
    let productImage;
    
    // First try to get brand-specific image
    if (brandImages[brand]) {
      const brandImageIndex = i % brandImages[brand].length;
      productImage = brandImages[brand][brandImageIndex];
    } 
    // Then try category-specific image
    else if (categoryImages[category]) {
      const categoryImageIndex = i % categoryImages[category].length;
      productImage = categoryImages[category][categoryImageIndex];
    } 
    // Finally use fallback images
    else {
      const fallbackIndex = i % fallbackImages.length;
      productImage = fallbackImages[fallbackIndex];
    }
    
    products.push({
      id: i + 1,
      name: `${brand} ${model1} ${model2}`,
      brand,
      category,
      gender,
      price,
      originalPrice,
      image: productImage,
      rating: parseFloat(rating),
      stock,
      isNew,
      description: `Premium ${category} sneakers featuring ${model1} technology and ${model2} design. Perfect for ${gender === 'unisex' ? 'everyone' : gender}.`,
      features: [
        `${model1} Technology`,
        `${model2} Design`,
        `${category.charAt(0).toUpperCase() + category.slice(1)} Performance`,
        'Premium Materials',
        'Comfortable Fit'
      ]
    });
  }
  
  return products;
};
