/**
 * Created by Administrator on 2018-03-16.
 */

var DoubleTap = (function(){        // prevent for double tap
    var lastTap = 0;
    var timeout;

    this.preventEvent = function(evt){
        var currentTime = new Date().getTime();
        var tapLength = currentTime - lastTap;

        evt.preventDefault();
        clearTimeout(timeout);
        ConsoleLog("preventEventDefault()");

        if(tapLength < 1000 && tapLength > 0){
            evt.preventDefault();
            lapTap = 0;
        }else{
            timeout = setTimeout(function(){
                clearTimeout(timeout);
            }, 1000);
        }
        lastTap = currentTime;
    };

    this.prevent= function() {
        $('#incChapter').on('touched click', this.preventEvent);
        $('#decChapter').on('touched click', this.preventEvent);
        $('#sideMenu').on('touched click', this.preventEvent);

        $('#tabDecBible').on('touched click', this.preventEvent);
        $('#tabIncBible').on('touched click', this.preventEvent);

        $('#infoPopup').on('touched click', this.preventEvent);
        // $('#biblePlaceDiv').on('touched click', preventEvent );
    };

    return function(){
        return this;
    };

}());


var createFooterMenu = (function() {

     function CreateFooter(){

         /*
         alert( "pixel Ratio : " + window.devicePixelRatio ) ;

         alert( "screenWidth : " + window.screen.width ) ;

         alert( "innerWidth : " + window.innerWidth ) ;
         alert( "OuterWidth : " + window.outerWidth ) ;
         */

         this.footer = document.getElementById('footer');
         this.mapView = document.getElementById('map');

         this.logo = document.getElementById('bibleMapLogo');

         this.tabMenuBar = document.getElementById("tabsMenu");
         this.tab_contain = document.getElementById("tab_contain");

         this.tab1 = document.getElementById("tab1");
         this.tab2 = document.getElementById("tab2");
         this.tab3 = document.getElementById("tab3");

         this.upArrow = document.getElementById("footUpArrow");
         this.downArrow = document.getElementById("footDownArrow");

         this.missionWideIntro = document.getElementById("missionWideIntro");

         this.compassBtn = document.getElementById("compassBtn");
         this.zoomInBtn = document.getElementById("zoomInBtn2D");
         this.zoomOutBtn = document.getElementById("zoomOutBtn2D");
         this.homeBtn = document.getElementById("homeBtn");


         this.compassBtn.style.top = 5 + 'px';
         this.compassBtn.style.left = (window.innerWidth - 43 ) + 'px';

         this.zoomInBtn.style.left = (window.innerWidth - 40 ) + 'px';
         this.zoomOutBtn.style.left = (window.innerWidth - 40 ) + 'px';
         this.homeBtn.style.left = (window.innerWidth - 40 ) + 'px';

         function setZOrderMapViewBtn( val ) {
             $('#compassBtn').css("z-index", val);
             $('#zoomInBtn2D').css("z-index", val);
             $('#zoomOutBtn2D').css("z-index", val);
             $('#homeBtn').css("z-index", val);
         }

         setZOrderMapViewBtn(2010);

         this.setLogoPosition = function(){
             this.logo.style.left =  (window.innerWidth - 43) + 'px';
             this.logo.style.right = 0 + 'px';
         };

         this.setTabPosition = function(){
             this.tabMenuBar.style.top = 5 + 'px';
             this.tabMenuBar.style.left = 0 + 'px';

             this.tab_contain.style.top = 38 + 'px';
             this.tab_contain.style.left = 0 + 'px';
             this.tab_contain.style.right = 0 + 'px';
             this.tab_contain.style.bottom = 5 + 'px';

             this.tab1.style.top = 30 + 'px';
             this.tab1.style.left = 0 + 'px';
             this.tab1.style.right = 0 + 'px';
             this.tab1.style.bottom = 5 + 'px';

             this.tab2.style.top = 0 + 'px';
             this.tab2.style.left = 0 + 'px';
             this.tab2.style.right = 0 + 'px';
             this.tab2.style.bottom = 5 + 'px';

             this.tab3.style.top = 30 + 'px';
             this.tab3.style.left = 0 + 'px';
             this.tab3.style.right = 0 + 'px';
             this.tab3.style.bottom = 0 + 'px';
         };

         this.mode = "hide";    // "hide", "bottom", "middle", "top";

         this.setMode = function( paramMode ){
            this.mode = paramMode;
         };

         this.getMode = function(){
             return this.mode;
         };

         this.showControl = function(){
             this.setLogoPosition();

             switch( this.mode ){
                 case "hide": this.hide();
                            break;
                 case "bottom" : this.bottom();
                            break;
                 case "middle" : this.middle();
                            break;
                 case "top" : this.top();
                     break;
                 default : this.middle();
                            break;
             }
         };

         topModeShowContol = function(){

             $("#footer").css( "z-index", 10 );
             // $("#tab_contain").css( "z-index", 9 );

             // $("#footer").show();

             $("#tabsMenu").show();
             $("#tab_contain").show();
             $("#footUpArrow").hide();
             $("#footDownArrow").show();
             $("#missionWideIntro").hide();

         };

         middleModeShowControl = function(){

             // $("#footer").css( "z-index", 10 );
             $("#tab_contain").css( "z-index", 9 );


             $("#footer").show();
             $("#footUpArrow").show();
             $("#footDownArrow").show();

             $("#tabsMenu").show();
             $("#tab_contain").show();

             $("#missionWideIntro").hide();
         };

         bottomModeShowControl = function(){

             // $("#footer").css( "z-index", -10 );

             $("#tab_contain").css( "z-index", -10 );

             $("#tabsMenu").hide();
             $("#tab_contain").hide();
             $("#footDownArrow").hide();


             $("#footUpArrow").show();
             $("#missionWideIntro").show();
         };

         hideModeShowControl = function() {
             // $("#footer").css( "z-index", -10 );
         };



         footerShowControl = function( type ){
            switch( type ){
                case "top" :
                    topModeShowContol();
                    break;
                case "middle" :
                    middleModeShowControl();
                    break;
                case "bottom" :
                    bottomModeShowControl();
                    break;
                case "hide" :
                    hideModeShowControl();
                    break;

            }
         };



         showTabMenu = function() {
             $("#tabsMenu").css( "z-index", 10 );
             //$("#tabsMenu").show();

             $("#tab_contain").css( "z-index", 10 );
             //$("#tab_contain").show();
         };

         hideTabMenu = function() {
             $("#tabsMenu").css( "z-index", -20 );
             //$("#tabsMenu").hide();

             $("#tab_contain").css( "z-index", -20 );
             //$("#tab_contain").hide();

             $("#tab1").css( "z-index", -20 );
             $("#tab2").css( "z-index", -20 );
             $("#tab3").css( "z-index", -20 );

         };

         hideFooterMenu = function(){
             //$("#footer").hide();
             $("#footer").css( "z-index", -10 );
         };

         showFooterMenu = function(){
             //$("#footer").show();
             $("#footer").css( "z-index", 10 );
         };

         this.setFooterTopPos = function( height ){

             //this.footer.style.top = (mapHeight ) + 'px';
             this.footer.style.top = height + 'px';
             this.footer.style.left = 0 + 'px';
             this.footer.style.right = 0 + 'px';
             this.footer.style.bottom = 0 + 'px';
         };

         this.setMiddleFooterExtent = function() {
             var mapHeight = window.innerHeight * 0.50;

             this.footer.style.top = (mapHeight ) + 'px';
             this.footer.style.left = 0 + 'px';
             this.footer.style.right = 0 + 'px';
             this.footer.style.bottom = 0 + 'px';
         };

         this.setTopFooterExtent = function(){
             this.footer.style.top = 81 + 'px';
             this.footer.style.left = 0 + 'px';
             this.footer.style.right = 0 + 'px';
             this.footer.style.bottom = 0 + 'px';
         };


         this.top = function(){

             this.mode = "top";
             footerShowControl( "top");

             // this.setTopFooterExtent();
             this.setFooterTopPos(  81 );

             var mapHeight = window.innerHeight * 0.50;

             this.mapView.style.left = 0 + 'px';
             this.mapView.style.right = 0 + 'px';
             this.mapView.style.top = 41 + 'px';
             this.mapView.style.bottom = ( window.innerHeight - mapHeight + 1 ) + 'px';

             this.compassBtn.style.top = 5 + 'px';
             this.compassBtn.style.left = (window.innerWidth - 43 ) + 'px';


             this.downArrow.style.top = 4 + 'px';
             this.downArrow.style.left = window.innerWidth - 40 + 'px';
             this.downArrow.style.right = 0 + 'px';
             this.downArrow.style.bottom = 0 + 'px';


             this.setTabPosition();
             bibleMap.updateSize();
         };

         this.bottom = function(){

             this.mode = "bottom";
             footerShowControl( "bottom");

             // this.setMiddleFooterExtent();
             this.setFooterTopPos( window.innerHeight - 41 );

             this.mapView.style.left = 0 + 'px';
             this.mapView.style.right = 0 + 'px';
             this.mapView.style.top = 41 + 'px';
             this.mapView.style.bottom = 40 + 'px';

             this.compassBtn.style.top = 5 + 'px';
             this.compassBtn.style.left = (window.innerWidth - 43 ) + 'px';

             this.homeBtn.style.top = ( window.innerHeight - 220 ) + 'px';
             this.zoomInBtn.style.top = ( window.innerHeight - 172 ) + 'px';
             this.zoomOutBtn.style.top = (window.innerHeight - 140 ) + 'px';

             this.zoomInBtn.style.left = (window.innerWidth - 40 ) + 'px';
             this.zoomOutBtn.style.left = (window.innerWidth - 40 ) + 'px';
             this.homeBtn.style.left = (window.innerWidth - 40 ) + 'px';

             this.setTabPosition();

             this.upArrow.style.top = 3 + 'px';
             this.upArrow.style.left = window.innerWidth - 40 + 'px';
             this.upArrow.style.right = 0 + 'px';
             this.upArrow.style.bottom = 0 + 'px';

             this.missionWideIntro.style.top = 0 + 'px';
             this.missionWideIntro.style.left = 0 + 'px';
             // this.missionWideIntro.style.right = window.innerWidth - 80 + 'px';
             this.missionWideIntro.style.right = 80 + 'px';
             this.upArrow.style.bottom = 2 + 'px';

             bibleMap.updateSize();
         };

        this.middle = function(){

            this.mode = "middle";
            footerShowControl( "middle");

            // this.setMiddleFooterExtent();
            var mapHeight = window.innerHeight * 0.50;
            this.setFooterTopPos(  mapHeight );

            this.mapView.style.left = 0 + 'px';
            this.mapView.style.right = 0 + 'px';
            this.mapView.style.top = 41 + 'px';
            this.mapView.style.bottom = ( window.innerHeight - mapHeight - 1 ) + 'px';

            this.compassBtn.style.top = 5 + 'px';
            this.compassBtn.style.left = (window.innerWidth - 43 ) + 'px';

            this.homeBtn.style.top = ( window.innerHeight - mapHeight - 180 ) + 'px';
            this.zoomInBtn.style.top = ( window.innerHeight - mapHeight - 133 ) + 'px';
            this.zoomOutBtn.style.top = (window.innerHeight - mapHeight - 100 ) + 'px';

            this.zoomInBtn.style.left = (window.innerWidth - 40 ) + 'px';
            this.zoomOutBtn.style.left = (window.innerWidth - 40 ) + 'px';
            this.homeBtn.style.left = (window.innerWidth - 40 ) + 'px';

            this.setTabPosition();

            this.upArrow.style.top = 0 + 'px';
            this.upArrow.style.left = window.innerWidth - 66 + 'px';
            this.upArrow.style.right = 0 + 'px';
            this.upArrow.style.bottom = 0 + 'px';

            this.downArrow.style.top = 0 + 'px';
            this.downArrow.style.left = window.innerWidth - 32 + 'px';
            this.downArrow.style.right = 0 + 'px';
            this.downArrow.style.bottom = 0 + 'px';

            bibleMap.updateSize();
        };

        this.hide = function(){

            this.mode = "hide";
            footerShowControl( "hide");

            // this.setMiddleFooterExtent();

            this.mapView.style.left = 0 + 'px';
            this.mapView.style.right = 0 + 'px';
            this.mapView.style.top = 41 + 'px';
            this.mapView.style.bottom = 0 + 'px';

            this.compassBtn.style.top = 5 + 'px';
            this.compassBtn.style.left = (window.innerWidth - 43 ) + 'px';

            this.homeBtn.style.top = ( window.innerHeight - 180 ) + 'px';
            this.zoomInBtn.style.top = (window.innerHeight - 133 ) + 'px';
            this.zoomOutBtn.style.top = (window.innerHeight - 100 ) + 'px';

            this.zoomInBtn.style.left = (window.innerWidth - 40 ) + 'px';
            this.zoomOutBtn.style.left = (window.innerWidth - 40 ) + 'px';
            this.homeBtn.style.left = (window.innerWidth - 40 ) + 'px';

            this.upArrow.style.top = 0 + 'px';
            this.upArrow.style.left = window.innerWidth - 60 + 'px';
            this.upArrow.style.right = 0 + 'px';
            this.upArrow.style.bottom = 0 + 'px';

            bibleMap.updateSize();
        };

        return this;
    }

    return function(){
        return new CreateFooter();
    } ;

}());


