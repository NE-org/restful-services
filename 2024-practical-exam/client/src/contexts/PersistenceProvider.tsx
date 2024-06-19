import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthState {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

const initialState: AuthState = {
  id: '',
  firstName: '',
  lastName: '',
  email: ''
};

export const AuthContext = createContext<{
  authState: AuthState;
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
}>({
  authState: initialState,
  setAuthState: () => { }
});

export const useAuthentication = () => useContext(AuthContext);

const PersistentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  /* 
  Set the persistence of state within the application 
  to maintain the state even after the page reloads
  */
  const [authState, setAuthState] = useState<AuthState>(() => {
    const savedState = localStorage.getItem('authState');
    return savedState ? JSON.parse(savedState) : initialState;
  });

  useEffect(() => {
    localStorage.setItem('authState', JSON.stringify(authState));
  }, [authState]);

  useEffect(() => {
    const handleStorageChange = () => {
      const savedState = localStorage.getItem('authState');
      if (savedState) {
        setAuthState(JSON.parse(savedState));
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

export default PersistentProvider;