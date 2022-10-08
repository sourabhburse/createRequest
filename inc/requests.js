const requestTypes = ['Energy Profile', 'Load Profile1', 'Water Profile', 'Max Demand', 'Load Profile2', 'Instrumentation Profile', 'Instantaneous Values',
    'Billing Profile', 'Clock Time', 'Get Profile Interval', 'Reconnection', 'Switch Status', 'Max Demand Reset', 'Get Gateway Clock Time',
    'Gateway Sync', 'Clear Alarms', 'Meter Status', 'Gateway Nameplate', 'Gateway Ping', 'Meter Ping', 'Meter Nameplate'];

function addDevices(obj) {
    let checked_meters = document.querySelectorAll('input[type=checkbox]:checked');
    let dev_ = [];
    if (checked_meters) {
        checked_meters.forEach(item =>
            dev_.push(item.value)
        )
    }
    obj.devices = (dev_);
    return obj;
}

function addParameters(obj) {
    let para_ = new Object();
    para_.startDate = getUnixTime(date_from.value);
    para_.endDate = getUnixTime(date_to.value);
    obj.parameters = (para_);
    return obj;
}

function createBasicRequest() {
    document.getElementById("copyBtn").style.display="block";
    let obj = new Object();
    let gw_sn = document.getElementById("gateway_list").value;
    let gw_ip = document.getElementById("ip_list").value;
    obj.idRequest = generateUUID();
    obj.time = getUnixTime(Date.now());
    obj.gWsn = gw_sn;
    obj.gWip = gw_ip;
    return obj;
}

function requestType1() {
    let req = document.getElementById("req");
    let obj = createBasicRequest();
    req.innerHTML = JSON.stringify(obj, undefined, 2);
}

function requestType2(flag) {
    let obj = createBasicRequest();
    obj = addDevices(obj);
    if (flag) return obj;
    req.innerHTML = JSON.stringify(obj, undefined, 2);
}

function requestType3() {
    let req = document.getElementById("req");
    let obj = requestType2(1);
    obj = addParameters(obj);
    req.innerHTML = JSON.stringify(obj, undefined, 2);
}

function requestReconnection() {
    let req = document.getElementById("req");
    let obj = createBasicRequest();
    obj.type = "DISCONNECTION";
    obj.mode = "Mode4";
    obj = addDevices(obj);
    req.innerHTML = JSON.stringify(obj, undefined, 2);
}

function requestGatewaySync() {
    let req = document.getElementById("req");
    let obj = createBasicRequest();
    obj.date = getUnixTime(Date.now());
    req.innerHTML = JSON.stringify(obj, undefined, 2);
}

function createRequest() {
    let request_name = document.getElementById("requestName").value;
    document.getElementById("reqname").innerHTML = request_name;
    switch (String(request_name)) {
        case "Energy Profile":
            requestType2();
            break;
        case "Load Profile1":
            requestType3();
            break;
        case "Water Profile":
            requestType2();
            break;
        case "Max Demand":
            requestType2();
            break;
        case "Load Profile2":
            requestType3();
            break;
        case "Instrumentation Profile":
            requestType3();
            break;
        case "Instantaneous Values":
            requestType3();
            break;
        case "Billing Profile":
            requestType3();
            break;
        case "Clock Time":
            requestType2();
            break;
        case "Get Profile Interval":
            break;
        case "Reconnection":
            requestReconnection();
            break;
        case "Switch Status":
            requestType2();
            break;
        case "Max Demand Reset":
            break;
        case "Get Gateway Clock Time":
            requestType1();
            break;
        case "Gateway Sync":
            requestGatewaySync();
            break;
        case "Clear Alarms":
            requestType2();
            break;
        case "Meter Status":
            requestType2();
            break;
        case "Gateway Nameplate":
            requestType1();
            break;
        case "Gateway Ping":
            requestType1();
            break;
        case "Meter Ping":
            requestType2();
            break;
        case "Meter Nameplate":
            requestType2();
            break;
    }
}