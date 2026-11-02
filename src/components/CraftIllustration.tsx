import React from 'react';

interface CraftIllustrationProps {
  type: string;
  className?: string;
  isDetailed?: boolean;
}

export const CraftIllustration: React.FC<CraftIllustrationProps> = ({
  type,
  className = 'w-full h-full',
}) => {
  return (
    <div className={`relative flex items-center justify-center select-none overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 320 320"
        className="w-full h-full max-w-[280px] max-h-[280px] transition-transform duration-500 ease-out group-hover:scale-105"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle contact shadow */}
          <filter id="craftShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
          </filter>

          {/* Grès chamotté gradient */}
          <linearGradient id="gresGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D9C9B4" />
            <stop offset="50%" stopColor="#C4B097" />
            <stop offset="100%" stopColor="#9E876F" />
          </linearGradient>

          {/* Inner glaze */}
          <linearGradient id="glazeWhite" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FBF9F5" />
            <stop offset="100%" stopColor="#E5DFD5" />
          </linearGradient>

          {/* Chêne massif oak gradient */}
          <linearGradient id="oakWood" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C8A575" />
            <stop offset="35%" stopColor="#B38E5D" />
            <stop offset="70%" stopColor="#9C7849" />
            <stop offset="100%" stopColor="#7E5E34" />
          </linearGradient>

          {/* Noyer sombre walnut gradient */}
          <linearGradient id="walnutWood" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7A5638" />
            <stop offset="50%" stopColor="#5E3E26" />
            <stop offset="100%" stopColor="#432917" />
          </linearGradient>

          {/* Terracotta argile gradient */}
          <linearGradient id="terracottaClay" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A85D3E" />
            <stop offset="60%" stopColor="#8F4D32" />
            <stop offset="100%" stopColor="#683420" />
          </linearGradient>

          {/* Cuir collet leather gradient */}
          <linearGradient id="leatherTan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C78F5A" />
            <stop offset="60%" stopColor="#A86E3C" />
            <stop offset="100%" stopColor="#7D4C22" />
          </linearGradient>

          {/* Toile de lin linen gradient */}
          <linearGradient id="linenRaw" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D8D2C4" />
            <stop offset="50%" stopColor="#C7BFB0" />
            <stop offset="100%" stopColor="#ADA494" />
          </linearGradient>

          {/* Papier kraft / coton */}
          <linearGradient id="kraftPaper" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EDE6D8" />
            <stop offset="100%" stopColor="#D6CBB8" />
          </linearGradient>
        </defs>

        {/* Base ground shadow */}
        <ellipse cx="160" cy="275" rx="85" ry="12" fill="rgba(30,25,22,0.12)" filter="url(#craftShadow)" />

        {/* 1. Gobelet Expresso en Grès Chamotté */}
        {type === 'ceramic_espresso_cup' && (
          <g transform="translate(0, -10)">
            {/* Cup Body */}
            <path
              d="M 115 125 C 113 190, 122 250, 160 250 C 198 250, 207 190, 205 125 Z"
              fill="url(#gresGrad)"
              stroke="#7A6854"
              strokeWidth="2"
            />
            {/* Upper Rim Oval */}
            <ellipse cx="160" cy="125" rx="45" ry="14" fill="url(#glazeWhite)" stroke="#7A6854" strokeWidth="1.75" />
            {/* Inner Depth */}
            <ellipse cx="160" cy="127" rx="38" ry="10" fill="#ECE6DB" />
            {/* Hand-thrown rib rings */}
            <path d="M 116 160 Q 160 170 204 160" fill="none" stroke="#6E5D4B" strokeWidth="1" strokeDasharray="3 2" opacity="0.6" />
            <path d="M 120 195 Q 160 205 200 195" fill="none" stroke="#6E5D4B" strokeWidth="1" strokeDasharray="3 2" opacity="0.6" />
            <path d="M 128 225 Q 160 233 192 225" fill="none" stroke="#6E5D4B" strokeWidth="1" strokeDasharray="3 2" opacity="0.6" />
            {/* Natural stoneware texture speckles */}
            <circle cx="140" cy="175" r="1.5" fill="#4A3F33" opacity="0.7" />
            <circle cx="178" cy="165" r="2" fill="#4A3F33" opacity="0.6" />
            <circle cx="155" cy="215" r="1.5" fill="#4A3F33" opacity="0.8" />
            <circle cx="182" cy="205" r="1.2" fill="#4A3F33" opacity="0.7" />
          </g>
        )}

        {/* 2. Repose-Cuillère en Chêne Massif */}
        {type === 'wood_spoon_rest' && (
          <g transform="translate(0, 10)">
            {/* Outer Oak Contour */}
            <path
              d="M 110 130 C 95 180, 105 240, 160 240 C 215 240, 225 180, 210 130 C 190 90, 130 90, 110 130 Z"
              fill="url(#oakWood)"
              stroke="#5E4324"
              strokeWidth="2"
            />
            {/* Inner Carved Bowl Concave */}
            <path
              d="M 122 145 C 112 185, 120 225, 160 225 C 200 225, 208 185, 198 145 C 182 115, 138 115, 122 145 Z"
              fill="#9C7849"
              stroke="#4F361A"
              strokeWidth="1.5"
            />
            {/* Wood Grain Lines */}
            <path d="M 135 130 Q 155 170 148 215" fill="none" stroke="#6B4F2C" strokeWidth="1" opacity="0.7" />
            <path d="M 160 120 Q 168 165 165 220" fill="none" stroke="#5E4324" strokeWidth="1.2" opacity="0.8" />
            <path d="M 180 130 Q 175 175 180 215" fill="none" stroke="#6B4F2C" strokeWidth="1" opacity="0.7" />
            {/* Rest indent for spoon handle */}
            <path d="M 150 98 Q 160 106 170 98" fill="none" stroke="#4F361A" strokeWidth="2" />
          </g>
        )}

        {/* 3. Carnet Cousu en Papier Coton */}
        {type === 'paper_notebook_raw' && (
          <g transform="translate(0, -5)">
            {/* Kraft Cover base */}
            <polygon points="90,105 210,85 240,225 120,245" fill="url(#kraftPaper)" stroke="#5A4E3E" strokeWidth="2" />
            {/* Page block depth */}
            <polygon points="90,105 102,110 132,250 120,245" fill="#C5BBAA" stroke="#5A4E3E" strokeWidth="1.5" />
            <polygon points="210,85 215,90 102,110 90,105" fill="#E8E1D3" stroke="#5A4E3E" strokeWidth="1" />
            {/* Spine seam line */}
            <line x1="90" y1="105" x2="120" y2="245" stroke="#3D3327" strokeWidth="2.5" />
            {/* Hand-stitched thread knots (Japanese binding) */}
            {[0.15, 0.38, 0.62, 0.85].map((pct, idx) => {
              const x = 90 + (120 - 90) * pct;
              const y = 105 + (245 - 105) * pct;
              return (
                <g key={idx}>
                  <circle cx={x} cy={y} r="2.5" fill="#1C1814" />
                  <line x1={x - 4} y1={y - 2} x2={x + 12} y2={y - 4} stroke="#C25E3E" strokeWidth="1.8" />
                  <circle cx={x + 12} cy={y - 4} r="2" fill="#1C1814" />
                </g>
              );
            })}
            {/* Minimal cover blind deboss mark */}
            <rect x="150" y="145" width="40" height="25" rx="1" fill="none" stroke="#9A8E7D" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="160" y1="157" x2="180" y2="157" stroke="#9A8E7D" strokeWidth="1" />
          </g>
        )}

        {/* 4. Soliflore Pique-Fleurs en Terre Cuite */}
        {type === 'ceramic_soliflore' && (
          <g transform="translate(0, -10)">
            {/* Ovoid Terracotta Body */}
            <path
              d="M 160 90 C 215 90, 225 210, 195 245 C 180 258, 140 258, 125 245 C 95 210, 105 90, 160 90 Z"
              fill="url(#terracottaClay)"
              stroke="#6E2F18"
              strokeWidth="2"
            />
            {/* Top opening rim */}
            <ellipse cx="160" cy="92" rx="14" ry="5.5" fill="#5A2310" stroke="#6E2F18" strokeWidth="1.5" />
            <ellipse cx="160" cy="92" rx="7" ry="2.8" fill="#2E1107" />
            {/* Stem illustration entering soliflore */}
            <path d="M 160 92 Q 163 60 175 40" fill="none" stroke="#5E7153" strokeWidth="2" strokeLinecap="round" />
            <path d="M 175 40 Q 185 30 190 32 Q 182 42 175 40 Z" fill="#5E7153" />
            <path d="M 167 60 Q 155 52 153 56 Q 162 62 167 60 Z" fill="#718665" />
            {/* Hand-thrown organic contour ribs */}
            <path d="M 122 150 Q 160 162 198 150" fill="none" stroke="#8F3F23" strokeWidth="1" opacity="0.6" />
            <path d="M 115 195 Q 160 210 205 195" fill="none" stroke="#8F3F23" strokeWidth="1" opacity="0.6" />
          </g>
        )}

        {/* 5. Couteau d'Office en Cep de Vigne */}
        {type === 'wood_pocket_knife' && (
          <g transform="translate(0, 15) rotate(-22 160 160)">
            {/* Steel Blade */}
            <path
              d="M 160 148 L 260 148 C 265 148, 275 152, 275 156 C 260 168, 210 170, 160 168 Z"
              fill="#D4D9DE"
              stroke="#5A6570"
              strokeWidth="1.75"
            />
            {/* Cutting edge highlight */}
            <line x1="162" y1="167" x2="273" y2="157" stroke="#FFFFFF" strokeWidth="1" />
            {/* Vine wood handle */}
            <path
              d="M 60 152 C 85 142, 130 145, 160 148 L 160 168 C 130 172, 85 174, 60 165 C 50 160, 50 155, 60 152 Z"
              fill="url(#walnutWood)"
              stroke="#382012"
              strokeWidth="2"
            />
            {/* Knotted vine wood texture */}
            <path d="M 75 155 Q 95 160 120 153" fill="none" stroke="#2B170B" strokeWidth="1.2" />
            <path d="M 100 162 Q 130 165 150 158" fill="none" stroke="#2B170B" strokeWidth="1" />
            {/* Solid brass rivets */}
            <circle cx="85" cy="158" r="3" fill="#D9A84E" stroke="#8A641E" strokeWidth="1" />
            <circle cx="135" cy="160" r="3" fill="#D9A84E" stroke="#8A641E" strokeWidth="1" />
            {/* Maker stamp */}
            <line x1="175" y1="154" x2="185" y2="154" stroke="#808C99" strokeWidth="1.5" />
          </g>
        )}

        {/* 6. Planche de Service en Hêtre Déclassé */}
        {type === 'wood_cutting_board' && (
          <g transform="translate(0, -10)">
            {/* Main Board Rectangle */}
            <rect x="95" y="100" width="130" height="150" rx="6" fill="url(#oakWood)" stroke="#5C4222" strokeWidth="2" />
            {/* Top Handle Protrusion */}
            <path d="M 140 100 L 140 70 C 140 64, 180 64, 180 70 L 180 100 Z" fill="url(#oakWood)" stroke="#5C4222" strokeWidth="2" />
            {/* Hole for hanging cord */}
            <circle cx="160" cy="80" r="6" fill="#382613" stroke="#5C4222" strokeWidth="1.5" />
            {/* Leather hanging tie */}
            <path d="M 160 74 Q 163 50 155 35 Q 165 42 160 74" fill="none" stroke="#A86E3C" strokeWidth="2.5" />
            {/* Wood Grain Lines & Natural Knots */}
            <path d="M 115 110 Q 120 175 116 240" fill="none" stroke="#755227" strokeWidth="1.2" opacity="0.65" />
            <path d="M 145 110 Q 152 170 148 240" fill="none" stroke="#755227" strokeWidth="1.4" opacity="0.75" />
            <path d="M 185 110 Q 178 180 182 240" fill="none" stroke="#755227" strokeWidth="1.2" opacity="0.65" />
            {/* Healthy rustic wood knot */}
            <ellipse cx="170" cy="165" rx="5" ry="8" fill="#4A3319" />
            <ellipse cx="170" cy="165" rx="9" ry="14" fill="none" stroke="#755227" strokeWidth="1" />
          </g>
        )}

        {/* 7. Vide-Poche Roulé en Collet Végétal */}
        {type === 'leather_valet_tray' && (
          <g transform="translate(0, 10)">
            {/* Main Folded Leather Base */}
            <polygon points="80,180 160,130 240,180 160,230" fill="url(#leatherTan)" stroke="#5C3615" strokeWidth="2" />
            {/* Four pinched up edges */}
            <polygon points="80,180 70,165 145,120 160,130" fill="#B57B48" stroke="#5C3615" strokeWidth="1.5" />
            <polygon points="160,130 175,120 250,165 240,180" fill="#945F31" stroke="#5C3615" strokeWidth="1.5" />
            <polygon points="80,180 70,195 145,240 160,230" fill="#8F582B" stroke="#5C3615" strokeWidth="1.5" />
            <polygon points="160,230 175,240 250,195 240,180" fill="#75441D" stroke="#5C3615" strokeWidth="1.5" />
            {/* Brass corner studs */}
            <circle cx="82" cy="178" r="3.5" fill="#E6BA65" stroke="#7A5314" strokeWidth="1" />
            <circle cx="160" cy="132" r="3.5" fill="#E6BA65" stroke="#7A5314" strokeWidth="1" />
            <circle cx="238" cy="178" r="3.5" fill="#E6BA65" stroke="#7A5314" strokeWidth="1" />
            <circle cx="160" cy="228" r="3.5" fill="#E6BA65" stroke="#7A5314" strokeWidth="1" />
            {/* Fine hand-stitched perimeter */}
            <path d="M 98 178 L 160 142 L 222 178 L 160 215 Z" fill="none" stroke="#4A290E" strokeWidth="1" strokeDasharray="3 2" />
          </g>
        )}

        {/* 8. Savonnière Striée en Grès Blanc */}
        {type === 'ceramic_soap_dish' && (
          <g transform="translate(0, 15)">
            {/* Dish Slab Base */}
            <polygon points="75,170 160,130 245,170 160,210" fill="#E8E2D5" stroke="#696155" strokeWidth="2" />
            <polygon points="75,170 75,182 160,222 160,210" fill="#BDB5A4" stroke="#696155" strokeWidth="1.5" />
            <polygon points="160,210 160,222 245,182 245,170" fill="#8C8373" stroke="#696155" strokeWidth="1.5" />
            {/* Raised Drainage Grooves */}
            {[-35, -20, -5, 10, 25].map((offset, idx) => {
              const x1 = 115 + offset;
              const y1 = 150 + offset * 0.45;
              const x2 = 145 + offset;
              const y2 = 190 + offset * 0.45;
              return (
                <path
                  key={idx}
                  d={`M ${x1} ${y1} L ${x2} ${y2}`}
                  stroke="#574E43"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              );
            })}
          </g>
        )}

        {/* 9. Trousse en Toile de Lin Upcyclée */}
        {type === 'linen_utility_pouch' && (
          <g transform="translate(0, 5)">
            {/* Pouch Main Fabric Silhouette */}
            <path
              d="M 75 145 C 75 140, 80 135, 90 135 L 230 135 C 240 135, 245 140, 245 145 L 240 220 C 240 226, 232 230, 225 230 L 95 230 C 88 230, 80 226, 80 220 Z"
              fill="url(#linenRaw)"
              stroke="#595247"
              strokeWidth="2"
            />
            {/* Brass Zipper Track on Top */}
            <rect x="85" y="133" width="150" height="4.5" fill="#BFA369" stroke="#5E4F2B" strokeWidth="1" />
            <line x1="85" y1="135" x2="235" y2="135" stroke="#3D3216" strokeWidth="1" strokeDasharray="2 1.5" />
            {/* Zipper Pull Tab */}
            <rect x="210" y="130" width="8" height="15" rx="1.5" fill="#8C7440" stroke="#3D3216" strokeWidth="1" />
            <circle cx="214" cy="140" r="2" fill="#E8D19B" />
            {/* Double stitch bottom seam */}
            <line x1="85" y1="222" x2="235" y2="222" stroke="#6E6557" strokeWidth="1" strokeDasharray="3 2" />
            {/* Small woven craft label */}
            <rect x="80" y="180" width="10" height="16" fill="#C25E3E" stroke="#7A351E" strokeWidth="0.8" />
          </g>
        )}

        {/* 10. Bougeoir Toupie en Grès Noir */}
        {type === 'ceramic_candle_holder' && (
          <g transform="translate(0, 10)">
            {/* Wide Solid Base Disc */}
            <ellipse cx="160" cy="225" rx="70" ry="24" fill="#36322F" stroke="#1A1816" strokeWidth="2" />
            <path d="M 90 225 C 90 235, 230 235, 230 225 L 230 232 C 230 244, 90 244, 90 232 Z" fill="#24211F" stroke="#1A1816" strokeWidth="1.5" />
            {/* Tapered Central Cup */}
            <path
              d="M 140 220 L 144 140 C 144 135, 176 135, 176 140 L 180 220 Z"
              fill="#423E3A"
              stroke="#1A1816"
              strokeWidth="2"
            />
            {/* Candle Opening Rim */}
            <ellipse cx="160" cy="140" rx="16" ry="6" fill="#2B2826" stroke="#1A1816" strokeWidth="1.5" />
            <ellipse cx="160" cy="140" rx="9" ry="3.5" fill="#141312" />
            {/* Natural candle stub */}
            <rect x="153" y="90" width="14" height="50" rx="1" fill="#EDE7DD" stroke="#A89E90" strokeWidth="1" />
            <path d="M 160 90 Q 159 80 160 75" fill="none" stroke="#2B2826" strokeWidth="1.5" />
            {/* Delicate candle flame */}
            <path d="M 160 75 C 156 70, 155 60, 160 52 C 165 60, 164 70, 160 75 Z" fill="#E6A845" opacity="0.9" />
            <circle cx="160" cy="67" r="3" fill="#FFE294" />
          </g>
        )}

        {/* 11. Lot de 4 Sous-Bocks Liège & Chêne */}
        {type === 'cork_coasters_set' && (
          <g transform="translate(0, 0)">
            {/* Stacked 4 discs */}
            {[
              { y: 220, col: '#9E7E5A' },
              { y: 200, col: '#B39169' },
              { y: 180, col: '#C7A378' },
              { y: 160, col: '#D9B589' },
            ].map((disc, idx) => (
              <g key={idx}>
                <ellipse cx="160" cy={disc.y} rx="65" ry="20" fill={disc.col} stroke="#6B4F31" strokeWidth="1.5" />
                <path
                  d={`M 95 ${disc.y} C 95 ${disc.y + 10}, 225 ${disc.y + 10}, 225 ${disc.y} L 225 ${disc.y + 8} C 225 ${disc.y + 18}, 95 ${disc.y + 18}, 95 ${disc.y + 8} Z`}
                  fill="#785938"
                  stroke="#6B4F31"
                  strokeWidth="1.2"
                />
              </g>
            ))}
            {/* Top disc cork texture & brand imprint */}
            <circle cx="160" cy="160" r="28" fill="none" stroke="#876540" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="150" y1="160" x2="170" y2="160" stroke="#876540" strokeWidth="1.5" />
            <circle cx="130" cy="155" r="1.5" fill="#5E4326" />
            <circle cx="178" cy="165" r="2" fill="#5E4326" />
            <circle cx="145" cy="170" r="1.5" fill="#5E4326" />
          </g>
        )}

        {/* 12. Cuillère à Épices & Miel en Noyer */}
        {type === 'wood_honey_spoon' && (
          <g transform="translate(0, 5) rotate(15 160 160)">
            {/* Slender faceted handle */}
            <path
              d="M 154 50 L 166 50 L 164 195 L 156 195 Z"
              fill="url(#walnutWood)"
              stroke="#382213"
              strokeWidth="2"
            />
            {/* Carved oval scoop */}
            <ellipse cx="160" cy="225" rx="20" ry="32" fill="url(#walnutWood)" stroke="#382213" strokeWidth="2" />
            <ellipse cx="160" cy="225" rx="14" ry="24" fill="#422816" stroke="#2B180B" strokeWidth="1.2" />
            {/* Faceted cuts on handle */}
            <line x1="160" y1="52" x2="160" y2="190" stroke="#6E4426" strokeWidth="1.2" />
            <line x1="156" y1="80" x2="164" y2="80" stroke="#2B180B" strokeWidth="1" />
            <line x1="156" y1="120" x2="164" y2="120" stroke="#2B180B" strokeWidth="1" />
            <line x1="156" y1="160" x2="164" y2="160" stroke="#2B180B" strokeWidth="1" />
          </g>
        )}
      </svg>
    </div>
  );
};
