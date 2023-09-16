import { useState, useMemo } from 'react'
// for displaying different option according to the previous level of the architecture
// tactics -> categories
const categoriesByTactics = {
    Default: ['Categories'],
    Enterprise: ['Categories', 'Reconnaissance', 'ResourceDevelopment', 'InitialAccess', 'Execution', 'Persistence', 'PrivilegeEscalation', 'DefenseEvasion', 'CredentialAccess', 'Discovery', 'LateralMovement', 'Collection', 'CommandandControl', 'Exfiltration', 'Impact'],
    Mobile: ['Categories', 'InitialAccess', 'Execution', 'Persistence', 'PrivilegeEscalation', 'DefenseEvasion', 'CredentialAccess', 'Discovery', 'LateralMovement', 'Collection', 'CommandandControl', 'Exfiltration', 'Impact'],
    ICS: ['Categories', 'InitialAccess', 'Execution', 'Persistence', 'PrivilegeEscalation', 'Evasion', 'Discovery', 'LateralMovement', 'Collection', 'Command and Control', 'InhibitResponseFunction', 'ImpairProcessControl', 'Impact'],
};

// categories -> techniques by different tactics
// since same techniques under different tactics with different techID
// To-do: complete the dictionary for all categories with techniques
const techniqueByCategoriesEnterprise = {
    Default: ['Techniques'],
    Reconnaissance: ['Techniques', 'Active Scanning', ' Gather VictimHost Information', 'Gather VictimIdentity Information', 'Gather VictimNetwork Information', 'Gather VictimOrg Information', 'Phishing For Information', 'Search Closed Sources', 'Search Open Technical Databases', 'Search Open Websites-Domains', 'Search Victim-Owned Websites'],

    ResourceDevelopment: ['Techniques', 'Acquire Access', ' Acquire Infrastructure', 'Domains', 'DNS Server', 'Virtual Private Server', 'Server', 'Botnet', 'Web Services', 'Serverless', 'Malvertising', 'Compromise Accounts', 'Social Media Accounts', 'Email Accounts', 'Cloud Accounts', 'Compromise Infrastructure', 'Domains', 'DNS Server', 'Virtual Private Server', 'Server', 'Botnet', 'Web Services', 'Serverless', 'Develop Capabilities', 'Malware', 'Code Signing Certificates', 'Digital Certificates', 'Exploits', 'Establish Accounts', 'Social Media Accounts', 'Email Accounts', 'Cloud Accounts', 'Obtain Capabilities', 'Malware', 'Tool', 'Code Signing Certificates', 'Digital Certificates', 'Exploits', 'Vulnerabilities', 'Stage Capabilities', 'Upload Malware', 'Upload Tool', 'Install Digital Certificate', 'Drive-by Target', 'Link Target', 'SEO Poisoning'],

    InitialAccess: ['Techniques', 'Drive-by Compromise', 'Exploit Public-Facing Application', 'External Remote Services', 'Hardware Additions', 'Phishing', 'Spearphishing Attachment', 'Spearphishing Link', 'Spearphishing via Service', 'Replication Through Removable Media', 'Supply Chain Compromise', 'Compromise Software Dependencies and Development Tools', 'Compromise Software Supply Chain', 'Compromise Hardware Supply Chain', 'Trusted Relationship', 'Valid Accounts', 'Default Accounts', 'Domain Accounts', 'Local Accounts', 'Cloud Accounts'],

    Execution: ['Techniques', 'Cloud Administration Command', 'Command and Scripting Interpreter', 'PowerShell', 'AppleScript', 'Windows Command Shell', 'Unix Shell', 'Visual Basic', 'Python', 'JavaScript', 'Network Device CLI', 'Cloud API', 'Container Administration Command', 'Deploy Container', 'Exploitation for Client Execution', 'Inter-Process Communication', 'Component Object Model', 'Dynamic Data Exchange', 'XPC Services', 'Native API', 'Scheduled Task/Job', 'At', 'Cron', 'Scheduled Task', 'Systemd Timers', 'Container Orchestration Job', 'Serverless Execution', 'Shared Modules', 'Software Deployment Tools', 'System Services', 'Launchctl', 'Service Execution', 'User Execution', 'Malicious Link', 'Malicious File', 'Malicious Image', 'Windows Management Instrumentation'],

    Persistence: ['Techniques', 'Account Manipulation', 'Additional Cloud Credentials', 'Additional Email Delegate Permissions', 'Additional Cloud Roles', 'SSH Authorized Keys', 'Device Registration', 'BITS Jobs', 'Boot or Logon Autostart Execution', 'Registry Run Keys / Startup Folder', 'Authentication Package', 'Time Providers', 'Winlogon Helper DLL', 'Security Support Provider', 'Kernel Modules and Extensions', 'Re-opened Applications', 'LSASS Driver', 'Shortcut Modification', 'Port Monitors', 'Print Processors', 'XDG Autostart Entries', 'Active Setup', 'Login Items', 'Boot or Logon Initialization Scripts', 'Logon Script (Windows)', 'Login Hook', 'Network Logon Script', 'RC Scripts', 'Startup Items', 'Browser Extensions', 'Compromise Client Software Binary', 'Create Account', 'Local Account', 'Domain Account', 'Cloud Account', 'Create or Modify System Process', 'Launch Agent', 'Systemd Service', 'Windows Service', 'Launch Daemon', 'Event Triggered Execution', 'Change Default File Association', 'Screensaver', 'Windows Management Instrumentation Event Subscription', 'Unix Shell Configuration Modification', 'Trap', 'LC_LOAD_DYLIB Addition', 'Netsh Helper DLL', 'Accessibility Features', 'AppCert DLLs', 'AppInit DLLs', 'Application Shimming', 'Image File Execution Options Injection', 'PowerShell Profile', 'Emond', 'Component Object Model Hijacking', 'Installer Packages', 'External Remote Services', 'Hijack Execution Flow', 'DLL Search Order Hijacking', 'DLL Side-Loading', 'Dylib Hijacking', 'Executable Installer File Permissions Weakness', 'Dynamic Linker Hijacking', 'Path Interception by PATH Environment Variable', 'Path Interception by Search Order Hijacking', 'Path Interception by Unquoted Path', 'Services File Permissions Weakness', 'Services Registry Permissions Weakness', 'COR_PROFILER', 'KernelCallbackTable', 'Implant Internal Image', 'Modify Authentication Process', 'Domain Controller Authentication', 'Password Filter DLL', 'Pluggable Authentication Modules', 'Network Device Authentication', 'Reversible Encryption', 'Multi-Factor Authentication', 'Hybrid Identity', 'Network Provider DLL', 'Office Application Startup', 'Office Template Macros', 'Office Test', 'Outlook Forms', 'Outlook Home Page', 'Outlook Rules', 'Add-ins', 'Pre-OS Boot', 'System Firmware', 'Component Firmware', 'Bootkit', 'ROMMONkit', 'TFTP Boot', 'Scheduled Task/Job', 'At', 'Cron', 'Scheduled Task', 'Systemd Timers', 'Container Orchestration Job', 'Server Software Component', 'SQL Stored Procedures', 'Transport Agent', 'Web Shell', 'IIS Components', 'Terminal Services DLL', 'Traffic Signaling', 'Port Knocking', 'Socket Filters', 'Valid Accounts', 'Default Accounts', 'Domain Accounts', 'Local Accounts', 'Cloud Accounts'],

    PrivilegeEscalation: ['Techniques', 'Abuse Elevation Control Mechanism', 'Setuid and Setgid', 'Bypass User Account Control', 'Sudo and Sudo Caching', 'Elevated Execution with Prompt', 'Access Token Manipulation', 'Token Impersonation/Theft', 'Create Process with Token', 'Make and Impersonate Token', 'Parent PID Spoofing', 'SID-History Injection', 'Boot or Logon Autostart Execution', 'Registry Run Keys / Startup Folder', 'Authentication Package', 'Time Providers', 'Winlogon Helper DLL', 'Security Support Provider', 'Kernel Modules and Extensions', 'Re-opened Applications', 'LSASS Driver', 'Shortcut Modification', 'Port Monitors', 'Print Processors', 'XDG Autostart Entries', 'Active Setup', 'Login Items', 'Boot or Logon Initialization Scripts', 'Logon Script (Windows)', 'Login Hook', 'Network Logon Script', 'RC Scripts', 'Startup Items', 'Create or Modify System Process', 'Launch Agent', 'Systemd Service', 'Windows Service', 'Launch Daemon', 'Domain Policy Modification', 'Group Policy Modification', 'Domain Trust Modification', 'Escape to Host', 'Event Triggered Execution', 'Change Default File Association', 'Screensaver', 'Windows Management Instrumentation Event Subscription', 'Unix Shell Configuration Modification', 'Trap', 'LC_LOAD_DYLIB Addition', 'Netsh Helper DLL', 'Accessibility Features', 'AppCert DLLs', 'AppInit DLLs', 'Application Shimming', 'Image File Execution Options Injection', 'PowerShell Profile', 'Emond', 'Component Object Model Hijacking', 'Installer Packages', 'Exploitation for Privilege Escalation', 'Hijack Execution Flow', 'DLL Search Order Hijacking', 'DLL Side-Loading', 'Dylib Hijacking', 'Executable Installer File Permissions Weakness', 'Dynamic Linker Hijacking', 'Path Interception by PATH Environment Variable', 'Path Interception by Search Order Hijacking', 'Path Interception by Unquoted Path', 'Services File Permissions Weakness', 'Services Registry Permissions Weakness', 'COR_PROFILER', 'KernelCallbackTable', 'Process Injection', 'Dynamic-link Library Injection', 'Portable Executable Injection', 'Thread Execution Hijacking', 'Asynchronous Procedure Call', 'Thread Local Storage', 'Ptrace System Calls', 'Proc Memory', 'Extra Window Memory Injection', 'Process Hollowing', 'Process Doppelgänging', 'VDSO Hijacking', 'ListPlanting', 'Scheduled Task/Job', 'At', 'Cron', 'Scheduled Task', 'Systemd Timers', 'Container Orchestration Job', 'Valid Accounts', 'Default Accounts', 'Domain Accounts', 'Local Accounts', 'Cloud Accounts'],

    DefenseEvasion: ['Techniques', 'Abuse Elevation Control Mechanism', 'Setuid and Setgid', 'Bypass User Account Control', 'Sudo and Sudo Caching', 'Elevated Execution with Prompt', 'Access Token Manipulation', 'Token Impersonation/Theft', 'Create Process with Token', 'Make and Impersonate Token', 'Parent PID Spoofing', 'SID-History Injection', 'BITS Jobs', 'Build Image on Host', 'Debugger Evasion', 'Deobfuscate/Decode Files or Information', 'Deploy Container', 'Direct Volume Access', 'Domain Policy Modification', 'Group Policy Modification', 'Domain Trust Modification', 'Execution Guardrails', 'Environmental Keying', 'Exploitation for Defense Evasion', 'File and Directory Permissions Modification', 'Windows File and Directory Permissions Modification', 'Linux and Mac File and Directory Permissions Modification', 'Hide Artifacts', 'Hidden Files and Directories', 'Hidden Users', 'Hidden Window', 'NTFS File Attributes', 'Hidden File System', 'Run Virtual Instance', 'VBA Stomping', 'Email Hiding Rules', 'Resource Forking', 'Process Argument Spoofing', 'Hijack Execution Flow', 'DLL Search Order Hijacking', 'DLL Side-Loading', 'Dylib Hijacking', 'Executable Installer File Permissions Weakness', 'Dynamic Linker Hijacking', 'Path Interception by PATH Environment Variable', 'Path Interception by Search Order Hijacking', 'Path Interception by Unquoted Path', 'Services File Permissions Weakness', 'Services Registry Permissions Weakness', 'COR_PROFILER', 'KernelCallbackTable', 'Impair Defenses', 'Disable or Modify Tools', 'Disable Windows Event Logging', 'Impair Command History Logging', 'Disable or Modify System Firewall', 'Indicator Blocking', 'Disable or Modify Cloud Firewall', 'Disable Cloud Logs', 'Safe Mode Boot', 'Downgrade Attack', 'Spoof Security Alerting', 'Indicator Removal', 'Clear Windows Event Logs', 'Clear Linux or Mac System Logs', 'Clear Command History', 'File Deletion', 'Network Share Connection Removal', 'Timestomp', 'Clear Network Connection History and Configurations', 'Clear Mailbox Data', 'Clear Persistence', 'Indirect Command Execution', 'Masquerading', 'Invalid Code Signature', 'Right-to-Left Override', 'Rename System Utilities', 'Masquerade Task or Service', 'Match Legitimate Name or Location', 'Space after Filename', 'Double File Extension', 'Masquerade File Type', 'Modify Authentication Process', 'Domain Controller Authentication', 'Password Filter DLL', 'Pluggable Authentication Modules', 'Network Device Authentication', 'Reversible Encryption', 'Multi-Factor Authentication', 'Hybrid Identity', 'Network Provider DLL', 'Modify Cloud Compute Infrastructure', 'Create Snapshot', 'Create Cloud Instance', 'Delete Cloud Instance', 'Revert Cloud Instance', 'Modify Registry', 'Modify System Image', 'Patch System Image', 'Downgrade System Image', 'Network Boundary Bridging', 'Network Address Translation Traversal', 'Obfuscated Files or Information', 'Binary Padding', 'Software Packing', 'Steganography', 'Compile After Delivery', 'Indicator Removal from Tools', 'HTML Smuggling', 'Dynamic API Resolution', 'Stripped Payloads', 'Embedded Payloads', 'Command Obfuscation', 'Fileless Storage', 'Plist File Modification', 'Pre-OS Boot', 'System Firmware', 'Component Firmware', 'Bootkit', 'ROMMONkit', 'TFTP Boot', 'Process Injection', 'Dynamic-link Library Injection', 'Portable Executable Injection', 'Thread Execution Hijacking', 'Asynchronous Procedure Call', 'Thread Local Storage', 'Ptrace System Calls', 'Proc Memory', 'Extra Window Memory Injection', 'Process Hollowing', 'Process Doppelgänging', 'VDSO Hijacking', 'ListPlanting', 'Reflective Code Loading', 'Rogue Domain Controller', 'Rootkit', 'Subvert Trust Controls', 'Gatekeeper Bypass', 'Code Signing', 'SIP and Trust Provider Hijacking', 'Install Root Certificate', 'Mark-of-the-Web Bypass', 'Code Signing Policy Modification', 'System Binary Proxy Execution', 'Compiled HTML File', 'Control Panel', 'CMSTP', 'InstallUtil', 'Mshta', 'Msiexec', 'Odbcconf', 'Regsvcs/Regasm', 'Regsvr32', 'Rundll32', 'Verclsid', 'Mavinject', 'MMC', 'System Script Proxy Execution', 'PubPrn', 'Template Injection', 'Traffic Signaling', 'Port Knocking', 'Socket Filters', 'Trusted Developer Utilities Proxy Execution', 'MSBuild', 'Unused/Unsupported Cloud Regions', 'Use Alternate Authentication Material', 'Application Access Token', 'Pass the Hash', 'Pass the Ticket', 'Web Session Cookie', 'Valid Accounts', 'Default Accounts', 'Domain Accounts', 'Local Accounts', 'Cloud Accounts', 'Virtualization/Sandbox Evasion', 'System Checks', 'User Activity Based Checks', 'Time Based Evasion', 'Weaken Encryption', 'Reduce Key Space', 'Disable Crypto Hardware', 'XSL Script Processing'],

    CredentialAccess: ['Techniques', 'Adversary-in-the-Middle', 'Adversary-in-the-Middle', 'LLMNR/NBT-NS Poisoning and SMB Relay', 'ARP Cache Poisoning', 'DHCP Spoofing', 'Brute Force', 'Password Guessing', 'Password Cracking', 'Password Spraying', 'Credential Stuffing', 'Credentials from Password Stores', 'Keychain', 'Securityd Memory', 'Credentials from Web Browsers', 'Windows Credential Manager', 'Password Managers', 'Exploitation for Credential Access', 'Forced Authentication', 'Forge Web Credentials', 'Web Cookies', 'SAML Tokens', 'Input Capture', 'Keylogging', 'GUI Input Capture', 'Web Portal Capture', 'Credential API Hooking', 'Modify Authentication Process', 'Domain Controller Authentication', 'Password Filter DLL', 'Pluggable Authentication Modules', 'Network Device Authentication', 'Reversible Encryption', 'Multi-Factor Authentication', 'Hybrid Identity', 'Network Provider DLL', 'Multi-Factor Authentication Interception', 'Multi-Factor Authentication Request Generation', 'Network Sniffing', 'OS Credential Dumping', 'LSASS Memory', 'Security Account Manager', 'NTDS', 'LSA Secrets', 'Cached Domain Credentials', 'DCSync', 'Proc Filesystem', '/etc/passwd and /etc/shadow', 'Steal Application Access Token', 'Steal or Forge Authentication Certificates', 'Steal or Forge Kerberos Tickets', 'Golden Ticket', 'Silver Ticket', 'Kerberoasting', 'AS-REP Roasting', 'Steal Web Session Cookie', 'Unsecured Credentials', 'Credentials In Files', 'Credentials in Registry', 'Bash History', 'Private Keys', 'Cloud Instance Metadata API', 'Group Policy Preferences', 'Container API', 'Chat Messages'],

    Discovery: ['Techniques', 'Account Discovery', 'Local Account', 'Domain Account', 'Email Account', 'Cloud Account', 'Application Window Discovery', 'Browser Information Discovery', 'Cloud Infrastructure Discovery', 'Cloud Service Dashboard', 'Cloud Service Discovery', 'Cloud Storage Object Discovery', 'Container and Resource Discovery', 'Debugger Evasion', 'Device Driver Discovery', 'Domain Trust Discovery', 'File and Directory Discovery', 'Group Policy Discovery', 'Network Service Discovery', 'Network Share Discovery', 'Network Sniffing', 'Password Policy Discovery', 'Peripheral Device Discovery', 'Permission Groups Discovery', 'Local Groups', 'Domain Groups', 'Cloud Groups', 'Process Discovery', 'Query Registry', 'Remote System Discovery', 'Software Discovery', 'Security Software Discovery', 'System Information Discovery', 'System Location Discovery', '  System Language Discovery', 'System Network Configuration Discovery', 'Internet Connection Discovery', 'System Network Connections Discovery', 'System Owner/User Discovery', 'System Service Discovery', 'System Time Discovery', 'Virtualization/Sandbox Evasion', 'System Checks', 'User Activity Based Checks', 'Time Based Evasion'],

    LateralMovement: ['Techniques', 'Exploitation of Remote Services', 'Internal Spearphishing', 'Lateral Tool Transfer', 'Remote Service Session Hijacking', 'SSH Hijacking', 'RDP Hijacking', 'Remote Services', 'Remote Desktop Protocol', 'SMB/Windows Admin Shares', 'Distributed Component Object Model', 'SSH', 'VNC', 'Windows Remote Management', 'Cloud Services', 'Replication Through Removable Media', 'Software Deployment Tools', 'Taint Shared Content', 'Use Alternate Authentication Material', 'Application Access Token', 'Pass the Hash', 'Pass the Ticket', 'Web Session Cookie'],

    Collection: ['Techniques', 'Adversary-in-the-Middle', 'LLMNR/NBT-NS Poisoning and SMB Relay', 'ARP Cache Poisoning', 'DHCP Spoofing', 'Archive Collected Data', 'Archive via Utility', 'Archive via Library', 'Archive via Custom Method', 'Audio Capture', 'Automated Collection', 'Browser Session Hijacking', 'Clipboard Data', 'Data from Cloud Storage', 'Data from Configuration Repository', 'SNMP (MIB Dump)', 'Network Device Configuration Dump', 'Data from Information Repositories', 'Confluence', 'Sharepoint', 'Code Repositories', 'Data from Local System', 'Data from Network Shared Drive', 'Data from Removable Media', 'Data Staged', 'Local Data Staging', 'Remote Data Staging', 'Email Collection', 'Local Email Collection', 'Remote Email Collection', 'Email Forwarding Rule', 'Input Capture', 'Keylogging', 'GUI Input Capture', 'Web Portal Capture', 'Credential API Hooking', 'Screen Capture', 'Video Capture'],

    CommandAndControl: ['Techniques', 'Application Layer Protocol', 'Web Protocols', 'File Transfer Protocols', 'Mail Protocols', 'DNS', 'Communication Through Removable Media', 'Data Encoding', 'Standard Encoding', 'Non-Standard Encoding', 'Data Obfuscation', 'Junk Data', 'Steganography', 'Protocol Impersonation', 'Dynamic Resolution', 'Fast Flux DNS', 'Domain Generation Algorithms', 'DNS Calculation', 'Encrypted Channel', 'Symmetric Cryptography', 'Asymmetric Cryptography', 'Fallback Channels', 'Ingress Tool Transfer', 'Multi-Stage Channels', 'Non-Application Layer Protocol', 'Non-Standard Port', 'Protocol Tunneling', 'Proxy', 'Internal Proxy', 'External Proxy', 'Multi-hop Proxy', 'Domain Fronting', 'Remote Access Software', 'Traffic Signaling', 'Port Knocking', 'Socket Filters', 'Web Service', 'Dead Drop Resolver', 'Bidirectional Communication', 'One-Way Communication'],

    Exfiltration: ['Techniques', 'Automated Exfiltration', 'Traffic Duplication', 'Data Transfer Size Limits', 'Exfiltration Over Alternative Protocol', 'Exfiltration Over Symmetric Encrypted Non-C2 Protocol', 'Exfiltration Over Asymmetric Encrypted Non-C2 Protocol', 'Exfiltration Over Unencrypted Non-C2 Protocol', 'Exfiltration Over C2 Channel', 'Exfiltration Over Other Network Medium', 'Exfiltration Over Bluetooth', 'Exfiltration Over Physical Medium', 'Exfiltration over USB', 'Exfiltration Over Web Service', 'Exfiltration to Code Repository', 'Exfiltration to Cloud Storage', 'Exfiltration to Text Storage Sites', 'Scheduled Transfer', 'Transfer Data to Cloud Account'],

    Impact: ['Techniques', 'Account Access Removal', 'Data Destruction', 'Data Encrypted for Impact', 'Data Manipulation', 'Stored Data Manipulation', 'Transmitted Data Manipulation', 'Runtime Data Manipulation', 'Defacement', 'Internal Defacement', 'External Defacement', 'Disk Wipe', 'Disk Content Wipe', 'Disk Structure Wipe', 'Endpoint Denial of Service', 'OS Exhaustion Flood', 'Service Exhaustion Flood', 'Application Exhaustion Flood', 'Application or System Exploitation', 'Firmware Corruption', 'Inhibit System Recovery', 'Network Denial of Service', 'Direct Network Flood', 'Reflection Amplification', 'Resource Hijacking', 'Service Stop', 'System Shutdown/Reboot'],

}

