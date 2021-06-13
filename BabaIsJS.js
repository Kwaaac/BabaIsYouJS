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
        BABA: {
            name: 'baba_noun',
            ref: BabaNoun
        },
        FLAG: {
            name: 'flag_noun',
            ref: FlagNoun
        },
        WALL: {
            name: 'wall_noun',
            ref: WallNoun
        },
        WATER: {
            name: 'water_noun',
            ref: WaterNoun
        },
        ROCK: {
            name: 'rock_noun',
            ref: RockNoun
        }
    },
    OPERATOR: {
        IS: 'is_operator'
    },
    PROPERTY: {
        YOU: {
            name: 'you_property',
            ref: YouProperty
        },
        WIN: {
            name: 'win_property',
            ref: WinProperty
        },
        STOP: {
            name: 'stop_property',
            ref: StopProperty
        },
        PUSH: {
            name: 'push_property',

            ref: PushProperty
        }
    }
};

let entity = {
    BABA: {
        name: 'baba_entity',
        ref: BabaEntity
    },
    FLAG: 'flag_entity',
    WALL: 'wall_entity',
    WATER: 'water_entity',
    ROCK: 'rock_entity'
};

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
    constructor() {
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
                if(state.name === "you"){
                    tabYou.push(ent);
                }
            })
        })));

        return tabYou;
    }



    doMove(movement, grid, x, y) {
        let tabYou = this.getYouArray();

        tabYou.forEach(youEntity => {
            let nextPosition = movement.position.add(youEntity.position);
            if(nextPosition.x >= this.width || nextPosition.x < 0 || nextPosition.y >= this.height || nextPosition < 0){
                return;
            }

            let nextEntities = grid[nextPosition.x][nextPosition.y];

            nextEntities.forEach(ent => {
                let states = this.rules[ent.name];
                states.forEach(state => {
                    if(state.isMovable()){
                        this.doMove(movement, grid, )
                    }
                })
            })
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