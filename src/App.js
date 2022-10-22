import { useEffect, useState, useRef } from "react";
import SignaturePad from "signature_pad";
import "./App.css";

function App() {
  const signingSurface = useRef(null);
  const signLocation = useRef(null);
  const [signInput, setSignInput] = useState(null);

  const getSignatureInput = () => {
    let canvas = document.getElementById("signature-input"),
      widget = new SignaturePad(canvas, {
        minWidth: 0.2,
        maxWidth: 2,
      });
    console.log(widget);
    return widget;
  };

  function clearSignature() {
    getSignatureInput().clear();
  }

  function bindSignature() {
    if (!signInput) return false;
    let image = signInput.toDataURL(),
      container = signLocation.current,
      img = document.createElement("img"),
      onClick = (e) => {
        container.removeChild(e.target);
      };

    img.src = image;
    img.alt = "Double cliquez pour supprimer la signature";

    console.log(container.children);
    if (container.children.length > 0)
      container.removeChild(container.children[0]);
    container.appendChild(img);

    img.addEventListener("dblclick", onClick);
  }

  function resizeCanvas(e) {
    let canvas = signingSurface.current,
      ratio = Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext("2d").scale(ratio, ratio);
  }

  useEffect(() => {
    setSignInput(getSignatureInput());
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.addEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div className="container">
      <div className="page-header">
        <h1>Essai Signature Pad React</h1>
      </div>
      <div className="row">
        <div className="col-md-3">
          <div id="sign-widget">
            <div className="container signature-container">
              <div className="row">
                <div className="col-md-12">
                  <h1>Signez ici</h1>
                </div>
                <div className="col-md-12">
                  <canvas
                    ref={signingSurface}
                    className="signature-input"
                    id="signature-input"
                  ></canvas>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <div
                    className="btn btn-success pull-left"
                    onClick={bindSignature}
                  >
                    Sign
                  </div>
                </div>
                <div className="col-sm-6">
                  <div
                    className="btn btn-warning pull-right"
                    onClick={clearSignature}
                  >
                    Clear
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="row">
            <div>
              <h1>La signature s'affichera ci-dessous :</h1>
              <p>Double cliquez pour supprimer la signature</p>
            </div>
            <div>
              <div id="sign-location" ref={signLocation}></div>
            </div>
          </div>
          <div className="row">
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
