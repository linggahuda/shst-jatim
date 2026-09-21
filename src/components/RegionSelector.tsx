import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown, Check, MapPin, Building, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface RegionSelectorProps {
  regions: string[];
  selectedRegion: string;
  onSelectRegion: (region: string) => void;
}

export default function RegionSelector({
  regions,
  selectedRegion,
  onSelectRegion,
}: RegionSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter regions based on search query
  const filteredRegions = regions.filter((region) =>
    region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group by "Kabupaten" vs "Kota"
  const kabupatens = filteredRegions.filter((r) => r.startsWith('Kabupaten'));
  const kotas = filteredRegions.filter((r) => r.startsWith('Kota'));

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (region: string) => {
    onSelectRegion(region);
    setSearchQuery('');
    setIsOpen(false);
  };

  // Find best matching region for autocomplete suggestion
  let bestMatch = '';
  let ghostSuffix = '';

  if (searchQuery.trim().length > 0) {
    const queryLower = searchQuery.toLowerCase();
    
    // 1. Try full prefix match
    const fullPrefixMatch = regions.find(r => r.toLowerCase().startsWith(queryLower));
    if (fullPrefixMatch) {
      bestMatch = fullPrefixMatch;
      ghostSuffix = fullPrefixMatch.slice(searchQuery.length);
    } else {
      // 2. Try stripped prefix match (excluding "Kabupaten " or "Kota ")
      const strippedPrefixMatch = regions.find(r => {
        const stripped = r.replace(/^(kabupaten|kota)\s+/i, '');
        return stripped.toLowerCase().startsWith(queryLower);
      });
      if (strippedPrefixMatch) {
        bestMatch = strippedPrefixMatch;
        const stripped = strippedPrefixMatch.replace(/^(kabupaten|kota)\s+/i, '');
        ghostSuffix = stripped.slice(searchQuery.length);
      } else {
        // 3. Try contains match
        const containsMatch = regions.find(r => r.toLowerCase().includes(queryLower));
        if (containsMatch) {
          bestMatch = containsMatch;
          const index = containsMatch.toLowerCase().indexOf(queryLower);
          ghostSuffix = containsMatch.slice(index + searchQuery.length);
        }
      }
    }
  }

  return (
    <div className="relative w-full max-w-xl mx-auto z-30" ref={containerRef} id="region-selector-container">
      <label className="block text-xs font-bold text-[#495057] mb-1.5 flex items-center gap-1.5 uppercase tracking-wider font-sans">
        <MapPin className="w-4 h-4 text-[#0d6efd]" />
        Pilih Kabupaten / Kota:
      </label>
      
      {/* Search Input Box emulating Bootstrap .form-control */}
      <div 
         className={`relative flex items-center bg-white border rounded transition-all duration-150 cursor-pointer ${
          isOpen 
            ? 'border-[#86b7fe] ring-4 ring-[#0d6efd]/25 shadow-sm' 
            : 'border-[#ced4da] hover:border-[#adb5bd]'
        }`}
        onClick={() => setIsOpen(true)}
      >
        <div className="pl-3 text-[#6c757d] shrink-0">
          <Search className="w-4 h-4" />
        </div>

        <div className="relative flex-1 flex items-center min-w-0">
          {/* Ghost Text Overlay */}
          {searchQuery.trim().length > 0 && ghostSuffix && (
            <div className="absolute left-0 right-10 py-2.5 pl-2 text-base font-medium font-sans pointer-events-none flex select-none items-center leading-normal">
              {/* Invisible matching portion to push the suggestion text */}
              <span className="text-transparent whitespace-pre">{searchQuery}</span>
              {/* Gray autocomplete shadow */}
              <span className="text-[#adb5bd] whitespace-pre">{ghostSuffix}</span>
            </div>
          )}

          <input
            type="text"
            className="w-full pl-2 pr-10 py-2.5 bg-transparent border-none text-[#212529] text-base font-medium placeholder-[#6c757d] focus:outline-none z-10 leading-normal"
            placeholder={selectedRegion || "Cari Kabupaten atau Kota..."}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if (bestMatch) {
                  handleSelect(bestMatch);
                }
              } else if (e.key === 'Tab' && bestMatch) {
                e.preventDefault();
                // Set the query to full bestMatch
                setSearchQuery(bestMatch);
              } else if (e.key === 'ArrowRight' && bestMatch) {
                const target = e.target as HTMLInputElement;
                if (target.selectionStart === searchQuery.length) {
                  setSearchQuery(bestMatch);
                }
              }
            }}
          />
        </div>

        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6c757d] pointer-events-none">
          <ChevronDown className={`w-4 h-4 transition-transform duration-150 ${isOpen ? 'rotate-180 text-[#0d6efd]' : ''}`} />
        </div>
      </div>
 
      {/* Dropdown List emulating Bootstrap .dropdown-menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.1 }}
            className="absolute left-0 right-0 mt-1 bg-white rounded border border-[#dee2e6] shadow-lg max-h-96 overflow-y-auto z-40 divide-y divide-[#dee2e6]"
          >
            {/* Quick stats / info header */}
            <div className="px-3 py-2 bg-[#f8f9fa] text-[11px] font-bold text-[#6c757d] tracking-wider flex justify-between items-center">
              <span>HASIL PENCARIAN</span>
              <span>{filteredRegions.length} DARI {regions.length} WILAYAH</span>
            </div>
 
            <div className="p-1 max-h-80 overflow-y-auto">
              {filteredRegions.length === 0 ? (
                <div className="py-6 text-center text-[#6c757d] text-base font-sans">
                  Wilayah "{searchQuery}" tidak ditemukan
                </div>
              ) : (
                <>
                  {/* Kabupaten Section */}
                  {kabupatens.length > 0 && (
                    <div className="mb-1">
                      <div className="px-3 py-1.5 text-[11px] font-bold text-[#6c757d] uppercase tracking-wider flex items-center gap-1.5 bg-[#f8f9fa] border-y border-[#dee2e6]/40">
                        <Building className="w-3.5 h-3.5 text-[#6c757d]" /> Kabupaten ({kabupatens.length})
                      </div>
                      <div className="mt-1 space-y-0.5">
                        {kabupatens.map((region) => {
                          const isSelected = region === selectedRegion;
                          return (
                            <button
                              key={region}
                              onClick={() => handleSelect(region)}
                              className={`w-full text-left px-3 py-2 rounded text-sm font-medium flex items-center justify-between transition-all ${
                                isSelected 
                                  ? 'bg-[#0d6efd] text-white' 
                                  : 'text-[#212529] hover:bg-[#e9ecef]'
                              }`}
                            >
                              <span>{region}</span>
                              {isSelected && <Check className="w-4 h-4 text-white" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
 
                  {/* Kota Section */}
                  {kotas.length > 0 && (
                    <div>
                      <div className="px-3 py-1.5 text-[11px] font-bold text-[#6c757d] uppercase tracking-wider flex items-center gap-1.5 bg-[#f8f9fa] border-y border-[#dee2e6]/40">
                        <Globe className="w-3.5 h-3.5 text-[#6c757d]" /> Kota ({kotas.length})
                      </div>
                      <div className="mt-1 space-y-0.5">
                        {kotas.map((region) => {
                          const isSelected = region === selectedRegion;
                          return (
                            <button
                              key={region}
                              onClick={() => handleSelect(region)}
                              className={`w-full text-left px-3 py-2 rounded text-sm font-medium flex items-center justify-between transition-all ${
                                isSelected 
                                  ? 'bg-[#0d6efd] text-white' 
                                  : 'text-[#212529] hover:bg-[#e9ecef]'
                              }`}
                            >
                              <span>{region}</span>
                              {isSelected && <Check className="w-4 h-4 text-white" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
