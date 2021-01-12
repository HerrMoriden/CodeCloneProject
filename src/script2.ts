class Duplication {
    constructor(
        public id: number,
        public lines: number,
        public tokens: number,
        public fileSource1: FileSource,
        public fileSource2: FileSource,
        public codefragment: string
    ) {}

}

class FileSource {
    constructor(
        public path: string,
        public line: number
    ) {}
}


$(() => {
    const input = document.getElementById('fileInput');
    input.addEventListener('change', (event) => {
        let file = (event.target as HTMLInputElement).files[0];
        handleThisShitPLs(file).then();

    })
});

async function handleThisShitPLs(file: File) {
    let filetype: string = file.type
    console.log(filetype)
    await parseFile(file);
}

async function parseFile(file: File) {

    let reader = new FileReader();
    reader.onload = async function (ev) {
        let result: string = String(ev.target.result);
        return await parseFromStringToXml(result);
    }
    reader.readAsText(file)
}

async function parseFromStringToXml(testString: string) {
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(testString, 'text/xml');
    addXMLToDom(xmlDoc)
}

function addXMLToDom(data) {
    let numOfDupes: number = data.getElementsByTagName('duplication').length;
    let duplications: Duplication[] = [];
    for (let i = 0; i < numOfDupes; i++) {
        duplications.push(new Duplication(
            i,
            data.getElementsByTagName('duplication')[i].getAttribute('lines'),
            data.getElementsByTagName('duplication')[i].getAttribute('tokens'),
            new FileSource(data.getElementsByTagName("duplication")[i].getElementsByTagName('file')[0].getAttribute('path'),
                data.getElementsByTagName("duplication")[i].getElementsByTagName('file')[0].getAttribute('line')),
            new FileSource(data.getElementsByTagName("duplication")[i].getElementsByTagName('file')[1].getAttribute('path'),
                data.getElementsByTagName("duplication")[i].getElementsByTagName('file')[1].getAttribute('line')),
            data.getElementsByTagName("duplication")[i].getElementsByTagName('codefragment')[0].childNodes[0].nodeValue
            )
        )
    }
    makePrettyHtmlStuff(duplications);
}

function makePrettyHtmlStuff(dupeList: Duplication[]) {
    let i: number = 0;
    let resDiv: JQuery = $('#resultCont');
    let div: JQuery;

    for (let dupe of dupeList) {
        if (i % 4 == 0) {
            let newDiv: JQuery = $(`<div id="result${i / 4}" class="row"></div>`);
            resDiv.append(newDiv);
            div = $(`#result${i / 4}`);

        }
        i++;
        let htmlObj = $(`
        <div class="col-3">
            <div class="card border-success mb-3">
                <div class="card-header bg-transparent border-success">
                    <p>Duplication Num.: ${dupe.id}</p>
                    <p class="small">Number of lines: ${dupe.lines}</p>
                    <p class="small">Number of tokens: ${dupe.tokens}</p>
                </div>
                
                <div class="card-body text-secondary">
                
                
                    <h6 class="card-title mb-0">FilePath 1: </h6>
                    <button class="btn btn-secondary btn-sm py-0" style="font-size: 0.8rem" type="button" role="button"
                     data-toggle="collapse" data-target="#filePathOne${dupe.id}">See Filepath</button>
                    <div class="collapse" id="filePathOne${dupe.id}">
                        <p class="small">${dupe.fileSource1.path}</p>
                    </div>                    
                    
                    <h6 class="card-title mb-0">FilePath 2: </h6>
                    <button class="btn btn-secondary btn-sm py-0" style="font-size: 0.8rem" type="button" role="button"
                     data-toggle="collapse" data-target="#filePathTwo${dupe.id}">See Filepath</button>
                    <div class="collapse" id="filePathTwo${dupe.id}">
                        <p class="small">${dupe.fileSource2.path}</p>
                    </div>
                    
                    <h6 class="card-title mt-2 mb-0">starting at line: </h6>
                    <p class="small mt-0">${dupe.fileSource1.line}</p>
                    
                    
                    <button class="btn btn-secondary btn-sm py-0" style="font-size: 0.8rem" type="button" role="button"
                     data-toggle="collapse" data-target="#codeFragment${dupe.id}">See Codeclone
                     </button>
                    <div class="collapse" id="codeFragment${dupe.id}">
                        <h6 class="card-text">CodeFragment</h6>
                        <p class="small">${dupe.codefragment}</p>
                    </div>
                </div>
            </div>
        </div>
    `);
        div.append(htmlObj);
    }
    $('#littleSuccessMsg').append('Here are your CodeClones made pretty and seperated')
}
