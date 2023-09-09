// for displaying different option according to the previous level of the architecture
// tactics -> categories
export const categoriesByTactics = {
  Default: ['Categories'],
  Enterprise: ['Categories', 'Reconnaissance', 'Resource Development', 'InitialAccess', 'Execution', 'Persistence', 'PrivilegeEscalation', 'DefenseEvasion', 'CredentialAccess', 'Discovery', 'LateralMovement', 'Collection', 'CommandandControl', 'Exfiltration', 'Impact'],
  Mobile: ['Categories', 'InitialAccess', 'Execution', 'Persistence', 'PrivilegeEscalation', 'DefenseEvasion', 'CredentialAccess', 'Discovery', 'LateralMovement', 'Collection', 'CommandandControl', 'Exfiltration', 'Impact'],
  ICS: ['Categories', 'InitialAccess', 'Execution', 'Persistence', 'PrivilegeEscalation', 'Evasion', 'Discovery', 'LateralMovement', 'Collection', 'Command and Control', 'InhibitResponseFunction', 'ImpairProcessControl', 'Impact'],
};