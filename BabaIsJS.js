"use strict";

/**
 * Utils
 * */
let type = {
    ENTITY: 'entity',
    NOUN: 'noun',
    OPERATOR: 'operator',
    PROPERTY: 'property'
};

let words = {
    NOUN: {
        BABA: 'baba_noun',
        FLAG: 'flag_noun',
        WALL: 'wall_noun',
        WATER: 'water_noun',
        ROCK: 'rock_noun'
    },
    OPERATOR: {
        IS: 'is_operator'
    },
    PROPERTY: {
        YOU: 'you_property',
        WIN: 'win_property',
        STOP: 'stop_property',
        PUSH: 'push_property'
    }
};

let entity = {
    BABA: 'baba_entity',
    FLAG: 'flag_entity',
    WALL: 'wall_entity',
    WATER: 'water_entity',
    ROCK: 'rock_entity'
};

/**
 * function return the correct factory with argument name
 * @param name
 * @returns {PropertyFactory|NounFactory|EntityFactory|OperatorFactory}
 */
function chooseCorrectFactory(name) {
    if (name.endsWith('entity')) {
        return new EntityFactory();
    } else if (name.endsWith('noun')) {
        return new NounFactory();
    } else if (name.endsWith('operator')) {
        return new OperatorFactory();
    } else {
        return new PropertyFactory();
    }
}

/**
 * function to create entity class
 * @constructor
 */
function EntityFactory() {
    /**
     *
     * @param attributs object contains fields name and position
     * @returns {*}
     */
    this.create = function (attributs) {
        switch (attributs.name) {
            case entity.BABA:
                return new BabaEntity(attributs.position);
            case entity.FLAG:
                return new FlagEntity(attributs.position);
            case entity.WALL:
                return new WallEntity(attributs.position);
            case entity.WATER:
                return new WaterEntity(attributs.position);
            case entity.ROCK:
                return new RockEntity(attributs.position);
            default:
                break;
        }
    }
}

/**
 * function to create noun class
 * @constructor
 */
function NounFactory() {
    /**
     *
     * @param attributs contains fields name and position
     * @returns {*}
     */
    this.create = function (attributs) {
        switch (attributs.name) {
            case words.NOUN.BABA:
                return new BabaNoun(attributs.position);
            case words.NOUN.FLAG:
                return new FlagNoun(attributs.position);
            case words.NOUN.WALL:
                return new WallNoun(attributs.position);
            case words.NOUN.WATER:
                return new WaterNoun(attributs.position);
            case words.NOUN.ROCK:
                return new RockNoun(attributs.position);
            default:
                break;
        }
    }
}

/**
 * function to create property class
 * @constructor
 */
function PropertyFactory() {
    /**
     *
     * @param attributs contains fields name and position
     * @returns {*}
     */
    this.create = function (attributs) {
        switch (attributs.name) {
            case words.PROPERTY.YOU:
                return new YouProperty(attributs.position);
            case words.PROPERTY.WIN:
                return new WinProperty(attributs.position);
            case words.PROPERTY.STOP:
                return new StopProperty(attributs.position);
            case words.PROPERTY.PUSH:
                return new PushProperty(attributs.position);
            default:
                break;
        }
    }
}

/**
 * function to create operator class
 * @constructor
 */
function OperatorFactory() {
    /**
     *
     * @param attributs contains field and position
     * @returns {IsOperator}
     */
    this.create = function (attributs) {
        switch (attributs.name) {
            case words.OPERATOR.YOU:
                return new IsOperator(attributs.position);
            default:
                break;
        }
    }
}

/**
 * Class to read a JSON file
 */
function readJSONFile(board, filename){
    fetch("/levels/"+filename)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw Error(response.statusText);
        })
        .then(jsonBoard => {
            board = new Board(jsonBoard['info']['col'],jsonBoard['info']['line']);
            let grid = jsonBoard['grid'];
            let factory;
            for(let row = 0; row < board.height; row++){
                let currentRow = grid[row];
                for(let col = 0; col < board.width; col++){
                    let currentName = currentRow[col];
                    if(currentName !== ""){
                        console.log(currentName);
                        factory = chooseCorrectFactory(currentRow[col]);
                        board.level[row][col] = factory.create({name: currentName, position: new Position(row, col)});
                    }
                }
            }
        })
        .catch(err => console.log(err.message));
}

