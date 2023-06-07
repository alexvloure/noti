import { BellRing, Check } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const UserCard = ({
  name,
  desc,
  imagePath,
}: {
  name: string;
  desc: string;
  imagePath: string;
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row gap-5 items-center p-4">
        <Avatar className="w-[64px] h-[64px]">
          <AvatarImage src={imagePath} alt="user avatar" />
          <AvatarFallback>
            {name?.charAt(0) + name?.split(' ')[1].charAt(0)}
          </AvatarFallback>
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
