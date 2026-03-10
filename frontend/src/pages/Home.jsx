import { useState } from 'react';
import { Link } from 'react-router-dom';

const featuredProducts = [
  { name: 'Velvet Matte Lipstick', shade: 'Ruby Bloom', price: '$18' },
  { name: 'Hydra Gloss', shade: 'Rose Quartz', price: '$16' },
  { name: 'Silk Blush', shade: 'Peach Muse', price: '$22' },
  { name: 'Cloud Cushion Foundation', shade: 'Warm Beige', price: '$28' },
  { name: 'Satin Lip Crayon', shade: 'Cinnamon Kiss', price: '$14' },
  { name: 'Luminizing Highlighter', shade: 'Golden Halo', price: '$20' },
];

const trendingShades = [
  'Berry Crush',
  'Coral Flirt',
  'Mocha Glow',
  'Nude Petal',
  'Plum Drama',
  'Sunset Peach',
];

function Home() {
  const [activeTrend, setActiveTrend] = useState(trendingShades[0]);

  return (
    <main className="bg-(--background)">
      <section className="relative mx-auto grid w-full max-w-7xl gap-8 overflow-hidden px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-20">
        <div className="pointer-events-none absolute -left-14 top-4 h-40 w-40 rounded-full bg-(--accent)/30 blur-2xl" />
        <div className="pointer-events-none absolute -right-20 bottom-8 h-52 w-52 rounded-full bg-(--primary)/20 blur-3xl" />

        <div className="animate-fade-up">
          <p className="mb-3 inline-block rounded-full bg-(--accent) px-3 py-1 text-xs font-bold tracking-wide text-white animate-fade-in">
            Beauty Meets Technology
          </p>
          <h1 className="mb-4 text-4xl font-extrabold leading-tight text-(--text-primary) sm:text-5xl">
            TheDivaLook
          </h1>
          <p className="mb-8 max-w-xl text-base text-(--text-secondary) sm:text-lg">
            Discover your perfect shade instantly. Try lipsticks, blushes, and more with a
            live virtual preview before you buy.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/try-makeup"
              className="animate-pulse-ring inline-flex items-center rounded-full bg-(--primary) px-7 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-(--primary-hover)"
            >
              Try Virtual Makeup
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center rounded-full border border-(--border) bg-white px-6 py-3 text-sm font-bold text-(--text-primary) transition hover:-translate-y-0.5 hover:bg-(--background-soft)"
            >
              Browse Products
            </Link>
          </div>
        </div>

        <div className="animate-float-soft rounded-3xl border border-(--border) bg-white p-6 shadow-sm sm:p-8">
          <p className="mb-4 text-xs font-bold uppercase tracking-wide text-(--secondary)">
            Trending now: {activeTrend}
          </p>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {['Lipstick', 'Blush', 'Foundation', 'Gloss'].map((item, index) => (
              <div
                key={item}
                className="interactive-card animate-fade-up rounded-2xl border border-(--border) bg-(--background-soft) px-4 py-5 text-center text-sm font-semibold text-(--text-primary)"
                style={{ animationDelay: `${0.12 + index * 0.08}s` }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 animate-fade-up" style={{ animationDelay: '0.15s' }}>
        <h2 className="mb-2 text-2xl font-bold text-(--text-primary) sm:text-3xl">Featured Products</h2>
        <p className="mb-8 text-(--text-secondary)">Handpicked favorites you can try instantly.</p>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product, index) => (
            <article
              key={product.name}
              className="interactive-card animate-fade-up rounded-2xl border border-(--border) bg-white p-5 shadow-sm"
              style={{ animationDelay: `${0.2 + index * 0.06}s` }}
            >
              <div className="shimmer-surface mb-4 h-36 rounded-xl" />
              <h3 className="text-base font-bold text-(--text-primary)">{product.name}</h3>
              <p className="mt-1 text-sm text-(--text-secondary)">{product.shade}</p>
              <p className="mt-3 text-sm font-bold text-(--primary)">{product.price}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white py-12 animate-fade-up" style={{ animationDelay: '0.2s' }}>
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-2xl font-bold text-(--text-primary) sm:text-3xl">How It Works</h2>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              { step: 'Step 1', title: 'Open camera' },
              { step: 'Step 2', title: 'Choose shade' },
              { step: 'Step 3', title: 'Try virtually' },
            ].map((item, index) => (
              <div
                key={item.step}
                className="interactive-card animate-fade-up rounded-2xl border border-(--border) bg-(--background-soft) p-5"
                style={{ animationDelay: `${0.24 + index * 0.08}s` }}
              >
                <p className="text-xs font-bold uppercase tracking-wide text-(--secondary)">{item.step}</p>
                <p className="mt-2 text-lg font-semibold text-(--text-primary)">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 animate-fade-up" style={{ animationDelay: '0.25s' }}>
        <h2 className="mb-2 text-2xl font-bold text-(--text-primary) sm:text-3xl">Trending Shades</h2>
        <p className="mb-6 text-(--text-secondary)">Popular picks from the community this week.</p>

        <div className="flex flex-wrap gap-3">
          {trendingShades.map((shade, index) => (
            <button
              key={shade}
              type="button"
              onMouseEnter={() => setActiveTrend(shade)}
              onFocus={() => setActiveTrend(shade)}
              className={`animate-pop-in rounded-full border px-4 py-2 text-sm font-semibold transition ${
                activeTrend === shade
                  ? 'border-(--primary) bg-(--primary) text-white'
                  : 'border-(--border) bg-white text-(--text-primary) hover:bg-(--background-soft)'
              }`}
              style={{ animationDelay: `${0.3 + index * 0.05}s` }}
            >
              {shade}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;