function showNoticePopup(el){

    $('#contentDiv').scrollTop(0);

    var $el = $(el);		//레이어의 id를 $el 변수에 저장
    var isDim = $el.prev().hasClass('dimBg');	//dimmed 레이어를 감지하기 위한 boolean 변수

    isDim ? $('.dim-layer').fadeIn() : $el.fadeIn();

    var $elWidth = ~~($el.outerWidth()),
        $elHeight = ~~($el.outerHeight()),
        docWidth = $(document).width(),
        docHeight = $(document).height();

    // 화면의 중앙에 레이어를 띄운다.
    if ($elHeight < docHeight || $elWidth < docWidth) {
        $el.css({
            marginTop: -$elHeight /2,
            //top : 20,
            marginLeft: -$elWidth/2
        })
    } else {
        $el.css({top: 0, left: 0});
    }

    $el.find('a.btn-layerClose').click(function(){
        isDim ? $('.dim-layer').fadeOut() : $el.fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
        return false;
    });

    $('.layer .dimBg').click(function(){
        $('.dim-layer').fadeOut();
        return false;
    });

    $('#contentDiv').scrollTop(0);

}


function adjustPopupWindow(){
    var winWidth = window.innerWidth * 0.9;
    var winHeight = window.innerHeight * 0.9;

    var dvInfoPopup = document.getElementById("infoPopup");
    var dvInfoContent = document.getElementById("contentDiv");
    var dvInfoClose = document.getElementById("noticeClose");

    dvInfoContent.style.top = 60 + 'px';
    dvInfoContent.style.left = 20 + 'px';
    dvInfoContent.style.right = 20 + 'px';
    dvInfoContent.style.bottom =  50 + 'px';

    dvInfoClose.style.left = ( winWidth - 90 ) + 'px';
    dvInfoClose.style.top = (winHeight - 70) + 'px';
}

