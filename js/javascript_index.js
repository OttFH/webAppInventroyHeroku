"use strict";

var dataJSON = [];
var lastSearchKey = undefined;

window.addEventListener("load", function () {
    console.log("=== page ready ===");

    // member variables
    const tableOutput = document.getElementById("tableOutput");

    function ajaxLoadData() {
        console.log(this);
        if (this.readyState == 4 && this.status == 200) {
            dataJSON = JSON.parse(this.responseText);
            createHeader();
            updateSearch();
        }
        else {
            console.log("Error! JSON Message read failed!");
        }

    }

    function createHeader() {
        const rowHeader = tableOutput.insertRow();
        for (const column in dataJSON[0]) {
            const columnHeader = document.createElement("th");
            columnHeader.innerHTML = column;
            rowHeader.appendChild(columnHeader);
        }
    }

    function loadData() {
        const ajaxObject = new XMLHttpRequest();
        const ajaxURL = "https://raw.githubusercontent.com/ozwoldFH/webapp_inventory_WS2019/master/data/data.json";
        ajaxObject.onreadystatechange = ajaxLoadData;
        ajaxObject.open("GET", ajaxURL, true);
        ajaxObject.send();
    }



    // call function
    loadData();
    
});

function createBody(data) {
    // delete all rows except header
    while (tableOutput.rows.length > 1) {
        tableOutput.deleteRow(-1);
    }

    for (const row in data) {
        const rowBody = tableOutput.insertRow();
        for (const column in data[row]) {
            const columnBody = document.createElement("td");
            columnBody.innerHTML = data[row][column];
            rowBody.appendChild(columnBody);
        }
    }
    //next id for creating new data
    const nextID=dataJSON[dataJSON.length-1].id + 1;
    localStorage.setItem("nextID",nextID);
}

function updateSearch() {
    const currentSearchKey = document.getElementById("searchInput").value.toLowerCase();

    if (currentSearchKey === lastSearchKey) {
        return;
    }

    lastSearchKey = currentSearchKey;
    const data = currentSearchKey ?
        dataJSON.filter(d => Object.values(d).some(v => String(v).toLowerCase().includes(currentSearchKey))) :
        dataJSON;
    createBody(data);
}

function goToForm() {
    document.location.href = "./form.html"
}



