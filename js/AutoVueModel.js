function ConvertToVueModel() {
    let input = document.getElementById('InputCode');
    let output = document.getElementById('OutputCode');
    let htmlCode = document.getElementById('TargetHTMLCode');
    let vueModelName = document.getElementById('name').value;
    let defaultUrl = document.getElementById('defaultUrl').value;
    let pageData = document.getElementById('pageData').value;
    let defaultValue = document.getElementById('defaultValue').value;
    let objList = [];
    let inputList = [];
    let textList = [];
    let selectList = [];
    let buttonList = [];

    htmlCode.innerHTML = input.value;

    objList = htmlCode.querySelectorAll('*[id]');
    var contentId = objList[0].id;

    for (var i = 1; i < objList.length; i++) {
        if (objList[i].id != undefined) {
            var objId = objList[i].id
            switch (objList[i].tagName) {
                case "INPUT":
                    inputList.push(objId);
                    break;
                case "DIV":
                    textList.push(objId);
                    break;
                case "LABEL":
                    textList.push(objId);
                    break;
                case "SELECT":
                    selectList.push(objId);
                    break;
                case "BUTTON":
                    buttonList.push(objId);
                    break;
            }
        }

    }

    var vueModelOutput = `var ${vueModelName != "" ? vueModelName : "Updata"} = `
        + `new VueModel('${defaultUrl}',${pageData != "" ? `'${pageData}'` : "{}"},{},'${contentId}')\n`;

    var inputMult = "";
    var textMult = "";
    var select = "";
    var button = "";

    if (inputList.length != 0) {
        inputMult = "\t.AddV_InputMult({\n";
        for (var i = 0; i < inputList.length; i++) {
            inputMult += `\t\t${inputList[i]},\n`;
        }
        inputMult += "\t})\n";
    }
    vueModelOutput += inputMult;

    if (textList.length != 0) {
        textMult = "\t.AddV_TextMult({\n";
        for (var i = 0; i < textList.length; i++) {
            textMult += `\t\t${textList[i]},\n`;
        }
        textMult += "\t})\n";
    }
    vueModelOutput += textMult;

    if (selectList.length != 0) {
        for (var i = 0; i < selectList.length; i++) {
            if (document.getElementById(selectList[i]).children.length == 1) {
                select += `\t.AddV_Select('${selectList[i]}','','','')\n`;
            } else {
                select += `\t.AddV_SelectBind('${selectList[i]})\n`;
            }
        }

    }
    vueModelOutput += select;

    if (buttonList.length != 0) {
        for (var i = 0; i < buttonList.length; i++) {
            button += `\t.AddV_Button('${buttonList[i]}', () => {})\n`
        }
    }
    vueModelOutput += button;

    if(defaultValue != ""){
        vueModelOutput += `\t.UpdateVueModel(${defaultValue})\n`;
    }

    output.innerHTML = vueModelOutput;
}
