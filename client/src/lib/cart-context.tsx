import { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product } from '@shared/schema';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  guestCount: number;
  location: string;
  includeDamageWaiver: boolean;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'SET_GUEST_COUNT'; payload: number }
  | { type: 'SET_LOCATION'; payload: string }
  | { type: 'SET_DAMAGE_WAIVER'; payload: boolean }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' };

const initialState: CartState = {
  items: [],
  isOpen: false,
  guestCount: 50,
  location: '',
  includeDamageWaiver: false,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.product.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.product.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { product: action.payload, quantity: 1 }],
      };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.product.id !== action.payload),
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.product.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ).filter(item => item.quantity > 0),
      };
    case 'SET_GUEST_COUNT':
      return {
        ...state,
        guestCount: action.payload,
      };
    case 'SET_LOCATION':
      return {
        ...state,
        location: action.payload,
      };
    case 'SET_DAMAGE_WAIVER':
      return {
        ...state,
        includeDamageWaiver: action.payload,
      };
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      };
    case 'TOGGLE_CART':
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    case 'OPEN_CART':
      return {
        ...state,
        isOpen: true,
      };
    case 'CLOSE_CART':
      return {
        ...state,
        isOpen: false,
      };
    default:
      return state;
  }
}

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export function useCartHelpers() {
  const { state, dispatch } = useCart();

  const addItem = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const removeItem = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const openCart = () => {
    dispatch({ type: 'OPEN_CART' });
  };

  const closeCart = () => {
    dispatch({ type: 'CLOSE_CART' });
  };

  const getItemCount = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const setGuestCount = (count: number) => {
    dispatch({ type: 'SET_GUEST_COUNT', payload: count });
  };

  const setLocation = (location: string) => {
    dispatch({ type: 'SET_LOCATION', payload: location });
  };

  const setDamageWaiver = (include: boolean) => {
    dispatch({ type: 'SET_DAMAGE_WAIVER', payload: include });
  };

  const getSubtotal = () => {
    return state.items.reduce((total, item) => {
      return total + (parseFloat(item.product.price) * item.quantity);
    }, 0);
  };

  const calculateDeliveryFee = () => {
    // Base delivery fee with distance calculation
    const baseDelivery = 50;
    const isAustinArea = state.location.toLowerCase().includes('austin') || 
                        state.location.toLowerCase().includes('tx');
    return isAustinArea ? baseDelivery : baseDelivery + 25;
  };

  const calculateSetupFee = () => {
    // Setup fee based on number of items and complexity
    const itemCount = getItemCount();
    const baseSetup = 75;
    if (itemCount > 20) return baseSetup + 50;
    if (itemCount > 10) return baseSetup + 25;
    return baseSetup;
  };

  const getQuoteTotal = () => {
    const subtotal = getSubtotal();
    const delivery = calculateDeliveryFee();
    const setup = calculateSetupFee();
    const damageWaiver = state.includeDamageWaiver ? 25 : 0;
    return subtotal + delivery + setup + damageWaiver;
  };

  const getSuggestedQuantity = (product: Product) => {
    const { guestCount } = state;
    
    switch (product.category) {
      case 'seating':
        return Math.ceil(guestCount / 8); // 8 chairs per table
      case 'tables':
        return Math.ceil(guestCount / 8); // 8 guests per table
      case 'linens':
        return Math.ceil(guestCount / 8); // One per table
      case 'lighting':
        return Math.ceil(guestCount / 25); // One light per 25 guests
      default:
        return 1;
    }
  };

  const getMissingRecommendations = () => {
    const hasSeating = state.items.some(item => item.product.category === 'seating');
    const hasTables = state.items.some(item => item.product.category === 'tables');
    const hasLinens = state.items.some(item => item.product.category === 'linens');
    const hasLighting = state.items.some(item => item.product.category === 'lighting');

    const recommendations = [];
    if (!hasSeating) recommendations.push('seating');
    if (!hasTables) recommendations.push('tables');
    if (!hasLinens) recommendations.push('linens');
    if (!hasLighting) recommendations.push('lighting');
    
    return recommendations;
  };

  return {
    items: state.items,
    isOpen: state.isOpen,
    guestCount: state.guestCount,
    location: state.location,
    includeDamageWaiver: state.includeDamageWaiver,
    addItem,
    removeItem,
    updateQuantity,
    setGuestCount,
    setLocation,
    setDamageWaiver,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
    getItemCount,
    getSubtotal,
    calculateDeliveryFee,
    calculateSetupFee,
    getQuoteTotal,
    getSuggestedQuantity,
    getMissingRecommendations,
  };
}
