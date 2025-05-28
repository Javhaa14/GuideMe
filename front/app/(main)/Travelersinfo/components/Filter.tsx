export const Filter = ({ name }: { name: string }) => {
  return (
    <button className="flex p-3 w-fit h-fit rounded-md border-[1px] border-black text-[16px] text-black">
      {name}
    </button>
  );
};
