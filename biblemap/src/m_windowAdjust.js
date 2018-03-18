/**
 * Created by Administrator on 2018-03-16.
 */

var createFooterMenu = (function() {



     function CreateFooter(){

         var footer = document.getElementById('footer');
         var mapView = document.getElementById('map');

         var logo = document.getElementById('bibleMapLogo');

         var tabMenuBar = document.getElementById("tabsMenu");
         var tab_contain = document.getElementById("tab_contain");

         var tab1 = document.getElementById("tab1");
         var tab2 = document.getElementById("tab2");
         var tab3 = document.getElementById("tab3");
         var tab4 = document.getElementById("tab4");

         var upArrow = document.getElementById("footUpArrow");
         var downArrow = document.getElementById("footDownArrow");

         var missionWideIntro = document.getElementById("missionWideIntro");

         function setLogoPosition(){
             logo.style.left =  (window.innerWidth - 45) + 'px';
             logo.style.right = 0 + 'px';
         }

         function setTabPosition(){
             tabMenuBar.style.top = 5 + 'px';
             tabMenuBar.style.left = 0 + 'px';

             tab_contain.style.top = 38 + 'px';
             tab_contain.style.left = 0 + 'px';
             tab_contain.style.right = 0 + 'px';
             tab_contain.style.bottom = 5 + 'px';

             tab1.style.top = 35 + 'px';
             tab1.style.left = 0 + 'px';
             tab1.style.right = 0 + 'px';
             tab1.style.bottom = 5 + 'px';

             tab2.style.top = 0 + 'px';
             tab2.style.left = 0 + 'px';
             tab2.style.right = 0 + 'px';
             tab2.style.bottom = 5 + 'px';

             tab3.style.top = 0 + 'px';
             tab3.style.left = 15 + 'px';
             tab3.style.right = 5 + 'px';
             tab3.style.bottom = 5 + 'px';
         }

         this.mode = "hide";    // "hide", "bottom", "middle", "top";
         // this.mode = "middle";    // "hide", "bottom", "middle", "top";

         this.setMode = function( paramMode ){
            this.mode = paramMode;
         };

         this.getMode = function(){
             return this.mode;
         };

         this.showControl = function(){
             setLogoPosition();

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


         this.top = function(){
             this.mode = "top";
             var mapHeight = window.innerHeight * 0.50;

             mapView.style.left = 0 + 'px';
             mapView.style.right = 0 + 'px';
             mapView.style.top = 41 + 'px';
             mapView.style.bottom = ( window.innerHeight - mapHeight + 1 ) + 'px';

             footer.style.top = 81 + 'px';
             footer.style.left = 0 + 'px';
             footer.style.right = 0 + 'px';
             footer.style.bottom = 0 + 'px';

             setTabPosition();

             bibleMap.updateSize();

             $("#tabsMenu").show();
             $("#tab_contain").show();

             $("#footer").show();

             $("#footUpArrow").hide();
             $("#footDownArrow").show();
             $("#missionWideIntro").hide();

             downArrow.style.top = 4 + 'px';
             downArrow.style.left = window.innerWidth - 40 + 'px';
             downArrow.style.right = 0 + 'px';
             downArrow.style.bottom = 0 + 'px';
         };

         this.bottom = function(){
             this.mode = "bottom";

             mapView.style.left = 0 + 'px';
             mapView.style.right = 0 + 'px';
             mapView.style.top = 41 + 'px';
             mapView.style.bottom = 41 + 'px';

             footer.style.top = (window.innerHeight - 40) + 'px';
             footer.style.left = 0 + 'px';
             footer.style.right = 0 + 'px';
             footer.style.bottom = 0 + 'px';

             setTabPosition();


             $("#tabsMenu").hide();
             $("#tab_contain").hide();
             $("#footer").show();
             $("#footUpArrow").show();
             $("#footDownArrow").hide();
             $("#missionWideIntro").show();

             upArrow.style.top = 3 + 'px';
             upArrow.style.left = window.innerWidth - 40 + 'px';
             upArrow.style.right = 0 + 'px';
             upArrow.style.bottom = 0 + 'px';

             missionWideIntro.style.top = 0 + 'px';
             missionWideIntro.style.left = 0 + 'px';
             // missionWideIntro.style.right = window.innerWidth - 80 + 'px';
             missionWideIntro.style.right = 80 + 'px';
             upArrow.style.bottom = 2 + 'px';

             bibleMap.updateSize();
         };

        this.middle = function(){
            this.mode = "middle";
            var mapHeight = window.innerHeight * 0.50;

            mapView.style.left = 0 + 'px';
            mapView.style.right = 0 + 'px';
            mapView.style.top = 41 + 'px';
            mapView.style.bottom = ( window.innerHeight - mapHeight + 1 ) + 'px';

            footer.style.top = mapHeight + 1 + 'px';
            footer.style.left = 0 + 'px';
            footer.style.right = 0 + 'px';
            footer.style.bottom = 0 + 'px';

            setTabPosition();

            $("#footUpArrow").show();
            $("#footDownArrow").show();

            upArrow.style.top = 0 + 'px';
            upArrow.style.left = window.innerWidth - 57 + 'px';
            upArrow.style.right = 0 + 'px';
            upArrow.style.bottom = 0 + 'px';

            downArrow.style.top = 0 + 'px';
            downArrow.style.left = window.innerWidth - 29 + 'px';
            downArrow.style.right = 0 + 'px';
            downArrow.style.bottom = 0 + 'px';

            bibleMap.updateSize();

            $("#tabsMenu").show();
            $("#tab_contain").show();
            $("#missionWideIntro").hide();

            $("#footer").show();
        };

        this.hide = function(){
            this.mode = "hide";
            var mapHeight = window.innerHeight * 0.50;

            mapView.style.left = 0 + 'px';
            mapView.style.right = 0 + 'px';
            mapView.style.top = 41 + 'px';
            mapView.style.bottom = 0 + 'px';

            $("#footer").hide();

            $("#footUpArrow").show();
            $("#footDownArrow").hide();

            upArrow.style.top = 0 + 'px';
            upArrow.style.left = window.innerWidth - 60 + 'px';
            upArrow.style.right = 0 + 'px';
            upArrow.style.bottom = 0 + 'px';

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



function showIntroBibleMap(  ){

    var winWidth = window.innerWidth * 0.9;
    var winHeight = window.innerHeight * 0.9;

    var dvInfoPopup = document.getElementById("infoPopup");
    var dvInfoContent = document.getElementById("contentDiv");
    var dvInfoClose = document.getElementById("noticeClose");

    dvInfoContent.style.top = 60 + 'px';
    dvInfoContent.style.left = 20 + 'px';
    dvInfoContent.style.right = 20 + 'px';
    dvInfoContent.style.bottom =  50 + 'px';


    // dvInfoClose.style.top = winHeight - 60 + 'px';
    dvInfoClose.style.left = ( winWidth - 80 ) + 'px';
    dvInfoClose.style.top = (winHeight - 70) + 'px';
    // dvInfoClose.style.right = winWidth - 20 + 'px';
    // dvInfoClose.style.bottom =  winHeight - 20 + 'px';


    var lineImage = '<div style=\"height: 14px; background: url(biblemap/image/horizon-line.png);\"></div>';

    var popupTitle = document.getElementById( 'noticeTitle' );
    popupTitle.innerHTML = "biblemap.or.kr 웹 서비스 안내" + lineImage;

    var popupContent = document.getElementById( 'noticeContent' );
    popupContent.innerHTML = "";
    // popupContent.innerHTML += poiText;
    // popupContent.innerHTML += lineImage + "<br>";
    popupContent.innerHTML += '성경내용 안에는 하나님의 역사가 담겨있습니다 <br>';
    popupContent.innerHTML += '하나님의 역사는 사실이며 따라서 성경본문에 등장하는 지명은 대부분 실제 존재하는 위치입니다 <br>';
    popupContent.innerHTML += '성서지리에 대한 이해와 더불어 성경을 이해한다면 하나님에 대한 더욱 큰 확신과 믿음이 생길 것입니다  <br>';
    popupContent.innerHTML += '여러분들이 성경을 가까이 하며 하나님의 역사를 더욱 깊게 알기 원하신다면 성경지도 웹 서비스가 도움이 될 것입니다.</span>';
    popupContent.innerHTML += '<br>';
    popupContent.innerHTML += '<br>';
    popupContent.innerHTML += '본 웹사이트에 포함된 디지털맵 뷰어는 OpenLayers를 기반으로 제작되었으며, OpenLayers의 라이센스는 2-Clause BSD를 따릅니다.</span>';
    popupContent.innerHTML += '<br>';
    popupContent.innerHTML += '<br>';
    popupContent.innerHTML += '본 웹사이트에서 표현되는 디지털 맵 데이터의 일부는 OpenStreetMap을 사용하고 있으며, OpenStreetMap의 라이센스는 CC BY-SA 2.0을 따릅니다.</span>';
    popupContent.innerHTML += '<br>';
    popupContent.innerHTML += '<br>';
    popupContent.innerHTML += '본 웹사이트에서 제공하는 성경지명 정보 가운데 \'-비전성경사전-\' 출처로 표현되는 내용은 \'(사)두란노서원\'에서, \'-성경지명사전-\' 출처로 표현되는 내용은 \'(사)한국컴퓨터선교회\'에서 웹서비스를 통하여 제공하고 있는 내용임을 알려드립니다.</span>';
    popupContent.innerHTML += '<br>';
    popupContent.innerHTML += '<br>';
    popupContent.innerHTML += '본 웹사이트에서 제공되는 위치정보는 일부 오류를 포함할 수 있음을 알려드리며, 공인된 정확한 정보가 수집되는 대로 수정할 것을 알려드립니다.</span>';
    popupContent.innerHTML += '<br>';
    popupContent.innerHTML += '<br>';
    popupContent.innerHTML += '본 웹사이트는 비영리 단체인 \'Mission Wide\'에서 운영 및 관리되고 있으며, \'Mission Wide\'는 성경지리를 웹 서비스로 제공하는 비영리 단체입니다.</span>';
    popupContent.innerHTML += '<br>';
    popupContent.innerHTML += '<br>';

    showNoticePopup( '#infoPopup' );

    // window.open("licenseNotice.html?version=20170920", "notice of license", "width=400, height=400, top=0, left=0, location=no, directories=no,resizable=no,status=no,toolbar=no,menubar=no, scrollbars=yes" );

}
