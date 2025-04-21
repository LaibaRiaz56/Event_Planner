import React from 'react';

export default function Summary({ guests, onClearAllGuests }) {
  const total = guests.length;
  const confirmed = guests.filter(g => g.confirmed).length;
  const rsvpYes = guests.filter(g => g.rsvp).length;
  const unconfirmed = total - confirmed;
  const rsvpNo = total - rsvpYes;
  
  // Calculate percentages safely
  const confirmedPercent = total > 0 ? Math.round((confirmed / total) * 100) : 0;
  const rsvpPercent = total > 0 ? Math.round((rsvpYes / total) * 100) : 0;
  
  // Get recently added guests
  const recentGuests = [...guests]
    .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
    .slice(0, 5);
    
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };
  
  return (
    <div className="animate-fadeIn">
      <div className="card">
        <h2>Event Summary Dashboard</h2>
        
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-value">{total}</div>
            <div className="stat-label">Total Guests</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-value text-success">{confirmed}</div>
            <div className="stat-label">Confirmed</div>
            <div className="text-xs text-gray mt-1">{confirmedPercent}% of total</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-value text-danger">{unconfirmed}</div>
            <div className="stat-label">Unconfirmed</div>
            <div className="text-xs text-gray mt-1">{100 - confirmedPercent}% of total</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-value text-secondary">{rsvpYes}</div>
            <div className="stat-label">RSVP: Yes</div>
            <div className="text-xs text-gray mt-1">{rsvpPercent}% of total</div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="card">
          <h2>Attendance Analytics</h2>
          
          <div className="summary-box mt-4">
            <div className="summary-heading">
              <span className="summary-icon">📊</span>
              <span>Guest Statistics</span>
            </div>
            
            <div className="summary-item">
              <span>Confirmed Guests</span>
              <span className="font-semibold">{confirmed} / {total} ({confirmedPercent}%)</span>
            </div>
            
            <div className="summary-item">
              <span>RSVP Response</span>
              <span className="font-semibold">{rsvpYes} / {total} ({rsvpPercent}%)</span>
            </div>
            
            <div className="summary-item">
              <span>Pending Confirmations</span>
              <span className="font-semibold">{unconfirmed}</span>
            </div>
            
            <div className="summary-item">
              <span>RSVP Pending</span>
              <span className="font-semibold">{rsvpNo}</span>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="mb-2 flex justify-between">
              <span className="text-sm">Confirmation Progress</span>
              <span className="text-sm font-semibold">{confirmedPercent}%</span>
            </div>
            <div className="bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full" 
                style={{ width: `${confirmedPercent}%` }}
              ></div>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="mb-2 flex justify-between">
              <span className="text-sm">RSVP Response Rate</span>
              <span className="text-sm font-semibold">{rsvpPercent}%</span>
            </div>
            <div className="bg-gray-200 rounded-full h-2">
              <div 
                className="bg-secondary h-2 rounded-full" 
                style={{ width: `${rsvpPercent}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="card">
          <h2>Recently Added Guests</h2>
          
          {recentGuests.length > 0 ? (
            <ul className="mt-4 space-y-3">
              {recentGuests.map(guest => (
                <li key={guest.id} className="flex justify-between items-center p-3 bg-gray-100 rounded-md">
                  <div>
                    <div className="font-semibold">{guest.name}</div>
                    <div className="text-sm text-gray">{guest.email}</div>
                  </div>
                  <div className="text-xs text-gray">
                    {formatDate(guest.dateAdded)}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-state mt-4">
              <p>No guests added yet</p>
            </div>
          )}
        </div>
      </div>
      
      {total > 0 && (
        <div className="mt-6 text-center">
          <div className="decorative-line"></div>
          <button 
            onClick={onClearAllGuests}
            className="btn btn-danger mt-6"
          >
            ✕ Clear All Guests
          </button>
          <p className="text-sm text-gray mt-2">This action cannot be undone</p>
        </div>
      )}
    </div>
  );
}