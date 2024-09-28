function validateInputContact(data:Object):Boolean{

    let wrongFields:Boolean=false;
Object.keys(data).forEach(function(key) {

    if (key === 'country') {           
        if (data[key]['value'] === "" ) {
            data[key]['isValid'] = false
             data[key]['validationMessage']= 'هذا الحقل فارغ'
             wrongFields=true;
        } 
      }

});
return wrongFields;
}

export default validateInputContact;