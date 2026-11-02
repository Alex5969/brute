import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { ShoppingBag, Search, Menu, X, Info, ShieldCheck } from 'lucide-react';
import { BudgetRange, ThemeMode } from '../types/craft';
import { BruteWordmark } from './BruteLogo';

interface NavbarProps {
  cartCount: number;
  theme: ThemeMode;
  selectedBudget: BudgetRange;
  onSelectBudget: (range: BudgetRange) => void;
  onToggleTheme: () => void;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenManifesto: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  theme,
  selectedBudget,
  onSelectBudget,
  onToggleTheme,
  onOpenCart,
  onOpenSearch,
  onOpenManifesto,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  const handleBudgetClick = (budget: BudgetRange) => {
    onSelectBudget(budget);
    setMobileMenuOpen(false);
    const target = document.getElementById('catalog-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-theme-main/90 backdrop-blur-md transition-colors duration-200 select-none border-b border-theme-main">
      {/* Top Ethical Transparency Banner */}
      {!bannerDismissed && (
        <aside
          aria-label="Engagements BRUT.E"
          className="border-b border-theme-subtle bg-theme-muted text-[11px] uppercase tracking-[0.04em] text-theme-main py-1.5 px-4 flex items-center justify-between font-sans font-medium"
        >
          <div className="mx-auto flex items-center gap-3 text-center flex-wrap justify-center">
            <span className="flex items-center gap-1.5 font-semibold text-theme-main">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8F4D32] stroke-[1.5]" />
              Zéro dropshipping
            </span>
            <span className="text-theme-muted opacity-40">·</span>
            <span className="text-theme-secondary">Tous les objets strictement sous 50 €</span>
            <span className="text-theme-muted opacity-40 hidden sm:inline">·</span>
            <span className="hidden sm:inline text-theme-secondary">Point Relais dès 3,50 €</span>
          </div>
          <button
            onClick={() => setBannerDismissed(true)}
            className="text-theme-secondary hover:text-theme-main p-0.5 cursor-pointer ml-2 rounded-[2px]"
            aria-label="Fermer l'annonce"
          >
            <X className="w-3.5 h-3.5 stroke-[1.5]" />
          </button>
        </aside>
      )}

      {/* Main Top Bar with Glassmorphism */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-17 flex items-center justify-between">
        {/* Zone 1: Brand & Logo avec Carré Terre Cuite */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 text-theme-main hover:bg-theme-surface transition-colors cursor-pointer rounded-[2px]"
            aria-label="Ouvrir le menu"
          >
            <Menu className="w-5 h-5 stroke-[1.5]" />
          </button>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex items-center cursor-pointer"
          >
            <span className="text-xl sm:text-2xl font-sans font-extrabold tracking-tight uppercase text-theme-main leading-none">
              <BruteWordmark />
            </span>
          </a>
        </div>

        {/* Zone 2: Navigation par segments de budget strict */}
        <nav className="hidden lg:flex items-center gap-6 text-[12px] uppercase tracking-[0.04em] text-theme-secondary font-sans font-medium">
          <button
            onClick={() => handleBudgetClick('all')}
            className={`py-1 transition-colors cursor-pointer relative ${
              selectedBudget === 'all'
                ? 'text-theme-main font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#8F4D32]'
                : 'hover:text-theme-main'
            }`}
          >
            Tout le catalogue
          </button>
          <button
            onClick={() => handleBudgetClick('under15')}
            className={`py-1 transition-colors cursor-pointer relative ${
              selectedBudget === 'under15'
                ? 'text-theme-main font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#8F4D32]'
                : 'hover:text-theme-main'
            }`}
          >
            Moins de 15 €
          </button>
          <button
            onClick={() => handleBudgetClick('15to30')}
            className={`py-1 transition-colors cursor-pointer relative ${
              selectedBudget === '15to30'
                ? 'text-theme-main font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#8F4D32]'
                : 'hover:text-theme-main'
            }`}
          >
            15 – 30 €
          </button>
          <button
            onClick={() => handleBudgetClick('30to50')}
            className={`py-1 transition-colors cursor-pointer relative ${
              selectedBudget === '30to50'
                ? 'text-theme-main font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#8F4D32]'
                : 'hover:text-theme-main'
            }`}
          >
            30 – 50 €
          </button>

          <button
            onClick={onOpenManifesto}
            className="flex items-center gap-1.5 text-[11px] text-[#8F4D32] font-semibold tracking-[0.04em] py-1 border-b border-[#8F4D32]/40 hover:border-[#8F4D32] transition-colors cursor-pointer"
          >
            <Info className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>Notre Modèle</span>
          </button>
        </nav>

        {/* Zone 3: Actions (Theme, Search, Cart) */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            className="group flex items-center gap-1.5 px-2.5 py-1 text-[11px] uppercase tracking-[0.04em] border border-theme-main hover:bg-theme-surface transition-all cursor-pointer rounded-[2px]"
            title={theme === 'light' ? 'Passer en mode Ardoise Sombre' : 'Passer en mode Calcaire Clair'}
          >
            <span
              className={`w-2 h-2 rounded-[1px] ${
                theme === 'light' ? 'bg-[#8F4D32]' : 'bg-[#F9F8F6]'
              }`}
            />
            <span className="hidden sm:inline text-[10px] font-sans font-medium tracking-[0.04em]">
              {theme === 'light' ? 'Ardoise' : 'Calcaire'}
            </span>
          </button>

          {/* Instant Search */}
          <button
            onClick={onOpenSearch}
            className="p-1.5 text-theme-main hover:text-[#8F4D32] transition-colors cursor-pointer rounded-[2px]"
            aria-label="Recherche"
          >
            <Search className="w-4 h-4 stroke-[1.5]" />
          </button>

          {/* Cart / Besace Drawer Button */}
          <button
            onClick={onOpenCart}
            className="relative px-3 py-1.5 border border-theme-main bg-theme-btn text-theme-btn text-[11px] uppercase tracking-[0.04em] font-sans font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer rounded-[2px] shadow-xs"
            aria-label="Panier d'atelier"
          >
            <ShoppingBag className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>Besace</span>
            <span className="tabular-nums font-bold">({cartCount})</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div className={`fixed inset-0 z-[9999] flex ${theme === 'dark' ? 'theme-dark' : ''}`} role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />

            <div className="relative w-full max-w-sm bg-theme-main text-theme-main h-full border-r border-theme-main p-6 flex flex-col justify-between shadow-2xl z-10 overflow-y-auto animate-in slide-in-from-left duration-200">
              <div>
                <div className="flex items-center justify-between pb-5 border-b border-theme-main">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 bg-[#8F4D32] rounded-[2px] shrink-0" />
                    <div>
                      <span className="font-sans font-extrabold text-2xl tracking-tight uppercase text-theme-main">
                        <BruteWordmark />
                      </span>
                      <p className="type-caption text-[10px] text-theme-secondary">
                        Objets d’usage sous 50 €
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 border border-theme-main cursor-pointer rounded-[2px]"
                  >
                    <X className="w-4 h-4 stroke-[1.5]" />
                  </button>
                </div>

                <div className="py-6 space-y-4 type-caption">
                  <p className="text-[10px] text-theme-secondary font-medium pb-1">Segments Budgets :</p>
                  <button
                    onClick={() => handleBudgetClick('all')}
                    className="block w-full text-left py-1.5 hover:pl-2 transition-all text-theme-main font-semibold"
                  >
                    → Tout le catalogue
                  </button>
                  <button
                    onClick={() => handleBudgetClick('under15')}
                    className="block w-full text-left py-1.5 hover:pl-2 transition-all text-theme-main font-semibold"
                  >
                    → Moins de 15 €
                  </button>
                  <button
                    onClick={() => handleBudgetClick('15to30')}
                    className="block w-full text-left py-1.5 hover:pl-2 transition-all text-theme-main font-semibold"
                  >
                    → 15 à 30 €
                  </button>
                  <button
                    onClick={() => handleBudgetClick('30to50')}
                    className="block w-full text-left py-1.5 hover:pl-2 transition-all text-theme-main font-semibold"
                  >
                    → 30 à 50 € (Pièces d’atelier)
                  </button>

                  <div className="pt-4 border-t border-theme-subtle">
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenManifesto();
                      }}
                      className="block w-full text-left py-2 text-[#8F4D32] font-semibold"
                    >
                      ★ Pourquoi moins de 50 € ? (Notre Modèle)
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-theme-main text-[11px] text-theme-secondary space-y-1 font-sans">
                <p>Circuit direct micro-ateliers français</p>
                <p>8% de commission fixe hébergement</p>
              </div>
            </div>
          </div>,
          document.body
        )}
    </header>
  );
};
