
// 必须放到头部，否则浏览器权限申请不成功
var geolocation = new BMap.Geolocation();
// 开启SDK辅助定位
geolocation.enableSDKLocation();

function getLocation() {
    return new Promise((resolve, reject) => {
        // 原生h5定位服务
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log('navigator: ', position)
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
            }, () => bdMapGetLocation(resolve, reject), {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            });
        } else {
            bdMapGetLocation(resolve, reject)
        }
    })
}

//百度api SDK辅助定位
function bdMapGetLocation(resolve, reject) {
    geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() == 0) {
            console.log('bdMap: ', r)

            resolve({
                // 纬度
                latitude: r.point.lat,
                // 经度
                longitude: r.point.lng
            })
        } else {
            reject('定位失败，请稍后重试');
        }
    });
}

var map;
var gpointLayers, glineLayers;
// var lods = [
//   { "level": 0, "resolution": 1.4078260157100577, "scale": 5.916575275915558 },
//   { "level": 1, "resolution": 0.703125, "scale": 2.9549759305875003 },
//   { "level": 2, "resolution": 0.3515625, "scale": 1.4774879652937 },
//   { "level": 3, "resolution": 0.17578125, "scale": 7.3874398264687517 },
//   { "level": 4, "resolution": 0.087890625, "scale": 3.693719913234375 },
//   { "level": 5, "resolution": 0.0439453125, "scale": 1.8468599566171877 },

//   { "level": 6, "resolution": 0.02197265625, "scale": 9234299.783085939 },
//   { "level": 7, "resolution": 0.010986328125, "scale": 4617149.891542969 },
//   { "level": 8, "resolution": 0.0054931640625, "scale": 2308574.9457714846 },
//   { "level": 9, "resolution": 0.00274658203125, "scale": 1154287.4728857423 },
//   { "level": 10, "resolution": 0.00274658203125, "scale": 1154287.4728857423 },


//   { "level": 11, "resolution": 6.866455078125, "scale": 288571.8682214356 },
//   { "level": 12, "resolution": 3.4332275390625, "scale": 144285.9341107178 },
//   { "level": 13, "resolution": 1.71661376953125, "scale": 72142.9670553589 },
//   { "level": 14, "resolution": 8.58306884765625, "scale": 36071.48352767945 },

//   { "level": 15, "resolution": 8.58306884765625, "scale": 36071.48352767945 },
//   { "level": 16, "resolution": 8.58306884765625, "scale": 36071.48352767945 },
//   { "level": 17, "resolution": 8.58306884765625, "scale": 36071.48352767945 },
//   { "level": 18, "resolution": 8.58306884765625, "scale": 36071.48352767945 },

//   { "level": 19, "resolution": 2.682209014892578, "scale": 1127.2338602399827 },

// ];

