import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register() {
	const [formData, setFormData] = useState({
		fullName: '',
		email: '',
		password: '',
		confirmPassword: '',
		agreeToTerms: false,
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [statusMessage, setStatusMessage] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const passwordStrength =
		formData.password.length >= 10
			? 'Strong'
			: formData.password.length >= 6
				? 'Medium'
				: 'Weak';

	const handleChange = (event) => {
		const { name, value, type, checked } = event.target;

		setFormData((prev) => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value,
		}));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setStatusMessage('');

		if (formData.password !== formData.confirmPassword) {
			setStatusMessage('Passwords do not match.');
			return;
		}

		if (!formData.agreeToTerms) {
			setStatusMessage('Please accept terms and conditions.');
			return;
		}

		setIsSubmitting(true);

		// Simulate registration request until backend register API is wired.
		await new Promise((resolve) => setTimeout(resolve, 600));

		setIsSubmitting(false);
		setStatusMessage('Registration submitted. Connect this form to your backend API.');
	};

	return (
		<main className="min-h-[70vh] bg-(--background) px-4 py-12 sm:px-6 lg:px-8">
			<div className="mx-auto grid w-full max-w-5xl gap-6 overflow-hidden rounded-3xl border border-(--border) bg-white shadow-sm lg:grid-cols-2 animate-fade-up">
				<section className="bg-(--background-soft) p-7 sm:p-10">
					<p className="inline-block rounded-full bg-(--secondary) px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
						Join TheDivaLook
					</p>
					<h1 className="mt-4 text-3xl font-extrabold text-(--text-primary)">Create your account</h1>
					<p className="mt-3 text-sm leading-6 text-(--text-secondary)">
						Save your favorite shades, keep your virtual try-on looks, and get personalized
						product recommendations every time you visit.
					</p>

					<ul className="mt-8 space-y-3 text-sm text-(--text-secondary)">
						<li className="interactive-card rounded-xl border border-(--border) bg-white px-4 py-3">Build your personal beauty profile</li>
						<li className="interactive-card rounded-xl border border-(--border) bg-white px-4 py-3">Save unlimited looks and shades</li>
						<li className="interactive-card rounded-xl border border-(--border) bg-white px-4 py-3">Get tailored makeup suggestions</li>
					</ul>
				</section>

				<section className="p-7 sm:p-10">
					<h2 className="text-2xl font-bold text-(--text-primary)">Sign up</h2>

					<form className="mt-6 space-y-4" onSubmit={handleSubmit}>
						<div>
							<label htmlFor="fullName" className="mb-1 block text-sm font-semibold text-(--text-primary)">
								Full name
							</label>
							<input
								id="fullName"
								name="fullName"
								type="text"
								value={formData.fullName}
								onChange={handleChange}
								required
								placeholder="Your full name"
								className="w-full rounded-xl border border-(--border) px-4 py-2.5 text-sm text-(--text-primary) outline-none transition focus:border-(--primary)"
							/>
						</div>

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

						<div className="grid gap-4 sm:grid-cols-2">
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
										placeholder="Create password"
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

							<div>
								<label htmlFor="confirmPassword" className="mb-1 block text-sm font-semibold text-(--text-primary)">
									Confirm password
								</label>
								<div className="relative">
									<input
										id="confirmPassword"
										name="confirmPassword"
										type={showConfirmPassword ? 'text' : 'password'}
										value={formData.confirmPassword}
										onChange={handleChange}
										required
										placeholder="Confirm password"
										className="w-full rounded-xl border border-(--border) px-4 py-2.5 pr-22 text-sm text-(--text-primary) outline-none transition focus:border-(--primary)"
									/>
									<button
										type="button"
										onClick={() => setShowConfirmPassword((prev) => !prev)}
										className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs font-bold text-(--secondary) hover:bg-(--background-soft)"
									>
										{showConfirmPassword ? 'Hide' : 'Show'}
									</button>
								</div>
							</div>
						</div>

						<div className="rounded-xl border border-(--border) bg-(--background-soft) px-3 py-2">
							<p className="text-xs font-semibold text-(--text-secondary)">Password strength</p>
							<p className={`text-sm font-bold ${
								passwordStrength === 'Strong'
									? 'text-(--secondary)'
									: passwordStrength === 'Medium'
										? 'text-(--primary)'
										: 'text-(--text-secondary)'
							}`}>{passwordStrength}</p>
						</div>

						<label className="inline-flex items-start gap-2 text-sm text-(--text-secondary)">
							<input
								type="checkbox"
								name="agreeToTerms"
								checked={formData.agreeToTerms}
								onChange={handleChange}
								className="mt-1 h-4 w-4 rounded border-(--border)"
							/>
							<span>I agree to the Terms and Privacy Policy.</span>
						</label>

						<button
							type="submit"
							disabled={isSubmitting}
							className="w-full rounded-xl bg-(--primary) px-4 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-(--primary-hover) disabled:cursor-not-allowed disabled:opacity-70"
						>
							{isSubmitting ? 'Creating account...' : 'Create account'}
						</button>

						{statusMessage && (
							<p className="rounded-lg bg-(--background-soft) px-3 py-2 text-xs text-(--text-secondary)">
								{statusMessage}
							</p>
						)}
					</form>

					<p className="mt-5 text-sm text-(--text-secondary)">
						Already have an account?{' '}
						<Link to="/login" className="font-bold text-(--secondary) transition hover:text-(--secondary-hover)">
							Login
						</Link>
					</p>
				</section>
			</div>
		</main>
	);
}

export default Register;