class LevelManager {
    constructor(encoded) {
        this.board = [];
    }

    displayBoard() {
        console.log(this.board);
    }

}

/**
 * Class that represents a position on the board
 */
class Position {
    static UP = new Position(-1, 0);
    static DOWN = new Position(1, 0);
    static RIGHT = new Position(0, 1);
    static LEFT = new Position(0, -1);

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * function to add two position
     * @param {other position} position
     * @returns new position with news coordinates
     */
    add(position) {
        return new Position(this.x + position.x, this.y + position.y);
    }
}


class BabaNoun {
    constructor(position) {
        this.position = position;
        this.name = words.NOUN.BABA;
        this.type = type.NOUN;
        this.state = new PushState();
    }

    /**
     *
     * @param imgElement
     */
    getImageServer(imgElement) {
        fetch("/img/text_baba_0_1.png")
            .then(response => {
                if (response.ok) {
                    return response.blob();
                }
                throw Error(response.statusText);
            })
            .then(blob => {
                let objectURL = URL.createObjectURL(blob);
                imgElement.src = objectURL;
            })
            .catch(err => console.log(err.message));
    }

    /**
     *
     * @returns {HTMLTableDataCellElement}
     */
    toElement() {
        let td = document.createElement("td");
        let image = document.createElement("img");
        this.getImageServer(image);
        td.appendChild(image);
        return td;
    }
}

/**
 * Class that represents a FLAG Noun on the board
 */
class FlagNoun {
    constructor(position) {
        this.position = position;
        this.name = words.NOUN.FLAG;
        this.type = type.NOUN;
        this.state = new PushState();
    }

    /**
     *
     * @param imgElement
     */
    getImageServer(imgElement) {
        fetch("images/text_flag_0_1.png")
            .then(response => {
                if (response.ok) {
                    return response.blob();
                }
                throw Error(response.statusText);
            })
            .then(blob => {
                let objectURL = URL.createObjectURL(blob);
                imageElement.src = objectURL;
            })
            .catch(err => console.log(err.message));
    }

    /**
     *
     * @returns {HTMLTableDataCellElement}
     */
    toElement() {
        let td = document.createElement("td");
        let image = document.createElement("img");
        this.getImageServer(image);
        td.appendChild(image);
        return td;
    }
}

/**
 * Class that represents a WATER Noun on the board
 */
class WaterNoun {
    constructor(position) {
        this.position = position;
        this.name = words.NOUN.WATER;
        this.type = type.NOUN;
    }

    /**
     *
     * @param imgElement
     */
    getImageServer(imgElement) {
        fetch("images/text_water_0_1.png")
            .then(response => {
                if (response.ok) {
                    return response.blob();
                }
                throw Error(response.statusText);
            })
            .then(blob => {
                let objectURL = URL.createObjectURL(blob);
                imgElement.src = objectURL;
            })
            .catch(err => console.log(err.message));
    }

    /**
     *
     * @returns {HTMLTableDataCellElement}
     */
    toElement() {
        let td = document.createElement("td");
        let image = document.createElement("img");
        this.getImageServer(image);
        td.appendChild(image);
        return td;
    }
}

class WallNoun {
    constructor(position) {
        this.position = position;
        this.name = words.NOUN.WALL;
        this.type = type.NOUN;
    }

    /**
     *
     * @param imgElement
     */
    getImageServer(imgElement) {
        fetch("images/text_wall_0_1.png")
            .then(response => {
                if (response.ok) {
                    return response.blob();
                }
                throw Error(response.statusText);
            })
            .then(blob => {
                let objectURL = URL.createObjectURL(blob);
                imageElement.src = objectURL;
            })
            .catch(err => console.log(err.message));
    }

    /**
     *
     * @returns {HTMLTableDataCellElement}
     */
    toElement() {
        let td = document.createElement("td");
        let image = document.createElement("img");
        this.getImageServer(image);
        td.appendChild(image);
        return td;
    }
}

/**
 * Class that represents a ROCK Noun on the board
 */
