'use client';

import { Plus } from 'lucide-react';
import { Card, CardHeader } from './ui/card';

const AddCard = () => {
  return (
    <Card className="hover:translate-y-[-2px] cursor-pointer min-h-[98px]">
      <CardHeader className="flex flex-col gap-5 h-full items-center justify-center p-4">
        <Plus />
      </CardHeader>
    </Card>
  );
};

export default AddCard;
