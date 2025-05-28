export const Filter = ({
  name,
  onclick,
  index,
  clicked,
}: {
  name: string;
  onclick: (index: number) => void;
  index: number;
  clicked: boolean;
}) => {
  return (
    <button
      onClick={() => onclick(index)}
      className={`flex p-3 w-fit h-fit rounded-md border-[1px] border-black text-[16px] hover:bg-black text-black hover:text-white ${
        clicked && "bg-black text-white"
      }`}>
      {name}
    </button>
  );
};
