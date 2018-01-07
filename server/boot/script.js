module.exports = function(app) {

var User = app.models.user;
var Role = app.models.Role;
var RoleMapping = app.models.RoleMapping;

User.create([
    {username: 'aruna', email: 'aruna@admin.com', password: 'aruna'}
], function(err, users) {
    if (err) throw err;
    //...
    // Create projects, assign project owners and project team members
    //...
    // Create the admin role
    Role.create({
      name: 'admin'
    }, function(err, role) {
      if (err) throw err;
      //debug(role);

      // Make Bob an admin
      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: users[0].id
      }, function(err, principal) {
        if (err) throw err;
        //debug(principal);
      });
    });
  });
};
