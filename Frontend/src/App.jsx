import React, { useRef, useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Whiteboard from "./components/Whiteboard";
import ClearModal from "./components/ClearModal";
import { fabric } from "fabric";
import "fabric-history";

const App = () => {
  const canvasRef = useRef(null);
  const [fabricCanvas, setFabricCanvas] = useState(null);
  const [clearModal, setClearModal] = useState(false);
  const [clipboard, setClipboard] = useState(null);
  const defaultBackgroundColor = "#e5e7eb"

  // Toolbox states
  const [penWidth, setPenWidth] = useState(1);
  const [penColor, setPenColor] = useState("#000000");
  const [tool, setTool] = useState("cursor");
  const [drawingMode, setDrawingMode] = useState(true);

  // Selected tool
  useEffect(() => {
    if (tool === "cursor") {
      if (penColor === defaultBackgroundColor) {
        setPenColor("#000000");
      }
      setDrawingMode(false);
    }
    if (tool === "pencil") {
      if (penColor === defaultBackgroundColor) {
        setPenColor("#000000");
      }
      setDrawingMode(true);
    }
    if (tool === "eraser") {
      setPenColor(defaultBackgroundColor);
      setDrawingMode(true);
    }
  }, [tool, penColor]);

  const changePenWidth = (width) => {
    if (fabricCanvas) {
      const parsedWidth = parseInt(width, 10);
      fabricCanvas.freeDrawingBrush.width = parsedWidth;
      setPenWidth(parsedWidth);
      fabricCanvas.renderAll();
    }
  };

  const changePenColor = (color) => {
    if (fabricCanvas) {
      fabricCanvas.freeDrawingBrush.color = color;
      setPenColor(color);
      fabricCanvas.renderAll();
    }
  };

  const downloadBoard = () => {
    if (fabricCanvas) {
      const pngData = fabricCanvas.toDataURL("png");
      const downloadLink = document.createElement("a");
      const fileName = `whiteBoard-session-${Math.random().toString().replace(".", "")}.png`;

      downloadLink.href = pngData;
      downloadLink.download = fileName;
      downloadLink.click();
    }
  };

  const addText = () => {
    if (fabricCanvas) {
      const text = new fabric.IText("Text", {
        left: 100,
        top: 200,
        fill: penColor === defaultBackgroundColor ? "#000000" : penColor
      });
      fabricCanvas.add(text);
      setTool("cursor");
    }
  };

  const clearCanvas = () => {
    if (fabricCanvas) {
      fabricCanvas.clear();
      fabricCanvas.backgroundColor = defaultBackgroundColor; 
      fabricCanvas.renderAll();
    }
  };

  // Copy Object to Clipboard.
  const copy = () => {
    fabricCanvas.getActiveObject().clone(function(cloned) {
      setClipboard(cloned);
    });
  }

  // Paste Object from Clipboard.
  const paste = () => {
    clipboard.clone(function(clonedObj) {
      fabricCanvas.discardActiveObject();
      clonedObj.set({
        left: clonedObj.left + 10,
        top: clonedObj.top + 10,
        evented: true,
      });

      // Paste multiple objects.
      if (clonedObj.type === 'activeSelection') {
        clonedObj.canvas = fabricCanvas;
        clonedObj.forEachObject(function(obj) {
          fabricCanvas.add(obj);
        });
        clonedObj.setCoords();
      } else {
        fabricCanvas.add(clonedObj);
      }
      
      // Move next paste coords
      var current = clipboard;
      current.top += 10;
      current.left += 10;
      setClipboard(current);

      fabricCanvas.setActiveObject(clonedObj);
      fabricCanvas.requestRenderAll();
    });
  }

  // Handle Undo/Redo with fabric-history.
  const undo = () => fabricCanvas.undo();
  const redo = () => fabricCanvas.redo();

  return (
    <div>
      <Navbar downloadBoard={downloadBoard} />
      <ClearModal clearModal={clearModal} setClearModal={setClearModal} clearCanvas={clearCanvas}/>
      <Whiteboard
        canvasRef={canvasRef}
        setFabricCanvas={setFabricCanvas}
        fabricCanvas={fabricCanvas}
        drawingMode={drawingMode}
        tool={tool}
        setTool={setTool}
        changePenWidth={changePenWidth}
        penWidth={penWidth}
        changePenColor={changePenColor}
        penColor={penColor}
        addText={addText}
        copy={copy}
        paste={paste}
        undo={undo}
        redo={redo}
        setClearModal={setClearModal} 
      />
    </div>
  );
};

export default App;
