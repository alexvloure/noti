'use client';

import clientsArr from '@/data/clients.json';
import React from 'react';
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
  const [clients, setClients] = React.useState<Client[]>(clientsArr);

  return (
    <ClientContext.Provider value={{ clients, setClients }}>
      {children}
    </ClientContext.Provider>
  );
};
