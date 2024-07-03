    
console.log('Example: how to keep id from dataToSend and merge-in additional properties from loginPropertiesFromStorage')

let dataToSend = {
    id: 'VirtualPage-View',
    origProperty: 'Hello World Orig'
}

const loginPropertiesFromStorage = {
    id: 'Event',
    origProperty: 'Poof',
    anotherProperty: 'Hello World'
}

const { id: wrongId, ...restProperties } = loginPropertiesFromStorage

dataToSend = { ...dataToSend, ...restProperties }

console.log(dataToSend)
