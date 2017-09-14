/**
 * Created by Administrator on 2017-06-25.
  */

/*
< 아브라함의 이동 >
우르 -> 하란 -> 세겜 -> 벧엘 -> 브엘세바 -> 애굽 -> 네게브 -> 벧엘 -> 헤브론

< 이스라엘의 출애굽 >
라암셋 -> 숙곳 -> 에담 -> 믹돌 -> 비하히롯 -> 바알스본 -> 마라 -> 엘림 -> 신광야
-> 르비딤 -> 시내산 -> 다베라 -> 기브롯 -> 하세롯 -> 바란광야 -> 아브로나 -> 에시온게벨 -> 가데스
-> 호르산 -> 살모나 -> 부논 -> 오봇 -> 이예아바림 -> 느보산 -> 여리고

< 이스라엘 바벨론 포로경로 >

<예수님의 출생여정>
베들레헴 -> 예루살렘 -> 애굽 ->  나사렛

<바울의 회심과 첫사역 여정>
예루살렘 -> 다메섹 -> 아라비아 -> 다메섹 -> 디베랴 -> 예루살렘 -> 가이사랴 -> 다소 -> 안디옥 -> 시돈 -> 두로 -> 예루살렘

<사도바울 1차 전도 >
 안디옥 -> 살라미 -> 바보 -> 버가 -> 비시디아 안디옥 -> 이고니온 -> 루스드라->
 더베 -> 루스드라 -> 이고니온 -> 비시디아 안디옥 -> 앗달리아 -> 안디옥

<사도바울 2차 전도 >
 예루살렘 -> 다메섹 -> 안디옥 -> 다소 -> 더베 -> 루스드라 -> 이고니온 ->
 비시디아 안디옥 -> 북쪽 ->드로아 -> 사모드라게 -> 네압볼리 -> 빌립보 -> 암비볼리
 -> 데살로니가 -> 베뢰아 -> 배타고 -> 아덴 -> 고린도 -> 겐그레아 -> 에베소 ->
 가이사랴 -> 예루살렘

 <사도바울 3차 전도 >
 안디옥 -> 다소 -> 더베 -> 루스드라 -> 이고니온 -> 비시디아 안디옥 ->라오디게아
 -> 에베소 -> 서머나 -> 버가모 -> 드로아 -> 네압볼리 -> 빌립보 -> 암비볼리->
 아볼로니아 -> 데살로니가 -> 베뢰아 -> [배타고] -> 겐그레아 -> 고린도 ->
 베뢰아 -> 데살로니가 -> 아볼로니아 -> 암비몰리 -> 빌립보 -> 네압볼리 ->
 드로아 -> 앗소 -> 미둘레네 -> 기오 -> 밀레도 -> 코스 -> 로도 -> 바다라 ->
 두로 -> 돌레마이 -> 가이사랴 -> 예루살렘

*/



var TrajectoryData = function(){

    var pathArray = [];

    function calculateExtent( geometry ){

        var maxX = -90000000;
        var maxY = -90000000;
        var minX = 90000000;
        var minY = 90000000;
        for( idx in geometry ){
            var pos = geometry[idx];
            if( pos[0] > maxX )
                maxX = pos[0];
            if( pos[1] > maxY )
                maxY = pos[1];
            if( pos[0] < minX )
                minX = pos[0];
            if( pos[1] < minY )
                minY = pos[1];
        }

        return [ minX, minY, maxX, maxY ];
    }

    calculateExtentPath = function(){
        for (var arrIdx in pathArray) {
            var extent = calculateExtent( pathArray[arrIdx].data);
            pathArray[arrIdx].extent = extent;
        }
    };

    this.getTrajectoryByValue = function( value ){
      //  return this.trajectoryArray[ value ];
        return pathArray[value];
    };


    this.getCount = function(){
        // return this.trajectoryArray.length;
        return pathArray.length;
    };

    this.getExtent = function( order ){

        return pathArray[order].extent;
    };

    setPathArray = function( resObj ){
        for( var idx in resObj ) {
            pathArray.push(resObj[idx]);
        }
    };


    this.requestMovePath = function( callback){
        var searchParam = {
                type: "MovePath",
                option: {}
        };

        var jsonStr = JSON.stringify( searchParam );
        ConsoleLog( "send param : " + jsonStr );

        httpRequest("POST", jsonStr, function( http ) {
                var resObj = JSON.parse(http.responseText);

                if( resObj.result != "undefined" && resObj.result == "fail" ){
                        ConsoleLog( "request MovePath!!! " + resObj.error );
                }
                else {
                        if (resObj.length != "undefined") {    // 배열로 받아올 경우
                            setPathArray( resObj );
                            calculateExtentPath();
                        }else{
                                ConsoleLog( "Path Move Receive Error!!");
                        }
                }

            callback();

        }) ;

    };


};

