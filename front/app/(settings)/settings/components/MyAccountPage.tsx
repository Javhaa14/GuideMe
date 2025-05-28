import { Password } from "./Password";
import { Personal } from "./Personal";

export function MyAccountPage() {
  return (
    <div className="py-9 flex flex-col gap-8">
      <h3 className="text-[#090909B] text-[24px] font-semibold">My account</h3>
      <Personal />
      <Password />
    </div>
  );
}
