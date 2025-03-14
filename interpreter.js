#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function tokenize(code) {
  const tokens = [];
  const regex = /\s*(if|else|while|print|[a-zA-Z_][a-zA-Z0-9_]*|\d+|[-+*/=(){}><,])/g;
  let match;

  while ((match = regex.exec(code)) !== null) {
    const value = match[1];
    if (/\d+/.test(value)) {
      tokens.push({ type: 'NUMBER', value: parseInt(value) });
    } else if (/[a-zA-Z_][a-zA-Z0-9_]*/.test(value)) {
      tokens.push({ type: 'IDENTIFIER', value });
    } else {
      tokens.push({ type: 'OPERATOR', value });
    }
  }

  return tokens;
}

function parse(tokens) {
  let index = 0;

  function consume() {
    return tokens[index++];
  }

  function parseExpression() {
    const token = consume();
    if (token.type === 'NUMBER') {
      return { type: 'Literal', value: token.value };
    }
    if (token.type === 'IDENTIFIER') {
      return { type: 'Identifier', name: token.value };
    }
  }

  function parseStatement() {
    const token = consume();
    if (token.value === 'print') {
      const expr = parseExpression();
      return { type: 'PrintStatement', expression: expr };
    }
    if (token.value === 'if') {
      const condition = parseExpression();
      consume(); // Consume `{`
      const body = parseBlock();
      return { type: 'IfStatement', condition, body };
    }
  }

  function parseBlock() {
    const block = [];
    while (index < tokens.length) {
      const token = tokens[index];
      if (token.value === '}') {
        consume(); // Consume '}'
        break;
      }
      block.push(parseStatement());
    }
    return block;
  }

  const ast = [];
  while (index < tokens.length) {
    ast.push(parseStatement());
  }

  return ast;
}

function interpret(ast) {
  const variables = {};

  function evalExpression(expr) {
    if (expr.type === 'Literal') {
      return expr.value;
    }
    if (expr.type === 'Identifier') {
      return variables[expr.name];
    }
  }

  function execStatement(statement) {
    if (statement.type === 'PrintStatement') {
      console.log(evalExpression(statement.expression));
    }
    if (statement.type === 'IfStatement') {
      if (evalExpression(statement.condition)) {
        statement.body.forEach(execStatement);
      }
    }
  }

  ast.forEach(execStatement);
}

const filePath = process.argv[2];
if (!filePath) {
  console.error("Error: No file provided.");
  process.exit(1);
}

try {
  const code = fs.readFileSync(filePath, 'utf-8');
  const tokens = tokenize(code);
  const ast = parse(tokens);
  interpret(ast);
} catch (err) {
  console.error(`Error reading file: ${err.message}`);
  process.exit(1);
}
