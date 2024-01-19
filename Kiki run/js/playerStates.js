// Enum for player states
const states = {
    IDLE: 0,
    WALK: 1,
    JUMP: 2,
    FALL: 3,
}

// Base State class
class State {
    constructor(state) {
        this.state = state;
    }
}

// Idle State class
export class Idle extends State {
    constructor(player) {
        super('IDLE');
        this.player = player;
    }

    enter() {
        this.player.frameX = 0;
        this.player.maxFrame = 8;
        this.player.frameY = 0;
    }

    handleInput(input) {
        if (input.includes('ArrowLeft') || input.includes('ArrowRight')) {
            this.player.setState(states.WALK);
        }
    }
}

// Walk State class
export class Walk extends State {
    constructor(player) {
        super('WALK');
        this.player = player;
    }

    enter() {
        this.player.frameX = 0;
        this.player.maxFrame = 4;
        this.player.frameY = 1;
    }

    handleInput(input) {
        if (input.includes('ArrowDown')) {
            this.player.setState(states.IDLE);
        } else if (input.includes('ArrowUp')) {
            this.player.setState(states.JUMP);
        }
    }
}

// Jump State class
export class Jump extends State {
    constructor(player) {
        super('JUMP');
        this.player = player;
    }

    enter() {
        if (this.player.onGround()) this.player.vy -= 25;
        this.player.frameX = 0;
        this.player.maxFrame = 1;
        this.player.frameY = 2;
    }

    handleInput(input) {
        if (this.player.vy > this.player.weight) {
            this.player.setState(states.FALL);
        }
    }
}

// Fall State class
export class Fall extends State {
    constructor(player) {
        super('FALL');
        this.player = player;
    }

    enter() {
        this.player.frameX = 0;
        if (this.player.onGround()) this.player.vy -= 25;
        this.player.maxFrame = 2;
        this.player.frameY = 3;
    }

    handleInput(input) {
        if (this.player.onGround()) {
            this.player.setState(states.WALK);
        }
    }
}
