/**
 * Created by Administrator on 2018-03-12.
 */

var mobileBibleMapPointLayers = [

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    { url: 'level_12_poi',  order: 19, style: {
        visibleRange : { max : 25 , min : 13 },
        textStroke : { prop: 'label', align: 'center', baseline: 'middle', font : 'normal 16px Nanum Gothic', color: "white", outlineColor : "black", outlineWidth : 1  }}
    },

    { url: 'level_11_poi',  order: 20, style: {
        visibleRange : { max : 25 , min : 10.3 },
        textStroke : { prop: 'label', align: 'center', baseline: 'middle', font : 'normal 16px Nanum Gothic', color: "white", outlineColor : "black", outlineWidth : 1  }}
    },


    { url: 'level_10_poi',  order: 21, style: {
        visibleRange : { max : 25 , min : 9.5 },
        textStroke : { prop: 'label', align: 'center', baseline: 'middle', font : 'normal 16px Nanum Gothic', color: "white", outlineColor : "#313132", outlineWidth : 1  } }
    },


    { url : 'level_9_poi',  order: 22, style: {
        visibleRange : { max : 25 , min : 8.5 },
        // textStroke : { prop: 'label', align: 'center', baseline: 'middle', font : 'normal 12px Nanum Gothic', color: "white", outlineColor : "#9b490d", outlineWidth : 2  } }   // 191970
        textStroke : { prop: 'label', align: 'center', baseline: 'middle', font : 'normal 16px Nanum Gothic', color: "white", outlineColor : "#191970", outlineWidth : 1  } }   // 191970
    },

    { url: 'history/History_12Sect_poi',  order: 13, style: {
        visibleRange : { max : 9.5, min : 7.5 },
        // textStroke : { prop: 'label', align: 'center', baseline: 'center', font : 'normal 13px Nanum Gothic', color: '#E7E5E5', outlineColor : '#5F0291', outlineWidth : 3  }}
        textStroke : { prop: 'label', align: 'center', baseline: 'middle', font : 'normal 16px Nanum Gothic', color: "#E7E5E5", outlineColor : "#5F0291", outlineWidth : 1  } }  //3e636a
    },

    { url : 'level_7_poi',  order: 24, style: {
        visibleRange : { max : 25 , min : 7 },
        textStroke : { prop: 'label', align: 'center', baseline: 'middle', font : 'normal 16px Nanum Gothic', color: "white", outlineColor : "#3737FF", outlineWidth : 1  } }  //3e636a
    },

    { url: 'level_6_poi',  order: 25, style: {
        visibleRange : { max : 25 , min : 6 },
        textStroke : { prop: 'label', align: 'center', baseline: 'middle', font : 'normal 16px Nanum Gothic', color: '#E7E5E5', outlineColor : '#033078', outlineWidth : 1  }}
    },

    {
        url: 'level_4_poi',  order: 26, style: {
        visibleRange : { max : 9 , min : 4 },
        // textStroke : { prop: 'label', align: 'center', baseline: 'center', font : 'normal 13px Nanum Gothic', color: '#E7E5E5', outlineColor : '#105602', outlineWidth : 4  }}
        textStroke : { prop: 'label', align: 'center', baseline: 'middle', font : 'normal 17px Nanum Gothic', color: "#E7E5E5", outlineColor : "#105602", outlineWidth : 1  } }  //3e636a
    }
];
