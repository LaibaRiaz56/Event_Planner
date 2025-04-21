import React, { useState } from 'react';

export default function GuestForm({ onAddGuest }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate a slight delay for better user experience
    setTimeout(() => {
      onAddGuest(formData);
      setFormData({
        name: '',
        email: '',
        phone: '',
        notes: ''
      });
      setIsSubmitting(false);
    }, 300);
  };
  
  return (
    <div className="guest-form animate-scaleIn">
      <div className="form-header mb-6">
        <p className="text-gray-500 text-sm">Please fill in the details below to add a new guest to your event.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group relative">
          <label className="form-label" htmlFor="name">
            <span className="text-primary">✦</span> Name
          </label>
          <input
            id="name"
            name="name"
            placeholder="Enter guest name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'border-danger' : ''}
            disabled={isSubmitting}
          />
          {errors.name && <p className="text-sm text-danger mt-2">{errors.name}</p>}
        </div>
        
        <div className="form-group relative">
          <label className="form-label" htmlFor="email">
            <span className="text-primary">✦</span> Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="guest@example.com"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'border-danger' : ''}
            disabled={isSubmitting}
          />
          {errors.email && <p className="text-sm text-danger mt-2">{errors.email}</p>}
        </div>
        
        <div className="form-group relative">
          <label className="form-label" htmlFor="phone">Phone (optional)</label>
          <input
            id="phone"
            name="phone"
            placeholder="(123) 456-7890"
            value={formData.phone}
            onChange={handleChange}
            disabled={isSubmitting}
          />
          <span className="form-hint">We'll only use this for urgent event updates</span>
        </div>
        
        <div className="form-group relative">
          <label className="form-label" htmlFor="notes">Special Notes (optional)</label>
          <textarea
            id="notes"
            name="notes"
            placeholder="Dietary preferences, accessibility needs, or any special arrangements"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            disabled={isSubmitting}
          />
        </div>
        
        <div className="decorative-line"></div>
        
        <button 
          type="submit" 
          className="btn btn-primary w-full" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding Guest...' : 'Add Guest to Event'}
        </button>
      </form>
      
      {/* Decorative corners */}
      <div className="decorative-corner corner-top-left"></div>
      <div className="decorative-corner corner-top-right"></div>
      <div className="decorative-corner corner-bottom-left"></div>
      <div className="decorative-corner corner-bottom-right"></div>
    </div>
  );
}