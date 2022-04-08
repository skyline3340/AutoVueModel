function ConvertToVueModel() {
    let input = document.getElementById('InputCode');
    let output = document.getElementById('OutputCode');
    let htmlCode = document.getElementById('TargetHTMLCode');
    let vueModelName = document.getElementById('name').value;
    let defaultUrl = document.getElementById('defaultUrl').value;
    let pageData = document.getElementById('pageData').value;
    let defaultValue = document.getElementById('defaultValue').value;
    let idFilter = document.getElementById('idFilter').value;

    let isText = document.getElementById('isText').checked;
    let isInput = document.getElementById('isInput').checked;
    let isSelect = document.getElementById('isSelect').checked;
    let isRadio = document.getElementById('isRadio').checked;
    let isCheckBox = document.getElementById('isCheckBox').checked;
    let isButton = document.getElementById('isButton').checked;

    let objList = [];
    let inputList = [];
    let textList = [];
    let selectList = [];
    let buttonList = [];
    let radioList = [];
    let checkList = [];

    htmlCode.innerHTML = input.value.replaceAll('src=', 'alt=');

    objList = htmlCode.querySelectorAll('*[id]');
    var contentId = objList[0].id;

    for (var i = 1; i < objList.length; i++) {
        if (objList[i].id != undefined) {
            var objId = objList[i].id
            if (objId.includes(idFilter)) {
                switch (objList[i].tagName) {
                    case "DIV":
                        if (objList[i].children.length != 0 && i != objList.length - 1) {
                            if (objList[i + 1].tagName == "INPUT") {
                                if (objList[i + 1].type == "radio") {
                                    radioList.push([]);
                                    radioList[radioList.length - 1].push(objId);
                                    for (var j = 0; j < objList[i].children.length; j++) {
                                        radioList[radioList.length - 1].push(objList[i + j + 1].id);
                                    }
                                } else if (objList[i + 1].type == "checkbox") {
                                    checkList.push([]);
                                    checkList[checkList.length - 1].push(objId);
                                    for (var j = 0; j < objList[i].children.length; j++) {
                                        checkList[checkList.length - 1].push(objList[i + j + 1].id);
                                    }
                                } else {
                                    textList.push(objId);
                                    break;
                                }
                            }else if(objList[i + 1].type == "checkbox"){
                                checkList.push([]);
                                checkList[checkList.length - 1].push(objId);
                                for (var j = 0; j < objList[i].children.length; j++) {
                                    checkList[checkList.length - 1].push(objList[i + j + 1].id);
                                }
                            } else {
                                textList.push(objId);
                                break;
                            }
                            i += objList[i].children.length;
                            break;
                        }
                        textList.push(objId);
                        break;
                    case "SPAN":
                        textList.push(objId);
                        break;
                    case "TEXTAREA":
                        inputList.push(objId);
                        break;
                    case "INPUT":
                        inputList.push(objId);
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
    }

    var vueModelOutput = `var ${vueModelName != "" ? vueModelName : "Updata"} = `
        + `new VueModel(${defaultUrl != "" ? defaultUrl : `''`}, ${pageData != "" ? `'${pageData}'` : "{}"}, {}, '${contentId}')\n`;

    var ajax = "";
    var inputMult = "";
    var textMult = "";
    var select = "";
    var button = "";
    var radio = "";
    var check = "";

    if (inputList.length != 0 && isInput) {
        inputMult = "\t.AddV_InputMult({\n";
        for (var i = 0; i < inputList.length; i++) {
            inputMult += `\t\t${inputList[i]},\n`;
        }
        inputMult += "\t})\n";
    }
    vueModelOutput += inputMult;

    if (textList.length != 0 && isText) {
        textMult = "\t.AddV_TextMult({\n";
        for (var i = 0; i < textList.length; i++) {
            textMult += `\t\t${textList[i]},\n`;
        }
        textMult += "\t})\n";
    }
    vueModelOutput += textMult;

    if (selectList.length != 0 && isSelect) {
        for (var i = 0; i < selectList.length; i++) {
            if (document.getElementById(selectList[i]).children.length == 1) {
                select += `\t.AddV_Select('${selectList[i]}', '', '', '')\n`;
                ajax += `\t.Ajax({},'${selectList[i]}')\n`;
            } else {
                select += `\t.AddV_SelectBind('${selectList[i]}')\n`;
            }
        }

    }
    vueModelOutput += select;

    if (radioList.length != 0 && isRadio) {
        for (var i = 0; i < radioList.length; i++) {
            radio += `\t.AddV_RadioBindMult('${radioList[i][0].replaceAll('_', '')}', {\n`;
            for (var j = 1; j < radioList[i].length; j++) {
                radio += `\t\t${radioList[i][j]}: '${document.getElementById(radioList[i][j]).value}',\n`;
            }
            radio += "\t)}\n";
        }
    }
    vueModelOutput += radio;

    if (checkList.length != 0 && isCheckBox) {
        for (var i = 0; i < checkList.length; i++) {
            check += `\t.AddV_CheckboxBindMult('${checkList[i][0].replaceAll('_', '')}', {\n`;
            for (var j = 1; j < checkList[i].length; j++) {
                check += `\t\t${checkList[i][j]}: '${document.getElementById(checkList[i][j]).value}',\n`;
            }
            check += "\t)}\n";
        }
    }
    vueModelOutput += check;

    if (buttonList.length != 0 && isButton) {
        for (var i = 0; i < buttonList.length; i++) {
            button += `\t.AddV_Button('${buttonList[i]}', () => {})\n`
        }
    }
    vueModelOutput += button;

    if (defaultValue != "") {
        vueModelOutput += `\t.UpdateVueModel(${defaultValue})\n`;
    }

    if (ajax == "") {
        if (defaultUrl != "") {
            ajax += "\t.Ajax();";
        } else {
            ajax += "\t.VueInit();";
        }
    } else {
        if (defaultUrl != "") {
            ajax += "\t.Ajax();";
        } else {
            ajax += "\t;";
        }
    }

    output.innerHTML = vueModelOutput + ajax;
}