function showIntroBibleMap(  ){

    adjustPopupWindow();

    var lineImage = '<div style=\"height: 14px; background: url(biblemap/image/horizon-line.png);\"></div>';

    var popupTitle = document.getElementById( 'noticeTitle' );
    popupTitle.innerHTML = "biblemap.or.kr 웹 서비스 안내" + lineImage;

    var popupContent = document.getElementById( 'noticeContent' );
    popupContent.innerHTML = "";
    // popupContent.innerHTML += poiText;
    // popupContent.innerHTML += lineImage + "<br>";
    popupContent.innerHTML += '성경에는 하나님의 역사가 담겨있습니다.';
    popupContent.innerHTML += '<br>';
    popupContent.innerHTML += '하나님의 역사는 사실이며 따라서 성경본문에 등장하는 지명은 대부분 실제 존재하는 위치입니다.';
    popupContent.innerHTML += '<br>';
    popupContent.innerHTML += '성서지리에 대한 이해와 더불어 성경을 읽는다면 하나님에 대한 더욱 큰 확신과 믿음이 생길 것입니다.';
    popupContent.innerHTML += '<br>';
    popupContent.innerHTML += '여러분들이 성경을 가까이 하며 하나님의 역사를 더욱 깊게 알기 원하신다면 성경지도 웹 서비스가 도움이 될 것입니다.';
    popupContent.innerHTML += '<br>';
    popupContent.innerHTML += '<br>';
    popupContent.innerHTML += '본 웹사이트에 포함된 디지털맵 뷰어는 OpenLayers를 기반으로 제작되었으며, OpenLayers의 라이센스는 2-Clause BSD를 따릅니다.';
    popupContent.innerHTML += '<br>';
    popupContent.innerHTML += '<br>';
    popupContent.innerHTML += '본 웹사이트에서 표현되는 디지털 맵 데이터의 일부는 \'마이크로소프트\'가 제공하는 \'Bing Maps\'를 사용하고 있으며, \'Bing Maps\'를 사용하여 본 웹서비스를 제공하는 \'Mission Wide\'는 \'Bing Maps\'에 관한 라이선스 조항을 준수합니다';
    popupContent.innerHTML += '<br>';
    popupContent.innerHTML += '본 웹서비스를 사용하는 사용자는 아래 사이트에서 제공하는 라이센스 규정을 준수해야 합니다.';
    popupContent.innerHTML += '<br>';
    // popupContent.innerHTML += '<a href=\"javascript:gotoBinMapLincense()\" style=\"text-decoration:none; font-weight:bold; color:#2E59BF;\">' + '링크:  Bing Maps 라이센스 규정</a>';
    popupContent.innerHTML += 'https://www.microsoft.com/en-us/maps/product';
    popupContent.innerHTML += '<br>';
    popupContent.innerHTML += '<br>';
    popupContent.innerHTML += '본 웹사이트에서 표현되는 디지털 맵 데이터의 일부는 OpenStreetMap을 사용하고 있으며, OpenStreetMap의 라이센스는 CC BY-SA 2.0을 따릅니다.';
    popupContent.innerHTML += '<br>';
    popupContent.innerHTML += '<br>';
    popupContent.innerHTML += '본 웹사이트에서 제공하는 성경지명 정보 가운데 \'-비전성경사전-\' 출처로 표현되는 내용은 \'(사)두란노서원\'에서 제공하고 있는 내용임을 알려드립니다.';
    popupContent.innerHTML += '<br>';
    popupContent.innerHTML += '<br>';
    popupContent.innerHTML += '본 웹사이트에서 제공되는 위치정보는 일부 오류를 포함할 수 있음을 알려드리며, 공인된 정확한 정보가 수집되는 대로 수정할 것을 알려드립니다.';
    popupContent.innerHTML += '<br>';
    popupContent.innerHTML += '<br>';
    popupContent.innerHTML += '본 웹사이트는 \'Mission Wide\'가 개발 및 운영, 관리하고 있으며, \'Mission Wide\'는 성경지리를 웹 서비스로 제공하는 비영리 단체입니다.';
    popupContent.innerHTML += '<br>';
    popupContent.innerHTML += '<br>';
    popupContent.innerHTML += '\'Mission Wide\' 연락처';
    popupContent.innerHTML += '<br>';
    popupContent.innerHTML += '이메일: missionwide@naver.com';
    popupContent.innerHTML += '<br>';
    popupContent.innerHTML += '<a href= \"javascript:gotoBibleMapBlog()\" style=\"text-decoration:none; font-weight:bold; color:#2E59BF;\">' + '블로그: blog.naver.com/bible-map</a>';
    popupContent.innerHTML += '<br>';
    popupContent.innerHTML += '<br>';

    showNoticePopup( '#infoPopup' );

    // window.open("licenseNotice.html?version=20170920", "notice of license", "width=400, height=400, top=0, left=0, location=no, directories=no,resizable=no,status=no,toolbar=no,menubar=no, scrollbars=yes" );
}


