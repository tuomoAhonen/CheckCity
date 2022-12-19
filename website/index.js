/*
let connection = "postgres://admin:admin1234@localhost:5432/checkcity";

fetch('')
.then(function (response) {
    return response.json();
})
.then(function (responseJSON) {
    setKohteet(responseJSON);
    console.log("toimii");
})
.catch(function (error) {
    console.log(error);
})

function setKohteet(jsondata) {
    console.log(jsondata);
    //kohteet = jsondata;
}
*/

let map;
let kohteet = [
    { id: 0, nimi: "Helsingin Olympiastadion", kuvaus: "Järjestetään konsertteja & urheilutapahtumia.", kotisivu: "", leveysaste: 60.18645120000001, pituusaste: 24.9260306, sijainninkuvaus: "", katuosoite: "Paavo Nurmen tie 1", postinumero: "00250", kaupunki: "Helsinki", maa: "Suomi", kategoria: "Urheilu", display: 1, aktiivinen: 1, marker: [] },
    { id: 1, nimi: "Ravintola Lie Mi", kuvaus: "Aasialainen fuusio ravintola.", kotisivu: "", leveysaste: 60.1810886, pituusaste: 24.9252698, sijainninkuvaus: "", katuosoite: "Runeberginkatu 56", postinumero: "00260", kaupunki: "Helsinki", maa: "Suomi", kategoria: "Ravintolat", display: 1, aktiivinen: 1, marker: [] },
    { id: 2, nimi: "Sibeliuksen Monumentti", kuvaus: "Muistomerkki Sibeliuksen kunniaksi.", kotisivu: "", leveysaste: 60.182112, pituusaste: 24.913397, sijainninkuvaus: "", katuosoite: "Sibeliuksen puisto, Mechelininkatu 37-38", postinumero: "00250", kaupunki: "Helsinki", maa: "Suomi", kategoria: "Nähtävyydet", display: 1, aktiivinen: 1, marker: [] },
    { id: 3, nimi: "Kulttuuritalo", kuvaus: "Alvar Aallon suunnittelema talo, jossa järjestetään kulttuuritapahtumia.", kotisivu: "", leveysaste: 60.188228660261615, pituusaste: 24.944317937909943, sijainninkuvaus: "", katuosoite: "Sturenkatu 4", postinumero: "00510", kaupunki: "Helsinki", maa: "Suomi", kategoria: "Kulttuuri", display: 1, aktiivinen: 1, marker: [] },
    { id: 4, nimi: "J.Erving", kuvaus: "Kenkäkauppa & suutaripalvelu.", kotisivu: "", leveysaste: 60.1749596, pituusaste: 24.9273675, sijainninkuvaus: "", katuosoite: "Museokatu 9", postinumero: "00100", kaupunki: "Helsinki", maa: "Suomi", kategoria: "Palvelut", display: 1, aktiivinen: 1, marker: [] },
    { id: 5, nimi: "Töölön kisahalli", kuvaus: "Mahdollisuus treenata eri urheilulajeja.", kotisivu: "", leveysaste: 60.1834251, pituusaste: 24.9257062, sijainninkuvaus: "", katuosoite: "Paavo Nurmen kuja 1 C", postinumero: "00250", kaupunki: "Helsinki", maa: "Suomi", kategoria: "Treenaaminen", display: 1, aktiivinen: 1, marker: [] },
    { id: 6, nimi: "Flow Festival", kuvaus: "Flow Festival is a leading European music and arts boutique festival taking place in a historic power plant area in the capital of Finland, Helsinki.", kotisivu: "", leveysaste: 60.184572, pituusaste: 24.9678667, sijainninkuvaus: "", katuosoite: "Parrukatu", postinumero: "00540", kaupunki: "Helsinki", maa: "Suomi", kategoria: "Tapahtumat", display: 1, aktiivinen: 1, marker: [] },
];
let kategoriat = [
    { id: 0, kategoria: "Kulttuuri", display: 1 },
    { id: 1, kategoria: "Nähtävyydet", display: 1 },
    { id: 2, kategoria: "Palvelut", display: 1 },
    { id: 3, kategoria: "Ravintolat", display: 1 },
    { id: 4, kategoria: "Tapahtumat", display: 1 },
    { id: 5, kategoria: "Treenaaminen", display: 1 },
    { id: 6, kategoria: "Urheilu", display: 1 },
];
//let infoWindows = [];
let openInfoWindows = [];
//let markers = [];
let mapStyles = [
    {
        "featureType": "poi.attraction",
        "stylers": [
        {
            "visibility": "off"
        }
        ]
    },
    {
        "featureType": "poi.business",
        "stylers": [
        {
            "visibility": "off"
        }
        ]
    },
    {
        "featureType": "poi.government",
        "stylers": [
        {
            "visibility": "off"
        }
        ]
    },
    {
        "featureType": "poi.medical",
        "stylers": [
        {
            "visibility": "off"
        }
        ]
    },
    {
        "featureType": "poi.place_of_worship",
        "stylers": [
        {
            "visibility": "off"
        }
        ]
    },
    {
        "featureType": "poi.school",
        "stylers": [
        {
            "visibility": "off"
        }
        ]
    },
    {
        "featureType": "poi.sports_complex",
        "stylers": [
        {
            "visibility": "off"
        }
        ]
    }
];
savedinput = "";
savedids = [];
savedkohteet = [];

