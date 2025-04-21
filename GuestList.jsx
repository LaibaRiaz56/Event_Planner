import React from 'react';

export default function GuestList({
  guests,
  onToggleConfirmation,
  onToggleRSVP,
  onRemoveGuest,
  onToggleEdit,
  onUpdateGuest
}) {
  if (guests.length === 0) {
    return (
      <div className="empty-state animate-fadeIn">
        <h2>No Guests Found</h2>
        <p>Add your first guest to get started or try adjusting your search filters.</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="guest-list-container">
      <div className="flex justify-between items-center mb-6">
        <h2>Guest List ({guests.length})</h2>
        <span className="text-sm text-gray">{guests.length} guest{guests.length !== 1 ? 's' : ''} matching your filters</span>
      </div>
      
      <ul className="guest-list space-y-4">
        {guests.map((guest) => (
          <li 
            key={guest.id} 
            className={`guest-item animate-fadeIn ${guest.confirmed ? 'guest-confirmed' : 'guest-pending'} ${guest.rsvp ? 'guest-rsvp-yes' : ''}`}
          >
            {guest.isEditing ? (
              <EditGuestForm
                guest={guest}
                onUpdateGuest={onUpdateGuest}
                onCancel={() => onToggleEdit(guest.id)}
              />
            ) : (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{guest.name}</h3>
                    <p className="text-sm text-gray">✉️ {guest.email}</p>
                    {guest.phone && <p className="text-sm text-gray">📞 {guest.phone}</p>}
                  </div>
                  <div className="space-x-2">
                    <span className={`badge ${guest.rsvp ? 'badge-success' : 'badge-danger'}`}>
                      {guest.rsvp ? '✓ RSVP: Yes' : '✗ RSVP: No'}
                    </span>
                    <span className={`badge ${guest.confirmed ? 'badge-primary' : 'badge-warning'}`}>
                      {guest.confirmed ? '✓ Confirmed' : '⌛ Pending'}
                    </span>
                  </div>
                </div>
                
                {guest.notes && (
                  <div className="mb-4 text-sm bg-gray-100 p-3 rounded-md border-l-2 border-primary-light">
                    <p className="font-semibold">Notes:</p>
                    <p>{guest.notes}</p>
                  </div>
                )}

                {guest.dateAdded && (
                  <p className="text-sm text-gray mb-4">
                    <span className="text-vintage-gold">✦</span> Added on {formatDate(guest.dateAdded)}
                  </p>
                )}
                
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => onToggleConfirmation(guest.id)}
                    className={`btn ${guest.confirmed ? 'btn-outline' : 'btn-primary'} btn-sm`}
                  >
                    {guest.confirmed ? '↩ Unconfirm' : '✓ Confirm'}
                  </button>
                  <button
                    onClick={() => onToggleRSVP(guest.id)}
                    className={`btn ${guest.rsvp ? 'btn-outline' : 'btn-secondary'} btn-sm`}
                  >
                    {guest.rsvp ? '↩ Mark RSVP No' : '✓ Mark RSVP Yes'}
                  </button>
                  <button
                    onClick={() => onToggleEdit(guest.id)}
                    className="btn btn-warning btn-sm"
                  >
                    ✎ Edit
                  </button>
                  <button
                    onClick={() => onRemoveGuest(guest.id)}
                    className="btn btn-danger btn-sm"
                  >
                    ✕ Remove
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function EditGuestForm({ guest, onUpdateGuest, onCancel }) {
  const [formData, setFormData] = React.useState({
    name: guest.name,
    email: guest.email,
    phone: guest.phone || '',
    notes: guest.notes || ''
  });
  
  const [errors, setErrors] = React.useState({});
  const [isSaving, setIsSaving] = React.useState(false);

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

  const handleSave = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSaving(true);
    
    // Simulate a slight delay for better user experience
    setTimeout(() => {
      onUpdateGuest(guest.id, formData);
      setIsSaving(false);
    }, 300);
  };

  return (
    <form onSubmit={handleSave} className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">✎ Edit Guest</h3>
        <span className="badge badge-primary">ID: {guest.id.slice(-4)}</span>
      </div>
      
      <div className="form-group">
        <label className="form-label" htmlFor="edit-name">
          <span className="text-primary">✦</span> Name
        </label>
        <input
          id="edit-name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'border-danger' : ''}
          disabled={isSaving}
        />
        {errors.name && <p className="text-sm text-danger mt-2">{errors.name}</p>}
      </div>
      
      <div className="form-group">
        <label className="form-label" htmlFor="edit-email">
          <span className="text-primary">✦</span> Email
        </label>
        <input
          id="edit-email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'border-danger' : ''}
          disabled={isSaving}
        />
        {errors.email && <p className="text-sm text-danger mt-2">{errors.email}</p>}
      </div>
      
      <div className="form-group">
        <label className="form-label" htmlFor="edit-phone">Phone (optional)</label>
        <input
          id="edit-phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          disabled={isSaving}
        />
      </div>
      
      <div className="form-group">
        <label className="form-label" htmlFor="edit-notes">Notes (optional)</label>
        <textarea
          id="edit-notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          disabled={isSaving}
        />
      </div>
      
      <div className="decorative-line"></div>
      
      <div className="flex gap-2">
        <button 
          type="submit" 
          className="btn btn-success"
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : '✓ Save Changes'}
        </button>
        <button 
          type="button" 
          onClick={onCancel} 
          className="btn btn-outline"
          disabled={isSaving}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}