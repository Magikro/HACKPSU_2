import React, { useRef, useEffect } from 'react'


const Canvas = props => {

    const canvasRef = useRef(null)

    function clearCanvas()
    {
        canvasRef.current.getContext('2d').clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d');

        window.addEventListener('load', ()=> {

            resize();
            document.addEventListener('mousedown', startPainting);
            document.addEventListener('mouseup', stopPainting);
            document.addEventListener('mousemove', sketch);
            window.addEventListener('resize', resize);
    
        });

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
        function stopPainting(event){
            paint = false;
        }

        function sketch(event){
            if(!paint) return;
            ctx.beginPath();
            ctx.lineWidth = 5;

            ctx.lineCape = 'round';

            ctx.strokeStyle = '#000000';

            ctx.moveTo(coord.x, coord.y);

            getPosition(event);

            ctx.lineTo(coord.x , coord.y);

            ctx.stroke();
        }

    }, [])

    return (
    <>
        <button onClick={clearCanvas}>Clear Canvas</button>
        <canvas ref={canvasRef} {...props}/>
    </>
    )
}

export default Canvas