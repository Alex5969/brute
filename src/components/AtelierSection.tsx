import React from 'react';
import { ShieldCheck, Clock, Recycle } from 'lucide-react';
import { BruteWordmark } from './BruteLogo';

interface AtelierSectionProps {
  onOpenManifesto: () => void;
}

export const AtelierSection: React.FC<AtelierSectionProps> = ({ onOpenManifesto }) => {
  return (
    <section id="atelier-section" className="border-b border-theme-main bg-theme-main transition-colors duration-200">
      {/* Editorial Header */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 py-16 sm:py-20 border-b border-theme-main">
        <div className="max-w-2xl space-y-3">
          <span className="type-caption text-[#8F4D32] font-semibold block">
            02. Transparence Radicale
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-theme-main leading-tight">
            Pourquoi aucun objet ne dépasse 50 € ?
          </h2>
          <p className="text-base text-theme-secondary font-normal leading-6 pt-1 font-sans">
            L’artisanat d'art ne doit pas être réservé à une élite. En éliminant les intermédiaires et en réemployant les chutes de matières délaissées, nous prouvons que le beau, l'utile et l'éthique peuvent rester abordables.
          </p>
        </div>
      </div>

      {/* 3 Pillars Grid (Inspiration Nielsen & Typology) */}
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-theme-main">
        {/* Pillar 1 */}
        <div className="p-8 sm:p-12 flex flex-col justify-between space-y-6 bg-theme-surface hover:bg-theme-alt transition-colors">
          <div className="space-y-3">
            <span className="type-caption text-[11px] text-theme-secondary font-mono">01 · MATIÈRES SURCYCLÉES</span>
            <h3 className="font-serif text-2xl text-theme-main font-normal">
              Chutes Nobles & Réemploi
            </h3>
            <p className="text-sm text-theme-secondary font-normal leading-relaxed font-sans">
              Nous sourçons les rebus de scieries, ceps de vigne d’arrachage et chutes de maroquinerie de luxe. Ce surcyclage réduit le coût de matière de 30 à 40 % par rapport au neuf.
            </p>
          </div>
          <div className="pt-4 border-t border-theme-subtle type-caption text-[11px] text-[#8F4D32] font-semibold flex items-center gap-1.5">
            <Recycle className="w-4 h-4 stroke-[1.5]" />
            <span>Circuits Ultra-Courts</span>
          </div>
        </div>

        {/* Pillar 2 */}
        <div className="p-8 sm:p-12 flex flex-col justify-between space-y-6 bg-theme-surface hover:bg-theme-alt transition-colors">
          <div className="space-y-3">
            <span className="type-caption text-[11px] text-theme-secondary font-mono">02 · ANTI-DROPSHIPPING</span>
            <h3 className="font-serif text-2xl text-theme-main font-normal">
              Preuve Visuelle du Geste
            </h3>
            <p className="text-sm text-theme-secondary font-normal leading-relaxed font-sans">
              Sur Etsy, le faux fait-main prolifère. Sur <BruteWordmark className="font-semibold" />, chaque objet est lié à un atelier identifié avec localisation exacte et micro-vidéo du geste artisanal pour briser tout doute d’importation.
            </p>
          </div>
          <div className="pt-4 border-t border-theme-subtle type-caption text-[11px] text-[#8F4D32] font-semibold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 stroke-[1.5]" />
            <span>Ateliers Certifiés en France</span>
          </div>
        </div>

        {/* Pillar 3 */}
        <div className="p-8 sm:p-12 flex flex-col justify-between space-y-6 bg-theme-surface hover:bg-theme-alt transition-colors">
          <div className="space-y-3">
            <span className="type-caption text-[11px] text-theme-secondary font-mono">03 · TRANSPARENCE PRIX</span>
            <h3 className="font-serif text-2xl text-theme-main font-normal">
              Fiche Coût Pédagogique
            </h3>
            <p className="text-sm text-theme-secondary font-normal leading-relaxed font-sans">
              Vous savez exactement ce que vous payez : le temps d'atelier, le coût matière et la commission fixe de 8 % de la plateforme. 92 % du montant revient directement à l’artisan.
            </p>
          </div>
          <div className="pt-4 border-t border-theme-subtle type-caption text-[11px] text-[#8F4D32] font-semibold flex items-center gap-1.5">
            <Clock className="w-4 h-4 stroke-[1.5]" />
            <span>Rémunération Juste</span>
          </div>
        </div>
      </div>

      {/* Map of micro-workshops in France banner */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 py-10 border-t border-theme-main bg-theme-muted flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-sans">
        <div className="space-y-1">
          <span className="type-caption text-[10px] text-[#8F4D32] font-semibold block">
            Carte des Ateliers Partenaires
          </span>
          <p className="text-theme-main font-medium">
            Dieulefit (26) · Saint-Brisson (58) · Lyon (69) · Vallauris (06) · Thiers (63) · Saint-Claude (39) · Romans (26) · Roubaix (59)
          </p>
        </div>

        <button
          onClick={onOpenManifesto}
          className="px-5 py-2.5 border border-theme-main text-theme-main uppercase tracking-[0.04em] font-semibold text-xs hover:bg-theme-main hover:text-white transition-colors cursor-pointer shrink-0 rounded-[2px]"
        >
          Lire la charte complète
        </button>
      </div>
    </section>
  );
};
