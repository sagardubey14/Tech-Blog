import React from 'react';

const categories = [
  'JavaScript',
  'Python',
  'Web Development',
  // Add more categories as needed
];

const Categories = () => {
  return (
    <section className="p-8 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category, index) => (
          <a key={index} href="#" className="bg-white p-4 rounded shadow text-center hover:bg-gray-200">{category}</a>
        ))}
      </div>
    </section>
  );
};

export default Categories;
