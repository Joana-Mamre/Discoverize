import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getProduct } from './products.js';

const STORAGE_KEY = 'atelier-local-demo-v1';
const AppDataContext = createContext(null);

const createInitialData = () => ({
  account: null,
  user: null,
  favorites: [],
  cart: [],
  bookings: [],
  orders: [],
});

const getErrorMessage = (error) => (error instanceof Error ? error.message : String(error));

export function AppDataProvider({ children }) {
  const [data, setData] = useState(createInitialData);
  const [ready, setReady] = useState(false);
  const [storageError, setStorageError] = useState(null);
  const [storageErrorType, setStorageErrorType] = useState(null);

  useEffect(() => {
    let active = true;

    const loadData = async () => {
      try {
        const storedData = await AsyncStorage.getItem(STORAGE_KEY);
        if (active && storedData) {
          setData({ ...createInitialData(), ...JSON.parse(storedData) });
        }
      } catch (error) {
        if (active) {
          setStorageError(`Could not load local demo data: ${getErrorMessage(error)}`);
          setStorageErrorType('load');
        }
      } finally {
        if (active) setReady(true);
      }
    };

    loadData();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!ready || storageError) return;

    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data)).catch((error) => {
      setStorageError(`Could not save local demo data: ${getErrorMessage(error)}`);
      setStorageErrorType('save');
    });
  }, [data, ready, storageError]);

  const createDemoAccount = useCallback(({ name, email }) => {
    const account = { name: name.trim(), email: email.trim().toLowerCase(), isGuest: false };
    setData((current) => ({ ...current, account, user: account }));
  }, []);

  const signInDemo = useCallback(() => {
    setData((current) => current.account ? { ...current, user: current.account } : current);
  }, []);

  const continueAsGuest = useCallback(() => {
    setData((current) => ({
      ...current,
      user: { name: 'Guest member', email: '', isGuest: true },
    }));
  }, []);

  const signOut = useCallback(() => {
    setData((current) => ({ ...current, user: null }));
  }, []);

  const updateProfile = useCallback((profile) => {
    setData((current) => {
      if (!current.user) return current;
      const user = { ...current.user, ...profile };
      return {
        ...current,
        user,
        account: user.isGuest ? current.account : user,
      };
    });
  }, []);

  const toggleFavorite = useCallback((productId) => {
    setData((current) => ({
      ...current,
      favorites: current.favorites.includes(productId)
        ? current.favorites.filter((id) => id !== productId)
        : [...current.favorites, productId],
    }));
  }, []);

  const addToCart = useCallback((productId, size) => {
    setData((current) => {
      const existing = current.cart.find((item) => item.productId === productId && item.size === size);
      return {
        ...current,
        cart: existing
          ? current.cart.map((item) =>
              item === existing ? { ...item, quantity: item.quantity + 1 } : item,
            )
          : [...current.cart, { productId, size, quantity: 1 }],
      };
    });
  }, []);

  const updateCartQuantity = useCallback((productId, size, quantity) => {
    setData((current) => ({
      ...current,
      cart: quantity < 1
        ? current.cart.filter((item) => item.productId !== productId || item.size !== size)
        : current.cart.map((item) =>
            item.productId === productId && item.size === size ? { ...item, quantity } : item,
          ),
    }));
  }, []);

  const removeFromCart = useCallback((productId, size) => {
    updateCartQuantity(productId, size, 0);
  }, [updateCartQuantity]);

  const addBooking = useCallback((booking) => {
    const savedBooking = {
      ...booking,
      id: `FIT-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      status: 'Demo request',
    };
    setData((current) => ({ ...current, bookings: [savedBooking, ...current.bookings] }));
    return savedBooking;
  }, []);

  const placeDemoOrder = useCallback((shipping) => {
    const items = data.cart.flatMap((item) => {
      const product = getProduct(item.productId);
      return product ? [{ ...product, size: item.size, quantity: item.quantity }] : [];
    });
    if (!items.length) return null;

    const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
    const order = {
      id: `AT-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      items,
      subtotal,
      shipping: { ...shipping },
      status: 'Demo order · no payment',
    };

    setData((current) => ({ ...current, cart: [], orders: [order, ...current.orders] }));
    return order;
  }, [data.cart]);

  const retryStorage = useCallback(async () => {
    try {
      if (storageErrorType === 'load') {
        const storedData = await AsyncStorage.getItem(STORAGE_KEY);
        setData(storedData ? { ...createInitialData(), ...JSON.parse(storedData) } : createInitialData());
        setReady(true);
      } else if (storageErrorType === 'reset') {
        await AsyncStorage.removeItem(STORAGE_KEY);
        setData(createInitialData());
        setReady(true);
      } else {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      }
      setStorageError(null);
      setStorageErrorType(null);
    } catch (error) {
      const action = storageErrorType === 'load'
        ? 'load'
        : storageErrorType === 'reset'
          ? 'reset'
          : 'save';
      setStorageError(`Could not ${action} local demo data: ${getErrorMessage(error)}`);
    }
  }, [data, storageErrorType]);

  const resetLocalDemo = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setData(createInitialData());
      setStorageError(null);
      setStorageErrorType(null);
      setReady(true);
    } catch (error) {
      setStorageError(`Could not reset local demo data: ${getErrorMessage(error)}`);
      setStorageErrorType('reset');
    }
  }, []);

  const value = useMemo(() => ({
    ...data,
    ready,
    storageError,
    storageErrorType,
    createDemoAccount,
    signInDemo,
    continueAsGuest,
    signOut,
    updateProfile,
    toggleFavorite,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    addBooking,
    placeDemoOrder,
    retryStorage,
    resetLocalDemo,
  }), [
    data,
    ready,
    storageError,
    storageErrorType,
    createDemoAccount,
    signInDemo,
    continueAsGuest,
    signOut,
    updateProfile,
    toggleFavorite,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    addBooking,
    placeDemoOrder,
    retryStorage,
    resetLocalDemo,
  ]);

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const context = useContext(AppDataContext);
  if (!context) throw new Error('useAppData must be used within AppDataProvider.');
  return context;
}
