import { useEffect, useState, useRef, useCallback } from "react";
import SignaturePad from "signature_pad";
import "./App.css";

function App() {
  const signingSurface = useRef(null);
  const signLocation = useRef(null);
  const [signInput, setSignInput] = useState(null);

  // One could simply use Canvas#toBlob method instead, but it's just to show
  // that it can be done using result of SignaturePad#toDataURL.
  function dataURLToBlob(dataURL) {
    // Code taken from https://github.com/ebidel/filer.js
    var parts = dataURL.split(";base64,");
    var contentType = parts[0].split(":")[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;
    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
  }

  function download(dataURL, filename) {
    var blob = dataURLToBlob(dataURL);
    var url = window.URL.createObjectURL(blob);

    var a = document.createElement("a");
    a.style = "display: none";
    a.href = url;
    a.download = filename;

    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);
  }

  const getSignatureInput = () => {
    let canvas = document.getElementById("signature-input"),
      widget = new SignaturePad(canvas, {
        minWidth: 0.2,
        maxWidth: 2,
        backgroundColor: "rgba(255, 255, 255)", // necessary for saving image as JPEG; can be removed is only saving as PNG or SVG
        penColor: "rgb(66, 133, 244)",
      });

    return widget;
  };

  function clearSignature() {
    signInput.clear();
  }

  function bindSignature() {
    if (signInput.isEmpty()) return alert("Veuillez signer dans le pad");
    let image = signInput.toDataURL(),
      container = signLocation.current,
      img = document.createElement("img"),
      onClick = (e) => {
        container.removeChild(e.target);
      };

    img.src = image;
    img.alt = "Double cliquez pour supprimer la signature";

    if (container.children.length > 0)
      container.removeChild(container.children[0]);
    container.appendChild(img);

    img.addEventListener("dblclick", onClick);
  }

  const resizeCanvas = useCallback(() => {
    let canvas = signingSurface.current,
      ratio = Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    // canvas.height = canvas.offsetHeight * ratio;
    canvas.height = (canvas.width * 3) / 4;
    canvas.getContext("2d").scale(ratio, ratio);
    getSignatureInput().clear(); // otherwise isEmpty() might return incorrect value
  }, []);

  const onClickSave = (format) => {
    if (signInput.isEmpty()) {
      return alert("Veuillez signer dans le pad");
    }

    const data = signInput.toDataURL(`image/${format}`);
    const image = new Image();
    image.src = data;
    const w = window.open();
    w.document.write(image.outerHTML);
    download(data, `signature.${format}`);
  };

  useEffect(() => {
    setSignInput(getSignatureInput());
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.addEventListener("resize", resizeCanvas);
    };
  }, [resizeCanvas]);

  return (
    <div className="container">
      <div className="text-center mb-4">
        <h1>Essai Signature Pad React</h1>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div id="sign-widget">
            <div className="container signature-container p-3 mb-3 w-100 rounded bg-secondary text-white">
              <div className="">
                <div className="col-md-12">
                  <div className="h4">Signez ici</div>
                </div>
                <div className="col-md-12">
                  <canvas
                    ref={signingSurface}
                    className="signature-input w-100"
                    id="signature-input"
                  ></canvas>
                </div>
              </div>
              <div className=" d-flex justify-content-between px-1">
                <div className="col-3 btn btn-success" onClick={bindSignature}>
                  Sign
                </div>

                <div className="col-3 btn btn-warning" onClick={clearSignature}>
                  Clear
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="row">
            <div>
              <div className="h4">La signature s'affichera ci-dessous :</div>
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
        <div>
          <button
            className="btn btn-info"
            id="save-png"
            onClick={() => onClickSave("png")}
          >
            Save as PNG
          </button>
          <button
            className="btn btn-info ms-2"
            id="save-jpeg"
            onClick={() => onClickSave("jpeg")}
          >
            Save as JPEG
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
