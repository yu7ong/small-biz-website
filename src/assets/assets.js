import PlaceholderImg from './Placeholder.PNG';
import Stk1 from './Stk1.PNG';
import Stk2 from './Stk2.PNG';
import Stk3 from './Stk3.PNG';
import orvMain from './orv_main.jpg';
import orvOne from './orv_1.jpg';

/*Example of product*/
export const products = [
  {
  _id: "pin001",
  name: "Decorative Pin",
  description:
    "A decorative Omniscient Reader’s Viewpoint inspired pin featuring the two main characters, a small book charm, and subtle star details. Easy to pin on bags or jackets for a quiet nod to the story.",
  price: 12,
  category: "Accessories",
  image: orvMain,
  variants: [
    {
      _id: "orv001",
      name: "1",
      stock: 2,
      image: orvOne, 
    },
  ],
}
]