import React, { useRef, useEffect } from 'react'

const Canvas = props => {

    const canvasRef = useRef(null)

    window.addEventListener('load', ()=> {

        resize();
        document.addEventListener('mousedown', startPainting);
        document.addEventListener('mouseup', stopPainting);
        document.addEventListener('mousemove', sketch);
        window.addEventListener('resize', resize);

    });

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        function resize(){
            ctx.canvas.width = window.innerWidth;
            ctx.canvas.height = window.innerHeight;
        }

        let coord = {x:0 , y:0};

        let paint = false;

        function getPosition(event){
            coord.x = event.clientX - canvas.offsetLeft;
            coord.y = event.clientY - canvas.offsetTop;
        }

        function startPainting(event){
            paint = true;
            getPosition(event);
        }

        ctx.fillStyle = '#000000'
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    }, [])

    return <canvas ref={canvasRef} {...props}/>
}

export default Canvas