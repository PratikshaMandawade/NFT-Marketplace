import React from "react";

//INTERNAL IMPORT
import { TableTwo } from "../index";

const AdminCreator = ({ creators }) => {
  return (
    <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
      <TableTwo creators={creators} />
    </div>
  );
};

export default AdminCreator;
