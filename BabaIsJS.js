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

let property = {}

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

/**
 * Class that represents a BABA Noun on the board
 */
class BabaNoun {
    constructor(attributs) {
        this.position = position;
        this.state = new PushState();
    }
}

/**
 * Class that represents a FLAG Noun on the board
 */
class FlagNoun {
    constructor(attributs) {
        this.position = position;
        this.state = new PushState();
    }
}

/**
 * Class that represents a WATER Noun on the board
 */
class WaterNoun {
    constructor(attributs) {
        this.position = position;
        this.state = new PushState();
    }
}

/**
 * Class that represents a ROCK Noun on the board
 */
class RockNoun {
    constructor(attributs) {
        this.position = position;
        this.state = new PushState();
    }
}


class Element {

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
    constructor(attributs) {
        this.position = attributs.position;
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
        this.state = new PushState();
    }
}

/**
 *
 * */
class Entity {
    constructor(name, type, position) {
        this.name = name;
        this.type = type;
        this.position = position
    }
}