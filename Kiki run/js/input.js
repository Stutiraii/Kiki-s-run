// InputHandler class definition
export class InputHandler {
    constructor(game) {
        this.game=game;
        // Array to store pressed keys
        this.keys = [];

        // Event listener for keydown events
        window.addEventListener('keydown', e => {
            // Check if the pressed key is one of the specified arrow keys or Enter
            if ((
                e.key === 'ArrowDown' ||
                e.key === 'ArrowUp' ||
                e.key === 'ArrowLeft' ||
                e.key === 'ArrowRight' ||
                e.key === 'Enter'
            ) &&  this.keys.indexOf(e.key) === -1) {
                    this.keys.push(e.key);
                }else if(e.key ==='d')this.game.debug=!this.game.debug;
            
        });

        // Event listener for keyup events
        window.addEventListener('keyup', e => {
            // Check if the released key is one of the specified arrow keys or Enter
            if (
                e.key === 'ArrowDown' ||
                e.key === 'ArrowUp' ||
                e.key === 'ArrowLeft' ||
                e.key === 'ArrowRight' ||
                e.key === 'Enter'
            ) {
                // Remove the key from the keys array
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
        });
    }
}
