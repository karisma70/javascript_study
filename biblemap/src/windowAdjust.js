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

        $("ul.tabs li").removeClass("active").css("color", "#FFFFFF");
        /* $("ul.tabs li").removeClass("active").css("color", "#646464");  */
        $(this).addClass("active").css("color", "#000000");

        var activeTab = $(this).attr("rel");

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


        /*
        selMenuString = $(this).text();
        ConsoleLog( selMenuString );
        $("ul.tabs li").removeClass("active").css("color", "#FFFFFF");
        $(this).addClass("active").css("color", "#000000");
        $(".tab_content").hide();



        var activeTab = $(this).attr("rel");
        // $("#" + activeTab).fadeIn();
        $("#" + activeTab).show();
        */
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

    $( '#behindMap2D' ).css( "z-index", -1 );

    var sidebar;
    var toggleBtn;
    var mapview;
    var mapview3D;
    var behindMap;
    var turnUpBtn;
    var turnLeftBtn;
    var turnRightBtn;
    var turnDownBtn;

    var homeBtn;
    var compassBtn;
    var zoomInBtn2D;
    var zoomOutBtn2D;

    var compassBasX = window.innerWidth - ( 200 + 85 );
    var compassBasY = 5;

    var baseY = 80;

    var zoomInBtn3D;
    var zoomOutBtn3D;
    var measureBtn2D;

    var view2DBtn;
    var view3DBtn;

    var footer;
    var tab_contain;

    var container;

    var tab1Title;

    var tab1;
    var tab2;
    var tab3;
    var tab4;

    function updateCompassBaseXY(){
        compassBasX = window.innerWidth - ( 200 + 85 );
    }

    function setCompassBtnPos( baseX, baseY ){

        homeBtn.style.left = baseX + 25 +'px';
        homeBtn.style.top = baseY + 'px';

        var compassY = baseY + 30;

        compassBtn.style.left = baseX + 9 + 'px';
        compassBtn.style.top = compassY + 7 + 'px';

        turnUpBtn.style.left = baseX + 20 + 'px';
        turnUpBtn.style.top = compassY + 0 + 'px';

        turnLeftBtn.style.left = baseX + 0 + 'px';
        turnLeftBtn.style.top = compassY + 19 + 'px';

        turnRightBtn.style.left = baseX + 60 + 'px';
        turnRightBtn.style.top = compassY + 19 + 'px';

        turnDownBtn.style.left = baseX + 20 + 'px';
        turnDownBtn.style.top = compassY + 57 + 'px';
    }

    function initDocumentVar() {
        sidebar = document.getElementById('sidebar');
        toggleBtn = document.getElementById("footerToggle");
        mapview = document.getElementById('map');
        mapview3D = document.getElementById('map3D');
        behindMap = document.getElementById('behindMap2D');

        homeBtn = document.getElementById('homeBtn');
        compassBtn = document.getElementById('compassBtn');
        turnUpBtn = document.getElementById('turnUpBtn');
        turnLeftBtn = document.getElementById('turnLeftBtn');
        turnRightBtn = document.getElementById('turnRightBtn');
        turnDownBtn = document.getElementById('turnDownBtn');

        view2DBtn  = document.getElementById('view2DBtn');
        view3DBtn  = document.getElementById('view3DBtn');

        footer = document.getElementById('footer');
        // var footerDummy = document.getElementById('footerDummy');
        tab_contain = document.getElementById("tab_contain");

        container = document.getElementById('container');

        tab1Title = document.getElementById("tab1Title");

        tab1 = document.getElementById("tab1");
        tab2 = document.getElementById("tab2");
        tab3 = document.getElementById("tab3");
        tab4 = document.getElementById("tab4");

        setCompassBtnPos( compassBasX, compassBasY );

        view2DBtn.style.top = 38 +'px';
        view2DBtn.style.left = 5 + 'px';
        // view2DBtn.style.left = (window.innerWidth - 230) + 'px';

        view3DBtn.style.top = 38 +'px';
        view3DBtn.style.left = 5 + 'px';
        // view3DBtn.style.left = (window.innerWidth - 230) + 'px';
    }

    // val 1010
    function setZOrder3DViewBtn( val ){
        $( '#homeBtn' ).css( "z-index",  val );
        $( '#compassBtn' ).css( "z-index",  val );

        $( '#turnUpBtn' ).css( "z-index", val );
        $( '#turnLeftBtn' ).css( "z-index", val );
        $( '#turnRightBtn' ).css( "z-index", val );
        $( '#turnDownBtn' ).css( "z-index", val );


        $( '#zoomInBtn3D' ).css( "z-index",  val);
        $( '#zoomOutBtn3D' ).css( "z-index",  val);
        // $( '#beforePoiBtn3D' ).css( "z-index", val );
        // $( '#afterPoiBtn3D' ).css( "z-index", val );
        $( '#view2DBtn' ).css( "z-index", val );


    }

    function setZOrder2DViewBtn( val ) {
        $('#zoomInBtn2D').css("z-index", val);
        $('#zoomOutBtn2D').css("z-index", val);
        $('#measureBtn2D').css("z-index", val);
        // $('#beforePoiBtn2D').css("z-index", val);
        // $('#afterPoiBtn2D').css("z-index", val);
        $('#view3DBtn').css("z-index", val);
    }

    function fullScrMap(){

        initDocumentVar();

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

        updateCompassBaseXY();
        setCompassBtnPos( compassBasX, compassBasY );

        if ( view2D3D == "chkViewAll") {
            $( '#map' ).css( "z-index", 1000 );

            $( '#bubblePopup3D' ).css( "z-index", 1000 );
            $( '#map3D' ).css( "z-index", 1000 );

            var compassX = ( window.innerWidth * 0.5 ) -  185;
            setCompassBtnPos( compassX, compassBasY );

            mapview3D.style.left = 200 + 'px';
            mapview3D.style.right = (( window.innerWidth * 0.5 ) - 100) + 'px';
            mapview.style.left = (( window.innerWidth * 0.5 )+100) + 'px';
            mapview.style.right = 0 + 'px';

        }else{
            if( view2D3D == "chkView2D") {
                $( '#map' ).css( "z-index", 2000 );

                $( '#bubblePopup3D' ).css( "z-index", 1000 );
                $( '#map3D' ).css( "z-index", 1000 );
            }else {
                $( '#map' ).css( "z-index", 1000 );

                $( '#bubblePopup3D' ).css( "z-index", 2000 );
                $( '#map3D' ).css( "z-index", 2000 );
            }


            mapview3D.style.left = 200 + 'px';
            mapview3D.style.right = 0 + 'px';
            mapview.style.left = 200 + 'px';
            mapview.style.right = 0 + 'px';

        }
        mapview.style.bottom = 0 + 'px';
        mapview3D.style.bottom = 0 + 'px';



         behindMap.style.left = (window.innerWidth - 150) + 'px';
         behindMap.style.right = 0 + 'px';


        // behindMap.style.top = (window.innerHeight ) + 'px';
        // behindMap.style.bottom = (window.innerHeight - 100) + 'px';

        behindMap.style.top = 0 + 'px';
        //behindMap.style.bottom = (footerTop - ( 0 + 160 )) + 'px';
        behindMap.style.bottom = ( window.innerHeight- 100) + 'px';


        bibleMap.updateSize();
        map3D.map.updateSize();
    }

    function normalScrMap(){

        initDocumentVar();

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


        tab1Title.style.top = 0 +'px';
        tab1Title.style.left = 0+'px';
        tab1Title.style.right = 0 + 'px';
        tab1Title.style.bottom = 5 + 'px';

        tab1.style.top = -10 +'px';
        tab1.style.left = 0+'px';
        tab1.style.right = 0 + 'px';
        tab1.style.bottom = 5 + 'px';

        tab2.style.top = -33 +'px';
        tab2.style.left = 0+'px';
        tab2.style.right = 0 + 'px';
        tab2.style.bottom = 5 + 'px';

        // tab3.style.top = 0 +'px';
        tab3.style.top = -10 +'px';
        tab3.style.left = 0 +'px';
        tab3.style.right = 5 + 'px';
        tab3.style.bottom = 5 + 'px';

        tab4.style.top = -33 +'px';
        tab4.style.left = 15+'px';
        tab4.style.right = 5 + 'px';
        tab4.style.bottom = 5 + 'px';


        var footerTop = footer.getBoundingClientRect().top;

        toggleBtn.style.left = (200 -25) + ( (window.innerWidth -200) * 0.5 ) + "px";
        toggleBtn.style.top = (footerTop -22) + "px";


        sidebar.style.top = 1 + 'px';
        sidebar.style.bottom = 1 + 'px';
        // sidebar.style.bottom = ( window.innerHeight - mapHeight ) + 'px';

        updateCompassBaseXY();
        setCompassBtnPos( compassBasX, compassBasY );



        if ( view2D3D == "chkView2D") {
            $( '#map' ).css( "z-index", 2000 );

            $( '#bubblePopup3D' ).css( "z-index", 1000 );
            $( '#map3D' ).css( "z-index", 1000 );

            mapview3D.style.left = 200+'px';
            mapview3D.style.right = 0 + 'px';
            mapview.style.left = 200+'px';
            mapview.style.right = 0 + 'px';

            setZOrder3DViewBtn( 1010 );
            setZOrder2DViewBtn( 2010 );


        }
        else if ( view2D3D == "chkView3D") {

            $( '#map' ).css( "z-index", 1000 );
            $( '#map3D' ).css( "z-index", 2000 );
            $( '#bubblePopup3D' ).css( "z-index", 2000 );

            setZOrder3DViewBtn( 2010 );
            setZOrder2DViewBtn( 1010 );

            mapview3D.style.left = 200+'px';
            mapview3D.style.right = 0 + 'px';
            mapview.style.left = 200+'px';
            mapview.style.right = 0 + 'px';
        }
        else if( view2D3D == "chkViewAll") {

            $( '#map' ).css( "z-index", 1000 );

            $( '#bubblePopup3D' ).css( "z-index", 1000 );
            $( '#map3D' ).css( "z-index", 1000 );

            setZOrder3DViewBtn( 1010 );
            setZOrder2DViewBtn( 1010 );

            var compassX = ( window.innerWidth * 0.5 ) -  185;
            setCompassBtnPos( compassX, compassBasY );

            mapview3D.style.left = 200+'px';
            mapview3D.style.right = (( window.innerWidth * 0.5 ) - 100) + 'px';
            mapview.style.left = (( window.innerWidth * 0.5 )+100) + 'px';
            mapview.style.right = 0 + 'px';
        }
        mapview.style.top = 0;
        mapview.style.bottom = ( window.innerHeight- mapHeight ) + 'px';

        // mapview3D.style.left = (( window.innerWidth * 0.5 )+100) + 'px';

        mapview3D.style.top = 0;
        mapview3D.style.bottom = ( window.innerHeight- mapHeight ) + 'px';



         behindMap.style.left = (window.innerWidth - 150) + 'px';
         behindMap.style.right = 0 + 'px';

         //behindMap.style.top = (footerTop - ( 62 + 100 )) + 'px';
         behindMap.style.top = 0 + 'px';
         //behindMap.style.bottom = (footerTop - ( 0 + 160 )) + 'px';
        behindMap.style.bottom = ( window.innerHeight- 100) + 'px';


        var dummy  = document.getElementById('dummy');
        var licenseNotice = document.getElementById('licenseNotice');
        var sidebarHeight = sidebar.getBoundingClientRect().height;

        dummy.style.top = (window.innerHeight - 202) + 'px';

        bibleMap.updateSize();
        map3D.map.updateSize();
    }


    function showScrMap( ){

        ConsoleLog( "showScrMap()!!!!");

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

function Create3DPopupOverlay( overlayCloser, closerEventFunc ) {

    var overlay = null;
    var localOverlayCloser = null;

    this.overlay = new ol.Overlay({
        element: document.getElementById('bubblePopup3D')
    });

    overlay = this.overlay;

/*
    var dvPopupCloser3D = document.getElementById('popup-closer3D');
    this.overlayCloser = document.getElementById('popup-closer3D');
    // this.overlayCloser = document.getElementById('popup-closer');
    */

    // this.overlayCloser = $("#popup-closer3D");
    this.overlayCloser = overlayCloser;
    localOverlayCloser = this.overlayCloser;

    // overlayCloser = this.overlayCloser;

    this.overlayCloser.onclick = function() {
        overlay.setPosition(undefined);
        localOverlayCloser.blur();

        /*
        dvPopupContent.innerHTML = "";

        map3D.remove3DLabelLayer();
        */

        closerEventFunc();

        return false;
    };
}


function gotoSearchWord() {
    $("#sideMenu").addClass("open");
    $("#bibleWord").focus();
}


function clearSearchBibleWord(){
    dvBibleWord.value = "";
    $("#bibleWord").focus();
    //alert( "clar!!");
}

function clearSearchPlaceWord(){
    // $("#searchedPoiList").hide();
    $('#searchedPoiList').empty();
    dvBiblePlace.value ="";
    $("#biblePlace").focus();
}


function showDownloading(){

    $( '#downloadingDiv' ).css( "z-index", 6100 );

    var downloading = document.getElementById("downloadingDiv");

    downloading.style.left = ((window.innerWidth * 0.5 ) - 80) + 'px';
    downloading.style.right = ((window.innerWidth * 0.5 ) - 80) + 'px';
    downloading.style.top = ((window.innerHeight * 0.5 ) - 80) + 'px';
    downloading.style.top = ((window.innerHeight * 0.5 ) - 80) + 'px';
}

function hideDownloading(){

    setCursorByID('map','default');
    setCursorByID('map3D','default');

    $("#downloadingDiv").hide();

}


/*
function eventShowLabel( ){

    if (document.querySelector('#checkShowLabel').checked) {
        bibleMapManager.showWithLabel(true);
        map3D.showWithLabel(true);
    }else {
        bibleMapManager.showWithLabel(false);
        map3D.showWithLabel(false);
    }
}
*/

function eventShowLabel( ){

    var img1 = "biblemap/image/label_on.png?version=20171208";
    var img2 = "biblemap/image/label_off.png?version=20171208";

    var showLabel2DBtn = document.getElementById("showLabel2DBtn");
    var showLabel3DBtn = document.getElementById("showLabel3DBtn");

    if( window.isShowLabel == false ) {
        bibleMapManager.showWithLabel(true);
        map3D.showWithLabel(true);
        showLabel2DBtn.src = img1;
        showLabel3DBtn.src = img1;
        window.isShowLabel = true;
    }else {
        bibleMapManager.showWithLabel(false);
        map3D.showWithLabel(false);
        showLabel2DBtn.src = img2;
        showLabel3DBtn.src = img2;
        window.isShowLabel = false;
    }
}