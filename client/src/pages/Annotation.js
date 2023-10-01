// import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/UseAuthContext";
import { Link, useLocation } from "react-router-dom";
import ReportForm from "../components/ReportForm";

// components
import DropdownMenu from "../components/DropDownMenu";

const Annotation = () => {
  const { user } = useAuthContext();
  const location = useLocation();

  return (
    <div style={{ display: 'flex' }}>
      {user && (
        <>
          <div style={{ flex: 7, marginRight: "1rem" }}>
            <ReportForm></ReportForm>
          </div>
          <div style={{ flex: 3 }}>
            <DropdownMenu></DropdownMenu>
          </div>
        </>
      )}
      {!user && (
        <>
          <h3 className="text-lg font-semibold mb-4">Not signed in</h3>
          <p>
            <Link to="/login" state={{ redirectTo: location }}>
              <button className="text-primary">Login</button>
            </Link>{" "}
            to use the annotation function.
          </p>
        </>
      )}
    </div>
  );
};

export default Annotation;
