import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		rememberMe: false,
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [statusMessage, setStatusMessage] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	const handleChange = (event) => {
		const { name, value, type, checked } = event.target;

		setFormData((prev) => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value,
		}));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setIsSubmitting(true);
		setStatusMessage('');

		// Simulate auth request until backend login API is wired.
		await new Promise((resolve) => setTimeout(resolve, 500));

		setIsSubmitting(false);
		setStatusMessage('Login request submitted. Connect this form to your backend auth API.');
	};

	return (
		<main className="min-h-[70vh] bg-(--background) px-4 py-12 sm:px-6 lg:px-8">
			<div className="mx-auto grid w-full max-w-5xl gap-6 overflow-hidden rounded-3xl border border-(--border) bg-white shadow-sm lg:grid-cols-2 animate-fade-up">
				<section className="bg-(--background-soft) p-7 sm:p-10">
					<p className="inline-block rounded-full bg-(--accent) px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
						Welcome Back
					</p>
					<h1 className="mt-4 text-3xl font-extrabold text-(--text-primary)">Login to TheDivaLook</h1>
					<p className="mt-3 text-sm leading-6 text-(--text-secondary)">
						Access your saved shades, virtual try-on history, and personalized product
						recommendations.
					</p>

					<ul className="mt-8 space-y-3 text-sm text-(--text-secondary)">
						<li className="interactive-card rounded-xl border border-(--border) bg-white px-4 py-3">Track your favorite looks</li>
						<li className="interactive-card rounded-xl border border-(--border) bg-white px-4 py-3">Save lipstick and blush combinations</li>
						<li className="interactive-card rounded-xl border border-(--border) bg-white px-4 py-3">Checkout faster with your profile</li>
					</ul>
				</section>

				<section className="p-7 sm:p-10">
					<h2 className="text-2xl font-bold text-(--text-primary)">Sign in</h2>

					<form className="mt-6 space-y-4" onSubmit={handleSubmit}>
						<div>
							<label htmlFor="email" className="mb-1 block text-sm font-semibold text-(--text-primary)">
								Email
							</label>
							<input
								id="email"
								name="email"
								type="email"
								value={formData.email}
								onChange={handleChange}
								required
								placeholder="you@example.com"
								className="w-full rounded-xl border border-(--border) px-4 py-2.5 text-sm text-(--text-primary) outline-none transition focus:border-(--primary)"
							/>
						</div>

						<div>
							<label htmlFor="password" className="mb-1 block text-sm font-semibold text-(--text-primary)">
								Password
							</label>
							<div className="relative">
								<input
									id="password"
									name="password"
									type={showPassword ? 'text' : 'password'}
									value={formData.password}
									onChange={handleChange}
									required
									placeholder="Enter your password"
									className="w-full rounded-xl border border-(--border) px-4 py-2.5 pr-22 text-sm text-(--text-primary) outline-none transition focus:border-(--primary)"
								/>
								<button
									type="button"
									onClick={() => setShowPassword((prev) => !prev)}
									className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs font-bold text-(--secondary) hover:bg-(--background-soft)"
								>
									{showPassword ? 'Hide' : 'Show'}
								</button>
							</div>
						</div>

						<div className="flex items-center justify-between gap-3 text-sm">
							<label className="inline-flex items-center gap-2 text-(--text-secondary)">
								<input
									type="checkbox"
									name="rememberMe"
									checked={formData.rememberMe}
									onChange={handleChange}
									className="h-4 w-4 rounded border-(--border)"
								/>
								Remember me
							</label>
							<button type="button" className="font-semibold text-(--primary) transition hover:text-(--primary-hover)">
								Forgot password?
							</button>
						</div>

						<button
							type="submit"
							disabled={isSubmitting}
							className="w-full rounded-xl bg-(--primary) px-4 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-(--primary-hover) disabled:cursor-not-allowed disabled:opacity-70"
						>
							{isSubmitting ? 'Signing in...' : 'Login'}
						</button>

						{statusMessage && (
							<p className="rounded-lg bg-(--background-soft) px-3 py-2 text-xs text-(--text-secondary)">
								{statusMessage}
							</p>
						)}
					</form>

					<p className="mt-5 text-sm text-(--text-secondary)">
						Don&apos;t have an account?{' '}
						<Link to="/register" className="font-bold text-(--secondary) transition hover:text-(--secondary-hover)">
							Register
						</Link>
					</p>
				</section>
			</div>
		</main>
	);
}

export default Login;
