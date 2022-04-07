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
    let radioList = [];

    htmlCode.innerHTML = input.value;

    objList = htmlCode.querySelectorAll('*[id]'); console.log(objList);
    var contentId = objList[0].id;

    for (var i = 1; i < objList.length; i++) {
        if (objList[i].id != undefined) {
            var objId = objList[i].id
            switch (objList[i].tagName) {
                case "DIV":
                    if (objList[i].children.length != 0 && i != objList.length -1) { console.log(objList[i])
                        if (objList[i + 1].tagName == "INPUT") {
                            if (objList[i + 1].type == "radio") {
                                radioList.push([]);
                                radioList[radioList.length - 1].push(objId);
                                for (var j = 0; j < objList[i].children.length; j++) {
                                    radioList[radioList.length - 1].push(objList[i + j + 1].id);
                                }
                            } else {
                                textList.push(objId);
                                break;
                            }
                        } else {
                            textList.push(objId);
                            break;
                        }
                        i += objList[i].children.length; console.log(objId)
                        break;
                    }
                    textList.push(objId);
                    break;
                case "SPAN":
                    textList.push(objId);
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

    var vueModelOutput = `var ${vueModelName != "" ? vueModelName : "Updata"} = `
        + `new VueModel('${defaultUrl}',${pageData != "" ? `'${pageData}'` : "{}"},{},'${contentId}')\n`;

    var inputMult = "";
    var textMult = "";
    var select = "";
    var button = "";
    var radio = "";

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
    vueModelOutput += textMult; console.log(textList)

    if (selectList.length != 0) {
        for (var i = 0; i < selectList.length; i++) {
            if (document.getElementById(selectList[i]).children.length == 1) {
                select += `\t.AddV_Select('${selectList[i]}','','','')\n`;
            } else {
                select += `\t.AddV_SelectBind('${selectList[i]}')\n`;
            }
        }

    }
    vueModelOutput += select;

    if (radioList.length != 0) {
        for (var i = 0; i < radioList.length; i++) {
            radio += `\t.AddV_RadioBindMult('${radioList[i][0].replaceAll('_', '')}',{\n`;
            for (var j = 1; j < radioList[i].length; j++) {
                radio += `\t\t${radioList[i][j]}: '${document.getElementById(radioList[i][j]).value}',\n`;
            }
            radio += "\t)}\n";
        }
    }
    vueModelOutput += radio;

    if (buttonList.length != 0) {
        for (var i = 0; i < buttonList.length; i++) {
            button += `\t.AddV_Button('${buttonList[i]}', () => {})\n`
        }
    }
    vueModelOutput += button;

    if (defaultValue != "") {
        vueModelOutput += `\t.UpdateVueModel(${defaultValue})\n`;
    }

    output.innerHTML = vueModelOutput;
}