'use client';

import UserCard from '@/components/UserCard';
import AddClient from '@/components/AddClient';
import Client from '@/types/client';
import { useContext } from 'react';
import { ClientContext } from '@/context/clients';

const Dashboard = () => {
  const { clients } = useContext(ClientContext);

  return (
    <div className="max-w-7xl mx-auto px-4 pb-4">
      <div className="mt-14">
        <h1 className="text-[2.50rem] font-semibold">Clients</h1>
        <div className="bg-border my-12 h-[1px]" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AddClient />
          {clients?.map((client: Client) => (
            <UserCard
              key={client.id}
              name={client.name}
              desc={client.desc}
              avatarPath={client.avatar}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
