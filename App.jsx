import React, { useState, useEffect } from 'react';
import GuestForm from './GuestForm';
import GuestList from './GuestList';
import Summary from './Summary';
import Header from './Header';
import './index.css';

export default function App() {
  const [guests, setGuests] = useState(() => {
    const savedGuests = localStorage.getItem('eventGuests');
    return savedGuests ? JSON.parse(savedGuests) : [];
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'summary'
  
  useEffect(() => {
    localStorage.setItem('eventGuests', JSON.stringify(guests));
  }, [guests]);

  const addGuest = (guest) => {
    const newGuest = { 
      ...guest, 
      id: Date.now().toString(),
      confirmed: false, 
      rsvp: false, 
      isEditing: false,
      dateAdded: new Date().toISOString()
    };
    setGuests([...guests, newGuest]);
    setShowAddForm(false); // Close form after adding
  };

  const toggleConfirmation = (id) => {
    setGuests(prev => prev.map(guest => 
      guest.id === id ? { ...guest, confirmed: !guest.confirmed } : guest
    ));
  };

  const toggleRSVP = (id) => {
    setGuests(prev => prev.map(guest =>
      guest.id === id ? { ...guest, rsvp: !guest.rsvp } : guest
    ));
  };

  const removeGuest = (id) => {
    if (window.confirm('Are you sure you want to remove this guest?')) {
      setGuests(prev => prev.filter(guest => guest.id !== id));
    }
  };

  const toggleEditMode = (id) => {
    setGuests(prev => prev.map(guest =>
      guest.id === id ? { ...guest, isEditing: !guest.isEditing } : guest
    ));
  };

  const updateGuestInfo = (id, updatedGuestInfo) => {
    setGuests(prev => prev.map(guest =>
      guest.id === id ? { ...guest, ...updatedGuestInfo, isEditing: false } : guest
    ));
  };
  
  const clearAllGuests = () => {
    if (window.confirm('Are you sure you want to remove all guests? This action cannot be undone.')) {
      setGuests([]);
    }
  };
  
  // Filter and search logic
  const filteredGuests = guests.filter(guest => {
    const matchesSearch = guest.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         guest.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;
    
    switch(filter) {
      case 'confirmed':
        return guest.confirmed;
      case 'unconfirmed':
        return !guest.confirmed;
      case 'rsvp-yes':
        return guest.rsvp;
      case 'rsvp-no':
        return !guest.rsvp;
      default:
        return true;
    }
  });

  return (
    <div className="container">
      <div className="header">
        <h1 className="header-title">Event Planner</h1>
        <p className="header-subtitle">Elegantly manage your guest list with style</p>
      </div>
      
      <Header 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        filter={filter} 
        setFilter={setFilter}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
      
      <div className="view-toggle-container flex justify-center gap-4 mb-6">
        <button 
          className={`btn ${viewMode === 'list' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setViewMode('list')}
        >
          Guest List
        </button>
        <button 
          className={`btn ${viewMode === 'summary' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setViewMode('summary')}
        >
          Summary
        </button>
      </div>
      
      {viewMode === 'summary' && (
        <Summary 
          guests={guests} 
          onClearAllGuests={clearAllGuests} 
        />
      )}
      
      {viewMode === 'list' && (
        <>
          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-label">Total Guests</div>
              <div className="stat-value">{guests.length}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Confirmed</div>
              <div className="stat-value">{guests.filter(guest => guest.confirmed).length}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">RSVP: Yes</div>
              <div className="stat-value">{guests.filter(guest => guest.rsvp).length}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Pending</div>
              <div className="stat-value">{guests.length - guests.filter(guest => guest.confirmed).length}</div>
            </div>
          </div>
          
          <div className="card animate-fadeIn">
            {!showAddForm ? (
              <div className="text-center">
                <button 
                  className="btn btn-primary animate-pulse" 
                  onClick={() => setShowAddForm(true)}
                >
                  ✨ Add New Guest
                </button>
              </div>
            ) : (
              <div className="animate-scaleIn">
                <div className="flex justify-between items-center mb-4">
                  <h2>Add New Guest</h2>
                  <button 
                    className="btn btn-outline btn-sm" 
                    onClick={() => setShowAddForm(false)}
                  >
                    Cancel
                  </button>
                </div>
                <GuestForm onAddGuest={addGuest} />
              </div>
            )}
          </div>
          
          <div className="card animate-fadeIn">
            <GuestList
              guests={filteredGuests}
              onToggleConfirmation={toggleConfirmation}
              onToggleRSVP={toggleRSVP}
              onRemoveGuest={removeGuest}
              onToggleEdit={toggleEditMode}
              onUpdateGuest={updateGuestInfo}
            />
            
            {guests.length > 0 && (
              <div className="flex justify-center mt-6">
                <button 
                  className="btn btn-danger btn-sm" 
                  onClick={clearAllGuests}
                >
                  Clear All Guests
                </button>
              </div>
            )}
          </div>
        </>
      )}
      
      <footer className="text-center text-gray mt-4">
        <p>✦ Event Planner ✦</p>
        <p className="text-sm mt-2">Crafted with elegance for memorable events</p>
      </footer>
    </div>
  );
}