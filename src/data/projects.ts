import { Project } from '../types/curriculum';

export const PROJECTS: Project[] = [
  // TIER 1: Command-Line Utilities (Projects 1 - 10)
  {
    id: 1,
    tier: 1,
    tierName: 'Tier 1: Command-Line Utilities',
    title: 'Restaurant Bill & Tip Optimizer',
    difficulty: 'Beginner',
    points: 60,
    requiredPoints: 100,
    category: 'Finance',
    overview: 'Build an automated bill splitting tool that prompts for the total bill, desired tip percentage, and group size, then outputs individual contributions with clean decimal formatting.',
    deliverables: [
      'Prompt for bill subtotal, tip percentage (e.g. 15, 18, 20), and number of diners.',
      'Calculate tip amount, total bill with tip, and amount per person.',
      'Format currency cleanly to two decimal places (e.g. $24.50).'
    ],
    starterTemplate: `# Project 1: Bill & Tip Optimizer
def calculate_bill_split(subtotal: float, tip_percent: float, people: int):
    # Your calculation here
    pass

if __name__ == "__main__":
    subtotal = 85.00
    tip = 18.0
    diners = 3
    # Call your function and print results
`,
    rubrics: [
      { criterion: 'Accurate tip and per-person math', weight: 40 },
      { criterion: 'Clean 2-decimal formatting', weight: 30 },
      { criterion: 'Zero-division and edge-case handling', weight: 30 }
    ],
    hints: ['Remember that 18% is 0.18 in math: tip_amount = subtotal * (tip_percent / 100).', 'Use f-string formatting: f"${share:.2f}"']
  },
  {
    id: 2,
    tier: 1,
    tierName: 'Tier 1: Command-Line Utilities',
    title: 'Interactive Mad Libs Story Engine',
    difficulty: 'Beginner',
    points: 60,
    requiredPoints: 130,
    category: 'Creative',
    overview: 'Create a dynamic storytelling generator that collects parts of speech (nouns, verbs, adjectives) and injects them into a humorous narrative template.',
    deliverables: [
      'Collect at least 5 distinct inputs (e.g., hero_name, adjective, creature, verb, place).',
      'Inject inputs into a structured multi-line story template using f-strings.',
      'Validate that inputs are not left empty.'
    ],
    starterTemplate: `# Project 2: Mad Libs Story Engine
def generate_story(hero: str, adj: str, creature: str, verb: str, place: str) -> str:
    # Build your comedic narrative here
    return ""

print(generate_story("Arthur", "mysterious", "dragon", "galloped", "Mount Olympus"))
`,
    rubrics: [
      { criterion: 'Structured story template with all variables', weight: 50 },
      { criterion: 'Clean input handling and whitespace stripping', weight: 30 },
      { criterion: 'Creative coherence of generated narrative', weight: 20 }
    ],
    hints: ['Use .strip() on input strings to eliminate accidental leading or trailing spaces.']
  },
  {
    id: 3,
    tier: 1,
    tierName: 'Tier 1: Command-Line Utilities',
    title: 'Caesar Cipher Secret Messenger',
    difficulty: 'Intermediate',
    points: 75,
    requiredPoints: 160,
    category: 'Security',
    overview: 'Implement the classical Caesar Cipher algorithm to encrypt and decrypt secret messages by shifting letters forward or backward through the alphabet.',
    deliverables: [
      'Function encrypt(text: str, shift: int) that shifts alphabetic characters.',
      'Function decrypt(ciphertext: str, shift: int) that inverts the shift.',
      'Preserve casing (uppercase stays uppercase) and keep punctuation/spaces intact.'
    ],
    starterTemplate: `# Project 3: Caesar Cipher
def encrypt_caesar(text: str, shift: int = 3) -> str:
    # Encrypt characters
    pass

def decrypt_caesar(ciphertext: str, shift: int = 3) -> str:
    # Invert shift
    pass
`,
    rubrics: [
      { criterion: 'Correct modulo 26 alphabet wrapping', weight: 45 },
      { criterion: 'Preservation of non-alphabetic punctuation', weight: 35 },
      { criterion: 'Reversible round-trip encryption/decryption', weight: 20 }
    ],
    hints: ['The ord() and chr() built-in functions convert letters to numbers and back! ord("a") is 97.']
  },
  {
    id: 4,
    tier: 1,
    tierName: 'Tier 1: Command-Line Utilities',
    title: 'Rock, Paper, Scissors Tournament',
    difficulty: 'Beginner',
    points: 65,
    requiredPoints: 200,
    category: 'Games',
    overview: 'Build a best-of-5 tournament game against a simulated computer opponent that tracks round wins, ties, and announces the tournament champion.',
    deliverables: [
      'Generate random or scripted computer choices ("rock", "paper", "scissors").',
      'Evaluate win, loss, and tie conditions per round.',
      'Track cumulative scores and declare the winner when a player reaches 3 wins.'
    ],
    starterTemplate: `# Project 4: Rock Paper Scissors Tournament
def determine_winner(player: str, computer: str) -> str:
    # Returns "player", "computer", or "tie"
    pass

def play_round(player_move: str, computer_move: str):
    pass
`,
    rubrics: [
      { criterion: 'Accurate rule evaluation for all 9 move combinations', weight: 50 },
      { criterion: 'Scorekeeping state machine', weight: 30 },
      { criterion: 'Input normalization (.lower().strip())', weight: 20 }
    ],
    hints: ['Rock beats Scissors, Scissors beats Paper, Paper beats Rock. Everything else with identical moves is a tie!']
  },
  {
    id: 5,
    tier: 1,
    tierName: 'Tier 1: Command-Line Utilities',
    title: 'Password Strength Sentinel',
    difficulty: 'Intermediate',
    points: 70,
    requiredPoints: 240,
    category: 'Security',
    overview: 'Evaluate password complexity against NIST security guidelines and generate a composite strength score with constructive hardening recommendations.',
    deliverables: [
      'Check minimum length of 8 characters (bonus for 12+).',
      'Check for presence of uppercase, lowercase, numbers, and symbols.',
      'Assign a score from 1 (Weak) to 5 (Invulnerable) and provide missing criteria.'
    ],
    starterTemplate: `# Project 5: Password Sentinel
def assess_password(pwd: str) -> dict:
    # Evaluate criteria and return score + feedback list
    return {"score": 0, "status": "Weak", "suggestions": []}
`,
    rubrics: [
      { criterion: 'Thorough character diversity inspection', weight: 40 },
      { criterion: 'Actionable suggestions generation', weight: 30 },
      { criterion: 'Structured dictionary output', weight: 30 }
    ],
    hints: ['You can check string methods like .isupper(), .islower(), .isdigit(), and check symbol membership in "!@#$%^&*".']
  },
  {
    id: 6,
    tier: 1,
    tierName: 'Tier 1: Command-Line Utilities',
    title: 'BMI & Body Composition Health Advisor',
    difficulty: 'Beginner',
    points: 60,
    requiredPoints: 280,
    category: 'Health',
    overview: 'Calculate Body Mass Index (BMI) from metric or imperial units and output WHO health categories alongside recommended weight bands.',
    deliverables: [
      'Calculate BMI using formula: weight_kg / (height_m ** 2).',
      'Classify into Underweight (<18.5), Normal (18.5-24.9), Overweight (25-29.9), or Obese (30+).',
      'Compute healthy target weight range for the user\'s height.'
    ],
    starterTemplate: `# Project 6: BMI Health Advisor
def compute_bmi(weight_kg: float, height_m: float) -> dict:
    pass
`,
    rubrics: [
      { criterion: 'Correct mathematical calculation', weight: 45 },
      { criterion: 'Accurate boundary classification', weight: 35 },
      { criterion: 'Formatting and clean user reporting', weight: 20 }
    ],
    hints: ['Height must be in meters squared. For example, 175 cm is 1.75 meters.']
  },
  {
    id: 7,
    tier: 1,
    tierName: 'Tier 1: Command-Line Utilities',
    title: 'Universal Unit & Currency Converter',
    difficulty: 'Intermediate',
    points: 70,
    requiredPoints: 320,
    category: 'Productivity',
    overview: 'Build a multi-category conversion engine supporting distances (km/miles), temperatures (C/F/K), and weights (kg/lbs) with a dictionary rate matrix.',
    deliverables: [
      'Support bidirectional conversions between at least 3 metric/imperial pairs.',
      'Use a dictionary dispatch table for clean conversion factors.',
      'Gracefully handle unknown unit codes with clear error messages.'
    ],
    starterTemplate: `# Project 7: Universal Converter
def convert_unit(val: float, from_u: str, to_u: str) -> float:
    pass
`,
    rubrics: [
      { criterion: 'Data-driven dictionary architecture', weight: 40 },
      { criterion: 'Calculation accuracy', weight: 40 },
      { criterion: 'Robust error handling', weight: 20 }
    ],
    hints: ['1 kilometer is 0.621371 miles. 1 kilogram is 2.20462 pounds.']
  },
  {
    id: 8,
    tier: 1,
    tierName: 'Tier 1: Command-Line Utilities',
    title: 'Smart Grocery Cart & Receipt Printer',
    difficulty: 'Intermediate',
    points: 75,
    requiredPoints: 360,
    category: 'Finance',
    overview: 'Model a shopping cart supporting item additions, quantity updates, sales tax computation, coupon code discounts, and a formatted ASCII receipt.',
    deliverables: [
      'Data structure storing item name, unit price, and quantity.',
      'Calculate subtotal, discount, 8% tax, and grand total.',
      'Print an aligned ASCII receipt with itemized lines and totals.'
    ],
    starterTemplate: `# Project 8: Grocery Receipt Printer
def print_receipt(cart: list, discount_code: str = ""):
    pass
`,
    rubrics: [
      { criterion: 'Accurate arithmetic with discounts and tax', weight: 40 },
      { criterion: 'Aligned ASCII formatting with string padding', weight: 40 },
      { criterion: 'Empty cart edge-case handling', weight: 20 }
    ],
    hints: ['Use string formatting like f"{item:<15} {qty:>3} x \${price:>6.2f}" to align table columns cleanly!']
  },
  {
    id: 9,
    tier: 1,
    tierName: 'Tier 1: Command-Line Utilities',
    title: 'Secret Number Binary Search Guesser',
    difficulty: 'Beginner',
    points: 60,
    requiredPoints: 400,
    category: 'Games',
    overview: 'Create a number guessing game that gives "Too High" / "Too Low" clues, limits attempts to 7, and implements an AI computer solver using binary search.',
    deliverables: [
      'Generate random secret between 1 and 100.',
      'Track guess count and give directional hints.',
      'Demonstrate a helper bot that guesses in <= 7 turns using binary search.'
    ],
    starterTemplate: `# Project 9: Binary Guesser
def binary_search_solver(target: int, low: int = 1, high: int = 100) -> list:
    guesses = []
    # Binary search simulation
    return guesses
`,
    rubrics: [
      { criterion: 'Working binary search logic', weight: 50 },
      { criterion: 'Guaranteed logarithmic convergence (<= 7 steps)', weight: 30 },
      { criterion: 'Feedback tracking', weight: 20 }
    ],
    hints: ['Midpoint calculation: mid = (low + high) // 2. If target > mid, low = mid + 1.']
  },
  {
    id: 10,
    tier: 1,
    tierName: 'Tier 1: Command-Line Utilities',
    title: 'Dice Probability & Monte Carlo Simulator',
    difficulty: 'Intermediate',
    points: 75,
    requiredPoints: 440,
    category: 'Science',
    overview: 'Simulate rolling two 6-sided dice 10,000 times to calculate empirical probabilities of sums (2 to 12) and display an ASCII histogram of the bell curve.',
    deliverables: [
      'Run N simulations of rolling two random 6-sided dice.',
      'Record frequencies of each sum from 2 to 12 in a dictionary.',
      'Print empirical percentage vs theoretical percentage alongside an ASCII bar chart.'
    ],
    starterTemplate: `# Project 10: Dice Monte Carlo Simulator
def simulate_dice_rolls(trials: int = 10000) -> dict:
    pass
`,
    rubrics: [
      { criterion: 'Correct frequency accumulation across trials', weight: 40 },
      { criterion: 'ASCII histogram rendering (# bars)', weight: 35 },
      { criterion: 'Statistical comparison to theoretical curve', weight: 25 }
    ],
    hints: ['The sum 7 is the most probable outcome (6/36 = 16.67%). Your simulation should hover around 16.6%!']
  },

  // TIER 2: Interactive Games & Text Simulations (Projects 11 - 20)
  {
    id: 11,
    tier: 2,
    tierName: 'Tier 2: Interactive Games & Simulations',
    title: 'Hangman Word Rescue Game',
    difficulty: 'Intermediate',
    points: 85,
    requiredPoints: 480,
    category: 'Games',
    overview: 'Build the classic word-guessing game with masked blanks ("_ _ _ _"), guess history tracking, visual ASCII gallows stages, and victory/defeat detection.',
    deliverables: [
      'Initialize secret word and track guessed letters in a set.',
      'Display current word state (e.g. "p _ t h _ n").',
      'Render 6 distinct stages of ASCII stick-figure gallows as incorrect guesses accumulate.'
    ],
    starterTemplate: `# Project 11: Hangman Word Rescue
GALLOWS_STAGES = [
    "  +---+\\n      |\\n      |\\n      |\\n     ===",
    "  +---+\\n  O   |\\n      |\\n      |\\n     ===",
    "  +---+\\n  O   |\\n  |   |\\n      |\\n     ===",
    "  +---+\\n  O   |\\n /|   |\\n      |\\n     ===",
    "  +---+\\n  O   |\\n /|\\\\  |\\n      |\\n     ===",
    "  +---+\\n  O   |\\n /|\\\\  |\\n /    |\\n     ===",
    "  +---+\\n  O   |\\n /|\\\\  |\\n / \\\\  |\\n     ==="
]

def step_hangman(secret_word: str, guessed_letters: set):
    pass
`,
    rubrics: [
      { criterion: 'Word masking and letter reveal logic', weight: 40 },
      { criterion: 'Gallows state mapping and life tracking', weight: 35 },
      { criterion: 'Case insensitivity and repeated guess guards', weight: 25 }
    ],
    hints: ['Represent guessed letters as a Python set: `guessed = set()` makes checking `char in guessed` fast and clean!']
  },
  {
    id: 12,
    tier: 2,
    tierName: 'Tier 2: Interactive Games & Simulations',
    title: 'Text-Based Dungeon Crawler',
    difficulty: 'Intermediate',
    points: 90,
    requiredPoints: 520,
    category: 'Games',
    overview: 'Create an interactive RPG room explorer where the player moves (North, South, East, West), collects items, and fights or avoids monsters.',
    deliverables: [
      'Model at least 4 interconnected rooms using a nested dictionary graph.',
      'Track player inventory and hit points (HP).',
      'Include an encounter where having an item (e.g. "key" or "torch") unlocks an exit.'
    ],
    starterTemplate: `# Project 12: Dungeon Crawler
ROOMS = {
    "Hall": {"south": "Armory", "east": "Kitchen", "item": "torch"},
    "Armory": {"north": "Hall", "east": "Dungeon", "item": "sword"},
    "Kitchen": {"west": "Hall", "item": "bread"},
    "Dungeon": {"west": "Armory", "monster": "goblin"}
}

def move_player(current_room: str, direction: str) -> str:
    pass
`,
    rubrics: [
      { criterion: 'Robust map traversal and boundary validation', weight: 40 },
      { criterion: 'Inventory state and item acquisition', weight: 30 },
      { criterion: 'Combat/puzzle resolution logic', weight: 30 }
    ],
    hints: ['Check if direction in ROOMS[current_room] before moving; otherwise warn "You bump into a solid stone wall!"']
  },
  {
    id: 13,
    tier: 2,
    tierName: 'Tier 2: Interactive Games & Simulations',
    title: 'Tic-Tac-Toe Two-Player Console Grid',
    difficulty: 'Intermediate',
    points: 85,
    requiredPoints: 560,
    category: 'Games',
    overview: 'Construct a 3x3 Tic-Tac-Toe board engine with move validation, turn alternation (X and O), and comprehensive row/column/diagonal win checking.',
    deliverables: [
      'Represent board as a 3x3 2D list or 9-element list.',
      'Validate that chosen cell is empty and between 1-9.',
      'Check all 8 winning configurations and declare tie if board fills up.'
    ],
    starterTemplate: `# Project 13: Tic-Tac-Toe
def check_win(board: list) -> str:
    # Returns 'X', 'O', 'Tie', or None
    pass

def render_board(board: list) -> str:
    pass
`,
    rubrics: [
      { criterion: 'Complete win checking (3 rows, 3 cols, 2 diags)', weight: 45 },
      { criterion: 'Turn switching and move validation', weight: 35 },
      { criterion: 'Tie detection when board fills without winner', weight: 20 }
    ],
    hints: ['Winning indices on a 0-indexed list: (0,1,2), (3,4,5), (6,7,8), (0,3,6), (1,4,7), (2,5,8), (0,4,8), (2,4,6).']
  },
  {
    id: 14,
    tier: 2,
    tierName: 'Tier 2: Interactive Games & Simulations',
    title: 'Flashcard Quiz Master & Leitner Repetition',
    difficulty: 'Intermediate',
    points: 80,
    requiredPoints: 600,
    category: 'Education',
    overview: 'Design a flashcard quiz system that tracks correct and incorrect answers and re-queues failed cards for spaced review.',
    deliverables: [
      'Store cards as question/answer pairs in a list of dictionaries.',
      'Evaluate student answer case-insensitively.',
      'Implement simple box repetition: failed cards are asked again at the end of the session.'
    ],
    starterTemplate: `# Project 14: Flashcard Quiz Master
CARDS = [
    {"q": "What keyword defines a function in Python?", "a": "def"},
    {"q": "Which data type stores True or False?", "a": "bool"},
    {"q": "What index represents the last element in a list?", "a": "-1"}
]

def run_quiz(cards: list) -> dict:
    pass
`,
    rubrics: [
      { criterion: 'Scorekeeping and performance metrics', weight: 40 },
      { criterion: 'Re-queueing mechanism for missed questions', weight: 40 },
      { criterion: 'Normalized string answer evaluation', weight: 20 }
    ],
    hints: ['Use answer.strip().lower() on both the user input and the correct answer.']
  },
  {
    id: 15,
    tier: 2,
    tierName: 'Tier 2: Interactive Games & Simulations',
    title: 'Virtual Banking Account Simulator',
    difficulty: 'Intermediate',
    points: 85,
    requiredPoints: 640,
    category: 'Finance',
    overview: 'Implement a bank account class or dictionary state engine supporting deposits, withdrawals, overdraft limits, and timestamped transaction logs.',
    deliverables: [
      'Deposit funds with positive number validation.',
      'Withdraw funds with balance check and overdraft prevention.',
      'Generate an audit statement showing all previous transactions.'
    ],
    starterTemplate: `# Project 15: Banking Simulator
def create_account(owner: str, initial_balance: float = 0.0) -> dict:
    return {"owner": owner, "balance": initial_balance, "ledger": []}

def deposit(account: dict, amount: float):
    pass

def withdraw(account: dict, amount: float):
    pass
`,
    rubrics: [
      { criterion: 'Strict overdraft prevention logic', weight: 40 },
      { criterion: 'Accurate ledger history tracking', weight: 35 },
      { criterion: 'Negative deposit rejection', weight: 25 }
    ],
    hints: ['Always check if amount <= 0 before processing deposits or withdrawals to prevent exploits!']
  },
  {
    id: 16,
    tier: 2,
    tierName: 'Tier 2: Interactive Games & Simulations',
    title: 'Daily Habit & Streak Tracker',
    difficulty: 'Intermediate',
    points: 80,
    requiredPoints: 680,
    category: 'Productivity',
    overview: 'Track recurring daily habits (e.g. "Drink 2L Water", "Code 30 mins"), calculate current streak and longest streak, and reward milestones.',
    deliverables: [
      'Add habits and mark daily completion status.',
      'Calculate current continuous streak and best all-time streak.',
      'Provide encouragement messages when reaching 3, 7, and 30 day milestones.'
    ],
    starterTemplate: `# Project 16: Habit Tracker
def update_habit_streak(habit_data: dict, completed_today: bool) -> dict:
    pass
`,
    rubrics: [
      { criterion: 'Streak incrementation and reset logic', weight: 45 },
      { criterion: 'Best-streak historical preservation', weight: 35 },
      { criterion: 'Milestone achievement trigger', weight: 20 }
    ],
    hints: ['If completed_today is True, current += 1. Update best = max(best, current). If False, current resets to 0.']
  },
  {
    id: 17,
    tier: 2,
    tierName: 'Tier 2: Interactive Games & Simulations',
    title: 'Morse Code Bilingual Encoder & Decoder',
    difficulty: 'Intermediate',
    points: 85,
    requiredPoints: 720,
    category: 'Communication',
    overview: 'Translate English text to international Morse code dots and dashes, and decode Morse code back into readable English prose.',
    deliverables: [
      'Dictionary mapping A-Z and 0-9 to Morse code equivalents.',
      'Function text_to_morse(text) separating letters with spaces and words with "/".',
      'Function morse_to_text(morse) reversing the lookup.'
    ],
    starterTemplate: `# Project 17: Morse Code Translator
MORSE_CODE = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--',
    '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
    '9': '----.', '0': '-----'
}

def to_morse(msg: str) -> str:
    pass

def from_morse(morse: str) -> str:
    pass
`,
    rubrics: [
      { criterion: 'Correct letter-to-dot/dash encoding', weight: 40 },
      { criterion: 'Inverted dictionary decoding', weight: 40 },
      { criterion: 'Space and delimiter handling', weight: 20 }
    ],
    hints: ['Create an inverted dictionary for decoding: `REVERSE_MORSE = {v: k for k, v in MORSE_CODE.items()}`']
  },
  {
    id: 18,
    tier: 2,
    tierName: 'Tier 2: Interactive Games & Simulations',
    title: 'Personal Daily Journal & Mood Logger',
    difficulty: 'Intermediate',
    points: 80,
    requiredPoints: 760,
    category: 'Productivity',
    overview: 'A digital journaling engine that logs entries with timestamps, tags, and 1-5 mood ratings, providing weekly average mood analytics.',
    deliverables: [
      'Add entries with date, text, tags, and mood rating (1-5).',
      'Filter and search entries by tag or keyword.',
      'Compute overall average mood score and identify most frequent tags.'
    ],
    starterTemplate: `# Project 18: Journal & Mood Logger
def add_journal_entry(journal: list, date_str: str, text: str, mood: int, tags: list):
    pass

def calculate_average_mood(journal: list) -> float:
    pass
`,
    rubrics: [
      { criterion: 'Data persistence schema and insertion', weight: 40 },
      { criterion: 'Tag filtering and keyword search', weight: 35 },
      { criterion: 'Statistical mood aggregation', weight: 25 }
    ],
    hints: ['Store each entry as a dictionary inside a main list: `{"date": date_str, "text": text, ...}`']
  },
  {
    id: 19,
    tier: 2,
    tierName: 'Tier 2: Interactive Games & Simulations',
    title: 'Terminal Address Book & Contact Manager',
    difficulty: 'Intermediate',
    points: 85,
    requiredPoints: 800,
    category: 'Productivity',
    overview: 'Build an in-memory CRM contact book supporting Create, Read, Update, Delete (CRUD) operations with duplicate phone/email detection.',
    deliverables: [
      'Add new contact with name, phone, and email.',
      'Search contacts by partial name matching.',
      'Update existing contact fields and delete by ID/name.'
    ],
    starterTemplate: `# Project 19: Contact Manager
def search_contacts(book: list, query: str) -> list:
    pass
`,
    rubrics: [
      { criterion: 'Full CRUD operations compliance', weight: 45 },
      { criterion: 'Partial match search logic', weight: 35 },
      { criterion: 'Duplicate prevention', weight: 20 }
    ],
    hints: ['Use `query.lower() in contact["name"].lower()` for flexible partial searches.']
  },
  {
    id: 20,
    tier: 2,
    tierName: 'Tier 2: Interactive Games & Simulations',
    title: 'Pomodoro Productivity & Interval Engine',
    difficulty: 'Intermediate',
    points: 85,
    requiredPoints: 840,
    category: 'Productivity',
    overview: 'Model the Pomodoro technique: alternating 25-minute work intervals with 5-minute short breaks, triggering a 15-minute long break every 4 cycles.',
    deliverables: [
      'State machine modeling WORK, SHORT_BREAK, and LONG_BREAK.',
      'Track completed work sessions and cycle counts.',
      'Provide formatted timer countdown strings (MM:SS).'
    ],
    starterTemplate: `# Project 20: Pomodoro Engine
def next_pomodoro_phase(completed_sessions: int) -> dict:
    # Returns phase name and duration in minutes
    pass
`,
    rubrics: [
      { criterion: 'Accurate cycle calculation (4-session rule)', weight: 45 },
      { criterion: 'Time string formatting (MM:SS)', weight: 35 },
      { criterion: 'State machine stability', weight: 20 }
    ],
    hints: ['Use the modulo operator: if completed_sessions % 4 == 0, it is time for a LONG_BREAK!']
  },

  // TIER 3: Data Processing & Algorithms (Projects 21 - 30)
  {
    id: 21,
    tier: 3,
    tierName: 'Tier 3: Data Processing & Algorithms',
    title: 'Student Gradebook & GPA Analyzer',
    difficulty: 'Intermediate',
    points: 95,
    requiredPoints: 880,
    category: 'Education',
    overview: 'Ingest student test score lists, compute mean, median, standard letter grades, and identify the highest/lowest performers in class.',
    deliverables: [
      'Calculate arithmetic mean and sorted median score.',
      'Map numeric averages to 4.0 GPA scale.',
      'Find top performing students and those who need remediation.'
    ],
    starterTemplate: `# Project 21: Gradebook Analyzer
def analyze_grades(records: list) -> dict:
    pass
`,
    rubrics: [
      { criterion: 'Statistical accuracy (mean, median)', weight: 40 },
      { criterion: 'GPA letter mapping', weight: 35 },
      { criterion: 'Class rank ordering', weight: 25 }
    ],
    hints: ['To compute the median, sort the list first! If the length is odd, take the middle; if even, average the two middle numbers.']
  },
  {
    id: 22,
    tier: 3,
    tierName: 'Tier 3: Data Processing & Algorithms',
    title: 'Personal Budget & Category Breakdown',
    difficulty: 'Intermediate',
    points: 95,
    requiredPoints: 920,
    category: 'Finance',
    overview: 'Process a list of financial expenses, categorize them (Housing, Food, Transit, Entertainment), and compute category percentage shares.',
    deliverables: [
      'Aggregate totals per category.',
      'Calculate percentage of total budget each category consumes.',
      'Identify categories that exceed a 30% threshold.'
    ],
    starterTemplate: `# Project 22: Budget Analyzer
def budget_breakdown(expenses: list) -> dict:
    pass
`,
    rubrics: [
      { criterion: 'Category accumulation logic', weight: 40 },
      { criterion: 'Percentage normalization', weight: 35 },
      { criterion: 'Overspending threshold alerts', weight: 25 }
    ],
    hints: ['Percentage = (category_total / grand_total) * 100. Round to 1 decimal place.']
  },
  {
    id: 23,
    tier: 3,
    tierName: 'Tier 3: Data Processing & Algorithms',
    title: 'Text Sentiment & Keyword Frequency Analyzer',
    difficulty: 'Intermediate',
    points: 100,
    requiredPoints: 960,
    category: 'Data',
    overview: 'Analyze product reviews or user comments: strip stopwords (the, a, is), count top 5 keywords, and score sentiment based on positive/negative lexicons.',
    deliverables: [
      'Clean text of punctuation and convert to lowercase words.',
      'Filter out common grammatical stopwords.',
      'Calculate net sentiment score: (positive_count - negative_count).'
    ],
    starterTemplate: `# Project 23: Sentiment & Keyword Analyzer
POSITIVE_WORDS = {"great", "good", "love", "excellent", "fast", "easy"}
NEGATIVE_WORDS = {"bad", "slow", "broken", "terrible", "hard", "crash"}

def analyze_sentiment(text: str) -> dict:
    pass
`,
    rubrics: [
      { criterion: 'Word tokenization and stopword elimination', weight: 40 },
      { criterion: 'Keyword frequency ranking', weight: 35 },
      { criterion: 'Accurate net sentiment score', weight: 25 }
    ],
    hints: ['Use `.split()` after replacing punctuation marks with spaces.']
  },
  {
    id: 24,
    tier: 3,
    tierName: 'Tier 3: Data Processing & Algorithms',
    title: 'DNA Sequence GC-Content & Mutation Finder',
    difficulty: 'Intermediate',
    points: 100,
    requiredPoints: 1000,
    category: 'Bioinformatics',
    overview: 'Process bioinformatics DNA strings (A, C, G, T), calculate GC percentage, find complementary strands (A<->T, C<->G), and detect point mutations.',
    deliverables: [
      'Calculate GC-content percentage: (G + C) / total_length * 100.',
      'Generate complementary DNA strand.',
      'Compare two strands of equal length to locate single nucleotide polymorphisms (SNPs).'
    ],
    starterTemplate: `# Project 24: DNA Analyzer
def dna_analysis(strand1: str, strand2: str = "") -> dict:
    pass
`,
    rubrics: [
      { criterion: 'Accurate GC content percentage', weight: 35 },
      { criterion: 'Complement strand mapping', weight: 35 },
      { criterion: 'Mutation coordinate identification', weight: 30 }
    ],
    hints: ['A pairs with T, and C pairs with G. Use a dictionary or translation table for clean mapping.']
  },
  {
    id: 25,
    tier: 3,
    tierName: 'Tier 3: Data Processing & Algorithms',
    title: 'Flight Boarding Pass & Seat Allocator',
    difficulty: 'Intermediate',
    points: 95,
    requiredPoints: 1040,
    category: 'Aviation',
    overview: 'Manage aircraft seating grid (Rows 1-20, Seats A-F). Assign window, aisle, or middle seats, and prevent double booking.',
    deliverables: [
      'Initialize aircraft seating layout grid.',
      'Allocate seats by preference (window/aisle).',
      'Provide visual ASCII occupancy map showing [X] occupied vs [ ] available.'
    ],
    starterTemplate: `# Project 25: Flight Seat Allocator
def allocate_seat(manifest: dict, passenger: str, preference: str) -> str:
    pass
`,
    rubrics: [
      { criterion: 'Collision-free seat allocation', weight: 45 },
      { criterion: 'Preference matching logic', weight: 35 },
      { criterion: 'Visual map generation', weight: 20 }
    ],
    hints: ['Seats A and F are window seats. Seats C and D are aisle seats!']
  },
  {
    id: 26,
    tier: 3,
    tierName: 'Tier 3: Data Processing & Algorithms',
    title: 'Recipe Ingredient Scaler & Nutritionist',
    difficulty: 'Intermediate',
    points: 90,
    requiredPoints: 1080,
    category: 'Culinary',
    overview: 'Take base recipe ingredient amounts for N servings and dynamically scale quantities up or down while converting metric/imperial volume units.',
    deliverables: [
      'Scale ingredient dictionary by serving multiplier (target_servings / base_servings).',
      'Format quantities with sensible fractions or rounded decimals.',
      'Compute aggregate calories based on scaled ingredient amounts.'
    ],
    starterTemplate: `# Project 26: Recipe Scaler
def scale_recipe(base_servings: int, target_servings: int, ingredients: dict) -> dict:
    pass
`,
    rubrics: [
      { criterion: 'Exact mathematical scaling factor', weight: 45 },
      { criterion: 'Clean unit formatting', weight: 35 },
      { criterion: 'Caloric aggregation', weight: 20 }
    ],
    hints: ['Multiplier = target_servings / base_servings. Multiply every ingredient quantity by this factor.']
  },
  {
    id: 27,
    tier: 3,
    tierName: 'Tier 3: Data Processing & Algorithms',
    title: 'Markdown to HTML Parser & Converter',
    difficulty: 'Advanced',
    points: 105,
    requiredPoints: 1120,
    category: 'Web',
    overview: 'Parse Markdown headings (#, ##, ###), bold (**text**), italics (*text*), and unordered lists (* item) into valid semantic HTML tags.',
    deliverables: [
      'Convert # Heading 1 to <h1>Heading 1</h1>.',
      'Convert **bold** to <strong>bold</strong>.',
      'Convert bullet lines to <ul><li>...</li></ul> blocks.'
    ],
    starterTemplate: `# Project 27: Markdown to HTML Parser
def parse_markdown(md_text: str) -> str:
    pass
`,
    rubrics: [
      { criterion: 'Header conversion (h1, h2, h3)', weight: 35 },
      { criterion: 'Inline bold/italic tags', weight: 35 },
      { criterion: 'List block wrapping', weight: 30 }
    ],
    hints: ['Check line.startswith("# ") for h1, "## " for h2, etc.']
  },
  {
    id: 28,
    tier: 3,
    tierName: 'Tier 3: Data Processing & Algorithms',
    title: 'Library Book Checkout & Overdue Penalty Engine',
    difficulty: 'Intermediate',
    points: 95,
    requiredPoints: 1160,
    category: 'Education',
    overview: 'Track library catalog checkout status, return deadlines (14 days), calculate overdue fines ($0.50/day), and cap maximum penalties.',
    deliverables: [
      'Checkout book and set expected return day.',
      'Calculate days overdue and total fine.',
      'Waive fines for early returns and cap fine at $25.'
    ],
    starterTemplate: `# Project 28: Library Checkout Engine
def calculate_fine(checkout_day: int, return_day: int, loan_period: int = 14) -> float:
    pass
`,
    rubrics: [
      { criterion: 'Fine rate math and maximum cap', weight: 45 },
      { criterion: 'Timely return validation', weight: 35 },
      { criterion: 'Catalog state mutation', weight: 20 }
    ],
    hints: ['days_overdue = max(0, (return_day - checkout_day) - loan_period).']
  },
  {
    id: 29,
    tier: 3,
    tierName: 'Tier 3: Data Processing & Algorithms',
    title: 'Weather Historical Trend Analyzer',
    difficulty: 'Intermediate',
    points: 95,
    requiredPoints: 1200,
    category: 'Science',
    overview: 'Ingest 30 days of weather readings (temperature, humidity, precipitation). Compute hottest/coldest days, rain frequency, and temperature variance.',
    deliverables: [
      'Calculate monthly average temperature.',
      'Identify day with maximum thermal swing (high - low).',
      'Determine count and percentage of rainy days.'
    ],
    starterTemplate: `# Project 29: Weather Trend Analyzer
def analyze_weather(data: list) -> dict:
    pass
`,
    rubrics: [
      { criterion: 'Multi-metric statistical aggregation', weight: 40 },
      { criterion: 'Thermal swing calculation', weight: 35 },
      { criterion: 'Rain frequency metrics', weight: 25 }
    ],
    hints: ['Iterate through each day\'s dictionary to track `max_temp`, `min_temp`, and sum of precipitation.']
  },
  {
    id: 30,
    tier: 3,
    tierName: 'Tier 3: Data Processing & Algorithms',
    title: 'Geometric ASCII Art Canvas Renderer',
    difficulty: 'Intermediate',
    points: 90,
    requiredPoints: 1240,
    category: 'Graphics',
    overview: 'Programmatically draw scalable geometric shapes (Hollow Rectangles, Centered Pyramids, Diamonds, and Checkerboards) using nested loops and character math.',
    deliverables: [
      'Draw hollow box of size W x H with * borders.',
      'Draw centered pyramid of height H.',
      'Draw symmetrical diamond of width W.'
    ],
    starterTemplate: `# Project 30: ASCII Art Canvas
def draw_hollow_box(w: int, h: int) -> str:
    pass

def draw_pyramid(height: int) -> str:
    pass
`,
    rubrics: [
      { criterion: 'Pixel-perfect spacing and alignment', weight: 45 },
      { criterion: 'Parametric scaling by width/height', weight: 35 },
      { criterion: 'Clean newline join formatting', weight: 20 }
    ],
    hints: ['For a pyramid row `i` (0 to h-1): spaces = " " * (h - 1 - i), stars = "*" * (2 * i + 1).']
  },

  // TIER 4: Advanced Systems & Capstones (Projects 31 - 40)
  {
    id: 31,
    tier: 4,
    tierName: 'Tier 4: Advanced Systems & Capstones',
    title: 'Bank ATM State Machine & PIN Security',
    difficulty: 'Advanced',
    points: 120,
    requiredPoints: 1280,
    category: 'Security',
    overview: 'Model a real ATM kiosk state machine: 3 failed PIN attempts triggers security lockout, balance inquiry, cash dispensing in $20/$50 bills, and deposit verification.',
    deliverables: [
      'Enforce 3-strike PIN lockout mechanism.',
      'Dispense cash using greedy denomination algorithm ($50s and $20s).',
      'Maintain continuous audit security trail.'
    ],
    starterTemplate: `# Project 31: ATM Security System
class ATM:
    def __init__(self, pin: str, balance: float):
        self.pin = pin
        self.balance = balance
        self.failed_attempts = 0
        self.is_locked = False
`,
    rubrics: [
      { criterion: 'Security lockout state preservation', weight: 40 },
      { criterion: 'Greedy bill dispensing math', weight: 40 },
      { criterion: 'Defensive exception and boundary handling', weight: 20 }
    ],
    hints: ['Use floor division and modulo for bill dispensing: `fifties = amount // 50; remainder = amount % 50`.']
  },
  {
    id: 32,
    tier: 4,
    tierName: 'Tier 4: Advanced Systems & Capstones',
    title: 'Vending Machine Dispenser & Optimal Change',
    difficulty: 'Advanced',
    points: 115,
    requiredPoints: 1320,
    category: 'Hardware Simulation',
    overview: 'Simulate a vending machine inventory and coin changer. Accepts coins/bills, validates item selection, and returns optimal change in quarters, dimes, and nickels.',
    deliverables: [
      'Maintain inventory quantity and prices for item slots (A1, A2, B1, etc.).',
      'Track deposited money and verify sufficient funds.',
      'Calculate optimal change using fewest coins possible.'
    ],
    starterTemplate: `# Project 32: Vending Machine
def vend_item(inventory: dict, slot: str, money_inserted: float) -> dict:
    pass
`,
    rubrics: [
      { criterion: 'Optimal coin change decomposition (25c, 10c, 5c)', weight: 45 },
      { criterion: 'Inventory decrementing upon sale', weight: 35 },
      { criterion: 'Insufficient funds rejection', weight: 20 }
    ],
    hints: ['Convert dollars to integer cents (e.g. $1.75 -> 175) to avoid floating point precision quirks in change calculation!']
  },
  {
    id: 33,
    tier: 4,
    tierName: 'Tier 4: Advanced Systems & Capstones',
    title: 'Sudoku 9x9 Grid Solution Validator',
    difficulty: 'Advanced',
    points: 130,
    requiredPoints: 1360,
    category: 'Algorithms',
    overview: 'Write an algorithm that takes a completed 9x9 Sudoku board and verifies whether all rows, columns, and nine 3x3 subgrids contain numbers 1-9 without duplicates.',
    deliverables: [
      'Validate that every row contains digits 1 through 9.',
      'Validate that every column contains digits 1 through 9.',
      'Validate that each of the nine 3x3 sub-boxes contains digits 1 through 9.'
    ],
    starterTemplate: `# Project 33: Sudoku Validator
def validate_sudoku(board: list[list[int]]) -> bool:
    # Check rows, columns, and 3x3 boxes
    pass
`,
    rubrics: [
      { criterion: 'Row and column uniqueness validation', weight: 40 },
      { criterion: '3x3 subgrid coordinate indexing', weight: 40 },
      { criterion: 'Edge case and dimension verification', weight: 20 }
    ],
    hints: ['Check if `set(row) == set(range(1, 10))`. For 3x3 boxes, use step loops: `for r in range(0, 9, 3): for c in range(0, 9, 3):`']
  },
  {
    id: 34,
    tier: 4,
    tierName: 'Tier 4: Advanced Systems & Capstones',
    title: 'Warehouse Inventory & Reorder Sentinel',
    difficulty: 'Advanced',
    points: 120,
    requiredPoints: 1400,
    category: 'Enterprise',
    overview: 'Build an automated warehouse inventory manager that handles batch shipments, outgoing order fulfillment, and auto-generates purchase orders when items breach safety thresholds.',
    deliverables: [
      'Process shipment receipts and update stock counts.',
      'Fulfill orders with partial-shipment detection if stock is low.',
      'Generate reorder alert list with recommended replenishment quantities.'
    ],
    starterTemplate: `# Project 34: Warehouse Sentinel
class Warehouse:
    def __init__(self, stock: dict, min_thresholds: dict):
        self.stock = stock
        self.thresholds = min_thresholds
`,
    rubrics: [
      { criterion: 'Accurate stock mutation during fulfillment', weight: 40 },
      { criterion: 'Low-stock reorder threshold trigger', weight: 40 },
      { criterion: 'Clean structured inventory reporting', weight: 20 }
    ],
    hints: ['Keep track of both `available_stock` and `safety_margin` for each SKU.']
  },
  {
    id: 35,
    tier: 4,
    tierName: 'Tier 4: Advanced Systems & Capstones',
    title: 'Ranked-Choice Election Ballot Tabulator',
    difficulty: 'Advanced',
    points: 130,
    requiredPoints: 1440,
    category: 'Civic Tech',
    overview: 'Implement an Instant-Runoff / Ranked-Choice Voting ballot counter. If no candidate secures >50% first-choice votes, eliminate the lowest candidate and redistribute ballots.',
    deliverables: [
      'Ingest voter preferential ballots (e.g. ["Alice", "Bob", "Charlie"]).',
      'Count 1st-choice votes per round.',
      'Eliminate lowest candidate and reallocate ballots until a candidate surpasses 50% majority.'
    ],
    starterTemplate: `# Project 35: Ranked-Choice Tabulator
def tabulate_ranked_choice(ballots: list[list[str]]) -> str:
    pass
`,
    rubrics: [
      { criterion: 'Multi-round redistribution algorithm', weight: 50 },
      { criterion: 'Majority threshold detection (>50%)', weight: 30 },
      { criterion: 'Tie-breaker handling', weight: 20 }
    ],
    hints: ['In each round, count the first non-eliminated candidate on each ballot.']
  },
  {
    id: 36,
    tier: 4,
    tierName: 'Tier 4: Advanced Systems & Capstones',
    title: 'Typing Speed (WPM) & Accuracy Benchmark',
    difficulty: 'Intermediate',
    points: 110,
    requiredPoints: 1480,
    category: 'Productivity',
    overview: 'Benchmark a typist against a prompt string: calculate Gross Words Per Minute (GWPM), Net Words Per Minute (NWPM), character-level accuracy, and error classification.',
    deliverables: [
      'Compare target string vs typed string character by character.',
      'Calculate raw WPM: (total_characters / 5) / time_minutes.',
      'Compute error rate and net WPM penalty.'
    ],
    starterTemplate: `# Project 36: Typing Speed Benchmark
def calculate_wpm(target: str, typed: str, elapsed_seconds: float) -> dict:
    pass
`,
    rubrics: [
      { criterion: 'Standardized 5-character word math', weight: 40 },
      { criterion: 'Levenshtein or character comparison accuracy', weight: 40 },
      { criterion: 'Formatted metric telemetry report', weight: 20 }
    ],
    hints: ['In typing benchmarks, 1 word is standardly defined as 5 keystrokes!']
  },
  {
    id: 37,
    tier: 4,
    tierName: 'Tier 4: Advanced Systems & Capstones',
    title: 'Virtual Filesystem File Classifier',
    difficulty: 'Advanced',
    points: 120,
    requiredPoints: 1520,
    category: 'System',
    overview: 'Sort and organize a messy directory of filenames into categorized buckets (Images, Documents, Audio, Code, Archives) based on extensions and metadata.',
    deliverables: [
      'Parse file extension using string operations (.split() or .rsplit()).',
      'Group files into clean category folders.',
      'Generate total byte size summary per category.'
    ],
    starterTemplate: `# Project 37: File Classifier
CATEGORIES = {
    "Images": [".png", ".jpg", ".jpeg", ".gif"],
    "Documents": [".pdf", ".docx", ".txt", ".xlsx"],
    "Code": [".py", ".js", ".html", ".css", ".json"]
}

def classify_files(file_list: list) -> dict:
    pass
`,
    rubrics: [
      { criterion: 'Extension extraction and category mapping', weight: 45 },
      { criterion: 'Uncategorized file fallback bucket ("Other")', weight: 35 },
      { criterion: 'Size aggregation and sorting', weight: 20 }
    ],
    hints: ['Check if `filename.endswith()` or extract extension with `filename[filename.rfind("."):].lower()`']
  },
  {
    id: 38,
    tier: 4,
    tierName: 'Tier 4: Advanced Systems & Capstones',
    title: 'Calendar Event Scheduler & Conflict Detector',
    difficulty: 'Advanced',
    points: 130,
    requiredPoints: 1560,
    category: 'Productivity',
    overview: 'Build a calendar scheduling engine that takes proposed meetings with start and end times, detects overlaps, and suggests next available free slots.',
    deliverables: [
      'Represent time intervals in 24-hour military minutes (e.g. 09:30 -> 570 mins).',
      'Detect conflicts: two meetings A and B overlap if A.start < B.end and B.start < A.end.',
      'Return conflict warnings or confirmation of scheduled meeting.'
    ],
    starterTemplate: `# Project 38: Calendar Conflict Detector
def time_to_minutes(t_str: str) -> int:
    h, m = map(int, t_str.split(":"))
    return h * 60 + m

def schedule_meeting(calendar: list, new_start: str, new_end: str) -> bool:
    pass
`,
    rubrics: [
      { criterion: 'Exact interval overlap intersection math', weight: 50 },
      { criterion: 'Time string to minutes parsing', weight: 30 },
      { criterion: 'Chronological calendar sorting', weight: 20 }
    ],
    hints: ['Two intervals [s1, e1] and [s2, e2] overlap if `max(s1, s2) < min(e1, e2)`.']
  },
  {
    id: 39,
    tier: 4,
    tierName: 'Tier 4: Advanced Systems & Capstones',
    title: 'From-Scratch Linear Regression Predictor',
    difficulty: 'Advanced',
    points: 140,
    requiredPoints: 1600,
    category: 'Machine Learning',
    overview: 'Implement simple linear regression (y = mx + b) from first principles using pure Python math (no libraries!), calculating slope m and intercept b to forecast data.',
    deliverables: [
      'Compute mean of X and mean of Y.',
      'Calculate slope: m = sum((x - mean_x)*(y - mean_y)) / sum((x - mean_x)**2).',
      'Calculate intercept: b = mean_y - m * mean_x, then predict future values.'
    ],
    starterTemplate: `# Project 39: Linear Regression from Scratch
def train_linear_model(x_vals: list[float], y_vals: list[float]):
    # Compute m and b
    pass

def predict(x: float, m: float, b: float) -> float:
    return m * x + b
`,
    rubrics: [
      { criterion: 'Formula implementation without external libraries', weight: 50 },
      { criterion: 'Accurate forecast prediction generation', weight: 30 },
      { criterion: 'Handling equal x-values (zero-division guard)', weight: 20 }
    ],
    hints: ['Break calculations into small loops: first find mean_x and mean_y, then compute numerator and denominator.']
  },
  {
    id: 40,
    tier: 4,
    tierName: 'Tier 4: Advanced Systems & Capstones',
    title: 'Autonomous Assistant: The Mini JARVIS Bot',
    difficulty: 'Capstone',
    points: 150,
    requiredPoints: 1650,
    category: 'Artificial Intelligence',
    overview: 'Create an autonomous conversational rule engine inspired by JARVIS: parse natural language commands ("calculate 5 * 8", "remind me to study", "weather in London", "reverse text"), execute appropriate tools, and speak results!',
    deliverables: [
      'Intent parsing engine routing user queries to specialized handler functions.',
      'Calculator tool, unit converter tool, reminder store, and string utility tools.',
      'Structured response output with conversational personality and formatting.'
    ],
    starterTemplate: `# Project 40: Mini JARVIS Bot Engine
def jarvis_process_command(command: str) -> str:
    cmd = command.strip().lower()
    # Route intent to handlers
    return "Command not recognized."
`,
    rubrics: [
      { criterion: 'Multi-intent natural language routing', weight: 45 },
      { criterion: 'Tool execution and result synthesis', weight: 35 },
      { criterion: 'Polite persona and error recovery', weight: 20 }
    ],
    hints: ['Check command keywords: if cmd.startswith("calculate"): ... elif "remind" in cmd: ...']
  }
];
