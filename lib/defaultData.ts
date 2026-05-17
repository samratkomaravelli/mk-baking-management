export interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
  description: string
}

export interface Testimonial {
  id: number
  name: string
  text: string
  rating: number
}

export const DEFAULT_PRODUCT_IMAGES = [
  'WhatsApp Image 2026-05-16 at 15.42.27.jpeg',
  'WhatsApp Image 2026-05-16 at 15.42.28 (1).jpeg',
  'WhatsApp Image 2026-05-16 at 15.42.28 (2).jpeg',
  'WhatsApp Image 2026-05-16 at 15.42.28.jpeg',
  'WhatsApp Image 2026-05-16 at 15.42.29.jpeg',
  'WhatsApp Image 2026-05-16 at 15.42.31 (1).jpeg',
  'WhatsApp Image 2026-05-16 at 15.42.31.jpeg',
  'WhatsApp Image 2026-05-16 at 15.42.33 (1).jpeg',
  'WhatsApp Image 2026-05-16 at 15.42.33 (2).jpeg',
  'WhatsApp Image 2026-05-16 at 15.42.33.jpeg',
  'WhatsApp Image 2026-05-16 at 15.42.34 (1).jpeg',
  'WhatsApp Image 2026-05-16 at 15.42.34 (2).jpeg',
  'WhatsApp Image 2026-05-16 at 15.42.34.jpeg',
  'WhatsApp Image 2026-05-16 at 15.42.35.jpeg',
]

const PRODUCT_NAMES = [
  'Chocolate Cake',
  'Vanilla Cupcakes',
  'Strawberry Cheesecake',
  'Red Velvet Cake',
  'Chocolate Brownies',
  'Lemon Cake',
  'Black Forest Cake',
  'Carrot Cake',
  'Coffee Cake',
  'Marble Cake',
  'Butter Cake',
  'Pineapple Cake',
  'Walnut Cake',
  'Chocolate Mousse',
]

const PRODUCT_CATEGORIES = ['Cakes', 'Cupcakes', 'Pastries', 'Brownies']

export const DEFAULT_PRODUCTS: Product[] = DEFAULT_PRODUCT_IMAGES.map((image, index) => ({
  id: index + 1,
  name: PRODUCT_NAMES[index] || `Cake ${index + 1}`,
  price: 250 + index * 50,
  image: `/images/cakes/${image}`,
  category: PRODUCT_CATEGORIES[index % PRODUCT_CATEGORIES.length],
  description: `Delicious homemade ${PRODUCT_NAMES[index] || `cake ${index + 1}`}. Made with fresh ingredients and love!`,
}))

export const DEFAULT_TESTIMONIALS: Testimonial[] = [
  { id: 1, name: 'Priya Sharma', text: 'Absolutely delicious cakes! Best for parties and celebrations.', rating: 5 },
  { id: 2, name: 'Raj Kumar', text: 'Fresh ingredients and amazing flavors. Highly recommend!', rating: 5 },
  { id: 3, name: 'Anjali Verma', text: 'Great quality and quick delivery. Love the custom designs!', rating: 5 },
]
