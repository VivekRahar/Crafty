/**
 * Viva & Academic Syllabus Mapping Data
 *
 * Covers:
 * - Refreshing JavaScript (Unit I)
 * - React Fundamentals and Tooling (Unit I)
 * - Component Design & Styling (Unit II)
 * - States, Events, Hooks & Side Effects (Unit III)
 * - Form Handling & Zod Validation (Unit IV)
 * - Explainable AI Architecture for ODOP
 */

export const SYLLABUS_SECTIONS = [
  {
    id: "unit-1-js",
    unit: "Unit I",
    title: "Refreshing JavaScript & React Fundamentals",
    topics: [
      {
        name: "Arrow Functions & Lexical Scope",
        summary: "Concise syntax for functions that do not bind their own 'this'. Used everywhere in components, array callbacks, and custom hooks.",
        codeSnippet: `// Arrow functions used in array iteration and event handlers
const calculateConfidence = (features, weights) => {
  return features.reduce((accum, feature) => accum + (feature.score * weights[feature.id]), 0);
};

const handleSelectCraft = (craftId) => setSelectedCraftId(craftId);`,
        vivaQuestion: "Why do we prefer arrow functions over standard function declarations in React components?",
        vivaAnswer: "Arrow functions provide clean, concise syntax, avoid explicit '.bind(this)' calls because they inherit lexical scope, and are ideal for passing inline callbacks to event handlers and higher-order functions like map/filter."
      },
      {
        name: "Block-Scoped Variables (let & const)",
        summary: "Prevent variable hoisting bugs and unintended reassignments. 'const' enforces immutable references while 'let' allows controlled reassignment.",
        codeSnippet: `// Immutability in variable declarations
const MAX_SCAN_DURATION = 2400; // Constant configuration
let currentStepIndex = 0;        // Reassigned inside step sequencer loop`,
        vivaQuestion: "What is the difference between var, let, and const in modern JavaScript?",
        vivaAnswer: "var is function-scoped and hoisted with undefined, leading to subtle bugs. let and const are block-scoped and live in the Temporal Dead Zone before declaration. const prevents reassigning the variable identifier."
      },
      {
        name: "Array Iteration & Transformation Methods",
        summary: "Declarative transformations using map(), filter(), reduce(), and some()/every() without mutating original state arrays.",
        codeSnippet: `// Transform verified craft list into filtered catalog
const filteredCrafts = crafts
  .filter(craft => activeCategory === 'All' || craft.category === activeCategory)
  .map(craft => ({
    ...craft,
    isPopular: craft.registeredYear < 2010
  }));

// Reduce for composite authenticity calculation
const compositeScore = indicators.reduce((acc, curr) => acc + curr.weight * curr.score, 0);`,
        vivaQuestion: "Why should we avoid for-loops and push() when updating React state?",
        vivaAnswer: "for-loops with .push() mutate existing arrays in place. React relies on referential equality (shallow comparison) to detect state changes. Using .map() and .filter() returns new array references, preserving immutability."
      },
      {
        name: "Destructuring, Spread & Rest Operators",
        summary: "Unpacking properties from objects/arrays and shallow copying state structures.",
        codeSnippet: `// Destructuring props and state
const { craftName, isAuthentic, groundTruth: { overallScore, keyFindings } } = sample;

// Spread operator to produce new state without mutating
setInspectionData(prev => ({
  ...prev,
  [field]: value,
  lastUpdated: Date.now()
}));`,
        vivaQuestion: "What is the difference between shallow copy and deep copy?",
        vivaAnswer: "Spread operator {...obj} creates a shallow copy, duplicating only top-level properties. Nested objects still share the same memory reference. For deep nested copies, structuredClone(obj) or custom recursive cloning is required."
      },
      {
        name: "Virtual DOM & Reconciliation Process",
        summary: "React's lightweight in-memory representation of the real DOM. When state changes, a new VDOM tree is created, diffed against the previous tree (reconciliation), and only changes are patched to real DOM.",
        codeSnippet: `// React creates Virtual DOM elements from JSX
// Reconciliation uses keys to match list items efficiently
{filteredCrafts.map(craft => (
  <CraftCard key={craft.id} craft={craft} onSelect={handleSelect} />
))}`,
        vivaQuestion: "Why is the 'key' prop mandatory when rendering lists in React?",
        vivaAnswer: "The key prop gives elements a stable identity across renders. During the reconciliation (diffing) algorithm, React uses keys to match existing DOM nodes, avoiding costly re-creation of unchanged DOM subtrees."
      }
    ]
  },
  {
    id: "unit-2-components",
    unit: "Unit II",
    title: "Component Design & Styling in React",
    topics: [
      {
        name: "Component Composition & Props Reusability",
        summary: "Building complex UIs from small, focused, single-responsibility components using props and children composition.",
        codeSnippet: `// Generic Reusable Modal using children composition
export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">{title}</h3>
          <button onClick={onClose} aria-label="Close modal">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
};`,
        vivaQuestion: "What is component composition and why is it preferred over deep prop drilling?",
        vivaAnswer: "Component composition allows passing components as children or props, decoupling layout containers from their inner contents and keeping components reusable without threading unnecessary props through intermediate levels."
      },
      {
        name: "Lifting State Up Pattern",
        summary: "Moving shared state to the closest common ancestor when multiple sibling components need to synchronize.",
        codeSnippet: `// VerificationStudio manages state and passes handlers down
function VerificationStudio() {
  const [selectedCraft, setSelectedCraft] = useState(ODOP_CRAFTS[0]);
  const [verificationResult, setVerificationResult] = useState(null);

  return (
    <div>
      <ImageUploader onSelectCraft={setSelectedCraft} />
      <VerificationResult craft={selectedCraft} result={verificationResult} />
    </div>
  );
}`,
        vivaQuestion: "When should you lift state up in a component hierarchy?",
        vivaAnswer: "When two or more sibling components need access to the same piece of data, state is lifted to their lowest common ancestor, which then passes the state and updater functions down via props."
      },
      {
        name: "Tailwind CSS Utility-First & Responsive Breakpoints",
        summary: "Rapid styling using utility classes and responsive prefixes (sm:, md:, lg:, xl:) without writing separate CSS files.",
        codeSnippet: `<!-- Responsive 3-column grid with custom craft theme -->
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 md:p-8">
  <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
    ...
  </div>
</div>`,
        vivaQuestion: "What are the advantages of Tailwind CSS over traditional CSS files?",
        vivaAnswer: "Tailwind eliminates naming fatigue, prevents unused CSS bloat through Purge/Content scanning, enforces design consistency via tokens, and makes responsive design intuitive with breakpoint prefixes directly in markup."
      },
      {
        name: "Accessibility (a11y) & Semantic HTML",
        summary: "Using semantic tags (<header>, <nav>, <main>, <article>, <figure>) and ARIA labels for keyboard navigation and screen readers.",
        codeSnippet: `<article aria-labelledby={"craft-title-" + craft.id} className="focus-within:ring-2 ring-orange-500">
  <figure>
    <img src={craft.heroImage} alt={"Authentic specimen of " + craft.name + " from " + craft.district} />
    <figcaption className="sr-only">{craft.description}</figcaption>
  </figure>
  <h4 id={"craft-title-" + craft.id}>{craft.name}</h4>
</article>`,
        vivaQuestion: "Why is semantic HTML critical for web accessibility?",
        vivaAnswer: "Semantic HTML provides built-in browser keyboard navigation, screen reader landmarks, and correct role mappings without needing manual ARIA overrides."
      }
    ]
  },
  {
    id: "unit-3-hooks",
    unit: "Unit III",
    title: "States, Events, Hooks & Side Effects",
    topics: [
      {
        name: "useState & Functional State Updates",
        summary: "Managing local state and using functional updaters setVal(prev => ...) to avoid race conditions with batched state.",
        codeSnippet: `const [scanStep, setScanStep] = useState(0);

// Functional updater guarantees latest state even in async timers
const nextStep = () => {
  setScanStep(prevStep => (prevStep < 4 ? prevStep + 1 : prevStep));
};`,
        vivaQuestion: "Why should we use setCount(prev => prev + 1) instead of setCount(count + 1)?",
        vivaAnswer: "React batches state updates for performance. If multiple updates occur in the same event loop or async callback, using 'count + 1' can refer to a stale closure value, while 'prev => prev + 1' guarantees access to the latest queued state."
      },
      {
        name: "useEffect Lifecycle, Dependency Array & Cleanup",
        summary: "Handling side effects (timers, subscriptions, DOM listeners) and releasing resources in cleanup functions.",
        codeSnippet: `useEffect(() => {
  // Side effect: timer simulating progressive scan phases
  if (isScanning) {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 10;
      });
    }, 180);

    // CRITICAL: Effect cleanup function prevents memory leaks
    return () => clearInterval(timer);
  }
}, [isScanning]); // Runs only when isScanning changes`,
        vivaQuestion: "What happens if you omit the dependency array in useEffect?",
        vivaAnswer: "If omitted, the effect executes after every single render, causing severe performance degradation and potential infinite loops if state is updated inside the effect."
      },
      {
        name: "Performance Optimization: useMemo & useCallback",
        summary: "useMemo caches expensive computation results; useCallback caches function references between re-renders.",
        codeSnippet: `// useMemo avoids recalculating filter and stats on every render
const filteredCrafts = useMemo(() => {
  return ODOP_CRAFTS.filter(c => {
    const matchesCategory = category === 'All' || c.category === category;
    const matchesQuery = c.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });
}, [category, searchQuery]); // Recomputed only when inputs change

// useCallback preserves function reference across renders
const handleSelectCraft = useCallback((id) => {
  setSelectedId(id);
}, []);`,
        vivaQuestion: "When should you use useMemo in React?",
        vivaAnswer: "Use useMemo when computing heavy data (like filtering large lists or complex mathematical calculations) that would otherwise unnecessarily re-run on unrelated component re-renders."
      },
      {
        name: "Custom Hooks for Logic Abstraction",
        summary: "Extracting reusable stateful logic into custom functions starting with 'use'.",
        codeSnippet: `// Custom hook encapsulating verification workflow
export function useCraftVerification() {
  const [status, setStatus] = useState('idle');
  const [result, setResult] = useState(null);

  const startVerification = async (image, craftMetadata) => {
    setStatus('scanning');
    const analysis = await runAiFeatureComparison(image, craftMetadata);
    setResult(analysis);
    setStatus('complete');
  };

  return { status, result, startVerification, reset: () => setStatus('idle') };
}`,
        vivaQuestion: "What are the two official Rules of Hooks?",
        vivaAnswer: "1. Only call hooks at the top level of your component (never inside loops, conditions, or nested functions). 2. Only call hooks from React functional components or custom hooks."
      }
    ]
  },
  {
    id: "unit-4-forms",
    unit: "Unit IV",
    title: "Form Handling & Schema Validation with Zod",
    topics: [
      {
        name: "Controlled Components Pattern",
        summary: "Form elements whose values are controlled by React state via value and onChange props.",
        codeSnippet: `// Controlled input with two-way binding
<input
  type="text"
  id="giTagCode"
  value={formData.giTagCode}
  onChange={(e) => setFormData(prev => ({ ...prev, giTagCode: e.target.value }))}
  className="w-full border rounded-lg px-3 py-2"
/>`,
        vivaQuestion: "What is the difference between controlled and uncontrolled components in React?",
        vivaAnswer: "In a controlled component, form data is handled by React state (single source of truth). In an uncontrolled component, form data is handled directly by the DOM using refs (useRef)."
      },
      {
        name: "Schema-Based Validation with Zod",
        summary: "Declarative type-safe schema definitions for validating user inputs with expressive custom error messages.",
        codeSnippet: `import { z } from 'zod';

export const inspectionChecklistSchema = z.object({
  craftId: z.string().min(1, 'Please select an ODOP craft'),
  claimedPrice: z.number({ invalid_type_error: 'Price must be a number' })
    .positive('Price must be greater than zero'),
  giTagHologram: z.string()
    .regex(/^GI-[A-Z]{2}-\\d{4}-[A-Z0-9]{4}$/, 'Format must be GI-XX-0000-XXXX')
    .optional()
    .or(z.literal('')),
  ringTestPassed: z.boolean(),
  burnTestObservation: z.enum(['burnt_hair_ash', 'plastic_hard_bead', 'paper_ash', 'untested'], {
    errorMap: () => ({ message: 'Please select burn test observation' })
  }),
  sellerClaim: z.string().min(5, 'Seller description must be at least 5 characters')
});`,
        vivaQuestion: "Why is schema-based validation with Zod superior to manual if-else checks?",
        vivaAnswer: "Zod centralizes validation logic in one reusable schema, automatically infers TypeScript types, provides descriptive field-specific error messages, and cleanly decouples validation rules from component UI logic."
      },
      {
        name: "Handling Form Submission & Error States",
        summary: "Extracting Zod formatted errors and mapping them back to field-level UI indicators.",
        codeSnippet: `const handleSubmit = (e) => {
  e.preventDefault();
  const validation = inspectionChecklistSchema.safeParse(formData);

  if (!validation.success) {
    // Extract formatted errors by field name
    const fieldErrors = validation.error.flatten().fieldErrors;
    setErrors(fieldErrors);
    return;
  }

  // Clear errors and proceed
  setErrors({});
  onValidSubmit(validation.data);
};`,
        vivaQuestion: "What does safeParse() do in Zod?",
        vivaAnswer: "safeParse() validates data without throwing exceptions. It returns an object with '{ success: true, data }' if valid, or '{ success: false, error }' containing structured validation issues if invalid."
      }
    ]
  },
  {
    id: "ai-architecture",
    unit: "ODOP AI Logic",
    title: "How Pramaan AI Compares Visual Features (Explainable Viva Model)",
    topics: [
      {
        name: "Explainable 4-Pillar Visual Comparator",
        summary: "Instead of a black box model, Pramaan uses an explainable multi-factor inspection pipeline combining Computer Vision heuristics with official GI Registry records.",
        codeSnippet: `// 4-Pillar Feature Score Breakdown:
// 1. Weave Integrity (35%): Measures warp-weft irregularity & thread density
// 2. Motif Geometry (25%): Compares against registered heritage shapes (Kalka, Chinar)
// 3. Chromatic Spectrum (20%): Natural mineral/vegetal vs flat synthetic dye
// 4. GI Registry Validation (20%): Match against official District GI records

const compositeScore = Math.round(
  (weaveScore * 0.35) +
  (motifScore * 0.25) +
  (dyeScore * 0.20) +
  (giScore * 0.20)
);`,
        vivaQuestion: "If the examiner asks: 'How does your AI verify authenticity?' what is the exact answer?",
        vivaAnswer: "Pramaan inspects 4 distinct visual indicators: 1) Weave and fiber density (detecting handloom variation vs machine repetition); 2) Motif geometry (checking traditional artisan patterns against GI archives); 3) Chromatic spectrum (differentiating natural vegetable dye absorption from flat synthetic prints); and 4) GI Registry cross-check (validating district, registration number, and artisan guild)."
      }
    ]
  }
];

