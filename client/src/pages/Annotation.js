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
  const [ descFromReport, setDescFromReport ] = useState({ desc: '' })
  const [ annotationsFromMenu, setAnnotationsFromMenu ] = useState([])
  const [ incidentDateFromMenu, setIncidentDateFromMenu ] = useState(new Date())

  const handleReportData = (reportData) => {
    setDescFromReport(reportData)
    // console.log('report data from child',descFromReport)
  }

  const handleAnnotationsData = (annotationData) => {
    setAnnotationsFromMenu(annotationData)
    // console.log('annotation data from child', annotationsFromMenu);
  };

  const handleIncidentDate = (incidentDate) => {
    setIncidentDateFromMenu(incidentDate)
    console.log('incident date from child', incidentDateFromMenu)
  }

  // useEffect(() => {
  //   console.log('descFromReport useEffect', descFromReport);
  // }, [descFromReport]);

  // useEffect(() => {
  //   console.log('annotationsFromMenu useEffect', annotationsFromMenu);
  // }, [annotationsFromMenu]);

  return (
    <div style={{ display: 'flex' }}>
      {user && (
        <>
          <div style={{ flex: 7, marginRight: "1rem" }}>
            <ReportForm sendDescToParent={handleReportData} annotationsFromMenu={annotationsFromMenu} incidentDateFromMenu={incidentDateFromMenu}/>
          </div>
          <div style={{ flex: 3 }}>
            <DropdownMenu descFromReport={descFromReport} sendAnnotations={handleAnnotationsData} sendIncidentDate={handleIncidentDate}/>
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