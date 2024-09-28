function objectConvertor(data:Object):Object{
    const result = {};
    Object.keys(data).forEach(function(key) {
        return result[key] = data[key]["value"];
    });
    return result;
}


export default objectConvertor;