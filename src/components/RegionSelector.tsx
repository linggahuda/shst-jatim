import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown, Check, MapPin, Building, Globe, X } from 'lucide-react';
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
  const inputRef = useRef<HTMLInputElement>(null);

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
        setSearchQuery('');
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

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectRegion('');
    setSearchQuery('');
  };

  const displayValue = isOpen ? searchQuery : (selectedRegion || '');

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
            ? 'border-[#86b7fe] ring-4 ring-[#0d6efd]/25 shadow-xs' 
            : 'border-[#ced4da] hover:border-[#adb5bd]'
        }`}
        onClick={() => {
          setIsOpen(true);
          inputRef.current?.focus();
        }}
      >
        <div className="pl-3 text-[#6c757d] shrink-0">
          <Search className="w-4 h-4" />
        </div>

        <input
          ref={inputRef}
          type="text"
          className="w-full pl-2.5 pr-14 py-2.5 bg-transparent border-none text-[#212529] text-base font-medium placeholder-[#6c757d] focus:outline-none z-10 leading-normal"
          placeholder="Cari"
          value={displayValue}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => {
            setIsOpen(true);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              if (filteredRegions.length > 0) {
                handleSelect(filteredRegions[0]);
              }
            } else if (e.key === 'Escape') {
              setIsOpen(false);
              setSearchQuery('');
            }
          }}
        />

        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {selectedRegion && !isOpen && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors z-20 cursor-pointer"
              title="Hapus Pilihan"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <ChevronDown className={`w-4 h-4 text-[#6c757d] transition-transform duration-150 pointer-events-none ${isOpen ? 'rotate-180 text-[#0d6efd]' : ''}`} />
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