class RockNoun {
    constructor(position) {
        this.type = type.NOUN
        this.name = words.NOUN.ROCK;
        this.position = position;
        this.state = new PushState();
    }

    /**
     *
     * @param imgElement
     */
    getImageServer(imgElement) {
        fetch("images/text_rock_0_1.png")
            .then(response => {
                if (response.ok) {
                    return response.blob();
                }
                throw Error(response.statusText);
            })
            .then(blob => {
                let objectURL = URL.createObjectURL(blob);
                imageElement.src = objectURL;
            })
            .catch(err => console.log(err.message));
    }

    /**
     *
     * @returns {HTMLTableDataCellElement}
     */
    toElement() {
        let td = document.createElement("td");
        let image = document.createElement("img");
        this.getImageServer(image);
        td.appendChild(image);
        return td;
    }
}

/**
 * Class that represents IS Operator on the board
 */
class IsOperator {
    constructor(position) {
        this.name = words.OPERATOR.IS;
        this.position = position;
        this.type = type.OPERATOR;
    }

    /**
     *
     * @param imgElement
     */
    getImageServer(imgElement) {
        fetch("images/text_is_0_1.png")
            .then(response => {
                if (response.ok) {
                    return response.blob();
                }
                throw Error(response.statusText);
            })
            .then(blob => {
                let objectURL = URL.createObjectURL(blob);
                imageElement.src = objectURL;
            })
            .catch(err => console.log(err.message));
    }

    /**
     *
     * @returns {HTMLTableDataCellElement}
     */
    toElement() {
        let td = document.createElement("td");
        let image = document.createElement("img");
        this.getImageServer(image);
        td.appendChild(image);
        return td;
    }
}

/**
 * Class that represents Normal state of the elements on the board
 */
class NormalState {
    constructor() {
        this.name = "normal";
    }

    /**
     *
     * @returns true if we can move on the element which wear this state, false otherwise
     */
    isSteppable() {
        return true;
    }

    /**
     *
     * @returns true if we can move the element which wear this state, false otherwise
     */
    isMovable() {
        return false;
    }
}

/**
 * Class that represents You state of the elements on the board
 */
class YouState {
    constructor() {
        this.name = "you";
    }

    /**
     *
     * @returns true if we can move on the element which wear this state, false otherwise
     */
    isSteppable() {
        return false;
    }

    /**
     *
     * @returns true if we can move the element which wear this state, false otherwise
     */
    isMovable() {
        return true;
    }
}

/**
 * Class that represents the word "YOU" on the board
 */
class YouProperty {
    constructor(position) {
        this.position = position;
        this.type = type.PROPERTY;
        this.state = new PushState();
    }

    /**
     *
     * @param imgElement
     */
    getImageServer(imgElement) {
        fetch("images/text_you_0_1.png")
            .then(response => {
                if (response.ok) {
                    return response.blob();
                }
                throw Error(response.statusText);
            })
            .then(blob => {
                let objectURL = URL.createObjectURL(blob);
                imageElement.src = objectURL;
            })
            .catch(err => console.log(err.message));
    }

    /**
     *
     * @returns {HTMLTableDataCellElement}
     */
    toElement() {
        let td = document.createElement("td");
        let image = document.createElement("img");
        this.getImageServer(image);
        td.appendChild(image);
        return td;
    }
}

/**
 * Class represents Win state of the elements on the board
 */
class WinState {
    constructor() {
        this.name = "win";
    }

    /**
     *
     * @returns true if we can move on the element which wear this state, false otherwise
     */
    isSteppable() {
        return true;
    }

    /**
     *
     * @returns true if we can move the element which wear this state, false otherwise
     */
    isMovable() {
        return false;
    }
}

/**
 * Class that represents the word "WIN" on the board
 */
class WinProperty {
    constructor(position) {
        this.position = position;
        this.type = type.PROPERTY;
        this.words = words.PROPERTY.WIN;
        this.state = new PushState();
    }

    /**
     *
     * @param imgElement
     */
    getImageServer(imgElement) {
        fetch("images/text_win_0_1.png")
            .then(response => {
                if (response.ok) {
                    return response.blob();
                }
                throw Error(response.statusText);
            })
            .then(blob => {
                let objectURL = URL.createObjectURL(blob);
                imageElement.src = objectURL;
            })
            .catch(err => console.log(err.message));
    }

