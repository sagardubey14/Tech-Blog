import React from 'react';

const testimonials = [
  { name: 'User1', comment: 'This platform helped me solve my coding problems quickly!' },
  { name: 'User2', comment: 'Great resource for finding coding solutions.' },
  // Add more testimonials as needed
];

const Testimonials = () => {
  return (
    <section className="p-8">
      <h2 className="text-2xl font-bold mb-4">Testimonials</h2>
      <div className="space-y-4">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white p-4 rounded shadow">
            <p className="italic">"{testimonial.comment}"</p>
            <p className="text-sm text-gray-500">- {testimonial.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
