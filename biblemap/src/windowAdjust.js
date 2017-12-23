/**
 * Created by Administrator on 2017-12-23.
 */

/*
var TabMenu = (function () {
    $(".tab_content").hide();
    $(".tab_content:first").show();

    var selMenuString = "";

    $("ul.tabs li").click(function () {
        selMenuString = $(this).text();
        ConsoleLog( selMenuString );
        $("ul.tabs li").removeClass("active").css("color", "#FFFFFF");
        $(this).addClass("active").css("color", "#000000");
        $(".tab_content").hide();
        var activeTab = $(this).attr("rel");
        // $("#" + activeTab).fadeIn();
        $("#" + activeTab).show();
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

}());
*/


function createTabMenu(){
    $(".tab_content").hide();
    $(".tab_content:first").show();

    var selMenuString = "";

    $("ul.tabs li").click(function () {
        selMenuString = $(this).text();
        ConsoleLog( selMenuString );
        $("ul.tabs li").removeClass("active").css("color", "#FFFFFF");
        $(this).addClass("active").css("color", "#000000");
        $(".tab_content").hide();
        var activeTab = $(this).attr("rel");
        // $("#" + activeTab).fadeIn();
        $("#" + activeTab).show();
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



IsExistWord = function( array, word ) {
    for (var id in array ) {
        var curObj = array[id];
        if( curObj.value == word) {
            return true;
        }
    }
    return false;
};

// 지명 검색창에 지명 입력시 자동으로 후보단어 표시하기
function initTextAutoComplete(){

    var currencies = [];
    var poiDic = layerManager.getPoiDictionaryObj();

    for( prop in poiDic ){
        if( poiDic.hasOwnProperty(prop) && typeof poiDic[prop] === "object" ){
            if( IsExistWord( currencies,  prop ) == false) {
                currencies.push({value: prop});
            }
        }
    }

    $('#biblePlace').autocomplete({
        lookup: currencies,
        onSelect: function (suggestion) {
            // var thehtml = '<strong>Currency Name:</strong> ' + suggestion.value + ' <br> <strong>Symbol:</strong> ' + suggestion.data;
            // $('#outputcontent').html(thehtml);

            var dvBiblePlace = document.getElementById("biblePlace");
            dvBiblePlace.value = suggestion.value;
            searchBiblePlace();
        }
    });
}



var adjustScrDiv = (function(){

    var bIsFullScr = 'false';
    var view2D3D = "chkView2D";

    // var map2D_Z = $("#map").css('z-index');
    // var map3D_Z = $("#map3D").css('z-index');


    // $( '#map3D' ).css( "z-index", 2000 );
    // $( '#behindMap2D' ).css( "z-index", 0 );

    function fullScrMap(){
        var sidebar = document.getElementById('sidebar');
        var mapview = document.getElementById('map');
        var mapview3D = document.getElementById('map3D');
        // var behindMap = document.getElementById('behindMap2D');

        var footer = document.getElementById('footer');
        $("#footer").hide();

        // $("#footerDummy").hide();

        var container = document.getElementById('container');
        $("#container").hide();

        var toggleBtn = document.getElementById("footerToggle");
        toggleBtn.style.left = (200 -25) + ( (window.innerWidth -200) * 0.5 ) + "px";
        toggleBtn.style.top = (window.innerHeight - 12)+ "px";

        sidebar.style.top = 1 + 'px';
        sidebar.style.bottom = 1 + 'px';

        var dummy  = document.getElementById('dummy');
        var licenseNotice = document.getElementById('licenseNotice');

        // dummy.style.top = (window.innerHeight - 30) + 'px';
        dummy.style.top = (window.innerHeight - 202) + 'px';
        // licenseNotice.style.top = (window.innerHeight - 16) + 'px';

        if ( view2D3D == "chkViewAll") {
            $( '#map' ).css( "z-index", 1000 );
            $( '#map3D' ).css( "z-index", 1000 );

            mapview.style.left = 200 + 'px';
            mapview.style.right = (( window.innerWidth * 0.5 ) - 100) + 'px';
            mapview3D.style.left = (( window.innerWidth * 0.5 )+100) + 'px';
            mapview3D.style.right = 0 + 'px';
        }else{
            if( view2D3D == "chkView2D") {
                $( '#map' ).css( "z-index", 2000 );
                $( '#map3D' ).css( "z-index", 1000 );
            }else {
                $( '#map' ).css( "z-index", 1000 );
                $( '#map3D' ).css( "z-index", 2000 );
            }

            mapview.style.left = 200 + 'px';
            mapview.style.right = 0 + 'px';
            mapview3D.style.left = 200 + 'px';
            mapview3D.style.right = 0 + 'px';
        }
        mapview.style.bottom = 0 + 'px';
        mapview3D.style.bottom = 0 + 'px';

        /*
         behindMap.style.top = (window.innerHeight - 100) + 'px';
         behindMap.style.left = (window.innerWidth - 150) + 'px';
         behindMap.style.right = 0 + 'px';
         behindMap.style.bottom = 0 + 'px';
         */

        bibleMap.updateSize();
    }

    function normalScrMap(){

        var sidebar = document.getElementById('sidebar');
        var toggleBtn = document.getElementById("footerToggle");
        var mapview = document.getElementById('map');
        var mapview3D = document.getElementById('map3D');
        // var behindMap = document.getElementById('behindMap2D');

        var footer = document.getElementById('footer');
        // var footerDummy = document.getElementById('footerDummy');
        var tab_contain = document.getElementById( "tab_contain");

        var tab1 = document.getElementById( "tab1");
        var tab2 = document.getElementById( "tab2");
        var tab3 = document.getElementById( "tab3");
        var tab4 = document.getElementById( "tab4");

        var mapHeight = window.innerHeight * 0.60;

        $("#footer").show();
        footer.style.top = mapHeight + 10 + 'px';
        footer.style.left = 201+'px';
        footer.style.right = 0 +'px';
        footer.style.bottom = 0 + 'px';


        tab_contain.style.top = 35 +'px';
        tab_contain.style.left = 0+'px';
        tab_contain.style.right = 0 + 'px';
        tab_contain.style.bottom = 5 + 'px';


        tab1.style.top = 0 +'px';
        tab1.style.left = 0+'px';
        tab1.style.right = 0 + 'px';
        tab1.style.bottom = 5 + 'px';

        tab2.style.top = 0 +'px';
        tab2.style.left = 0+'px';
        tab2.style.right = 0 + 'px';
        tab2.style.bottom = 5 + 'px';

        tab3.style.top = 0 +'px';
        tab3.style.left = 15+'px';
        tab3.style.right = 5 + 'px';
        tab3.style.bottom = 5 + 'px';

        tab4.style.top = 0 +'px';
        tab4.style.left = 15+'px';
        tab4.style.right = 5 + 'px';
        tab4.style.bottom = 5 + 'px';


        var footerTop = footer.getBoundingClientRect().top;

        toggleBtn.style.left = (200 -25) + ( (window.innerWidth -200) * 0.5 ) + "px";
        toggleBtn.style.top = (footerTop -22) + "px";


        sidebar.style.top = 1 + 'px';
        sidebar.style.bottom = 1 + 'px';
        // sidebar.style.bottom = ( window.innerHeight - mapHeight ) + 'px';


        if ( view2D3D == "chkView2D") {
            $( '#map' ).css( "z-index", 2000 );
            $( '#map3D' ).css( "z-index", 1000 );

            mapview.style.left = 200+'px';
            mapview.style.right = 0 + 'px';
            mapview3D.style.left = 200+'px';
            mapview3D.style.right = 0 + 'px';
        }
        else if ( view2D3D == "chkView3D") {

            $( '#map' ).css( "z-index", 1000 );
            $( '#map3D' ).css( "z-index", 2000 );

            mapview.style.left = 200+'px';
            mapview.style.right = 0 + 'px';
            mapview3D.style.left = 200+'px';
            mapview3D.style.right = 0 + 'px';
        }
        else if( view2D3D == "chkViewAll") {

            $( '#map' ).css( "z-index", 1000 );
            $( '#map3D' ).css( "z-index", 1000 );
            // $( '#behindMap2D' ).css( "z-index", 0 );

            mapview.style.left = 200+'px';
            mapview.style.right = (( window.innerWidth * 0.5 ) - 100) + 'px';
            mapview3D.style.left = (( window.innerWidth * 0.5 )+100) + 'px';
            mapview3D.style.right = 0 + 'px'
        }
        mapview.style.top = 0;
        mapview.style.bottom = ( window.innerHeight- mapHeight ) + 'px';

        // mapview3D.style.left = (( window.innerWidth * 0.5 )+100) + 'px';

        mapview3D.style.top = 0;
        mapview3D.style.bottom = ( window.innerHeight- mapHeight ) + 'px';


        /*
         behindMap.style.top = (footerTop - ( 22 + 100 )) + 'px';
         behindMap.style.left = (window.innerWidth - 150) + 'px';
         behindMap.style.right = 0 + 'px';
         behindMap.style.bottom = (footerTop - ( 22 + 160 )) + 'px';
         */

        var dummy  = document.getElementById('dummy');
        var licenseNotice = document.getElementById('licenseNotice');
        var sidebarHeight = sidebar.getBoundingClientRect().height;

        dummy.style.top = (window.innerHeight - 202) + 'px';

        bibleMap.updateSize();
    }


    function showScrMap( ){

        var img1 = "biblemap/image/hideBible.png?version=20170905";
        var img2 = "biblemap/image/showBible.png?version=20170905";

        var toggleBtn = document.getElementById("footerToggle");
        $("#footerToggle").css( "z-index", "5000" );


        if( bIsFullScr == 'false' ) {
            adjustScrDiv.normalScrMap();
            toggleBtn.src = img1;
        }
        else{
            adjustScrDiv.fullScrMap();
            toggleBtn.src = img2;
        }
    }

    function toggleScrMap( ){

        if( bIsFullScr == 'false'){
            bIsFullScr = 'true';
        }
        else{
            bIsFullScr = 'false';
        }
        showScrMap();

    }

    function view2D3DControl( value ){
        view2D3D = value;

        showScrMap();
    }

    function setIsFullScr( setVal ){
        bIsFullScr = setVal;
        showScrMap();
    }

    function getCurrent2D3DString(){
        return view2D3D;
    }

    return {
        fullScrMap : fullScrMap,
        normalScrMap : normalScrMap,
        showScrMap : showScrMap,
        toggleScrMap : toggleScrMap,
        setIsFullScr : setIsFullScr,
        view2D3DCtrl : view2D3DControl,
        getCurrent2D3DString :getCurrent2D3DString
    };

}());

function toggleScrMap(){
    adjustScrDiv.toggleScrMap();
}


