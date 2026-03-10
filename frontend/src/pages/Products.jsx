import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const product = {
	name: 'Velvet Matte Lipstick',
	brand: 'TheDivaLook Studio',
	price: '$18.00',
	description:
		'A long-wear matte lipstick with a soft-focus finish that feels lightweight and comfortable all day. Rich pigment in one swipe with hydration-boosting ingredients.',
	shades: ['Ruby Bloom', 'Rose Quartz', 'Berry Crush', 'Nude Petal'],
};

const reviews = [
	{ id: 1, user: 'Aanya P.', rating: 5, comment: 'Beautiful payoff and it stays on for hours without drying my lips.' },
	{ id: 2, user: 'Mira S.', rating: 4, comment: 'Loved Ruby Bloom. The virtual try-on matched the shade really well.' },
	{ id: 3, user: 'Tina K.', rating: 5, comment: 'Perfect texture and color for daily wear. Will repurchase.' },
];

const relatedProducts = [
	{ name: 'Hydra Gloss', brand: 'TheDivaLook Studio', price: '$16.00' },
	{ name: 'Silk Touch Blush', brand: 'TheDivaLook Studio', price: '$22.00' },
	{ name: 'Cloud Cushion Foundation', brand: 'TheDivaLook Studio', price: '$28.00' },
];

function Products() {
	const [selectedShade, setSelectedShade] = useState(product.shades[0]);
	const [cartMessage, setCartMessage] = useState('');
	const [quantity, setQuantity] = useState(1);
	const [savedForLater, setSavedForLater] = useState(false);

	const averageRating = useMemo(() => {
		const total = reviews.reduce((sum, review) => sum + review.rating, 0);
		return (total / reviews.length).toFixed(1);
	}, []);

	const handleAddToCart = () => {
		setCartMessage(`${quantity} x ${product.name} (${selectedShade}) added to cart.`);
	};

	return (
		<main className="bg-(--background)">
			<section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
				<div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-start">
					<article className="animate-fade-up rounded-3xl border border-(--border) bg-white p-5 shadow-sm sm:p-6">
						<div className="shimmer-surface mb-4 h-96 rounded-2xl" />

						<div className="space-y-4">
							<div>
								<p className="text-xs font-bold uppercase tracking-wide text-(--secondary)">Product Section</p>
								<h1 className="mt-1 text-3xl font-extrabold text-(--text-primary)">{product.name}</h1>
								<p className="mt-1 text-sm text-(--text-secondary)">{product.brand}</p>
								<p className="mt-2 text-xl font-bold text-(--primary)">{product.price}</p>
							</div>

							<div>
								<p className="mb-2 text-sm font-bold text-(--text-primary)">Shade options</p>
								<div className="flex flex-wrap gap-2">
									{product.shades.map((shade) => (
										<button
											key={shade}
											type="button"
											onClick={() => setSelectedShade(shade)}
											className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
												selectedShade === shade
													? 'border-(--primary) bg-(--primary) text-white'
													: 'border-(--border) bg-white text-(--text-primary) hover:-translate-y-0.5 hover:bg-(--background-soft)'
											}`}
										>
											{shade}
										</button>
									))}
								</div>
							</div>

							<div className="flex flex-wrap items-center gap-3 rounded-xl border border-(--border) bg-(--background-soft) p-3">
								<p className="text-sm font-semibold text-(--text-primary)">Quantity</p>
								<div className="inline-flex items-center rounded-lg border border-(--border) bg-white">
									<button
										type="button"
										onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
										className="px-3 py-1.5 text-sm font-bold text-(--text-primary)"
									>
										-
									</button>
									<span className="min-w-9 px-2 text-center text-sm font-bold text-(--text-primary)">{quantity}</span>
									<button
										type="button"
										onClick={() => setQuantity((prev) => Math.min(10, prev + 1))}
										className="px-3 py-1.5 text-sm font-bold text-(--text-primary)"
									>
										+
									</button>
								</div>
								<button
									type="button"
									onClick={() => setSavedForLater((prev) => !prev)}
									className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
										savedForLater
											? 'bg-(--secondary) text-white'
											: 'border border-(--border) bg-white text-(--text-primary)'
									}`}
								>
									{savedForLater ? 'Saved' : 'Save for later'}
								</button>
							</div>

							<div>
								<p className="text-sm font-bold text-(--text-primary)">Product Description</p>
								<p className="mt-2 text-sm leading-6 text-(--text-secondary)">{product.description}</p>
							</div>

							<div>
								<p className="mb-2 text-sm font-bold text-(--text-primary)">Buttons</p>
								<div className="flex flex-wrap gap-3">
									<Link
										to="/try-makeup"
										className="rounded-xl bg-(--secondary) px-4 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-(--secondary-hover)"
									>
										Try this shade
									</Link>
									<button
										type="button"
										onClick={handleAddToCart}
										className="rounded-xl bg-(--primary) px-4 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-(--primary-hover)"
									>
										Add to cart
									</button>
								</div>
								{cartMessage && (
									<p className="mt-3 rounded-lg bg-(--background-soft) px-3 py-2 text-xs text-(--text-secondary)">
										{cartMessage}
									</p>
								)}
							</div>
						</div>
					</article>

					<aside className="animate-fade-up rounded-3xl border border-(--border) bg-white p-5 shadow-sm sm:p-6" style={{ animationDelay: '0.1s' }}>
						<h2 className="text-xl font-bold text-(--text-primary)">Reviews Section</h2>
						<p className="mt-1 text-sm text-(--text-secondary)">
							{averageRating}/5 average from {reviews.length} reviews
						</p>

						<div className="mt-4 space-y-3">
							{reviews.map((review, index) => (
								<div key={review.id} className="interactive-card animate-fade-up rounded-xl border border-(--border) bg-(--background-soft) p-3" style={{ animationDelay: `${0.12 + index * 0.06}s` }}>
									<div className="flex items-center justify-between">
										<p className="text-sm font-bold text-(--text-primary)">{review.user}</p>
										<p className="text-xs font-bold text-(--primary)">{review.rating} / 5</p>
									</div>
									<p className="mt-2 text-sm text-(--text-secondary)">{review.comment}</p>
								</div>
							))}
						</div>
					</aside>
				</div>

				<section className="mt-8 animate-fade-up rounded-3xl border border-(--border) bg-white p-5 shadow-sm sm:p-6" style={{ animationDelay: '0.15s' }}>
					<h2 className="text-xl font-bold text-(--text-primary)">Related Products Section</h2>
					<div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{relatedProducts.map((item, index) => (
							<article key={item.name} className="interactive-card animate-fade-up rounded-2xl border border-(--border) bg-(--background-soft) p-4" style={{ animationDelay: `${0.14 + index * 0.07}s` }}>
								<div className="mb-3 h-24 rounded-xl bg-white" />
								<h3 className="text-sm font-bold text-(--text-primary)">{item.name}</h3>
								<p className="mt-1 text-xs text-(--text-secondary)">{item.brand}</p>
								<p className="mt-2 text-xs font-bold text-(--primary)">{item.price}</p>
							</article>
						))}
					</div>
				</section>
			</section>
		</main>
	);
}

export default Products;
