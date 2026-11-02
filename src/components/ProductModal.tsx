import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Check, ShieldCheck, MapPin, Clock, Truck, ChevronDown, ChevronUp, Play, Sparkles } from 'lucide-react';
import { CraftProduct } from '../types/craft';
import { CraftIllustration } from './CraftIllustration';
import { BruteWordmark } from './BruteLogo';

interface ProductModalProps {
  product: CraftProduct | null;
  onClose: () => void;
  onAddToCart: (product: CraftProduct, quantity: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product || typeof document === 'undefined') return null;

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'visual' | 'gesture'>('visual');
  const [openAccordion, setOpenAccordion] = useState<'artisan' | 'materials' | 'delivery' | null>('artisan');

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 850);
  };

  const totalPrice = product.priceEUR * quantity;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/65 backdrop-blur-sm transition-opacity" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-theme-surface text-theme-main border border-theme-main rounded-[2px] shadow-2xl my-auto overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-theme-surface border border-theme-main text-theme-main hover:bg-theme-main hover:text-white transition-colors cursor-pointer rounded-[2px]"
          aria-label="Fermer la fiche"
        >
          <X className="w-4 h-4 stroke-[1.5]" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[90vh] overflow-y-auto">
          {/* Left Column: Visual Showcase & Workshop Proof Gesture (5 cols) */}
          <div className="md:col-span-5 bg-theme-muted p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-theme-main relative">
            <div>
              {/* Top View Toggle: Objet vs Geste d'Atelier */}
              <div className="flex items-center justify-between pb-3 border-b border-theme-subtle">
                <span className="type-caption text-[11px] text-theme-secondary font-medium">
                  {product.categoryLabel}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setActiveTab('visual')}
                    className={`text-[10px] uppercase tracking-[0.04em] px-2.5 py-0.5 border cursor-pointer rounded-[2px] font-sans font-semibold ${
                      activeTab === 'visual'
                        ? 'border-theme-main bg-theme-main text-white'
                        : 'border-theme-subtle bg-theme-surface text-theme-secondary hover:border-theme-main'
                    }`}
                  >
                    Objet
                  </button>
                  <button
                    onClick={() => setActiveTab('gesture')}
                    className={`text-[10px] uppercase tracking-[0.04em] px-2.5 py-0.5 border flex items-center gap-1 cursor-pointer rounded-[2px] font-sans font-semibold ${
                      activeTab === 'gesture'
                        ? 'border-[#8F4D32] bg-[#8F4D32] text-white'
                        : 'border-theme-subtle bg-theme-surface text-[#8F4D32] hover:border-[#8F4D32]'
                    }`}
                  >
                    <Play className="w-2.5 h-2.5 fill-current stroke-[1.5]" />
                    <span>Geste Atelier</span>
                  </button>
                </div>
              </div>

              {/* Media Display Area (Ratio 1:1) */}
              <div className="w-full aspect-square my-6 flex items-center justify-center relative overflow-hidden bg-theme-surface border border-theme-subtle rounded-[2px]">
                {activeTab === 'visual' ? (
                  <div className="w-full max-w-[240px] aspect-square p-2">
                    <CraftIllustration type={product.illustrationType} isDetailed={true} />
                  </div>
                ) : (
                  /* Preuve d'Atelier (Anti-dropshipping loop 3-5s) */
                  <div className="w-full h-full p-5 flex flex-col justify-between text-left bg-gradient-to-br from-[#1E1E1B] via-[#242420] to-[#1A1A18] text-[#F9F8F6]">
                    <div className="space-y-1">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[9px] uppercase tracking-[0.04em] font-semibold bg-[#8F4D32] text-white rounded-[2px]">
                        <ShieldCheck className="w-3 h-3 stroke-[1.5]" />
                        Geste d'Atelier Vérifié
                      </span>
                      <p className="text-xs font-serif italic text-[#DDD9D0]">
                        {product.workshopProof.videoPosterText}
                      </p>
                    </div>

                    <div className="my-auto py-4 text-center space-y-2">
                      <div className="w-14 h-14 mx-auto rounded-[2px] border border-[#5E5B55] flex items-center justify-center bg-[#1E1E1B] animate-pulse">
                        <Sparkles className="w-6 h-6 text-[#8F4D32] stroke-[1.5]" />
                      </div>
                      <p className="text-[12px] text-[#DDD9D0] px-4 font-normal leading-relaxed font-sans">
                        « {product.workshopProof.gestureDescription} »
                      </p>
                    </div>

                    <div className="text-[10px] text-[#A8A399] border-t border-[#3E3D38] pt-2 flex items-center justify-between font-mono">
                      <span>Atelier : {product.artisan.workshop}</span>
                      <span>{product.artisan.location}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Material Badge */}
              <div className="space-y-1.5 text-center">
                <span className="inline-block text-[11px] font-sans font-semibold text-[#8F4D32] bg-[#8F4D32]/8 px-3 py-1 border border-[#8F4D32]/30 rounded-[2px]">
                  ★ {product.materialBadge}
                </span>
                <p className="text-[12px] text-theme-secondary font-normal font-sans">
                  {product.dimensions} {product.weightGrams ? `· ${product.weightGrams}g` : ''}
                </p>
              </div>
            </div>

            {/* Artisan Verification Signature */}
            <div className="pt-4 border-t border-theme-subtle flex items-center gap-2.5 text-xs text-theme-secondary">
              <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0 stroke-[1.5]" />
              <span className="text-[11px] leading-tight font-sans">
                Certifié fait main par <strong>{product.artisan.name}</strong> à {product.artisan.location} ({product.artisan.department}).
              </span>
            </div>
          </div>

          {/* Right Column: Educational Breakdown & Acquisition (7 cols) */}
          <div className="md:col-span-7 p-6 sm:p-9 flex flex-col justify-between space-y-6">
            <div>
              {/* Product Title & Net Price */}
              <div className="border-b border-theme-subtle pb-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-serif text-2xl sm:text-3xl font-normal text-theme-main">
                      {product.name}
                    </h2>
                    <p className="text-sm text-theme-secondary mt-0.5 font-normal font-sans">
                      {product.subtitle}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="type-price text-3xl text-theme-main font-bold">
                      {product.priceEUR} €
                    </span>
                    <span className="block type-caption text-[10px] text-emerald-800 dark:text-emerald-400 font-semibold">
                      Plafonné &lt; 50 €
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-theme-secondary font-sans">
                  <span className="flex items-center gap-1 text-[12px]">
                    <MapPin className="w-3.5 h-3.5 text-[#8F4D32] stroke-[1.5]" />
                    {product.artisan.workshop} ({product.artisan.location})
                  </span>
                  <span className="opacity-30">·</span>
                  <span className="flex items-center gap-1 text-[12px] font-mono">
                    <Clock className="w-3.5 h-3.5 stroke-[1.5]" />
                    {product.costBreakdown.laborTimeMinutes} min de façon
                  </span>
                </div>
              </div>

              {/* Bloc officiel : Décomposition du prix (Inspiration Typology / Asphalte) */}
              <div className="my-5 p-4 border border-theme-main bg-theme-muted rounded-[2px] space-y-3">
                <div className="flex items-center justify-between border-b border-theme-subtle pb-2">
                  <span className="type-caption text-xs font-semibold text-theme-main flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-[#8F4D32] rounded-[1px]" />
                    Décomposition Transparente du Prix Net
                  </span>
                  <span className="text-[12px] font-mono font-bold text-theme-main">{product.priceEUR} € TTC</span>
                </div>

                <div className="space-y-2 text-xs font-sans">
                  <div className="flex items-center justify-between text-theme-secondary">
                    <span>1. Matières premières brutes traçables</span>
                    <span className="font-mono text-theme-main font-semibold">{product.costBreakdown.materialCostEUR.toFixed(2)} €</span>
                  </div>
                  <p className="text-[11px] text-theme-secondary pl-3 -mt-1 font-normal italic">
                    ↳ {product.costBreakdown.materialDescription}
                  </p>

                  <div className="flex items-center justify-between text-theme-secondary">
                    <span>2. Rémunération directe de l'artisan</span>
                    <span className="font-mono text-theme-main font-semibold">{product.costBreakdown.artisanWageEUR.toFixed(2)} €</span>
                  </div>
                  <p className="text-[11px] text-theme-secondary pl-3 -mt-1 font-normal italic">
                    ↳ {product.costBreakdown.laborTimeLabel}
                  </p>

                  <div className="flex items-center justify-between text-theme-secondary">
                    <span>
                      3. Commission plateforme <BruteWordmark /> (8 % fixe)
                    </span>
                    <span className="font-mono text-theme-main font-semibold">{product.costBreakdown.platformFeeEUR.toFixed(2)} €</span>
                  </div>
                  <p className="text-[11px] text-theme-secondary pl-3 -mt-1 font-normal italic">
                    ↳ Hébergement éthique, serveur & SAV humain
                  </p>
                </div>
              </div>

              {/* 3 Accordéons officiels du dossier : L'artisan, Matières & entretien, Délais & livraison */}
              <div className="divide-y divide-theme-subtle border-y border-theme-subtle my-5 text-xs font-sans">
                {/* Accordéon 1 : L'artisan */}
                <div>
                  <button
                    onClick={() => setOpenAccordion(openAccordion === 'artisan' ? null : 'artisan')}
                    className="w-full py-3 flex items-center justify-between font-semibold text-theme-main hover:text-[#8F4D32] transition-colors cursor-pointer text-left"
                  >
                    <span>L'artisan</span>
                    {openAccordion === 'artisan' ? <ChevronUp className="w-4 h-4 stroke-[1.5]" /> : <ChevronDown className="w-4 h-4 stroke-[1.5]" />}
                  </button>
                  {openAccordion === 'artisan' && (
                    <div className="pb-3 text-theme-secondary font-normal space-y-2 text-[13px] leading-relaxed">
                      <p>{product.artisan.bio}</p>
                      <p className="italic text-theme-secondary">« {product.detailsAccordion.artisanStory} »</p>
                    </div>
                  )}
                </div>

                {/* Accordéon 2 : Matières & entretien */}
                <div>
                  <button
                    onClick={() => setOpenAccordion(openAccordion === 'materials' ? null : 'materials')}
                    className="w-full py-3 flex items-center justify-between font-semibold text-theme-main hover:text-[#8F4D32] transition-colors cursor-pointer text-left"
                  >
                    <span>Matières & entretien</span>
                    {openAccordion === 'materials' ? <ChevronUp className="w-4 h-4 stroke-[1.5]" /> : <ChevronDown className="w-4 h-4 stroke-[1.5]" />}
                  </button>
                  {openAccordion === 'materials' && (
                    <div className="pb-3 text-theme-secondary font-normal space-y-2 text-[13px] leading-relaxed">
                      <div>
                        <strong className="text-theme-main">Origine des matières :</strong> {product.detailsAccordion.materialsSource}
                      </div>
                      <div>
                        <strong className="text-theme-main">Entretien :</strong> {product.detailsAccordion.careInstructions}
                      </div>
                    </div>
                  )}
                </div>

                {/* Accordéon 3 : Délais & livraison */}
                <div>
                  <button
                    onClick={() => setOpenAccordion(openAccordion === 'delivery' ? null : 'delivery')}
                    className="w-full py-3 flex items-center justify-between font-semibold text-theme-main hover:text-[#8F4D32] transition-colors cursor-pointer text-left"
                  >
                    <span>Délais & livraison</span>
                    {openAccordion === 'delivery' ? <ChevronUp className="w-4 h-4 stroke-[1.5]" /> : <ChevronDown className="w-4 h-4 stroke-[1.5]" />}
                  </button>
                  {openAccordion === 'delivery' && (
                    <div className="pb-3 text-theme-secondary font-normal text-[13px] leading-relaxed space-y-1">
                      <p>
                        {product.stockStatus === 'in_stock_48h'
                          ? 'En stock à l’atelier · Expédié sous 48 h ouvrées.'
                          : 'Pièce façonnée à la commande · Délai d’atelier : 4 jours ouvrés.'}
                      </p>
                      <p>Point Relais dès 3,50 € (offert dès 50 € d’achat) ou Colissimo à domicile (5,90 €).</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Delivery Estimation Box */}
              <div className="p-3 bg-theme-subtle border border-theme-subtle rounded-[2px] flex items-center justify-between text-xs text-theme-secondary font-sans">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-theme-main shrink-0 stroke-[1.5]" />
                  <div>
                    <span className="font-semibold text-theme-main block">Livraison Point Relais dès 3,50 €</span>
                    <span className="text-[11px] text-theme-secondary">Mondial Relay / Shop2Shop ou Colissimo domicile (5,90 €)</span>
                  </div>
                </div>
                <span className="text-[11px] font-mono font-semibold text-emerald-800 dark:text-emerald-400">
                  {product.stockStatus === 'in_stock_48h' ? 'Stock 48 h' : 'Confection 4 j'}
                </span>
              </div>
            </div>

            {/* Bottom Actions: Quantity Selector & Add Button */}
            <div className="pt-4 border-t border-theme-subtle flex items-center gap-3">
              {/* Quantity */}
              <div className="flex items-center border border-theme-main bg-theme-surface rounded-[2px]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-theme-main hover:bg-theme-muted cursor-pointer"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="px-3 py-2 text-xs font-mono tabular-nums font-semibold text-theme-main">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-theme-main hover:bg-theme-muted cursor-pointer"
                >
                  +
                </button>
              </div>

              {/* Main CTA */}
              <button
                onClick={handleAdd}
                className="flex-1 py-3 px-6 bg-theme-btn text-theme-btn text-xs uppercase tracking-[0.04em] font-sans font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer rounded-[2px]"
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400 stroke-[1.5]" />
                    <span>Ajouté à la besace !</span>
                  </>
                ) : (
                  <span>Mettre dans la Besace · {totalPrice.toFixed(2)} €</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
