import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PEACOCK = "#0F5E68";

export default function VirtualWardrobe() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Items', icon: '👔' },
    { id: 'jackets', name: 'Jackets', icon: '🧥' },
    { id: 'dresses', name: 'Dresses', icon: '👗' },
    { id: 'pants', name: 'Pants', icon: '👖' },
    { id: 'shoes', name: 'Shoes', icon: '👠' },
    { id: 'accessories', name: 'Accessories', icon: '👜' }
  ];

  const wardrobeItems = [
    { id: 1, name: 'Blue Blazer', category: 'jackets', image: 'https://via.placeholder.com/300x400', tags: ['formal', 'blue', 'cotton'] },
    { id: 2, name: 'Red Dress', category: 'dresses', image: 'https://via.placeholder.com/300x400', tags: ['casual', 'red', 'summer'] },
    { id: 3, name: 'Black Jeans', category: 'pants', image: 'https://via.placeholder.com/300x400', tags: ['casual', 'black', 'denim'] },
    { id: 4, name: 'White Sneakers', category: 'shoes', image: 'https://via.placeholder.com/300x400', tags: ['casual', 'white', 'sport'] },
    { id: 5, name: 'Brown Leather Bag', category: 'accessories', image: 'https://via.placeholder.com/300x400', tags: ['formal', 'brown', 'leather'] },
    { id: 6, name: 'Green Jacket', category: 'jackets', image: 'https://via.placeholder.com/300x400', tags: ['casual', 'green', 'windbreaker'] }
  ];

  const filteredItems = wardrobeItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4" style={{ color: PEACOCK }}>
            Virtual Smart Wardrobe
          </h1>
          <p className="text-xl text-gray-600">
            AI-powered organization and styling recommendations
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search your wardrobe..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === category.id
                      ? 'text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  style={selectedCategory === category.id ? { backgroundColor: PEACOCK } : {}}
                >
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Wardrobe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                <div className="flex flex-wrap gap-1">
                  {item.tags.map((tag) => (
                    <span
                      key={`${item.id}-${tag}`}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI Recommendations */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4" style={{ color: PEACOCK }}>
            🤖 AI Style Recommendations
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Perfect for Today's Weather", desc: "Light blue blazer + dark jeans", confidence: "95%" },
              { title: "Trending Combinations", desc: "Red dress + brown leather bag", confidence: "87%" },
              { title: "Occasion Match", desc: "Formal meeting outfit ready", confidence: "92%" }
            ].map((rec, index) => (
              <div key={rec.title} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold mb-2">{rec.title}</h3>
                <p className="text-gray-600 mb-2">{rec.desc}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Confidence: {rec.confidence}</span>
                  <button 
                    className="text-white px-3 py-1 rounded text-sm hover:opacity-90"
                    style={{ backgroundColor: PEACOCK }}
                  >
                    Try On
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}