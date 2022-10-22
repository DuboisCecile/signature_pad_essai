import { useEffect, useState, useRef } from "react";
import SignaturePad from "signature_pad";
import "./App.css";

function App() {
  const btnWrapper = useRef(null);
  const signingSurface = useRef(null);
  const [signInput, setSignInput] = useState(null);
  // const [buttons, setButtons] = useState({
  //   sign: false,
  //   clear: false,
  //   revoke: false,
  // });

  const getWidget = () => {
    let canvas = document.getElementById("signature-input"),
      widget = new SignaturePad(canvas, {
        minWidth: 0.2,
        maxWidth: 3,
        // onBegin(e) {
        //   setButtons({ sign: true, clear: true, revoke: false });
        // },
        // onEnd(e) {},
      });
    return widget;
  };

  function clearSignature(e) {
    setSignInput(null);
    getWidget().clear();
    // setButtons({ sign: true, clear: true, revoke: false });
  }
  console.log(signInput);
  function bindSignature(e) {
    console.log(e);
    console.log("signinput dans fonction bindSignature", signInput);
    if (!signInput) return false;
    let image = signInput.toDataURL(),
      container = document.getElementById("sign-location"),
      img = document.createElement("img"),
      onClick = (e) => {
        container.removeChild(e.target);
      };

    img.src = image;
    img.alt = "Double Click to Remove Signature";
    if (container.children.length > 0)
      container.removeChild(container.children[0]);
    container.appendChild(img);

    img.removeEventListener("dblclick", onClick);
    img.addEventListener("dblclick", onClick);
    // setButtons({ revoke: true, clear: true, sign: true });
  }

  function resizeCanvas(e) {
    // let canvas = FindDOMNode(signingSurface),
    let canvas = signingSurface.current,
      ratio = Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext("2d").scale(ratio, ratio);
  }

  useEffect(() => {
    // let canvas = document.getElementById("signature-input"),
    //   widget = new SignaturePad(canvas, {
    //     minWidth: 0.2,
    //     maxWidth: 3,
    //     onBegin(e) {
    //       setButtons({ sign: true, clear: true, revoke: false });
    //     },
    //     onEnd(e) {},
    //   });

    setSignInput(getWidget());
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.addEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div className="container">
      <div className="page-header">
        <h1>
          Signature Pad Example w/ React JS <small> John Remillard</small>
        </h1>
      </div>
      <div className="row">
        <div className="col-md-3">
          <div id="sign-widget">
            <div className="container signature-container">
              <div className="row">
                <div className="col-md-12">
                  <h1>Example Signature Widget</h1>
                </div>
                <div className="col-md-12">
                  <canvas
                    ref={signingSurface}
                    className="signature-input"
                    id="signature-input"
                  ></canvas>
                </div>
              </div>
              <div className="row" ref={btnWrapper}>
                <div className="col-sm-6">
                  <div
                    className="btn btn-success pull-left"
                    onClick={bindSignature}
                  >
                    Sign
                  </div>
                  <div
                    className="btn btn-success pull-right"
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
            <div className="col-md-12">
              <h1>Example Contract</h1>
            </div>
            <div className="col-md-12">
              <div id="contract-area">
                <p>
                  Application of this License or (ii) ownership of fifty dollars
                  ($50.00). Trademarks. This License applies to any other
                  provision. Any law or agreed to in writing, Licensor provides
                  the Work or out of any later version. This program is free
                  software, and (2) offer you this license is granted separate
                  from the Program in object code or executable form with such
                  an action for patent infringement against You in that
                  instance. Effect of New York and the real names of its terms
                  and conditions for use, reproduction, or distribution of the
                  License, or portion thereof, is at Your sole and entire risk.
                </p>
                <p>
                  THE COVERED CODE IS WITH YOU. SHOULD THE PROGRAM AS PERMITTED
                  ABOVE, BE LIABLE FOR ANY CLAIM, DAMAGES OR LOSS AS A RESULT OF
                  MODIFYING, DISTRIBUTING, OR OTHERWISE USING PYTHON, OR ANY
                  OTHER CONTRIBUTOR, OR ANY DERIVATIVE THEREOF, EVEN IF ADVISED
                  OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE LICENSED
                  PRODUCT IS FREE OF DEFECTS, MERCHANTABLE, FIT FOR A PARTICULAR
                  PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE LICENSOR, ANY
                  CONTRIBUTOR, OR ANY SUPPLIER OF ANY KIND AND APPLE HEREBY
                  DISCLAIMS ALL SUCH WARRANTIES, INCLUDING WITHOUT LIMITATION,
                  DAMAGES FOR LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
                  INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
                  WHETHER IN AN ACTION OF CONTRACT, WARRANTY, TORT (INCLUDING
                  NEGLIGENCE OR OTHERWISE) ARISING IN ANY RESPECT, YOU (NOT THE
                  INITIAL DEVELOPER OR ANY CONTRIBUTOR SHALL CREATE A WARRANTY.
                </p>
                <p>
                  You acknowledge that the Program or its representatives,
                  including but not limited to, loss of data, data being
                  rendered inaccurate, or losses sustained by anyone as a
                  component of the State of New York and the output from the
                  Program under this Agreement as released by IBM, including
                  source code, to be updated versions of the terms of this
                  License or a Contributor which are necessarily infringed by
                  the terms and conditions of title and non-infringement, and
                  implied warranties of merchantability and fitness for a fee,
                  you must provide new instructions on how to obtain the
                  recipient's agreement that any such work the nature of the
                  Program originate from and are distributed by that Contributor
                  and the Individual or Organization ("Licensee") accessing and
                  otherwise using the same media as an addendum to the
                  permissions granted on that web page. By copying, installing
                  or otherwise designated in writing to pay any damages as a
                  single product. In such an offer, in accord with Subsection b
                  above.) The source code or else can get it if you fail to cure
                  such breach within 30 days of becoming aware of such
                  Commercial Distributor must pay those damages
                </p>
              </div>
              <div className="col-md-12">
                <p>Signed, </p>
                <div id="sign-location"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <h1>What Is This?</h1>
          <p>
            This is an example using a signature widget with react. When the
            user signs using their cursor or touchpad and then submits the
            signature, a base64 image is created and added to the bottom of the
            example contract.{" "}
          </p>
          <div className="alert alert-info">
            <p>
              <b>Tip:</b> Double click the signature on the contract to revoke
              it.
            </p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 col-md-offset-8">
          <small>
            Filler Text from <a href="http://legalipsum.com/">Legal Ipsum</a>
          </small>
          <br />
          <small>
            Signature Widget from{" "}
            <a href="https://github.com/szimek/signature_pad">Signature Pad</a>
          </small>
        </div>
      </div>
    </div>
  );
}

export default App;
