import { useState, useEffect, useMemo } from 'react';

export const useProductFilters = (products = []) => {
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [rating, setRating] = useState('All');
  const [location, setLocation] = useState('');
  const [dateRange, setDateRange] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  // Apply filters and sorting
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(product =>
        product.name?.toLowerCase().includes(searchLower) ||
        product.description?.toLowerCase().includes(searchLower) ||
        product.breed?.toLowerCase().includes(searchLower)
      );
    }

    // Category filter
    if (category !== 'All') {
      filtered = filtered.filter(product => product.category === category);
    }

    // Price range filter
    if (priceRange.min !== '' || priceRange.max !== '') {
      filtered = filtered.filter(product => {
        const price = parseFloat(product.price) || 0;
        const min = priceRange.min !== '' ? parseFloat(priceRange.min) : 0;
        const max = priceRange.max !== '' ? parseFloat(priceRange.max) : Infinity;
        return price >= min && price <= max;
      });
    }

    // Rating filter
    if (rating !== 'All') {
      const minRating = parseFloat(rating);
      filtered = filtered.filter(product => {
        const productRating = parseFloat(product.rating) || 0;
        return productRating >= minRating;
      });
    }

    // Location filter
    if (location.trim()) {
      filtered = filtered.filter(product =>
        product.location?.toLowerCase().includes(location.toLowerCase())
      );
    }

    // Date range filter
    if (dateRange !== 'All') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (dateRange) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0);
          break;
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case '3months':
          filterDate.setMonth(now.getMonth() - 3);
          break;
        default:
          filterDate.setFullYear(1900);
      }

      filtered = filtered.filter(product => {
        const productDate = new Date(product.createdAt || product.date);
        return productDate >= filterDate;
      });
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => (parseFloat(a.price) || 0) - (parseFloat(b.price) || 0));
        break;
      case 'price-high':
        filtered.sort((a, b) => (parseFloat(b.price) || 0) - (parseFloat(a.price) || 0));
        break;
      case 'rating':
        filtered.sort((a, b) => (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0));
        break;
      case 'name':
        filtered.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt || a.date) - new Date(b.createdAt || b.date));
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date));
        break;
    }

    return filtered;
  }, [products, searchTerm, category, priceRange, rating, location, dateRange, sortBy]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, category, priceRange, rating, location, dateRange, sortBy]);

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setCategory('All');
    setPriceRange({ min: '', max: '' });
    setRating('All');
    setLocation('');
    setDateRange('All');
    setSortBy('newest');
    setCurrentPage(1);
  };

  // Check if any filters are active
  const hasActiveFilters = searchTerm || category !== 'All' || priceRange.min || priceRange.max || 
                          rating !== 'All' || location || dateRange !== 'All';

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const start = Math.max(1, currentPage - 2);
      const end = Math.min(totalPages, start + maxVisiblePages - 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  return {
    // Filter states
    searchTerm,
    setSearchTerm,
    category,
    setCategory,
    priceRange,
    setPriceRange,
    rating,
    setRating,
    location,
    setLocation,
    dateRange,
    setDateRange,
    sortBy,
    setSortBy,
    
    // Pagination states
    currentPage,
    setCurrentPage,
    itemsPerPage,
    
    // Computed values
    filteredProducts,
    paginatedProducts,
    totalPages,
    startIndex,
    endIndex,
    hasActiveFilters,
    
    // Methods
    clearFilters,
    getPageNumbers,
  };
};