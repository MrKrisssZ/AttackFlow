import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/UseAuthContext";
import { Link, useLocation } from "react-router-dom";

// components
import DropdownMenu from "../components/DropDownMenu";
import ReportForm from "../components/ReportForm";

const Annotation = () => {
  const { user } = useAuthContext();
  const location = useLocation();

  // writing annotation file
  const [ descFromReport, setDescFromReport ] = useState('')

  const handleReportData = (reportData) => {
    setDescFromReport(reportData)
    // console.log('report data from child',descFromReport)
  }

  useEffect(() => {
    console.log('descFromReport useEffect', descFromReport);
  }, [descFromReport]);

  return (
    <div style={{ display: 'flex' }}>
      {user && (
        <>
          <div style={{ flex: 7, marginRight: "1rem" }}>
            <ReportForm sendDescToParent={handleReportData}></ReportForm>
          </div>
          <div style={{ flex: 3 }}>
            <DropdownMenu desc={descFromReport}></DropdownMenu>
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