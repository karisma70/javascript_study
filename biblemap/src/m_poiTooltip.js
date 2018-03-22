/**
 * Created by Administrator on 2018-03-22.
 */


function mapTooltip( paramMap, cssClassName ) {
    var olMap = paramMap;

    var tooltipElement = null;
    this.tooltipArray = [];

    var zOrder = 0;

    this.create = function( poiName, linkedText, coord){

        this.allRemove();

        tooltipElement = document.createElement('div');

        // tooltipElement.className = 'tooltip tooltip-static';
        tooltipElement.className = cssClassName;

        tooltip = new ol.Overlay({
            element: tooltipElement,
            offset: [0, -15],
            positioning: 'bottom-center'
        });
        olMap.addOverlay(tooltip);

        tooltipElement.innerHTML = linkedText;


        tooltipElement.setAttribute("id", poiName );
        var strID = "#"+ poiName ;

        $(strID).css( "z-index", zOrder.toString() );

        tooltip.setPosition(coord);
       //  tooltip.setOffset([0, -7]);
        tooltip.setOffset([0, -11]);

        this.tooltipArray.push( tooltip);
        zOrder +=1;
    };

    this.allRemove = function() {

        zOrder = 0;

        if ( tooltipElement) {
            tooltipElement.parentNode.removeChild( tooltipElement );
            tooltipElement = null;
        }

        for (var idx in this.tooltipArray) {
            var tooltip = this.tooltipArray[idx];
            olMap.removeOverlay(tooltip);
        }
    };
}

function closeTooltip(){
    poiTooltip.allRemove();
}

