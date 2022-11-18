const cidFormat = /^[a-zA-Z0-9_]+$/;
const cnameFormat = /^[a-zA-Z0-9_ ]+$/;
const qtyFormat = /^\d+$/;
const rateFormat = /^\d+.?\d*$/;

const btns = document.getElementsByTagName('button');

const table = document.getElementById('inventory');


function hide(action, element_id = '') {

    action = action.trim();
    element_id = element_id.trim();

    const idArray = ['add-container', 'update-container', 'remove-container'];

    if(action === 'SELF-HIDE')
        document.getElementById(element_id).style.display = 'none';
    else if(action === 'SELF-REVEAL')
        document.getElementById(element_id).style.display = 'block';
    else if(action === 'OTHERS-HIDE')
        for(let id of idArray)
            if(id != element_id)
                document.getElementById(id).style.display = 'none';
    else if(action === 'OTHERS-REVEAL')
        for(let id of idArray)
                if(id != element_id)
                    document.getElementById(id).style.display = 'block';               
    else if(action === 'ALL-HIDE')
        for(let id of idArray)
            document.getElementById(id).style.display = 'none';
    else if(action === 'ALL-REVEAL')
        for(let id of idArray)
            document.getElementById(id).style.display = 'block';



}


function deactivate_btns() {
    for (const btn of btns)
        btn.disabled = true;
}

function activate_btns() {
    for (const btn of btns)
        btn.disabled = false;
}

function verify_and_insert_to_table() {
    let allGood = true;
    let errString = 'Enter ';

    let cid = document.getElementById('add-container').children[0].value.trim();
    let cname = document.getElementById('add-container').children[1].value.trim();
    let qty = document.getElementById('add-container').children[2].value.trim();
    let rate = document.getElementById('add-container').children[3].value.trim();


    if(!cidFormat.test(cid)) { errString += 'Commodity ID, '; allGood = false; }
    if(!cnameFormat.test(cname)) { errString += 'Commodity name, '; allGood = false; }
    if(!qtyFormat.test(qty)) { errString += 'Quantity, '; allGood = false; }
    if(!rateFormat.test(rate)) { errString += 'Rate '; allGood = false; }
    errString += 'correctly.';

    if(!allGood) alert(errString);
    else {

        let dateTime = new Date().toLocaleString();
        let array = [cid, cname, qty, qty, rate, dateTime, '-'];
        
        deactivate_btns();

        xhr = new XMLHttpRequest();
        xhr.open("POST", "/add-commodity", false);
        
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(`cid=${cid}&cname=${cname}&oqty=${qty}&cqty=${qty}&rate=${rate}&date=${dateTime}&date_mdf=-`);
        if(xhr.status === 200) {
            location.reload();
        }
        else {
            alert(xhr.responseText);
            hide('ALL-HIDE');
            console.log('heu');
            activate_btns();
        }

        
    }

}


function update_qty() {
    let allGood = true;

    let targetCommodity = document.getElementById('update-container').children[0].value.trim();
    let newQty = document.getElementById('update-container').children[1].value.trim();
    
    if(!cidFormat.test(targetCommodity) || !qtyFormat.test(newQty)) allGood = false;

    if(!allGood) alert('Detail(s) entered in wrong format.');
    else {

        let dateTime = new Date().toLocaleString();

        deactivate_btns();

        xhr = new XMLHttpRequest();
        xhr.open("POST", "/update-commodity", false);
    
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(`cid=${targetCommodity}&qty=${newQty}&date=${dateTime}`);

        if(xhr.status === 200) {
            location.reload();
        }
        else {
            alert(xhr.responseText);
            hide('ALL-HIDE');
            activate_btns();
        }
    }
    

}


function remove_item() {
    let targetCommodity = document.getElementById('remove-container').children[0].value.trim();

    let allGood = true;
    if(!cidFormat.test(targetCommodity)) allGood = false;
    if(!allGood) alert('Detail(s) entered in wrong format.');
    else {
        deactivate_btns();

        xhr = new XMLHttpRequest();
        xhr.open("POST", "/remove-commodity", false);
        
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(`cid=${targetCommodity}`);

        if(xhr.status === 200) {
            location.reload();
        }
        else {
            alert(xhr.responseText);
            hide('ALL-HIDE');
            activate_btns();
        }
    }

}
