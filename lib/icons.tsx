import {
  Home, Building, Bed, Bath, Car, Trees, Landmark, Sun, Waves,
  Mountain, Star, Check, Wifi, Tv, Refrigerator, Heater, Dumbbell,
  PawPrint, Warehouse, Zap, Wind, Key, Lock, Shield, Coffee,
  Wine, Utensils, Droplets, Leaf, Flower, Sprout, ShoppingCart,
  Bus, Train, Plane, Sailboat, Anchor, MapPin
} from 'lucide-react';
import React from 'react';

export const iconList = {
  Home, Building, Bed, Bath, Car, Trees, Landmark, Sun, Waves,
  Mountain, Star, Check, Wifi, Tv, Refrigerator, Heater, Dumbbell,
  PawPrint, Warehouse, Zap, Wind, Key, Lock, Shield, Coffee,
  Wine, Utensils, Droplets, Leaf, Flower, Sprout, ShoppingCart,
  Bus, Train, Plane, Sailboat, Anchor, MapPin
};

export type IconName = keyof typeof iconList;

export const iconNames = Object.keys(iconList) as IconName[];

export const renderIcon = (name: IconName, props?: React.ComponentProps<"svg">) => {
  const IconComponent = iconList[name];
  return IconComponent ? <IconComponent {...props} /> : null;
}; 