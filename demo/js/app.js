
var app = angular.module('myApp', []);
//创建服务
 app.factory('EmailParser',function($interpolate){
         return {
    parse: function(text, context) {
    var template = $interpolate(text);
    return template(context);
     }
    };
         });
 //创建过滤器
 app.filter('capitalize', function() {//可以注入依赖
    return function(msg) {
      if(msg){
        return  msg[0].toUpperCase() + msg.slice(1);
      }
      }
});
app.controller('MyController',function($scope,$parse,$interpolate,EmailParser) {
$scope.name = "Ari22222";
$scope.message = "hello";
$scope.counter=0;
$scope.person={name:'jifenghasagei'};
$scope.add = function(amount){$scope.counter += amount;};
$scope.subtract = function(amount){$scope.counter -=amount;};

$scope.$watch('expr', function(newVal, oldVal, scope) {
      debugger
      if (newVal !== oldVal) {
      // 用该表达式设置parseFun
      var parseFun = $parse(newVal);
      // 获取经过解析后表达式的值
      $scope.parsedValue = parseFun(scope);
      }
});
// 设置监听(监听emailBody  只要发生变化   就)
/*$scope.$watch('emailBody', function(body) {
    debugger
    if (body) {
       var template = $interpolate(body);
      $scope.previewText =
        template({to: $scope.to});
    }
});*/
// 设置监听
$scope.$watch('emailBody', function(body) {
if (body) {
    $scope.previewText = EmailParser.parse(body, {
    to: $scope.to
    });
}
});

});
app.controller('ParentController', function($scope) {
$scope.user = {greeted: false};
});
app.controller('ChildController', function($scope) {
$scope.sayHello = function() {
$scope.user.name = 'Ari Lerner  Test';
};
});
var   app=angular.module('test',[]);
     app.controller('cont1',function($scope,$interval){//声明
      $scope.clock = {now:new Date()};
       var updateClock = function() {
        $scope.clock.now = new Date();
      };
       //定时器 的问题 
       var  timer = $interval(function(){
         $scope.$apply(updateClock);
       },1000);
        updateClock();
     });