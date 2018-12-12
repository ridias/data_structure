var Node = function(value){
    this.previous = null
    this.value = value
    this.next = null
}

var Queue = function(){
    this.first = null
    this.last = null
    this.length = 0
}

Queue.prototype.push = function(value){
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

Queue.prototype.shift = function(){
    if(this.isEmpty()) return;
    if(this.first.next === null){ this.first = null; this.last = null }
    else{
        let next = this.first.next
        next.previous = null
        this.first = next
    }
    this.length -= 1
}

Queue.prototype.getAllValues = function(){
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

Queue.prototype.getPosValue = function(value){
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

Queue.prototype.isEmpty = function(){
    return this.first === null
}

module.exports = Queue