    /**
     *
     * @returns {HTMLTableDataCellElement}
     */
    toElement() {
        let td = document.createElement("td");
        let image = document.createElement("img");
        this.getImageServer(image);
        td.appendChild(image);
        return td;
    }
}

/**
 * Class that represents Stop state of the elements on the board
 */
class StopState {
    constructor() {
        this.name = "stop";
    }

    /**
     *
     * @returns true if we can move on the element which wear this state, false otherwise
     */
    isSteppable() {
        return false;
    }

    /**
     *
     * @returns true if we can move the element which wear this state, false otherwise
     */
    isMovable() {
        return false;
    }
}

/**
 * Class that represents the word "STOP" on the board
 */
class StopProperty {
    constructor(position) {
        this.position = position;
        this.name = words.PROPERTY.STOP;
        this.type = type.PROPERTY;
        this.state = new PushState();
    }

    /**
     *
     * @param imgElement
     */
    getImageServer(imgElement) {
        fetch("images/text_stop_0_1.png")
            .then(response => {
                if (response.ok) {
                    return response.blob();
                }
                throw Error(response.statusText);
            })
            .then(blob => {
                let objectURL = URL.createObjectURL(blob);
                imageElement.src = objectURL;
            })
            .catch(err => console.log(err.message));
    }

    /**
     *
     * @returns {HTMLTableDataCellElement}
     */
    toElement() {
        let td = document.createElement("td");
        let image = document.createElement("img");
        this.getImageServer(image);
        td.appendChild(image);
        return td;
    }
}

/**
 * Class that represents Push state of the elements on the board
 */
class PushState {
    constructor() {
        this.name = "push";
    }

    /**
     *
     * @returns true if we can move on the element which wear this state, false otherwise
     */
    isSteppable() {
        return false;
    }

    /**
     *
     * @returns true if we can move the element which wear this state, false otherwise
     */
    isMovable() {
        return true;
    }
}

/**
 * Class that represents the word "PUSH" on the board
 */
class PushProperty {
    constructor(position) {
        this.position = position;
        this.name = words.PROPERTY.PUSH;
        this.state = new PushState();
    }

    /**
     *
     * @param imgElement
     */
    getImageServer(imgElement) {
        fetch("/img/text_push_0_1.png")
            .then(response => {
                if (response.ok) {
                    return response.blob();
                }
                throw Error(response.statusText);
            })
            .then(blob => {
                let objectURL = URL.createObjectURL(blob);
                imageElement.src = objectURL;
            })
            .catch(err => console.log(err.message));
    }

    /**
     *
     * @returns {HTMLTableDataCellElement}
     */
    toElement() {
        let td = document.createElement("td");
        let image = document.createElement("img");
        this.getImageServer(image);
        td.appendChild(image);
        return td;
    }
}

/**
 *
 * */
class BabaEntity {
    constructor(position) {
        this.name = entity.BABA;
        this.type = type.ENTITY;
        this.position = position
    }

    /**
     *
     * @param imgElement
     */
    getImageServer(imgElement) {
        fetch("/img/baba_0_1.png")
            .then(response => {
                if (response.ok) {
                    return response.blob();
                }
                throw Error(response.statusText);
            })
            .then(blob => {
                let objectURL = URL.createObjectURL(blob);
                imageElement.src = objectURL;
            })
            .catch(err => console.log(err.message));
    }

    /**
     *
     * @returns {HTMLTableDataCellElement}
     */
    toElement() {
        let td = document.createElement("td");
        let image = document.createElement("img");
        this.getImageServer(image);
        td.appendChild(image);
        return td;
    }
}

class FlagEntity {
    constructor(position) {
        this.name = entity.FLAG;
        this.type = type.ENTITY;
        this.position = position;
    }

    /**
     *
     * @param imgElement
     */
    getImageServer(imgElement) {
        fetch("/img/flag_0_1.png")
            .then(response => {
                if (response.ok) {
                    return response.blob();
                }
                throw Error(response.statusText);
            })
            .then(blob => {
                let objectURL = URL.createObjectURL(blob);
                imageElement.src = objectURL;
            })
            .catch(err => console.log(err.message));
    }

