document.addEventListener('alpine:init', () => {

    const NUM_INPUTS = 2
    const NUM_HIDDEN = 5
    const NUM_OUTPUTS = 1
    const NUM_SAMPLES = 10000

    let nn = new NeuralNetwork(NUM_INPUTS, NUM_HIDDEN, NUM_OUTPUTS);

    console.table(nn.weights0.data)
    console.table(nn.weights1.data)

    //train the network
    for (let i=0; i< NUM_SAMPLES; i++){
        //TEST xor gate
        // 00 = 0
        //01 = 1
        //10 = 1
        // 11=0
        let input0 = Math.round(Math.random()); //0 or 1
        let input1 = Math.round(Math.random()); //0 or 1
        let output = (input0 == input1)?0:1
        nn.train([input0,input1],[output])
    }
    
    //test output

    console.log('0 0 =', nn.feedForward([0,0]).data)
    console.log('0 1 =', nn.feedForward([0,1]).data)
    console.log('1 0 =', nn.feedForward([1,0]).data)
    console.log('1 1 =', nn.feedForward([1,1]).data)
    

    Alpine.store('state', {
        count: 0,
        increment() {
            this.count++;
        },
        decrement() {
            this.count--;
        }
    });
    console.log('Alpine Started!')
});

class Counter{
    constructor(){
        this.count = 0
    }
    
    increment() {this.count++}

    decrement() {this.count--}
}


// neural network parameters



class Table {
    //on alpine must be instantiated using
    // x-data="{ table: new Table() }
    constructor(data) {
        this.tableData = data;
        this.newName = '';
        this.newAge = '';
    }

    addRow() {
        const newId = this.tableData.length + 1;
        this.tableData.push({ id: newId, name: this.newName, age: this.newAge });
        this.newName = '';
        this.newAge = '';
    }

    generate() {
        if (this.tableData.length === 0) {
            return '<p class="text-center text-gray-500">No data available.</p>';
        }

        let table = `<table class="w-fit bg-white shadow-md rounded my-6">
                        <thead>
                            <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <th class="py-3 px-6 text-left">ID</th>
                                <th class="py-3 px-6 text-left">Name</th>
                                <th class="py-3 px-6 text-left">Age</th>
                            </tr>
                        </thead>
                        <tbody class="text-gray-600 text-sm font-light">`;

        this.tableData.forEach(row => {
            table += `<tr class="border-b border-gray-200 hover:bg-gray-100">
                        <td class="py-3 px-6 text-left whitespace-nowrap">${row.id}</td>
                        <td class="py-3 px-6 text-left">${row.name}</td>
                        <td class="py-3 px-6 text-left">${row.age}</td>
                      </tr>`;
        });

        table += `</tbody></table>`;
        return table;
    
    }

    generateForm() {
        return `<form @submit.prevent="table.addRow()" class="mt-4 space-y-4">
                    <div class="flex space-x-4">
                        <input type="text" placeholder="Name" x-model="table.newName" required class="border border-gray-300 p-2 rounded w-full">
                        <input type="number" placeholder="Age" x-model="table.newAge" required class="border border-gray-300 p-2 rounded w-full">
                    </div>
                    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Add Row</button>
                </form>`;
    }

    generateContent() {
        return this.generateTable() + this.generateForm();
    }
}