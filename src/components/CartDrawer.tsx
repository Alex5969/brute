import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Trash2, ArrowRight, ShieldCheck, Truck, Clock, Sparkles } from 'lucide-react';
import { CartItem, DeliveryMethod } from '../types/craft';
import { CraftIllustration } from './CraftIllustration';
import { BruteWordmark } from './BruteLogo';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
  onExplore: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onExplore,
}) => {
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('relay');

  if (!isOpen || typeof document === 'undefined') return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.priceEUR * item.quantity, 0);
  const totalLaborMinutes = items.reduce(
    (sum, item) => sum + item.product.costBreakdown.laborTimeMinutes * item.quantity,
    0
  );

  // Delivery cost rule: Free relay over 50 €, otherwise 3.50 € for relay, 5.90 € for colissimo
  const isFreeRelay = subtotal >= 50;
  const deliveryCost = deliveryMethod === 'relay' ? (isFreeRelay ? 0 : 3.5) : 5.9;
  const grandTotal = subtotal + (items.length > 0 ? deliveryCost : 0);

  const formatHours = (min: number) => {
    const h = Math.floor(min / 60);
    const m = min % 60;
    if (h === 0) return `${m} min`;
    return `${h} h ${m > 0 ? `${m} min` : ''}`;
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex justify-end" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />

      {/* Slide-out Drawer */}
      <div className="relative w-full max-w-md bg-theme-surface text-theme-main h-full border-l border-theme-main shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-5 sm:p-6 border-b border-theme-main flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="font-serif text-2xl uppercase tracking-tight text-theme-main font-normal">
              Votre Besace
            </span>
            <span className="text-xs text-theme-secondary font-mono">
              ({items.reduce((acc, it) => acc + it.quantity, 0)} objet{items.length > 1 ? 's' : ''})
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 border border-theme-main text-theme-main hover:bg-theme-main hover:text-white transition-colors cursor-pointer rounded-[2px]"
            aria-label="Fermer la besace"
          >
            <X className="w-4 h-4 stroke-[1.5]" />
          </button>
        </div>

        {/* Labor Support Pill */}
        {items.length > 0 && (
          <div className="px-5 py-2.5 bg-theme-muted border-b border-theme-subtle flex items-center justify-between text-xs font-sans">
            <span className="flex items-center gap-1.5 text-theme-secondary font-medium">
              <Clock className="w-3.5 h-3.5 text-[#8F4D32] stroke-[1.5]" />
              Temps d'artisanat soutenu :
            </span>
            <span className="font-mono font-semibold text-[#8F4D32] text-xs">
              {formatHours(totalLaborMinutes)} de confection
            </span>
          </div>
        )}

        {/* Drawer Content */}
        {items.length === 0 ? (
          <div className="flex-1 p-8 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-[2px] border border-theme-subtle flex items-center justify-center text-theme-secondary">
              <Sparkles className="w-6 h-6 stroke-[1.5]" />
            </div>
            <div className="space-y-1">
              <p className="font-serif text-2xl text-theme-main font-normal">Votre besace est vide</p>
              <p className="text-sm text-theme-secondary font-normal max-w-xs font-sans leading-relaxed">
                Chaque création sur <BruteWordmark className="font-sans font-bold" /> est confectionnée en France par un micro-artisan local à moins de 50 €.
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                onExplore();
              }}
              className="mt-2 px-6 py-2.5 bg-theme-btn text-theme-btn text-xs uppercase tracking-[0.04em] font-sans font-semibold cursor-pointer rounded-[2px]"
            >
              Découvrir les Objets
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto divide-y divide-theme-subtle p-5 sm:p-6 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="pt-4 first:pt-0 flex gap-4">
                {/* Thumbnail */}
                <div className="w-18 h-18 bg-theme-muted border border-theme-subtle rounded-[2px] shrink-0 flex items-center justify-center p-1">
                  <CraftIllustration type={item.product.illustrationType} />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between font-sans">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-sans text-sm font-semibold text-theme-main leading-tight">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-theme-secondary hover:text-red-700 transition-colors cursor-pointer p-0.5 rounded-[2px]"
                        title="Retirer"
                      >
                        <Trash2 className="w-3.5 h-3.5 stroke-[1.5]" />
                      </button>
                    </div>
                    <p className="text-[11px] text-theme-secondary mt-0.5 font-normal">
                      {item.product.artisan.workshop} · {item.product.artisan.location}
                    </p>
                    <span className="inline-block text-[10px] text-[#8F4D32] bg-[#8F4D32]/8 px-1.5 py-0.5 mt-1 rounded-[2px] font-medium font-sans">
                      {item.product.costBreakdown.laborTimeMinutes} min de travail
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-theme-subtle text-xs bg-theme-surface rounded-[2px]">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-0.5 hover:bg-theme-muted text-theme-main cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-2 py-0.5 font-mono text-[11px] tabular-nums font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-0.5 hover:bg-theme-muted text-theme-main cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <span className="type-price text-base text-theme-main font-bold">
                      {(item.product.priceEUR * item.quantity).toFixed(2)} €
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Drawer Footer & Delivery Estimator */}
        {items.length > 0 && (
          <div className="p-5 sm:p-6 border-t border-theme-main bg-theme-surface space-y-4 font-sans">
            {/* Delivery Option Toggle */}
            <div className="space-y-2 border border-theme-subtle p-3 bg-theme-muted rounded-[2px] text-xs">
              <span className="type-caption text-[10px] text-theme-secondary font-semibold block">
                Mode de livraison transparent :
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setDeliveryMethod('relay')}
                  className={`p-2 text-left border rounded-[2px] cursor-pointer ${
                    deliveryMethod === 'relay'
                      ? 'border-[#8F4D32] bg-theme-surface font-semibold text-theme-main'
                      : 'border-theme-subtle bg-transparent text-theme-secondary hover:border-theme-main'
                  }`}
                >
                  <span className="block text-[11px] font-semibold">Point Relais</span>
                  <span className="text-[10px] text-emerald-800 dark:text-emerald-400 font-mono">
                    {isFreeRelay ? 'Offert dès 50 €' : '3,50 €'}
                  </span>
                </button>

                <button
                  onClick={() => setDeliveryMethod('colissimo')}
                  className={`p-2 text-left border rounded-[2px] cursor-pointer ${
                    deliveryMethod === 'colissimo'
                      ? 'border-[#8F4D32] bg-theme-surface font-semibold text-theme-main'
                      : 'border-theme-subtle bg-transparent text-theme-secondary hover:border-theme-main'
                  }`}
                >
                  <span className="block text-[11px] font-semibold">À Domicile</span>
                  <span className="text-[10px] text-theme-secondary font-mono">5,90 €</span>
                </button>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-theme-secondary">
                <span>Sous-total objets</span>
                <span className="font-mono text-theme-main font-semibold">{subtotal.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between text-theme-secondary">
                <span>Frais de port ({deliveryMethod === 'relay' ? 'Point Relais' : 'Colissimo'})</span>
                <span className="font-mono text-theme-main font-semibold">
                  {deliveryCost === 0 ? 'Offert' : `${deliveryCost.toFixed(2)} €`}
                </span>
              </div>
              <div className="flex justify-between text-lg font-serif font-normal text-theme-main pt-2 border-t border-theme-subtle">
                <span>Total Net</span>
                <span className="type-price text-xl font-bold">{grandTotal.toFixed(2)} €</span>
              </div>
            </div>

            {/* Checkout Action */}
            <button
              onClick={onProceedToCheckout}
              className="w-full py-3.5 px-6 bg-theme-btn text-theme-btn text-xs uppercase tracking-[0.04em] font-sans font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer rounded-[2px] shadow-xs"
            >
              <span>Valider la commande</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[1.5]" />
            </button>

            <p className="text-[11px] text-center text-theme-secondary flex items-center justify-center gap-1 font-normal">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8F4D32] stroke-[1.5]" />
              Paiement direct sécurisé · Aucun frais caché
            </p>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};