function kohteetSetDisplayToOne() {
    for (let i = 0; i < kohteet.length; i++) {
        kohteet[i].display = 1;
    }
};

kohteetSetDisplayToOne();

function initMap() {
    // Kartan luonti keskipisteellä ja zoomauksen asetuksella
    map = new google.maps.Map(document.getElementById("map"), {
        center: new google.maps.LatLng(60.210000, 25.015),
        zoom: 12,
        styles: mapStyles,
        //mapTypeId: "HYBRID",
    });

    //map.setMapTypeId(google.maps.MapTypeId.HYBRID);

    /*let infoWindow = new google.maps.InfoWindow({
        content: "",
    });*/
    
    kohteetDisplay();
    //markersListeners();
    //console.log(map);
};

function kategoriaIs(kategoria) {
    let kategoriaurl = "";

    if (kategoria == "Kulttuuri") { 
        kategoriaurl = "./cultureiconfinal2.png";
    } else if (kategoria == "Nähtävyydet") { 
        kategoriaurl = "./sightseeingsiconfinal3.png";
    } else if (kategoria == "Palvelut") { 
        kategoriaurl = "./servicesiconfinal2.png";
    } else if (kategoria == "Ravintolat") { 
        kategoriaurl = "./restaurantsiconfinal7.png";
    } else if (kategoria == "Tapahtumat") { 
        kategoriaurl = "./eventsiconfinal5.png";
    } else if (kategoria == "Treenaaminen") { 
        kategoriaurl = "./treeniiconfinal.png";
    } else if (kategoria == "Urheilu") {
        kategoriaurl = "./sportsiconfinal32v7.png";
    } else {
        // Jos kategoriaa ei ole määritelty tai se ei vastaa mitään kategoriat[]-taulukon kategoriaa, niin kategorialle asetetaan tällä hetkellä googlen oma info icon.
        kategoriaurl = "https://developers.google.com/maps/documentation/javascript/examples/full/images/info-i_maps.png";
    }

    return kategoriaurl;
}

