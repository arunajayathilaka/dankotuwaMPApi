module.exports = function(app) {

var User = app.models.user;
var Role = app.models.Role;
var RoleMapping = app.models.RoleMapping;
var userDetail = {username: 'aruna', email: 'aruna@admin.com', password: 'aruna'};
//findOrCreate({where: {email: user.email}}, user, function(err, account) {
User.findOrCreate(
    {where: {username: 'aruna', email: 'aruna@admin.com'}},userDetail, function(err, users) {
    if (err) {console.log(err);};
    //...
    // Create projects, assign project owners and project team members
    //...
    // Create the admin role
    Role.findOrCreate({where:{
      name: 'admin'
    }},{name: 'admin'}, function(err, role) {
      if (err) throw err;
      //debug(role);

      // Make Bob an admin
      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: users.id
      }, function(err, principal) {
        if (err) throw err;
        //debug(principal);
      });
    });
  });
};
