export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  details: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "prod-01",
    name: "Architectural Desk Lamp",
    category: "Objects",
    price: 180,
    description: "Solid cast aluminum with anodized matte finish and balanced counterbalance arm.",
    details: "2700K warm LED, 360-degree rotation, woven fabric cord.",
  },
  {
    id: "prod-02",
    name: "Ceramic Vessel No. 04",
    category: "Objects",
    price: 95,
    description: "Hand-thrown coarse stoneware with unglazed mineral exterior.",
    details: "Watertight interior, 22cm height, individually numbered.",
  },
  {
    id: "prod-03",
    name: "Precision Chronograph",
    category: "Timepieces",
    price: 340,
    description: "38mm brushed 316L stainless steel case with anti-reflective sapphire glass.",
    details: "Swiss quartz movement, 5ATM water resistance, vegetable-tanned strap.",
  },
  {
    id: "prod-04",
    name: "Heavy Wool Overshirt",
    category: "Apparel",
    price: 220,
    description: "Dense 480gsm recycled melton wool tailored with clean concealed placket.",
    details: "Dry clean only, horn buttons, dual chest slip pockets.",
  },
  {
    id: "prod-05",
    name: "Solid Brass Mechanical Pencil",
    category: "Stationery",
    price: 65,
    description: "Machined from a single brass billet with micro-knurled grip section.",
    details: "0.5mm lead mechanism, develops natural patina over time.",
  },
  {
    id: "prod-06",
    name: "Structured Canvas Tote",
    category: "Apparel",
    price: 150,
    description: "24oz heavyweight cotton canvas with reinforced box stitching.",
    details: "Internal laptop sleeve, copper rivets, unlined minimalist construction.",
  },
];