function kohteetDisplay() {
    //infoWindows.length = 0;
    //markers.length = 0;
    for (let i = 0; i < kohteet.length; i++) {
        if (kohteet[i].display == 1) {
            let marker = new google.maps.Marker({
                position: new google.maps.LatLng(kohteet[i].leveysaste, kohteet[i].pituusaste),
                icon: kategoriaIs(kohteet[i].kategoria),
                map: map,
            });

            let contentString = "";

            //contentString += "<div class=''>";
            contentString += "<div class='iw-title'><b>"+kohteet[i].nimi+"</b></div>";
            contentString += "<p class='kuplateksti'>"+kohteet[i].kuvaus+"</p>";
            contentString += "<p class='kuplateksti'>"+kohteet[i].katuosoite+", "+kohteet[i].postinumero+" "+kohteet[i].kaupunki+", "+kohteet[i].maa+"</p>";
            //contentString += "</div>";

            let infoWindow = new google.maps.InfoWindow({
                content: contentString,
            });

            infoWindow.addListener('closeclick', () => {
                // Handle focus manually.
                //console.log("suljettiin infowindow");
                openInfoWindows.length = 0;
            });

            /*
            if (infoWindows.length < kohteet.length) {
                infoWindows.push({id: i, infoWindow});
                //console.log(infoWindows.length);
            }
            */

            if (kohteet[i].marker.length == 0) {
                //console.log(marker);
                kohteet[i].marker.push(marker);
                kohteet[i].marker.push(infoWindow);
                //console.log(kohteet[i].marker);
            } 
            
            
            kohteet[i].marker[0].addListener("click", () => {
                
                if (openInfoWindows.length > 0 ) {
                    for (let j = 0; j < kohteet.length; j++) {
                        if (openInfoWindows[0] == kohteet[j].id) {
                            kohteet[j].marker[1].close();
                        }
                    }

                    if (kohteet[i].id == openInfoWindows[0]) {
                        //console.log("if-lause nollaa");
                        openInfoWindows.length = 0;
                        return;
                    }

                    openInfoWindows.length = 0;
                }
                kohteet[i].marker[1].open({
                    anchor: kohteet[i].marker[0],
                    map,
                });
                //console.log(openInfoWindows.length);
                openInfoWindows.push(kohteet[i].id);
                //console.log(openInfoWindows.length);
                //console.log(openInfoWindows);    
            });
            

            map.addListener("click", () => {
                kohteet[i].marker[1].close();
                openInfoWindows.length = 0;
            });

            //console.log(marker);
            /*
            if (markers.length < kohteet.length) {
                markers.push({id: i, marker});
                //console.log(markers.length);
                //console.log(markers.length+" Markers pituus");
                //console.log(kohteet.length+" Kohteet pituus");
                //console.log(markers);
                //console.log(markers.length);
            }
            */
            
        };
    };

    /*
    for (let i = 0; i < kohteet.length; i++) {
        kohteet[i].marker[0].addListener("click", () => {
            for (let j = 0; j < kohteet.length; j++) {
                if (kohteet[j].marker[1].getMap()) {
                    kohteet[j].marker[1].close();
                }
            }

            if (kohteet[i].marker[1].getMap()) {
                kohteet[i].marker[1].close();
            } else {
                kohteet[i].marker[1].open({
                    anchor: kohteet[i].marker[0],
                    map,
                });
            }
        });
    }
    */

    //console.log(kohteet);
    //console.log(markers);
}

function kategoriaDisplay(paramid) {
    closeOpenInfoWindows();
    //console.log("savedids");
    //console.log(savedids);

    //console.log("paramid");
    //console.log(paramid);

    //let valittuKategoria = paramid;
    //console.log(valittuKategoria);

    if (paramid.constructor === Array) {
        //console.log("Array");
        //console.log(paramid);

        for (let i = 0; i < kategoriat.length; i++) {
            kategoriat[i].display = 0;
            //console.log(kategoriat[i].display);
        };

        for (let i = 0; i < kategoriat.length; i++) {
            for (let j = 0; j < paramid.length; j++) {
                if (kategoriat[i].id == paramid[j]) {
                    kategoriat[i].display = 1;
                    //console.log(kategoriat[i].display);
                }
            }
        }; 

    } else {
        //console.log("Ei oo array");

        for (let i = 0; i < kategoriat.length; i++) {
            if ( kategoriat[i].id == paramid ) {
                kategoriat[i].display = 1;
                //console.log(kategoriat[i].display);
            } else {
                kategoriat[i].display = 0;
                //console.log(kategoriat[i].display);
            };
        };

        for (let i = 0; i < kategoriat.length; i++) {
            if (kategoriat[i].display == 1) {
                for (let j = 0; j < kohteet.length; j++) {
                    //console.log(kohteet[j].kategoria);
                    //console.log(kategoriat[i].kategoria);
                    if (kohteet[j].kategoria == kategoriat[i].kategoria) {
                        kohteet[j].display = 1;
                    } else {
                        kohteet[j].display = 0;
                    }
                }
            }
        }
    }

    //kohteetDisplay();
    //initMap();
    valitutKohteetDisplay();
    // <--- initMap(); takaisin, jos kohteetDisplay():llä ei toimi
    //console.log(map);

    //console.log(kohteet);
    //console.log(kategoriat);
    kategoriatValikko();
    servicesSide();
    etsi();
    //console.log(kategoriat);
    
};

function kategoriaTakaisin() {
    closeOpenInfoWindows();
    
    for (let i = 0; i < kategoriat.length; i++) {
        kategoriat[i].display = 1;
    }

    for (let j = 0; j < kohteet.length; j++) {
        kohteet[j].display = 1;
    }

    savedinput = "";
    savedids.length = 0;
    savedkohteet.length = 0;

    //initMap();
    valitutKohteetDisplay();
    kategoriatValikko();
    servicesSide();
    etsi();
    document.getElementById("search-bar").focus();
};

