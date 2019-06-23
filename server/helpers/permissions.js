
module.exports.auth = next => (root, args, context, info) => {
  if (!context.user) { throw new Error('Unauthenticated!'); }

  return next(root, args, context, info);
};
