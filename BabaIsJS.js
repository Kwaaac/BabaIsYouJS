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

/**
 * Noun classes
 * */
class Noun {
    createNoun(attributs) {
        let nounType;
        switch (attributs.name) {
            case "baba":
                nounType = BabaNoun;
                break;
            case "flag":
                nounType = FlagNoun;
                break;
            case "water":
                nounType = WaterNoun;
                break;
            case "rock":
                nounType = RockNoun;
                break;
        }
        return new nounType(attributs);
    }
}

class BabaNoun {
    constructor(attributs) {
        this.position = attributs.position;
        this.pushable = true;
    }
}

class FlagNoun {
    constructor(attributs) {
        this.position = attributs.position;
        this.pushable = true;
    }
}

class WaterNoun {
    constructor(attributs) {
        this.position = attributs.position;
        this.pushable = true;
    }
}

class RockNoun {
    constructor(attributs) {
        this.position = attributs.position;
        this.pushable = true;
    }
}

class Operator {

}

class Property {
    createProperty(property) {

    }

}


class Element {

}

class You {

}

class Win {

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