 var mainApp = angular.module("mainApp", ['ngCookies']);
         
         mainApp.controller('Page2Controller', function($scope,$http,$cookies,$window) {
             
                  $scope.logout= function(){
                     $cookies.login="logout";
                     $window.location.href = 'index.html';
                 }
                 $scope.refresh=function(){
                                    
                   var cookies = document.cookie.split(";");

                   for (var i = 0; i < cookies.length; i++) {
                       var cookie = cookies[i];
                       var eqPos = cookie.indexOf("=");
                       var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                       document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
                   }
               
                     
                     $window.location.href = 'Page2.html';   
                 }
                   $scope.PRS_Speed=0;
                   $scope.PSM_Speed=0;
                   $scope.RENTAL_Speed=0;
                   
                   $scope.PRS_SENT_COUNT=0;
                   $scope.PSM_SENT_COUNT=0;
                   $scope.RENTAL_SENT_COUNT=0;
                   $scope.dataLoaded6=false;
            
             $http.get("GetProcessSpeed").success(function(response){
                            $scope.data6=response;
                            $scope.PRS_Speed=$scope.data6.speedPRS;
                            $scope.PSM_Speed=$scope.data6.speedPSM;
                            $scope.RENTAL_Speed=$scope.data6.speedRENTAL;
                            
                            $scope.PRS_SENT_COUNT=$scope.data6.countPRS;
                            $scope.PSM_SENT_COUNT=$scope.data6.countPSM;
                            $scope.RENTAL_SENT_COUNT=$scope.data6.countRENTAL;
                            $scope.dataLoaded6=true;
                            $scope.loadData();
                        });
                      
              
                  
                       
             $scope.mailSentGraph="Today";
             $scope.mailSentGraph1="PRS";
             $scope.mailSentGraph2=true;
             $scope.openMailGraph="Today";
             $scope.openMailGraph1="PRS";
             $scope.openMailGraph2=true;
             $scope.PRSMailGraph="Today";
             $scope.PRSCompilation="Today";
             $scope.ExpectedGraph="Today";
             $scope.dataLoaded1=false;
             
             $scope.dataLoaded2=false;
             $scope.dataLoaded3=false;
             $scope.nodata3=true;
             $scope.dataLoaded4=false;
             $scope.nodata4=true;
             $scope.dataLoaded5=false;
             $scope.nodata5=true;
              
                var counts_MCRMCriteria_today= 0;
                var counts_MCRMCriteria_weekly= 0;
                var counts_MCRMCriteria_monthly= 0;
                 
                
                
                
                
                
                
                $scope.drawGraphPRS= function(counts1,counts2,counts3,counts4){
               $scope.dataLoaded3=true;
               $scope.nodata3=true;
               document.getElementById("div3").innerHTML="<div id='myChart3' ></div>";
                 var data = [
                             ["invalid","unsubscribed","SHORT_OF_SUPPLY","MCRMCriteria"],
                             [counts1,counts2,counts3,counts4]
                                        ];
              $(function () {

                     // Initial chart
                     var myChart3 = c3.generate({
                         bindto: '#myChart3',
                         data: {
                             rows: data,
                             type: 'pie'
                         }
                     });



                 });
               
                               
           };
  //---------------------------------------------------------------------------------         
           $scope.drawGraph= function(counts1,counts2,counts3,labels){
               $scope.dataLoaded1=true;
               
               document.getElementById("div1").innerHTML="<canvas id='myChart1' height='200' width='400' ></canvas>";
               var ctx = document.getElementById("myChart1");
                                   var myChart = new Chart(ctx, {
                                   type: 'line',
                                   showTooltips:true,
                                   data: {
                                       labels: labels,
                                       datasets: [{
                                           label: 'PRS',
                                           data: counts1,
                                           tension: 0,
                                           pointBorderColor: "rgba(20, 129, 164, 1)",
                                            pointBackgroundColor: "#fff",
                                            pointBorderWidth: 1,
                                            pointHoverRadius: 5,
                                            pointHoverBackgroundColor: "rgba(0,0, 255, 1)",
                                            pointHoverBorderColor: "rgba(0,0,255, 1)",
                                            pointHoverBorderWidth: 2,
                                            pointRadius: 5,
                                            pointHitRadius: 10,
                                            
                                           backgroundColor: [

                                               'rgba(0, 0, 0, 0)'
                                           ],
                                           borderColor: [

                                               'rgba(0,0,255, 1)'
                                           ],
                                           borderWidth: 1
                                               },
                                               {
                                           label: 'PSM',
                                           data: counts2,
                                           tension: 0,
                                           pointBorderColor: "rgba(120, 29, 64, 1)",
                                            pointBackgroundColor: "#fff",
                                            pointBorderWidth: 1,
                                            pointHoverRadius: 5,
                                            pointHoverBackgroundColor: "rgba(0,255 0, 1)",
                                            pointHoverBorderColor: "rgba(0, 255, 0, 1)",
                                            pointHoverBorderWidth: 2,
                                            pointRadius: 5,
                                            pointHitRadius: 10,
                                           backgroundColor: [

                                               'rgba(0, 0, 0, 0)'
                                           ],
                                           borderColor: [

                                               'rgba(0, 255, 0, 1)'
                                           ],
                                           borderWidth: 1
                                               },
                                               {
                                           label: 'RENTAL',
                                           data: counts3,
                                           tension: 0,
                                           pointBorderColor: "rgba(120, 29, 64, 1)",
                                            pointBackgroundColor: "#fff",
                                            pointBorderWidth: 1,
                                            pointHoverRadius: 5,
                                            pointHoverBackgroundColor: "rgba(255, 255,0, 1)",
                                            pointHoverBorderColor: "rgba(255,255,0, 1)",
                                            pointHoverBorderWidth: 2,
                                            pointRadius: 5,
                                            pointHitRadius: 10,
                                           backgroundColor: [

                                               'rgba(0, 0, 0, 0)'
                                           ],
                                           borderColor: [

                                               'rgba(255,255,0, 1)'
                                           ],
                                           borderWidth: 1
                                               }
                                               


                                          ]
                                   },
                                   options: {

                                       legend: {
                                           display: true,
                                           labels: {

                                               boxWidth: 10
                                           }
                                       },
                                       scales: {
                                           yAxes: [{
                                                   scaleLabel:{
                                                    display: true,
                                                    labelString: 'Counts'
                                                },
                                               ticks: {
                                                   beginAtZero:false
                                               }
                                           }],
                                       xAxes: [{
                                                scaleLabel:{
                                                    display: true,
                                                    labelString: 'Date Time'
                                                },   
                                               ticks: {
                                                   beginAtZero:false
                                               }
                                           }]
                                       }
                                   }
                               });
           };
  //------------------------------------------------------------------------------------   
  $scope.drawGraph1= function(counts1,counts2,labels){
               $scope.dataLoaded1=true;
               
               document.getElementById("div1").innerHTML="<canvas id='myChart1' height='200' width='400' ></canvas>";
               var ctx = document.getElementById("myChart1");
                                   var myChart = new Chart(ctx, {
                                   type: 'line',
                                   showTooltips:true,
                                   data: {
                                       labels: labels,
                                       datasets: [{
                                           label: "Current Week",
                                           data: counts1,
                                           tension: 0,
                                           pointBorderColor: "rgba(20, 129, 164, 1)",
                                            pointBackgroundColor: "#fff",
                                            pointBorderWidth: 1,
                                            pointHoverRadius: 5,
                                            pointHoverBackgroundColor: "rgba(255,0, 0, 1)",
                                            pointHoverBorderColor: "rgba(255,0, 0, 1)",
                                            pointHoverBorderWidth: 2,
                                            pointRadius: 5,
                                            pointHitRadius: 10,
                                            
                                           backgroundColor: [

                                               'rgba(0, 0, 0, 0)'
                                           ],
                                           borderColor: [

                                               'rgba(255, 0, 0, 1)'
                                           ],
                                           borderWidth: 1
                                               },
                                               {
                                           label: "Previous Week",
                                           data: counts2,
                                           tension: 0,
                                           pointBorderColor: "rgba(120, 29, 64, 1)",
                                            pointBackgroundColor: "#fff",
                                            pointBorderWidth: 1,
                                            pointHoverRadius: 5,
                                            pointHoverBackgroundColor: "rgba(0, 255, 0, 1)",
                                            pointHoverBorderColor: "rgba(0, 255, 0, 1)",
                                            pointHoverBorderWidth: 2,
                                            pointRadius: 5,
                                            pointHitRadius: 10,
                                           backgroundColor: [

                                               'rgba(0, 0, 0, 0)'
                                           ],
                                           borderColor: [

                                               'rgba(0, 255, 0, 1)'
                                           ],
                                           borderWidth: 1
                                               }
                                               


                                          ]
                                   },
                                   options: {

                                       legend: {
                                           display: true,
                                           labels: {

                                               boxWidth: 10
                                           }
                                       },
                                       scales: {
                                           yAxes: [{
                                                   scaleLabel:{
                                                    display: true,
                                                    labelString: 'Counts'
                                                },
                                               ticks: {
                                                   beginAtZero:false
                                               }
                                           }],
                                       xAxes: [{
                                                scaleLabel:{
                                                    display: true,
                                                    labelString: 'Date Time'
                                                },   
                                               ticks: {
                                                   beginAtZero:false
                                               }
                                           }]
                                       }
                                   }
                               });
           };
  //------------------------------------------------------------------------------------   
           $scope.drawGraphOpen= function(counts1,counts2,counts3,labels){
               $scope.dataLoaded2=true;
               document.getElementById("div2").innerHTML="<canvas id='myChart2' height='200' width='400' ></canvas>";
               var ctx = document.getElementById("myChart2");
                               var    myChart = new Chart(ctx, {
                                   type: 'line',
                                   data: {
                                       labels: labels,
                                       datasets: [{
                                           label: 'PRS',
                                           data: counts1,
                                           tension: 0,
                                           backgroundColor: "rgba(75,192,192,0.4)",
            
                                        pointBorderColor: "rgba(75,192,192,1)",
                                        pointBackgroundColor: "#fff",
                                        pointBorderWidth: 1,
                                        pointHoverRadius: 5,
                                        pointHoverBackgroundColor: "rgba(0,0,255,1)",
                                        pointHoverBorderColor: "rgba(0,0,255,1)",
                                        pointHoverBorderWidth: 2,
                                        pointRadius: 5,
                                        pointHitRadius: 10,
                                           backgroundColor: [

                                               'rgba(0, 0, 0, 0)'
                                           ],
                                           borderColor: [

                                               'rgba(0,0,255, 1)'
                                           ],
                                           borderWidth: 1
                                               },
                                               {
                                           label: 'PSM',
                                           data: counts2,
                                           tension: 0,
                                           pointBorderColor: "rgba(75,192,192,1)",
                                            pointBackgroundColor: "#fff",
                                            pointBorderWidth: 1,
                                            pointHoverRadius: 5,
                                            pointHoverBackgroundColor: "rgba(0,255,0,1)",
                                            pointHoverBorderColor: "rgba(0,255,0,1)",
                                            pointHoverBorderWidth: 2,
                                            pointRadius: 5,
                                            pointHitRadius: 10,
                                           backgroundColor: [

                                               'rgba(0, 0, 0, 0)'
                                           ],
                                           borderColor: [

                                               'rgba(0, 255,0, 1)'
                                           ],
                                           borderWidth: 1
                                               },
                                               {
                                           label: 'RENTAL',
                                           data: counts3,
                                           tension: 0,
                                           pointBorderColor: "rgba(75,192,192,1)",
                                            pointBackgroundColor: "#fff",
                                            pointBorderWidth: 1,
                                            pointHoverRadius: 5,
                                            pointHoverBackgroundColor: "rgba(255,255,0,1)",
                                            pointHoverBorderColor: "rgba(255,255,0,1)",
                                            pointHoverBorderWidth: 2,
                                            pointRadius: 5,
                                            pointHitRadius: 10,
                                           backgroundColor: [

                                               'rgba(0, 0, 0, 0)'
                                           ],
                                           borderColor: [

                                               'rgba(255,255,0, 1)'
                                           ],
                                           borderWidth: 1
                                               }
                                               



                                          ]
                                   },
                                   options: {

                                       legend: {
                                           display: true,
                                           labels: {

                                               boxWidth: 10
                                           }
                                       },
                                       scales: {
                                           yAxes: [{
                                                scaleLabel:{
                                                    display: true,
                                                    labelString: 'Counts'
                                                },   
                                               ticks: {
                                                   beginAtZero:false
                                               }
                                           }],
                                        xAxes: [{
                                                scaleLabel:{
                                                    display: true,
                                                    labelString: 'Date Time'
                                                },   
                                               ticks: {
                                                   beginAtZero:false
                                               }
                                           }]
                                       }
                                   }
                               });
                              
           };
       //---------------------------------------------------------------------------    
         $scope.drawGraphOpen1= function(counts1,counts2,labels){
               $scope.dataLoaded2=true;
               document.getElementById("div2").innerHTML="<canvas id='myChart2' height='200' width='400' ></canvas>";
               var ctx = document.getElementById("myChart2");
                                   myChart2 = new Chart(ctx, {
                                   type: 'line',
                                   data: {
                                       labels: labels,
                                       datasets: [{
                                           label: 'Current Week',
                                           data: counts1,
                                           tension: 0,
                                           backgroundColor: "rgba(75,192,192,0.4)",
            
                                        pointBorderColor: "rgba(75,192,192,1)",
                                        pointBackgroundColor: "#fff",
                                        pointBorderWidth: 1,
                                        pointHoverRadius: 5,
                                        pointHoverBackgroundColor: "rgba(255,0,0,1)",
                                        pointHoverBorderColor: "rgba(255,0,0,1)",
                                        pointHoverBorderWidth: 2,
                                        pointRadius: 5,
                                        pointHitRadius: 10,
                                           backgroundColor: [

                                               'rgba(0, 0, 0, 0)'
                                           ],
                                           borderColor: [

                                               'rgba(255, 0, 0, 1)'
                                           ],
                                           borderWidth: 1
                                               },
                                               {
                                           label: 'Previous Week',
                                           data: counts2,
                                           tension: 0,
                                           pointBorderColor: "rgba(75,192,192,1)",
                                            pointBackgroundColor: "#fff",
                                            pointBorderWidth: 1,
                                            pointHoverRadius: 5,
                                            pointHoverBackgroundColor: "rgba(0,255,0,1)",
                                            pointHoverBorderColor: "rgba(0,255,0,1)",
                                            pointHoverBorderWidth: 2,
                                            pointRadius: 5,
                                            pointHitRadius: 10,
                                           backgroundColor: [

                                               'rgba(0, 0, 0, 0)'
                                           ],
                                           borderColor: [

                                               'rgba(0, 255,0, 1)'
                                           ],
                                           borderWidth: 1
                                               }
                                          
                                          ]
                                   },
                                   options: {

                                       legend: {
                                           display: true,
                                           labels: {

                                               boxWidth: 10
                                           }
                                       },
                                       scales: {
                                           yAxes: [{
                                                   scaleLabel:{
                                                    display: true,
                                                    labelString: 'Counts'
                                                },
                                               ticks: {
                                                   beginAtZero:false
                                               }
                                           }],
                                       xAxes: [{
                                                scaleLabel:{
                                                    display: true,
                                                    labelString: 'Date Time'
                                                },   
                                               ticks: {
                                                   beginAtZero:false
                                               }
                                           }]
                                       }
                                   }
                               });
                              
           };
       //--------------------------------------------------------------------------- 
           $scope.drawGraphPRSCompilation= function(counts1,labels){
               $scope.dataLoaded4=true;
               $scope.nodata4=true;
               document.getElementById("div4").innerHTML="<div id='myChart4'  ></div>";
               var data = [
                             labels,
                             counts1
                                        ];
              $(function () {

                     // Initial chart
                     var myChart4 = c3.generate({
                         bindto: '#myChart4',
                         data: {
                             rows: data,
                             type: 'pie'
                         }
                     });



                 });
               
               
           };
           $scope.drawExpected= function(counts1,counts2){
               $scope.dataLoaded5=true;
               $scope.nodata5=true;
               document.getElementById("div5").innerHTML="<div id='myChart5'  ></div>";
               var data = [
                             ["Expected","Sent"],
                             [counts1,counts2]
                                        ];
              $(function () {

                     // Initial chart
                     var myChart5 = c3.generate({
                         bindto: '#myChart5',
                         data: {
                             rows: data,
                             type: 'pie'
                         }
                     });



                 });
               
           };
  //----------------------------------------------------------
  $scope.loadData=function () {
                  $scope.GetDaily();
                  $scope.GetDailyOpenMail();
                  $scope.GetCompilation();
                  $scope.GetProcessStats();
                 };         
  //----------------------------------------------------------------------- 
          
            $scope.GetDaily=function(){     
                 if($cookies.data){
                        var  labels=["12 AM","1 AM","2 AM","3 AM","4 AM","5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM","11 AM","12 PM"
                                                     ,"1 PM","2 PM","3 PM","4 PM","5 PM","6 PM","7 PM","8 PM",
                                                 "9 PM","10 PM","11 PM","12 PM"];


                                  $scope.drawGraph(JSON.parse($cookies.sentMailsPRS_today),JSON.parse($cookies.sentMailsPSM_today),JSON.parse($cookies.sentMailsRENTAL_today),labels);
                            $scope.GetWeekly();        

                    }else
                        if(!$cookies.data){
                            var config = {
                         params: {initial:"yes"},
                         headers : {'Accept' : 'application/json'}
                        };
                      $http.get("GetDaily",config).success(function(response){

                                             $scope.data= response;
                                       if($scope.data.countsPRS){
                                         $scope.countsPRS_today=  $scope.data.countsPRS;
                                     }else{
                                         $scope.countsPRS_today=  0;
                                     }
                                         if($scope.data.countsPSM){
                                         $scope.countsPSM_today=  $scope.data.countsPSM;
                                         }else{
                                             $scope.countsPSM_today=  0;
                                         }
                                         if($scope.data.countsRENTAL){
                                         $scope.countsRENTAL_today=  $scope.data.countsRENTAL;
                                         }else{
                                             $scope.countsRENTAL_today=  0;
                                         }
                                        $cookies.sentMailsPRS_today=JSON.stringify($scope.countsPRS_today);
                                        $cookies.sentMailsPSM_today=JSON.stringify($scope.countsPSM_today);
                                        $cookies.sentMailsRENTAL_today=JSON.stringify($scope.countsRENTAL_today);

                                       var  labels=["12 AM","1 AM","2 AM","3 AM","4 AM","5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM","11 AM","12 PM"
                                                     ,"1 PM","2 PM","3 PM","4 PM","5 PM","6 PM","7 PM","8 PM",
                                                 "9 PM","10 PM","11 PM","12 PM"];


                                  $scope.drawGraph(JSON.parse($cookies.sentMailsPRS_today),JSON.parse($cookies.sentMailsPSM_today),JSON.parse($cookies.sentMailsRENTAL_today),labels);

                                   $cookies.data=true;
                                   $scope.GetWeekly();
                                     });
                                        
                        }
                }
    //--------------------------------------------------------------------------       
                $scope.GetWeekly=function(){  
                    if($cookies.data3){
                        $scope.GetMonthly();
                    }else
                 if(!$cookies.data3){
                                $http.get("GetWeekly").success(function(response){

                                    $scope.data3= response;
                              
                              if($scope.data3.countsPRS_LL){
                                  $scope.counts_sent_PRS_weekly_LL=  $scope.data3.countsPRS_LL;
                              }else{
                                  $scope.counts_sent_PRS_weekly_LL= 0;
                              }
                              if($scope.data3.countsPRS_L){
                                 $scope.counts_sent_PRS_weekly_L=  $scope.data3.countsPRS_L;
                              }else{
                                  $scope.counts_sent_PRS_weekly_L=  0;
                              }
                              if($scope.data3.countsPSM_LL){
                                  $scope.counts_sent_PSM_weekly_LL=  $scope.data3.countsPSM_LL;
                              }else{
                                  $scope.counts_sent_PSM_weekly_LL=0;
                              }
                              if($scope.data3.countsPSM_L){
                                  $scope.counts_sent_PSM_weekly_L=  $scope.data3.countsPSM_L;
                              }else{
                                  $scope.counts_sent_PSM_weekly_L=0;
                              }
                              if($scope.data3.countsRENTAL_LL){
                                  $scope.counts_sent_RENTAL_weekly_LL=  $scope.data3.countsRENTAL_LL;
                              }else{
                                  $scope.counts_sent_RENTAL_weekly_LL=0;
                              }
                              if($scope.data3.countsRENTAL_L){
                                  $scope.counts_sent_RENTAL_weekly_L=  $scope.data3.countsRENTAL_L;
                              }else{
                                  $scope.counts_sent_RENTAL_weekly_L=0;
                              }
                             
                               $cookies.counts_sent_PRS_weekly_LL=JSON.stringify($scope.counts_sent_PRS_weekly_LL);
                               $cookies.counts_sent_PRS_weekly_L=JSON.stringify($scope.counts_sent_PRS_weekly_L);
                               
                                $cookies.counts_sent_PSM_weekly_LL=JSON.stringify($scope.counts_sent_PSM_weekly_LL);
                               $cookies.counts_sent_PSM_weekly_L=JSON.stringify($scope.counts_sent_PSM_weekly_L);
                               
                               $cookies.counts_sent_RENTAL_weekly_LL=JSON.stringify($scope.counts_sent_RENTAL_weekly_LL);
                               $cookies.counts_sent_RENTAL_weekly_L=JSON.stringify($scope.counts_sent_RENTAL_weekly_L);
                               
                               
                                
                              $scope.labels33=new Array();
                              if($scope.data3.labels)
                              {
                                  angular.forEach($scope.data3.labels,function(value){
                                    angular.forEach(value,function(value1){
                                        $scope.labels33.push(value1);
                                    });
                                });
                            }else{
                                $scope.labels33=[];
                            }
                            $cookies.labels33=JSON.stringify($scope.labels33)
                        
                          $cookies.data3=true;
                           $scope.GetMonthly();
                            });
                               
                            }
                        }
               
   //-----------------------------------------------------------------------------------
                      $scope.GetMonthly=function(){ 
                          if($cookies.data33){
                             
                          }else
                            if(!$cookies.data33){
                                $http.get("GetMonthlyServlet").success(function(response){

                                    $scope.data33= response;
                                    
                                    if($scope.data33.countsPRS){
                                  $scope.counts_sent_PRS_monthly=  $scope.data33.countsPRS;
                              }else{
                                  $scope.counts_sent_PRS_monthly=0;
                              }
                              if($scope.data33.countsPSM){
                                  $scope.counts_sent_PSM_monthly=  $scope.data33.countsPSM;
                              }else{
                                  $scope.counts_sent_PSM_monthly= 0;
                              }
                              if($scope.data33.countsRENTAL){
                                  $scope.counts_sent_RENTAL_monthly=  $scope.data33.countsRENTAL;
                              }else{
                                  $scope.counts_sent_RENTAL_monthly= 0;
                              }
                              
                               
                               $cookies.counts_sent_PRS_monthly=JSON.stringify($scope.counts_sent_PRS_monthly);
                               $cookies.counts_sent_PSM_monthly=JSON.stringify($scope.counts_sent_PSM_monthly);
                               $cookies.counts_sent_RENTAL_monthly=JSON.stringify($scope.counts_sent_RENTAL_monthly);
                               
                              $scope.labels333=new Array();
                              if($scope.data33.labels){
                                angular.forEach($scope.data33.labels,function(value){
                                    
                                        $scope.labels333.push(value);
                                    
                                });
                            }else{
                                $scope.labels333=[];
                            }
                            $cookies.labels333=JSON.stringify($scope.labels333)
                        // $scope.drawGraph(JSON.parse($cookies.counts_sent_PRS_monthly),JSON.parse($cookies.counts_sent_PSM_monthly),JSON.parse($cookies.labels333));
                          $cookies.data33=true;
                          
                            });
                                
                            }
                      }
   //-----------------------------------------------------------------------------------
              $scope.GetProcessStats=function(){     
                 if($cookies.data1){
                           $scope.PRSTable=JSON.parse($cookies.PRSTable_T);
                        if($cookies.counts_PRS_INVALID_MAIL_today==0 && $cookies.counts_PRS_UNSUBSCRIBED_USER_today==0 && $cookies.counts_SHORT_OF_SUPPLY_today==0 && $cookies.counts_MCRMCriteria_today==0){
                      $scope.dataLoaded3=true;
                      $scope.nodata3=false;
                      
                            }else{
                         $scope.drawGraphPRS($cookies.counts_PRS_INVALID_MAIL_today,$cookies.counts_PRS_UNSUBSCRIBED_USER_today,$cookies.counts_SHORT_OF_SUPPLY_today,$cookies.counts_MCRMCriteria_today);
                         
                     }
                     
                    }else
                        if(!$cookies.data1)    
                        {
                 $http.get("GetDailyPRSProcessStats").success(function(response){
                                 $scope.data1= response;
                                 $cookies.counts_PRS_INVALID_MAIL_today=0;
                                 $cookies.counts_PRS_UNSUBSCRIBED_USER_today=0;
                                 $cookies.counts_SHORT_OF_SUPPLY_today=0;
                                 $cookies.counts_MCRMCriteria_today=0;
                                 
                                 $cookies.counts_PRS_INVALID_MAIL_weekly=0;
                                 $cookies.counts_PRS_UNSUBSCRIBED_USER_weekly=0;
                                 $cookies.counts_SHORT_OF_SUPPLY_weekly=0;
                                 $cookies.counts_MCRMCriteria_weekly=0;
                                 
                                 $cookies.counts_PRS_INVALID_MAIL_monthly=0;
                                 $cookies.counts_PRS_UNSUBSCRIBED_USER_monthly=0;
                                 $cookies.counts_SHORT_OF_SUPPLY_monthly=0;
                                 $cookies.counts_MCRMCriteria_monthly=0;
                                 
                                 angular.forEach($scope.data1.today,function(value){
                                     angular.forEach(value,function(value1,key1){
                                            if(key1=="INVALID_MAIL"){
                                                $cookies.counts_PRS_INVALID_MAIL_today=value1;
                                            }else if(key1=="UNSUBSCRIBED_USER"){
                                                $cookies.counts_PRS_UNSUBSCRIBED_USER_today=value1;
                                            }else if (key1=="SHORT_OF_SUPPLY"){
                                                $cookies.counts_SHORT_OF_SUPPLY_today=value1;
                                            }else
                                            {
                                             counts_MCRMCriteria_today=counts_MCRMCriteria_today+value1;   
                                             
                                            }
                                            $cookies.counts_MCRMCriteria_today=counts_MCRMCriteria_today;
                                        });
                               });
                               angular.forEach($scope.data1.weekly,function(value){
                                     angular.forEach(value,function(value1,key1){
                                            if(key1=="INVALID_MAIL"){
                                                $cookies.counts_PRS_INVALID_MAIL_weekly=value1;
                                            }else if(key1=="UNSUBSCRIBED_USER"){
                                                $cookies.counts_PRS_UNSUBSCRIBED_USER_weekly=value1;
                                            }else if (key1=="SHORT_OF_SUPPLY"){
                                                $cookies.counts_SHORT_OF_SUPPLY_weekly=value1;
                                            }else
                                            {
                                             counts_MCRMCriteria_weekly=counts_MCRMCriteria_weekly+value1;   
                                             
                                            }
                                            $cookies.counts_MCRMCriteria_weekly=counts_MCRMCriteria_weekly;
                                        });
                               });
                               angular.forEach($scope.data1.monthly,function(value){
                                     angular.forEach(value,function(value1,key1){
                                            if(key1=="INVALID_MAIL"){
                                                $cookies.counts_PRS_INVALID_MAIL_monthly=value1;
                                            }else if(key1=="UNSUBSCRIBED_USER"){
                                                $cookies.counts_PRS_UNSUBSCRIBED_USER_monthly=value1;
                                            }else if (key1=="SHORT_OF_SUPPLY"){
                                                $cookies.counts_SHORT_OF_SUPPLY_monthly=value1;
                                            }else
                                            {
                                             counts_MCRMCriteria_monthly=counts_MCRMCriteria_monthly+value1;   
                                             
                                            }
                                            $cookies.counts_MCRMCriteria_monthly=counts_MCRMCriteria_monthly;
                                        });
                               });
                                 
                              if($scope.data1.today){
                                  $cookies.PRSTable_T=JSON.stringify($scope.data1.today);
                              }else{
                                  $cookies.PRSTable_T=null;
                              } 
                              if($scope.data1.weekly){
                                  $cookies.PRSTable_W=JSON.stringify($scope.data1.weekly);
                              }else{
                                  $cookies.PRSTable_W=null;
                              }
                              if($scope.data1.monthly){
                                  $cookies.PRSTable_M=JSON.stringify($scope.data1.monthly);
                              }else{
                                  $cookies.PRSTable_M=null;
                              } 
                            
                            $scope.PRSTable=JSON.parse($cookies.PRSTable_T);
                            $scope.dataLoaded3=true;
                            $cookies.data1=true;
                            if($cookies.counts_PRS_INVALID_MAIL_today==0 && $cookies.counts_PRS_UNSUBSCRIBED_USER_today==0 && $cookies.counts_SHORT_OF_SUPPLY_today==0 && $cookies.counts_MCRMCriteria_today==0){
                      $scope.dataLoaded3=true;
                      $scope.nodata3=false;
                            }else{
                         $scope.drawGraphPRS($cookies.counts_PRS_INVALID_MAIL_today,$cookies.counts_PRS_UNSUBSCRIBED_USER_today,$cookies.counts_SHORT_OF_SUPPLY_today,$cookies.counts_MCRMCriteria_today);
                     }
                     
                             });
                             
                      }
              }
//---------------------------------------------------------------------------               
            $scope.GetDailyOpenMail=function(){      
                 if($cookies.data2){
                      
              var  labels=["12 AM","1 AM","2 AM","3 AM","4 AM","5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM","11 AM","12 PM"
                                            ,"1 PM","2 PM","3 PM","4 PM","5 PM","6 PM","7 PM","8 PM",
                                        "9 PM","10 PM","11 PM","12 PM"];      
               $scope.drawGraphOpen(JSON.parse($cookies.counts_mailopen_PRS_today),JSON.parse($cookies.counts_mailopen_PSM_today),JSON.parse($cookies.counts_mailopen_RENTAL_today),labels);
                $scope.GetWeeklyOpenMail();
           }else
                        if(!$cookies.data2)    
                        {
                 $http.get("GetDailyOpenMail").success(function(response){

                                    $scope.data2= response;
                              if($scope.data2.countsPSM){
                                  $scope.counts_mailopen_PSM_today=  $scope.data2.countsPSM;
                              }else{
                                  $scope.counts_mailopen_PSM_today=  0;
                              }
                             
                              if($scope.data2.countsRENTAL){
                                  $scope.counts_mailopen_RENTAL_today=  $scope.data2.countsRENTAL;
                              }else{
                                  $scope.counts_mailopen_RENTAL_today=  0;
                              }
                              if($scope.data2.countsPRS){
                                  $scope.counts_mailopen_PRS_today=  $scope.data2.countsPRS;
                              }else{
                                  $scope.counts_mailopen_PRS_today=  $scope.data2.countsPRS;
                              }
                              
                               
                               
                               $cookies.counts_mailopen_PSM_today=JSON.stringify($scope.counts_mailopen_PSM_today);
                               
                               $cookies.counts_mailopen_RENTAL_today=JSON.stringify($scope.counts_mailopen_RENTAL_today);
                               $cookies.counts_mailopen_PRS_today=JSON.stringify($scope.counts_mailopen_PRS_today);
                               
                              var  labels=["12 AM","1 AM","2 AM","3 AM","4 AM","5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM","11 AM","12 PM"
                                            ,"1 PM","2 PM","3 PM","4 PM","5 PM","6 PM","7 PM","8 PM",
                                        "9 PM","10 PM","11 PM","12 PM"];
                              $scope.dataLoaded2=true;
                              $cookies.data2=true;
                         $scope.drawGraphOpen(JSON.parse($cookies.counts_mailopen_PRS_today),JSON.parse($cookies.counts_mailopen_PSM_today),JSON.parse($cookies.counts_mailopen_RENTAL_today),labels);
                          
                          $scope.GetWeeklyOpenMail();
                            });
                            
                        }
                    }
   //---------------------------------------------------------------------                     
          $scope.GetWeeklyOpenMail=function(){
              
                    if($cookies.data22){
                        $scope.GetMonthlyOpenMail()();
                    }else
                        if(!$cookies.data22)    
                        {
                 $http.get("GetWeeklyOpenMail").success(function(response){

                                    $scope.data22= response;
                              if($scope.data22.countsPSM_LL){
                                $scope.counts_mailopen_PSM_weekly_LL=  $scope.data22.countsPSM_LL;
                            }else{
                                $scope.counts_mailopen_PSM_weekly_LL= 0;
                            }
                            if($scope.data22.countsPSM_L){
                                $scope.counts_mailopen_PSM_weekly_L=  $scope.data22.countsPSM_L;
                            }else{
                                $scope.counts_mailopen_PSM_weekly_L=  0;
                            }
                                
                                if($scope.data22.countsRENTAL_LL){
                                $scope.counts_mailopen_RENTAL_weekly_LL=  $scope.data22.countsRENTAL_LL;
                            }else{
                                $scope.counts_mailopen_RENTAL_weekly_LL=  0;
                            }
                            if($scope.data22.countsRENTAL_L){
                                 $scope.counts_mailopen_RENTAL_weekly_L=  $scope.data22.countsRENTAL_L;
                             }else{
                                 $scope.counts_mailopen_RENTAL_weekly_L=  0;
                             }
                                if($scope.data22.countsPRS_LL){
                                    $scope.counts_mailopen_PRS_weekly_LL=  $scope.data22.countsPRS_LL;
                                }else{
                                    $scope.counts_mailopen_PRS_weekly_LL=  0;
                                }
                                if($scope.data22.countsPRS_L){
                                  $scope.counts_mailopen_PRS_weekly_L=  $scope.data22.countsPRS_L;
                              }else{
                                  $scope.counts_mailopen_PRS_weekly_L=  0;
                              }
                                   
                               
                               $cookies.counts_mailopen_PSM_weekly_LL=JSON.stringify($scope.counts_mailopen_PSM_weekly_LL);
                               $cookies.counts_mailopen_PSM_weekly_L=JSON.stringify($scope.counts_mailopen_PSM_weekly_L);
                               
                               
                                $cookies.counts_mailopen_RENTAL_weekly_LL=JSON.stringify($scope.counts_mailopen_RENTAL_weekly_LL);
                               $cookies.counts_mailopen_RENTAL_weekly_L=JSON.stringify($scope.counts_mailopen_RENTAL_weekly_L);
                                
                                $cookies.counts_mailopen_PRS_weekly_LL=JSON.stringify($scope.counts_mailopen_PRS_weekly_LL);
                               $cookies.counts_mailopen_PRS_weekly_L=JSON.stringify($scope.counts_mailopen_PRS_weekly_L);
                              
                                
                              $scope.labels22=new Array();
                              if($scope.data22.labels){
                                angular.forEach($scope.data22.labels,function(value){
                                    angular.forEach(value,function(value1){
                                        $scope.labels22.push(value1);
                                    });
                                });
                            }else{
                                $scope.labels22=[];
                            }
                            $cookies.labels22=JSON.stringify($scope.labels22)
                        // $scope.drawGraphOpen1(JSON.parse($cookies.counts_mailopen_PRS_weekly_L),JSON.parse($cookies.counts_mailopen_PRS_weekly_LL),JSON.parse($cookies.labels22));
                          $cookies.data22=true;
                          $scope.GetMonthlyOpenMail();
                            });
                            
                        }
                    }
   //---------------------------------------------------------------------                     
          $scope.GetMonthlyOpenMail=function(){
                        if(!$cookies.data222)    
                        {
                 $http.get("GetMonthlyOpenMailServlet").success(function(response){

                                    $scope.data222= response;
                              if($scope.data222.countsPSM){
                                $scope.counts_mailopen_PSM_monthly=  $scope.data222.countsPSM;
                            }else{
                                $scope.counts_mailopen_PSM_monthly=  0;
                            }
                            
                           if($scope.data222.countsRENTAL){
                               $scope.counts_mailopen_RENTAL_monthly=  $scope.data222.countsRENTAL;
                           }else{
                               $scope.counts_mailopen_RENTAL_monthly=  0;
                           }
                           if($scope.data222.countsPRS){
                                $scope.counts_mailopen_PRS_monthly=  $scope.data222.countsPRS;
                            }else{
                                 $scope.counts_mailopen_PRS_monthly=  0;
                            }
                            
                               
                               $cookies.counts_mailopen_PSM_monthly=JSON.stringify($scope.counts_mailopen_PSM_monthly);
                               $cookies.counts_mailopen_RENTAL_monthly=JSON.stringify($scope.counts_mailopen_RENTAL_monthly);
                               $cookies.counts_mailopen_PRS_monthly=JSON.stringify($scope.counts_mailopen_PRS_monthly);
                                
                                
                              $scope.labels222=new Array();
                              if($scope.data222.labels){
                                angular.forEach($scope.data222.labels,function(value){
                                    
                                        $scope.labels222.push(value);
                                    
                                });
                            }else{
                                $scope.labels222=[];
                            }
                            $cookies.labels222=JSON.stringify($scope.labels222)
                        
                          $cookies.data222=true;

                            });
                        }
                    }
   //---------------------------------------------------------------------                     
     $scope.GetCompilation=function(){
             if($cookies.data4){
                 $scope.ExpectedTable=new Array();
                             $scope.ExpectedTable=[ {
                                 expected: $cookies.counts_PRS_daily_total_compilation
                                 
                             },{
                                 sent: $cookies.counts_PRS_daily_total_sent
                             }];
                         
                    if($cookies.compilation_vm_value_today==0){
                                $scope.nodata4=false;
                             $scope.dataLoaded4=true;
                            }else{
                         $scope.drawGraphPRSCompilation(JSON.parse($cookies.compilation_vm_value_today),JSON.parse($cookies.compilation_vm_today));
                     }
                     $scope.CompilationTable=JSON.parse($cookies.compilation_table_today);
                          
                          
                     
                              if($cookies.counts_PRS_daily_total_compilation==0 && $cookies.counts_PRS_daily_total_sent==0){
                                  $scope.nodata5=false;
                                  $scope.dataLoaded5=true;
                              } else{
                              $scope.drawExpected($cookies.counts_PRS_daily_total_compilation,$cookies.counts_PRS_daily_total_sent);
                          }
                          
             }else
             if(!$cookies.data4){
                     $http.get("GetPRSCompilation").success(function(response){
                         $scope.data4=response;
                         $cookies.counts_PRS_daily_total_compilation=0;
                         $cookies.counts_PRS_daily_total_sent=0;
                         $cookies.counts_PRS_weekly_total_sent=0;
                         $cookies.counts_PRS_weekly_total_compilation=0;
                         $cookies.counts_PRS_monthly_total_sent=0;
                         $cookies.counts_PRS_monthly_total_compilation=0;
                         
                         $scope.compilation_vm_today = new Array();
                          $scope.compilation_vm_value_today = new Array();
                          
                         $scope.compilation_vm_weekly = new Array();
                          $scope.compilation_vm_value_weekly = new Array();
                         
                         $scope.compilation_vm_weekly = new Array();
                          $scope.compilation_vm_value_weekly = new Array();
                        
                         if($scope.data4.daily_total_compilation){
                             $cookies.counts_PRS_daily_total_compilation=$scope.data4.daily_total_compilation;
                         }
                         if($scope.data4.daily_total_sent){
                             $cookies.counts_PRS_daily_total_sent=$scope.data4.daily_total_sent;
                         }
                         if($scope.data4.weekly_total_sent){
                             $cookies.counts_PRS_weekly_total_sent=$scope.data4.weekly_total_sent;
                         }
                         if($scope.data4.weekly_total_compilation){
                             $cookies.counts_PRS_weekly_total_compilation=$scope.data4.weekly_total_compilation;
                         }
                         if($scope.data4.monthly_total_sent){
                             $cookies.counts_PRS_monthly_total_sent=$scope.data4.monthly_total_sent;
                         }
                         if($scope.data4.monthly_total_compilation){
                             $cookies.counts_PRS_monthly_total_compilation=$scope.data4.monthly_total_compilation;
                         }
                         $scope.compilation_vm_today = new Array();
                          $scope.compilation_vm_value_today = new Array();
                          $scope.compilation_table_today=new Array();
                         if($scope.data4.today){
                          angular.forEach($scope.data4.today,function(value){
                                     angular.forEach(value,function(value1,key1){
                                            $scope.compilation_vm_today.push(key1);
                                            $scope.compilation_vm_value_today.push(value1);
                                            $scope.compilation_table_today.push({
                                                name: key1,
                                                value: value1
                                            });
                                        });
                               });
                               $cookies.compilation_vm_today=JSON.stringify($scope.compilation_vm_today);
                           $cookies.compilation_vm_value_today=JSON.stringify($scope.compilation_vm_value_today);
                           $cookies.compilation_table_today=JSON.stringify($scope.compilation_table_today);
                           }
                           $scope.compilation_vm_weekly = new Array();
                          $scope.compilation_vm_value_weekly= new Array();
                          $scope.compilation_table_weekly=new Array();
                               if($scope.data4.weekly){
                          angular.forEach($scope.data4.weekly,function(value){
                                     angular.forEach(value,function(value1,key1){
                                            $scope.compilation_vm_weekly.push(key1);
                                            $scope.compilation_vm_value_weekly.push(value1);
                                            $scope.compilation_table_weekly.push({
                                                name: key1,
                                                value: value1
                                            });
                                        });
                               });
                               $cookies.compilation_vm_weekly=JSON.stringify($scope.compilation_vm_weekly);
                           $cookies.compilation_vm_value_weekly=JSON.stringify($scope.compilation_vm_value_weekly);
                           $cookies.compilation_table_weekly=JSON.stringify($scope.compilation_table_weekly);
                           }
                           $scope.compilation_vm_monthly = new Array();
                          $scope.compilation_vm_value_monthly = new Array();
                          $scope.compilation_table_monthly=new Array();
                           if($scope.data4.monthly){
                          angular.forEach($scope.data4.monthly,function(value){
                                     angular.forEach(value,function(value1,key1){
                                            $scope.compilation_vm_monthly.push(key1);
                                            $scope.compilation_vm_value_monthly.push(value1);
                                            $scope.compilation_table_monthly.push({
                                                name: key1,
                                                value: value1
                                            });
                                        });
                               });
                               $cookies.compilation_vm_monthly=JSON.stringify($scope.compilation_vm_monthly);
                           $cookies.compilation_vm_value_monthly=JSON.stringify($scope.compilation_vm_value_monthly);
                           $cookies.compilation_table_monthly=JSON.stringify($scope.compilation_table_monthly);
                           }
                             $scope.ExpectedTable=new Array();
                             $scope.ExpectedTable=[ {
                                 expected: $cookies.counts_PRS_daily_total_compilation
                                 
                             },{
                                 sent: $cookies.counts_PRS_daily_total_sent
                             }];
                             
                            $scope.CompilationTable=JSON.parse($cookies.compilation_table_today);
                            
                            
                            $cookies.data4=true;
                            if($cookies.compilation_vm_value_today==0){
                                $scope.nodata4=false;
                             $scope.dataLoaded4=true;
                            }else{
                         $scope.drawGraphPRSCompilation(JSON.parse($cookies.compilation_vm_value_today),JSON.parse($cookies.compilation_vm_today));
                     }
                         if($cookies.counts_PRS_daily_total_compilation==0 && $cookies.counts_PRS_daily_total_sent==0){
                             $scope.nodata5=false;
                             $scope.dataLoaded5=true;
                         } else{
                         $scope.drawExpected($cookies.counts_PRS_daily_total_compilation,$cookies.counts_PRS_daily_total_sent);
                     }
                      
                     });
                    
                 }
         }
 //---------------------------------------------------------------------                          
            $scope.mailSent= function(){
                   if($scope.mailSentGraph=="Today")             
                   
                   {
                    
                    $scope.mailSentGraph2=true;
                    var  labels=["0", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM","11 AM","12 PM"
                                            ,"1 PM","2 PM","3 PM","4 PM","5 PM","6 PM","7 PM","8 PM",
                                        "9 PM","10 PM","11 PM","12 PM"];
                                     
                         $scope.drawGraph(JSON.parse($cookies.sentMailsPRS_today),JSON.parse($cookies.sentMailsPSM_today),JSON.parse($cookies.sentMailsRENTAL_today),labels);
                     
                    }
                        else
                            if($scope.mailSentGraph=="Weekly"){
                                
                                $scope.mailSentGraph2=false;
                                $scope.drawGraph1(JSON.parse($cookies.counts_sent_PRS_weekly_L),JSON.parse($cookies.counts_sent_PRS_weekly_LL),JSON.parse($cookies.labels33));
                            }
                        else if($scope.mailSentGraph=="Monthly"){
                            
                                $scope.mailSentGraph2=true;
                                $scope.drawGraph(JSON.parse($cookies.counts_sent_PRS_monthly),JSON.parse($cookies.counts_sent_PSM_monthly),JSON.parse($cookies.counts_sent_RENTAL_monthly),JSON.parse($cookies.labels333));
                            }
                        }
                  $scope.mailSent1=function(){
                      if($scope.mailSentGraph1=="PRS"){
                         $scope.drawGraph1(JSON.parse($cookies.counts_sent_PRS_weekly_L),JSON.parse($cookies.counts_sent_PRS_weekly_LL),JSON.parse($cookies.labels33));  
                      }else if($scope.mailSentGraph1=="PSM"){
                        $scope.drawGraph1(JSON.parse($cookies.counts_sent_PSM_weekly_L),JSON.parse($cookies.counts_sent_PSM_weekly_LL),JSON.parse($cookies.labels33));   
                      }else if($scope.mailSentGraph1=="RENTAL"){
                        $scope.drawGraph1(JSON.parse($cookies.counts_sent_RENTAL_weekly_L),JSON.parse($cookies.counts_sent_RENTAL_weekly_LL),JSON.parse($cookies.labels33));   
                      } 
                  }      
            $scope.openMailSent=function(){
                if($scope.openMailGraph=="Today"){
                    $scope.openMailGraph2=true;
                 var  labels=["12 AM","1 AM","2 AM","3 AM","4 AM","5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM","11 AM","12 PM"
                                            ,"1 PM","2 PM","3 PM","4 PM","5 PM","6 PM","7 PM","8 PM",
                                        "9 PM","10 PM","11 PM","12 PM"];
                $scope.drawGraphOpen(JSON.parse($cookies.counts_mailopen_PRS_today),JSON.parse($cookies.counts_mailopen_PSM_today),JSON.parse($cookies.counts_mailopen_RENTAL_today),labels);
            }else if($scope.openMailGraph=="Weekly"){
                $scope.openMailGraph2=false;
                $scope.openMailGraph1="PRS";
              $scope.drawGraphOpen1(JSON.parse($cookies.counts_mailopen_PRS_weekly_L),JSON.parse($cookies.counts_mailopen_PRS_weekly_LL),JSON.parse($cookies.labels22));
            }else if($scope.openMailGraph=="Monthly"){
                $scope.openMailGraph2=true;
                $scope.drawGraphOpen(JSON.parse($cookies.counts_mailopen_PRS_monthly),JSON.parse($cookies.counts_mailopen_PSM_monthly),JSON.parse($cookies.counts_mailopen_RENTAL_monthly),JSON.parse($cookies.labels222));
            }
            }
            $scope.openMailSent1=function(){
                if($scope.openMailGraph1=="PRS"){
                  $scope.drawGraphOpen1(JSON.parse($cookies.counts_mailopen_PRS_weekly_L),JSON.parse($cookies.counts_mailopen_PRS_weekly_LL),JSON.parse($cookies.labels22));  
                }else if($scope.openMailGraph1=="PSM"){
                  $scope.drawGraphOpen1(JSON.parse($cookies.counts_mailopen_PSM_weekly_L),JSON.parse($cookies.counts_mailopen_PSM_weekly_LL),JSON.parse($cookies.labels22));  
                }else if($scope.openMailGraph1=="RENTAL"){
                  $scope.drawGraphOpen1(JSON.parse($cookies.counts_mailopen_RENTAL_weekly_L),JSON.parse($cookies.counts_mailopen_RENTAL_weekly_LL),JSON.parse($cookies.labels22));  
                }
            }
            $scope.PRSMail=function(){
                if($scope.PRSMailGraph=="Today"){
                    if($cookies.data1){
                            $scope.PRSTable=JSON.parse($cookies.PRSTable_T);
                            if($cookies.counts_PRS_INVALID_MAIL_today==0 && $cookies.counts_PRS_UNSUBSCRIBED_USER_today==0 && $cookies.counts_SHORT_OF_SUPPLY_today==0 && $cookies.counts_MCRMCriteria_today==0){
                              $scope.dataLoaded3=true;
                              $scope.nodata3=false;
                              document.getElementById("div3").innerHTML="<div id='myChart3'  ></div>";
                                    }else{
                                 $scope.drawGraphPRS($cookies.counts_PRS_INVALID_MAIL_today,$cookies.counts_PRS_UNSUBSCRIBED_USER_today,$cookies.counts_SHORT_OF_SUPPLY_today,$cookies.counts_MCRMCriteria_today);
                             }
                         }
                }else if($scope.PRSMailGraph=="Weekly"){
                    if($cookies.data1){
                        $scope.PRSTable=JSON.parse($cookies.PRSTable_W);
                       if($cookies.counts_PRS_INVALID_MAIL_weekly==0 && $cookies.counts_PRS_UNSUBSCRIBED_USER_weekly==0 && $cookies.counts_SHORT_OF_SUPPLY_weekly==0 && $cookies.counts_MCRMCriteria_weekly==0){
                          $scope.dataLoaded3=true;
                          $scope.nodata3=false;
                          document.getElementById("div3").innerHTML="<div id='myChart3'  ></div>";
                                }else{
                             $scope.drawGraphPRS($cookies.counts_PRS_INVALID_MAIL_weekly,$cookies.counts_PRS_UNSUBSCRIBED_USER_weekly,$cookies.counts_SHORT_OF_SUPPLY_weekly,$cookies.counts_MCRMCriteria_weekly);
                         }
                     }
                   
                }else if($scope.PRSMailGraph=="Monthly"){
                    if($cookies.data1){
                        $scope.PRSTable=JSON.parse($cookies.PRSTable_M);
                       if($cookies.counts_PRS_INVALID_MAIL_monthly==0 && $cookies.counts_PRS_UNSUBSCRIBED_USER_monthly==0 && $cookies.counts_SHORT_OF_SUPPLY_monthly==0 && $cookies.counts_MCRMCriteria_monthly==0){
                          $scope.dataLoaded3=true;
                          $scope.nodata3=false;
                          document.getElementById("div3").innerHTML="<div id='myChart3'  ></div>";
                                }else{
                             $scope.drawGraphPRS($cookies.counts_PRS_INVALID_MAIL_monthly,$cookies.counts_PRS_UNSUBSCRIBED_USER_monthly,$cookies.counts_SHORT_OF_SUPPLY_monthly,$cookies.counts_MCRMCriteria_monthly);
                         }
                    }
                }
            }
            $scope.PRSCompilationGraph=function(){
                if($scope.PRSCompilation=="Today"){
                    if($cookies.data4){
                            $scope.CompilationTable=JSON.parse($cookies.compilation_table_today);
                            if($cookies.compilation_vm_value_today==0){
                                        $scope.nodata4=false;
                                     $scope.dataLoaded4=true;
                                     document.getElementById("div4").innerHTML="<div id='myChart4'  ></div>";
                                    }else{
                                 $scope.drawGraphPRSCompilation(JSON.parse($cookies.compilation_vm_value_today),JSON.parse($cookies.compilation_vm_today));
                             }
                         }
                }else if($scope.PRSCompilation=="Weekly"){
                    if($cookies.data4){
                            $scope.CompilationTable=JSON.parse($cookies.compilation_table_weekly);
                            if($cookies.compilation_vm_value_weekly==={}){
                                        $scope.nodata4=false;
                                     $scope.dataLoaded4=true;
                                     document.getElementById("div4").innerHTML="<div id='myChart4'  ></div>";
                                    }else{
                                 $scope.drawGraphPRSCompilation(JSON.parse($cookies.compilation_vm_value_weekly),JSON.parse($cookies.compilation_vm_weekly));
                             }
                         }
                }else if($scope.PRSCompilation=="Monthly"){
                    if($cookies.data4){
                            $scope.CompilationTable=JSON.parse($cookies.compilation_table_monthly);
                            if($cookies.compilation_vm_value_weekly==0){
                                        $scope.nodata4=false;
                                     $scope.dataLoaded4=true;
                                     document.getElementById("div4").innerHTML="<div id='myChart4'  ></div>";
                                    }else{
                                 $scope.drawGraphPRSCompilation(JSON.parse($cookies.compilation_vm_value_weekly),JSON.parse($cookies.compilation_vm_weekly));
                             }
                         }
                }
            }
             $scope.ExpectedMailSent=function(){
                if($scope.ExpectedGraph=="Today"){
                    if($cookies.data4){
                            $scope.ExpectedTable=new Array();
                                     $scope.ExpectedTable=[ {
                                         expected: $cookies.counts_PRS_daily_total_compilation

                                     },{
                                         sent: $cookies.counts_PRS_daily_total_sent
                                     }];

                                 if($cookies.counts_PRS_daily_total_compilation==0 && $cookies.counts_PRS_daily_total_sent==0){
                                     $scope.nodata5=false;
                                     $scope.dataLoaded5=true;
                                     document.getElementById("div5").innerHTML="<div id='myChart5'  ></div>";
                                 } else{
                                 $scope.drawExpected($cookies.counts_PRS_daily_total_compilation,$cookies.counts_PRS_daily_total_sent);
                             }
                         }
                }else if($scope.ExpectedGraph=="Weekly"){
                        if($cookies.data4){   
                        $scope.ExpectedTable=new Array();
                                     $scope.ExpectedTable=[ {
                                         expected: $cookies.counts_PRS_weekly_total_compilation

                                     },{
                                         sent: $cookies.counts_PRS_weekly_total_sent
                                     }];
                            if($cookies.counts_PRS_weekly_total_compilation==0 && $cookies.counts_PRS_weekly_total_sent==0){
                                     $scope.nodata5=false;
                                     $scope.dataLoaded5=true;
                                     document.getElementById("div5").innerHTML="<div id='myChart5'  ></div>";

                                 } else{
                                 $scope.drawExpected($cookies.counts_PRS_weekly_total_compilation,$cookies.counts_PRS_weekly_total_sent);
                             }
                         }
                }else if($scope.ExpectedGraph=="Monthly"){
                    if($cookies.data4){
                        $scope.ExpectedTable=new Array();
                                 $scope.ExpectedTable=[ {
                                     expected: $cookies.counts_PRS_monthly_total_compilation

                                 },{
                                     sent: $cookies.counts_PRS_monthly_total_sent
                                 }];
                        if($cookies.counts_PRS_monthly_total_compilation==0 && $cookies.counts_PRS_monthly_total_sent==0){
                                 $scope.nodata5=false;
                                 $scope.dataLoaded5=true;
                                 document.getElementById("div5").innerHTML="<div id='myChart5'  ></div>";
                             } else{
                             $scope.drawExpected($cookies.counts_PRS_monthly_total_compilation,$cookies.counts_PRS_monthly_total_sent);
                         }
                     }
                }
            }
           
           
           
         });