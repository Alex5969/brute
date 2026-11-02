import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { BudgetRange, CraftCategory } from '../types/craft';
import { BruteWordmark } from './BruteLogo';

interface FooterProps {
  onSelectBudget: (budget: BudgetRange) => void;
  onSelectCategory: (category: CraftCategory | 'all') => void;
  onOpenManifesto: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectBudget,
  onSelectCategory,
  onOpenManifesto,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="border-t border-theme-main bg-theme-surface text-theme-main transition-colors duration-200">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 py-16 sm:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
        {/* Brand Mission Column (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="w-5 h-5 bg-[#8F4D32] rounded-[2px] shrink-0" aria-hidden="true" />
            <div className="flex flex-col">
              <BruteWordmark className="text-2xl font-sans font-extrabold tracking-tight uppercase text-theme-main leading-none" />
              <span className="type-caption text-[10px] text-theme-secondary font-medium tracking-[0.04em] mt-0.5">
                Atelier d'usage · &lt; 50 €
              </span>
            </div>
          </div>

          <p className="text-sm text-theme-secondary font-normal leading-relaxed max-w-sm font-sans">
            Place de marché dédiée aux objets artisanaux du quotidien façonnés à la main par des micro-créateurs français. Zéro intermédiaire, matières surcyclées et transparence radicale des coûts.
          </p>

          <div className="pt-2 text-xs text-theme-secondary space-y-1 font-sans">
            <p>Commission plateforme fixe : 8 %</p>
            <p>100 % des créations vérifiées en atelier</p>
          </div>
        </div>

        {/* Budgets Stricts Links (2 cols) */}
        <div className="lg:col-span-2 space-y-3 font-sans">
          <p className="type-caption text-xs font-semibold text-theme-main">
            Par Budget Strict
          </p>
          <ul className="space-y-2 text-xs text-theme-secondary font-normal">
            <li>
              <button
                onClick={() => onSelectBudget('under15')}
                className="hover:text-theme-main cursor-pointer"
              >
                Moins de 15 €
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectBudget('15to30')}
                className="hover:text-theme-main cursor-pointer"
              >
                15 à 30 €
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectBudget('30to50')}
                className="hover:text-theme-main cursor-pointer"
              >
                30 à 50 € (Pièces d'atelier)
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectBudget('all')}
                className="hover:text-theme-main cursor-pointer"
              >
                Tout le catalogue
              </button>
            </li>
          </ul>
        </div>

        {/* Matières & Métiers Links (3 cols) */}
        <div className="lg:col-span-3 space-y-3 font-sans">
          <p className="type-caption text-xs font-semibold text-theme-main">
            Savoir-Faire d'Atelier
          </p>
          <ul className="space-y-2 text-xs text-theme-secondary font-normal">
            <li>
              <button
                onClick={() => onSelectCategory('ceramics')}
                className="hover:text-theme-main cursor-pointer"
              >
                Céramique & Grès Chamotté
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectCategory('wood')}
                className="hover:text-theme-main cursor-pointer"
              >
                Bois Massif & Chutes de Chêne
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectCategory('leather')}
                className="hover:text-theme-main cursor-pointer"
              >
                Cuir Collet Tannage Végétal
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectCategory('textile')}
                className="hover:text-theme-main cursor-pointer"
              >
                Toile de Lin Lourd Upcyclée
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectCategory('stationery')}
                className="hover:text-theme-main cursor-pointer"
              >
                Papeterie en Papier Coton
              </button>
            </li>
          </ul>
        </div>

        {/* Newsletter & Artisans Candidature (3 cols) */}
        <div className="lg:col-span-3 space-y-4 font-sans">
          <div className="space-y-2">
            <p className="type-caption text-xs font-semibold text-theme-main">
              La Lettre d’Atelier
            </p>
            <p className="text-xs text-theme-secondary font-normal leading-relaxed">
              Une seule lettre par mois : découverte d’un artisan et de ses nouvelles pièces sous 50 €. Sans spam.
            </p>
          </div>

          {subscribed ? (
            <div className="p-3 bg-theme-muted border border-theme-subtle rounded-[2px] text-xs text-emerald-800 dark:text-emerald-400 flex items-center gap-2">
              <Check className="w-4 h-4 shrink-0 stroke-[1.5]" />
              <span>Vous recevrez notre prochaine lettre mensuelle.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex border border-theme-main bg-theme-surface rounded-[2px]">
                <input
                  type="email"
                  required
                  placeholder="Votre adresse email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-transparent text-theme-main placeholder:text-theme-secondary focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-3 bg-theme-btn text-theme-btn hover:opacity-90 transition-opacity cursor-pointer shrink-0"
                >
                  <ArrowRight className="w-3.5 h-3.5 stroke-[1.5]" />
                </button>
              </div>
            </form>
          )}

          <div className="pt-2 border-t border-theme-subtle">
            <button
              onClick={onOpenManifesto}
              className="text-xs text-[#8F4D32] hover:underline cursor-pointer block font-semibold"
            >
              Vous êtes artisan ? Rejoindre le collectif →
            </button>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-theme-subtle py-6 px-6 sm:px-12 text-xs text-theme-secondary flex flex-col sm:flex-row items-center justify-between gap-4 max-w-[1440px] mx-auto font-sans">
        <p>© 2026 <BruteWordmark className="font-semibold" /> — Plateforme de micro-artisanat certifié sous 50 €.</p>
        <div className="flex items-center gap-6">
          <button onClick={onOpenManifesto} className="hover:text-theme-main cursor-pointer">
            Charte de transparence
          </button>
          <span>·</span>
          <span>Mentions légales</span>
          <span>·</span>
          <span>Point Relais & Retours</span>
        </div>
      </div>
    </footer>
  );
};
