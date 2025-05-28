export const Filter = ({
  name,
  onclick,
  index,
  active,
}: {
  name: string;
  onclick: (index: number) => void;
  index: number;
  active: boolean;
}) => {
  return (
    <button
      onClick={() => onclick(index)}
      className={`flex p-3 w-fit h-fit rounded-md border-[1px] border-black text-[16px] hover:bg-black hover:text-white ${
        active ? "bg-black text-white" : "text-black"
      }`}>
      {name}
    </button>
  );
};
