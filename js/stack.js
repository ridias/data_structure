var Node = function(value){
    this.previous = null
    this.value = value
    this.next = null
}

var Stack = function(){
    this.first = null
    this.last = null
    this.length = 0
}

Stack.prototype.push = function(value){
    let node = new Node(value)
    if(this.isEmpty()){
        this.first = node
        this.last = node
    }else{
        node.previous = this.last
        this.last.next = node
        this.last = node
    }
    this.length += 1
}

Stack.prototype.pop = function(){
    if(this.isEmpty()){ return ; }
    if(this.length === 1){ this.last = null; this.first = null }
    else{
        let previous = this.last.previous
        previous.next = null
        this.last = previous
    }
    this.length -= 1
}

Stack.prototype.getAllValues = function(){
    if(this.isEmpty()){ return [] }
    let result = []
    let actualNode = this.first
    while(actualNode.next !== null){
        result.push(actualNode.value)
        actualNode = actualNode.next
    }
    result.push(actualNode.value)
    return result
}

Stack.prototype.getPosValue = function(value){
    let actualNode = this.first
    let pos = 0
    if(actualNode === null){ return -1 }
    while(actualNode.next !== null){
        if(actualNode.value === value){
            return pos
        }else{
            pos++
            actualNode = actualNode.next
        }
    }
    if(actualNode.value === value){
        return pos+1
    }
    return -1
}

Stack.prototype.isEmpty = function(){
    return this.first === null
}

module.exports = Stack