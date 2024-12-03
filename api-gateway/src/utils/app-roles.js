const appRoles = {
  admin: "ADMIN",
  client: "CLIENT",
};

const addAdminPermission = () => [appRoles.admin];
const addClientPermission = () => [appRoles.client, appRoles.admin];

module.exports = { appRoles, addAdminPermission, addClientPermission };
