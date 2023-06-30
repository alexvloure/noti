'use client';

import React, { useEffect } from 'react';
import Client from '@/types/client';

export const ClientContext = React.createContext({
  clients: [] as Client[],
  setClients: (() => {}) as React.Dispatch<React.SetStateAction<Client[]>>,
});

export const ClientContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [clients, setClients] = React.useState<Client[]>([]);

  const fetchClients = async () => {
    const response = await fetch('/api/clients', {
      method: 'GET',
    });
    const data = await response.json();
    setClients(data);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <ClientContext.Provider value={{ clients, setClients }}>
      {children}
    </ClientContext.Provider>
  );
};
