import React, { useRef, useEffect } from "react";
import { Box, Heading, Container } from "@chakra-ui/react";

const Index = () => {
  const canvasRef = useRef(null);

  const drawMandelbrot = (ctx, width, height) => {
    const maxIter = 100;
    const scaleX = 3.5 / width;
    const scaleY = 2.0 / height;

    for (let ix = 0; ix < width; ++ix) {
      for (let iy = 0; iy < height; ++iy) {
        let x0 = ix * scaleX - 2.5;
        let y0 = iy * scaleY - 1.0;
        let x = 0;
        let y = 0;
        let iteration = 0;

        while (x * x + y * y <= 4 && iteration < maxIter) {
          let xTemp = x * x - y * y + x0;
          y = 2 * x * y + y0;
          x = xTemp;
          iteration++;
        }

        const color = iteration === maxIter ? "#000" : `hsl(0, 100%, ${iteration}%)`;
        ctx.fillStyle = color;
        ctx.fillRect(ix, iy, 1, 1);
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { width, height } = canvas;

    drawMandelbrot(ctx, width, height);
  }, []);

  return (
    <Container centerContent>
      <Heading as="h1" size="xl" my={8}>
        Mandelbrot Set Renderer
      </Heading>
      <Box width="100%" height="auto" boxShadow="md">
        <canvas ref={canvasRef} width={800} height={600} />
      </Box>
    </Container>
  );
};

export default Index;
