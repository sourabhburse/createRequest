Storage.prototype.setObj = function (key, obj) {
    return this.setItem(key, JSON.stringify(obj));
}

Storage.prototype.getObj = function (key) {
    return JSON.parse(this.getItem(key));
}

//Database Methods
function addMeter(meterSerialNumber) {
    var existingMeters = localStorage.getObj("AllMeters");
    if (existingMeters == null) existingMeters = [];
    existingMeters.push(JSON.stringify(meterSerialNumber));
    localStorage.setObj("AllMeters", existingMeters);
    // alert("Meter " + meterSerialNumber + " Added Successfully");
}

function addGateway(gatewaySerialNumber) {
    var existingGateways = localStorage.getObj("AllGateways");
    if (existingGateways == null) existingGateways = [];
    existingGateways.push(JSON.stringify(gatewaySerialNumber));
    localStorage.setObj("AllGateways", existingGateways);
    // alert("Gateway " + gatewaySerialNumber + " Added Successfully");
}

function addIp(ip) {
    var exisitngIp = localStorage.getObj("AllIp");
    if (exisitngIp == null) exisitngIp = [];
    exisitngIp.push(JSON.stringify(ip));
    localStorage.setObj("AllIp", exisitngIp);
    // alert("Meter " + ip + " Added Successfully");
}

function addToDatabase() {
    let meterSerialNumber = document.getElementsByName("meter_serialnumber")[0].value;
    let gatewaySerialNumber = document.getElementsByName("gw_serialnumber")[0].value;
    let ip = document.getElementsByName("ip")[0].value;
    if (meterSerialNumber) addMeter(meterSerialNumber);
    if (gatewaySerialNumber) addGateway(gatewaySerialNumber);
    if (ip) addIp(ip);
}

function populateList() {
    var savedMeters = localStorage.getObj("AllMeters");
    var savedGateway = localStorage.getObj("AllGateways");
    var savedIp = localStorage.getObj("AllIp");
    let requestListOptions = document.getElementById("suggestions");
    
    Object.keys(requestTypes).forEach(function (key) {
        let option = document.createElement('option');
        option.value = key;
        requestListOptions.appendChild(option);
    })
    if (savedGateway !== null) {
        savedGateway.forEach(option =>
            gatewayListOptions.add(
                new Option(option.replace(/['"]+/g, ''), option.replace(/['"]+/g, ''))
            )
        );
    }
    if (savedIp !== null) {
        savedIp.forEach(option =>
            ipOptions.add(
                new Option(option.replace(/['"]+/g, ''), option.replace(/['"]+/g, ''))
            ),
        );
    }

    if (savedMeters) {
        for (let i = 0; i < savedMeters.length; i++) {
            var checkBox = document.createElement("input");
            var label = document.createElement("label");
            var div = document.createElement("div");
            div.classList += "form-check form-check-inline";
            checkBox.type = "checkbox";
            checkBox.value = savedMeters[i].replace(/['"]+/g, '');
            checkBox.checked = false;
            checkBox.classList += "form-check-input";
            label.classList += "form-check-label";
            div.appendChild(checkBox);
            div.appendChild(label);
            meter_list.appendChild(div)
            label.appendChild(document.createTextNode(savedMeters[i].replace(/['"]+/g, '')));
        }
    } else {
        var div = document.createElement("div");
        div.textContent = "Please Add Meters";
        div.style.fontStyle = "italic";
        div.style.color = "Red";
        meter_list.appendChild(div);
    }
}


////////////////////////////////////////
function generateUUID() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

function getUnixTime(value) {
    return Math.round(new Date(value).getTime() / 1000);
}