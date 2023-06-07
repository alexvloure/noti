import * as users from '@/data/users.json';
import UserCard from '@/components/UserCard';

const dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="mt-14">
        <h1 className="text-[2.50rem] font-semibold">Clients</h1>
        <div className="bg-slate-800 text-slate-200 my-12 h-[1px]" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {users.map((user) => (
            <UserCard
              key={user.id}
              name={user.name}
              desc={user.desc}
              imagePath={user.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default dashboard;
