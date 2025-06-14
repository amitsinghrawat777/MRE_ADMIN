"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { iconNames, renderIcon, IconName } from '@/lib/icons';
import { Check, Search } from 'lucide-react';

interface IconPickerProps {
  value: IconName;
  onChange: (iconName: IconName) => void;
}

export default function IconPicker({ value, onChange }: IconPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredIcons = iconNames.filter(name =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          <div className="flex items-center gap-2">
            {renderIcon(value, { className: 'h-5 w-5' })}
            <span>{value}</span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-2">
        <div className="space-y-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search icons..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-5 gap-2 max-h-[200px] overflow-y-auto">
            {filteredIcons.map(iconName => (
              <Button
                key={iconName}
                variant="outline"
                size="icon"
                className="relative"
                onClick={() => {
                  onChange(iconName);
                  setIsOpen(false);
                  setSearchTerm('');
                }}
              >
                {renderIcon(iconName, { className: 'h-5 w-5' })}
                {value === iconName && (
                  <div className="absolute inset-0 bg-primary/20 flex items-center justify-center rounded-md">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                )}
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
} 