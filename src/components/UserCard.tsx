'use client';

import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const UserCard = ({
  name,
  desc,
  avatarPath,
}: {
  name: string;
  desc: string;
  avatarPath: string;
}) => {
  const fallback =
    name.split(' ').length > 1
      ? name?.charAt(0) + name?.split(' ')[1].charAt(0)
      : name?.charAt(0);

  return (
    <Card className="hover:translate-y-[-2px] cursor-pointer">
      <CardHeader className="flex flex-row gap-5 items-center p-4">
        <Avatar className="w-[64px] h-[64px]">
          <AvatarImage src={avatarPath} alt="user avatar" />
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-2">
          <CardTitle>{name}</CardTitle>
          <CardDescription>{desc}</CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
};

export default UserCard;
