import React from 'react';
import { createPortal } from 'react-dom';
import { X, ShieldCheck, HeartHandshake, Trees, Coins } from 'lucide-react';
import { BruteWordmark } from './BruteLogo';

interface ManifestoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ManifestoModal: React.FC<ManifestoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen || typeof document === 'undefined') return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-black/65 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-theme-surface text-theme-main border border-theme-main rounded-[2px] shadow-2xl p-6 sm:p-10 z-10 animate-in fade-in zoom-in-95 duration-200 overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 border border-theme-main text-theme-main hover:bg-theme-main hover:text-white transition-colors cursor-pointer rounded-[2px]"
          aria-label="Fermer le manifeste"
        >
          <X className="w-4 h-4 stroke-[1.5]" />
        </button>

        <div className="space-y-6 font-sans">
          {/* Header */}
          <div className="space-y-2 border-b border-theme-subtle pb-5">
            <span className="type-caption text-[#8F4D32] font-semibold block">
              Le Modèle <BruteWordmark className="font-sans font-bold" />
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-theme-main font-normal">
              Pourquoi l’artisanat d’usage doit rester sous 50 € ?
            </h2>
            <p className="text-sm text-theme-secondary font-normal leading-relaxed">
              Enquête menée auprès de 5 utilisateurs et 12 artisans : 64 % des Français jugent le fait-main inaccessible, tandis qu’Etsy est pollué par des revendeurs industriels opaques.
            </p>
          </div>

          {/* 4 Pillars */}
          <div className="space-y-3.5 text-xs">
            <div className="p-4 border border-theme-subtle bg-theme-muted rounded-[2px] space-y-1">
              <div className="flex items-center gap-2 font-semibold text-theme-main text-sm">
                <Coins className="w-4 h-4 text-[#8F4D32] stroke-[1.5]" />
                <h3>1. Le Plafond Strict de 50 €</h3>
              </div>
              <p className="text-theme-secondary font-normal leading-relaxed text-[13px]">
                Pas d’exceptions, pas de collections VIP. Nos artisans conçoivent des pièces utiles aux formes épurées, optimisées en temps de fabrication pour que s’équiper durablement ne soit plus un luxe.
              </p>
            </div>

            <div className="p-4 border border-theme-subtle bg-theme-muted rounded-[2px] space-y-1">
              <div className="flex items-center gap-2 font-semibold text-theme-main text-sm">
                <ShieldCheck className="w-4 h-4 text-[#8F4D32] stroke-[1.5]" />
                <h3>2. Zéro Dropshipping · Preuve du Geste</h3>
              </div>
              <p className="text-theme-secondary font-normal leading-relaxed text-[13px]">
                Chaque atelier est visité et référencé avec son adresse réelle (Drôme, Morvan, Jura, Thiers...). Une micro-vidéo de 3 à 5 secondes certifie que l’objet ne provient d’aucune usine d’importation.
              </p>
            </div>

            <div className="p-4 border border-theme-subtle bg-theme-muted rounded-[2px] space-y-1">
              <div className="flex items-center gap-2 font-semibold text-theme-main text-sm">
                <Trees className="w-4 h-4 text-[#8F4D32] stroke-[1.5]" />
                <h3>3. Surcyclage & Matières Déclassées</h3>
              </div>
              <p className="text-theme-secondary font-normal leading-relaxed text-[13px]">
                Chutes de scieries de chêne, ceps de vigne d’arrachage, toiles de stores industrielles, chutes de cuir de sellerie : la revalorisation abaisse le coût de matière de 30 à 40 % sans transiger sur la noblesse.
              </p>
            </div>

            <div className="p-4 border border-theme-subtle bg-theme-muted rounded-[2px] space-y-1">
              <div className="flex items-center gap-2 font-semibold text-theme-main text-sm">
                <HeartHandshake className="w-4 h-4 text-[#8F4D32] stroke-[1.5]" />
                <h3>4. 92 % Reversés à l’Artisan (8 % Commission Plateforme)</h3>
              </div>
              <p className="text-theme-secondary font-normal leading-relaxed text-[13px]">
                Contrairement aux plateformes cumulant frais d’insertion et commissions opaques, <BruteWordmark className="font-semibold" /> applique un taux fixe de 8 % pour héberger le service et accompagner les artisans.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-2 text-center">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-theme-btn text-theme-btn text-xs uppercase tracking-[0.04em] font-semibold cursor-pointer rounded-[2px]"
            >
              Compris, voir les créations
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
