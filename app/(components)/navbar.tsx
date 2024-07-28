"use client";
import React from "react";
import AuthorizedImage from "./authorized-image";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className="p-2 bg-planarific-200 w-full">
      <div className="w-40">
        <AuthorizedImage
          src="https://fedevtest.azurewebsites.net/planarific.webp"
          alt="logo"
        />
      </div>
    </div>
  );
};

export default Navbar;
