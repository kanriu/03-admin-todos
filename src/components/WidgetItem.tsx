import { FC } from "react";

interface Props {
  title: string;
  children: React.ReactNode;
}

export const WidgetItem: FC<Props> = ({ title, children }) => {
  return (
    <div className="md:col-span-2 lg:col-span-1">
      <div className="h-full py-8 px-6 space-y-6 rounded-xl border border-gray-200 bg-white">
        <div className="flex flex-col">
          <h5 className="text-xl text-gray-600 text-center">{title}</h5>
          <div className="mt-2 flex flex-col justify-center gap-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};