export type CraftCategory = 'ceramics' | 'wood' | 'textile' | 'leather' | 'stationery';

export type BudgetRange = 'all' | 'under15' | '15to30' | '30to50';

export interface CostBreakdown {
  laborTimeMinutes: number;
  laborTimeLabel: string;
  materialCostEUR: number;
  materialDescription: string;
  artisanWageEUR: number;
  platformFeeEUR: number; // exactly 8%
  totalPriceEUR: number;
}

export interface ArtisanInfo {
  name: string;
  workshop: string;
  location: string;
  department: string;
  bio: string;
  yearEstablished: number;
  craftSpecialty: string;
}

export interface CraftProduct {
  id: string;
  name: string;
  subtitle: string;
  category: CraftCategory;
  categoryLabel: string;
  priceEUR: number;
  budgetRange: 'under15' | '15to30' | '30to50';
  materialBadge: string;
  materialDescription: string;
  dimensions: string;
  weightGrams?: number;
  artisan: ArtisanInfo;
  costBreakdown: CostBreakdown;
  workshopProof: {
    videoPosterText: string;
    gestureDescription: string;
    loopType: 'pottery_wheel' | 'wood_chisel' | 'loom_weaving' | 'leather_stitch' | 'paper_press';
  };
  detailsAccordion: {
    artisanStory: string;
    materialsSource: string;
    careInstructions: string;
  };
  stockStatus: 'in_stock_48h' | 'made_to_order_4d';
  illustrationType:
    | 'ceramic_espresso_cup'
    | 'wood_spoon_rest'
    | 'paper_notebook_raw'
    | 'ceramic_soliflore'
    | 'wood_pocket_knife'
    | 'wood_cutting_board'
    | 'leather_valet_tray'
    | 'ceramic_soap_dish'
    | 'linen_utility_pouch'
    | 'ceramic_candle_holder'
    | 'cork_coasters_set'
    | 'wood_honey_spoon';
}

export interface CartItem {
  id: string;
  product: CraftProduct;
  quantity: number;
  customNote?: string;
}

export type DeliveryMethod = 'relay' | 'colissimo';

export type ThemeMode = 'light' | 'dark';
