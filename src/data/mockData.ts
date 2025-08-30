export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'breakfast' | 'lunch' | 'dinner' | 'snacks' | 'beverages';
  isVeg: boolean;
  isAvailable: boolean;
  image: string;
  preparationTime: number; // in minutes
  nutritionInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export interface Order {
  id: string;
  tokenNumber: number;
  userId: string;
  userName: string;
  items: {
    menuItem: MenuItem;
    quantity: number;
    customizations?: string[];
  }[];
  totalAmount: number;
  status: 'placed' | 'preparing' | 'ready' | 'delivered';
  orderTime: Date;
  pickupTime?: Date;
  qrCode: string;
  mealType: 'breakfast' | 'lunch' | 'dinner';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'staff';
  walletBalance: number;
}

export const mockMenuItems: MenuItem[] = [
  // Breakfast Items
  {
    id: '1',
    name: 'Aloo Paratha',
    description: 'Stuffed flatbread with spiced potato filling, served with curd and pickle',
    price: 40,
    category: 'breakfast',
    isVeg: true,
    isAvailable: true,
    image: '/placeholder.svg',
    preparationTime: 10,
    nutritionInfo: {
      calories: 320,
      protein: 8,
      carbs: 45,
      fat: 12
    }
  },
  {
    id: '2',
    name: 'Poha',
    description: 'Flattened rice with onions, curry leaves and spices',
    price: 25,
    category: 'breakfast',
    isVeg: true,
    isAvailable: true,
    image: '/placeholder.svg',
    preparationTime: 8,
    nutritionInfo: {
      calories: 250,
      protein: 6,
      carbs: 40,
      fat: 8
    }
  },
  {
    id: '3',
    name: 'Bread Omelette',
    description: 'Fluffy omelette with bread slices',
    price: 35,
    category: 'breakfast',
    isVeg: false,
    isAvailable: true,
    image: '/placeholder.svg',
    preparationTime: 7,
    nutritionInfo: {
      calories: 280,
      protein: 15,
      carbs: 25,
      fat: 15
    }
  },
  // Lunch Items
  {
    id: '4',
    name: 'Rajma Rice',
    description: 'Red kidney beans curry with steamed rice',
    price: 50,
    category: 'lunch',
    isVeg: true,
    isAvailable: true,
    image: '/placeholder.svg',
    preparationTime: 15,
    nutritionInfo: {
      calories: 380,
      protein: 14,
      carbs: 55,
      fat: 10
    }
  },
  {
    id: '5',
    name: 'Dal Rice',
    description: 'Yellow lentil curry with steamed basmati rice',
    price: 40,
    category: 'lunch',
    isVeg: true,
    isAvailable: true,
    image: '/placeholder.svg',
    preparationTime: 12,
    nutritionInfo: {
      calories: 320,
      protein: 12,
      carbs: 50,
      fat: 8
    }
  },
  {
    id: '6',
    name: 'Chole Bhature',
    description: 'Spicy chickpea curry with fried bread',
    price: 60,
    category: 'lunch',
    isVeg: true,
    isAvailable: true,
    image: '/placeholder.svg',
    preparationTime: 18,
    nutritionInfo: {
      calories: 450,
      protein: 15,
      carbs: 60,
      fat: 18
    }
  },
  {
    id: '7',
    name: 'Chicken Curry Rice',
    description: 'Boneless chicken curry with rice',
    price: 80,
    category: 'lunch',
    isVeg: false,
    isAvailable: true,
    image: '/placeholder.svg',
    preparationTime: 20,
    nutritionInfo: {
      calories: 420,
      protein: 25,
      carbs: 45,
      fat: 15
    }
  },
  // Dinner Items
  {
    id: '8',
    name: 'Paneer Butter Masala',
    description: 'Cottage cheese in rich tomato gravy with roti',
    price: 70,
    category: 'dinner',
    isVeg: true,
    isAvailable: true,
    image: '/placeholder.svg',
    preparationTime: 16,
    nutritionInfo: {
      calories: 400,
      protein: 18,
      carbs: 35,
      fat: 22
    }
  },
  {
    id: '9',
    name: 'Mixed Veg with Roti',
    description: 'Seasonal vegetables curry with fresh roti',
    price: 45,
    category: 'dinner',
    isVeg: true,
    isAvailable: true,
    image: '/placeholder.svg',
    preparationTime: 14,
    nutritionInfo: {
      calories: 300,
      protein: 10,
      carbs: 40,
      fat: 12
    }
  },
  // Snacks
  {
    id: '10',
    name: 'Samosa',
    description: 'Crispy triangular pastry with spiced potato filling',
    price: 15,
    category: 'snacks',
    isVeg: true,
    isAvailable: true,
    image: '/placeholder.svg',
    preparationTime: 5,
    nutritionInfo: {
      calories: 150,
      protein: 3,
      carbs: 18,
      fat: 8
    }
  },
  {
    id: '11',
    name: 'Maggi',
    description: 'Instant noodles with vegetables',
    price: 30,
    category: 'snacks',
    isVeg: true,
    isAvailable: true,
    image: '/placeholder.svg',
    preparationTime: 8,
    nutritionInfo: {
      calories: 290,
      protein: 8,
      carbs: 35,
      fat: 12
    }
  },
  // Beverages
  {
    id: '12',
    name: 'Chai',
    description: 'Traditional Indian tea with milk and spices',
    price: 10,
    category: 'beverages',
    isVeg: true,
    isAvailable: true,
    image: '/placeholder.svg',
    preparationTime: 3,
    nutritionInfo: {
      calories: 50,
      protein: 2,
      carbs: 8,
      fat: 2
    }
  },
  {
    id: '13',
    name: 'Lassi',
    description: 'Sweet yogurt drink',
    price: 25,
    category: 'beverages',
    isVeg: true,
    isAvailable: true,
    image: '/placeholder.svg',
    preparationTime: 4,
    nutritionInfo: {
      calories: 120,
      protein: 5,
      carbs: 18,
      fat: 3
    }
  }
];

