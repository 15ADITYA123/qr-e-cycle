import { useState, useCallback } from 'react';
import { EWasteItem } from '@/types';
import { mockEWasteItems } from '@/data/mockData';

export function useInventory() {
  const [items, setItems] = useState<EWasteItem[]>(mockEWasteItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');

  const addItem = useCallback((newItem: Omit<EWasteItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    const item: EWasteItem = {
      ...newItem,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setItems(prev => [item, ...prev]);
    return item;
  }, []);

  const updateItem = useCallback((id: string, updates: Partial<EWasteItem>) => {
    setItems(prev => prev.map(item => 
      item.id === id 
        ? { ...item, ...updates, updatedAt: new Date().toISOString() }
        : item
    ));
  }, []);

  const deleteItem = useCallback((id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const filteredItems = items.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.serialNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    const matchesDepartment = selectedDepartment === 'all' || item.department === selectedDepartment;

    return matchesSearch && matchesCategory && matchesStatus && matchesDepartment;
  });

  const departments = [...new Set(items.map(item => item.department))];

  return {
    items: filteredItems,
    allItems: items,
    addItem,
    updateItem,
    deleteItem,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedStatus,
    setSelectedStatus,
    selectedDepartment,
    setSelectedDepartment,
    departments,
    totalItems: items.length,
    filteredCount: filteredItems.length
  };
}