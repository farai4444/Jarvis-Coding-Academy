import { CertificationTest } from '../types/curriculum';

export const TESTS: CertificationTest[] = [
  {
    id: 1,
    title: 'Test 1: Core Mental Models of Computing',
    difficulty: 'Assessment',
    points: 100,
    requiredPoints: 50,
    timeLimitMinutes: 15,
    description: 'Validates understanding of how computers execute instructions sequentially from top to bottom, variables, and data types.',
    questions: [
      {
        id: 1,
        question: 'In what order does Python execute standard statements in a script?',
        options: ['From bottom to top', 'Sequentially from top to bottom', 'In random order based on variable name', 'Simultaneously all at once'],
        correctIndex: 1,
        explanation: 'Programs execute in sequence from top to bottom, one statement after the previous finishes.'
      },
      {
        id: 2,
        question: 'What is the resulting data type of the expression: 10 / 2 in Python 3?',
        options: ['int (5)', 'float (5.0)', 'str ("5")', 'bool (True)'],
        correctIndex: 1,
        explanation: 'Standard division in Python (/) always returns a floating-point number (float).'
      },
      {
        id: 3,
        question: 'Which of the following variable names is INVALID in Python?',
        options: ['user_score', '_private_id', '2nd_player', 'totalAmount'],
        correctIndex: 2,
        explanation: 'Variable names cannot start with a numeral (e.g. 2nd_player is a SyntaxError).'
      }
    ],
    codingChallenge: {
      title: 'Variable Swap Without Hardcoding',
      prompt: 'Swap the values of a and b so that a gets 20 and b gets 10, without simply reassigning the literal numbers.',
      starterCode: 'a = 10\nb = 20\n# Swap the values of a and b\n',
      expectedOutput: '20\n10'
    }
  },
  {
    id: 2,
    title: 'Test 2: Numeric Types & Operator Precedence',
    difficulty: 'Assessment',
    points: 100,
    requiredPoints: 120,
    timeLimitMinutes: 15,
    description: 'Tests arithmetic operator precedence (PEMDAS), floor division, and modulo operations.',
    questions: [
      {
        id: 1,
        question: 'What is the evaluated result of: 2 + 3 * 4?',
        options: ['20', '14', '24', '18'],
        correctIndex: 1,
        explanation: 'Multiplication has higher precedence than addition: 3 * 4 = 12, then 2 + 12 = 14.'
      },
      {
        id: 2,
        question: 'What does 14 % 4 evaluate to?',
        options: ['3.5', '3', '2', '0'],
        correctIndex: 2,
        explanation: '14 divided by 4 is 3 with a remainder of 2. 4 * 3 + 2 = 14.'
      }
    ],
    codingChallenge: {
      title: 'Time Converter: Minutes to Hours and Minutes',
      prompt: 'Given total_mins = 135, compute hours using floor division and remaining minutes using modulo. Print f"{hours}h {mins}m".',
      starterCode: 'total_mins = 135\n# Compute hours and mins\n',
      expectedOutput: '2h 15m'
    }
  },
  {
    id: 3,
    title: 'Test 3: String Slicing & Formatting Under Pressure',
    difficulty: 'Assessment',
    points: 100,
    requiredPoints: 200,
    timeLimitMinutes: 20,
    description: 'Rigorous assessment of zero-based indexing, negative indexing, slice intervals, and f-string interpolation.',
    questions: [
      {
        id: 1,
        question: 'For s = "HELLO", what is s[-2]?',
        options: ['"O"', '"L"', '"E"', '"H"'],
        correctIndex: 1,
        explanation: 's[-1] is "O", and s[-2] is the second-to-last letter "L".'
      },
      {
        id: 2,
        question: 'What does "Python"[1:4] return?',
        options: ['"Pyt"', '"yth"', '"ytho"', '"P"'],
        correctIndex: 1,
        explanation: 'Indices 1, 2, 3 correspond to "y", "t", "h". The stop index 4 is exclusive.'
      }
    ],
    codingChallenge: {
      title: 'Domain Extractor',
      prompt: 'Extract the company domain from url = "https://google.com/search" and print "google".',
      starterCode: 'url = "https://google.com/search"\n# Extract domain "google"\n',
      expectedOutput: 'google'
    }
  },
  {
    id: 4,
    title: 'Test 4: Boolean Algebra & Branching Logic',
    difficulty: 'Assessment',
    points: 110,
    requiredPoints: 280,
    timeLimitMinutes: 20,
    description: 'Examines compound boolean logic (and, or, not), truth tables, and if-elif-else execution trees.',
    questions: [
      {
        id: 1,
        question: 'What does the expression `not (True and False)` evaluate to?',
        options: ['True', 'False', 'None', 'Error'],
        correctIndex: 0,
        explanation: 'True and False is False. `not False` is True.'
      },
      {
        id: 2,
        question: 'In Python, which of the following evaluates to False (falsy)?',
        options: ['"" (empty string)', '0 (zero)', '[] (empty list)', 'All of the above'],
        correctIndex: 3,
        explanation: 'Empty collections, zero numbers, and empty strings are all falsy in Python.'
      }
    ],
    codingChallenge: {
      title: 'Tax Bracket Calculator',
      prompt: 'For income = 45000: if income <= 30000 tax is 10%, elif income <= 60000 tax is 20%, else 30%. Print calculated tax as an integer.',
      starterCode: 'income = 45000\n# Calculate and print tax\n',
      expectedOutput: '9000'
    }
  },
  {
    id: 5,
    title: 'Test 5: While-Loop Termination & Infinite Loop Guards',
    difficulty: 'Assessment',
    points: 110,
    requiredPoints: 360,
    timeLimitMinutes: 20,
    description: 'Diagnoses state mutation inside loops, exit guards, and break statements.',
    questions: [
      {
        id: 1,
        question: 'What causes an infinite loop in a while loop?',
        options: ['Using a break statement', 'The loop condition never becomes False', 'Printing inside the loop', 'Using an integer variable'],
        correctIndex: 1,
        explanation: 'A while loop repeats until its condition evaluates to False. If variables never update to trigger False, it runs forever.'
      }
    ],
    codingChallenge: {
      title: 'Halving Accumulator',
      prompt: 'Starting at x = 64, while x > 1, floor divide x by 2 (x //= 2) and count how many steps it takes. Print the step count.',
      starterCode: 'x = 64\nsteps = 0\n# Halve x until <= 1\n',
      expectedOutput: '6'
    }
  },
  {
    id: 6,
    title: 'Test 6: For-Loop Iteration & Range Indexing',
    difficulty: 'Assessment',
    points: 120,
    requiredPoints: 440,
    timeLimitMinutes: 20,
    description: 'Validates mastery of range() intervals, loop indexing, and string traversal.',
    questions: [
      {
        id: 1,
        question: 'How many times will `for i in range(2, 10, 3):` execute?',
        options: ['8 times', '3 times (2, 5, 8)', '4 times (2, 5, 8, 11)', '2 times'],
        correctIndex: 1,
        explanation: 'Values are 2, 5, 8. Next is 11, which exceeds the stop limit 10. Total: 3 turns.'
      }
    ],
    codingChallenge: {
      title: 'Sum of Odd Numbers',
      prompt: 'Compute the sum of all odd integers from 1 to 15 (inclusive) using a for loop. Print the sum.',
      starterCode: '# Sum odd numbers from 1 to 15\n',
      expectedOutput: '64'
    }
  },
  {
    id: 7,
    title: 'Test 7: Loop Accumulators & Reductions',
    difficulty: 'Assessment',
    points: 120,
    requiredPoints: 520,
    timeLimitMinutes: 20,
    description: 'Tests tracking maximums, running totals, and flags during loop passes.',
    questions: [
      {
        id: 1,
        question: 'To find the largest number in a list with a loop, what should max_val initially be set to?',
        options: ['100', '0 (might fail if all numbers are negative)', 'The first element of the list', 'None'],
        correctIndex: 2,
        explanation: 'Setting max_val to the first element guarantees correct comparison even if all values are negative.'
      }
    ],
    codingChallenge: {
      title: 'Manual List Maximum',
      prompt: 'Without using max(), find the largest number in nums = [-5, -1, -12, -3] using a loop. Print the result.',
      starterCode: 'nums = [-5, -1, -12, -3]\n# Find maximum without max()\n',
      expectedOutput: '-1'
    }
  },
  {
    id: 8,
    title: 'Test 8: Function Signature, Scope & Purity',
    difficulty: 'Assessment',
    points: 125,
    requiredPoints: 600,
    timeLimitMinutes: 25,
    description: 'Evaluates parameters, return statements vs print calls, and local variable encapsulation.',
    questions: [
      {
        id: 1,
        question: 'What is returned by a Python function that does not contain a return statement?',
        options: ['0', 'False', 'None', 'SyntaxError'],
        correctIndex: 2,
        explanation: 'Functions without an explicit return statement implicitly return Python\'s None object.'
      }
    ],
    codingChallenge: {
      title: 'Pure Temperature Converter',
      prompt: 'Define c_to_f(celsius) that returns (celsius * 1.8) + 32. Print c_to_f(100).',
      starterCode: '# Define c_to_f\n',
      expectedOutput: '212.0'
    }
  },
  {
    id: 9,
    title: 'Test 9: Default & Keyword Arguments Mastery',
    difficulty: 'Assessment',
    points: 125,
    requiredPoints: 680,
    timeLimitMinutes: 20,
    description: 'Tests optional arguments, positional ordering, and flexible function APIs.',
    questions: [
      {
        id: 1,
        question: 'Where must parameters with default values be placed in a function signature?',
        options: ['At the beginning before positional parameters', 'At the end after non-default parameters', 'Anywhere in any order', 'Inside a tuple'],
        correctIndex: 1,
        explanation: 'Parameters with defaults must follow all non-default parameters, otherwise a SyntaxError occurs.'
      }
    ],
    codingChallenge: {
      title: 'Power Function with Default Exponent',
      prompt: 'Define power(base, exp=2) returning base ** exp. Print power(5) and power(2, 4) on separate lines.',
      starterCode: '# Define power with default exp=2\n',
      expectedOutput: '25\n16'
    }
  },
  {
    id: 10,
    title: 'Test 10: Mid-Course Comprehensive Core Exam',
    difficulty: 'Exam',
    points: 175,
    requiredPoints: 760,
    timeLimitMinutes: 30,
    description: 'Comprehensive mid-term synthesizing variables, math, strings, conditionals, loops, and functions.',
    questions: [
      {
        id: 1,
        question: 'Which statement accurately describes immutable types in Python?',
        options: ['Their values can be modified in place', 'Strings and integers cannot be changed after creation', 'They use more RAM than lists', 'They cannot be used as function arguments'],
        correctIndex: 1,
        explanation: 'Strings, ints, and floats are immutable; operations on them create brand new objects.'
      }
    ],
    codingChallenge: {
      title: 'FizzBuzz Classic Algorithm',
      prompt: 'Loop i from 1 to 15. For multiples of 3 and 5 print "FizzBuzz", multiples of 3 print "Fizz", multiples of 5 print "Buzz", else print i.',
      starterCode: '# Loop 1 to 15 with FizzBuzz logic\n',
      expectedOutput: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz'
    }
  },
  {
    id: 11,
    title: 'Test 11: List Mutation, Indexing & Slicing',
    difficulty: 'Assessment',
    points: 130,
    requiredPoints: 840,
    timeLimitMinutes: 20,
    description: 'Tests mutable list operations, insertion, deletion, and sublist slicing.',
    questions: [
      {
        id: 1,
        question: 'What is the difference between list.append(x) and list.extend([x])?',
        options: ['No difference', 'append adds x as a single element; extend iterates and adds each item of the iterable', 'extend is deprecated', 'append only works for numbers'],
        correctIndex: 1,
        explanation: 'list.append([1, 2]) adds a nested list; list.extend([1, 2]) unpacks and adds 1 and 2 individually.'
      }
    ],
    codingChallenge: {
      title: 'Remove Duplicates Preserving Order',
      prompt: 'From items = [4, 2, 4, 1, 2, 5], create unique_items keeping original first-seen order. Print unique_items.',
      starterCode: 'items = [4, 2, 4, 1, 2, 5]\n# Deduplicate preserving order\n',
      expectedOutput: '[4, 2, 1, 5]'
    }
  },
  {
    id: 12,
    title: 'Test 12: List Search & Linear Filtering',
    difficulty: 'Assessment',
    points: 130,
    requiredPoints: 920,
    timeLimitMinutes: 25,
    description: 'Tests finding elements, computing averages, and filtering lists based on compound criteria.',
    questions: [
      {
        id: 1,
        question: 'What happens when calling list.remove(val) if val does not exist in the list?',
        options: ['Returns False', 'Silently does nothing', 'Raises a ValueError', 'Removes the last item'],
        correctIndex: 2,
        explanation: '.remove(x) raises a ValueError if x is not found in the list.'
      }
    ],
    codingChallenge: {
      title: 'Filter Passing Grades',
      prompt: 'Given grades = [55, 82, 90, 64, 45, 95], filter and print only those >= 70.',
      starterCode: 'grades = [55, 82, 90, 64, 45, 95]\n# Filter >= 70\n',
      expectedOutput: '[82, 90, 95]'
    }
  },
  {
    id: 13,
    title: 'Test 13: 2D Matrix Grid Operations',
    difficulty: 'Assessment',
    points: 140,
    requiredPoints: 1000,
    timeLimitMinutes: 25,
    description: 'Tests indexing rows and columns in 2D lists (lists of lists).',
    questions: [
      {
        id: 1,
        question: 'For matrix = [[1, 2], [3, 4]], how do you access the number 3?',
        options: ['matrix[1][0]', 'matrix[0][1]', 'matrix[3]', 'matrix[1, 0]'],
        correctIndex: 0,
        explanation: 'Row index 1 is [3, 4], and column index 0 within that row is 3.'
      }
    ],
    codingChallenge: {
      title: 'Diagonal Sum in 3x3 Matrix',
      prompt: 'Given matrix = [[1, 0, 0], [0, 5, 0], [0, 0, 9]], calculate the sum of its main diagonal (top-left to bottom-right). Print sum.',
      starterCode: 'matrix = [[1, 0, 0], [0, 5, 0], [0, 0, 9]]\n# Sum main diagonal\n',
      expectedOutput: '15'
    }
  },
  {
    id: 14,
    title: 'Test 14: Dictionary Lookups & Safe Key Retrieval',
    difficulty: 'Assessment',
    points: 135,
    requiredPoints: 1080,
    timeLimitMinutes: 20,
    description: 'Examines hash map fundamentals, KeyError prevention with .get(), and key membership.',
    questions: [
      {
        id: 1,
        question: 'Why is dictionary key lookup generally faster than searching an unsorted list?',
        options: ['Dictionaries use sorted arrays', 'Dictionaries are stored in hash tables with O(1) average lookup', 'Python caches all dictionaries in CPU registers', 'Dictionaries can only store 10 items'],
        correctIndex: 1,
        explanation: 'Dictionaries use hash tables, allowing constant-time O(1) average key lookups.'
      }
    ],
    codingChallenge: {
      title: 'Safe Configuration Reader',
      prompt: 'Given settings = {"volume": 80}, retrieve "brightness" with fallback default 100, and "volume". Print f"V:{vol} B:{bright}".',
      starterCode: 'settings = {"volume": 80}\n# Retrieve volume and brightness\n',
      expectedOutput: 'V:80 B:100'
    }
  },
  {
    id: 15,
    title: 'Test 15: Frequency Maps & Aggregation',
    difficulty: 'Assessment',
    points: 140,
    requiredPoints: 1150,
    timeLimitMinutes: 25,
    description: 'Build frequency count tables for words and characters.',
    questions: [
      {
        id: 1,
        question: 'Which dictionary method returns both the keys and values as tuple pairs?',
        options: ['.keys()', '.values()', '.items()', '.entries()'],
        correctIndex: 2,
        explanation: '.items() yields (key, value) pairs during iteration.'
      }
    ],
    codingChallenge: {
      title: 'Word Length Mapping',
      prompt: 'Given words = ["cat", "elephant", "dog"], create a dict mapping each word to its character length. Print the dictionary.',
      starterCode: 'words = ["cat", "elephant", "dog"]\n# Map word to length\n',
      expectedOutput: "{'cat': 3, 'elephant': 8, 'dog': 3}"
    }
  },
  {
    id: 16,
    title: 'Test 16: Set Operations & Uniqueness',
    difficulty: 'Assessment',
    points: 130,
    requiredPoints: 1220,
    timeLimitMinutes: 20,
    description: 'Tests mathematical set operations: union (|), intersection (&), and difference (-).',
    questions: [
      {
        id: 1,
        question: 'What is the intersection of {1, 2, 3} & {2, 3, 4}?',
        options: ['{1, 4}', '{2, 3}', '{1, 2, 3, 4}', '{}'],
        correctIndex: 1,
        explanation: 'Intersection (&) keeps only items that exist in BOTH sets: {2, 3}.'
      }
    ],
    codingChallenge: {
      title: 'Common Elements in Two Lists',
      prompt: 'Find common numbers between list1 = [1, 2, 3, 4] and list2 = [3, 4, 5, 6] using sets. Print sorted list of common numbers.',
      starterCode: 'list1 = [1, 2, 3, 4]\nlist2 = [3, 4, 5, 6]\n# Find common elements\n',
      expectedOutput: '[3, 4]'
    }
  },
  {
    id: 17,
    title: 'Test 17: String Parsing & Sanitization Challenge',
    difficulty: 'Assessment',
    points: 135,
    requiredPoints: 1280,
    timeLimitMinutes: 25,
    description: 'Extract and clean structured values from raw unformatted user text.',
    questions: [
      {
        id: 1,
        question: 'What does "123".isdigit() return for the string "123.45"?',
        options: ['True', 'False (the decimal point is not a digit)', 'None', 'ValueError'],
        correctIndex: 1,
        explanation: '.isdigit() returns False because "." is a punctuation mark, not a digit.'
      }
    ],
    codingChallenge: {
      title: 'Sanitize Phone Number',
      prompt: 'Given raw = "(555) 123-4567", strip all non-digit characters and print the clean 10-digit string "5551234567".',
      starterCode: 'raw = "(555) 123-4567"\n# Strip non-digits\n',
      expectedOutput: '5551234567'
    }
  },
  {
    id: 18,
    title: 'Test 18: Exception Handling & Defensive Input',
    difficulty: 'Assessment',
    points: 140,
    requiredPoints: 1340,
    timeLimitMinutes: 25,
    description: 'Tests try/except blocks, catching ValueError, and preventing unhandled crashes.',
    questions: [
      {
        id: 1,
        question: 'Which block in a try-except statement executes regardless of whether an exception occurred?',
        options: ['catch', 'else', 'finally', 'rescue'],
        correctIndex: 2,
        explanation: 'The `finally` block always executes whether an error was raised or not.'
      }
    ],
    codingChallenge: {
      title: 'Safe Integer Parsing Function',
      prompt: 'Define safe_int(val, default=0). If int(val) raises ValueError, return default. Print safe_int("abc", -1) and safe_int("42").',
      starterCode: '# Define safe_int with try/except\n',
      expectedOutput: '-1\n42'
    }
  },
  {
    id: 19,
    title: 'Test 19: Recursion Fundamentals & Base Cases',
    difficulty: 'Exam',
    points: 160,
    requiredPoints: 1400,
    timeLimitMinutes: 30,
    description: 'Tests base case termination, call stack mental models, and recursive descent.',
    questions: [
      {
        id: 1,
        question: 'What happens if a recursive function does not have a reachable base case?',
        options: ['It returns 0', 'It raises RecursionError (Maximum recursion depth exceeded)', 'The CPU turns off', 'It restarts Python'],
        correctIndex: 1,
        explanation: 'Python raises RecursionError when the call stack reaches its safety recursion limit (default 1000).'
      }
    ],
    codingChallenge: {
      title: 'Recursive Factorial',
      prompt: 'Implement rec_fact(n): if n <= 1 return 1, else return n * rec_fact(n - 1). Print rec_fact(5).',
      starterCode: '# Implement recursive factorial\n',
      expectedOutput: '120'
    }
  },
  {
    id: 20,
    title: 'Test 20: Algorithmic Complexity (Big-O Mental Model)',
    difficulty: 'Exam',
    points: 160,
    requiredPoints: 1460,
    timeLimitMinutes: 25,
    description: 'Evaluates theoretical efficiency: O(1) constant time, O(N) linear time, and O(N^2) quadratic nested loops.',
    questions: [
      {
        id: 1,
        question: 'What is the time complexity of scanning an unsorted list of length N for a specific target value?',
        options: ['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'],
        correctIndex: 2,
        explanation: 'Linear search inspects up to N elements one by one, giving O(N) time complexity.'
      },
      {
        id: 2,
        question: 'What is the time complexity of two nested loops each running from 0 to N?',
        options: ['O(N)', 'O(2N)', 'O(N^2)', 'O(1)'],
        correctIndex: 2,
        explanation: 'For each of the N outer iterations, the inner loop runs N times, resulting in N * N = O(N^2).'
      }
    ],
    codingChallenge: {
      title: 'Two-Sum Target Finder',
      prompt: 'Given nums = [2, 7, 11, 15] and target = 9, find indices i, j such that nums[i] + nums[j] == target. Print f"[{i}, {j}]".',
      starterCode: 'nums = [2, 7, 11, 15]\ntarget = 9\n# Find pair that sums to 9\n',
      expectedOutput: '[0, 1]'
    }
  },
  {
    id: 21,
    title: 'Test 21: Sorting & Searching Logic Assessment',
    difficulty: 'Exam',
    points: 165,
    requiredPoints: 1520,
    timeLimitMinutes: 30,
    description: 'Assess bubble sort passes, binary search logic, and custom sort keys.',
    questions: [
      {
        id: 1,
        question: 'In Binary Search, what condition must the list meet beforehand?',
        options: ['All numbers must be positive', 'The list must already be sorted', 'The list must contain no duplicates', 'The length must be a power of 2'],
        correctIndex: 1,
        explanation: 'Binary search divides the search space in half based on magnitude, which requires the list to be sorted.'
      }
    ],
    codingChallenge: {
      title: 'One Pass Bubble Sort',
      prompt: 'Implement one pass of bubble sort on lst = [5, 1, 4, 2, 8]: swap adjacent elements if left > right. Print lst.',
      starterCode: 'lst = [5, 1, 4, 2, 8]\n# Run one bubble pass\n',
      expectedOutput: '[1, 4, 2, 5, 8]'
    }
  },
  {
    id: 22,
    title: 'Test 22: Clean Code, Refactoring & PEP 8',
    difficulty: 'Assessment',
    points: 150,
    requiredPoints: 1580,
    timeLimitMinutes: 20,
    description: 'Evaluates naming conventions, function cohesion, DRY (Don\'t Repeat Yourself), and clean readability.',
    questions: [
      {
        id: 1,
        question: 'According to PEP 8, what is the standard naming convention for functions and variables in Python?',
        options: ['camelCase', 'snake_case', 'PascalCase', 'SCREAMING_SNAKE'],
        correctIndex: 1,
        explanation: 'Python standards mandate snake_case (lowercase with underscores) for functions and variables.'
      }
    ],
    codingChallenge: {
      title: 'Refactor Redundant Branching',
      prompt: 'Simplify the function `def is_teen(age): return age >= 13 and age <= 19`. Print is_teen(15) and is_teen(25).',
      starterCode: '# Refactor is_teen\n',
      expectedOutput: 'True\nFalse'
    }
  },
  {
    id: 23,
    title: 'Test 23: Edge Case Hunting & Bug Diagnosis',
    difficulty: 'Exam',
    points: 175,
    requiredPoints: 1640,
    timeLimitMinutes: 30,
    description: 'Identify Off-By-One errors, mutable default argument traps, and IndexError boundary mistakes.',
    questions: [
      {
        id: 1,
        question: 'Why is `def append_to(item, target_list=[]):` considered a dangerous anti-pattern in Python?',
        options: ['It causes a syntax error', 'The default list is instantiated once at function definition and shared across all calls', 'Lists cannot be default values', 'It makes the function run in O(N^2)'],
        correctIndex: 1,
        explanation: 'Default arguments are evaluated once when the function is defined. A mutable default list persists state between calls!'
      }
    ],
    codingChallenge: {
      title: 'Fix the Off-By-One Loop',
      prompt: 'The programmer wanted to print numbers 1 through 5, but wrote `for i in range(1, 5):`. Fix it so it prints 1 through 5 inclusive.',
      starterCode: '# Fix loop range\nfor i in range(1, 5):\n    print(i)\n',
      expectedOutput: '1\n2\n3\n4\n5'
    }
  },
  {
    id: 24,
    title: 'Test 24: Practical Problem Solving Gauntlet',
    difficulty: 'Exam',
    points: 200,
    requiredPoints: 1700,
    timeLimitMinutes: 35,
    description: 'Tri-part technical problem solving under time pressure without external aids.',
    questions: [
      {
        id: 1,
        question: 'Which algorithmic pattern is ideal for checking whether a string has balanced parentheses "((()))"?',
        options: ['Hash Map frequency', 'LIFO Stack', 'Greedy Choice', 'Bubble Sort'],
        correctIndex: 1,
        explanation: 'A Last-In-First-Out (LIFO) stack pushes opening brackets and pops matching closing brackets.'
      }
    ],
    codingChallenge: {
      title: 'Run Length Encoding',
      prompt: 'Compress "AAABBC" into "A3B2C1". Print the compressed string.',
      starterCode: 'text = "AAABBC"\n# Compress to A3B2C1\n',
      expectedOutput: 'A3B2C1'
    }
  },
  {
    id: 25,
    title: 'Test 25: The Certified Junior Programmer Final Capstone Exam',
    difficulty: 'Capstone',
    points: 250,
    requiredPoints: 1760,
    timeLimitMinutes: 45,
    description: 'The ultimate graduation exam for JARVIS Code Academy! Synthesizes full computational thinking, algorithmic purity, and clean software architecture.',
    questions: [
      {
        id: 1,
        question: 'What fundamental principle distinguishes authentic human programming from rote copy-pasting?',
        options: ['Typing speed alone', 'Deep mental models of state, control flow, and data transformation', 'Memorizing library documentation', 'Using complex one-liners'],
        correctIndex: 1,
        explanation: 'True programming is internalizing mental models of logic, control flow, and systematic problem solving.'
      },
      {
        id: 2,
        question: 'When designing robust software, why should functions strive to be pure (no unintended side effects)?',
        options: ['They run 100x faster', 'They are predictable, testable, and do not mutate global state unexpectedly', 'They require no parameters', 'They fit on one line'],
        correctIndex: 1,
        explanation: 'Pure functions produce identical output for identical input and avoid mutating outside state, preventing hard-to-find bugs.'
      }
    ],
    codingChallenge: {
      title: 'The Master Inventory & Discount Synthesizer',
      prompt: 'Write a program that takes orders = [{"item": "book", "qty": 3, "price": 10}, {"item": "pen", "qty": 10, "price": 2}], computes subtotal, applies 10% discount if subtotal >= 50, and prints: f"Subtotal: ${subtotal} | Final: ${final_total:.2f}".',
      starterCode: 'orders = [\n    {"item": "book", "qty": 3, "price": 10},\n    {"item": "pen", "qty": 10, "price": 2}\n]\n# Calculate subtotal and final with discount\n',
      expectedOutput: 'Subtotal: $50 | Final: $45.00'
    }
  }
];