function takaisin() {
    closeOpenInfoWindows();

    for (let i = 0; i < kategoriat.length; i++) {
        kategoriat[i].display = 0;
        //console.log(kategoriat[i].display);
    };

    for (let i = 0; i < kategoriat.length; i++) {
        for (let j = 0; j < savedids.length; j++) {
            if (kategoriat[i].id == savedids[j]) {
                kategoriat[i].display = 1;
                //console.log(kategoriat[i].display);
            }
        }
    };

    for (let i = 0; i < kohteet.length; i++) {
        kohteet[i].display = 0;
        //console.log(kategoriat[i].display);
    };

    for (let i = 0; i < kohteet.length; i++) {
        for (let j = 0; j < savedkohteet.length; j++) {
            //console.log("kohteet id");
            //console.log(kohteet[i].id);
            //console.log("savedkohteet id");
            //console.log(savedkohteet[j]);
            if (kohteet[i].id == savedkohteet[j]) {
                kohteet[i].display = 1;
                //console.log(kategoriat[i].display);
            }
        }
    };

    //initMap();
    valitutKohteetDisplay();
    kategoriatValikko();
    servicesSide();
    etsi();
    document.getElementById("search-bar").focus();
}

function kategoriatValikko() {
    let teksti = "";
    let laskuri = 0;
    teksti="<input type='text' class='search-bar' id='search-bar' placeholder='Etsi...'><ul>";

    for (let i = 0; i < kategoriat.length; i++) {
        if (kategoriat[i].display == 1) {
            laskuri++;
        }
    };

    //console.log(savedids);

    if (savedids.length > 1 && laskuri == 1) {
        teksti=teksti+"<li><button type='button' onclick='kategoriaTakaisin()' id='takaisin-button' class='takaisin-button'>Kaikki</button></li>";
        teksti=teksti+"<li><button type='button' onclick='takaisin()' id='takaisin-button' class='takaisin-button'>Takaisin</button></li>";
    } else if (laskuri<kategoriat.length) {
        teksti=teksti+"<li><button type='button' onclick='kategoriaTakaisin()' id='takaisin-button' class='takaisin-button'>Kaikki</button></li>";
    } /*else {
        teksti=teksti+"<br/>"
    };*/

    for (let i = 0; i < kategoriat.length; i++) {
        if (kategoriat[i].display == 1) {
            if (kategoriat[i].kategoria == "Kulttuuri") {
                teksti=teksti+"<li><a href='#' onclick='kategoriaDisplay("+kategoriat[i].id+");return false;'>"+kategoriat[i].kategoria+"<img class='iconfloat' src='cultureiconfinal2.png' alt=''></a></li>";
            } else if (kategoriat[i].kategoria == "Nähtävyydet") {
                teksti=teksti+"<li><a href='#' onclick='kategoriaDisplay("+kategoriat[i].id+");return false;'>"+kategoriat[i].kategoria+"<img class='iconfloat' src='sightseeingsiconfinal3.png' alt=''></a></li>";
            } else if (kategoriat[i].kategoria == "Palvelut") {
                teksti=teksti+"<li><a href='#' onclick='kategoriaDisplay("+kategoriat[i].id+");return false;'>"+kategoriat[i].kategoria+"<img class='iconfloat' src='servicesiconfinal2.png' alt=''></a></li>";
            } else if (kategoriat[i].kategoria == "Ravintolat") {
                teksti=teksti+"<li><a href='#' onclick='kategoriaDisplay("+kategoriat[i].id+");return false;'>"+kategoriat[i].kategoria+"<img class='iconfloat' src='restaurantsiconfinal7.png' alt=''></a></li>";
            } else if (kategoriat[i].kategoria == "Tapahtumat") {
                teksti=teksti+"<li><a href='#' onclick='kategoriaDisplay("+kategoriat[i].id+");return false;'>"+kategoriat[i].kategoria+"<img class='iconfloat' src='eventsiconfinal5.png' alt=''></a></li>";
            } else if (kategoriat[i].kategoria == "Treenaaminen") {
                teksti=teksti+"<li><a href='#' onclick='kategoriaDisplay("+kategoriat[i].id+");return false;'>"+kategoriat[i].kategoria+"<img class='iconfloat' src='treeniiconfinal.png' alt=''></a></li>";
            } else if (kategoriat[i].kategoria == "Urheilu") {
                teksti=teksti+"<li><a href='#' onclick='kategoriaDisplay("+kategoriat[i].id+");return false;'>"+kategoriat[i].kategoria+"<img class='iconfloat' src='sportsiconfinal32v7.png' alt=''></a></li>";
            } else {
                // Kategoriat, joita ei ole määritelty vielä
                teksti=teksti+"<li><a href='#' onclick='kategoriaDisplay("+kategoriat[i].id+");return false;'>"+kategoriat[i].kategoria+"<img class='iconfloat' src='https://developers.google.com/maps/documentation/javascript/examples/full/images/info-i_maps.png' alt=''></a></li>";
            }
        }      
    };

    teksti=teksti+"</ul>"
    document.getElementById("navigation-side").innerHTML = teksti;
};

