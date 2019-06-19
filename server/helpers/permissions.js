// const createResolver = (resolver) => {
//   const baseResolver = resolver;
//   baseResolver.createResolver = (childResolver) => {
//     const newResolver = async (parent, args, context, info) => {
//       await resolver(parent, args, context, info);
//       return childResolver(parent, args, context, info);
//     };
//     return createResolver(newResolver);
//   };
//   return baseResolver;
// };

// module.exports = 
//   createResolver((parent, args, { user }) => {
//     if (!user || !user.id) {
//       throw new Error('Not authenticated');
//     }
//   });

module.exports.auth = next => (root, args, context, info) => {
  if (!context.currentUser) { throw new Error(`Unauthenticated!`) }
  
  return next(root, args, context, info);
};