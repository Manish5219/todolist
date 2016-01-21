
angular.module('starter', ['ionic'])

.controller('myController',function($scope,$ionicPopup,$ionicListDelegate,$http)
{
    // $scope.tasks=[
    //       {title: "First"},
    //       {title: "Second"},
    //       {title: "Third"},
    // ];
    
    $scope.tasks=[];
    
//  $http.get('http://ip.jsontest.com/').then(function(resp)
//   {
//       $scope.tasks = resp.data.ip;
//     });
//     
     $http.get('./tasks.json').then(function(resp)
  {
      var items=["title"];
      items=resp.data;
    //   for(var i=0;i<resp.data.length;i++)
    //              $scope.tasks.push(resp.data[i].title);                              
       $scope.tasks=items;
    });

    // this function is for adding new tasks 
     $scope.newTask=function() {
        $ionicPopup.prompt({
            title:"New task",
            template:"Enter Task",
            inputPlaceholder:"What do you need to do?",
            okText:"Create task"
            
        }).then(function(res) {
            if(res) $scope.tasks.push({title:res});
            
        })
        
    };
 
    // this function is for deleting all tasks 
    $scope.deleteAllTasks=function(tasks)
    {
      $ionicPopup.prompt({
           title:"Delete all tasks",
            template:"Reason for Task",
            inputPlaceholder:"What do you want to delete all tasks?",
            okText:"Delete tasks"
      }).then(function(res)
      {
          if(res) 
          {      
                  while($scope.tasks.length > 0) {
                  $scope.tasks.pop();                                 }     
          }
      })  
    };
    
      // this function is for save all tasks 
    $scope.saveTasks=function(tasks)
    {
      $ionicPopup.prompt({
           title:"save all tasks",
            template:"This will save tasks to server",
            inputPlaceholder:" Do you want to save all tasks?",
            okText:"Save tasks"
      }).then(function(res)
      {
          if(res) 
          {      
                //   while($scope.tasks.length > 0) {
                //   $scope.tasks.pop();                                 }     
                var link = './people.json';
                  $http.post(link, $scope.tasks[0].title).then(function (res){
            
        });
          }
      })  
    };
    
    
     // this function is for editing a particular tasks 
     $scope.edit=function(task)
    {
        $scope.data={response:task.title};
        $ionicPopup.prompt({
             title:"Edit task",
             scope: $scope
        }).then(function(res)
        {
            if(res!==undefined)
            task.title=$scope.data.response;
            $ionicListDelegate.closeOptionButtons();
        });
    } 
})


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
    
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
