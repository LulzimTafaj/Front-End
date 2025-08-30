'use client';

import AddIcon from '@/components/icons/AddIcon';
import TicIcon from './icons/TicIcon';

type ButtonProps = {
  text: string;
  action: string;
    onClick?: () => void;
}

export default function Button({ text, action, onClick } : ButtonProps) {

  return (
    <button
      onClick={onClick} 
      className="text-white bg-[#1E6F9F] w-full py-4 text-lg font-bold rounded-md mt-10 cursor-pointer flex items-center justify-center gap-2">
      {text}
      {action == "Update" ? <TicIcon /> : <AddIcon />}
    </button>
  );
}