const techniqueByCategoriesMobile = {
    InitialAccess: ['Techniques', 'Drive-By Compromise', 'Drive-By Compromise', 'Lockscreen Bypass', 'Replication Through Removable Media', 'Supply Chain Compromise', 'Compromise Software Dependencies and Development Tools', 'Compromise Hardware Supply Chain', 'Compromise Software Supply Chain'],

    Execution: ['Techniques', 'Command and Scripting Interpreter', 'Unix Shell', 'Native API', 'Scheduled Task/Job'],

    Persistence: ['Techniques', 'Boot or Logon Initialization Scripts', 'Compromise Application Executable', 'Compromise Client Software Binary', 'Event Triggered Execution', 'Broadcast Receivers', 'Foreground Persistence', 'Hijack Execution Flow', 'System Runtime API Hijacking', 'Scheduled Task/Job'],

    PrivilegeEscalation: ['Techniques', 'Abuse Elevation Control Mechanism', 'Device Administrator Permissions', 'Exploitation for Privilege Escalation', 'Process Injection', 'Ptrace System Calls'],

    DefenseEvasion: ['Techniques', 'Download New Code at Runtime', 'Execution Guardrails', 'Geofencing', 'Foreground Persistence', 'Hide Artifacts', 'Suppress Application Icon', 'User Evasion', 'Hooking', 'Impair Defenses', 'Prevent Application Removal', 'Device Lockout', 'Disable or Modify Tools', 'Indicator Removal on Host', 'Uninstall Malicious Application', 'File Deletion', 'Disguise Root/Jailbreak Indicators', 'Input Injection', 'Native API', 'Obfuscated Files or Information', 'Steganography', '  Software Packing', '    Process Injection', 'Ptrace System Calls', 'Proxy Through Victim', 'Subvert Trust Controls', 'Code Signing Policy Modification', 'Virtualization/Sandbox Evasion', 'System Checks'],

    CredentialAccess: ['Techniques', 'Access Notifications', 'Clipboard Data', 'Credentials from Password Store', 'Keychain', 'Input Capture', 'Keylogging', 'GUI Input Capture', 'Steal Application Access Token', 'URI Hijacking'],

    Discovery: ['Techniques', 'File and Directory Discovery', 'Location Tracking', 'Remote Device Management Services', 'Impersonate SS7 Nodes', 'Network Service Scanning', 'Process Discovery', ' Software Discovery', 'Security Software Discovery', 'System Information Discovery', 'System Network Configuration Discovery', 'System Network Connections Discovery'],

    LateralMovement: ['Techniques', 'Exploitation of Remote Services', 'Replication Through Removable Media'],

    Collection: ['Techniques', 'Access Notifications', 'Adversary-in-the-Middle', 'Archive Collected Data', 'Audio Capture', 'Call Control', 'Clipboard Data', 'Data from Local System', '  Input Capture', 'Keylogging', 'GUI Input Capture', '    Location Tracking', 'Remote Device Management Services', 'Impersonate SS7 Nodes', 'Protected User Data', 'Calendar Entries', 'Call Log', 'Contact List', 'SMS Messages', 'Screen Capture', 'Stored Application Data', 'Video Capture'],

    CommandAndControl: ['Techniques', 'Application Layer Protocol', 'Web Protocols', 'Call Control', 'Dynamic Resolution', 'Domain Generation Algorithms', 'Encrypted Channel', 'Symmetric Cryptography', 'Asymmetric Cryptography', 'Ingress Tool Transfer', 'Non-Standard Port', 'Out of Band Data', 'Web Service', 'Dead Drop Resolver', 'Bidirectional Communication', 'One-Way Communication'],

    Exfiltration: ['Techniques', 'Exfiltration Over Alternative Protocol', 'Exfiltration Over Unencrypted Non-C2 Protocol', 'Exfiltration Over C2 Channel'],

    Impact: ['Techniques', 'Account Access Removal', 'Call Control', 'Data Encrypted for Impact', 'Data Manipulation', 'Transmitted Data Manipulation', 'Endpoint Denial of Service', 'Generate Traffic from Victim', 'Input Injection', 'Network Denial of Service', 'SMS Control'],

}

