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
  