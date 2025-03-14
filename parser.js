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
  