var Node = function(value){
    this.value = value
    this.next = null
}

var LinkedListSimplePointer = function(){
    this.first = null
    this.last = null
    this.length = 0
}

LinkedListSimplePointer.prototype.push = function(value){
    let node = new Node(value)
    if(this.first === null){
        this.first = node
        this.last = node
    }else{
        this.last.next = node
        this.last = node
    }
    this.length += 1
}

LinkedListSimplePointer.prototype.unshift = function(value){
    let node = new Node(value)
    if(this.first === null){
        this.first = node
        this.last = node
    }else{
        let temp = this.first
        this.first = node
        this.first.next = temp
    }
    this.length += 1
}

LinkedListSimplePointer.prototype.addSpecificPosition = function(value, pos){
    let node = new Node(value)
    if(this.first === null){
        this.first = node
        this.last = node
    }else if(this.length + 1 <= pos){
        this.push(value)
    }else{
        let count = 0
        let actualNode = this.first
        while(count < pos - 1){
            actualNode = actualNode.next
            count++
        }
        let temp = actualNode.next
        actualNode.next = node
        actualNode.next.next = temp
    }
    this.length += 1
}

LinkedListSimplePointer.prototype.getPosElement = function(value){
    let pos = 0
    let actualNode = this.first
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

LinkedListSimplePointer.prototype.getAllValues = function(){
    let actualNode = this.first
    let result = []
    if(actualNode === null){ return result }
    while(actualNode.next !== null){
        result.push(actualNode.value)
        actualNode = actualNode.next
        if(actualNode.next === null){
            result.push(actualNode.value)
        }
    }
    return result
}

LinkedListSimplePointer.prototype.pop = function(){
    let actualNode = this.first.next
    let previous = this.first
    if(this.first === null) return ;
    if(actualNode === null){ this.first = null; this.last = null }
    else{
        while(actualNode.next !== null){
            previous = actualNode
            actualNode = actualNode.next
        }
        previous.next = null
    }
    this.length -= 1
}

LinkedListSimplePointer.prototype.shift = function(){
    if(this.first === null){ return ;}
    if(this.first.next == null){ this.first = null; this.last = null}
    let temp = this.first.next
    this.first.next = null
    this.first = temp
    this.length -= 1
}

LinkedListSimplePointer.prototype.removeSpecificPosition = function(pos){
    if(this.first === null || pos >= this.length){ return ; }
    else if(this.first.next == null){ this.first = null; this.last = null }
    else if(pos == 0){ this.shift() }
    else if(pos == this.length - 1){ this.pop() }
    else{
        let actualNode = this.first
        let count = 0
        while(count < pos - 1){
            actualNode = actualNode.next
            count++
        }
        actualNode.next = actualNode.next.next
    }
    this.length -= 1
}

module.exports = LinkedListSimplePointer