require([
    "esri/map",
    "esri/Credential",

    "esri/graphic",

    "esri/layers/GraphicsLayer",
    "esri/layers/ArcGISTiledMapServiceLayer",
    "esri/geometry/Point",
    "esri/geometry/Polyline",

    "esri/Color",

    "esri/symbols/SimpleLineSymbol",

    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/PictureMarkerSymbol",
    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/TextSymbol",
    "esri/symbols/Font",
    "esri/InfoTemplate",
    "esri/domUtils",
    "dojo/domReady!",
], function (
    Map,
    Credential,

    Graphic,
    GraphicsLayer,
    ArcGISTiledMapServiceLayer,
    Point,
    Polyline,

    Color,
    SimpleLineSymbol,
    SimpleMarkerSymbol,
    PictureMarkerSymbol,
    SimpleFillSymbol,
    TextSymbol,
    Font,
    InfoTemplate,
    domUtils
) {
    map = new Map("map", {
        center: [120.82, 32.03],
        zoom: 15,
        slider: true
    });

    $('#toggle-button').click(() => {
        console.log(domUtils.getNode(document.querySelector('.target_node')))
        let node = domUtils.toggle(document.querySelector('.target_node'))
    })


    var mapService = new ArcGISTiledMapServiceLayer(
        "https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetWarm/MapServer",
        {
            showAttribution: true
        }
    );
    map.addLayer(mapService);


    // 画点
    function addPoints(points) {
        var pointLayers = new GraphicsLayer({
            id: "point",
        });
        const infoTemp = new InfoTemplate({
            title: "污水井",
            content: "名称：${Subsid}<br/>编号： ${WYSBM}",
        });
        points.forEach((item) => {
            let { geometry, symbol, txtSymbol } = _generatePoint(item);

            pointLayers.add(new Graphic(geometry, symbol, item, infoTemp));
            pointLayers.add(new Graphic(geometry, txtSymbol));
        });
        gpointLayers = pointLayers;
        map.addLayer(pointLayers);
    }

    function _generatePoint(item) {
        var pt = new Point({
            latitude: item.X,
            longitude: item.Y,
        });

        let url = item.Subsid == '窨井' ? './images/1.png' : './images/2.png'
        var sms = new PictureMarkerSymbol(url, 20, 20);
        var txtSymbol = new TextSymbol(item.Exp_No, new Font('12px'), new Color([18, 150, 219, 1])).setOffset(20, 20)

        return {
            geometry: pt,
            symbol: sms,
            txtSymbol
        };
    }

    // 画线
    function addLines(paths) {
        var lineLayers = new GraphicsLayer({
            id: "lines",
        });

        let result = [];
        paths.forEach((path) => {
            result.push(new Polyline({
                paths: [path],
                spatialReference: { wkid: 4326 },
            }));
        });

        var sls = new SimpleLineSymbol(
            SimpleLineSymbol.STYLE_SOLID,
            new Color([0, 0, 0, 255]),
            2
        );

        result.forEach(item => {
            lineLayers.add(new Graphic(item, sls));
        })

        glineLayers = lineLayers;
        console.log(lineLayers);
        map.addLayer(lineLayers);
    }

    $(".switch").on("click", function () {
        if ($(this).find("input[type='checkbox']")) {
            let target;
            let checked = $(this)
                .find("input[type='checkbox']")
                .prop("checked");
            let type = $(this)
                .find("input[type='checkbox']")
                .data("layer-type");
            console.log(type);
            target = type == "point" ? gpointLayers : glineLayers;

            checked ? target.show() : target.hide();
        }
    });

    $("#recenter").click(function () {
        map.centerAt(new Point([120.82, 32.03]));
    });

    // 定位
    $('#getPosition').click(function () {
        getLocation().then((position) => {
            let { latitude, longitude } = position
            console.log(position)
            addCurrentPosition({
                X: latitude,
                Y: longitude
            })
        }).catch(() => {
            alert('定位失败，请稍后再试')
        })
    })

    // 根据当前定位生成标记
    function addCurrentPosition(point) {
        // 定位图层
        var currentPointLayer = new GraphicsLayer({
            id: "current-point",
        });
        // 根据经纬度生成定位点
        var pt = new Point({
            latitude: point.X,
            longitude: point.Y,
        });
        // 制作图片标记
        var symbol = new PictureMarkerSymbol('/images/position-fill.png', 20, 20);
        // 加到图层
        currentPointLayer.add(new Graphic(pt, symbol));
        // 添加到地图
        map.addLayer(currentPointLayer);
        setTimeout(() => {
            map.centerAt(pt)
        }, 500)
        console.log('定位成功')
    }

    $.get("./data.json", function (res) {
        let linePaths = [];
        let points = [];

        _.forEach(res, (item) => {
            let { E_GEO, S_GEO } = item;
            points = [...points, S_GEO, E_GEO];

            linePaths.push([[S_GEO.Y, S_GEO.X], [E_GEO.Y, E_GEO.X]]);
        });

        /*
        addPoints(points);
        addLines(linePaths);
*/
    });
});