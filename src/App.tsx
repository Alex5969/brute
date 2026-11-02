import React, { useState, useEffect, useMemo } from 'react';
import { Check, ShieldCheck, Clock, Recycle, Filter } from 'lucide-react';
import { CraftProduct, CartItem, BudgetRange, CraftCategory, ThemeMode } from './types/craft';
import { CRAFT_PRODUCTS } from './data/craftData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { ManifestoModal } from './components/ManifestoModal';
import { CheckoutModal } from './components/CheckoutModal';
import { RecentlyViewedBar } from './components/RecentlyViewedBar';
import { AtelierSection } from './components/AtelierSection';
import { Footer } from './components/Footer';

interface ToastState {
  message: string;
  onUndo?: () => void;
}

export function App() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('brute_theme');
      return saved === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  const [selectedBudget, setSelectedBudget] = useState<BudgetRange>('all');
  const [selectedCategory, setSelectedCategory] = useState<CraftCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'time-asc'>('featured');

  // Modals
  const [activeProduct, setActiveProduct] = useState<CraftProduct | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isManifestoOpen, setIsManifestoOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Cart storage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('brute_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Nielsen #6: Recently viewed products
  const [recentlyViewed, setRecentlyViewed] = useState<CraftProduct[]>(() => {
    try {
      const saved = localStorage.getItem('brute_recent');
      if (saved) {
        const ids: string[] = JSON.parse(saved);
        return ids.map((id) => CRAFT_PRODUCTS.find((p) => p.id === id)).filter(Boolean) as CraftProduct[];
      }
      return [];
    } catch {
      return [];
    }
  });

  // Non-intrusive Toast feedback avec option "Annuler" (Nielsen #1 & #3)
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = (message: string, onUndo?: () => void) => {
    setToast({ message, onUndo });
    setTimeout(() => {
      setToast((cur) => (cur?.message === message ? null : cur));
    }, 4500);
  };

  useEffect(() => {
    try {
      localStorage.setItem('brute_theme', theme);
    } catch {
      // Ignore
    }
    if (theme === 'dark') {
      document.documentElement.classList.add('theme-dark');
      document.body.classList.add('theme-dark');
    } else {
      document.documentElement.classList.remove('theme-dark');
      document.body.classList.remove('theme-dark');
    }
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    showToast(
      theme === 'light'
        ? 'Mode Ardoise Sombre activé'
        : 'Mode Calcaire Clair activé'
    );
  };

  useEffect(() => {
    try {
      localStorage.setItem('brute_cart', JSON.stringify(cartItems));
    } catch {
      // Ignore
    }
  }, [cartItems]);

  // Handle viewing a product (adds to recently viewed list)
  const handleOpenProduct = (prod: CraftProduct) => {
    setActiveProduct(prod);
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((p) => p.id !== prod.id);
      const updated = [prod, ...filtered].slice(0, 6);
      try {
        localStorage.setItem('brute_recent', JSON.stringify(updated.map((p) => p.id)));
      } catch {
        // Ignore
      }
      return updated;
    });
  };

  // Cart operations
  const handleAddToCart = (product: CraftProduct, quantity = 1) => {
    const newItemId = `${product.id}-${Date.now()}`;
    setCartItems((prev) => {
      const existing = prev.find((it) => it.product.id === product.id);
      if (existing) {
        return prev.map((it) =>
          it.product.id === product.id ? { ...it, quantity: it.quantity + quantity } : it
        );
      }
      return [...prev, { id: newItemId, product, quantity }];
    });

    showToast(`« ${product.name} » ajouté à votre besace`, () => {
      setCartItems((cur) => {
        const item = cur.find((it) => it.product.id === product.id);
        if (!item) return cur;
        if (item.quantity > quantity) {
          return cur.map((it) => (it.product.id === product.id ? { ...it, quantity: it.quantity - quantity } : it));
        }
        return cur.filter((it) => it.product.id !== product.id);
      });
    });
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(id);
      return;
    }
    setCartItems((prev) => prev.map((it) => (it.id === id ? { ...it, quantity } : it)));
  };

  const handleRemoveFromCart = (id: string) => {
    const itemToRemove = cartItems.find((it) => it.id === id);
    setCartItems((prev) => prev.filter((it) => it.id !== id));
    if (itemToRemove) {
      showToast('Objet retiré de la besace', () => {
        setCartItems((cur) => [...cur, itemToRemove]);
      });
    }
  };

  const handleOrderSuccess = () => {
    setCartItems([]);
    setIsCartOpen(false);
  };

  // Catalog filtering by budget & craft category
  const filteredProducts = useMemo(() => {
    return CRAFT_PRODUCTS.filter((prod) => {
      const matchBudget = selectedBudget === 'all' || prod.budgetRange === selectedBudget;
      const matchCategory = selectedCategory === 'all' || prod.category === selectedCategory;
      return matchBudget && matchCategory;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceEUR - b.priceEUR;
      if (sortBy === 'price-desc') return b.priceEUR - a.priceEUR;
      if (sortBy === 'time-asc') return a.costBreakdown.laborTimeMinutes - b.costBreakdown.laborTimeMinutes;
      return 0; // featured default
    });
  }, [selectedBudget, selectedCategory, sortBy]);

  const featuredProduct = CRAFT_PRODUCTS[0]; // Gobelet en grès chamotté

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'theme-dark' : ''} bg-theme-main text-theme-main flex flex-col justify-between relative transition-colors duration-200 pb-16`}>
      {/* Toast Notification avec action Annuler (Nielsen #1 & #3) */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[10000] bg-theme-surface text-theme-main px-4 py-3 border border-theme-main shadow-2xl flex items-center gap-3 text-xs tracking-wider animate-in slide-in-from-bottom-2 duration-200 rounded-[2px]">
          <Check className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0 stroke-[1.5]" />
          <span className="font-sans font-medium text-theme-main">{toast.message}</span>
          {toast.onUndo && (
            <button
              onClick={() => {
                toast.onUndo?.();
                setToast(null);
              }}
              className="ml-2 px-2.5 py-1 border border-theme-main text-theme-main hover:bg-theme-main hover:text-white transition-colors text-[11px] uppercase tracking-[0.04em] font-sans font-semibold rounded-[2px] cursor-pointer"
            >
              Annuler
            </button>
          )}
        </div>
      )}

      {/* Navigation */}
      <Navbar
        cartCount={cartItems.reduce((acc, it) => acc + it.quantity, 0)}
        theme={theme}
        selectedBudget={selectedBudget}
        onSelectBudget={(b) => setSelectedBudget(b)}
        onToggleTheme={handleToggleTheme}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenManifesto={() => setIsManifestoOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExplore={() => {
            const target = document.getElementById('catalog-section');
            if (target) target.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenProduct={(prod) => handleOpenProduct(prod)}
          featuredProduct={featuredProduct}
          onOpenManifesto={() => setIsManifestoOpen(true)}
        />

        {/* Catalog Section */}
        <section id="catalog-section" className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
          {/* Section Header */}
          <div className="border-b border-theme-main pb-7 space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="type-caption text-[#8F4D32] font-semibold block mb-1">
                  Micro-Séries d'Atelier · Tous sous 50 €
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-normal text-theme-main">
                  Le Catalogue d'Usage
                </h2>
              </div>

              <div className="text-xs text-theme-secondary font-mono tracking-wider">
                <span>{filteredProducts.length} pièces disponibles</span>
              </div>
            </div>

            {/* Strict Budget Filter Controls (Spécification clé du dossier) */}
            <div className="space-y-3 font-sans">
              <div className="flex items-center gap-2 text-xs text-theme-secondary uppercase tracking-[0.04em]">
                <Filter className="w-3.5 h-3.5 text-[#8F4D32] stroke-[1.5]" />
                <span className="font-semibold text-theme-main">Filtrer par budget strict :</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {(
                  [
                    { id: 'all', label: 'Tous les prix (< 50 €)' },
                    { id: 'under15', label: 'Moins de 15 € (Petits riens utiles)' },
                    { id: '15to30', label: '15 à 30 € (Objets du quotidien)' },
                    { id: '30to50', label: '30 à 50 € (Pièces d’atelier)' },
                  ] as const
                ).map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBudget(b.id)}
                    className={`px-3.5 py-1.5 text-xs uppercase tracking-[0.04em] border transition-all cursor-pointer rounded-[2px] font-sans ${
                      selectedBudget === b.id
                        ? 'border-theme-main bg-theme-btn text-theme-btn font-semibold'
                        : 'border-theme-subtle bg-theme-surface text-theme-secondary hover:border-theme-main font-medium'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Category / Material Filter Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-1 font-sans">
              <div className="flex flex-wrap items-center gap-1.5">
                {(
                  [
                    { id: 'all', label: 'Toutes les matières' },
                    { id: 'ceramics', label: 'Céramique & Grès' },
                    { id: 'wood', label: 'Bois de Réemploi' },
                    { id: 'leather', label: 'Cuir Surcyclé' },
                    { id: 'textile', label: 'Textile Upcyclé' },
                    { id: 'stationery', label: 'Papeterie' },
                  ] as const
                ).map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1 text-[11px] uppercase tracking-[0.04em] border transition-colors cursor-pointer rounded-[2px] font-sans ${
                      selectedCategory === cat.id
                        ? 'border-[#8F4D32] text-[#8F4D32] bg-[#8F4D32]/8 font-semibold'
                        : 'border-theme-subtle text-theme-secondary hover:border-theme-main hover:text-theme-main font-medium'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Sorting Selector */}
              <div className="flex items-center gap-2">
                <span className="type-caption text-[11px] text-theme-secondary hidden sm:inline">Tri :</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="text-xs uppercase tracking-[0.04em] py-1.5 px-2.5 bg-theme-surface border border-theme-subtle text-theme-main focus:border-theme-main focus:outline-none cursor-pointer rounded-[2px] font-sans font-medium"
                >
                  <option value="featured">Sélection d'Atelier</option>
                  <option value="price-asc">Prix croissant</option>
                  <option value="price-desc">Prix décroissant</option>
                  <option value="time-asc">Temps de travail</option>
                </select>
              </div>
            </div>
          </div>

          {/* Architectural 1px Hairline Grid */}
          <div className="mt-8 border-t border-l border-theme-main">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpenQuickView={(p) => handleOpenProduct(p)}
                  onAddToCart={(p) => handleAddToCart(p, 1)}
                />
              ))}
            </div>
          </div>

          {/* État vide officiel avec suggestions (Heuristique #9) */}
          {filteredProducts.length === 0 && (
            <div className="py-16 px-6 text-center border-b border-l border-r border-theme-main space-y-4 bg-theme-surface rounded-[2px]">
              <div className="space-y-1">
                <h3 className="font-serif text-2xl text-theme-main font-normal">
                  Aucun objet trouvé pour ce terme.
                </h3>
                <p className="text-sm text-theme-secondary font-sans font-normal max-w-md mx-auto">
                  Découvrez les créations artisanales à moins de 25 € confectionnées en petites séries :
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                <button
                  onClick={() => {
                    setSelectedBudget('under15');
                    setSelectedCategory('all');
                  }}
                  className="px-3.5 py-1.5 border border-[#8F4D32] text-[#8F4D32] bg-[#8F4D32]/8 text-xs font-semibold rounded-[2px] hover:bg-[#8F4D32] hover:text-white transition-colors cursor-pointer"
                >
                  Créations &lt; 15 €
                </button>
                <button
                  onClick={() => {
                    setSelectedBudget('15to30');
                    setSelectedCategory('all');
                  }}
                  className="px-3.5 py-1.5 border border-theme-subtle hover:border-theme-main text-xs font-medium text-theme-main rounded-[2px] transition-colors cursor-pointer"
                >
                  Créations 15 à 30 €
                </button>
                <button
                  onClick={() => {
                    setSelectedBudget('all');
                    setSelectedCategory('ceramics');
                  }}
                  className="px-3.5 py-1.5 border border-theme-subtle hover:border-theme-main text-xs font-medium text-theme-main rounded-[2px] transition-colors cursor-pointer"
                >
                  Céramique & Grès
                </button>
                <button
                  onClick={() => {
                    setSelectedBudget('all');
                    setSelectedCategory('all');
                  }}
                  className="px-3.5 py-1.5 border border-theme-subtle hover:border-theme-main text-xs font-medium text-theme-secondary rounded-[2px] transition-colors cursor-pointer"
                >
                  Tout réinitialiser
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Editorial Trust Experience Strip */}
        <section className="border-t border-b border-theme-main bg-theme-muted transition-colors duration-200">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-6 p-6 sm:p-10 lg:p-16 border-b lg:border-b-0 lg:border-r border-theme-main flex flex-col justify-center space-y-4">
              <span className="type-caption text-[#8F4D32] font-semibold">
                Expédition Sans Plastique
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-theme-main leading-tight">
                L’Écrin de Carton Brut & Papier Kraft.
              </h3>
              <p className="text-sm text-theme-secondary font-normal leading-6 font-sans">
                Chaque commande est calée avec des copeaux de bois d’atelier ou du papier kraft recyclé, puis scellée avec une bande adhésive en papier gommé naturel sans solvant chimique.
              </p>
              <div className="pt-1 flex items-center gap-6 text-xs text-theme-secondary font-sans">
                <span className="flex items-center gap-1.5 font-medium text-theme-main">
                  <Recycle className="w-4 h-4 text-[#8F4D32] stroke-[1.5]" />
                  100% Recyclable & Zéro plastique
                </span>
                <span className="flex items-center gap-1.5 font-medium text-theme-main">
                  <ShieldCheck className="w-4 h-4 text-[#8F4D32] stroke-[1.5]" />
                  Expédition assurée
                </span>
              </div>
            </div>

            <div className="lg:col-span-6 p-6 sm:p-10 lg:p-16 flex flex-col justify-center bg-theme-surface space-y-4">
              <span className="type-caption text-[#8F4D32] font-semibold">
                La Carte de Façon Signée
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-theme-main leading-tight">
                Chaque Objet Raconte son Auteur.
              </h3>
              <p className="text-sm text-theme-secondary font-normal leading-6 font-sans">
                Dans votre colis, vous trouverez une petite carte compostable précisant le prénom de l'artisan, la date de façonnage, le village d’origine et le numéro de série de l'objet.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setIsManifestoOpen(true)}
                  className="px-6 py-3 border border-theme-main text-theme-main text-xs uppercase tracking-[0.04em] font-sans font-semibold hover:bg-theme-main hover:text-white transition-colors cursor-pointer rounded-[2px]"
                >
                  Lire Notre Manifeste Éthique
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* The Atelier Transparency Section */}
        <AtelierSection onOpenManifesto={() => setIsManifestoOpen(true)} />
      </main>

      {/* Footer */}
      <Footer
        onSelectBudget={(b) => {
          setSelectedBudget(b);
          const target = document.getElementById('catalog-section');
          if (target) target.scrollIntoView({ behavior: 'smooth' });
        }}
        onSelectCategory={(c) => {
          setSelectedCategory(c);
          const target = document.getElementById('catalog-section');
          if (target) target.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenManifesto={() => setIsManifestoOpen(true)}
      />

      {/* Nielsen #6 Heuristic: Recently Viewed Floating Strip */}
      <RecentlyViewedBar
        products={recentlyViewed}
        onOpenProduct={(p) => handleOpenProduct(p)}
        onClear={() => {
          setRecentlyViewed([]);
          try {
            localStorage.removeItem('brute_recent');
          } catch {
            // Ignore
          }
        }}
      />

      {/* Product Educational Transparency Modal */}
      <ProductModal
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
        onAddToCart={(p, qty) => handleAddToCart(p, qty)}
      />

      {/* Cart / Besace Drawer with Relay Shipping Options */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onExplore={() => {
          const target = document.getElementById('catalog-section');
          if (target) target.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Instant Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={CRAFT_PRODUCTS}
        onSelectProduct={(p) => handleOpenProduct(p)}
      />

      {/* Transparent Business Model Manifesto Modal */}
      <ManifestoModal
        isOpen={isManifestoOpen}
        onClose={() => setIsManifestoOpen(false)}
      />

      {/* Transparent Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderSuccess={handleOrderSuccess}
      />
    </div>
  );
}
export default App;
