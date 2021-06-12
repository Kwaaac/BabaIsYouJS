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

class BabaNoun {
    constructor(attributs) {
        this.position = attributs.position;
        this.state = new PushState();
    }
}

class FlagNoun {
    constructor(attributs) {
        this.position = attributs.position;
        this.state = new PushState();
    }
}

class WaterNoun {
    constructor(attributs) {
        this.position = attributs.position;
        this.state = new PushState();
    }
}

class RockNoun {
    constructor(attributs) {
        this.position = attributs.position;
        this.state = new PushState();
    }
}

class Operator {

}

class Element {

}

/**
 * Property with state pattern
 * */
class NormalState{
    constructor() {
        this.name = "normal";
    }

    isSteppable(){
        return true;
    }

    isMovable(){
        return false;
    }
}

class YouState {
    constructor() {
        this.name = "you";
    }

    isSteppable(){
        return false;
    }

    isMovable(){
        return true;
    }
}

class WinState {
    constructor() {
        this.name = "win";
    }

    isSteppable(){
        return true;
    }

    isMovable(){
        return false;
    }
}

/**
 *
 * */
class StopState {
    constructor() {
        this.name = "stop";
    }

    /**
     * Return true if we can move on the element, false otherwise
     * */
    isSteppable(){
        return false;
    }

    /**
     * Return true if we can move the element, false otherwise
     * */
    isMovable(){
        return false;
    }
}

class PushState {
    constructor(){
        this.name = "push";
    }

    isSteppable(){
        return false;
    }

    isMovable(){
        return true;
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