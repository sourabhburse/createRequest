const requestTypes = {
    'Energy Profile': 'meter/energyprofile',
    'Load Profile1': 'meter/loadprofile1',
    'Water Profile': 'meter/waterprofile',
    'Max Demand': 'meter/maxdemand',
    'Load Profile2': 'meter/loadprofile2',
    'Instrumentation Profile': 'meter/instprofile',
    'Instantaneous Values': 'meter/instvalue',
    'Billing Profile': 'meter/billingprofile',
    'Clock Time': 'meter/clocktime',
    'Get Profile Interval': 'gateway/gwprofiletime',
    'Reconnection': 'meter/reconnection',
    'Switch Status': 'meter/switchstatus',
    'Max Demand Reset': 'meter/mdr',
    'Get Gateway Clock Time': 'gateway/gwclocktime',
    'Gateway Sync': 'gateway/gwsync',
    'Clear Alarms': 'gateway/clearalarms',
    'Meter Status': 'gateway/meterstatus',
    'Gateway Nameplate': 'gateway/nameplate',
    'Gateway Ping': 'gateway/ping',
    'Meter Ping': 'meter/ping',
    'Meter Nameplate': 'gateway/nameplate'
};

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

function createBasicRequest(operation) {
    // document.getElementById("copyBtn").style.display="block";
    let obj = new Object();
    let gw_sn = document.getElementById("gateway_list").value;
    let gw_ip = document.getElementById("ip_list").value;
    obj.idRequest = generateUUID();
    obj.time = getUnixTime(Date.now());
    obj.gWsn = gw_sn;
    obj.gWip = gw_ip;
    obj.operation = operation;
    return obj;
}

function requestType1(operation) {
    let req = document.getElementById("req");
    let obj = createBasicRequest(operation);
    req.innerHTML = JSON.stringify(obj, undefined, 2);
    return obj;
}

function requestType2(operation, flag) {
    let req = document.getElementById("req");
    let obj = createBasicRequest(operation);
    obj = addDevices(obj);
    if (flag) return obj;
    req.innerHTML = JSON.stringify(obj, undefined, 2);
}

function requestType3(operation) {
    let req = document.getElementById("req");
    let obj = requestType2(operation, 1);
    obj = addParameters(obj);
    req.innerHTML = JSON.stringify(obj, undefined, 2);
}

function requestReconnection() {
    let req = document.getElementById("req");
    let obj = createBasicRequest('reconnection');
    obj.type = "DISCONNECTION";
    obj.mode = "Mode4";
    obj = addDevices(obj);
    req.innerHTML = JSON.stringify(obj, undefined, 2);
}

function requestGatewaySync() {
    let req = document.getElementById("req");
    let obj = createBasicRequest('gwsynchronization');
    obj.date = getUnixTime(Date.now());
    req.innerHTML = JSON.stringify(obj, undefined, 2);
}

function createRequest() {
    let request_name = document.getElementById("requestName").value;
    document.getElementById("reqname").innerHTML = request_name;
    switch (String(request_name)) {
        case "Energy Profile":
            requestType2('energyprofile');
            break;
        case "Load Profile1":
            requestType3('loadprofile1');
            break;
        case "Water Profile":
            requestType2('waterprofile');
            break;
        case "Max Demand":
            requestType2('maxdemand');
            break;
        case "Load Profile2":
            requestType3('loadprofile2');
            break;
        case "Instrumentation Profile":
            requestType3('instrumentationprofile');
            break;
        case "Instantaneous Values":
            requestType3('instvalues');
            break;
        case "Billing Profile":
            requestType3('billingprofile');
            break;
        case "Clock Time":
            requestType2('clocktime');
            break;
        case "Get Profile Interval":
            break;
        case "Reconnection":
            requestReconnection();
            break;
        case "Switch Status":
            requestType2('switchstatus');
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
            requestType2('clearalarms');
            break;
        case "Meter Status":
            requestType2('meterstatus');
            break;
        case "Gateway Nameplate":
            requestType1();
            break;
        case "Gateway Ping":
            requestType1('gwnameplate');
            break;
        case "Meter Ping":
            requestType2('meterping');
            break;
        case "Meter Nameplate":
            requestType2('meternameplate');
            break;
    }
}