function showIntroMissionWide(  ) {

    adjustPopupWindow();

    var lineImage = '<div style=\"height: 14px; background: url(biblemap/image/horizon-line.png);\"></div>';

    var popupTitle = document.getElementById('noticeTitle');
    popupTitle.innerHTML = "미션와이드 개요" + lineImage;

    var popupContent = document.getElementById('noticeContent');
    popupContent.innerHTML = "";

    popupContent.innerHTML += '\'미션와이드\'는 성경말씀에 대한 관심과 이해를 높이기 위해 설립된 비영리단체입니다.';
    popupContent.innerHTML += '<br>';
    popupContent.innerHTML += '\'미션와이드\'의 목적은 성경 관련 여러 정보를 공유할 수 있는 미디어 매체 기반의 플랫폼을 제공함으로써, 하나님의 말씀에 대한 확신과 강건한 믿음을 갖도록 다리 역할을 하는 것입니다. ';
    popupContent.innerHTML += '<br>';
    popupContent.innerHTML += '<br>';
    popupContent.innerHTML += '본 바이블 맵 서비스는 여러분들의 소중한 기부와 후원을 통하여 운영되고 있습니다.';
    popupContent.innerHTML += '<br>';
    popupContent.innerHTML += '여러분들의 많은 성원 부탁드립니다.';
    popupContent.innerHTML += '<br>';
    popupContent.innerHTML += '<br>';
    popupContent.innerHTML += '< 기부/후원 계좌 안내 >';
    popupContent.innerHTML += '<br>';
    popupContent.innerHTML += '신한은행 : 100-032-560142';
    popupContent.innerHTML += '<br>';
    popupContent.innerHTML += '예금주 : 미션와이드';
    popupContent.innerHTML += '<br>';

    showNoticePopup( '#infoPopup' );
}


