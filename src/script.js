$(function () {
    var input = document.getElementById('fileInput');
    input.addEventListener('change', function (event) {
        var file = event.target.files[0];
        printFileOnHtml(file);
    });
});
function printFileOnHtml(data) {
    var textarea = $('#res');
    var reader = new FileReader();
    var name = data.name;
    var funnyArr = [];
    reader.onload = function (ev) {
        var result = String(ev.target.result);
        // console.log(`File name is: ${name}`)
        // console.log(`this is the result: ${result}`)
        textarea.html(String(result));
        result.split('duplication').map(function (el) {
            console.log(el);
        });
    };
    reader.readAsText(data);
}
//# sourceMappingURL=script.js.map