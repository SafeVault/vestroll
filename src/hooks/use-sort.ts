import { useState, useMemo } from 'react';

export type SortDirection = 'asc' | 'desc';

export interface SortConfig<T> {
  key: keyof T;
  direction: SortDirection;
}

export interface UseSortParams<T> {
  data: T[];
  searchKeys?: (keyof T)[];
  initialFilters?: Record<string, string>;
  initialSort?: SortConfig<T>;
  itemsPerPage?: number;
}

export const useSort = <T extends Record<string, any>>({
  data,
  searchKeys = [],
  initialFilters = {},
  initialSort,
  itemsPerPage = 10,
}: UseSortParams<T>) => {
  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>(initialFilters);
  const [sortConfig, setSortConfig] = useState<SortConfig<T> | null>(initialSort || null);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter & Search Logic
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      // 1. Search
      const matchesSearch =
        searchQuery === '' ||
        searchKeys.some((key) => {
          const value = item[key];
          return String(value).toLowerCase().includes(searchQuery.toLowerCase());
        });

      if (!matchesSearch) return false;

      // 2. Filters
      const matchesFilters = Object.entries(filters).every(([key, filterValue]) => {
        if (!filterValue || filterValue === 'All') return true;
        const itemValue = item[key];
        return String(itemValue) === String(filterValue);
      });

      return matchesFilters;
    });
  }, [data, searchQuery, searchKeys, filters]);

  // Sorting Logic
  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Pagination Logic
  const totalItems = sortedData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, currentPage, itemsPerPage]);

  // Handlers
  const handleSort = (key: keyof T) => {
    let direction: SortDirection = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset page on search
  };

  const handleFilterChange = (key: string, value: string) => {
      const newFilters = { ...filters, [key]: value };
      setFilters(newFilters);
      setCurrentPage(1); // Reset page on filter
  };

  const handleSetFilters = (newFilters: Record<string, string>) => {
      setFilters(newFilters);
      setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
      if (page >= 1 && page <= totalPages) {
          setCurrentPage(page);
      }
  };

  return {
    // Data
    data: paginatedData,
    sortedData, // expose full sorted list if needed

    // Pagination
    currentPage,
    setCurrentPage: handlePageChange,
    totalPages,
    totalItems,
    itemsPerPage,

    // Search
    searchQuery,
    setSearchQuery: handleSearch,

    // Filters
    filters,
    setFilters: handleSetFilters,
    setFilter: handleFilterChange,

    // Sort
    sortConfig,
    handleSort,
  };
};
