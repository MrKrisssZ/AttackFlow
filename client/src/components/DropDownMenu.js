import { v4 as uuidv4 } from 'uuid'
import { useState, useMemo, useEffect } from "react";
import { categoriesByTactics } from '../constants/index.tsx'
import { techniqueByCategoriesEnterprise } from '../constants/enterprise.tsx'
import { techniqueByCategoriesMobile } from '../constants/mobile.tsx'
import { techniqueByCategoriesICS } from '../constants/ICS.tsx'

const DropdownMenu = ({descFromReport, sendAnnotations, sendIncidentDate }) => {
  const [incidentDate, setIncidentDate] = useState(new Date());
  const [tactics, setTactics] = useState("Default");
  const [categories, setCategories] = useState("");
  const [techniques, setTechniques] = useState("");
  const [annotations, setAnnotations] = useState([]);
  const [type, setType] = useState("Default")

  const categoryOptions = useMemo(() => {
    if (!tactics) {
      return categoriesByTactics.Default.map((option) => (
        <option value={option} key={option}>
          {option}
        </option>
      ));
    }
    return categoriesByTactics[tactics].map((option) => (
      <option value={option} key={option}>
        {option}
      </option>
    ));
  }, [tactics]);

  const techniqueOptions = useMemo(() => {
    if (!tactics || !categories) {
      return techniqueByCategoriesEnterprise.Default.map((option) => (
        <option value={option} key={option}>
          {option}
        </option>
      ));
    }
    // create other conditions for the techniques for all different tactics
    // tactics: Enterprise
    if (
      tactics === "Enterprise" &&
      (categories === "Reconnaissance" ||
        categories === "ResourceDevelopment" ||
        categories === "InitialAccess" ||
        categories === "Execution" ||
        categories === "Persistence" ||
        categories === "PrivilegeEscalation" ||
        categories === "CredentialAccess" ||
        categories === "Discovery" ||
        categories === "LateralMovement" ||
        categories === "Collection" ||
        categories === "CommandAndControl" ||
        categories === "Exfiltration" ||
        categories === "Impact")
    ) {
      return techniqueByCategoriesEnterprise[categories].map((option) => (
        <option value={option} key={option}>
          {option}
        </option>
      ));
    }

    // tactics: Mobile
    if (
      tactics === "Mobile" &&
      (categories === "InitialAccess" ||
        categories === "Execution" ||
        categories === "Persistence" ||
        categories === "PrivilegeEscalation" ||
        categories === "DefenseEvasion" ||
        categories === "CredentialAccess" ||
        categories === "Discovery" ||
        categories === "LateralMovement" ||
        categories === "Collection" ||
        categories === "CommandAndControl" ||
        categories === "Exfiltration" ||
        categories === "Impact")
    ) {
      return techniqueByCategoriesMobile[categories].map((option) => (
        <option value={option} key={option}>
          {option}
        </option>
      ));
    }
    // tactics: ICS
    if (
      tactics === "ICS" &&
      (categories === "InitialAccess" ||
        categories === "Execution" ||
        categories === "Persistence" ||
        categories === "PrivilegeEscalation" ||
        categories === "Evasion" ||
        categories === "Discovery" ||
        categories === "LateralMovement" ||
        categories === "Collection" ||
        categories === "CommandAndControl" ||
        categories === "InhibitResponseFunction" ||
        categories === "ImpairProcessControl" ||
        categories === "Impact")
    ) {
      return techniqueByCategoriesICS[categories].map((option) => (
        <option value={option} key={option}>
          {option}
        </option>
      ));
    }
  }, [tactics, categories]);

  const generateUniqueID = () => {
    const uniqueID = uuidv4();
    return type + '--' + uniqueID
  }

  // add the selected text and other attributes to annotations
  const handleAdd = (e) => {
    e.preventDefault();
    // console.log('tactics: ', tactics, 'categories: ', categories, 'techniques: ', techniques);
    // console.log('descFromParent', descFromReport)
    if (descFromReport && type && tactics && categories && techniques) {
      const currTime = new Date()
      const formattedTime = currTime.toISOString()

      const annotation = {
        type,
        spec_version: '2.1',
        created: formattedTime,
        modified: formattedTime,
        id: generateUniqueID(),        
        tactics,
        categories,
        techniques,
        desc: descFromReport
      }
      // add new annotation to the list
      setAnnotations([...annotations, annotation]);

      // reset form fields
      setTactics("Default")
      setCategories("")
      setTechniques("")
      setType("Default")
    }
  };

  // remove the selected annotation
  const handleRemove = (indexToRemove) => {
    // filter out the annotation with specified index
    const updatedAnnotations = annotations.filter((_, index) => index !== indexToRemove)
    // update the annotation state
    setAnnotations(updatedAnnotations)
  }

  // useEffect(() => {
  //   console.log('handleClick', annotations);
  // }, [annotations]);

  // send the annotations to the report
  const handleFinish = () => {
    // console.log('sending annotations to parent', annotations)
    sendAnnotations(annotations)
    sendIncidentDate(incidentDate)
    
    // reset form fields
    setIncidentDate(new Date())
    setTactics("Default")
    setCategories("")
    setTechniques("")
    setType("Default")
  }

  // useEffect(() => {
  //   console.log('handleClick', annotations);
  // }, [annotations]);

  return (
    <>
      <div>
        <h1>Annotation</h1>
      </div>
      <div>
        <form onSubmit={handleAdd}>
          <div>
            <label>Incident date: </label>
            <input 
              type='date' 
              id='incidentDate' 
              max={new Date().toISOString().split('T')[0]} 
              value={incidentDate}
              onChange={(e) => setIncidentDate(e.target.value)}
            />
          </div>
          <div>
            <p>Type</p>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              name="type"
              id="type"
            >
              <option value="Default">Type</option>
              <option value="attach-pattern">Attack Pattern</option>
              <option value="campaign">Campaign</option>
              <option value="course-of-action">Cost of Action</option>
              <option value="grouping">Grouping</option>
              <option value="identity">Identity</option>
              <option value="incident">Incident</option>
              <option value="indicator">Indicator</option>
              <option value="infrastructure">Infrastructure</option>
              <option value="intrusion-set">Intrusion Set</option>
              <option value="indicator">Indicator</option>
              <option value="location">Location</option>
              <option value="malware">Malware</option>
              <option value="location">Location</option>
              <option value="malware-analysis">Malware Analysis</option>
              <option value="note">Note</option>
              <option value="observed-data">Observed Data</option>
              <option value="opinion">Opinion</option>
              <option value="report">Report</option>
              <option value="threat-actor">Threat Actor</option>
              <option value="tool">Tool</option>
              <option value="vulnerability">Vulnerability</option>
            </select>
          </div>
          <div>
            <p>Tactics</p>
            <select
              value={tactics}
              onChange={(e) => setTactics(e.target.value)}
              name="tactics"
              id="tactics"
            >
              <option value="Default">Tactics</option>
              <option value="Enterprise">Enterprise</option>
              <option value="Mobile">Mobile</option>
              <option value="ICS">ICS</option>
            </select>
          </div>
          <div>
            <p>Categories</p>
            <select
              defaultValue={categories}
              onChange={(e) => setCategories(e.target.value)}
              name="categories"
              id="categories"
            >
              {categoryOptions}
            </select>
          </div>
          <div>
            <p>Techniques</p>
            <select
              defaultValue={techniques}
              onChange={(e) => setTechniques(e.target.value)}
              name="subtechniques"
              id="techniques"
            >
              {techniqueOptions}
            </select>
          </div>
          <button type="submit">Add</button>
        </form>
      </div>
      <div>
        <h1>Stored annotation</h1>
        <ol>
          {annotations.map((annotation, index) => (
            <li key={index}>
              <strong>Description: </strong>{ annotation.desc }<br />
              <strong>Type: </strong>{ annotation.type }<br />
              <strong>Specification Version: </strong>{ annotation.spec_version }<br />
              <strong>ID: </strong>{ annotation.id }<br />
              <strong>Created: </strong>{ annotation.created }<br />
              <strong>Modified: </strong>{ annotation.modified }<br />
              <strong>Tactics: </strong>{ annotation.tactics }<br />
              <strong>Categories: </strong>{ annotation.categories }<br />
              <strong>Techniques: </strong>{ annotation.techniques }<br />
              <button onClick={() => handleRemove(index)}>Remove</button>
            </li>
          ))}
        </ol>
        <button className="text-primary" onClick={ handleFinish }>Finish Annotation</button>
      </div>
    </>
  );
};

export default DropdownMenu;