export const mockOrders: Order[] = [
  {
    id: 'NSU001',
    tokenNumber: 101,
    userId: 'user1',
    userName: 'Arjun Kumar',
    items: [
      {
        menuItem: mockMenuItems[3], // Rajma Rice
        quantity: 1
      },
      {
        menuItem: mockMenuItems[11], // Chai
        quantity: 1
      }
    ],
    totalAmount: 60,
    status: 'preparing',
    orderTime: new Date('2024-01-15T12:30:00'),
    mealType: 'lunch',
    qrCode: 'NSU001'
  },
  {
    id: 'NSU002',
    tokenNumber: 102,
    userId: 'user2',
    userName: 'Priya Sharma',
    items: [
      {
        menuItem: mockMenuItems[0], // Aloo Paratha
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
    userName: 'Arjun Kumar',
    items: [
      {
        menuItem: mockMenuItems[7], // Paneer Butter Masala
        quantity: 1
      },
      {
        menuItem: mockMenuItems[12], // Lassi
        quantity: 1
      }
    ],
    totalAmount: 95,
    status: 'ready',
    orderTime: new Date('2024-01-15T19:45:00'),
    pickupTime: new Date('2024-01-15T20:15:00'),
    mealType: 'dinner',
    qrCode: 'NSU003'
  }
];

export const mockUser: User = {
  id: 'user1',
  name: 'Arjun Kumar',
  email: 'arjun.kumar@nsut.ac.in',
  role: 'user',
  walletBalance: 450
};

export const weeklyMenu = {
  monday: {
    breakfast: mockMenuItems.filter(item => item.category === 'breakfast'),
    lunch: mockMenuItems.filter(item => item.category === 'lunch'),
    dinner: mockMenuItems.filter(item => item.category === 'dinner')
  },
  tuesday: {
    breakfast: mockMenuItems.filter(item => item.category === 'breakfast'),
    lunch: mockMenuItems.filter(item => item.category === 'lunch'),
    dinner: mockMenuItems.filter(item => item.category === 'dinner')
  },
  wednesday: {
    breakfast: mockMenuItems.filter(item => item.category === 'breakfast'),
    lunch: mockMenuItems.filter(item => item.category === 'lunch'),
    dinner: mockMenuItems.filter(item => item.category === 'dinner')
  },
  thursday: {
    breakfast: mockMenuItems.filter(item => item.category === 'breakfast'),
    lunch: mockMenuItems.filter(item => item.category === 'lunch'),
    dinner: mockMenuItems.filter(item => item.category === 'dinner')
  },
  friday: {
    breakfast: mockMenuItems.filter(item => item.category === 'breakfast'),
    lunch: mockMenuItems.filter(item => item.category === 'lunch'),
    dinner: mockMenuItems.filter(item => item.category === 'dinner')
  },
  saturday: {
    breakfast: mockMenuItems.filter(item => item.category === 'breakfast'),
    lunch: mockMenuItems.filter(item => item.category === 'lunch'),
    dinner: mockMenuItems.filter(item => item.category === 'dinner')
  },
  sunday: {
    breakfast: mockMenuItems.filter(item => item.category === 'breakfast'),
    lunch: mockMenuItems.filter(item => item.category === 'lunch'),
    dinner: mockMenuItems.filter(item => item.category === 'dinner')
  }
};