// categories -> techniques by different tactics
// since same techniques under different tactics with different techID
// To-do: complete the dictionary for all categories with techniques
export const techniqueByCategoriesICS = {
    InitialAccess: [
      "Techniques",
      "Drive-by Compromise(T0817)",
      "Exploit Public-Facing Application(T0819)",
      "Exploitation of Remote Services(T0866)",
      "External Remote Services(T0822)",
      "Internet Accessible Device(T0883)",
      "Remote Services(T0886)",
      "Replication Through Removable Media(T0847)",
      "Rogue Master(T0848)",
      "Spearphishing Attachment(T0865)",
      "Supply Chain Compromise(T0862)",
      "Transient Cyber Asset(T0864)",
      "Wireless Compromise(T0860)",
    ],
  
    Execution: [
      "Techniques",
      "Change Operating Mode(T0858)",
      "Command-Line Interface(T0807)",
      "Execution through API(T0871)",
      "Graphical User Interface(T0823)",
      "Hooking(T0874)",
      "Modify Controller Tasking(T0821)",
      "Native API(T0834)",
      "Scripting(T0853)",
      "User Execution(T0863)",
    ],
  
    Persistence: [
      "Techniques",
      "Hardcoded Credentials(T0891)",
      "Modify Program(T0889)",
      "Module Firmware(T0839)",
      "Project File Infection(T0873)",
      "System Firmware(T0857)",
      "Valid Accounts(T0859)",
    ],
  
    PrivilegeEscalation: [
      "Techniques",
      "Exploitation for Privilege Escalation(T0890)",
      "Hooking(T0874)",
    ],
  
    Evasion: [
      "Techniques",
      "Change Operating Mode(T0858)",
      "Exploitation for Evasion(T0820)",
      "Indicator Removal on Host(T0872)",
      "Masquerading(T0849)",
      "Rootkit(T0851)",
      "Spoof Reporting Message(T0856)",
    ],
  
    Discovery: [
      "Techniques",
      "Network Connection Enumeration(T0840)",
      "Network Sniffing(T0842)",
      "Remote System Discovery(T0846)",
      "Remote System Information Discovery(T0888)",
      "Wireless Sniffing(T0887)",
    ],
  
    LateralMovement: [
      "Techniques",
      "Default Credentials(T0812)",
      "Exploitation of Remote Services(T0866)",
      "Hardcoded Credentials(T0891)",
      "Lateral Tool Transfer(T0867)",
      "Program Download(T0843)",
      "Remote Services(T0886)",
      "Valid Accounts(T0859)",
    ],
  
    Collection: [
      "Techniques",
      "Adversary-in-the-Middle(T0830)",
      "Automated Collection(T0802)",
      "Data from Information Repositories(T0811)",
      "Data from Local System(T0893)",
      "Detect Operating Mode(T0868)",
      "I/O Image(T0877)",
      "Monitor Process State(T0801)",
      "Point & Tag Identification(T0861)",
      "Program Upload(T0845)",
      "Screen Capture(T0852)",
      "Wireless Sniffing(T0887)",
    ],
  
    CommandAndControl: [
      "Techniques",
      "Commonly Used Port(T0885)",
      "Connection Proxy(T0884)",
      "Standard Application Layer Protocol(T0869)",
    ],
  
    InhibitResponseFunction: [
      "Techniques",
      "Activate Firmware Update Mode(T0800)",
      "Alarm Suppression(T0878)",
      "Block Command Message(T0803)",
      "Block Reporting Message(T0804)",
      "Block Serial COM(T0805)",
      "Change Credential(T0892)",
      "Data Destruction(T0809)",
      "Denial of Service(T0814)",
      "Device Restart/Shutdown(T0816)",
      "Manipulate I/O Image(T0835)",
      "Modify Alarm Settings(T0838)",
      "Rootkit(T0851)",
      "Service Stop(T0881)",
      "System Firmware(T0857)",
    ],
  
    ImpairProcessControl: [
      "Techniques",
      "Brute Force I/O(T0806)",
      "Modify Parameter(T0836)",
      "Module Firmware(T0839)",
      "Spoof Reporting Message(T0856)",
      "Unauthorized Command Message(T0855)",
    ],
  
    Impact: [
      "Techniques",
      "Damage to Property(T0879)",
      "Denial of Control(T0813)",
      "Denial of View(T0815)",
      "Loss of Availability(T0826)",
      "Loss of Control(T0827)",
      "Loss of Productivity and Revenue(T0828)",
      "Loss of Protection(T0837)",
      "Loss of Safety(T0880)",
      "Loss of View(T0829)",
      "Manipulation of Control(T0831)",
      "Manipulation of View(T0832)",
      "Theft of Operational Information(T0882)",
    ],
  };