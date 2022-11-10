const draggable_list = document.getElementById("draggable-list");
const check = document.getElementById("check");

const sportsBikes  = [
    'KAWASAKI NINJA 650',
    "KTM RC 390",
    "TVS Apache RR 310",
    "Yamaha YZF R15 V3",
    "KTM RC 200",
    "Bajaj Pulsar RS200",
    "KTM RC 125",
    "Suzuki Gixxer SF",
    "Honda CBR 605R",
    "Ducati Monster BS6",
];

const listItems = [];

let dragStartIndex;

createList();

function createList() {
    [...sportsBikes]
        .map(a => ({ value: a, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(a => a.value)
        .forEach((bike, index) => {

            const listItem = document.createElement('li');



            listItem.setAttribute('data-index', index);

            listItem.innerHTML = `
        <span class="number">${index + 1}</span>
         <div class="draggable" draggable = "true">
            <p class="bike-name">${bike}</p>
            <i class="fas fa-grip-lines"></i>
        </div>     
        `;


            listItems.push(listItem);

            draggable_list.appendChild(listItem);
        });

    addEventListener();
}


function dragStart() {
    // console.log('Event: ', 'dragstart');
    dragStartIndex = +this.closest('li').getAttribute('data-index');
    console.log(dragStartIndex);
}

function dragEnter() {
    // console.log('Event: ', 'dragenter');
    this.classList.add('over');
}

function dragLeave() {
    // console.log('Event: ', 'dragleave');
    this.classList.remove('over');
}
function dragOver(e) {
    // console.log('Event: ', 'dragover');
    e.preventDefault();
}

function dragDrop() {
    // console.log('Event: ', 'drop');
    const dragEndIndex = +this.getAttribute('data-index');

    swapItems(dragStartIndex, dragEndIndex);

    this.classList.remove('over');

}

function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');

    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
}

function checkOrder() {
    listItems.forEach((listItem, index) => {
        const bikeName = listItem.querySelector('.draggable').innerText.trim();

        if (bikeName !== sportsBikes[index]) {
            listItem.classList.add('wrong');
        }
        else {
            listItem.classList.remove('wrong');
            listItem.classList.add('right');
        }
    })
}

function addEventListener() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    });

    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    })
}


check.addEventListener("click", checkOrder);