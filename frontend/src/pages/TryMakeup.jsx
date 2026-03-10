import { useMemo, useRef, useState } from 'react';
import Webcam from 'react-webcam';

const lipstickShades = ['Ruby Bloom', 'Rosewood', 'Berry Crush', 'Coral Flame'];
const blushShades = ['Peach Muse', 'Soft Pink', 'Mauve Mist', 'Terracotta Glow'];
const foundationTones = ['Ivory', 'Warm Beige', 'Honey', 'Caramel'];

const productCatalog = [
  { name: 'Velvet Matte Lipstick', category: 'lipstick', shade: 'Ruby Bloom', price: '$18' },
  { name: 'Hydra Gloss', category: 'lipstick', shade: 'Rosewood', price: '$16' },
  { name: 'Silk Touch Blush', category: 'blush', shade: 'Peach Muse', price: '$22' },
  { name: 'Radiant Cheek Tint', category: 'blush', shade: 'Soft Pink', price: '$19' },
  { name: 'Cloud Foundation', category: 'foundation', shade: 'Warm Beige', price: '$28' },
  { name: 'Skin Match Foundation', category: 'foundation', shade: 'Honey', price: '$30' },
];

function TryMakeup() {
  const webcamRef = useRef(null);

  const [selectedLipstick, setSelectedLipstick] = useState(lipstickShades[0]);
  const [selectedBlush, setSelectedBlush] = useState(blushShades[0]);
  const [selectedFoundation, setSelectedFoundation] = useState(foundationTones[1]);
  const [isApplied, setIsApplied] = useState(false);
  const [savedLooks, setSavedLooks] = useState([]);
  const [intensity, setIntensity] = useState(70);
  const [previewMode, setPreviewMode] = useState('after');

  const selectedLook = `${selectedLipstick} • ${selectedBlush} • ${selectedFoundation}`;

  const recommendedProducts = useMemo(() => {
    return productCatalog.filter((product) => {
      if (product.category === 'lipstick') return product.shade === selectedLipstick;
      if (product.category === 'blush') return product.shade === selectedBlush;
      return product.shade === selectedFoundation;
    });
  }, [selectedLipstick, selectedBlush, selectedFoundation]);

  const handleApplyMakeup = () => {
    setIsApplied(true);
    setPreviewMode('after');
  };

  const handleRemoveMakeup = () => {
    setIsApplied(false);
    setPreviewMode('before');
  };

  const handleSaveShade = () => {
    setSavedLooks((previous) => {
      if (previous.includes(selectedLook)) return previous;
      return [selectedLook, ...previous].slice(0, 5);
    });
  };

  return (
    <main className="bg-(--background)">
      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-8 animate-fade-up">
          <h1 className="text-3xl font-extrabold text-(--text-primary) sm:text-4xl">
            Virtual Makeup Try-On
          </h1>
          <p className="mt-3 max-w-3xl text-(--text-secondary)">
            Open your camera, choose your shades, and preview your look with live, adjustable
            virtual makeup before shopping.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <section className="animate-fade-up rounded-3xl border border-(--border) bg-white p-5 shadow-sm sm:p-6">
            <h2 className="mb-4 text-xl font-bold text-(--text-primary)">Camera Section</h2>

            <div className="relative overflow-hidden rounded-2xl border border-(--border) bg-black">
              <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                mirrored
                className="h-90 w-full object-cover sm:h-105"
                videoConstraints={{
                  facingMode: 'user',
                }}
              />

              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div
                  className={`h-[62%] w-[56%] rounded-[45%] border-2 border-dashed bg-white/5 ${
                    isApplied ? 'animate-pulse-ring border-(--accent)' : 'border-white/80'
                  }`}
                />
              </div>

              <p className="absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold text-white">
                Face detection area
              </p>

              {isApplied && (
                <div className="absolute bottom-3 left-3 rounded-full bg-(--primary) px-3 py-1 text-xs font-bold text-white shadow">
                  Makeup Applied ({intensity}%)
                </div>
              )}

              <div className="absolute bottom-3 right-3 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold text-white">
                {previewMode === 'before' ? 'Before' : 'After'}
              </div>
            </div>
          </section>

          <section
            className="animate-fade-up rounded-3xl border border-(--border) bg-white p-5 shadow-sm sm:p-6"
            style={{ animationDelay: '0.1s' }}
          >
            <h2 className="mb-4 text-xl font-bold text-(--text-primary)">Makeup Selection Panel</h2>

            <div className="space-y-5">
              <div>
                <p className="mb-2 text-sm font-bold text-(--text-primary)">Lipstick shades</p>
                <div className="flex flex-wrap gap-2">
                  {lipstickShades.map((shade) => (
                    <button
                      key={shade}
                      type="button"
                      onClick={() => setSelectedLipstick(shade)}
                      className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                        selectedLipstick === shade
                          ? 'border-(--primary) bg-(--primary) text-white'
                          : 'border-(--border) bg-white text-(--text-primary) hover:bg-(--background-soft)'
                      }`}
                    >
                      {shade}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm font-bold text-(--text-primary)">Blush shades</p>
                <div className="flex flex-wrap gap-2">
                  {blushShades.map((shade) => (
                    <button
                      key={shade}
                      type="button"
                      onClick={() => setSelectedBlush(shade)}
                      className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                        selectedBlush === shade
                          ? 'border-(--secondary) bg-(--secondary) text-white'
                          : 'border-(--border) bg-white text-(--text-primary) hover:bg-(--background-soft)'
                      }`}
                    >
                      {shade}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm font-bold text-(--text-primary)">Foundation tones</p>
                <div className="flex flex-wrap gap-2">
                  {foundationTones.map((tone) => (
                    <button
                      key={tone}
                      type="button"
                      onClick={() => setSelectedFoundation(tone)}
                      className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                        selectedFoundation === tone
                          ? 'border-(--accent) bg-(--accent) text-white'
                          : 'border-(--border) bg-white text-(--text-primary) hover:bg-(--background-soft)'
                      }`}
                    >
                      {tone}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-xl bg-(--background-soft) p-3 text-sm text-(--text-primary)">
                <p className="font-semibold">Selected look</p>
                <p className="mt-1 text-(--text-secondary)">{selectedLook}</p>
              </div>

              <div className="rounded-xl border border-(--border) bg-white p-3">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-bold text-(--text-primary)">Intensity</p>
                  <span className="text-xs font-semibold text-(--secondary)">{intensity}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={intensity}
                  onChange={(event) => setIntensity(Number(event.target.value))}
                  className="w-full accent-(--primary)"
                />
              </div>

              <div>
                <p className="mb-2 text-sm font-bold text-(--text-primary)">Controls</p>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  <button
                    type="button"
                    onClick={handleApplyMakeup}
                    className="rounded-lg bg-(--primary) px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-(--primary-hover)"
                  >
                    Apply makeup
                  </button>
                  <button
                    type="button"
                    onClick={handleRemoveMakeup}
                    className="rounded-lg border border-(--border) bg-white px-4 py-2 text-sm font-semibold text-(--text-primary) transition hover:-translate-y-0.5 hover:bg-(--background-soft)"
                  >
                    Remove makeup
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveShade}
                    className="rounded-lg bg-(--secondary) px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-(--secondary-hover)"
                  >
                    Save shade
                  </button>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPreviewMode('before')}
                    className={`rounded-lg px-3 py-2 text-xs font-bold ${
                      previewMode === 'before'
                        ? 'bg-(--primary) text-white'
                        : 'border border-(--border) bg-white text-(--text-primary)'
                    }`}
                  >
                    Before
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewMode('after')}
                    className={`rounded-lg px-3 py-2 text-xs font-bold ${
                      previewMode === 'after'
                        ? 'bg-(--secondary) text-white'
                        : 'border border-(--border) bg-white text-(--text-primary)'
                    }`}
                  >
                    After
                  </button>
                </div>
              </div>

              {savedLooks.length > 0 && (
                <div>
                  <p className="mb-2 text-sm font-bold text-(--text-primary)">Saved shades</p>
                  <ul className="space-y-1 text-xs text-(--text-secondary)">
                    {savedLooks.map((look) => (
                      <li
                        key={look}
                        className="interactive-card rounded-md border border-(--border) bg-(--background-soft) px-2 py-1.5"
                      >
                        {look}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        </div>

        <section
          className="mt-8 animate-fade-up rounded-3xl border border-(--border) bg-white p-5 shadow-sm sm:p-6"
          style={{ animationDelay: '0.15s' }}
        >
          <h2 className="mb-4 text-xl font-bold text-(--text-primary)">Recommended Products Section</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recommendedProducts.map((product, index) => (
              <article
                key={`${product.category}-${product.name}`}
                className="interactive-card animate-fade-up rounded-2xl border border-(--border) bg-(--background-soft) p-4"
                style={{ animationDelay: `${0.2 + index * 0.06}s` }}
              >
                <div className="shimmer-surface mb-3 h-20 rounded-xl" />
                <h3 className="text-sm font-bold text-(--text-primary)">{product.name}</h3>
                <p className="mt-1 text-xs text-(--text-secondary)">{product.shade}</p>
                <p className="mt-2 text-xs font-bold text-(--primary)">{product.price}</p>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

export default TryMakeup;