function gotoBibleMapBlog(){
    window.open("http://blog.naver.com/bible-map");
}

function gotoBinMapLincense(){
    window.open("https://www.microsoft.com/en-us/maps/product");
}

function showDownloading(){

    $("#downloadingDiv").show();

    var downloading = document.getElementById("downloadingDiv");

    downloading.style.left = ((window.innerWidth * 0.5 ) - 80) + 'px';
    downloading.style.right = ((window.innerWidth * 0.5 ) - 80) + 'px';
    downloading.style.top = ((window.innerHeight * 0.5 ) - 80) + 'px';
    downloading.style.top = ((window.innerHeight * 0.5 ) - 80) + 'px';
}



function hideDownloading(){
  $("#downloadingDiv").hide();
}


function disableDIV( elemID ){   // "divID"

    document.getElementById( elemID ).disabled = true;
    var nodes = document.getElementById( elemID ).getElementsByTagName('*');
    for(var i = 0; i < nodes.length; i++){
        nodes[i].disabled = true;
    }


    // $("#footer").attr( 'disabled', true);
}

function enableDIV( elemID ){   // "divID"

    document.getElementById( elemID ).disabled = false;
    var nodes = document.getElementById( elemID ).getElementsByTagName('*');
    for(var i = 0; i < nodes.length; i++){
        nodes[i].disabled = false;
    }


    // $("#footer").removeAttr( 'disabled');
}



