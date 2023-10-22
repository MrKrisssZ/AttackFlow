// categories -> techniques by different tactics
// since same techniques under different tactics with different techID
// To-do: complete the dictionary for all categories with techniques
export const techniqueByCategoriesMobile = {
    InitialAccess: [
      "Techniques",
      "Drive-By Compromise(T1456)",
      "Lockscreen Bypass(T1461)",
      "Replication Through Removable Media(T1458)",
      "Supply Chain Compromise(T1474)",
      "--Compromise Software Dependencies and Development Tools(T1474.001)",
      "--Compromise Hardware Supply Chain(T1474.002)",
      "--Compromise Software Supply Chain(T1474.003)",
    ],
  
    Execution: [
      "Techniques",
      "Command and Scripting Interpreter(T1623)",
      "--Unix Shell(T1623.001)",
      "Native API(T1575)",
      "Scheduled Task/Job(T1603)",
    ],
  
    Persistence: [
      "Techniques",
      "Boot or Logon Initialization Scripts(T1398)",
      "Compromise Application Executable(T1577)",
      "Compromise Client Software Binary(T1645)",
      "Event Triggered Execution(T1624)",
      "--Broadcast Receivers(T1624.001)",
      "Foreground Persistence(T1541)",
      "Hijack Execution Flow(T1625)",
      "--System Runtime API Hijacking(T1625.001)",
      "Scheduled Task/Job(T1603)",
    ],
  
    PrivilegeEscalation: [
      "Techniques",
      "Abuse Elevation Control Mechanism(T1626)",
      "--Device Administrator Permissions(T1626.001)",
      "Exploitation for Privilege Escalation(T1404)",
      "Process Injection(T1631)",
      "--Ptrace System Calls(T1631.001)",
    ],
  
    DefenseEvasion: [
      "Techniques",
      "Download New Code at Runtime(T1407)",
      "Execution Guardrails(T1627)",
      "--Geofencing(T1627.001)",
      "Foreground Persistence(T1541)",
      "Hide Artifacts(T1628)",
      "--Suppress Application Icon(T1628.001)",
      "--User Evasion(T1628.002)",
      "Hooking(T1617)",
      "Impair Defenses(T1629)",
      "--Prevent Application Removal(T1629.001)",
      "--Device Lockout(T1629.002)",
      "--Disable or Modify Tools(T1629.003)",
      "Indicator Removal on Host(T1630)",
      "--Uninstall Malicious Application(T1630.001)",
      "--File Deletion(T1630.002)",
      "--Disguise Root/Jailbreak Indicators(T1630.003)",
      "Input Injection(T1516)",
      "Native API(T1575)",
      "Obfuscated Files or Information(T1406)",
      "--Steganography(T1406.001)",
      "--Software Packing(T1406.002)",
      "Process Injection(T1631)",
      "--Ptrace System Calls(T1631.001)",
      "Proxy Through Victim(T1604)",
      "Subvert Trust Controls(T1632)",
      "--Code Signing Policy Modification(T1632.001)",
      "Virtualization/Sandbox Evasion(T1633)",
      "--System Checks(T1633.001)",
    ],
  
    CredentialAccess: [
      "Techniques",
      "Access Notifications(T1517)",
      "Clipboard Data(T1414)",
      "Credentials from Password Store(T1634)",
      "--Keychain(T1634.001)",
      "Input Capture(T1417)",
      "--Keylogging(T1417.001)",
      "--GUI Input Capture(T1417.002)",
      "Steal Application Access Token(T1635)",
      "--URI Hijacking(T1635.001)",
    ],
  
    Discovery: [
      "Techniques",
      "File and Directory Discovery(T1420)",
      "Location Tracking(T1430)",
      "--Remote Device Management Services(T1430.001)",
      "--Impersonate SS7 Nodes(T1430.002)",
      "Network Service Scanning(T1423)",
      "Process Discovery(T1424)",
      "Software Discovery(T1418)",
      "--Security Software Discovery(T1418.001)",
      "System Information Discovery(T1426)",
      "System Network Configuration Discovery(T1422)",
      "System Network Connections Discovery(T1421)",
    ],
  
    LateralMovement: [
      "Techniques",
      "Exploitation of Remote Services(T1428)",
      "Replication Through Removable Media(T1458)",
    ],
  
    Collection: [
      "Techniques",
      "Access Notifications(T1517)",
      "Adversary-in-the-Middle(T1638)",
      "Archive Collected Data(T1532)",
      "Audio Capture(T1429)",
      "Call Control(T1616)",
      "Clipboard Data(T1414)",
      "Data from Local System(T1533)",
      "Input Capture(T1417)",
      "--Keylogging(T1417.001)",
      "--GUI Input Capture(T1417.002)",
      "Location Tracking(T1430)",
      "--Remote Device Management Services(T1430.001)",
      "--Impersonate SS7 Nodes(T1430.002)",
      "Protected User Data(T1636)",
      "--Calendar Entries(T1636.001)",
      "--Call Log(T1636.002)",
      "--Contact List(T1636.003)",
      "--SMS Messages(T1636.004)",
      "Screen Capture(T1513)",
      "Stored Application Data(T1409)",
      "Video Capture(T1512)",
    ],
  
    CommandAndControl: [
      "Techniques",
      "Application Layer Protocol(T1437)",
      "--Web Protocols(T1437.001)",
      "Call Control(T1616)",
      "Dynamic Resolution(T1637)",
      "--Domain Generation Algorithms(T1637.001)",
      "Encrypted Channel(T1521)",
      "--Symmetric Cryptography(T1521.001)",
      "--Asymmetric Cryptography(T1521.002)",
      "Ingress Tool Transfer(T1544)",
      "Non-Standard Port(T1509)",
      "Out of Band Data(T1644)",
      "Web Service(T1481)",
      "--Dead Drop Resolver(T1481.001)",
      "--Bidirectional Communication(T1481.002)",
      "--One-Way Communication(T1481.003)",
    ],
  
    Exfiltration: [
      "Techniques",
      "Exfiltration Over Alternative Protocol(T1639)",
      "--Exfiltration Over Unencrypted Non-C2 Protocol(T1639.001)",
      "Exfiltration Over C2 Channel(T1646)",
    ],
  
    Impact: [
      "Techniques",
      "Account Access Removal(T1640)",
      "Call Control(T1616)",
      "Data Encrypted for Impact(T1471)",
      "Data Manipulation(T1641)",
      "--Transmitted Data Manipulation(T1641.001)",
      "Endpoint Denial of Service(T1642)",
      "Generate Traffic from Victim(T1643)",
      "Input Injection(T1516)",
      "Network Denial of Service(T1464)",
      "SMS Control(T1582)",
    ],
  };
