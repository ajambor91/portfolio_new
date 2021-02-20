export class CompareHelper{
    static compare(post, operator, value) {
        switch (operator) {
          case '>':   return post > value;
          case '<':   return post < value;
          case '>=':  return post >= value;
          case '<=':  return post <= value;
          case '==':  return post == value;
          case '!=':  return post != value;
          case '===': return post === value;
          case '!==': return post !== value;
        }
      }
}