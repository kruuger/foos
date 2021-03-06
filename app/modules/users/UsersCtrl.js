var _ = require('lodash');

module.exports = /* @ngInject */ function(Users, UserService, $uibModal, Notification) {
	// ViewModel
	var vm = this;
	vm.list = Users;
	vm.form = {};
	vm.add = addUser;
	vm.edit = editUser;
	vm.remove = removeUser;

	function addUser() {
		UserService.add(vm.form).then(function(data) {
			vm.form = {};
			vm.list.push(data);
		});
	}

	function editUser(user) {
		$uibModal.open({
			templateUrl: './modules/users/templates/modals/editUser.html',
			controller: /* @ngInject */ function($modalInstance) {
				var vm = this;
				vm.form = _.clone(user);
				vm.close = function() {$modalInstance.close()};
				vm.save = saveUser;

				function saveUser() {
					UserService.edit(user._id, vm.form).then(function(data) {
						user = _.extend(user, data);
						vm.close();
					});
				}
				return vm;
			},
			controllerAs: 'editUser'
		})
	}

	function removeUser(user, idx) {
		UserService.remove(user._id).then(function(data) {
			console.log(data);
			vm.list.splice(idx, 1);
		});
	}

};