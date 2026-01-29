import { rolesEnum, resourcesEnum, actionEnum } from '$svc/enums.js';

let permissions = {
	[resourcesEnum.ADMINPANEL]: {
		[actionEnum.ACCESS]: [rolesEnum.ADMIN]
	}
};

export function hasPermission(role, resource, action) {
	if (!permissions[resource]) {
		return false;
	}
	if (!permissions[resource][action]) {
		return false;
	}
	if (permissions[resource][action].length === 0) {
		return true; // Public access
	}
	return permissions[resource][action].includes(role);
}