const techniqueByCategoriesICS = {
    InitialAccess: ['Techniques', 'Drive-by Compromise', 'Exploit Public-Facing Application', 'Exploitation of Remote Services', 'External Remote Services', 'Internet Accessible Device', 'Remote Services', 'Replication Through Removable Media', 'Rogue Master', 'Spearphishing Attachment', 'Supply Chain Compromise', 'Transient Cyber Asset', 'Wireless Compromise'],

    Execution: ['Techniques', 'Change Operating Mode', 'Command-Line Interface', 'Execution through API', 'Graphical User Interface', 'Hooking', 'Modify Controller Tasking', 'Native API', 'Scripting', 'User Execution'],

    Persistence: ['Techniques', 'Hardcoded Credentials', 'Modify Program', 'Module Firmware', 'Project File Infection', 'System Firmware', 'Valid Accounts'],

    PrivilegeEscalation: ['Techniques', 'Exploitation for Privilege Escalation', 'Hooking'],

    Evasion: ['Techniques', 'Change Operating Mode', 'Exploitation for Evasion', 'Indicator Removal on Host', 'Masquerading', 'Rootkit', 'Spoof Reporting Message'],

    Discovery: ['Techniques', 'Network Connection Enumeration', 'Network Sniffing', 'Remote System Discovery', 'Remote System Information Discovery', 'Wireless Sniffing'],

    LateralMovement: ['Techniques', 'Default Credentials', 'Exploitation of Remote Services', 'Hardcoded Credentials', 'Lateral Tool Transfer', 'Program Download', 'Remote Services', 'Valid Accounts'],

    Collection: ['Techniques', 'Adversary-in-the-Middle', 'Automated Collection', 'Data from Information Repositories', 'Data from Local System', 'Detect Operating Mode', 'I/O Image', 'Monitor Process State', 'Point & Tag Identification', 'Program Upload', 'Screen Capture', 'Wireless Sniffing'],

    CommandAndControl: ['Techniques', 'Commonly Used Port', 'Connection Proxy', 'Standard Application Layer Protocol'],

    InhibitResponseFunction: ['Techniques', 'Activate Firmware Update Mode', 'Alarm Suppression', 'Block Command Message', 'Block Reporting Message', 'Block Serial COM', 'Change Credential', 'Data Destruction', 'Denial of Service', 'Device Restart/Shutdown', 'Manipulate I/O Image', 'Modify Alarm Settings', 'Rootkit', 'Service Stop', 'System Firmware'],

    ImpairProcessControl: ['Techniques', 'Brute Force I/O', 'Modify Parameter', 'Module Firmware', 'Spoof Reporting Message', 'Unauthorized Command Message'],

    Impact: ['Techniques', 'Damage to Property', 'Denial of Control', 'Denial of View', 'Loss of Availability', 'Loss of Control', 'Loss of Productivity and Revenue', 'Loss of Protection', 'Loss of Safety', 'Loss of View', 'Manipulation of Control', 'Manipulation of View', 'Theft of Operational Information'],

}
const DropdownMenu = () => {
    const [incidentDate, setIncidentDate] = useState(new Date());
    const [tactics, setTactics] = useState('');
    const [categories, setCategories] = useState('');
    const [techniques, setTechniques] = useState('');
    const [description, setDescription] = useState('');

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
        if (tactics === ('Enterprise') &&
            (categories === 'Reconnaissance' ||
                categories === 'ResourceDevelopment' ||
                categories === 'InitialAccess' ||
                categories === 'Execution' ||
                categories === 'Persistence' ||
                categories === 'PrivilegeEscalation' ||
                categories === 'CredentialAccess' ||
                categories === 'Discovery' ||
                categories === 'LateralMovement' ||
                categories === 'Collection' ||
                categories === 'CommandAndControl' ||
                categories === 'Exfiltration' ||
                categories === 'Impact')
        ) {
            return techniqueByCategoriesEnterprise[categories].map((option) => (
                <option value={option} key={option}>
                    {option}
                </option>
            ))
        }

        // tactics: Mobile
        if (tactics === 'Mobile' &&
            (categories === 'InitialAccess' ||
                categories === 'Execution' ||
                categories === 'Persistence' ||
                categories === 'PrivilegeEscalation' ||
                categories === 'DefenseEvasion' ||
                categories === 'CredentialAccess' ||
                categories === 'Discovery' ||
                categories === 'LateralMovement' ||
                categories === 'Collection' ||
                categories === 'CommandAndControl' ||
                categories === 'Exfiltration' ||
                categories === 'Impact')
        ) {
            return techniqueByCategoriesMobile[categories].map((option) => (
                <option value={option} key={option}>
                    {option}
                </option>
            ))
        }
        // tactics: ICS
        if (tactics === 'ICS' &&
            (categories === 'InitialAccess' ||
                categories === 'Execution' ||
                categories === 'Persistence' ||
                categories === 'PrivilegeEscalation' ||
                categories === 'Evasion' ||
                categories === 'Discovery' ||
                categories === 'LateralMovement' ||
                categories === 'Collection' ||
                categories === 'CommandAndControl' ||
                categories === 'InhibitResponseFunction' ||
                categories === 'ImpairProcessControl' ||
                categories === 'Impact')
        ) {
            return techniqueByCategoriesICS[categories].map((option) => (
                <option value={option} key={option}>
                    {option}
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
                            defaultValue={tactics}
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
                            defaultValue={categories}
                            onChange={(e) => setCategories(e.target.value)}
                            name='categories'
                            id='categories'
                        >
                            {categoryOptions}
                        </select>

                        <p>Techniques</p>
                        <select
                            defaultValue={techniques}
                            onChange={(e) => setTechniques(e.target.value)}
                            name='subtechniques'
                            id='techniques'
                        >
                            {techniqueOptions}
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