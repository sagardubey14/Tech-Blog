import React from 'react';

const categories = [
  'JavaScript',
  'Python',
  'Web Development',
  // Add more categories as needed
];

const Categories = () => {
  return (
    <section className="p-8 bg-softWhite">
      <h2 className="text-2xl font-bold mb-4 text-darkBlue">Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category, index) => (
          <a key={index} href="#" className="bg-white p-4 rounded shadow text-center text-darkBlue hover:bg-lightGrey">{category}</a>
        ))}
      </div>
    </section>
  );
};

export default Categories;
