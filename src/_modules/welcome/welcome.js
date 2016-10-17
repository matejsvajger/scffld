export default function() {

    let width, height, container, canvas, ctx, circles, animateContainer = true;

    this.init = () => {
        width = window.innerWidth;
        height = window.innerHeight;

        container = document.getElementById('welcome-section');
        container.style.height = height+'px';

        canvas = document.getElementById('welcome-canvas');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');

        // create particles
        circles = [];
        for(let x = 0; x < width * 0.5; x++) {
            let c = new Circle();
            circles.push(c);
        }

        this.animate();
        this.addListeners();
    }

    // Event handling
    this.addListeners = () => {
        window.addEventListener('scroll', this.scrollCheck);
        window.addEventListener('resize', this.resize);
    }

    this.scrollCheck = () => {
        animateContainer = (!document.body.scrollTop > height);
    }

    this.resize = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        container.style.height = height + 'px';
        canvas.width = width;
        canvas.height = height;
    }

    this.animate = () => {
        if(animateContainer) {
            ctx.clearRect(0, 0, width, height);
            for(let circle of circles) {
                circle.draw();
            }
        }
        requestAnimationFrame(this.animate);
    }

    // Canvas manipulation
    class Circle {
        constructor() {
            this.init();
        }

        init() {
            this.pos = {
                x: Math.random() * width,
                y: height + Math.random() * 100
            };
            this.alpha = 0.1 + Math.random() * 0.3;
            this.scale = 0.1 + Math.random() * 0.3;
            this.velocity = Math.random();
        }

        draw() {
            if(this.alpha <= 0) {
                this.init();
            }
            this.pos.y -= this.velocity;
            this.alpha -= 0.0005;

            ctx.beginPath();
            ctx.arc(this.pos.x, this.pos.y, this.scale * 10, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'rgba(255,255,255,'+ this.alpha+')';
            ctx.fill();
        }
    }

};
