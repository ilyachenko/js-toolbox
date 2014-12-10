document.write('<style type="text/css" id="mm_hidden_area">#containter00,#destacadinter{visibility: hidden;}</style>');

mmcore.ShowContent = function () {
    var el = document.getElementById('mm_hidden_area');
    if (el) {
        el.parentNode.removeChild(el);
    }
}

mmcore.AddDocLoadHandler(function () {
    setTimeout(function () {
        mmcore.ShowContent();
    }, 0);
});

setTimeout(function () {
    mmcore.ShowContent();
}, 5000);

