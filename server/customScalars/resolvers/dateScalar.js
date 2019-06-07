const { GraphQLScalarType } = require('graphql');
const { GraphQLError } = require('graphql/error');
const { Kind } = require('graphql/language');

module.exports = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Use JavaScript Date object for date/time fields.',

    serialize(value) {
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

      const year = value.getFullYear();
      const monthNumber = (1 + value.getMonth()).toString().padStart(2, '0');
      const month = monthNames[monthNumber - 1];
      const day = value.getDate().toString().padStart(2, '0');

      return `${month} ${day}, ${year}`;
    },

    parseValue(value) {
      const date = new Date(value);

      // eslint-disable-next-line no-restricted-globals
      if (Number.isNaN(date.getTime())) {
        throw new TypeError(`Value is not a valid Date: ${value}`);
      }

      return date;
    },

    parseLiteral(ast) {
      if (ast.kind !== Kind.STRING && ast.kind !== Kind.INT) {
        throw new GraphQLError(
          `Can only parse strings & integers to dates but got a: ${ast.kind}`,
        );
      }

      const result = new Date(ast.kind === Kind.INT ? Number(ast.value) : ast.value);

      if (Number.isNaN(result.getTime())) {
        throw new GraphQLError(`Value is not a valid Date: ${ast.value}`);
      }

      if (ast.kind === Kind.STRING && ast.value !== result.toJSON()) {
        throw new GraphQLError(
          `Value is not a valid Date format (YYYY-MM-DDTHH:MM:SS.SSSZ): ${
            ast.value
          }`,
        );
      }

      return result;
    },
  }),
};
