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
 *
 * */
class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(vector) {
        return new Position(this.x + vector.x, this.y + vector.y);
    }
}

class Noun {

}

class Operator {

}

class Property{
    createProperty(property) {
        
    }

}


class Element {

}

class You {
    name = "You";
}

class Win {

}

class

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


class