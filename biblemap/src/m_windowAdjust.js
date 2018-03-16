/**
 * Created by Administrator on 2018-03-16.
 */

var createFooterMenu = (function() {



     function CreateFooter(){

         var footer = document.getElementById('footer');
         var mapView = document.getElementById('map');

         var tabMenuBar = document.getElementById("tabsMenu");
         var tab_contain = document.getElementById("tab_contain");

         var tab1 = document.getElementById("tab1");
         var tab2 = document.getElementById("tab2");
         var tab3 = document.getElementById("tab3");
         var tab4 = document.getElementById("tab4");

         var upArrow = document.getElementById("footUpArrow");
         var downArrow = document.getElementById("footDownArrow");

         this.mode = "hide";    // "hide", "bottom", "middle", "top";
         // this.mode = "middle";    // "hide", "bottom", "middle", "top";

         this.setMode = function( paramMode ){
            this.mode = paramMode;
         };

         this.getMode = function(){
             return this.mode;
         };

         this.showControl = function(){
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

             footer.style.top = 41 + 'px';
             footer.style.left = 0 + 'px';
             footer.style.right = 0 + 'px';
             footer.style.bottom = 0 + 'px';

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

             bibleMap.updateSize();

             $("#tabsMenu").show();
             $("#tab_contain").show();
             // $("#tab1").show();
             // $("#tab1Title").show();

             $("#footer").show();

             $("#footUpArrow").hide();
             $("#footDownArrow").show();

             downArrow.style.top = 0 + 'px';
             downArrow.style.left = window.innerWidth - 40 + 'px';
             downArrow.style.right = 0 + 'px';
             downArrow.style.bottom = 0 + 'px';
         };

         this.bottom = function(){
             this.mode = "bottom";
             var mapHeight = window.innerHeight * 0.50;

             mapView.style.left = 0 + 'px';
             mapView.style.right = 0 + 'px';
             mapView.style.top = 41 + 'px';
             mapView.style.bottom = 33 + 'px';


             footer.style.top = (window.innerHeight - 33) + 'px';
             footer.style.left = 0 + 'px';
             footer.style.right = 0 + 'px';
             footer.style.bottom = 0 + 'px';

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

             $("#tabsMenu").hide();
             $("#tab_contain").hide();
             // $("#tab1").hide();
             // $("#tab1Title").hide();

             $("#footer").show();

             $("#footUpArrow").show();
             $("#footDownArrow").hide();

             upArrow.style.top = 0 + 'px';
             upArrow.style.left = window.innerWidth - 40 + 'px';
             upArrow.style.right = 0 + 'px';
             upArrow.style.bottom = 0 + 'px';

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
            // $("#tab1").show();
            // $("#tab1Title").show();

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

