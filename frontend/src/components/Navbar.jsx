import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const navItems = [
	{ label: 'Home', to: '/' },
	{ label: 'Products', to: '/products' },
	{ label: 'Try Makeup', to: '/try-makeup' },
];

function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const closeMenu = () => setIsMenuOpen(false);

	return (
		<header className="sticky top-0 z-50 border-b border-(--border) bg-white/90 backdrop-blur-md">
			<nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
				<Link
					to="/"
					onClick={closeMenu}
					className="text-xl font-extrabold tracking-tight text-(--primary)"
				>
					TheDivaLook
				</Link>

				<ul className="hidden items-center gap-8 lg:flex">
					{navItems.map((item) => (
						<li key={item.to}>
							<NavLink
								to={item.to}
								className={({ isActive }) =>
									`text-sm font-semibold transition-colors ${
										isActive
											? 'text-(--primary)'
											: 'text-(--text-primary) hover:text-(--secondary)'
									}`
								}
							>
								{item.label}
							</NavLink>
						</li>
					))}
				</ul>

				<div className="hidden items-center gap-3 md:flex">
					<Link
						to="/login"
						className="rounded-full border border-(--border) px-4 py-2 text-sm font-semibold text-(--text-primary) transition hover:bg-(--background-soft)"
					>
						Login
					</Link>
					<Link
						to="/register"
						className="rounded-full bg-(--primary) px-4 py-2 text-sm font-semibold text-white transition hover:bg-(--primary-hover)"
					>
						Register
					</Link>
				</div>

				<button
					type="button"
					className="inline-flex items-center rounded-lg border border-(--border) px-3 py-2 text-sm font-semibold text-(--text-primary) md:hidden"
					onClick={() => setIsMenuOpen((prev) => !prev)}
					aria-expanded={isMenuOpen}
					aria-label="Toggle navigation menu"
				>
					Menu
				</button>
			</nav>

			{isMenuOpen && (
				<div className="border-t border-(--border) bg-white px-4 py-3 md:hidden">
					<ul className="flex flex-col gap-2">
						{navItems.map((item) => (
							<li key={item.to}>
								<NavLink
									to={item.to}
									onClick={closeMenu}
									className={({ isActive }) =>
										`block rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
											isActive
												? 'bg-(--background-soft) text-(--primary)'
												: 'text-(--text-primary) hover:bg-(--background-soft) hover:text-(--secondary)'
										}`
									}
								>
									{item.label}
								</NavLink>
							</li>
						))}
						<li className="mt-2 grid grid-cols-2 gap-2">
							<Link
								to="/login"
								onClick={closeMenu}
								className="rounded-md border border-(--border) px-3 py-2 text-center text-sm font-semibold text-(--text-primary)"
							>
								Login
							</Link>
							<Link
								to="/register"
								onClick={closeMenu}
								className="rounded-md bg-(--primary) px-3 py-2 text-center text-sm font-semibold text-white"
							>
								Register
							</Link>
						</li>
					</ul>
				</div>
			)}
		</header>
	);
}

export default Navbar;
