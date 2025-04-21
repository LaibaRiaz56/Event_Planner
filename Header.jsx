import React, { useState } from 'react';

export default function Header({ searchTerm, setSearchTerm, filter, setFilter, viewMode, setViewMode }) {
  const [showFilters, setShowFilters] = useState(false);
  
  return (
    <div className="card animate-fadeIn mb-6">
      <div className="relative">
        <div className="decorative-corner corner-top-left"></div>
        <div className="decorative-corner corner-top-right"></div>
        <div className="decorative-corner corner-bottom-left"></div>
        <div className="decorative-corner corner-bottom-right"></div>
        
        <div className="search-container bg-transparent border-0 shadow-none p-0 mb-0">
          <div className="search-input-group">
            <input
              type="text"
              placeholder="Search guests by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-vintage-border"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <select 
              className="filter-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Guests</option>
              <option value="confirmed">Confirmed Only</option>
              <option value="unconfirmed">Unconfirmed Only</option>
              <option value="rsvp-yes">RSVP: Yes</option>
              <option value="rsvp-no">RSVP: No</option>
            </select>
            
            <button 
              className="btn btn-outline btn-sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? 'Hide Options' : 'More Options'}
            </button>
          </div>
        </div>
        
        {showFilters && (
          <div className="animate-scaleIn mt-4">
            <div className="decorative-line"></div>
            
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="form-group mb-0 w-full">
                <label className="form-label">View Options</label>
                <div className="flex gap-2">
                  <button 
                    className={`btn ${viewMode === 'list' ? 'btn-primary' : 'btn-outline'} flex-1`}
                    onClick={() => setViewMode('list')}
                  >
                    <span className="mr-2">📋</span> Guest List
                  </button>
                  <button 
                    className={`btn ${viewMode === 'summary' ? 'btn-primary' : 'btn-outline'} flex-1`}
                    onClick={() => setViewMode('summary')}
                  >
                    <span className="mr-2">📊</span> Summary
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}