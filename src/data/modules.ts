export interface SpecializedModule {
  id: string;
  title: string;
  tagline: string;
  requiredPoints: number;
  iconName: string;
  description: string;
  topics: string[];
  capstoneLab: string;
}

export const SPECIALIZED_MODULES: SpecializedModule[] = [
  {
    id: 'spec_oop',
    title: 'Object-Oriented Programming (OOP) & Custom Classes',
    tagline: 'Encapsulation, Constructors (__init__), Methods & Class Modeling',
    requiredPoints: 1200,
    iconName: 'Box',
    description: 'Transition from procedural scripting to professional Object-Oriented software engineering. Master classes, instances, the `self` keyword, private attributes, and class inheritance.',
    topics: [
      'Classes vs Objects: The Blueprint and House Analogy',
      'The __init__ Constructor and Instance State',
      'Instance Methods vs Class Methods',
      'Encapsulation and Data Protection with Getters/Setters',
      'Inheritance and Polymorphism for Clean Extensibility'
    ],
    capstoneLab: 'Build a Complete RPG Hero & Monster Battle Simulator Class Hierarchy'
  },
  {
    id: 'spec_file_io',
    title: 'File Systems, CSV Data & Persistent Storage',
    tagline: 'Context Managers (with open), JSON Serialization & File Parsing',
    requiredPoints: 1400,
    iconName: 'FileText',
    description: 'Learn how programs save and load persistent data that survives computer restarts. Master file streams, context managers (`with`), structured CSV reading/writing, and JSON serialization.',
    topics: [
      'The File Stream Lifecycle: Open, Read, Write, Close',
      'The `with open()` Context Manager Guarantee',
      'Reading and Parsing Tabular CSV Data from Scratch',
      'JSON Encoding and Decoding for Web and Database APIs',
      'Error Handling on Missing Files and Permission Denied'
    ],
    capstoneLab: 'Build an Automated Financial Transaction File Exporter & Monthly Aggregator'
  },
  {
    id: 'spec_defensive',
    title: 'Defensive Engineering & Robust Exception Handling',
    tagline: 'Custom Exceptions, Assertions, Try-Except-Finally & Invariants',
    requiredPoints: 1600,
    iconName: 'ShieldAlert',
    description: 'Eliminate unexpected crashes. Learn how industrial software guards against bad user input, network drops, and corrupted data with graceful degradation and custom exception hierarchies.',
    topics: [
      'The Exception Hierarchy in Python (BaseException to ValueError)',
      'Specific Try/Except Targeting vs Dangerous Bare Excepts',
      'The `finally` and `else` Cleanup Guarantees',
      'Designing Domain-Specific Custom Exception Classes',
      'Contract-Driven Invariants with Assertions'
    ],
    capstoneLab: 'Construct a Bulletproof Automated Payment Gatekeeper that Survives Faulty Inputs'
  },
  {
    id: 'spec_agent_orchestration',
    title: 'Autonomous Bot Architecture & Tool Dispatching',
    tagline: 'Inspired by JARVIS: State Loops, Tool Adapters & AI Agent Orchestration',
    requiredPoints: 1800,
    iconName: 'Bot',
    description: 'Uncover the exact architectural patterns running inside the JARVIS desktop agent: decision loops, structured tool schemas, permission gates, and execution wrappers.',
    topics: [
      'The Agent Loop: Sense -> Plan -> Act -> Observe -> Reflect',
      'Structured Tool Declarations and JSON Parameter Schemas',
      'Permission Gates: Classifying SAFE vs DESTRUCTIVE Tool Actions',
      'Cooperative Cancellation Tokens and Task State Machine',
      'Short-Term Working Memory vs Long-Term Entity Persistence'
    ],
    capstoneLab: 'Build a Working Rule-Based Autonomous Desktop Copilot in Pure Python'
  }
];