    /**
     *
     * @returns {HTMLTableDataCellElement}
     */
    toElement() {
        let td = document.createElement("td");
        let image = document.createElement("img");
        this.getImageServer(image);
        td.appendChild(image);
        return td;
    }
}


class WallEntity {
    constructor(position) {
        this.name = entity.WALL;
        this.type = type.ENTITY;
        this.position = position;
    }

    /**
     *
     * @param imgElement
     */
    getImageServer(imgElement) {
        fetch("/img/wall_0_2.png")
            .then(response => {
                if (response.ok) {
                    return response.blob();
                }
                throw Error(response.statusText);
            })
            .then(blob => {
                let objectURL = URL.createObjectURL(blob);
                imageElement.src = objectURL;
            })
            .catch(err => console.log(err.message));
    }

    /**
     *
     * @returns {HTMLTableDataCellElement}
     */
    toElement() {
        let td = document.createElement("td");
        let image = document.createElement("img");
        this.getImageServer(image);
        td.appendChild(image);
        return td;
    }
}

class WaterEntity {
    constructor(position) {
        this.name = entity.WATER;
        this.type = type.ENTITY;
        this.position = position;
    }

    /**
     *
     * @param imgElement
     */
    getImageServer(imgElement) {
        fetch("/img/water_0_1.png")
            .then(response => {
                if (response.ok) {
                    return response.blob();
                }
                throw Error(response.statusText);
            })
            .then(blob => {
                let objectURL = URL.createObjectURL(blob);
                imageElement.src = objectURL;
            })
            .catch(err => console.log(err.message));
    }

    /**
     *
     * @returns {HTMLTableDataCellElement}
     */
    toElement() {
        let td = document.createElement("td");
        let image = document.createElement("img");
        this.getImageServer(image);
        td.appendChild(image);
        return td;
    }
}

class RockEntity {
    constructor(position) {
        this.name = entity.ROCK;
        this.type = type.ENTITY;
        this.position = position;
    }

    /**
     *
     * @param imgElement
     */
    getImageServer(imgElement) {
        fetch("/img/rock_0_1.png")
            .then(response => {
                if (response.ok) {
                    return response.blob();
                }
                throw Error(response.statusText);
            })
            .then(blob => {
                let objectURL = URL.createObjectURL(blob);
                imageElement.src = objectURL;
            })
            .catch(err => console.log(err.message));
    }

    /**
     *
     * @returns {HTMLTableDataCellElement}
     */
    toElement() {
        let td = document.createElement("td");
        let image = document.createElement("img");
        this.getImageServer(image);
        td.appendChild(image);
        return td;
    }
}

/**
 *
 * @param boardTable
 * @param board
 */
function createHTMLboard(boardTable, board) {
    for(let row = 0; row < board.height; row++){
        let currentRowBoard = board.level[row];
        let currentTr = document.createElement("tr");
        for (let col = 0; col < board.width; col++){
            let currentColBoard = currentRowBoard[col][0][0];
            if(currentColBoard !== "")
                currentTr.appendChild(currentColBoard.toElement());
        }
        boardTable.appendChild(currentTr);
    }
}

function move(movement) {
    console.log(movement);
}

class Board {
    constructor(width, height) {
        let level = [];
        for (let i = 0; i < height; i++) {
            let row = [];
            for (let j = 0; j < width; j++) {
                let col = [[]];
                row.push(col);
            }
            level.push(row);
        }

        this.width = width;
        this.height = height;

        this.level = level;

        this.rules = {};
    }

    checkOpAndPropRule(movement, ent, grid) {
        let nextEntitiesOperator = grid[ent.position][ent.position + 1].filter(ent => ent === type.OPERATOR);
        if (nextEntitiesOperator.length !== 0) {
            let nextEntitiesProperty = grid[ent.position][ent.position + 2].filter(ent => ent === type.PROPERTY);
            if (nextEntitiesOperator.length !== 0) {
                let ruleKey = ent.name.split("_")[0] + "_entity";
                if (!this.rules[ruleKey]) {
                    this.rules[ruleKey] = [];
                }
                this.rules[ruleKey].push(nextEntitiesProperty[0].state);
            }
        }
    }