export const TOP_VIVA_QUESTIONS = [
  {
    q: "1. What is the full form of ODOP and why is it important?",
    a: "ODOP stands for 'One District One Product', an initiative by the Ministry of Commerce & Industry, Government of India. Its goal is to foster balanced regional development by promoting one unique local indigenous craft, agricultural produce, or textile from each of India's 700+ districts."
  },
  {
    q: "2. What is a GI (Geographical Indication) Tag?",
    a: "A Geographical Indication (GI) is an intellectual property right that identifies a product as originating from a specific geographical territory, where its reputation, quality, or characteristics are essentially attributable to that location (e.g., Kashmiri Pashmina, Banarasi Brocade)."
  },
  {
    q: "3. What is the difference between SPA and MPA?",
    a: "A Single Page Application (SPA) loads a single HTML page and dynamically updates content using client-side JavaScript routing without full page reloads, providing a smooth app-like experience. Multi-Page Applications (MPAs) request a new HTML document from the server on every link click."
  },
  {
    q: "4. What is React's Virtual DOM and Reconciliation?",
    a: "The Virtual DOM is a lightweight JavaScript object representation of the real DOM. When state changes, React creates a new VDOM tree, computes the minimal difference using a diffing algorithm (Reconciliation), and batches DOM mutations efficiently to optimize performance."
  },
  {
    q: "5. What are the rules of Hooks in React?",
    a: "Two cardinal rules: 1) Only call hooks at the top level of functional components (never in loops, if conditions, or nested functions); 2) Only call hooks from React function components or custom hooks."
  },
  {
    q: "6. Why did you use Zod for form validation?",
    a: "Zod provides declarative, type-safe schema validation. It separates validation rules from UI components, offers clear regex and custom error messages, and uses safeParse() to handle errors cleanly without crashing."
  },
  {
    q: "7. How do you prevent memory leaks when users upload images in React?",
    a: "When generating local image previews with URL.createObjectURL(file), we clean up the allocated blob URL using URL.revokeObjectURL(url) in the useEffect cleanup function or when a new image is selected."
  },
  {
    q: "8. How is immutability maintained in this project?",
    a: "State is never modified directly (e.g. no array.push or object.prop = value). Instead, we use spread operators (...prev), array transformation methods (.map, .filter, .reduce), and functional state updaters (prev => ({ ...prev }))."
  }
];
