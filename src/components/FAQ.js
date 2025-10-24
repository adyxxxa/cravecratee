import React, { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How fresh are the treats?",
      answer: "All our treats are baked fresh daily using premium ingredients. We ensure maximum freshness by baking in the morning and delivering the same day."
    },
    {
      question: "Do you deliver nationwide in the Philippines?",
      answer: "Yes! We deliver to all provinces across the Philippines. Same-day delivery is available in Metro Manila, while other areas take 2-3 business days."
    },
    {
      question: "Can I pay with cash on delivery?",
      answer: "Absolutely! We offer cash on delivery (COD) for your convenience. You can pay when your order arrives at your doorstep."
    },
    {
      question: "What are your delivery areas?",
      answer: "We deliver nationwide! Metro Manila gets same-day delivery, while provinces like Cebu, Davao, Iloilo, and others take 2-3 business days."
    },
    {
      question: "Can I gift a box?",
      answer: "Absolutely! Our beautifully packaged boxes are perfect for gifting. You can add a personal message and we'll include it with your gift."
    },
    {
      question: "Do you accept GCash or PayMaya?",
      answer: "Yes! We accept GCash, PayMaya, and other popular Philippine e-wallets for online payments, plus cash on delivery."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq" id="faq">
      <div className="faq-container">
        <h2 className="section-title">FAQs</h2>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button
                className="faq-question"
                onClick={() => toggleFAQ(index)}
              >
                <span className="faq-icon">{openIndex === index ? '▼' : '▶'}</span>
                {faq.question}
              </button>
              {openIndex === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
