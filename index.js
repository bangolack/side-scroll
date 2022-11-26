

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

const gravity = 0.5

canvas.width = 1024
canvas.height = 576


class Player {
    constructor(){
        this.position = {
            x: 200,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 50
        this.height = 50
    }

    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        
        
        if(this.position.y + this.height + this.velocity.y <= canvas.height)
        this.velocity.y += gravity
        else this.velocity.y = 0
    }
}

class Platform {
    constructor({x, y}){
        this.position = {
            x,
            y
        }
        this.width = 200
        this.height = 20
    }
    draw(){
        c.fillStyle = 'blue'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const player = new Player()
const platforms = [
    new Platform(
        {x: 200, y: 300}), 
    new Platform(
        {x: 400, y: 350}

    )]

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

let scrollOffset = 0

function animate(){
    requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    platforms.forEach(platform =>{
        platform.draw()
    })
    

    if(keys.right.pressed && player.position.x < (innerWidth * .6)){
        player.velocity.x = 5
        scrollOffset += 5
    }
    else if (keys.left.pressed && player.position.x > (innerWidth * .3 ) ){
        player.velocity.x = -5
        scrollOffset -= 5
    }
    else {player.velocity.x = 0
    
        if (keys.right.pressed){
            platforms.forEach(platform =>{
                platform.position.x -= 5
            })
            
        }
        else if (keys.left.pressed){
            platforms.forEach(platform => {
                platform.position.x += 5}
        )}
    }
    platforms.forEach(platform => {
    if(player.position.y + player.height <= 
        platform.position.y && 
        player.position.y + player.height + 
        player.velocity.y >= platform.position.y &&
        player.position.x + player.width >= platform.position.x &&
        player.position.x <= platform.position.x + platform.width) {
            player.velocity.y = 0
    
    }

   
})
    
   
}
animate()

addEventListener('keydown', (e) => {
    switch (e.key){
        case 'a':
            console.log('left')
            keys.left.pressed = true
            break
        case 's':
            console.log('down')
            break
        case 'd':
            console.log('right')
            keys.right.pressed = true
            
            break
        case 'w':
            console.log('up')
            player.velocity.y -= 15
            break

    }

    
})

addEventListener('keyup', (e) => {
    switch (e.key){
        case 'a':
            console.log('left')
            keys.left.pressed = false
            break
        case 's':
            console.log('down')
            break
        case 'd':
            console.log('right')
            keys.right.pressed = false
            
            break
        case 'w':
            console.log('up')
            player.velocity.y -= 0
            break

    }

    
})