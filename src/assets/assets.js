import PlaceholderImg from './Placeholder.PNG';
import Stk1 from './Stk1.PNG';
import Stk2 from './Stk2.PNG';
import Stk3 from './Stk3.PNG';

export const products = [
  {
    _id: "stk001",
    name: "Sticker Pack",
    description: "Vinyl water proof stickers",
    price: 2,
    image: [PlaceholderImg, Stk1, Stk2, Stk3], 
    category: "Sticker",
    sizes: ["A", "B", "C", "D"],
    stock: 5,
  },
  {
    _id: "nkl001",
    name: "Pearl Daisy Necklace",
    description: "A dainty handmade necklace with faux pearls and pastel daisy charms.",
    price: 18,
    image: [PlaceholderImg],
    category: "Necklace",
    sizes: [],
    stock: 4,
  },
  {
    _id: "prt001",
    name: "Print",
    description: "Shiny A5 matte print.",
    price: 12,
    image: [PlaceholderImg],
    category: "Print",
    sizes: ["A5"],
    stock: 10,
  },
  {
    _id: "bch001",
    name: "Bag Charm",
    description: "Cute pillow bag charm",
    price: 9,
    image: [PlaceholderImg],
    category: "Accessories",
    sizes: [],
    stock: 0,
  },
];
