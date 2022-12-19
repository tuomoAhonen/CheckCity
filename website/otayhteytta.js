let map;

function initMap() {
    
    // Kartan luonti keskipisteellä ja zoomauksen asetuksella
    map = new google.maps.Map(document.getElementById("kartta"), {
        center: new google.maps.LatLng(60.210000, 25.015),
        zoom: 12,
    });

    const helsinkiBorderCoordinates = [
        { lat: 60.079952493754824, lng: 24.804266194417693 },
        { lat: 60.10270453363261, lng: 24.78656219813795 },
        { lat: 60.13049249218072, lng: 24.834459410746106 },
        { lat: 60.14845923253935, lng: 24.838414904105 },
        { lat: 60.15051985533612, lng: 24.840164087528745 },
        { lat: 60.15953252345076, lng: 24.841408632511655 },
        { lat: 60.16530696713631, lng: 24.844326875919858 },
        { lat: 60.18075018941855, lng: 24.84327396671927 },
        { lat: 60.20597447084436, lng: 24.84471460363903 },
        { lat: 60.21439898314584, lng: 24.844534535159543 },
        { lat: 60.217767125121156, lng: 24.846251148929074 },
        { lat: 60.21958237437087, lng: 24.84758152460046 },
        { lat: 60.22147967307851, lng: 24.8475977179504 },
        { lat: 60.22223043476984, lng: 24.84022985285585 },
        { lat: 60.230161211178704, lng: 24.836174320705826 },
        { lat: 60.25332450605648, lng: 24.8316646943998 },
        { lat: 60.25729044336799, lng: 24.83296256705531 },
        { lat: 60.259096314453714, lng: 24.837221121707106 },
        { lat: 60.259161346812036, lng: 24.838556861796523 },
        { lat: 60.254601145989874, lng: 24.86267197578738 },
        { lat: 60.25395172409706, lng: 24.86856934676386 },
        { lat: 60.26320306288912, lng: 24.88384124879469 },
        { lat: 60.26841182550431, lng: 24.89233243913562 },
        { lat: 60.270923713403356, lng: 24.90780964306749 },
        { lat: 60.2795629404292, lng: 24.950124172486436 },
        { lat: 60.27608309401353, lng: 24.957936003208168 },
        { lat: 60.26467591638068, lng: 24.972183897495277 },
        { lat: 60.27972261638789, lng: 24.979565336704262 },
        { lat: 60.28647241467874, lng: 24.985062543081085 },
        { lat: 60.28664034536156, lng: 25.004906344402745 },
        { lat: 60.28795914995246, lng: 25.008382487286045 },
        { lat: 60.28968202419845, lng: 25.02147166727872 },
        { lat: 60.28634539538838, lng: 25.032562168510662 },
        { lat: 60.28779947160068, lng: 25.0370426533299 },
        { lat: 60.28005675264046, lng: 25.047789104282856 },
        { lat: 60.27874408655471, lng: 25.065982634575764 },
        { lat: 60.27688882524423, lng: 25.078575396874328 },
        { lat: 60.27360346103175, lng: 25.090377404475053 },
        { lat: 60.26338748985677, lng: 25.088403298640092 },
        { lat: 60.25836346772054, lng: 25.090034081721146 },
        { lat: 60.24809231855037, lng: 25.08656645852632 },
        { lat: 60.243259023642416, lng: 25.10808156717815 },
        { lat: 60.24054474691261, lng: 25.119401267275016 },
        { lat: 60.24075776072475, lng: 25.134936621889274 },
        { lat: 60.250259580884546, lng: 25.15533840109483 },
        { lat: 60.260717790980664, lng: 25.13898670702642 },
        { lat: 60.268843214389584, lng: 25.13565623540729 },
        { lat: 60.284140327076635, lng: 25.19666044652059 },
        { lat: 60.30028364377425, lng: 25.235120328049057 },
        { lat: 60.29985838911213, lng: 25.25426057157933 },
        { lat: 60.27284338389734, lng: 25.25022652922093 },
        { lat: 60.27073681426447, lng: 25.235715593388637 },
        { lat: 60.256313247671116, lng: 25.233998979619106 },
        { lat: 60.24667009272139, lng: 25.242362224234384 },
        { lat: 60.24395730163125, lng: 25.225902978839326 },
        { lat: 60.22552745082367, lng: 25.205576863429798 },
        { lat: 60.19940849973152, lng: 25.2207833307473 },
        { lat: 60.12925729647112, lng: 25.199978544712074 },
        { lat: 60.080668898564255, lng: 25.156017122530045 },

        // { lat: , lng:  },
    ];

    var helsinkiBorder = new google.maps.Polyline({
        path: helsinkiBorderCoordinates,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
    });

    helsinkiBorder.setMap(map);

    const myLatlng = { lat: 60.210000, lng: 25.015 };
    const geocoder = new google.maps.Geocoder();

    // Create the initial InfoWindow.
    let infoWindow = new google.maps.InfoWindow({
        content: "Click the map to get Lat/Lng!",
        position: myLatlng,
    });

    // Configure the click listener.
    map.addListener("click", (mapsMouseEvent) => {
        // Close the current InfoWindow.
        infoWindow.close();

        // Create a new InfoWindow.
        infoWindow = new google.maps.InfoWindow({
            position: mapsMouseEvent.latLng,
        });

        //console.log(mapsMouseEvent.latLng.lat());
        //console.log(mapsMouseEvent.latLng);

        geocoder
        .geocode({ location: mapsMouseEvent.latLng })
        .then((response) => {
            if (response.results[0]) {
                if (response.results[0].formatted_address.includes("+")) {
                    infoWindow.setContent(
                        "Osoite tietoja ei ole tällä asteikolla <br/>"+
                        "Leveysaste: "+mapsMouseEvent.latLng.lat()+"<br/>"+
                        "Pituusaste: "+mapsMouseEvent.latLng.lng(),
                    );
                } else {
                    infoWindow.setContent(
                        "Osoite: "+response.results[0].formatted_address+" "+
                        "<button type='button' class='vaihdaButton' onClick='vaihdaOsoite(vaihda.value)' id='vaihda' value='"+response.results[0].formatted_address+"'>Vaihda osoitteeksi</button><br/>"+
                        "<p class='pAsteet'>Leveysaste: "+mapsMouseEvent.latLng.lat()+"<input id='piilotettuLeveysaste' type='hidden' value='"+mapsMouseEvent.latLng.lat()+"'></p>"+
                        "<p class='pAsteet'>Pituusaste: "+mapsMouseEvent.latLng.lng()+"<input id='piilotettuPituusaste' type='hidden' value='"+mapsMouseEvent.latLng.lng()+"'></p>",
                    );
                }
            } else {
                window.alert("Ei löytynyt");
            }
        })
        .catch((error) => window.alert("Geocoder ei toiminut, jotain meni vikaan: " + error))

        infoWindow.open(map);
    });
};

