"use client";

import { setCookie } from "cookies-next";
import { FC, useState } from "react";

interface Props {
  currentTab?: number;
  tabOptions?: number[];
}

export const TabBar: FC<Props> = ({
  currentTab = 1,
  tabOptions = [1, 2, 3, 4],
}) => {
  const [selected, setSelected] = useState(currentTab);

  const onTabSelected = (tab: number) => {
    setSelected(tab);
    setCookie("selectedTab", tab);
  };

  return (
    <div
      className={`grid w-full space-x-2 rounded-xl bg-gray-200 p-2 ${
        "grid-cols-" + tabOptions.length
      }`}
    >
      {tabOptions.map((tab) => (
        <div key={tab}>
          <input
            type="radio"
            id={tab.toString()}
            className="peer hidden"
            checked={selected === tab}
            onChange={() => {}}
          />
          <label
            onClick={() => onTabSelected(tab)}
            className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
          >
            {tab}
          </label>
        </div>
      ))}
    </div>
  );
};
