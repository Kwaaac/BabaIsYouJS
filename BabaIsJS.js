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
 * function to create entity class
 * @constructor
 */
function EntityFactory(){
    this.create = function(attributs){
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
function NounFactory(){
    this.create = function(attributs){
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
function PropertyFactory(){
    this.create = function(attributs){
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
function OperatorFactory(){
    this.create = function(attributs){
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
class EncryptionDecorator {
    constructor(filename) {

    }
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
    constructor(attributs) {
        this.position = position;
        this.name = words.NOUN.BABA;
        this.type = type.NOUN;
        this.state = new PushState();
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
}

class WallNoun {
    constructor(position) {
        this.position = position;
        this.name = words.NOUN.WALL;
        this.type = type.NOUN;
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
}

/**
 * Class that represents IS Operator on the board
 */
class IsOperator{
    constructor(position) {
        this.name = words.OPERATOR.IS;
        this.position = position;
        this.type = type.OPERATOR;
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
}

class FlagEntity {
    constructor(position) {
        this.name = entity.FLAG;
        this.type = type.ENTITY;
        this.position = position;
    }
}


class WallEntity {
    constructor(position) {
        this.name = entity.WALL;
        this.type = type.ENTITY;
        this.position = position;
    }
}

class WaterEntity {
    constructor(position) {
        this.name = entity.WATER;
        this.type = type.ENTITY;
        this.position = position;
    }
}

class RockEntity {
    constructor(position) {
        this.name = entity.ROCK;
        this.type = type.ENTITY;
        this.position = position;
    }
}

function createHTMLboard(boardTable) {

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
            grid.push(row);
        }

        this.level = level;

        this.rules = {};
    }

    getYouArray() {
        let tabYou = [];
        this.level[0].forEach(row => row.forEach(col => col.forEach()));

        return tabYou;
    }

    doMove(movement, grid, x, y) {
        let tabYou = this.getYouArray();

        tabYou.forEach(youEntity => {
            let nextPosition = movement.position.add(youEntity.position);

            let nextEntities = grid[nextPosition.x][nextPosition.y];

            nextEntities.forEach(ent =>)
        })
    }

    move(movement) {
        let grid = this.level[0];

        if (movement.x === 1 && movement.y === 0 || movement.x === 0 && movement.y === 1) {

        }
    }
}

window.onload = () => {
    let boardTable = document.getElementById("boardTable");
    let board = new Board(33, 18);
    let entityFactory = new EntityFactory();
    let propertyFactory = new PropertyFactory();
    let operatorFactory = new OperatorFactory();

    createHTMLboard(boardTable);

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
}