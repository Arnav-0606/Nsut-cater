export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: 'Snacks' | 'beverages' | 'Meal';
  rating: number;
}

export interface Order {
  id: string;
  tokenNumber: number;
  userId: string;
  userName: string;
  items: {
    menuItem: MenuItem;
    quantity: number;
  }[];
  totalAmount: number;
  status: 'placed' | 'preparing' | 'ready' | 'delivered';
  orderTime: Date;
  pickupTime?: Date;
  qrCode: string;
  mealType: 'Snacks' | 'Meal' | 'Beverages';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'staff';
  walletBalance: number;
}

export const menuItems: MenuItem[] = [
  // Breakfast Items
  {
    id: '1',
    name: 'Aloo Paratha',
    price: 40,
    category: 'Meal',
    rating: Math.ceil(Math.random())/20
  },
  {
    id: '2',
    name: 'Aloo Paratha',
    price: 40,
    category: 'Meal',
    rating: Math.ceil(Math.random()*100)/20
  },
  {
    id: '3',
    name: 'Aloo Paratha da ',
    price: 40,
    category: 'Meal',
    rating: Math.ceil(Math.random()*100)/20
  },
  {
    id: '4',
    name: 'Aloo Paratha',
    price: 40,
    category: 'Meal',
    rating: Math.ceil(Math.random()*100)/20
  },
  {
    id: '5',
    name: 'Aloo Paratha',
    price: 40,
    category: 'Meal',
    rating: Math.ceil(Math.random()*100)/20
  },
];

export const mockOrders: Order[] = [
  {
    id: 'NSU001',
    tokenNumber: 101,
    userId: 'user1',
    userName: 'Arjun Kumar',
    items: [
      {
        menuItem: menuItems[3], // Rajma Rice
        quantity: 1
      },
      {
        menuItem: menuItems[11], // Chai
        quantity: 1
      }
    ],
    totalAmount: 60,
    status: 'preparing',
    orderTime: new Date('2024-01-15T12:30:00'),
    mealType: 'lunch',
    qrCode: 'NSUT001'
  },
  {
    id: 'NSUT002',
    tokenNumber: 102,
    userId: 'user2',
    userName: 'Priya Sharma',
    items: [
      {
        menuItem: menuItems[0], // Aloo Paratha
        quantity: 2
      }
    ],
    totalAmount: 80,
    status: 'placed',
    orderTime: new Date('2024-01-15T08:15:00'),
    mealType: 'breakfast',
    qrCode: 'NSU002'
  },
  {
    id: 'NSU003',
    tokenNumber: 103,
    userId: 'user1',
    userName: 'ArjunKumar',
    items: [
      {
        menuItem: menuItems[7], // Paneer Butter Masala
        quantity: 1
      },
      {
        menuItem: menuItems[12], // Lassi
        quantity: 1
      }
    ],
    totalAmount: 95,
    status: 'ready',
    orderTime: new Date('2024-01-15T19:45:00'),
    pickupTime: new Date('2024-01-15T20:15:00'),
    mealType: 'dinner',
    qrCode: 'NSUT003'
  }
];
const userCount =1;

export const mockUser: User = {
  id: `User ${userCount}`,
  name: 'Arnav Negi',
  email: 'arnav.negi@nsut.ac.in',
  role: 'user',
};
