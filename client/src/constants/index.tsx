// for displaying different option according to the previous level of the architecture
// tactics -> categories
export const categoriesByTactics = {
    Default: ["Categories"],
    Enterprise: [
      "Categories",
      "Reconnaissance(TA0043)",
      "ResourceDevelopment(TA0042)",
      "InitialAccess(TA0001)",
      "Execution(TA0002)",
      "Persistence(TA0003)",
      "PrivilegeEscalation(TA0004)",
      "DefenseEvasion(TA0005)",
      "CredentialAccess(TA0006)",
      "Discovery(TA0007)",
      "LateralMovement(TA0008)",
      "Collection(TA0009)",
      "CommandandControl(TA0011)",
      "Exfiltration(TA0010)",
      "Impact(TA0040)",
    ],
    Mobile: [
      "Categories",
      "InitialAccess(TA0027)",
      "Execution(TA0041)",
      "Persistence(TA0028)",
      "PrivilegeEscalation(TA0029)",
      "DefenseEvasion(TA0030)",
      "CredentialAccess(TA0031)",
      "Discovery(TA0032)",
      "LateralMovement(TA0033)",
      "Collection(TA0035)",
      "CommandandControl(TA0037)",
      "Exfiltration(TA0036)",
      "Impact(TA0034)",
      "NetworkEffects(TA0038)",
      "RemoteServiceEffects(TA0039)",
    ],
    ICS: [
      "Categories",
      "InitialAccess(TA0108)",
      "Execution(TA0104)",
      "Persistence(TA0110)",
      "PrivilegeEscalation(TA0111)",
      "Evasion(TA0103)",
      "Discovery(TA0102)",
      "LateralMovement(TA0109)",
      "Collection(TA0100)",
      "Command and Control(TA0101)",
      "InhibitResponseFunction(TA0107)",
      "ImpairProcessControl(TA0106)",
      "Impact(TA0105)",
    ],
  };
