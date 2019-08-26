
var UndirectedGraph = function(){
    this.map = {}
}

UndirectedGraph.prototype.isItRelated = function(vertex, vertex2){
    let nodes = this.map[vertex]
    let isRelated = false 
    for(let i = 0; i < nodes.length; i++){
        if(nodes[i] == vertex2){
            isRelated = true
            break
        }
    }
    return isRelated
} 

UndirectedGraph.prototype.addVertex = function(vertex){
    if(this.map[vertex] == undefined) this.map[vertex] = []
}

UndirectedGraph.prototype.addEdge = function(vertex, toVertex){
    if(this.map[vertex] == undefined || this.map[toVertex] == undefined){ 
        //no existe vertex
    }else{
        if(!this.isItRelated(vertex, toVertex)){
            if(vertex == toVertex){
                this.map[vertex].push(toVertex)
            }else{
                this.map[vertex].push(toVertex)
                this.map[toVertex].push(vertex)
            }
        }
    }
}

UndirectedGraph.prototype.updateVertex = function(oldVertex, newVertex){

    //error, el nodo a cambiar no existe
    if(this.map[oldVertex] == undefined) return ;
    //error, ya existe el nodo nuevo, no se puede cambiar a ese nodo
    if(this.map[newVertex] != undefined) return ;

    Object.keys(this.map).forEach( key => {
        if(key == oldVertex){
            this.map[newVertex] = this.map[oldVertex]
            delete this.map[oldVertex]
        }
    })

    for(let i = 0; i < this.map[newVertex].length; i++){
        if(this.map[newVertex][i] == oldVertex) this.map[newVertex][i] = newVertex
        let nodes = this.map[this.map[newVertex][i]]
        for(let j = 0; j < nodes.length; j++){
            if(nodes[j] == oldVertex) this.map[this.map[newVertex][i]][j] = newVertex
        }
    }
}

UndirectedGraph.prototype.removeVertex = function(vertex){
    //error, vertex no existe
    if(this.map[vertex] == undefined) return ;
    let nodes = this.map[vertex]

    for(let i = 0; i < nodes.length; i++){
        if(vertex != nodes[i]){
            for(let j = 0; j < this.map[nodes[i]].length; ){
                if(this.map[nodes[i]][j] == vertex) 
                    this.map[nodes[i]].splice(j, 1)
                else
                    j++
            }
        }
    }

    delete this.map[vertex]
}

UndirectedGraph.prototype.getRelatedNodes = function(vertex){
    return this.map[vertex]
}

UndirectedGraph.prototype.bfs = function(startVertex){
    if(this.map[startVertex] == undefined) return []

    let queue = [startVertex]
    let visited = {}
    let result = []
    
    while(queue.length > 0){
        let node = queue.shift()
        visited[node] = 1
        result.push(node)
        for(let i = 0; i < this.map[node].length; i++){
            if( visited[this.map[node][i]] == undefined){
                queue.push(this.map[node][i])
                visited[this.map[node][i]] = 1
            }
        }
    }
    return result
}

UndirectedGraph.prototype.dfs = function(startVertex){
    if(this.map[startVertex] == undefined) return []

    let visited = {}
    let result = []

    const dfsRecursive = function(map, node){
        visited[node] = 1
        result.push(node)

        for(let i = 0; i < map[node].length; i++){
            if(visited[map[node][i]] == undefined){
                dfsRecursive(map, map[node][i])
            }
        }

    }

    dfsRecursive(this.map, startVertex)
    
    return result
}

function dfsRecursive(map, node, visited){
    visited[node] = true
    for(let i = 0; i < map[node].length; i++){
        map[node[i]]
    }
}


const graph = new UndirectedGraph()

graph.addVertex(2)
graph.addVertex(4)
graph.addEdge(2, 4)
graph.addVertex(5)
graph.addEdge(5,4)
graph.addEdge(5,2)
graph.addVertex(6)
graph.addEdge(5,6)
graph.addEdge(5,5)
graph.addVertex(7)
graph.addEdge(4,7)

console.log(graph.bfs(5))
console.log(graph.dfs(5))

console.log(graph.map)

graph.updateVertex(5,1)

console.log(graph.map)

graph.removeVertex(1)
console.log(graph.map)



