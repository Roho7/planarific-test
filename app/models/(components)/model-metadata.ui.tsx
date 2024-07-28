import Button from "@/app/(components)/button";
import useModel from "@/app/_providers/useModel";
import clsx from "clsx";
import React, { useState } from "react";

type Props = {
  showMetadata: boolean;
  setShowMetadata: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModelMetadata = ({ showMetadata, setShowMetadata }: Props) => {
  const { activeModel } = useModel();

  return (
    <div
      className={clsx(
        "w-full bg-gray-200 transition-all ease-in-out relative",
        showMetadata ? "flex-grow" : "h-0",
      )}>
      <Button
        buttonProps={{ onClick: () => setShowMetadata(!showMetadata) }}
        className="bg-[#e47f63] py-1 px-2 rounded-md absolute left-2 -top-12">
        Toggle
      </Button>
      <table className={clsx("w-full")}>
        <tbody className="">
          <tr className="bg-gray-300 text-gray-600">
            <th>State</th>
            <th>City</th>
            <th>Addresses</th>
            <th>Postal Code</th>
          </tr>
          <tr className="text-center text-gray-800">
            <td>{activeModel?.state}</td>
            <td>{activeModel?.city}</td>
            <td>
              {activeModel?.address1}
              {activeModel?.address2 && `, ${activeModel?.address2}`}
            </td>
            <td>{activeModel?.postal_code}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ModelMetadata;
