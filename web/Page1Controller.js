var mainApp = angular.module("mainApp", ['ngCookies','as.sortable']);
         
         mainApp.controller('Page1Controller', function($scope,$http,$cookies,$window) {
             
             if($cookies.login !="success")
             {
                 $cookies.login="loginFirst";
                 $window.location.href = 'index.html';
             }else{
                 
                 $scope.logout= function(){
                     $cookies.login="logout";
                     $window.location.href = 'index.html';
                 }
         $http.get("Show").success(function(response){
              $scope.user=response;
               $scope.alertmailer=$scope.user.AlertMailer;
              if(!$scope.user.SUBJECT_OWNER_NoNMultiStory){
                  $scope.SUBJECT_OWNER_NoNMultiStory1=[];
              }else
              {
                  $scope.SUBJECT_OWNER_NoNMultiStory1=$scope.user.SUBJECT_OWNER_NoNMultiStory;
              }
                if(!$scope.user.SUBJECT_NoNOWNER_NoNMultiStory){
                  $scope.SUBJECT_NoNOWNER_NoNMultiStory1=[];
              }else
              {
                  $scope.SUBJECT_NoNOWNER_NoNMultiStory1=$scope.user.SUBJECT_NoNOWNER_NoNMultiStory;
              }
             
                  if(!$scope.user.SUBJECT_OWNER_MULTISTORY_RENT){
                  $scope.SUBJECT_OWNER_MULTISTORY_RENT1=[];
              }else
              {
                  $scope.SUBJECT_OWNER_MULTISTORY_RENT1=$scope.user.SUBJECT_OWNER_MULTISTORY_RENT;
              }
                if(!$scope.user.SUBJECT_NoNOWNER_MULTISTORY_RENT){
                  $scope.SUBJECT_NoNOWNER_MULTISTORY_RENT1=[];
              }else
              {
                  $scope.SUBJECT_NoNOWNER_MULTISTORY_RENT1=$scope.user.SUBJECT_NoNOWNER_MULTISTORY_RENT;
              }
               if(!$scope.user.SUBJECT_NoNOWNER_MULTISTORY_RENT_PREHEADER){
                  $scope.SUBJECT_NoNOWNER_MULTISTORY_RENT_PREHEADER1=[];
              }else
              {
                  $scope.SUBJECT_NoNOWNER_MULTISTORY_RENT_PREHEADER1=$scope.user.SUBJECT_NoNOWNER_MULTISTORY_RENT_PREHEADER;
              }
              if(!$scope.user.PREHEADER_NoNOWNER_RENT){
                  $scope.PREHEADER_NoNOWNER_RENT1=[];
              }else
              {
                  $scope.PREHEADER_NoNOWNER_RENT1=$scope.user.PREHEADER_NoNOWNER_RENT;
              }
              if(!$scope.user.SUBJECT_OWNER_MULTISTORY_SALE){
                  $scope.SUBJECT_OWNER_MULTISTORY_SALE1=[];
              }else
              {
                  $scope.SUBJECT_OWNER_MULTISTORY_SALE1=$scope.user.SUBJECT_OWNER_MULTISTORY_SALE;
              }
              if(!$scope.user.SUBJECT_NoNOWNER_MULTISTORY_SALE){
                  $scope.SUBJECT_NoNOWNER_MULTISTORY_SALE1=[];
              }else
              {
                  $scope.SUBJECT_NoNOWNER_MULTISTORY_SALE1=$scope.user.SUBJECT_NoNOWNER_MULTISTORY_SALE;
              }
              if(!$scope.user.SUBJECT_NoNOWNER_MULTISTORY_SALE_PREHEADER){
                  $scope.SUBJECT_NoNOWNER_MULTISTORY_SALE_PREHEADER1=[];
              }else
              {
                  $scope.SUBJECT_NoNOWNER_MULTISTORY_SALE_PREHEADER1=$scope.user.SUBJECT_NoNOWNER_MULTISTORY_SALE_PREHEADER;
              }
              if(!$scope.user.PREHEADER_NoNOWNER_SALE){
                  $scope.PREHEADER_NoNOWNER_SALE1=[];
              }else
              {
                  $scope.PREHEADER_NoNOWNER_SALE1=$scope.user.PREHEADER_NoNOWNER_SALE;
              }
                if(!$scope.user.Relaxation){
                  $scope.relaxation=[];
              }else
              {
                  $scope.relaxation=$scope.user.Relaxation;
              }  
              if(!$scope.user.VM){
                  $scope.vm1=[];
              }else
              {
                  $scope.vm1=$scope.user.VM;
              }
        
        
                  
                        
                        
                          $scope.noofprops=$scope.user.NoOfProperties;
                          $scope.relaxationlen=[];
                          for(var i=0;i<$scope.relaxation.length;i++){
                              $scope.relaxationlen.push(i);
                          }
                          
           
           });
         
           
           $scope.namelist=["Default","parent1","parent2","parent3","parent4","parent5","10Percent","RadiusSearch0"
                             ,"RadiusSearch3","20Percent","30Percent","40Percent","NearbyLocality","UnPaid","CityDefault"
                            ,"City","DefaultBudget","AllUser"];
                        
            $scope.SLList=["<PropertyCount>","<OwnerProperties>","<LocalityName>","<Bedroom>","<Price>","<Rent>","<BDEXTRA>"
                        ,"<TransactionType>"];
              $scope.PHList=["<userName>","<FURNISHED>","<SEMIFURNISHED>","<ReadyTOMoveIN>","<UNDERCONSTRUCTION>","<NEW>","<RESALE>","<LocalityName>"];          
                        
         $scope.budgetlist=["0","5","10","15","20","25","30","35","40","45","50"];  
         $scope.distancelist=["0","1","2","3","4","5","6","7","8","9","10"];
        $scope.sortfieldlist=["ecd","sortCode11"];
        $scope.sortorderlist=["asc","desc"];
         $scope.groupfieldlist=["ecd","sortCode11"];
         $scope.grouporderlist=["asc","desc"];
         $scope.filterfieldlist=["NOT unDtm","sdp"];
         $scope.filterorderlist=["Y","0"];
         $scope.filterrangelist=["sortCode11"];
         $scope.sort=[];
         $scope.filter=[];
         $scope.filterrange=[];
         $scope.group=[];
         $scope.relaxation1=[];
         $scope.SUBJECT_OWNER_NoNMultiStory_A=$scope.SLList[0];
         $scope.SUBJECT_OWNER_NoNMultiStory=[];
         $scope.SUBJECT_NoNOWNER_NoNMultiStory_A= $scope.SLList[0];
         $scope.SUBJECT_NoNOWNER_NoNMultiStory=[];
         $scope.SUBJECT_OWNER_MULTISTORY_RENT=[]; 
         $scope.SUBJECT_OWNER_MULTISTORY_RENT_A=$scope.SLList[0];
         $scope.SUBJECT_NoNOWNER_MULTISTORY_RENT=[]; 
         $scope.SUBJECT_NoNOWNER_MULTISTORY_RENT_A=$scope.SLList[0];
         $scope.SUBJECT_NoNOWNER_MULTISTORY_RENT_PREHEADER =[];
         $scope.SUBJECT_NoNOWNER_MULTISTORY_RENT_PREHEADER_A=$scope.SLList[0];
         $scope.PREHEADER_NoNOWNER_RENT =[];
         $scope.PREHEADER_NoNOWNER_RENT_A=$scope.PHList[0];
         $scope.SUBJECT_OWNER_MULTISTORY_SALE=[]; 
         $scope.SUBJECT_OWNER_MULTISTORY_SALE_A=$scope.SLList[0];
         $scope.SUBJECT_NoNOWNER_MULTISTORY_SALE=[];
         $scope.SUBJECT_NoNOWNER_MULTISTORY_SALE_A=$scope.SLList[0];
         $scope.SUBJECT_NoNOWNER_MULTISTORY_SALE_PREHEADER=[]; 
         $scope.SUBJECT_NoNOWNER_MULTISTORY_SALE_PREHEADER_A=$scope.SLList[0];
         $scope.PREHEADER_NoNOWNER_SALE=[];
         $scope.PREHEADER_NoNOWNER_SALE_A=$scope.PHList[0];
         $scope.vm =[];
         $scope.vm_A=$scope.SLList[0];
      
        
  $scope.add5=function(){
      $scope.sort.push({
                            sortfield: $scope.sortfield,
                            sortorder: $scope.sortorder
                             });
  }
   $scope.remove5 = function (x) {
        
        $scope.sort.splice(x, 1);
       
    }
  $scope.add6=function(){
      $scope.filter.push({
                            filterfield: $scope.filterfield,
                            filterorder: $scope.filterorder
                             });
  }
   $scope.remove6 = function (x) {
        
        $scope.filter.splice(x, 1);
       
    }
    $scope.add66=function(){
      $scope.filterrange.push({
                            range: $scope.filterrange1,
                            value: $scope.filterrangevalue1
                             });
  }
   $scope.remove66 = function (x) {
        
        $scope.filterrange.splice(x, 1);
       
    }
    $scope.add7=function(){
      $scope.group.push({
                            groupfield: $scope.groupfield,
                            grouporder: $scope.grouporder
                             });
  }
   $scope.remove7 = function (x) {
        
        $scope.group.splice(x, 1);
       
    }
    $scope.add8=function(x){
      $scope.relaxation[x].sort_order.push({
                            sortfield: $scope.sortfieldd,
                            sortorder: $scope.sortorderr
                             });
  }
  $scope.remove8 = function (x,y) {
        
        $scope.relaxation[y].sort_order.splice(x, 1);
       
    }
     $scope.add9=function(x){
      $scope.relaxation[x].fq.push({
                            filterfield: $scope.filterfieldd,
                            filterorder: $scope.filterorderr
                             });
  }
  $scope.remove9 = function (x,y) {
        
        $scope.relaxation[y].fq.splice(x, 1);
       
    }
    $scope.add99=function(x){
      $scope.relaxation[x].filterrange.push({
                            range: $scope.filterrange11,
                            value: $scope.filterrangevalue11
                             });
  }
  $scope.remove99 = function (x,y) {
        
        $scope.relaxation[y].filterrange.splice(x, 1);
       
    }
     $scope.add10=function(x){
      $scope.relaxation[x].group_order.push({
                            groupfield: $scope.groupfieldd,
                            grouporder: $scope.grouporderr
                             });
  }
  $scope.remove10 = function (x,y) {
        
        $scope.relaxation[y].group_order.splice(x, 1);
       
    }
    $scope.default=function(){
    $scope.name=$scope.namelist[0];
    $scope.budget=$scope.budgetlist[0];
           $scope.distance_low=$scope.distancelist[0];
             $scope.distance_high=$scope.distancelist[0];
          
           $scope.sortfield=$scope.sortfieldlist[0];
           $scope.filterrange1=$scope.filterrangelist[0];
         $scope.filterfield=$scope.filterfieldlist[0];
         $scope.groupfield=$scope.groupfieldlist[0];
         $scope.sortorder=$scope.sortorderlist[0];
         $scope.filterorder=$scope.filterorderlist[0];
         $scope.grouporder=$scope.grouporderlist[0];    
    }
    
    $scope.add4=function(){
       if($scope.relaxationindex !=null ){
           
            var item={
                          name: $scope.name,
                          budget:$scope.budget,
                          distance_low:$scope.distance_low,
                          distance_high:$scope.distance_high,
                          sort_order: $scope.sort,
                          fq: $scope.filter,
                          filterrange:$scope.filterrange,
                          group_order:$scope.group
                          };
         $scope.relaxation.splice($scope.relaxationindex,0,item);
         $scope.relaxationindex=null;
         $scope.relaxationlen=[];
                         for(var i=0;i<$scope.relaxation.length;i++){
                              $scope.relaxationlen.push(i);
                          }
       }else{
         $scope.relaxation.push({
                          name: $scope.name,
                          budget:$scope.budget,
                          distance_low:$scope.distance_low,
                          distance_high:$scope.distance_high,
                          sort_order: $scope.sort,
                          fq: $scope.filter,
                          filterrange:$scope.filterrange,
                          group_order:$scope.group
                          });
          $scope.relaxationlen=[];
                         for(var i=0;i<$scope.relaxation.length;i++){
                              $scope.relaxationlen.push(i);
                          }
             }
           $scope.name=[]; 
           $scope.budget=[];
           $scope.distance_low=[];
           $scope.distance_high=[];
           
           $scope.sort=[];
           $scope.filter=[];
           $scope.filterrange=[];
           $scope.group=[];
           $scope.sortfield=[];
           
         $scope.filterfield=[];
         $scope.groupfield=[];
         $scope.sortorder=[];
         $scope.filterorder=[];
         $scope.grouporder=[];
    }
     $scope.remove4 = function (x) {
        
        $scope.relaxation.splice(x, 1);
       
    }
    $scope.edit= function(x){
        
     $scope.index1=x;   
     $scope.sortfieldd=$scope.sortfieldlist[0];
           $scope.filterrange11=$scope.filterrangelist[0];
         $scope.filterfieldd=$scope.filterfieldlist[0];
         $scope.groupfieldd=$scope.groupfieldlist[0];
         $scope.sortorderr=$scope.sortorderlist[0];
         $scope.filterorderr=$scope.filterorderlist[0];
         $scope.grouporderr=$scope.grouporderlist[0]; 
    }
    $scope.clear= function(){
        $scope.name=[]; 
           $scope.budget=[];
           $scope.distance_low=[];
           $scope.distance_high=[];
        $scope.sort=[];
           $scope.filter=[];
           $scope.group=[];   
        $scope.sortfield=[];
           
         $scope.filterfield=[];
         $scope.groupfield=[];
         $scope.sortorder=[];
         $scope.filterorder=[];
         $scope.grouporder=[];
    }
    
    
      $scope.addItem = function () {
        $scope.errortext = "";
        if ($scope.SUBJECT_OWNER_NoNMultiStory=="" ||$scope.SUBJECT_OWNER_NoNMultiStory==null ) {return;}
        //if ($scope.SUBJECT_OWNER_NoNMultiStory1.indexOf($scope.SUBJECT_OWNER_NoNMultiStory) == -1) {
            
            $scope.SUBJECT_OWNER_NoNMultiStory1.push($scope.SUBJECT_OWNER_NoNMultiStory);
           $scope.SUBJECT_OWNER_NoNMultiStory=[];
            
        //} else {
          //  $scope.errortext = "The item is already in your  list.";
       // }
    }
    $scope.addItemm=function(){
        $scope.SUBJECT_OWNER_NoNMultiStory += $scope.SUBJECT_OWNER_NoNMultiStory_A;
    }
      $scope.removeItem = function (x) {
        $scope.errortext = "";
        $scope.SUBJECT_OWNER_NoNMultiStory1.splice(x, 1);
       
    }
    
         $scope.addItem1 = function () {
        $scope.errortext1 = "";
        if ($scope.SUBJECT_NoNOWNER_NoNMultiStory=="" || $scope.SUBJECT_NoNOWNER_NoNMultiStory==null ) {return;}
       // if ($scope.SUBJECT_NoNOWNER_NoNMultiStory1.indexOf($scope.SUBJECT_NoNOWNER_NoNMultiStory) == -1) {
            
            $scope.SUBJECT_NoNOWNER_NoNMultiStory1.push($scope.SUBJECT_NoNOWNER_NoNMultiStory);
           $scope.SUBJECT_NoNOWNER_NoNMultiStory=[];
            
       // } else {
         //   $scope.errortext1 = "The item is already in your  list.";
        //}
    }
    $scope.addItemm1=function(){
        $scope.SUBJECT_NoNOWNER_NoNMultiStory += $scope.SUBJECT_NoNOWNER_NoNMultiStory_A;
    }
    $scope.removeItem1 = function (x) {
        $scope.errortext1 = "";
        $scope.SUBJECT_NoNOWNER_NoNMultiStory1.splice(x, 1);
       
    }
     $scope.addItem2 = function () {
        $scope.errortext2 = "";
        if ($scope.SUBJECT_OWNER_MULTISTORY_RENT=="" || $scope.SUBJECT_OWNER_MULTISTORY_RENT==null) {return;}
        //if ($scope.SUBJECT_OWNER_MULTISTORY_RENT1.indexOf($scope.SUBJECT_OWNER_MULTISTORY_RENT) == -1) {
            
            $scope.SUBJECT_OWNER_MULTISTORY_RENT1.push($scope.SUBJECT_OWNER_MULTISTORY_RENT);
           $scope.SUBJECT_OWNER_MULTISTORY_RENT=[];
            
        //} else {
          //  $scope.errortext2 = "The item is already in your  list.";
        //}
    }
    $scope.addItemm2=function(){
        $scope.SUBJECT_OWNER_MULTISTORY_RENT += $scope.SUBJECT_OWNER_MULTISTORY_RENT_A;
    }
    $scope.removeItem2 = function (x) {
        $scope.errortext2 = "";
        $scope.SUBJECT_OWNER_MULTISTORY_RENT1.splice(x, 1);
       
    }
    $scope.addItem3 = function () {
        $scope.errortext3 = "";
        if ($scope.SUBJECT_NoNOWNER_MULTISTORY_RENT=="" || $scope.SUBJECT_NoNOWNER_MULTISTORY_RENT==null ) {return;}
        //if ($scope.SUBJECT_NoNOWNER_MULTISTORY_RENT1.indexOf($scope.SUBJECT_NoNOWNER_MULTISTORY_RENT) == -1) {
            
            $scope.SUBJECT_NoNOWNER_MULTISTORY_RENT1.push($scope.SUBJECT_NoNOWNER_MULTISTORY_RENT);
           $scope.SUBJECT_NoNOWNER_MULTISTORY_RENT=[];
            
       // } else {
         //   $scope.errortext3 = "The item is already in your  list.";
       // }
       
    }
    $scope.addItemm3=function(){
        $scope.SUBJECT_NoNOWNER_MULTISTORY_RENT += $scope.SUBJECT_NoNOWNER_MULTISTORY_RENT_A;
    }
      $scope.removeItem3 = function (x) {
        $scope.errortext3 = "";
        $scope.SUBJECT_NoNOWNER_MULTISTORY_RENT1.splice(x, 1);
       
    }
     $scope.addItem4 = function () {
        $scope.errortext4 = "";
        if ($scope.vm=="" || $scope.vm==null) {return;}
        //if ($scope.vm1.indexOf($scope.vm) == -1) {
            
            $scope.vm1.push($scope.vm);
           $scope.vm=[];
            
        //} else {
        //    $scope.errortext4 = "The item is already in your  list.";
        //}
       
    }
    $scope.addItemm4=function(){
        $scope.vm += $scope.vm_A;
    }
      $scope.removeItem4 = function (x) {
        $scope.errortext4 = "";
        $scope.vm1.splice(x, 1);
       
    } 
    $scope.addItem5 = function () {
        $scope.errortext5 = "";
        if ($scope.SUBJECT_NoNOWNER_MULTISTORY_RENT_PREHEADER=="" || $scope.SUBJECT_NoNOWNER_MULTISTORY_RENT_PREHEADER==null ) {return;}
        //if ($scope.SUBJECT_NoNOWNER_MULTISTORY_RENT_PREHEADER1.indexOf($scope.SUBJECT_NoNOWNER_MULTISTORY_RENT_PREHEADER) == -1) {
            
            $scope.SUBJECT_NoNOWNER_MULTISTORY_RENT_PREHEADER1.push($scope.SUBJECT_NoNOWNER_MULTISTORY_RENT_PREHEADER);
           $scope.SUBJECT_NoNOWNER_MULTISTORY_RENT_PREHEADER=[];
            
//        } else {
  //          $scope.errortext5 = "The item is already in your  list.";
    //    }
    }
    $scope.addItemm5=function(){
        $scope.SUBJECT_NoNOWNER_MULTISTORY_RENT_PREHEADER += $scope.SUBJECT_NoNOWNER_MULTISTORY_RENT_PREHEADER_A;
    }
      $scope.removeItem5 = function (x) {
        $scope.errortext5 = "";
        $scope.SUBJECT_NoNOWNER_MULTISTORY_RENT_PREHEADER1.splice(x, 1);
       
    }
    $scope.addItem9 = function () {
        $scope.errortext9 = "";
        if ($scope.PREHEADER_NoNOWNER_RENT=="" || $scope.PREHEADER_NoNOWNER_RENT==null) {return;}
      //  if ($scope.PREHEADER_NoNOWNER_RENT1.indexOf($scope.PREHEADER_NoNOWNER_RENT) == -1) {
            
            $scope.PREHEADER_NoNOWNER_RENT1.push($scope.PREHEADER_NoNOWNER_RENT);
           $scope.PREHEADER_NoNOWNER_RENT=[];
            
       // } else {
         //   $scope.errortext9 = "The item is already in your  list.";
        //}
    }
     $scope.addItemm9=function(){
        $scope.PREHEADER_NoNOWNER_RENT += $scope.PREHEADER_NoNOWNER_RENT_A;
    }
      $scope.removeItem9 = function (x) {
        $scope.errortext9 = "";
        $scope.PREHEADER_NoNOWNER_RENT1.splice(x, 1);
       
    }
    $scope.addItem6 = function () {
        $scope.errortext6 = "";
        if ($scope.SUBJECT_OWNER_MULTISTORY_SALE=="" || $scope.SUBJECT_OWNER_MULTISTORY_SALE==null) {return;}
        //if ($scope.SUBJECT_OWNER_MULTISTORY_SALE1.indexOf($scope.SUBJECT_OWNER_MULTISTORY_SALE) == -1) {
            
            $scope.SUBJECT_OWNER_MULTISTORY_SALE1.push($scope.SUBJECT_OWNER_MULTISTORY_SALE);
           $scope.SUBJECT_OWNER_MULTISTORY_SALE=[];
            
        //} else {
          //  $scope.errortext6 = "The item is already in your  list.";
       // }
    }
    $scope.addItemm6=function(){
        $scope.SUBJECT_OWNER_MULTISTORY_SALE += $scope.SUBJECT_OWNER_MULTISTORY_SALE_A;
    }
      $scope.removeItem6 = function (x) {
        $scope.errortext6 = "";
        $scope.SUBJECT_OWNER_MULTISTORY_SALE1.splice(x, 1);
       
    }
     $scope.addItem7 = function () {
        $scope.errortext7 = "";
        if ($scope.SUBJECT_NoNOWNER_MULTISTORY_SALE=="" || $scope.SUBJECT_NoNOWNER_MULTISTORY_SALE==null) {return;}
        //if ($scope.SUBJECT_NoNOWNER_MULTISTORY_SALE1.indexOf($scope.SUBJECT_NoNOWNER_MULTISTORY_SALE) == -1) {
            
            $scope.SUBJECT_NoNOWNER_MULTISTORY_SALE1.push($scope.SUBJECT_NoNOWNER_MULTISTORY_SALE);
           $scope.SUBJECT_NoNOWNER_MULTISTORY_SALE=[];
            
      //  } else {
        //    $scope.errortext7 = "The item is already in your  list.";
        //}
    }
    $scope.addItemm7=function(){
        $scope.SUBJECT_NoNOWNER_MULTISTORY_SALE += $scope.SUBJECT_NoNOWNER_MULTISTORY_SALE_A;
    }
      $scope.removeItem7 = function (x) {
        $scope.errortext7 = "";
        $scope.SUBJECT_NoNOWNER_MULTISTORY_SALE1.splice(x, 1);
       
    }
    $scope.addItem8 = function () {
        $scope.errortext8 = "";
        if ($scope.SUBJECT_NoNOWNER_MULTISTORY_SALE_PREHEADER=="" || $scope.SUBJECT_NoNOWNER_MULTISTORY_SALE_PREHEADER==null) {return;}
        //if ($scope.SUBJECT_NoNOWNER_MULTISTORY_SALE_PREHEADER1.indexOf($scope.SUBJECT_NoNOWNER_MULTISTORY_SALE_PREHEADER) == -1) {
            
            $scope.SUBJECT_NoNOWNER_MULTISTORY_SALE_PREHEADER1.push($scope.SUBJECT_NoNOWNER_MULTISTORY_SALE_PREHEADER);
           $scope.SUBJECT_NoNOWNER_MULTISTORY_SALE_PREHEADER=[];
            
        //} else {
          //  $scope.errortext8 = "The item is already in your  list.";
      //  }
    }
     $scope.addItemm8=function(){
        $scope.SUBJECT_NoNOWNER_MULTISTORY_SALE_PREHEADER += $scope.SUBJECT_NoNOWNER_MULTISTORY_SALE_PREHEADER_A;
    }
      $scope.removeItem8 = function (x) {
        $scope.errortext8 = "";
        $scope.SUBJECT_NoNOWNER_MULTISTORY_SALE_PREHEADER1.splice(x, 1);
       
    }
    $scope.addItem10 = function () {
        $scope.errortext10 = "";
        if ($scope.PREHEADER_NoNOWNER_SALE=="" || $scope.PREHEADER_NoNOWNER_SALE==null ) {return;}
        //if ($scope.PREHEADER_NoNOWNER_SALE1.indexOf($scope.PREHEADER_NoNOWNER_SALE) == -1) {
            
            $scope.PREHEADER_NoNOWNER_SALE1.push($scope.PREHEADER_NoNOWNER_SALE);
           $scope.PREHEADER_NoNOWNER_SALE=[];
            
        //} else {
    //        $scope.errortext10 = "The item is already in your  list.";
      //  }
    }
    $scope.addItemm10=function(){
        $scope.PREHEADER_NoNOWNER_SALE += $scope.PREHEADER_NoNOWNER_SALE_A;
    }
      $scope.removeItem10 = function (x) {
        $scope.errortext10 = "";
        $scope.PREHEADER_NoNOWNER_SALE1.splice(x, 1);
       
    }
        $scope.submit = function () {
        $scope.SUBJECT_OWNER_NoNMultiStory2= $scope.SUBJECT_OWNER_NoNMultiStory1;
        $scope.SUBJECT_NoNOWNER_NoNMultiStory2= $scope.SUBJECT_NoNOWNER_NoNMultiStory1;
        $scope.SUBJECT_OWNER_MULTISTORY_RENT2= $scope.SUBJECT_OWNER_MULTISTORY_RENT1;
        $scope.SUBJECT_NoNOWNER_MULTISTORY_RENT2= $scope.SUBJECT_NoNOWNER_MULTISTORY_RENT1;
        $scope.SUBJECT_NoNOWNER_MULTISTORY_RENT_PREHEADER2= $scope.SUBJECT_NoNOWNER_MULTISTORY_RENT_PREHEADER1;
        $scope.PREHEADER_NoNOWNER_RENT2= $scope.PREHEADER_NoNOWNER_RENT1;
        $scope.SUBJECT_OWNER_MULTISTORY_SALE2= $scope.SUBJECT_OWNER_MULTISTORY_SALE1;
        $scope.SUBJECT_NoNOWNER_MULTISTORY_SALE2= $scope.SUBJECT_NoNOWNER_MULTISTORY_SALE1;
        $scope.SUBJECT_NoNOWNER_MULTISTORY_SALE_PREHEADER2= $scope.SUBJECT_NoNOWNER_MULTISTORY_SALE_PREHEADER1;
        $scope.PREHEADER_NoNOWNER_SALE2= $scope.PREHEADER_NoNOWNER_SALE1;
        $scope.vm2= $scope.vm1;
       $scope.relaxation2= angular.toJson($scope.relaxation);
       
        
       
    }                       
              
               
             } 
         });
         
         