function vaihdaOsoite(vaihdettavaosoite) {
    //console.log(vaihdettavaosoite);
    var splitosoite = vaihdettavaosoite.split(",");
    var katuosoite =  "";
    var postinumero = "";
    var kaupunki = "";

    //console.log(splitosoite);
    //console.log(splitosoite.length);

    if (splitosoite.length == 3) {
        katuosoite = splitosoite[splitosoite.length-3];
    } else if (splitosoite.length > 3) {
        katuosoite = splitosoite[splitosoite.length-3].slice(1);
    } else {
        katuosoite = splitosoite[0];
    }

    //console.log(splitosoite);

    //console.log(splitosoite.includes("Helsinki"));

    if (splitosoite[splitosoite.length-2].includes("Helsinki") || splitosoite[splitosoite.length-1].includes("Helsinki") || splitosoite[0].includes("Helsinki")) {
        if (splitosoite.length>=3) {
            if (splitosoite[splitosoite.length-2].length == 15) {
                postinumero = splitosoite[splitosoite.length-2].slice(1, 6);
                kaupunki = splitosoite[splitosoite.length-2].slice(7);
                syotetaanOsoite();
            } else { 
                kaupunki = splitosoite[splitosoite.length-2].slice(1);
                window.alert("Osoitetiedoista puuttuu postinumero. Lisää se manuaalisesti.");
                syotetaanOsoite();
            }
        } else if (splitosoite.length == 2) {
            if (splitosoite[splitosoite.length-1].length == 15) {
                postinumero = splitosoite[splitosoite.length-1].slice(1, 6);
                kaupunki = splitosoite[splitosoite.length-1].slice(7);
                syotetaanOsoite();
            } else { 
                kaupunki = splitosoite[splitosoite.length-1].slice(1);
                window.alert("Osoitetiedoista puuttuu postinumero. Lisää se manuaalisesti.");
                syotetaanOsoite();
            }
        } else {
            window.alert("Osoitetiedot puutteellisia. Syötä manuaalisesti.")
        }
    } else {
        window.alert("Osoitteen pitää sijaita Helsingissä. Syötä manuaalisesti osoitetiedot & kordinaatit, jos se sijaitsee Helsingissä.");
    }

    function syotetaanOsoite() {
        document.getElementById("katuosoite").value = katuosoite;
        document.getElementById("postinumero").value = postinumero;
        document.getElementById("leveysaste").value = document.getElementById("piilotettuLeveysaste").value;
        document.getElementById("pituusaste").value = document.getElementById("piilotettuPituusaste").value;

        map.setZoom(12);
        //map.setCenter(new google.maps.LatLng(document.getElementById("piilotettuLeveysaste").value, document.getElementById("piilotettuPituusaste").value)); <-- pitää kartan keskipisteen sijainnin kohdalla
        //alempi vaihtoehto vie kartan takaisin default kohtaan
        map.setCenter(new google.maps.LatLng(60.210000, 25.015));
    }
    
    /*
    if (splitosoite.length == 3) {
        katuosoite =  splitosoite[0];
        if (splitosoite[1].length == 15 ) {
            postinumero = splitosoite[1].slice(1, 6);
            kaupunki = splitosoite[1].slice(7);
        } else {
            if (/[0-9]/.test(splitosoite[1])) {
                postinumero = splitosoite[1].slice(1);
                window.alert("Osoitetiedoista puuttuu Helsinki tai se ei ole Helsingin alueella. Lisää manuaalisesti.");
            } else {
                kaupunki = splitosoite[1].slice(1);
            }
        }
    } else if (splitosoite.length == 4) {
        katuosoite =  splitosoite[1];
        if (splitosoite[2].length == 15 ) {
            postinumero = splitosoite[2].slice(1, 6);
            kaupunki = splitosoite[2].slice(7);
        } else {
            if (/[0-9]/.test(splitosoite[2])) {
                postinumero = splitosoite[2].slice(1);
            } else {
                kaupunki = splitosoite[2].slice(1);
            }
        }
    } else if (splitosoite.length < 3) {
        window.alert("Osoitetietoja luultavasti puuttuu. Syötä manuaalisesti kaikki osoitetiedot.");
    } else {
        window.alert("Tarkasta osoitetiedot. Syötä manuaalisesti kaikki osoitetiedot.")
    }
    */
    
    //console.log(splitosoite);
    //console.log(katuosoite);
    //console.log(postinumero);
    //console.log(kaupunki);
}

