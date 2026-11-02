import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Check, ShieldCheck, Clock, MapPin, AlertCircle } from 'lucide-react';
import { CartItem } from '../types/craft';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess,
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [shippingMode, setShippingMode] = useState<'relay' | 'home'>('relay');
  const [formError, setFormError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    firstName: 'Thomas',
    lastName: 'Guerin',
    email: 'thomas.guerin@mail.fr',
    relayPoint: 'Mondial Relay · Tabac Presse de l’Hôtel de Ville (69001 Lyon)',
    homeAddress: '12 rue des Capucins, 69001 Lyon',
  });

  if (!isOpen || typeof document === 'undefined') return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.priceEUR * item.quantity, 0);
  const shippingCost = shippingMode === 'relay' ? (subtotal >= 50 ? 0 : 3.5) : 5.9;
  const grandTotal = subtotal + shippingCost;
  const totalLaborMinutes = items.reduce(
    (sum, item) => sum + item.product.costBreakdown.laborTimeMinutes * item.quantity,
    0
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.firstName || !formData.lastName) {
      // Pas de rouge vif : message d'erreur en Charbon avec pictogramme et texte
      setFormError('Veuillez renseigner tous les champs obligatoires avant de valider votre commande.');
      return;
    }

    setFormError(null);
    setIsProcessing(true);
    setTimeout(() => {
      const generated = `BRUTE-FR-${Math.floor(10000 + Math.random() * 90000)}`;
      setOrderNumber(generated);
      setIsProcessing(false);
      setStep('success');
      onOrderSuccess();
    }, 1000);
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-black/65 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-theme-surface text-theme-main border border-theme-main rounded-[2px] shadow-2xl p-6 sm:p-10 z-10 animate-in fade-in zoom-in-95 duration-200 overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 border border-theme-main text-theme-main hover:bg-theme-main hover:text-white transition-colors cursor-pointer rounded-[2px]"
          aria-label="Fermer la commande"
        >
          <X className="w-4 h-4 stroke-[1.5]" />
        </button>

        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border-b border-theme-subtle pb-4">
              <span className="type-caption text-[#8F4D32] font-semibold block">
                Finalisation de commande
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-theme-main font-normal">
                Expédition Directe d'Atelier
              </h2>
              <p className="text-sm text-theme-secondary font-normal mt-1 font-sans">
                Vos objets seront emballés dans du carton recyclé et confiés au transporteur sous 48h.
              </p>
            </div>

            {/* Message d'erreur en Charbon (règle design system : pas de rouge vif) */}
            {formError && (
              <div className="p-3.5 bg-theme-muted border border-theme-main rounded-[2px] flex items-center gap-2.5 text-xs text-theme-main font-sans font-medium">
                <AlertCircle className="w-4 h-4 text-theme-main shrink-0 stroke-[1.5]" />
                <span>{formError}</span>
              </div>
            )}

            {/* Delivery Choice */}
            <div className="space-y-3 font-sans">
              <label className="type-caption text-xs font-semibold text-theme-main block">
                1. Choix du mode d'expédition
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={() => setShippingMode('relay')}
                  className={`p-3.5 border rounded-[2px] cursor-pointer space-y-1 ${
                    shippingMode === 'relay'
                      ? 'border-[#8F4D32] bg-theme-muted font-semibold'
                      : 'border-theme-subtle bg-theme-surface'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-theme-main">Point Relais Mondial Relay</span>
                    <span className="font-mono text-emerald-800 dark:text-emerald-400 font-bold">
                      {subtotal >= 50 ? 'Offert' : '3,50 €'}
                    </span>
                  </div>
                  <p className="text-[12px] text-theme-secondary font-normal">
                    Retrait souple 7j/7 dans votre commerce de quartier.
                  </p>
                </div>

                <div
                  onClick={() => setShippingMode('home')}
                  className={`p-3.5 border rounded-[2px] cursor-pointer space-y-1 ${
                    shippingMode === 'home'
                      ? 'border-[#8F4D32] bg-theme-muted font-semibold'
                      : 'border-theme-subtle bg-theme-surface'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-theme-main">Colissimo Domicile</span>
                    <span className="font-mono text-theme-main font-bold">5,90 €</span>
                  </div>
                  <p className="text-[12px] text-theme-secondary font-normal">
                    Remis en boîte aux lettres sous 48h ouvrées.
                  </p>
                </div>
              </div>

              {shippingMode === 'relay' ? (
                <div className="p-3.5 bg-theme-muted border border-theme-subtle rounded-[2px] text-xs space-y-1">
                  <span className="type-caption text-[10px] text-theme-secondary block">Point Relais sélectionné :</span>
                  <div className="flex items-center gap-1.5 font-semibold text-theme-main">
                    <MapPin className="w-3.5 h-3.5 text-[#8F4D32] shrink-0 stroke-[1.5]" />
                    <span>{formData.relayPoint}</span>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="type-caption text-[11px] text-theme-secondary block mb-1">
                    Adresse de livraison :
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.homeAddress}
                    onChange={(e) => setFormData({ ...formData, homeAddress: e.target.value })}
                    className="w-full text-xs p-2.5 bg-theme-surface border border-theme-subtle rounded-[2px] text-theme-main focus:border-theme-main focus:outline-none"
                  />
                </div>
              )}
            </div>

            {/* Contact details */}
            <div className="space-y-3 pt-2 border-t border-theme-subtle font-sans">
              <label className="type-caption text-xs font-semibold text-theme-main block">
                2. Destinataire
              </label>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Prénom"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="text-xs p-2.5 bg-theme-surface border border-theme-subtle rounded-[2px] text-theme-main focus:border-theme-main focus:outline-none"
                />
                <input
                  type="text"
                  required
                  placeholder="Nom"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="text-xs p-2.5 bg-theme-surface border border-theme-subtle rounded-[2px] text-theme-main focus:border-theme-main focus:outline-none"
                />
              </div>
              <input
                type="email"
                required
                placeholder="Adresse email pour le suivi"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full text-xs p-2.5 bg-theme-surface border border-theme-subtle rounded-[2px] text-theme-main focus:border-theme-main focus:outline-none"
              />
            </div>

            {/* Recap Box */}
            <div className="p-4 bg-theme-muted border border-theme-subtle rounded-[2px] text-xs space-y-2 font-sans">
              <div className="flex items-center justify-between text-theme-secondary">
                <span>{items.reduce((acc, it) => acc + it.quantity, 0)} objet(s) artisanal(aux)</span>
                <span className="font-mono font-semibold text-theme-main">{subtotal.toFixed(2)} €</span>
              </div>
              <div className="flex items-center justify-between text-theme-secondary">
                <span>Expédition ({shippingMode === 'relay' ? 'Point Relais' : 'Colissimo'})</span>
                <span className="font-mono font-semibold text-theme-main">
                  {shippingCost === 0 ? 'Offert' : `${shippingCost.toFixed(2)} €`}
                </span>
              </div>
              <div className="flex items-center justify-between text-lg font-serif font-normal text-theme-main pt-2 border-t border-theme-subtle">
                <span>Total Net</span>
                <span className="type-price text-xl font-bold">{grandTotal.toFixed(2)} €</span>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3.5 bg-theme-btn text-theme-btn text-xs uppercase tracking-[0.04em] font-sans font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer rounded-[2px] disabled:opacity-50"
            >
              {isProcessing ? (
                <span>Validation en cours...</span>
              ) : (
                <span>Régler {grandTotal.toFixed(2)} € et soutenir l’atelier</span>
              )}
            </button>
          </form>
        ) : (
          /* Confirmation Success State */
          <div className="py-8 text-center space-y-5 font-sans">
            <div className="w-14 h-14 mx-auto rounded-[2px] border border-emerald-600 bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center">
              <Check className="w-7 h-7 text-emerald-600 stroke-[1.5]" />
            </div>

            <div className="space-y-2">
              <span className="type-caption text-[11px] text-[#8F4D32] font-semibold block">
                Commande validée · {orderNumber}
              </span>
              <h3 className="font-serif text-3xl text-theme-main font-normal">
                Merci pour votre soutien aux artisans
              </h3>
              <p className="text-sm text-theme-secondary font-normal max-w-md mx-auto leading-relaxed">
                Un email récapitulatif a été envoyé à <strong>{formData.email}</strong>. 
                L'artisan a été directement notifié de votre commande pour la préparer dans son atelier.
              </p>
            </div>

            <div className="p-4 bg-theme-muted border border-theme-subtle rounded-[2px] max-w-sm mx-auto text-xs text-left space-y-1">
              <p className="font-semibold text-theme-main flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#8F4D32] stroke-[1.5]" />
                Impact de votre achat :
              </p>
              <p className="text-theme-secondary text-[12px] leading-relaxed">
                Vous venez de rémunérer directement {Math.floor(totalLaborMinutes / 60)} h {totalLaborMinutes % 60} min de travail artisanal qualifié et de financer l'économie circulaire locale.
              </p>
            </div>

            <button
              onClick={onClose}
              className="px-7 py-3 bg-theme-btn text-theme-btn text-xs uppercase tracking-[0.04em] font-sans font-semibold cursor-pointer rounded-[2px]"
            >
              Retour à l’Atelier
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};
