export interface Category {
  id: number;
  name: string;
}

export interface SubCategory extends Category {
  subcategories: Category[];
}