    updateRules() {
        this.rules = {};
        let grid = this.level[0];

        grid.forEach(row => row.forEach(col => col.forEach(ent => {
            if (ent.type === type.NOUN) {
                this.checkOpAndPropRule(Position.RIGHT, ent, grid);
                this.checkOpAndPropRule(Position.DOWN, ent, grid);
            }
        })))
    }

    getYouArray() {
        let tabYou = [];
        this.level[0].forEach(row => row.forEach(col => col.forEach(ent => {
            let states = this.rules[ent.name];
            states.forEach(state => {
                if (state.name === "you") {
                    tabYou.push(ent);
                }
            })
        })));

        return tabYou;
    }

    /**
     * Move the entity
     *
     * @param movement
     * @param grid
     * @param youEntity
     * @returns {boolean} True if the entity has moved, false otherwise
     */
    moveEntity(movement, grid, youEntity) {
        let flagStep = true;
        let nextPosition = movement.position.add(youEntity.position);
        if (nextPosition.x >= this.width || nextPosition.x < 0 || nextPosition.y >= this.height || nextPosition < 0) {
            return false;
        }

        let nextEntities = grid[nextPosition.x][nextPosition.y];

        nextEntities.forEach(ent => {
            let states = this.rules[ent.name];
            states.forEach(state => {
                if (state.isMovable()) {
                    // Recursive move
                    if (!this.moveEntity(movement, grid, ent)) {
                        return false;
                    }
                }
                if (state.isSteppable()) {
                    flagStep = true;
                }
            })
        })

        let currentPos = grid[youEntity.position.x][youEntity.position.y];

        if (currentPos.length === 0 || flagStep === true) {
            let pos;
            for (pos = 0; pos < currentPos.length; pos++) {
                if (currentPos[pos].name === youEntity.name) {
                    break;
                }
            }
            currentPos.splice(pos, 1);

            nextEntities.push(youEntity);
        }

        return true;
    }

    doMove(movement, grid, x, y) {

        this.moveEntity(movement, grid, youEntity);
        let currentPos = grid[youEntity.position.x][youEntity.position.y];
        currentPos.forEach(ent => {
                let states = this.rules[ent.name];
                states.forEach(state => {
                    if (state.name === "win") {
                        console.log("C'est gagné bravo !");
                    }
                })
            }
        )
    }

    move(movement) {
        let grid = this.level[0];
        let tabYou = this.getYouArray();
        if (movement.x === 1 && movement.y === 0 || movement.x === 0 && movement.y === 1) {
            tabYou.forEach(youEntity => {

            })
        }
    }
}

window.onload = () => {
    let boardTable = document.getElementById("boardTable");
    let board;
    let filename = "level00.json";
    let factory = chooseCorrectFactory("");

    fetch("/levels/"+filename)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw Error(response.statusText);
        })
        .then(jsonBoard => {
            board = new Board(jsonBoard['info']['col'],jsonBoard['info']['line']);
            let grid = jsonBoard['grid'];
            let factory;
            for(let row = 0; row < board.height; row++){
                let currentRow = grid[row];
                for(let col = 0; col < board.width; col++){
                    let currentName = currentRow[col];
                    if(currentName !== ""){
                        factory = chooseCorrectFactory(currentRow[col]);
                        board.level[row][col][0].push(factory.create({name: currentName, position: new Position(row, col)}));
                    }
                    else{
                        board.level[row][col][0].push("");
                    }
                }
            }
            console.log(board);
            createHTMLboard(boardTable, board);
            boardTable.addEventListener('keyup', (ev) => {
                switch (ev.key) {
                    case "ArrowDown":
                        board.move(Position.DOWN);
                        break;
                    case "ArrowUp":
                        board.move(Position.UP);
                        break;
                    case "ArrowLeft":
                        board.move(Position.LEFT);
                        break;
                    case "ArrowRight":
                        board.move(Position.RIGHT);
                        break;
                }
            });

        })
        .catch(err => console.log(err.message));
}