kategoriatValikko();

function servicesSide() {
    let teksti = "";
    //console.log(kohteet);
    
    for (let i = 0; i < kohteet.length; i++) {
        if (kohteet[i].display == 1) {
            //console.log(infoWindows[i]);
            teksti+="<div class='divs-side'>";
            teksti+="<div class='divs-side-title'><p class='title-text'><b>"+kohteet[i].nimi+"</b><p></div>";
            teksti+="<p>"+kohteet[i].kuvaus+"</p>";
            teksti+="<p>"+kohteet[i].katuosoite+"</p>";
            teksti+="<p>"+kohteet[i].postinumero+" "+kohteet[i].kaupunki+"</p>";
            teksti+="<button type='button' onclick='avaaKartalla("+kohteet[i].id+")' class='avaakartalla-button'>Avaa Kartalla</button>";
            teksti+="</div>";
            //console.log(kohteet[i]);
            //console.log(kohteet[i].id);
        }
    }
    //console.log(infoWindows);
    document.getElementById("services-side").innerHTML = teksti;
}

servicesSide();

function avaaKartalla(paramid) {
    let theid = paramid;

    if (openInfoWindows.length > 0 ) {
        for (let j = 0; j < kohteet.length; j++) {
            if (openInfoWindows[0] == kohteet[j].id) {
                kohteet[j].marker[1].close();
            }
            //infoWindows[j].infoWindow.close(); 
        }

        if (theid == openInfoWindows[0]) {
            openInfoWindows.length = 0;
            //throw "exit";
            return;
        }

        openInfoWindows.length = 0;
    }

    let markerid;

    for (let i = 0; i < kohteet.length; i++) {
        //console.log(theid+" <- theid");
        //console.log(markers[i].id+" <- marker.id");
        if (theid == kohteet[i].id) {
            //markerid = i;
            //console.log("markerid valittiin!");
            kohteet[theid].marker[1].open({
                anchor: kohteet[theid].marker[0],
                map: map,
            });
        }
    }

    openInfoWindows.push(theid);
}

function etsi() {
    if (savedinput) {
        document.getElementById("search-bar").value = savedinput;
        document.getElementById("search-bar").focus();
    }
    let etsiInput = document.getElementById("search-bar");
    let timeout = null;
    let etsinnanKohteet = [];

    for (let k = 0; k < kohteet.length; k++) {
        etsinnanKohteet.push(kohteet[k].nimi);
    }

    //console.log("etsinnän kohteet");
    //console.log(etsinnanKohteet);

    etsiInput.addEventListener("keyup", function (event) {
        let inputs = [];
        let ids = [];
        
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            if (etsiInput.value) {
                savedinput = etsiInput.value;
            }

            let input = etsiInput.value.toLowerCase();
            
            //console.log("input");
            //console.log(input);
            savedids.length = 0;
            savedkohteet.length = 0;
            
            if (!input) {
                savedids.length = 0;
                savedinput = "";
                for (let i = 0; i < kategoriat.length; i++) {
                    kategoriat[i].display = 1;
                }
                kategoriatValikko();
                kohteetSetDisplayToOne();
                servicesSide();
                //initMap();
                valitutKohteetDisplay();
                etsi();
                document.getElementById("search-bar").focus();
                return;
            }
            
            //console.log("etsinput");
            //console.log(etsiInput.value);
            inputs = etsinnanKohteet.filter(etsinnanKohteet => etsinnanKohteet.toLowerCase().includes(input));
            //console.log("founds");
            //console.log(inputs);

            /*
            if (inputs.length == 0) {
                return;
            }
            */

            for (let i = 0; i < kohteet.length; i++) {
                kohteet[i].display = 0;
            }

            for (let i = 0; i < inputs.length; i++) {
                for (let j = 0; j < kohteet.length; j++) {
                    //console.log(inputs[i]);
                    //console.log(kohteet[j].nimi);
                    if (inputs[i] == kohteet[j].nimi) {
                        //console.log("Match in heaven");
                        //console.log(kohteet[j].display);
                        kohteet[j].display = 1;
                        //console.log(kohteet[j].display);
                        savedkohteet.push(kohteet[j].id);
                        
                        for (let k = 0; k < kategoriat.length; k++) {
                            if (kohteet[j].kategoria == kategoriat[k].kategoria) {
                                ids.push(kategoriat[k].id);
                            }
                        }
                        
                    } /* else {
                        console.log("Not a match");
                        console.log(kohteet[j].display);
                        kohteet[j].display = 0;
                        console.log(kohteet[j].display);
                    } */
                }
            }
            
            //console.log("kategorioiden id:t");
            //console.log(ids);
            for (let i = 0; i < ids.length; i++) {
                savedids.push(ids[i]);
            }
           
            //console.log(savedids)
            kategoriaDisplay(ids);

            /*
            for (let i = 0; i < ids.length; i++) {
                kategoriaDisplay(ids[i]);
            }
            */
            
            //initMap();
        }, 300);
    });
}

