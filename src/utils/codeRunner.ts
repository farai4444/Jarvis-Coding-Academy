/**
 * Safe in-browser execution sandbox for beginner Python constructs.
 * Evaluates print(), math, string methods, variables, loops, conditionals, and functions.
 */

export interface ExecutionResult {
  stdout: string;
  stderr: string;
  success: boolean;
  executionTimeMs: number;
}

export function executePythonSimulated(code: string): ExecutionResult {
  const startTime = performance.now();
  const stdoutLines: string[] = [];
  const stderrLines: string[] = [];

  try {
    const rawLines = code.split('\n');

    // 1. Basic syntax & indentation scanner
    for (let i = 0; i < rawLines.length; i++) {
      const line = rawLines[i];
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;

      if (trimmed.endsWith(':')) {
        const nextLine = rawLines[i + 1];
        if (nextLine && nextLine.trim() && !nextLine.startsWith(' ') && !nextLine.startsWith('\t')) {
          throw new Error(`IndentationError: expected an indented block after '${trimmed}' on line ${i + 1}`);
        }
      }

      // Check mismatched parenthesis
      const openParens = (line.match(/\(/g) || []).length;
      const closeParens = (line.match(/\)/g) || []).length;
      if (openParens !== closeParens) {
        // Multi-line parens are possible, but for single line prints flag syntax errors
        if (!line.includes('\\') && (trimmed.startsWith('print(') || trimmed.startsWith('def '))) {
          if (openParens > closeParens) {
            throw new Error(`SyntaxError: unexpected EOF while parsing on line ${i + 1}`);
          }
        }
      }
    }

    // 2. Safe execution bridge: Transform basic Python to JS for browser evaluation
    // Supports print(), variables, math, f-strings, strings, lists, dicts
    const transformed = transformPythonToExecutableJS(code);

    // Run in isolated function scope
    const sandboxScope: Record<string, any> = {};
    const customPrint = (...args: any[]) => {
      const text = args.map((a) => {
        if (typeof a === 'boolean') return a ? 'True' : 'False';
        if (a === null || a === undefined) return 'None';
        if (Array.isArray(a)) {
          return '[' + a.map((x) => (typeof x === 'string' ? `'${x}'` : typeof x === 'boolean' ? (x ? 'True' : 'False') : x)).join(', ') + ']';
        }
        if (typeof a === 'object') {
          return JSON.stringify(a).replace(/"/g, "'");
        }
        return String(a);
      }).join(' ');
      stdoutLines.push(text);
    };

    const runner = new Function('print', 'scope', transformed);
    runner(customPrint, sandboxScope);

    const elapsed = Math.round(performance.now() - startTime);
    return {
      stdout: stdoutLines.join('\n'),
      stderr: '',
      success: true,
      executionTimeMs: Math.max(1, elapsed),
    };
  } catch (err: any) {
    const elapsed = Math.round(performance.now() - startTime);
    stderrLines.push(err.message || String(err));
    return {
      stdout: stdoutLines.join('\n'),
      stderr: stderrLines.join('\n'),
      success: false,
      executionTimeMs: Math.max(1, elapsed),
    };
  }
}

/**
 * Transforms beginner Python statements into runnable JavaScript
 */
function transformPythonToExecutableJS(pyCode: string): string {
  const lines = pyCode.split('\n');
  const jsLines: string[] = [];
  const indentStack: number[] = [0];

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    const rawLine = lines[lineIndex];
    if (!rawLine.trim() || rawLine.trim().startsWith('#')) {
      continue;
    }

    // Measure indentation
    const indentMatch = rawLine.match(/^(\s*)/);
    const indentLevel = indentMatch ? indentMatch[1].length : 0;

    while (indentStack.length > 1 && indentLevel < indentStack[indentStack.length - 1]) {
      indentStack.pop();
      jsLines.push(' '.repeat(indentStack[indentStack.length - 1]) + '}');
    }

    let line = rawLine.trim();

    // Remove inline comment
    const commentIdx = line.indexOf('#');
    if (commentIdx !== -1) {
      line = line.substring(0, commentIdx).trim();
    }

    // Python booleans & None
    line = line.replace(/\bTrue\b/g, 'true');
    line = line.replace(/\bFalse\b/g, 'false');
    line = line.replace(/\bNone\b/g, 'null');

    // Logical operators
    line = line.replace(/\band\b/g, '&&');
    line = line.replace(/\bor\b/g, '||');
    line = line.replace(/\bnot\s+/g, '!');

    // F-strings: f"Hello {name}" -> `Hello ${name}`
    line = line.replace(/f"([^"]*)"/g, (match, inner) => {
      const template = inner.replace(/\{([^}]+)\}/g, (m: string, expr: string) => {
        // Handle format specifiers like :.2f
        if (expr.includes(':.2f')) {
          const varName = expr.split(':.2f')[0].trim();
          return '${Number(' + varName + ').toFixed(2)}';
        }
        return '${' + expr + '}';
      });
      return '`' + template + '`';
    });

    line = line.replace(/f'([^']*)'/g, (match, inner) => {
      const template = inner.replace(/\{([^}]+)\}/g, (m: string, expr: string) => {
        if (expr.includes(':.2f')) {
          const varName = expr.split(':.2f')[0].trim();
          return '${Number(' + varName + ').toFixed(2)}';
        }
        return '${' + expr + '}';
      });
      return '`' + template + '`';
    });

    // Python string methods -> JS
    line = line.replace(/\.upper\(\)/g, '.toUpperCase()');
    line = line.replace(/\.lower\(\)/g, '.toLowerCase()');
    line = line.replace(/\.strip\(\)/g, '.trim()');
    line = line.replace(/\.startswith\(([^)]+)\)/g, '.startsWith($1)');
    line = line.replace(/\.endswith\(([^)]+)\)/g, '.endsWith($1)');
    line = line.replace(/\.find\(([^)]+)\)/g, '.indexOf($1)');
    line = line.replace(/\.append\(([^)]+)\)/g, '.push($1)');
    line = line.replace(/\.pop\(\)/g, '.pop()');
    line = line.replace(/len\(([^)]+)\)/g, '($1).length');

    // Handlers for Python control structures
    if (line.startsWith('if ') && line.endsWith(':')) {
      const cond = line.slice(3, -1).trim();
      jsLines.push(' '.repeat(indentLevel) + `if (${cond}) {`);
      indentStack.push(indentLevel + 4);
      continue;
    }

    if (line.startsWith('elif ') && line.endsWith(':')) {
      const cond = line.slice(5, -1).trim();
      // Close previous block first
      jsLines.push(' '.repeat(indentLevel) + `} else if (${cond}) {`);
      continue;
    }

    if (line === 'else:') {
      jsLines.push(' '.repeat(indentLevel) + '} else {');
      continue;
    }

    if (line.startsWith('while ') && line.endsWith(':')) {
      const cond = line.slice(6, -1).trim();
      jsLines.push(' '.repeat(indentLevel) + `while (${cond}) {`);
      indentStack.push(indentLevel + 4);
      continue;
    }

    // for i in range(n): or for i in range(start, stop): or for item in list:
    const forRangeMatch = line.match(/^for\s+([a-zA-Z_]\w*)\s+in\s+range\(([^)]+)\):$/);
    if (forRangeMatch) {
      const varName = forRangeMatch[1];
      const args = forRangeMatch[2].split(',').map((s) => s.trim());
      let forLoopJS = '';

      if (args.length === 1) {
        forLoopJS = `for (let ${varName} = 0; ${varName} < (${args[0]}); ${varName}++) {`;
      } else if (args.length === 2) {
        forLoopJS = `for (let ${varName} = (${args[0]}); ${varName} < (${args[1]}); ${varName}++) {`;
      } else if (args.length === 3) {
        const step = parseInt(args[2], 10);
        if (step < 0) {
          forLoopJS = `for (let ${varName} = (${args[0]}); ${varName} > (${args[1]}); ${varName} += (${args[2]})) {`;
        } else {
          forLoopJS = `for (let ${varName} = (${args[0]}); ${varName} < (${args[1]}); ${varName} += (${args[2]})) {`;
        }
      }
      jsLines.push(' '.repeat(indentLevel) + forLoopJS);
      indentStack.push(indentLevel + 4);
      continue;
    }

    const forInMatch = line.match(/^for\s+([a-zA-Z_]\w*)\s+in\s+([^:]+):$/);
    if (forInMatch) {
      const varName = forInMatch[1];
      const target = forInMatch[2].trim();
      jsLines.push(' '.repeat(indentLevel) + `for (const ${varName} of ${target}) {`);
      indentStack.push(indentLevel + 4);
      continue;
    }

    // def func(params):
    const defMatch = line.match(/^def\s+([a-zA-Z_]\w*)\s*\(([^)]*)\):$/);
    if (defMatch) {
      const fnName = defMatch[1];
      const params = defMatch[2];
      jsLines.push(' '.repeat(indentLevel) + `function ${fnName}(${params}) {`);
      indentStack.push(indentLevel + 4);
      continue;
    }

    // Regular statements
    if (line === 'pass') continue;
    if (line === 'break') {
      jsLines.push(' '.repeat(indentLevel) + 'break;');
      continue;
    }
    if (line === 'continue') {
      jsLines.push(' '.repeat(indentLevel) + 'continue;');
      continue;
    }

    // Variable assignment: check if assigning without let/const
    const assignMatch = line.match(/^([a-zA-Z_]\w*)\s*=\s*(.+)$/);
    if (assignMatch && !line.includes('==') && !line.startsWith('if') && !line.startsWith('return')) {
      const vName = assignMatch[1];
      const vVal = assignMatch[2];
      jsLines.push(' '.repeat(indentLevel) + `var ${vName} = ${vVal};`);
      continue;
    }

    jsLines.push(' '.repeat(indentLevel) + line + ';');
  }

  // Close remaining blocks
  while (indentStack.length > 1) {
    indentStack.pop();
    jsLines.push(' '.repeat(indentStack[indentStack.length - 1]) + '}');
  }

  return jsLines.join('\n');
}
