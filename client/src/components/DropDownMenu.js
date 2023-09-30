import { useState, useMemo } from 'react'
// for displaying different option according to the previous level of the architecture
// tactics -> categories
const categoriesByTactics = {
    Default: ['Categories'],
    Enterprise: ['Categories', 'Reconnaissance', 'Resource Development' ,'InitialAccess', 'Execution', 'Persistence', 'PrivilegeEscalation', 'DefenseEvasion', 'CredentialAccess', 'Discovery', 'LateralMovement', 'Collection', 'CommandandControl', 'Exfiltration', 'Impact'],
    Mobile: ['Categories', 'InitialAccess', 'Execution', 'Persistence', 'PrivilegeEscalation', 'DefenseEvasion', 'CredentialAccess', 'Discovery', 'LateralMovement', 'Collection', 'CommandandControl', 'Exfiltration', 'Impact'],
    ICS: ['Categories', 'InitialAccess', 'Execution', 'Persistence', 'PrivilegeEscalation', 'Evasion', 'Discovery', 'LateralMovement', 'Collection', 'Command and Control', 'InhibitResponseFunction', 'ImpairProcessControl', 'Impact'],
};

// categories -> techniques by different tactics
// since same techniques under different tactics with different techID
// To-do: complete the dictionary for all categories with techniques
const techniqueByCategoriesEnterprise = {
    Default: ['Techniques'],
    Reconnaissance: ['Techniques', 'ActiveScanning', '...'],
}

const techniqueByCategoriesMobile = {
    InitialAccess: ['Techniques', 'Drive-ByCompromise', '...'],
}

const techniqueByCategoriesICS = {
    InitialAccess: ['Techniques', 'Drive-ByCompromise', 'ExploitPublicFacingApplication', '...'],
}
const DropdownMenu = () => {
    const [ incidentDate, setIncidentDate ] = useState(new Date());
    const [ tactics, setTactics ] = useState('');
    const [ categories, setCategories ] = useState('');
    const [ techniques, setTechniques ] = useState('');
    const [ description, setDescription ] = useState('');

    const categoryOptions = useMemo(() => {
        if (!tactics) {
            return categoriesByTactics.Default.map((option) => (
                <option value={ option } key={ option }>
                    { option }
                </option>
            ));
        }
        return categoriesByTactics[tactics].map((option) => (
            <option value={ option } key={ option }>
                { option }
            </option>
        ));
    }, [tactics]);

    const techniqueOptions = useMemo(() => {
        if (!tactics || !categories) {
            return techniqueByCategoriesEnterprise.Default.map((option) => (
                <option value= { option } key={ option }>
                    {option }
                </option>
            ));
        }
        // To-do: create other conditions for the techniques for all different tactics
        // tactics: Enterprise
        if (tactics == 'Enterprise' && categories == 'Reconnaissance') {
            return techniqueByCategoriesEnterprise[categories].map((option) => (
                <option value = { option } key={ option }>
                    { option }
                </option>
            ))
        }
        
        // tactics: Mobile
        if (tactics == 'Mobile' && categories == 'InitialAccess') {
            return techniqueByCategoriesMobile[categories].map((option) => (
                <option value= { option } key={ option }>
                    { option }
                </option>
            ))
        }
        // tactics: ICS
        if (tactics == 'ICS' && categories == 'InitialAccess') {
            return techniqueByCategoriesICS[categories].map((option) => (
                <option value = { option } key={ option }>
                    { option }
                </option>
            ))
        }
    }, [tactics, categories]);
        
    return (
        <>
            <div>
                <h1>
                    Annotation
                </h1>
            </div>
            <div>
                <form>
                    <div>
                        <p>Tactics</p>
                        <select
                            defaultValue={ tactics }
                            onChange={(e) => setTactics(e.target.value)}
                            name='tactics'
                            id='tactics'
                        >
                            <option value='Default'>Tactics</option>
                            <option value='Enterprise'>Enterprise</option>
                            <option value='Mobile'>Mobile</option>
                            <option value='ICS'>ICS</option>
                        </select>
                        <select
                            defaultValue={ categories }
                            onChange={(e) => setCategories(e.target.value)}
                            name='categories'
                            id='categories'  
                        >
                            { categoryOptions }
                        </select>

                        <p>Techniques</p>
                        <select
                            defaultValue={ techniques }
                            onChange={(e) => setTechniques(e.target.value)}
                            name='subtechniques'
                            id='techniques'
                        >
                            { techniqueOptions }
                        </select>
                    </div>
                    <button type='submit'>
                        OK
                    </button>
                </form>
            </div>
        </>
    );
};

export default DropdownMenu;