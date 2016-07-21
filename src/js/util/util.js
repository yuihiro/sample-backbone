function cc(str) {
    console.log(str);
};

function getFormData(form){
    var out = {};
    var s_data = form.serializeArray();
    for(var i = 0; i<s_data.length; i++){
        var record = s_data[i];
        out[record.name] = record.value;
    }
    return out;
}