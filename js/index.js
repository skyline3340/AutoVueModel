function copyCode(id) {
    var copy = document.getElementById(id);
    copy.select();
    document.execCommand('copy');
    if (copy.value != "") {
        var show = document.getElementById('copyInfo');
        show.classList.remove('show');
        show.offsetWidth = show.offsetWidth;
        show.classList.add('show');
    }
}

function showPanel(id) {
    var panel = document.getElementById(id);
    panel.style['display'] = 'flex';
}

function closePanel(id) {
    var panel = document.getElementById(id);
    panel.style['display'] = 'none';
}

window.onload = function(){
    var area = document.getElementById('closeSetArea');
    area.addEventListener('click', function(event){
        closePanel('settingPanel');
    });
}