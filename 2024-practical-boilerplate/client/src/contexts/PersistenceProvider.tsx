import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthState {
  id: string;
  fullName: string;
  email: string;
}

const initialState: AuthState = {
  id: '',
  fullName: '',
  email: ''
};

const AuthContext = createContext<{
  authState: AuthState;
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
}>({
  authState: initialState,
  setAuthState: () => { }
});

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthentication = () => useContext(AuthContext);

const PersistentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(() => {
    const savedState = localStorage.getItem('authState');
    return savedState ? JSON.parse(savedState) : initialState;
  });

  useEffect(() => {
    localStorage.setItem('authState', JSON.stringify(authState));
  }, [authState]);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

export default PersistentProvider;
