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
