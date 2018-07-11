// /**
//  * Bootstrap
//  * (sails.config.bootstrap)
//  *
//  * An asynchronous bootstrap function that runs just before your Sails app gets lifted.
//  * > Need more flexibility?  You can also do this by creating a hook.
//  *
//  * For more information on bootstrapping your app, check out:
//  * https://sailsjs.com/config/bootstrap
//  */
//
// module.exports.bootstrap = async function(done) {
//
//   // By convention, this is a good place to set up fake data during development.
//   //
//   // For example:
//   // ```
//   // // Set up fake development data (or if we already have some, avast)
//   // if (await User.count() > 0) {
//   //   return done();
//   // }
//   //
//   // await User.createEach([
//   //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
//   //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
//   //   // etc.
//   // ]);
//   // ```
//
//   // No fake data in production
//   if (process.env.NODE_ENV === 'production') {
//     return done();
//   }
//
//   // Create a user
//   User.findOne({email: 'me@gmail.com'}, function(err, user){
//     if(!user){
//       User.create({
//         email: 'me@gmail.com',
//         password: 'password',
//       }).fetch().exec(function(err,user){
//         console.log("Default user created");
//         console.log("- username: " + user.email);
//         console.log("- password: password");
//       });
//     } else {
//       console.log('Default user already exists');
//       console.log("- username: " + user.email);
//       console.log("- password: password");
//     }
//   });
//
//   // Create a trusted application
//   Client.findOne({'name': 'trustedTestClient'}, function(err, client){
//     if(err){
//       console.log(err.message);
//     } else {
//       if(!client){
//         Client.create({name : 'trustedTestClient',
//           redirectURI: 'http://localhost:1338',
//           trusted: true
//         }).fetch().exec(function(err, client){
//           if(err){
//             console.log(err.message);
//           } else {
//             console.log("trustedTestClient created");
//             console.log("- client_id: " + client.clientId);
//             console.log("- client_secret: " + client.clientSecret);
//             console.log("- redirectURI: " + client.redirectURI);
//           }
//         });
//       } else {
//         console.log('trustedTestClient already exists');
//         console.log("- client_id: " + client.clientId);
//         console.log("- client_secret: " + client.clientSecret);
//         console.log("- redirectURI: " + client.redirectURI);
//       }
//     }
//   });
//
//   // Create an untrusted application
//   Client.findOne({'name': 'untrustedTestClient'}, function(err, client){
//     if(err){
//       console.log(err.message);
//     } else {
//       if(!client){
//         Client.create({name : 'untrustedTestClient',
//           redirectURI: 'http://localhost:1339'
//         }).fetch().exec(function(err, client){
//           if(err){
//             console.log(err.message);
//           } else {
//             console.log("untrustedTestClient created");
//             console.log("- client_id: " + client.clientId);
//             console.log("- client_secret: " + client.clientSecret);
//             console.log("- redirectURI: " + client.redirectURI);
//           }
//         });
//       } else {
//         console.log('untrustedTestClient already exists');
//         console.log("- client_id: " + client.clientId);
//         console.log("- client_secret: " + client.clientSecret);
//         console.log("- redirectURI: " + client.redirectURI);
//       }
//     }
//   });
//
//   // Don't forget to trigger `done()` when this bootstrap function's logic is finished.
//   // (otherwise your server will never lift, since it's waiting on the bootstrap)
//   return done();
//
// };
