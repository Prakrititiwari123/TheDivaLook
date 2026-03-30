import Product from "../models/Product.js"

const dummyProducts = [
	{
		_id: "660000000000000000000001",
		name: "Velvet Matte Lipstick",
		brand: "Diva Luxe",
		price: 1299,
		image: "https://images.unsplash.com/photo-1611080541599-8c6dbde6ed28?auto=format&fit=crop&w=900&q=80",
		shade: "Rose Petal",
		rating: 4.8,
		createdAt: "2026-03-29T10:00:00.000Z"
	},
	{
		_id: "660000000000000000000002",
		name: "Glow Dew Foundation",
		brand: "The Diva Look",
		price: 1899,
		image: "https://images.unsplash.com/photo-1631214540242-0fbf38c0d57f?auto=format&fit=crop&w=900&q=80",
		shade: "Warm Beige",
		rating: 4.6,
		createdAt: "2026-03-28T10:00:00.000Z"
	},
	{
		_id: "660000000000000000000003",
		name: "Soft Blush Palette",
		brand: "Aura Beauty",
		price: 1599,
		image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=900&q=80",
		shade: "Coral Bloom",
		rating: 4.7,
		createdAt: "2026-03-27T10:00:00.000Z"
	},
	{
		_id: "660000000000000000000004",
		name: "Smokey Eyeshadow Kit",
		brand: "Studio Blend",
		price: 2199,
		image: "https://images.unsplash.com/photo-1583241800698-1348f68a8f7f?auto=format&fit=crop&w=900&q=80",
		shade: "Midnight Nude",
		rating: 4.9,
		createdAt: "2026-03-30T10:00:00.000Z"
	},
	{
		_id: "660000000000000000000005",
		name: "Liquid Highlighter",
		brand: "Radiant Co.",
		price: 999,
		image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80",
		shade: "Champagne Glow",
		rating: 4.5,
		createdAt: "2026-03-31T10:00:00.000Z"
	},
	{
		_id: "660000000000000000000006",
		name: "Precision Eyeliner Pen",
		brand: "Diva Luxe",
		price: 799,
		image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
		shade: "Jet Black",
		rating: 4.4,
		createdAt: "2026-03-26T10:00:00.000Z"
	},
	{
		_id: "660000000000000000000007",
		name: "Hydra Gloss Lip Oil",
		brand: "Glow Theory",
		price: 1099,
		image: "https://images.unsplash.com/photo-1631730359585-38a4935cbec4?auto=format&fit=crop&w=900&q=80",
		shade: "Peach Sheen",
		rating: 4.3,
		createdAt: "2026-03-31T14:00:00.000Z"
	},
	{
		_id: "660000000000000000000008",
		name: "24H Kajal Stick",
		brand: "Kohl House",
		price: 699,
		image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
		shade: "Deep Onyx",
		rating: 4.2,
		createdAt: "2026-03-25T10:00:00.000Z"
	},
	{
		_id: "660000000000000000000009",
		name: "Airbrush Compact Powder",
		brand: "The Diva Look",
		price: 1499,
		image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80",
		shade: "Natural Honey",
		rating: 4.6,
		createdAt: "2026-03-24T10:00:00.000Z"
	},
	{
		_id: "660000000000000000000010",
		name: "Brow Sculpt Gel",
		brand: "Studio Blend",
		price: 899,
		image: "https://images.unsplash.com/photo-1596704017254-9cf8f7e4f74d?auto=format&fit=crop&w=900&q=80",
		shade: "Soft Brown",
		rating: 4.1,
		createdAt: "2026-03-23T10:00:00.000Z"
	},
	{
		_id: "660000000000000000000011",
		name: "Hydrating Primer",
		brand: "Aura Beauty",
		price: 1299,
		image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=80",
		shade: "Clear",
		rating: 4.5,
		createdAt: "2026-03-22T10:00:00.000Z"
	},
	{
		_id: "660000000000000000000012",
		name: "Mega Volume Mascara",
		brand: "Radiant Co.",
		price: 1199,
		image: "https://images.unsplash.com/photo-1591375275584-39f5e7c46f5f?auto=format&fit=crop&w=900&q=80",
		shade: "Intense Black",
		rating: 4.7,
		createdAt: "2026-03-21T10:00:00.000Z"
	}
]

export const getProducts = async(req,res)=>{
	try {
		const products = await Product.find()

		if (!products || products.length === 0) {
			return res.json(dummyProducts)
		}

		return res.json(products)
	} catch (error) {
		console.log(error)
		return res.json(dummyProducts)
	}

}