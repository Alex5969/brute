import React from 'react';
import { ArrowRight, ShieldCheck, Clock, MapPin, Sparkles } from 'lucide-react';
import { CraftIllustration } from './CraftIllustration';
import { CraftProduct } from '../types/craft';
import { BruteWordmark } from './BruteLogo';

interface HeroProps {
  onExplore: () => void;
  onOpenProduct: (product: CraftProduct) => void;
  featuredProduct: CraftProduct;
  onOpenManifesto: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExplore,
  onOpenProduct,
  featuredProduct,
  onOpenManifesto,
}) => {
  return (
    <section className="relative border-b border-theme-main bg-theme-main transition-colors duration-200">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[calc(84vh-72px)]">
        {/* Left Column: Typology-inspired Manifesto Statement */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-theme-main">
          <div className="space-y-6 max-w-xl">
            {/* Meta tag */}
            <div className="flex items-center gap-2.5 type-caption text-theme-secondary">
              <span className="w-2.5 h-2.5 bg-[#8F4D32] rounded-[2px]" aria-hidden="true" />
              <span className="font-semibold text-theme-main">Manifeste Artisanal</span>
              <span className="opacity-40">/</span>
              <span>Moins de 50 €</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="font-serif text-3xl sm:text-5xl xl:text-6xl text-theme-main tracking-tight font-normal leading-[1.12]">
                L’Artisanat Brut. <br />
                <span className="italic font-normal">Le Juste Prix.</span>
              </h1>
              <p className="text-base text-theme-secondary font-normal leading-6 pt-1 font-sans">
                Ni bazar jetable sans âme, ni luxe inaccessible déconnecté du réel.{' '}
                <strong className="font-semibold text-theme-main">
                  <BruteWordmark />
                </strong>{' '}
                réunit des objets du quotidien façonnés à la main par des micro-artisans français, tous strictement plafonnés à moins de 50 €.
              </p>
            </div>

            {/* Value Proposition Tags */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 border border-theme-subtle bg-theme-surface rounded-[2px] space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-theme-main text-[11px] uppercase tracking-[0.04em]">
                  <ShieldCheck className="w-4 h-4 text-[#8F4D32] stroke-[1.5]" />
                  <span>Anti-Dropshipping</span>
                </div>
                <p className="text-[12px] text-theme-secondary leading-snug">
                  Ateliers certifiés & preuves vidéo du geste.
                </p>
              </div>

              <div className="p-3.5 border border-theme-subtle bg-theme-surface rounded-[2px] space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-theme-main text-[11px] uppercase tracking-[0.04em]">
                  <Clock className="w-4 h-4 text-[#8F4D32] stroke-[1.5]" />
                  <span>Temps Transparent</span>
                </div>
                <p className="text-[12px] text-theme-secondary leading-snug">
                  Décomposition exacte du coût de fabrication.
                </p>
              </div>

              <div className="p-3.5 border border-theme-subtle bg-theme-surface rounded-[2px] space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-theme-main text-[11px] uppercase tracking-[0.04em]">
                  <Sparkles className="w-4 h-4 text-[#8F4D32] stroke-[1.5]" />
                  <span>Surcyclage</span>
                </div>
                <p className="text-[12px] text-theme-secondary leading-snug">
                  Chutes de chêne, argile locale & toiles de lin.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onExplore}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-theme-btn text-theme-btn text-xs uppercase tracking-[0.04em] font-semibold hover:opacity-90 transition-all cursor-pointer rounded-[2px] shadow-xs"
              >
                <span>Explorer le Catalogue (&lt; 50 €)</span>
                <ArrowRight className="w-4 h-4 stroke-[1.5]" />
              </button>

              <button
                onClick={onOpenManifesto}
                className="inline-flex items-center justify-center px-6 py-3.5 border border-theme-main text-theme-main text-xs uppercase tracking-[0.04em] font-semibold hover:bg-theme-surface transition-colors cursor-pointer rounded-[2px]"
              >
                Comprendre Notre Modèle
              </button>
            </div>
          </div>

          {/* Bottom Trust Indicators */}
          <div className="pt-6 mt-8 border-t border-theme-subtle flex flex-wrap items-center justify-between gap-4 text-xs text-theme-secondary font-sans">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-[1px] bg-emerald-600" />
              12 micro-ateliers certifiés en France
            </span>
            <span className="text-theme-secondary text-[12px]">Commission fixe : 8 % plateforme · 92 % à l'artisan</span>
          </div>
        </div>

        {/* Right Column: Featured Craft Piece with Live Cost Breakdown Preview */}
        <div className="lg:col-span-5 bg-theme-surface p-6 sm:p-10 flex flex-col justify-between relative group">
          {/* Top Piece Metadata */}
          <div className="flex items-center justify-between border-b border-theme-subtle pb-3">
            <span className="type-caption text-[11px] text-theme-secondary">
              Pièce d'Atelier No. 01
            </span>
            <span className="type-caption text-[11px] px-2.5 py-0.5 border border-[#8F4D32] text-[#8F4D32] bg-[#8F4D32]/5 rounded-[2px] font-semibold">
              Moins de 20 €
            </span>
          </div>

          {/* Center Visual */}
          <div
            onClick={() => onOpenProduct(featuredProduct)}
            className="my-auto py-6 cursor-pointer flex flex-col items-center justify-center"
            title="Cliquer pour voir la décomposition du prix"
          >
            <div className="w-full max-w-[240px] aspect-square transition-transform duration-300 ease-out group-hover:scale-105">
              <CraftIllustration type={featuredProduct.illustrationType} />
            </div>
            <p className="type-caption text-[11px] text-theme-secondary mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
              Fiche transparente & décomposition du coût →
            </p>
          </div>

          {/* Bottom Cost Breakdown Transparency Card */}
          <div className="pt-4 border-t border-theme-subtle space-y-3">
            <div className="flex items-baseline justify-between">
              <div>
                <h3 className="font-serif text-2xl text-theme-main font-normal">
                  {featuredProduct.name}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-theme-secondary mt-0.5 font-normal">
                  <MapPin className="w-3.5 h-3.5 text-[#8F4D32] stroke-[1.5]" />
                  <span>{featuredProduct.artisan.workshop} · {featuredProduct.artisan.location} ({featuredProduct.artisan.department})</span>
                </div>
              </div>
              <div className="text-right">
                <span className="type-price text-2xl text-theme-main font-bold">
                  {featuredProduct.priceEUR} €
                </span>
                <span className="block type-caption text-[10px] text-emerald-800 dark:text-emerald-400 font-semibold">
                  Prix Net Garanti
                </span>
              </div>
            </div>

            {/* Quick Mini Cost Breakdown */}
            <div className="p-3.5 bg-theme-muted border border-theme-subtle rounded-[2px] text-xs space-y-2">
              <p className="type-caption text-[11px] text-theme-main font-semibold flex items-center justify-between">
                <span>Décomposition du prix :</span>
                <span className="text-[#8F4D32]">{featuredProduct.costBreakdown.laborTimeLabel}</span>
              </p>
              <div className="grid grid-cols-3 gap-2 text-[11px] text-theme-secondary pt-0.5">
                <div>
                  <span className="block text-theme-secondary text-[10px] uppercase tracking-[0.04em]">Matière brute</span>
                  <span className="font-semibold text-theme-main font-mono">{featuredProduct.costBreakdown.materialCostEUR.toFixed(2)} €</span>
                </div>
                <div>
                  <span className="block text-theme-secondary text-[10px] uppercase tracking-[0.04em]">Part artisan</span>
                  <span className="font-semibold text-theme-main font-mono">{featuredProduct.costBreakdown.artisanWageEUR.toFixed(2)} €</span>
                </div>
                <div>
                  <span className="block text-theme-secondary text-[10px] uppercase tracking-[0.04em]">Plateforme (8%)</span>
                  <span className="font-semibold text-theme-main font-mono">{featuredProduct.costBreakdown.platformFeeEUR.toFixed(2)} €</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
