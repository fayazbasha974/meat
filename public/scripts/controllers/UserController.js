angular.module('main')
  .controller('UserCtrl', function (User, $scope, $translate, $mdDialog, Toast, Auth) {

    // Pagination options.
    $scope.rowOptions = [5, 25, 50];

    $scope.query = {
      canonical: '',
      limit: 5,
      page: 1,
      total: 0
    }

    $scope.users = [];

    var loadUsers = function () {
      Auth.ensureLoggedIn().then(function () {
        $scope.promise = User.all($scope.query).then(function (data) {
          // $scope.users = data.users;
          $scope.users = [
            {
              "name": "test 2",
              "username": "test2",
              "email": "test2@gm.com",
              "mobile": "9999999999",
              "status": "Active",
              "type": "customer",
              "canonical": "test 2 test2 test2@gm.com",
              "_email_verify_token": "eyZfbIkHJxDFz6uMy2J4lzJGU",
              "emailVerified": false,
              "_email_verify_token_expires_at": "2020-07-08T14:12:22.046Z",
              "createdAt": "2020-07-08T12:12:21.905Z",
              "updatedAt": "2020-07-08T12:12:21.905Z",
              "ACL": {
                "*": {
                  "read": true
                },
                "ROyS8o0V5U": {
                  "read": true,
                  "write": true
                }
              },
              "objectId": "ROyS8o0V5U",
              "__type": "Object",
              "className": "_User"
            }
          ];
          $scope.query.total = data.total;
          $scope.$apply();
        });
      });
    }

    $scope.onInit = function (type) {
      $scope.query.type = type;
      loadUsers();
    };

    $scope.onRefresh = function () {
      $scope.query.page = 1;
      loadUsers();
    }

    $scope.onPaginationChange = function (page, limit) {
      $scope.query.page = page;
      $scope.query.limit = limit;
      loadUsers();
    }

    $scope.onReorder = function (field) {
      var indexOf = field.indexOf('-');
      var field1 = indexOf === -1 ? field : field.slice(1, field.length);
      $scope.query.orderBy = indexOf === -1 ? 'asc' : 'desc';
      $scope.query.orderByField = field1;
      loadUsers();
    };

    $scope.onEdit = function (ev, obj) {

      $mdDialog.show({
        controller: 'DialogUserController',
        templateUrl: '/views/partials/user.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        locals: {
          obj: obj || null
        },
        clickOutsideToClose: true
      }).then(function (response) {
        if (response) {
          loadUsers();
        }
      });
    }

    $scope.onDelete = function (ev, user) {

      $translate(['DELETE', 'CONFIRM_DELETE', 'CONFIRM', 'CANCEL', 'DELETED']).then(function (str) {

        var confirm = $mdDialog.confirm()
          .title(str.DELETE)
          .textContent(str.CONFIRM_DELETE)
          .ariaLabel(str.DELETE)
          .ok(str.CONFIRM)
          .cancel(str.CANCEL);
        $mdDialog.show(confirm).then(function () {

          User.delete({ id: user.id }).then(function () {
            $translate('DELETED').then(function (str) {
              Toast.show(str);
            });
            loadUsers();
          }, function (error) {
            Toast.show(error.message);
          });
        });

      });
    };

  }).controller('DialogUserController',
    function (User, File, $scope, $translate, $mdDialog, Toast, obj) {

      $scope.obj = obj || {};

      $scope.uploadImage = function (file) {

        if (file) {

          $scope.isUploading = true;

          File.upload(file).then(function (savedFile) {
            $scope.obj.photo = savedFile;
            $scope.isUploading = false;
            $scope.$apply();
          }, function (error) {

            Toast.show(error.message);
            $scope.isUploading = false;
            $scope.$apply();
          });
        }
      }

      $scope.onSubmit = function () {

        if ($scope.obj.password && $scope.obj.password.length < 6) {
          return $translate('PASSWORD_AT_LEAST_SIX_CHARACTERS').then(function (str) {
            Toast.show(str);
          });
        }

        $scope.isSaving = true;

        User.save($scope.obj).then(function (user) {
          $translate('SAVED').then(function (str) {
            Toast.show(str);
          });
          $mdDialog.hide(user);
          $scope.isSaving = false;
          $scope.$apply();
        }, function (error) {
          Toast.show(error.message);
          $scope.isSaving = false;
          $scope.$apply();
        });

      }

      $scope.onClose = function () {
        $mdDialog.cancel();
      }

    });