function haeAsteet() {
    var katuosoite = document.getElementById("katuosoite").value;
    var postinumero = document.getElementById("postinumero").value;
    var osoite = katuosoite+", "+postinumero+" Helsinki, Suomi";

    if (katuosoite && postinumero) {
        //initMap();
        const geocoder = new google.maps.Geocoder();
        //console.log("Tänne päästiin");
        geocoder
        .geocode({ address: osoite })
        .then((response) => {
            //console.log(response);
            //console.log(response.results);
            if (response.results[0]) {
                var kaupunki = response.results[0].formatted_address.split(",", 2);
                kaupunki = kaupunki[1].slice(7);
                if(kaupunki == "Helsinki") {
                    document.getElementById("leveysaste").value = response.results[0].geometry.location.lat();
                    document.getElementById("pituusaste").value = response.results[0].geometry.location.lng();
                    //console.log("Tänne päästiin 2");
                } else {
                    window.alert("Osoitteen pitää sijaita Helsingissä. Kokeile uudelleen.");
                }
            } else {
                window.alert("Ei löytynyt");
            }
        })
        .catch((error) => window.alert("Geocoder ei toiminut, jotain meni vikaan: " + error))
    } else {
        window.alert("Anna katuosoite & postinumero.");
    }
}

window.initMap = initMap;