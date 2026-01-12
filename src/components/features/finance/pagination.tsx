import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PaginationProps } from '@/types/finance.types';

export function Pagination ({
  currentPage,
  totalPages,
  totalItems,
  resultsPerPage,
  onPageChange,
  onResultsPerPageChange
}:PaginationProps)  {
  const getPageNumbers = (): number[] => {
    const pages: number[] = [];
    const showPages = 5;
    
    if (totalPages <= showPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= showPages; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - showPages + 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }
    
    return pages;
  };

  const startItem = ((currentPage - 1) * resultsPerPage) + 1;
  const endItem = Math.min(currentPage * resultsPerPage, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
      <p className="text-sm text-[#64748B]">
        Showing {startItem} - {endItem} of {totalItems}
      </p>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            size="icon"
            className="w-9 h-9 text-[#5A42DE] hover:bg-[#F5F3FF] disabled:opacity-50 cursor-pointer"
          >
            <ChevronLeft size={18} />
          </Button>
          
          {getPageNumbers().map(page => (
            <Button
              key={page}
              onClick={() => onPageChange(page)}
              variant={currentPage === page ? "default" : "ghost"}
              size="icon"
              className={`w-9 h-9 cursor-pointer ${
                currentPage === page
                  ? 'bg-[#E8E5FA] text-[#5A42DE] border border-[#5A42DE]'
                  : 'text-[#64748B] hover:bg-[#E8E5FA]'
              }`}
            >
              {page}
            </Button>
          ))}
          
          <Button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            size="icon"
            className="w-9 h-9 text-[#5A42DE] hover:bg-[#F5F3FF] disabled:opacity-50 cursor-pointer"
          >
            <ChevronRight size={18} />
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#64748B] whitespace-nowrap">
            Results per page
          </span>
          <Select 
            value={resultsPerPage.toString()} 
            onValueChange={(val) => onResultsPerPageChange(Number(val))}
          >
            <SelectTrigger className="w-[70px] h-9 border-[#D1D5DB] text-[#5A42DE] hover:border-[#5A42DE] focus:border-[#5A42DE] focus:ring-[#E8E5FA]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border-[#D1D5DB] bg-white">
              <SelectItem 
                value="10" 
                className="text-[#64748B] focus:bg-[#E8E5FA] focus:text-[#5A42DE] cursor-pointer"
              >
                10
              </SelectItem>
              <SelectItem 
                value="20"
                className="text-[#64748B] focus:bg-[#E8E5FA] focus:text-[#5A42DE] cursor-pointer"
              >
                20
              </SelectItem>
              <SelectItem 
                value="50"
                className="text-[#64748B] focus:bg-[#E8E5FA] focus:text-[#5A42DE] cursor-pointer"
              >
                50
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};