import { useState, useMemo } from "react";
import { categoriesByTactics } from '../constants/index.tsx'
import { techniqueByCategoriesEnterprise } from '../constants/enterprise.tsx'
import { techniqueByCategoriesMobile } from '../constants/mobile.tsx'
import { techniqueByCategoriesICS } from '../constants/ICS.tsx'

const DropdownMenu = ( descFromReport ) => {
  const [incidentDate, setIncidentDate] = useState(new Date());
  const [tactics, setTactics] = useState("Default");
  const [categories, setCategories] = useState("");
  const [techniques, setTechniques] = useState("");
  const [subtechniques, setSubtechniques] = useState("");
  const [description, setDescription] = useState("");

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
    // To-do: create other conditions for the techniques for all different tactics
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

  const handleAdd = (e) => {
    e.preventDefault();
    console.log('tactics: ', tactics, 'categories: ', categories, 'techniques: ', techniques);
    console.log('descFromParent', descFromReport.desc)
    // Add your logic here for handling the "Add" button click
  };

  return (
    <>
      <div>
        <h1>Annotation</h1>
      </div>
      <div>
        <form onSubmit={handleAdd}>
          <div>
            <p>Tactics</p>
            <select
              defaultValue={tactics}
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
          <button type="submit">OK</button>
        </form>
      </div>
    </>
  );
};

export default DropdownMenu;