function preventZoomInDIV( strDiv ){
    var div = document.getElementById( strDiv );

    div.addEventListener('touchmove', function (e) {
        var touchLen = e.touches.length;
        if( touchLen > 1){
            e.preventDefault();
        }
    }, false);
}


function examineNumber(){
    ConsoleLog( "input Number : " + dvBibleChapter.value );
    alert( dvBibleChapter.value  );
    if(isNaN( dvBibleChapter.value ) == true) {
        alert("숫자를 입력해 주세요");
    }
}

function clearSearchBibleWord(){
    dvBibleWord.value = "";
    $("#bibleWord").focus();
    //alert( "clar!!");
}

function clearSearchPlaceWord(){
    $("#searchedPoiList").hide();
    dvBiblePlace.value ="";
    $("#biblePlace").focus();
}


function windowReloadByCurDate() {

    var curDate = new Date();

    var dayObj = getCurrentDayFromStorage();
    if (dayObj == null) {
        saveCurrentDayToStorage(curDate);
        window.location.reload(true);
    } else {

        if (dayObj.year != curDate.getFullYear() || dayObj.mon != curDate.getCurMonth() || dayObj.day != curDate.getCurDay() || dayObj.hour != curDate.getHours() || dayObj.min != curDate.getMinutes()) {
            saveCurrentDayToStorage(curDate);
            // alert( "refresh!!!");
            window.location.reload(true);
        }
    }
}


function createTabMenu(){

    //document.body.requestFullscreen();

    $(".tab_content").hide();
    $(".tab_content:first").show();

    var selMenuString = "";

    $("ul.tabs li").click(function () {
        selMenuString = $(this).text();
        ConsoleLog( "tab Click !!! select : " + selMenuString );
        $("ul.tabs li").removeClass("active").css("color", "#FFFFFF");
        /* $("ul.tabs li").removeClass("active").css("color", "#646464");  */
        $(this).addClass("active").css("color", "#000000");

        var activeTab = $(this).attr("rel");
        ConsoleLog( "tab Click !!! rel Active : " + activeTab );
        if( activeTab === undefined || activeTab == null ){
            alert( "lost activeTab!!!");
            if( $(this) == undefined || $(this) == null )
                alert( "$(this) is not valid!!! ");
            return;
        }

        $(".tab_content").hide();

        $("#tab1Title").hide();
        $("#tab3Title").hide();

        if(activeTab == "tab1" ){
            $("#tab1Title").show();
        }else if( activeTab == "tab3"){
            $("#tab3Title").show();
        }

        $("#" + activeTab).show();
        // $("#" + activeTab).scrollTop(0);

    });

    TabMenuControl = function() {
        this.selectTab = function (menuID) {
            // var el = document.getElementById('tab1Menu');
            var el = document.getElementById(menuID);
            eventFire(el, 'click');
        };

        this.getSelectedTabString = function () {
            return selMenuString;
        };

        return this;
    };

    return new TabMenuControl;
}
