$(() => {
    const input = document.getElementById('fileInput');
    input.addEventListener('change', (event) => {
        let file = (event.target as HTMLInputElement).files[0]
        printFileOnHtml(file);
    })
})

function printFileOnHtml(data: File) {
    let textarea: JQuery = $('#res');
    let reader = new FileReader();
    let name = data.name;
    let funnyArr: string[] = [];

    reader.onload = function (ev) {
        let result: string = String(ev.target.result);
        // console.log(`File name is: ${name}`)
        // console.log(`this is the result: ${result}`)
        textarea.html(String(result));
        result.split('duplication').map(el => {
            console.log(el)
        })

    }

    reader.readAsText(data)
}