etsi();

window.initMap = initMap;

/*
function calendar(saatukohdeid) {
    let kohdeid = saatukohdeid;
    // kohdeid:n mukaan haettaisiin palvelun kalenteritiedot
    // jotka syötettäisiin alempiin muuttujiin ja näistä muodostettaisiin tiedot kalenteriin, sekä millaisia varauksia voi tehdä.
    let aukioloajat = [];
    let varauksenpituus = 60;
    let varatutajat = [];

}
*/

// Koodiin parannuksia kurssin jälkeen:
// Vaihda kohteet-taulujen rakenteiden tyyli vastaamaan RESTApi-rajapintaa(moniuloitteista) ja tietokantaa. Tällä hetkellä sitä voisi käyttää, mutta rajapinta olisi tosi suppea. Toimisi myös suoraan tietokannan kanssa.
// Lisää marker:lle oma taulukko, jotta niitä voidaan piilottaa ja näyttää kartassa kategorioiden mukaan tai etsintöjen. Silloin ei tarvitse initMap():ia käyttää sitä varten
// Mutta voi olla mahdollista, että koodi on initMap()-komennon kanssa suorituskyvyltään parempi / downside: kartta latautuu näkymässä aina uudelleen
// Tiivistä toistuvat koodit funktioksi ja korvaa koodissa olevat pätkät funktioilla
// Etsi-inputtiin autocomplete piilotetulla listalla. Luultavasti toimii lisäämällä sen toiminnot etsi()-funktion sisälle muokkaamalla funktiota
// Pyynnöt listana hallintapaneeliin, josta voi valita pyynnön käsiteltäväksi.
// Filttereitä kartan ominaisuuksille, joko kartan yläosaan tai index.html:n header osioon.
// Filttereitä voisi esimerkiksi olla, että saa kartalle näkyviin eri Google Mapsin sisältöä.
// GPS-ominaisuus, mikä näyttää missä olet?

// Kansio rakenne projektin tiedostoille
// Poista turhat tiedostot

// Mietintöjä:
// Kategoriat voitaisiin tehdä omiksi lista-elementeiksi. Tällöin sisältö aukeaisi sen alle?
// Tai vaihtoehtoisesti <ul>-lista elementin sisään tehtäisiin toisia <ul>-lista elementtejä kategorioille?
// Tai kaikki omiksi div-elementeiksi ja niihin aukeamaan sisältö? Ehkä parhaiten ulkoasullisesti muokattavissa ilman rajoja?

function valitutKohteetDisplay() {
    for (let i = 0; i < kohteet.length; i++) {
        if (kohteet[i].display == 1) {
            kohteet[i].marker[0].setMap(map);
        } else {
            kohteet[i].marker[0].setMap(null);
        }
    }
    
};

function closeOpenInfoWindows() {
    if (openInfoWindows) {
        for (let i = 0; i < kohteet.length; i++) {
            if (openInfoWindows[0] == kohteet[i].id) {
                kohteet[i].marker[1].close();
            }
        }
    }
};